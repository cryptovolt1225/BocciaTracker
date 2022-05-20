const User = require("../Models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.authController = {
    createUser(req, res) {
        const { username, email, password } = req.body;
        if (!username || !password || !email)
            res.status(400).send('You must provide all the information');

        User.findOne({
            email: req.body.email
        }).then(user => {
            if (user) {
                return res.status(400).json({
                    email: 'Email already exists'
                });
            }
            else {
                const newUser = new User({
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                });

                bcrypt.genSalt(10, (err, salt) => {
                    if (err) console.error('There was an error', err);
                    else {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) console.error('There was an error', err);
                            else {
                                newUser.password = hash;
                                newUser
                                    .save()
                                    .then(user => {
                                        res.json(user)
                                    });
                            }
                        });
                    }
                });
            }
        });
    },
    loginUser(req, res) {
        const email = req.body.email;
        const password = req.body.password;

        User.findOne({ email })
            .then(user => {
                if (!user) {
                    errors.email = 'User not found'
                    return res.status(404).json(errors);
                }
                bcrypt.compare(password, user.password)
                    .then(isMatch => {
                        if (isMatch) {
                            const payload = {
                                id: user.id,
                                username: user.username,
                                email: user.email,
                            }
                            jwt.sign(payload, 'secret', {
                                expiresIn: 3600
                            }, (err, token) => {
                                if (err) console.error('There is some error in token', err);
                                else {
                                    res.json({
                                        success: true,
                                        data: payload,
                                        token: `Bearer ${token}`
                                    });
                                }
                            });
                        }
                        else {
                            errors.password = 'Incorrect Password';
                            return res.status(400).json(errors);
                        }
                    });
            });
    },
    logoutUser(req, res) {
        req.session.destroy(() => {
            res.redirect("/");
        });
    }
}
