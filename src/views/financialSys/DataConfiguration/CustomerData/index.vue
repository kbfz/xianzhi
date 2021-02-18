<template>
  <div class="app-container calendar-list-container"
       id="app-container">
    <el-row>
      <!-- 左边 -->
      <el-col :span="24">
        <div class="app-container-left">
          <div class="filter-container">
            <el-select v-model="query.cusCbeName"
                       placeholder="请选择客户"
                       class="filter-item"
                       popper-class="optionsContent"
                       clearable>
              <el-option v-for="item in select.customer"
                         :key="item.value"
                         :label="item.label"
                         :value="item.label">
              </el-option>
            </el-select>
            <el-button class="filter-item"
                       type="primary"
                       v-waves
                       icon="search"
                       @click="handleFilter">查询</el-button>
            <div class="btnMb">
              <el-button class="filter-item"
                         type="primary"
                         @click="addDiction">新增</el-button>
            </div>
            <el-table :data="list"
                      v-loading="loading.tableLoading"
                      element-loading-text="正在加载中......"
                      border
                      fit
                      highlight-current-row
                      style="width: 100%"
                      :height="elTableMediaHeight"
                      @selection-change="on_page_select">
              <el-table-column min-width="200px"
                               align="center"
                               label="账单类型名称"
                               show-overflow-tooltip>
                <template scope="scope">
                  <span style="cursor: pointer;">{{scope.row.billTypeName}}</span>
                </template>
              </el-table-column>
              <el-table-column min-width="200px"
                               align="center"
                               label="客户名称"
                               show-overflow-tooltip>
                <template scope="scope">
                  <span style="cursor: pointer;">{{scope.row.cusCbeName}}</span>
                </template>
              </el-table-column>
              <el-table-column min-width="180px"
                               align="center"
                               label="月账期"
                               show-overflow-tooltip>
                <template scope="scope">
                  <!-- <span style="cursor: pointer;"
                        v-if="scope.row.fixDate===0 ">{{scope.row.selfDate}}</span>
                  <span style="cursor: pointer;"
                        v-else-if="scope.row.selfDate===0 ">{{scope.row.fixDate}}</span> -->
                         <span style="cursor: pointer;">{{scope.row.setDateRows}}</span>
                  <!-- scope.row.selfDate===null -->
                </template>
              </el-table-column>
              <el-table-column label="操作"
                               min-width="180px"
                               align="center">
                <template scope="scope">
                  <el-button type="text"
                             @click="handleUpdate(scope.row)">编辑</el-button>
                  <el-button type="text"
                             @click="handleDelete(scope.row)">删除</el-button>

                </template>
              </el-table-column>
            </el-table>
            <div class="pagination-container">
              <el-pagination @size-change="handleSizeChange"
                             @current-change="handleCurrentChange"
                             :current-page.sync="listQuery.page"
                             :page-sizes="[10,20,30, 50]"
                             :page-size="listQuery.limit"
                             layout="total, sizes, prev, pager, next, jumper"
                             :total="total">
              </el-pagination>
            </div>
            <!--增加客户数据配置 -->
            <el-dialog :title="nameInfo"
                       :visible.sync="dialogFormVisible"
                       :before-close="closeDialog"
                       :close-on-click-modal="false"
                       class="receiptSupplier">
              <el-form :model="form"
                       :rules="rules"
                       ref="form"
                       class="customerdata"
                       label-width="110px">
                <el-form-item label="所属客户："
                              style="width:100%"
                              prop="cusCbeName"
                              >
                              <!-- v-if="nameInfo == '编辑客户信息' " ? disabled -->
                  <el-select placeholder="请选择客户"
                             style="width:350px"
                             v-model="form.cusCbeName"
                             filterable
                             :disabled="formEdit">
                    <el-option v-for="item in select.customer"
                               :key="item.value"
                               :value="item"
                               :label="item.label"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label-width="20px">
                  <el-checkbox :indeterminate="isIndeterminate"
                               v-model="checkAll"
                               @change="handleCheckAllChange">全选</el-checkbox>
                  <div style="margin: 15px 0;"></div>
                  <el-checkbox-group v-model="form.exportItem"
                                     @change="handleCheckedbillsChange"
                                     class="billcheck">
                    <el-checkbox v-for="item in billOptions"
                                 :label="item.field"
                                 :key="item.field">{{item.name}}</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item label="账单类型："
                              style="width:100%"
                              prop="billTypeName">
                  <el-select placeholder="请选择账单类型"
                             style="width:350px"
                             v-model="form.billTypeName"
                             filterable
                             clearable
                             :disabled="formEdit">
                    <el-option v-for="item in select.billName"
                               :key="item.value"
                               :value="item"
                               :label="item.label"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="月账期："
                              style="width:45%; display: inline-block;"
                              prop="exportDateRows">
                  <el-select placeholder="请选择月账期模式"
                             v-model="form.exportDateRows"
                             filterable
                             clearable>
                    <el-option v-for="item in datatype"
                               :key="item.value"
                               :value="item.value"
                               :label="item.label"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label-width="0"
                              style="width:25%;display: inline-block;"
                              prop="setDateRows">
                  <el-select class="filter-item"
                             placeholder="请选择时间"
                             v-model="form.setDateRows"
                             clearable>
                    <el-option v-for="item in  select.states"
                               :key="item.value"
                               :label="item.label"
                               :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>

              </el-form>
              <div slot="footer"
                   class="dialog-footer">
                <el-button @click="cancel('form')">取 消</el-button>
                <el-button v-if="nameInfo == '添加客户信息'"
                           type="primary"
                           @click="create('form')">确 定</el-button>
                <el-button v-else
                           type="primary"
                           @click="update('form')">确 定</el-button>
              </div>
            </el-dialog>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import {
  page,
  selectObj,
  checkbox,
  getObj,
  addObj,
  delObj,
  setInfo
} from "api/financialSys/DataConfiguration/CustomerData/index";
import { mapGetters } from "vuex";
import $ from "jquery";
var dateUtils = require("silly-datetime");
export default {
  name: "CustomerData",
  components: {
    // 引入编辑的组件
    // "contrast-status": () => import("./components/contrastStatus.vue")
  },
  data () {
    return {
      formEdit: false,
      checkAll: false,
      billOptions: [],
      // bills: billOptions,
      isIndeterminate: true,
      total: 0,
      loading: {
        tableLoading: false
      },
      list: [],
      listQuery: {
        page: 1,
        limit: 10,
      },
      query: {
        cusCbeName: ''
      },
      nameInfo: '',
      form: {
        id: '',
        cusCbeName: '',
        billTypeName: '',
        exportItem: [],
        exportDateRows: '',
        setDateRows: ''
      },
      select: {
        customer: [],
        billName: [],
        states: []
      },
      dialogFormVisible: false,
      rules: {
        // cusCbeName: [
        //   {
        //     required: true,
        //     message: '请选择所属客户',
        //     trigger: 'change',
        //   }
        // ],
        // billTypeName: [
        //   {
        //     required: true,
        //     message: '请选择账单类型',
        //     trigger: 'change'
        //   }
        // ],
        // exportDateRows: [
        //   {
        //     required: true,
        //     message: '请选择月账期模式',
        //     trigger: 'change'
        //   }
        // ],
        // setDateRows: [
        //   {
        //     required: true,
        //     message: '请选择时间',
        //     trigger: 'change'
        //   }
        // ]
      },
      datatype: [
        {
          value: 1,
          label: '按月账期'
        },
        {
          value: 2,
          label: '自定义账期'
        }
      ]
    };
  },
  created () {
    this.getList();
    this.customerNameInfo();
    // this.BillTypeInfo();
    this.BillNameInfo();
    this.DateTypeInfo()

  },
  computed: {
    ...mapGetters(["elements", "elTableMediaHeight"]),
  },
  methods: {
    getList () {
      this.listLoading = true;
      let param = {
        cusCbeName: this.query.cusCbeName,
        ...this.listQuery
      };
      page(param).then(response => {
        this.list = response.data.rows;
        // console.log(333)
        // console.log(response.data.rows)
        this.total = response.data.total;
        this.listLoading = false;
        // console.log(response.data.rows)
      });
    },
    handleFilter () {
      this.getList();
      // this.orderTotal()
    },
    handleSizeChange (val) {
      this.listQuery.limit = val;
      this.getList();
    },
    handleCurrentChange (val) {
      this.listQuery.page = val;
      this.getList();
    },
    on_page_select (val) {
      this.pageChoose = val
    },

    handleCheckAllChange (event) {
      let options = []
      for (var i = 0; i < this.billOptions.length; i++) {
        let fieldoption = {}
        fieldoption = this.billOptions[i].field
        options.push(fieldoption)
      }
      this.form.exportItem = event.target.checked ? options : [];
      this.isIndeterminate = false;
      // console.log(111)
      // console.log(val)
      // console.log(111)
    },
    handleCheckedbillsChange (value) {
      // console.log(this.billOptions.length)
      let checkedCount = value.length;
      // this.form.checkedbills=value;
      this.checkAll = checkedCount === this.billOptions.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.billOptions.length;

      // console.log(this.form.checkedbills)
    },

    // 获取客户信息
    customerNameInfo () {
      let param = {}
      selectObj(param).then(response => {
        for (var i = 0; i < response.data.customerRows.length; i++) {
          let nameObj = {}
          nameObj.label = response.data.customerRows[i].cusCbeName
          nameObj.value = response.data.customerRows[i].cusCbeCode
          this.select.customer.push(nameObj)
        }
      })
    },
    // 获取账单类型
    BillNameInfo () {
      let param = {}
      selectObj(param).then(response => {
        for (var i = 0; i < response.data.exportTypeRows.length; i++) {
          let BillNameObj = {}
          BillNameObj.label = response.data.exportTypeRows[i].name
          BillNameObj.value = response.data.exportTypeRows[i].id
          this.select.billName.push(BillNameObj)
        }
      })
    },
    //多选框获取
    BillTypeInfo () {
      this.billOptions = []
      let param = {}
      checkbox(param).then(response => {
        for (var i = 0; i < response.data.rows.length; i++) {
          let billObj = {}
          billObj.name = response.data.rows[i].name
          billObj.field = response.data.rows[i].field
          this.billOptions.push(billObj)
        }
      })
    },
    //月账期时间获取
    DateTypeInfo () {
      let param = {}
      selectObj(param).then(response => {
        for (var i = 0; i < response.data.setDateRows.length; i++) {
          let dateObj = {}
          dateObj.value = response.data.setDateRows[i].value
          dateObj.label = response.data.setDateRows[i].label
          // console.log(billObj)
          this.select.states.push(dateObj)
        }
      })
    },

    // 关闭按钮 
    closeDialog () {
      this.dialogFormVisible = false
      this.$refs['form'].resetFields()
    },
    cancel (formName) {
      this.dialogFormVisible = false;
      const set = this.$refs;
      set[formName].resetFields();
    },
    // 新增
    addDiction () {
      this.formEdit = false;
      this.resetTemp();
      this.BillTypeInfo();
      // this.BillNameInfo ();
      this.nameInfo = '添加客户信息'
      this.dialogFormVisible = true
      // this.hide = false
    },
    //编辑
    handleUpdate (row) {
      this.formEdit = true;
      let self = this
      getObj(row.id).then(response => {
        // console.log(response.data.fixDate)
        self.form = response.data;
        console.log(2122)
        console.log(response.data)
        self.form.exportItem = response.data.exportItem
        self.select.customer.forEach((element, i) => {
          if(self.form.cusCbeCode === self.select.customer[i].value){
            self.form.cusCbeName = self.select.customer[i]
          }
        })
        self.select.billName.forEach((element, i) => {
          if(self.form.billTypeId === self.select.billName[i].value){
            self.form.billTypeName = self.select.billName[i]
          }
        })
        // console.log(this.form)
        
        // console.log(response.data.exportItem)
        // if (response.data.fixDate == 0) {
        //   self.form.exportDateRows = 1;
        //   self.form.setDateRows = response.data.selfDate
        // } else if (response.data.selfDate == 0) {
        //   self.form.exportDateRows = 2;
        //   self.form.setDateRows = response.data.fixDate
        // }
        self.$nextTick(() => {
          this.BillTypeInfo()
        })
        this.dialogFormVisible = true
        this.nameInfo = "编辑客户信息"
      });
      // this.BillTypeInfo ();
      // this.BillNameInfo ();
    },
    update (formName) {
      const set = this.$refs;
      set[formName].validate(valid => {
        if (valid) {
          let nForm = {
            id: '',
            cusCbeName: '',
            cusCbeCode: '',
            billTypeName: '',
            billTypeId: '',
            exportItem: [],
            exportDateRows: '',
            setDateRows: ''
          }
          nForm.id = this.form.id
          nForm.cusCbeName = this.form.cusCbeName.label
          nForm.cusCbeCode = this.form.cusCbeName.value
          nForm.billTypeName = this.form.billTypeName.label
          nForm.billTypeId = this.form.billTypeName.value
          nForm.exportItem = this.form.exportItem
          nForm.exportDateRows = this.form.exportDateRows
          nForm.setDateRows = this.form.setDateRows
          console.log(222)
          console.log(nForm)
          if (!nForm.cusCbeName) {
            this.$notify({
              title: "提示",
              message: "所属客户不能为空！",
              type: "error",
              duration: 2000
            });
            return false
          } 
          if (!nForm.billTypeName) {
            this.$notify({
              title: "提示",
              message: "账单类型不能为空！",
              type: "error",
              duration: 2000
            });
            return false
          } 
          if (!nForm.exportDateRows) {
            this.$notify({
              title: "提示",
              message: "月账期不能为空！",
              type: "error",
              duration: 2000
            });
            return false
          }
          if (!nForm.setDateRows) {
            this.$notify({
              title: "提示",
              message: "月账期不能为空！",
              type: "error",
              duration: 2000
            });
            return false
          }
          setInfo(nForm)
            .then((response) => {
              this.dialogFormVisible = false;
              this.getList();
              if (response.status === 1) {
                this.$notify({
                  title: "失败",
                  message: "配置项用户+账单类型重复！",
                  type: "error",
                  duration: 2000
                });
                return false
              }
              if (response.rel) {
                this.$notify({
                  title: "成功",
                  message: "修改成功",
                  type: "success",
                  duration: 2000
                });
              } else {
                this.$notify({
                  title: "失败",
                  message: "系统异常",
                  type: "error",
                  duration: 2000
                });
              }
            })
        }
      });
    },

    create (formName) {
      const set = this.$refs;
      set[formName].validate(valid => {
        if (valid) {
          let nForm = {
            cusCbeName: '',
            cusCbeCode: '',
            billTypeName: '',
            billTypeId: '',
            exportItem: [],
            exportDateRows: '',
            setDateRows: ''
          }
          nForm.cusCbeName = this.form.cusCbeName.label
          nForm.cusCbeCode = this.form.cusCbeName.value
          nForm.billTypeName = this.form.billTypeName.label
          nForm.billTypeId = this.form.billTypeName.value
          nForm.exportItem = this.form.exportItem
          nForm.exportDateRows = this.form.exportDateRows
          nForm.setDateRows = this.form.setDateRows
          console.log(1111)
          console.log(nForm)
          if (!nForm.cusCbeName) {
            this.$notify({
              title: "提示",
              message: "所属客户不能为空！",
              type: "error",
              duration: 2000
            });
            return false
          } 
          if (!nForm.billTypeName) {
            this.$notify({
              title: "提示",
              message: "账单类型不能为空！",
              type: "error",
              duration: 2000
            });
            return false
          } 
          if (!nForm.exportDateRows) {
            this.$notify({
              title: "提示",
              message: "月账期模式不能为空！",
              type: "error",
              duration: 2000
            });
            return false
          }
          if (!nForm.setDateRows) {
            this.$notify({
              title: "提示",
              message: "月账期时间不能为空！",
              type: "error",
              duration: 2000
            });
            return false
          }
          addObj(nForm)
            .then((response) => {
              this.dialogFormVisible = false;
              this.getList();
              if (response.status === 1) {
                this.$notify({
                  title: "失败",
                  message: "配置项用户+账单类型重复！",
                  type: "error",
                  duration: 2000
                });
                return false
              }
              if (response.rel) {
                this.$notify({
                  title: "成功",
                  message: "新增成功",
                  type: "success",
                  duration: 2000
                });
              } else {
                this.$notify({
                  title: "失败",
                  message: "系统异常",
                  type: "error",
                  duration: 2000
                });
              }
            })
        }
      });
    },

    //删除
    handleDelete(row) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        delObj(row.id).then(() => {
          this.$notify({
            title: "成功",
            message: "删除成功",
            type: "success",
            duration: 2000
          });
          const index = this.list.indexOf(row);
          this.list.splice(index, 1);
        }).catch(() => {});
      });
    },
    // 保存
    // saveDiction () {
    //   this.$refs["form"].validate(valid => {
    //     if (!valid) {
    //       return false;
    //     } else {
    //       this.$confirm("确定要保存吗", "提示", {
    //         confirmButtonText: "确定",
    //         cancelButtonText: "取消",
    //         type: "warning"
    //       }).then(() => {
    //         addObj(this.form).then(response => {
    //           this.getList();
    //           this.$refs['form'].resetFields()
    //           this.dialogFormVisible = false;
    //           //  console.log(response)
    //           if (response.status === 1) {
    //             this.$notify({
    //               title: "失败",
    //               message: "配置项用户+账单类型重复！",
    //               type: "error",
    //               duration: 2000
    //             });
    //             return
    //           }
    //           if (response.rel) {
    //             this.$notify({
    //               title: "成功",
    //               message: "保存成功",
    //               type: "success",
    //               duration: 2000
    //             });
    //           } else {
    //             this.$notify({
    //               title: "失败",
    //               message: "系统异常",
    //               type: "error",
    //               duration: 2000
    //             });
    //           }
    //         });
    //       }).catch(() => { });
    //     }
    //   });
    // },

    resetTemp () {
      this.form = {
        cusCbeName: '',
        billTypeName: '',
        exportItem: [],
        exportDateRows: '',
        setDateRows: ''
      }
    }
  }
};
</script>
<style scoped rel="stylesheet/scss" lang="scss">
// 右侧背景颜色
.lineHeight {
  height: 20px;
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
.el-input,
.el-select {
  width: 200px;
}
.dialog-footer {
  text-align: right;
  margin-top: -20px;
}
.btnSize {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  color: #fff;
  margin: 0;
  padding: 6px 14px;
  border-radius: 4px;
  margin-right: 3px;
  text-align: center;
  margin-top: 1px;
  margin-left: 4px;
}
</style>



