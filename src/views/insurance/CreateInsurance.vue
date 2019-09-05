<template>
  <a-modal
    title="新建保险"
    :width="640"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item
          label="保险险种"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input v-decorator="['name', {rules: [{required: true}]}]" />
        </a-form-item>
        <a-form-item
          label="保险唯一识别码"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input v-decorator="['code', {rules: [{required: true}]}]" />
        </a-form-item>
        <a-form-item
          label="保险开始日期"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-date-picker @change="onBeginChange" />
        </a-form-item>
        <a-form-item
          label="保险结束日期"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-date-picker @change="onEndChange" />
        </a-form-item>
        <a-form-item
          label="保险金额"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input v-decorator="['balance', {rules: [{required: true}]}]" />
        </a-form-item>
        <a-form-item
          label="保险结算方式"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          :required="false"
        >
          <a-select defaultValue="MOUTH" @change="onPayMethodChange">
            <a-select-option value="MOUTH">按月计费</a-select-option>
            <a-select-option value="DAY">按天计费</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          label="货物保险费率"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input v-decorator="['insuranceRate', {rules: [{required: true}]}]" />
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
      paymentMethod: 'MOUTH',
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
