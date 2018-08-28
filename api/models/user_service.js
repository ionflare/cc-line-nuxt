var mongoose = require('mongoose');
//var autoIncrement = require ('mongoose-auto-increment');
const _ = require("lodash");

    


var User_Service_Schema = new mongoose.Schema({
   
    user_id:{
        type:String,
    },
    service_id:{
       type: String,
    },
    current_serveQue: {
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
var User_Service= mongoose.model('User_Service', User_Service_Schema);
module.exports = { User_Service };
