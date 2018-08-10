var mongoose = require("mongoose");
var BookInfo= mongoose.model('BookInfo', {
   
    shopid:{
        type: String,
        required: true,
        minlength: 1,
        trim: false
    },
    serviceid:{
        type: String,
        required: false,
        minlength: 1,
        trim: true
    },
    userid: {
         type: String,
        required: false,
        minlength: 1,
        trim: true
    },
    lastupdate: {
        type: Number,
        default: null
    },
});

module.exports = { BookInfo };