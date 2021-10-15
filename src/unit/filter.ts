

export const filterFrom = (value:string|number,items:Array<any> = [])=>{

    let result;
    for(let i =0;i<items.length;i++){
        if(items[i].code == value){
            result = items[i].label;
        }
    }
    return result;
};


export const Transformation = (limit:number)=>{
        if(!limit){
            return  '';
        }
        let size = "";
        if( limit < 0.1 * 1024 ){ //如果小于0.1KB转化成B
            size = limit.toFixed(2) + "B";
        }else if(limit < 0.1 * 1024 * 1024 ){//如果小于0.1MB转化成KB
            size = (limit / 1024).toFixed(2) + "KB";
        }else if(limit < 0.1 * 1024 * 1024 * 1024){ //如果小于0.1GB转化成MB
            size = (limit / (1024 * 1024)).toFixed(2) + "MB";
        }else{ //其他转化成GB
            size = (limit / (1024 * 1024 * 1024)).toFixed(2) + "GB";
        }

        return size;
};

export  function isObject<T>(value:T){
    const type = typeof value;
    return value!=null && (type == 'object' || type == 'function')
}

export function isType<T extends Object>(value:T, type:string){
     return  Object.prototype.toString.call(value) == type;
}


export  function test<T extends String>(value:T) {
    console.log(value.substring(0,1))
}




type User = {
    id:number,
    kind:string
}
export function makeCustomer<T extends User>(u:T):T{
    return {
        ...u,
        id: u.id,
        kind: 'customer'
    }
}

function f(a:string,b:string):string;
function f(a:number,b:number):number;
function f(a: string | number, b: string | number):string | number{
    // if (typeof a === 'string') {
    //     return a + ':' + b; // no error but b can be number!
    // } else {
    //     return a + b; // error as b can be number | string
    // }
    if (typeof a === 'string' || typeof b === 'string') {
        return a + ':' + b;
    } else {
        return a + b
    }
}
type Foo = {
    a: number;
    b?: string;
    c: boolean;
}
function getValues<T, K extends keyof T>(obj:T, keys:K[]) {
    return keys.map(key => obj[key])
}


