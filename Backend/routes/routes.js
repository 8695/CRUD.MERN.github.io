//const multer  = require('multer');
const express = require("express");
const router = express.Router();
const auth = require('../app/middleware/auth');
const {uploadFile} = require('../app/utils/fileUpload');

 const upload= uploadFile();


const userController = require('../app/controllers/userController');
const PropertyController=require('../app/controllers/propertyController');


router.route('/userRegister').post(userController.createUser);
router.route('/userLogin').post(userController.isLogin);
router.route('/userData').get(auth,userController.showUsers);
router.route('/edit/:id').get(userController.editUsers);
router.route("/edit/:id").put(userController.updateUser);
router.route("/delete/:id").delete(userController.deleteUser);
router.route("/forget-password").post(userController.forgetPassword);
router.route('/forget-password/update-pass/:id').post(userController.otpVerificationController); 
router.route('/forget-password/update-pass/:id').put(userController.updatePassword);




// properties routes
router.route('/property').post(upload.array('images'), PropertyController.createPropertyController);
router.route('/properties').get(PropertyController.propertyDetails);
router.route('/deleteProperty/:id').delete(PropertyController.deleteProperty);
router.route('/editProperty/:id').get(PropertyController.editPropertyController);
router.route('/editProperty/:id').put(upload.array('images'),PropertyController.propertyUpdateController);

module.exports = router;