
<template>
<div>

<!-- [main] -->
<v-content>
  <v-container fluid>
  <h1> Booking Information as {{$store.state.current_user.username}}</h1>
  <br>
  <div v-for="item in listinfo">
     
    <BookingTable v-bind="getProp" />  
  </div>
  </v-container>
</v-content>
<!-- [footer] -->
<v-footer  app inset>
      <span class="white--text">&copy; 2018 footer</span>
</v-footer>

</div>
</template>

<script>
import BookingTable from '~/components/BookingTable.vue';


export default {
    
    data () {
    return {
       headers: [
                { text: 'CustomerId', value: 'customer_id' },
                { text: 'IsServed', value: 'isServed' },
                { text: 'IsCancelled', value: 'isCancelled' },
                { text: 'LastUpdate', value: 'lastupdate' },
              ],
             
        listinfo: []
    }
  },
    computed:{
        getProp(){
           
            return {
               headers: this.headers, listinfo: this.listinfo
                
            }
        }
    },

  components:{
        BookingTable
  },
   asyncData(context){
    return context.app.$axios.$get("/api/bookinfo_get?provider_id="+context.store.state.current_user.user_id+"&service_id="+context.route.query.service_id )
    .then(data =>{
      return { 
        listinfo: data.bookinfo
      }
    }).catch(e => context.error(e));

  }
}

</script>
<style>
h1 {
   text-align: center; 
}
</style>
