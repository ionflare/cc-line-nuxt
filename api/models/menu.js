var mongoose = require('mongoose');
var autoIncrement = require ('mongoose-auto-increment');
const _ = require("lodash");


var Menu_Schema = new mongoose.Schema({
    
    label: {
        type: String,
        required: false,
        minlength: 1,
        trim: true
    },
    icon : {
        type: String,
        required: false,
        minlength: 1,
        trim: true
    },
    link: {
        type: String,
        required: false,
        minlength: 1,
        trim: true
    },
  
    lastUpdate: {
        type: Number,
        default: null
    },
});




    
Menu_Schema.plugin(autoIncrement.plugin, 'Menu');    
var Menu= mongoose.model('Menu', Menu_Schema);
module.exports = { Menu };


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