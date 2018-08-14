var mongoose = require("mongoose");
var Shop = mongoose.model('Shop',{
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
    address:{
        type:String,
        required:true,
        minlength:1,
        trim:false
    },
    business_hours:{
        type:String,
        required:true,
        minlength:1,
        trim:false
    },
    pic_avatar :{
        type:String,
        required:false,
    },
    pic_back:{
        type:String,
        required:false,
    },
    lastupdate: {
        type: Number,
        default: null
    }
    
});

module.exports ={Shop}