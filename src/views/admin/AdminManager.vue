<template>
  <div>
    <a-card :bordered="false">
      <a-row>
        <a-button type="primary" icon="plus" @click="$refs.createModal.add()">新建</a-button>
      </a-row>
      <br/>
      <a-row>
        <s-table
          ref="table"
          size="default"
          rowKey="id"
          :columns="columns"
          :data="loadData"
          showPagination="auto"
          bordered
        >
          <template slot="operation" slot-scope="text, record">
            <a-popconfirm
              title="确定删除吗?"
              @confirm="() => onDelete(record.id)">
              <a href="javascript:;">删除</a>
            </a-popconfirm>
          </template>
        </s-table>
      </a-row>
      <create-admin ref="createModal" @ok="handleOk"/>
    </a-card>
  </div>
</template>
<script>
import { getBackendAdmins, deleteBackendAdmin } from '@/api/admin'
import CreateAdmin from './CreateAdmin'
import { STable } from '@/components'
const columns = [{
  title: '登录名',
  dataIndex: 'login'
}, {
  title: '昵称',
  dataIndex: 'username'
}, {
  title: '邮箱',
  dataIndex: 'email'
}, {
  title: '操作',
  dataIndex: 'operation',
  scopedSlots: { customRender: 'operation' }
}]
export default {
  components: {
    CreateAdmin,
    STable
  },
  data () {
    return {
      columns,
      queryParam: {
      },
      loadData: parameter => {
        console.log('loadData.parameter', parameter)
        return getBackendAdmins(Object.assign(parameter, this.queryParam))
          .then(res => {
            return res
          })
      }
    }
  },
  methods: {
    handleOk () {
      this.$refs.table.refresh()
    },
    onDelete (rowKey) {
      console.log(rowKey)
      deleteBackendAdmin(rowKey).then(res => {
        this.$refs.table.refresh()
      })
    }
  }
}
</script>
<style>
.editable-add-btn {
  margin-bottom: 8px;
}
</style>
