var mongoose = require('mongoose');
//var autoIncrement = require ('mongoose-auto-increment');
const _ = require("lodash");


var Service_Schema = new mongoose.Schema({
 
    name:{
        type:String,
    },
    picture:{
        type:String,
    },
    description:{
        type:String,
    },
     isActive:{
        type:Boolean,
    },
     lastupdate: {
        type: Number,
        default: null
    }
});




    
//Service_Schema.plugin(autoIncrement.plugin, 'Service');    
var Service= mongoose.model('Service', Service_Schema);
module.exports = { Service };

/*
var mongoose = require("mongoose");
var Service= mongoose.model('Service', {
   
     id:{
        type:String,
        required:true,
        minlength:1,
        trim:true
    },
    name:{
        type:String,
        required:true,
        minlength:1,
        trim:true
    },
    description:{
        type:String,
        required:false,
    },
     lastupdate: {
        type: Number,
        default: null
    }
});

module.exports = { Service };
*/