##Vue优化技巧记录![链接](https://juejin.cn/post/7005880217684148231)
一. v-for使用key  
   使用v-for渲染元素列表时， 默认采用就地复用策略;列表数据修改时，他会根据*key*值去判读某个值是否修改，如果修改，则重新渲染这一项，
   否则复用之前的元素(常出现的问题是使用index渲染key,如果在数组中插入或者移除一个元素时，其后面的元素 index 将会变化，
   这会让vue进行原地复用时错误的绑定状态)  
   
二. 代码优化  
   ```javascript
     //把复杂的条件分支提炼成函数
     
     // 坏味道
     var getPriceBad = function (price) {
       var date = new Date();
       if (date.getMonth() >= 6 && date.getMonth() <= 9) {
         // 夏天
         return price * 0.8;
       }
       return price;
     };
     
     // 推荐
     var isSummer = function () {
       var date = new Date();
       return date.getMonth() >= 6 && date.getMonth() <= 9;
     };
     var getPrice = function (price) {
       if (isSummer()) {
         // 夏天
         return price * 0.8;
       }
       return price;
     };

```
三. 设计模式优化if-else 写法  
   - 策略模式  
   ```javascript
    //通常写法
    function travelBad(type) {
        if(type === 'plans'){
            
        }else if(type === 'train'){
            
        }else if(type === 'bus'){
            
        }
    }
    
    //优化写法
    function travel(type) {
      const options = {
          plans:()=>{
              
          },
          train:()=>{
              
          },
          bus:()=>{
              
          }
      };
      return options[type]();
    }
```
   - 迭代器模式   
   ```javascript
    //通常写法
    if(color === 'red' || color === 'green' || color === 'blue'){
        console.log(color + '属于三原色');
     }
    //优化写法
    if(['red','green','blue'].includes(color)){
        console.log(color + '属于三原色')
    }
```
   - 单例模式  
       定义：保证一个类仅有一个实例，并提供一个访问它的全局访问点。
       
       简而言之，单例模式一个最大的特征是唯一性，考虑全局唯一时使用单例模式，比如浏览器中的window对象、全局缓存等。
  ```javascript
     //使用类
     class Vue {
         static getInstance(){
              if(!Vue.instance){
                  Vue.instance = new Vue();
              }
              return Vue.instance;
         }
     }
     
     let a = Vue.getInstance();
     let b = Vue.getInstance();
     console.log(a === b); // true
     
     //使用闭包
     Vue.getInstance = (function() {
        let instance = null;
        return function() {
             if(!instance){
                 instance = new Vue();
             }
             return instance;
        }
     })()
```   
   - 迭代器模式  
   定义：指提供一种方法顺序访问一个聚合对象中的各个元素，而又不需要暴露该对象的内部表示。
   
   定义可能不太好理解，但我们可以从名称入手。迭代器在很多语言里面都内置了，比如JS中数组迭代器——Array.prototype.forEach
   
   ```javascript
     [1,2,3].forEach((item,index)=>{
          console.log(`当前元素${item}的下标为${index}`)
     })  
     
     //自己实现迭代器
     const each = function(ary,callback) {
        for (let i = 0, l = ary.length; i < l; i++) {
           callback.call(ary[i], i, ary[i]); // 把下标和元素当作参数传给 callback 函数
         }
     }
```   
  - 观察者模式  
  ```javascript
    //实现Event Bus
    
    class  EventEmitter {
         constructor(){
             //handlers是一个map,用于存储事件与回调之间的对应关系
             this.handlers = {};
         }
         
         //on方法永存安装事件监听器，它接受目标事件名称和回调函数作为参数
         on(eventName,cb){
             if(!this.handlers[eventName]){
                 this.handlers[eventName] = [];
             }
             this.handlers[eventName].push(cb);
         }
         
         //emit方法用于触发目标事件，他接受事件名称和监听函数入参作为参数
         emit(eventName,...args){
              if(this.handlers[eventName]){
                   // 这里做了一次浅拷贝，是为了避免通过 once 安装的监听器在移除的过程中出现顺序问题
                  const handles = this.handlers[eventName].slice()
                  
                  handles.forEach((callback,index)=>{
                      callback(...args);
                  })
              }
         }
         
         //移除某个事件回调队列的指定回调函数
         off(eventName,cb){
             const callbacks = this.handlers[eventName];
             const index = callbacks.indexOf(cb);
             if(index !== -1){
                 callbacks.splice(index,1);
             }
         }
         
         //为事件注册单次监听器
         once(eventName,cb){
             // 对回调函数进行包装，使其执行完毕自动被移除
             const wrapper = (...args)=>{
                 cb(...args);
                 this.off(eventName,wrapper);
             }
             
             this.on(eventName,wrapper)
         }
    }
```
