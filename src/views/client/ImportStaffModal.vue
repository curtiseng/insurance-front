<template>
  <a-modal
    title="上传员工"
    :width="640"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-upload
      :fileList="fileList"
      :remove="handleRemove"
      :beforeUpload="beforeUpload"
    >
      <a-button>
        <a-icon type="upload" /> 选择excel文件
      </a-button>
    </a-upload>
    <a-button
      type="primary"
      @click="handleDownload"
      :disabled="handDownloadDisabled"
    >
      下载错误文件
    </a-button>
  </a-modal>
</template>

<script>
import { uploadStaffs } from '@/api/staff'
export default {
  name: 'Step2',
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
      fileList: [],
      handDownloadDisabled: true,
      errUrl: ''
    }
  },
  methods: {
    add (value) {
      this.visible = true
      this.client.id = value
    },
    handleSubmit () {
      const { fileList } = this
      const formData = new FormData()
      formData.append('file', fileList[0])
      formData.append('clientId', this.client.id)
      uploadStaffs(formData).then(res => {
        this.handDownloadDisabled = false
        this.$message.success(res)
        this.visible = false
      }).catch(err => {
        this.handDownloadDisabled = false
        this.errUrl = err.response.data.errorKey
      })
    },
    handleCancel () {
      this.visible = false
    },
    handleRemove (file) {
      const index = this.fileList.indexOf(file)
      const newFileList = this.fileList.slice()
      newFileList.splice(index, 1)
      this.fileList = newFileList
    },
    beforeUpload (file) {
      this.fileList = [...this.fileList, file]
      return false
    },
    handleDownload () {
      console.log(this.errUrl)
      this.visible = false
      const path = window.location.host
      window.open('http://' + path + this.errUrl)
    }
  }
}
</script>
