<template>
  <a-table :columns="columns" :dataSource="data" bordered :pagination="pagination">
    <template slot="name" slot-scope="text">
      <a href="javascript:;">{{ text }}</a>
    </template>
    <template slot="title" slot-scope="currentPageData">
      <a-button type="primary" icon="plus" @click="$refs.createModal.add()">新建</a-button>
    </template>
    <template slot="footer" slot-scope="currentPageData">
      <a-pagination showSizeChanger @showSizeChange="onShowSizeChange" :defaultCurrent="3" :total="500" />
    </template>
  </a-table>
</template>
<script>
const columns = [{
  title: 'Name',
  dataIndex: 'name',
  scopedSlots: { customRender: 'name' }
}, {
  title: 'Cash Assets',
  className: 'column-money',
  dataIndex: 'money'
}, {
  title: 'Address',
  dataIndex: 'address'
}]

const data = [{
  key: '1',
  name: 'John Brown',
  money: '￥300,000.00',
  address: 'New York No. 1 Lake Park'
}, {
  key: '2',
  name: 'Jim Green',
  money: '￥1,256,000.00',
  address: 'London No. 1 Lake Park'
}, {
  key: '3',
  name: 'Joe Black',
  money: '￥120,000.00',
  address: 'Sidney No. 1 Lake Park'
}]

export default {
  data () {
    return {
      data,
      columns,
      pagination: {
        pageSize: 20, // 默认每页显示数量
        showSizeChanger: true, // 显示可改变每页数量
        pageSizeOptions: ['10', '20', '30', '40'], // 每页数量选项
        showTotal: total => `Total ${total} items`, // 显示总数
        showSizeChange: (current, pageSize) => this.pageSize = pageSize // 改变每页数量时更新显示
      }
    }
  }
}
</script>
<style>
th.column-money,
td.column-money {
  text-align: right !important;
}
</style>
