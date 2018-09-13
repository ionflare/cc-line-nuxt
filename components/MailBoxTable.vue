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
        
        
         <v-dialog v-model="dialog" scrollable max-width="500px">
  
          <v-card>
            <v-card-title>
              <span class="headline">{{MsgTitle}}</span>
            </v-card-title>
            <v-divider></v-divider>
             <v-card-text style="height: 300px;">

                 <v-layout  row wrap v-for="itemMsg in alignMessage_Time">
                     <v-flex md12>
                       <p v-if="itemMsg.from_user_id != $store.state.current_user.user_id" class="text-lg-right">{{itemMsg.message}}</p>
                       <p v-else class="text-lg-left">{{itemMsg.message}}</p>
                       
                     </v-flex>
                 </v-layout> 
                 <!--
               -->
             </v-card-text>   
                 
            <v-divider></v-divider>
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
      
      :items="ListMsg_To_CurrentUser"
    
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
import _ from 'lodash';
export default {
 data: () => ({
    dialog: false,
    //editedIndex: -1,
    currentContact:'',
    MsgTitle: "",
    myMsg:"",
    dialogm1:"",
    PreviousMsg: [],
  }),
  
  
  computed :{
    alignMessage_Time : function (){
      /*
      var maxTime = 0;
      var storeMsg = this.PreviousMsg;
      var alignedStore = [];
      
      for(var i = 0; i< this.PreviousMsg.length; i++)
      {
       
      }
      */
       return  _.sortBy(this.PreviousMsg, o => o.lastupdate)
      
    }
    
  },
  
  methods: {
    
     async sendMsg () {
      await  Axios.post(`/api/sendMsg`,{
            msgInfo :{
                    from_user_id : this.$store.state.current_user.user_id,
                    from_user_displayName : this.$store.state.current_user.displayName,
                    to_user_id : this.currentContact,
                    message : this.myMsg
                }   
            })
        .then((res) => {
          //this.menus = res.data
        })
      this.close()
      },
    editItem (item) {
      
      
        //searching for
        this.MsgTitle = "Contact with "+ item.msg[0].from_user_displayName;
        this.currentContact = item.from_user_id;
        
        
        var mathedUserIdx = -1;
        
        for(var i=0; i< this.ListMsg_From_CurrentUser.length ;i ++)
        {
          if(this.ListMsg_From_CurrentUser[i].to_user_id == item.from_user_id)
          {
             mathedUserIdx = i;
             break;
          }
        }
        
        this.PreviousMsg = [];
        
        for(var i=0; i< item.msg.length ;i ++)
         {
              this.PreviousMsg.push(item.msg[i]);
        }   
      
        if(mathedUserIdx != -1)
        {
            for(var i=0; i< this.ListMsg_From_CurrentUser[mathedUserIdx].msg.length ;i ++)
          {
             this.PreviousMsg.push(this.ListMsg_From_CurrentUser[mathedUserIdx].msg[i]);
          }
        }
      
        /*
        let song = _.find(this.props.ListMsg_From_CurrentUser, {to_user_id: item.from_user_id});
        
        
        this.PreviousMsg = [];
        for(var i=0; i< item.msg.length ;i ++)
        {
          this.PreviousMsg.push(item.msg[i]);
        }
        */
        
        //this.PreviousMsg = _.find(this.ListMsg_From_CurrentUser, {to_user_id: item.from_user_id});
        
        //this.PreviousMsg =this.ListMsg_From_CurrentUser[0].to_user_id;
        //this.PreviousMsg = [];
        
        
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

props: ['headers', 'ListMsg_To_CurrentUser' ,'ListMsg_From_CurrentUser']

}
</script>>
