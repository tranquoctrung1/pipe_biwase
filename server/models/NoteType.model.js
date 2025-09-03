const ConnectDB = require('../db/connect');

const NoteTypeCollection = 't_NodeType';

module.exports.NoteType = class NoteType {
    constructor(_id, Type, Name) {
        this._id = _id;
        this.Type = Type;
        this.Name = Name;
    }
};

module.exports.GetNodeTypes = async () => {
    let Connect = new ConnectDB.Connect();

    let collection = await Connect.connect(NoteTypeCollection);

    let result = await collection.find({}).sort({ Type: 1 }).toArray();

    Connect.disconnect();

    return result;
};
