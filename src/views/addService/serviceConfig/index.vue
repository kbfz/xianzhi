<template>
  <div class="app-container calendar-list-container"
       id="app-container">
    <div class="app-container-left">
      <div class="filter-container">
        <el-input @keyup.enter.native="handleFilter"
                  style="width: 200px;"
                  class="filter-item"
                  placeholder="请输入增值服务名称"
                  v-model="query.serviceName"> </el-input>
        <!-- <el-select placeholder="请选择收款状态"
                   v-model="query.userStatus"
                   clearable
                   style="width: 200px"
                   filterable>
          <el-option v-for="item in selectCollection"
                     :key="item.value"
                     :value="item.value"
                     :label="item.label"></el-option>
        </el-select> -->
        <el-button class="filter-item"
                   type="primary"
                   v-waves
                   icon="search"
                   @click="handleFilter">查询</el-button>
        <el-button class="filter-item addcss"
                   type="primary"
                   v-waves
                   @click="addService">添加增值服务</el-button>
      </div>
      <el-table :data="list"
                v-loading="loading.tableLoading"
                element-loading-text="正在加载中......"
                border
                fit
                highlight-current-row
                style="width: 100%"
                :height="elTableMediaHeight">
        <el-table-column min-width="180"
                         align="center"
                         label="增值服务名称"
                         show-overflow-tooltip>
          <template scope="scope">
            <span style="cursor: pointer;">{{scope.row.serviceName}}</span>
          </template>
        </el-table-column>

        <el-table-column min-width="150"
                         align="center"
                         label="计量单位"
                         show-overflow-tooltip>
          <template scope="scope">
            <!-- <span style="cursor: pointer;">{{scope.row.logisticsNo}}</span> -->
            <span style="cursor: pointer;">{{scope.row.serviceUnit}}</span>
          </template>
        </el-table-column>
        <el-table-column min-width="140"
                         align="center"
                         label="单位价格（元）"
                         show-overflow-tooltip>
          <template scope="scope">
            <span style="cursor: pointer;">{{scope.row.unitPrice}}</span>
          </template>
        </el-table-column>
        <el-table-column min-width="130"
                         align="center"
                         label="最低购买数量"
                         show-overflow-tooltip>
          <template scope="scope">
            <span style="cursor: pointer;">{{scope.row.minQuantity}}</span>
          </template>
        </el-table-column>
        <el-table-column min-width="130"
                         align="center"
                         label="仓库是否参与"
                         show-overflow-tooltip>
          <template scope="scope">
            <span style="cursor: pointer;" v-if="scope.row.isWmsOperate == 0">否</span>
              <span style="cursor: pointer;" v-if="scope.row.isWmsOperate == 1">是</span>
          </template>
        </el-table-column>
        <el-table-column min-width="200"
                         align="center"
                         label="服务说明"
                         class-name="descName">
          <template scope="scope">
            <span style="cursor: pointer;">{{scope.row.description}}</span>
          </template>
        </el-table-column>
        <el-table-column min-width="120"
                         align="center"
                         label="状态"
                         show-overflow-tooltip>
          <template scope="scope">
            <span style="cursor: pointer;"
                  v-if="scope.row.status === 0">禁用</span>
            <span style="cursor: pointer;"
                  v-if="scope.row.status === 1">正常</span>
          </template>
        </el-table-column>
        <el-table-column align="center"
                         label="操作"
                         width="150">
          <template scope="scope">
            <el-button type="text"
                       @click="deleteDiction(scope.row)"
                       v-if="scope.row.status === 1"> 禁用
            </el-button>
            <el-button type="text"
                       @click="deleteReturn(scope.row)"
                       v-if="scope.row.status === 0"> 启用
            </el-button>
            <el-button type="text"
                       @click="setup(scope.row)"> 编辑
            </el-button>
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
    </div>
    <el-dialog :title="textMap[dialogStatus]"
               :visible.sync="dialogFormVisible"
               :close-on-click-modal="false"
               :before-close="closeDialogDetail"
               class="receiptWidth600">
      <el-form :model="form"
               ref="form"
               :rules="rules"
               label-width="100px">
        <el-form-item label="增值服务名称："
                      label-width="120px"
                      prop="serviceName">
          <el-input v-model="form.serviceName"
                    autocomplete="off"
                    placeholder="请输入增值服务名称"></el-input>
        </el-form-item>
        <el-form-item label="计量单位："
                      label-width="120px"
                      prop="serviceUnit">
          <el-input v-model="form.serviceUnit"
                    autocomplete="off"
                    placeholder="请输入计量单位"></el-input>
        </el-form-item>
        <el-form-item label="增值服务单价："
                      label-width="120px"
                      prop="unitPrice">
          <el-input v-model="form.unitPrice"
                    autocomplete="off"
                    placeholder="请输入增值服务单价"></el-input>
        </el-form-item>
        <p class="zhushi">请保留小数点后两位，例如：10000.00</p>
        <el-form-item label="最低购买数量："
                      label-width="120px"
                      prop="minQuantity">
          <el-input v-model="form.minQuantity"
                    autocomplete="off"
                    placeholder="请输入最低购买数量"></el-input>
        </el-form-item>
        <p class="zhushi">请输入整数；0表示没有限制</p>
        <el-form-item label="增值服务状态："
                      label-width="120px"
                      prop="status">
          <el-select placeholder="请选择服务状态"
                     v-model="form.status"
                     clearable
                     filterable
                     style="width: 100%">
            <el-option v-for="item in selectStatus"
                       :key="item.value"
                       :value="item.value"
                       :label="item.label"></el-option>
          </el-select>
        </el-form-item>
         <el-form-item label="仓库是否参与:"
                      label-width="120px"
                      prop="isWmsOperate">
          <el-select placeholder="请选择仓库是否参与"
                     v-model="form.isWmsOperate"
                     clearable
                     filterable
                     style="width: 100%">
            <el-option v-for="item in selectWmsOperate"
                       :key="item.value"
                       :value="item.value"
                       :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="增值服务说明："
                      label-width="120px">
          <el-input v-model="form.description"
                    type="textarea"
                    :rows="3"
                    placeholder="请输入增值服务说明"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="cancel('form')">取 消</el-button>
        <el-button v-if="dialogStatus=='add'"
                   type="primary"
                   @click="addObj('form')">确 定</el-button>
        <el-button v-else
                   type="primary"
                   @click="updatedObj('form')">确 定</el-button>
        <!-- <el-button type="primary"
                   @click="dialogFormVisible = false">确 定</el-button> -->
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  page,
  putObj,
  getObj,
  addObj,
  reviseObj
  // selectObj
} from "api/addService/serviceConfig/index";
import { mapGetters } from "vuex";
import $ from "jquery";
import { numberValidator } from "utils/validate";
var dateUtils = require("silly-datetime");
export default {
  components: {
    //   // 引入编辑的组件
    // "login-order": () => import("./compoments/loginOrder"),
  },
  name: "sellBsorderHead",
  data () {
    return {
      total: 0,
      list: [],
      loading: {
        tableLoading: false
      },
      query: {
        serviceName: '',
        userStatus: '',
      },
      listQuery: {
        page: 1,
        limit: 10,
      },
      textMap: {
        add: '添加增值服务',
        update: '编辑增值服务'
      },
      dialogStatus: '',
      dialogFormVisible: false,
      form: {
        serviceName: '',
        serviceUnit: '',
        unitPrice: '',
        minQuantity: '',
        status: '',
        description: '',
        isWmsOperate: ''
      },
      rules: {
        serviceName: [
          {
            required: true,
            message: "请输入增值服务名称",
            trigger: "blur"
          }
        ],
        serviceUnit: [
          {
            required: true,
            message: "请输入计量单位",
            trigger: "blur"
          }
        ],
        unitPrice: [
          {
            required: true,
            message: "请输入增值服务单价",
            trigger: "blur"
          },
          {
            validator: numberValidator,
            trigger: "blur"
          }
        ],
        minQuantity: [
          {
            required: true,
            message: "请输入最低购买数量",
            trigger: "blur"
          },
          {
            validator: numberValidator,
            trigger: "blur"
          }
        ],
        status: [
          {
            required: true,
            message: "请选择增值状态",
            // trigger: "change"
          }
        ],
        isWmsOperate: [
          {
                 required: true,
            message: "请选择仓库是否参与",
          }
        ]
      },
      selectCollection: [
        {
          value: '1',
          label: '全部状态'
        },
        {
          value: '2',
          label: '未收款'
        },
        {
          value: '3',
          label: '已收款'
        },
      ],
      selectWmsOperate: [
          {
          value: 1,
          label: '是'
        },
        {
          value: 0,
          label: '否'
        }
      ],
      selectStatus: [
        {
          value: 0,
          label: '禁用'
        },
        {
          value: 1,
          label: '正常'
        }
      ],
    };
  },
  computed: {
    ...mapGetters(["elements", "elTableMediaHeight", "name"])
  },
  created () {
    this.getList();
  },
  methods: {
    getList () {
      this.loading.tableLoading = true;
      let param = {
        serviceName: this.query.serviceName,
        userStatus: this.query.userStatus,
        ...this.listQuery
      };
      page(param).then(response => {
        this.loading.tableLoading = false;
        this.list = response.data.rows;
        //  console.log(1111)
        // console.log(this.list)
        this.total = response.data.total;
      });
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
    closeDialogDetail () {
      this.dialogFormVisible = false;
      this.$refs['form'].resetFields();
    },
    //新增
    addService () {
      this.resetTemp();
      this.dialogStatus = "add";
      this.dialogFormVisible = true;
    },
    addObj (form) {
      // if (!form.serviceName) {
      //   this.$notify({
      //     title: "提示",
      //     message: '请输入增值服务名称',
      //     type: "error",
      //     duration: 2000
      //   })
      //   return false
      // }
      // if (!form.serviceUnit) {
      //   this.$notify({
      //     title: "提示",
      //     message: '请输入计量单位',
      //     type: "error",
      //     duration: 2000
      //   })
      //   return false
      // }
      // if (!form.unitPrice) {
      //   this.$notify({
      //     title: "提示",
      //     message: '请输入增值服务单价',
      //     type: "error",
      //     duration: 2000
      //   })
      //   return false
      // }
      // if (!form.minQuantity) {
      //   this.$notify({
      //     title: "提示",
      //     message: '请输入最低购买数量',
      //     type: "error",
      //     duration: 2000
      //   })
      //   return false
      // }
      // if (!form.status) {
      //   this.$notify({
      //     title: "提示",
      //     message: '请选择增值状态',
      //     type: "error",
      //     duration: 2000
      //   })
      //   return false
      // }
      const set = this.$refs;
      set[form].validate(valid => {
        if (valid) {
        this.$confirm('确定要保存吗？', '操作确认', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          addObj(this.form).then(res => {
            this.dialogFormVisible = false;
            if (res.rel) {
              this.$notify({
                title: "成功",
                message: "修改成功",
                type: "success",
                duration: 2000
              });
              this.getList();
              this.$refs['form'].resetFields();
            } else {
              this.$notify({
                title: "失败",
                message: "系统异常",
                type: "error",
                duration: 2000
              });
             this.$refs['form'].resetFields();
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
        }).catch(() => { })
        // if (valid) {
        // addObj(this.form)
        // .then(() => {
        // this.dialogFormVisible = false;
        // this.getList();
        // this.$notify({
        // title: '成功',
        // message: '添加成功',
        // type: 'success',
        // duration: 2000
        // });
        // })
        // } else {
        // return false;
        // }
        } else {
        return false;
        }
      });
    },
    //编辑
    setup (row) {
      getObj(row.id)
        .then(response => {
          this.dialogFormVisible = true;
          this.dialogStatus = 'update';
          this.form = response.data;
        });
    },
    updatedObj (form) {
      const set = this.$refs;
      set[form].validate(valid => {
         if (valid) {
        // const set = this.$refs;
        this.$confirm('确定要保存吗？', '操作确认', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          reviseObj(this.form.id, this.form).then(res => {
            this.dialogFormVisible = false;
            if (res.rel) {
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
            if (res.status !== 200) {
              this.$notify({
                title: "失败",
                message: res.message,
                type: "error",
                duration: 2000
              });
            }
          })
        }).catch(() => { })
        // if (valid) {
        // reviseObj(this.form.id,this.form)
        // .then(() => {
        // this.dialogFormVisible = false;
        // this.getList();
        // this.$notify({
        // title: '成功',
        // message: '修改成功',
        // type: 'success',
        // duration: 2000
        // });
        // })
        // } else {
        // return false;
        // }
        } else {
        return false;
        }
      });
    },

    cancel (form) {
      this.dialogFormVisible = false;
      this.resetTemp()
     this.$refs['form'].resetFields();
    },
    deleteDiction (row) {
      this.$confirm('禁用后，客户将无法申请该增值服务，确定要禁用？', '禁用确认', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let param = { id: row.id }
        putObj(param).then(response => {
          this.$notify({
            title: '成功',
            message: '禁用成功',
            type: 'success'
          });
          this.getList()
        })
      }).catch(() => { })
    },
    deleteReturn (row) {
      this.$confirm('确认要启用该项吗', '启用确认', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let param = { id: row.id }
        putObj(param).then(response => {
          this.$notify({
            title: '成功',
            message: '启用成功',
            type: 'success'
          });
          this.getList()
        })
      }).catch(() => { })
    },

    resetTemp () {
      this.form = {
        serviceName: '',
        serviceUnit: '',
        unitPrice: '',
        minQuantity: '',
        status: '',
        description: '',
        isWmsOperate: ''
      }
    },

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
.zhushi {
  font-size: 12px;
  color: #bfcbd9;
  padding-left: 120px;
  margin-top: -8px;
  margin-bottom: 20px;
}
.addcss {
  float: right;
}
.el-tooltip__popper.is-dark {
  width: 400px;
}
</style>



