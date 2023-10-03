const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
require("dotenv").config();

const users = require("../schema/userSchema");
const {isUserLoggedIn} = require("./middlewares");

router.post("/register", async (req, res) => {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    await users.create({
       fullName: req.body.fullName,
       username: req.body.username,
       role: req.body.role,
       password: hashedPassword
    });
    res.status(201).send("User created.");
});

router.post("/login", async (req, res) => {
    const {username, password} = req.body;
    const user = await users.findOne({username});

    if (!user) return res.status(404).send('user-not-found');
    const passwordMatches = bcrypt.compareSync(password, user.password);

    if (!passwordMatches) return res.status(400).send('invalid-credentials');
    const {username: userName, _id, role} = user;

    const token = jwt.sign({
        username: username,
        userId: _id,
        role: role
    }, process.env.secret);

    res.send({
        message: "Signed in.",
        token
    });

});

module.exports = router;