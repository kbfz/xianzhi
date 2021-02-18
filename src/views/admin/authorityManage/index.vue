<template>
<div class="app-container calendar-list-container"> 
   <el-row> 
    <!-- 左边 --> 
    <el-col :span="18"> 
     <div class="app-container-left"> 
      <div class="filter-container"> 
       <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="url地址" v-model="query.requestUrl"> 
       </el-input> 
       <el-button class="filter-item" type="primary" v-waves icon="search" @click="handleFilter">
        搜索
       </el-button> 
       <el-button class="filter-item" v-if="userManager_btn_add" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="edit">
        添加
       </el-button> 
      </div> 
      <el-table :key="tableKey" :data="list" v-loading.body="listLoading" border="" fit="" highlight-current-row="" style="width: 100%" :height="elTableMediaHeight" @row-click="detailName"> 
       <el-table-column align="center"  label="序号"   type="index" width="70px"> 
       
       </el-table-column> 
        <el-table-column  align="center" label="url地址" width="300px"> 
        <template scope="scope"> 
         <span>{{scope.row.requestUrl}}</span> 
        </template> 
       </el-table-column> 
       <el-table-column align="center" label="数据权限规则描述" width="370px"> 
        <template scope="scope"> 
         <span>{{scope.row.requestFilterField}}</span> 
        </template> 
       </el-table-column> 
       <el-table-column  align="center" label="文字描述" width="370px"> 
        <template scope="scope"> 
         <span>{{scope.row.des}}</span> 
        </template> 
       </el-table-column>
       <el-table-column align="center" label="操作" width="152px"> 
        <template scope="scope"> 
         <!-- <el-button v-if="userManager_btn_edit" size="small" type="success" icon="edit" @click="handleUpdate(scope.row)">编辑 --> 
         <!-- </el-button> --> 
         <el-button v-if="userManager_btn_del" size="small" type="danger" icon="delete" @click="handleDelete(scope.row)">
          删除 
         </el-button> 
        </template> 
       </el-table-column> 
      </el-table> 
      <div v-show="!listLoading" class="pagination-container"> 
       <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"> 
       </el-pagination> 
      </div> 
      <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" :before-close="closeDialog" :close-on-click-modal="false" > 
       <!--  编辑的时候账户前面的标识 * --> 
       <!-- <span v-if="formUpdate" class="formUpdate">*</span> --> 
       <el-form :model="form" :rules="rules" ref="form" label-width="140px"> 
        <el-form-item label="url地址" prop="requestUrl"> 
         <el-input v-model="form.requestUrl" placeholder="请输入URL地址"></el-input> 
        </el-form-item> 
        <el-form-item label="数据权限规则描述" prop="requestFilterField" > 
         <el-input  v-model="form.requestFilterField" placeholder="请输入数据权限规则描述"></el-input> 
        </el-form-item> 
        <el-form-item  label="文字描述" prop="des"> 
         <el-input v-model="form.des" placeholder="请输入文字描述"></el-input> 
        </el-form-item> 
       </el-form> 
       <div slot="footer" class="dialog-footer"> 
        <el-button @click="cancel('form')">
         取 消
        </el-button> 
        <el-button v-if="dialogStatus=='create'" type="primary" @click="create('form')">
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
     <div class="app-container-right" ref="lineHeight"> 
      <!-- v-on:childMethod="getList"   在子组件里面调用父组件的getList方法 childMethod是子组件里面参数名 --> 
      <update-element ref="update"  v-on:childMethod="getList"></update-element> 
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
} from "api/admin/authorityManage/index";
import { getGroupIdArray, fetchTree } from "api/admin/group/index";
// 引入防止重复的校验规则 判断字符串长度
import { userValidator, strLength } from "utils/validate";
import { guid } from "utils/index";
import { mapGetters } from "vuex";
var dformat = require("silly-datetime");
export default {
  name: "user",
  components: {
    // 引入编辑的组件
    "update-element": () => import("./components/update")
  },
  data() {
    return {
      form: {
        id: undefined,
        requestFilterField: undefined,
        requestUrl: undefined,
        des: undefined
      },
      // 是否禁用
      formEdit: false,
      // 判断添加和编辑的时账户的显示隐藏
      formUpdate: false,
      formCreate: false,
      rules: {
        requestUrl: [
          {
            required: true,
            message: "请输入URL地址",
            trigger: "blur"
          }
        ],
        requestFilterField: [
          {
            required: true,
            message: "请输入数据权限规则描述",
            trigger: "blur"
          }
        ],
        des: [
          {
            required: true,
            message: "请输入文字描述",
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
      query: {requestUrl: ''},
      listQuery: {
        page: 1,
        limit: 20
      },
      dialogFormVisible: false,
      dialogRoleVisible: false,
      dialogStatus: "",
      userManager_btn_edit: false,
      userManager_btn_del: false,
      userManager_btn_add: false,
      userManager_btn_role: false,
      filterText: "",
      roleDialog: {
        userId: undefined,
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
      tableKey: 0
    };
  },
  created() {
    this.getList();
    this.userManager_btn_edit = this.elements["userManager:btn_edit"];
    this.userManager_btn_del = this.elements["userManager:btn_del"];
    this.userManager_btn_add = this.elements["userManager:btn_add"];
    this.userManager_btn_role = this.elements["userManager:btn_role"];
    // this.$refs.update.showView = true
    // console.log( this.userManager_btn_role)
  },
  computed: {
    ...mapGetters(["elements", "elTableMediaHeight"])
  },
  watch: {
    filterText(val) {
      this.$refs.groupTree.filter(val);
    },
    "form.type": function(val) {
      if (val === "api") {
        this.showToken = true;
      } else {
        this.showToken = false;
      }
    }
  },
  methods: {
    // 关闭el-dialog 前的回调函数 重置表单
    closeDialog() {
      this.dialogFormVisible = false;
      this.$refs["form"].resetFields();
    },
    getList() {
      this.listLoading = true;
      let param = {
        requestUrl: this.query.requestUrl,
        ...this.listQuery
      }
      page(param).then(response => {
        //  console.log(response.data.rows)
        this.list = response.data.rows;
        this.total = response.data.total;
        this.listLoading = false;
      });
    },
      // 查看详情
    detailName(row) {
      this.$refs.update.formEdit = true;
      this.$refs.update.disabledForm = true;
      this.$refs.update.updateView = true;
      getObj(row.id).then(response => {
        response.data.requestFilterField = JSON.stringify(response.data.requestFilterField)
        this.$refs.update.resetFormFields();
        this.$copyJsonProperty(this.$refs.update.form, response.data)
        // this.$refs.update.form = response.data;
      });
    },
    handleFilter() {
      this.getList();
    },
    handleSizeChange(val) {
      this.listQuery.limit = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.getList();
    },
    handleCreate() {
      this.resetTemp();
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
    },
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
    create(formName) {
      const set = this.$refs;
      set[formName].validate(valid => {
        if (valid) {
            // this.form.requestFilterField = $.parseJSON(this.form.requestFilterField);
            let formTemp = {requestUrl: this.form.requestUrl,requestFilterField: $.parseJSON(this.form.requestFilterField),des: this.form.des}
            addObj(formTemp).then((res) => {
            this.dialogFormVisible = false;
            if(res.rel === true) {
              this.$notify({
              title: "成功",
              message: "创建成功",
              type: "success",
              duration: 2000
            });
             this.getList();
            } else {
               this.$notify({
              title: "异常",
              message: res.message,
              type: "error",
              duration: 2000
            });
            }
          });
        } else {
          return false;
        }
      });
    },
    cancel(formName) {
      this.dialogFormVisible = false;
      this.$refs[formName].resetFields();
    },
    update(formName) {
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
    resetTemp() {
      this.form = {
        id: undefined,
        requestFilterField: undefined,
        requestUrl: '',
         des: ''
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

