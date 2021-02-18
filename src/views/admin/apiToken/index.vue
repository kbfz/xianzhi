<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="姓名或账户" v-model="listQuery.name"> </el-input>
      <el-button class="filter-item" type="primary" v-waves icon="search" @click="handleFilter">搜索</el-button>
      <el-button class="filter-item" v-if="apiManager_btn_add" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="edit">添加</el-button>
    </div>
    <el-table :key='tableKey' :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">

      <el-table-column align="center" label="id" width="65">
      <template scope="scope">
        <span>{{scope.row.id}}</span>
      </template>
    </el-table-column>
        <el-table-column width="200px" align="center" label="api描述">
      <template scope="scope">
        <span>{{scope.row.appDes}}</span>
      </template>
    </el-table-column>
        <el-table-column width="200px" align="center" label="accessToken">
      <template scope="scope">
        <span>{{scope.row.appAccessToken}}</span>
      </template>
    </el-table-column>
        <el-table-column width="200px" align="center" label="accessToken过期时间">
      <template scope="scope">
        <span>{{scope.row.accessTokenExpire}}</span>
      </template>
    </el-table-column>
        <el-table-column width="200px" align="center" label="refreshToken">
      <template scope="scope">
        <span>{{scope.row.appRefreshToken}}</span>
      </template>
    </el-table-column>
        <el-table-column width="200px" align="center" label="refreshToken过期时间">
      <template scope="scope">
        <span>{{scope.row.refreshTokenExpire}}</span>
      </template>
    </el-table-column>
        <el-table-column width="200px" align="center" label="状态">
      <template scope="scope">
        <span>{{scope.row.status}}</span>
      </template>
    </el-table-column>
        <el-table-column  align="center" label="操作" width="150"> <template scope="scope">
        <el-button v-if="apiManager_btn_edit" size="small" type="success" @click="handleUpdate(scope.row)">编辑
        </el-button>
        <el-button v-if="apiManager_btn_del" size="small" type="danger" @click="handleDelete(scope.row)">删除
        </el-button>
      </template> </el-table-column>
    </el-table>
    <div v-show="!listLoading" class="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
    </div>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
      <el-form :model="form" :rules="rules" ref="form" label-width="100px">
        <el-form-item label="user表ID" prop="userId">
      <el-input v-model="form.userId" placeholder="请输入user表ID"></el-input>
    </el-form-item>
        <el-form-item label="app描述" prop="appDes">
      <el-input v-model="form.appDes" placeholder="请输入app描述"></el-input>
    </el-form-item>
        <el-form-item label="app调用api接口的时候全局唯一票据" prop="appAccessToken">
      <el-input v-model="form.appAccessToken" placeholder="请输入app调用api接口的时候全局唯一票据"></el-input>
    </el-form-item>
        <el-form-item label="token过期的秒数" prop="accessTokenExpire">
      <el-input v-model="form.accessTokenExpire" placeholder="请输入token过期的秒数"></el-input>
    </el-form-item>
        <el-form-item label="刷新token" prop="appRefreshToken">
      <el-input v-model="form.appRefreshToken" placeholder="请输入刷新token"></el-input>
    </el-form-item>
        <el-form-item label="refreshtoken过期时间" prop="refreshTokenExpire">
      <el-input v-model="form.refreshTokenExpire" placeholder="请输入refreshtoken过期时间"></el-input>
    </el-form-item>
        <el-form-item label="1:正常 2：禁用" prop="status">
      <el-input v-model="form.status" placeholder="请输入1:正常 2：禁用"></el-input>
    </el-form-item>
        <el-form-item label="" prop="updTime">
      <el-input v-model="form.updTime" placeholder="请输入"></el-input>
    </el-form-item>
        <el-form-item label="" prop="crtTime">
      <el-input v-model="form.crtTime" placeholder="请输入"></el-input>
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
  } from 'api/admin/apiToken/index';
  import { mapGetters } from 'vuex';
  export default {
    name: 'api',
    data() {
      return {
        form: {
        userId : undefined,
        appDes : undefined,        
        appAccessToken : undefined,        
        accessTokenExpire : undefined,        
        appRefreshToken : undefined,        
        refreshTokenExpire : undefined,        
        status : undefined,        
        updTime : undefined,        
        crtTime : undefined          
        },
        rules: {
            userId: [
          {
            required: true,
            message: '请输入user表ID',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 20,
            message: '长度在 3 到 20 个字符',
            trigger: 'blur'
          }
        ],   
        appDes: [
          {
            required: true,
            message: '请输入app描述',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 20,
            message: '长度在 3 到 20 个字符',
            trigger: 'blur'
          }
        ],   
        appAccessToken: [
          {
            required: true,
            message: '请输入app调用api接口的时候全局唯一票据',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 20,
            message: '长度在 3 到 20 个字符',
            trigger: 'blur'
          }
        ],   
        accessTokenExpire: [
          {
            required: true,
            message: '请输入token过期的秒数',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 20,
            message: '长度在 3 到 20 个字符',
            trigger: 'blur'
          }
        ],   
        appRefreshToken: [
          {
            required: true,
            message: '请输入刷新token',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 20,
            message: '长度在 3 到 20 个字符',
            trigger: 'blur'
          }
        ],   
        refreshTokenExpire: [
          {
            required: true,
            message: '请输入refreshtoken过期时间',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 20,
            message: '长度在 3 到 20 个字符',
            trigger: 'blur'
          }
        ],   
        status: [
          {
            required: true,
            message: '请输入1:正常 2：禁用',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 20,
            message: '长度在 3 到 20 个字符',
            trigger: 'blur'
          }
        ],   
        updTime: [
          {
            required: true,
            message: '请输入',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 20,
            message: '长度在 3 到 20 个字符',
            trigger: 'blur'
          }
        ],   
        crtTime: [
          {
            required: true,
            message: '请输入',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 20,
            message: '长度在 3 到 20 个字符',
            trigger: 'blur'
          }
        ]        
},
        list: null,
        total: null,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 20,
          name: undefined
        },
        dialogFormVisible: false,
        dialogStatus: '',
        apiManager_btn_edit: false,
        apiManager_btn_del: false,
        apiManager_btn_add: false,
        textMap: {
          update: '编辑',
          create: '创建'
        },
        tableKey: 0
      }
    },
    created() {
      this.getList();
      this.apiManager_btn_edit = this.elements['apiManager:btn_edit'];
      this.apiManager_btn_del = this.elements['apiManager:btn_del'];
      this.apiManager_btn_add = this.elements['apiManager:btn_add'];
    },
    computed: {
      ...mapGetters([
        'elements'
      ])
    },
    methods: {
      getList() {
        this.listLoading = true;
        page(this.listQuery)
            .then(response => {
          this.list = response.data.rows;
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
      },
      handleUpdate(row) {
        getObj(row.id)
            .then(response => {
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
            })
            .then(() => {
          delObj(row.id)
      .then(() => {
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
        set[formName].validate(valid => {
        if (valid) {
        addObj(this.form)
        .then(() => {
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
        this.form = {
          username: undefined,
          name: undefined,
          sex: '男',
          password: undefined,
          description: undefined
        };
      }
    }
  }
</script>
