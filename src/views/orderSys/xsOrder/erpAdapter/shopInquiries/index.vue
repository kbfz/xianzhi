<template>
  <div class="app-container calendar-list-container"
       id="app-container">
    <div class="app-container-left">
      <div class="filter-container">
        <!-- <el-input @keyup.enter.native="handleFilter"
                  style="width: 200px;"
                  class="filter-item"
                  placeholder="请输入客户编码"
                  clearable
                  v-model="query.qstCode"> </el-input> -->
        <el-select placeholder="请选择客户名称"
                       v-model="query.qstCode"
                       clearable
                       style="width: 200px"
                       filterable
                       popper-class="optionsContent">
              <el-option v-for="item in selectCustom"
                         :key="item.value"
                         :lable="item.label"
                         :value="item.label"></el-option>
            </el-select>
        <el-input @keyup.enter.native="handleFilter"
                  style="width: 200px;"
                  class="filter-item"
                  placeholder="请输入店铺名称"
                  clearable
                  v-model="query.popName"> </el-input>
        <el-input @keyup.enter.native="handleFilter"
                  style="width: 200px;"
                  class="filter-item"
                  placeholder="请输入店铺ID"
                  clearable
                  v-model="query.kdtId"> </el-input>
        <el-select placeholder="请选择平台类型"
                   v-model="query.popType"
                   popper-class="optionsContent"
                   clearable
                   style="width: 200px"
                   filterable>
          <el-option v-for="item in select.status"
                     :key="item.value"
                     :value="item.value"
                     :label="item.label"></el-option>
        </el-select>
        <el-button class="filter-item"
                   type="primary"
                   v-waves
                   icon="search"
                   @click="handleFilter">查询</el-button>
        <el-button class="filter-item"
                   type="primary"
                   @click="addDiction"
                   icon="edit">新增</el-button>
      </div>
      <el-table :data="list"
                v-loading="loading.tableLoading"
                element-loading-text="正在加载中......"
                border
                fit
                highlight-current-row
                style="width: 100%;"
                :class="{'tabLayout': listClass}"
                :height="elTableMediaHeight">
        <el-table-column label="店铺Id"
                         align="center"
                         show-overflow-tooltip
                         min-width="150">
          <template scope="scope">
            <span>{{scope.row.kdtId}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center"
                         label="店铺名称"
                         show-overflow-tooltip
                         min-width="180">
          <template scope="scope">
            <span style="cursor: pointer;">{{scope.row.popName}}</span>
          </template>
        </el-table-column>
        <el-table-column label="平台类型"
                         align="center"
                         show-overflow-tooltip
                         min-width="160">
          <template scope="scope">
                  <span style="cursor: pointer;"
                  v-if="scope.row.popType === 'YZ'">有赞</span>
            <span style="cursor: pointer;"
                  v-if="scope.row.popType === 'KL'">考拉</span>
            <span style="cursor: pointer;"
                  v-if="scope.row.popType === 'PDD'">拼多多</span>
            <span style="cursor: pointer;"
                  v-if="scope.row.popType === 'SN'">苏宁易购</span>
            <span style="cursor: pointer;"
                  v-if="scope.row.popType === 'HQBS'">环球捕手</span>
            <span style="cursor: pointer;"
                  v-if="scope.row.popType === 'YT'">一条</span>
            <span style="cursor: pointer;"
                  v-if="scope.row.popType === 'YO'">宝妈时光</span>
            <span style="cursor: pointer;"
                  v-if="scope.row.popType === 'HZW'">孩子王</span>
            <span style="cursor: pointer;"
                  v-if="scope.row.popType === 'WN'">唯妮</span>
                   <span style="cursor: pointer;"
                  v-if="scope.row.popType === 'HPK'">海拍客</span>
          </template>
        </el-table-column>
        <el-table-column align="center"
                         label="客户编码"
                         show-overflow-tooltip
                         min-width="180">
          <template scope="scope">
            <span style="cursor: pointer;">{{scope.row.qstCode}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center"
                         label="店铺状态"
                         show-overflow-tooltip
                         min-width="150">
          <template scope="scope">
            <span style="cursor: pointer;"
                  v-if="scope.row.status === true">开启</span>
            <span style="cursor: pointer;"
                  v-if="scope.row.status === false ">关闭</span>
          </template>
        </el-table-column>
        <el-table-column align="center"
                         label="清关类型"
                         show-overflow-tooltip
                         min-width="150">
          <template scope="scope">
            <span style="cursor: pointer;"
                  v-if="scope.row.clearanceType === 1">未清关</span>
            <span style="cursor: pointer;"
                  v-if="scope.row.clearanceType === 2">已清关</span>
          </template>
        </el-table-column>

        <el-table-column align="center"
                         label="授权"
                         show-overflow-tooltip
                         min-width="180">
          <template scope="scope">
            <span style="cursor: pointer;color: #20a0ff;" @click="openOtherLink(scope.row.qstCode)">授权</span>
          </template>
        </el-table-column>

        <el-table-column align="center"
                         label="仓库打包标识"
                         show-overflow-tooltip
                         min-width="180">
          <template scope="scope">
            <span style="cursor: pointer;">{{scope.row.printSet}}</span>
          </template>
        </el-table-column>

        <el-table-column align="center"
                         label="创建时间"
                         show-overflow-tooltip
                         min-width="180">
          <template scope="scope">
            <span style="cursor: pointer;">{{scope.row.gmtCreate}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作"
                         show-overflow-tooltip
                         min-width="120"
                         align="center">
          <template scope="scope">
            <el-button type="text"
                       @click="update(scope.row)">
              编辑
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-container">
        <el-pagination @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page.sync="listQuery.page"
                       :page-sizes="[10,20,30, 50]"
                       :page-size="listQuery.rows"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="totalNum">
        </el-pagination>
      </div>
      <!-- 修改 -->
      <el-dialog :title="nameInfo"
                 :visible.sync="dialogFormVisible"
                 :before-close="closeDialog"
                 :close-on-click-modal="false"
                 class="receiptSupplier">
        <el-form :model="form"
                 :rules="rules"
                 ref="form"
                 :inline="true"
                 label-width="120px">
          <el-form-item label="店铺ID"
                        prop="kdtId">
            <el-input v-model="form.kdtId"
                      placeholder="请输入店铺ID"
                      style="width:200px"
                      :disabled="formEdit"></el-input>
          </el-form-item>
          <el-form-item label="店铺名称"
                        prop="popName">
            <el-input v-model="form.popName"
                      placeholder="请输入店铺名称"
                      style="width:200px"></el-input>
          </el-form-item>
          <el-form-item label="客户编码">
            <el-select placeholder="请选择客户编码"
                       v-model="form.qstCode"
                       clearable
                       style="width: 200px"
                       filterable>
              <el-option v-for="item in selectCustom"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="仓库打包标识"
                        v-if="isShowc">
            <el-input v-model="form.printSet"
                      placeholder="请输入仓库打包标识"
                      style="width:200px"></el-input>
          </el-form-item>
          <el-form-item label="清关类型"
                        prop="clearanceType"
                        v-if="isShowc">
            <el-select placeholder="请选择清关类型"
                       v-model="form.clearanceType"
                       clearable
                       style="width: 200px"
                       filterable>
              <el-option v-for="item in select.clearType"
                         :key="item.value"
                         :value="item.value"
                         :label="item.label"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="店铺状态"
                        prop="status"
                        v-if="isShowc">
            <el-select placeholder="请选择店铺活跃状态"
                       v-model="form.status"
                       clearable
                       style="width: 200px"
                       filterable>
              <el-option v-for="item in select.statusType"
                         :key="item.value"
                         :value="item.value"
                         :label="item.label"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属平台"
                        prop="popType"
                        v-if="isShowp">
            <el-select placeholder="请选择所属平台"
                       v-model="form.popType"
                       clearable
                       style="width: 200px"
                       filterable>
              <el-option v-for="item in select.status"
                         :key="item.value"
                         :value="item.value"
                         :label="item.label"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="客户唯一标识"
                        v-if="isShowp"
                        prop="appkey">
            <el-input v-model="form.appkey"
                      placeholder="请输入客户唯一标识"
                      style="width:200px"></el-input>
          </el-form-item>
          <el-form-item label="客户秘钥"
                        v-if="isShowp"
                        prop="appsecret">
            <el-input v-model="form.appsecret"
                      placeholder="请输入客户秘钥"
                      style="width:200px"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer"
             class="dialog-footer center">
          <el-button @click="closeDialog">取消</el-button>
          <el-button type="primary"
                     v-if="nameInfo == '编辑'"
                     @click="sumbitForm">提交</el-button>
          <el-button v-else
                     type="primary"
                     @click="sumbitAddForm">确 定</el-button>
        </div>
      </el-dialog>

    </div>
  </div>
</template>
<script>
import {
  page,
  updateObj,
  customerSelect,
  addObj
} from "api/orderSys/xsOrder/erpAdapter/shopInquiries/idnex.js";
import { mapGetters } from "vuex";
import $ from "jquery";
var dateUtils = require("silly-datetime");
export default {
  name: "erpOrder",
  data () {
    return {
      showUpdata: true,
      showOrder: false,
      isShowc: false,
      isShowp: false,
      // 订单数据
      totalNum: 0,
      list: [],
      tableContent: [],
      nameInfo: '',
      // totalNum: null,
      loading: {
        tableLoading: false
      },
      query: {
        popType: "",
        qstCode: '',
        kdtId: '',
        popName: ''
        // logisticsNo: ""
      },
      dialogFormVisible: false,
      listQuery: {
        page: 1,
        rows: 10
      },
      selectCustom: [],
      rules: {
        kdtId: [
          {
            required: true,
            message: "请输入店铺ID",
            trigger: "blur"
          }
        ],
        qstCode: [
          {
            required: true,
            message: "请输入客户编码",
            trigger: "blur"
          }
        ],
        popName: [
          {
            required: true,
            message: "请输入店铺名称",
            trigger: "blur"
          }
        ],
        clearanceType: [{
          required: true,
          message: "请选择清关类型",
          // trigger: "change"
        }
        ],
        status: [
          {
            required: true,
            message: "请选择店铺状态",
            // trigger: "change"
          }
        ],
        popType: [
          {
            required: true,
            message: "请选择所属平台",
            // trigger: "change"
          }
        ],
        appsecret: [
          {
            required: true,
            message: "请输入客户秘钥",
            trigger: "blur"
          }
        ],
        appkey: [
          {
            required: true,
            message: "请输入客户唯一标识",
            trigger: "blur"
          }
        ],
      },
      select: {
        status: [
          {
            value: 'YZ',
            label: '有赞'
          },
          {
            value: 'KL',
            label: '考拉'
          },
          {
            value: 'PDD',
            label: '拼多多'
          },
          {
            value: 'SN',
            label: '苏宁易购'
          },
          {
            value: 'HQBS',
            label: '环球捕手'
          },
          {
            value: 'YT',
            label: '一条'
          },
          {
            value: 'YO',
            label: '宝妈时光'
          },
          {
            value: 'HZW',
            label: '孩子王'
          },
          {
            value: 'WN',
            label: '唯呢'
          },
          {
            value: 'HPK',
            label: '海拍客'
          }
        ],
        clearType: [
          {
            value: 1,
            label: '未清关'
          },
          {
            value: 2,
            label: '已清关'
          }
        ],
        statusType: [
          {
            value: 1,
            label: '开启'
          },
          {
            value: 0,
            label: '关闭'
          }
        ]

      },
      form: {
        kdtId: '',
        popName: "",
        qstCode: "",
        clearanceType: "",
        printSet: "",
        status: "",
        popType: '',
        appkey: '',
        appsecret: ''
      },
      tableKey: 0,
      listClass: true
    };
  },
  created () {
    this.getList();
    this.customerName()
  },

  computed: {
    ...mapGetters(["elements", "elTableMediaHeight"])
  },
  methods: {
    getList () {
      this.loading.tableLoading = true;
      let param = {
        popType: this.query.popType,
        qstCode: this.query.qstCode.substring(this.query.qstCode.indexOf("(") + 1, this.query.qstCode.indexOf(")")),
        kdtId: this.query.kdtId,
        popName: this.query.popName,
        ...this.listQuery
      }
      page(param).then(response => {
        this.loading.tableLoading = false;
        this.list = response.data;
        this.totalNum = response.totalNum;
      });
    },
    // 授权
    openOtherLink(code) {
        let link = `https://mms.pinduoduo.com/open.html?client_id=b8e0a4591f214763a3be90cb0c9b1251&redirect_uri=https://pdd.dongdamen.net/&response_type=code&state=${code}`
        window.open(link, '_blank');
    },
    handleFilter () {
      this.getList();
    },
    handleSizeChange (val) {
      this.listQuery.rows = val;
      this.getList();
    },
    handleCurrentChange (val) {
      this.listQuery.page = val;
      this.getList();
    },
    closeDialog () {
      this.dialogFormVisible = false;
      this.$refs['form'].resetFields();
    },
    // 新增
    addDiction () {
      this.isShowp = true
      this.isShowc = false
      this.formEdit = false;
      this.resetTemp();
      // this.BillNameInfo ();
      this.nameInfo = '新增'
      this.dialogFormVisible = true
      // this.hide = false
    },
    update (row) {
      this.formEdit = true;
      this.isShowc = true
      this.isShowp = false
      this.form.kdtId = row.kdtId
      this.form.popName = row.popName
      this.form.qstCode = row.qstCode
      this.form.clearanceType = row.clearanceType
      this.form.printSet = row.printSet
      if (row.status === true) {
        this.form.status = 1
      } else if (row.status === false) {
        this.form.status = 0
      }
      this.dialogFormVisible = true
      this.nameInfo = '编辑'
    },
    // 客户下拉选择
    customerName () {
      customerSelect().then(response => {
        for (var i = 0; i < response.data.length; i++) {
          let cutObj = {};
          cutObj.label = '(' + response.data[i].value + ')' + ' ' + response.data[i].key
          cutObj.value = response.data[i].value
          this.selectCustom.push(cutObj)
        }
      });
    },
    sumbitForm () {
      let param = {
        kdtId: this.form.kdtId,
        popName: this.form.popName,
        qstCode: this.form.qstCode,
        clearanceType: this.form.clearanceType,
        printSet: this.form.printSet,
        status: this.form.status,
      }
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.$confirm('确定要修改吗', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            updateObj(param).then((res) => {
              this.dialogFormVisible = false;
              if (res.code === 200) {
                this.$notify({
                  title: "成功",
                  message: "修改成功",
                  type: "success",
                  duration: 2000
                });
                this.getList();
              } else {
                this.$notify({
                  title: "失败",
                  message: "系统异常",
                  type: "error",
                  duration: 2000
                });
              }
            });
          }).catch(() => { })
        } else {
          return false;
        }
      });
    },
    sumbitAddForm () {
      let param = {
        kdtId: this.form.kdtId,
        popName: this.form.popName,
        qstCode: this.form.qstCode,
        popType: this.form.popType,
        appkey: this.form.appkey,
        appsecret: this.form.appsecret,
      }
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.$confirm('确定要新增吗', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            addObj(param).then((res) => {
              this.dialogFormVisible = false;
              if (res.code === 200) {
                this.$notify({
                  title: "成功",
                  message: "新增成功",
                  type: "success",
                  duration: 2000
                });
                this.getList();
              } else {
                this.$notify({
                  title: "失败",
                  message: res.msg,
                  type: "error",
                  duration: 2000
                });
              }
            });
          }).catch(() => { })
        } else {
          return false;
        }
      });
    },
    resetTemp () {
      this.form = {
        kdtId: '',
        popName: "",
        qstCode: "",
        clearanceType: "",
        printSet: "",
        status: "",
        popType: '',
        appkey: '',
        appsecret: ''
      }
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
.btnCancel .el-button {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #c4c4c4;
  color: #1f2d3d;
  margin: 0;
  padding: 8px 8px;
  border-radius: 4px;
}
.btnCancel .el-button--primary {
  color: #fff;
  background-color: #20a0ff;
  border-color: #20a0ff;
}
.btnMb {
  margin-bottom: 5px;
  // float: right;
  margin-right: 15px;
  margin-top: 10px;
  text-align: right;
}
.btnMb button {
  margin-left: 15px;
}
</style>


   
