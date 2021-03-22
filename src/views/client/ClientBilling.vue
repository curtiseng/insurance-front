<template>
  <a-modal
    title="客户账单"
    :width="1000"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-row>
      <a-date-picker @change="onStartChange" placeholder="开始日期"/>
      <a-date-picker style="margin-left: 16px" @change="onEndChange" placeholder="结束日期"/>
      <a-button style="margin-left: 16px" type="primary" icon="plus" @click="search()">查询</a-button>
      <a-button style="margin-left: 16px" type="primary" icon="plus" @click="downloadBilling()">导出</a-button>
    </a-row>
    <br/>
    <a-row>
      <s-table
        ref="table"
        size="default"
        rowKey="key"
        :columns="columns"
        :data="loadData"
        showPagination="auto"
        bordered
      >
      </s-table>
    </a-row>
  </a-modal>
</template>

<script>
import { getClientBillings } from '@/api/client'
import { STable } from '@/components'
const columns = [{
  title: '账单描述',
  dataIndex: 'description'
}, {
  title: '交易金额',
  dataIndex: 'balance'
}, {
  title: '保险单号',
  dataIndex: 'insuranceNumber'
}, {
  title: '姓名',
  dataIndex: 'name'
}, {
  title: '身份号码',
  dataIndex: 'idCard'
}, {
  title: '交易流水号',
  dataIndex: 'paymentId'
}]
export default {
  components: {
    STable
  },
  data () {
    return {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 13 }
      },
      visible: false,
      confirmLoading: false,
      client: {},
      columns,
      queryParam: {
        sort: 'createTime,desc'
      },
      defaultSelectedKeys: [],
      loadData: parameter => {
        return getClientBillings(Object.assign(parameter, this.queryParam))
          .then(res => {
            return res
          })
      }
    }
  },
  methods: {
    add (value) {
      this.visible = true
      this.client.id = value
      this.queryParam.clientId = value
    },
    onStartChange (date, dateString) {
      this.queryParam.beginDate = date.format('YYYY-MM-DD')
    },
    onEndChange (date, dateString) {
      this.queryParam.endDate = date.format('YYYY-MM-DD')
    },
    search () {
      this.$refs.table.refresh()
    },
    handleSubmit () {
      this.visible = false
    },
    handleCancel () {
      this.visible = false
    },
    downloadBilling () {
      const path = window.location.host
      var url = 'http://' + path + '/api/client/billings/download?clientId=' + this.queryParam.clientId
      if (typeof (this.queryParam.beginDate) !== 'undefined') {
        url += '&beginDate=' + this.queryParam.beginDate
      }
      if (typeof (this.queryParam.endDate) !== 'undefined') {
        url += '&endDate=' + this.queryParam.endDate
      }
      window.open(url)
    }
  }
}
</script>
