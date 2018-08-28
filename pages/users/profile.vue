<template>
    <v-content>    
       <v-container  fluid grid-list-md>
           <h1>Profile</h1>
           <br>
           <!--***[If current user is Admin]***-->
           <v-layout  justify-center v-if="$store.state.accessibiltyLv >= 3">
              <v-flex md12>
                  <h1>Admin</h1>
                  <h1>Under Construction</h1>
              </v-flex>
            </v-layout>
            <!--***[If current user is Provider]***-->
           <v-layout  justify-center v-if="$store.state.accessibiltyLv == 2">
              <v-flex md10>
                <v-card dark color="grey lighten-1">
                 <v-layout row wrap>
                   <v-flex md12 >
                      <v-card dark color="green">
                           <v-card-text class="px-0"><h2>Provider</h2></v-card-text>
                           </v-card>
                   </v-flex>            
                 </v-layout>
                 <v-layout  justify-center>
                          <v-flex md9 >
                               <v-layout  justify-center >
                                   <v-flex md4 >
                                      <v-card dark color="secondary">
                                        <v-card-text class="px-0"><h2>Username</h2></v-card-text>
                                      </v-card>
                                  </v-flex>
                                  <v-flex md8 >
                                      <v-card dark color="secondary">
                                        <v-card-text class="px-0"><h2>Username</h2></v-card-text>
                                      </v-card>
                                  </v-flex>
                               </v-layout>       
                                <v-layout  justify-center>
                                   <v-flex md4 >
                                      <v-card dark color="secondary">
                                        <v-card-text   class="px-0"><h2>Password</h2></v-card-text>
                                      </v-card>
                                  </v-flex>
                                  <v-flex md8 >
                                      <v-card dark color="secondary">
                                        <v-card-text class="px-0"><h2>Username</h2></v-card-text>
                                      </v-card>
                                  </v-flex>
                               </v-layout>    
                                <v-layout  justify-center>
                                   <v-flex md4 >
                                      <v-card dark color="secondary">
                                        <v-card-text   class="px-0"><h2>Password</h2></v-card-text>
                                      </v-card>
                                  </v-flex>
                                  <v-flex md8 >
                                      <v-card dark color="secondary">
                                        <v-card-text class="px-0"><h2>Username</h2></v-card-text>
                                      </v-card>
                                  </v-flex>
                               </v-layout>   
                                <v-layout  justify-center>
                                   <v-flex md4 >
                                      <v-card dark color="secondary">
                                        <v-card-text   class="px-0"><h2>Password</h2></v-card-text>
                                      </v-card>
                                  </v-flex>
                                  <v-flex md8 >
                                      <v-card dark color="secondary">
                                        <v-card-text class="px-0"><h2>Username</h2></v-card-text>
                                      </v-card>
                                  </v-flex>
                               </v-layout>   
 
                          </v-flex>
                          <v-flex md3 >
                             
                                   <v-card-media
                                      src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
                                      height="200px"
                                    ></v-card-media>
                          </v-flex>
                      </v-layout>   
                      <v-layout  row wrap>
                       <v-flex md12 >
                              <v-card dark color="pink">
                                        <v-card-text class="px-0"><h2>My Services</h2></v-card-text>
                                 </v-card>
                           </v-flex>               
                      </v-layout>   
                     <v-layout row wrap><!-- check box for services selection -->
                           <v-flex md3  v-for="item in listinfo" :key="item._id">
                             <v-checkbox
                                v-model="ex4"
                                :label="item.name"
                                color="green"
                                :value="item._id"
                                hide-details
                              > </v-checkbox>
                          
                            </v-flex>    
                            
                      </v-layout>   
                      <v-layout align-center justify-center column fill-height>
                                <v-btn
                                    color="blue"
                                    @click="">
                                    Update My Services
                                  </v-btn>
                      </v-layout>  
                      
                      
               </v-card>
              </v-flex>
            </v-layout>
             <!--***[If current user is Secretary]***-->
             <v-layout  justify-center v-if="$store.state.accessibiltyLv == 1">
              <v-flex md12>
                  <h1>Secretary</h1>
                  <h1>Under Construction</h1>
              </v-flex>
            </v-layout>
             <v-layout  justify-center v-if="$store.state.accessibiltyLv == 0">
              <v-flex md12>
                  <h1>Customer</h1>
                  <h1>Under Construction</h1>
              </v-flex>
            </v-layout>
            
            
        </v-container>
   </v-content>     
</template>
<script>

export default {
    
    data:{
     listinfo: ''
    },
     methods:{

    },
    asyncData(context){
    return context.app.$axios.$get('/api/services')
    .then(data =>{
      return { 
        listinfo: data.service
      }
    }).catch(e => context.error(e));

  }
    
    //middleware: 'search'
    
}
</script>