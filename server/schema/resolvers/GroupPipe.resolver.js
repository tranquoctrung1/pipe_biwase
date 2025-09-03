const GroupPipeModel = require('../../models/GroupPipe.model');

module.exports = {
    Query: {
        GetGroupPipes: async (parent, {}, context, info) => {
            return await GroupPipeModel.GetGroupPipes();
        },
    },
    Mutation: {
        InsertGroupPipe: async (parent, { groupPipe }, context, info) => {
            return await GroupPipeModel.Insert(groupPipe);
        },
        UpdateGroupPipe: async (parent, { groupPipe }, context, info) => {
            return await GroupPipeModel.Update(groupPipe);
        },
        DeleteGroupPipe: async (parent, { groupPipe }, context, info) => {
            return await GroupPipeModel.Delete(groupPipe);
        },
    },
};
