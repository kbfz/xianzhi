<template>
  <div class="app-container calendar-list-container">
    <el-row>
      <!-- 左边 -->
      <el-col :span="18">
        <div class="app-container-left">
          <div class="filter-container">
            <el-input @keyup.enter.native="handleFilter"
                      style="width: 200px;"
                      class="filter-item"
                      placeholder="支付企业名称"
                      v-model="query.copName"> </el-input>
            <el-input @keyup.enter.native="handleFilter"
                      style="width: 200px;"
                      class="filter-item"
                      placeholder="支付企业编码"
                      v-model="query.qstCode"> </el-input>
            <el-button class="filter-item"
                       type="primary"
                       v-waves
                       icon="search"
                       @click="handleFilter">搜索</el-button>
            <el-button class="filter-item"
                       v-if="bdPaymentManager_btn_add"
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
            <el-table-column min-width="180px"
                             align="center"
                             label="支付企业名称"
                             show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.copName}}</span>
              </template>
            </el-table-column>
            <el-table-column min-width="150px"
                             align="center"
                             label="支付企业编码"
                             show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.qstCode}}</span>
              </template>
            </el-table-column>
            <!-- <el-table-column width="150px"
                             align="center"
                             label="第三方编码"
                             show-overflow-tooltip
                             >
              <template scope="scope">
                <span>{{scope.row.outCode}}</span>
              </template>
            </el-table-column>

            <el-table-column width="150px"
                             align="center"
                             label="企业传输编码"
                             show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.copCode}}</span>
              </template>
            </el-table-column>
            <el-table-column width="200px"
                             align="center"
                             label="企业传输ID"
                             show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.dxpId}}</span>
              </template>
            </el-table-column> -->
            <el-table-column min-width="150px"
                             align="center"
                             label="海关名称"
                             show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.cusPaymentName}}</span>
              </template>
            </el-table-column>
            <el-table-column min-width="150px"
                             align="center"
                             label="海关编码"
                             show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.cusPaymentCode}}</span>
              </template>
            </el-table-column>
            <!-- <el-table-column width="200px"
                             align="center"
                             label="国检名称">
              <template scope="scope">
                <span>{{scope.row.ciqPaymentName}}</span>
              </template>
            </el-table-column>
            <el-table-column width="150px"
                             align="center"
                             label="国检编码"
                             show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.ciqPaymentCode}}</span>
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
          <el-dialog :title="textMap[dialogStatus]"
                     :visible.sync="dialogFormVisible"
                     :before-close="closeDialog"
                     :close-on-click-modal="false"
                     class="receiptSupplier">
            <el-form :model="form"
                     :rules="rules"
                     ref="form"
                     label-width="120px"
                     :inline="true"
                     class="formLeft">
              <!-- <el-form-item label="支付企业编码" prop="qstCode">
      <el-input v-model="form.qstCode" placeholder="请输入支付企业编码"></el-input>
    </el-form-item> -->
              <el-form-item label="支付企业名称"
                            prop="copName">
                <el-input v-model="form.copName"
                          placeholder="请输入支付企业名称"></el-input>
              </el-form-item>
              <!-- <el-form-item label="第三方编码"
                            prop="outCode">
                <el-input v-model="form.outCode"
                          placeholder="请输入第三方编码"></el-input>
              </el-form-item>
              <el-form-item label="企业传输ID"
                            prop="dxpId">
                <el-input v-model="form.dxpId"
                          placeholder="请输入企业传输ID"></el-input>
              </el-form-item>

              <el-form-item label="企业传输编码"
                            prop="copCode">
                <el-input v-model="form.copCode"
                          placeholder="请输入企业传输编码"></el-input>
              </el-form-item> -->
              <el-form-item label="海关名称"
                            prop="cusPaymentName">
                <el-input v-model="form.cusPaymentName"
                          placeholder="请输入海关名称"></el-input>
              </el-form-item>
              <el-form-item label="海关编码"
                            prop="cusPaymentCode">
                <el-input v-model="form.cusPaymentCode"
                          placeholder="请输入海关编码"></el-input>
              </el-form-item>
              <!-- <el-form-item label="国检名称"
                            prop="ciqPaymentName">
                <el-input v-model="form.ciqPaymentName"
                          placeholder="请输入国检名称"></el-input>
              </el-form-item> -->
              <!-- <el-form-item label="国检编码"
                            prop="ciqPaymentCode">
                <el-input v-model="form.ciqPaymentCode"
                          placeholder="请输入国检编码"></el-input>
              </el-form-item> -->

            </el-form>
            <div slot="footer"
                 class="dialog-footer">
              <el-button @click="cancel('form')">取 消</el-button>
              <el-button v-if="dialogStatus=='create'"
                         type="primary"
                         @click="create('form')">确 定</el-button>
              <el-button v-else
                         type="primary"
                         @click="update('form')">确 定</el-button>
            </div>
          </el-dialog>
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
  putObj
} from "api/baseDataSys/bdPayment/index";
import { mapGetters } from "vuex";
export default {
  name: "bdPayment",
  components: {
    // 引入编辑的组件
    "update-element": () => import("./components/update")
  },
  data () {
    return {
      form: {
        // qstCode: undefined,
        // outCode: undefined,
        cusPaymentName: undefined,
        cusPaymentCode: undefined,
        // ciqPaymentName: undefined,
        // ciqPaymentCode: undefined,
        copName: undefined,
        // copCode: undefined,
        // dxpId: undefined
      },
      rules: {
        // outCode: [
        //   {
        //     required: true,
        //     message: "请输入第三方编码",
        //     trigger: "blur"
        //   }
        // ],
        cusPaymentName: [
          {
            required: true,
            message: "请输入海关名称",
            trigger: "blur"
          }
        ],
        cusPaymentCode: [
          {
            required: true,
            message: "请输入海关编码",
            trigger: "blur"
          }
        ],
        // ciqPaymentName: [
        //   {
        //     required: true,
        //     message: "请输入国检名称",
        //     trigger: "blur"
        //   }
        // ],
        // ciqPaymentCode: [
        //   {
        //     required: true,
        //     message: "请输入国检编码",
        //     trigger: "blur"
        //   }
        // ],
        copName: [
          {
            required: true,
            message: "请输入支付企业名称",
            trigger: "blur"
          }
        ],
        // copCode: [
        //   {
        //     required: true,
        //     message: "请输入企业传输编码",
        //     trigger: "blur"
        //   }
        // ],
        // dxpId: [
        //   {
        //     required: true,
        //     message: "请输入企业传输ID",
        //     trigger: "blur"
        //   }
        // ]
      },
      list: null,
      total: null,
      listLoading: true,
      query: {
        qstCode: undefined,
        copName: undefined
      },
      listQuery: {
        page: 1,
        limit: 10,
        _type_: "like"
      },
      dialogFormVisible: false,
      dialogStatus: "",
      bdPaymentManager_btn_edit: false,
      bdPaymentManager_btn_del: false,
      bdPaymentManager_btn_add: true,
      textMap: {
        update: "编辑",
        create: "创建"
      },
      tableKey: 0
    };
  },
  created () {
    this.getList();
    this.bdPaymentManager_btn_edit = this.elements["bdPaymentManager:btn_edit"];
    this.bdPaymentManager_btn_del = this.elements["bdPaymentManager:btn_del"];
    this.bdPaymentManager_btn_add = this.elements["bdPaymentManager:btn_add"];
  },
  computed: {
    ...mapGetters(["elements", "elTableMediaHeight"])
  },
  methods: {
    // 关闭el-dialog 前的回调函数 重置表单
    closeDialog () {
      this.dialogFormVisible = false;
      this.$refs["form"].resetFields();
    },
    // 查看详情
    detailName (row) {
      // this.showDetail = true
      this.$refs.update.formEdit = true;
      this.$refs.update.disabledForm = true;
      this.$refs.update.updateView = true;
      getObj(row.indx).then(response => {
        this.$refs.update.resetFormFields();
        this.$copyJsonProperty(this.$refs.update.form, response.data);
        //  console.log(row.indx)
      });
    },
    getList () {
      this.listLoading = true;
      let param = {
        qstCode: $.trim(this.query.qstCode),
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
      this.resetTemp();
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
    },
    handleUpdate (row) {
      getObj(row.indx).then(response => {
        this.form = response.data;
        this.dialogFormVisible = true;
        this.dialogStatus = "update";
      });
    },
    create (formName) {
      const set = this.$refs;
      set[formName].validate(valid => {
        if (valid) {
          this.$confirm('确定要保存吗', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            addObj(this.form).then((res) => {
              this.dialogFormVisible = false;
              if (res.rel) {
                this.getList();
                this.$notify({
                  title: "成功",
                  message: "创建成功",
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
    resetTemp () {
      this.form = {
        // qstCode: undefined,
        // outCode: undefined,
        cusPaymentName: undefined,
        cusPaymentCode: undefined,
        // ciqPaymentName: undefined,
        // ciqPaymentCode: undefined,
        copName: undefined,
        // copCode: undefined,
        // dxpId: undefined
      };
    }
  }
};
</script>
<style scoped>
.el-form-item {
  /* margin-left:5%; */
  /* width: 400px; */
}
.formLeft {
  padding-left: 0%;
}
.el-input,
.el-select {
  width: 200px;
}
</style>
