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
                           <v-card-text class="px-0"><h2>Welcome Provider</h2>
                             <v-btn color="orange" @click.native="openMailBox">
                                My Mail Box
                             </v-btn>            
                           </v-card-text>
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
                                        <v-card-text class="px-0"><h2>{{$store.state.current_user.displayName}}</h2></v-card-text>
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
                                      :src="$store.state.current_user.picture"
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
                                            @click.native="dialog_add_service = true"
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
                                        <v-card-text   class="px-0"><h2>{{item.name}}</h2>
                                        <v-btn
                                            color="green"
                                            @click.native="changeQRCODE(item._id)" :value="item._id"
                                          >
                                            QR CODE
                                          </v-btn>
                                          <v-btn
                                            color="orange"
                                            @click.native="alert('UnderConstruction')" :value="item._id"
                                          >
                                            Add service info
                                          </v-btn>
                                           <v-btn
                                            color="pink"
                                            @click.native="openBookingInfo(item._id)"
                                          >
                                            booking info
                                          </v-btn>
                                          
                                          <v-btn
                                            color="red"
                                            @click.native="delData(item._id)"
                                          >
                                            delete
                                          </v-btn>
                                               
                                        
                                        </v-card-text>
                                 </v-card>
                            
                          
                            </v-flex>    
                            
                      </v-layout>   
                      
                      <!--***[Add Service Dialog]***-->
                     <v-layout row justify-center>
                              <v-dialog v-model="dialog_add_service" scrollable max-width="300px">
                                <!-- <v-btn slot="activator" color="blue" dark><h2>+Add more Services+</h2></v-btn>  -->
                                <v-card>
                                  <v-card-title>Select Service</v-card-title>
                                  <v-divider></v-divider>

                                  <v-card-text style="height: 300px;">
                                    <v-radio-group v-model="result_dialog_add_service" column>
                                        
                                        <v-radio v-for="item in availableServices" :label="item.name" :value="item._id" :key="item._id"></v-radio>        
    
                                    </v-radio-group>
                                  </v-card-text>
                                  <v-divider></v-divider>
                                  <v-card-actions>
                                    <v-btn color="blue darken-1" flat @click.native="dialog_add_service = false">Close</v-btn>
                                    <v-btn color="blue darken-1" flat @click.native="addServiceToUser">Save</v-btn>
                                  </v-card-actions>
                                </v-card>
                              </v-dialog>
                    </v-layout>
                     <!--***[BEGIN Show QR CODE Dialog]***-->  
                         <v-layout row justify-center>
                              <v-dialog v-model="dialog_show_QR" scrollable max-width="300px">
                                <!-- <v-btn slot="activator" color="blue" dark><h2>+Add more Services+</h2></v-btn>  -->
                                <v-card>
                                  <v-card-title>QR CODE</v-card-title>
                                  <v-divider></v-divider>

                                  <v-card-text style="height: 300px;">
                                      <!--***[ test canvas}*** -->
                                      <!--
                                        <v-avatar
                                                tile=true
                                                size=250px
                                                color="grey lighten-4"
                                              >
                                                <img src="https://cdn.vuetifyjs.com/images/cards/desert.jpg" alt="avatar">
                                        </v-avatar>
                                        -->
                                         <!--***[END test canvas}*** -->
                                         <canvas id="canvas"></canvas>

                                  </v-card-text>
                                  <v-divider></v-divider>
                                  <v-card-actions>
                                    <v-btn color="blue darken-1" flat @click.native="dialog_show_QR = false">Close</v-btn>
                                  
                                  </v-card-actions>
                                </v-card>
                              </v-dialog>
                    </v-layout>
                    <!--***[END Show QR CODE Dialog]***-->  
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
             <v-layout  justify-center v-if="$store.state.accessibiltyLv == 0 || $store.state.accessibiltyLv == false">
              <v-flex md12>
                  <h1>Customer</h1>
                  <h1>Under Construction</h1>
              </v-flex>
            </v-layout>
            
            
        </v-container>
   </v-content>     
</template>
<script>

import QRCode from 'qrcode'
export default {
    
    data () {
        return {
          availableServices :'',    
          selectedServices: '',
          dialog_show_QR: false,
          result_dialog_add_service: '',
          dialog_add_service: false
        }
    },
     methods:{
        
      addServiceToUser(){
          
         // alert(this.$store.state.current_user.user_id);
          
           location.href ="../api/user_service/up?user_id="+this.$store.state.current_user.user_id
        +"&service_id="+this.result_dialog_add_service;
      },
      delData(service_id)
      {
           confirm('Are you sure you want to delete this item?') 
        && this.deleteServiceFromUser(service_id);
      },
      deleteServiceFromUser(service_id)
      {
    
             location.href ="../api/user_service/del?user_id="+this.$store.state.current_user.user_id
        +"&service_id="+service_id
        
      },changeQRCODE(service_id)
      {
         
          var canvas = document.getElementById('canvas')
 
          QRCode.toCanvas(canvas, "https://cc-line-nuxt.herokuapp.com/qr_booking?provider_id="+this.$store.state.current_user.user_id+
          "&service_id="+service_id, function (error) {
              if (error) console.error(error)
              console.log('success!');
            })
          this.dialog_show_QR = true;    
      },
      openBookingInfo(service_id){

           location.href ="../bookinginfo?service_id="+service_id;
      },
      openMailBox(){

           location.href ="../mailbox";
      }
   

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
