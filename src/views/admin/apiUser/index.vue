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
                      placeholder="客户名称"
                      v-model="listQuery.customerName">
            </el-input>
            <el-button class="filter-item"
                       type="primary"
                       v-waves
                       icon="search"
                       @click="handleFilter">
              搜索
            </el-button>
            <el-button class="filter-item"
                       v-if="userManager_btn_add"
                       style="margin-left: 10px;"
                       @click="handleCreate"
                       type="primary"
                       icon="edit">
              添加
            </el-button>
          </div>
          <el-table :key="tableKey"
                    :data="list"
                    v-loading.body="listLoading"
                    border=""
                    fit=""
                    highlight-current-row=""
                    style="width: 100%"
                    :height="elTableMediaHeight"
                    @row-click="detailName">
            <el-table-column width="200px"
                             align="center"
                             label="客户名称"
                             show-overflow-tooltip>
              <template scope="scope">
                <span style="cursor: pointer;">{{scope.row.customerName}}</span>
              </template>
            </el-table-column>
            
            <el-table-column width="200px"
                             align="center"
                             label="appKey"
                             show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.appKey}}</span>
              </template>
            </el-table-column>
            <el-table-column width="220px"
                             align="center"
                             label="签名密钥"
                             show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.appSecret}}</span>
              </template>
            </el-table-column>

            <el-table-column width="220px"
                             align="center"
                             label="数据权限过滤字段"
                             show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.auth}}</span>
              </template>
            </el-table-column>
            <el-table-column width="212px"
                             align="center"
                             label="描述"
                             show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.des}}</span>
              </template>
            </el-table-column>
            <el-table-column width="210px"
                             align="center"
                             label="是否启用"
                             show-overflow-tooltip>
              <template scope="scope">
                <span v-if="scope.row.isEnable === 1">启用</span>
                <span v-if="scope.row.isEnable === 2">禁用</span>
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
          <el-dialog :title="textMap[dialogStatus]"
                     :visible.sync="dialogFormVisible"
                     :before-close="closeDialog"
                     :close-on-click-modal="false"
                     class="receiptWidth">
            <!--  编辑的时候账户前面的标识 * -->
            <!-- <span v-if="formUpdate" class="formUpdate">*</span> -->
            <el-form :model="form"
                     :rules="rules"
                     ref="form"
                     label-width="140px">
              <el-form-item label="客户名称"
                            prop="customerName">
                <el-input v-model="form.customerName"
                          placeholder="请输入客户名称 "></el-input>
              </el-form-item>
              <el-form-item label="appKey"
                            prop="appKey">
               <el-input v-model="form.appKey"
                          placeholder="点我生成appKey">
                  <el-button slot="prepend"
                             icon="setting"
                             @click="generateAppKey"></el-button>
                </el-input>
              </el-form-item>
              <el-form-item label="签名密钥"
                            prop="appSecret">
                   <el-input v-model="form.appSecret"
                          placeholder="点我生成签名密钥">
                  <el-button slot="prepend"
                             icon="setting"
                             @click="generateAppId"></el-button>
                </el-input>
                <!-- <el-input v-model="form.appSecret"
                          placeholder="请输入签名密钥"></el-input> -->
              </el-form-item>
              <el-form-item label="数据权限过滤字段" prop="auth">
                <el-input v-model="form.auth"
                          placeholder="请输入数据权限过滤字段"></el-input>
              </el-form-item>
              <el-form-item label="描述">
                <el-input type="textarea"
                          :autosize="{ minRows: 3, maxRows: 5}"
                          placeholder="请输入内容"
                          v-model="form.des">
                </el-input>
              </el-form-item>
              <el-form-item label="是否启用">
                <el-radio v-model="form.isEnable"
                          label="1"
                          style="margin-left: 25px;margin-right: 40px">启用</el-radio>
                <el-radio v-model="form.isEnable"
                          label="2"
                          style="margin-right: 23px">禁用</el-radio>
              </el-form-item>
            </el-form>
            <div slot="footer"
                 class="dialog-footer">
              <el-button @click="cancel('form')">
                取 消
              </el-button>
              <el-button v-if="dialogStatus=='create'"
                         type="primary"
                         @click="create('form')">
                确 定
              </el-button>
              <!-- <el-button v-else type="primary" @click="update('form')">确 定</el-button> -->
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
  putObj,
} from "api/admin/apiUser/index";
import { getGroupIdArray, fetchTree } from "api/admin/group/index";
// 引入防止重复的校验规则 判断字符串长度
import { userValidator, strLength } from "utils/validate";
import { guid, eightGuid } from "utils/index";
import { mapGetters } from "vuex";
var dformat = require("silly-datetime");
export default {
  name: "user",
  components: {
    // 引入编辑的组件
    "update-element": () => import("./components/update")
  },
  data () {
    return {
      listTable: [],
      form: {
        id: undefined,
        customerName: undefined,
        appKey: undefined,
        appSecret: undefined,
        auth: '{ "": "" }',
        des: undefined,
        isEnable: '1',
      },
      authorityForm: {
        textarea: ''
      },
      one_page_val: [],
      appIds: [],
      requestField: [],
      // nameObj: [],
      // 是否禁用
      formEdit: false,
      // 判断添加和编辑的时账户的显示隐藏
      formUpdate: false,
      formCreate: false,
      rules: {
        customerName: [
          {
            required: true,
            message: "请输入客户名称",
            trigger: "blur"
          }
        ],
        appKey: [
          {
            required: true,
            message: "请输入appKey",
            trigger: "blur"
          }
        ],
        appSecret: [
          {
            required: true,
            message: "请输入签名密钥",
            trigger: "blur"
          }
        ],
         auth: [
          {
            required: true,
            message: "请输入数据权限过滤字段",
            trigger: "blur"
          }
        ]
      },
      showUpdate: false,
      showDetail: false,
      showToken: false,
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        customerName: undefined
      },
      listQueryTable: {
        page: 1,
        limit: 30,
      },
      sexOptions: ["男", "女"],
      userTypeOptions: ["app", "api"],
      dialogFormVisible: false,
      dialogRoleVisible: false,
      dialogAuthorityVisible: false,
      dialogStatus: "",
      userManager_btn_edit: false,
      userManager_btn_del: false,
      userManager_btn_add: false,
      userManager_btn_role: false,
      userManager_btn_authority: false,
      filterText: "",
      roleDialog: {
        userId: '',
        treeData: [],
        defaultCheckKeys: []
      },
      defaultProps: {
        children: "children",
        label: "label"
      },
      textMap: {
        update: "编辑",
        create: "创建"
      },
      total2: 0,
      tableKey: 0,
      userIDName: '',
      userId: ''
    };
    dataArr: []
  },
  created () {
    this.getList();
    this.userManager_btn_edit = this.elements["userManager:btn_edit"];
    this.userManager_btn_del = this.elements["userManager:btn_del"];
    this.userManager_btn_add = this.elements["userManager:btn_add"];
    this.userManager_btn_role = this.elements["userManager:btn_role"];
    this.userManager_btn_authority = this.elements["userManager:btn_authority"]
    // this.$refs.update.showView = true
    // console.log( this.userManager_btn_role)
  },
  computed: {
    ...mapGetters(["elements", "elTableMediaHeight"])
  },
  watch: {
    filterText (val) {
      this.$refs.groupTree.filter(val);
    },
    "form.type": function (val) {
      if (val === "api") {
        this.showToken = true;
      } else {
        this.showToken = false;
      }
    }
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
      getObj(row.id).then(response => {
        response.data.auth = JSON.stringify(response.data.auth)
        this.$refs.update.resetFormFields();
        this.$refs.update.form = response.data;
      });
    },
    getList () {
      this.listLoading = true;
      page(this.listQuery).then(response => {
        this.list = response.data.rows;
        this.total = response.data.total;
        this.listLoading = false;
      });
    },

    handleFilter () {
      this.getList();
    },
    handleSizeChangeTable (val) {
      this.listQueryTable.limit = val;
      this.getListTable();
    },
    handleCurrentChangeTable (val) {
      this.listQueryTable.page = val;
      this.getListTable();
    },
    handleSizeChange (val) {
      this.appIds = this.appIds.concat(this.one_page_val)
      this.listQuery.limit = val;
      this.getList();
    },
    handleCurrentChange (val) {
      this.appIds = [].concat(this.appIds).concat(this.one_page_val)
      this.listQuery.page = val;
      this.getList();
    },
    handleCreate () {
      this.resetTemp();
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
      // 添加的时候账户名称可以校验
      this.formCreate = true;
      this.formUpdate = false;
    },
    create (formName) {
      const set = this.$refs;
      set[formName].validate(valid => {
        if (valid) {
           let formData = { id: this.form.id, customerName: this.form.customerName, appKey: this.form.appKey, appSecret: this.form.appSecret, auth: $.parseJSON(this.form.auth), des: this.form.des, isEnable: this.form.isEnable }
          addObj(formData).then((res) => {
            this.dialogFormVisible = false;
            if (res.rel === true) {
              this.$notify({
                title: "成功",
                message: "创建成功",
                type: "success",
                duration: 2000
              })
              this.getList();
            } else {
              this.$notify({
                title: "失败",
                message: "系统异常",
                type: "error",
                duration: 2000
              })
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
        }
      })
    },
  // 点击生成密钥
      generateAppKey () {
      // if (!this.formEdit) {
      this.$confirm("此操作将覆盖原appKey, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.form.appKey = eightGuid();
          // console.log(this.form)
        })
        .catch(() => { });
      // }
    },
  // 点击生成密钥
      generateAppId () {
      // if (!this.formEdit) {
      this.$confirm("此操作将覆盖原签名密钥, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.form.appSecret = guid();
          // console.log(this.form)
        })
        .catch(() => { });
      // }
    },
    cancel (formName) {
      this.dialogFormVisible = false;
      this.$refs[formName].resetFields();
    },
    update (formName) {
      const set = this.$refs;
      set[formName].validate(valid => {
        if (valid) {
          this.dialogFormVisible = false;
          putObj(this.form.id, this.form).then(response => {
            this.dialogFormVisible = false;
            if (response.rel === true) {
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
              })
            }
          });
        } else {
          return false;
        }
      });
    },
    resetTemp () {
      this.form = {
        id: undefined,
        customerName: undefined,
        appKey: undefined,
        appSecret: undefined,
        auth:  '{ "": "" }',
        des: undefined,
        isEnable: '1',
      };
    }
  }
};
</script>
<style scoped>
/* 编辑里面账户前面的*标识 */
.formUpdate {
  display: inline-block;
  position: relative;
  top: 84px;
  left: 50px;
  color: red;
}
.el-form-item {
  margin-left: 7%;
  /* width: 400px; */
}
.el-input,
.el-select,
.el-textarea {
  width: 85%;
}
</style>

