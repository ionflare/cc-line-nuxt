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
    
    Queue ID : {{queInfo}}
    
     
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
  asyncData(context){
      
        return {
            queInfo : context.route.query.booking_id
            
        }
        
    /*
        return context.app.$axios.$post('/api/booking_get_queInfo?booking_id='+context.route.query.booking_id
            )
            .then(data =>{
                return { queInfo : data
                //selected_service : data.user_service,
                //selected_provider : data.user
              }
            }).catch(e => context.error(e));
        */
            
    }
    
}
    
</script>
