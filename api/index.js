
// require("dotenv").config(); //config for line add for linelogin move to nuxt.config.js
require('./config/config.js') //config for mongodb, jws
const _ = require("lodash")

/** Express */
const express = require("express");
//express-session,body-parser はnuxt.config.jsで設定
// [url is for get req.query]
//  https://github.com/nuxt/nuxt.js/issues/1909
const url = require('url')

/** MongoDB and Models */
const { ObjectID } = require("mongodb")
var { mongoose } = require('./db/mongoose');
const {LineUser} = require("./models/lineuser")
var { Todo } = require("./models/todo");
var { Shop } = require("./models/shop")
var { authenticate } = require("./middleware/authenticate")
var { authenticate_admin } = require("./middleware/authenticate_admin")

/** LINE LOGIN , LINE MESSAGE */
// const line_login = require("line-login"); //module
const line_login = require("./line/line-login"); //custom
const line_message = require('@line/bot-sdk');
const config = {
      channelAccessToken: process.env.LINE_MESSAGE_CHANNEL_ACCESS_TOKEN,
      channelSecret: process.env.LINE_MESSAGE_CHANNEL_SECRET,
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
        req.session.lineuser = userinfo
        try{ // Save LineUser to DB  
            doc = await LineUser.findOneAndUpdate(
                {   userid     :token_response.id_token.sub },
                {
                    displayname:token_response.id_token.name,
                    picture    :token_response.id_token.picture,
                    isfollow   :true,
                    lastupdate : new Date().getTime(),
                },
                {upsert:true}
            );
            res.redirect('/dashboard');
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

// POST /api/logout
router.post('/logout',(req,res)=>{
    console.log('--[/api/logout]')
    delete req.session.lineuser
    res.status(200).json({ok:true});
});

//======================================================
// LINE MESSAGE API (@line/bot-sdk)
//======================================================

// GET /api/lineusers
router.get('/lineusers',authenticate_admin, async (req,res)=>{
    console.log('--[/api/lineusers]')
    try{
        const lineusers = await LineUser.find();
        res.send({lineusers})
    }catch(error){
        res.status(400).send(e);
    }
});

// GET /api/line_push
router.post("/line_push",authenticate_admin, async(req,res)=>{
    debugger
    console.log('--[POST /test/line_push]');
    // var userId='U5b6986839debb86192d011f49fb2553e'; //Nakamura
    // Uc5943d1660983a3b628916e0efa1d715 //chanon
    var pushmessage =  'no post data';
    if(!req.body.userid || !req.body.message ){
        console.log('--Bad request body=--',req.body)
        return res.status('400').json({message:'Bad request'});
    }
    console.log('--req.body',req.body)
    userid = req.body.userid;
    pushmessage =  req.body.message;
   
    try{
        await line_client.pushMessage(userid,{type:'text',text:pushmessage})
        res.status(200).json({message: pushmessage});
    }catch(e){
        console.log(e.statusCode, e.message)
        return res.status(e.statusCode).json({message:'Bad request'});
    }
})

/**
 *  LINE MESSAGE API getProfile
 */
router.get('/profile/:id', async (req, res) => {
    console.log("--[/test_profile]");
    // var userid='U5b6986839debb86192d011f49fb2553e'; //Nakamura
    if(req.params.id){
      userid = req.params.id
    }
    try{
      var profile = await line_client.getProfile(userid);
      res.status(200).json(profile);
    }catch(e){
      console.log(e.statusCode, e.message)
      res.status(e.statusCode).send();
    }
});

//=====================================================
// TODO
//=====================================================
router.post('/todos', authenticate, async(req, res) => {
    var todo = new Todo({
        text: req.body.text,
        _creator: req.user._id
    });
    try{
      const doc = await todo.save();
      res.send(doc);
    }catch(e){
      res.status(400).send(e);
    }
});

router.get('/todos', authenticate, (req, res) => {
    Todo.find({
        _creator: req.user._id
    }).then((todos) => {
        res.send({ todos });
    }, (e) => {
        res.status(400).send(e);
    })
});

router.get('/todos/:id', authenticate, (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(400).send();
    }
  
    Todo.findOne({
        _id: id,
        _creator: req.user._id
    }).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        return res.status(200).send({ todo });
    }).catch((e) => {
        return res.status(400).send();
    })
});

router.delete('/todos/:id', authenticate, async(req, res) => {
    const id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    try {
        const todo = await Todo.findOneAndRemove({
            _id: id,
            _creator: req.user._id
        })
        if (!todo) {
            return res.status(404).send();
        }
        return res.status(200).send({ todo });
    }
    catch (e) {
        res.status(400).send();
    }
});

router.patch('/todos/:id', authenticate, (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
  
    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    }
    else {
        body.completed = false;
        body.completedAt = null;
    }
  
    // Todo.findByIdAndUpdate(id, { $set: body }, { new: true }).then((todo) => {
    Todo.findOneAndUpdate({
        _id: id,
        _creator: req.user.id
    }, {
        $set: body
    }, { new: true }).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        res.send({ todo });
    }).catch((e) => {
        res.status(400).send();
    })
})

//=====================================================
// Shop
//=====================================================
router.post('/shops',async(req,res)=>{
    var shop = new Shop({
        shopid   : req.body.shopid,
        shopname : req.body.shopname,
        explain  : req.body.explain,
        address  : req.body.address,
        business_hours  : req.body.business_hours,
        pic_avater  : req.body.pic_avater,
        pic_back  : req.body.pic_back,
        lastupdate :  new Date().getTime()
        // _creator: req.user._id
    });
    try{
      const doc = await shop.save();
      res.send(doc);
    }catch(e){
      res.status(400).send(e);
    }
});
router.get('/shops',(req,res)=>{
    Shop.find({
        //all
    }).then((shops)=>{ res.send({shops } );
    }).catch((e)=> { res.status(400).send(e) } );
});
router.get('/shops/:id',(req,res)=>{
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(400).send();
    }
  
    Shop.findOne({
        _id: id,
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
 // Test 
//=====================================================
router.get("/testlogin",authenticate,(req,res)=>{
    console.log("--[/testlogin w auth]");
    if(req.session.lineuser){
        res.status(200).json(req.session.lineuser)
    }else{
        res.status(404).json(null)
    }
    
});
router.get("/test/:id", (req, res) => {
    console.log("--[/test:id]");
    console.log("--id " ,req.params.id)
    // res.status(200).json({ message: "test get" });
    res.status(200).json({message:`hello test_id = ${req.params.id}`});
});

router.get("/testquery", (req, res) => {
    debugger;
    console.log(req.query)
    res.status(200).json({message:`test query}`});
});

module.exports = {
    path: '/api',
    handler: router
}
