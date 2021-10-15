<template>
  <div class="hello"  >
    <el-button v-test="5555">默认按钮</el-button>
    <el-radio v-model="radio" label="2">备选项</el-radio>
    {{msg}}
    <button @click="add()">{{number}}</button>
    <div class="test" ></div>
    <transition name="aan">
    123
    </transition>
  </div>
</template>

<script lang="ts">
interface  obj{
    name : String,
    age :  Number,
}


import { defineComponent ,reactive,inject,ref,createApp,onMounted,watch} from 'vue';
import _ from 'lodash';
import {useStore,mapState} from 'vuex';
import VirtualList from './VirtualList.vue';
import {makeCustomer} from '@/unit/filter'
import {FourClone} from '@/unit/deepClone';
export default defineComponent({
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  emit:['my-event'],
  setup(props,content){


    onMounted(()=>{
      createApp(VirtualList).mount('.test');
    });

     const doSomething = inject('abc');
     let value: obj=  reactive({
          name:'',
          age : 0
     });

     let number = ref(0);
     let obj = reactive({count:0})

     let  a:any = {
        name:'11',
        aa:[1,2,3],
     };

     a.a = a;
     console.time('11');
     const b =FourClone(a);
     console.timeEnd('11')
     console.log(a,b,a.aa === b.aa);

      watch(()=>{
        return obj.count;
      },(newValue,oldValue)=>{
          console.log(newValue,oldValue);
      })


     const add = ()=>{
       number.value ++;
       obj.count++;
       console.log(obj);
       content.emit('my-event');
     };

     const store =useStore();
     store.commit('test/increment');
     console.log(store.getters['test/doubleCount']);

    console.log(makeCustomer({id:1,kind:'1'}))

     return {
       number,
       add,
     }
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  $primary: #fff;

</style>
