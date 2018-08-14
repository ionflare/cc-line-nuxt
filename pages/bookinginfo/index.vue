
<template>
<div>

<!-- [main] -->
<v-content>
  <v-container fluid>
  <h1> Booking Information</h1>
   <BookingTable v-bind="getProp" />
  
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
                { text: 'Shopid', value: 'shopid' },
                { text: 'Serviceid', value: 'serviceid' },
                { text: 'Userid', value: 'userid' },
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
    return context.app.$axios.$get('/api/bookinfo')
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
