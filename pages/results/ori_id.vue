<template>
    <div>
        <h1>Hello From results route {{$route.params.id}}</h1>
        {{$store.state.shopname}}
         <br>
         <card></card>
         
         
        
        
        
        
    </div>
</template>
<script>
import Card from '~/components/Card.vue';
export default {
    components:{
        Card
    },
    middleware: 'search'
}
</script>