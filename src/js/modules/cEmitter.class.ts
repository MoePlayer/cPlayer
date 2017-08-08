export const cEmitter = class cEmitter{
    events: { [propName: string]: ((e?: any) => void)[]; };
    constructor(typeList: { [propName: string]: ((e?: any) => void)[] }) {
	        if(typeList){
	            this.events = typeList;
	        }else{
	            this.events = {};
	        }
	    }
	    on(eventName:string,func:(...e:any[])=>void){
	        if(this.events[eventName]&&this.events[eventName].push !== undefined&&typeof func === "function"){
	            this.events[eventName].push(func);
	        }else if(this.events[eventName]===undefined||this.events[eventName].push===undefined){
	            this.events[eventName] = [];
	        }else{
	            throw new TypeError("Uncaught Unexcepted TypeError.")
	        }
	        return this;
	    }
	    emit(eventName:string,...args:any[]){
	        for(let i = 0;i<this.events[eventName].length;i++){
	            this.events[eventName][i](args);
	        }
	        return this;
	    }
}