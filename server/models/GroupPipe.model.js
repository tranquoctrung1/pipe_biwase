const ConnectDB = require('../db/connect');
const { ObjectId } = require('mongodb');

const GroupPipeCollection = 't_GroupPipe';

module.exports.GroupPipe = class GroupPipe {
    constructor(
        _id,
        GroupPipeId,
        Name,
        Description,
        Color,
        SiteIdStart,
        SiteIdEnd,
    ) {
        this._id = _id;
        this.GroupPipeId = GroupPipeId;
        this.Name = Name;
        this.Description = Description;
        this.Color = Color;
        this.SiteIdStart = SiteIdStart;
        this.SiteIdEnd = SiteIdEnd;
    }
};

module.exports.GetGroupPipes = async () => {
    let Connect = new ConnectDB.Connect();

    let collection = await Connect.connect(GroupPipeCollection);

    let result = await collection.find({}).sort({ GroupPipeId: 1 }).toArray();

    Connect.disconnect();

    return result;
};

module.exports.Insert = async (groupPipe) => {
    let Connect = new ConnectDB.Connect();

    let collection = await Connect.connect(GroupPipeCollection);

    let result = await collection.insertOne(groupPipe);

    Connect.disconnect();

    return result.insertedId;
};

module.exports.Update = async (groupPipe) => {
    let Connect = new ConnectDB.Connect();

    let collection = await Connect.connect(GroupPipeCollection);

    let result = await collection.updateMany(
        { _id: new ObjectId(groupPipe._id) },
        {
            $set: {
                GroupPipeId: groupPipe.GroupPipeId,
                Name: groupPipe.Name,
                Description: groupPipe.Description,
                Color: groupPipe.Color,
                SiteIdStart: groupPipe.SiteIdStart,
                SiteIdEnd: groupPipe.SiteIdEnd,
            },
        },
    );

    Connect.disconnect();

    return result.modifiedCount;
};

module.exports.Delete = async (groupPipe) => {
    let Connect = new ConnectDB.Connect();

    let collection = await Connect.connect(GroupPipeCollection);

    let result = await collection.deleteMany({
        _id: new ObjectId(groupPipe._id),
    });

    Connect.disconnect();

    return result.deletedCount;
};
