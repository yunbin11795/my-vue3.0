<template>
  <div class="hello">
    <el-button>默认按钮</el-button>
    <el-radio v-model="radio" label="2">备选项</el-radio>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  setup(){

    function test( value:String) {
      console.log(value);
    }

  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  $primary: #fff;

  div{

  }
</style>
