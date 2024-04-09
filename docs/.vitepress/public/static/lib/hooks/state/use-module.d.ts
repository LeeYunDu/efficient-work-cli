import { Ref, ComputedRef } from 'vue';
import { FieldItem, ModuleOptions, ModuleHookMode } from '../types';
export declare const dictConfig: any;
export declare function createDictKey(type: number | string): string;
export default function useModule(options?: ModuleOptions, argData?: Ref<any> | ComputedRef<any>): ModuleHookMode;
export declare function useResolution(data: any, menuTypes?: number[]): any;
export declare function transformFieldValue(filedItem: FieldItem, data: any, resultData: any): void;
