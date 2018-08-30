<template>
    <div v-if="getBookingResult">
        You are about to booking
         <br>
       Service : {{bookinginfo.info.service.name}}
         <br>
         From : {{bookinginfo.info.user.displayName}}
       <br>
 
      <v-btn @click.native="doBooking()">Confirm Booking</v-btn>
    </div>
     <div v-else>
     ERROR : {{bookinginfo.msg}} Plese check your QR code
 
     
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
    methods:{
        doBooking: function()
            {
                   location.href ="./api/linebooking?provider_id="+this.bookinginfo.info.user._id
                +"&service_id="+this.bookinginfo.info.service._id;
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