const ConnectDB = require('../db/connect');
const { ObjectId } = require('mongodb');

const DataManualCollection = `t_Data_Manual`;

module.exports.DataManual = class DataManual {
    constructor(_id, SiteId, TimeStamp, Value) {
        this._id = _id;
        this.TimeStamp = TimeStamp;
        this.Value = Value;
        this.SiteId = SiteId;
    }
};

module.exports.GetDataManuals = async () => {
    let Connect = new ConnectDB.Connect();

    let collection = await Connect.connect(DataManualCollection);

    let result = await collection.find({}).sort({ TimeStamp: 1 }).toArray();

    Connect.disconnect();

    return result;
};

module.exports.GetDataManualBySiteId = async (siteid) => {
    let Connect = new ConnectDB.Connect();

    let collection = await Connect.connect(DataManualCollection);

    let result = await collection
        .find({ SiteId: siteid })
        .sort({ TimeStamp: 1 })
        .toArray();

    Connect.disconnect();

    return result;
};

module.exports.GetDataManualBySiteIdAndTimeStamp = async (
    siteid,
    start,
    end,
) => {
    let timestart = new Date(parseInt(start));
    let timeend = new Date(parseInt(end));

    let Connect = new ConnectDB.Connect();

    let collection = await Connect.connect(DataManualCollection);

    let result = await collection
        .find({ SiteId: siteid, TimeStamp: { $gte: timestart, $lte: timeend } })
        .sort({ TimeStamp: 1 })
        .toArray();

    Connect.disconnect();

    return result;
};

module.exports.Insert = async (data) => {
    let Connect = new ConnectDB.Connect();

    let collection = await Connect.connect(DataManualCollection);

    data.TimeStamp = data.TimeStamp ? new Date(data.TimeStamp) : null;

    let result = await collection.insertOne(data);

    Connect.disconnect();

    return result.insertedId;
};

module.exports.Update = async (data) => {
    let Connect = new ConnectDB.Connect();

    let collection = await Connect.connect(DataManualCollection);

    let result = await collection.updateMany(
        { _id: new ObjectId(data._id) },
        {
            $set: {
                TimeStamp: data.TimeStamp ? new Date(data.TimeStamp) : null,
                Value: data.Value,
            },
        },
    );

    Connect.disconnect();

    return result.modifiedCount;
};

module.exports.Delete = async (data) => {
    let Connect = new ConnectDB.Connect();

    let collection = await Connect.connect(DataManualCollection);

    let result = await collection.deleteMany({
        _id: new ObjectId(data._id),
    });

    Connect.disconnect();

    return result.deletedCount;
};
