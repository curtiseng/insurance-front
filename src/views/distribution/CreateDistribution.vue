<template>
  <a-modal
    title="新建货物"
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
          <a-select defaultValue="陆运" @change="onTypeChange">
            <a-select-option value="陆运">陆运</a-select-option>
            <a-select-option value="海运">海运</a-select-option>
            <a-select-option value="空运">空运</a-select-option>
            <a-select-option value="多式联运">多式联运</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          label="运输工具编号/车牌号"
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
          :required="true"
        >
          <a-date-picker @change="onChange" :disabledDate="disabledDate"/>
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
          label="货物价值(万元)"
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
          <a-textarea v-decorator="['description', {rules: []}]" />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { addDistribution } from '@/api/distribution'
import moment from 'moment'
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
      type: '陆运',
      form: this.$form.createForm(this)
    }
  },
  methods: {
    add () {
      this.visible = true
    },
    handleSubmit () {
      const { form: { validateFields, resetFields } } = this
      this.confirmLoading = true
      validateFields((errors, values) => {
        values.type = this.type
        values.beginTime = this.beginTime
        if (!errors) {
          addDistribution(values).then(res => {
            this.visible = false
            this.confirmLoading = false
            resetFields()
            values.beginTime = ''
            values.type = this.type
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
    },
    onTypeChange (value) {
      this.type = value
    },
    disabledDate (current) {
      // Can not select days before today and today
      return current < moment().startOf('day')
    }
  }
}
</script>
