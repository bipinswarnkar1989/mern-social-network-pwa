import mongoose from 'mongoose';
import mongoosastic from 'mongoosastic';

const Schema = mongoose.Schema;

const mediaSchema = new Schema({
    type:String,
    author:{
        type:Schema.ObjectId,
        ref:'User'
    },
    post:{
        type:Schema.ObjectId,
        ref:'Post'
    },
    mediaAddress:{
        type:String,
        required:true
    },
    status:String,
    createdAt:Date,
    upDatedAt:Date
});

const mediaModel = mongoose.model('Media', mediaSchema);
export default mediaModel;