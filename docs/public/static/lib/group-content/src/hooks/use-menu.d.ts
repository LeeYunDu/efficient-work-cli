import { MenuMode } from '../../../typings/data';
import { ResponseMode } from '../../../typings/params';
export interface MenuModuleMode {
    tree: ResponseMode;
    list: MenuMode[];
    subscribe: any;
}
export default function useMenu(id: string | number): MenuModuleMode;
