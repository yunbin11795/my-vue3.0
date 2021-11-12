<template>
    <div>
        <svg t="1636601073683" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
             p-id="9259" width="200" height="200">
            <path class="path1" d="M512 512V0C230.4 0 0 230.4 0 512s230.4 512 512 512 512-230.4 512-512H512z m0 448C262.4 960 64 761.6 64 512 64 284.2 229.3 99 448 68.4V576h507.6C925 794.7 739.8 960 512 960z" p-id="9260">
            </path>
            <path d="M985.6 448h38.4C1024 198.4 825.6 0 576 0v448h409.6zM640 384V69.4C800.2 96.5 927.5 223.8 954.6 384H640z" p-id="9261"></path>
        </svg>

        <div class="ball-content">
            <svg width="300px" height="175px" viewBox="0 0 300 175">
                <path fill="transparent" stroke="#888888" stroke-width="1" d="M10 80 Q 77.5 10, 145 80 T 280 80" class="path"></path>
            </svg>
            <div class="ball"></div>
        </div>


    </div>
</template>

<script>
    import {defineComponent} from 'vue';
    export default defineComponent({
        name: "RouterAbstract",
        props:{
           path:String
        },
        setup(props,content){

        }
    })
</script>

<style scoped lang="scss">
    @keyframes draw {
        to{
            stroke-dashoffset: 0;
        }
    }
    .path1{
        fill: transparent;
        stroke-width: 4;
        stroke: #000;
        stroke-dasharray: 5000;
        stroke-dashoffset: -5000;
        animation: draw 6s forwards;
   }

    .ball-content{
        position: relative;
        display: inline-flex;
    }
    @keyframes red-ball {
        from { offset-distance: 0%; }
        to { offset-distance: 100%; } }
    .ball{
        position: absolute;
        left: 0;
        top: 0;
        width: 10px;
        height: 10px;
        background-color: red;
        border-radius: 50%;
        offset-distance: 0%;
        offset-path: path('M10 80 Q 77.5 10, 145 80 T 280 80');
        animation: red-ball 2s linear alternate infinite;
    }

</style>
