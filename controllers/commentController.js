const Post= require("../models/postModel")
const Comment= require("../models/commentModel")
const mongoose = require('mongoose');
const { response } = require("express");

exports.createComment= async (req, res)=>{
    try{
        const{post, user, body}= req.body
        const comment= new Comment({
            post, 
            user, 
            body
        })
        const savedComment= await comment.save()
        const updatedPost= await Post.findByIdAndUpdate(
            post, 
            {$push:{comments:savedComment._id}}, 
            {new:true})
            .populate("comments")
            .exec()
        
        res.json({
            post:updatedPost,
        })

    }
    catch(e){
        
            if (e instanceof mongoose.Error.ValidationError) {
                // Handle validation errors
                return res.status(400).json({
                    error: "Validation error",
                    message: e.message,
                    details: e.errors
                });
            } else {
                console.error("Error creating comment:", e);
                return res.status(500).json({
                    error: "Internal server error",
                });
            }
        

    }
}