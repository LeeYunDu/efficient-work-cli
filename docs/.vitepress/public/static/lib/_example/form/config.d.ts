export declare const uiFormOptions: {
    formProps: {
        labelWidth: string;
        mapper: {
            label: string;
            value: string;
        };
    };
    itemStyle: {
        gridItem: {
            span: number;
        };
    };
    form: ({
        label: string;
        key: string;
        type: string;
        options: never[];
        props: {
            clearable: boolean;
            placeholder: string;
            gridItem: {
                span: number;
            };
            rule?: undefined;
            multiple?: undefined;
            type?: undefined;
        };
        show?: undefined;
    } | {
        label: string;
        key: string;
        type: string;
        props: {
            clearable: boolean;
            gridItem: {
                span: number;
            };
            placeholder: string;
            rule?: undefined;
            multiple?: undefined;
            type?: undefined;
        };
        options?: undefined;
        show?: undefined;
    } | {
        label: string;
        key: string;
        type: string;
        props: {
            clearable: boolean;
            placeholder: string;
            gridItem: {
                span: number;
            };
            rule: ({
                required: boolean;
                message: string;
                trigger: string;
                min?: undefined;
                type?: undefined;
                max?: undefined;
            } | {
                min: number;
                type: string;
                max: number;
                message: string;
                required?: undefined;
                trigger?: undefined;
            })[];
            multiple?: undefined;
            type?: undefined;
        };
        options?: undefined;
        show?: undefined;
    } | {
        label: string;
        key: string;
        type: string;
        options: {
            label: string;
            value: string;
        }[];
        props: {
            clearable: boolean;
            placeholder: string;
            gridItem: {
                span: number;
            };
            rule: {
                required: boolean;
                message: string;
                trigger: string;
            }[];
            multiple?: undefined;
            type?: undefined;
        };
        show?: undefined;
    } | {
        label: string;
        key: string;
        type: string;
        options: never[];
        props: {
            multiple: boolean;
            clearable: boolean;
            placeholder: string;
            gridItem: {
                span: number;
            };
            rule: {
                required: boolean;
                message: string;
                trigger: string;
            }[];
            type?: undefined;
        };
        show?: undefined;
    } | {
        label: string;
        key: string;
        type: string;
        options: {
            label: string;
            value: string;
        }[];
        props: {
            clearable: boolean;
            placeholder: string;
            rule: {
                required: boolean;
                message: string;
                trigger: string;
            }[];
            gridItem?: undefined;
            multiple?: undefined;
            type?: undefined;
        };
        show?: undefined;
    } | {
        label: string;
        key: string;
        type: string;
        options: never[];
        props: {
            clearable: boolean;
            placeholder: string;
            gridItem?: undefined;
            rule?: undefined;
            multiple?: undefined;
            type?: undefined;
        };
        show?: undefined;
    } | {
        label: string;
        key: string;
        type: string;
        props: {
            clearable: boolean;
            placeholder: string;
            rule: {
                required: boolean;
                message: string;
                trigger: string;
            }[];
            gridItem?: undefined;
            multiple?: undefined;
            type?: undefined;
        };
        options?: undefined;
        show?: undefined;
    } | {
        show: (value: any) => boolean;
        label: string;
        key: string;
        type: string;
        props: {
            clearable: boolean;
            placeholder: string;
            rule: {
                required: boolean;
                message: string;
                trigger: string;
            }[];
            gridItem?: undefined;
            multiple?: undefined;
            type?: undefined;
        };
        options?: undefined;
    } | {
        show: (value: any) => boolean;
        label: string;
        key: string;
        type: string;
        props: {
            clearable: boolean;
            placeholder: string;
            type: string;
            rule: {
                required: boolean;
                message: string;
                trigger: string;
            }[];
            gridItem?: undefined;
            multiple?: undefined;
        };
        options?: undefined;
    })[];
    experienceInfo: {
        formProps: {
            labelWidth: string;
            labelPosition: string;
            mapper: {
                label: string;
                value: string;
            };
        };
        form: {
            label: string;
            key: string;
            type: string;
            props: {
                clearable: boolean;
                placeholder: string;
                type: string;
                gridItem: {
                    span: number;
                };
                autosize: {
                    minRows: number;
                    maxRows: number;
                };
                rule: {
                    required: boolean;
                    message: string;
                    trigger: string;
                }[];
            };
        }[];
    };
};
