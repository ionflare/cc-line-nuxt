<template>
    <v-content>    
       <v-container  fluid grid-list-md>
           <h1>Profile</h1>
           <br>
           <!--***[If current user is Admin]***-->
           <v-layout  justify-center v-if="$store.state.accessibiltyLv >= 3">
              <v-flex md12>
                  <h1>Admin</h1>
                  <h1>Under Construction</h1>
              </v-flex>
            </v-layout>
            <!--***[If current user is Provider]***-->
  
           <v-layout  justify-center v-if="$store.state.accessibiltyLv == 2">
              <v-flex md10>
                <v-card dark color="grey lighten-1">
                 <v-layout row wrap>
                   <v-flex md12 >
                      <v-card dark color="green">
                           <v-card-text class="px-0"><h2>Welcome Provider</h2></v-card-text>
                           </v-card>
                   </v-flex>            
                 </v-layout>
                 <v-layout  justify-center>
                          <v-flex md9 >
                               <v-layout  justify-center >
                                   <v-flex md4 >
                                      <v-card dark color="secondary">
                                        <v-card-text class="px-0"><h2>Username</h2></v-card-text>
                                      </v-card>
                                  </v-flex>
                                  <v-flex md8 >
                                      <v-card dark color="secondary">
                                        <v-card-text class="px-0"><h2>{{$store.state.current_user.username}}</h2></v-card-text>
                                      </v-card>
                                  </v-flex>
                               </v-layout>       
                                <v-layout  justify-center>
                                   <v-flex md4 >
                                      <v-card dark color="secondary">
                                        <v-card-text   class="px-0"><h2>Display Name</h2></v-card-text>
                                      </v-card>
                                  </v-flex>
                                  <v-flex md8 >
                                      <v-card dark color="secondary">
                                        <v-card-text class="px-0"><h2>{{$store.state.current_user.displayname}}</h2></v-card-text>
                                      </v-card>
                                  </v-flex>
                               </v-layout>    
                                <v-layout  justify-center>
                                   <v-flex md4 >
                                      <v-card dark color="secondary">
                                        <v-card-text   class="px-0"><h2>Accessibility Level</h2></v-card-text>
                                      </v-card>
                                  </v-flex>
                                  <v-flex md8 >
                                      <v-card dark color="secondary">
                                        <v-card-text class="px-0"><h2>{{$store.state.current_user.accessibiltyLv}}</h2></v-card-text>
                                      </v-card>
                                  </v-flex>
                               </v-layout>   
                                <v-layout  justify-center>
                                   <v-flex md4 >
                                      <v-card dark color="secondary">
                                        <v-card-text   class="px-0"><h2>user_id</h2></v-card-text>
                                      </v-card>
                                  </v-flex>
                                  <v-flex md8 >
                                      <v-card dark color="secondary">
                                        <v-card-text class="px-0"><h2>{{$store.state.current_user.user_id}}</h2></v-card-text>
                                      </v-card>
                                  </v-flex>
                               </v-layout>   
 
                          </v-flex>
                          <v-flex md3 >
                             
                                   <v-card-media
                                      src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
                                      height="200px"
                                    ></v-card-media>
                          </v-flex>
                      </v-layout>   
                      <v-layout  row wrap>
                       <v-flex md12 >
                              <v-card dark color="pink">
                                   <v-flex md12 >
                                        <v-card-text class="px-0"><h2>My Services</h2></v-card-text>
                                        <v-btn
                                            color="green"
                                            @click.native="dialog = true"
                                          >
                                            +Add more Services+
                                          </v-btn>
                                    </v-flex> 
                                        
                                 </v-card>
                                
                           </v-flex>               
                      </v-layout>   
                     <v-layout row wrap><!-- check box for services selection -->
                            
                           <v-flex md4  v-for="item in selectedServices" :key="item._id">
                                 <v-card dark color="purple">
                                        <v-card-text   class="px-0"><h2>{{item.name}}</h2></v-card-text>
                                 </v-card>
                            
                          
                            </v-flex>    
                            
                      </v-layout>   
                     <v-layout row justify-center>
                              <v-dialog v-model="dialog" scrollable max-width="300px">
                                <!-- <v-btn slot="activator" color="blue" dark><h2>+Add more Services+</h2></v-btn>  -->
                                <v-card>
                                  <v-card-title>Select Service</v-card-title>
                                  <v-divider></v-divider>
                                  
                                  
                                  
                                  
                                  <v-card-text style="height: 300px;">
                                    <v-radio-group v-model="dialogm1" column>
                                        
                                        <v-radio v-for="item in availableServices" :label="item.name" :value="item._id" :key="item._id"></v-radio>        
                                     
                                        <!-- These secttion is override by user_service table
                                      <v-radio label="Bahamas, The" value="bahamas"></v-radio>
                                      <v-radio label="Bahrain" value="bahrain"></v-radio>
                                      <v-radio label="Bangladesh" value="bangladesh"></v-radio>
                                      <v-radio label="Barbados" value="barbados"></v-radio>
                                      <v-radio label="Belarus" value="belarus"></v-radio>
                                      <v-radio label="Belgium" value="belgium"></v-radio>
                                      -->
                                  
                                    </v-radio-group>
                                  </v-card-text>
                                  <v-divider></v-divider>
                                  <v-card-actions>
                                    <v-btn color="blue darken-1" flat @click.native="dialog = false">Close</v-btn>
                                    <v-btn color="blue darken-1" flat @click.native="addServiceToUser">Save</v-btn>
                                  </v-card-actions>
                                </v-card>
                              </v-dialog>
                            </v-layout>
                      
                      
               </v-card>
              </v-flex>
            </v-layout>
             <!--***[If current user is Secretary]***-->
             <v-layout  justify-center v-if="$store.state.accessibiltyLv == 1">
              <v-flex md12>
                  <h1>Secretary</h1>
                  <h1>Under Construction</h1>
              </v-flex>
            </v-layout>
             <v-layout  justify-center v-if="$store.state.accessibiltyLv == 0">
              <v-flex md12>
                  <h1>Customer</h1>
                  <h1>Under Construction</h1>
              </v-flex>
            </v-layout>
            
            
        </v-container>
   </v-content>     
</template>
<script>

export default {
    
    data () {
        return {
          availableServices :'',    
          selectedServices: '',
          dialogm1: '',
          dialog: false
        }
    },
     methods:{
        
      addServiceToUser(){
          
         // alert(this.$store.state.current_user.user_id);
          
           location.href ="../api/user_service/up?user_id="+this.$store.state.current_user.user_id
        +"&service_id="+this.dialogm1;
        
         
      },
   

    },
    asyncData(context){
        
    return context.app.$axios.$get('/api/services')
    .then(data1 =>{
        
       return  context.app.$axios.$post('/api/user_service_get_servicename/',{user_id : context.store.state.current_user.user_id })
            .then(data2 =>{
              return { 
                  availableServices: data1.service,
                  selectedServices: data2.service
              }
            })
     
    }).catch(e => context.error(e));
    
    /*
    return context.app.$axios.$get('/api/services')
    .then(data =>{
      return { 
        listinfo: data.service
      }
    }).catch(e => context.error(e));
    
    
        
    return context.app.$axios.$post('/api/user_service_get_servicename/',{user_id : context.store.state.current_user.user_id })
    .then(data =>{
      return { 
        listinfo: data.service
      }
    }).catch(e => context.error(e));
    */
  }
    
    //middleware: 'search'
    
}
</script>
<style>
* {
   text-align: center; 
}
</style>
