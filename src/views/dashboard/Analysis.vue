<template>
  <div class="page-header-index-wide">
    <a-row :gutter="24">
      <a-col :sm="24" :md="12" :xl="8" :style="{ marginBottom: '24px' }">
        <chart-card :loading="loading" title="余额" :total="balance | NumberFormat">
          <template>今日缴费<span>{{ currentDatePay }}</span></template>
        </chart-card>
      </a-col>
      <a-col :sm="24" :md="12" :xl="8" :style="{ marginBottom: '24px' }">
        <chart-card :loading="loading" title="总员工数" :total="staffCount | NumberFormat">
          <template>今日增加<span> {{ currentDateStaff | NumberFormat }}</span></template>
        </chart-card>
      </a-col>
      <a-col :sm="24" :md="12" :xl="8" :style="{ marginBottom: '24px' }">
        <chart-card :loading="loading" title="物流单数" :total="distributionCount | NumberFormat">
          <template>今日单数<span> {{ currentDateDistribution | NumberFormat }}</span></template>
        </chart-card>
      </a-col>
    </a-row>
    <a-row>
      <s-table
        ref="table"
        size="default"
        rowKey="key"
        :columns="columns"
        :data="loadData"
        showPagination="auto"
        bordered
      >
      </s-table>
    </a-row>
  </div>
</template>

<script>
import { getWorkSpaceMap, getBillings } from '@/api/client'
import { ChartCard, MiniArea, MiniBar, MiniProgress, RankList, Bar, Trend, NumberInfo, MiniSmoothArea, STable } from '@/components'
import { mixinDevice } from '@/utils/mixin'
const columns = [{
  title: '账单描述',
  dataIndex: 'description'
}, {
  title: '交易金额',
  dataIndex: 'balance'
}, {
  title: '交易流水号',
  dataIndex: 'paymentId'
}]
export default {
  name: 'Analysis',
  mixins: [mixinDevice],
  components: {
    ChartCard,
    MiniArea,
    MiniBar,
    MiniProgress,
    RankList,
    Bar,
    Trend,
    NumberInfo,
    MiniSmoothArea,
    STable
  },
  data () {
    return {
      columns,
      queryParam: {
      },
      defaultSelectedKeys: [],
      loadData: parameter => {
        return getBillings(Object.assign(parameter, this.queryParam))
          .then(res => {
            return res
          })
      },
      loading: true,
      pieStyle: {
        stroke: '#fff',
        lineWidth: 1
      },
      currentDatePay: '',
      balance: '',
      distributionCount: '',
      currentDateRefund: '',
      currentDateAdd: '',
      currentDateDistribution: '',
      currentDateStaff: '',
      staffCount: ''
    }
  },
  created () {
    getWorkSpaceMap().then(res => {
      this.currentDatePay = res.currentDatePay
      this.balance = res.balance
      this.distributionCount = res.distributionCount
      this.currentDateRefund = res.currentDateRefund
      this.currentDateAdd = res.currentDateAdd
      this.currentDateDistribution = res.currentDateDistribution
      this.currentDateStaff = res.currentDateStaff
      this.staffCount = res.staffCount
      this.loading = false
    })
  },
  mounted () {
    getWorkSpaceMap().then(res => {
      this.currentDatePay = res.currentDatePay
      this.balance = res.balance
      this.distributionCount = res.distributionCount
      this.currentDateRefund = res.currentDateRefund
      this.currentDateAdd = res.currentDateAdd
      this.currentDateDistribution = res.currentDateDistribution
      this.currentDateStaff = res.currentDateStaff
      this.staffCount = res.staffCount
      this.loading = false
    })
  }
}
</script>

<style lang="less" scoped>
  .extra-wrapper {
    line-height: 55px;
    padding-right: 24px;

    .extra-item {
      display: inline-block;
      margin-right: 24px;

      a {
        margin-left: 24px;
      }
    }
  }

  .antd-pro-pages-dashboard-analysis-twoColLayout {
    position: relative;
    display: flex;
    display: block;
    flex-flow: row wrap;

    &.desktop div[class^=ant-col]:last-child {
      position: absolute;
      right: 0;
      height: 100%;
    }
  }

  .antd-pro-pages-dashboard-analysis-salesCard {
    height: calc(100% - 24px);
    /deep/ .ant-card-head {
      position: relative;
    }
  }

  .dashboard-analysis-iconGroup {
    i {
      margin-left: 16px;
      color: rgba(0,0,0,.45);
      cursor: pointer;
      transition: color .32s;
      color: black;
    }
  }
  .analysis-salesTypeRadio {
    position: absolute;
    right: 54px;
    bottom: 12px;
  }
</style>
