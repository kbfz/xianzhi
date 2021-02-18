<template>
  <div class="app-container calendar-list-container">
    <router-link to="/index/baseDataSys/goodsRelation">
      <el-button type="primary">
        <i class="el-icon-arrow-left"></i>返回列表</el-button>
    </router-link>
    <!-- <el-dialog :title="textMap[dialogStatus]"
                     :visible.sync="dialogFormVisible"
                     :before-close="closeDialog"
                     :close-on-click-modal="false"
                     class="receiptWidth"> -->
    <el-form :model="form"
             :rules="rules"
             ref="form"
             :label-position="labelPosition"
             :inline="true"
             class="">
      <p>基本信息</p>
      <el-form-item label="客户编码"
                    prop="qstCode"
                    label-width="120px"
                    class="itemwidth">
        <el-select v-model="form.qstCode"
                   placeholder="请选择客户编码"
                   class="filter-item"
                   clearable
                   filterable>
          <el-option v-for="item in select.customer"
                     :key="item.value"
                     :label="item.label"
                     :value="item.label">
          </el-option>
        </el-select>
        <!-- <el-input v-model="form.qstCode"
                          placeholder="请输入客户编码"></el-input> -->
      </el-form-item>
      <el-form-item label="平台商品编码"
                    prop="complexBarcode"
                    label-width="120px"
                    class="itemwidth">
        <el-input v-model="form.complexBarcode"
                  placeholder="请输入平台商品编码"
                  style="width:218px"></el-input>
      </el-form-item>
      <br>
      <el-form-item label="平台商品名称"
                    prop="complexName"
                    label-width="120px"
                    class="itemwidth">
        <el-input v-model="form.complexName"
                  placeholder="请输入平台商品名称"
                  style="width:218px"></el-input>
      </el-form-item>
      <el-form-item label="供应商"
                    label-width="120px"
                    class="itemwidth"
                    prop="supplierCode"
                    @change="changeValue">
        <el-select v-model="form.supplierCode"
                   placeholder="请选择供应商"
                   class="filter-item"
                   clearable
                   filterable>
          <el-option v-for="item in select.supplierSelect"
                     :key="item.value"
                     :label="item.label"
                     :value="item">
          </el-option>
        </el-select>
        <div class="el-form-item__error"
             v-if="textTrue">请选择供应商编码</div>
      </el-form-item>
      <p>添加商品</p>
      <el-form-item class="borderColor">
        <div class="borderLine">
          <!-- <span class="goodsInfo">商品信息</span> -->
          <div class="button">
            <el-button type="primary"
                       @click="addGoods">添加商品</el-button>
          </div>
          <div class="line"></div>
        </div>

      </el-form-item>
      <br>
      <el-form-item class="tableLeft">
        <el-table :key='tableKey'
                  :data="form.goodsList"
                  v-loading.body="listLoading">
          <el-table-column min-width="140px"
                           align="center"
                           label="商品条形码">
            <template scope="scope">
              <span style="cursor: pointer;">{{scope.row.barCode}}</span>
              <!-- <el-input v-model="scope.row.barCode"
                                placeholder="商品条形码"
                                style="width: 130px"></el-input> -->
            </template>
          </el-table-column>
          <el-table-column min-width="160px"
                           align="center"
                           label="自定义货号">
            <template scope="scope">
              <span style="cursor: pointer;">{{scope.row.goodsCode}}</span>
              <!-- <el-input v-model="scope.row.goodsCode"
                        placeholder="自定义货号"
                        style="width: 120px"></el-input> -->
            </template>
          </el-table-column>
          <el-table-column min-width="140px"
                           align="center"
                           label="商品名称">
            <template scope="scope">
              <span style="cursor: pointer;">{{scope.row.goodsName}}</span>
              <!-- <el-input v-model="scope.row.goodsName"
                                placeholder="商品名称"
                                style="width: 130px"></el-input> -->
            </template>
          </el-table-column>
          <el-table-column min-width="125px"
                           align="center"
                           label="HS编码">
            <template scope="scope">
              <span style="cursor: pointer;">{{scope.row.hsCode}}</span>
              <!-- <el-input v-model="scope.row.hsCode"
                                placeholder="HS编码"
                                style="width: 100px"></el-input> -->
            </template>
          </el-table-column>
          <el-table-column min-width="180px"
                           align="center"
                           label="数量">
            <template scope="scope">
              <el-input-number v-model="scope.row.count"
                               :min="1"
                               size="small"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column min-width="110px"
                           align="center"
                           label="备案单价">
            <template scope="scope">
              <span style="cursor: pointer;">{{scope.row.originPrice}}</span>
            </template>
          </el-table-column>
          <el-table-column min-width="110px"
                           align="center"
                           label="商品净重">
            <template scope="scope">
              <span style="cursor: pointer;">{{scope.row.netWeight}}</span>
            </template>
          </el-table-column>
          <el-table-column min-width="130px"
                           align="center"
                           label="法定数量 ">
            <template scope="scope">
              <span style="cursor: pointer;">{{scope.row.simpleCount}}</span>
            </template>
          </el-table-column>
          <el-table-column min-width="130px"
                           align="center"
                           label="法定第一数量 ">
            <template scope="scope">
              <span style="cursor: pointer;">{{scope.row.qtyRate1}}</span>
            </template>
          </el-table-column>
          <el-table-column min-width="130px"
                           align="center"
                           label="法定第二数量 ">
            <template scope="scope">
              <span style="cursor: pointer;">{{scope.row.qtyRate2}}</span>
            </template>
          </el-table-column>
          <el-table-column min-width="120px"
                           align="center"
                           label="数据状态">
            <template scope="scope">
              <el-select v-model="scope.row.status"
                         placeholder="数据状态">
                <el-option v-for="item in options"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column align="center"
                           label="操作"
                           min-width="120px">
            <template scope="scope">
              <el-button type="text"
                         @click="deleteObj(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
    </el-form>
    <div slot="footer"
         class="dialog-footer">
      <el-button @click="cancel('form')">取 消</el-button>
      <el-button type="primary"
                 @click="create('form')">添 加</el-button>
      <!-- <el-button v-else
                         type="primary"
                         @click="update('form')">确 定</el-button> -->
    </div>
    <!-- </el-dialog> -->
    <el-dialog title="添加商品"
               width="100%"
               :visible.sync="dialogFormVisibleOms"
               :before-close="closeDialog"
               :close-on-click-modal="false"
               class="receiptWidth">
      <oms v-on:childMethod="closeDialog"
           ref="omsform"
           @child="getList"></oms>
    </el-dialog>
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
    // "update-element": () => import("./components/update"),
    "oms": () => import("./oms")
  },
  data () {
    return {
      labelPosition: 'left',
      form: {
        qstCode: '',
        complexBarcode: '',
        complexName: '',
        supplierCode: {
          label: '',
          value: ''
        },
        supplierName: '',
        goodsList: []
      },
      textTrue: false,
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
            // trigger: "change"
          }
        ],
      },
      list: null,
      total: null,
      listLoading: false,
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
      // dialogFormVisible: false,
      dialogFormVisibleOms: false,
      dialogStatus: "",
      bdGoodsRelationManager_btn_edit: false,
      bdGoodsRelationManager_btn_del: false,
      bdGoodsRelationManager_btn_add: true,
      tableKey: 0,
      goodobj: {},
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
    // this.getList();
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
      this.dialogFormVisibleOms = false;
      // this.$refs["form"].resetFields();
      this.$refs.omsform.resetTemp()
    },
    getList () {
      this.listLoading = true;
      let item = this.$refs.omsform.goodobj
      this.form.goodsList.push({ "barCode": item.barCode, "goodsName": item.goodsName, "goodsCode": item.goodsNo, "hsCode": item.hsCode, "count": item.count, "originPrice": item.price, "netWeight": item.netWeight, "simpleCount": item.qtyRate2,"qtyRate1": item.qtyRate1,"qtyRate2": item.qtyRate2, "status": "1" })
      this.listLoading = false
    },

    // 客户下拉
    customerName () {
      selectObj().then(response => {
        // this.selectCustom = response.data;
        for (var i = 0; i < response.data.length; i++) {
          let cutObj = {};
          cutObj.label = '(' + response.data[i].value + ')' + ' ' + response.data[i].key
          cutObj.value = response.data[i].value
          this.select.customer.push(cutObj)
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
          // cutObj.label = '(' + response.data[i].value + ')' + ' ' + response.data[i].key
          cutObj.label = response.data[i].key
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
          let goodsDetail = this.form.goodsList
          let flag = true
          let flag2 = true
          let formData = {
            qstCode: this.form.qstCode,
            complexBarcode: this.form.complexBarcode,
            complexName: this.form.complexName,
            supplierCode: this.form.supplierCode.value,
            supplierName: this.form.supplierCode.label,
            goodsList: this.form.goodsList
          }
          // console.log(formData.supplierCode === '')
          if (formData.supplierCode === '' || formData.supplierCode === undefined) {
            this.textTrue = true
            return
          } else {
            this.textTrue = false
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
            formData.qstCode = formData.qstCode.substring(formData.qstCode.indexOf("(") + 1, formData.qstCode.indexOf(")"))
            // formData.supplierCode = formData.supplierCode.substring(formData.supplierCode.indexOf("(") + 1, formData.supplierCode.indexOf(")"))
            // this.form.supplierName = this.form.supplierCode.split(/\(.*?\)/)[1]
            let param = JSON.parse(JSON.stringify(formData))
            param.goodsList = goodsDetail
            addObj(param).then((res) => {
              let self = this
              self.$router.push('/index/baseDataSys/goodsRelation')
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
      // this.dialogFormVisible = false;
      const set = this.$refs;
      set[formName].resetFields();
    },
    // update (formName) {
    //   const set = this.$refs;
    //   set[formName].validate(valid => {
    //     if (valid) {
    //       // this.dialogFormVisible = false;
    //       this.form.password = undefined;
    //       putObj(this.form.id, this.form).then(() => {
    //         // this.dialogFormVisible = false;
    //         this.getList();
    //         // this.tableClick()
    //         this.$notify({
    //           title: "成功",
    //           message: "创建成功",
    //           type: "success",
    //           duration: 2000
    //         });
    //       });
    //     } else {
    //       return false;
    //     }
    //   });
    // },
    //删除
    deleteObj (row) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          delObj(row.id)
            .then(() => {
              this.$notify({
                title: '成功',
                message: '删除成功',
                type: 'success',
                duration: 2000
              });
              const index = this.form.goodsList.indexOf(row);
              this.form.goodsList.splice(index, 1);
            });
        });
    },
    changeValue (val) {
      // console.log(val)
      if (val == '') {
        this.form.supplierCode = { label: '', value: '' }
      } else {
        this.form.supplierName = val.label
      }
    },
    // 添加商品 
    addGoods () {
      this.dialogFormVisibleOms = true;
      // this.form.goodsList.push({
      //   barCode: '',
      //   originPrice: '',
      //   hsCode: '',
      //   goodsName: '',
      //   count: 1,
      //   netWeight: 0,
      //   simpleCount: 1,
      //   status: '1'
      // })
      // console.log(this.form.goodsList)
    },

  }
};
</script>
<style scoped>
.itemwidth {
  width: 25%;
}
.calendar-list-container {
  margin-left: 20px;
}
</style>