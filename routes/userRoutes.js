const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserInfo = require('../models/UserInfo');
const authenticate = require('../middlewares/authenticate');


// User Registration
router.post("/register", async (req, res) => {
    try {
        const { fname, lname, email, password } = req.body;
        console.log("Received password:", password);
        const encryptedPassword = await bcrypt.hash(password, 10);

        const oldUser = await UserInfo.findOne({ email });

        if (oldUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        await UserInfo.create({
            fname,
            lname,
            email,
            password: encryptedPassword,
        });

        res.status(201).json({ status: "Ok" });
    } catch (error) {
        res.status(500).json({ status: "Error", error: error.message });
    }
});


// User Login
router.post("/login-user", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserInfo.findOne({ email });

        if (!user) {
            return res.status(401).json({ error: "User Not Found" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: "Invalid Password" });
        }

        const token = jwt.sign({ email: user.email }, JWT_SECRET);
        res.json({ status: "OK", data: token });
    } catch (error) {
        res.status(500).json({ status: "Error", error: error.message });
    }
});

module.exports = router;
