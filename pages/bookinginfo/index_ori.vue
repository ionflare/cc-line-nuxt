<template>
  
    
    <div>
      <h1>Booking information</h1>
      <br>
      
      <div v-if="items.length">
           <h1>{{items.length}} Booking information available</h1>
      </div>
      <div v-else>
          <h1>Booking information does not exist!!</h1>
     </div>
      <!--
      <div v-for="(usr,index) in items">
         <h1>{{index+1}}. {{ usr.displayname }}</h1><br>
      </div>
      -->
      </div>
      
</template>
<script>
import Card from '~/components/Card.vue';


export default {
 
  
  data(){
    return { items: '' };
  },
  
  
  computed:{
    shopExists(){
       return  this.items.lenght >0;
    }
  },
  methods:{
        pickColor(index){
          return index % 2 == 0 ? 'purple' : 'blue';
        }
    },
  
  components:{
        Card
  },
  asyncData(context){
  
    
    return context.app.$axios.$get('/api/bookinfo')
    .then(data =>{
      // console.log(data);
      return { items: data.bookinfo }
    }).catch(e => context.error(e));
  /*
    
    return context.app.$axios.$get('/api/shops').then((response) => {
      return {items : response.data.results}
    });
    */
  }
}

</script>
<style>
h1 {
   text-align: center; 
}
</style>