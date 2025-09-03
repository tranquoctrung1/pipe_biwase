const ListPointPipeModel = require('../../models/ListPointPipe.model');

module.exports = {
    Query: {
        GetListPointPipeByPipeId: async (parent, { pipeid }, context, info) => {
            return await ListPointPipeModel.GetListPointPipeByPipeId(pipeid);
        },
    },
    Mutation: {
        UpdateListPointPipe: async (parent, { list }, context, info) => {
            return await ListPointPipeModel.Update(list);
        },
    },
};
