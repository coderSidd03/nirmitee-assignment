const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const commentSchema = new mongoose.Schema({
    postId : {
        type : ObjectId,
        require : true,
        ref : 'post'
    },
    comment_By : {
        type : String,
        require : true,
        default : 'User'
    },
    commented_at : {
        type : Date,
        require : true
    },
    isDeleted : {
        type : Boolean,
        default : false
    }
}, {timestamps : true})

module.exports = mongoose.model('comment' , commentSchema);