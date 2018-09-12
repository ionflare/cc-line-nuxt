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
        
        
         <v-dialog v-model="dialog" max-width="500px">
  
          <v-card>
            <v-card-title>
              <span class="headline">{{MsgTitle}}</span>
            </v-card-title>
  
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm12 md12>
                    <v-text-field v-model="myMsg"  label=""></v-text-field>
                  </v-flex>
                 </v-layout>  
                <v-layout wrap>
                  <v-flex md12>
                   <!-- <v-text-field  v-model="activeCard" label="Active"></v-text-field> -->
                 
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
  
           <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click.native="close">Close</v-btn>
              <v-btn color="blue darken-1" flat @click.native="sendMsg">Send</v-btn>
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
      <td>{{ props.item.msg[0].from_user_displayName }}</td>
      <td>{{ props.item.msg[props.item.msg.length - 1].message }}</td> 
      <td>{{ props.item.msg[props.item.msg.length - 1].lastupdate }}</td>
      <!--
      <td>{{ props.item.to_user_id }}</td>
      <td>{{ props.item.message }}</td>
      <td>{{ props.item.lastupdate }}</td>
      -->
  
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
import Axios from 'axios';
export default {
 data: () => ({
    dialog: false,
    //editedIndex: -1,
    currentContact:'',
    MsgTitle: "",
    myMsg:""

  }),
  methods: {
    
     async sendMsg () {
      await  Axios.post(`/api/sendMsg`,{
            msgInfo :{
                    from : this.$store.state.current_user.displayName,
                    //from : "test prov",
                    to_user_id : this.currentContact,
                    text : this.myMsg
                }   
            })
        .then((res) => {
          //this.menus = res.data
        })
      this.close()
      },
    editItem (item) {
        this.MsgTitle = "Contact with "+ item.msg[0].from_user_displayName;
        this.currentContact = item.from_user_id;
        //this.editedIndex = item._id;
        this.dialog = true;
       
        //alert(item.roleName);
      },
       close () {
      this.myMsg =''
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
      }
  },

props: ['headers', 'listinfo']

}
</script>>
