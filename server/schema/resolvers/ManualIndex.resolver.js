const ManualIndexModel = require('../../models/ManualIndex.model');

module.exports = {
    Query: {
        GetDataIndexManuals: async (parent, {}, context, info) => {
            return await ManualIndexModel.GetDataIndexManuals();
        },
        GetDataIndexManualBySiteId: async (
            parent,
            { siteid },
            context,
            info,
        ) => {
            return await ManualIndexModel.GetDataIndexManualBySiteId(siteid);
        },
    },

    Mutation: {
        InsertManualIndex: async (parent, { data }, context, info) => {
            return await ManualIndexModel.Insert(data);
        },
        UpdateManualIndex: async (parent, { data }, context, info) => {
            return await ManualIndexModel.Update(data);
        },
        DeleteManualIndex: async (parent, { data }, context, info) => {
            return await ManualIndexModel.Delete(data);
        },
    },
};
