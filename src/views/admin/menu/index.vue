<template>
<div class="app-container calendar-list-container">
  <div class="filter-container">
     <el-button-group>
    <el-button type="primary" v-if="menuManager_btn_add" icon="plus" @click="handlerAdd">添加</el-button>
    <el-button type="primary" v-if="menuManager_btn_edit" icon="edit" @click="handlerEdit">编辑</el-button>
    <el-button type="primary" v-if="menuManager_btn_del" icon="delete" @click="handleDelete">删除</el-button>
   </el-button-group>
  </div>
 <el-row>
  <el-col :span="8" style='margin-top:15px;'>
    <el-input
      placeholder="输入关键字进行过滤"
      v-model="filterText">
    </el-input>
    <div class="wAuto">
       <el-tree
      class="filter-tree"
      :data="treeData"
      node-key="id"
      highlight-current
      :props="defaultProps"
      :filter-node-method="filterNode"
      ref="menuTree"
      @node-click="getNodeData"
      default-expand-all
      >
    </el-tree>
    </div>
   
  </el-col>
  <el-col :span="16" style='margin-top:15px;'>
     <el-card class="box-card">
       <!-- 添加校验规则 rules -->
    <el-form :label-position="labelPosition" label-width="80px" :model="form" ref="form" :rules="rules">
      <el-form-item label="路径编码" prop="code">
        <!-- 给路径编码和标题添加不同的禁用名称  -->
          <el-input v-model="form.code" :disabled="formEditTwo" placeholder="请输入路径编码"></el-input>
      </el-form-item>
          <el-form-item label="标题" prop="title" >
          <el-input v-model="form.title"  :disabled="formEdit" placeholder="请输入标题"></el-input>
      </el-form-item>
          <el-form-item label="父级节点" prop="parentId">
          <el-input v-model="form.parentId" :disabled="formEdit" placeholder="请输入父级节点" ></el-input>
      </el-form-item>
      <el-form-item label="图标" prop="icon">
          <el-input v-model="form.icon" :disabled="formEdit" placeholder="请输入图标"></el-input>
      </el-form-item>
          <el-form-item label="资源路径" prop="href">
          <el-input v-model="form.href" :disabled="formEdit" placeholder="请输入资源路径"></el-input>
      </el-form-item>
      <el-form-item label="类型" prop="type">
         <el-select class="filter-item" v-model="form.type"  :disabled="formEdit"  placeholder="请输入资源请求类型">
           <!-- 资源请求类型修改为中文的 -->
          <el-option v-for="item in  typeOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="排序" prop="orderNum">
          <el-input v-model="form.orderNum" :disabled="formEdit" placeholder="请输入排序"></el-input>
      </el-form-item>
      <el-form-item label="描述"   prop="description">
          <el-input v-model="form.description" :disabled="formEdit" placeholder="请输入描述"></el-input>
      </el-form-item>
       <el-form-item label="前端组件"   prop="attr1">
          <el-input v-model="form.attr1" :disabled="formEdit" placeholder="请输入描述"></el-input>
      </el-form-item>
       <el-form-item label="appId"  prop="attr2" v-if="isShow">
          <el-input v-model="form.attr2"  placeholder="点我生成appId"  :disabled="formEdit">
            <el-button slot="prepend" icon="setting" @click="generateAppId"></el-button>
          </el-input>
      </el-form-item>
      <!-- 添加系统地址 -->
      <el-form-item label="系统地址" prop="attr3"  v-if="isShow">
          <el-input v-model="form.attr3" placeholder="请输入系统地址"  :disabled="formEdit">
          </el-input>
      </el-form-item>
       <el-form-item v-if="formStatus == 'update'">
        <el-button type="primary" @click="update">更新</el-button>
        <!-- <el-button @click="onCancel('form')">取消</el-button> -->
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
      <el-form-item v-if="formStatus == 'create'">
        <el-button type="primary" @click="create('form')">保存</el-button>
        <!-- <el-button @click="onCancel('form')">取消</el-button> -->
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
     </el-card>
    <el-card class="box-card">
        <span>按钮或资源</span>
      <menu-element :menuId='currentId' ref="menuElement"></menu-element>
    </el-card>
  </el-col>
</el-row>
<div></div>
  </div>
</template>

<script>
import {
  fetchTree, getObj, addObj, delObj, putObj
} from 'api/admin/menu/index';
import {
  guid
} from 'utils/index'
import { mapGetters } from 'vuex';
// 添加防止重复的校验规则
import { menuValidator, menuTitleValidator } from "utils/validate"
export default {
  name: 'menu',
  components: {
    'menu-element': () => import('./components/element')
  },
  data() {
    return {
      filterText: '',
      list: null,
      total: null,
      formEdit: true,
      // 路径编码和标题是否禁用
      formEditTwo: true,
      formAdd: true,
      formStatus: '',
      showElement: false,
      // 资源类型下拉框内容
      typeOptions: [
        {
          value: 'menu', label: '菜单'
        },
        {
          value: 'dirt', label: '目录'
        },
        {
          value: 'api', label: '接口'
        }

      ],
      // typeOptions: ['菜单', '目录', '接口'],
      listQuery: {
        name: undefined
      },
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      labelPosition: 'right',
      parentIdReadOnly:true,
      form: {
        code: undefined,
        title: undefined,
        parentId: undefined,
        href: undefined,
        icon: undefined,
        orderNum: 0,
        description: undefined,
        path: undefined,
        enabled: undefined,
        type: undefined,
        attr1: undefined,
        attr2: undefined,
        id: undefined,
        // 系统地址
        attr3: undefined
      },
      currentId: -1,
      menuManager_btn_add: false,
      menuManager_btn_edit: false,
      menuManager_btn_del: false,
      // appId显示隐藏
      isShow: true,
      // 添加表单校验
      rules: {
        code: [
           {
            required: true,
            message: '请输入路径编码',
            trigger: 'blur'
          },
          {
            validator: menuValidator,
            trigger: 'blur'
          }
        ],
        title: [
          {
          required: true,
          message: '请输入标题',
          trigger: 'blur'
         }
          // {
          //   validator: menuTitleValidator,
          //   trigger: 'blur'
          // }
        ]
      }
    }
  },
  watch: {
    filterText(val) {
      this.$refs.menuTree.filter(val);
    }
  },
  created() {
    this.getList();
    this.menuManager_btn_add = this.elements['menuManager:btn_add'];
    this.menuManager_btn_del = this.elements['menuManager:btn_del'];
    this.menuManager_btn_edit = this.elements['menuManager:btn_edit'];
  },
  computed: {
    ...mapGetters([
      'elements'
    ])
  },
  methods: {
    generateAppId() {
      // 添加了this.formEditTwo
      if (!this.formEdit) {
        this.$confirm('此操作将覆盖原app的appId, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.form.attr2 = guid();
        }).catch(() => {
        });
      }
    },
    getList() {
      fetchTree(this.listQuery).then(data => {
        this.treeData = data;
      });
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    getNodeData(data, node) {
      this.$refs['form'].resetFields();
      // 添加了this.formEditTwo
      if (!this.formEdit && !this.formEditTwo) {
        this.formStatus = 'update';
        // 路径编码和标题为禁用状态
        this.formEditTwo = true
        // 重置表单校验
        this.$refs['form'].resetFields()
      }
      getObj(data.id).then(response => {
        this.$copyJsonProperty(this.form, response.data);
      });
      // node.level获取当前节点是第几级
     if (node.level === 1) {
        this.isShow = true
      } else {
        this.isShow = false
     };
      this.currentId = data.id;
      this.showElement = true;
      this.$refs.menuElement.menuId = data.id;
      this.$refs.menuElement.getList();
    },
    handlerEdit() {
      if (this.form.id) {
        this.formEdit = false;
        this.formStatus = 'update';
      }
    },
    handlerAdd() {
      // 添加表单重置
      this.$refs['form'].resetFields()
      this.resetForm();
      this.form.parentId = this.currentId;
      this.formEdit = false;
      // 路径编码和标题没有禁用
      this.formEditTwo = false;
      this.formStatus = 'create';
    },
    handleDelete() {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delObj(this.currentId).then(() => {
          this.getList();
          this.resetForm();
          this.onCancel();
          this.$notify({
            title: '成功',
            message: '删除成功',
            type: 'success',
            duration: 2000
          });
        });
      });
    },
    update() {
          putObj(this.form.id, this.form).then(() => {
            this.getList();
            this.$notify({
              title: '成功',
                message: '更新成功',
                type: 'success',
                duration: 2000
             });
          })
    },
    create(formName) {
      // 添加校验规则
       const set = this.$refs;
        set[formName].validate((valid) => {
        if (valid) {
          addObj(this.form).then(() => {
            this.getList();
            // console.log(this.form)
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
          });
         })
        } else {
          return false
        }
      })
    },
    onCancel(formName) {
      this.formEdit = true;
      // 路径编码和标题禁用
      this.formEditTwo = true
      this.formStatus = '';
      //  this.$refs[formName].resetFields()
       this.$refs['form'].resetFields()
    },
    resetForm() {
      this.form = {
        code: undefined,
        title: undefined,
        parentId: undefined,
        href: undefined,
        icon: undefined,
        orderNum: undefined,
        description: undefined,
        path: undefined,
        enabled: undefined,
        type: undefined,
        attr1: undefined,
        attr2: undefined,
        id: undefined,
        // 系统地址
        attr3: undefined
      }
    }
  }
}
</script>
<style scoped>
 .wAuto{
   position: absolute;
   height: 100%;
   width: 33.33%;
   overflow: auto;
 }
</style>

