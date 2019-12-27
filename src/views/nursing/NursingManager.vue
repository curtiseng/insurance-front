<template>
  <div>
    <a-card :bordered="false">
      <a-row>
        <a-input-search
          style="width: 200px"
          placeholder="请输入姓名搜索"
          @search="onSearch"
          enterButton
        />
        <a-button style="margin-left: 16px" type="primary" icon="plus" @click="$refs.createModal.add()">新增老人信息</a-button>
        <a-button style="margin-left: 16px" type="primary" icon="delete" @click="batchDelete()">批量删除老人</a-button>
        <a-button style="margin-left: 16px" type="primary" icon="download" @click="downloadNursing()">导出老人</a-button>
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
              @confirm="() => onDelete(record.id)">
              <a href="javascript:;">退床</a>
            </a-popconfirm>
          </template>
        </s-table>
      </a-row>
      <create-nursing ref="createModal" @ok="handleOk"/>
    </a-card>
  </div>
</template>
<script>
import { getStaff, deleteStaff, batchDelete } from '@/api/staff'
import CreateNursing from './CreateNursing'
import { STable } from '@/components'
import moment from 'moment'
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
  title: '保险生效日期',
  dataIndex: 'startTime',
  customRender: val => moment(val).format('YYYY-MM-DD')
}, {
  title: '保险方案',
  dataIndex: 'insuranceScheme'
}, {
  title: '保费金额',
  dataIndex: 'insuranceBalance'
},
{
  title: '录入时间',
  dataIndex: 'createTime',
  customRender: val => moment(val).format('YYYY-MM-DD HH:mm:ss')
}, {
  title: '操作',
  dataIndex: 'operation',
  scopedSlots: { customRender: 'operation' }
}]
export default {
  components: {
    CreateNursing,
    STable
  },
  data () {
    return {
      columns,
      queryParam: {
        staffType: 'NURSING',
        name: ''
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
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    onDelete (rowKey) {
      console.log(rowKey)
      deleteStaff(rowKey).then(res => {
        this.$refs.table.refresh()
      })
    },
    batchDelete () {
      batchDelete(this.selectedRowKeys).then(res => {
        this.$notification.success({
          message: '删除成功',
          description: `成功删除${this.selectedRowKeys.length}条数据`
        })
        this.selectedRowKeys = []
        this.selectedRows = []
        this.$refs.table.clearSelected()
        this.$refs.table.refresh()
      })
    },
    onSearch (value) {
      this.queryParam.name = value
      this.$refs.table.refresh()
    },
    downloadNursing () {
      const path = window.location.host
      window.open('http://' + path + '/api/staff/download/export?type=NURSING')
    }
  }
}
</script>
<style>
.editable-add-btn {
  margin-bottom: 8px;
}
</style>
