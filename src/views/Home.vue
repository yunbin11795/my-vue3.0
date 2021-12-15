<template>
  <div class="home" >
    <img alt="Vue logo" src="../assets/logo.png">
    <div>
      <el-button @click="set">设置缓存</el-button>
      <el-button @click="get">获取缓存:{{storage}}</el-button>
    </div>
    <HelloWorld msg="Welcome to Your Vue.js App" @my-event="doSomething()" id="555"
                type="primary"></HelloWorld>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import {provide,ref} from 'vue'
import {setStorage,getStorage} from '@/unit/unit'
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

    const storage = ref('');

    const set = ()=>{
       setStorage();
    };
    const get = ()=>{
      storage.value = getStorage();
    };

    return{
      doSomething,
      storage,
      set,
      get
    }
  }
}
</script>
