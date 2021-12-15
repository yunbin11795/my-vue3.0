<template>
    <h1>反爬方法</h1>
    <div class="test">
        <div>
            这是一段反爬的编码数字:&#xea3e;&#xeda5;&#xedb1;
        </div>
        <div>
            这是一段反爬的编码数字:&#xe20f;&#xf236;&#xf5c1;
        </div>
        <div v-html="price"></div>
    </div>
</template>

<script>
    import {onMounted} from 'vue';
    import {webAssemblyTest} from '../unit/unit'
    export default {
        name: "Spider",
        setup(){
            const fontObject = [
                'font.woff',
                'font2.woff'
            ];
            let price = '&#xe20f';

           onMounted(()=>{
                creatFont();
                test();
            });

            const test = async ()=>{
                const {addTwo} = await webAssemblyTest();
                console.log(addTwo(1,2));
            };
            /**
             * 动态插入字体文件
             */
            const creatFont = () =>{
                 const number = Math.round(Math.random());
                 let newFontStyleSheet = document.createElement('style');
                 newFontStyleSheet.textContent = `
                    @font-face {
                       font-family: 'myfont';
                       src: url(/font/${fontObject[number]}) format('woff');
                    }
                 `;
                 document.head.appendChild(newFontStyleSheet);
            };


            return{
               price
            }
        }
    }
</script>

<style scoped>

    .test{
        font-family: 'myfont';
    }
</style>
