// const nodemailer = require("nodemailer");
// const User = require('../models/users');

// // function to access the user email
// const userEmail = async (req, res) => {
//   const { email } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       throw new Error('User not found');
//     }
//     else {
//       return {email:user.email ,firstName: user.firstName};
//     }
//   } catch (error) {
//     console.error('Error fetching user email:', error);
//     throw error;
//   }
// }


// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   host: "smtp.ethereal.email",
//   port: 587,
//   secure: false,
//   auth: {
//     user: "maddison53@ethereal.email",
//     pass: "jn7jnAPss4f63QBp6D",
//   }
// })

// const mail=async()=> {
//   // send mail with defined transport object
//   try{
//       const getUserInfo= await userEmail(req,res);
//       const info = await transporter.sendMail({
//       from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
//       to: getUserInfo.email,
//       subject: "Confirmation to the Forget Password",
//       text: `Hi ${getUserInfo.firstName}`,
//       html: "<p>This email is send to the forget password</p>",
//     });
//      console.log("Message sent: %s", info.messageId);
  
//   }
//   catch(error){
//     console.log("error in",error);
//   }
// }
// // main().catch((err) => {
// //   console.log("error in ", err);
// // })

// //module.exports=mail;
