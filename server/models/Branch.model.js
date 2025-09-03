const ConnectDB = require('../db/connect');
const { ObjectId } = require('mongodb');

const BranchCollection = 't_branch';

module.exports.Branch = class Branch {
    constructor(_id, BranchId, BranchName) {
        this._id = _id;
        this.BranchId = BranchId;
        this.BranchName = BranchName;
    }
};

module.exports.GetBranchById = async (id) => {
    let Connect = new ConnectDB.Connect();

    let collection = await Connect.connect(BranchCollection);

    let result = await collection
        .find({ _id: new ObjectId(id) })
        .sort({ BranchId: 1 })
        .toArray();

    Connect.disconnect();

    return result;
};

module.exports.GetBranchByBranchId = async (branchid) => {
    let Connect = new ConnectDB.Connect();

    let collection = await Connect.connect(BranchCollection);

    let result = await collection
        .find({ BranchId: branchid })
        .sort({ BranchId: 1 })
        .toArray();

    Connect.disconnect();

    return result;
};

module.exports.GetBranchs = async () => {
    let Connect = new ConnectDB.Connect();

    let collection = await Connect.connect(BranchCollection);

    let result = await collection.find({}).sort({ BranchId: 1 }).toArray();

    Connect.disconnect();

    return result;
};

module.exports.Insert = async (branch) => {
    let Connect = new ConnectDB.Connect();

    let collection = await Connect.connect(BranchCollection);

    let result = await collection.insertOne(branch);

    Connect.disconnect();

    return result.insertedId;
};

module.exports.Update = async (branch) => {
    let Connect = new ConnectDB.Connect();

    let collection = await Connect.connect(BranchCollection);

    let result = await collection.updateMany(
        { _id: new ObjectId(branch._id) },
        {
            $set: {
                BranchName: branch.BranchName,
            },
        },
    );

    Connect.disconnect();

    return result.modifiedCount;
};

module.exports.Delete = async (branch) => {
    let Connect = new ConnectDB.Connect();

    let collection = await Connect.connect(BranchCollection);

    let result = await collection.deleteMany({
        _id: new ObjectId(branch._id),
    });

    Connect.disconnect();

    return result.deletedCount;
};
