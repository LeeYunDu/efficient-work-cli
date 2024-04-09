export interface DictHookParams {
    key: string | number | Array<string | number>;
}
export default function useDict(opts: DictHookParams): any;
export declare function dictParse(options: any[], value: string | number): any;
