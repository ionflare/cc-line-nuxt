<template>
  <div>
     <!--BEGIN ADD New Item Button  --->
     <v-toolbar flat color="grey">
        <v-toolbar-title>Roles Information</v-toolbar-title>
        <v-divider
          class="mx-2"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <v-btn slot="activator" color="primary" dark class="mb-2">Add New Role</v-btn>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>
  
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="roleNameCard" label="Role Name"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field type="number" v-model="accessibleLvCard"  label="Accessible Lv"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                   <!-- <v-text-field  v-model="activeCard" label="Active"></v-text-field> -->
                    <v-select
                        v-model="activeCard"
                        :items="activeChioce"
                        label="Active"
                        outline
                    ></v-select>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
  
           <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
              <v-btn color="blue darken-1" flat @click.native="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
        <!--END ADD New Item Button  --->
     
     
       <v-data-table
      :headers="headers"
      
      :items="listinfo"
    
      class="elevation-1"
      >
      <template slot="items" slot-scope="props">
        <td>{{ props.item._id }}</td>
        <td>{{ props.item.roleName }}</td>
        <td>{{ props.item.accessibleLV }}</td>
        <td>{{ props.item.isActive }}</td>
        <td>{{ props.item.lastupdate }}</td>
        <td class="justify-center layout px-0">
            <v-icon
              small
              class="mr-2"
              @click="editItem(props.item)"
            >
              edit
            </v-icon>
            <v-icon
              small
              @click="deleteItem(props.item)"
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
  data: () => ({
    activeChioce: ['True', 'False'],
    roleNameCard : '',
    accessibleLvCard :'', 
    activeCard :'',
    dialog: false,
    editedIndex: -1,
  }),
  
  
 computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Role' : 'Edit Role'
    }
  },  
   watch: {
    dialog (val) {
      val || this.close()
    }
  },
  methods: {
      delData(id){
        location.href ="./api/user_roles/del/"+id 
      },
     
     upData(id){
        //location.href ="./api/user_roles/del/"+id 
        location.href ="./api/user_roles/up?id=" + id + "&roleName="+this.roleNameCard+"&accessibleLV="+this.accessibleLvCard+"&isActive="+this.activeCard;
        //alert(this.activeCard);
        //alert(location.href);
      },
      addData(){
        location.href ="./api/user_roles/add?roleName="+this.roleNameCard+"&accessibleLV="+this.accessibleLvCard+"&isActive="+this.activeCard;
        //alert(this.activeCard);
      },
      editItem (item) {
        this.editedIndex = item._id
        this.dialog = true
       
        //alert(item.roleName);
      },
      deleteItem (item) {
      //const index = this.desserts.indexOf(item)
      confirm('Are you sure you want to delete this item?') 
      && this.delData(item._id)
      },
      close () {
      this.roleNameCard =''
      this.accessibleLvCard = ''
      this.activeCard = ''
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
      },
      save () {
      if (this.editedIndex > -1) {
        this.upData(this.editedIndex);

      } else {
         this.addData();
      }
      this.close()
      }
  },
  props: ['headers', 'listinfo']
  
  }
</script>>
