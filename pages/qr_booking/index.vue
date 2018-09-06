
<template>
<div>

<!-- [main] -->
<v-content>
   <br>
   <div v-if="getBookingResult">
     <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-toolbar color="black" dark>
            
  
            <v-toolbar-title>Provider : {{bookinginfo.info.user.displayName}}</v-toolbar-title>
          </v-toolbar>
  
            <v-carousel style="height:150px"  :hide-delimiters="true">
              <v-carousel-item
                v-for="(item,i) in items"
                :key="i"
                :src="item.src"
              
              ></v-carousel-item>
            </v-carousel>
          
          <v-divider></v-divider>
           <v-subheader> Service : {{bookinginfo.info.service.name}}</v-subheader>
           <v-layout row wrap>
               <v-flex md6>
                   <v-list-tile avatar>
                      <v-list-tile-content>
                        <v-list-tile-title>Address</v-list-tile-title>
                        <v-list-tile-sub-title>99/23 Moo 4, Software Park Building (DUMMY)</v-list-tile-sub-title>
                      </v-list-tile-content>
                    </v-list-tile>
               </v-flex>
               <v-flex md6>
                   <v-list-tile avatar>
                      <v-list-tile-content>
                        <v-list-tile-title>Bussiness Time</v-list-tile-title>
                        <v-list-tile-sub-title>8.00am - 4.00pm / Mon - Fri (DUMMY)</v-list-tile-sub-title>
                      </v-list-tile-content>
                    </v-list-tile>
                  </v-list>
               </v-flex>
           </v-layout>
             <v-layout row wrap>
               <v-flex md6>
                   <v-list-tile avatar>
                      <v-list-tile-content>
                        <v-list-tile-title>E-mail</v-list-tile-title>
                        <v-list-tile-sub-title>newsnet@n2.com (DUMMY)</v-list-tile-sub-title>
                      </v-list-tile-content>
                    </v-list-tile>
               </v-flex>
               <v-flex md6>
                   <v-list-tile avatar>
                      <v-list-tile-content>
                        <v-list-tile-title>Tel</v-list-tile-title>
                        <v-list-tile-sub-title>+66 2248836 (DUMMY)</v-list-tile-sub-title>
                      </v-list-tile-content>
                    </v-list-tile>
                  </v-list>
               </v-flex>
           </v-layout>

          <v-divider></v-divider>
  
            <v-subheader>Customer Requirement</v-subheader>
       
            <v-layout align-center justify-center row wrap>
               <v-flex>
                   <v-list-tile avatar>
                      <v-list-tile-content>
                        <v-list-tile-title>Quantity : <input v-model.number="quantity" type="number" min="1" max="10"></v-list-tile-title>
                      </v-list-tile-content>
                    </v-list-tile>
               </v-flex>

           </v-layout>
          <v-layout align-space-around justify-center row wrap>
               <v-flex md12>
                   <v-btn color="green" @click.native="doBooking()">Confirm Booking</v-btn>
                   <v-btn color="red"  @click.native="cancelBooking()">Go Back</v-btn>
               </v-flex>

           </v-layout>
          
          
          
      
      
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
  </div>
   <div v-else>
     ERROR : {{bookinginfo.msg}} Plese check your QR code
    </div>
</v-content>
<!-- [footer] -->
<v-footer  app inset>
      <span class="white--text">&copy; 2018 footer</span>
</v-footer>

</div>
</template>

<script>


export default{
    data: () =>
    {   
        return { 
            bookinginfo : '',
            quantity : 1,
              items: [
                {
                  src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg'
                },
                {
                  src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg'
                },
                {
                  src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg'
                },
                {
                  src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg'
                }
              ]
                
            }
        /*
        msg : '';
        return {
        selected_provider : '', 
        selected_service  : ''
        };
        */
        
    },
    methods:{
        doBooking: function()
            {
                   location.href ="./api/linebooking?provider_id="+this.bookinginfo.info.user._id
                +"&service_id="+this.bookinginfo.info.service._id+"&quantity="+this.quantity;
            },
        cancelBooking: function()
            {
                   location.href ="/";
            }
    },
    computed : {
        getBookingResult: function(){
            if(this.bookinginfo.result == "successed")
            {
                return 1;
            }
            else{
                return 0;
            }
            
        },
        
    },
    
    asyncData(context){
        /*
        return {
            selected_provider: context.route.query.provider_id
        }
        */
    
        return context.app.$axios.$post('/api/qr_booking_getinfo',{ 
                 bookingdata :{
                            provider_id : context.route.query.provider_id,
                            service_id : context.route.query.service_id
                            }      
                }
            )
            .then(data =>{
                return { bookinginfo : data
                //selected_service : data.user_service,
                //selected_provider : data.user
              }
            }).catch(e => context.error(e));
        
            
    }
    
}

</script>       

