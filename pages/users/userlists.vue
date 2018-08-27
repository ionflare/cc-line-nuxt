
<template>
<div>

<!-- [main] -->
<v-content>
  <v-container fluid>
  <h1>All User Info (As Admin)</h1>
   <UserListsTable v-bind="getProp" />
  
  </v-container>
</v-content>
<!-- [footer] -->
<v-footer  app inset>
      <span class="white--text">&copy; 2018 footer</span>
</v-footer>

</div>
</template>



<script>
import UserListsTable from '~/components/UserListsTable.vue';


export default {
    
    data () {
    return {
       headers: [
                { text: 'UserId', value: '_id' },
                { text: 'Username', value: 'username' },
                { text: 'Image', value: 'picture' },
                { text: 'DisplayName', value: 'displayName' },
                { text: 'LoginType', value: 'loginType' },
                { text: 'USER_ROLE_id', value: 'USER_ROLE_id' },
                { text: 'isActive', value: 'isActive' },
                { text: 'LastUpdate', value: 'lastUpdate' },
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
        UserListsTable
  },
   asyncData(context){
    return context.app.$axios.$get('/api/userlists')
    .then(data =>{
      return { 
        listinfo: data.userlists
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
