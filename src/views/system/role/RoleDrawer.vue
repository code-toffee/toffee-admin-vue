<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="500px"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm">
      <template #menu="{ model, field }">
        <BasicTree
          v-model:value="model[field]"
          :treeData="treeData"
          :replaceFields="{ key: 'id' }"
          checkable
          checkStrictly
          title="菜单分配"
        >
          <template #title="{ title }">
            {{ t(title) }}
          </template>
        </BasicTree>
      </template>
    </BasicForm>
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema } from './role.data';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { BasicTree, TreeItem } from '/@/components/Tree';

  import { getDeptListApi } from '/@/api/admin/dept';
  import { addRoleApi, updateRoleApi } from '/@/api/admin/role';
  import { getAdminMenuTableListApi } from '/@/api/admin/menu';
  import { useI18n } from '/@/hooks/web/useI18n';

  export default defineComponent({
    name: 'RoleDrawer',
    components: { BasicDrawer, BasicForm, BasicTree },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const { t } = useI18n();

      const id = ref(0);

      const isUpdate = ref(true);
      const treeData = ref<TreeItem[]>([]);

      const [registerForm, { resetFields, setFieldsValue, updateSchema, validate }] = useForm({
        labelWidth: 90,
        schemas: formSchema,
        showActionButtonGroup: false,
      });

      const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        resetFields();
        setDrawerProps({ confirmLoading: false });
        // 需要在setFieldsValue之前先填充treeData，否则Tree组件可能会报key not exist警告
        treeData.value = (await getAdminMenuTableListApi()).items as any as TreeItem[];
        isUpdate.value = !!data?.isUpdate;
        id.value = data?.record?.id;

        if (unref(isUpdate)) {
          setFieldsValue({
            ...data.record,
            dept: data.record.deptIds,
            menu: data.record.menuIds,
          });
        }
        const deptData = (await getDeptListApi()).items;
        updateSchema({
          field: 'dept',
          componentProps: { treeData: deptData },
        });
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增角色' : '编辑角色'));

      async function handleSubmit() {
        try {
          const values = await validate();
          setDrawerProps({ confirmLoading: true });
          // TODO custom api
          console.log(values, id.value);

          if (unref(isUpdate)) {
            //update
            await updateRoleApi({ id: id.value, ...values, menu: values.menu.checked });
          } else {
            //add
            await addRoleApi({ ...values, menu: values.menu.checked });
          }

          closeDrawer();
          emit('success');
        } finally {
          setDrawerProps({ confirmLoading: false });
        }
      }

      return {
        registerDrawer,
        registerForm,
        getTitle,
        handleSubmit,
        treeData,
        t,
      };
    },
  });
</script>
