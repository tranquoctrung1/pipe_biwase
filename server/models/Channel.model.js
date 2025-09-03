const ConnectDB = require('../db/connect');
const { ObjectId } = require('mongodb');

const { MongoClient } = require('mongodb');
require('dotenv').config();

const ChannelConfigCollection = 't_Channel_Configurations';

module.exports.Site = class Site {
    constructor(
        _id,
        ChannelId,
        ChannelName,
        LoggerId,
        Unit,
        Pressure1,
        Pressure2,
        ForwardFlow,
        ReverseFlow,
        BaseLine,
        BaseMax,
        BaseMin,
        OtherChannel,
        TimeStamp,
        LastValue,
        IndexTimeStamp,
        LastIndex,
    ) {
        this._id = _id;
        this.ChannelId = ChannelId;
        this.ChannelName = ChannelName;
        this.LoggerId = LoggerId;
        this.Unit = Unit;
        this.Pressure1 = Pressure1;
        this.Pressure2 = Pressure2;
        this.ForwardFlow = ForwardFlow;
        this.ReverseFlow = ReverseFlow;
        this.BaseLine = BaseLine;
        this.BaseMin = BaseMin;
        this.BaseMax = BaseMax;
        this.OtherChannel = OtherChannel;
        this.TimeStamp = TimeStamp;
        this.LastValue = LastValue;
        this.IndexTimeStamp = IndexTimeStamp;
        this.LastIndex = LastIndex;
    }
};

module.exports.GetChannels = async () => {
    let Connect = new ConnectDB.Connect();

    let collection = await Connect.connect(ChannelConfigCollection);

    let result = await collection.find({}).sort({ ChannelId: 1 }).toArray();

    Connect.disconnect();

    return result;
};

module.exports.GetChannelByLoggerId = async (loggerid) => {
    let Connect = new ConnectDB.Connect();

    let collection = await Connect.connect(ChannelConfigCollection);

    let result = await collection
        .find({ LoggerId: loggerid })
        .sort({ ChannelId: 1 })
        .toArray();

    Connect.disconnect();

    return result;
};

module.exports.GetChannelByChannelId = async (channelid) => {
    let Connect = new ConnectDB.Connect();

    let collection = await Connect.connect(ChannelConfigCollection);

    let result = await collection
        .find({ ChannelId: channelid })
        .sort({ ChannelId: 1 })
        .toArray();

    Connect.disconnect();

    return result;
};

module.exports.Insert = async (channel) => {
    let Connect = new ConnectDB.Connect();

    let collection = await Connect.connect(ChannelConfigCollection);

    let result = await collection.insertOne(channel);

    await Connect.createCollection(`t_Data_Logger_${channel.ChannelId}`);

    await Connect.createCollection(`t_Index_Logger_${channel.ChannelId}`);

    await Connect.createIndex(`t_Data_Logger_${channel.ChannelId}`);

    await Connect.createIndex(`t_Index_Logger_${channel.ChannelId}`);

    Connect.disconnect();

    return result.insertedId;
};

module.exports.Update = async (channel) => {
    let Connect = new ConnectDB.Connect();

    let collection = await Connect.connect(ChannelConfigCollection);

    let result = await collection.updateMany(
        { _id: new ObjectId(channel._id) },
        {
            $set: {
                ChannelId: channel.ChannelId,
                ChannelName: channel.ChannelName,
                LoggerId: channel.LoggerId,
                Unit: channel.Unit,
                Pressure1: channel.Pressure1,
                Pressure2: channel.Pressure2,
                ForwardFlow: channel.ForwardFlow,
                ReverseFlow: channel.ReverseFlow,
                OtherChannel: channel.OtherChannel,
                BaseMin: channel.BaseMin,
                BaseMax: channel.BaseMax,
                BaseLine: channel.BaseLine,
            },
        },
    );

    Connect.disconnect();

    return result.modifiedCount;
};

module.exports.UpdateValue = async (channel) => {
    let Connect = new ConnectDB.Connect();

    let collection = await Connect.connect(ChannelConfigCollection);

    let result = await collection.updateMany(
        { ChannelId: channel.ChannelId },
        {
            $set: {
                LastValue: channel.Value,
                TimeStamp: channel.TimeStamp
                    ? new Date(channel.TimeStamp)
                    : null,
            },
        },
    );

    Connect.disconnect();

    return result.modifiedCount;
};

module.exports.Delete = async (channel) => {
    let Connect = new ConnectDB.Connect();

    let collection = await Connect.connect(ChannelConfigCollection);

    let result = await collection.deleteMany({
        _id: new ObjectId(channel._id),
    });

    await Connect.deleteCollection(`t_Data_Logger_${channel.ChannelId}`);

    await Connect.deleteCollection(`t_Index_Logger_${channel.ChannelId}`);

    Connect.disconnect();

    return result.deletedCount;
};
