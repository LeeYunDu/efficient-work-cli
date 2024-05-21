import { InjectionKey } from 'vue';
export default function useSubscribe(key: string | symbol | InjectionKey<string | symbol>): {
    subscribe: (fn: any) => any;
    unsubscribe: () => any;
};
