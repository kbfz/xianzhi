<template>
  <!-- <div class="app-container calendar-list-container"> -->
    <div class=" calendar-list-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="资源名称" v-model="listQuery.name"> </el-input>
      <el-button class="filter-item" type="primary" v-waves icon="search" @click="handleFilter">搜索</el-button>
      <el-button class="filter-item" v-if="menuManager_btn_element_add" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="edit">添加</el-button>
    </div>
    <el-table :key='tableKey' :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="id" width="65">
        <template scope="scope">
          <span>{{scope.row.id}}</span>
  </template>

</el-table-column>
    <el-table-column width="200px" align="center" label="资源编码" show-overflow-tooltip><template scope="scope">
  <span>
    {{scope.row.code}}</span>
  </template>

</el-table-column>
    <el-table-column width="200px" align="center" label="资源类型" show-overflow-tooltip><template scope="scope">
  <span>
    {{scope.row.type}}</span>
 </template>

</el-table-column>
    <el-table-column width="200px" align="center" label="资源名称" show-overflow-tooltip><template scope="scope">
  <span>
    {{scope.row.name}}</span>
 </template>

</el-table-column>
    <el-table-column width="200px" align="center" label="资源地址" show-overflow-tooltip><template scope="scope">
  <span>
    {{scope.row.uri}}</span>
 </template>
</el-table-column>
    <el-table-column width="200px" align="center" label="资源请求类型" show-overflow-tooltip><template scope="scope">
  <span>
    {{scope.row.method}}</span>
 </template>

</el-table-column>
    <el-table-column width="200px" align="center" label="描述" show-overflow-tooltip><template scope="scope">
  <span>
    {{scope.row.description}}</span>
 </template>

</el-table-column>
    <el-table-column fixed="right" align="center" label="操作" width="150"><template scope="scope">
  <el-button v-if="menuManager_btn_element_edit" size="small" type="success" @click="handleUpdate(scope.row)">
    编辑
  </el-button>
  <el-button v-if="menuManager_btn_element_del" size="small" type="danger" @click="handleDelete(scope.row)">删除
  </el-button>
 </template>

</el-table-column>
  </el-table>
  <div v-show="!listLoading" class="pagination-container">
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
  </div>
  <!-- before-close 关闭el-dialog前面的回调函数 -->
  <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" :before-close="close" :close-on-click-modal="false">
    <el-form :model="form" :rules="rules" ref="form" label-width="100px">
      <!-- 点击添加的时候 -->
      <el-form-item label="资源编码" prop="code" v-if="formCreate">
        <el-input v-model="form.code" placeholder="请输入资源编码"></el-input>
      </el-form-item>
      <!-- 点击编辑的时候显示 -->
      <!-- span为编辑的时候资源编码前面的*标识 -->
       <span class="formUpdate" v-if="formUpdate">*</span>
       <el-form-item label="资源编码" v-if="formUpdate"  prop="">
        <el-input v-model="form.code" placeholder="请输入资源编码" :disabled="formEdit"></el-input>
      </el-form-item>
      <el-form-item label="资源类型" prop="type">
         <el-select class="filter-item" v-model="form.type" placeholder="请输入资源类型">
          <el-option v-for="item in  typeOptions" :key="item.value" :label="item.label" :value="item.label"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="资源名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入资源名称"></el-input>
      </el-form-item>
      <el-form-item label="资源地址" prop="uri">
        <el-input v-model="form.uri" placeholder="请输入资源地址"></el-input>
      </el-form-item>
      <el-form-item label="资源请求类型" prop="method">
        <el-select class="filter-item" v-model="form.method" placeholder="请输入资源请求类型">
          <el-option v-for="item in  methodOptions" :key="item" :label="item" :value="item"> </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel('form')">取 消</el-button>
      <el-button v-if="dialogStatus=='create'" type="primary" @click="create('form')">确 定</el-button>
      <el-button v-else type="primary" @click="update('form')">确 定</el-button>
    </div>
  </el-dialog>
</div>
</template>
<script>
import {
  page,
  addObj,
  getObj,
  delObj,
  putObj
} from 'api/admin/element/index';
import { mapGetters } from 'vuex';
// 引入重复校验
import { btnValidator, strLength } from "utils/validate"
export default {
  name: 'element',
  // props: {
  //   menuId: {
  //     default: '1'
  //   }
  // },
  data() {
    return {
      methodOptions: ['GET', 'POST', 'PUT', 'DELETE'],
      typeOptions: [{
        value: 'uri',
        label: 'uri'
      }, {
          value: 'button',
        label: 'button'
        }],
      form: {
        code: undefined,
        type: undefined,
        name: undefined,
        uri: undefined,
        menuId: undefined,
        method: undefined,
        description: undefined
      },
      rules: {
        code: [{
          required: true,
          message: '请输入资源编码',
          trigger: 'blur'
        },
        // {
        //   min: 3,
        //   max: 20,
        //   message: '长度在 3 到 20 个字符',
        //   trigger: 'blur'
        // },
        // 防止编码重复
        // {
        //   validator: btnValidator,
        //   trigger: 'blur'
        // }
        ],
        type: [{
          required: true,
          message: '请输入资源类型',
          trigger: 'blur'
        },
        {
          min: 2,
          max: 20,
          message: '长度在 2 到 20 个字符',
        }
        ],
        name: [{
          required: true,
          message: '请输入资源名称',
          trigger: 'blur'
        },
        // 判断字符串的长度为3~20个字符
        {
          validator: strLength,
          trigger: 'blur'
        }
        // {
        //   min: 3,
        //   max: 20,
        //   message: '长度在 3 到 20 个字符',
        //   trigger: 'blur'
        // }
        ],
        uri: [{
          required: true,
          message: '请输入',
          trigger: 'blur'
        },
        {
          min: 3,
          max: 20,
          message: '长度在 3 到 20 个字符',
        }
        ],
        method: [{
          required: true,
          message: '请输入资源请求类型',
          trigger: 'blur'
        },
        {
          min: 3,
          max: 20,
          message: '长度在 3 到 20 个字符',
          trigger: 'blur'
        }
        ],
        description: [{
          required: true,
          message: '请输入',
          trigger: 'blur'
        },
        {
          min: 3,
          max: 20,
          message: '长度在 3 到 20 个字符',
        }
        ]
      },
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        name: undefined,
        menuId: this.menuId
      },
      dialogFormVisible: false,
      dialogStatus: '',
      menuManager_btn_element_add: false,
      menuManager_btn_element_edit: false,
      menuManager_btn_element_del: false,
      menuId: -1,
      textMap: {
        update: '编辑',
        create: '创建'
      },
      tableKey: 0,
      // 是否禁用资源编码输入框
      formEdit: false,
      // 资源编码显示隐藏
      formCreate: false,
      formUpdate: false
    }
  },
  created() {
    this.getList();
    // console.log(this.form.type)
    this.menuManager_btn_element_add = this.elements['menuManager:btn_element_add'];
    this.menuManager_btn_element_del = this.elements['menuManager:btn_element_del'];
    this.menuManager_btn_element_edit = this.elements['menuManager:btn_element_edit'];
  },
  computed: {
    ...mapGetters([
      'elements'
    ])
  },
  methods: {
    getList() {
      this.listLoading = true;
      this.listQuery.menuId = this.menuId;
      page(this.listQuery).then(response => {
        this.list = response.data.rows;
        // console.log(this.list)
        this.total = response.data.total;
        this.listLoading = false;
      })
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
      this.dialogStatus = 'create';
      this.dialogFormVisible = true;
      this.formEdit = false
      // 添加的时候资源编码进行校验
      this.formCreate = true
      this.formUpdate = false
    },
    handleUpdate(row) {
      this.formEdit = true
      // 编辑的时候资源编码不进行校验
      this.formCreate = false
      this.formUpdate = true
      getObj(row.id).then(response => {
        this.form = response.data;
        this.dialogFormVisible = true;
        this.dialogStatus = 'update';
      });
    },
    handleDelete(row) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delObj(row.id).then(() => {
          this.$notify({
            title: '成功',
            message: '删除成功',
            type: 'success',
            duration: 2000
          });
          const index = this.list.indexOf(row);
          this.list.splice(index, 1);
        });
      });
    },
    create(formName) {
      const set = this.$refs;
      this.form.menuId = this.menuId;
      set[formName].validate(valid => {
        if (valid) {
          addObj(this.form).then(() => {
            this.dialogFormVisible = false;
            this.getList();
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            });
          })
        } else {
          return false;
        }
      });
    },
    cancel(formName) {
      this.dialogFormVisible = false;
      const set = this.$refs;
      set[formName].resetFields();
    },
    update(formName) {
      const set = this.$refs;
      this.form.menuId = this.menuId;
      set[formName].validate(valid => {
        if (valid) {
          this.dialogFormVisible = false;
          this.form.password = undefined;
          putObj(this.form.id, this.form).then(() => {
            this.dialogFormVisible = false;
            this.getList();
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            });
          });
        } else {
          return false;
        }
      });
    },
    resetTemp() {
      // this.form = {
      //   username: undefined,
      //   name: undefined,
      //   sex: '男',
      //   password: undefined,
      //   description: undefined
      // };
       this.form = {
        code: undefined,
        type: undefined,
        name: undefined,
        uri: undefined,
        menuId: undefined,
        method: undefined,
        description: undefined
      }
    },
    // 关闭el-dialog前的回调函数 重置表单
    close() {
      this.dialogFormVisible = false
      this.$refs['form'].resetFields()
    }
  }
}
</script>
 <style scoped>
 /* 编辑里面账户前面的*标识 */
 .formUpdate{
    display: inline-block;
    position: relative;
    top: 27px;
    left: 22px;
    color: red;
 }
</style>

