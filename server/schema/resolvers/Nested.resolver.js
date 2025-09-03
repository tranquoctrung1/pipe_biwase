const ChannelConfigModel = require('../../models/Channel.model');
const DataLoggerModel = require('../../models/DataLogger.model');

module.exports.GetChannelByLoggerId = async (loggerid) => {
    return await ChannelConfigModel.GetChannelByLoggerId(loggerid);
};

module.exports.SetStatusError = async (loggerid, siteTimeDelay) => {
    const channels = await ChannelConfigModel.GetChannelByLoggerId(loggerid);

    let statusError = 1;
    let timeDelay = 60;

    if (siteTimeDelay !== null && siteTimeDelay !== undefined) {
        timeDelay = siteTimeDelay;
    }

    if (channels.length > 0) {
        let channelFlow = undefined;
        let channelPressure = undefined;

        for (const channel of channels) {
            if (channel.TimeStamp !== null && channel.TimeStamp !== undefined) {
                let diff = Math.round(
                    (Date.now() - channel.TimeStamp.getTime()) / 1000 / 60,
                );

                if (diff > timeDelay) {
                    statusError = 3;
                }
            }
            if (channel.LastValue !== null && channel.LastValue !== undefined) {
                if (channel.LastValue < 0) {
                    statusError = 8;
                }
            }

            if (channel.FowardFlow === true) {
                channelFlow = channel;
            }
            if (channelFlow === undefined) {
                if (channel.ReverseFlow === true) {
                    channelFlow = channel;
                }
            }

            if (channel.Pressure1 === true) {
                channelPressure = channel;
            }
            if (channelPressure === undefined) {
                if (channel.Pressure2 === true) {
                    channelPressure = channel;
                }
            }
        }

        if (loggerid === 'TBTAML') {
            if (channelPressure !== undefined) {
                if (channelPressure.LastValue !== null) {
                    if (channelPressure.LastValue > 5) {
                        statusError = 6;
                    } else {
                        statusError = 7;
                    }
                } else {
                    statusError = 7;
                }
            }
        }

        if (statusError === 1) {
            if (channelPressure !== undefined) {
                if (
                    channelPressure.LastValue !== null &&
                    channelPressure.LastValue !== undefined
                ) {
                    if (channelPressure.LastValue > 90) {
                        statusError = 2;
                    }
                }
            }
        }

        if (statusError === 1) {
            if (channelFlow === undefined) {
                statusError = 4;
            }
        }

        if (statusError === 1) {
            if (channelFlow !== undefined) {
                if (
                    channelFlow.TimeStamp !== null &&
                    channelFlow.TimeStamp !== undefined &&
                    channelFlow.LastValue !== null &&
                    channelFlow.LastValue !== undefined
                ) {
                    let t1 = new Date(channelFlow.TimeStamp);
                    let t2 = new Date(channelFlow.TimeStamp);

                    t1.setDate(t1.getDate() - 1);
                    t2.setDate(t2.getDate() - 1);
                    t2.setHours(t2.getHours() + 1);

                    const listDataLogger =
                        await DataLoggerModel.GetDataLoggerByTimeStampNotParseDate(
                            channelFlow.ChannelId,
                            t1,
                            t2,
                        );

                    if (listDataLogger.length > 0) {
                        const value = listDataLogger[0];

                        if (value.Value !== null && value.Value !== undefined) {
                            const diffValue = value.Value * 0.3;

                            if (
                                channelFlow.LastValue >
                                value.Value + diffValue
                            ) {
                                statusError = 5;
                            }
                        }
                    }
                }
            }
        }
    }

    return statusError;
};
