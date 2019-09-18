<template>
  <a-modal
    title="新建雇主责任保险(员工)"
    :width="640"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item
          label="年度/险种名称"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input v-decorator="['name', {rules: [{required: true}]}]" />
        </a-form-item>
        <a-form-item
          label="保险开始日期"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          :required="true"
        >
          <a-date-picker @change="onBeginChange" />
        </a-form-item>
        <a-form-item
          label="保险结束日期"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          :required="true"
        >
          <a-date-picker @change="onEndChange" />
        </a-form-item>
        <a-form-item
          label="首期保费"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input prefix="￥" v-decorator="['initialMoney', { rules: [{required: true}] }]"/>
        </a-form-item>
        <a-form-item
          label="保险结算方式"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          :required="false"
        >
          <a-select defaultValue="DAY" @change="onPayMethodChange">
            <a-select-option value="MOUTH">按月计费</a-select-option>
            <a-select-option value="DAY">按天计费</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          label="保单号"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input v-decorator="['insuranceNumber', {rules: [{required: true}]}]" />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { addInsurance } from '@/api/insurance'
export default {
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
      clientId: '0',
      beginTime: '',
      endTime: '',
      paymentMethod: 'DAY',
      form: this.$form.createForm(this)
    }
  },
  methods: {
    add (clientId) {
      console.log(clientId)
      this.visible = true
      if (clientId === '0') {
        this.$notification['error']({
          message: '错误',
          description: '请先选择客户',
          duration: 4
        })
        this.visible = false
      }
      this.clientId = clientId
    },
    handleSubmit () {
      const { form: { validateFields } } = this
      this.confirmLoading = true
      validateFields((errors, values) => {
        if (!errors) {
          values.clientId = this.clientId
          values.insuranceType = 'STAFF'
          values.beginTime = this.beginTime
          values.endTime = this.endTime
          values.paymentMethod = this.paymentMethod
          console.log('values', values)
          addInsurance(values).then(res => {
            this.visible = false
            this.confirmLoading = false
            this.$emit('ok', res)
          }).catch(error => {
            console.log(error)
            this.confirmLoading = false
          })
        } else {
          this.confirmLoading = false
        }
      })
    },
    handleCancel () {
      this.visible = false
    },
    onBeginChange (date, dateString) {
      console.log(date, dateString)
      this.beginTime = dateString
    },
    onEndChange (date, dateString) {
      console.log(date, dateString)
      this.endTime = dateString
    },
    onPayMethodChange (value) {
      console.log(value)
      this.paymentMethod = value
    }
  }
}
</script>
