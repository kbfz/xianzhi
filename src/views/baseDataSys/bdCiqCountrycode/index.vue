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
                      placeholder="中文名称"
                      v-model="query.cname"> </el-input>
            <el-button class="filter-item"
                       type="primary"
                       v-waves
                       icon="search"
                       @click="handleFilter">搜索</el-button>
            <el-button class="filter-item"
                       v-if="bdCiqCountrycodeManager_btn_add"
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

            <!-- <el-table-column align="center" label="indx" width="200px">
      <template scope="scope">
        <span>{{scope.row.indx}}</span>
      </template>
    </el-table-column> -->
            <el-table-column align="center"
                             label="编码"
                             min-width="150"
                             show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.code}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center"
                             label="中文名称"
                             min-width="150"
                             show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.cname}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center"
                             label="英文名称"
                             min-width="150"
                             show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.ename}}</span>
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
                     class="receiptWidth450"
                     :close-on-click-modal="false">
            <el-form :model="form"
                     :rules="rules"
                     ref="form"
                     label-width="120px">
              <el-form-item label="编码"
                            prop="code">
                <el-input v-model="form.code"
                          placeholder="请输入编码"></el-input>
              </el-form-item>
              <el-form-item label="中文名称"
                            prop="cname">
                <el-input v-model="form.cname"
                          placeholder="请输入中文名称"></el-input>
              </el-form-item>
              <el-form-item label="英文名称"
                            prop="ename">
                <el-input v-model="form.ename"
                          placeholder="请输入英文名称"></el-input>
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
      <el-col :span="2">
        <div class="border">&nbsp;
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
} from "api/baseDataSys/bdCiqCountrycode/index";
import { mapGetters } from "vuex";
export default {
  name: "bdCiqCountrycode",
  components: {
    // 引入编辑的组件
    "update-element": () => import("./components/update")
  },
  data () {
    return {
      form: {
        code: undefined,
        cname: undefined,
        ename: undefined
      },
      rules: {
        code: [
          {
            required: true,
            message: '请输入编码',
            trigger: 'blur'
          }
        ], cname: [
          {
            required: true,
            message: '请输入中文名称',
            trigger: 'blur'
          }
        ], ename: [
          {
            required: true,
            message: '请输入英文名称',
            trigger: 'blur'
          }
        ]
      },
      list: null,
      total: null,
      listLoading: true,
      query: {
        cname: undefined
      },
      listQuery: {
        page: 1,
        limit: 10,
        _type_: "equal"
      },
      dialogFormVisible: false,
      dialogStatus: "",
      bdCiqCountrycodeManager_btn_edit: false,
      bdCiqCountrycodeManager_btn_del: false,
      bdCiqCountrycodeManager_btn_add: false,
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
    this.bdCiqCountrycodeManager_btn_edit = this.elements[
      "bdCiqCountrycodeManager:btn_edit"
    ];
    this.bdCiqCountrycodeManager_btn_del = this.elements[
      "bdCiqCountrycodeManager:btn_del"
    ];
    this.bdCiqCountrycodeManager_btn_add = this.elements[
      "bdCiqCountrycodeManager:btn_add"
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
        cname: $.trim(this.query.cname),
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
              this.getList();
              if (res.rel) {
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
    update (formName) {
      const set = this.$refs;
      set[formName].validate(valid => {
        if (valid) {
          this.dialogFormVisible = false;
          this.form.password = undefined;
          putObj(this.form.id, this.form).then(() => {
            this.dialogFormVisible = false;
            this.getList();
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
        code: undefined,
        cname: undefined,
        ename: undefined
      };
    }
  }
};
</script>
<style scoped>
.el-form-item {
  margin-left: 4%;
  /* width: 400px; */
  display: inline-block;
}
.el-input,
.el-select {
  width: 200px;
}
/* @media screen and (max-width: 1632px) {
  .el-form-item {
    margin-left: -11px;
  }
}
@media screen and (max-width: 1366px) {
  .el-form-item {
    margin-left: -25px;
  }
  .el-input,
  .el-select {
    width: 180px;
  }
} */
</style>