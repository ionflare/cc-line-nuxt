<template>
  <v-app dark>  
    <!-- [toolbar] -->
    <v-toolbar dark color="primary">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <!-- *manu -->
      <v-toolbar-title class="white--text">cc-line-nuxt</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
          <v-btn flat v-for="item in items" :key="item.title" :to="item.url">
            {{ item.title }}
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
                  <span>No Sigin</span>
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-tile>
        </v-list>
      </v-toolbar>
  
      <!-- [Items Menus [Home,Feature,Contact]]-->
      <v-list dense class="pt-0">
          <v-list-tile v-for="item in items" :key="item.title" :to="item.url">
          <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
          </v-list-tile>
      </v-list>
    </v-navigation-drawer> 

      <!-- ***[contents]*** -->
      <nuxt />
  </v-app>
</template>

<script>
  export default {
    data() {
      return {
        drawer: null,
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
      }
    }
  }
</script>