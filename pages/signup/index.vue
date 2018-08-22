
<template>
<div>

<!-- [main] -->
<v-content>
  <v-container fluid>
  <h1> Sign Up</h1>
   
    <v-stepper v-model="e1">
      <v-stepper-header>
        <v-stepper-step :complete="e1 > 1" step="1">Accept an Agreement</v-stepper-step>
  
        <v-divider></v-divider>
  
        <v-stepper-step :complete="e1 > 2" step="2">Create your Account(1/2)</v-stepper-step>
  
        <v-divider></v-divider>
  
        <v-stepper-step step="3">Create your Account(2/2)</v-stepper-step>
      </v-stepper-header>
  
      <v-stepper-items>
        <v-stepper-content step="1">
          <v-card
            class="mb-5"
            color="grey lighten-1"
            height="200px"></v-card>
          <v-btn flat>Previous</v-btn>
          <v-btn
            color="primary"
            @click="e1 = 2">
            Next
          </v-btn>
  
          
        </v-stepper-content>
  
        <v-stepper-content step="2">
          <v-card
            class="mb-5"
            color="grey lighten-1"
            height="200px">
              
          </v-card>
        
          <v-btn flat  @click="e1 = 1">Previous</v-btn>
          <v-btn
            color="primary"
            @click="e1 = 3"
          >
            Next
          </v-btn>
  
        
        </v-stepper-content>
  
        <v-stepper-content step="3">
          <v-card
            class="mb-5"
            color="grey lighten-1"
            height="200px"
          ></v-card>
           <v-btn flat  @click="e1 = 2">Previous</v-btn>
          <v-btn
            color="primary"
            @click=""
          >
            Done
          </v-btn>
  
         
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  
  </v-container>
</v-content>
<!-- [footer] -->
<v-footer  app inset>
      <span class="white--text">&copy; 2018 footer</span>
</v-footer>

</div>
</template>
<script>
export default{
  data () {
    return {
      e1: 0
    }
  }
}    
  



</script>
<style>
* {
   text-align: center; 
}
</style>