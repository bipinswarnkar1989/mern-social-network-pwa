import userController from '../controllers/user.server.controller';
const userCtrl = new userController();

class userRoutes {
   constructor(router){
    this.router = router;
    this.registerRoutes();
   }
   
   registerRoutes(){
    this.router.route('/users/userRegister')
    .post(userCtrl.userRegister);
    this.router.route('/users/userLogin')
    .post(userCtrl.userLogin);
    this.router.route('/users/validateToken')
    .get(userCtrl.validateToken,userCtrl.getUser);
    this.router.route('/users')
    .put(userCtrl.validateToken,userCtrl.editUser);
   }
}

export default userRoutes;