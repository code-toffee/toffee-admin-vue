<template>
  <PageWrapper :title="`用户` + userName + `的资料`">
    <template #footer>
      <ATabs default-active-key="detail" v-model:activeKey="currentKey">
        <a-tab-pane key="detail" tab="用户资料" />
        <a-tab-pane key="logs" tab="操作日志" />
      </ATabs>
    </template>

    <template v-if="currentKey == 'detail'">
      <Description @register="register" class="mt-4" />
      <div class="lg:flex mt-4">
        <div class="w-full enter-y mr-4">
          <Card title="拥有权限">
            <AEmpty
              description="暂无任何权限"
              v-if="!detail?.permCode || detail?.permCode.length === 0"
            />
            <p v-for="item in detail?.permCode" :key="item"> {{ item }} </p>
          </Card>
        </div>

        <div class="w-full enter-y bg-white p-4">
          <BasicTree title="拥有菜单" :treeData="tree">
            <template #title="{ title, icon }">
              <Icon :icon="icon" /> <span class="pl-2">{{ t(title) }}</span>
            </template>
          </BasicTree>
        </div>
      </div>
    </template>
    <template v-if="currentKey == 'logs'">
      <BasicTable @register="registerTable">
        <template #expandedRowRender="{ record }">
          <div class="lg:flex bg-gray-100 p-4">
            <div class="w-full enter-y mr-4">
              <p>浏览器UA：</p>
              <div class="overflow-y-auto max-h-40">
                <code>
                  {{ record.brower }}
                </code>
              </div>
            </div>
            <div class="w-full enter-y">
              <p>IP地址：</p>
              <div class="overflow-y-auto max-h-40">
                <code>
                  {{ record.ipAddr }}
                </code>
              </div>
            </div>
          </div>
          <div class="lg:flex bg-gray-100 p-4">
            <div class="w-full enter-y mr-4">
              <p>请求数据：</p>
              <div class="overflow-y-auto max-h-40">
                <code>
                  {{ record.request }}
                </code>
              </div>
            </div>
            <div class="w-full enter-y">
              <p>响应数据：</p>
              <div class="overflow-y-auto max-h-40">
                <code>
                  {{ record.response }}
                </code>
              </div>
            </div>
          </div>
        </template>
      </BasicTable>
    </template>
  </PageWrapper>
</template>

<script lang="ts">
  export default defineComponent({
    name: 'AccountDetail',
  });
</script>

<script setup lang="ts">
  import { defineComponent, onMounted, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import { PageWrapper } from '/@/components/Page';
  import { useTabs } from '/@/hooks/web/useTabs';
  import { Tabs as ATabs } from 'ant-design-vue';
  import { getUserActionLogApi, userDetailApi } from '/@/api/admin/users';

  import { UserListItem } from '/@/api/admin/model/usersModel';

  import { BasicTree, TreeItem } from '/@/components/Tree/index';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { Icon } from '/@/components/Icon';
  import { Card, Empty as AEmpty } from 'ant-design-vue';
  import { Description, useDescription } from '/@/components/Description/index';
  import { BasicTable, useTable } from '/@/components/Table';
  import { detailSchema } from './account.data';
  import { columns } from './logs.data';

  const { t } = useI18n();
  const route = useRoute();
  const userId = ref(route.params?.id);
  const currentKey = ref('detail');
  const { setTitle } = useTabs();
  const loading = ref(true);
  const userName = ref('');

  let detail = ref<Nullable<UserListItem>>(null);
  let tree = ref<TreeItem[]>();

  const [registerTable] = useTable({
    api: getUserActionLogApi,
    columns,
    useSearchForm: false,
    showTableSetting: true,
    bordered: true,
    showIndexColumn: false,
  });

  const [register] = useDescription({
    title: '用户详情',
    data: detail,
    schema: detailSchema,
    column: 3,
  });

  onMounted(async () => {
    detail.value = await userDetailApi({ id: ~~userId.value });
    tree.value = detail.value.menuList as TreeItem[];
    loading.value = false;
    setTitle('详情：用户' + detail.value.userName);
    userName.value = detail.value.userName;
  });
</script>

<style></style>
