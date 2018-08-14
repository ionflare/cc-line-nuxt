<template>
  <div>
     
       <v-data-table
      :headers="headers"
      
      :items="listinfo"

      class="elevation-1"
      >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.shopid }}</td>
        <td>{{ props.item.serviceid }}</td>
        <td>{{ props.item.userid }}</td>
        <td>{{ props.item.lastupdate }}</td>
  
      </template>
        <template slot="pageText" slot-scope="props">
         {{ props.pageStart }} - {{ props.pageStop }} of {{ props.itemsLength }}
      </template>
    </v-data-table>
    </div>
</template>

<script>
export default {

props: ['headers', 'listinfo']

}
</script>>
