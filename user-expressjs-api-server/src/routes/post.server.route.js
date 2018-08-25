//import userController from '../controllers/user.server.controller';
///const userCtrl = new userController();
var fs = require('fs');
class postRoutes {
   constructor(router){
    this.router = router;
    this.registerRoutes();
   }
   
   registerRoutes(){
    this.router.route('/posts/v1/')
    .post(function (req, res, next) {
        var fstream;var data = '';
  if (req.busboy) {

    req.busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
      fstream = fs.createWriteStream(__dirname + '/../../public/' + filename);
      file.pipe(fstream);

      fstream.on('data', function (chunk) {
        data += chunk;
      });
      fstream.on('close', function(){
        console.log('file ' + filename + ' uploaded');
      });
    });
    req.busboy.on('finish', function(){
      console.log('finish, files uploaded ');
      res.json({ success : true});
    });
    req.pipe(req.busboy);
  }
   });
}

}

export default postRoutes;