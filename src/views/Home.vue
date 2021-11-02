<template>
  <div class="home" >
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App" @my-event="doSomething()" id="555"
                type="primary"></HelloWorld>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import {provide} from 'vue'
export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  setup(props,content){
    const doSomething = ()=>{
      console.log('doSomething');
    };
    provide('abc',555);

    return{
      doSomething
    }
  }
}
</script>
