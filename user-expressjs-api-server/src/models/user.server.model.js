import mongoose from 'mongoose';
import crypto from 'crypto';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstname:{
    type:String,
    required:true
  },
  lastname:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  username:{
    type:String
  },
  hash:{
    type:String
  },
  salt:{
    type:String
  },
  role:String,
  createdAt:{
    type:Date,
    default:Date.now
  },
  headline:String,
  qualification:String,
  summary:String,
  country:String,
  state:String,
  contact:Number,
  linkedIn:String,
  gitHub:String,
  stackOverflow:String,
  blog:String,
  website:String,
});

// Before saving create salt & hash
userSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
}

userSchema.methods.comparePassword = function(password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
  return this.hash = hash;
}

userSchema.set('toJSON',{
  transform(doc, ret, options) {
    delete ret.hash;
    delete ret.salt;
    return ret;
  }
});

userSchema.set('toObject',{
  transform(doc, ret, options) {
    delete ret.hash;
    delete ret.salt;
    return ret;
  }
});

export default mongoose.model('User', userSchema);
