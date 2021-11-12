<template>
  <div class="about">
     <AnimateList></AnimateList>
     <RouterAbstract :path="'/about/fileDownload'"></RouterAbstract>
  </div>
</template>

<script lang="ts">
   import AnimateList from '@/components/AnimateList.vue'
   import RouterAbstract from '@/components/RouterAbstract.vue'
   export default {
       name:'About',
        components:{
         AnimateList,RouterAbstract
       },
       setup(){

       },
   }
</script>

<style scoped>

</style>
