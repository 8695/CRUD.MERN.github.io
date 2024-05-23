const mongoose = require('mongoose');
const bcrypt = require('bcrypt');





const userSchema = new mongoose.Schema({
    firstName: {
        type: 'String',
        required: true
    },
    lastName: {
        type: 'String',
        required: true
    },
    userName: {
        type: 'String',
        required: true
    },
    email: {
        type: 'String',
        required: true
    },
    password: {
        type: 'String',
        required: true
    },
    phone: {
        type: 'Number',
        required: true,

    },
    otpVerification : {
        type: 'String',
    }
});

// function for convert passwors into hash
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
})





const User = mongoose.model('User', userSchema);
module.exports = User;
