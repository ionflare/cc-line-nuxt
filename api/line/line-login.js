"use strict";

const request = require("request");
const jwt = require("jsonwebtoken");
const secure_compare = require("secure-compare");
const crypto = require("crypto");
const api_version = "v2.1";

/*
const lineLogin_ori =  require("line-login");
const login_ori = new lineLogin_ori({
    channel_id: process.env.LINE_LOGIN_CHANNEL_ID,
    channel_secret: process.env.LINE_LOGIN_CHANNEL_SECRET,
    //callback_url: process.env.LINE_LOGIN_CALLBACK_URL,
    callback_url: 'https://3c9df73438794ae49a6a317ae2eeb187.vfs.cloud9.ap-southeast-1.amazonaws.com/api/callback',
    prompt: "consent" // 追加
});
*/

let Promise = require("bluebird");
Promise.promisifyAll(request);

class LineLogin {
    
    constructor(options){
        const required_params = ["channel_id", "channel_secret", "callback_url"];
        const optional_params = ["scope", "prompt", "bot_prompt", "session_options", "verify_id_token"];

        // Check if required parameters are all set.
        required_params.map((param) => {
            if (!options[param]){
                throw new Error(`Required parameter ${param} is missing.`);
            }
        })

        // Check if configured parameters are all valid.
        Object.keys(options).map((param) => {
            if (!required_params.includes(param) && !optional_params.includes(param)){
                throw new Error(`${param} is not a valid parameter.`);
            }
        })

        this.channel_id = options.channel_id;
        this.channel_secret = options.channel_secret;
        this.callback_url = options.callback_url;
        this.scope = options.scope || "profile openid";
        this.prompt = options.prompt;
        this.bot_prompt = options.bot_prompt || "normal";
        if (typeof options.verify_id_token === "undefined"){
            this.verify_id_token = true;
        } else {
            this.verify_id_token = options.verify_id_token;
        }
    }
    
    /*
    auth_ori(){
       login_ori.auth();
    }
     
    callback_ori(s, f){
        
    }
    
   */
    
    
    auth(){
        return (req, res, next) => {
            let state = req.session.line_login_state = LineLogin._random();
            let nonce = req.session.line_login_nonce = LineLogin._random();
            let url = this.make_auth_url(state, nonce);
            return res.redirect(url);
        }
    }
    
   
     callback(s, f){
        return (req, res, next) => {
            const code = req.query.code;
            const state = req.query.state;
            const friendship_status_changed = req.query.friendship_status_changed;

            if (!code){
                //debug("Authorization failed.");
                return f(new Error("Authorization failed."));
            }
            if (!secure_compare(req.session.line_login_state, state)){
                //debug("Authorization failed. State does not match.");
                return f(new Error("Authorization failed. State does not match."));
            }
            //debug("Authorization succeeded.");

            this.issue_access_token(code).then((token_response) => {
                if (this.verify_id_token && token_response.id_token){
                    let decoded_id_token;
                    // const id_token_raw = token_response.id_token
                    try {
                        //Store raw(origin) id_token
                        token_response.id_token_raw = token_response.id_token

                        decoded_id_token = jwt.verify(
                            token_response.id_token,
                            this.channel_secret,
                            {
                                audience: this.channel_id,
                                issuer: "https://access.line.me",
                                algorithms: ["HS256"]
                            }
                        );
                        if (!secure_compare(decoded_id_token.nonce, req.session.line_login_nonce)){
                            throw new Error("Nonce does not match.");
                        }
                        //debug("id token verification succeeded.");
                        token_response.id_token = decoded_id_token;
                    } catch(exception) {
                        //debug("id token verification failed.");
                        if (f) return f(req, res, next, new Error("Verification of id token failed."));
                        throw new Error("Verification of id token failed.");
                    }
                }
                s(req, res, next, token_response);
            }).catch((error) => {
                //debug(error);
                if (f) return f(req, res, next, error);
                throw error;
            });
        }
    }
    
    
    
    make_auth_url(state, nonce){
        const client_id = encodeURIComponent(this.channel_id);
        const redirect_uri = encodeURIComponent(this.callback_url);
        const scope = encodeURIComponent(this.scope);
        const prompt = encodeURIComponent(this.prompt);
        const bot_prompt = encodeURIComponent(this.bot_prompt);
        let url = `https://access.line.me/oauth2/${api_version}/authorize?response_type=code&client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope}&bot_prompt=${bot_prompt}&state=${state}`;
        if (this.prompt) url += `&prompt=${encodeURIComponent(this.prompt)}`;
        if (nonce) url += `&nonce=${encodeURIComponent(nonce)}`;
        return url
    }
    
    
    issue_access_token(code){
        const url = `https://api.line.me/oauth2/${api_version}/token`;
        const form = {
            grant_type: "authorization_code",
            code: code,
            redirect_uri: this.callback_url,
            client_id: this.channel_id,
            client_secret: this.channel_secret
        }
        return request.postAsync({
            url: url,
            form: form
        }).then((response) => {
            if (response.statusCode == 200){
                return JSON.parse(response.body);
            }
            return Promise.reject(new Error(response.statusMessage));
        });
    }
    
    
    
    
  
     static _random(){
        return crypto.randomBytes(20).toString('hex');
    }
}

module.exports = LineLogin;