var mongoose = require('mongoose');
var autoIncrement = require ('mongoose-auto-increment');
const _ = require("lodash");


var User_Schema = new mongoose.Schema({
    
    username: {
        type: String,
        required: false,
        minlength: 1,
        trim: true
    },
    pwd: {
        type: String,
        required: false,
        minlength: 1,
        trim: true
    },
    displayName:{
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