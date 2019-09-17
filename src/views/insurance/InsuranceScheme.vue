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
export default {
  components: {
    EditableCell
  },
  data () {
    return {
      visible: false,
      confirmLoading: false,
      dataSource: [{
        key: '0',
        scheme: 'Edward King 0',
        balance: '32'
      }],
      count: 1,
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
        title: 'operation',
        dataIndex: 'operation',
        scopedSlots: { customRender: 'operation' }
      }]
    }
  },
  methods: {
    add (value) {
      console.log(value)
      this.visible = true
    },
    handleSubmit () {
      console.log('submit')
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
        balance: 1
      }
      this.dataSource = [...dataSource, newData]
      this.count = count + 1
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
