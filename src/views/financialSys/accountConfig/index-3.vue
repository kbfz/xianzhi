<template>
  <div class="app-container calendar-list-container">
      <el-row>
          <!-- 左边 -->
          <el-col :span="18">
       <div class="app-container-left">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="姓名或账户" v-model="listQuery.name"> </el-input>
      <el-button class="filter-item" type="primary" v-waves icon="search" @click="handleFilter">搜索</el-button>
      <el-button class="filter-item" v-if="accountConfigManager_btn_add" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="edit">添加</el-button>
    </div>
    <el-table :key='tableKey' :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%" @row-click="detailName" :height="elTableMediaHeight">

      <el-table-column align="center" label="indx" width="65">
      <template scope="scope">
        <span>{{scope.row.indx}}</span>
      </template>
    </el-table-column>
        <el-table-column width="200px" align="center" label="客户编码">
      <template scope="scope">
        <span>{{scope.row.customerCode}}</span>
      </template>
    </el-table-column>
        <el-table-column width="200px" align="center" label="客户名称">
      <template scope="scope">
        <span>{{scope.row.customerName}}</span>
      </template>
    </el-table-column>
        <el-table-column width="200px" align="center" label="价格">
      <template scope="scope">
        <span>{{scope.row.price}}</span>
      </template>
    </el-table-column>
        <el-table-column width="200px" align="center" label="类型:1报关，2仓储">
      <template scope="scope">
        <span>{{scope.row.type}}</span>
      </template>
    </el-table-column>
        <el-table-column width="200px" align="center" label="是否有效:0无效，1有效">
      <template scope="scope">
        <span>{{scope.row.isValid}}</span>
      </template>
    </el-table-column>
        <el-table-column width="200px" align="center" label="创建时间">
      <template scope="scope">
        <span>{{scope.row.createTime}}</span>
      </template>
    </el-table-column>
        <el-table-column width="200px" align="center" label="废弃时间">
      <template scope="scope">
        <span>{{scope.row.abandonTime}}</span>
      </template>
    </el-table-column>
        <el-table-column width="200px" align="center" label="备注">
      <template scope="scope">
        <span>{{scope.row.remark}}</span>
      </template>
    </el-table-column>
        <el-table-column width="200px" align="center" label="扩展字段1">
      <template scope="scope">
        <span>{{scope.row.ext1}}</span>
      </template>
    </el-table-column>
        <el-table-column width="200px" align="center" label="扩展字段2">
      <template scope="scope">
        <span>{{scope.row.ext2}}</span>
      </template>
    </el-table-column>
        <el-table-column width="200px" align="center" label="扩展字段3">
      <template scope="scope">
        <span>{{scope.row.ext3}}</span>
      </template>
    </el-table-column>
      </el-table>
    <div v-show="!listLoading" class="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
    </div>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" :before-close="closeDialog">
      <el-form :model="form" :rules="rules" ref="form" label-width="100px">
        <el-form-item label="客户编码" prop="customerCode">
      <el-input v-model="form.customerCode" placeholder="请输入客户编码"></el-input>
    </el-form-item>
        <el-form-item label="客户名称" prop="customerName">
      <el-input v-model="form.customerName" placeholder="请输入客户名称"></el-input>
    </el-form-item>
        <el-form-item label="价格" prop="price">
      <el-input v-model="form.price" placeholder="请输入价格"></el-input>
    </el-form-item>
        <el-form-item label="类型:1报关，2仓储" prop="type">
      <el-input v-model="form.type" placeholder="请输入类型:1报关，2仓储"></el-input>
    </el-form-item>
        <el-form-item label="是否有效:0无效，1有效" prop="isValid">
      <el-input v-model="form.isValid" placeholder="请输入是否有效:0无效，1有效"></el-input>
    </el-form-item>
        <el-form-item label="创建时间" prop="createTime">
      <el-input v-model="form.createTime" placeholder="请输入创建时间"></el-input>
    </el-form-item>
        <el-form-item label="废弃时间" prop="abandonTime">
      <el-input v-model="form.abandonTime" placeholder="请输入废弃时间"></el-input>
    </el-form-item>
        <el-form-item label="备注" prop="remark">
      <el-input v-model="form.remark" placeholder="请输入备注"></el-input>
    </el-form-item>
        <el-form-item label="扩展字段1" prop="ext1">
      <el-input v-model="form.ext1" placeholder="请输入扩展字段1"></el-input>
    </el-form-item>
        <el-form-item label="扩展字段2" prop="ext2">
      <el-input v-model="form.ext2" placeholder="请输入扩展字段2"></el-input>
    </el-form-item>
        <el-form-item label="扩展字段3" prop="ext3">
      <el-input v-model="form.ext3" placeholder="请输入扩展字段3"></el-input>
    </el-form-item>
        </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel('form')">取 消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="create('form')">确 定</el-button>
        <el-button v-else type="primary" @click="update('form')">确 定</el-button>
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
                  <update-element ref="update"   v-on:childMethod="getList"></update-element>
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
  } from 'api/financialSys/accountConfig/index';
  import { mapGetters } from 'vuex';
  export default {
    name: 'accountConfig',
      components: {
          // 引入编辑的组件
          'update-element': () => import('./components/update')
  },
    data() {
      return {
        form: {
        customerCode : undefined,        customerName : undefined,        price : undefined,        type : undefined,        isValid : undefined,        createTime : undefined,        abandonTime : undefined,        remark : undefined,        ext1 : undefined,        ext2 : undefined,        ext3 : undefined          },
        rules: {
    customerCode: [
  {
    required: true,
    message: '请输入客户编码',
    trigger: 'blur'
  },
  {
    min: 3,
    max: 20,
    message: '长度在 3 到 20 个字符',
    trigger: 'blur'
  }
],   customerName: [
  {
    required: true,
    message: '请输入客户名称',
    trigger: 'blur'
  },
  {
    min: 3,
    max: 20,
    message: '长度在 3 到 20 个字符',
    trigger: 'blur'
  }
],   price: [
  {
    required: true,
    message: '请输入价格',
    trigger: 'blur'
  },
  {
    min: 3,
    max: 20,
    message: '长度在 3 到 20 个字符',
    trigger: 'blur'
  }
],   type: [
  {
    required: true,
    message: '请输入类型:1报关，2仓储',
    trigger: 'blur'
  },
  {
    min: 3,
    max: 20,
    message: '长度在 3 到 20 个字符',
    trigger: 'blur'
  }
],   isValid: [
  {
    required: true,
    message: '请输入是否有效:0无效，1有效',
    trigger: 'blur'
  },
  {
    min: 3,
    max: 20,
    message: '长度在 3 到 20 个字符',
    trigger: 'blur'
  }
],   createTime: [
  {
    required: true,
    message: '请输入创建时间',
    trigger: 'blur'
  },
  {
    min: 3,
    max: 20,
    message: '长度在 3 到 20 个字符',
    trigger: 'blur'
  }
],   abandonTime: [
  {
    required: true,
    message: '请输入废弃时间',
    trigger: 'blur'
  },
  {
    min: 3,
    max: 20,
    message: '长度在 3 到 20 个字符',
    trigger: 'blur'
  }
],   remark: [
  {
    required: true,
    message: '请输入备注',
    trigger: 'blur'
  },
  {
    min: 3,
    max: 20,
    message: '长度在 3 到 20 个字符',
    trigger: 'blur'
  }
],   ext1: [
  {
    required: true,
    message: '请输入扩展字段1',
    trigger: 'blur'
  },
  {
    min: 3,
    max: 20,
    message: '长度在 3 到 20 个字符',
    trigger: 'blur'
  }
],   ext2: [
  {
    required: true,
    message: '请输入扩展字段2',
    trigger: 'blur'
  },
  {
    min: 3,
    max: 20,
    message: '长度在 3 到 20 个字符',
    trigger: 'blur'
  }
],   ext3: [
  {
    required: true,
    message: '请输入扩展字段3',
    trigger: 'blur'
  },
  {
    min: 3,
    max: 20,
    message: '长度在 3 到 20 个字符',
    trigger: 'blur'
  }
]        },
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
        accountConfigManager_btn_edit: false,
        accountConfigManager_btn_del: false,
        accountConfigManager_btn_add: false,
        textMap: {
          update: '编辑',
          create: '创建'
        },
        tableKey: 0
      }
    },
    created() {
      this.getList();
      this.accountConfigManager_btn_edit = this.elements['accountConfigManager:btn_edit'];
      this.accountConfigManager_btn_del = this.elements['accountConfigManager:btn_del'];
      this.accountConfigManager_btn_add = this.elements['accountConfigManager:btn_add'];
    },
    computed: {
      ...mapGetters([
        'elements',
        'elTableMediaHeight'
      ])
    },
    methods: {
        // 关闭el-dialog 前的回调函数 重置表单
        closeDialog() {
            this.dialogFormVisible = false
            this.$refs['form'].resetFields()
        },
        // 查看详情
        detailName(row) {
            // this.showDetail = true
            this.$refs.update.formEdit = true
            this.$refs.update.disabledForm = true
            this.$refs.update.updateView = true
            getObj(row.id).then(response => {
                this.$refs.update.resetFormFields();
            this.$refs.update.form = response.data
            //  console.log(row.id)
        })
        },
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
