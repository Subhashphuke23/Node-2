const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const authenticate = require('../middlewares/authenticate');


// Creating a Post
router.post("/create-post", authenticate, async (req, res) => {
    try {
        const { title, content } = req.body;
        const userId = req.user.email; // Assuming user email is the unique identifier

        const newPost = await Post.create({
            title,
            content,
            userId,
        });

        res.status(201).json({ status: "Ok", data: newPost });
    } catch (error) {
        res.status(500).json({ status: "Error", error: error.message });
    }
});


//   Upvoting a post:
router.put("/upvote-post/:postId", authenticate, async (req, res) => {
    try {
        const postId = req.params.postId;

        const updatedPost = await Post.findOneAndUpdate(
            { _id: postId },
            { $inc: { upvotes: 1 } },
            { new: true }
        );

        if (!updatedPost) {
            return res.status(404).json({ status: "Error", message: "Post not found" });
        }

        res.status(200).json({ status: "Ok", data: updatedPost });
    } catch (error) {
        res.status(500).json({ status: "Error", error: error.message });
    }
});


//Downvoting a post:
router.put("/downvote-post/:postId", authenticate, async (req, res) => {
    try {
        const postId = req.params.postId;

        const updatedPost = await Post.findOneAndUpdate(
            { _id: postId },
            { $inc: { downvotes: 1 } },
            { new: true }
        );

        if (!updatedPost) {
            return res.status(404).json({ status: "Error", message: "Post not found" });
        }

        res.status(200).json({ status: "Ok", data: updatedPost });
    } catch (error) {
        res.status(500).json({ status: "Error", error: error.message });
    }
});

module.exports = router;
