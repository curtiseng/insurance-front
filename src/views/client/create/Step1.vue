<template>
  <div>
    <a-form :form="form" style="max-width: 700px; margin: 60px auto 0;">
      <a-form-item
        label="被保险人"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input v-decorator="['name', {rules: [{required: true}]}]" />
      </a-form-item>
      <a-form-item
        label="保险险种"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        :required="true"
      >
        <a-select mode="multiple" defaultValue="STAFF" @change="onTypeChange">
          <a-select-option value="STAFF">员工申报</a-select-option>
          <a-select-option value="DISTRIBUTION">物流申报</a-select-option>
          <a-select-option value="NURSING">养老机构申报</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        label="联系电话"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input v-decorator="['phoneNumber', {rules: [{required: true}]}]" />
      </a-form-item>
      <a-form-item
        label="客户首选邮箱"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input v-decorator="['firstClientEmail', { rules: [{required: true}] }]"/>
      </a-form-item>
      <a-form-item
        label="客户次选邮箱"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input v-decorator="['secondClientEmail', { rules: [] }]"/>
      </a-form-item>
      <a-form-item
        label="保险公司名称"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input v-decorator="['insuranceName', { rules: [{required: true}] }]"/>
      </a-form-item>
      <a-form-item
        label="保险公司首选邮箱"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input v-decorator="['firstInsuranceEmail', { rules: [{required: true}] }]"/>
      </a-form-item>
      <a-form-item
        label="保险公司次选邮箱"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input v-decorator="['secondInsuranceEmail', { rules: [] }]"/>
      </a-form-item>
      <a-form-item
        label="经纪公司项目经理"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input v-decorator="['leader', { rules: [{required: true}] }]"/>
      </a-form-item>
      <a-form-item
        label="项目经理邮箱"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input v-decorator="['leaderEmail', { rules: [{required: true}] }]"/>
      </a-form-item>
      <a-form-item
        label="公共邮箱"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input v-decorator="['commonEmail', { rules: [] }]"/>
      </a-form-item>
      <a-form-item :wrapperCol="{span: 19, offset: 5}">
        <a-button :loading="loading" type="primary" :disabled="handSubmitDisabled" @click="handleSubmit">提交</a-button>
        <a-button style="margin-left: 8px" type="primary" :disabled="handDisabled" @click="nextStep">下一步</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { addClient } from '@/api/client'
export default {
  name: 'Step1',
  data () {
    return {
      labelCol: { lg: { span: 5 }, sm: { span: 5 } },
      wrapperCol: { lg: { span: 19 }, sm: { span: 19 } },
      form: this.$form.createForm(this),
      handDisabled: true,
      handSubmitDisabled: false,
      loading: false,
      clientType: 'STAFF'
    }
  },
  methods: {
    handleSubmit () {
      const { form: { validateFields } } = this
      validateFields((err, values) => {
        if (!err) {
          values.clientType = this.clientType
          this.loading = true
          addClient(values).then(res => {
            console.log(res.id)
            sessionStorage.setItem('clientId', res.id)
            this.loading = false
            this.handDisabled = false
            this.handSubmitDisabled = true
            this.$notification.success({
              message: '保存成功',
              description: '已经保存成功，下一步创建管理员'
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
    },
    onTypeChange (value) {
      this.clientType = value
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
