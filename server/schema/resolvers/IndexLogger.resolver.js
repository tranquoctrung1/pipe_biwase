const IndexLoggerModel = require('../../models/IndexLogger.model');

module.exports = {
    Query: {
        GetIndexLoggerExactTime: async (
            parent,
            { channelid, time },
            context,
            info,
        ) => {
            return await IndexLoggerModel.GetIndexLoggerExactTime(
                channelid,
                time,
            );
        },
        GetIndexLoggerFilterTime: async (
            parent,
            { channelid, start, end },
            context,
            info,
        ) => {
            return await IndexLoggerModel.GetIndexLoggerFilterTime(
                channelid,
                start,
                end,
            );
        },
    },
};
