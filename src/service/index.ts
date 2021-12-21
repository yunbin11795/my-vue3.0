import axios from 'axios';
import { ElLoading } from 'element-plus'
import { useRouter } from 'vue-router'

let loading:any ;
const service = axios.create();
service.interceptors.request.use(config =>{
    loading = ElLoading.service({
          fullscreen: true,
          text:'加载中'
      });
    const token = window.localStorage.getItem("token") || '';
    config.headers = {
        'content-type': 'application/json; charset=utf-8',
        'Authorization':token
    };
    return config;
},error => {
    Promise.reject(error);
});


service.interceptors.response.use(response =>{
    loading.close();
    if(response.status === 200){
        return  Promise.resolve(response.data);
    }else{
        return Promise.reject(response);
    }
},error => {

    const router = useRouter();
    if(error.response.status){
         switch (error.response.status) {
             case '404':
                 router.push('/404');
                 break;
             case '403':
                 router.push('/');
                 break;
         }
    }
    return Promise.reject(error.response);
});


export  default  service;
