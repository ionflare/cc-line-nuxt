<template>

    <div id="e3" style="max-width:400px; margin:auto;" class="grey lighten-3">
        <v-container fluid style="min-height:0;" grid-list-lg>
            <v-layout row wrap>
                
                  <v-flex xs12>
                    
            <v-card target="_blank"  :color="color" class="white--text">
              
              <v-layout row>
                <v-flex xs7>
                  <v-card-title primary-title>
                    <div>
                      <div class="headline">{{shopName}}</div>
                      <div>{{description}}</div>
                      
                    </div>
                  </v-card-title>
                </v-flex>
                <v-flex xs5>
                  <v-card-media
                  
                    :src=thumbnail
                    height="125px"
                    contain
                  ></v-card-media>
                </v-flex>
              </v-layout>
              <v-divider light></v-divider>
              <v-card-actions class="pa-3">
                <v-btn color="green"  :href="url">Book this service</v-btn>
                <v-spacer></v-spacer>
                <v-icon>star_border</v-icon>
                <v-icon>star_border</v-icon>
                <v-icon>star_border</v-icon>
                <v-icon>star_border</v-icon>
                <v-icon>star_border</v-icon>
              </v-card-actions>
            </v-card>
          </v-flex>
            </v-layout>
        </v-container>
        
    </div>
</template>

<script>
export default {
  props: ['description', 'image', 'shopName', 'url', 'color', 'thumbnail']
  //prop: ['title', 'shopName', 'color']
}
</script>