import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '角色名称',
    dataIndex: 'name',
  },
  {
    title: '角色级别',
    dataIndex: 'level',
  },
  {
    title: '数据范围',
    dataIndex: 'dataScope',
  },
  {
    title: '描述',
    dataIndex: 'description',
  },
  {
    title: '创建时间',
    dataIndex: 'createdTime',
    width: 180,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'roleNme',
    label: '角色名称',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'status',
    label: '状态',
    component: 'Select',
    componentProps: {
      options: [
        { label: '启用', value: '0' },
        { label: '停用', value: '1' },
      ],
    },
    colProps: { span: 8 },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'name',
    label: '角色名称',
    required: true,
    component: 'Input',
  },
  {
    field: 'level',
    label: '角色级别',
    required: true,
    component: 'InputNumber',
  },
  {
    required: true,
    field: 'dataScope',
    label: '数据范围',
    component: 'RadioButtonGroup',
    defaultValue: '全部',
    componentProps: {
      options: [
        { label: '全部', value: '全部' },
        { label: '本级', value: '本级' },
        { label: '自定义', value: '自定义' },
      ],
    },
  },
  {
    field: 'dept',
    label: '自定义部门',
    component: 'TreeSelect',
    show: ({ values }) => {
      return values.dataScope === '自定义';
    },
    dynamicRules: ({ values }) => {
      return values.dataScope === '自定义' ? [{ required: true }] : [];
    },

    componentProps: {
      multiple: true,
      treeCheckable: true,
      replaceFields: {
        title: 'name',
        key: 'id',
        value: 'id',
      },
      getPopupContainer: () => document.body,
    },
  },

  {
    label: '描述',
    field: 'description',
    component: 'InputTextArea',
  },
  {
    label: ' ',
    field: 'menu',
    slot: 'menu',
    component: 'Input',
  },
];
