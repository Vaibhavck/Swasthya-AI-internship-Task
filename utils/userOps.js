const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId
const blogModel = mongoose.model('blogs');

module.exports = {

    isValidObjectId : (id)=>{
    
        if(ObjectId.isValid(id)){
            if((String)(new ObjectId(id)) === id)
                return true;
            return false;
        }
        return false;
    },

    getFirstLevelFriends: (userId)=>{
        // users who have commented on at least one blog that
        // given user has commented on
        return blogModel.find({comments:{$elemMatch: {userId: userId}}})
            .then((docs, error)=>{

                if(error) throw error
                var users = [];

                // getting users from each blog
                // and excluding current user
                docs.forEach(doc=>{
                    doc.comments.filter(comment=>comment.userId != userId)
                    .forEach(ele=>{
                        users = [...users, ele.userId]
                    })
                })
            return users;            
        }).catch(err=>-1)

    }
}