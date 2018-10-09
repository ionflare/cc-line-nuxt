
// require("dotenv").config(); //config for line add for linelogin move to nuxt.config.js
require('./config/config.js') //config for mongodb, jws
const _ = require("lodash")

/** Express */
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
//express-session,body-parser はnuxt.config.jsで設定
// [url is for get req.query]
//  https://github.com/nuxt/nuxt.js/issues/1909
const url = require('url')

/** MongoDB and Models */
//const { ObjectID } = require("mongodb")
const ObjectId = require('mongoose').Types.ObjectId; 
const { mongoose } = require('./db/mongoose');
const { User } = require("./models/user")
const { Service } = require("./models/service")
const { User_Service } = require("./models/user_service");
const { User_Role } = require("./models/user_role")
const { Shop } = require("./models/shop")
const { BookInfo } = require("./models/bookinfo")
const { MailBox } = require("./models/mailbox")
//var { Shop_Service } = require("./models/service")
//var { Shop_Service } = require("./models/shop_service")
//var { authenticate } = require("./middleware/authenticate")
//var { authenticate_admin } = require("./middleware/authenticate_admin")

/** LINE LOGIN , LINE MESSAGE */
const line_login = require("line-login"); //module
//const line_login = require("./line/line-login"); //custom
const Client = require('@line/bot-sdk').Client;


const line = require('@line/bot-sdk');	
const config = {
channelAccessToken: process.env.LINE_MESSAGE_CHANNEL_ACCESS_TOKEN,
channelSecret: process.env.LINE_MESSAGE_CHANNEL_SECRET
};


const clientBot= new Client({
        channelAccessToken: process.env.LINE_MESSAGE_CHANNEL_ACCESS_TOKEN,
        channelSecret: process.env.LINE_MESSAGE_CHANNEL_SECRET,
});

/*
const clientBot = new Client({
  channelAccessToken:  '+Z00sQIfBQjVouvA+bFr9LpyYi5pErdfu0hejVGhtzlEmw3RJRyV0V5tohj832ykJqb2S+6mcIRvWhw7V7PDpFNWzRZlVNLg59J8PU+71rxjCqPJxfSIET6QcCoU1Vcb6UnJSMb/I5qVtwr4XpIhKQdB04t89/1O/w1cDnyilFU=',
  channelSecret: 'cb7cdb67c6a8f02f2b7119365518108b'
});
*/
/*
const line_message = require('@line/bot-sdk');
const config = {
      channelAccessToken: process.env.LINE_MESSAGE_CHANNEL_ACCESS_TOKEN,
      channelSecret: process.env.LINE_MESSAGE_CHANNEL_SECRET,
}
*/
//const line_client = new line_message.Client(config)

const router = express.Router();
const app = express()
router.use((req, res, next) => {
    Object.setPrototypeOf(req, app.request)
    Object.setPrototypeOf(res, app.response)
    req.res = res
    res.req = req
    //add query for LINELOGIN
    req.query = url.parse(req.url, true).query
    next()
})



//======================================================
// LINE LOGIN
//======================================================
/** 
 * LINE LOGIN
 * https://qiita.com/nkjm/items/c8eac296dfee14fe5cf7
 */
// 認証の設定。
const login = new line_login({
    channel_id: process.env.LINE_LOGIN_CHANNEL_ID,
    channel_secret: process.env.LINE_LOGIN_CHANNEL_SECRET,
    callback_url: process.env.LINE_LOGIN_CALLBACK_URL,
    prompt: "consent" // 追加
});
// console.log('-- line_login', login);


router.get('/webbooking/add',async(req,res)=>{
         User.findOne({
           _id     : new ObjectId(req.param('booking_id'))
        }).then((user)=>{ 
            var _bookinginfo = new BookInfo({
                
                 provider_id : req.param('provider_id'),
                 service_id :  req.param('service_id'),
                 customer_id : req.param('customer_id'),
                 customer_dName : user.displayName,
                 quantity : 1,
                 comment : "",
                 isServed : false,
                 isCancelled : false,
                 lastupdate : new Date().getTime(),
            });
            _bookinginfo.save();
            res.redirect('/'); 
        }).catch((e)=> {  res.redirect('/'); } );
          // doc = await _bookinginfo.save();
        res.redirect('/');
})

router.post('/qr_booking_getinfo',async(req,res)=>{
      User_Service.findOne({
           user_id     : req.body.bookingdata.provider_id,
           service_id : req.body.bookingdata.service_id 
           
          /*
           user_id: { $eq:  req.body.bookingdata.provider_id },
           service_id : { $eq:  req.body.bookingdata.service_id },
           */
        }).then((user_service)=>{ 
            if(!user_service)
            {
                res.send({result :"failed", msg: "Selected Service and Provider did not relate to each other!!", info: { }});
            }
            else
            {
                User.findOne({_id :  user_service.user_id}).then((user)=>{ 
                     if(!user)
                     {
                          res.send({result :"failed", msg: "Errors occured when find selected provider info!!", info: { }});
                     }
                     else
                     {
                         Service.findOne({_id :  user_service.service_id}).then((service)=>{ 
                             if(!service)
                             {
                                  res.send({result :"failed", msg: "Errors occured when find selected service info!!", info: { }});
                             }
                             else
                             {
                                 res.send({result :"successed", msg: "No Error", info: { user, service}});
                             }
                         });
                     }
                });
            }
            
        }).catch((e)=> { res.send(e) } );
})



//========***[get waiting queue]***======

router.get('/user_roles',(req,res)=>{
    User_Role.find({
         //isDel: { $eq: false }
        //all
    }).then((user_roles)=>{
        res.send({user_roles } );
          //res.redirect('../');
    }).catch((e)=> { res.status(400).send(e) } );
})


router.get('/booking_get_queInfo',async (req,res)=>{
 
      BookInfo.findOne({
           _id     : new ObjectId(req.param('booking_id'))
        }).then((booking_info)=>{ 
            if(!booking_info)
            {
               return res.send({result :"failed", msg: "Cannot find information for requested booking id!!", info: { }});
            }
            else
            {
                User.findOne({_id :  booking_info.provider_id}).then((provider)=>{ 
                     if(!provider)
                     {
                        return   res.send({result :"failed", msg: "Errors occured while find selected provider info!!", info: { }});
                     }
                     else
                     {
                         Service.findOne({_id :  booking_info.service_id}).then((service)=>{ 
                             if(!service)
                             {
                                return  res.send({result :"failed", msg: "Errors occured when find selected service info!!", info: { }});
                             }
                             else
                             {
                                 User_Service.findOne({ service_id :  service._id  , user_id :  provider._id }    ).then((user_service)=>{ 
                                 if(!user_service)
                                     {
                                       return   res.send({result :"failed", msg: "Errors occured when find current queue!!", info: { }});
                                     }
                                     else
                                     {  res.send({result :"successed", msg: "No Error", info: { provider, service, user_service ,booking_info}});
                                     }
                                }).catch((e)=> { res.send(e) } );
                             }
                         }).catch((e)=> { res.send(e) } );
                     }
                }).catch((e)=> { res.send(e) } );
            }
            
        }).catch((e)=> { res.send(e) } );
        
})



//===========





router.get('/linebooking',(req,res)=>{
    
    var req_bookinginfo = { provider_id :req.param('provider_id'),
                service_id :req.param('service_id'),
                quantity : req.param('quantity'),
            }; 
    
    req.session.line_booking_info = req_bookinginfo;
    res.redirect('/api/auth');
})



router.get('/linelogin',(req,res)=>{
    
    req.session.line_login = true;
    res.redirect('/api/auth');
    
})



router.get('/cancel_linebooking',(req,res)=>{
    
    
    //===***[Is current customer Id match customer id from bookingQueue]***===
     BookInfo.findOne({
           _id     : new ObjectId(req.param('bookingid')),
           customer_id : req.param('userid')
         }).then((bookinfo)=>{ res.redirect('/');
         }).catch((e)=> { res.redirect('/') } );
        
    
    /*
    var req_bookinginfo = { provider_id :req.param('provider_id'),
                service_id :req.param('service_id'),
                quantity : req.param('quantity'),
            }; 
    
    req.session.line_booking_info = req_bookinginfo;
    res.redirect('/api/auth');
    */
})




// 認証フローを開始するためのルーター設定。
router.get("/auth", login.auth());


router.get("/callback", login.callback(async (req, res, next, token_response) => {
    
    if(req.session.line_login != null ) 
    {
        
        User.findOneAndUpdate({   username    :  token_response.id_token.sub,
                    loginType   : "line"},
                {
                    username    :   token_response.id_token.sub,
                    displayName :   token_response.id_token.name,
                    picture     :   token_response.id_token.picture,
                    loginType   :   "line",
                    isValidated :   true,
                    USER_ROLE_id:   1,
                    isActive    :   true,
                    lastupdate  : new Date().getTime(),
                },
                {new: true, upsert:true}).then((user)=>{ 
                    
                     let token=  jwt.sign({
                        //sub  : req.body.lineuserid,
                        //Userro : req.body.lineuserid,
                       },process.env.JWT_SECRET).toString();
                    var userinfo =  {
                        user_id : user._id,
                        username  : token_response.id_token.sub,
                        displayName : token_response.id_token.name,
                        picture : user.picture,
                        accessibiltyLv : user.USER_ROLE_id,
                        id_token    : token,
                        }
                    req.session.current_user =  userinfo;
                    req.session.line_login = null;
                    res.redirect('/');
                }).catch((e)=> { 
                    req.session.line_login.req_login = false;
                    res.redirect('/');
                });          
        
        
 
    }
    else
    {
        var res_save_user = await User.findOneAndUpdate(
                {   username    :  token_response.id_token.sub,
                    loginType   : "line"
                },
                {
                    username    :   token_response.id_token.sub,
                    displayName :   token_response.id_token.name,
                    picture     :   token_response.id_token.picture,
                    loginType   :   "line",
                    isValidated :   true,
                    isActive    :   true,
                    lastupdate : new Date().getTime(),
                },
                {upsert:true}
            );
            // add booking info 
        
         var _bookinginfo = new BookInfo({
                
                 provider_id    : req.session.line_booking_info.provider_id,
                 service_id     : req.session.line_booking_info.service_id,
                 customer_id    : res_save_user._id,
                 customer_dName   : token_response.id_token.name,
                 quantity       : req.session.line_booking_info.quantity,
                 comment        : "",
                 isServed       : false,
                 isCancelled    : false,
                 
                 lastupdate     : new Date().getTime(),
            });
           var res_save_booking = await _bookinginfo.save();
           

     //await replyText(clientBot, req.body.events[0].replyToken, "Booking Successed!!" , "qq");
     await clientBot.pushMessage(token_response.id_token.sub,{
        type:'text',
        text:"Booking Successed!! Queue information : https://cc-line-nuxt.herokuapp.com/qr_booking/my_queue?booking_id="+ res_save_booking._id 
     })
     
     //===***[if provider type is line]***===
     User.findOne({
        _id: new ObjectId(res_save_booking.provider_id) 
    }).then((user) => {
            Service.findOne({
            _id: new ObjectId(req.session.line_booking_info.service_id) 
            }).then((service) => {
                
                if(user.loginType == "line")
                {
                    clientBot.pushMessage(user.username,{
                    type:'text',
                    text:"Your service : "+service.name+" Quantity : "+res_save_booking.quantity
                    + "has been booked by customer : "
                    + res_save_user.displayName + ". Booking ID : " + res_save_booking._id
                 })
                }
            })
    })
     
     
     
     
     await res.status(200).redirect('../qr_booking/my_queue?booking_id='+ res_save_booking._id );
    }
    
}));

function replyText(client,replyToken, returnStr,postBackStr) {

   return new Promise( ( resolve, reject ) => {
      client.replyMessage(replyToken, 
      {

    type: "text",
    text: returnStr

 }
 );
        
  } );
}

/*
// ユーザーが承認したあとに実行する処理のためのルーター設定。
router.get("/callback", login.callback(async (req, res, next, token_response) => {
        //token_response.id_token     : decoded object
        //token_response.id_token_raw : original id_token (jwt format)
        console.log('jwt',token_response.id_token_raw)
        //Set Session
        var userinfo={
            userid      : token_response.id_token.sub,
            displayname : token_response.id_token.name,
            picture     : token_response.id_token.picture,
            id_token    : token_response.id_token_raw
        }
        //Store Session
        //req.session.lineuser = userinfo
        try{ // Save User to DB  
        
        
           doc = await User.findOneAndUpdate(
                {   userid     :token_response.id_token.sub },
                {
                    displayname:token_response.id_token.name,
                    picture    :token_response.id_token.picture,
                    isfollow   :true,
                    loginType : "Line",
                    lastupdate : new Date().getTime(),
                },
                {upsert:true}
            );
            
            var _bookinfo = new BookInfo({
               
                shopid: req.session.bookingShop,
                serviceid : "1",
                userid: token_response.id_token.sub,
                lastupdate : new Date().getTime()
            });
           doc = await _bookinfo.save();
        //    await line_client.pushMessage(userid,{type:'text',text:pushmessage}) 
           await  res.redirect('../');
        }catch(e){
            console.log('[save-error]',e)
            res.status(400).json(e);
        }
    },(req, res, next, error) => {
        console.log('---Error---',error)
        // 認証フロー失敗時
        // res.status(400).json(error);
        res.json(error);
    }
));
*/



//======================================================
router.get('/bookinfo_get',(req,res)=>{
    BookInfo.find({
        provider_id : req.param('provider_id'),
        service_id : req.param('service_id'),
        
    }).then((bookinfo)=>{ res.send({bookinfo } );
    }).catch((e)=> { res.status(400).send(e) } );
})

//======================================================

//user list
router.get('/userlists',(req,res)=>{
    User.find({
        //all
    }).then((userlists)=>{ res.send({ userlists } );
    }).catch((e)=> { res.status(400).send(e) } );
})


router.get('/userlists/del/:id',async(req,res)=>{
       await User.deleteOne(
                {   _id     : req.params.id}
            );
        res.redirect('../../../users/userlists');
})

router.get('/userlists/up',async(req,res)=>{
      var active = false;
          if(req.param('isActive')=="True") { active=true; }
       await User.findOneAndUpdate(
                {   _id     : req.param('id')},
                {
                    //username : req.param('username'),
                    //picture : req.param('picture'),
                    //displayName : req.param('displayName'),
                    USER_ROLE_id : req.param('USER_ROLE_id'),
                    isActive : active,
                    lastupdate : new Date().getTime(),
                },
                {upsert:true}
            );
        res.redirect('../../../users/userlists');
})

router.get('/userlists/getProfileImage_fromLineID',async(req,res)=>{
     //await res.send( {result :"failed",msg : "Dupplicate Username"});  
    await res.redirect("../../");
    /*
    User.findOne({
        username     : "U6a0764890cdbb5393b84accb7b37c266",
        loginType : "line"
        //username: req.body.user.username,
        // _creator: req.user._id
    }).then((user) => {
         if (user) {
           
        }
    }).catch((e)=> { res.status(400).send(e) } );
    */
})

//***[test add new user from lists table]***
router.get('/userlists/add',async(req,res)=>{
    
          var active = false;
          if(req.param('isActive')=="True") { active=true; }
           
            var gensalt = bcrypt.genSaltSync(10)
            var genhash = bcrypt.hashSync(req.param('username') + req.param('username'), gensalt);
            var _userlists = new User({
                username : req.param('username'),
                hash: genhash,
                salt : gensalt,
                firstname : req.param('username'),
                lastname : req.param('username'),
                email: req.param('username'),
                tel : req.param('username'),
                displayName : req.param('displayName'),
                address : req.param('username'),
                picture: req.param('picture'),
                loginType : "normal",
                isValidated : false,
                USER_ROLE_id : req.param('USER_ROLE_id'),
                isActive: true,
                lastUpdate : new Date().getTime()
            });
           doc = await _userlists.save();
        res.redirect('../../../users/userlists');
})







//======================================================
// User Role

router.get('/user_roles',(req,res)=>{
    User_Role.find({
         //isDel: { $eq: false }
        //all
    }).then((user_roles)=>{
        res.send({user_roles } );
          //res.redirect('../');
    }).catch((e)=> { res.status(400).send(e) } );
})

router.get('/user_roles/del/:id',async(req,res)=>{
        await User_Role.deleteOne(
                {   _id     : req.params.id}
            );
        res.redirect('../../../userroles');
        
        
        
})

router.get('/user_roles/up',async(req,res)=>{
      var active = false;
          if(req.param('isActive')=="True") { active=true; }
       await User_Role.findOneAndUpdate(
                {   _id     : req.param('id')},
                {
                    roleName : req.param('roleName'),
                    roleId :  req.param('accessibilityLV'),
                    accessibilityLV:  req.param('accessibilityLV'),
                    isActive : active,
                    isDel : false,
                    lastupdate : new Date().getTime(),
                },
                {upsert:true}
            );
        res.redirect('../../../userroles');
})

router.get('/user_roles/add',async(req,res)=>{
    
          var active = false;
          if(req.param('isActive')=="True") { active=true; }
           
            var _user_role = new User_Role({
                
                 roleName : req.param('roleName'),
                 roleId :  req.param('accessibilityLV'),
                 accessibilityLV:  req.param('accessibilityLV'),
                 isActive : active,
                 isDel : false,
                 lastupdate : new Date().getTime(),
            });
           doc = await _user_role.save();
        res.redirect('../../../userroles');
})



//======================================================
//Test Add Shop_Service
router.get('/t_add_service',async (req,res)=>{
     
            var _service = new Service({
                name : "Massage",
                picture : "",
                description: "If u know what I mean",
                isActive: true,
                lastupdate : new Date().getTime()
            });
           doc = await _service.save();
    }
)

router.get('/services',(req,res)=>{
    Service.find({
        //all
    }).then((service)=>{ res.send({service } );
    }).catch((e)=> { res.status(400).send(e) } );
})

router.get('/services/del/:id',async(req,res)=>{
       await Service.deleteOne(
                {   _id     : req.params.id}
            );
        res.redirect('../../../services');
})

router.get('/services/up',async(req,res)=>{
      var active = false;
          if(req.param('isActive')=="True") { active=true; }
       await Service.findOneAndUpdate(
                {   _id     : req.param('id')},
                {
                    name : req.param('name'),
                    picture :  req.param('picture'),
                    description : req.param('description'),
                    isActive : active,
                    lastupdate : new Date().getTime(),
                    
                },
                {upsert:true}
            );
        res.redirect('../../../services');
})

router.get('/services/add',async(req,res)=>{
    
          var active = false;
          if(req.param('isActive')=="True") { active=true; }
           
            var _service = new Service({
                
                 name : req.param('name'),
                 picture :  req.param('picture'),
                 description : req.param('description'),
                 isActive : active,
                 lastupdate : new Date().getTime(),
            });
           doc = await _service.save();
        res.redirect('../../../services');
})



//======================================================
// User_service ****[Mainly for Provider]****

router.post('/user_service_get_servicename',(req,res)=>{
    User_Service.find({
            user_id     : req.param('user_id')
    },).then((user_service)=>{
        
         var storeServiceId = [];
         for(let i=0;i< user_service.length;i++)
         {
             storeServiceId.push(user_service[i].service_id);
         }
         Service.find({
             _id : {$in: storeServiceId}
        }).then((service)=>{ res.send({service } );
        }).catch((e)=> { res.status(400).send(e) } )
            
        //res.send({user_service } );
    }).catch((e)=> { res.status(400).send(e) } );
})



router.post('/user_service_get_all',(req,res)=>{
     User_Service.find({
        //all
    }).then((user_service)=>{ res.send({user_service } );
    }).catch((e)=> { res.status(400).send(e) } );
})




router.get('/user_service/del',async(req,res)=>{
        await User_Service.deleteOne(
                {   user_id     : req.param('user_id'),
                    service_id  : req.param('service_id'),
                }
            );
     res.redirect('../../../users/profile');
        
        
        
})

//when web booking
router.get('/user_service_get_relation',(req,res)=>{
    Service.find({//1st 
        isActive : true
    }).then((services)=>{ 
        var storeServiceId = [];
         for(let i=0;i< services.length;i++)
         {
             storeServiceId.push(services[i]._id);
         }
        User_Service.find({ service_id : {$in: storeServiceId}
        }).then((user_service)=>{  //2nd
            var storeUserId = [];
            for(let i=0;i< user_service.length;i++)
            {
                storeUserId.push(user_service[i].user_id);
            }
            User.find({ _id : {$in: storeUserId}
            }).then((users)=>{  //3rd
                res.send({services, user_service, users } );
            }).catch((e)=> { res.status(400).send(e) } );//3rd
        }).catch((e)=> { res.status(400).send(e) } );//2nd
        
    }).catch((e)=> { res.status(400).send(e) } );//1st 
})




router.get('/user_service/up',async(req,res)=>{
      var active = false;
          if(req.param('isActive')=="True") { active=true; }
       await User_Service.findOneAndUpdate(
                {   user_id     : req.param('user_id'),
                    service_id  : req.param('service_id'),
                },
                {
                    user_id : req.param('user_id'),
                    service_id :  req.param('service_id'),
                    current_serveQue : req.param('current_serveQue'),
                    isActive : active,
                    lastupdate : new Date().getTime(),
                    
                },
                {upsert:true}
            );
        res.redirect('../../../users/profile');
})

//=====================================================


router.get('/shops',(req,res)=>{
    Shop.find({
        //all
    }).then((shops)=>{ res.send({shops } );
    }).catch((e)=> { res.status(400).send(e) } );
})
router.get('/shops/:id',(req,res)=>{
    
    Shop.findOne({
        id: id,
        // _creator: req.user._id
    }).then((shop) => {
        if (!shop) {
            return res.status(404).send();
        }
        return res.status(200).send({ shop });
    }).catch((e) => {
        return res.status(400).send();
    })
});

router.delete('/shops/:id', async(req, res) => {
    const id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    try {
        const shop = await Shop.findOneAndRemove({
            _id: id,
            // _creator: req.user._id
        })
        if (!shop) {
            return res.status(404).send();
        }
        return res.status(200).send({ shop });
    }
    catch (e) {
        res.status(400).send();
    }
});

router.patch('/shops/:id', (req, res) => {
    var id = req.params.id;
    // var body = _.pick(req.body, ['text', 'completed']);
    var body = _.pick(req.body, [
        // 'shopid', 
        'shopname',
        'explain', 'address',
        'business_hours', 'pic_avater',
        'pic_back', 
    ]);
    body.lastupdate = new Date().getTime()

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
  
    // Todo.findByIdAndUpdate(id, { $set: body }, { new: true }).then((shop) => {
    Shop.findOneAndUpdate({
        _id: id,
        // _creator: req.user.id
    }, {
        $set: body
    }, { new: true }).then((shop) => {
        if (!shop) {
            return res.status(404).send();
        }
        res.send({ shop });
    }).catch((e) => {
        res.status(400).send();
    })
})


//=====================================================


router.post('/t_post_api',async (req,res)=>{
     
        res.redirect('../');
          
    }
)
router.get('/t_get_api',async (req,res)=>{
        //res.redirect('../');
          res.send("5555");
    }
)

router.get('/t_add_user_service',async (req,res)=>{
            var _user_service = new User_Service({
                user_id : "5b83d09a06f8f41469bdb0cb",
                service_id : "5b839abc722d751d88023e32",
                current_serveQue: 0,
                isActive : true,
                lastupdate : new Date().getTime()
            });
           await _user_service.save();
           await res.redirect('/');
          
    })


router.get('/t_add_role',async (req,res)=>{
            var _user_role_1 = new User_Role({
                roleName : "Admin",
                roleId : 3,
                accessibilityLV: 3,
                isActive : true,
                lastupdate : new Date().getTime()
            });
           
            var _user_role_2 = new User_Role({
               
              
                roleName : "Provider",
                roleId : 2,
                accessibilityLV: 2,
                isActive : true,
                lastupdate : new Date().getTime()
            });
          
          var _user_role_3 = new User_Role({
               
              
                roleName : "Secretary",
                accessibilityLV: 1,
                roleId : 1,
                isActive : true,
                lastupdate : new Date().getTime()
            });
         
            var _user_role_4 = new User_Role({
               
              
                roleName : "Customer",
                accessibilityLV: 0,
                roleId : 0,
                isActive : true,
                lastupdate : new Date().getTime()
            });
           await _user_role_1.save();
           await _user_role_2.save();
           await _user_role_3.save();
           await _user_role_4.save();
           await res.redirect('/');
    })

    
router.post('/weblogin',async(req,res)=>{
    //check username and get salt
    User.findOne({
        username: { $eq:  req.body.user.username }
        //username: req.body.user.username,
        // _creator: req.user._id
    }).then((user) => {
        
        //return res.status(200).send(user);
       
        
        if (!user) {
            //return res.status(404).send({ msg : "Username or Password is Inccorrect!!"});
            return res.send({result :"failed", msg: "Username or Password is Inccorrect!!"} );
        }
        else //compare hash 
        {
            //return res.status(200).send(user.hash);
            
            var reqHash = bcrypt.hashSync(req.body.user.username + req.body.user.pwd, user.salt);
            if(reqHash == user.hash)//if username and pwd is corrected
            {
                //create jwt
                 let token= jwt.sign({
                        //sub  : req.body.lineuserid,
                        //Userro : req.body.lineuserid,
                       },process.env.JWT_SECRET).toString();
                    var userinfo = {
                        user_id : user._id,
                        username  : req.body.user.username,
                        displayName : user.displayName,
                        picture : user.picture,
                        accessibiltyLv : user.USER_ROLE_id,
                        id_token    : token,
                        }
                  req.session.current_user = userinfo;
                  return res.send({result :"success", msg: "Login Successed", info: userinfo});
                  
            }
            else
            {
                return res.send({result :"failed", msg: "Username or Password is Inccorrect!!"} );
               
                 //return res.status(404).send({ msg : "Username or Password is Inccorrect!!"});
            }
          
        }
        
    }).catch((e) => {
        return   res.send({result :"failed", msg: "Cannot Connect to DB"} );
    }) 
})



router.post('/signup',async(req,res)=>{
    
    
    //check username
    User.findOne({
        username: { $eq:  req.body.user.username }
        //username: req.body.user.username,
        // _creator: req.user._id
    }).then((user) => {
        //if request username already existed
        if (user) {
            return res.send( {result :"failed",msg : "Dupplicate Username"});
        }
        else 
        {
            var gensalt = bcrypt.genSaltSync(10)
            var genhash = bcrypt.hashSync(req.body.user.username + req.body.user.pwd, gensalt);
             var _user = new User({
                username : req.body.user.username,
                hash: genhash,
                salt : gensalt,
                firstname : req.body.user.firstname,
                lastname : req.body.user.lastname,
                email: req.body.user.email,
                tel : req.body.user.tel,
                displayName : req.body.user.firstname,
                address : req.body.user.address,
                picture: req.body.user.picture,
                loginType : "normal",
                isValidated : false,
                USER_ROLE_id : 0,
                isActive: true,
                lastUpdate : new Date().getTime(),
            });
            
           //Save user
              _user.save(function (err, data) {
                if (err) 
                {
                    return res.send({result :"failed", msg: "Errors occured while saving data!!"} );
                }
                else //if saving successed
                {
                    //create user token to redirect to main menu
                    let token= jwt.sign({
                        //sub  : req.body.lineuserid,
                        //Userro : req.body.lineuserid,
                       },process.env.JWT_SECRET).toString();
                    var userinfo = {
                        user_id : data._id,
                        username  : req.body.user.username,
                        displayname : req.body.user.username,
                        accessibiltyLv : 0,
                        id_token    : token,
                        }
                     req.session.current_user = userinfo;
                     res.send({result :"success", msg: "Save successed", info: userinfo});
                    
                }
               
              });
        
        }
        
    }).catch((e) => {
        return res.send({result :"failed", msg: "Cannot connect to DB"});
    }) 
})


router.post('/logout',async(req,res)=>{
    
   req.session.current_user = null;
   res.send({result :"success", msg: "Logout Completed!!"} );
 
})

//=================Mailbox===============

router.get('/mailbox',(req,res)=>{
    MailBox.find({
        to_user_web_id : req.param('id')
    }).then((mailbox_to_currentUser)=>{
        
        MailBox.find({
         from_user_web_id : req.param('id')
         }).then((mailbox_from_currentUser )=>{
             
             res.send({mailbox_to_currentUser , mailbox_from_currentUser} );
         }).catch((e)=> { res.status(400).send(e) } );
        
        
    }).catch((e)=> { res.status(400).send(e) } );
})

router.post('/mailbox/update', async(req,res)=>{

    await MailBox.findOneAndUpdate(
                {   _id     : ObjectId(req.body._id) },
                {
                    IsSeen : true,
                },
                {upsert:true}
            );
    await res.send("OK" );
})


router.post('/sendMsg',async(req,res)=>{
    
   
    
     var _mailbox;
     if(req.body.msgInfo.messageType == "text")
     {
          _mailbox = MailBox({
                
                         from_user_web_id :  req.body.msgInfo.from_user_web_id,
                         from_user_line_id : "",
                         from_user_web_displayName : req.body.msgInfo.from_user_web_displayName,
                         from_user_src_imageProfile : "",
                         to_user_web_id : req.body.msgInfo.to_user_web_id,
                         to_user_line_id :  req.body.msgInfo.to_user_line_id,
                         to_user_web_displayName : req.body.to_user_web_displayName,
                         messageType : req.body.msgInfo.messageType,
                         messageInfo : req.body.msgInfo.messageInfo,
                         IsSeen : true,
                         lastupdate :new Date().getTime(),
                         /*
                         from_user_displayName : req.body.msgInfo.displayName,
                         to_user_id : req.body.msgInfo.to_user_id,
                         message : req.body.msgInfo.message,
                         lastupdate : new Date().getTime(),
                         */
                        });
             await _mailbox.save();
                     
             await clientBot.pushMessage(req.body.msgInfo.to_user_line_id,{
                type:'text',
                text:"From: "+ req.body.msgInfo.from_user_web_displayName+ ". Msg :"+req.body.msgInfo.messageInfo
             })
             await res.send({result :"success", msg: "test"} );
     }
     else if(req.body.msgInfo.messageType == "location")
     {
         _mailbox = MailBox({
                
                         from_user_web_id :  req.body.msgInfo.from_user_web_id,
                         from_user_line_id : "",
                         from_user_web_displayName : req.body.msgInfo.from_user_web_displayName,
                         from_user_src_imageProfile : "",
                         to_user_web_id : req.body.msgInfo.to_user_web_id,
                         to_user_line_id :  req.body.msgInfo.to_user_line_id,
                         to_user_web_displayName : req.body.to_user_web_displayName,
                         messageType : req.body.msgInfo.messageType,
                         
                         messageInfo :"address="+ req.body.msgInfo.msg_address +
                        "&latitude="+req.body.msgInfo.msg_latitude+
                        "&longitude="+req.body.msgInfo.msg_longitude,
                        
                         IsSeen : true,
                         lastupdate :new Date().getTime(),
                         /*
                         from_user_displayName : req.body.msgInfo.displayName,
                         to_user_id : req.body.msgInfo.to_user_id,
                         message : req.body.msgInfo.message,
                         lastupdate : new Date().getTime(),
                         */
                        });
            await _mailbox.save();
                     
            await clientBot.pushMessage(req.body.msgInfo.to_user_line_id,{
                type:'location',
                //text:"From: "+ req.body.msgInfo.from_user_web_displayName+ ". Msg :"+req.body.msgInfo.messageInfo
                title: "Location from "+ req.body.msgInfo.from_user_web_displayName,
                address: req.body.msgInfo.msg_address,
                latitude: req.body.msgInfo.msg_latitude,
                longitude: req.body.msgInfo.msg_longitude
             })
             await res.send({result :"success", msg: "test"} );
     }
     else
     {
         
     }
     
      
    
})




/*
router.get('/webhook', async (req, res) => {

  //var ip = "207.97.227.239";
  //var geo = await testGeoIP("58.10.224.143");  
  
  //await res.send(geo.country);
  //await res.send(req.socket.address().address);
  
   await res.status(200).send("OK");
  
   //await replyYesNoTemplate(clientBot_2, req.body.events[0].replyToken, message, "qq");
  
  
  
})
*/
/*
const app2 = express()
const bodyParser = require('body-parser')

app2.use(bodyParser.json()) // for parsing application/json
app2.use(bodyParser.urlencoded({
  extended: true
})) // for parsing application/x-www-form-urlencoded
*/
/*
router.post('/webhook', (req, res) => {
    //res.json(result)
    clientBot.pushMessage("U6a0764890cdbb5393b84accb7b37c266",  {
     type: "text",
        text: "HIHI"
        }
      
 );
   res.status(200).json("xxx");
    
Promise
.all(req.body.events.map(handleEvent))
.then((result) => res.json(result));

});
*/


module.exports = {
    path: '/api',
    handler: router
}
