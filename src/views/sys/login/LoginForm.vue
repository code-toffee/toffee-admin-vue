<template>
  <LoginFormTitle v-show="getShow" class="enter-x" />
  <Form
    class="p-4 enter-x"
    :model="formData"
    :rules="getFormRules"
    ref="formRef"
    v-show="getShow"
    @keypress.enter="handleLogin"
  >
    <FormItem name="account" class="enter-x">
      <Input
        size="large"
        v-model:value="formData.account"
        :placeholder="t('sys.login.userName')"
        class="fix-auto-fill"
      />
    </FormItem>
    <FormItem name="password" class="enter-x">
      <InputPassword
        size="large"
        visibilityToggle
        v-model:value="formData.password"
        :placeholder="t('sys.login.password')"
      />
    </FormItem>

    <ARow class="enter-x">
      <ACol :span="12">
        <FormItem name="imgCode">
          <Input
            size="large"
            v-model:value="formData.imgCode"
            :placeholder="t('sys.login.imgCode')"
          />
        </FormItem>
      </ACol>
      <ACol :span="12">
        <FormItem :style="{ 'text-align': 'right', cursor: 'pointer' }">
          <Image :src="imgCode" :preview="false" :width="150" :height="40" @click="updateImgCode" />
        </FormItem>
      </ACol>
    </ARow>

    <ARow class="enter-x">
      <ACol :span="12">
        <FormItem>
          <!-- No logic, you need to deal with it yourself -->
          <Checkbox v-model:checked="rememberMe" size="small">
            {{ t('sys.login.rememberMe') }}
          </Checkbox>
        </FormItem>
      </ACol>
      <ACol :span="12">
        <FormItem :style="{ 'text-align': 'right' }">
          <!-- No logic, you need to deal with it yourself -->
          <Button type="link" size="small" @click="setLoginState(LoginStateEnum.RESET_PASSWORD)">
            {{ t('sys.login.forgetPassword') }}
          </Button>
        </FormItem>
      </ACol>
    </ARow>

    <FormItem class="enter-x">
      <Button type="primary" size="large" block @click="handleLogin" :loading="loading">
        {{ t('sys.login.loginButton') }}
      </Button>
    </FormItem>
  </Form>
</template>
<script lang="ts" setup>
  import { reactive, ref, toRaw, unref, computed } from 'vue';

  import { Checkbox, Form, Input, Row, Col, Button, Image } from 'ant-design-vue';
  import LoginFormTitle from './LoginFormTitle.vue';

  import { useI18n } from '/@/hooks/web/useI18n';
  import { useMessage } from '/@/hooks/web/useMessage';

  import { useUserStore } from '/@/store/modules/user';
  import { LoginStateEnum, useLoginState, useFormRules, useFormValid } from './useLogin';
  import { getImgCodeApi } from '../../../api/verify/verify';
  //import { onKeyStroke } from '@vueuse/core';

  const ACol = Col;
  const ARow = Row;
  const FormItem = Form.Item;
  const InputPassword = Input.Password;
  const { t } = useI18n();
  const { notification } = useMessage();
  const userStore = useUserStore();

  const { setLoginState, getLoginState } = useLoginState();
  const { getFormRules } = useFormRules();

  const formRef = ref();
  const loading = ref(false);
  const rememberMe = ref(false);
  const imgCode = ref('');

  const formData = reactive({
    account: '',
    password: '',
    key: '',
    imgCode: '',
  });

  const { validForm } = useFormValid(formRef);

  //onKeyStroke('Enter', handleLogin);

  const getShow = computed(() => unref(getLoginState) === LoginStateEnum.LOGIN);

  async function updateImgCode() {
    imgCode.value =
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAAAoCAYAAAAcwQPnAAAA6ElEQVR4nO3bMYqFQBAA0f6LJmpqIOj9zyWCmUZqouC/xNYObNcLmw46KCabz77vb0i/7Kf0AfqfDEsIwxLCsIQwLCEMSwjDEsKwhDAsIQxLCMMSwrCEMCwhDEsIwxLCsIQwLCGq0geUtG1brOsa7/vGMAzR9/2f7GWQ9sW6rivmeY77vuN5nliWJY7jwPeySBvWeZ5FZlmkDatt2yKzLNKG1TRNTNMUdV1HVVUxjmN0XYfvZfHx+5cIaV8ssQxLCMMSwrCEMCwhDEsIwxLCsIQwLCEMSwjDEsKwhDAsIQxLCMMSwrCE+AJI6WrIIOk4NQAAAABJRU5ErkJggg==';
    const imgData = await getImgCodeApi();
    formData.key = imgData.key;
    imgCode.value = imgData.imgData;
  }

  updateImgCode();

  async function handleLogin() {
    const data = await validForm();
    if (!data) return;
    try {
      loading.value = true;
      const userInfo = await userStore.login(
        toRaw({
          username: data.account,
          password: data.password,
          key: formData.key,
          remeber: unref(rememberMe),
          code: data.imgCode,
        })
      );
      if (userInfo) {
        notification.success({
          message: t('sys.login.loginSuccessTitle'),
          description: `${t('sys.login.loginSuccessDesc')}: ${userInfo.userName}`,
          duration: 3,
        });
      }
    } finally {
      updateImgCode();
      loading.value = false;
    }
  }
</script>
