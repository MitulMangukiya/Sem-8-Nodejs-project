import { Joi } from '../../../../utilities/schemaValidate'
import { Router } from 'express';
import commonResolver from '../../../../utilities/commonResolver'
import { addprofileImg } from "../../../../services/customer/customer";
import { decodeJwtTokenFn } from '../../../../utilities/universal';
const router = new Router();
const multer = require("multer");
const path = require("path");
import cloudinary from 'cloudinary';
import { v2 as cloudinaryV2 } from 'cloudinary';


/**
 * @swagger
 * /api/v1/customer/addImg:
 *  post:
 *   tags: ["Customer"]
 *   summary: add profile image for customer.
 *   description: api used for add customer profile image.
 *   consumes: 
 *      - multipart/formdata
 *   parameters:
 *      - in: formData
 *        name: profileImg
 *        type: file
 *        description: add profile image.
 *   
 *   responses:
 *    "200":
 *     description: success
 *    "400":
 *     description: fail
 *   security:
 *      - bearerAuth: [] 
 */
cloudinary.config({ 
  cloud_name: 'dgilzahu1', 
  api_key: '737822493143645', 
  api_secret: '1K-Y3K5w7chPWCiIYOq7TlR6GVw' 
}); 

const imageFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith('image')) {
      return cb(new Error('Only images are allowed'), false);
  }
  cb(null, true);
};

const handleMultipartData = multer({ fileFilter: imageFilter, limits: { fileSize: 1000000 * 5 } }).single("profileImg");

 router.post('/addImg',decodeJwtTokenFn, async (req, res, next) => {
  handleMultipartData(req, res, async (err) => {
    if (err) {
      res.json({ msgs: err.message });
    }
    else{
      const filePath = req.file.buffer

    if(!filePath) {
      return
    }

    cloudinaryV2.uploader.upload_stream({ resource_type: 'auto' },
                    (error, result) => {
                        if (result && result.secure_url) {
                            req.body.image = result.secure_url;
                            // next();
                            res.json(req.body)
                        } else {
                            res.send(error ? error.message : 'Image upload failed');
                        }
                    }
                ).end(filePath);
    // cloudinary.v2.uploader.upload_stream(filePath,(error, result) => {
    //   if(error) {
    //     res.send(error.message)
    //   } else {
    //     if(result.secure_url){
    //       req.body.image = result.secure_url;
    //       // next()
    //       res.json(req.body)
    //     }
    //   }
    // })
  }
  });
},
commonResolver.bind({ modelService: addprofileImg, isRequestValidateRequired: false, })
)

export default router;
