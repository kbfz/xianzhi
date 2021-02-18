<template>
  <div class="app-container calendar-list-container">
    <el-row>
      <!-- 左边 -->
      <el-col :span="18">
        <div class="app-container-left">
          <div class="filter-container">
            <!-- <el-input @keyup.enter.native="handleFilter"
                      style="width: 200px;"
                      class="filter-item"
                      placeholder="客户编码"
                      v-model="query.qstCode"> </el-input> -->
            <el-select @keyup.enter.native="handleFilter"
                       placeholder="请选择客户编码"
                       v-model="query.qstCode"
                       clearable
                       style="width: 200px"
                       popper-class="optionsContent"
                       filterable>
              <el-option v-for="item in selectCustom"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
            <el-input @keyup.enter.native="handleFilter"
                      style="width: 200px;"
                      class="filter-item"
                      placeholder="平台商品编码"
                      v-model="query.complexBarcode"> </el-input>
            <el-input @keyup.enter.native="handleFilter"
                      style="width: 200px;"
                      class="filter-item"
                      placeholder="平台商品名称"
                      v-model="query.complexName"> </el-input>
            <el-button class="filter-item"
                       type="primary"
                       v-waves
                       icon="search"
                       @click="handleFilter">搜索</el-button>
            <el-button class="filter-item"
                       v-if="bdGoodsRelationManager_btn_add"
                       style="margin-left: 10px;"
                       @click="handleCreate"
                       type="primary"
                       icon="edit">添加</el-button>
          </div>
          <el-table :key='tableKey'
                    :data="list"
                    v-loading.body="listLoading"
                    border
                    fit
                    highlight-current-row
                    style="width: 100%"
                    @row-click="detailName"
                    :height="elTableMediaHeight">
            <el-table-column width="150px"
                             align="center"
                             label="客户编码"
                             show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.qstCode}}</span>
              </template>
            </el-table-column>
            <el-table-column width="180px"
                             align="center"
                             label="平台商品编码"
                             show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.complexBarcode}}</span>
              </template>
            </el-table-column>
            <el-table-column width="180px"
                             align="center"
                             label="供应商"
                             show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.supplierName}}</span>
              </template>
            </el-table-column>
            <el-table-column width="180px"
                             align="center"
                             label="平台商品名称"
                             show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.complexName}}</span>
              </template>
            </el-table-column>
            <el-table-column width="150px"
                             align="center"
                             label="HS编码"
                             show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.hsCode}}</span>
              </template>
            </el-table-column>
            <el-table-column width="150px"
                             align="center"
                             label="货号"
                             show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.goodsCode}}</span>
              </template>
            </el-table-column>
            <el-table-column width="160px"
                             align="center"
                             label="商品条形码"
                             show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.barCode}}</span>
              </template>
            </el-table-column>
            <el-table-column width="160px"
                             align="center"
                             label="商品名称"
                             show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.goodsName}}</span>
              </template>
            </el-table-column>
            <el-table-column width="90px"
                             align="center"
                             label="数量"
                             show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.count}}</span>
              </template>
            </el-table-column>

            <el-table-column width="120px"
                             align="center"
                             label="备案单价"
                             show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.originPrice}}</span>
              </template>
            </el-table-column>
            <el-table-column width="120px"
                             align="center"
                             label="商品净重">
              <template scope="scope">
                <span>{{scope.row.netWeight}}</span>
              </template>
            </el-table-column>
            <el-table-column width="140px"
                             align="center"
                             label="法定数量"
                             show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.simpleCount}}</span>
              </template>
            </el-table-column>
             <el-table-column width="140px"
                             align="center"
                             label="法定第一数量"
                             show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.qty1}}</span>
              </template>
            </el-table-column>
             <el-table-column width="140px"
                             align="center"
                             label="法定第二数量"
                             show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.qty2}}</span>
              </template>
            </el-table-column>
            <el-table-column width="100px"
                             align="center"
                             label="数据状态">
              <template scope="scope">
                <span v-if="scope.row.status === 0">无效</span>
                <span v-if="scope.row.status === 1">有效</span>
              </template>
            </el-table-column>
            <el-table-column width="150px"
                             align="center"
                             label="创建时间"
                             show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.inTime}}</span>
              </template>
            </el-table-column>
            <el-table-column width="150px"
                             align="center"
                             label="修改时间"
                             show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.gmtModified}}</span>
              </template>
            </el-table-column>
            <el-table-column width="150px"
                             align="center"
                             label="操作人"
                             show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.operator}}</span>
              </template>
            </el-table-column>
            <!-- <el-table-column width="200px"
                             align="center"
                             label="备注"
                             show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.remark}}</span>
              </template>
            </el-table-column> -->
          </el-table>
          <div v-show="!listLoading"
               class="pagination-container">
            <el-pagination @size-change="handleSizeChange"
                           @current-change="handleCurrentChange"
                           :current-page.sync="listQuery.page"
                           :page-sizes="[10,20,30, 50]"
                           :page-size="listQuery.limit"
                           layout="total, sizes, prev, pager, next, jumper"
                           :total="total"> </el-pagination>
          </div>

        </div>
      </el-col>
      <!-- 右边 -->
      <el-col :span="1">
        <div class="border">
        </div>
      </el-col>
      <el-col :span="5">
        <div class="app-container-right"
             ref="lineHeight">
          <!-- v-on:childMethod="getList"   在子组件里面调用父组件的getList方法 childMethod是子组件里面参数名 -->
          <update-element ref="update"
                          v-on:childMethod="getList"></update-element>
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import {
  page,
  addObj,
  getObj,
  delObj,
  putObj,
  supplierObj,
  selectObj
} from "api/baseDataSys/bdGoodsRelation/index";
import { mapGetters } from "vuex";
var dateUtils = require("silly-datetime");
export default {
  name: "bdGoodsRelation",
  components: {
    // 引入编辑的组件
    "update-element": () => import("./components/update"),
    // "oms": () => import("./components/oms")
  },
  data () {
    return {
      form: {
        qstCode: '',
        complexBarcode: '',
        complexName: '',
        supplierCode: '',
        goodsList: []
      },
      selectCustom: [],
      rules: {
        qstCode: [
          {
            required: true,
            message: "请选择客户编码",
            trigger: "change"
          }
        ],
        complexBarcode: [
          {
            required: true,
            message: "请输入平台商品编码",
            trigger: "blur"
          }
        ],
        complexName: [
          {
            required: true,
            message: "请输入平台商品名称",
            trigger: "blur"
          }
        ],
        supplierCode: [
          {
            required: true,
            message: "请选择供应商编码",
            trigger: "change"
          }
        ],
      },
      list: null,
      total: null,
      listLoading: true,
      query: {
        qstCode: '',
        complexBarcode: '',
        complexName: ''
      },
      loading: {
        tableLoading: false
      },
      listQuery: {
        page: 1,
        limit: 10,
        _type_: 'like',
        orderBy: 'inTimedesc'
      },
      dialogFormVisible: false,
      dialogFormVisibleOms: false,
      dialogStatus: "",
      bdGoodsRelationManager_btn_edit: false,
      bdGoodsRelationManager_btn_del: false,
      bdGoodsRelationManager_btn_add: true,
      textMap: {
        update: "编辑",
        create: "创建"
      },
      tableKey: 0,
      options: [
        {
          label: '无效',
          value: '0'
        },
        {
          label: '有效',
          value: '1'
        }
      ],
      select: {
        customer: [],
        supplierSelect: []
      }
    };
  },
  created () {
    this.getList();
    this.customerName()
    this.supplierCustomer()
    this.bdGoodsRelationManager_btn_edit = this.elements[
      "bdGoodsRelationManager:btn_edit"
    ];
    this.bdGoodsRelationManager_btn_del = this.elements[
      "bdGoodsRelationManager:btn_del"
    ];
    this.bdGoodsRelationManager_btn_add = this.elements[
      "bdGoodsRelationManager:btn_add"
    ];
  },
  computed: {
    ...mapGetters(["elements", "elTableMediaHeight"])
  },
  methods: {
    // 关闭el-dialog 前的回调函数 重置表单
    closeDialog () {
      this.dialogFormVisible = false;
      this.$refs["form"].resetFields();
      this.dialogFormVisibleOms = false;
    },
    // 查看详情
    detailName (row) {
      // this.showDetail = true
      this.$refs.update.formEdit = true;
      this.$refs.update.disabledForm = true;
      this.$refs.update.updateView = true;
      getObj(row.id).then(response => {
        let formData = {
          id: response.data.id,
          qstCode: response.data.qstCode,
          complexBarcode: response.data.complexBarcode,
          complexName: response.data.complexName,
          supplierCode: {
            label: response.data.supplierName,
            value: response.data.supplierCode
          },
          barCode: response.data.barCode,
          originPrice: response.data.originPrice,
          hsCode: response.data.hsCode,
          goodsName: response.data.goodsName,
          count: response.data.count,
          netWeight: response.data.netWeight,
          simpleCount: response.data.simpleCount,
          inTime: response.data.inTime,
          status: response.data.status,
          goodsCode:response.data.goodsCode,
        }
        this.$refs.update.resetFormFields();
        this.$refs.update.form = formData
        // this.$copyJsonProperty(this.$refs.update.form, response.data);
      });
    },
    getList () {
      this.listLoading = true;
      let param = {
        qstCode: $.trim(this.query.qstCode),
        complexBarcode: $.trim(this.query.complexBarcode),
        complexName: $.trim(this.query.complexName),
        ...this.listQuery
      }
      page(param).then(response => {
        this.list = response.data.rows;
        this.total = response.data.total;
        this.listLoading = false;
      });
    },
    handleFilter () {
      this.getList();
      this.$refs.update.resetFormFields();
    },
    handleSizeChange (val) {
      this.listQuery.limit = val;
      this.getList();
    },
    handleCurrentChange (val) {
      this.listQuery.page = val;
      this.getList();
    },
    handleCreate () {
      // this.resetTemp();
      // this.dialogStatus = "create";
      // this.dialogFormVisible = true;
      let self = this
      self.$router.push('/index/baseDataSys/omsOutService')
    },
    handleUpdate (row) {
      getObj(row.indx).then(response => {
        this.form = response.data;
        this.dialogFormVisible = true;
        this.dialogStatus = "update";
      });
    },
    // 客户下拉
    customerName () {
      selectObj().then(response => {
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
    // 供应商下拉
    supplierCustomer () {
      supplierObj().then(response => {
        // this.selectCustom = response.data;
        for (var i = 0; i < response.data.length; i++) {
          let cutObj = {};
          cutObj.label = '(' + response.data[i].value + ')' + ' ' + response.data[i].key
          cutObj.value = response.data[i].value
          this.select.supplierSelect.push(cutObj)
        }
        // console.log(this.selectCustom)
      });
    },
    create (formName) {
      const set = this.$refs;
      set[formName].validate(valid => {
        if (valid) {
          let goodsDetail = []
          let flag = true
          let flag2 = true
          //  console.log(this.form.goodsList)
          this.form.goodsList.forEach((item) => {
            if (item.barCode === '') {
              flag = false
              return
            }
            if (item.goodsName === '') {
              flag2 = false
              return
            }
            goodsDetail.push({ "barCode": item.barCode, "originPrice": item.originPrice, "hsCode": item.hsCode, "goodsName": item.goodsName, "count": item.count, "netWeight": item.netWeight, "simpleCount": item.simpleCount, "status": item.status })

          })
          if (!flag) {
            this.$message({
              showClose: true,
              message: '商品条形码不能为空',
              type: 'warning',
              duration: 2000
            });
            return
          }
          if (!flag2) {
            this.$message({
              showClose: true,
              message: '商品名称不能为空',
              type: 'warning',
              duration: 2000
            });
            return
          }
          if (goodsDetail.length < 1) {
            this.$message({
              showClose: true,
              message: '请至少添加一条商品信息',
              type: 'warning',
              duration: 2000
            });
            return
          }
          this.$confirm('确定要保存吗', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let date = new Date();
            // this.form.createtime = dateUtils.format(date, "YYYY-MM-DD  HH:mm:ss");
            this.form.qstCode = this.form.qstCode.substring(this.form.qstCode.indexOf("(") + 1, this.form.qstCode.indexOf(")"))
            this.form.supplierCode = this.form.supplierCode.substring(this.form.supplierCode.indexOf("(") + 1, this.form.supplierCode.indexOf(")"))
            let param = JSON.parse(JSON.stringify(this.form))
            param.goodsList = goodsDetail
            addObj(param).then((res) => {
              this.dialogFormVisible = false;
              // console.log(param)
              if (res.status === 300) {
                this.$notify({
                  title: "异常",
                  message: "相关编码不存在",
                  type: "error",
                  duration: 2000
                })
                return
              }
              if (res.rel) {
                // console.log(res.rel)
                this.getList();
                this.$notify({
                  title: "成功",
                  message: "创建成功",
                  type: "success",
                  duration: 2000
                });
              } else {
                // console.log(res.rel)
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
            });
          }).catch(() => { })
        } else {
          return false;
        }
      });
    },
    cancel (formName) {
      this.dialogFormVisible = false;
      const set = this.$refs;
      set[formName].resetFields();
    },
    update (formName) {
      const set = this.$refs;
      set[formName].validate(valid => {
        if (valid) {
          this.dialogFormVisible = false;
          this.form.password = undefined;
          putObj(this.form.id, this.form).then(() => {
            this.dialogFormVisible = false;
            this.getList();
            // this.tableClick()
            this.$notify({
              title: "成功",
              message: "创建成功",
              type: "success",
              duration: 2000
            });
          });
        } else {
          return false;
        }
      });
    },
    resetTemp () {
      this.form = {
        qstCode: '',
        complexBarcode: '',
        complexName: '',
        supplierCode: '',
        goodsList: []
      }
    },
    // 添加商品 
    addGoods () {
      this.form.goodsList.push({
        barCode: '',
        originPrice: '',
        hsCode: '',
        goodsName: '',
        count: 1,
        netWeight: 0,
        simpleCount: 1,
        status: '1'
      })
      // console.log(this.form.goodsList)
    },
  }
};
</script>
<style scoped>
.el-form-item {
  /* width: 400px; */
  margin-left: -4%;
}
.borderLine {
  width: 100%;
  position: relative;
}
.goodsInfo {
  float: left;
  margin-left: 15px;
  /* margin-right: 700px */
}
.button {
  float: right;
  position: absolute;
  left: 673px;
  /* margin-right: 0; */
}
.tableLeft {
  margin-left: -3.5%;
}
.el-input,
.el-select {
  width: 200px;
}
/* .tableLeft .el-form-item__content {
    line-height: 40px!important;
    position: relative;
    font-size: 14px;
} */
.inputWin {
  border: none;
  height: 35px;
  border: 1px solid #bfcbd9;
  border-radius: 4px;
  width: 130px;
}
.el-input-number {
  width: 130px;
  height: 40px;
  margin-top: 4px;
}
.borderColor {
  border-bottom: 1px solid #bfcbd9;
  width: 100%;
  margin: 0 auto;
  margin-bottom: 20px;
  padding-bottom: 10px;
  margin-left: -2%;
}
.formLeft {
  padding-left: 4%;
}
/* @media screen and (max-width: 1632px) {
  .el-form-item {
    margin-left: 15px;
    /* width: 400px; */
/* }
  .formLeft {
    padding-left: 1%;
  }
  .tableLeft {
    margin-left: 9%;
  }
  .borderColor {
    border-bottom: 1px solid #bfcbd9;
    width: 82%;
    margin: 0 auto;
    margin-bottom: 20px;
    padding-bottom: 5px;
    margin-left: 9%;
  }
  .button {
    float: right;
    position: absolute;
    left: 520px;
    margin-right: 0; 
  }
} */
/* @media screen and (max-width: 1366px) {
  .el-form-item {
    margin-left: -5px;
    /* width: 400px; */
/* } */
/* .tableLeft {
    margin-left: 3%;
  }
  .borderColor {
    border-bottom: 1px solid #bfcbd9;
    width: 97%;
    margin: 0 auto;
    margin-bottom: 20px;
    padding-bottom: 5px;
    margin-left: 2%;
  }
  .el-input,
  .el-select {
    width: 180px;
  }
} */
</style>


