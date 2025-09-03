const DailyDataModel = require('../../models/DailyData.model');
const ChannelModel = require('../../models/Channel.model');

module.exports = {
    Query: {
        GetDailyDatas: async (parent, {}, context, info) => {
            return await DailyDataModel.GetDailyDatas();
        },
        GetDailyDataBySiteIdTimeStamp: async (
            parent,
            { loggerid, start, end },
            context,
            info,
        ) => {
            const result = [];
            const channels = await ChannelModel.GetChannelByLoggerId(loggerid);
            const data = await DailyDataModel.GetDailyDataBySiteIdTimeStamp(
                loggerid,
                start,
                end,
            );
            for (const channel of channels) {
                const obj = {};
                obj.ChannelId = channel.ChannelId;
                obj.ChannelName = channel.ChannelName;
                obj.Unit = channel.Unit;
                obj.BaseMin = channel.BaseMin;
                obj.BaseMax = channel.BaseMax;
                obj.ListDataLogger = [];
                if (channel.Pressure1 === true) {
                    for (const item of data) {
                        const t = {};
                        t.TimeStamp = item.TimeStamp;
                        t.Value = item.Pressure1;
                        obj.ListDataLogger.push(t);
                    }
                } else if (channel.Pressure2 === true) {
                    for (const item of data) {
                        const t = {};
                        t.TimeStamp = item.TimeStamp;
                        t.Value = item.Pressure2;
                        obj.ListDataLogger.push(t);
                    }
                } else if (channel.ForwardFlow === true) {
                    for (const item of data) {
                        const t = {};
                        t.TimeStamp = item.TimeStamp;
                        t.Value = item.ForwardFlow;
                        obj.ListDataLogger.push(t);
                    }
                } else if (channel.ReverseFlow === true) {
                    for (const item of data) {
                        const t = {};
                        t.TimeStamp = item.TimeStamp;
                        t.Value = item.ReverseFlow;
                        obj.ListDataLogger.push(t);
                    }
                }

                result.push(obj);
            }

            return result;
        },
        GetDailyDataByChannelTimeStamp: async (
            parent,
            { channelid, start, end },
            context,
            info,
        ) => {
            const obj = {};

            const channel = await ChannelModel.GetChannelByChannelId(channelid);

            if (channel.length > 0) {
                const data =
                    await DailyDataModel.GetDailyDataByChannelTimeStamp(
                        channel[0].LoggerId,
                        start,
                        end,
                    );

                if (data.length > 0) {
                    obj.ChannelId = channel.ChannelId;
                    obj.ChannelName = channel.ChannelName;
                    obj.Unit = channel.Unit;
                    obj.BaseMin = channel.BaseMin;
                    obj.BaseMax = channel.BaseMax;
                    obj.ListDataLogger = [];
                    if (channel[0].Pressure1 === true) {
                        for (const item of data) {
                            const t = {};
                            t.TimeStamp = item.TimeStamp;
                            t.Value = item.Pressure1;
                            obj.ListDataLogger.push(t);
                        }
                    } else if (channel[0].Pressure2 === true) {
                        for (const item of data) {
                            const t = {};
                            t.TimeStamp = item.TimeStamp;
                            t.Value = item.Pressure2;
                            obj.ListDataLogger.push(t);
                        }
                    } else if (channel[0].ForwardFlow === true) {
                        for (const item of data) {
                            const t = {};
                            t.TimeStamp = item.TimeStamp;
                            t.Value = item.ForwardFlow;
                            obj.ListDataLogger.push(t);
                        }
                    } else if (channel[0].ReverseFlow === true) {
                        for (const item of data) {
                            const t = {};
                            t.TimeStamp = item.TimeStamp;
                            t.Value = item.ReverseFlow;
                            obj.ListDataLogger.push(t);
                        }
                    }
                }
            }

            return obj;
        },
    },
};
