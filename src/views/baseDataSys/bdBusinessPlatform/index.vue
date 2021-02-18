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
                      placeholder="电商平台名称"
                      v-model="query.platformName"> </el-input>
            <el-input @keyup.enter.native="handleFilter"
                      style="width: 200px;"
                      class="filter-item"
                      placeholder="电商平台编码"
                      v-model="query.platformCode"> </el-input>
            <el-button class="filter-item"
                       type="primary"
                       v-waves
                       icon="search"
                       @click="handleFilter">搜索</el-button>
            <el-button class="filter-item"
                       v-if="bdCustomerManager_btn_add"
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
                    :height="elTableMediaHeight"
                    :class="{'tabLayout':isList}">
            <!-- <el-table-column width="310px"
                             align="center"
                             label="全速通编码"
                             show-overflow-tooltip
                          >
              <template scope="scope">
                <span>{{scope.row.qstCode}}</span>
              </template>
            </el-table-column> -->
            <el-table-column min-width="200"
                             align="center"
                             label="电商平台名称"
                             show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.platformName}}</span>
              </template>
            </el-table-column>
            <el-table-column min-width="180"
                             align="center"
                             label="电商平台编码"
                             show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.platformCode}}</span>
              </template>
            </el-table-column>
            <el-table-column min-width="180"
                             align="center"
                             label="别名"
                             show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.platformOutCode}}</span>
              </template>
            </el-table-column>
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
                     class="receiptWidth450">
            <el-form :model="form"
                     :rules="rules"
                     ref="form"
                     label-width="130px"
                     :inline="true"
                     class="formLeft">
              
              <el-form-item label="电商平台名称"
                            prop="platformName">
                <el-input v-model="form.platformName"
                          placeholder="请输入电商平台名称"></el-input>
              </el-form-item>
              <el-form-item label="电商平台编码"
                            prop="platformCode">
                <el-input v-model="form.platformCode"
                          placeholder="请输入电商平台编码"></el-input>
              </el-form-item>
              <el-form-item label="别名">
                <el-input v-model="form.platformOutCode"
                          placeholder="请输入别名"></el-input>
              </el-form-item>
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
} from "api/baseDataSys/bdBusinessPlatform/index";
import { mapGetters } from "vuex";
export default {
  name: "bdCustomer",
  components: {
    // 引入编辑的组件
    "update-element": () => import("./components/update")
  },
  data () {
    return {
      form: {
        platformOutCode: undefined,
        platformCode: undefined,
        platformName: undefined
      },
      rules: {
        // qstCode: [
        //   {
        //     required: true,
        //     message: '请输入全速通编码',
        //     trigger: 'blur'
        //   }
        // ],
        platformName: [
          {
            required: true,
            message: '请输入电商平台名称',
            trigger: 'blur'
          }
        ], platformCode: [
          {
            required: true,
            message: '请输入电商平台编码',
            trigger: 'blur'
          }
        ]
      },
      list: null,
      total: null,
      listLoading: true,
      query: {
        platformName: undefined,
        platformCode: undefined,
      },
      listQuery: {
        page: 1,
        limit: 10,
        _type_: "like"
      },
      dialogFormVisible: false,
      dialogStatus: "",
      bdCustomerManager_btn_edit: false,
      bdCustomerManager_btn_del: false,
      bdCustomerManager_btn_add: true,
      textMap: {
        update: "编辑",
        create: "创建"
      },
      tableKey: 0,
      isList: true
    };
  },
  created () {
    this.getList();
    this.bdCustomerManager_btn_edit = this.elements["bdCustomerManager:btn_edit"];
    this.bdCustomerManager_btn_del = this.elements["bdCustomerManager:btn_del"];
    this.bdCustomerManager_btn_add = this.elements["bdCustomerManager:btn_add"];
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
        // this.$copyJsonProperty(this.$refs.update.form, response.data);
        this.$refs.update.form = response.data
        // console.log(response.data)
        // console.log(this.$refs.update.form)
      });
    },
    getList () {
      this.listLoading = true;
      let param = {
        platformName: $.trim(this.query.platformName),
        platformCode: $.trim(this.query.platformCode),
        ...this.listQuery
      }
      page(param).then(response => {
        this.list = response.data.rows;
        this.total = response.data.total;
        this.listLoading = false;
        if (response.data.rows.length > 17) {
          this.isList = false
        } else {
          this.isList = true
        }
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
    resetTemp () {
      this.form = {
        platformOutCode: undefined,
        platformName: undefined,
        platformCode: undefined,
      };
    }
  }
};
</script>
<style scoped>
.el-form-item {
  margin-left: 4%;
  /* width: 400px; */
}
.formLeft {
  /* padding-left: 4%; */
}
.el-input,
.el-select {
  width: 200px;
}
</style>

