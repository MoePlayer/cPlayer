export declare const cEmitter: {
    new (typeList: {
        [propName: string]: ((e?: any) => void)[];
    }): {
        events: {
            [propName: string]: ((e?: any) => void)[];
        };
        on(eventName: string, func: (...e: any[]) => void): any;
        emit(eventName: string, ...args: any[]): any;
    };
};
