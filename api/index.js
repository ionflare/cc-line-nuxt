
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
const { ObjectID } = require("mongodb")
var { mongoose } = require('./db/mongoose');
const {User} = require("./models/user")
//var { Todo } = require("./models/todo");
var { Shop } = require("./models/shop")
var { BookInfo } = require("./models/bookinfo")
var { Service } = require("./models/service")
var { User_Role } = require("./models/user_role")
//var { Shop_Service } = require("./models/service")
//var { Shop_Service } = require("./models/shop_service")
//var { authenticate } = require("./middleware/authenticate")
//var { authenticate_admin } = require("./middleware/authenticate_admin")

/** LINE LOGIN , LINE MESSAGE */
 const line_login = require("line-login"); //module
//const line_login = require("./line/line-login"); //custom



const line_message = require('@line/bot-sdk');
const config = {
      channelAccessToken: process.env.LINE_MESSAGE_CHANNEL_ACCESS_TOKEN,
      channelSecret: process
      .env.LINE_MESSAGE_CHANNEL_SECRET,
}
const line_client = new line_message.Client(config)

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


router.get('/dobooking/:id',(req,res)=>{
    
    var id = req.params.id;
    Shop.findOne({
        //shopid: id,
        id: id
        // _creator: req.user._id
    }).then((shops) => {
        if (!shops) {
            return res.status(404).send();
             //res.redirect('../shops');
        }
        req.session.bookingShop = req.params.id;
        //return res.status(200).send({ shop });
        res.redirect('../auth');
        
    }).catch((e) => {
        return res.status(400).send();
        //res.redirect('../shops');
    })
    
})


// 認証フローを開始するためのルーター設定。
router.get("/auth", login.auth());

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




//======================================================
router.get('/bookinfo',(req,res)=>{
    BookInfo.find({
        //all
    }).then((bookinfo)=>{ res.send({bookinfo } );
    }).catch((e)=> { res.status(400).send(e) } );
})

//======================================================

router.get('/users',(req,res)=>{
    User.find({
        //all
    }).then((user)=>{ res.send({ user } );
    }).catch((e)=> { res.status(400).send(e) } );
})


//======================================================
// User Role

router.get('/user_roles',(req,res)=>{
    User_Role.find({
         isDel: { $eq: false }
        //all
    }).then((user_roles)=>{
        res.send({user_roles } );
          //res.redirect('../');
    }).catch((e)=> { res.status(400).send(e) } );
})

router.get('/user_roles/del/:id',async(req,res)=>{
       await User_Role.findOneAndUpdate(
                {   _id     : req.params.id},
                {
                    isDel : true,
                    lastupdate : new Date().getTime(),
                },
                {upsert:true}
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
                    accessibleLV : parseInt(req.param('accessibleLV')),
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
                 accessibleLV : parseInt(req.param('accessibleLV')),
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



router.get('/t_add_role',async (req,res)=>{
            var _user_role_1 = new User_Role({
                roleName : "Admin",
                accessibleLV: 4,
                isActive : true,
                lastupdate : new Date().getTime()
            });
           
            var _user_role_2 = new User_Role({
               
              
                roleName : "Provider",
                accessibleLV: 3,
                isActive : true,
                lastupdate : new Date().getTime()
            });
          
          var _user_role_3 = new User_Role({
               
              
                roleName : "Secretary",
                accessibleLV: 2,
                isActive : true,
                lastupdate : new Date().getTime()
            });
         
            var _user_role_4 = new User_Role({
               
              
                roleName : "Customer",
                accessibleLV: 1,
                isActive : true,
                lastupdate : new Date().getTime()
            });
           await _user_role_1.save();
           await _user_role_2.save();
           await _user_role_3.save();
           await _user_role_4.save();
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
                        username  : req.body.user.username,
                        displayname : req.body.user.username,
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








module.exports = {
    path: '/api',
    handler: router
}
