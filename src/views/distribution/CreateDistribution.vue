<template>
  <a-modal
    title="新建规则"
    :width="640"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item
          label="货物名称"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input v-decorator="['name', {rules: [{required: true}]}]" />
        </a-form-item>
        <a-form-item
          label="运输方式"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input v-decorator="['type', {rules: [{required: true}]}]" />
        </a-form-item>
        <a-form-item
          label="车牌号码"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input v-decorator="['busNumber', {rules: [{required: true}]}]" />
        </a-form-item>
        <a-form-item
          label="货物标签或箱号"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input v-decorator="['goodLabel', {rules: [{required: true}]}]" />
        </a-form-item>
        <a-form-item
          label="启运日期"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-date-picker @change="onChange" />
        </a-form-item>
        <a-form-item
          label="始发地"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input v-decorator="['beginPlace', {rules: [{required: true}]}]" />
        </a-form-item>
        <a-form-item
          label="收货地"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input v-decorator="['endPlace', {rules: [{required: true}]}]" />
        </a-form-item>
        <a-form-item
          label="货物价值"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input v-decorator="['balance', {rules: [{required: true}]}]" />
        </a-form-item>
        <a-form-item
          label="其他描述信息"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input v-decorator="['description', {rules: [{required: true}]}]" />
        </a-form-item>
        <a-form-item
          label="保险类型"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input v-decorator="['insuranceType', {rules: [{required: true}]}]" />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { addDistribution } from '@/api/distribution'
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
      beginTime: '',
      form: this.$form.createForm(this)
    }
  },
  methods: {
    add () {
      this.visible = true
    },
    handleSubmit () {
      const { form: { validateFields } } = this
      this.confirmLoading = true
      validateFields((errors, values) => {
        if (!errors) {
          values.beginTime = this.beginTime
          console.log('values', values)
          addDistribution(values).then(res => {
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
    onChange (date, dateString) {
      console.log(date, dateString)
      this.beginTime = dateString
    }
  }
}
</script>
