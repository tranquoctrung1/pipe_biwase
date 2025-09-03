const ConnectDB = require('../db/connect');
const bcrypt = require('bcryptjs');
const { ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');

const UserCollection = `t_Users`;

module.exports.User = class User {
    constructor(
        _id,
        Username,
        Password,
        pfm,
        Salt,
        StaffId,
        ConsumerId,
        Email,
        Role,
        Active,
        TimeStamp,
        Ip,
        LoginTime,
        Language,
    ) {
        this._id = _id;
        this.Username = Username;
        this.Password = Password;
        this.pfm = pfm;
        this.Salt = Salt;
        this.StaffId = StaffId;
        this.ConsumerId = ConsumerId;
        this.Email = Email;
        this.Role = Role;
        this.Active = Active;
        this.TimeStamp = TimeStamp;
        this.Ip = Ip;
        this.LoginTime = LoginTime;
        this.Language = Language;
    }
};

module.exports.GetUsers = async () => {
    let Connect = new ConnectDB.Connect();

    let collection = await Connect.connect(UserCollection);

    let result = await collection.find({}).sort({ Username: 1 }).toArray();

    Connect.disconnect();

    return result;
};

module.exports.GetUserByUsername = async (Username) => {
    let Connect = new ConnectDB.Connect();

    let collection = await Connect.connect(UserCollection);

    let result = await collection.find({ Username: Username }).toArray();

    Connect.disconnect();

    return result;
};

module.exports.VerifyPassword = async (Username, Password) => {
    let check = 0;

    let Connect = new ConnectDB.Connect();

    let collection = await Connect.connect(UserCollection);

    let result = await collection.find({ Username: Username }).toArray();

    if (result.length > 0) {
        let dbPassword = result[0].Password;
        if (bcrypt.compareSync(Password, dbPassword)) {
            check = 1;
        }
    }

    Connect.disconnect();

    return check;
};

module.exports.Insert = async (user) => {
    let Connect = new ConnectDB.Connect();

    let result = '';

    let collection = await Connect.connect(UserCollection);

    user.TimeStamp = new Date(user.TimeStamp);

    let find = await collection.find({ Username: user.Username }).toArray();

    if (find.length <= 0) {
        let salt = bcrypt.genSaltSync(parseInt(process.env.GEN_SALT || 10));
        let password = bcrypt.hashSync(user.Password, salt);

        user.Password = password;

        result = await collection.insertOne(user);

        result = result.insertedId;
    }

    Connect.disconnect();

    return result;
};

module.exports.Update = async (user) => {
    let result = 0;

    try {
        let Connect = new ConnectDB.Connect();

        let collection = await Connect.connect(UserCollection);

        user.TimeStamp = new Date(user.TimeStamp);

        let salt = bcrypt.genSaltSync(parseInt(process.env.GEN_SALT || 10));
        let password = bcrypt.hashSync(user.Password, salt);

        user.Password = password;

        result = await collection.updateMany(
            {
                _id: new ObjectId(user._id),
            },
            {
                $set: {
                    Password: user.Password,
                    Role: user.Role,
                },
            },
        );

        result = result.modifiedCount;

        Connect.disconnect();
    } catch (err) {
        console.log(err);
    }

    return result;
};

module.exports.Delete = async (user) => {
    let Connect = new ConnectDB.Connect();

    let collection = await Connect.connect(UserCollection);

    let result = await collection.deleteMany({
        _id: new ObjectId(user._id),
    });

    Connect.disconnect();

    return result.deletedCount;
};
