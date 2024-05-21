import { ComputedRef } from 'vue';
import { MenuMode } from '../../typings/data';
export default function useCheckedMenu(opts?: any): {
    route: ComputedRef<any>;
    menu: ComputedRef<MenuMode>;
    options: ComputedRef<any>;
    showHeader: ComputedRef<any>;
    showSide: ComputedRef<any>;
    showBreadcrumb: ComputedRef<boolean>;
};
