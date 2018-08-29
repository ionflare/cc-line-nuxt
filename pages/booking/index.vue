
<template>
<div>

<!-- [main] -->
<v-content>
  <v-container fluid>
  <h1> Booking </h1>
   
    <v-stepper v-model="e1">
      <v-stepper-header>
        <v-stepper-step :complete="e1 > 1" step="1">Choose the Service</v-stepper-step>
  
        <v-divider></v-divider>
  
        <v-stepper-step :complete="e1 > 2" step="2">Choose the Provider</v-stepper-step>
        
        
        <v-divider></v-divider>
        
        <v-stepper-step :complete="e1 > 3" step="3">Additional Requests</v-stepper-step>
  
       
      </v-stepper-header>
  
      <v-stepper-items>
        <v-stepper-content step="1">
          <v-card
            class="mb-5"
            color="grey lighten-1"
           >
                
                  
                  <v-flex md12 lg12>
                      <v-card dark color="secondary">
                        <v-card-text class="px-0"><h2>Available Services</h2></v-card-text>
                      </v-card>
                  </v-flex>
                <v-card-text>
                     <v-radio-group v-model="dialogm1" column>
                            <v-radio v-for="(item,index) in availableServices" :label="item.name" :value="index" :key="item._id"></v-radio>        
                     </v-radio-group>     
                 
              
                </v-card-text>

          </v-card>
          <v-btn flat>Previous</v-btn>
          <v-btn
            color="blue"
            @click="e1 = 2">
            Next
          </v-btn>
        </v-stepper-content>
  
        <v-stepper-content step="2">
                   <v-card
            class="mb-5"
            color="grey lighten-1"
           >
                  <v-flex md12 lg12>
                      <v-card dark color="secondary">
                        <v-card-text class="px-0"><h2>Select the Provider for Services : {{availableServices[dialogm1].name}} </h2></v-card-text>
                      </v-card>
                  </v-flex>
                <v-card-text>
                    <div v-if="ProviderForCurrentServiceCount != 0">
                        <v-radio-group v-model="dialogm2" column>
                              
                                <v-radio  v-for="(item,index) in displayProviderbyService" :label="translateToProviderName(item.user_id)" :value="index" :key="item._id"></v-radio>  
                                
                           
                         </v-radio-group>    
                     </div>
                    <div v-else>
                        <h1>No Provider ready for this service!!</h1>
                    </div>
                  
                </v-card-text>
          </v-card>
         <v-btn
            color="blue"
            @click="e1 = 1">
            Previous
          </v-btn>
          <v-btn
            color="blue"
            @click="e1 = 3">
            Next
          </v-btn>
        </v-stepper-content>
               <v-stepper-content step="3">
                   <v-card
            class="mb-5"
            color="grey lighten-1"
           >
                  <v-flex md12 lg12>
                      <v-card dark color="secondary">
                        <v-card-text class="px-0"><h2>Fill your additional requests</h2></v-card-text>
                      </v-card>
                  </v-flex>
                <v-card-text>
                  <p class="text-sm-left">1. Term of use 1 Blah Blah Blah Blah</p>
                  <p class="text-sm-left">2. Term of use 2 Blah Blah Blah Blah</p>
                  <p class="text-sm-left">3. Term of use 3 Blah Blah Blah Blah</p>
                  <p class="text-sm-left">4. Term of use 4 Blah Blah Blah Blah</p>
                  <p class="text-sm-left">5. Term of use 5 Blah Blah Blah Blah</p>
              
                </v-card-text>
          </v-card>
         <v-btn
            color="blue"
            @click="e1 = 2">
            Previous
          </v-btn>
          <v-btn
            color="green"
            @click="confirmBooking">
            Confirm Booking
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
import _ from "lodash"
export default{
   data () {
        return {
           e1: 0,
           user_service_relation: '',
           allProvider : '',
           availableServices : '',
           dialogm1: 0,
           dialogm2: 0,
           
        }
   },
   computed:{
        ProviderForCurrentServiceCount : function(){
             var currentProv = _.filter(this.user_service_relation, { 'service_id': this.availableServices[this.dialogm1]._id});
             return currentProv.length;
        },

       
       displayProviderbyService : function(){
            var allUserID_Relate_SelectedService = _.filter(this.user_service_relation, { 'service_id': this.availableServices[this.dialogm1]._id});
            //var allUserID_Relate_SelectedService_Info = 
          //return _.find(selectedService, { '_id': availableServices[this.dialogm1]._id});
          return allUserID_Relate_SelectedService;
       }
       
       
   },
   methods:{
       
       
      translateToProviderName: function( providerID)
      {
          var prov = _.find(this.allProvider, { '_id': providerID});
          return prov.username;
      },
      confirmBooking (item) {
      //const index = this.desserts.indexOf(item)
      confirm('Are you sure?') 
      && this.booking(item._id)
      },
      booking()
      {
        if(this.$store.state.current_user  == null)
        {
            alert("Please sign in before booking the service!!!");
            return;
        }
        else
        {
          location.href ="./api/webbooking/add?provider_id="+this.allProvider[this.dialogm2]._id
        +"&service_id="+this.availableServices[this.dialogm1]._id+"&customer_id="+this.$store.state.current_user.user_id;
        }
        //alert(this.activeCard);
      }
      
      
   },
    asyncData(context){
        
       
    return context.app.$axios.$get('/api/user_service_get_relation')
        .then(data =>{
          return { 
            availableServices: data.services,
            user_service_relation : data.user_service,
            allProvider : data.users
          }
        }).catch(e => context.error(e));

  
        
        //user_service_get_all
        /*
         return context.app.$axios.$get('/api/services')
            .then(data1 =>{
                
               return  context.app.$axios.$post('/api/user_service_get_all/')
                    .then(data2 =>{
                      return { 
                          availableServices: data1.service,
                          all_user_service: data2.user_service
                      }
                    })
             
            }).catch(e => context.error(e));
        */    
    
    }
}
</script>