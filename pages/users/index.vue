
<template>
<div>

<!-- [main] -->
<v-content>
  <v-container fluid>
  <h1> User</h1>
   <UserTable v-bind="getProp" />
  
  </v-container>
</v-content>
<!-- [footer] -->
<v-footer  app inset>
      <span class="white--text">&copy; 2018 footer</span>
</v-footer>

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
        listinfo: data.user
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
