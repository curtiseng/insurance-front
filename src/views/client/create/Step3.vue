<template>
  <div>
    <a-form :form="form" style="max-width: 500px; margin: 40px auto 0;">
      <a-alert
        :closable="true"
        message="此金额为客户备用金，此后可以在客户管理里增加备用金"
        style="margin-bottom: 24px;"
      />
      <a-form-item
        label="预存金额"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        class="stepFormText"
      >
        <a-input
          type="text"
          style="width: 80%;"
          v-decorator="['balance', { rules: [{required: true, message: '请输入预存金额'}] }]" />
      </a-form-item>
      <a-form-item :wrapperCol="{span: 19, offset: 5}">
        <a-button :loading="loading" type="primary" :disabled="handSubmitDisabled" @click="submit">提交</a-button>
        <a-button type="primary" style="margin-left: 8px" :disabled="handDisabled" @click="finish">完成</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { addClientBalance } from '@/api/client'
export default {
  name: 'Step2',
  data () {
    return {
      labelCol: { lg: { span: 5 }, sm: { span: 5 } },
      wrapperCol: { lg: { span: 19 }, sm: { span: 19 } },
      form: this.$form.createForm(this),
      loading: false,
      timer: 0,
      handDisabled: true,
      handSubmitDisabled: false
    }
  },
  methods: {
    submit () {
      const that = this
      const { form: { validateFields } } = this
      that.loading = true
      validateFields((err, values) => {
        if (!err) {
          values.id = sessionStorage.getItem('clientId')
          this.loading = true
          addClientBalance(values).then(res => {
            console.log(values)
            this.handDisabled = false
            this.handSubmitDisabled = true
            this.loading = false
            this.$notification.success({
              message: '保存成功',
              description: '已经保存成功，点击完成退出'
            })
          }).catch(error => {
            console.log(error)
            this.loading = false
          })
        }
      })
    },
    finish () {
      this.$emit('finish')
    }
  },
  beforeDestroy () {
    clearTimeout(this.timer)
  }
}
</script>

<style lang="less" scoped>
  .stepFormText {
    margin-bottom: 24px;

    .ant-form-item-label,
    .ant-form-item-control {
      line-height: 22px;
    }
  }

</style>
