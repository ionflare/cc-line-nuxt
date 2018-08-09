<template>
    <div v-if="getResult($route.params.id)">
        <h1>Success</h1>

    </div>
    <div v-else>
        <h1>failed</h1>
    </div>
    
    
</template>
<script>

export default {

     methods:{
        getResult(res){
            return res == "success" ? true : false; 
        }
    }
    
}
</script>

