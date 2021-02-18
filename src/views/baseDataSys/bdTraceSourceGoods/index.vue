<template>
  <div class="app-container calendar-list-container">
      <el-row>
          <!-- 左边 -->
          <el-col :span="18">
       <div class="app-container-left">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="海关申报单号" v-model="query.customsDeclarationNumber"> </el-input>
      <el-button class="filter-item" type="primary" v-waves icon="search" @click="handleFilter">搜索</el-button>
      <el-button class="filter-item" v-if="bdTraceSourceGoodsManager_btn_add" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="edit">添加</el-button>
    </div>
    <el-table :key='tableKey' :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%" @row-click="detailName" :height="elTableMediaHeight">

        <el-table-column width="200px" align="center" label="海关申报单号" fixed>
      <template scope="scope">
        <span>{{scope.row.customsDeclarationNumber}}</span>
      </template>
    </el-table-column>
       
        <el-table-column width="200px" align="center" label="国检申报单号" fixed>
      <template scope="scope">
        <span>{{scope.row.ciqDeclarationNumber}}</span>
      </template>
    </el-table-column>
     <el-table-column width="200px" align="center" label="海关申报时间">
      <template scope="scope">
        <span>{{scope.row.customsDeclarationDate}}</span>
      </template>
    </el-table-column>
        <el-table-column width="200px" align="center" label="国检申报时间">
      <template scope="scope">
        <span>{{scope.row.ciqDeclarationDate}}</span>
      </template>
    </el-table-column>
          <el-table-column width="200px" align="center" label="商品名称">
      <template scope="scope">
        <span>{{scope.row.goodsName}}</span>
      </template>
    </el-table-column>
        <el-table-column width="200px" align="center" label="商品编码">
      <template scope="scope">
        <span>{{scope.row.goodsNo}}</span>
      </template>
    </el-table-column>
  
        <el-table-column width="200px" align="center" label="规格型号">
      <template scope="scope">
        <span>{{scope.row.goodsModel}}</span>
      </template>
    </el-table-column>
        <el-table-column width="200px" align="center" label="数量">
      <template scope="scope">
        <span>{{scope.row.goodsNum}}</span>
      </template>
    </el-table-column>
        <el-table-column width="200px" align="center" label="原产国">
      <template scope="scope">
        <span>{{scope.row.originCountry}}</span>
      </template>
    </el-table-column>
        <el-table-column width="200px" align="center" label="起运国">
      <template scope="scope">
        <span>{{scope.row.departureCountry}}</span>
      </template>
    </el-table-column>
        <el-table-column width="200px" align="center" label="运输方式">
      <template scope="scope">
        <span>{{scope.row.transportation}}</span>
      </template>
    </el-table-column>
        <el-table-column width="200px" align="center" label="进口口岸">
      <template scope="scope">
        <span>{{scope.row.importPort}}</span>
      </template>
    </el-table-column>
        <el-table-column width="200px" align="center" label="保税仓">
      <template scope="scope">
        <span>{{scope.row.bondedWarehouse}}</span>
      </template>
    </el-table-column>
        <el-table-column width="200px" align="center" label="二维码字符串">
      <template scope="scope">
        <span>{{scope.row.twoCodenumber}}</span>
      </template>
    </el-table-column>
        <el-table-column width="200px" align="center" label="二维码区间最小值">
      <template scope="scope">
        <span>{{scope.row.twoCodenumberMin}}</span>
      </template>
    </el-table-column>
        <el-table-column width="200px" align="center" label="二维码区间最大值">
      <template scope="scope">
        <span>{{scope.row.twoCodenumberMax}}</span>
      </template>
    </el-table-column>
        <el-table-column width="200px" align="center" label="新建时间">
      <template scope="scope">
        <span>{{scope.row.createTime}}</span>
      </template>
    </el-table-column>
        <el-table-column width="200px" align="center" label="更新时间">
      <template scope="scope">
        <span>{{scope.row.updateTime}}</span>
      </template>
    </el-table-column>
        <el-table-column width="200px" align="center" label="操作用户">
      <template scope="scope">
        <span>{{scope.row.operator}}</span>
      </template>
    </el-table-column>
      </el-table>
    <div v-show="!listLoading" class="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
    </div>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" :before-close="closeDialog" :close-on-click-modal="false" class="receiptWidth800">
      <el-form :model="form" :rules="rules" ref="form" label-width="145px" :inline="true" class="formLeft">
        <el-form-item label="海关申报单号" prop="customsDeclarationNumber">
      <el-input v-model="form.customsDeclarationNumber" placeholder="请输入海关申报单号" ></el-input>
    </el-form-item>
        <!-- <el-form-item label="海关申报时间" prop="customsDeclarationDate">
      <el-date-picker v-model="form.customsDeclarationDate" type="datetime" placeholder="选择海关申报时间" style="width: 200px"> </el-date-picker>
   </el-form-item> -->
        <el-form-item label="国检申报单号" prop="ciqDeclarationNumber">
      <el-input v-model="form.ciqDeclarationNumber" placeholder="请输入国检申报单号" ></el-input>
    </el-form-item>
        <!-- <el-form-item label="国检申报时间" prop="ciqDeclarationDate">
      <el-date-picker v-model="form.ciqDeclarationDate" type="datetime" placeholder="选择国检申报时间" > </el-date-picker>
    </el-form-item> -->
     <el-form-item label="商品名称" prop="goodsName">
      <el-input v-model="form.goodsName" placeholder="请输入商品名称" ></el-input>
    </el-form-item>
        <el-form-item label="商品编码" prop="goodsNo">
      <el-input v-model="form.goodsNo" placeholder="请输入商品编码" ></el-input>
    </el-form-item>
       
        <el-form-item label="规格型号" prop="goodsModel">
      <el-input v-model="form.goodsModel" placeholder="请输入规格型号" ></el-input>
    </el-form-item>
        <el-form-item label="数量" prop="goodsNum">
      <el-input v-model="form.goodsNum" placeholder="请输入数量" ></el-input>
    </el-form-item>
        <el-form-item label="原产国" prop="originCountry">
      <el-input v-model="form.originCountry" placeholder="请输入原产国" ></el-input>
    </el-form-item>
        <el-form-item label="起运国" prop="departureCountry">
      <el-input v-model="form.departureCountry" placeholder="请输入起运国" ></el-input>
    </el-form-item>
        <el-form-item label="运输方式" prop="transportation">
      <el-input v-model="form.transportation" placeholder="请输入运输方式" ></el-input>
    </el-form-item>
        <el-form-item label="进口口岸" prop="importPort">
      <el-input v-model="form.importPort" placeholder="请输入进口口岸" ></el-input>
    </el-form-item>
        <el-form-item label="保税仓" prop="bondedWarehouse">
      <el-input v-model="form.bondedWarehouse" placeholder="请输入保税仓" ></el-input>
    </el-form-item>
        <el-form-item label="二维码字符串" prop="twoCodenumber">
      <el-input v-model="form.twoCodenumber" placeholder="请输入二维码字符串" ></el-input>
    </el-form-item>
        <el-form-item label="二维码区间最小值" prop="twoCodenumberMin">
      <el-input v-model="form.twoCodenumberMin" placeholder="请输入二维码区间最小值" ></el-input>
    </el-form-item>
        <el-form-item label="二维码区间最大值" prop="twoCodenumberMax">
      <el-input v-model="form.twoCodenumberMax" placeholder="请输入二维码区间最大值" ></el-input>
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
} from "api/baseDataSys/bdTraceSourceGoods/index";
import { mapGetters } from "vuex";
import { numberValidator, parValidator } from "utils/validate"
var dateUtils = require("silly-datetime");
export default {
  name: "bdTraceSourceGoods",
  components: {
    // 引入编辑的组件
    "update-element": () => import("./components/update")
  },
  data() {
    //  // 二维码区间最小值必须小于区间最大值
    // let compareWeightAndNetWeight = (rule, value, callback) => {
    //     if (/^[0-9]+([.]{1}[0-9]+){0,1}$/.test(this.form.twoCodenumberMax) && /^[0-9]+([.]{1}[0-9]+){0,1}$/.test(this.form.twoCodenumberMin) && Number.parseFloat(this.form.twoCodenumberMax).toFixed(4) - Number.parseFloat(this.form.twoCodenumberMin).toFixed(4) > 0) {
    //       callback()
    //     } else {
    //       callback(new Error('区间最小值必须小于区间最大值!'))
    //     }
    //   }
    return {
      form: {
        customsDeclarationNumber: undefined,
        customsDeclarationDate: undefined,
        ciqDeclarationNumber: undefined,
        ciqDeclarationDate: undefined,
        goodsNo: undefined,
        goodsName: undefined,
        goodsModel: undefined,
        goodsNum: undefined,
        originCountry: undefined,
        departureCountry: undefined,
        transportation: undefined,
        importPort: undefined,
        bondedWarehouse: undefined,
        twoCodenumber: undefined,
        twoCodenumberMin: undefined,
        twoCodenumberMax: undefined,
        createTime: undefined,
        updateTime: undefined,
        operator: undefined
      },
      rules: {
        customsDeclarationNumber: [
          {
            required: true,
            message: "请输入海关申报单号",
            trigger: "blur"
          }
        ],
        customsDeclarationDate: [
          {
            required: true,
            message: "请输入海关申报时间",
            trigger: "blur"
          }
        ],
        ciqDeclarationNumber: [
          {
            required: true,
            message: "请输入国检申报单号",
            trigger: "blur"
          }
        ],
        ciqDeclarationDate: [
          {
            required: true,
            message: "请输入国检申报时间",
            trigger: "blur"
          }
        ],
        goodsNo: [
          {
            required: true,
            message: "请输入商品编码",
            trigger: "blur"
          }
        ],
        goodsName: [
          {
            required: true,
            message: "请输入商品名称",
            trigger: "blur"
          }
        ],
        goodsModel: [
          {
            required: true,
            message: "请输入规格型号",
            trigger: "blur"
          }
        ],
        goodsNum: [
          {
            required: true,
            message: "请输入数量",
            trigger: "blur"
          }
        ],
        originCountry: [
          {
            required: true,
            message: "请输入原产国",
            trigger: "blur"
          }
        ],
        departureCountry: [
          {
            required: true,
            message: "请输入起运国",
            trigger: "blur"
          }
        ],
        transportation: [
          {
            required: true,
            message: "请输入运输方式",
            trigger: "blur"
          }
        ],
        importPort: [
          {
            required: true,
            message: "请输入进口口岸",
            trigger: "blur"
          }
        ],
        bondedWarehouse: [
          {
            required: true,
            message: "请输入保税仓",
            trigger: "blur"
          }
        ],
        twoCodenumber: [
          {
            required: true,
            message: "请输入二维码字符串",
             trigger: "blur"
          },{
             validator: numberValidator,
             trigger: 'true'
           },
           {
             validator: parValidator,
             trigger: 'true'
           }
        ],
        twoCodenumberMin: [
          {
            required: true,
            message: "请输入二维码区间最小值",
            trigger: "blur"
          },{
             validator: numberValidator,
             trigger: 'true'
           },
           {
             validator: parValidator,
             trigger: 'true'
           }
        ],
        twoCodenumberMax: [
          {
            required: true,
            message: "请输入二维码区间最大值",
             trigger: "blur"
          },{
             validator: numberValidator,
             trigger: 'true'
           },
           {
             validator: parValidator,
             trigger: 'true'
           }
        ]
      },
      list: null,
      total: null,
      listLoading: true,
      query: {
         customsDeclarationNumber: undefined
      },
      listQuery: {
        page: 1,
        limit: 10,
         _type_: "equal",
         orderBy: 'createTimedesc'
      },
      dialogFormVisible: false,
      dialogStatus: "",
      bdTraceSourceGoodsManager_btn_edit: false,
      bdTraceSourceGoodsManager_btn_del: false,
      bdTraceSourceGoodsManager_btn_add: false,
      textMap: {
        update: "编辑",
        create: "创建"
      },
      tableKey: 0
    };
  },
  created() {
    this.getList();
    this.bdTraceSourceGoodsManager_btn_edit = this.elements[
      "bdTraceSourceGoodsManager:btn_edit"
    ];
    this.bdTraceSourceGoodsManager_btn_del = this.elements[
      "bdTraceSourceGoodsManager:btn_del"
    ];
    this.bdTraceSourceGoodsManager_btn_add = this.elements[
      "bdTraceSourceGoodsManager:btn_add"
    ];
  },
  computed: {
    ...mapGetters(["elements", "elTableMediaHeight"])
  },
  methods: {
    // 关闭el-dialog 前的回调函数 重置表单
    closeDialog() {
      this.dialogFormVisible = false;
      this.$refs["form"].resetFields();
    },
    // 查看详情
    detailName(row) {
      // this.showDetail = true
      this.$refs.update.formEdit = true;
      this.$refs.update.disabledForm = true;
      this.$refs.update.updateView = true;
      getObj(row.indx).then(response => {
        this.$refs.update.resetFormFields();
        this.$copyJsonProperty(this.$refs.update.form, response.data);
      });
    },
    getList() {
      this.listLoading = true;
      let param = {
        customsDeclarationNumber: $.trim(this.query.customsDeclarationNumber),
        ...this.listQuery
      }
      page(param).then(response => {
        this.list = response.data.rows;
        this.total = response.data.total;
        this.listLoading = false;
      });
    },
    handleFilter() {
      this.getList();
      this.$refs.update.resetFormFields();
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
    handleUpdate(row) {
      getObj(row.indx).then(response => {
        this.form = response.data;
        this.dialogFormVisible = true;
        this.dialogStatus = "update";
      });
    },
    handleDelete(row) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        delObj(row.indx).then(() => {
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
    create(formName) {
      this.form.ciqDeclarationDate =
        this.form.ciqDeclarationDate === ""
          ? ""
          : dateUtils.format(
              this.form.ciqDeclarationDate,
              "YYYY-MM-DD  HH:mm:ss"
            );
      this.form.customsDeclarationDate =
        this.form.customsDeclarationDate === ""
          ? ""
          : dateUtils.format(
              this.form.customsDeclarationDate,
              "YYYY-MM-DD  HH:mm:ss"
            );
      const set = this.$refs;
      set[formName].validate(valid => {
        if (valid) {
            this.$confirm('确定要保存吗', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           let date = new Date();
          this.form.createTime = dateUtils.format(date, "YYYY-MM-DD  HH:mm:ss");
          addObj(this.form).then((res) => {
            this.dialogFormVisible = false;
            this.getList();
            this.$notify({
              title: "成功",
              message: "创建成功",
              type: "success",
              duration: 2000
            });
            
          });
        }).catch(() => {})
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
          putObj(this.form.id, this.form).then(res => {
            this.dialogFormVisible = false;
            this.getList();
            if (res.rel) {
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
        } else {
          return false;
        }
      });
    },
    resetTemp() {
      this.form = {
        customsDeclarationNumber: undefined,
        customsDeclarationDate: undefined,
        ciqDeclarationNumber: undefined,
        ciqDeclarationDate: undefined,
        goodsNo: undefined,
        goodsName: undefined,
        goodsModel: undefined,
        goodsNum: undefined,
        originCountry: undefined,
        departureCountry: undefined,
        transportation: undefined,
        importPort: undefined,
        bondedWarehouse: undefined,
        twoCodenumber: undefined,
        twoCodenumberMin: undefined,
        twoCodenumberMax: undefined,
        createTime: undefined,
        updateTime: undefined,
        operator: undefined
      };
    }
  }
};
</script>
<style scoped>
  .el-form--inline .el-form-item {
      /* margin-left: 5%; */
      /* width: 400px; */
  }
  .el-form-item__label {
      width: 135px;
  }
  .formLeft{
  padding-left: 1%;
}
.app-container-right {
    height: 100%;
    padding-right: 0px;
    padding-left: 10px;
}
.el-input, .el-select {
    width: 200px;
}

</style>