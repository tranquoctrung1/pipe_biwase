const SiteModel = require('../../models/Site.model');
const IndexLoggerModel = require('../../models/IndexLogger.model');
const ManualIndexModel = require('../../models/ManualIndex.model');
const ChannelModel = require('../../models/Channel.model');

module.exports = {
    Query: {
        GetDataQuantityAndIndexManual: async (
            parent,
            { time },
            context,
            info,
        ) => {
            const result = [];

            const start = new Date(parseInt(time));
            start.setHours(start.getHours() - 2);
            const end = new Date(parseInt(time));
            end.setHours(end.getHours() + 2);

            const sites = await SiteModel.GetSiteIsMeterForIndexManual();

            const listManual = await ManualIndexModel.GetDataIndexManuals();

            for (const site of sites) {
                if (site.SiteId !== '') {
                    const obj = {};
                    obj.SiteId = site.SiteId;
                    obj.Location = site.Location;
                    obj.Quantity = null;
                    obj.IdManualIndex = '';
                    obj.IndexManual = null;

                    let listIndexForwardFlow = [];
                    let listIndexReverseFlow = [];

                    let quantity = null;

                    // calc quantity
                    if (
                        site.LoggerId !== null &&
                        site.LoggerId !== undefined &&
                        site.LoggerId !== ''
                    ) {
                        const channels =
                            await ChannelModel.GetChannelByLoggerId(
                                site.LoggerId,
                            );

                        if (channels.length > 0) {
                            const channelForward = channels.find(
                                (el) => el.ForwardFlow === true,
                            );
                            const channelReverse = channels.find(
                                (el) => el.ReverseFlow === true,
                            );

                            if (channelForward !== undefined) {
                                if (
                                    channelForward.ChannelId !== null &&
                                    channelForward.ChannelId !== undefined &&
                                    channelForward.ChannelId !== ''
                                ) {
                                    listIndexForwardFlow =
                                        await IndexLoggerModel.GetIndexLoggerByTimeStamp(
                                            channelForward.ChannelId,
                                            start.getTime(),
                                            end.getTime(),
                                        );
                                }
                            }

                            if (channelReverse !== undefined) {
                                if (
                                    channelReverse.ChannelId !== null &&
                                    channelReverse.ChannelId !== undefined &&
                                    channelReverse.ChannelId !== ''
                                ) {
                                    listIndexReverseFlow =
                                        await IndexLoggerModel.GetIndexLoggerByTimeStamp(
                                            channelReverse.ChannelId,
                                            start.getTime(),
                                            end.getTime(),
                                        );
                                }
                            }
                        }

                        let checkForward = false;
                        let checkReverse = false;

                        let t1 = new Date(parseInt(time));
                        let t2 = new Date(parseInt(time));
                        let t3 = new Date(parseInt(time));
                        let t4 = new Date(parseInt(time));

                        t1.setHours(t1.getHours() - 1);

                        t4.setHours(t4.getHours() + 1);

                        let indexForwardStart = 0;
                        let indexForwardEnd = 0;
                        let indexReverseStart = 0;
                        let indexReverseEnd = 0;

                        const fowardStart = listIndexForwardFlow.find(
                            (el) =>
                                el.TimeStamp.getTime() >= t1.getTime() &&
                                el.TimeStamp.getTime() <= t2.getTime(),
                        );
                        if (fowardStart !== undefined) {
                            indexForwardStart = fowardStart.Value;
                            checkForward = true;
                        }

                        const forwardEnd = listIndexForwardFlow.find(
                            (el) =>
                                el.TimeStamp.getTime() >= t3.getTime() &&
                                el.TimeStamp.getTime() <= t4.getTime(),
                        );
                        if (forwardEnd !== undefined) {
                            indexForwardEnd = forwardEnd.Value;
                            checkForward = true;
                        }

                        const reverseStart = listIndexReverseFlow.find(
                            (el) =>
                                el.TimeStamp.getTime() >= t1.getTime() &&
                                el.TimeStamp.getTime() <= t2.getTime(),
                        );
                        if (reverseStart !== undefined) {
                            indexReverseStart = reverseStart.Value;
                            checkReverse = true;
                        }

                        const reverseEnd = listIndexReverseFlow.find(
                            (el) =>
                                el.TimeStamp.getTime() >= t3.getTime() &&
                                el.TimeStamp.getTime() <= t4.getTime(),
                        );

                        if (reverseEnd !== undefined) {
                            indexReverseEnd = reverseEnd.Value;
                            checkReverse = true;
                        }

                        if (checkForward === true) {
                            if (
                                indexForwardEnd !== null &&
                                indexForwardStart !== null
                            ) {
                                quantity += indexForwardEnd;
                                quantity -= indexForwardStart;
                            }
                        }

                        if (checkReverse === true) {
                            if (
                                indexReverseEnd !== null &&
                                indexReverseStart !== null
                            ) {
                                quantity -= indexReverseEnd;
                                quantity += indexReverseStart;
                            }
                        }

                        if (quantity < 0) {
                            quantity = null;
                        }

                        obj.Quantity = quantity;
                    }

                    // get manual index

                    const tempTime = new Date(parseInt(time));
                    const findIndex = listManual.find(
                        (el) =>
                            el.SiteId === site.SiteId &&
                            el.TimeStamp.getTime() === tempTime.getTime(),
                    );

                    if (findIndex !== undefined) {
                        obj.IdManualIndex = findIndex._id;
                        obj.IndexManual = findIndex.Value;
                    }

                    result.push(obj);
                }
            }

            return result;
        },
    },
};
