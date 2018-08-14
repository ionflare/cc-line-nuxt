<template>
  <div>
        <h1>LineUser</h1>
        
       <UserTable v-bind="getProp" />
   </div>
</template>
<script>
import UserTable from '~/components/UserTable.vue';


export default {
    
    data () {
    return {
       headers: [
                { text: 'Name', value: 'displayname' },
                { text: 'UserId', value: 'userid' },
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
        UserTable
  },
   asyncData(context){
    return context.app.$axios.$get('/api/users')
    .then(data =>{
      return { 
        listinfo: data.lineuser
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
