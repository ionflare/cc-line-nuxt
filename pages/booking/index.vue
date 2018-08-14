<template>
    <div>
      <h1>Shop Lists</h1>
      <div v-for="(shp,index) in items">
          <Card 
            :shopName= "shp.shopname"
            :url= "addUrl(shp.id)"
            :description= "shp.description"
            :thumbnail= "shp.pic_back"
            :color="pickColor(index)"
        />
      </div>
      </div>
       <!--   
       
     
       
       
       
       
       
      <h1>Results </h1>
      <div v-if="shopExists">
        <div v-for="(shop,index) in items">
          <Card 
            :title="Shop : " + shop.shopname
            :url='../api/booking/?shop='+ shop.shopname
            :shopName: "description"
            :color:"purple"
          />
        </div>
          
         -->
          <!--     
          <v-btn @click="location('/api/booking')">Book this service</v-btn>
             <br>
          
           <Card v-bind="getCardProp($route.params.id, '../api/booking/?shop='+$route.params.id)" />
          <br>
          
          -->
          
    
      
    
  
    
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
        },
        addUrl(shopId)
        {
          return "../api/dobooking/"+shopId;
        }
    },
  
  components:{
        Card
  },
  asyncData(context){
    
    /*
     //return console.log(context.params);
        return context.app.$axios.$get('/api/shops')
        .then(data=>{
            console.log(data);
            //return {editshop:data.shop};
        })
    
    */
    
    return context.app.$axios.$get('/api/shops')
    .then(data =>{
      // console.log(data);
      return { items: data.shops }
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

