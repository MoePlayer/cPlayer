import { __LYRIC__ } from "c.interface";

export class cBase {
    browser: string;
    root: Element;
    constructor(rootNode = document.documentElement) {
        this.root = rootNode;
        for (let styleList = document.documentElement.style, i = styleList.length; i > 0; i--) {
            ["-webkit-", "-moz-", "-o-", "-ms-"].forEach(element => {
                if (styleList[i].indexOf(element) !== -1) {
                    this.browser = element.replace("-", "");
                };
            });
            if (this.browser) break;
        }
    }
    replace(oldElement: HTMLElement, newElement: Node) {
        //newElement 不存在于oldElement 的父元素中,首先载入.
        newElement = newElement.cloneNode(true);
        (oldElement.parentNode as Node).appendChild(newElement);
        (oldElement.parentNode as Node).removeChild(oldElement);
        //顺便如果有值为oldElement的变量,请重新赋值.
    }
    replaceInner(element: HTMLElement, innerContent: string) {
        //进行一次简单的封装
        element.innerHTML = innerContent;
    }
    getByClass(className: string, parentElement?: HTMLElement | Element) {
        return parentElement != undefined ?
            <HTMLElement>parentElement.getElementsByClassName(className)[0]
            : <HTMLElement>this.root.getElementsByClassName(className)[0];
    }
    getByTagName(tagName: string, parentElement?: HTMLElement | Element) {
        return parentElement != undefined ?
            <HTMLElement>parentElement.getElementsByTagName(tagName)[0]
            : <HTMLElement>this.root.getElementsByTagName(tagName)[0];
    }
    rand(start?: number, end?: number) {
        if (!start || !end) return Math.random();
        if (start > end) throw new RangeError("the EndNumber must be bigger than the StartNumber");
        return (end - start) * Math.random() + start;
    }
    find<T>(array: T[] | __LYRIC__, func: (any: any) => boolean) {
        let ar: T[] = [];
        [].forEach.call(array, (el: T) => {
            if (!!func(el)) ar.push(el);
        }); return ar;
    }
    style(dom: HTMLElement, property: string, content: string) {
        //不管浏览器，暴力加前缀
        dom.style[
            <any>(this.browser + property.slice(0, 1).toUpperCase() + property.slice(1))
        ] = content;
        dom.style[property as any] = content;
    }
}