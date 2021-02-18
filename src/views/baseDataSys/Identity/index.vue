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
                      placeholder="海关名称"
                      v-model="query.cusCbeName"> </el-input>
            <el-input @keyup.enter.native="handleFilter"
                      style="width: 200px;"
                      class="filter-item"
                      placeholder="海关编码"
                      v-model="query.cusCbeCode"> </el-input>
            <el-button class="filter-item"
                       type="primary"
                       v-waves
                       icon="search"
                       @click="handleFilter">搜索</el-button>
            <el-button class="filter-item"
                       v-if="bdSupplierManager_btn_add"
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
                    style="width: 100%"
                    highlight-current-row
                    @row-click="detailName"
                    :height="elTableMediaHeight"
                    :class="{'tabLayout':isList}">
            <!-- <el-table-column min-width="180px"
                             align="center"
                             label="申报身份编码"
                             show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.outCode}}</span>
              </template>
            </el-table-column> -->
            <el-table-column min-width="200px"
                             align="center"
                             label="海关名称"
                             show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.cusCbeName}}</span>
              </template>
            </el-table-column>
            <el-table-column min-width="140px"
                             align="center"
                             label="海关编码"
                             show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.cusCbeCode}}</span>
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
                     class="receiptSupplier">
            <el-form :model="form"
                     :rules="rules"
                     ref="form"
                     label-width="120px"
                     :inline="true"
                     class="formLeft">
              <!-- <el-form-item label="申报身份编码"
                            prop="outCode">
                <el-input v-model="form.outCode"
                          placeholder="请输入申报身份编码"></el-input>
              </el-form-item> -->
              <el-form-item label="海关名称"
                            prop="cusCbeName">
                <el-input v-model="form.cusCbeName"
                          placeholder="请输入海关名称"></el-input>
              </el-form-item>
              <el-form-item label="海关编码"
                            prop="cusCbeCode">
                <el-input v-model="form.cusCbeCode"
                          placeholder="请输入海关编码"></el-input>
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
} from "api/baseDataSys/Identity/index";
import { mapGetters } from "vuex";
// var dateUtils = require("silly-datetime");
export default {
  name: "Identity",
  components: {
    // 引入编辑的组件
    "update-element": () => import("./components/update")
  },
  data () {
    return {
      form: {
        indx: undefined,
        cusCbeCode: undefined,
        cusCbeName: undefined,
        contactName: undefined,
      },
      rules: {
        outCode: [
          {
            required: true,
            message: "请输入申报身份编码",
            trigger: "blur"
          }
        ],
        cusCbeName: [
          {
            required: true,
            message: "请输入海关名称",
            trigger: "blur"
          }
        ],
        cusCbeCode: [
          {
            required: true,
            message: "请输入海关编码",
            trigger: "blur"
          }
        ]
      },
      list: [],
      total: null,
      listLoading: true,
      query: {
        cusCbeCode: undefined,
        cusCbeName: undefined,
      },
      listQuery: {
        page: 1,
        limit: 10,
        _type_: "like",
        // orderBy: 'createtimedesc'
      },
      dialogFormVisible: false,
      dialogStatus: "",
      bdSupplierManager_btn_edit: false,
      bdSupplierManager_btn_del: false,
      bdSupplierManager_btn_add: true,
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
    // this.bdSupplierManager_btn_edit = this.elements[
    //   "bdSupplierManager:btn_edit"
    // ];
    // this.bdSupplierManager_btn_del = this.elements["bdSupplierManager:btn_del"];
    // this.bdSupplierManager_btn_add = this.elements["bdSupplierManager:btn_add"];
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
      // this.$refs.update.disabledForm = true;
      this.$refs.update.updateView = true;
      getObj(row.indx).then(response => {
        this.$refs.update.resetFormFields();
        // this.$copyJsonProperty(this.$refs.update.form, response.data);
        this.$refs.update.form = response.data
        // console.log(this.$refs.update.form.type)
      });
    },
    getList () {
      this.listLoading = true;
      let param = {
        cusCbeName: $.trim(this.query.cusCbeName),
        cusCbeCode: $.trim(this.query.cusCbeCode),
        ...this.listQuery
      }
      page(param).then(response => {
        console.log(111)
        console.log(response.data)
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
            // let date = new Date();
            // this.form.createtime = dateUtils.format(date, "YYYY-MM-DD  HH:mm:ss");
            addObj(this.form).then(res => {
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
        cusCbeCode: undefined,
        cusCbeName: undefined,
        outCode: undefined,
      };
    }
  }
};
</script>
<style scoped>
.el-form-item {
  /* margin-left:2%; */
  /* width: 400px; */
}
.el-input,
.el-select {
  width: 200px;
}
.formLeft {
  padding-left: 0%;
}
/* @media screen and (max-width: 1632px) {
  .el-form-item {
    margin-left: 15px;
    /* width: 400px; */
/* }
  .formLeft {
    padding-left: 2%;
  } */
/* } */
/* @media screen and (max-width: 1366px) {
  .el-form-item {
    margin-left: -30px;
    /* width: 400px; */
/* }
  .el-input,
  .el-select {
    width: 180px;
  }
} */
</style>