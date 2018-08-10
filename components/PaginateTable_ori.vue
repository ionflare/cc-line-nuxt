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
          name: 'Underconstruction_1',
          lastupdate: 'xxxxx',

        },
         {
          id: 2,
          name: 'Underconstruction_2',
          lastupdate: 'xxxx',

        },
        {
          id: 3,
          name: 'Underconstruction_3',
          lastupdate: 'xxxx',

        },
        {
          id: 4,
          name: 'Underconstruction_4',
          lastupdate: 'xxxx',

        },
        {
          id: 5,
          name: 'Underconstruction_5',
          lastupdate: 'xxxx',

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
