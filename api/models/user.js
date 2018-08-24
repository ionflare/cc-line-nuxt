var mongoose = require('mongoose');
var autoIncrement = require ('mongoose-auto-increment');
const _ = require("lodash");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


var User_Schema = new mongoose.Schema({
    
    username: {
        type: String,
        required: false,
        minlength: 1,
        trim: true,
        validate: {
            validator: validator.isEmail,
            message: `{VALUE} is not valid email`
        }
    },
    hash: {
        type: String,
        required: false,
        minlength: 1,
        trim: true
    },
    salt:{
        type: String,
        required: false,
        minlength: 1,
        trim: true
    },
    firstname:{
         type: String,
        required: true,
        minlength: 1,
        trim: false
    },
    lastname:{
         type: String,
        required: true,
        minlength: 1,
        trim: false
    },
    emmail:{
         type: String,
        required: true,
        minlength: 1,
        trim: false
    },
    tel:{
         type: String,
        required: true,
        minlength: 1,
        trim: false
    },
    displayName:{
        type: String,
        required: true,
        minlength: 1,
        trim: false
    },
    address:{
        type: String,
        required: false,
        minlength: 1,
        trim: false
    },
    picture:{
        type: String,
        required: false,
        minlength: 1,
        trim: true
    },
    
    loginType: {
        type: String,
        required: true,
    },
    USER_ROLE_id: {
        type: String,
        required: true,
        default: false
    },
    lastUpdate: {
        type: Number,
        default: null
    },
});


User_Schema.methods.toJSON = function() {
    var user = this;
    var userObject = user.toObject();

    return _.pick(userObject, ['_id', 'email']);
}

User_Schema.methods.generateAuthToken = function() {
    var user = this;
    var access = 'auth';
    var token = jwt.sign({ _id: user._id.toHexString(), access }, process.env.JWT_SECRET).toString();

    // user.tokens.push({ access, token });
    user.tokens = user.tokens.concat([{ access, token }]);


    return user.save().then(() => {
        return token;
    })
};

    
User_Schema.plugin(autoIncrement.plugin, 'User');    
var User= mongoose.model('User', User_Schema);
module.exports = { User };


/*
var mongoose = require("mongoose");
var LineUser = mongoose.model('LineUser', {
    userid: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    displayname:{
        type: String,
        required: true,
        minlength: 1,
        trim: false
    },
    picture:{
        type: String,
        required: false,
        minlength: 1,
        trim: true
    },
    isfollow: {
        type: Boolean,
        required: true,
        default: false
    },
    isadmin: {
        type: Boolean,
        required: false,
        default: false
    },
    lastupdate: {
        type: Number,
        default: null
    },
});

module.exports = { LineUser };
*/