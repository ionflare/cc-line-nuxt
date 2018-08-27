<template>
    <v-content>    
       <v-container  fluid grid-list-md>
           <!--***[If current user is Admin]***-->
           <v-layout  justify-center v-if="$store.state.accessibiltyLv >= 3">
              <v-flex md12>
                  <h1>Admin</h1>
              </v-flex>
            </v-layout>
            <!--***[If current user is Provider]***-->
           <v-layout  justify-center v-if="$store.state.accessibiltyLv == 2">
              <v-flex md12>
                  <h1>Provider</h1>
              </v-flex>
            </v-layout>
             <v-layout  justify-center v-if="$store.state.accessibiltyLv == 1">
              <v-flex md12>
                  <h1>Secretary</h1>
              </v-flex>
            </v-layout>
             <v-layout  justify-center v-if="$store.state.accessibiltyLv == 0">
              <v-flex md12>
                  <h1>Customer</h1>
              </v-flex>
            </v-layout>
            
            
        </v-container>
   </v-content>     
</template>
<script>

export default {

     methods:{

    },
    
    
    //middleware: 'search'
    
}
</script>