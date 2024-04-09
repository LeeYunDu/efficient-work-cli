import './styled';
import { LayoutConfigMode, XyGridMode } from '../../types/layout';
declare global {
    interface Window {
        $style: any;
    }
}
export declare function getXYGap(gap: any, layoutOrigin: any): {
    xGap: any;
    yGap: any;
};
export declare function calcGrid(layoutOrigin: any, layoutConfig: LayoutConfigMode): XyGridMode;
