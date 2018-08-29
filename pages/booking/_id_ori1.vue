<template>
    <div>
        
        <h1>Welcome</h1>

          <br>
           <Card v-bind="getCardProp($route.params.id, '../api/booking/?shop='+$route.params.id)" />
          <br>
          
          <!--     
          <v-btn @click="location('/api/booking')">Book this service</v-btn>
          -->
          
    </div>
</template>
<script>
import Card from '~/components/Card.vue';
export default {

     methods:{
        location(url){
            //console.log('--methods.locathon',url)
            //location.href=url;
            location.href=url
             //redirect('/booking/qr')
             //this.$router.push('/booking/qr')
        },
        getCardProp(shopName, booking_url){
         return {title:"Shop : "+shopName, url: booking_url  ,shopName: "description",  color:"purple"}
        },
    },
    
    components:{
        Card
    },
    //middleware: 'search'
    
}
</script>