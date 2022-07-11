const Itinerary=require('../model/itenerary');


const commentControllers={
                 
    addComment: async (req, res) => {
        const {place,comment} = req.body.comment
        const user = req.user.id 
        
        try {
            const newComment = await Itinerary.findOneAndUpdate({_id:place}, {$push: {comments: {comment: comment, userID: user , date: Date.now()}}}, {new: true})
                    .populate("comments.userID", {name:1,surname:1,photoUser:1})
            res.json({ success: true, response:{newComment}, message:"Thanks you for let us your comment" })

        }
        catch (error) {
            console.log(error)
            res.json({ success: false, message: "Something went wrong try again in a few moments" })
        }

    },

    modifiComment: async (req, res) => {
        const {commentID,commentModify} = req.body.commentData
        
       
        try {
            const newComment = await Itinerary.findOneAndUpdate({"comments._id":commentID}, {$set: {"comments.$.comment": commentModify,"comments.$.date": Date.now() }}, {new: true})
            console.log(newComment)
            res.json({ success: true, response:{newComment}, message:"Your comment has been modified" })

        }
        
        catch (error) {
            console.log(error)
            res.json({ success: false, message: "Something went wrong try again in a few moments" })
        }

    },
   
     
 
    deleteComment: async (req, res) => {
        const id = req.params.id
   
        try {
            const deleteComment = await Itinerary.findOneAndUpdate({"comments._id":id}, {$pull: {comments: {_id: id}}}, {new: true})
        
            res.json({ success: true, response:{deleteComment}, message: "You deleted the comment" })

        }
        catch (error) {
           
            res.json({ success: false, message: "Something went wrong try again in a few moments" })
        }

    }

        

}



module.exports=commentControllers;
