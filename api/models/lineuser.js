var mongoose = require('mongoose');
var autoIncrement = require ('mongoose-auto-increment');
const _ = require("lodash");


var LineUser_Schema = new mongoose.Schema({
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




    
LineUser_Schema.plugin(autoIncrement.plugin, 'LineUser');    
var LineUser= mongoose.model('LineUser', LineUser_Schema);
module.exports = { LineUser };


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