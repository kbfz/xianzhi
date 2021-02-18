<template>
  <div class="app-container calendar-list-container">
    <el-row>
      <!-- 左边 -->
      <el-col :span="18">
        <div class="app-container-left">
          <div class="filter-container">
            <el-select @keyup.enter.native="handleFilter"
                       placeholder="请选择客户名称"
                       v-model="query.qstCode"
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
                             label="平台名称"
                             show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.platformName}}</span>
              </template>
            </el-table-column>
            <el-table-column min-width="150"
                             align="center"
                             label="店铺ID"
                             show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.shopId}}</span>
              </template>
            </el-table-column>
            <el-table-column min-width="180"
                             align="center"
                             label="店铺名称"
                             show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.shopName}}</span>
              </template>
            </el-table-column>
            <el-table-column min-width="180"
                             align="center"
                             label="AppKey"
                             show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.appKey}}</span>
              </template>
            </el-table-column>
            <el-table-column min-width="170"
                             align="center"
                             label="AppSecret"
                             show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.appSecret}}</span>
              </template>
            </el-table-column>
            <el-table-column min-width="170"
                             align="center"
                             label="Token"
                             show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.platformToken}}</span>
              </template>
            </el-table-column>
            <el-table-column min-width="170"
                             align="center"
                             label="URL"
                             show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.platformUrl}}</span>
              </template>
            </el-table-column>
            <el-table-column min-width="180"
                             align="center"
                             label="创建时间"
                             show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.createTime}}</span>
              </template>
            </el-table-column>
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
                     :inline="true"
                     label-width="100px"
                     class="formLeft">
              <div style="position:relative">
                <span class="xhText">*</span>
                <div class="filter-container"
                     style="padding-bottom: 3px">
                  <el-form-item label="客户名称">
                    <el-select placeholder="请选择客户名称"
                               v-model="form.customerName"
                               clearable
                               filterable
                               class="filter-item"
                               @change="changeValueCus">
                      <el-option v-for="item in selectCustom"
                                 :key="item.value"
                                 :value="item"
                                 :label="item.label"></el-option>
                    </el-select>
                    <div class="el-form-item__error"
                         v-if="customerValue">请选择客户名称</div>
                  </el-form-item>
                </div>
              </div>
              <div style="position:relative">
                <span class="xhText l373">*</span>
                <el-form-item label="平台名称">
                  <el-select v-model="form.platformName"
                             placeholder="请选择平台名称"
                             style="width: 200px"
                             filterable
                             clearable
                             @change="changeValue">
                    <el-option v-for="item in selectTypeName"
                               :key="item.value"
                               :label="item.label"
                               :value="item">
                    </el-option>
                  </el-select>
                  <div class="el-form-item__error"
                       v-if="platValue">请选择电商平台名称</div>
                </el-form-item>
              </div>
              <div style="position:relative">
                <span class="xhText l58">*</span>
                <el-form-item label="店铺ID">
                  <el-input v-model="form.shopId"
                            placeholder="请输入店铺ID"></el-input>
                  <div class="el-form-item__error"
                       v-if="idValue">请输入店铺ID</div>
                </el-form-item>
              </div>
              <div style="position:relative">
                <span class="xhText t69">*</span>
                <el-form-item label="店铺名称">
                  <el-input v-model="form.shopName"
                            placeholder="请输入店铺名称"></el-input>
                  <div class="el-form-item__error"
                       v-if="shopValue">请输入店铺名称</div>
                </el-form-item>
              </div>
              <div style="position:relative">
                <span class="xhText l48">*</span>
                <el-form-item label="AppKey">
                  <el-input v-model="form.appKey"
                            placeholder="请输入AppKey"></el-input>
                  <div class="el-form-item__error"
                       v-if="keyValue">请输入AppKey</div>
                </el-form-item>
              </div>
              <div style="position:relative">
                <span class="xhText t127">*</span>
                <el-form-item label="AppSecret">
                  <el-input v-model="form.appSecret"
                            placeholder="请输入AppSecret"></el-input>
                  <div class="el-form-item__error"
                       v-if="secretValue">请输入AppSecret</div>
                </el-form-item>
              </div>
              <div style="position:relative">
                <span class="xhText l60">*</span>
                <el-form-item label="Token">
                  <el-input v-model="form.platformToken"
                            placeholder="请输入Token"></el-input>
                  <div class="el-form-item__error"
                       v-if="tokenValue">请输入Token</div>
                </el-form-item>
              </div>
              <div style="position:relative">
                <span class="xhText t185">*</span>
                <el-form-item label="URL">
                  <el-input v-model="form.platformUrl"
                            placeholder="请输入URL"></el-input>
                  <div class="el-form-item__error"
                       v-if="urlValue">请输入URL</div>
                </el-form-item>
              </div>
            </el-form>
            <div slot="footer"
                 class="dialog-footer">
              <el-button @click="cancel('form')">取 消</el-button>
              <el-button v-if="dialogStatus=='create'"
                         type="primary"
                         @click="create('form')">确 定</el-button>
              <!-- <el-button v-else
                         type="primary"
                         @click="update('form')">确 定</el-button> -->
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
} from "api/baseDataSys/customerConfigure/index";
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
      customerValue: false,
      urlValue: false,
      idValue: false,
      shopValue: false,
      secretValue: false,
      keyValue: false,
      tokenValue: false,
      selectCustom: [],
      form: {
        customerName: { label: '', value: '' },
        platformName: { label: '', value: '' },
        platformUrl: '',
        shopId: '',
        shopName: '',
        appKey: '',
        appSecret: '',
        platformToken: ''
      },
      list: null,
      total: null,
      listLoading: true,
      query: {
        customerName: '',
        qstCode: ''
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
      getObj(row.id).then(response => {
        self.$nextTick(() => {
          let formData = {
            id: response.data.id,
            customerName: {
              label: response.data.customerName,
              value: response.data.qstCode,
            },
            platformName: {
              label: response.data.platformName,
              value: response.data.platformType
            },
            platformUrl: response.data.platformUrl,
            shopId: response.data.shopId,
            shopName: response.data.shopName,
            appKey: response.data.appKey,
            appSecret: response.data.appSecret,
            platformToken: response.data.platformToken
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
        qstCode: $.trim(this.query.qstCode),
        ...this.listQuery
      }
      page(param).then(response => {
        this.listLoading = false;
        if (response.status == 200) {
          this.list = response.data.rows;
          this.total = response.data.total;
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
      this.platSelect();
      this.customerName();
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
      this.platValue = false
      this.customerValue = false
      this.urlValue = false
      this.idValue = false
      this.shopValue = false
      this.secretValue = false
      this.keyValue = false
      this.tokenValue = false
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
            customerName: this.form.customerName.label,
            qstCode: this.form.customerName.value,
            platformName: this.form.platformName.label,
            platformType: this.form.platformName.value,
            platformUrl: this.form.platformUrl,
            shopId: this.form.shopId,
            shopName: this.form.shopName,
            appKey: this.form.appKey,
            appSecret: this.form.appSecret,
            platformToken: this.form.platformToken
          }
          if (!formData.customerName && !formData.platformName && !formData.platformUrl && !formData.shopId && !formData.shopName && !formData.appKey && !formData.appSecret && !formData.platformToken) {
            this.platValue = true
            this.customerValue = true
            this.urlValue = true
            this.idValue = true
            this.shopValue = true
            this.secretValue = true
            this.keyValue = true
            this.tokenValue = true
            return false
          }
          if (!formData.customerName) {
            this.customerValue = true
          } else {
            this.customerValue = false
          }
          if (!formData.platformName) {
            this.platValue = true
          } else {
            this.platValue = false
          }
          if (!formData.shopId) {
            this.idValue = true
          } else {
            this.idValue = false
          }
          if (!formData.shopName) {
            this.shopValue = true
          } else {
            this.shopValue = false
          }
          if (!formData.appKey) {
            this.keyValue = true
          } else {
            this.keyValue = false
          }
          if (!formData.appSecret) {
            this.secretValue = true
          } else {
            this.secretValue = false
          }
          if (!formData.platformToken) {
            this.tokenValue = true
          } else {
            this.tokenValue = false
          }
          if (!formData.platformUrl) {
            this.urlValue = true
          } else {
            this.urlValue = false
          }
          if (!formData.customerName || !formData.platformName || !formData.platformUrl || !formData.shopId || !formData.shopName || !formData.appKey || !formData.appSecret || !formData.platformToken) {
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
        platformUrl: '',
        shopId: '',
        shopName: '',
        appKey: '',
        appSecret: '',
        platformToken: ''
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
        this.form.platformType = val.value
      }
    },
    changeValueCus (val) {
      if (val == '') {
        this.form.customerName = { label: '', value: '' }
      } else {
        this.form.qstCode = val.value
      }
    }
  }
};
</script>
<style scoped>
.el-form-item {
  margin-left: 2.8%;
  float: left;
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
  position: absolute;
  top: 10px;
  left: 44px;
  color: red;
}
.l71 {
  left: 44px;
}
.l373{
  left: 373px;
  top:10px
}
.l58{
  left:58px;
  top:67px
}
.t69{
  left:373px;
  top:67px
}
.l48{
  left: 48px;
  top:127px;
}
.t127{
  top:127px;
  left:362px
}
.l60{
  left:60px;
  top:185px;
}
.t185{
    left:400px;
  top:185px;
}
</style>

