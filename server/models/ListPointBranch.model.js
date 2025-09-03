const ConnectDB = require('../db/connect');
const { ObjectId } = require('mongodb');

const ListPointBranchCollection = 't_ListPointBranch';

module.exports.ListPointBranch = class ListPointBranch {
    constructor(_id, PointId, BranchId, Level) {
        this._id = _id;
        this.PointId = PointId;
        this.BranchId = BranchId;
        this.Level = Level;
    }
};

module.exports.GetListPointBranchs = async () => {
    let Connect = new ConnectDB.Connect();

    let collection = await Connect.connect(ListPointBranchCollection);

    let result = await collection.find({}).sort({ Level: 1 }).toArray();

    Connect.disconnect();

    return result;
};

module.exports.GetListPointBranchByBranchId = async (branchid) => {
    let Connect = new ConnectDB.Connect();

    let collection = await Connect.connect(ListPointBranchCollection);

    let result = await collection
        .find({ BranchId: branchid })
        .sort({ STT: 1 })
        .toArray();

    Connect.disconnect();

    return result;
};

module.exports.Update = async (list) => {
    let Connect = new ConnectDB.Connect();

    let collection = await Connect.connect(ListPointBranchCollection);

    await collection.deleteMany({
        BranchId: list.BranchId,
        Level: list.Data[0].Level,
    });

    const result = await collection.insertMany(list.Data);

    Connect.disconnect();

    return result.insertedCount;
};
