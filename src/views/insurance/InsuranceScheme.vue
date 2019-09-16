<template>
  <div>
    <a-modal
      title="新建物流保险"
      :width="640"
      :visible="visible"
      :confirmLoading="confirmLoading"
      @ok="handleSubmit"
      @cancel="handleCancel"
    >
    </a-modal>
  </div>
</template>

<script>
export default {
  data () {
    return {
      visible: false,
      confirmLoading: false
    }
  },
  methods: {
    add (clientId) {
      console.log(clientId)
      this.visible = true
      if (clientId === '0') {
        this.$notification['error']({
          message: '错误',
          description: '请先选择客户',
          duration: 4
        })
        this.visible = false
      }
      this.clientId = clientId
    },
    handleSubmit () {
      console.log('submit')
    },
    handleCancel () {
      this.visible = false
    }
  }
}
</script>
