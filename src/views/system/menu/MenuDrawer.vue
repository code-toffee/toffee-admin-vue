<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="50%"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema } from './menu.data';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';

  import { addMenuApi, getAdminMenuTableListApi, updateMenuApi } from '/@/api/admin/menu';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { MenuStructParam } from '/@/api/admin/model/menuModel';

  export default defineComponent({
    name: 'MenuDrawer',
    components: { BasicDrawer, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const { t } = useI18n();
      const isUpdate = ref(true);
      const id = ref('');
      const [registerForm, { resetFields, setFieldsValue, updateSchema, validate }] = useForm({
        labelWidth: 100,
        schemas: formSchema,
        showActionButtonGroup: false,
        baseColProps: { lg: 12, md: 24 },
      });

      const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        resetFields();
        setDrawerProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;
        id.value = data?.record?.id;

        if (unref(isUpdate)) {
          setFieldsValue({
            ...data.record,
            title: t(data.record.title),
          });
        }
        const treeData = (await getAdminMenuTableListApi()).items;

        function recursionTranslation(treeObject: MenuStructParam[]) {
          treeObject.forEach((element) => {
            element.title = t(element.title);
            if (element.children !== undefined && element.children.length > 0) {
              recursionTranslation(element.children);
            }
          });
        }

        recursionTranslation(treeData);

        updateSchema({
          field: 'pid',
          componentProps: { treeData },
        });
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增菜单' : '编辑菜单'));

      async function handleSubmit() {
        try {
          const values = await validate();
          setDrawerProps({ confirmLoading: true });
          // TODO custom api
          console.log(values);

          if (isUpdate.value) {
            await updateMenuApi({ id: id.value, ...values });
          } else {
            await addMenuApi(values);
          }

          closeDrawer();
          emit('success');
        } finally {
          setDrawerProps({ confirmLoading: false });
        }
      }

      function dev(...d) {
        console.log(d);
      }

      return { dev, registerDrawer, registerForm, getTitle, handleSubmit };
    },
  });
</script>
