const Post = require("../models/Post")

const createPost = async (req, res) => {
    try {
        const { title, content } = req.body;
        if (!title || !content) {
            return res.status(400).json({
                success: false,
                message: "Title & Content are required"
            });
        }

        const post = await Post.create({
            title, content, user: req.user._id
        });

        res.status(201).json({
            success: true,
            message: "Post Saved Successfully",
            post
        });
    }
    catch (e) {
        res.status(500).json({
            success: false,
            message: "Unable to Save Post",
            error: e.message
        });
    }
};

const getAllPost = async (req, res) => {
    try {
        const posts = await Post.find().populate("user", "name email");
        res.status(200).json({
            success: true,
            message: "All Posts",
            count: posts.length,
            posts
        });
    }
    catch (e) {
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: e.message
        })
    }
};

const getSinglePost = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id).populate("user", "name email");
        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Invalid Post ID"
            });
        }
        res.status(200).json({
            success:true,
            message:"Post Retrieved Successfully",
            post
        });
    }
    catch (e) {
        res.status(500).json({
            success:false,
            message:"Unable to get post",
            error:e.message
        };)
    }
};

const updatePost = () => { };

const deletePost = () => { };


module.exports = { createPost };