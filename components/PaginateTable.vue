<template>
  <div>
       <v-data-table
      :headers="headers"
      
      :items="getData"
      
      hide-actions
      class="elevation-1"
      >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.id }}</td>
        <td>{{ props.item.name }}</td>
        <td>{{ props.item.lastupdate }}</td>
  
      </template>
    </v-data-table>
    </div>
</template>

<script>
export default {
  data () {
    return {
      headers: [
        {
          text: 'ID',
          value: 'id'
        },
        { text: 'Name', value: 'name' },
        { text: 'lastupdate', value: 'lastupdate' },
      ],
       desserts: []
      /*
      desserts: [
        {
          id: false,
          name: 'Frozen Yogurt',
          lastupdate: 159,

        }
      ]
      ]
       */
    }
  },
  computed:{
      getData(){
        return [
        {
          id: 1,
          name: 'NewsNet_1',
          lastupdate: '1533783994593.0',

        },
         {
          id: 2,
          name: 'bestluck',
          lastupdate: '1533784146455.0',

        },
      ]
      }
      
  },
  
  asyncData(context){
    return  this.desserts = [];
      
    /*
    return context.app.$axios.$get('/api/shops')
    .then(data =>{
      // console.log(data);
      return { desserts: data.shops }
    }).catch(e => context.error(e));
    
    */
  }
  
}
</script>>
