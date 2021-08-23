<template>
  <el-button>默认按钮</el-button>
  <el-radio v-model="radio" label="2">备选项</el-radio>
  <div>
     111
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<style scoped lang="scss" >
    $primary: #fff;

    div{

    }
</style>
