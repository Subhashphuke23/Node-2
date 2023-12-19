const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    userId: String,
}, {
    collection: "Post",
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
