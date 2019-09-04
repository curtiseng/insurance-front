<template>
  <div>
    <a-spin :spinning="confirmLoading">
      <a-form :form="form" style="max-width: 500px; margin: 40px auto 0;">
        <a-form-item
          label="登陆名"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input v-decorator="['login', {rules: [{required: true}]}]" />
        </a-form-item>
        <a-form-item
          label="姓名"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input v-decorator="['username', {rules: [{required: true}]}]" />
        </a-form-item>
        <a-form-item
          label="密码"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input v-decorator="['password', {rules: [{required: true}]}]" />
        </a-form-item>
        <a-form-item
          label="邮箱"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input v-decorator="['email', {rules: [{required: true}]}]" />
        </a-form-item>
        <a-form-item :wrapperCol="{span: 19, offset: 5}">
          <a-button :loading="loading" type="primary" :disabled="handSubmitDisabled" @click="handSubmit">提交</a-button>
          <a-button style="margin-left: 8px" type="primary" :disabled="handDisabled" @click="nextStep">下一步</a-button>
        </a-form-item>
      </a-form>
    </a-spin>
  </div>
</template>

<script>
import { addCompanyAdmin } from '@/api/admin'
export default {
  name: 'Step1',
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
      form: this.$form.createForm(this),
      handDisabled: true,
      handSubmitDisabled: false,
      loading: false
    }
  },
  methods: {
    handSubmit () {
      const client = { 'clientId': sessionStorage.getItem('clientId') }
      console.log(client)
      const { form: { validateFields } } = this
      // 先校验，通过表单校验后，才进入下一步
      validateFields((err, values) => {
        if (!err) {
          this.loading = true
          addCompanyAdmin(values, client).then(res => {
            this.handDisabled = false
            this.handSubmitDisabled = true
            this.loading = false
            this.$notification.success({
              message: '保存成功',
              description: '已经保存成功，下一步增加预存额'
            })
          }).catch(error => {
            console.log(error)
            this.loading = false
          })
        }
      })
    },
    nextStep () {
      this.$emit('nextStep')
    }
  }
}
</script>

<style lang="less" scoped>
.step-form-style-desc {
  padding: 0 56px;
  color: rgba(0,0,0,.45);

  h3 {
    margin: 0 0 12px;
    color: rgba(0,0,0,.45);
    font-size: 16px;
    line-height: 32px;
  }

  h4 {
    margin: 0 0 4px;
    color: rgba(0,0,0,.45);
    font-size: 14px;
    line-height: 22px;
  }

  p {
    margin-top: 0;
    margin-bottom: 12px;
    line-height: 22px;
  }
}
</style>
