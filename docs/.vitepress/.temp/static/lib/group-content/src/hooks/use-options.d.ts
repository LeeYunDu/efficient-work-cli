export default function useGcOptions(props: any, state: any): {
    options: import("vue").ComputedRef<any>;
    base: import("vue").ComputedRef<any>;
    layoutConf: any;
    activeRowHeight: import("vue").ComputedRef<boolean>;
    groupConf: import("vue").ComputedRef<any>;
    asyncConf: import("vue").ComputedRef<any>;
    group: import("vue").ComputedRef<any>;
    itemData: import("vue").ComputedRef<(item: any) => any>;
    dataJson: import("vue").ComputedRef<any>;
    paramsData: import("vue").ComputedRef<any>;
    component: import("vue").ComputedRef<any>;
    pubsubKeys: {
        RELOAD: string;
        SINGLE_ASYNC: string;
        GC: string;
    };
    gcUuid: string;
    viewKeyRef: import("vue").ComputedRef<string>;
    useMockRef: import("vue").ComputedRef<boolean>;
    xiaozhiRef: import("vue").ComputedRef<any>;
};
