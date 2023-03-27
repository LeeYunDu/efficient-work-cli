"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tableColumn = exports.tableQueryFormOptions = exports.tableQueryFormFields = void 0;
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
        key: 'hadFinishedRate',
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
