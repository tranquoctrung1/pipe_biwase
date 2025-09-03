const ConnectDB = require('../db/connect');
const { ObjectId } = require('mongodb');

const ListPointPipeCollection = 't_ListPointPipe';

module.exports.ListPointPipe = class ListPointPipe {
    constructor(_id, PointId, PipeId, STT) {
        this._id = _id;
        this.PointId = PointId;
        this.PipeId = PipeId;
        this.STT = STT;
    }
};

module.exports.GetListPointPipes = async () => {
    let Connect = new ConnectDB.Connect();

    let collection = await Connect.connect(ListPointPipeCollection);

    let result = await collection.find({}).sort({ STT: 1 }).toArray();

    Connect.disconnect();

    return result;
};

module.exports.GetListPointPipeByPipeId = async (pipeid) => {
    let Connect = new ConnectDB.Connect();

    let collection = await Connect.connect(ListPointPipeCollection);

    let result = await collection
        .find({ PipeId: pipeid })
        .sort({ STT: 1 })
        .toArray();

    Connect.disconnect();

    return result;
};

module.exports.Update = async (list) => {
    let Connect = new ConnectDB.Connect();

    let collection = await Connect.connect(ListPointPipeCollection);

    await collection.deleteMany({ PipeId: list.PipeId });

    const result = await collection.insertMany(list.Data);

    Connect.disconnect();

    return result.insertedCount;
};
