
<template>
<div>

<!-- [main] -->
<v-content>
  <v-container fluid>
  <h1> User Roles</h1>
   <UserRoleTable v-bind="getProp" />
  
  </v-container>
</v-content>
<!-- [footer] -->
<v-footer  app inset>
      <span class="white--text">&copy; 2018 footer</span>
</v-footer>

</div>
</template>

<script>
import UserRoleTable from '~/components/UserRoleTable.vue';


export default {
    
    data () {
    return {
       headers: [
                { text: 'Id', value: '_id' },
                { text: 'Name', value: 'roleName' },
                 { text: 'AccessibilityLV', value: 'accessibilityLV' },
                { text: 'Active', value: 'isActive' },
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
        UserRoleTable
  },
   asyncData(context){
    return context.app.$axios.$get('/api/user_roles')
    .then(data =>{
      return { 
        listinfo: data.user_roles
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
