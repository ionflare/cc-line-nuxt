
<template>
<div>

<!-- [main] -->
<v-content>
  <v-container fluid>
  <h1> MailBox Information as {{$store.state.current_user.displayName}}</h1>
  <br>
  
  <!-- {{listinfo}} -->
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

import _ from 'lodash';
export default {
    
    data () {
    return {
       headers: [
                { text: 'From Customer', value: 'msg.from_user_displayName' },
                //{ text: 'ProviderId', value: 'to_user_id' },
                { text: 'Last Message', value: 'msg.from_user_displayName' },
                { text: 'Last Update', value: 'msg.from_user_displayName' },
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
    return context.app.$axios.$get("/api/mailbox?id="+context.store.state.current_user.user_id)
    .then(data =>{
      return { 
          listinfo : _(data.mailbox)
            .groupBy(x => x.from_user_id)
            .map((value, key) => ({from_user_id: key, msg: value}))
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
