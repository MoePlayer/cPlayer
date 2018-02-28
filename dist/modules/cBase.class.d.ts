import { __LYRIC__ } from "./c.interface";
export declare class cBase {
    browser: string;
    root: Element;
    constructor(rootNode?: HTMLElement);
    replace(oldElement: HTMLElement, newElement: Node): void;
    replaceInner(element: HTMLElement, innerContent: string): void;
    getByClass(className: string, parentElement?: HTMLElement | Element): HTMLElement;
    getByTagName(tagName: string, parentElement?: HTMLElement | Element): HTMLElement;
    rand(start?: number, end?: number): number;
    find<T>(array: T[] | __LYRIC__, func: (any: any) => boolean): T[];
    style(dom: HTMLElement, property: string, content: string): void;
}
