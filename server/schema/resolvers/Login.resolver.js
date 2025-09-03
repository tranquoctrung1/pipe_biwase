const UserModel = require('../../models/User.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
    Query: {
        LoginAction: async (parent, { username, password }, context, info) => {
            let result = {
                token: '',
                Username: '',
                Role: '',
            };

            const user = await UserModel.GetUserByUsername(username);

            if (user.length > 0) {
                let dbPassword = user[0].Password;
                if (bcrypt.compareSync(password, dbPassword)) {
                    let token = jwt.sign(
                        {
                            username: user[0].Username,
                            role: user[0].Role,
                        },
                        process.env.JWT_KEY,
                        { expiresIn: 60 * 60 },
                    );

                    result.token = token;
                    result.Username = user[0].Username;
                    result.Role = user[0].Role;
                }
            }

            return result;
        },

        VerifyToken: async (parent, { token }, context, info) => {
            const result = jwt.verify(
                token,
                process.env.JWT_KEY,
                function (err, decoded) {
                    if (decoded === undefined) {
                        return 'error';
                    }

                    return '';
                },
            );

            return result;
        },
    },
};
