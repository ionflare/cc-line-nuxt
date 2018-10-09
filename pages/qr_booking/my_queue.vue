
<template>
<div>

<!-- [main] -->
<v-content>
   <br>
   <div v-if="getQueResult">
     <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-toolbar color="black" dark>
            <v-toolbar-title> Queue ID : {{$route.query.booking_id}}</v-toolbar-title>
          </v-toolbar>
  
            <v-carousel style="height:150px"  :hide-delimiters="true">
              <v-carousel-item
                v-for="(item,i) in items"
                :key="i"
                :src="item.src"
              
              ></v-carousel-item>
            </v-carousel>
          
          <v-divider></v-divider>
           <v-subheader> Queue Information</v-subheader>
           <v-layout row wrap>
               <v-flex md6>
                   <v-list-tile avatar>
                      <v-list-tile-content>
                        <v-list-tile-title>Provider</v-list-tile-title>
                        <v-list-tile-sub-title> {{queInfo.info.provider.displayName}}</v-list-tile-sub-title>
                      </v-list-tile-content>
                    </v-list-tile>
               </v-flex>
               <v-flex md6>
                   <v-list-tile avatar>
                      <v-list-tile-content>
                        <v-list-tile-title>Service</v-list-tile-title>
                        <v-list-tile-sub-title>{{queInfo.info.service.name}}</v-list-tile-sub-title>
                      </v-list-tile-content>
                    </v-list-tile>
                  </v-list>
               </v-flex>
           </v-layout>
             <v-layout row wrap>
               <v-flex md6>
                   <v-list-tile avatar>
                      <v-list-tile-content>
                        <v-list-tile-title>Queue ID</v-list-tile-title>
                        <v-list-tile-sub-title>{{$route.query.booking_id}}</v-list-tile-sub-title>
                      </v-list-tile-content>
                    </v-list-tile>
               </v-flex>
               <v-flex md6>
                   <v-list-tile avatar>
                      <v-list-tile-content>
                        <v-list-tile-title>Quantity</v-list-tile-title>
                        <v-list-tile-sub-title>{{queInfo.info.booking_info.quantity}}</v-list-tile-sub-title>
                      </v-list-tile-content>
                    </v-list-tile>
                  </v-list>
               </v-flex>
           </v-layout>

          <v-divider></v-divider>
  
            <v-subheader>Customer Requirement</v-subheader>
       
          
          <v-layout align-space-around justify-center row wrap>
               <v-flex md12>
                  <v-btn
                      color="red"
                      @click.native="confirm_cancel_booking()">
                      Cancel Booking
                    </v-btn>
                   
                    <v-btn
                      color="green"
                      @click.native="show_service_location()">
                      Service Location
                    </v-btn>
               </v-flex>

           </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
  </div>
   <div v-else>
     ERROR : {{queInfo.msg}} Plese check your Queue ID
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
            queInfo: '',
        
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

  },
   computed : {
        getQueResult: function(){
            if(this.queInfo.result == "successed")
            {
                return 1;
            }
            else{
                return 0;
            }
            
        }
    },
    
    methods: {
        confirm_cancel_booking: function()
        {
               confirm('Are you sure you want to cancel this booking?') 
             && this.cancel_booking();
        },
         cancel_booking: function()
        {
            //alert("This Process is underconstuction!!");
            location.href = "../api/cancel_linebooking?bookingid="+"xx"+
            "&userid=xxxxx";
        },
        show_service_location: function()
        {
            alert("This Process is underconstuction!!");
        }
    },
    
  asyncData(context){
        return context.app.$axios.$get('/api/booking_get_queInfo?booking_id='+context.route.query.booking_id
            )
            .then(data =>{
                return { queInfo : data
                //selected_service : data.user_service,
                //selected_provider : data.user
              }
            }).catch(e => context.error(e));
        
            
    }
    
}
    
</script>
