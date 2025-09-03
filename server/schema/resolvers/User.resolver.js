const UserModel = require('../../models/User.model');

module.exports = {
    Query: {
        GetUsers: async (parent, {}, context, info) => {
            return await UserModel.GetUsers();
        },
        GetUserByUsername: async (parent, { Username }, context, info) => {
            return await UserModel.GetUserByUsername(Username);
        },
        VerifyPassword: async (
            parent,
            { Username, Password },
            context,
            info,
        ) => {
            return await UserModel.VerifyPassword(Username, Password);
        },
    },
    Mutation: {
        InsertUser: async (parent, { user }, context, info) => {
            return await UserModel.Insert(user);
        },
        UpdateUser: async (parent, { user }, context, info) => {
            return await UserModel.Update(user);
        },
        DeleteUser: async (parent, { user }, context, info) => {
            return await UserModel.Delete(user);
        },
    },
};
