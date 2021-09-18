<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增部门 </a-button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'clarity:note-edit-line',
              onClick: handleEdit.bind(null, record),
            },
            {
              icon: 'ant-design:delete-outlined',
              color: 'error',
              loading: deleteLoading[record.id],
              popConfirm: {
                title: '确定删除吗,如果存在下级节点则一并删除，此操作不能撤销！',
                confirm: handleDelete.bind(null, record),
              },
            },
          ]"
        />
      </template>
    </BasicTable>
    <DeptModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent, reactive } from 'vue';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';

  import { useModal } from '/@/components/Modal';
  import DeptModal from './DeptModal.vue';

  import { columns } from './dept.data';
  import { deleteDeptApi, getDeptListApi } from '/@/api/admin/dept';
  import { DeptListItem } from '/@/api/admin/model/deptModel';

  export default defineComponent({
    name: 'DeptManagement',
    components: { BasicTable, DeptModal, TableAction },
    setup() {
      const deleteLoading = reactive([]) as boolean[];
      const [registerModal, { openModal }] = useModal();
      const [registerTable, { reload }] = useTable({
        title: '部门列表',
        api: getDeptListApi,
        columns,
        pagination: false,
        striped: false,
        useSearchForm: false,
        showTableSetting: true,
        bordered: false,
        showIndexColumn: false,
        canResize: false,
        actionColumn: {
          width: 80,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
          fixed: undefined,
        },
      });

      function handleCreate() {
        openModal(true, {
          isUpdate: false,
        });
      }

      function handleEdit(record: Recordable) {
        openModal(true, {
          record,
          isUpdate: true,
          id: record.id,
        });
      }

      async function handleDelete(record: Recordable) {
        let data = [record] as DeptListItem[];
        let ids: string[] = [];
        const recursion = (list: DeptListItem[]) => {
          list.forEach((element) => {
            ids.push(element.id);
            if (element.children) {
              recursion(element.children);
            }
          });
        };
        recursion(data);

        deleteLoading[record.id] = true;
        try {
          await deleteDeptApi({ ids });
        } finally {
          deleteLoading[record.id] = false;
        }

        reload();
      }

      function handleSuccess() {
        reload();
      }

      return {
        registerTable,
        registerModal,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
        deleteLoading,
      };
    },
  });
</script>
