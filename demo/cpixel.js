const cPixel = class{
    constructor(){
        this._move = (options)=>{
            let content = this.content;
            content.innerHTML = JSON.stringify({pageX:options.pageX,pageY:options.pageY,clientX:options.clientX,clientY:options.clientY});
        }
        this.content = document.createElement("div");
        this.content.classList.add("c-pixel");
        document.body.appendChild(this.content);
        document.documentElement.addEventListener("mousemove",this._move);
    }
    hide(){
        document.documentElement.removeEventListener("mousemove",this._move);
    }
};
let style = document.createElement("style");
    style.innerHTML = `
        .c-pixel {
            background-color: rgba(0,0,0,0.5);
            position: fixed;
            top: 0;
            left: 0;
            border-radius: 0 0 5px 5px;
            color: white;
            font-family: monospace;
            padding: 0.1%;
        }
    `;
document.head.appendChild(style);