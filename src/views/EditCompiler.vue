<template>
    <div class="main">
        <div contenteditable="true" class="edit-box" @input="getValue($event)" ref="myBox">

        </div>

        <pre class="edit-code language-javascript" ref="myCode">

        </pre>

        <div class="list-search" v-show="isShow" ref="myList" @click="selectList">
            <div class="search-one" v-for="item of data.fn" :key="item">{{item}}</div>
        </div>

    </div>

</template>

<script lang="ts">

    declare var hljs:any;
    import {onMounted,ref,reactive} from 'vue';
    export default {
        name: "EditCompiler",
        setup(){
            onMounted(()=>{

            });

            let myBox = ref();
            let myCode = ref();
            let myList = ref();
            let isShow = ref(false);
            const list = ['sum','add','reduce','ride','except'];
            let data = reactive({
                fn :[] as any
            });

            const getValue = (e:any)=>{
                 const el = myCode.value;
                 el.innerHTML = e.target.innerText;
                 hljs.highlightElement(el);
                 setSuggestions(e);
            };

            const setSuggestions = (e:any)=>{

                 const sugDomStlye = myList.value.style;

                 let endOffset = getSelection()!.getRangeAt(0).endOffset;
                 const text = e.target.innerHTML;
                // 括号和非英文字符不管，return
                if(['(',')','{','}'].includes(text.charAt(endOffset)) || /[^a-zA-z]/i.test(e.data)){
                    isShow.value = false;
                    return;
                }

                let str = '';
                let startOffset = endOffset -1;

                // 从光标位置往前倒数，匹配到字符串开头或非字母字符
                while (startOffset!== -1 && /[a-zA-Z]/i.test(text.charAt(startOffset))){
                     str = `${text.charAt(startOffset)}${str}`;
                     startOffset -= 1;
                }

                // 此时就拿到了一个用户手敲的字符串，没有就return
                startOffset += 1;
                if(str.length === 0){
                    isShow.value = false;
                    return;
                }

                // 去内置公式列表里匹配，简单粗暴使用字符串的include方法
                data.fn = list.filter((o) => o.includes(str.trim())) ;

                if(data.fn.length > 0){
                    const el = e.target as HTMLElement;
                    const {x,y,width} = el.getBoundingClientRect();
                    const singleLineLen = parseInt((width / 8.8).toString());
                    const left = (endOffset % singleLineLen) *8.8 + 14 + 'px' + x;
                    const top = (parseInt((endOffset / singleLineLen).toString()) + 1) * 24 + y;

                    Object.assign(sugDomStlye,{
                        left:`${left}px`,
                        top: `${top}px`,
                    });
                    isShow.value = true;
                }else{
                    isShow.value = false;
                }
            };
            
            const selectList = (e:any)=>{

                const el = myCode.value;
                const nowInnerHTML = el.innerHTML.substring(0,el.innerHTML.length - 1);
                el.innerHTML = nowInnerHTML + e.target.innerText;
                hljs.highlightElement(el);
                isShow.value = false;

                myBox.value.innerHTML = el.innerHTML;
                myBox.value.focus();

                const focusDOM = window.getSelection()!.getRangeAt(0)!;

                console.log(myBox);
                // 设置光标位置
                focusDOM.setStart(myBox.value, 1);
                focusDOM.collapse(true);
            };

            return{
                getValue,
                myBox,
                myCode,
                isShow,
                myList,
                data,
                selectList
            }
        }
    }
</script>

<style scoped lang="scss">
    .main{
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        width: 300px;
        height: 300px;
        background: #2b2b2b;

        .edit-box{
            font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
            text-align: left;
            color: transparent;
            padding: 4px 11px;
            position: absolute;
            resize: vertical;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            caret-color: #b8b8b8;
            z-index: 10;
            font-size: 16px;
            box-sizing: border-box;
            white-space: pre-wrap;
            word-wrap: break-word;
            word-break: break-all;
        }
        .edit-code{
            padding: 4px 11px;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            margin: 0;
            text-align: left;
            z-index: 9;
            font-size: 16px;
            box-sizing: border-box;
            white-space: pre-wrap;
            word-wrap: break-word;
            word-break: break-all;
            font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
        }
        .list-search{
            position: absolute;
            width: 100px;
            background: #fff;
            color: #000;
            display: block;
            z-index: 10;
            .search-one{
                text-align: left;
                padding-left: 10px;
                height: 30px;
                line-height: 30px;
                cursor: pointer;
                &:hover{
                    color: #ffa07a;
                }
            }

        }
    }

</style>
