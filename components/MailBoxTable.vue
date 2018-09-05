<template>
  <div>
     <!--BEGIN ADD New Item Button  --->
     <v-toolbar flat color="grey">
        <v-toolbar-title>My Mail Box</v-toolbar-title>
        <v-divider
          class="mx-2"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
    
      </v-toolbar>
        <!--END ADD New Item Button  --->
     
     
       <v-data-table
      :headers="headers"
      
      :items="listinfo"
    
      class="elevation-1"
      >
      <template slot="items" slot-scope="props">
      <td>{{ props.item.from_user_id }}</td>
        <td>{{ props.item.lastupdate }}</td>
  
        <td class="justify-center layout px-0">
            <v-icon
              small
              class="mr-2"
              @click=""
            >
              edit
            </v-icon>
            <v-icon
              small
              @click=""
            >
              delete
            </v-icon>
          </td>
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
