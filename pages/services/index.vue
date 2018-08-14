
<template>
<div>

<!-- [main] -->
<v-content>
  <v-container fluid>
  <h1> Services</h1>
   <ServiceTable v-bind="getProp" />
  
  </v-container>
</v-content>
<!-- [footer] -->
<v-footer  app inset>
      <span class="white--text">&copy; 2018 footer</span>
</v-footer>

</div>
</template>



<script>
import ServiceTable from '~/components/ServiceTable.vue';


export default {
    
    data () {
    return {
       headers: [
                { text: 'ServiceId', value: 'id' },
                { text: 'ServiceName', value: 'name' },
                { text: 'Description', value: 'description' },
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
        ServiceTable
  },
   asyncData(context){
    return context.app.$axios.$get('/api/services')
    .then(data =>{
      return { 
        listinfo: data.service
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
