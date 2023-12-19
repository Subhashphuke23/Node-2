const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    postId: String,
    content: String,
    userId: String,
    upvotes: { type: Number, default: 0 },
    downvotes: { type: Number, default: 0 },
}, {
    collection: "Comment",
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
