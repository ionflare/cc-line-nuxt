<template>
  <div>
        <h1>Booking Information</h1>
       <PaginateTable />
   </div>
</template>
<script>
import PaginateTable from '~/components/PaginateTable.vue';


export default {

  components:{
        PaginateTable
  },

}

</script>
<style>
h1 {
   text-align: center; 
}
</style>
