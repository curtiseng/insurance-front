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
      <create-client ref="createModal" />
    </a-card>
  </div>
</template>
<script>
import { getClients, addClient } from '@/api/client'
import CreateClient from './CreateClient'
const columns = [{
  title: '公司名称',
  dataIndex: 'name'
}, {
  title: '联系电话',
  dataIndex: 'phoneNumber'
}, {
  title: '客户首选邮箱',
  dataIndex: 'firstClientEmail'
}, {
  title: '客户次选邮箱',
  dataIndex: 'secondClientEmail'
},
{
  title: '首期保费',
  dataIndex: 'initialMoney'
}, {
  title: '余额',
  dataIndex: 'balance'
}, {
  title: '客户投保保险公司名称',
  dataIndex: 'insuranceName'
}, {
  title: '保险公司首选邮箱',
  dataIndex: 'firstInsuranceEmail'
}, {
  title: '保险公司次选邮箱',
  dataIndex: 'secondInsuranceEmail'
}, {
  title: '客户项目经理',
  dataIndex: 'leader'
}, {
  title: '项目经理邮箱',
  dataIndex: 'leaderEmail'
}, {
  title: '操作',
  dataIndex: 'operation',
  scopedSlots: { customRender: 'operation' }
}]
const data = []
export default {
  components: {
    CreateClient
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
    this.queryClients()
  },
  methods: {
    queryClients () {
      getClients(this.queryParam).then(res => {
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
