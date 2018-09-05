
<template>
<div>

<!-- [main] -->
<v-content>
  <v-container fluid>
  <h1> MailBox Information as {{$store.state.current_user.displayName}}</h1>
  <br>
    <MailBoxTable v-bind="getProp" />  
  </v-container>
</v-content>
<!-- [footer] -->
<v-footer  app inset>
      <span class="white--text">&copy; 2018 footer</span>
</v-footer>

</div>
</template>

<script>
import MailBoxTable from '~/components/MailBoxTable.vue';


export default {
    
    data () {
    return {
       headers: [
                { text: 'CustomerId', value: 'customer_id' },
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
        MailBoxTable
  },
   asyncData(context){
    return context.app.$axios.$get("/api/bookinfo_get?provider_id="+context.store.state.current_user.user_id+"&service_id="+context.route.query.service_id )
    .then(data =>{
      return { 
        listinfo: data.mailboxinfo
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
