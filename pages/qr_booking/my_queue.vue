<template>
    <!--
    <div v-if="getQueResult">
        Your Queue Info Id : {{queInfo.info.service.name}}
         <br>
       Service : {{queInfo.info.booking_info._id}}
         <br>
       From : {{queInfo.info.provider.displayName}}
       <br>
       Current Queue : {{queInfo.info.user_service.current_serveQue}}
      
    </div>
     <div v-else>
     ERROR : {{xxx}} Plese check your request URL
 
     
    </div>
   -->
    <div>
    
    Queue ID : {{$route.query.booking_id}}
    <br>
    More information
    <br>
    Provider : {{queInfo.info.provider.displayName}}
    <br>
    Service : {{queInfo.info.service.name}}
    <br>
    Quantity : {{queInfo.info.booking_info.quantity}}
    <br>
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
    
     
    </div>
   
</template>

    
<script>

export default {
    data : {

        //xxx: '',
        queInfo: ''

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
        confirm_cancel_booking()
        {
               confirm('Are you sure you want to cancel this booking?') 
             && this.cancel_booking();
        },
         cancel_booking()
        {
            alert("This Process is underconstuction!!");
        },
        show_service_location()
        {
            alert("This Process is underconstuction!!");
        }
    },
    
  asyncData(context){
      /*
        return {
            queInfo : context.route.query.booking_id
            
        }
        */
        
    
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
