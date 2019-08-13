<template>
  <div>
    <a-card :bordered="false">
      <a-row>
        <a-button type="primary" icon="plus" @click="$refs.createModal.add()">新建</a-button>
      </a-row>
      <br/>
      <a-row>
        <a-table :columns="columns" :dataSource="data" bordered :pagination="pagination">
          <template slot="name" slot-scope="text">
            <a href="javascript:;">{{ text }}</a>
          </template>
          <template slot="operation" slot-scope="text, record">
            <a-popconfirm
              v-if="data.length"
              title="确定删除吗?"
              @confirm="() => onDelete(record.key)">
              <a href="javascript:;">删除</a>
            </a-popconfirm>
            <a-divider type="vertical"/>
            <a href="javascript:;">更新</a>
          </template>
        </a-table>
      </a-row>
      <create-admin ref="createModal" />
    </a-card>
  </div>
</template>
<script>
import { getAdmins } from '@/api/admin'
import CreateAdmin from './CreateAdmin'
const columns = [{
  title: '登录名',
  dataIndex: 'login'
  // scopedSlots: { customRender: 'name' }
}, {
  title: '昵称',
  // className: 'column-money',
  dataIndex: 'username'
}, {
  title: '邮箱',
  dataIndex: 'email'
}, {
  title: '操作',
  dataIndex: 'operation',
  scopedSlots: { customRender: 'operation' }
}]
const data = []
export default {
  components: {
    CreateAdmin
  },
  data () {
    return {
      data,
      columns,
      pagination: {
        pageSize: 20, // 默认每页显示数量
        showSizeChanger: true, // 显示可改变每页数量
        pageSizeOptions: ['10', '20', '30', '40'], // 每页数量选项
        showTotal: total => `共有${total} 项` // 显示总数
        // showSizeChange: (current, pageSize) => this.pageSize = pageSize // 改变每页数量时更新显示
      },
      queryParam: {
        pageSize: 10,
        pageNo: 1
      }
    }
  },
  created () {
    this.queryAdmins()
  },
  methods: {
    queryAdmins () {
      getAdmins(this.queryParam).then(res => {
        this.data = res
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
