<template>
  <template v-if="getShow">
    <LoginFormTitle class="enter-x" />

    <div class="p-4 enter-x" v-show="getShow">
      <h3 style="color: red">请联系管理员重置您的密码！</h3>
      <Button size="large" block class="mt-4" @click="handleBackLogin">
        {{ t('sys.login.backSignIn') }}
      </Button>
    </div>
  </template>
</template>
<script lang="ts" setup>
  import { computed, unref } from 'vue';
  import LoginFormTitle from './LoginFormTitle.vue';
  import { Button } from 'ant-design-vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useLoginState, LoginStateEnum } from './useLogin';

  const { t } = useI18n();
  const { handleBackLogin, getLoginState } = useLoginState();
  const getShow = computed(() => unref(getLoginState) === LoginStateEnum.RESET_PASSWORD);
</script>
