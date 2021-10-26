/***
 * 判断是否是空对象
 * @param obj
 */
export function isEmptyObject<T>(obj:T) {
     let name;
     for(name in obj){
         return true;
     }
     return  false;
}

/**
 * 判断是否是window
 * @param obj
 */
export  function isWindow(obj:any) {
     return obj !== null && obj === obj.window;
}

/**
 * 模拟实现call方法
 * @param content
 */
(Function.prototype as any).call2 = function (content:any) {
      let context = content || window;
      context.fn = this;
      let args = [];
      for(let i =1 ;i<arguments.length;i++){
          args.push('arguments[' + i + ']')
      }
      let result = eval('context.fn(' + args +')');
      delete context.fn;
      return result;
};
/**
 * 模拟实现apply
 * @param content
 * @param arr
 */
(Function.prototype as any).apply2 = function (content:any,arr:Array<any>) {
      let context = Object(content)|| window;
      context.fn = this;

      let result;
      if(!arr){
          result = context.fn();
      }else{
          let args = [];
          for(let i = 0;i< arr.length;i++){
               args.push('arr['+ i + ']');
          }
          result = eval('context.fn(' + args + ')');
      }

      delete context.fn;
      return result;
};

/**
 * 模拟bind的实现
 * @param content
 */
(Function.prototype as any).bind2 = function (content:any) {
     if(typeof content !== 'function'){
         throw  new Error('Function.prototype.bind - what is trying to be bound is not callable');
     }

     let self = this;
     //获取bin函数第二参数到最后一个参数
     const args = Array.prototype.slice.call(arguments,1);

     var fNOP = function () {};

     let fBound = function () {
         // 这个时候的arguments是指bind返回的函数传入的参数
         const bindArgs =  Array.prototype.slice.call(arguments);
         // 当作为构造函数时，this 指向实例，此时结果为 true，将绑定函数的 this 指向该实例，可以让实例获得来自绑定函数的值
         let that = this instanceof fNOP? this : content;
         return self.apply(that,args.concat(bindArgs));
     };
     fNOP.prototype = this.prototype;
     fBound.prototype = new fNOP();
     return fBound;
};


export function objectFactory(){
    let obj:any = {};
    let Constructor:any = [].shift.call(arguments);
    obj.__proto__ = Constructor.prototype;
    let ret =Constructor.apply(obj, arguments);
    return typeof ret === 'object' ? ret : obj;
}

