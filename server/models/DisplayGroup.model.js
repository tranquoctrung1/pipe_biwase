const ConnectDB = require('../db/connect');
const { ObjectId } = require('mongodb');

const DisplayGroupCollection = 't_DisplayGroups';

module.exports.NoteType = class NoteType {
    constructor(_id, Group, Name) {
        this._id = _id;
        this.Group = Group;
        this.Name = Name;
    }
};

module.exports.GetDisplayGroups = async () => {
    let Connect = new ConnectDB.Connect();

    let collection = await Connect.connect(DisplayGroupCollection);

    let result = await collection.find({}).sort({ Group: 1 }).toArray();

    Connect.disconnect();

    return result;
};

module.exports.Insert = async (displayGroup) => {
    let Connect = new ConnectDB.Connect();

    let collection = await Connect.connect(DisplayGroupCollection);

    let result = await collection.insertOne(displayGroup);

    Connect.disconnect();

    return result.insertedId;
};

module.exports.Update = async (displayGroup) => {
    let Connect = new ConnectDB.Connect();

    let collection = await Connect.connect(DisplayGroupCollection);

    let result = await collection.updateMany(
        { _id: new ObjectId(displayGroup._id) },
        {
            $set: {
                Group: displayGroup.Group,
                Name: displayGroup.Name,
            },
        },
    );

    Connect.disconnect();

    return result.modifiedCount;
};

module.exports.Delete = async (displayGroup) => {
    let Connect = new ConnectDB.Connect();

    let collection = await Connect.connect(DisplayGroupCollection);

    let result = await collection.deleteMany({
        _id: new ObjectId(displayGroup._id),
    });

    Connect.disconnect();

    return result.deletedCount;
};
