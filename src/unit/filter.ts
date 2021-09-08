


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

export  const format =(time:string,) =>{

};
