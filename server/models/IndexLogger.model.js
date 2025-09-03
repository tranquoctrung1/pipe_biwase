const ConnectDB = require('../db/connect');

const IndexLoggerCollection = `t_Index_Logger_`;

module.exports.IndexLogger = class IndexLogger {
    constructor(_id, TimeStamp, Value) {
        this._id = _id;
        this.TimeStamp = TimeStamp;
        this.Value = Value;
    }
};

module.exports.GetIndexLoggerByTimeStamp = async (channelid, start, end) => {
    try {
        let timestart = new Date(parseInt(start));
        let timeend = new Date(parseInt(end));
        // timestart.setHours(timestart.getHours() + 7);
        timeend.setHours(timeend.getHours() + 1);

        let Connect = new ConnectDB.Connect();

        let collection = await Connect.connect(
            `${IndexLoggerCollection}${channelid}`,
        );

        let result = await collection
            .find({ TimeStamp: { $gte: timestart, $lte: timeend } })
            .sort({ TimeStamp: 1 })
            .toArray();

        Connect.disconnect();

        return result;
    } catch (err) {
        console.log(err);
    }
};

module.exports.GetLatestIndexLoggerByTimeStamp = async (channelid, start) => {
    try {
        let timestart = new Date(parseInt(start));

        let Connect = new ConnectDB.Connect();

        let collection = await Connect.connect(
            `${IndexLoggerCollection}${channelid}`,
        );

        let result = await collection
            .find({ TimeStamp: { $gte: timestart } })
            .sort({ TimeStamp: -1 })
            .toArray();

        Connect.disconnect();

        return result;
    } catch (err) {
        console.log(err);
    }
};

module.exports.GetIndexLoggerExactTime = async (channelid, time) => {
    try {
        let timestart = new Date(parseInt(time));

        let Connect = new ConnectDB.Connect();

        let collection = await Connect.connect(
            `${IndexLoggerCollection}${channelid}`,
        );

        let result = await collection
            .find({ TimeStamp: { $gte: timestart } })
            .sort({ TimeStamp: 1 })
            .limit(1)
            .toArray();

        Connect.disconnect();

        return result;
    } catch (err) {
        console.log(err);
    }
};

module.exports.GetIndexLoggerFilterTime = async (channelid, start, end) => {
    try {
        let timestart = new Date(parseInt(start));
        let timeend = new Date(parseInt(end));
        timestart.setHours(timestart.getHours() - 2);
        timeend.setHours(timeend.getHours());

        let Connect = new ConnectDB.Connect();

        let collection = await Connect.connect(
            `${IndexLoggerCollection}${channelid}`,
        );

        let result = await collection
            .aggregate([
                {
                    $match: {
                        TimeStamp: {
                            $gte: timestart,
                            $lte: timeend,
                        },
                    },
                },
                {
                    $addFields: {
                        minute: { $minute: '$TimeStamp' },
                        second: { $second: '$TimeStamp' },
                    },
                },
                {
                    $match: {
                        minute: 0,
                        second: 0,
                    },
                },
                {
                    $project: {
                        minute: 0,
                        second: 0,
                    },
                },
            ])
            .toArray();

        Connect.disconnect();

        return result;
    } catch (err) {
        console.log(err);
    }
};
