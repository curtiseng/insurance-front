<template>
  <div>
    <a-form :form="form" style="max-width: 500px; margin: 40px auto 0;">
      <a-form-item
        label="公司名称"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input v-decorator="['login', {rules: [{required: true, min: 5, message: '请输入至少五个字符的规则描述！'}]}]" />
      </a-form-item>
      <a-form-item
        label="联系电话"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input v-decorator="['login', {rules: [{required: true, min: 5, message: '请输入至少五个字符的规则描述！'}]}]" />
      </a-form-item>
      <a-form-item
        label="客户首选邮箱"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input v-decorator="['name', { initialValue: 'Alex', rules: [{required: true, message: '收款人名称必须核对'}] }]"/>
      </a-form-item>
      <a-form-item
        label="客户次选邮箱"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input v-decorator="['name', { initialValue: 'Alex', rules: [{required: true, message: '收款人名称必须核对'}] }]"/>
      </a-form-item>
      <a-form-item
        label="首期保费"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input v-decorator="['name', { initialValue: 'Alex', rules: [{required: true, message: '收款人名称必须核对'}] }]"/>
      </a-form-item>
      <a-form-item
        label="保险公司名称"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input v-decorator="['name', { initialValue: 'Alex', rules: [{required: true, message: '收款人名称必须核对'}] }]"/>
      </a-form-item>
      <a-form-item
        label="保险公司首选邮箱"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input v-decorator="['name', { initialValue: 'Alex', rules: [{required: true, message: '收款人名称必须核对'}] }]"/>
      </a-form-item>
      <a-form-item
        label="保险公司次选邮箱"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input v-decorator="['name', { initialValue: 'Alex', rules: [{required: true, message: '收款人名称必须核对'}] }]"/>
      </a-form-item>
      <a-form-item
        label="项目经理"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input v-decorator="['name', { initialValue: 'Alex', rules: [{required: true, message: '收款人名称必须核对'}] }]"/>
      </a-form-item>
      <a-form-item
        label="项目经理邮箱"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input v-decorator="['name', { initialValue: 'Alex', rules: [{required: true, message: '收款人名称必须核对'}] }]"/>
      </a-form-item>
      <a-form-item
        label="转账金额"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input prefix="￥" v-decorator="['momey', { initialValue: '5000', rules: [{required: true, message: '转账金额必须填写'}] }]"/>
      </a-form-item>
      <a-form-item :wrapperCol="{span: 19, offset: 5}">
        <a-button :loading="loading" type="primary" @click="nextStep">提交</a-button>
        <a-button style="margin-left: 8px" type="primary" @click="nextStep">下一步</a-button>
      </a-form-item>
    </a-form>
    <a-divider />
  </div>
</template>

<script>
export default {
  name: 'Step1',
  data () {
    return {
      labelCol: { lg: { span: 5 }, sm: { span: 5 } },
      wrapperCol: { lg: { span: 19 }, sm: { span: 19 } },
      form: this.$form.createForm(this)
    }
  },
  methods: {
    nextStep () {
      const { form: { validateFields } } = this
      // 先校验，通过表单校验后，才进入下一步
      validateFields((err, values) => {
        if (!err) {
          this.$emit('nextStep')
        }
      })
    }
  }
}
</script>
