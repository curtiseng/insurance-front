<template>
  <a-modal
    title="修改管理员密码"
    :width="640"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form" style="max-width: 700px; margin: 60px auto 0;">
        <a-form-item
          label="被保险人"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input v-decorator="['name', {initialValue: client.name, rules: [{required: true}]}]" />
        </a-form-item>
        <a-form-item
          label="联系电话"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input v-decorator="['phoneNumber', {initialValue: client.phoneNumber, rules: [{required: true}]}]" />
        </a-form-item>
        <a-form-item
          label="客户首选邮箱"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input v-decorator="['firstClientEmail', {initialValue: client.firstClientEmail, rules: [{required: true}] }]"/>
        </a-form-item>
        <a-form-item
          label="客户次选邮箱"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input v-decorator="['secondClientEmail', {initialValue: client.secondClientEmail, rules: [] }]"/>
        </a-form-item>
        <a-form-item
          label="保险公司名称"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input v-decorator="['insuranceName', {initialValue: client.insuranceName, rules: [{required: true}] }]"/>
        </a-form-item>
        <a-form-item
          label="保险公司首选邮箱"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input v-decorator="['firstInsuranceEmail', {initialValue: client.firstInsuranceEmail, rules: [{required: true}] }]"/>
        </a-form-item>
        <a-form-item
          label="保险公司次选邮箱"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input v-decorator="['secondInsuranceEmail', {initialValue: client.secondInsuranceEmail, rules: [] }]"/>
        </a-form-item>
        <a-form-item
          label="经纪公司项目经理"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input v-decorator="['leader', {initialValue: client.leader, rules: [{required: true}] }]"/>
        </a-form-item>
        <a-form-item
          label="项目经理邮箱"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input v-decorator="['leaderEmail', {initialValue: client.leaderEmail, rules: [] }]"/>
        </a-form-item>
        <a-form-item
          label="公共邮箱"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input v-decorator="['commonEmail', {initialValue: client.commonEmail, rules: [{required: true}] }]"/>
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { updateClient } from '@/api/client'
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
      client: {},
      form: this.$form.createForm(this)
    }
  },
  methods: {
    update (value) {
      this.visible = true
      this.client = value
    },
    handleSubmit () {
      const { form: { validateFields } } = this
      this.confirmLoading = true
      validateFields((errors, values) => {
        if (!errors) {
          values.id = this.client.id
          values.clientType = this.client.clientType
          console.log('values', values)
          updateClient(values).then(res => {
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
    }
  }
}
</script>
