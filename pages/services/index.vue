<template>
  <div>
        <h1>Services Information</h1>
        
       <ServiceTable v-bind="getProp" />
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
