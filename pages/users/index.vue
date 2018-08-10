<template>
  
    
    <div>
      <h1>User Lists</h1>
      <div v-for="(usr,index) in items">
         <h1>{{ usr.displayname }}</h1><br>
      </div>
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
  
    
    return context.app.$axios.$get('/api/users')
    .then(data =>{
      // console.log(data);
      return { items: data.lineuser }
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