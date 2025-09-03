const ConnectDB = require('../db/connect');
const { ObjectId } = require('mongodb');

const PipeCollection = 't_Pipe';

module.exports.Pipe = class Pipe {
    constructor(
        _id,
        PipeId,
        Name,
        Description,
        GroupPipeId,
        Size,
        Length,
        TypeChannelAlarm,
        BaseMin,
        BaseMax,
        ColorBaseMax,
        ColorBaseMin,
        SetPrioritize,
    ) {
        this._id = _id;
        this.PipeId = PipeId;
        this.Name = Name;
        this.Description = Description;
        this.GroupPipeId = GroupPipeId;
        this.Size = Size;
        this.Length = Length;
        this.TypeChannelAlarm = TypeChannelAlarm;
        this.BaseMax = BaseMax;
        this.BaseMin = BaseMin;
        this.ColorBaseMax = ColorBaseMax;
        this.ColorBaseMin = ColorBaseMin;
        this.SetPrioritize = SetPrioritize;
    }
};

module.exports.GetPipes = async () => {
    let Connect = new ConnectDB.Connect();

    let collection = await Connect.connect(PipeCollection);

    let result = await collection.find({}).sort({ PipeId: 1 }).toArray();

    Connect.disconnect();

    return result;
};

module.exports.Insert = async (pipe) => {
    let Connect = new ConnectDB.Connect();

    let collection = await Connect.connect(PipeCollection);

    pipe.SetPrioritize =
        pipe.SetPrioritize !== undefined
            ? +pipe.SetPrioritize
            : pipe.SetPrioritize;

    let result = await collection.insertOne(pipe);

    Connect.disconnect();

    return result.insertedId;
};

module.exports.Update = async (pipe) => {
    let Connect = new ConnectDB.Connect();

    let collection = await Connect.connect(PipeCollection);

    let result = await collection.updateMany(
        { _id: new ObjectId(pipe._id) },
        {
            $set: {
                PipeId: pipe.PipeId,
                Name: pipe.Name,
                Description: pipe.Description,
                GroupPipeId: pipe.GroupPipeId,
                Size: pipe.Size,
                Length: pipe.Length,
                TypeChannelAlarm: pipe.TypeChannelAlarm,
                BaseMax: pipe.BaseMax,
                BaseMin: pipe.BaseMin,
                ColorBaseMax: pipe.ColorBaseMax,
                ColorBaseMin: pipe.ColorBaseMin,
                SetPrioritize:
                    pipe.SetPrioritize !== undefined
                        ? +pipe.SetPrioritize
                        : pipe.SetPrioritize,
            },
        },
    );

    Connect.disconnect();

    return result.modifiedCount;
};

module.exports.Delete = async (pipe) => {
    let Connect = new ConnectDB.Connect();

    let collection = await Connect.connect(PipeCollection);

    let result = await collection.deleteMany({
        _id: new ObjectId(pipe._id),
    });

    Connect.disconnect();

    return result.deletedCount;
};
