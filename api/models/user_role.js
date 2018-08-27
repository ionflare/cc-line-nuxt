var mongoose = require('mongoose');
//var autoIncrement = require ('mongoose-auto-increment');
const _ = require("lodash");

    


var User_Role_Schema = new mongoose.Schema({
   
    roleName:{
        type:String,
    },
    roleId:{
       type: Number,
    },
    accessibilityLV:{
       type: Number,
    },
    isActive:{
        type:Boolean,
    },
       lastupdate: {
        type: Number,
        default: null
    }
});





    
//User_Role_Schema.plugin(autoIncrement.plugin,  {model: 'User_Role', startAt: 0});    
var User_Role= mongoose.model('User_Role', User_Role_Schema);
module.exports = { User_Role };

/*
var User_Role= mongoose.model('User_Role', {
   
     id:{
        type:String,
        required:true,
        minlength:1,
        trim:true
    },
    IsAdmin:{
        type:String,
        required:true,
        minlength:1,
        trim:true
    },
    IsProvider:{
        type:String,
        required:false,
    },
    IsSecretary: {
        type: Number,
        default: null
    },
       lastupdate: {
        type: Number,
        default: null
    }
});

module.exports = { User_Role };
*/