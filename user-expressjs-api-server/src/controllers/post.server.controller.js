import Post from '../models/post.server.model';

export default class postController {
    createPost(req, res, next) {
        console.log(`createPost: ${JSON.stringify(req.body)}`);
        const newPost = new Post(req.body);
        newPost.createdAt = Date.now();
        if (req.body.user) {
            newPost.save((err, post) => {
                if (err) {
                    return res.json({
                      success:false,
                      message:'Post Failed!',
                      err
                    });
                  }
                  else if (post) {
                        req.result = {
                          success:true,
                          message:'Post Created Successfully!',
                          post
                        };
                        next();
                  }
            })
        }
    }
    viewResults(req, res, next){
        if(req.result){
           return res.json(req.result);
        } else {
           return res.json({
               success:false,
               message:'No result found!'
             });
        }
   }
   updatePost(req, res, next){
       console.log(`UpdatePost: ${JSON.stringify(req.body)}`);
       const postId = req.body.id;
       if (postId) {
           Post.findByIdAndDelete(postId, req.body, { new:true }, (err, post) => {
            if(err){
                console.log(err);
                return res.json({
                  success: false,
                  message: 'Update Failed! Some error'
                });
              } else {
                console.log(`Post Updated Successfully: ${JSON.stringify(post)}`);
                req.result = {
                  success:true,
                  message:'Post Updated Successfully.',
                  post
                };
                next();
              }
           })
       } else {
           return res.json({
               success:false,
               message:'Post is required'
             });
       }
   }
}