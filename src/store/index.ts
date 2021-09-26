import { createStore } from 'vuex'
import test from  './module/test';

export default  createStore({
    modules:{
        test,
    }
})
