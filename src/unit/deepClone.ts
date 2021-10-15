
/**
 * 浅拷贝
 * @param target
 */
export function clone<T>(target:T) {
    const obj:any = {};
    for(const key in target){
        obj[key] = target[key]
    }
    return obj;
}

/**
 * 乞丐版深拷贝
 * @param target
 */
export function baseClone<T>(target:T) {
    return JSON.parse(JSON.stringify(target))
}

/**
 * 基础版深拷贝 -- 增加递归
 * @param target
 * @constructor
 */
export  function FirstClone<T>(target:T) {
    if(typeof target == 'object'){
        const obj:any = {};
        for(const key in target){
            obj[key] = FirstClone(target[key])
        }
        return obj;
    }else{
        //基础数据类型直接返回
        return target;
    }
}

/**
 * 改进深拷贝 --考虑数组
 * @param target
 * @constructor
 */
export function SecondClone<T>(target:T) {
    if(typeof target =='object'){
        const obj:any = Array.isArray(target) ? []:{};
        for(const key in target){
            obj[key] = SecondClone(target[key]);
        }
        return obj;
    }else{
        //基础数据类型直接返回
        return target;
    }
}

/**
 * 改进深拷贝 -- 循环引用
 * @param target
 * @param map
 * @constructor
 */
export function ThirdClone<T>(target:T, map = new Map()) {
     if(typeof target == 'object'){
         const obj:any = Array.isArray(target) ? []:{};
         if(map.get(target)){
             return map.get(target);
         }
         map.set(target,obj);
         for(const key in target){
             obj[key] = ThirdClone(target[key],map);
         }
         return obj;
     }else{
         //基础数据类型直接返回
         return target;
     }
}

/**
 * 改进深拷贝 -- 性能优化，使用weakMap 和while遍历
 * @param target
 * @param map
 * @constructor
 */
export function FourClone(target:any,map = new Map()) {
     if(typeof target == 'object'){
         const isArray = Array.isArray(target);
         const obj:any = isArray?[]:{};
         if(map.get(target)){
             return  map.get(target)
         }
         map.set(target,obj);

         const keys = isArray? target:Object.keys(target);
         forEach(keys,(key:any)=>{
             obj[key] = FourClone(target[key],map);
         })
         return  obj;
     }else {
         //基础数据类型直接返回
         return target;
     }
}

function forEach<T>(array:any,iteratee:Function) {
    let index = -1;
    const length = array.length;
    while (++index < length){
        iteratee(array[index],index);
    }
    return array;
}

/**
 * 深拷贝最终版本
 * @param target
 * @param map
 */
export function deepClone(target:any,map = new Map()) {

     //原始类型直接返回
     if(!isObject(target)){
         return target;
     }
     const type = getType(target);
     let obj:any;

     if(dateTag.includes(type)){
         obj = getInit(target);
     }

     //防止循环引用
     if(map.get(target)){
         return  map.get(target);
     }
     map.set(target,obj);

     //克隆set
     if(type == setTag){
         target.forEach((value:any)=>{
             obj.add(deepClone(value,map))
         });
         return obj;
     }

     //克隆map
     if(type == mapTga){
         target.forEach((value:any,key:any)=>{
             obj.set(key,deepClone(value,map))
         });
         return  obj;
     }

     //克隆对象和数组
    const keys = type == arrayTag? target:Object.keys(target);
    forEach(keys,(key:any)=>{
        obj[key] = FourClone(target[key],map);
    })
    return  obj;
}

//可遍历类型
const mapTga = '[object Map]',
      setTag = '[object Set]',
      arrayTag = '[object Array]',
      objectTag = '[object Object]';
//不可遍历类型
const boolTag = '[object Boolean]',
      dateTag = '[object Date]',
      errorTag = '[object Error]',
      numberTag = '[object Number]',
      regexpTag = '[object RegExp]',
      stringTag = '[object String]',
      symbolTag = '[object Symbol]';

const deepTag = [mapTga,setTag,arrayTag,objectTag];

function isObject<T>(target:T) {
    const type = typeof target;
    return type!= null && (type == 'object' || type == 'function');
}
function getType<T>(target:T) {
     return Object.prototype.toString.call(target);
}

/**
 * 使用原对象的方法生成新对象，可以保存原对象原型上的数据
 * @param target
 */
function getInit<T extends Object>(target:T) {
    const Ctor:any =  target.constructor;
    return new Ctor();
}
