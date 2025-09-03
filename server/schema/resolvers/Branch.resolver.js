const BranchModel = require('../../models/Branch.model');

module.exports = {
    Query: {
        GetBranchs: async (parent, {}, context, info) => {
            return await BranchModel.GetBranchs();
        },
    },
    Mutation: {
        InsertBranch: async (parent, { branch }, context, info) => {
            return await BranchModel.Insert(branch);
        },
        UpdateBranch: async (parent, { branch }, context, info) => {
            return await BranchModel.Update(branch);
        },
        DeleteBranch: async (parent, { branch }, context, info) => {
            return await BranchModel.Delete(branch);
        },
    },
};
