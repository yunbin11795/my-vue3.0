<template>
    <div class="btns">
       <el-button @click="toSort()">随机排序</el-button>
    </div>
    <div class="container" >
        <div class="item" v-for="item in arr" :key="item.key" :ref="setRef">{{item.key}}</div>
    </div>
</template>

<script lang="ts">

    type first = {
        startX:number,
        startY:number
    }
    import {defineComponent,onBeforeMount,ref,reactive,onBeforeUpdate} from 'vue';
    import _ from 'lodash'
    export default defineComponent({
        name: "AnimateList",
        setup(){
            let arr:any = reactive([]);
            let myRef:Array<Element> = [];
            let first:Array<first> = [];

            const setRef = (el:Element) => {
                myRef.push(el);
            }

            onBeforeUpdate(()=>{
                myRef = [];
            })

           onBeforeMount(()=>{
                for(let i=0;i<50;i++){
                    arr.push({
                        key:i+1
                    })
                }
           });

           const toSort = ()=>{
                  record();
                  change();
                  move();
           };

            function record() {
                first = [];
                for(let i =0;i<myRef.length;i++){
                     const dom = myRef[i].getBoundingClientRect();
                    first.push({
                        startX:dom.left,
                        startY:dom.top
                    })
                }
            }

           function change() {

               const data = arr;
               for(let i =0;i<myRef.length;i++){
                   const j = Math.floor(Math.random() * myRef.length);
                   if(i!== j){
                       const temp = data[i].key;
                       data[i].key= data[j].key;
                       data[j].key= temp;
                   }
               }
           }

           function move() {

               for(let i =0;i<arr.length;i++){
                   const dom = myRef[i].getBoundingClientRect();
                   const curX = dom.left, curY = dom.top;
                   const last = first[arr[i].key - 1];
                   const startX = last.startX , startY = last.startY;


                   myRef[i].animate([
                       { transform: `translate(${startX - curX}px, ${startY - curY}px)` },
                       { transform: `translate(0px, 0px)` }
                   ], { duration: 600 })

               }
           }


           return{
               arr,
               toSort,
               setRef
           }
        }
    })
</script>

<style scoped lang="scss">
   .container{
       width: 500px;
       overflow: hidden;
       margin: 20px auto;
       display: flex;
       flex-flow: wrap;
       .item{
           width: 50px;
           height: 50px;
           background: #eef5fe;
           border: 1px solid #ddebfd;
           display: flex;
           align-items: center;
           justify-content: center;
           margin: 5px;
       }
   }
</style>
