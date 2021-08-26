<template>
  <div class="hello">
    <el-button>默认按钮</el-button>
    <el-radio v-model="radio" label="2">备选项</el-radio>
    {{msg}}
    <button @click="add()">{{number}}</button>
  </div>
</template>

<script lang="ts">
interface  obj{
    name : String,
    age :  Number,
}
import { defineComponent ,reactive,toRefs,ref} from 'vue';
import _ from 'lodash';

export default defineComponent({
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  setup(){

     let value: obj=  reactive({
          name:'',
          age : 0
     });

     let number = ref(0);

     const test = ()=>{
       console.log(process.env)
     };

     test();

     const add = ()=>{
           number.value ++;
     };

     return {
       number,
       add
     }
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  $primary: #fff;

  div{

  }
</style>
