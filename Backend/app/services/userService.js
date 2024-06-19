const User = require('../models/users');
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");
const jwt = require('jsonwebtoken');
// const mailer=require('../utils/mail');

//user registration service
const createUserService = async (req, res) => {
    try {
        const { firstName, lastName, email, password, phone, userName } = req.body;
        if (firstName && lastName && email && password && phone && userName === "") {
            return res.send("please enter following details");
        }
        const exist = await User.findOne({ $or: [{ email: req.body.email }, { phone: req.body.phone }] });
        console.log('-exist-', exist)
        if (exist) {
            return res.status(422).json(Object.assign({
                success: false,
                message: 'User with this email or phone number already exists'
            }));
        }

        const user = new User({
            firstName: firstName,
            lastName: lastName,
            userName: userName,
            email: email,
            password: password,
            phone: phone,
        })
       
        
        await user.save();
        console.log(user);
        return res.status(201).send({
            success: true,
            message: "User created successfully",
            
        });
    }
    catch (err) {
        console.error("error in", err);
        return res.status(500).json(Object.assign({
            success: false,
            message: "Internal Server Error"
        }));
    }

}

//userLogin Service
const userLogin = async (req, res) => {

    try {
        const { userName, email, password } = req.body;

        const userFound = await User.findOne({ $or: [{ userName }, { email }] });
        console.log("userName: " + userName + " email: " + email);

        if (userFound) {

            
            if (userFound.email === email && userFound.userName === userName) {
                if (password) {
                    bcrypt.compare(password, userFound.password, (err, result) => {
                        if (err) {
                            res.satus(500).send({ success: false, message: 'error occured' });
                        } else {
                            if (!result) {
                                res.status(401).send({ success: false, message: "wronPassword" });
                            } else {
                                const token = jwt.sign({ email: userFound.email, id: userFound._id }, process.env.JWT_SECRECT_KEY, {
                                    expiresIn: '1h',
                                })
                                //localStorage.setItem(token);
                                return res.status(200).send({
                                    success: true, message: "Login successfull",
                                    token
                                })
                            }
                        }
                    })
                }
                // res.status(401).send("Login successfull");
            } else {
                return res.status(401).send({ message: "Invalid credentials" });
            }

        } else {
            res.status(401).send("user not Registered");
        }
    } catch (err) {
        console.log("error", err);
    }
}

//get all user Service
const usersDetails = async (req, res) => {
    try {
        const data = await User.find({});
        //console.log(data);
        res.status(200).send(data);
    } catch (error) {
        res.status(404).send({ success: false, message: error });
    }
}

// editUser
const editUserService = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).send({ success: false, message: "User not found" });
        } else {
            res.status(200).send({ success: true, message: "user Found Successfuly", data: user });
        }

        //console.log(user);
    } catch (error) {
        res.status(404).send({ success: false, message: "error in getting UserID" });
    }
}

//update user details
const updateUserService = async (req, res) => {
    const id = req.params.id;
    const { firstName, lastName, userName, email, phone } = req.body;
    try {
        await User.findByIdAndUpdate(id, {
            firstName, lastName, email, userName, phone
        })
        
        return res.status(201).send({ success: true, message: "user update successfully" });
    }
    catch (err) {
        return res.status(500).send({ success: false, message: "user not updated" });
    }
}

// user delete service

const deleteUserService = async (req, res) => {
    const id = req.params.id;
    console.log(id);
    try {
        const user = await User.findByIdAndDelete(id);
        console.log(user);
        return res.status(201).send({ success: true, message: "user deleted successfully" });
    } catch (err) {
        res.status(500).send({ sucsess: false, message: "user not deleted" })
    }
}





// forget password service
const forgetPasswordService = async (req, res) => {
    try {
        const { email } = req.body;

        // Fetch user information
        const otp = Math.floor(100000 + Math.random() * 900000);
        try {
            const user = await User.findOne({ email });
            if (!user) {
                res.status(404).send({ success: false, message: "invalid email" });
            }
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: "niranjanmourya20@gmail.com",
                    pass: "omto uuzk yuaz yhsh",
                }
            });


            // Send mail with defined transport object
            const info = await transporter.sendMail({
                from: "niranjanmourya20@gmail.com", // sender address
                to: user.email,
                subject: "Confirmation to the Forget Password",
                text: `Hi ${user.firstName}`,
                html: `<h1> forget password OTP</h1>
                        <br> 
                        <h1> Your OTP is</h1>
                        <h2>${otp}</h2>
                        `,
            });
            console.log("Message sent: %s", info.messageId);
            res.status(200).send({ success: true, message: "Otp sent successfully", data: otp });
        } catch (error) {
            console.error('Error fetching user email:', error);
            res.status(500).send({ success: false, message: " Error in fetching user email " });
        }

        // Create transporter

        // const userOtp = new User({
        //     otpVerification :otp
        // })
        const otpEmail = await User.findOneAndUpdate({ email }, { otpVerification: otp });
        await otpEmail.save();

        //userOtp.save();
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).send({ success: false, message: "Error sending Otp" });
    }
}


//     const otpVerificationService = async (req, res) => {
//         const id = req.params.id;
//         const { otpVerification } = req.body;
//         try {
//             const user = await User.findById(id);
//             if (!user) {
//                 return res.status(404).send({ success: false, message: "User not found" });
//             }
//             if (user.otpVerification === otpVerification) {
//                 return res.status(200).send({ success: true, message: "OTP verification successful" });
//             } else {
//                 return res.status(400).send({ success: false, message: "Invalid OTP" });
//             }
//         } catch (error) {
//             console.error("Error in OTP verification:", error);
//             return res.status(500).send({ success: false, message: "Internal Server Error" });
//         }
//     }
    




// const updatePasswordService = async (req, res) => {
//     const id = req.params.id;
//     const { password, otpVerification } = req.body;
//     console.log(password, otpVerification, "--", id)
//     try {
//         if (!password) {
//             return res.status(400).send({ success: false, message: "password is required" })
//         }
//         else {
//             const user = await User.findById(id);

//             console.log("==user==", user)
//             if (!user) {
//                 return res.status(400).send({ success: false, message: "user not found" })
//             }
//             else {
                
//                     user.password = password;
//                     await user.save();
//                     return res.status(201).send({ success: true, message: "Password updated successfully" });
               
//             }

//         }
//     }
//     catch (error) {
//         res.status(500).send({ success: false, message: "you enter incorrect data" });
//     }

// }
const otpVerificationService = async (req, res) => {
    const id = req.params.id;
    const { otpVerification } = req.body;
    console.log("otp",otpVerification);
    try {
        const user = await User.findById(id);
        console.log("user",user.otpVerification);
        if (!user) {
            return res.status(404).send({ success: false, message: "User not found" });
        }
        else{
            if ( otpVerification === user.otpVerification) {
                return res.status(200).send({ success: true, message: "OTP verification successful" });
            } else {
                return res.status(400).send({ success: false, message: "Invalid OTP" });
            }
        }
       
    } catch (error) {
        console.error("Error in OTP verification:", error);
        return res.status(500).send({ success: false, message: "Internal Server Error" });
    }
}

// Update Password Controller
const updatePasswordService = async (req, res) => {
    const id = req.params.id;
    const { password } = req.body;
    try {
        if (!password) {
            return res.status(400).send({ success: false, message: "Password is required" });
        }
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).send({ success: false, message: "User not found" });
        }
        user.password = password;
        await user.save();
        return res.status(200).send({ success: true, message: "Password updated successfully" });
    } catch (error) {
        console.error("Error updating password:", error);
        return res.status(500).send({ success: false, message: "Internal Server Error" });
    }
}
module.exports = { createUserService, userLogin, usersDetails, editUserService, updateUserService, deleteUserService, forgetPasswordService, updatePasswordService ,otpVerificationService};