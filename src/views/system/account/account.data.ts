import { h, VNode } from 'vue';
import { Tag } from 'ant-design-vue';
import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { getAllRoleListApi } from '/@/api/admin/role';
import { DescItem } from '/@/components/Description';

export const columns: BasicColumn[] = [
  {
    title: '用户名',
    dataIndex: 'userName',
  },
  {
    title: '首页路径',
    dataIndex: 'homePath',
  },
  {
    title: '真实名称',
    dataIndex: 'realName',
  },
  {
    title: '手机号',
    dataIndex: 'phone',
  },

  {
    title: '状态',
    dataIndex: 'status',
    width: 80,
    customRender: ({ record }) => {
      const status = record.state;
      const enable = ~~status === 1;
      const color = enable ? 'green' : 'red';
      const text = enable ? '启用' : '停用';
      return h(Tag, { color: color }, () => text);
    },
  },

  {
    title: '管理员',
    dataIndex: 'isAdmin',
    width: 80,
    customRender: ({ record }) => {
      const status = record.isAdmin;
      const enable = ~~status === 1;
      const color = enable ? 'green' : 'red';
      const text = enable ? '是' : '否';
      return h(Tag, { color: color }, () => text);
    },
  },

  {
    title: '创建时间',
    dataIndex: 'createdTime',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'searchKey',
    label: '用户名',
    component: 'Input',
    colProps: { span: 12 },
  },
];

export const accountFormSchema: FormSchema[] = [
  {
    field: 'userName',
    label: '用户名',
    component: 'Input',
    required: true,
  },
  {
    field: 'password',
    label: '密码',
    component: 'InputPassword',
  },
  {
    field: 'password2',
    label: '重复密码',
    component: 'InputPassword',
  },
  {
    label: '角色',
    field: 'roleIds',
    component: 'ApiSelect',
    componentProps: {
      api: getAllRoleListApi,
      resultField: 'items',
      labelField: 'name',
      valueField: 'id',
      mode: 'multiple',
    },
  },
  {
    field: 'deptPath',
    label: '所属部门',
    component: 'TreeSelect',
    componentProps: {
      replaceFields: {
        title: 'name',
        key: 'id',
        value: 'id',
      },
      getPopupContainer: () => document.body,
    },
  },
  {
    field: 'realName',
    label: '真实姓名',
    component: 'Input',
  },
  {
    field: 'homePath',
    label: '首页路径',
    component: 'Input',
  },

  {
    label: '手机',
    field: 'phone',
    component: 'Input',
  },
  {
    field: 'state',
    label: '状态',
    component: 'RadioButtonGroup',
    defaultValue: true,
    componentProps: {
      options: [
        { label: '启用', value: true },
        { label: '停用', value: false },
      ],
    },
    required: true,
  },
  {
    field: 'isAdmin',
    label: '管理员',
    component: 'RadioButtonGroup',
    defaultValue: false,
    componentProps: {
      options: [
        { label: '否', value: false },
        { label: '是', value: true },
      ],
    },
    required: true,
  },
];

export const detailSchema: DescItem[] = [
  {
    field: 'id',
    label: '用户Id',
  },
  {
    field: 'userName',
    label: '用户名',
  },
  {
    field: 'realName',
    label: '真实姓名',
  },
  {
    field: 'phone',
    label: '手机号',
  },

  {
    field: 'homePath',
    label: '首页路径',
  },
  {
    field: 'deptName',
    label: '所属部门',
  },

  {
    field: 'isAdmin',
    label: '是否管理员',
    render: (curValue) => {
      const text = curValue ? '是' : '否';
      const color = curValue ? 'green' : 'red';
      return h(Tag, { color: color }, () => text);
    },
  },
  {
    field: 'state',
    label: '账号状态',
    render: (curValue) => {
      const text = curValue ? '启用' : '禁用';
      const color = curValue ? 'green' : 'red';
      return h(Tag, { color: color }, () => text);
    },
  },
  {
    field: 'rolesName',
    label: '拥有角色',
    render: (curValue) => {
      const els: VNode[] = [];
      curValue.forEach((element) => {
        els.push(h(Tag, { color: 'green' }, () => element));
      });
      return h('div', els);
    },
  },
];
