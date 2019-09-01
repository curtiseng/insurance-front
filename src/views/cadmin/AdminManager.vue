<template>
  <div>
    <a-card :bordered="false">
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
    </a-card>
  </div>
</template>
<script>
import { getCompanyAdmins, deleteCompanyAdmin } from '@/api/cadmin'
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
    STable
  },
  data () {
    return {
      columns,
      queryParam: {
      },
      loadData: parameter => {
        console.log('loadData.parameter', parameter)
        return getCompanyAdmins(Object.assign(parameter, this.queryParam))
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
      deleteCompanyAdmin(rowKey).then(res => {
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
