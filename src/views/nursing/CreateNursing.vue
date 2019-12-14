<template>
  <a-modal
    title="新建老人"
    :width="640"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item
          label="姓名"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input v-decorator="['name', {rules: [{required: true, whitespace:true, message: '相对人名称不能为空'}, {max: 10, message: '最多10个字符'}]}]" />
        </a-form-item>
        <a-form-item
          label="身份证号"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input v-decorator="['idCard', {rules: [{required: true, whitespace:true, message: '身份证不能为空'}]}]" />
        </a-form-item>
        <a-form-item
          label="性别"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          :required="false"
        >
          <a-select defaultValue="男" @change="onSexChange">
            <a-select-option value="男">男</a-select-option>
            <a-select-option value="女">女</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          label="保险方案"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-select @change="onSchemeChange">
            <a-select-option v-for="d in selectData" :key="d.value">{{ d.text + ' : ' + d.value }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          label="开始投保日期"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-date-picker @change="onChange" :disabledDate="disabledDate" />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { addStaff } from '@/api/staff'
import { getInsuracneList } from '@/api/insurance'
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
      startTime: '',
      sex: '男',
      staffType: 'NURSING',
      insuranceScheme: '',
      insuranceNumber: '',
      insuranceEndtime: '',
      insuranceBeginTime: '',
      queryParam: {
        type: 'NURSING'
      },
      selectData: [],
      form: this.$form.createForm(this)
    }
  },
  created () {
    getInsuracneList(this.queryParam).then(res => {
      this.insuranceNumber = res.insuranceNumber
      this.insuranceEndtime = res.endTime
      this.insuranceBeginTime = res.beginTime
      Object.keys(res.scheme).forEach(objKey => {
        const { selectData } = this
        const newData = {
          text: objKey,
          value: res.scheme[objKey].toString()
        }
        this.selectData = [...selectData, newData]
      })
    })
  },
  methods: {
    add () {
      this.visible = true
    },
    handleSubmit () {
      const { form: { validateFields, resetFields } } = this
      this.confirmLoading = true
      validateFields((errors, values) => {
        if (!errors) {
          values.startTime = this.startTime
          values.sex = this.sex
          values.staffType = this.staffType
          values.insuranceScheme = this.insuranceScheme
          values.insuranceNumber = this.insuranceNumber
          console.log('values', values)
          addStaff(values).then(res => {
            this.visible = false
            this.confirmLoading = false
            resetFields()
            values.startTime = ''
            values.staffType = this.staffType
            values.insuranceScheme = ''
            values.insuranceNumber = ''
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
      this.startTime = dateString
    },
    onSexChange (value) {
      this.sex = value
    },
    onSchemeChange (value) {
      this.insuranceScheme = value
    },
    disabledDate (current) {
      // Can not select days before today and today
      return current.isBefore(this.insuranceBeginTime) || current.isAfter(this.insuranceEndtime)
    }
  }
}
</script>
