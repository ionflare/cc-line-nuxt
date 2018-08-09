<template>
  <div>
      <h1>Home Page</h1>
      <br/>
      <!--
     <form @submit.prevent= "submit">
       <input placeholder="Enter Shop's Name" v-model="search" autofocus/>
       </form>
       -->
      <v-btn @click="location('/shops')">Shop Lists</v-btn>
      <v-btn @click="location('/users')">User Lists</v-btn>
      <v-btn @click="location()">Booking Lists</v-btn>
  </div>
</template>

<script>


export default {
  components: {
   
  },
  data(){
    return {
      search: ''
    }
  },
  methods:{
    submit(event) {
      //alert('Hello World')
      this.$router.push(`results/${this.search}`);
    },
    location(url)
    {
      location.href = url;
    }
  }
  /*
  asyncData(context){
    return context.app.$axios.$get('/api/shops')
    .then(data =>{
      // console.log(data);
      return { items:data.shops }
    }).catch(e => context.error(e));
  }
  */
}
</script>

<style>
* {
  text-align: center;
}

h1{
  padding: 20px;
}
</style>

