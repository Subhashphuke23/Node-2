const mongoose = require("mongoose");

const userDetailsSchema = new mongoose.Schema({
    fname: String,
    lname: String,
    email: { type: String, unique: true },
    password: String,
}, {
    collection: "UserInfo",
});

const UserInfo = mongoose.model("UserInfo", userDetailsSchema);

module.exports = UserInfo;
