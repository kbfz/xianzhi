<template>
  <div class="app-container calendar-list-container statistics">
    <div class="app-container-left">
      <p class="total">总计：</p>
      <span class="explain">* 统计结果不包含申请状态为已撤回、已拒绝的数据，以及被删除的数据</span>

      <div class="filter-container staBox">
        <el-date-picker type="date"
                        placeholder="请选择开始日期"
                        style="width: 200px;"
                        class="filter-item"
                        @keyup.enter.native="handleFilter"
                        format="yyyy-MM-dd"
                        popper-class="timeSelect"
                        v-model="query.startTime">
        </el-date-picker>
        <el-date-picker type="date"
                        placeholder="请选择结束日期"
                        style="width: 200px;"
                        class="filter-item"
                        popper-class="timeSelect"
                        @keyup.enter.native="handleFilter"
                        format="yyyy-MM-dd"
                        v-model="query.endTime">
        </el-date-picker>
        <el-select placeholder="请选择状态"
                   v-model="query.status"
                   clearable
                   style="width: 200px"
                    popper-class="optionsContent"
                   filterable>
          <el-option v-for="item in selectCustom"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value"></el-option>
        </el-select>
        <el-button class="filter-item"
                   type="primary"
                   v-waves
                   icon="search"
                   @click="handleFilter">查询</el-button>
        <div class="fr">
          <el-button class="filter-item"
                     type="primary"
                     v-waves
                     @click="exportData">导出当前数据
          </el-button>
        </div>
        <div class="staChart"
             id="staChart"></div>
      </div>
    </div>
  </div>
</template>
<script>
import echarts from 'echarts'
import resize from '@/components/Charts/mixins/resize'
import {
  collect,
  exports
} from "api/addService/statistics/index"
import axios from 'axios'
import { mapGetters } from "vuex";
import $ from "jquery";
var dateUtils = require("silly-datetime");
export default {
  mixins: [resize],
  name: "myaddService",
  components: {
    resize
  },
  data () {
    return {
      href: '',
      staOption: {
        color: ['#649af4'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {        // 坐标轴指示器，坐标轴触发有效
            type: 'line'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        dataZoom: [{
          type: 'slider',
          show: true,
          xAxisIndex: [0],
          left: '9%',
          bottom: 5,
          start: 0,
          end: 80, //初始化滚动条
          handleSize: 20,
          height: 20,
          backgroundColor: "#ffffff",  //组件的背景颜色
          dataBackground: {                        //数据阴影的样式。
            lineStyle: {
              color: '#ffffff'
            },              //阴影的线条样式
            areaStyle: {
              color: '#ffffff'
            }           //阴影的填充样式
          },
          fillerColor: "rgba(100,154,244,0.7)",  //选中范围的填充颜色。
          borderColor: "rgba(100,154,244,0.9)"
        }],
        xAxis: {
          type: 'category',
          data: [],
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [],
          barMaxWidth: '50',
          barMinHeight: '15',
          type: 'bar',
          itemStyle: {
            normal: {
              color: '#649af4',
              label: {
                show: true,
                textStyle: {
                  color: '#fff'
                },
                position: 'inside'
              }
            }
          }
        }]
      },
      selectCustom: [
        {
          label: '申请中',
          value: '1'
        },
        {
          label: '待付款',
          value: '2'
        },
        {
          label: '已付款',
          value: '3'
        }
      ],
      // total: null,
      loading: {
        tableLoading: false
      },
      query: {
        startTime: '',
        endTime: '',
        status: ''
      }
    };
  },

  created () {
    this.getList()
    // this.$nextTick(() => {
    //   this.initDataChart()
    // })
  },
  computed: {
    ...mapGetters(["elements", "elTableMediaHeight"]),
  },
  methods: {
    initDataChart () {
      this.staChart = echarts.init(document.getElementById('staChart'))
      this.staChart.setOption(this.staOption)
    },
    getList () {
      this.loading.tableLoading = true;
      let param = {
        submitStartTime:
          this.query.startTime === ""
            ? ""
            : dateUtils.format(this.query.startTime, "YYYY-MM-DD"),
        submitEndTime:
          this.query.endTime === ""
            ? ""
            : dateUtils.format(this.query.endTime, "YYYY-MM-DD"),
        serviceStatus: this.query.status
      }
      console.log(param)
      let self = this
      if (self.staChart) {
        self.staChart.dispose()
        self.staChart = null
      }
      collect(param).then(response => {
        console.log('统计')
        console.log(response)
        if (response.rel === true) {
          self.staOption.xAxis.data = []
          self.staOption.series[0].data = []
          response.data.forEach((element, i) => {
            self.staOption.xAxis.data.push(response.data[i].serviceName) //cusName
            self.staOption.series[0].data.push(response.data[i].serviceQuantity)
          })
          // console.log('self.goodsOptionData')
          // console.log(self.goodsOptionData)
          self.$nextTick(() => {
            self.initDataChart()
          })
        } else {
          this.$notify({
            title: "失败",
            message: response.message,
            type: "error",
            duration: 2000
          });
        }
      })
    },
    closeDialogLogistics () {
      this.dialogFormVisibleLogistics = false
    },
    handleFilter () {
      this.getList()
    },
    exportData () {
      let param = {
        submitStartTime:
          this.query.startTime === ""
            ? ""
            : dateUtils.format(this.query.startTime, "YYYY-MM-DD"),
        submitEndTime:
          this.query.endTime === ""
            ? ""
            : dateUtils.format(this.query.endTime, "YYYY-MM-DD"),
        serviceStatus: this.query.status
      }
      let host = window.location.host
      window.location.href = '//' + host + '/api/ordersys/serviceDetail/export?submitStartTime=' + param.submitStartTime + '&submitEndTime=' + param.submitEndTime + '&serviceStatus=' + param.serviceStatus
    }
  }
};
</script>
<style scoped rel="stylesheet/scss" lang="scss">
.statistics {
  .total {
    color: #48576a;
    font-size: 14px;
    margin: 2px 0;
  }
  .explain {
    font-size: 12px;
    color: #97a8be;
  }
}
.staBox {
  margin-top: 10px;
}
.fr {
  float: right;
}
.staChart {
  width: 100%;
  height: 500px;
}
</style>



