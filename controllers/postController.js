const Post= require("../models/postModel")

exports.createPost= async (req, res)=>{
    try{
        const{title, body}= req.body
        const post= new Post({
            title, body
        })
        const saved= await post.save()
        res.json({
            post:saved
        })

    }
    catch(e){
        return res.status(400).json({
            error:"Error while creating post"
        })

    }
}
exports.getAllPosts= async (req, res)=>{
    try{
        const posts= await Post.find().populate("comments").exec()
        res.json({
            posts
        })

    }
    catch(e){
        return res.status(400).json({
            error:"Error while fetching post"
        })
    }

}