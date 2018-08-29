var mongoose = require('mongoose');
//var autoIncrement = require ('mongoose-auto-increment');
const _ = require("lodash");


var User_Info_Schema = new mongoose.Schema({
   USER_id: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    firstName: {
        type: String,
        required: false,
        minlength: 1,
        trim: true
    },
    lastName: {
        type: String,
        required: false,
        minlength: 1,
        trim: true
    },
    address:{
        type: String,
        required: false,
        minlength: 1,
        trim: false
    },
    tel:{
        type: String,
        required: false,
        minlength: 1,
        trim: false
    },
    lastUpdate: {
        type: Number,
        default: null
    },
});




    
//User_Info_Schema.plugin(autoIncrement.plugin, 'User_Info');    
var User_Info= mongoose.model('User_Info', User_Info_Schema);
module.exports = { User_Info };

