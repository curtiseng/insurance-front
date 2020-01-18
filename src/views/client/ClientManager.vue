<template>
  <div>
    <a-card :bordered="false">
      <a-row>
        <a-button type="primary" icon="plus" @click="addClient()">新建</a-button>
      </a-row>
      <br/>
      <a-row>
        <s-table
          ref="table"
          size="default"
          rowKey="id"
          :columns="columns"
          :data="loadData"
          :scroll="{ x: 2300 }"
          showPagination="auto"
          bordered
        >
          <template slot="operation" slot-scope="text, record">
            <a-popconfirm
              title="确定删除吗?"
              @confirm="() => onDelete(record.id)">
              <a href="javascript:;">删除</a>
            </a-popconfirm>
            <a-divider type="vertical"/>
            <a @click="$refs.updateClient.update(record)" href="javascript:;">更新</a>
            <a-divider type="vertical"/>
            <a @click="$refs.changePassword.add(record.id)" href="javascript:;">修改密码</a>
            <a-divider type="vertical"/>
            <a @click="$refs.addBalance.add(record.id)" href="javascript:;">增加余额</a>
            <a-divider type="vertical"/>
            <a @click="$refs.clientBilling.add(record.id)" href="javascript:;">账单</a>
          </template>
        </s-table>
      </a-row>
      <add-balance ref="addBalance" @ok="handleOk"/>
      <change-password ref="changePassword" @ok="handleOk"/>
      <update-client ref="updateClient" @ok="handleOk"/>
      <client-billing ref="clientBilling" @ok="handleOk"/>
    </a-card>
  </div>
</template>
<script>
import { getClients, deleteClient } from '@/api/client'
import { STable } from '@/components'
import AddBalance from './AddBalance'
import ChangePassword from './ChangePassword'
import UpdateClient from './UpdateClient'
import ClientBilling from './ClientBilling'
const columns = [{
  title: '被保险人',
  dataIndex: 'name',
  fixed: 'left',
  width: 120
}, {
  title: '联系电话',
  dataIndex: 'phoneNumber'
}, {
  title: '客户首选邮箱',
  dataIndex: 'firstClientEmail'
}, {
  title: '客户次选邮箱',
  dataIndex: 'secondClientEmail'
}, {
  title: '余额',
  dataIndex: 'balance'
}, {
  title: '保险公司名称',
  dataIndex: 'insuranceName'
}, {
  title: '保险公司首选邮箱',
  dataIndex: 'firstInsuranceEmail'
}, {
  title: '保险公司次选邮箱',
  dataIndex: 'secondInsuranceEmail'
}, {
  title: '保险公司次选邮箱',
  dataIndex: 'thirdInsuranceEmail'
}, {
  title: '经纪公司项目经理',
  dataIndex: 'leader'
}, {
  title: '项目经理邮箱',
  dataIndex: 'leaderEmail'
}, {
  title: '公共邮箱',
  dataIndex: 'commonEmail'
}, {
  title: '操作',
  dataIndex: 'operation',
  fixed: 'right',
  width: 200,
  scopedSlots: { customRender: 'operation' }
}]
export default {
  components: {
    STable,
    AddBalance,
    ChangePassword,
    UpdateClient,
    ClientBilling
  },
  data () {
    return {
      columns,
      queryParam: {
      },
      loadData: parameter => {
        console.log('loadData.parameter', parameter)
        return getClients(Object.assign(parameter, this.queryParam))
          .then(res => {
            return res
          })
      }
    }
  },
  methods: {
    onDelete (rowKey) {
      console.log(rowKey)
      deleteClient(rowKey).then(res => {
        this.$refs.table.refresh()
      })
    },
    addClient () {
      this.$router.push({
        path: `/clinet/create`
      })
    },
    handleOk () {
      this.$refs.table.refresh()
    }
  }
}
</script>
<style>
.editable-add-btn {
  margin-bottom: 8px;
}
</style>
