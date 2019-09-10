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
          rowKey="key"
          :columns="columns"
          :data="loadData"
          showPagination="auto"
          bordered
        >
        </s-table>
      </a-row>
      <create-distribution ref="createModal" @ok="handleOk"/>
    </a-card>
  </div>
</template>
<script>
import { getDistributions } from '@/api/distribution'
import CreateDistribution from './CreateDistribution'
import { STable } from '@/components'
const columns = [{
  title: '货物名称',
  dataIndex: 'name'
}, {
  title: '运输方式',
  dataIndex: 'type'
}, {
  title: '运输工具编号/车牌号',
  dataIndex: 'busNumber'
},
{
  title: '货物标签或箱号',
  dataIndex: 'goodLabel'
},
{
  title: '启运日期',
  dataIndex: 'beginTime'
},
{
  title: '始发地',
  dataIndex: 'beginPlace'
},
{
  title: '收货地',
  dataIndex: 'endPlace'
},
{
  title: '货物价值(万元)',
  dataIndex: 'balance'
},
{
  title: '其他描述信息',
  dataIndex: 'description'
},
{
  title: '保险类型',
  dataIndex: 'insuranceType'
}]
export default {
  components: {
    CreateDistribution,
    STable
  },
  data () {
    return {
      columns,
      queryParam: {
      },
      loadData: parameter => {
        console.log('loadData.parameter', parameter)
        return getDistributions(Object.assign(parameter, this.queryParam))
          .then(res => {
            return res
          })
      }
    }
  },
  methods: {
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
