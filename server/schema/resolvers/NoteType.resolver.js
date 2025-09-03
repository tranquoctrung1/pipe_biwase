const NoteTypeModel = require('../../models/NoteType.model');

module.exports = {
    Query: {
        GetNodeTypes: async (parent, {}, context, info) => {
            return await NoteTypeModel.GetNodeTypes();
        },
    },
};
