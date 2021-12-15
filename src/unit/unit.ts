import CryptoJS from 'crypto-js';

const key = CryptoJS.enc.Utf8.parse("1234123412ABCDEF");  //十六位十六进制数作为密钥
const iv = CryptoJS.enc.Utf8.parse('ABCDEF1234123412');   //十六位十六进制数作为密钥偏移量

/**
 * 加密方法
 * @constructor
 */
function Encrypt(word:string) {
    const str = CryptoJS.enc.Utf8.parse(word);
    const value = CryptoJS.AES.encrypt(str,key,{
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return value.toString();
}

/**
 * 解密方法
 * @constructor
 */
function Decrypt(word:string) {

    const value = CryptoJS.AES.decrypt(word,key,{
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return CryptoJS.enc.Utf8.stringify(value).toString();
}

export function setStorage(){
    const storage = {
        value:'test',
        date:Date.now(),
        expire: 6000
    };
    localStorage.setItem('mytest',Encrypt(JSON.stringify(storage)));
}

export function getStorage(){
    const date = Date.now();
    let storageDate = 0;
    const mytest = localStorage.getItem('mytest');
    let result;
    if(mytest){
       const storage = JSON.parse(Decrypt(mytest));
       storageDate = storage.date  + storage.expire;

        if(storageDate > date){
            result  = storage.value;
        }else{
            result = '已过期';
        }
    }
    return result;
}


export function webAssemblyTest() {

   return fetch('/test.wasm').then(response =>
        response.arrayBuffer() // wasm 的内存 buffer
    ).then(buffer =>
        /**
         * 实例化，返回一个实例 WASM.module 和一个 WASM.instance，
         * module 是一个无状态的 带有 Ast.module 占位的对象；
         * 其中instance就是将 module 和 ES 相关标准融合，可以最终在 JS 环境中调用导出的方法
         */
        WebAssembly.instantiate(buffer, {})
    ).then(({module, instance}) =>
        instance.exports
    );
}
