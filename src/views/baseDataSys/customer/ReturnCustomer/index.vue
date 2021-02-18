<template>
  <div class="app-container calendar-list-container">
    <el-row>
      <!-- 左边 -->
      <el-col :span="18">
        <div class="app-container-left">
          <div class="filter-container">
            <!-- <el-input @keyup.enter.native="handleFilter"
                      style="width: 200px;"
                      class="filter-item"
                      placeholder="请输入客户名称"
                      v-model="query.customerName"> </el-input> -->
            <el-select @keyup.enter.native="handleFilter"
                       placeholder="请选择客户名称"
                       v-model="query.customerCode"
                       clearable
                       style="width: 200px"
                       popper-class="optionsContent"
                       filterable>
              <el-option v-for="item in selectCustom"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
            <el-input @keyup.enter.native="handleFilter"
                      style="width: 200px;"
                      class="filter-item"
                      placeholder="请输入客户名称或编码"
                      v-model="query.customerName"> </el-input>
            <el-button class="filter-item"
                       type="primary"
                       v-waves
                       icon="search"
                       @click="handleFilter">搜索</el-button>
            <el-button class="filter-item"
                       v-if="bdCustomerManager_btn_add"
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
                    :height="elTableMediaHeight">
            <el-table-column width="200px"
                             align="center"
                             label="客户名称"
                             show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.customerName}}</span>
              </template>
            </el-table-column>
            <el-table-column min-width="180"
                             align="center"
                             label="客户编码"
                             show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.customerCode}}</span>
              </template>
            </el-table-column>
            <el-table-column min-width="250"
                             align="center"
                             label="电商平台名称"
                             show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.platformName}}</span>
              </template>
            </el-table-column>
            <el-table-column min-width="200"
                             align="center"
                             label="电商平台"
                             show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.platformCode}}</span>
              </template>
            </el-table-column>
            <el-table-column min-width="200"
                             align="center"
                             label="回调地址"
                             show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.url}}</span>
              </template>
            </el-table-column>
            <!-- <el-table-column min-width="170"
                             align="center"
                             label="平台类型"
                             show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.platformTypeName}}</span>
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
                     class="receiptWidth450">
            <el-form :model="form"
                     :rules="rules"
                     ref="form"
                     label-width="120px"
                     :inline="true"
                     class="formLeft">
              <span class="xhText">*</span>
              <el-form-item label="客户名称"
                            label-width="120px"
                            prop="customerName">
                <el-select placeholder="请选择客户名称"
                           v-model="form.customerName"
                           clearable
                           filterable
                           @change="changeValueCus">
                  <el-option v-for="item in selectCustom"
                             :key="item.value"
                             :value="item"
                             :label="item.label"></el-option>
                </el-select>
                <div class="el-form-item__error"
                     v-if="custValue">请选择客户名称</div>
              </el-form-item>
              <div>
                <span class="xhText l71">*</span>
                <el-form-item label="电商平台名称"
                              prop="platformName"
                              label-width="120px">
                  <el-select v-model="form.platformName"
                             placeholder="请选择电商平台名称"
                             style="width: 200px"
                             filterable
                             clearable
                             @change="changeValue">
                    <el-option v-for="item in selectPlatfrom"
                               :key="item.value"
                               :label="item.label"
                               :value="item">
                    </el-option>
                  </el-select>
                  <div class="el-form-item__error"
                       v-if="platValue">请选择电商平台名称</div>
                </el-form-item>
              </div>
              <div>
                <span class="xhText">*</span>
                <el-form-item label="回调地址">
                  <el-input v-model="form.url"
                            placeholder="请输入回调地址"></el-input>
                  <span class="zhushi">多个回传地址用英文逗号分隔开</span>
                  <div class="el-form-item__error"
                       v-if="urlValue">请输入url地址</div>
                </el-form-item>
              </div>
              <div>
                <!-- <el-form-item label="平台类型" label-width="130px">
                  <el-select v-model="form.platformTypeName"
                             placeholder="请选择平台类型"
                             style="width: 200px"
                             filterable
                             clearable>
                    <el-option v-for="item in selectTypeName"
                               :key="item.value"
                               :label="item.label"
                               :value="item">
                    </el-option>
                  </el-select>
                </el-form-item> -->
              </div>
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
  putObj,
  platSelect,
  customerSelect
} from "api/baseDataSys/ReturnCustomer/index";
import { mapGetters } from "vuex";
export default {
  name: "ReturnCustomer",
  components: {
    // 引入编辑的组件
    "update-element": () => import("./components/update")
  },
  data () {
    return {
      platValue: false,
      custValue: false,
      urlValue: false,
      platTypeValue: false,
      selectCustom: [],
      form: {
        customerName: { label: '', value: '' },
        platformName: { label: '', value: '' },
        platformTypeName: { label: '', value: '' },
        url: '',
        indx: ''
      },
      rules: {
        // customerName: [
        //   {
        //     required: true,
        //     message: '请选择客户名称',
        //     // trigger: 'blur'
        //   }
        // ], platformName: [
        //   {
        //     required: true,
        //     message: '请选择电商平台名称',
        //     // trigger: 'change'
        //   }
        // ], 
        url: [
          {
            required: true,
            message: '请输入url地址',
            trigger: 'blur'
          }
        ]
      },
      list: null,
      total: null,
      listLoading: true,
      query: {
        customerName: '',
        customerCode: ''
      },
      listQuery: {
        page: 1,
        limit: 10,
        _type_: "like"
      },
      dialogFormVisible: false,
      dialogStatus: "",
      bdCustomerManager_btn_edit: false,
      bdCustomerManager_btn_del: false,
      bdCustomerManager_btn_add: true,
      textMap: {
        update: "编辑",
        create: "回传客户配置"
      },
      tableKey: 0,
      selectPlatfrom: [],
      selectTypeName: [
        {
          label: '菜鸟物流',
          value: '01'
        }
      ]
    };
  },
  created () {
    this.getList();
    this.customerName();
    this.bdCustomerManager_btn_edit = this.elements["bdCustomerManager:btn_edit"];
    this.bdCustomerManager_btn_del = this.elements["bdCustomerManager:btn_del"];
    this.bdCustomerManager_btn_add = this.elements["bdCustomerManager:btn_add"];
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
      let self = this
      this.$refs.update.formEdit = true;
      this.$refs.update.disabledForm = true;
      this.$refs.update.updateView = true;
      getObj(row.indx).then(response => {
        self.$nextTick(() => {
          let formData = {
            indx: response.data.indx,
            customerName: response.data.customerName,
            customerCode: response.data.customerCode,
            platformName: {
              label: response.data.platformName,
              value: response.data.platformCode
            },
            platformTypeName: {
              label: response.data.platformTypeName,
              value: response.data.platformType
            },
            url: response.data.url,
          }
          // console.log(response.data)
          self.$refs.update.resetFormFields();
          self.$refs.update.form = formData
        })
        // this.$refs.update.resetFormFields();
        // this.$copyJsonProperty(this.$refs.update.form, response.data);
      });
    },
    getList () {
      this.listLoading = true;
      let param = {
        customerName: $.trim(this.query.customerName),
        customerCode: $.trim(this.query.customerCode),
        ...this.listQuery
      }
      page(param).then(response => {
        // console.log(response.data)
        this.list = response.data.rows;
        this.total = response.data.total;
        this.listLoading = false;
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
      this.platSelect();
      this.customerName();
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
      this.platValue = false
      this.custValue = false
      this.urlValue = false
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
          let formData = {
            // customerCode: this.form.customerName.substring(this.form.customerName.indexOf("(") + 1, this.form.customerName.indexOf(")")),
            // customerName: this.form.customerName.value,
            customerName: this.form.customerName.label,
            customerCode: this.form.customerName.value,
            platformCode: this.form.platformName.value,
            platformName: this.form.platformName.label,
            platformTypeName: this.form.platformTypeName.label,
            platformType: this.form.platformTypeName.value,
            url: this.form.url,
          }
          console.log(formData)
          if (!formData.platformName && !formData.customerName && !formData.url) {
            this.platValue = true
            this.custValue = true
            this.urlValue = true
            return false
          }
          if (!formData.platformName) {
            this.platValue = true
          } else {
            this.platValue = false
          }
          if (!formData.customerName) {
            this.custValue = true
          } else {
            this.custValue = false
          }
          if (!formData.url) {
            this.urlValue = true
          } else {
            this.urlValue = false
          }
          if (!formData.platformName || !formData.customerName || !formData.url) {
            return false
          }
          this.$confirm('确定要保存吗', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            addObj(formData).then((res) => {
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
              if (res.status !== 200) {
                this.$notify({
                  title: "失败",
                  message: res.message,
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
        customerName: { label: '', value: '' },
        platformName: { label: '', value: '' },
        platformTypeName: { label: '', value: '' },
        url: '',
      };
    },
    // 客户下拉选择
    customerName () {
      this.selectCustom = []
      customerSelect().then(response => {
        // console.log(response.data)
        for (var i = 0; i < response.data.length; i++) {
          let cutObj = {};
          // cutObj.label = '(' + response.data[i].value + ')' + ' ' + response.data[i].key
          cutObj.label = response.data[i].key
          cutObj.value = response.data[i].value
          this.selectCustom.push(cutObj)
        }
        // console.log(this.selectCustom)
      });
    },
    // 电商平台下拉框
    platSelect () {
      let param = {}
      this.selectPlatfrom = []
      platSelect(param).then(response => {
        for (var i = 0; i < response.data.length; i++) {
          let cutObj = {};
          cutObj.label = response.data[i].key
          cutObj.value = response.data[i].value
          this.selectPlatfrom.push(cutObj)
        }
      })
    },
    changeValue (val) {
      if (val == '') {
        this.form.platformName = { label: '', value: '' }
      } else {
        this.form.platformCode = val.value
      }
    },
    changeValueCus (val) {
      if (val == '') {
        this.form.customerName = { label: '', value: '' }
      } else {
        this.form.customerCode = val.value
      }
    }
  }
};
</script>
<style scoped>
.el-form-item {
  margin-left: 4%;
  /* width: 400px; */
}
.formLeft {
  /* padding-left: 4%; */
}
.el-input,
.el-select {
  width: 200px;
}
.zhushi {
  font-size: 12px;
  color: #bfcbd9;
  line-height: 1;
  display: block;
  margin-top: 5px;
}
.xhText {
  /* display: inline-block; */
  position: relative;
  top: 10px;
  left: 71px;
  color: red;
}
.l71 {
  left: 44px;
}
</style>

