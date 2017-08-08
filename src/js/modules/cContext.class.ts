export class cContext {
	options: {
		"element": HTMLElement,
		"items": { name: string, action?: (e: MouseEvent) => void }[]
	};
    /*
     * options:{
     *            "element":element,
     *            "items":[
     *                {"name":"XXX","action":func},
     *                {"name":"XXX","action":func},
     *            ]
     *         }
     */
	constructor(options: {
		"element": HTMLElement,
		"items": { name: string, action?: (e: MouseEvent) => void }[]
	}) {
		if (!options.element) throw new Error("Need a element to bind.");
		this.options = options;
		this.options.element.oncontextmenu = function () {
			return false;
		}
		this.options.element.addEventListener("contextmenu", a => {
			this.hide();
			this.show(a);
			return false;
		});
		document.documentElement.addEventListener("click", () => this.hide());
		return this;
	}
	add({ name, action }:{ name: string, action?: (e: MouseEvent) => void }) {
		this.options.items.push({ name, action });
		return this;
	}
	show({ pageX, pageY }:MouseEvent) {
		let content = document.createElement("div");
		content.classList.add("c-context");
		for (let items = this.options.items, i = 0; i < items.length; i++) {
			content.appendChild(document.createElement("div"));
			content.children[i].classList.add("c-context--list");
			content.children[i].innerHTML = items[i].name;
			//content.innerHTML+=`<div class="c-context--list">${items[i].name}</div>`;
			content.children[i].addEventListener("click", items[i].action as (e: MouseEvent) => void);
		}
		document.body.appendChild(content);
		//Set the offset-x
		if (document.documentElement.clientWidth > content.offsetWidth) { //When the body is wide enough
			content.style.left = document.documentElement.clientWidth > (content.offsetWidth + pageX) ?
				pageX + "px" : pageX - content.offsetWidth + "px";
		} else {
			content.style.width = document.documentElement.clientWidth + "px";
		}
		//Set the offset-y
		if (document.documentElement.clientHeight > content.offsetHeight) {
			content.style.top = document.documentElement.clientHeight > (content.offsetHeight + pageY) ?
				pageY + "px" : pageY - content.offsetHeight + "px";
		}
		content.style.visibility = "visible";
		return this;
	}
	hide() {
		for (let list = document.getElementsByClassName("c-context"), i = list.length - 1; i >= 0; i--)document.body.removeChild(list[i]);
		return this;
	}
	get items() {
		return this.options.items;
	}
	set items(context) {
		this.options.items = context;
	}
}