<template>
  <div>
    <a-modal
      title="新建保险方案"
      :width="640"
      :visible="visible"
      :confirmLoading="confirmLoading"
      @ok="handleSubmit"
      @cancel="handleCancel"
    >
      <a-button class="editable-add-btn" @click="handleAdd">添加</a-button>
      <a-table bordered :dataSource="dataSource" :columns="columns">
        <template slot="scheme" slot-scope="text, record">
          <editable-cell :text="text" @change="onCellChange(record.key, 'scheme', $event)"/>
        </template>
        <template slot="balance" slot-scope="text, record">
          <editable-cell :text="text" @change="onCellChange(record.key, 'balance', $event)"/>
        </template>
        <template slot="operation" slot-scope="text, record">
          <a-popconfirm
            v-if="dataSource.length"
            title="删除这个方案吗？"
            @confirm="() => onDelete(record.key)">
            <a href="javascript:;">删除</a>
          </a-popconfirm>
        </template>
      </a-table>
    </a-modal>
  </div>
</template>

<script>
import EditableCell from './EditableCell'
import { getInsuracneById, updateInsurance } from '@/api/insurance'
export default {
  components: {
    EditableCell
  },
  data () {
    return {
      visible: false,
      confirmLoading: false,
      insuranceId: '',
      scheme: {},
      dataSource: [],
      count: 0,
      columns: [{
        title: '方案',
        dataIndex: 'scheme',
        width: '50%',
        scopedSlots: { customRender: 'scheme' }
      }, {
        title: '保费(人/年)',
        dataIndex: 'balance',
        width: '30%',
        scopedSlots: { customRender: 'balance' }
      }, {
        title: '操作',
        dataIndex: 'operation',
        scopedSlots: { customRender: 'operation' }
      }]
    }
  },
  methods: {
    add (value) {
      console.log(value)
      this.insuranceId = value
      this.getScheme()
      this.visible = true
    },
    handleSubmit () {
      this.dataSource.forEach(data => {
        this.scheme[data.scheme] = data.balance
      })
      console.log(this.scheme)
      var insurance = {}
      insurance.id = this.insuranceId
      insurance.scheme = this.scheme
      this.confirmLoading = true
      updateInsurance(insurance).then(res => {
        this.confirmLoading = false
        this.visible = false
        this.$notification.success({
          message: '保存成功',
          description: '保险方案保存成功'
        })
      })
    },
    handleCancel () {
      this.visible = false
    },
    onCellChange (key, dataIndex, value) {
      const dataSource = [...this.dataSource]
      const target = dataSource.find(item => item.key === key)
      if (target) {
        target[dataIndex] = value
        this.dataSource = dataSource
      }
    },
    onDelete (key) {
      const dataSource = [...this.dataSource]
      this.dataSource = dataSource.filter(item => item.key !== key)
    },
    handleAdd () {
      const { count, dataSource } = this
      const newData = {
        key: count,
        scheme: '请填写方案描述',
        balance: '0'
      }
      this.dataSource = [...dataSource, newData]
      this.count = count + 1
    },
    getScheme () {
      this.dataSource = []
      getInsuracneById(this.insuranceId).then(res => {
        console.log(res.scheme)
        Object.keys(res.scheme).forEach(objKey => {
          const { count, dataSource } = this
          const newData = {
            key: count,
            scheme: objKey,
            balance: res.scheme[objKey].toString()
          }
          this.dataSource = [...dataSource, newData]
          this.count = count + 1
        })
      })
    }
  }
}
</script>
<style>
.editable-cell {
  position: relative;
}

.editable-cell-input-wrapper,
.editable-cell-text-wrapper {
  padding-right: 24px;
}

.editable-cell-text-wrapper {
  padding: 5px 24px 5px 5px;
}

.editable-cell-icon,
.editable-cell-icon-check {
  position: absolute;
  right: 0;
  width: 20px;
  cursor: pointer;
}

.editable-cell-icon {
  line-height: 18px;
  display: none;
}

.editable-cell-icon-check {
  line-height: 28px;
}

.editable-cell:hover .editable-cell-icon {
  display: inline-block;
}

.editable-cell-icon:hover,
.editable-cell-icon-check:hover {
  color: #108ee9;
}

.editable-add-btn {
  margin-bottom: 8px;
}
</style>
