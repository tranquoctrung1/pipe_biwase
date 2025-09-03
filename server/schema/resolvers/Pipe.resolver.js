const PipeModel = require('../../models/Pipe.model');

module.exports = {
    Query: {
        GetPipes: async (parent, {}, context, info) => {
            return await PipeModel.GetPipes();
        },
    },
    Mutation: {
        InsertPipe: async (parent, { pipe }, context, info) => {
            return await PipeModel.Insert(pipe);
        },
        UpdatePipe: async (parent, { pipe }, context, info) => {
            return await PipeModel.Update(pipe);
        },
        DeletePipe: async (parent, { pipe }, context, info) => {
            return await PipeModel.Delete(pipe);
        },
    },
};
