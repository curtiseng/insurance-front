<template>
  <div>
    <a-card :bordered="true">
      <a-col :span="4">
        <a-directory-tree
          :treeData="treeData"
          :defaultSelectedKeys="defaultSelectedKeys"
          defaultExpandAll
          @select="onSelect"
        >
        </a-directory-tree>
      </a-col>
      <a-col :span="20">
        <a-tabs defaultActiveKey="1" @change="callback">
          <a-tab-pane tab="员工保险" key="1">
            <a-row>
              <a-button type="primary" icon="plus" @click="clickAddStaff">新建人员保险</a-button>
            </a-row>
            <br/>
            <a-row>
              <s-table
                ref="table"
                size="default"
                rowKey="id"
                :columns="staffColumns"
                :data="loadStaffData"
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
                  <a @click="$refs.insuranceScheme.add(record.id)" href="javascript:;">保险方案</a>
                </template>
              </s-table>
            </a-row>
          </a-tab-pane>
          <a-tab-pane tab="养老保险" key="2">
            <a-row>
              <a-button type="primary" icon="plus" @click="clickAddNursing">新建养老保险</a-button>
            </a-row>
            <br/>
            <a-row>
              <s-table
                ref="table"
                size="default"
                rowKey="id"
                :columns="nursingColumns"
                :data="loadNursingData"
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
                  <a @click="$refs.insuranceScheme.add(record.id)" href="javascript:;">保险方案</a>
                </template>
              </s-table>
            </a-row>
          </a-tab-pane>
          <a-tab-pane tab="物流保险" key="3">
            <a-row>
              <a-button style="margin-left: 8px" type="primary" icon="plus" @click="clickAddDistri">新建物流保险</a-button>
            </a-row>
            <br/>
            <a-row>
              <s-table
                ref="table"
                size="default"
                rowKey="id"
                :columns="distributionColumns"
                :data="loadDistributionData"
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
          </a-tab-pane>
        </a-tabs>
      </a-col>
    </a-card>
    <create-staff-insurance ref="createStaffModal" @ok="handleOk"/>
    <create-nursing-insurance ref="createNursingModal" @ok="handleOk"/>
    <create-distri-insurance ref="createDistriModal" @ok="handleOk"/>
    <insurance-scheme ref="insuranceScheme" @ok="handleOk"/>
  </div>
</template>
<script>
import { getInsuracnes, deleteInsurance } from '@/api/insurance'
import { getAllClients } from '@/api/client'
import CreateStaffInsurance from './CreateStaffInsurance'
import CreateDistriInsurance from './CreateDistributionInsurance'
import CreateNursingInsurance from './CreateNursingInsurance'
import InsuranceScheme from './InsuranceScheme'
import { STable } from '@/components'
const staffColumns = [{
  title: '保险险种',
  dataIndex: 'name'
}, {
  title: '保险唯一识别码',
  dataIndex: 'code'
}, {
  title: '保险开始日期',
  dataIndex: 'beginTime'
},
{
  title: '保险结束日期',
  dataIndex: 'endTime'
},
{
  title: '保费(人年)',
  dataIndex: 'balance'
},
{
  title: '保险结算方式',
  dataIndex: 'paymentMethod'
},
{
  title: '保单号',
  dataIndex: 'insuranceNumber'
}, {
  title: '操作',
  dataIndex: 'operation',
  scopedSlots: { customRender: 'operation' }
}]
const nursingColumns = [{
  title: '保险险种',
  dataIndex: 'name'
}, {
  title: '保险唯一识别码',
  dataIndex: 'code'
}, {
  title: '保险开始日期',
  dataIndex: 'beginTime'
},
{
  title: '保险结束日期',
  dataIndex: 'endTime'
},
{
  title: '保费(人年)',
  dataIndex: 'balance'
},
{
  title: '保险结算方式',
  dataIndex: 'paymentMethod'
},
{
  title: '保单号',
  dataIndex: 'insuranceNumber'
}, {
  title: '操作',
  dataIndex: 'operation',
  scopedSlots: { customRender: 'operation' }
}]
const distributionColumns = [{
  title: '保险险种',
  dataIndex: 'name'
}, {
  title: '保险唯一识别码',
  dataIndex: 'code'
}, {
  title: '保险开始日期',
  dataIndex: 'beginTime'
},
{
  title: '保险结束日期',
  dataIndex: 'endTime'
},
{
  title: '货物保险费率',
  dataIndex: 'insuranceRate',
  // customRender: (text) => {
  //   if (text === 0) {
  //     text = ''
  //   } else {
  //     text = text * 100 + '%'
  //   }
  // }
  customRender: (text) => text * 100 + '%'
},
{
  title: '保单号',
  dataIndex: 'insuranceNumber'
}, {
  title: '操作',
  dataIndex: 'operation',
  scopedSlots: { customRender: 'operation' }
}]
const treeData = [
  {
    title: '客户树',
    key: '0'
  }
]
export default {
  components: {
    CreateStaffInsurance,
    CreateDistriInsurance,
    CreateNursingInsurance,
    InsuranceScheme,
    STable
  },
  data () {
    return {
      staffColumns,
      nursingColumns,
      distributionColumns,
      queryParam: {
        clientId: '0'
      },
      defaultSelectedKeys: [],
      loadStaffData: parameter => {
        return getInsuracnes(Object.assign(parameter, this.queryParam))
          .then(res => {
            return res
          })
      },
      loadNursingData: parameter => {
        return getInsuracnes(Object.assign(parameter, this.queryParam))
          .then(res => {
            return res
          })
      },
      loadDistributionData: parameter => {
        return getInsuracnes(Object.assign(parameter, this.queryParam))
          .then(res => {
            return res
          })
      },
      treeData
    }
  },
  created () {
    this.getClientTree()
  },
  methods: {
    handleOk () {
      this.$refs.table.refresh()
    },
    onDelete (rowKey) {
      console.log(rowKey)
      deleteInsurance(rowKey).then(res => {
        this.$refs.table.refresh()
      })
    },
    getClientTree () {
      getAllClients().then(res => {
        console.log(res)
        this.treeData = []
        res.map((ele, index) => {
          const node = {}
          node.key = ele.id
          node.title = ele.name
          this.treeData.push(node)
        })
        this.queryParam.clientId = this.treeData[0].key
        console.log(this.queryParam.clientId)
        this.defaultSelectedKeys[0] = this.treeData[0].key
      })
    },
    onSelect (rowKey) {
      console.log(rowKey)
      this.queryParam.clientId = rowKey[0]
      this.$refs.table.refresh()
    },
    clickAddStaff () {
      this.$refs.createStaffModal.add(this.queryParam.clientId)
    },
    clickAddDistri () {
      this.$refs.createDistriModal.add(this.queryParam.clientId)
    },
    clickAddNursing () {
      this.$refs.createNursingModal.add(this.queryParam.clientId)
    },
    callback (key) {
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
