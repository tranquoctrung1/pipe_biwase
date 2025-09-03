const ListPointBranchModel = require('../../models/ListPointBranch.model');

module.exports = {
    Query: {
        GetListPointBranchByBranchId: async (
            parent,
            { branchid },
            context,
            info,
        ) => {
            return await ListPointBranchModel.GetListPointBranchByBranchId(
                branchid,
            );
        },
    },
    Mutation: {
        UpdateListPointBranch: async (parent, { list }, context, info) => {
            return await ListPointBranchModel.Update(list);
        },
    },
};
