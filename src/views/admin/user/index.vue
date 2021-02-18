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
                      placeholder="姓名或账户"
                      v-model="listQuery.name">
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
            <el-table-column align="center"
                             label="序号"
                             width="65">
              <template scope="scope">
                <span>{{scope.row.id}}</span>
              </template>
            </el-table-column>
            <el-table-column width="200px"
                             align="center"
                             label="姓名"
                             show-overflow-tooltip>
              <template scope="scope">
                <span style="cursor: pointer;">{{scope.row.name}}</span>
              </template>
            </el-table-column>
            <el-table-column width="110px"
                             align="center"
                             label="性别">
              <template scope="scope">
                <span>{{scope.row.sex}}</span>
              </template>
            </el-table-column>
            <el-table-column width="130px"
                             align="center"
                             label="账户"
                             show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.username}}</span>
              </template>
            </el-table-column>
            <el-table-column width="150px"
                             align="center"
                             label="手机号"
                             show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.mobilePhone}}</span>
              </template>
            </el-table-column>
            <el-table-column width="150px"
                             align="center"
                             label="固定电话"
                             show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.telPhone}}</span>
              </template>
            </el-table-column>
            <el-table-column width="150px"
                             align="center"
                             label="邮箱"
                             show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.email}}</span>
              </template>
            </el-table-column>
            <el-table-column width="180px"
                             align="center"
                             label="地址"
                             show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.address}}</span>
              </template>
            </el-table-column>
            <el-table-column width="110px"
                             align="center"
                             label="用户类型">
              <template scope="scope">
                <span v-if="scope.row.userType === '0'">企业用户</span>
                <span v-if="scope.row.userType === '1'">管理员</span>
              </template>
            </el-table-column>
            <el-table-column width="110px"
                             align="center"
                             label="登录方式">
              <template scope="scope">
                <span>{{scope.row.type}}</span>
              </template>
            </el-table-column>
            <el-table-column width="180px"
                             align="center"
                             label="鉴权"
                             show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.auth}}</span>
              </template>
            </el-table-column>

            <el-table-column width="280px"
                             align="center"
                             label="refreshToken"
                             show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.refreshToken}}</span>
              </template>
            </el-table-column>
            <el-table-column width="200px"
                             align="center"
                             label="Token有效期"
                             show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.refreshTokenExpire}}</span>
              </template>
            </el-table-column>
            <el-table-column width="200px"
                             align="center"
                             label="备注"
                             show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.description}}</span>
              </template>
            </el-table-column>
            <el-table-column width="180px"
                             align="center"
                             label="最后时间"
                             show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.updTime}}</span>
              </template>
            </el-table-column>
            <el-table-column width="110px"
                             align="center"
                             label="最后更新人">
              <template scope="scope">
                <span> {{scope.row.updName}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center"
                             label="操作"
                             width="320"
                             fixed="right">
              <template scope="scope">
                <!-- <el-button v-if="userManager_btn_edit" size="small" type="success" icon="edit" @click="handleUpdate(scope.row)">编辑 -->
                <!-- </el-button> -->
                <el-button v-if="userManager_btn_del"
                           size="small"
                           type="danger"
                           icon="delete"
                           @click="handleDelete(scope.row)">
                  删除
                </el-button>
                <el-button v-if="userManager_btn_role"
                           size="small"
                           type="primary"
                           icon="share"
                           @click="handleRole(scope.row)">
                  分配角色
                </el-button>
                <el-button v-if="userManager_btn_authority"
                           size="small"
                           type="primary"
                           icon="share"
                           @click="handleAuthority(scope.row)">
                  数据权限
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
          <el-dialog :title="textMap[dialogStatus]"
                     :visible.sync="dialogFormVisible"
                     :before-close="closeDialog"
                     :close-on-click-modal="false">
            <!--  编辑的时候账户前面的标识 * -->
            <!-- <span v-if="formUpdate" class="formUpdate">*</span> -->
            <el-form :model="form"
                     :rules="rules"
                     ref="form"
                     label-width="100px">
              <el-form-item label="姓名"
                            prop="name">
                <el-input v-model="form.name"
                          placeholder="请输入姓名 "></el-input>
              </el-form-item>
              <!-- 点击添加的时候显示 -->
              <el-form-item label="账户"
                            prop="username"
                            v-if="formCreate">
                <el-input v-if="dialogStatus == 'create'"
                          v-model="form.username"
                          placeholder="请输入账户"></el-input>
                <!-- <el-input v-else v-model="form.username" placeholder="请输入账户" readonly :disabled="formEdit"></el-input> -->
              </el-form-item>
              <!--  点击更新的时候显示 -->
              <!-- <el-form-item label="账户" v-if="formUpdate" prop="">
        <el-input v-if="dialogStatus == 'create'" v-model="form.username" placeholder="请输入账户"></el-input>
        <el-input v-else v-model="form.username" placeholder="请输入账户" readonly :disabled="formEdit"></el-input>
      </el-form-item> -->
              <el-form-item v-if="dialogStatus == 'create'"
                            label="密码"
                            placeholder="请输入密码"
                            prop="password">
                <el-input type="password"
                          v-model="form.password"
                          placeholder="请输入密码"></el-input>
              </el-form-item>
              <el-form-item label="性别">
                <el-select class="filter-item"
                           v-model="form.sex"
                           placeholder="请选择">
                  <el-option v-for="item in  sexOptions"
                             :key="item"
                             :label="item"
                             :value="item">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="手机号"
                            prop="mobilePhone">
                <el-input 
                          v-model="form.mobilePhone"
                          placeholder="请输入手机号" maxlength="13"></el-input>
              </el-form-item>
              <el-form-item label="固定电话">
                <el-input v-model="form.telPhone"
                          placeholder="请输入固定电话"></el-input>
              </el-form-item>
              <el-form-item label="邮箱"
                            prop="email">
                <el-input v-model="form.email"
                          placeholder="请输入邮箱"></el-input>
              </el-form-item>
              <el-form-item label="地址">
                <el-input v-model="form.address"
                          placeholder="请输入地址"></el-input>
              </el-form-item>
              <el-form-item label="用户类型">
                <el-select class="filter-item"
                           v-model="form.userType"
                           clearable
                           placeholder="请选择用户类型">
                  <el-option v-for="item in  userTypeOptions"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="登录方式">
                <el-select class="filter-item"
                           v-model="form.type"
                           clearable
                           placeholder="请选择">
                  <el-option v-for="item in  typeOptions"
                             :key="item"
                             :label="item"
                             :value="item">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="鉴权">
                <el-input v-model="form.auth"
                          placeholder="请输入鉴权信息"></el-input>
              </el-form-item>
              <el-form-item label="refreshToken"
                            prop="refreshToken"
                            v-if="showToken">
                <el-input v-model="form.refreshToken"
                          placeholder="点我生成refreshToken">
                  <el-button slot="prepend"
                             icon="setting"
                             @click="generateAppId"></el-button>
                </el-input>
              </el-form-item>
              <el-form-item label="token有效期"
                            prop="refreshTokenExpire"
                            v-if="showToken">
                <el-date-picker v-model="form.refreshTokenExpire"
                                type="datetime"
                                @change="dateformat"
                                placeholder="选择日期时间">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="描述">
                <el-input type="textarea"
                          :autosize="{ minRows: 3, maxRows: 5}"
                          placeholder="请输入内容"
                          v-model="form.description">
                </el-input>
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
          <el-dialog title="角色分配"
                     :visible.sync="dialogRoleVisible"
                     :close-on-click-modal="false">
            <el-row>
              <el-col :span="8"
                      style="margin-top:15px;">
                <el-input placeholder="输入关键字进行过滤"
                          v-model="filterText">
                </el-input>
                <el-tree class="filter-tree"
                         :data="roleDialog.treeData"
                         node-key="id"
                         show-checkbox=""
                         highlight-current=""
                         :props="defaultProps"
                         :filter-node-method="filterNode"
                         ref="groupTree"
                         @check-change="handleCheckChange"
                         default-expand-all="">
                </el-tree>
              </el-col>
            </el-row>
            <div slot="footer"
                 class="dialog-footer">
              <el-button @click="roleCancel">
                取 消
              </el-button>
              <el-button type="primary"
                         @click="roleCreate">
                确 定
              </el-button>
            </div>
          </el-dialog>
          <!-- 数据权限 -->
          <el-dialog title="数据权限"
                     :visible.sync="dialogAuthorityVisible"
                     :close-on-click-modal="false"
                     :before-close="closeAuthority">
            <el-form :model="authorityForm"
                     rel="authorityForm">
              <el-form-item label="文字描述"
                            label-width="70px">
                <el-input type="textarea"
                          :rows="4"
                          placeholder="请输入内容"
                          v-model="authorityForm.textarea"
                          class="areaText">
                </el-input>
              </el-form-item>
              <div style="margin-top: 20px">
                <el-table :key="tableKey"
                          :data="listTable"
                          v-loading.body="listLoading"
                          border=""
                          fit=""
                          ref="dataTable"
                          highlight-current-row=""
                          style="width: 100%"
                          :height="elTableMediaHeight"
                          @selection-change="changeVal">
                  <el-table-column type="selection"
                                   width="55">
                  </el-table-column>
                  <el-table-column align="center"
                                   label="序号"
                                   width="65"
                                   type="index">
                    <!-- <template scope="scope"> 
         <span>{{scope.row.id}}</span> 
        </template>  -->
                  </el-table-column>
                  <el-table-column align="center"
                                   label="url地址"
                                   width="200px"
                                   show-overflow-tooltip>
                    <template scope="scope">
                      <span>{{scope.row.requestUrl}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column align="center"
                                   label="数据权限规则描述"
                                   width="300px"
                                   show-overflow-tooltip>
                    <template scope="scope">
                      <span>{{scope.row.requestFilterField}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column align="center"
                                   label="文字描述"
                                   width="285px"
                                   show-overflow-tooltip>
                    <template scope="scope">
                      <span>{{scope.row.des}}</span>
                    </template>
                  </el-table-column>
                </el-table>
                <div class="pagination-container">
                  <el-pagination @size-change="handleSizeChangeTable"
                                 @current-change="handleCurrentChangeTable"
                                 :current-page.sync="listQueryTable.page"
                                 :page-sizes="[30, 50]"
                                 :page-size="listQueryTable.limit"
                                 layout="total, sizes, prev, pager, next, jumper"
                                 :total="total2">
                  </el-pagination>
                </div>
              </div>
            </el-form>
            <div slot="footer"
                 class="dialog-footer">
              <el-button type="primary"
                         @click="authorityCreate">
                确 定
              </el-button>
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
  putObj,
  putRole,
  pageTable,
  updateFilter,
  updateID
} from "api/admin/user/index";
import { getGroupIdArray, fetchTree } from "api/admin/group/index";
// 引入防止重复的校验规则 判断字符串长度
import { userValidator, strLength, emailValidator, mobileValidator, numberValidator } from "utils/validate";
import { guid } from "utils/index";
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
        username: null,
        name: null,
        sex: "男",
        password: null,
        description: null,
        type: "app",
        refreshToken: null,
        refreshTokenExpire: null,
        auth: null,
        mobilePhone: null,
        telPhone: null,
        email: null,
        address: null,
        userType: null
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
        name: [
          {
            required: true,
            message: "请输入用户",
            trigger: "blur"
          },
          {
            validator: strLength,
            trigger: "blur"
          }
          // {
          //   min: 3,
          //   max: 20,
          //   message: '长度在 3 到 20 个字符',
          //   trigger: 'blur'
          // }
        ],
        username: [
          {
            required: true,
            message: "请输入账户",
            trigger: "blur"
          },
          {
            validator: strLength,
            trigger: "blur"
          },
          // {
          //   min: 3,
          //   max: 20,
          //   message: '长度在 3 到 20 个字符',
          //   trigger: 'blur'
          // },
          // 账户是否重复校验
          {
            validator: userValidator,
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          },
          {
            min: 5,
            max: 20,
            message: "长度在 5 到 20 个字符",
            trigger: "blur"
          }
        ],
        mobilePhone: [
          {
            required: true,
            message: "请输入手机号",
          },
          {
            validator: mobileValidator,
            message: "请输入正确的手机号",
          }
        ],
        email: [
          {
            validator: emailValidator,
            message: "请输入正确的邮箱格式",
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
        name: undefined
      },
      listQueryTable: {
        page: 1,
        limit: 30,
      },
      sexOptions: ["男", "女"],
      userTypeOptions: [
        {
          label: '企业用户',
          value: '0'
        },
        {
          label: '管理员',
          value: '1'
        }
      ],
      typeOptions: ["app", "api"],
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
    dateformat (val) {
      this.form.refreshTokenExpire = dformat.format(val, "YYYY-MM-DD HH:mm:ss");
    },
    // 查看详情
    detailName (row) {
      // this.showDetail = true
      this.$refs.update.formEdit = true;
      this.$refs.update.disabledForm = true;
      this.$refs.update.updateView = true;
      getObj(row.id).then(response => {
        // console.log(response.data)
        this.$refs.update.resetFormFields();
        // this.$copyJsonProperty(this.$refs.update.form, response.data);
        this.$refs.update.form = response.data;
        this.$refs.update.form.password = ''

      });
    },
    generateAppId () {
      // if (!this.formEdit) {
      this.$confirm("此操作将覆盖原refreshToken, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.form.refreshToken = guid();
          // console.log(this.form)
        })
        .catch(() => { });
      // }
    },
    getList () {
      this.listLoading = true;
      page(this.listQuery).then(response => {
        this.list = response.data.rows;
        this.total = response.data.total;
        this.listLoading = false;
      });
    },
    // getListTable() {
    //   this.listLoading = true;
    //   let param = {
    //     // requestUrl: this.query.requestUrl,
    //     ...this.listQueryTable
    //   }
    //   pageTable(param).then(response => {
    //     //  console.log(response.data.rows)
    //     this.listTable = response.data.rows;
    //     this.total2 = response.data.total;
    //     this.listLoading = false;
    //   });
    // },
    // Promise 封装异步函数
    getListTable2 () {
      return new Promise((resolve) => {
        this.listLoading = true;
        let param = {
          // requestUrl: this.query.requestUrl,
          ...this.listQueryTable
        }
        pageTable(param).then(response => {
          //  console.log(response.data.rows)
          this.listTable = response.data.rows;
          this.total2 = response.data.total;
          this.listLoading = false;
          resolve(response) // 必须返回结果
        });
      })

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
      // this.$refs['form'].resetFields();
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
      // 添加的时候账户名称可以校验
      this.formCreate = true;
      this.formUpdate = false;
    },
    roleCancel () {
      this.dialogRoleVisible = false;
    },
    roleCreate () {
      let checkedNodes = this.$refs.groupTree.getCheckedNodes();
      // console.log(checkedNodes);
      let childrenKeys = [];
      checkedNodes.forEach(element => {
        if (element.children === undefined || element.children.length === 0) {
          childrenKeys.push(element.id);
        }
      });
      let param = { groupIds: childrenKeys.join(",") };
      putRole(this.roleDialog.userId, param).then(response => {
        this.dialogRoleVisible = false;
        this.$notify({
          title: "成功",
          message: "分配成功",
          type: "success",
          duration: "2000"
        });
      });
    },
    filterNode (value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    handleCheckChange (data, checked, indeterminate) { },
    // handleUpdate(row) {
    //   this.resetTemp();
    // 让账户禁用
    // this.formEdit = true
    // 编辑的时候账户 不可以校验
    // this.formUpdate = true
    // this.formCreate = false
    // getObj(row.id)
    // .then(response => {
    // 将描述设置为undefined
    // this.$refs.update.form.description = undefined
    // this.form = response.data;
    // this.$copyJsonProperty(this.form, response.data);
    // this.$refs.update.resetFormFields();
    // this.$copyJsonProperty( this.$refs.update.form, response.data);
    // this.dialogFormVisible = true;
    // this.dialogStatus = 'update';
    // this.$refs.update.showView = true
    // this.$refs.detail.showView2 = false
    // });
    // },
    handleRole (row) {
      this.dialogRoleVisible = true;
      // this.$refs.groupTree.setCheckedKeys([]);
      this.roleDialog.userId = row.id;
      let paramp = { groupType: "1,2" };
      fetchTree(paramp).then(data => {
        this.roleDialog.treeData = data;
      });
      let param = { userId: row.id };
      getGroupIdArray(param).then(response => {
        this.$refs.groupTree.setCheckedKeys(response);
      });
    },
    handleDelete (row) {
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
        });
      });
    },
    changeVal (val) {
      this.one_page_val = val
      let names = []
      let requestFilter = []
      for (var i = 0; i < this.one_page_val.length; i++) {
        let objName = {}
        let requestObj = {}
        objName = this.one_page_val[i].des
        requestObj = this.one_page_val[i].requestFilterField
        names.push(objName)
        requestFilter.push(requestObj)
      }
      this.authorityForm.textarea = names.join(';')
      this.requestField = requestFilter
    },
    // async 异步函数标识  await 后面跟的函数必须执行完才会执行下一步
    async  handleAuthority (row) {
      // console.log(row)
      this.dialogAuthorityVisible = true
      this.roleDialog.userId = row.id;
      await this.getListTable2();
      let param = {
        userId: row.id
      }
      updateID(param).then(response => {
        if (response.data.length !== 0) {
          let desArr = []
          for (var i = 0; i < response.data.length; i++) {
            let desObj = {}
            desObj = response.data[i].dataFilterId
            desArr.push(desObj)
          }
          this.dataArr = desArr
          this.dataChoose()
        } else {
          this.authorityForm = {
            textarea: ''
          }
        }
      })
    },
    // 数据权限选择
    dataChoose () {
      for (var i = 0; i < this.dataArr.length; i++) {
        this.$refs.dataTable.toggleRowSelection(this.listTable.find(d => d.id === this.dataArr[i]))
      }
    },
    closeAuthority () {
      this.dialogAuthorityVisible = false
    },
    isJSON (str) {
      if (typeof str == 'string') {
        try {
          var obj = JSON.parse(str)
          if (typeof obj == 'object' && obj) {
            return true
          } else {
            return false
          }
        } catch (e) {
          console.log('error：' + str + '!!!' + e)
          return false
        }
      }
    },
    create (formName) {
      const set = this.$refs;
      set[formName].validate(valid => {
        if (valid) {
          this.$confirm("确定要保存吗?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }).then(() => {
            addObj(this.form).then((res) => {
              this.dialogFormVisible = false;
              if (this.isJSON(this.form.auth) === false) {
                this.$notify({
                  title: '提示',
                  message: '鉴权格式不对，请输入正确的json格式',
                  type: 'warning'
                });
              } else {
                this.$notify({
                  title: "成功",
                  message: "创建成功",
                  type: "success",
                  duration: 2000
                });
                this.getList();
                this.$refs["form"].resetFields();
              }
              if (res.status !== 200 || res.rel === false) {
                this.$notify({
                  title: "失败",
                  message: res.message,
                  type: "error",
                  duration: 2000
                });
              }
            })
          })
            ;
        } else {
          return false;
        }
      });
    },
    cancel (formName) {
      this.dialogFormVisible = false;
      this.$refs[formName].resetFields();
    },
    authorityCreate () {
      let ids = []
      for (var i = 0; i < this.one_page_val.length; i++) {
        let obj = {}
        obj = this.one_page_val[i].id
        ids.push(obj)
      }
      this.appIds = ids
      //  this.requestField = requestFilter
      let param = {
        userId: this.roleDialog.userId,
        dataFilterIds: this.appIds.join(',')
      }
      updateFilter(param).then((res) => {
        this.dialogAuthorityVisible = false;
        if (res.rel === true) {
          this.getList();
          this.$notify({
            title: "成功",
            message: "数据权限分配成功",
            type: "success",
            duration: 2000
          });
        } else {
          this.$notify({
            title: "异常",
            message: res.message,
            type: "error",
            duration: 2000
          });
        }
      });
    },
    update (formName) {
      const set = this.$refs;
      set[formName].validate(valid => {
        if (valid) {
          this.dialogFormVisible = false;
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
        username: null,
        name: null,
        sex: "男",
        password: null,
        description: null,
        type: "app",
        refreshToken: null,
        refreshTokenExpire: null,
        auth: null,
        mobilePhone: null,
        telPhone: null,
        email: null,
        address: null,
        userType: null
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
</style>

