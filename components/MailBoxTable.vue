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
        
        
         <v-dialog v-model="dialog" scrollable max-width="600px">
  
          <v-card>
            <v-card-title>
              <span class="headline">
                {{MsgTitle}}</span>
            </v-card-title>
            <v-divider></v-divider>
             <v-card-text style="height: 400px;">

                 <v-layout  row wrap v-for="itemMsg in alignMessage_Time">
                   
                    <!-- ***[MESSAGE FROM CURRENT CUSTOMER]*** -->
                     <v-flex md12 v-if="itemMsg.from_user_web_id != $store.state.current_user.user_id &&
                       itemMsg.messageType == 'text'" class="text-lg-left">
                         <v-avatar
                                  :tile="false"
                                  :size="40"
                                  color="grey lighten-4"
                                >
                            <img :src="getUserAvatar" alt="avatar">
                         </v-avatar>
                       
                         {{itemMsg.messageInfo}} 
                    </v-flex> 
                     <v-flex md12 v-if="itemMsg.from_user_web_id != $store.state.current_user.user_id &&
                       itemMsg.messageType == 'location'" class="text-lg-left">
                         <v-avatar
                                  :tile="false"
                                  :size="40"
                                  color="grey lighten-4"
                                >
                            <img :src="getUserAvatar" alt="avatar">
                         </v-avatar>
                           {{getLocationAddress(itemMsg.messageInfo)}}
                           <br>
                         <img :src="get_Src_GoogleMap(itemMsg.messageInfo)">
                    </v-flex> 
              
                    <!-- ***[MESSAGE FROM CURRENT USER]*** -->
                    <v-flex md12 v-if="itemMsg.from_user_web_id == $store.state.current_user.user_id &&
                       itemMsg.messageType == 'text'" class="text-lg-right">
                        
                         {{itemMsg.messageInfo}} 
                    </v-flex> 
                     <v-flex md12 v-if="itemMsg.from_user_web_id == $store.state.current_user.user_id &&
                       itemMsg.messageType == 'location'" class="text-lg-right">
                         
                       
                         <img :src="get_Src_GoogleMap(itemMsg.messageInfo)">
                    </v-flex> 
                    
                       <!--
                       <p v-if="itemMsg.from_user_web_id != $store.state.current_user.user_id" class="text-lg-left">
                         
                              <v-avatar
                                  :tile="false"
                                  :size="40"
                                  color="grey lighten-4"
                                >
                            <img :src="getUserAvatar" alt="avatar">
                            </v-avatar>
                             <div v-if= "itemMsg.messageType == 'text'">
                                 {{itemMsg.messageInfo}} 
                              </div>
                            
                            
                            <!--
                              <div v-if= "itemMsg.messageType == 'location'">
                                <img src="http://maps.googleapis.com/maps/api/staticmap?center=13.904752,100.531372&zoom=11&size=200x200&maptype=roadmap&&markers=color:red%7Ccolor:red%7Clabel:C%7C13.904752,100.531372&sensor=false">
                              </div>
                               <div v-if= "itemMsg.messageType == 'text'">
                                 {{itemMsg.messageInfo}} 
                              </div>
                               <!---->
                              
                           
                         <!-- </p>
                         
                       <p v-else class="text-lg-right"> {{itemMsg.messageInfo}}</p>
                       -->
                     </v-flex>
                 </v-layout> 
                 <!--
               -->
             </v-card-text>   
                 
            <v-divider></v-divider>
            
            <v-card-text>
              
            <!--
                <v-layout wrap>
                  <v-flex xs12 sm12 md12>
                    <v-text-field v-model="myMsg"  label=""></v-text-field>
                  </v-flex>
                 </v-layout>  
                <v-layout wrap>
                  <v-flex md12>
                  </v-flex>
                </v-layout>
            
           
          -->
                  
           <div>
                
             REPLY
              
                    <v-tabs
                    size="1"
                      centered
                      color="green"
                      dark
                      icons-and-text
                    >
                      <v-tabs-slider color="yellow"></v-tabs-slider>
              
                      <v-tab href="#tab-1" @click="UpdateReplyCase(1)">
                            Text
                            <v-icon>text_fields</v-icon>
                          </v-tab>
                      
                          <v-tab href="#tab-2" @click="UpdateReplyCase(2)">
                            Location
                            <v-icon>location_on</v-icon>
                          </v-tab>
                      
                          <v-tab href="#tab-3" @click="UpdateReplyCase(3)">
                            Image
                            <v-icon>image</v-icon>
                        </v-tab>
                  
              
                     <v-tab-item
                        v-for="i in 3"
                        :id="'tab-' + i"
                        :key="i"
                        
                      >
                        <v-card flat>
                            
                          
                          
                         
                          <v-card-text v-if="replyCase==1">
                               Text :<v-text-field v-model="myMsg"  label=""></v-text-field> 
                          </v-card-text>
                          <v-card-text v-if="replyCase==2">
                              Address :<v-text-field v-model="msg_address" label=""></v-text-field> 
                              Latitude :<v-text-field v-model="msg_latitude" label=""></v-text-field> 
                              Longitude :<v-text-field v-model="msg_longitude" label=""></v-text-field> 
                          </v-card-text>
                           <v-card-text v-if="replyCase>2">
                            Underconstruction
                          </v-card-text>
                          
                        </v-card>
                  </v-tab-item>
                      </v-tabs>
            </div>
          
          
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
        
        
        
        
        
      <td>{{ props.item.msg[0].from_user_web_displayName }}</td>
      <td>{{ props.item.msg[props.item.msg.length - 1].messageInfo }}</td> 
      <td>{{ props.item.msg[props.item.msg.length - 1].lastupdate }}
      
  
      
      </td>
    
  
        <td class="justify-center layout px-0">
            <v-badge
                overlap
                color="orange"
                v-if="getUnSeenMailNumber(props.item)"
              >
              <span  slot="badge"> {{getUnSeenMailNumber(props.item)}} </span>
            </v-badge>
            <v-icon
              medium
              class="mr-4"
              @click="editItem(props.item)"
            >
               mail
            </v-icon>
        
            <v-icon
              medium
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
    currentContact_web_id:'',
    currentContact_line_id:'',

    dialogm1:"",
    PreviousMsg: [],
    currentContactAvatar_Src : "",
    
    
    ///////
    MsgTitle: "",
    myMsg:"",
    msg_address : "",
    msg_latitude : "",
    msg_longitude : "",
    /// test reply tab
    
    replyCase:1
    
    
    
  }),
  
  
  computed :{
    alignMessage_Time : function (){
       return  _.sortBy(this.PreviousMsg, o => o.lastupdate)
    },
    
    getUserAvatar : function(){
      return this.currentContactAvatar_Src;
    }
    
    
  },
  
  methods: {
    UpdateReplyCase(repCase){
      this.replyCase =repCase;
      // alert(txt);
    }
    ,
    getLocationAddress(item){
      var arr = item.split("&");
      var address = arr[0].split("address=");
      return "Address : " + address[address.length-1];
    },
    
    get_Src_GoogleMap(item){
      var arr1 = item.split("&latitude=");
      var lat = arr1[arr1.length-1].split("&");
      
      var arr2 = item.split("&longitude=");
      var long = arr2[arr2.length-1];
      
      return "http://maps.googleapis.com/maps/api/staticmap?center="+lat[0]+","+long
      +"&zoom=11&size=200x200&maptype=roadmap&&markers=color:red%7Ccolor:red%7Clabel:C%7C"+lat[0]+","+long+"&sensor=false";
    },
    
    
    getUnSeenMailNumber(item){
      var mail_unseen_number = 0;
      for(var i=item.msg.length-1 ; i >= 0 ;i --)
         {
              if(item.msg[i].IsSeen == true)
              {
                break;
              }
              mail_unseen_number++;
        }    
      
      return mail_unseen_number;
    },
     async sendMsg () {
       
        var msgType = "text";
        var msgInfo;
         if(this.replyCase == 1)
           {
             msgType = "text";
             msgInfo = this.myMsg;
           }
           else if(this.replyCase == 2)
           {
              msgType = "location";
              msgInfo = { 
                 "type": "location",
                  "title": "my location",
                  "address": "〒150-0002 東京都渋谷区渋谷２丁目２１−１",
                  "latitude": 35.65910807942215,
                  "longitude": 139.70372892916203
              }
           }
       
       
       
      await  Axios.post(`/api/sendMsg`,{
          /*
            msgInfo :{
                    from_user_web_id : this.$store.state.current_user.user_id,
                    from_user_web_displayName : this.$store.state.current_user.displayName,
                  
                    to_user_web_id : this.currentContact_web_id,
                    to_user_line_id : this.currentContact_line_id,
                    to_user_web_displayName :  this.$store.state.current_user.displayName,
                    messageType : "text",
                    messageInfo : this.myMsg
                  
                }   
                */
                msgInfo :{
                    from_user_web_id : this.$store.state.current_user.user_id,
                    from_user_web_displayName : this.$store.state.current_user.displayName,
                  
                    to_user_web_id : this.currentContact_web_id,
                    to_user_line_id : this.currentContact_line_id,
                    to_user_web_displayName :  this.$store.state.current_user.displayName,
                    messageType : msgType,
                    messageInfo : this.myMsg,
                    msg_address :  this.msg_address,
                    msg_latitude : this.msg_latitude,
                    msg_longitude : this.msg_longitude
                  
                }   
                
            })
        .then((res) => {
          //this.menus = res.data
        })
        
        
        
        
      this.close()
      location.href = "./mailbox";
      },
   async editItem (item) {
      
      
        //searching for
        this.MsgTitle = "Contact with "+ item.msg[0].from_user_web_displayName;
        this.currentContact_web_id = item.msg[0].from_user_web_id;
        this.currentContact_line_id = item.msg[0].from_user_line_id;
        this.currentContactAvatar_Src = item.msg[0].from_user_src_imageProfile;
        
        var mathedUserIdx = -1;
        
        for(var i=0; i< this.ListMsg_From_CurrentUser.length ;i ++)
        {
          if(this.ListMsg_From_CurrentUser[i].to_user_web_id == item.from_user_web_id)
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
       
       
        //alert(item.msg[item.msg.length-1]._id);
        
        await  Axios.post('/api/mailbox/update',{
                    _id : item.msg[item.msg.length-1]._id,
            })
        .then((res) => {
          //this.menus = res.data
          //alert(res);
           this.dialog = true;
        })
       
      
      },
      close () {
      this.myMsg ='';
      this.msg_address = '';
      this.msg_latitude = '';
      this.msg_longitude = '';
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
      location.href = "./mailbox";
      
      }
  },

props: ['headers', 'ListMsg_To_CurrentUser' ,'ListMsg_From_CurrentUser']

}
</script>>
