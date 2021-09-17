<template>
    <div ref="list" class="infinite-list-container" @scroll="scrollEvent($event)"  :style="{height:screenHeight + 'px'}">
        <div class="infinite-list"  :style="{transform: getTransform,height:listHeight + 'px'}">
            <div ref="items"
                 class="infinite-list-item"
                 v-for="item in visibleData"
                 :key="item.id"
                 :style="{height:itemSize + 'px'}"
            >{{ item.name }}</div>
        </div>
    </div>
</template>

<script lang="ts">
    import {defineComponent,computed,onBeforeMount,reactive,ref,onMounted} from 'vue';
    export default defineComponent({
        name: "VirtualList",
        setup(props,content){

            const listData:Array<any>= [];

            onBeforeMount(()=>{
                const number = 1000;
                for(let i=0;i<number;i++){
                    listData.push({
                        name: i + 1,
                        id:i
                    })
                }
            });

            const itemSize = 50;
            const screenHeight = 250;

            let startOffset = ref(0);
            const list:any= ref(null);
            let start = ref(0);
            let end = ref(0);

            //列表总高度
            const listHeight = computed(()=>{
                return  listData.length * itemSize;
            });

            //可显示的列表项数
            const visibleCount = computed(()=>{
                return  Math.ceil(screenHeight / itemSize)
            });

            //偏移量对应的style
            const getTransform = computed(()=>{
                return  `translate3d(0,${startOffset.value}px,0)`;
            });

            //获取真实显示列表数据
            const visibleData = computed(()=>{
                return  listData.slice(start.value, Math.min(end.value,listData.length));
            });

            const scrollEvent =()=>{
                //当前滚动位置
                let scrollTop = list.value.scrollTop;
                //此时的开始索引
                start.value = Math.floor(scrollTop / itemSize);
                //此时的结束索引
                end.value = start.value + visibleCount.value;
                //此时的偏移量
                startOffset.value = scrollTop - (scrollTop % itemSize);
            };

            onMounted(()=>{
                start.value = 0;
                end.value = start.value + visibleCount.value;
            });

            return{
                visibleData,
                list,
                screenHeight,
                itemSize,
                scrollEvent,
                getTransform,
                listHeight
            }
        }
    })
</script>

<style scoped lang="scss">

    .infinite-list-container{
        overflow: auto;
        .infinite-list{
            .infinite-list-item{
                border-bottom: 1px solid #ccc;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }
    }

</style>
