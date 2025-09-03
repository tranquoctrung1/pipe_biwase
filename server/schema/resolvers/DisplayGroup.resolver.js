const DisplayGroupModel = require('../../models/DisplayGroup.model');

module.exports = {
    Query: {
        GetDisplayGroups: async (parent, {}, context, info) => {
            return await DisplayGroupModel.GetDisplayGroups();
        },
    },
    Mutation: {
        InsertDisplayGroup: async (parent, { displayGroup }, context, info) => {
            return await DisplayGroupModel.Insert(displayGroup);
        },
        UpdateDisplayGroup: async (parent, { displayGroup }, context, info) => {
            return await DisplayGroupModel.Update(displayGroup);
        },
        DeleteDisplayGroup: async (parent, { displayGroup }, context, info) => {
            return await DisplayGroupModel.Delete(displayGroup);
        },
    },
};
