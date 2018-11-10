import mongoose from 'mongoose';
import mongoosastic from 'mongoosastic';

const Schema = mongoose.Schema;

const postSchema = new Schema({
    user:{
        type:Schema.ObjectId,
        ref:'User'
    },
    title:{
        type:'String',
        es_indexed:true
    },
    medias:[
        {
            type:Schema.ObjectId,
            ref:'media'
        }
    ],
    slug:{
      type:String,
      unique:true
    },
    createdAt:{
        type:Date
    },
    updatedAt:{
        type:Date
    },
    status:String
});

//middleware
postSchema.pre('save', function(){
    this.slug = slugify(this.title);
    next();
})

// function to slugify a title
function slugify(text){
    return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}

postSchema.plugin(mongoosastic);
const postModel = mongoose.model('Post', postSchema);
export default postModel;

