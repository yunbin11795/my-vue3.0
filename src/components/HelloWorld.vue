<template>
  <div class="hello">
    <el-button>默认按钮</el-button>
    <el-radio v-model="radio" label="2">备选项</el-radio>
  </div>
</template>

<script lang="ts">
interface  obj{
    name : String,
    age :  Number,
}
import { defineComponent ,reactive} from 'vue';
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

     const test = ()=>{
         let age = _.get(value,'age',18);
         console.log(age);
     };

     test();
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  $primary: #fff;

  div{

  }
</style>
