export declare class cContext {
    options: {
        "element": HTMLElement;
        "items": {
            name: string;
            action?: (e: MouseEvent) => void;
        }[];
    };
    constructor(options: {
        "element": HTMLElement;
        "items": {
            name: string;
            action?: (e: MouseEvent) => void;
        }[];
    });
    add({name, action}: {
        name: string;
        action?: (e: MouseEvent) => void;
    }): this;
    show({pageX, pageY}: MouseEvent): this;
    hide(): this;
    items: {
        name: string;
        action?: ((e: MouseEvent) => void) | undefined;
    }[];
}
