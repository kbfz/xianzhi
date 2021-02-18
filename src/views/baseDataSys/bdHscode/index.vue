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
                      placeholder="hs名称"
                      v-model="query.hsname"> </el-input>
            <el-button class="filter-item"
                       type="primary"
                       v-waves
                       icon="search"
                       @click="handleFilter">搜索</el-button>
            <el-button class="filter-item"
                       v-if="bdHscodeManager_btn_add"
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

            <el-table-column align="center"
                             label="hs编码"
                             min-width="180"
                             show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.hscode}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center"
                             label="hs名称"
                             min-width="180"
                             show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.hsname}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center"
                             label="第一计量单位"
                             width="180"
                             show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.legalunit1}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center"
                             label="第二计量单位"
                             width="180"
                             show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.legalunit2}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center"
                             label="消费税率"
                             width="150"
                             show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.consumptionvat}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center"
                             label="税率"
                             width="150"
                             show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.vat}}</span>
              </template>
            </el-table-column>
            <!-- <el-table-column align="center" label="时间" width="200">
      <template scope="scope">
        <span>{{scope.row.indbTime}}</span>
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
                     label-width="120px">
              <el-form-item label="hs名称"
                            prop="hsname">
                <el-input v-model="form.hsname"
                          placeholder="请输入hs名称"></el-input>
              </el-form-item>
              <el-form-item label="hs编码"
                            prop="hscode">
                <el-input v-model="form.hscode"
                          placeholder="请输入hs编码"></el-input>
              </el-form-item>
              <el-form-item label="消费税率"
                            prop="consumptionvat">
                <el-input v-model="form.consumptionvat"
                          placeholder="请输入消费税率"></el-input>
              </el-form-item>
              <el-form-item label="税率"
                            prop="vat">
                <el-input v-model="form.vat"
                          placeholder="请输入税率"></el-input>
              </el-form-item>
              <el-form-item label="第一计量单位"
                            prop="legalunit1">
                <el-select v-model="form.legalunit1"
                           @visible-change="getFirstUnit">
                  <el-option v-for="item in selects.cusUnit"
                             :key="item.code"
                             :label="item.name"
                             :value="item.code">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="第二计量单位"
                            prop="legalunit2">
                <el-select v-model="form.legalunit2"
                           @visible-change="getFirstUnit">
                  <el-option v-for="item in selects.cusUnit"
                             :key="item.code"
                             :label="item.name"
                             :value="item.code">
                  </el-option>
                </el-select>
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
} from "api/baseDataSys/bdHscode/index";
import { getCusUnitData } from "api/baseDataSys/bdCusUnit/index";
import { mapGetters } from "vuex";
import { numberValidator } from 'utils/validate'
export default {
  name: "bdHscode",
  components: {
    // 引入编辑的组件
    "update-element": () => import("./components/update")
  },
  data () {
    return {
      form: {
        hscode: undefined,
        hsname: undefined,
        legalunit1: undefined,
        legalunit2: undefined,
        consumptionvat: undefined,
        vat: undefined
      },
      selects: {
        cusUnit: []
      },
      rules: {
        hscode: [
          {
            required: true,
            message: "请输入hs编码",
            trigger: "blur"
          }
        ],
        hsname: [
          {
            required: true,
            message: "请输入hs名称",
            trigger: "blur"
          }
        ],
        legalunit1: [
          {
            required: true,
            message: "请输入第一计量单位",
            trigger: "blur"
          }
        ],
        legalunit2: [
          {
            required: true,
            message: "请输入第二计量单位",
            trigger: "blur"
          }
        ],
        consumptionvat: [
          {
            required: true,
            message: "请输入消费税率",
            trigger: "blur"
          },
          {
            validator: numberValidator,
            trigger: "blur"
          }
        ],
        vat: [
          {
            required: true,
            message: "请输入税率",
            trigger: "blur"
          },
          {
            validator: numberValidator,
            trigger: "blur"
          }
        ]
      },
      list: null,
      total: null,
      listLoading: true,
      query: {
        hsname: undefined
      },
      listQuery: {
        page: 1,
        limit: 10,
        _type_: "equal",
        orderBy: 'indbTimedesc'
      },
      dialogFormVisible: false,
      dialogStatus: "",
      bdHscodeManager_btn_edit: false,
      bdHscodeManager_btn_del: false,
      bdHscodeManager_btn_add: false,
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
    this.bdHscodeManager_btn_edit = this.elements["bdHscodeManager:btn_edit"];
    this.bdHscodeManager_btn_del = this.elements["bdHscodeManager:btn_del"];
    this.bdHscodeManager_btn_add = this.elements["bdHscodeManager:btn_add"];
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
      });
    },
    getList () {
      this.listLoading = true;
      let param = {
        hsname: $.trim(this.query.hsname),
        ...this.listQuery
      }
      page(param).then(response => {
        this.list = response.data.rows;
        this.total = response.data.total;
        this.listLoading = false;
        // console.log(response.data.rows)
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
    handleDelete (row) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        delObj(row.indx).then(() => {
          this.$notify({
            title: "成功",
            message: "删除成功",
            type: "success",
            duration: 2000
          });
          const index = this.list.indexOf(row);
          this.list.splice(index, 1);
        });
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
            this.dialogFormVisible = false;
            addObj(this.form).then((response) => {
            if(response.rel) {
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
            if(response.status !== 200) {
               this.$notify({
                title: "失败",
                message: response.message,
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
      };
    },
    // 获取第一计量单位
    getFirstUnit () {
      getCusUnitData().then(res => {
        if (res.rel) {
          this.selects.cusUnit = res.data;
        }
      });
    }
  }
};
</script>
<style scoped>
.el-dialog__body {
  padding: 30px 20px;
  color: #48576a;
  font-size: 14px;
  overflow: hidden;
}
.el-form-item {
  margin-bottom: 22px;
  /* margin: 0 auto; */
  float: left;
  /* margin-left: 5%; */
  /* text-align: center; */
}
.el-form {
  overflow: hidden;
  padding-left: 2%;
}
.el-input,
.el-select {
  width: 200px;
}


</style>
