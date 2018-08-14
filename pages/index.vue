<template>
<div>

<!-- [main] -->
<v-content>
  <v-container fluid>
  <h1> Home Page (Underconstruction)</h1>
  <pre>
   <h1> Current Tasks</h1>
    - Designing Database Structure
    - Test Line Api with Nuxt 
    - Learning how to use Vuetify 
    

  </pre>
  <v-btn color="green" @click="location('booking')">Begin Booking Process</v-btn>
  <p>{{items}}</p>
  <Carousel/>
  </v-container>
</v-content>
<!-- [footer] -->
<v-footer  app inset>
      <span class="white--text">&copy; 2018 footer</span>
</v-footer>

</div>
</template>
<script>
import Carousel from '~/components/Carousel.vue'; 
export default {
  data() {
    return {
      items:null
    };
  },
  methods:{
    location(url){
      location.href = url;
    }
  },
  components:{
    Carousel
  }
  
  
  
  /*
  async asyncData(context){
    console.log('--asyncData');
    try{
      let data = await context.app.$axios.$get('/api/test/3');
      console.log(data);
    }catch(e){
      console.log(e);
      context.error(e)
    }
    // return context.app.$axios.$get('/api/todos')
  },
  created(){
    console.log('--crated')
  },
  methods:{
    async onClickTest(context){
      console.log('--onClickTest');
      try{
        let data = await this.$axios.$get('/api/todos');
        console.log(data);
        this.items = data.todos
      }catch(e){
        console.log(e);
      }
    }
  }
  */
};
</script>
<style>
h1{
  text-align: center; 
}
</style>