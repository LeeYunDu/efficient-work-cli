import { MenuMode } from '../../typings/data';
export declare function parseDict(key: string | number, argOptions: any): any;
export declare function parseTime(time: string | number | Date, cFormat?: string): string | null;
export declare function convertValue(argValue: string | number, argType: string | string[], argOption: any | any[]): any;
export declare function outLinkOpen(url: string, type?: string): void;
export declare function open(item: MenuMode, type?: string): void;
export declare function setPicture<T>(data: T | Array<T>, keys?: string[]): Array<T>;
