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