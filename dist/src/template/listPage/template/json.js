"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.detailFields = exports.addFormOptions = exports.formFields = exports.tableColumn = exports.tableQueryFormOptions = exports.tableQueryFormFields = void 0;
/**
 * common
 */
exports.tableQueryFormFields = [
    { label: '场景名称', value: '', key: 'name', type: 'input', },
    {
        label: '场景类型', key: 'key2', type: 'select', options: [
            { label: '选项1', value: 'valaue1', tValue: 'valuet1' }
        ]
    },
    { label: '发布部门', key: 'key3', type: 'input', },
    {
        label: '发布时间', key: 'key4', type: 'datePicker', props: {
            'value-format': 'x'
        }
    },
];
exports.tableQueryFormOptions = {
    labels: exports.tableQueryFormFields,
    props: {
        inline: true,
        labelWidth: '80px',
        rules: []
    },
    options: {
        gridItem: { span: 5 }
    }
};
exports.tableColumn = [
    {
        label: '序号',
        key: 'index',
        props: {
            width: '80px'
        }
    },
    {
        label: '场景名称',
        key: 'deptType',
    },
    {
        label: '场景类型',
        key: 'deptName',
    },
    {
        label: '发布部门',
        key: 'appealCount',
    },
    {
        label: '发布时间',
        key: 'hadFinished',
    },
    {
        label: '操作人',
        key: 'hadFinished',
    },
    {
        label: '状态',
        key: 'hadFinished',
    },
    {
        label: '系统推送',
        key: 'key9',
        type: 'slot',
        slotName: 'msg',
    },
    {
        label: '操作',
        key: 'hadFinishedRate',
        type: 'slot',
        slotName: 'action',
        props: {
            width: '210px',
        },
    },
];
exports.formFields = [
    {
        label: '场景名称', value: '1', key: 'key1', type: 'input', props: {
            formItem: { required: true, }
        },
    },
    {
        label: '场景类型', key: 'key99', type: 'select', options: [
            { label: '选项1', value: 'valaue1', tValue: 'valuet1' }
        ],
        props: {
            formItem: { required: true, }
        },
    },
    { label: '联系人', value: '', key: 'key2', type: 'input', props: { formItem: { required: true, } }, },
    { label: '联系电话', value: '', key: 'key3', type: 'input', props: { formItem: { required: true, } }, },
    { label: '联系地址', value: '', key: 'key4', type: 'input', props: { formItem: { required: true, } }, },
    { label: '响应时间', value: '', key: 'key5', type: 'slot', slotName: 'xyTime' },
    { label: '场景描述', value: '', key: 'key6', type: 'slot', slotName: 'richText' },
    { label: '', value: '', key: 'key6', type: 'slot', slotName: 'btns' },
];
exports.addFormOptions = {
    labels: exports.formFields,
    props: {
        rules: []
    },
    options: {
        gridItem: { span: 24 }
    }
};
exports.detailFields = [
    { label: '场景类型', key: '' },
    { label: '发布时间', key: '' },
    { label: '响应截止时间', key: '' },
    { label: '联系人', key: '' },
    { label: '联系电话', key: '' },
    { label: '联系地址', key: '' },
];
