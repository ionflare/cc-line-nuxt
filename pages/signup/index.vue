
<template>
<div>

<!-- [main] -->
<v-content>
  <v-container fluid>
  <h1> Sign Up</h1>
   
    <v-stepper v-model="e1">
      <v-stepper-header>
        <v-stepper-step :complete="e1 > 1" step="1">Accept an Agreement</v-stepper-step>
  
        <v-divider></v-divider>
  
        <v-stepper-step :complete="e1 > 2" step="2">Create your Account(1/2)</v-stepper-step>
  
        <v-divider></v-divider>
  
       
      </v-stepper-header>
  
      <v-stepper-items>
        <v-stepper-content step="1">
          <v-card
            class="mb-5"
            color="grey lighten-1"
           >
                
                  
                  <v-flex md12 lg12>
                      <v-card dark color="secondary">
                        <v-card-text class="px-0"><h2>Agreement</h2></v-card-text>
                      </v-card>
                  </v-flex>
                <v-card-text>
                  <p class="text-sm-left">1. Term of use 1 Blah Blah Blah Blah</p>
                  <p class="text-sm-left">2. Term of use 2 Blah Blah Blah Blah</p>
                  <p class="text-sm-left">3. Term of use 3 Blah Blah Blah Blah</p>
                  <p class="text-sm-left">4. Term of use 4 Blah Blah Blah Blah</p>
                  <p class="text-sm-left">5. Term of use 5 Blah Blah Blah Blah</p>
              
                </v-card-text>
            
            
            
            
          </v-card>
            
            
            
          <v-checkbox color="success" label="I understand and accept this agreement." v-model="checkbox1"></v-checkbox>  
          <v-btn flat>Previous</v-btn>
          <v-btn
            color="blue"
            @click="e1 = 2">
            Next
          </v-btn>
  
          
        </v-stepper-content>
  
        <v-stepper-content step="2">
          <v-card
            class="mb-5"
            color="grey lighten-1">
                <v-flex md12 lg12>
                      <v-card dark color="secondary">
                        <v-card-text class="px-0"><h2>Create your account</h2></v-card-text>
                      </v-card>
                </v-flex>
                
                <v-flex md12 lg12>
                  <v-layout row wrap>
                     <v-flex md2>
                          <v-card-text class="px-0"><h2>Username :</h2></v-card-text>
                      </v-flex>
                      <v-flex md3>
                              <v-text-field
                                v-model="username"
                                :rules="rules"
                                counter="25"
                                hint="This field uses counter prop"
                                label="Regular"
                              ></v-text-field>
                      </v-flex>
                          <v-flex md2>
                          <v-card-text class="px-0"><h2>Password :</h2></v-card-text>
                      </v-flex>
                      <v-flex md3>
                        
                         <v-text-field
                          v-model="pwd"
                          :append-icon="show1 ? 'visibility_off' : 'visibility'"
                          :rules="[rules.required, rules.min]"
                          :type="show1 ? 'text' : 'password'"
                          name="input-10-1"
                          label=""
                          hint="At least 8 characters"
                          counter
                          @click:append="show1 = !show1"
                        ></v-text-field>
                      </v-flex>
                  </v-layout>    
                  
                  <v-layout row wrap>
                     <v-flex md2>
                          <v-card-text class="px-0"><h2>Firstname :</h2></v-card-text>
                      </v-flex>
                      <v-flex md3>
                              <v-text-field
                               v-model="firstname"
                              ></v-text-field>
                      </v-flex>
                     <v-flex md2>
                          <v-card-text class="px-0"><h2>Lastname :</h2></v-card-text>
                      </v-flex>
                      <v-flex md3>
                              <v-text-field
                               v-model="lastname"
                              ></v-text-field>
                      </v-flex>
                   </v-layout>    
                  
                     <v-layout row wrap>
                     <v-flex md2>
                          <v-card-text class="px-0"><h2>Addresss :</h2></v-card-text>
                      </v-flex>
                      <v-flex md3>
                              <v-text-field
                               v-model="address"
                              ></v-text-field>
                      </v-flex>
                     <v-flex md2>
                          <v-card-text class="px-0"><h2>Picture :</h2></v-card-text>
                      </v-flex>
                      <v-flex md3>
                              <v-text-field
                                v-model="picture"
                              ></v-text-field>
                      </v-flex>
                  </v-layout>        
                  </v-layout>    
                  
                     <v-layout row wrap>
                     <v-flex md2>
                          <v-card-text class="px-0"><h2>Email :</h2></v-card-text>
                      </v-flex>
                      <v-flex md3>
                              <v-text-field
                               v-model="email"
                              ></v-text-field>
                      </v-flex>
                     <v-flex md2>
                          <v-card-text class="px-0"><h2>Tel :</h2></v-card-text>
                      </v-flex>
                      <v-flex md3>
                              <v-text-field
                               v-model="tel"
                              ></v-text-field>
                      </v-flex>
                  </v-layout>    
                  
                  
                </v-flex>
                
          </v-card>
        
          <v-btn flat  @click="e1 = 1">Previous</v-btn>
          <v-btn
            color="green"
            @click="signUp"
          >
            Done
          </v-btn>
       </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  
  </v-container>
</v-content>
<!-- [footer] -->
<v-footer  app inset>
      <span class="white--text">&copy; 2018 footer</span>
</v-footer>

</div>
</template>
<script>
export default{
  data () {
    return {
      e1: 0,
      checkbox1: true,
       show1: false,
      show2: true,
      show3: false,
      show4: false,
      
      username: '',
      pwd: '',
      firstname: '',
      lastname: '',
      email: '',
      tel: '',
      displayName: '',
      address: '',   
      picture: '',
      
      rules: {
        required: value => !!value || 'Required.',
        counter: value => value.length <= 20 || 'Max 20 characters',
        min: v => v.length >= 8 || 'Min 8 characters',
        emailMatch: () => ('The email and password you entered don\'t match'),
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        }
      }
    
    }
  },
  methods:{
      async signUp(context){
          try{
            let data = await this.$axios.$post('/api/signup',{
            user :{
                    username : this.username,
                    pwd : this.pwd,
                    firstname : this.firstname,
                    lastname : this.lastname,
                    email: this.email,
                    tel : this.tel,
                    displayName : this.displayName,
                    address : this.address,
                    picture: this.picture,
                    }   
            });
            if(data.result == "success")
            {
                //create
                 var payload = {
                 username : data.username,
                 displayName : data.displayName,
                 USER_ROLE_id: data.USER_ROLE_id,
                 picture: data.picture,
                 loginType: data.loginType
                }
                //userToken = jwt.sign(payload, this.privateKeyJWT, { expiresIn:  2*60*60, });
                //this.$store.commit('set_current_user', userToken);
                alert(data.msg);
            }
           else{
               alert(data.msg);
           }
          }catch(e){
            console.log(e);
          }
        },
         
    },
}    
  



</script>
<style>
*   {text-align: center}
h2   {text-align: center;  color: Black;}
p    {color: black;}
</style>