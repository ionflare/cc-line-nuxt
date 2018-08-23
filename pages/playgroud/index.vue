
<template>
<v-content>
  <v-container  fluid grid-list-md>
      
           <v-layout  justify-center>
              <v-flex md10>
                  <v-card dark color="grey lighten-1">
                       <v-layout  justify-center>
                            <v-flex md12 >
                                  <v-card dark color="secondary">
                                    <v-card-text class="px-0"><h2>Test Hash</h2></v-card-text>
                                  </v-card>
                              </v-flex>
                     </v-layout>
                      <v-layout  justify-center>
                          <v-flex md9 >
                               <v-layout  justify-center>
                                   <v-flex md4 >
                                      <v-card dark color="secondary">
                                        <v-card-text class="px-0"><h2>Username</h2></v-card-text>
                                      </v-card>
                                  </v-flex>
                                  <v-flex md8 >
                                      <v-card dark color="secondary">
                                        <v-card-text class="px-0">
                                                <v-text-field
                                                  hint="This field uses counter prop"
                                                  label="Regular"
                                                ></v-text-field>
                                            </v-card-text>
                                      </v-card>
                                  </v-flex>
                               </v-layout>       
                                <v-layout  justify-center>
                                   <v-flex md4 >
                                      <v-card dark color="secondary">
                                        <v-card-text class="px-0"><h2>Password</h2></v-card-text>
                                      </v-card>
                                  </v-flex>
                                  <v-flex md8 >
                                      <v-card dark color="secondary">
                                        <v-card-text class="px-0">
                                            <v-text-field
                                                  hint="This field uses counter prop"
                                                  label="Regular"
                                                ></v-text-field>
                                        </v-card-text>
                                      </v-card>
                                  </v-flex>
                               </v-layout>       
                                <v-layout  justify-center>
                                   <v-flex md4 >
                                      <v-card dark color="secondary">
                                        <v-card-text class="px-0"><h2>Salt</h2></v-card-text>
                                      </v-card>
                                  </v-flex>
                                  <v-flex md8 >
                                      <v-card dark color="secondary">
                                        <v-card-text class="px-0">
                                            <v-text-field
                                                  hint="This field uses counter prop"
                                                  label="Regular"
                                                ></v-text-field>
                                        </v-card-text>
                                      </v-card>
                                  </v-flex>
                               </v-layout>       
                          </v-flex>
                          <v-flex md3 >
                              <v-layout align-center justify-center column fill-height>
                                <v-btn
                                    color="blue"
                                    @click="e1 = 2">
                                    OK!!
                                  </v-btn>
                             </v-layout>   
                          </v-flex>
                          
                      </v-layout>   
                     <v-layout  justify-center>
                         <v-flex md3 >
                             <v-card dark color="secondary">
                                        <v-card-text class="px-0"><h2>Test Hash</h2></v-card-text>
                              </v-card>
                         </v-flex>     
                          <v-flex md9 >
                               <v-card dark color="secondary">
                                        <v-card-text class="px-0"><h2>Test Hash</h2></v-card-text>
                              </v-card>
                         </v-flex> 
                    </v-layout>   
                  </v-card>
              </v-flex>
          </v-layout>          
      
         
       

   
  </v-container> 
</v-content>
</template>
<script>
export default{
}

</script>