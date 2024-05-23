const userService = require('../services/userService');

// controller for create User
const createUser = (req, res) => {
    userService.createUserService(req, res);
   // console.log(userService.createUserService);

}

//controller for Login user
 const isLogin= (req, res) => {
    userService.userLogin(req, res);
    //console.log(userService.userLogin);
 }
 // conroller for show all users
 const showUsers= (req, res) => {
    userService.usersDetails(req, res);
 }
 //controller for edit user
 const editUsers=(req,res)=>{
   userService.editUserService(req, res);
 }
 //controller for update user
 const updateUser=(req,res)=>{
   userService.updateUserService(req,res);
 }

 // controller for delete user

 const deleteUser=(req,res)=>{
    userService.deleteUserService(req,res);
 }

 //controlller for forgetPassword
 const forgetPassword=(req,res)=>{
   userService.forgetPasswordService(req,res);
 }

 //controller for updatepassword
 const updatePassword=(req,res)=>{
   userService.updatePasswordService(req,res);
 }

 const otpVerificationController=(req,res)=>{
    userService.otpVerificationService(req,res);
 }

module.exports = {createUser,isLogin ,showUsers,editUsers,updateUser,deleteUser,forgetPassword,updatePassword,otpVerificationController};