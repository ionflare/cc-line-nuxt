
<template>

<!-- [main] -->

  
     <!--Start If user already Logged In -->
   <!--
    <div v-if="$store.state.lineuser != null">
      <h2>CurrentUser</h2>
      {{currentUser}}
       <v-btn color="orange" @click="onDummyLogOut()">Log Out</v-btn>
     </div>
      -->
   
   
    <!--END If user already Logged In -->
    <!--Start If no user logged in  -->
    <!--
    <div v-if="$store.state.lineuser == null">
      
       <br>
       <h1>Test Sign Up</h1>
       <br>
      <v-btn color="green" @click="gotoSignUp">Sign UP</v-btn>
      
      <br>
      <h1>Test Dummy Login</h1>
          <v-flex >
            <v-text-field v-model="dummyid"
              label="input dummy lineuserid"
              outline
            ></v-text-field>
          </v-flex>
      <v-btn color="blue" @click="onDummyLogin()">Dummy Login</v-btn>
      <br>
       -->
      <!-- <p>{{items}}</p> -->
        <!--
      <hr>
       <br>
       <h1>Test Line Login</h1>
        <br>
      <v-btn color="green" @click="onDummyLogin()">Login by Line</v-btn>
    </div>
   -->
    <!--END If no user logged in  -->
<div>
<v-content>   
  <v-container fluid grid-list-md text-xs-center>
    
     <!--***[If no one has logged in yet -- layout]***-->
      <v-layout v-if="$store.state.current_user == null" row wrap>
        <v-flex md12 lg12>
           <v-card dark color="primary">
                  <v-card-text class="px-0"><h1>Log In</h1></v-card-text>
            </v-card>
        </v-flex>
        
         <v-flex md6 lg6><!--***[Begin Normal LogIn]***-->
         
           <v-card dark color="primary">
             <v-flex md12 lg12>
                      <v-card dark color="secondary">
                        <v-card-text class="px-0"><h2>Normal Log In</h2></v-card-text>
                      </v-card>
            </v-flex>
            
            <v-layout row wrap>
                <v-flex md9 lg9>
                  <v-layout row wrap>
                      <v-flex md4 lg4>
                         <v-card-text class="px-0">Username :</v-card-text>
                      </v-flex>
                       <v-flex md8 lg8>
                           <v-text-field v-model="username"
                                      label="username"
                                      outline >
                          </v-text-field>
                      </v-flex>
                       <v-flex md4 lg4>
                         <v-card-text class="px-0">Password :</v-card-text>
                      </v-flex>
                       <v-flex md8 lg8>
                               <v-text-field
                                      v-model="pwd"
                                      :append-icon="show1 ? 'visibility_off' : 'visibility'"
                                      :type="show1 ? 'text' : 'password'"
                                    
                                      @click:append="show1 = !show1"
                                      label="Password"
                                      outline >
                              </v-text-field> 
                                   
                      </v-flex>
                  </v-layout>
                </v-flex>
                
                
                 <v-flex md3 lg3>
                   <v-layout align-center justify-center row fill-height>
                     <v-card-text class="px-0">
                           <v-btn color="green" @click="onWebLogin()">Log In</v-btn>
                     </v-card-text>
                    </v-layout>   
                </v-flex>
            </v-layout>
              
            <v-flex md12 lg12>
                 <v-card dark color="secondary">
                     <v-layout row wrap>
                       <v-flex md6 lg6>
                          <v-card-text class="px-0">Forget your account?</v-card-text>
                       </v-flex>
                       <v-flex md6 lg6>
                           
                             <v-btn color="green" @click="onRecoverAcc()">Recover account</v-btn>
                         
                       </v-flex>
                     </v-layout>
                  </v-card>
            </v-flex>
             
            
          </v-card>
        </v-flex><!--***[End Normal LogIn]***-->
        
        
        
        
        
        <v-flex md3 lg3>
           <v-card dark color="primary">
              
                   <v-flex md12 lg12>
                      <v-card dark color="secondary">
                            <v-card-text class="px-0"><h2>Line Log In</h2></v-card-text>
                      </v-card>
                    </v-flex>
                    <v-layout row wrap><!--***[Begin Line LogIn]***-->
                    <v-flex md12 lg12>
                      <v-card dark color="primary">
                             <v-btn color="green" @click="onLineLogin()">Line Login</v-btn>
                      </v-card>
                    </v-flex>
              </v-layout>  <!--***[End Line LogIn]***-->    
            </v-card>
        </v-flex>
        
        
        
        
        <v-flex md3 lg3>
           <v-card dark color="primary">
                 <v-flex md12 lg12>
                      <v-card dark color="secondary">
                            <v-card-text class="px-0"><h3>Don't have any acount yet?</h3></v-card-text>
                      </v-card>
                    </v-flex>
              <v-layout row wrap><!--***[Begin Sign Up]***-->
                 
                    <v-flex md12 lg12>
                      <v-card dark color="primary">
                             <v-btn color="blue" @click="gotoSignUp()">Sign Up</v-btn>
                      </v-card>
                    </v-flex>
              </v-layout>  <!--***[End Sign Up]***-->    
            </v-card>
        </v-flex>
        
    </v-layout>  <!--***{End Point If no one has logged in yet]*** -->
        
        
     <!--***[If already logged in -- layout]***-->    
    <v-layout v-else row wrap>
       <h2>CurrentUser</h2>
          {{currentUser}}
       <v-btn color="orange" @click="onLogOut()">Log Out</v-btn>
  
    </v-layout>
        
       
    </v-container>
  
  
</v-content>
<!-- [footer] -->
<v-footer  app inset>
      <span class="white--text">&copy; 2018 footer</span>
</v-footer>

</div>
</template>



<style>
*{
  text-align: center; 
}
</style>
<script>
const jwt = require("jsonwebtoken");
export default {
  data() {
    return {
        username:'',
        pwd:'',
        show1: false,
      // items:null
    };
  },
   computed:{
    currentUser(){
      return this.$store.getters.currentUser;
    },
  },
  methods:{
      async onWebLogin(context){
          try{
            let data = await this.$axios.$post('/api/weblogin',{
            user :{
                    username : this.username,
                    pwd : this.pwd
                }   
            });
            if(data.result == "success")
            {
                //alert(data.info.username);
                //create
                /*
                 var payload = {
                 username : data.username,
                 displayName : data.displayName,
                 accessibleLV: data.USER_ROLE_id,
                 picture: data.picture,
                 loginType: data.loginType
                }
               
                */
                //alert(data.msg);
                //this.$store.commit('set_current_user', data.data);
                
                location.href = "/";
                //var userinfo = jwt.sign(payload, this.privateKeyJWT, { expiresIn:  2*60*60, });
                 
            }
           else{
               alert(data.msg);
           }
          }catch(e){
            console.log(e);
          }
        },
        async onLogOut(context){
          try{
            
            let data = await this.$axios.$post('/api/logout');
            this.$store.commit('clearUser');
            location.href="/";
          }catch(e){
            console.log(e);
          }
         
    },
    onLineLogin(){
         
        location.href ="../api/linelogin";
        //alert(this.activeCard);
    
        
        
      //alert("This Process is under construction!!");
      //location.href = "/signup";
    },
    onRecoverAcc(){
         alert("This Process is under construction!!");
      //location.href = "/signup";
    },
    gotoSignUp(){
      location.href = "/signup";
    }
  }//end methods
};
</script>