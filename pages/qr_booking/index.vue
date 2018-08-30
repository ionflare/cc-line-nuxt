<template>
    <div v-if="getBookingResult">
    GOOD
 
      <v-btn>Confirm Booking</v-btn>
    </div>
     <div v-else>
    BAD
 
      <v-btn>Confirm Booking</v-btn>
    </div>
   
   
</template>



<script>

export default{
    data: () =>
    {   
        return { bookinginfo : ''}
        /*
        msg : '';
        return {
        selected_provider : '', 
        selected_service  : ''
        };
        */
        
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
            
        }
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