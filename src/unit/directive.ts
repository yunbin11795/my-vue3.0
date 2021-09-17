import {App} from 'vue';

export const createDirective = (app:App)=>{
    app.directive('test',{
        mounted(el,binding){
            el.innerHTML = binding.value;
        }
    })
};
