<template>
  <div class="app-container calendar-list-container"
       id="app-container">
    <div class="app-container-left">
      <div class="filter-container">
        <el-select placeholder="请选择客户"
                   v-model="query.customerCode"
                   clearable
                   style="width: 200px"
                   popper-class="optionsContent"
                   filterable>
          <el-option v-for="item in selectCustom"
                     :key="item.value"
                     :label="item.label"
                     :value="item.label"></el-option>
        </el-select>
        <el-date-picker type="date"
                        placeholder="请选择开始日期"
                        style="width: 145px;"
                        class="filter-item"
                        popper-class="timeSelect"
                        @keyup.enter.native="handleFilter"
                        format="yyyy-MM-dd"
                        v-model="query.submitStartTime">
        </el-date-picker>
        <el-date-picker type="date"
                        placeholder="请选择结束日期"
                        style="width: 145px;"
                        class="filter-item"
                        popper-class="timeSelect"
                        @keyup.enter.native="handleFilter"
                        format="yyyy-MM-dd"
                        v-model="query.submitEndTime">
        </el-date-picker>
        <el-select placeholder="请选择状态"
                   v-model="query.serviceStatus"
                   clearable
                   style="width: 120px"
                   popper-class="optionsContent"
                   filterable>
          <el-option v-for="item in selectStatus"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value"></el-option>
        </el-select>
        <el-input @keyup.enter.native="handleFilter"
                  style="width: 200px;"
                  class="filter-item"
                  placeholder="请输入申请编号"
                  v-model="query.serviceNumber"> </el-input>
        <el-button class="filter-item"
                   type="primary"
                   v-waves
                   icon="search"
                   @click="handleFilter">查询</el-button>
        <!-- <div class="fr"> -->
        <el-button class="filter-item"
                   type="primary"
                   v-waves
                   style="margin-left: 5px"
                   @click="applyItem">申请增值服务</el-button>
        <!-- </div> -->
      </div>
      <div class="contentHeight"
           ref="contentHeight">
        <div class="borderContent"
             :class="{'borderHeight': item.serviceStatus === -2}"
             v-for="item in list"
             :key="item.id">
          <div class="contentTop"
               :class="{'mbootm': item.serviceStatus === -2}">
            <div class="contentLeft">
              <span>状态：
                <span class="textColor"
                      v-if="item.serviceStatus === 0">待核对</span>
                <span class="fukan"
                      v-if="item.serviceStatus === 1">待付款</span>
                <span class="color3"
                      v-if="item.serviceStatus === 3">已付款</span>
                <span class="color4"
                      v-if="item.serviceStatus === -3">已撤销</span>
                <span class="color4"
                      v-if="item.serviceStatus === -2">已拒绝</span>
              </span>
              <span class="borderColor">|</span>
              <span style="white-space: nowrap;display:inline-block;max-width:200px;overflow:hidden;text-overflow:ellipsis;height:16px; cursor: pointer;" :title="item.customerName">客户：{{item.customerName}}</span>
              <span class="borderColor">|</span>
              <span>编号：{{item.serviceNumber}}</span>
              <span class="borderColor">|</span>
              <span>时间：{{item.submitTime}}</span>
              <span class="borderColor">|</span>
              <span>申请人：{{item.submitUser}}</span>
              <span class="jujueInfo"
                    v-if="item.serviceStatus === -2">拒绝原因：{{item.statusExplain}}</span>
            </div>
            <div class="contentRight">
              <el-button type="text"
                         :disabled="item.serviceStatus !== 0"
                         v-if="item.serviceStatus !== -3 && item.serviceStatus !== -2"
                         @click="updateServices(item)">编辑</el-button>
              <el-button type="text"
                         v-if="item.serviceStatus === -2 || item.serviceStatus === -3"
                         @click="newApplyService(item)">重新申请</el-button>
                <span class="borderColor"
                    v-if="item.serviceStatus !== 0 && item.serviceStatus !== 1 && item.serviceStatus !== 3">|</span>
              <el-button type="text"
                         v-if="item.serviceStatus === -2 || item.serviceStatus === -3"
                         @click="delServices(item)">删除</el-button>
              <span class="borderColor"
                    v-if="item.serviceStatus !== -2 && item.serviceStatus !== -3">|</span>
              <el-button type="text"
                         :disabled="item.serviceStatus !== 0"
                         v-if="item.serviceStatus !== -2 && item.serviceStatus !== -3"
                         @click="cancelServices(item)">撤销</el-button>
            </div>
          </div>
          <div class="serviceTeam">
            <ul>
              <li v-for="test in item.serviceDetailList"
                  :key="test.explains">
                {{test.explains}}
              </li>
            </ul>
          </div>
          <div class="contentMoney">
            <span>总计：{{item.serviceTotal}}</span>
            <span>应付金额：{{item.payableTotal}}</span>
            <span v-if="item.serviceStatus !== 3">实付金额：</span>
            <span v-if="item.serviceStatus === 3">实付金额：{{item.payableTotal}}</span>
          </div>
        </div>
      </div>
      <div class="pagination-container">
        <el-pagination @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page.sync="listQuery.page"
                       :page-sizes="[5,10,15, 20]"
                       :page-size="listQuery.limit"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="total">
        </el-pagination>
      </div>
      <!-- 申请增值服务 -->
      <el-dialog title="申请增值服务"
                 :visible.sync="dialogFormVisibleLogistics"
                 :before-close="closeDialogLogistics"
                 :close-on-click-modal="false"
                 class="fixdialog">
        <apply-services ref="loginForm"
                        v-on:childMethod="getList"
                        @child="closeDialogLogistics"> </apply-services>
      </el-dialog>
      <!-- 编辑 -->
      <el-dialog :title="textMap[dialogStatus]"
                 :visible.sync="dialogFormVisibleUpdate"
                 :before-close="closeDialogUpdate"
                 :close-on-click-modal="false"
                 class="fixdialog">
        <update ref="updateForm"
                v-on:childMethod="getList"
                @child="closeDialogUpdate"> </update>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import {
  page,
  changeObj,
  customerObj,
  delObjNew
} from "api/addService/myaddService/index";
import { mapGetters } from "vuex";
import $ from "jquery";
var dateUtils = require("silly-datetime");
export default {
  name: "myaddService",
  components: {
    // 引入申请增值服务的组件
    "apply-services": () => import("./components/applyServices.vue"),
    'update': () => import("./components/update.vue"),
  },
  data () {
    return {
      textMap: {
        update: '编辑',
        create: '重新申请'
      },
      dialogStatus: '',
      selectStatus: [
        {
          value: 0,
          label: '待核对'

        },
        {
          value: 1,
          label: '待付款'

        },
        {
          value: 3,
          label: '已付款'
        },
        {
          value: -3,
          label: '已撤销'
        },
        {
          value: -2,
          label: '已拒绝'

        },
      ],
      selectCustom: [],
      showUpdata: true,
      showOrder: false,
      // 订单数据
      total: 0,
      list: [],
      tableContent: [],
      // total: null,
      loading: {
        tableLoading: false
      },
      query: {
        customerCode: '',
        serviceStatus: "",
        serviceNumber: "",
        submitStartTime: '',
        submitEndTime: ''
      },
      listQuery: {
        page: 1,
        limit: 5,
        orderBy: 'createTimedesc'
      },
      sellBsorderHeadManager_btn_edit: false,
      sellBsorderHeadManager_btn_del: true,
      sellBsorderHeadManager_btn_add: false,
      dialogFormVisibleLogistics: false,
      dialogFormVisibleUpdate: false,
      chooseList: []
    };
  },
  mounted () {
    let self = this
    this.$refs.contentHeight.style.height = window.innerHeight * 0.68 + "px"
    window.onresize = () => {
      self.$refs.contentHeight.style.height = window.innerHeight * 0.68 + "px"
    }
  },
  created () {
    this.getList();
    this.customerName()
    this.sellBsorderHeadManager_btn_edit = this.elements[
      "sellBsorderHeadManager:btn_edit"
    ];
    this.sellBsorderHeadManager_btn_add = this.elements[
      "sellBsorderHeadManager:btn_add"
    ];
  },
  computed: {
    ...mapGetters(["elements", "elTableMediaHeight"]),
  },
  methods: {
    // 客户下拉选择
    customerName () {
      customerObj().then(response => {
        // this.selectCustom = response.data;
        for (var i = 0; i < response.data.length; i++) {
          let cutObj = {};
          cutObj.label = '(' + response.data[i].value + ')' + ' ' + response.data[i].key
          cutObj.value = response.data[i].value
          this.selectCustom.push(cutObj)
        }
        // console.log(this.selectCustom)
      });
    },
    getList () {
      this.loading.tableLoading = true;
      let param = {
        serviceNumber: $.trim(this.query.serviceNumber),
        serviceStatus: this.query.serviceStatus,
        customerCode: this.query.customerCode.substring(this.query.customerCode.indexOf("(") + 1, this.query.customerCode.indexOf(")")),
        submitStartTime:
          this.query.submitStartTime === ""
            ? ""
            : dateUtils.format(this.query.submitStartTime, "YYYY-MM-DD"),
        submitEndTime:
          this.query.submitEndTime === ""
            ? ""
            : dateUtils.format(this.query.submitEndTime, "YYYY-MM-DD"),
        ...this.listQuery
      };
      page(param).then(response => {
        this.loading.tableLoading = false;
        this.list = response.data.rows;
        this.total = response.data.total;
      });
    },
    closeServices () {
      this.dialogFormVisibleLogistics = false
    },
    closeDialogLogistics () {
      this.dialogFormVisibleLogistics = false
      this.$refs.loginForm.chooseArr = []
      this.$refs.loginForm.customerCode = ''
    },
    closeDialogUpdate () {
      this.dialogFormVisibleUpdate = false
    },
    handleFilter () {
      this.getList();
    },
    handleSizeChange (val) {
      this.listQuery.limit = val;
      this.getList();
    },
    handleCurrentChange (val) {
      this.listQuery.page = val;
      this.getList();
    },
    // 申请增值服务
    applyItem () {
      this.dialogFormVisibleLogistics = true
    },
    // 编辑
    updateServices (item) {
      this.dialogFormVisibleUpdate = true
      this.dialogStatus = 'update';
      this.$nextTick(() => {
        this.$refs.updateForm.form.serviceDetailList = []
        this.$refs.updateForm.applyStatus = true
        this.$refs.updateForm.newApplyStatus = false
        this.$refs.updateForm.form.id = item.id
        this.$refs.updateForm.form.customerCode = '(' + item.customerCode + ')' + ' ' + item.customerName
        for (var i = 0; i < item.serviceDetailList.length; i++) {
          let arrObj = {
            'serviceName': item.serviceDetailList[i].serviceName, 'serviceQuantity': item.serviceDetailList[i].serviceQuantity, 'serviceUnit': item.serviceDetailList[i].serviceUnit, 'unitPrice': item.serviceDetailList[i].unitPrice, 'description': item.serviceDetailList[i].description, 'minQuantity': item.serviceDetailList[i].minQuantity,   'serviceCodeId':item.serviceDetailList[i].serviceCodeId       }
          this.$refs.updateForm.form.serviceDetailList.push(arrObj)
        }
      })
    },
    // 重新申请
    newApplyService (item) {
      this.dialogFormVisibleUpdate = true
      this.dialogStatus = 'create';
      this.$nextTick(() => {
        this.$refs.updateForm.form.serviceDetailList = []
        this.$refs.updateForm.applyStatus = false
        this.$refs.updateForm.newApplyStatus = true
        this.$refs.updateForm.form.id = item.id
        this.$refs.updateForm.form.customerCode = '(' + item.customerCode + ')' + ' ' + item.customerName
        for (var i = 0; i < item.serviceDetailList.length; i++) {
          let arrObj = {
            'serviceName': item.serviceDetailList[i].serviceName, 'serviceQuantity': item.serviceDetailList[i].serviceQuantity, 'serviceUnit': item.serviceDetailList[i].serviceUnit, 'unitPrice': item.serviceDetailList[i].unitPrice, 'description': item.serviceDetailList[i].description, 'minQuantity': item.serviceDetailList[i].minQuantity,    'serviceCodeId':item.serviceDetailList[i].serviceCodeId      }
          this.$refs.updateForm.form.serviceDetailList.push(arrObj)
        }
      })
    },
    // 撤销
    cancelServices (item) {
      this.$confirm('撤销后，此服务将作废，确定要撤销?', '撤销确认', {
        confirmButtonText: '撤销',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let param = {
          id: item.id,
          serviceStatus: -3
        }
        changeObj(param).then(res => {
          if (res.rel) {
            this.$notify({
              title: "成功",
              message: "撤销成功",
              type: "success",
              duration: 2000
            });
            this.getList()
          } else {
            this.$notify({
              title: "失败",
              message: "系统异常",
              type: "error",
              duration: 2000
            });
          }
          if (res.status !== 200) {
            this.$notify({
              title: "失败",
              message: res.message,
              type: "error",
              duration: 2000
            });
          }
        })
      })
    },
        // 删除
    delServices (item) {
      this.$confirm('确定要删除?', '删除确认', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delObjNew(item.id).then(res => {
          if (res.rel) {
            this.$notify({
              title: "成功",
              message: "删除成功",
              type: "success",
              duration: 2000
            });
            this.getList()
          } else {
            this.$notify({
              title: "失败",
              message: "系统异常",
              type: "error",
              duration: 2000
            });
          }
          if (res.status !== 200) {
            this.$notify({
              title: "失败",
              message: res.message,
              type: "error",
              duration: 2000
            });
          }
        })
      })
    }
  }
};
</script>
<style scoped rel="stylesheet/scss" lang="scss">
.el-table {
  overflow: hidden;
  width: 100%;
  max-width: 100%;
  background-color: #fff;
  border: 1px solid #dfe6ec;
  font-size: 14px;
  color: #1f2d3d;
  cursor: pointer;
}
// 右侧背景颜色
.lineHeight {
  height: 20px;
}
.btnMb {
  margin-bottom: 5px;
  float: right;
  margin-right: 15px;
  margin-top: 10px;
}
.btnMb button {
  margin-left: 15px;
}
.topImg {
  width: 80px;
  margin: 0 auto;
}
.orderText {
  margin-top: 50px;
  text-align: center;
  font-size: 16px;
  color: #666;
  padding-bottom: 30px;
  span {
    font-weight: 700;
  }
}
.fr {
  float: right;
}
.contentHeight {
  overflow: auto;
}
.borderContent {
  width: 100%;
  // height: 202px;
  overflow: hidden;
  border: 1px solid #bfcbd9;
  margin-bottom: 20px;
  .contentTop {
    margin-top: 15px;
    margin-left: 15px;
    margin-right: 15px;
    padding-bottom: 30px;
    border-bottom: 1px solid #bfcbd9;
  }
  .contentLeft {
    float: left;
    span {
      color: #333333;
      font-size: 14px;
    }
    .textColor {
      color: #ffc000;
    }
    .fukan {
      color: #1abc9c;
    }
    .hedui {
      color: #00ceff;
    }
    .color3 {
      color: #0026ff;
    }
    .color4 {
      color: red;
    }
    .borderColor {
      color: #cccccc;
      font-size: 12px;
      margin-left: 4px;
      margin-right: 4px;
     
    }
    .customerText {
      white-space:  nowrap;
      display:  inline-block;
      max-width:  300px;
      overflow:  hidden;
      text-overflow:  ellipsis;
      height:  16px;
    }
  }
  .contentRight {
    float: right;
    margin-top: -8px;
    .borderColor {
      color: #cccccc;
      font-size: 12px;
      margin-left: 4px;
      margin-right: 4px;
    }
  }
  .jujueInfo {
    margin-top: 5px;
    display: block;
  }
  .mbootm {
    margin-top: 15px;
    margin-left: 15px;
    margin-right: 15px;
    padding-bottom: 50px;
    border-bottom: 1px solid #bfcbd9;
  }
  .serviceTeam {
    width: 100%;
    overflow: hidden;
    ul {
      width: 100%;
      overflow: hidden;
      margin: 0;
      padding: 0;
      li {
        float: left;
        border: 1px solid #797979;
        border-radius: 4px;
        text-align: center;
        line-height: 42px;
        height: 42px;
        background: #f2f2f2;
        color: #333333;
        font-size: 14px;
        padding-left: 10px;
        padding-right: 10px;
        margin-left: 15px;
        margin-top: 15px;
      }
    }
  }
  .contentMoney {
    width: 100%;
    overflow: hidden;
    padding-left: 15px;
    padding-right: 15px;
    margin-bottom: 10px;
    span {
      display: block;
      color: #333;
      font-size: 14px;
      margin-top: 10px;
    }
  }
}
.borderHeight {
   overflow: hidden;
}
</style>



