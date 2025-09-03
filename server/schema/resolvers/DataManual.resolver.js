const DataManualModel = require('../../models/DataManual.model');

module.exports = {
    Query: {
        GetDataManuals: async (parent, {}, context, info) => {
            return await DataManualModel.GetDataManuals();
        },
        GetDataManualBySiteId: async (parent, { siteid }, context, info) => {
            return await DataManualModel.GetDataManualBySiteId(siteid);
        },
    },

    Mutation: {
        InsertDataManual: async (parent, { data }, context, info) => {
            return await DataManualModel.Insert(data);
        },
        UpdateDataManual: async (parent, { data }, context, info) => {
            return await DataManualModel.Update(data);
        },
        DeleteDataManual: async (parent, { data }, context, info) => {
            return await DataManualModel.Delete(data);
        },
    },
};
