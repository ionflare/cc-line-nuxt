
<template>
<div>

<!-- [main] -->
<v-content>
  <v-container fluid>
  <h1> Shops</h1>
   <ShopTable v-bind="getProp" />
  
  </v-container>
</v-content>
<!-- [footer] -->
<v-footer  app inset>
      <span class="white--text">&copy; 2018 footer</span>
</v-footer>

</div>
</template>

<script>
import ShopTable from '~/components/ShopTable.vue';


export default {
    
    data () {
    return {
       headers: [
                {
                  text: 'ID',
                  value: 'id'
                },
                { text: 'Name', value: 'name' },
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
        ShopTable
  },
   asyncData(context){
    return context.app.$axios.$get('/api/shops')
    .then(data =>{
      return { 
        listinfo: data.shops
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
