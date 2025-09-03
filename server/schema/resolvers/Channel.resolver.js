const ChannelConfigModel = require('../../models/Channel.model');

module.exports = {
    Query: {
        GetChannels: async (parent, {}, context, info) => {
            return await ChannelConfigModel.GetChannels();
        },
        GetChannelByLoggerId: async (parent, { loggerid }, context, info) => {
            return await ChannelConfigModel.GetChannelByLoggerId(loggerid);
        },
    },
    Mutation: {
        InsertChannel: async (parent, { channel }, context, info) => {
            return await ChannelConfigModel.Insert(channel);
        },
        UpdateChannel: async (parent, { channel }, context, info) => {
            return await ChannelConfigModel.Update(channel);
        },
        UpdateValueChannel: async (parent, { channel }, context, info) => {
            return await ChannelConfigModel.UpdateValue(channel);
        },
        DeleteChannel: async (parent, { channel }, context, info) => {
            return await ChannelConfigModel.Delete(channel);
        },
    },
};
