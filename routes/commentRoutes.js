const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');
const authenticate = require('../middlewares/authenticate');

// Creating a Comment
router.post("/create-comment", authenticate, async (req, res) => {
    try {
        const { postId, content } = req.body;
        const userId = req.user.email;

        const newComment = await Comment.create({
            postId,
            content,
            userId,
        });

        res.status(201).json({ status: "Ok", data: newComment });
    } catch (error) {
        res.status(500).json({ status: "Error", error: error.message });
    }
});

// Reading comments on a post
router.get("/read-comments/:postId", async (req, res) => {
    try {
        const postId = req.params.postId;
        const comments = await Comment.find({ postId });

        res.status(200).json({ status: "Ok", data: comments });
    } catch (error) {
        res.status(500).json({ status: "Error", error: error.message });
    }
});


// Updating a Comment
router.put("/update-comment/:commentId", authenticate, async (req, res) => {
    try {
        const commentId = req.params.commentId;
        const { content } = req.body;

        const updatedComment = await Comment.findOneAndUpdate(
            { _id: commentId, userId: req.user.email },
            { content },
            { new: true }
        );

        if (!updatedComment) {
            return res.status(404).json({ status: "Error", message: "Comment not found" });
        }

        res.status(200).json({ status: "Ok", data: updatedComment });
    } catch (error) {
        res.status(500).json({ status: "Error", error: error.message });
    }
});

// Deleting a Comment
router.delete("/delete-comment/:commentId", authenticate, async (req, res) => {
    try {
        const commentId = req.params.commentId;

        const deletedComment = await Comment.findOneAndDelete({ _id: commentId, userId: req.user.email });

        if (!deletedComment) {
            return res.status(404).json({ status: "Error", message: "Comment not found" });
        }

        res.status(200).json({ status: "Ok", data: deletedComment });
    } catch (error) {
        res.status(500).json({ status: "Error", error: error.message });
    }
});


// Upvoting a Comment
router.put("/upvote-comment/:commentId", authenticate, async (req, res) => {
    try {
        const commentId = req.params.commentId;

        const updatedComment = await Comment.findOneAndUpdate(
            { _id: commentId },
            { $inc: { upvotes: 1 } },
            { new: true }
        );

        if (!updatedComment) {
            return res.status(404).json({ status: "Error", message: "Comment not found" });
        }

        res.status(200).json({ status: "Ok", data: updatedComment });
    } catch (error) {
        res.status(500).json({ status: "Error", error });
    }
});

// Downvoting a Comment
router.put("/downvote-comment/:commentId", authenticate, async (req, res) => {
    try {
        const commentId = req.params.commentId;

        const updatedComment = await Comment.findOneAndUpdate(
            { _id: commentId },
            { $inc: { downvotes: 1 } },
            { new: true }
        );

        if (!updatedComment) {
            return res.status(404).json({ status: "Error", message: "Comment not found" });
        }

        res.status(200).json({ status: "Ok", data: updatedComment });
    } catch (error) {
        res.status(500).json({ status: "Error", error: error.message });
    }
});

module.exports = router;
