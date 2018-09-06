
<template>
<v-content>
  <v-container  fluid grid-list-md>
      <!--***[BEGIN POINT Test Hash]***-->
           <v-layout  justify-center>
              <v-flex md10>
                  <v-card dark color="grey lighten-1">
                       <v-layout  justify-center>
                            <v-flex md12 >
                                  <v-card dark color="green">
                                    <v-card-text class="px-0"><h2>Test Hash</h2></v-card-text>
                                  </v-card>
                              </v-flex>
                     </v-layout>
                      <v-layout  justify-center>
                          <v-flex md9 >
                               <v-layout  justify-center>
                                   <v-flex md4 >
                                      <v-card dark color="secondary">
                                        <v-card-text class="px-0"><h2>Username</h2></v-card-text>
                                      </v-card>
                                  </v-flex>
                                  <v-flex md8 >
                                      <v-card dark color="secondary">
                                        <v-card-text class="px-0">
                                                <v-text-field
                                                 v-model="username"
                                                  hint="This field uses counter prop"
                                                  label="Regular"
                                                ></v-text-field>
                                            </v-card-text>
                                      </v-card>
                                  </v-flex>
                               </v-layout>       
                                <v-layout  justify-center>
                                   <v-flex md4 >
                                      <v-card dark color="secondary">
                                        <v-card-text   class="px-0"><h2>Password</h2></v-card-text>
                                      </v-card>
                                  </v-flex>
                                  <v-flex md8 >
                                      <v-card dark color="secondary">
                                        <v-card-text class="px-0">
                                            <v-text-field v-model="password"
                                                  hint="This field uses counter prop"
                                                  label="Regular"
                                                ></v-text-field>
                                        </v-card-text>
                                      </v-card>
                                  </v-flex>
                               </v-layout>       
                                <v-layout  justify-center>
                                   <v-flex md4 >
                                      <v-card dark color="secondary">
                                        <v-card-text class="px-0"><h2>Salt</h2></v-card-text>
                                      </v-card>
                                  </v-flex>
                                  <v-flex md8 >
                                       <v-card dark color="secondary">
                                        <v-card-text  class="px-0">{{salt}}</v-card-text>
                                      </v-card>
                                  </v-flex>
                               </v-layout>       
                          </v-flex>
                          <v-flex md3 >
                              <v-layout align-center justify-center column fill-height>
                                <v-btn
                                    color="blue"
                                    @click="gensalt">
                                    Gen new Salt
                                  </v-btn>
                             </v-layout>   
                          </v-flex>
                          
                      </v-layout>   
                     <v-layout  justify-center>
                         <v-flex md3 >
                             <v-card dark color="secondary">
                                        <v-card-text class="px-0"><h2>Result</h2></v-card-text>
                              </v-card>
                         </v-flex>     
                          <v-flex md9 >
                               <v-card dark color="secondary">
                                        <v-card-text class="px-0">{{Hash_result}}</v-card-text>
                              </v-card>
                         </v-flex> 
                    </v-layout>   
                  </v-card>
              </v-flex>
          </v-layout>          
     <!--***[END POINT Test Hash]***-->  
     
     
     <!--***[BEGIN POINT Test Token for Authorization]***-->
         <v-layout  justify-center>
              <v-flex md10>
                  <v-card dark color="grey lighten-1">
                       <v-layout  justify-center>
                            <v-flex md12 >
                                  <v-card dark color="pink">
                                    <v-card-text class="px-0"><h2>Test JSON WEB TOKEN</h2></v-card-text>
                                  </v-card>
                              </v-flex>
                     </v-layout>
                      <v-layout  justify-center>
                          <v-flex md9 >
                               <v-layout  justify-center>
                                   <v-flex md4 >
                                      <v-card dark color="secondary">
                                        <v-card-text class="px-0"><h2>PayLoad username</h2></v-card-text>
                                      </v-card>
                                  </v-flex>
                                  <v-flex md8 >
                                      <v-card dark color="secondary">
                                        <v-card-text class="px-0">
                                                <v-text-field
                                                 v-model="usernameJWT"
                                                  hint="This field uses counter prop"
                                                  label="Regular"
                                                ></v-text-field>
                                            </v-card-text>
                                      </v-card>
                                  </v-flex>
                               </v-layout>       
                                <v-layout  justify-center>
                                   <v-flex md4 >
                                      <v-card dark color="secondary">
                                        <v-card-text   class="px-0"><h2>Expire In (second)</h2></v-card-text>
                                      </v-card>
                                  </v-flex>
                                  <v-flex md8 >
                                      <v-card dark color="secondary">
                                        <v-card-text class="px-0">
                                            <input v-model.number="expJWT" type="number">
                                        </v-card-text>
                                      </v-card>
                                  </v-flex>
                               </v-layout>       
                                 <v-layout  justify-center>
                                   <v-flex md4 >
                                      <v-card dark color="secondary">
                                        <v-card-text   class="px-0"><h2>Private Key</h2></v-card-text>
                                      </v-card>
                                  </v-flex>
                                  <v-flex md8 >
                                      <v-card dark color="secondary">
                                        <v-card-text class="px-0">
                                            <v-text-field v-model="privateKeyJWT"
                                                  hint="This field uses counter prop"
                                                  label="Regular"
                                                ></v-text-field>
                                        </v-card-text>
                                      </v-card>
                                  </v-flex>
                               </v-layout>    
                          </v-flex>
                          <v-flex md3 >
                              <v-layout align-center justify-center column fill-height>
                                <v-btn
                                    color="blue"
                                    @click="genToken">
                                    Get Token
                                  </v-btn>
                                  <v-btn
                                    color="green"
                                    @click="checkExpJwt">
                                    Check EXP
                                  </v-btn>
                             </v-layout>   
                          </v-flex>
                          
                          
                      </v-layout>   
                     <v-layout  justify-center>
                         <v-flex md3 >
                             <v-card dark color="pink">
                                        <v-card-text class="px-0"><h2>Encoded JWT</h2></v-card-text>
                              </v-card>
                         </v-flex>     
                          <v-flex md9 >
                               <v-card dark color="secondary">
                                        <v-card-text  class="px-0">{{enTokenJWT}}</v-card-text>
                              </v-card>
                         </v-flex> 
                    </v-layout>   
                    
                     <v-layout  justify-center>
                         <v-flex md3 >
                             <v-card dark color="pink">
                                        <v-card-text class="px-0"><h2>Decoded JWT</h2></v-card-text>
                              </v-card>
                         </v-flex>     
                          <v-flex md9 >
                               <v-card dark color="secondary">
                                        <v-card-text class="px-0">{{deTokenJWT}}</v-card-text>
                              </v-card>
                         </v-flex> 
                    </v-layout>   
                    
                    <v-layout  justify-center>
                         <v-flex md3 >
                             <v-card dark color="pink">
                                        <v-card-text class="px-0"><h2>Already Expired?</h2></v-card-text>
                              </v-card>
                         </v-flex>     
                          <v-flex md9 >
                               <v-card dark color="secondary">
                                        <v-card-text class="px-0">{{isExpiredJWT}}</v-card-text>
                              </v-card>
                         </v-flex> 
                    </v-layout>   
                     
                    <v-layout  justify-center>
                         <v-flex md3 >
                             <v-card dark color="pink">
                                        <v-card-text class="px-0"><h2>Current Date Time</h2></v-card-text>
                              </v-card>
                         </v-flex>     
                          <v-flex md9 >
                               <v-card dark color="secondary">
                                        <v-card-text class="px-0">{{now}}</v-card-text>
                              </v-card>
                         </v-flex> 
                    </v-layout>   
                    
                    
                  </v-card>
              </v-flex>
          </v-layout>          
     <!--***[END POINT Test Token for Authorization]***-->  
     
     <input v-model.number="quantity" type="number"  min="1"
       max="10">
     
   
  </v-container> 
</v-content>
</template>
<script>
import bcrypt from 'bcryptjs';
const jwt = require("jsonwebtoken");

export default{
    data: ()=>{
     return {
         
         //****[testInputNumber Max Min]*********
         quantity:1,
          //****[Hash]****
         username : '',
         password:'',
         salt: bcrypt.genSaltSync(10),
          //****[JWT]****
         usernameJWT : 'xxxx',
         expJWT: 10,
         privateKeyJWT : 'aaaa',
         enTokenJWT:'',
         deTokenJWT:'',
         isExpiredJWT: '',
         now:''
     };
    },
    
    methods:{
        //****[Hash]****
        gensalt : function(){
          this.salt = bcrypt.genSaltSync(10);
        },
        //****[JWT]****
        
        genToken: function(){
            var dateNow = new Date();
            
            this.enTokenJWT = jwt.sign({usernameJWT: this.usernameJWT}, this.privateKeyJWT, { expiresIn: this.expJWT });
            this.deTokenJWT = jwt.verify(this.enTokenJWT, this.privateKeyJWT);
            this.now = dateNow.getTime()/1000;
        },
         checkExpJwt: function()
        {
            var isExpiredToken = false;

            var dateNow = new Date();
             this.now = dateNow.getTime()/1000;
            if(this.deTokenJWT.exp < (dateNow.getTime()/1000) )
            
            {
                   isExpiredToken = true;
            }
           this.isExpiredJWT = isExpiredToken;
        }
        
    },
    
    computed:{
         //****[Hash]****
        Hash_result: function()
        {
            
            var hash = bcrypt.hashSync(this.username+ this.password, this.salt);
            return hash;
        },
        //****[JWT]****
      
    }
}

</script>
<style>
 
* { text-align: center; }
</style>>