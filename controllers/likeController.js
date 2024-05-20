const Post= require("../models/postModel")
const Like= require("../models/likeModel")

exports.likePost = async (req, res)=>{
   try{
      const {post, user}= req.body
      const like= new Like({
         post, user
      })
      const saved= await like.save()
      
      const updatedPost= await Post.findByIdAndUpdate(post, {$push:{likes: saved._id}}, {new:true})
                       .populate("likes").exec()
      res.json({
         posts: updatedPost,

      })

   }
   catch(e){
      return res.status(400).json({
         error:"Error while liking post"
     })
   }
}

exports.unlikePost= async(req, res)=>{
   try{
      const{post, like}=req.body
      const deleted= await Like.findOneAndDelete({post:post , _id:like})
      const updatedPost= await Post.findByIdAndUpdate(post, {$pull:{likes: deleted._id}}, {new:true})
      res.json({
         post:updatedPost
      })
   }
   catch(e){
      return res.status(400).json({
         error:"Error while unliking post"
     })
   }
}



exports.dummyLink=(req, res)=>{
   res.send("This is dummy page")
}