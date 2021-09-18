import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';
import { Icon } from '/@/components/Icon';
import { useI18n } from '/@/hooks/web/useI18n';
import { isUrl } from '/@/utils/is';

const { t } = useI18n();

export const columns: BasicColumn[] = [
  {
    title: '菜单名称',
    dataIndex: 'title',
    align: 'left',
    customRender: ({ record }) => {
      return h('span', t(record.title));
    },
  },
  {
    title: '路径',
    dataIndex: 'path',
  },
  {
    title: '组件',
    dataIndex: 'component',
  },
  {
    title: '权限标识',
    dataIndex: 'permission',
    width: 180,
  },
  {
    title: '图标',
    dataIndex: 'icon',
    width: 50,
    customRender: ({ record }) => {
      return h(Icon, { icon: record.icon });
    },
  },
  {
    title: '排序',
    dataIndex: 'orderNo',
    width: 50,
  },

  {
    title: '状态',
    dataIndex: 'status',
    width: 80,
    customRender: ({ record }) => {
      const status = record.status;
      const enable = ~~status === 1;
      const color = enable ? 'green' : 'red';
      const text = enable ? '启用' : '停用';
      return h(Tag, { color: color }, () => text);
    },
  },
  {
    title: '外链',
    dataIndex: 'link',
    width: 80,
    customRender: ({ record }) => {
      const link = isUrl(record.path);
      const frame = record.frameSrc ? true : false;
      let color = 'red';
      let text = '否';
      if (link) {
        color = 'green';
        text = '是';
      } else if (frame) {
        color = 'green';
        text = '内嵌';
      }

      return h(Tag, { color: color }, () => text);
    },
  },

  {
    title: '缓存',
    dataIndex: 'cache',
    width: 80,
    customRender: ({ record }) => {
      const status = record.cache;
      const enable = ~~status === 1;
      const color = enable ? 'green' : 'red';
      const text = enable ? '是' : '否';
      return h(Tag, { color: color }, () => text);
    },
  },

  {
    title: '可见',
    dataIndex: 'show',
    width: 80,
    customRender: ({ record }) => {
      const status = record.hiddenMenu;
      const enable = ~~status === 0;
      const color = enable ? 'green' : 'red';
      const text = enable ? '是' : '否';
      return h(Tag, { color: color }, () => text);
    },
  },

  {
    title: '创建时间',
    dataIndex: 'createdTime',
    width: 180,
  },
];

const isDir = (type: number) => type === 1;
const isMenu = (type: number) => type === 2;
const isButton = (type: number) => type === 3;

export const searchFormSchema: FormSchema[] = [
  {
    field: 'menuName',
    label: '菜单名称',
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
    field: 'type',
    label: '菜单类型',
    component: 'RadioButtonGroup',
    defaultValue: 1,
    componentProps: {
      options: [
        { label: '目录', value: 1 },
        { label: '菜单', value: 2 },
        { label: '按钮', value: 3 },
      ],
    },
    colProps: { lg: 24, md: 24 },
  },
  {
    field: 'title',
    label: '菜单名称',
    component: 'Input',
    required: true,
  },

  {
    field: 'pid',
    label: '上级菜单',
    component: 'TreeSelect',
    componentProps: {
      replaceFields: {
        title: 'title',
        key: 'id',
        value: 'id',
      },
      getPopupContainer: () => document.body,
    },
  },

  {
    field: 'orderNo',
    label: '排序',
    component: 'InputNumber',
    defaultValue: 1,
    required: true,
  },
  {
    field: 'icon',
    label: '图标',
    component: 'IconPicker',
    ifShow: ({ values }) => !isButton(values.type),
  },

  {
    field: 'path',
    label: '路由地址',
    component: 'Input',
    ifShow: ({ values }) => !isButton(values.type),
    dynamicRules: ({ values }) => {
      return isDir(values.type) && values.path !== undefined
        ? [
            {
              trigger: 'change',
              validator: async () => {
                return values.path.indexOf('/') !== 0
                  ? Promise.reject('目录类型菜单路径请以/开头')
                  : Promise.resolve();
              },
            },
          ]
        : [];
    },
  },
  {
    field: 'redirect',
    label: '重定向地址',
    component: 'Input',
    ifShow: ({ values }) => !isButton(values.type),
  },
  {
    field: 'component',
    label: '组件路径',
    component: 'Input',
    ifShow: ({ values }) => isMenu(values.type),
  },
  {
    field: 'name',
    label: '组件名称',
    component: 'Input',
    ifShow: ({ values }) => isMenu(values.type),
  },
  {
    field: 'permission',
    label: '权限标识',
    component: 'Input',
    ifShow: ({ values }) => !isDir(values.type),
  },
  {
    field: 'status',
    label: '状态',
    component: 'RadioButtonGroup',
    defaultValue: true,
    componentProps: {
      options: [
        { label: '启用', value: true },
        { label: '禁用', value: false },
      ],
    },
  },
  {
    field: 'iFrame',
    label: '是否内嵌外链',
    component: 'RadioButtonGroup',
    defaultValue: false,
    componentProps: {
      options: [
        { label: '否', value: false },
        { label: '是', value: true },
      ],
    },
    ifShow: ({ values }) => !isButton(values.type),
  },

  {
    field: 'framePath',
    label: '内嵌外链地址',
    component: 'Input',
    ifShow: ({ values }) => values.iFrame,
    dynamicRules: ({ values }) => {
      return values.iFrame ? [{ required: true }] : [];
    },
  },

  {
    field: 'keepalive',
    label: '是否缓存',
    component: 'RadioButtonGroup',
    defaultValue: '0',
    componentProps: {
      options: [
        { label: '否', value: '0' },
        { label: '是', value: '1' },
      ],
    },
    ifShow: ({ values }) => isMenu(values.type),
  },

  {
    field: 'hideMenu',
    label: '是否隐藏',
    component: 'RadioButtonGroup',
    defaultValue: false,
    componentProps: {
      options: [
        { label: '否', value: false },
        { label: '是', value: true },
      ],
    },
    ifShow: ({ values }) => !isButton(values.type),
  },
];
