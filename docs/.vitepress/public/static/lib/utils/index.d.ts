import { SourceModel } from './interface';
export * from './szzt';
export * from './vue';
export declare function dataType(data: unknown): string;
export declare function packSource(options: SourceModel): {
    data: {};
};
export declare function uuid(size?: number, prefix?: string): string;
