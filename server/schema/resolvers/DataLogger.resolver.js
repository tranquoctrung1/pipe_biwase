const DataLoggerModel = require('../../models/DataLogger.model');
const ChannelModel = require('../../models/Channel.model');

module.exports = {
    Query: {
        GetDataLoggerByCurrentTime: async (
            parnet,
            { channelid },
            context,
            info,
        ) => {
            let channel = await ChannelModel.GetChannelByChannelId(channelid);

            let obj = {};
            if (channel.length > 0) {
                obj.ChannelId = channel[0].ChannelId;
                obj.ChannelName = channel[0].ChannelName;
                obj.Unit = channel[0].Unit;
                obj.BaseMin = channel[0].BaseMin;
                obj.BaseMax = channel[0].BaseMax;
            }

            obj.ListDataLogger =
                await DataLoggerModel.GetDataLoggerByCurrentTime(channelid);

            return obj;
        },

        GetDataLoggerByTimeStamp: async (
            parent,
            { channelid, start, end },
            context,
            info,
        ) => {
            let channel = await ChannelModel.GetChannelByChannelId(channelid);
            let obj = {};

            if (channel.length > 0) {
                obj.ChannelId = channel[0].ChannelId;
                obj.ChannelName = channel[0].ChannelName;
                obj.Unit = channel[0].Unit;
                obj.BaseMin = channel[0].BaseMin;
                obj.BaseMax = channel[0].BaseMax;
            }

            obj.ListDataLogger = await DataLoggerModel.GetDataLoggerByTimeStamp(
                channelid,
                start,
                end,
            );

            return obj;
        },
        GetDataLoggerByCurrentTimeForManualData: async (
            parent,
            { channelid },
            context,
            info,
        ) => {
            return await DataLoggerModel.GetDataLoggerByCurrentTimeForManualData(
                channelid,
            );
        },
        GetDataLoggerByTimeStampForManualData: async (
            parent,
            { channelid, start, end },
            context,
            info,
        ) => {
            return await DataLoggerModel.GetDataLoggerByTimeStampForManualData(
                channelid,
                start,
                end,
            );
        },
        GetDataLoggerOfSiteCurrentTime: async (
            parent,
            { loggerid },
            context,
            info,
        ) => {
            const result = [];

            const channels = await ChannelModel.GetChannelByLoggerId(loggerid);

            for (const channel of channels) {
                const obj = {};
                obj.ChannelId = channel.ChannelId;
                obj.ChannelName = channel.ChannelName;
                obj.Unit = channel.Unit;
                obj.BaseMin = channel.BaseMin;
                obj.BaseMax = channel.BaseMax;

                obj.ListDataLogger =
                    await DataLoggerModel.GetDataLoggerByCurrentTime(
                        channel.ChannelId,
                    );

                result.push(obj);
            }

            return result;
        },
        GetDataLoggerOfSiteByTimeStamp: async (
            parent,
            { loggerid, start, end },
            context,
            info,
        ) => {
            const result = [];

            const channels = await ChannelModel.GetChannelByLoggerId(loggerid);

            for (const channel of channels) {
                const obj = {};
                obj.ChannelId = channel.ChannelId;
                obj.ChannelName = channel.ChannelName;
                obj.Unit = channel.Unit;
                obj.BaseMin = channel.BaseMin;
                obj.BaseMax = channel.BaseMax;

                obj.ListDataLogger =
                    await DataLoggerModel.GetDataLoggerByTimeStamp(
                        channel.ChannelId,
                        start,
                        end,
                    );

                result.push(obj);
            }

            return result;
        },

        GetDataLoggerPressureByLoggerId: async (
            parent,
            { loggerid, start, end },
            context,
            info,
        ) => {
            const result = [];

            const channels = await ChannelModel.GetChannelByLoggerId(loggerid);

            for (const channel of channels) {
                if (channel.Pressure1 === true || channel.Pressure2 === true) {
                    result.push(
                        ...(await DataLoggerModel.GetDataLoggerByTimeStamp(
                            channel.ChannelId,
                            start,
                            end,
                        )),
                    );

                    break;
                }
            }

            return result;
        },
    },

    Mutation: {
        InsertDataLogger: async (parent, { data }, context, info) => {
            const id = await DataLoggerModel.Insert(data);

            const start = new Date(data.TimeStamp).getTime().toString();

            const list = await DataLoggerModel.GetDataLoggerByGreaterThanTime(
                data.ChannelId,
                start,
            );

            if (list.length <= 0) {
                await ChannelModel.UpdateValue(data);
            }

            return id;
        },
        UpdateDataLogger: async (parent, { data }, context, info) => {
            const nRows = await DataLoggerModel.Update(data);

            const start = new Date(data.TimeStamp).getTime().toString();

            const list = await DataLoggerModel.GetDataLoggerByGreaterThanTime(
                data.ChannelId,
                start,
            );

            if (list.length <= 0) {
                await ChannelModel.UpdateValue(data);
            }

            return nRows;
        },
        DeleteDataLogger: async (parent, { data }, context, info) => {
            const nRows = await DataLoggerModel.Delete(data);

            const start = new Date(data.TimeStamp).getTime().toString();

            const list = await DataLoggerModel.GetDataLoggerByGreaterThanTime(
                data.ChannelId,
                start,
            );

            if (list.length <= 0) {
                const lastReCord =
                    await DataLoggerModel.GetLastRecordDataLogger(
                        data.ChannelId,
                    );

                const obj = {
                    ChannelId: data.ChannelId,
                    TimeStamp: lastReCord[0].TimeStamp,
                    Value: lastReCord[0].Value,
                };

                await ChannelModel.UpdateValue(obj);
            }

            return nRows;
        },
    },
};
