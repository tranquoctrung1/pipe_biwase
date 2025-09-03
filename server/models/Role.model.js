const ConnectDB = require('../db/connect');

const RoleCollection = 't_Role';

module.exports.Role = class Role {
    constructor(Role, Description) {
        this.Role = Role;
        this.Description = Description;
    }
};

module.exports.GetRoles = async () => {
    let Connect = new ConnectDB.Connect();

    let collection = await Connect.connect(RoleCollection);

    let result = await collection.find({}).toArray();

    Connect.disconnect();

    return result;
};
