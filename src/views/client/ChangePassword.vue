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
      <a-form :form="form">
        <a-form-item
          label="新密码"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input
            type="text"
            style="width: 80%;"
            v-decorator="['password', { rules: [{required: true, message: '请输入新密码'}] }]" />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { changeCompanyPassword } from '@/api/admin'
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
    add (value) {
      this.visible = true
      this.client.id = value
    },
    handleSubmit () {
      const { form: { validateFields } } = this
      this.confirmLoading = true
      validateFields((errors, values) => {
        if (!errors) {
          values.clientId = this.client.id
          console.log('values', values)
          changeCompanyPassword(values).then(res => {
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
