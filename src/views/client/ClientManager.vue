<template>
  <div>
    <a-card :bordered="false">
      <a-row>
        <a-button type="primary" icon="plus" @click="addClient(values)">新建</a-button>
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
            <a-divider type="vertical"/>
            <a @click="onUpdate(record.id)" href="javascript:;">更新</a>
            <a-divider type="vertical"/>
            <a-dropdown>
              <a-menu slot="overlay" @click="menuClick">
                <a-menu-item :key="1"><a>导入员工</a></a-menu-item>
                <a-menu-item :key="2"><a>修改密码</a></a-menu-item>
                <a-menu-item :key="3"><a>增加余额</a></a-menu-item>
              </a-menu>
              <a>更多<a-icon type="down"/></a>
            </a-dropdown>
          </template>
        </s-table>
      </a-row>
    </a-card>
  </div>
</template>
<script>
import { getClients, deleteClient } from '@/api/client'
import { STable } from '@/components'
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
    onUpdate (rowKey) {
      console.log('----------' + rowKey)
    },
    menuClick (values) {
      console.log('----------' + values.item)
      console.log('----------' + values.key)
      console.log('----------' + values.keyPath)
      console.log('----------' + values.domEvent)
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
