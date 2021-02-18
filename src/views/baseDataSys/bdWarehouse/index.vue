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
                      placeholder="仓库名称"
                      v-model="query.areaWarehouseName"> </el-input>
            <el-input @keyup.enter.native="handleFilter"
                      style="width: 200px;"
                      class="filter-item"
                      placeholder="仓库编码"
                      v-model="query.qstCode"> </el-input>
            <el-button class="filter-item"
                       type="primary"
                       v-waves
                       icon="search"
                       @click="handleFilter">搜索</el-button>
            <el-button class="filter-item"
                       v-if="bdWarehouseManager_btn_add"
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
            <el-table-column min-width="150px"
                             align="center"
                             label="仓库名称"
                             show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.areaWarehouseName}}</span>
              </template>
            </el-table-column>
            <el-table-column min-width="150px"
                             align="center"
                             label="仓库编码"
                             show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.qstCode}}</span>
              </template>
            </el-table-column>
            <el-table-column min-width="150px"
                             align="center"
                             label="仓库类型">
              <template scope="scope">
                <span v-if="scope.row.type == 1">保税仓</span>
                <span v-if="scope.row.type == 2">普通仓</span>
                <span v-if="scope.row.type == 3">海外仓</span>
              </template>
            </el-table-column>
            <el-table-column min-width="150px"
                             align="center"
                             label="第三方编码"
                             show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.outCode}}</span>
              </template>
            </el-table-column>
            <!-- <el-table-column min-width="150px"
                             align="center"
                             label="账册编码"
                             show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.accountCode}}</span>
              </template>
            </el-table-column> -->
            <el-table-column min-width="150px"
                             align="center"
                             label="url地址"
                             show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.url}}</span>
              </template>
            </el-table-column>
            <el-table-column min-width="130px"
                             align="center"
                             label="服务名"
                             show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.serviceName}}</span>
              </template>
            </el-table-column>

            <!-- <el-table-column min-width="180px"
                             align="center"
                             label="区内名称"
                             show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.areaWarehouseName}}</span>
              </template>
            </el-table-column>
            <el-table-column min-width="150px"
                             align="center"
                             label="区内编码"
                             show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.areaWarehouseCode}}</span>
              </template>
            </el-table-column>
            
            
            <el-table-column min-width="100px"
                             align="center"
                             label="是否推送">
              <template scope="scope">
                <span v-if="scope.row.isPush == '1'">是</span>
                <span v-if="scope.row.isPush == '0'">否</span>
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
              <el-form-item label="仓库名称"
                            prop="qstCode">
                <el-input v-model="form.areaWarehouseName"
                          placeholder="请输入仓库名称"></el-input>
              </el-form-item>
              <el-form-item label="仓库类型"
                            prop="type">
                <el-select v-model="form.type"
                           placeholder="请选择">
                  <el-option value="1"
                             label="保税仓"></el-option>
                  <el-option value="2"
                             label="普通仓"></el-option>
                  <el-option value="3"
                             label="海外仓"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="第三方编码"
                            prop="outCode">
                <el-input v-model="form.outCode"
                          placeholder="请输入第三方编码"></el-input>
              </el-form-item>
              <!-- <el-form-item label="账册编码"
                            prop="accountCode">
                <el-input v-model="form.accountCode"
                          placeholder="请输入账册编码"></el-input>
              </el-form-item> -->
              <el-form-item label="url地址"
                            prop="url">
                <el-input v-model="form.url"
                          placeholder="请输入url地址"></el-input>
              </el-form-item>
              <el-form-item label="服务名">
                <el-input v-model="form.serviceName"
                          placeholder="请输入服务名"></el-input>
              </el-form-item>

              <!-- <el-form-item label="区内名称"
                            prop="areaWarehouseName">
                <el-input v-model="form.areaWarehouseName"
                          placeholder="请输入区内名称"></el-input>
              </el-form-item>
              <el-form-item label="区内编码"
                            prop="areaWarehouseCode">
                <el-input v-model="form.areaWarehouseCode"
                          placeholder="请输入区内编码"></el-input>
              </el-form-item>
              

              
              <el-form-item label="是否推送"
                            prop="isPush">
                <el-radio-group v-model="form.isPush">
                  <el-radio class="radio"
                            :label='1'
                            style="margin-left:25px;margin-right:25px">是</el-radio>
                  <el-radio class="radio"
                            :label='0'
                            style="margin-right:25px">否</el-radio>
                </el-radio-group>
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
} from "api/baseDataSys/bdWarehouse/index";
import { mapGetters } from "vuex";
export default {
  name: "bdWarehouse",
  components: {
    // 引入编辑的组件
    "update-element": () => import("./components/update")
  },
  data () {
    return {
      form: {
        areaWarehouseName:undefined,
        type: "1",      
        outCode: undefined,       
        // accountCode: undefined,
        url: undefined,
        serviceName:undefined
        // qstCode: undefined,
        // areaWarehouseName: undefined,
        // areaWarehouseCode: undefined,
        // isPush: 1,
      },
      rules: {
        outCode: [
          {
            required: true,
            message: "请输入第三方编码",
            trigger: "blur"
          }
        ],
        areaWarehouseName: [
          {
            required: true,
            message: "请输入仓库名称",
            trigger: "blur"
          }
        ],
        // areaWarehouseCode: [
        //   {
        //     required: true,
        //     message: "请输入区内编码",
        //     trigger: "blur"
        //   }
        // ],
        // accountCode: [
        //   {
        //     required: true,
        //     message: "请输入账册编码",
        //     trigger: "blur"
        //   }
        // ],
        url: [
          {
            required: true,
            message: "请输入url地址",
            trigger: "blur"
          }
        ],
        type: [
          {
            required: true,
            message: "请输入仓库类型",
            trigger: "blur"
          }
        ]
      },
      list: null,
      total: null,
      listLoading: true,
      query: {
        areaWarehouseName: undefined,
        qstCode: undefined
      },
      listQuery: {
        page: 1,
        limit: 10,
        _type_: "like"
      },
      dialogFormVisible: false,
      dialogStatus: "",
      bdWarehouseManager_btn_edit: false,
      bdWarehouseManager_btn_del: false,
      bdWarehouseManager_btn_add: true,
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
    this.bdWarehouseManager_btn_edit = this.elements[
      "bdWarehouseManager:btn_edit"
    ];
    this.bdWarehouseManager_btn_del = this.elements[
      "bdWarehouseManager:btn_del"
    ];
    this.bdWarehouseManager_btn_add = this.elements[
      "bdWarehouseManager:btn_add"
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
        if (this.$refs.update.form.type === '1') {
          this.$refs.update.form.typeDesc = '保税仓'
        } else if (this.$refs.update.form.type === '2') {
          this.$refs.update.form.typeDesc = '普通仓'
        } else {
          this.$refs.update.form.typeDesc = '海外仓'
        }
      });
    },
    getList () {
      this.listLoading = true;
      let param = {
        qstCode: $.trim(this.query.qstCode),
        areaWarehouseName: $.trim(this.query.areaWarehouseName),
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
        areaWarehouseName:undefined,
        type: "1",      
        outCode: undefined,       
        // accountCode: undefined,
        url: undefined,
        serviceName:undefined
      };
    }
  }
};
</script>
<style scoped>
.el-form-item {
  /* margin-left: 5%; */
  /* width: 400px; */
}
.el-input {
  width: 200px;
}
.formLeft {
  padding-left: 1%;
}
.el-input,
.el-select {
  width: 200px;
}
</style>