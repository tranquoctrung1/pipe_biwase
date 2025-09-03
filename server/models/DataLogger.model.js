const ConnectDB = require('../db/connect');
const { ObjectId } = require('mongodb');

const DataLoggerCollection = `t_Data_Logger_`;

module.exports.DataLogger = class DataLogger {
    constructor(_id, TimeStamp, Value) {
        this._id = _id;
        this.TimeStamp = TimeStamp;
        this.Value = Value;
    }
};

module.exports.GetDataLoggerByCurrentTime = async (channelid) => {
    let Connect = new ConnectDB.Connect();

    let collection = await Connect.connect(
        `${DataLoggerCollection}${channelid}`,
    );

    let result = await collection
        .find({})
        .sort({ TimeStamp: -1 })
        .limit(500)
        .toArray();

    Connect.disconnect();

    return result;
};

module.exports.GetDataLoggerByCurrentTimeForManualData = async (channelid) => {
    let Connect = new ConnectDB.Connect();

    let collection = await Connect.connect(
        `${DataLoggerCollection}${channelid}`,
    );

    let result = await collection
        .find({})
        .sort({ TimeStamp: -1 })
        .limit(100)
        .toArray();

    Connect.disconnect();

    return result;
};

module.exports.GetDataLoggerByTimeStampNotParseDate = async (
    channelid,
    start,
    end,
) => {
    try {
        let Connect = new ConnectDB.Connect();

        let collection = await Connect.connect(
            `${DataLoggerCollection}${channelid}`,
        );

        let result = await collection
            .find({ TimeStamp: { $gte: start, $lte: end } })
            .sort({ TimeStamp: 1 })
            .toArray();

        Connect.disconnect();

        return result;
    } catch (err) {
        console.log(err);
    }
};

module.exports.GetDataLoggerByTimeStamp = async (channelid, start, end) => {
    try {
        let timestart = new Date(parseInt(start));
        let timeend = new Date(parseInt(end));
        timestart.setHours(timestart.getHours());
        timeend.setHours(timeend.getHours());

        let Connect = new ConnectDB.Connect();

        let collection = await Connect.connect(
            `${DataLoggerCollection}${channelid}`,
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

module.exports.GetDataLoggerByTimeStampForCalcQuantity = async (
    channelid,
    start,
    end,
) => {
    try {
        let Connect = new ConnectDB.Connect();

        let timestart = new Date(parseInt(start));
        let timeend = new Date(parseInt(end));

        let collection = await Connect.connect(
            `${DataLoggerCollection}${channelid}`,
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

module.exports.GetDataLoggerByTimeStampForManualData = async (
    channelid,
    start,
    end,
) => {
    try {
        let timestart = new Date(parseInt(start));
        let timeend = new Date(parseInt(end));

        let Connect = new ConnectDB.Connect();

        let collection = await Connect.connect(
            `${DataLoggerCollection}${channelid}`,
        );

        let result = await collection
            .find({ TimeStamp: { $gte: timestart, $lte: timeend } })
            .sort({ TimeStamp: -1 })
            .toArray();

        Connect.disconnect();

        return result;
    } catch (err) {
        console.log(err);
    }
};

module.exports.GetDataLoggerByGreaterThanTime = async (channelid, start) => {
    try {
        let timestart = new Date(parseInt(start));

        let Connect = new ConnectDB.Connect();

        let collection = await Connect.connect(
            `${DataLoggerCollection}${channelid}`,
        );

        let result = await collection
            .find({ TimeStamp: { $gt: timestart } })
            .sort({ TimeStamp: -1 })
            .toArray();

        Connect.disconnect();

        return result;
    } catch (err) {
        console.log(err);
    }
};

module.exports.GetLastRecordDataLogger = async (channelid) => {
    try {
        let Connect = new ConnectDB.Connect();

        let collection = await Connect.connect(
            `${DataLoggerCollection}${channelid}`,
        );

        let result = await collection
            .find({})
            .sort({ TimeStamp: -1 })
            .limit(1)
            .toArray();

        Connect.disconnect();

        return result;
    } catch (err) {
        console.log(err);
    }
};

module.exports.Insert = async (data) => {
    let Connect = new ConnectDB.Connect();

    let collection = await Connect.connect(
        `${DataLoggerCollection}${data.ChannelId}`,
    );

    data.TimeStamp = data.TimeStamp ? new Date(data.TimeStamp) : null;

    const obj = {
        TimeStamp: data.TimeStamp,
        Value: data.Value,
    };

    let result = await collection.insertOne(obj);

    Connect.disconnect();

    return result.insertedId;
};

module.exports.Update = async (data) => {
    let Connect = new ConnectDB.Connect();

    let collection = await Connect.connect(
        `${DataLoggerCollection}${data.ChannelId}`,
    );

    let result = await collection.updateMany(
        { _id: new ObjectId(data._id) },
        {
            $set: {
                Value: data.Value,
            },
        },
    );

    Connect.disconnect();

    return result.modifiedCount;
};

module.exports.Delete = async (data) => {
    let Connect = new ConnectDB.Connect();

    let collection = await Connect.connect(
        `${DataLoggerCollection}${data.ChannelId}`,
    );

    let result = await collection.deleteMany({
        _id: new ObjectId(data._id),
    });

    Connect.disconnect();

    return result.deletedCount;
};
