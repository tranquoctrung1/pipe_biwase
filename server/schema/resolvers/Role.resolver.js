const RoleModel = require('../../models/Role.model');

module.exports = {
    Query: {
        GetRoles: async (parent, {}, context, info) => {
            return await RoleModel.GetRoles();
        },
    },
};
