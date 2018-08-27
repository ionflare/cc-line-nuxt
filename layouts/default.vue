<template>
  <v-app dark>  
    <!-- [toolbar] -->
    <v-toolbar dark color="primary">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>

      
       <v-toolbar-title class="white--text">cc-line-nuxt</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
          <v-btn flat v-for="item in menus" v-if="item.parentMenu == null"  :key="item.title" :to="item.url">
            {{ item.title }}
          </v-btn>
           <v-btn flat :to="`/Login`">
            {{ loginText }}
          </v-btn>
      </v-toolbar-items>
      
      
     
     
     
    </v-toolbar>
    <!-- ***[Left Menu]***  -->
    <v-navigation-drawer fixed v-model="drawer"  app>
      <!-- [User left] -->
      <v-toolbar flat @click.stop="drawer = !drawer">
        <v-list>
          <v-list-tile>
            <v-list-tile avatar>
              <v-list-tile-avatar>
                <!-- <img v-if="currentUser" :src="currentUser.picture">
                <v-icon v-else medium>account_circle</v-icon> -->
                <v-icon  medium>account_circle</v-icon>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title class="title">
                  <!-- <span v-if="currentUser">{{currentUser.displayname}}</span>
                  <span v-else>No Sigin</span> -->
                  <span>{{ getAvatar }}</span>
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-tile>
        </v-list>
      </v-toolbar>
  
      <!--Start Left handed Main and sub menu -->
      <v-list dense class="pt-0">
       <div v-for="item in menus">
           <div v-if="item.parentMenu == null"> 
                <div v-if="getChildMenus(item.title).length > 0"> 
          
                  <v-list-group
                  prepend-icon="account_circle"
                  value="true">
                  <v-list-tile slot="activator">
                    <v-list-tile-title>{{item.title}}</v-list-tile-title> 
                  </v-list-tile>
          
                  <v-list-group
                    sub-group
                    value="true" v-for="subItem in getChildMenus(item.title)" >
                    
                    <v-list-tile slot="activator" :to="subItem.url">
                      <v-list-tile-title  >{{subItem.title}}</v-list-tile-title>
                    </v-list-tile>

                  </v-list-group>
                  
                </v-list-group>
                </div>
                
                <div v-else>
                    <v-list-tile :to="item.url">
                    <v-list-tile-action>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                    </v-list-tile-content>
                    </v-list-tile>
               </div>
           </div>
       </div>
     </v-list>
    <!--END Left handed Main and sub menu -->
      
      
    </v-navigation-drawer> 

      <!-- ***[contents]*** -->
      <nuxt />
  </v-app>
</template>

<script>
import _ from 'lodash'
export default {
     data() {
      return {
        drawer: null,
        /*
        items: [
          { title: 'HOME'      , icon: 'home'         , url: '/' },
          { title: 'Shops'  , icon: 'assignment', url: '/shops' },
          { title: 'Services'  , icon: 'assignment', url: '/services' },
          { title: 'Users'   , icon: 'assignment'       , url: '/users' },
          { title: 'User Roles'   , icon: 'assignment'       , url: '/userroles' },
          { title: 'Booking Info'   , icon: 'assignment'       , url: '/bookinginfo' },
          { title: 'Sign In'   , icon: 'face'       , url: '/' },
          //{ title: 'Booking Info'   , icon: 'build'       , url: '/' },
          
        ],
        admins: [
      ['Management', 'people_outline'],
      ['Settings', 'settings']
      ],
      cruds: [
        ['Create', 'add'],
        ['Read', 'insert_drive_file'],
        ['Update', 'update'],
        ['Delete', 'delete']
      ],
      */
      menus: []
      
      }
    },
    computed:{
      getMenu_tier_1 : function (xxx) {
        return true;
      },
      loginText : function () {
        if(this.$store.state.current_user != null) {return "Log Out";}
        else
        {return "Log In";}
      },
      getAvatar : function () {
        if(this.$store.state.current_user != null) {return this.$store.state.current_user.username ;}
        else
        {return "Guest";}
      },
    },
    created() 
    {
        this.menus = this.$store.getters.getmenus(this.$store.state.accessibiltyLv);
    },
    methods :
    {
       getChildMenus(matchStr){
        return  _.filter(this.menus, function(o) { return o.parentMenu == matchStr; });
        //return matchStr;
      }
    }
    
    
  }
</script>