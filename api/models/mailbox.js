
var mongoose = require('mongoose');

var MailBox_Schema = new mongoose.Schema({
    from_user_web_id:{
        type: String,
    },
    from_user_line_id:{
        type: String,
    },
    from_user_web_displayName:{
        type: String,
    },
    from_user_src_imageProfile:{
        type: String,
    },
    
    to_user_web_id:{
        type: String,
    },
    to_user_line_id:{
        type: String,
    },
    to_user_web_displayName:{
        type: String,
    },
    messageType: {
         type: String,
    },
    messageInfo: {
         type: String,
    },
    IsSeen: {
        type: Boolean,
    },
    lastupdate: {
        type: Date,
        default: null
    },
});


var MailBox = mongoose.model('MailBox', MailBox_Schema);





/*
var mongoose = require('mongoose');
const _ = require("lodash");

var MailBox_Schema = new mongoose.Schema({
    from_user_id:{
        type: String,
    },
    from_user_displayName:{
        type: String,
    },
    to_user_id:{
        type: String,
    },
    msg_type:{
        type: String,
    },
    message: {
         type: String,
    },
    IsSeen: {
        type: Boolean,
    },
    /*
    lastupdate: {
        type: Number,
        default: null
    },
   
    lastupdate: {
        type: Date,
        default: null
    },
});


var MailBox = mongoose.model('MailBox', MailBox_Schema);
module.exports = { MailBox };
*/

module.exports = { MailBox };

