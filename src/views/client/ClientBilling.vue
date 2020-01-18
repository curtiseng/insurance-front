<template>
  <a-modal
    title="客户账单"
    :width="1000"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
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
    },
    handleSubmit () {
      this.confirmLoading = true
      addClientBalance(values).then(res => {
        this.visible = false
        this.confirmLoading = false
        this.$emit('ok', res)
        }).catch(error => {
        console.log(error)
        this.confirmLoading = false
        })
      }
    },
    handleCancel () {
      this.visible = false
    }
}
</script>
