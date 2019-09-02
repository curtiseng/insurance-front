<template>
  <div>
    <a-card :bordered="false">
      <a-row>
        <a-button type="primary" icon="plus" @click="$refs.createModal.add()">新建</a-button>
        <a-button style="margin-left: 8px" type="primary" @click="$refs.createModal.add()">导入员工</a-button>
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
          :alert="options.alert"
          :rowSelection="options.rowSelection"
          bordered
        >
          <template slot="name" slot-scope="text">
            <a href="javascript:;">{{ text }}</a>
          </template>
          <template slot="operation" slot-scope="text, record">
            <a-popconfirm
              title="确定删除吗?"
              @confirm="() => onDelete(record.key)">
              <a href="javascript:;">删除</a>
            </a-popconfirm>
            <a-divider type="vertical"/>
            <a href="javascript:;">更新</a>
            <a-divider type="vertical"/>
            <a href="javascript:;">离职</a>
          </template>
        </s-table>
      </a-row>
      <create-staff ref="createModal" @ok="handleOk"/>
    </a-card>
  </div>
</template>
<script>
import { getStaff } from '@/api/staff'
import CreateStaff from './CreateStaff'
import { STable } from '@/components'
const columns = [{
  title: '姓名',
  dataIndex: 'name'
}, {
  title: '身份证号',
  dataIndex: 'idCard'
}, {
  title: '性别',
  dataIndex: 'sex'
}, {
  title: '岗位',
  dataIndex: 'jobs'
}, {
  title: '保险类型',
  dataIndex: 'insuranceType'
}, {
  title: '开始投保日期',
  dataIndex: 'startTime'
}, {
  title: '人员类型',
  dataIndex: 'staffType'
}, {
  title: '操作',
  dataIndex: 'operation',
  scopedSlots: { customRender: 'operation' }
}]
export default {
  components: {
    CreateStaff,
    STable
  },
  data () {
    return {
      columns,
      queryParam: {
      },
      loadData: parameter => {
        console.log('loadData.parameter', parameter)
        return getStaff(Object.assign(parameter, this.queryParam))
          .then(res => {
            return res
          })
      },
      selectedRowKeys: [],
      selectedRows: [],
      options: {
        alert: { show: true, clear: () => { this.selectedRowKeys = [] } },
        rowSelection: {
          selectedRowKeys: this.selectedRowKeys,
          onChange: this.onSelectChange
        }
      },
      optionAlertShow: true
    }
  },
  methods: {
    handleOk () {
      this.$refs.table.refresh()
    },
    tableOption () {
      if (!this.optionAlertShow) {
        this.options = {
          alert: { show: true, clear: () => { this.selectedRowKeys = [] } },
          rowSelection: {
            selectedRowKeys: this.selectedRowKeys,
            onChange: this.onSelectChange,
            getCheckboxProps: record => ({
              props: {
                disabled: record.no === 'No 2', // Column configuration not to be checked
                name: record.no
              }
            })
          }
        }
        this.optionAlertShow = true
      } else {
        this.options = {
          alert: false,
          rowSelection: null
        }
        this.optionAlertShow = false
      }
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    }
  }
}
</script>
<style>
.editable-add-btn {
  margin-bottom: 8px;
}
</style>
