<template>
  <div class="app-container calendar-list-container" style="padding-right:10px">
    <div class="filter-container">
      <!-- <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="客户编码" v-model="listQuery.customerCode"> </el-input> -->
      <el-select v-model="listQuery.customerCode" placeholder="请选择客户" class="filter-item" clearable popper-class="optionsContent">
       <el-option
          v-for="item in selects.customers"
          :key="item.qstCode"
          :label="item.copName"
          :value="item.qstCode">
        </el-option>
     </el-select>
      <el-button class="filter-item" type="primary" v-waves icon="search" @click="handleFilter">搜索</el-button>
      <el-button class="filter-item" v-if="accountConfigManager_btn_add" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="edit">添加</el-button>
    </div>
    <el-table :key='tableKey' :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%" :height="elTableMediaHeight">

        <el-table-column min-width="150px" align="center" label="客户编码"  show-overflow-tooltip>
      <template scope="scope">
        <span>{{scope.row.customerCode}}</span>
      </template>
    </el-table-column>
        <el-table-column min-width="180px" align="center" label="客户名称" show-overflow-tooltip >
      <template scope="scope">
        <span>{{scope.row.customerName}}</span>
      </template>
    </el-table-column>
        <el-table-column min-width="120px" align="center" label="价格（元）" show-overflow-tooltip>
      <template scope="scope">
        <span>{{scope.row.price}}</span>
      </template>
    </el-table-column>
        <el-table-column min-width="100px" align="center" label="类型" show-overflow-tooltip>
      <template scope="scope">
        <span v-if="scope.row.type == '1'">报关</span>
        <span v-if="scope.row.type == '2'">仓储</span>
      </template>
    </el-table-column>
      <el-table-column min-width="140px" align="center" label="是否阶梯报价" show-overflow-tooltip>
      <template scope="scope">
        <span v-if="scope.row.isStair == '1'">是</span>
        <span v-if="scope.row.isStair == '0'">否</span>
      </template>
    </el-table-column>
      <el-table-column min-width="130px" align="center" label="阶梯价" show-overflow-tooltip>
      <template scope="scope">
       <span>{{scope.row.secondPrice}}</span>
      </template>
    </el-table-column>
     <el-table-column min-width="130px" align="center" label="阶梯数量" show-overflow-tooltip>
      <template scope="scope">
       <span>{{scope.row.stairCount}}</span>
      </template>
    </el-table-column>
        <el-table-column min-width="120px" align="center" label="是否有效" show-overflow-tooltip>
      <template scope="scope">
        <span v-if="scope.row.isValid == '0'">无效</span>
        <span v-if="scope.row.isValid == '1'">有效</span>
      </template>
    </el-table-column>
        <el-table-column min-width="180px" align="center" label="废弃时间" show-overflow-tooltip>
      <template scope="scope">
        <span>{{scope.row.abandonTime}}</span>
      </template>
    </el-table-column>
        <el-table-column min-width="180px" align="center" label="备注" show-overflow-tooltip>
      <template scope="scope">
        <span>{{scope.row.remark}}</span>
      </template>
    </el-table-column>
    <el-table-column  align="center" label="操作" min-width="120"> <template scope="scope">
        <el-button v-if="accountConfigManager_btn_del" size="small" type="danger" @click="handleDelete(scope.row)">废弃
        </el-button>
      </template> </el-table-column>
    </el-table>
    <div v-show="!listLoading" class="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
    </div>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" :before-close ="closeDialog" class="receiptWidth600">
      <el-form :model="form" :rules="rules" ref="form" label-width="150px">
         <el-form-item label="客户名称" prop="customerName">
    <el-select v-model="form.customerName" placeholder="请选择客户" style="width: 300px;" clearable>
       <el-option
          v-for="item in selects.customers"
          :key="item.qstCode"
          :label="item.copName"
          :value="item.copName">
        </el-option>
     </el-select>
     </el-form-item>
     <!-- <el-form-item label="客户名称" prop="customerName">
       <el-input v-model="form.customerName" disabled style="width: 300px;"></el-input> -->
        <!-- <el-select v-model="form.customerName" @visible-change="getCustomer" placeholder="请选择客户代码" style="width: 300px;">
       <el-option
          v-for="item in selects.customers"
          :key="item.cusCbeName"
          :value="item.cusCbeName">
        </el-option>
     </el-select> -->
     <!-- </el-form-item> -->
        <el-form-item label="价格" prop="price">
      <el-input v-model="form.price" placeholder="请输入价格" style="width:300px" ></el-input>
    </el-form-item>
        <el-form-item label="类型" prop="type">
      <!-- <el-input v-model="form.type" placeholder="请输入类型:1报关，2仓储"></el-input> -->
      <el-select v-model="form.type" placeholder="请选择" style="width: 300px;">
        <el-option label="报关" value="1"></el-option>
        <el-option label="仓储" value="2"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="是否阶梯报价" prop="isStair">
       <el-radio class="radio" v-model="form.isStair" label="1" style="margin-left: 20px">是</el-radio>
       <el-radio class="radio" v-model="form.isStair" label="0" style="margin-left: 50px">否</el-radio>
    </el-form-item>
    <el-form-item label="阶梯价" prop="secondPrice" v-if="this.form.isStair === '1'">
      <el-input v-model="form.secondPrice" placeholder="请输入阶梯价" style="width:300px" ></el-input>
    </el-form-item>
    <el-form-item label="阶梯数量" prop="stairCount"  v-if="this.form.isStair === '1'">
      <el-input v-model="form.stairCount" placeholder="请输入阶梯数量" style="width:300px" ></el-input>
    </el-form-item>
    <el-form-item label="阶梯价"  v-if="this.form.isStair === '0'">
      <el-input v-model="form.secondPrice" placeholder="请输入阶梯价" style="width:300px" ></el-input>
    </el-form-item>
    <el-form-item label="阶梯数量"   v-if="this.form.isStair === '0'">
      <el-input v-model="form.stairCount" placeholder="请输入阶梯数量" style="width:300px" ></el-input>
    </el-form-item>
        <!-- <el-form-item label="是否有效" prop="isValid"> -->
      <!-- <el-input v-model="form.isValid" placeholder="请输入是否有效:0无效，1有效"></el-input> -->
       <!-- <el-select v-model="form.isValid" placeholder="请选择" style="width: 300px;">
        <el-option label="无效" value="0"></el-option>
        <el-option label="有效" value="1"></el-option>
      </el-select>
    </el-form-item> -->
        <!-- <el-form-item label="创建时间" prop="createTime">
      <el-input v-model="form.createTime" placeholder="请输入创建时间"></el-input>
    </el-form-item>
        <el-form-item label="废弃时间" prop="abandonTime">
      <el-input v-model="form.abandonTime" placeholder="请输入废弃时间"></el-input>
    </el-form-item> -->
        <el-form-item label="备注" prop="remark">
      <el-input v-model="form.remark" placeholder="请输入备注" style="width: 300px;"></el-input>
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
  putObj,
  cancelObj
} from "api/financialSys/accountConfig/index";
import { getCustomerData } from "api/baseDataSys/bdCustomer/index";
import { mapGetters } from "vuex";
import { numberValidator } from "utils/validate"
export default { 
  name: "accountConfig",
  data() {
    return {
      form: {
        customerCode: undefined,
        customerName: "",
        price: 0,
        type: "1",
        isValid: "1",
        createTime: undefined,
        abandonTime: undefined,
        remark: undefined,
        ext1: undefined,
        ext2: undefined,
        ext3: undefined,
        isStair: "1",
        secondPrice	: '',
        stairCount: ''
      },
      rules: {
        customerCode: [
          {
            message: "请输入客户编码",
            trigger: "blur"
          }
        ],
        customerName: [
          {
            required: true,
            message: "请输入客户名称",
            trigger: "blur"
          }
        ],
        secondPrice: [
             {
            required: true,
            message: "请输入阶梯价",
            trigger: "blur"
            },
            {
            validator: numberValidator,
            trigger: "blur"
          }
          ],
           stairCount: [
             {
            required: true,
            message: "请输入阶梯数量",
            trigger: "blur"
            },
            {
            validator: numberValidator,
            trigger: "blur"
          }],
          price: [
             {
            validator: numberValidator,
            trigger: "blur"
          }
          ]
      },
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        customerCode: undefined,
        _type_: "equal",
        orderBy: 'abandonTimedesc'
      },
      selects: {
        customers: []
      },
      custmerMap: {},
      getCode: [],
      dialogFormVisible: false,
      dialogStatus: "",
      accountConfigManager_btn_del: false,
      accountConfigManager_btn_add: false,
      textMap: {
        update: "编辑",
        create: "创建"
      },
      tableKey: 0
    };
  },
  created() {
    this.getList();
    this.getCustomer();
    this.accountConfigManager_btn_del = this.elements[
      "accountConfigManager_btn_del"
    ];

    this.accountConfigManager_btn_add = this.elements[
      "accountConfigManager:btn_add"
    ];
  },
  computed: {
    ...mapGetters(["elements", "elTableMediaHeight"])
  },
  methods: {
    closeDialog() {
       this.dialogFormVisible = false;
       this.$refs['form'].resetFields()
    },
    getList() {
      this.listLoading = true;
      page(this.listQuery).then(response => {
        this.list = response.data.rows;
        this.total = response.data.total;
        this.listLoading = false;
      });
    },
    //获取客户信息
    getCustomer() {
      getCustomerData().then(res => {
        if (res.rel) {
          this.selects.customers = res.data;
          let item;
          for(item in this.selects.customers){           
            this.custmerMap[this.selects.customers[item].copName]=this.selects.customers[item].qstCode;
          }
          //  console.log(this.custmerMap);
        }
      });
    },
    getName(val) {
      if (val === undefined) return;
      this.form.customerName = "".concat(val.copName);
      this.form.customerCode = val.qstCode;
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
    handleUpdate(row) {
      getObj(row.id).then(response => {
        this.form = response.data;
        this.dialogFormVisible = true;
        this.dialogStatus = "update";
      });
    },
    handleDelete(row) {
      this.$confirm("是否废弃该配置?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let param = { indx: row.indx };
        cancelObj(param).then(res => {
          if (res.status === 200) {
            this.$notify({
              title: "成功",
              message: "操作成功",
              type: "success",
              duration: 2000
            });
          } else {
            this.$notify({
              title: "失败",
              message: "操作失败",
              type: "error",
              duration: 2000
            });
          }
          this.getList();
        });
      });
    },
    create(formName) {
      const set = this.$refs;
      // this.form.ext1 = undefined;
      set[formName].validate(valid => {
        if (valid) {
          let item = ""
           this.form.customerCode=this.custmerMap[this.form.customerName];
          // console.log(getCode)
          addObj(this.form).then(res => {
            this.dialogFormVisible = false;
            if (res.status === 200) {
              this.$notify({
                title: "成功",
                message: "创建成功",
                type: "success",
                duration: 2000
              });
              this.getList();
            } else {
              this.$notify({
                title: "提示",
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
            if (res.rel === true) {
              this.getList();
              this.$notify({
                title: "成功",
                message: "创建成功",
                type: "success",
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
        customerCode: "",
        customerName: "",
        price: 0,
        type: "1",
        isValid: "1",
        createTime: "",
        abandonTime: "",
        remark: "",
        ext1: "",
         isStair: "1",
        secondPrice	: '',
        stairCount: ''
      };
    }
  }
};
</script>
</style>


