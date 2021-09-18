<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { accountFormSchema } from './account.data';
  import { getDeptListApi } from '/@/api/admin/dept';
  import { addUserApi, updateUserApi } from '/@/api/admin/users';

  export default defineComponent({
    name: 'AccountModal',
    components: { BasicModal, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const rowId = ref('');

      const [registerForm, { setFieldsValue, updateSchema, resetFields, validate }] = useForm({
        labelWidth: 100,
        schemas: accountFormSchema,
        showActionButtonGroup: false,
        actionColOptions: {
          span: 23,
        },
      });

      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        resetFields();
        setModalProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;

        if (unref(isUpdate)) {
          rowId.value = data.record.id;
          setFieldsValue({
            ...data.record,
          });
        }

        const treeData = await getDeptListApi();

        if (unref(isUpdate)) {
          //更新
          updateSchema([
            {
              field: 'userName',
              dynamicDisabled: true,
              required: false,
            },
            {
              field: 'password',
              label: '密码',
              component: 'InputPassword',
              helpMessage: '若不更新密码请留空',
              required: false,
            },
            {
              field: 'password2',
              label: '重复密码',
              component: 'InputPassword',
              show: ({ values }) => {
                return values.password;
              },
              dynamicRules: ({ values }) => {
                return values.password
                  ? [
                      {
                        required: true,
                        validator: async () => {
                          return values.password === values.password2
                            ? Promise.resolve()
                            : Promise.reject('密码不一致');
                        },
                      },
                    ]
                  : [];
              },
            },
          ]);
        } else {
          //新增
          updateSchema([
            {
              field: 'userName',
              dynamicDisabled: false,
              required: true,
            },
            {
              field: 'password',
              label: '密码',
              component: 'InputPassword',
              required: true,
              helpMessage: undefined,
            },
            {
              field: 'password2',
              label: '重复密码',
              component: 'InputPassword',
              show: true,
              dynamicRules: ({ values }) => {
                return [
                  { required: true, message: '请输入登陆密码' },
                  {
                    required: true,
                    validator: async () => {
                      return values.password === values.password2
                        ? Promise.resolve()
                        : Promise.reject('密码不一致');
                    },
                  },
                ];
              },
            },
          ]);
        }

        updateSchema([
          {
            field: 'deptPath',
            componentProps: { treeData: treeData.items },
          },
        ]);
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增账号' : '编辑账号'));

      async function handleSubmit() {
        try {
          const values = await validate();
          setModalProps({ confirmLoading: true });
          console.log(values);

          if (unref(isUpdate)) {
            await updateUserApi({ ...values, id: rowId.value });
          } else {
            await addUserApi(values);
          }

          closeModal();
          emit('success', { isUpdate: unref(isUpdate), values: { ...values, id: rowId.value } });
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }

      return { registerModal, registerForm, getTitle, handleSubmit };
    },
  });
</script>
