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
                      placeholder="报关行名称"
                      v-model="query.copName"> </el-input>
            <el-input @keyup.enter.native="handleFilter"
                      style="width: 200px;"
                      class="filter-item"
                      placeholder="报关行编码"
                      v-model="query.qstCode"> </el-input>
            <el-button class="filter-item"
                       type="primary"
                       v-waves
                       icon="search"
                       @click="handleFilter">搜索</el-button>
            <el-button class="filter-item"
                       v-if="bdAgentManager_btn_add"
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
            <el-table-column min-width="180px"
                             align="center"
                             label="报关行名称"
                             show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.copName}}</span>
              </template>
            </el-table-column>
            <el-table-column min-width="150px"
                             align="center"
                             label="报关行编码"
                             show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.qstCode}}</span>
              </template>
            </el-table-column>
            <el-table-column min-width="150px"
                             align="center"
                             label="海关名称"
                             show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.cusAgentName}}</span>
              </template>
            </el-table-column>
            <el-table-column min-width="150px"
                             align="center"
                             label="海关编码"
                             show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.cusAgentCode}}</span>
              </template>
            </el-table-column>
            <!-- <el-table-column width="120px"
                             align="center"
                             label="报关员姓名"
                             show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.declarantName}}</span>
              </template>
            </el-table-column>
            <el-table-column width="200px"
                             align="center"
                             label="报关员联系方式"
                             show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.declarantContact}}</span>
              </template>
            </el-table-column>
            <el-table-column width="180px"
                             align="center"
                             label="推送订单Url"
                             show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.url}}</span>
              </template>
            </el-table-column>
            <el-table-column width="180px"
                             align="center"
                             label="取消订单url "
                             show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.cancelOrderUrl}}</span>
              </template>
            </el-table-column>
            <el-table-column width="180px"
                             align="center"
                             label="appKey"
                             show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.appKey}}</span>
              </template>
            </el-table-column>
            <el-table-column width="180px"
                             align="center"
                             label="appSecret"
                             show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.appSecret}}</span>
              </template>
            </el-table-column> -->
            <el-table-column min-width="130px"
                             align="center"
                             label="服务名"
                             show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.serviceName}}</span>
              </template>
            </el-table-column>

            <!-- <el-table-column width="200px"
                             align="center"
                             label="第三方编码"
                             fixed
                             show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.outCode}}</span>
              </template>
            </el-table-column>

            <el-table-column width="200px"
                             align="center"
                             label="企业传输编码"
                             show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.copCode}}</span>
              </template>
            </el-table-column> -->
            <!-- <el-table-column width="200px" align="center" label="url信息">
      <template scope="scope">
        <span>{{scope.row.url}}</span>
      </template>
    </el-table-column> -->

            <!-- <el-table-column width="200px"
                             align="center"
                             label="企业传输ID"
                             show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.dxpId}}</span>
              </template>
            </el-table-column>
            <el-table-column width="200px"
                             align="center"
                             label="仓储企业地址"
                             show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.warehouseAddr}}</span>
              </template>
            </el-table-column> -->

            <!-- <el-table-column width="200px" align="center" label="国检名称">
      <template scope="scope">
        <span>{{scope.row.ciqAgentName}}</span>
      </template>
    </el-table-column> -->
            <!-- <el-table-column width="150px"
                             align="center"
                             label="国检编码"
                             show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.ciqAgentCode}}</span>
              </template>
            </el-table-column>
            
            
            
            <el-table-column width="180px"
                             align="center"
                             label="关区代码"
                             show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.districtCode}}</span>
              </template>
            </el-table-column>
            
            <el-table-column width="100px"
                             align="center"
                             label="是否推送"
                             show-overflow-tooltip>
              <template scope="scope">
                <span v-if="scope.row.isPush == '1'">是</span>
                <span v-if="scope.row.isPush == '0'">否</span>
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
                     label-width="120px"
                     :inline="true"
                     class="formLeft">
              <el-form-item label="报关行名称"
                            prop="copName">
                <el-input v-model="form.copName"
                          placeholder="请输入报关行名称"></el-input>
              </el-form-item>
              <el-form-item label="海关名称"
                            prop="cusAgentName">
                <el-input v-model="form.cusAgentName"
                          placeholder="请输入海关名称"></el-input>
              </el-form-item>
              <el-form-item label="海关编码"
                            prop="cusAgentCode">
                <el-input v-model="form.cusAgentCode"
                          placeholder="请输入海关编码"></el-input>
              </el-form-item>
              <el-form-item label="服务名">
                <el-input v-model="form.serviceName"
                          placeholder="请输入服务名"></el-input>
              </el-form-item>
              <!-- <el-form-item label="报关员姓名"
                            prop="declarantName">
                <el-input v-model="form.declarantName"
                          placeholder="请输入报关员姓名"></el-input>
              </el-form-item>
              <el-form-item label="报关员联系方式"
                            prop="declarantContact">
                <el-input v-model="form.declarantContact"
                          placeholder="请输入报关员联系方式"></el-input>
              </el-form-item>
              <el-form-item label="推送订单url"
                            prop="url">
                <el-input v-model="form.url"
                          placeholder="请输入推送订单url"></el-input>
              </el-form-item>
              <el-form-item label="取消订单url"
                            prop="cancelOrderUrl">
                <el-input v-model="form.cancelOrderUrl"
                          placeholder="请输入取消订单url"></el-input>
              </el-form-item>
              <el-form-item label="appKey"
                            prop="appKey">
                <el-input v-model="form.appKey"
                          placeholder="请输入appKey"></el-input>
              </el-form-item>
              <el-form-item label="appSecret"
                            prop="appSecret">
                <el-input v-model="form.appSecret"
                          placeholder="请输入appSecret"></el-input>
              </el-form-item> -->
              

              <!-- <el-form-item label="第三方编码"
                            prop="outCode">
                <el-input v-model="form.outCode"
                          placeholder="请输入第三方编码"></el-input>
              </el-form-item>
              
              
              <el-form-item label="关区代码"
                            prop="districtCode">
                <el-input v-model="form.districtCode"
                          placeholder="请输入关区代码"></el-input>
              </el-form-item>

              <el-form-item label="企业传输编码"
                            prop="copCode">
                <el-input v-model="form.copCode"
                          placeholder="请输入企业传输编码"></el-input>
              </el-form-item>
              <el-form-item label="企业传输ID"
                            prop="dxpId">
                <el-input v-model="form.dxpId"
                          placeholder="请输入企业传输ID"></el-input>
              </el-form-item>
              <el-form-item label="仓储企业地址"
                            prop="warehouseAddr">
                <el-input v-model="form.warehouseAddr"
                          placeholder="请输入仓储企业地址"></el-input>
              </el-form-item>
              
              <el-form-item label="国检名称"
                            prop="ciqAgentName">
                <el-input v-model="form.ciqAgentName"
                          placeholder="请输入国检名称"></el-input>
              </el-form-item>
              <el-form-item label="国检编码"
                            prop="ciqAgentCode">
                <el-input v-model="form.ciqAgentCode"
                          placeholder="请输入国检编码"></el-input>
              </el-form-item>
              

              <el-form-item label="是否推送"
                            prop="isPush">
                <el-radio-group v-model="form.isPush">
                  <el-radio class="radio"
                            :label='1'
                            style="margin-left:25px;margin-right:25px">是</el-radio>
                  <el-radio class="radio"
                            :label='0'
                            style="margin-right:25px">否</el-radio>
                </el-radio-group>
              </el-form-item> -->
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
} from "api/baseDataSys/bdAgent/index";
import { mapGetters } from "vuex";
export default {
  name: "bdAgent",
  components: {
    // 引入编辑的组件
    "update-element": () => import("./components/update")
  },
  data () {
    return {
      form: {
        copName: '',
        cusAgentName: '',
        cusAgentCode: '',
        // declarantName: '',
        // declarantContact: '',
        // url: '',
        // cancelOrderUrl: '',
        // appKey: '',
        // appSecret: '',
        serviceName:''
        // qstCode:''

        // qstCode: '',
        // outCode: '',
        // ciqAgentName: '',
        // ciqAgentCode: '',
        // copCode: '',
        // warehouseAddr: '',
        // dxpId: '',
        // isPush: 1,
        // districtCode: ''
      },
      rules: {
        // outCode: [
        //   {
        //     required: true,
        //     message: "请输入第三方编码",
        //     trigger: "blur"
        //   }
        // ],
        cusAgentName: [
          {
            required: true,
            message: "请输入海关名称",
            trigger: "blur"
          }
        ],
        cusAgentCode: [
          {
            required: true,
            message: "请输入海关编码",
            trigger: "blur"
          }
        ],
        // ciqAgentName: [
        //   {
        //     required: true,
        //     message: "请输入国检名称",
        //     trigger: "blur"
        //   }
        // ],
        // ciqAgentCode: [
        //   {
        //     required: true,
        //     message: "请输入国检编码",
        //     trigger: "blur"
        //   }
        // ],
        declarantName: [
          {
            required: true,
            message: "请输入报关员姓名",
            trigger: "blur"
          }
        ],
        declarantContact: [
          {
            required: true,
            message: "请输入报关员联系方式",
            trigger: "blur"
          }
        ],
        copName: [
          {
            required: true,
            message: "请输入报关行名称",
            trigger: "blur"
          }
        ],
        // copCode: [
        //   {
        //     required: true,
        //     message: "请输入企业传输编码",
        //     trigger: "blur"
        //   }
        // ],
        url: [
          {
            required: true,
            message: "请输入推送订单url",
            trigger: "blur"
          }
        ],
        cancelOrderUrl: [
          {
            required: true,
            message: "请输入取消订单url",
            trigger: "blur"
          }
        ],
        // warehouseAddr: [
        //   {
        //     required: true,
        //     message: "请输入仓储企业地址",
        //     trigger: "blur"
        //   }
        // ],
        // dxpId: [
        //   {
        //     required: true,
        //     message: "请输入企业传输ID",
        //     trigger: "blur"
        //   }
        // ],
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
            message: "请输入appSecret",
            trigger: "blur"
          }
        ],
        // districtCode: [
        //   {
        //     required: true,
        //     message: "请输入关区代码",
        //     trigger: "blur"
        //   }
        // ],
      },
      list: null,
      total: null,
      listLoading: true,
      query: {
        qstCode: undefined,
        copName: undefined
      },
      listQuery: {
        page: 1,
        limit: 10,
        _type_: "like"
      },
      dialogFormVisible: false,
      dialogStatus: "",
      bdAgentManager_btn_edit: false,
      bdAgentManager_btn_del: false,
      bdAgentManager_btn_add: true,
      textMap: {
        update: "编辑",
        create: "创建"
      },
      tableKey: 0
    };
  },
  created () {
    this.getList();
    this.bdAgentManager_btn_edit = this.elements["bdAgentManager:btn_edit"];
    this.bdAgentManager_btn_del = this.elements["bdAgentManager:btn_del"];
    this.bdAgentManager_btn_add = this.elements["bdAgentManager:btn_add"];
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
        copName: $.trim(this.query.copName),
        qstCode: $.trim(this.query.qstCode),
        ...this.listQuery
      }
      page(param).then(response => {
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
    create (formName) {
      const set = this.$refs;
      set[formName].validate(valid => {
        if (valid) {
          this.$confirm('确定要保存吗', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            addObj(this.form).then((res) => {
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
        copName: '',
        cusAgentName: '',
        cusAgentCode: '',
        // declarantName: '',
        // declarantContact: '',
        // url: '',
        // cancelOrderUrl: '',
        // appKey: '',
        // appSecret: '',
        serviceName:''
      };
    }
  }
};
</script>
<style scoped>
.el-form-item {
  /* margin-left: 5%; */
  /* width: 400px; */
}
.formLeft {
  padding-left: 1%;
}
.el-input,
.el-select {
  width: 200px;
}
</style>
