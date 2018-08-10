var mongoose = require("mongoose");
var Service= mongoose.model('Service', {
   
    serviceid:{
        type: String,
        required: false,
        minlength: 1,
        trim: true
    },
    servicename: {
         type: String,
        required: false,
        minlength: 1,
        trim: true
    },
    description: {
        type: String,
        required: false,
        minlength: 1,
        trim: true
    }
});

module.exports = { Service };