import mediaController from '../controllers/media.server.controller';
import postController from '../controllers/post.server.controller';
const mediaCtrl = new mediaController();
const postCtrl = new postController();

class postRoutes {
   constructor(router){
    this.router = router;
    this.registerRoutes();
   }
   
   registerRoutes(){
    this.router.route('/posts/v1/')
    .post(postCtrl.createPost,mediaCtrl.createMedia,postCtrl.viewResults);
}

}

export default postRoutes;