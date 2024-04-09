import { ExtractPropTypes } from 'vue';
import { GridProps } from '../grid/types';
import { RuleItem } from 'async-validator';
export type LabelType = 'slot' | 'input' | 'select' | 'date-picker' | 'switch' | 'time-picker' | 'time-select' | 'upload' | 'radio-group' | 'radio' | 'input-number' | 'color-picker' | 'checkbox-group' | 'checkbox' | 'autocomplete';
export interface FormRuleItem extends RuleItem {
    trigger?: string;
}
export type FormRules = Partial<Record<string, FormRuleItem>>;
export type OptionItem = {
    label: string;
    value: string | number;
    children?: OptionItem[];
};
export type FormProps = {
    rules?: FormRules;
    labelPosition?: 'left' | 'right' | 'top';
    labelWidth?: string | number;
    labelSuffix?: string;
    inline?: boolean;
    inlineMessage?: boolean;
    statusIcon?: boolean;
    showMessage?: boolean;
    size?: string;
    hideRequiredAsterisk?: boolean;
    validateOnRuleChange?: boolean;
    [key: string]: any;
};
export interface LabelOptionItem extends OptionItem {
    type?: string;
    text?: string;
    props: any;
}
export type LabelProps = {
    gridItem?: GridProps;
    formItem?: FormItemProps;
    rules?: FormRuleItem[];
    placeholder?: string;
    [x: string]: any;
};
export interface FormItemProps {
    labelWidth?: string | number;
    label?: string;
    prop?: string;
    required?: boolean;
    rules?: FormRuleItem[];
    error?: string;
    validateStatus?: string;
    for?: string;
    inlineMessage?: boolean | string;
    showMessage?: boolean;
    size?: string;
}
export type LabelItem = {
    label: string;
    key: string;
    type: LabelType;
    props?: LabelProps;
    slotName?: string;
    gridProps?: GridProps;
    formItemProps?: FormItemProps;
    options?: LabelOptionItem[];
    child?: LabelItem;
    rules?: FormRuleItem[];
    show?: boolean | ((model: any, label: LabelItem) => boolean);
    change?: (value: string | number, model: any, label: LabelItem) => void;
    _visible?: boolean;
};
export interface FormChangeOutput {
    key: string;
    params: any;
    value: any;
}
export interface FormOptions {
    gridItem?: {
        span: number;
    };
    grid?: {
        xGap: number;
        yGap: number;
        cols: number;
    };
}
export declare const uiFormProps: {
    model: {
        type: ObjectConstructor;
        default: () => {};
    };
    labels: {
        type: import("vue").PropType<LabelItem[]>;
        default: () => never[];
    };
    props: {
        type: import("vue").PropType<FormProps>;
        default: () => {};
    };
    options: {
        type: import("vue").PropType<FormOptions>;
        default: () => {};
    };
};
export type UiFormProps = ExtractPropTypes<typeof uiFormProps>;
