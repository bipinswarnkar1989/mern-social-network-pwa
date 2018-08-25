import User from '../models/user.server.model';
import jwt from 'jsonwebtoken';

  export default class userController {
    userRegister(req, res, next) {
    console.log(`userRegister: ${JSON.stringify(req.body)}`);
    const email = req.body.email;
    const password = req.body.password;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    if (email && password) {
      const newUser = new User({
        email,
        firstname,
        lastname
      });
      newUser.setPassword(password);
      newUser.save((err, user) => {
        if (err) {
          return res.json({
            success:false,
            message:'User Registration Failed!',
            err
          });
        }
        else {
          jwt.sign({
            user,
            exp: Math.floor(Date.now() / 1000) + (60 * 60),
          },process.env.SECRET_TOKEN,
          {
            algorithm:'HS384'
          },(err, token) => {
           console.log(token);
           return res.json({
            success:true,
            message:'User Registered Successfully',
            user,
            token
          });
          });
        }
      })
    }
  }
  
    userLogin(req, res) {
    console.log(`userLogin: ${JSON.stringify(req.body)}`);
    const email = req.body.email;
    const password = req.body.password;
    if (email && password) {
       User.findOne({email})
           .exec((err, user) => {
             if (err) {
               return res.json({
                 success:false,
                 message:'Something going wrong!',
                 err
               });
             }
             else {
               if (user) {
                 let validPassword = user.comparePassword(password);
                 if (validPassword) {
                  jwt.sign({
                    user,
                    exp: Math.floor(Date.now() / 1000) + (60 * 60),
                  },process.env.SECRET_TOKEN,
                  {
                    algorithm:'HS384'
                  },(err, token) => {
                   console.log(token);
                   return res.json({
                    success:true,
                    message:'User LoggedIn Successfully',
                    user,
                    token
                  });
                  });
                 }else {
                   return res.json({
                     success:false,
                     message:'Invalid Password',
                   });
                 }
               } else {
                 return res.json({
                   success:true,
                   message:'Invalid Email'
                 });
               }
             }
           })
    }
  }
  
    validateToken(req, res, next) {
    console.log(`validateToken: ${JSON.stringify(req.headers)}`);
    const token = req.headers['authorization'];
    if (token) {
      jwt.verify(token, process.env.SECRET_TOKEN, (err, result) => {
        if(err){
          console.log(err);
          return res.json({
            success: false,
            message: 'Please Log in using a valid email & password'
          });
        } else {
          console.log(`Token Validated Successfully: ${JSON.stringify(result)}`);
          req.user = result.user;
          next();
        }
      })
    }
  }
  
    getUser(req, res, next) {
     if (req.user) {
      return res.json({
        success: true,
        message: 'Authenticated Successfully',
        user:req.user
      });
     }
  }

  async editUser(req,res) {
    console.log(`userEdit: ${JSON.stringify(req.body)}`);
    let uid = req.user._id;
    if (req.body && uid) {
      await User.findByIdAndUpdate(uid, req.body, { new:true }, (err,user) => {
        if(err){
          console.log(err);
          return res.json({
            success: false,
            message: 'Update Failed! Some error'
          });
        } else {
          console.log(`User Updated Successfully: ${JSON.stringify(user)}`);
          return res.json({
            success:true,
            message:'User Profile Updated Successfully.',
            user
          })
        }
      })
    } else{
      console.log('USER EDIT FAILED. NO User Id provided');
      return res.send('NOT FOUND')
    }
  }
  
}

