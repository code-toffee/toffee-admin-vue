<template>
  <PageWrapper title="修改当前用户密码" content="修改成功后会自动退出当前登录！">
    <div class="py-8 bg-white flex flex-col justify-center items-center">
      <BasicForm @register="register" />
      <div class="flex justify-center">
        <a-button @click="resetFields"> 重置 </a-button>
        <a-button class="!ml-4" type="primary" :loading="loading" @click="handleSubmit">
          确认
        </a-button>
      </div>
    </div>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { BasicForm, useForm } from '/@/components/Form';

  import { formSchema } from './pwd.data';
  import { chargeUserPwdApi } from '/@/api/admin/users';
  import { useUserStore } from '/@/store/modules/user';
  export default defineComponent({
    name: 'ChangePassword',
    components: { BasicForm, PageWrapper },
    setup() {
      const loading = ref(false);
      const [register, { validate, resetFields }] = useForm({
        size: 'large',
        labelWidth: 100,
        showActionButtonGroup: false,
        schemas: formSchema,
      });

      async function handleSubmit() {
        try {
          loading.value = true;
          const values = await validate();
          const { oldPwd, newPwd } = values;
          console.log(oldPwd, newPwd);
          await chargeUserPwdApi({ oldPwd, newPwd });
          const userStore = useUserStore();
          userStore.logout(true);
        } catch (error) {
        } finally {
          loading.value = false;
        }
      }

      return { register, resetFields, handleSubmit, loading };
    },
  });
</script>
