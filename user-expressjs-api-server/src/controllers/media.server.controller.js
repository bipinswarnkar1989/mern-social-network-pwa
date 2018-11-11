import multer from 'multer';
import Media from '../models/media.server.model';

//set multer storage
var videoStorage = multer.diskStorage({
    destination:(req,file,cb) => {
      cb(null, './public/videos');
    },
    filename:(req,file,cb) => {
      let date = Date.now();
      let newImageName = file.originalname.split('.')[file.originalname.split('.').length - 2];
      newImageName = newImageName.replace(/ /g, '_');
      cb(null,file.fieldname + date + newImageName  + '.' +file.originalname.split('.')[file.originalname.split('.').length -1] );
    }
  });
  
  var videoUpload = multer({
    storage:videoStorage,
    fileFilter:(req,file,cb) => {
      console.log(file);
      if(file.mimetype == 'video/x-flv' || file.mimetype == 'video/mp4' || file.mimetype === 'video/x-msvideo' || file.mimetype === 'video/x-ms-wmv' || file.mimetype === 'video/quicktime' || file.mimetype === 'video/3gpp' || file.mimetype === 'video/avi'){
        cb(null,true);
      }
      else{
        cb(new Error('Only Video File Allowed'),false);
      }
    }
  }).single('video');

  //set multer storage
var imageStorage = multer.diskStorage({
    destination:(req,file,cb) => {
      cb(null,'./public/images');
    },
    filename:(req,file,cb) => {
      let date = Date.now();
      let newImageName = file.originalname.split('.')[file.originalname.split('.').length - 2];
      newImageName = newImageName.replace(/ /g, '_');
      cb(null,file.fieldname + date + newImageName + '.' +file.originalname.split('.')[file.originalname.split('.').length -1] );
    }
  });
  
  var imageUpload = multer({
    storage:imageStorage,
    fileFilter:(req,file,cb) => {
      console.log(file);
      if(file.mimetype == 'image/jpeg' || file.mimetype == 'image/jpg' || file.mimetype == 'image/png' || file.mimetype == 'image/bmp'){
        cb(null,true);
      }
      else{
        cb(new Error('Only Image File Allowed'),false);
      }
    }
  }).single('image');

export default class mediaController {
    createMedia(req, res, next) {
        console.log(`createMedia: ${JSON.stringify(req.body)}`);
        const newMedia = new Media(req.body);
        newMedia.createdAt = Date.now();
        if(req.file){
            newMedia.mediaAddress = req.file.path;
          }
        if (req.body.user && req.body.post) {
            newMedia.save((err, media) => {
                if (err) {
                    return res.json({
                      success:false,
                      message:'Media Failed!',
                      err
                    });
                  }
                  else if (media) {
                       req.result =  {
                        success:true,
                        message:'Media Created Successfully!',
                        media
                      };
                      next();
                  }
            })
        } else {
            return res.json({
                success:false,
                message:'User & Post are mandatory!',
                media
              });
        }
    }
    uploadVideo (req,res,next) {
        Upload(req,res,(err) => {
          if(err){
            console.log('ERROR:'+err);
            return res.json({'success':false,'message':err});
          }
          else{
            next();
          }
        });
      }
    uploadImage(req,res,next) {
        Upload(req,res,(err) => {
               if(err){
                 console.log('ERROR:'+err);
                 return res.json({'success':false,'message':err});
               }
               else{
                 req.result = {
                   success:true,
                   message:'Image Uploaded Successfully',
                   file:req.file
                 }
                 next();
               }
      });
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
    updateMedia(req, res, next){
        console.log(`UpdateMedia: ${JSON.stringify(req.body)}`);
        const mediaId = req.body.id;
        if (mediaId) {
            Media.findByIdAndDelete(mediaId, req.body, { new:true }, (err, media) => {
                if(err){
                    console.log(err);
                    return res.json({
                      success: false,
                      message: 'Update Failed! Some error'
                    });
                  } else {
                    console.log(`Media Updated Successfully: ${JSON.stringify(media)}`);
                    req.result = {
                      success:true,
                      message:'Media Updated Successfully.',
                      media
                    };
                    next();
                  }
               })
        } else {
            return res.json({
                success:false,
                message:'Media is required'
              });
        }
    }
}