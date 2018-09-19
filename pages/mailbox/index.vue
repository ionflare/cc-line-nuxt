
<template>
<div>

<!-- [main] -->
<v-content>
  <v-container fluid>
  <h1> MailBox Information as {{$store.state.current_user.displayName}}</h1>
  <br>
    <!--
   {{ListMsg_To_CurrentUser}} 
   <br>
   <br>
   {{ListMsg_From_CurrentUser}}
    -->
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
import Axios from 'axios';
import _ from 'lodash';
export default {
    
    data () {
    return {
       headers: [
                { text: 'From Customer', value: 'msg.from_user_web_displayName' },
                //{ text: 'ProviderId', value: 'to_user_id' },
                { text: 'Last Message', value: 'msg.from_user_web_displayName' },
                { text: 'Last Update', value: 'msg.from_user_web_displayName' },
              ],
             
        ListMsg_To_CurrentUser: [],
        ListMsg_From_CurrentUser :[]
    }
  },
    computed:{
        getProp(){
           
            return {
               headers: this.headers, ListMsg_To_CurrentUser: this.ListMsg_To_CurrentUser,
               ListMsg_From_CurrentUser: this.ListMsg_From_CurrentUser
                
            }
        }
    },
    methods:{
        refreshMailList() {
            /*
             Axios.get("/api/mailbox?id="+context.store.state.current_user.user_id)
            .then(data =>{
              return { 
                  ListMsg_To_CurrentUser : _(data.mailbox_to_currentUser)
                    .groupBy(x => x.from_user_web_id)
                    .map((value, key) => ({from_user_web_id: key, msg: value}))
                    .value()
                  ,  
                    
                  ListMsg_From_CurrentUser :  _(data.mailbox_from_currentUser)
                    .groupBy(x => x.to_user_web_id)
                    .map((value, key) => ({to_user_web_id: key, msg: value}))
                    .value()     
    
              }
            }).catch(e => context.error(e));
        */
        alert("xxx");
      }
    
    },
     

  components:{
        MailBoxTable
  },
   asyncData(context){
    return context.app.$axios.$get("/api/mailbox?id="+context.store.state.current_user.user_id)
    .then(data =>{
      return { 
          ListMsg_To_CurrentUser : _(data.mailbox_to_currentUser)
            .groupBy(x => x.from_user_web_id)
            .map((value, key) => ({from_user_web_id: key, msg: value}))
            .value()
          ,  
            
          ListMsg_From_CurrentUser :  _(data.mailbox_from_currentUser)
            .groupBy(x => x.to_user_web_id)
            .map((value, key) => ({to_user_web_id: key, msg: value}))
            .value()     
          /*
          listinfo : _.chain(data.mailbox)
         // var result = _.chain(data.mailbox)
            .groupBy("from_user_id")
            .pairs()
            .map(function(currentItem) {
                return _.object(_.zip(["from_user_id", "msg"], currentItem));
            })
            .value()
          */
          
          /*
          var grouped = _.groupBy(cars, function(car) {
                return car.make;
                });
          data.mailbox.from_user_id
          */
        //listinfo: data.mailbox
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
