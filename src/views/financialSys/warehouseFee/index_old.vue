<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="客户编码" v-model="listQuery.customerCode"> </el-input>
      <el-button class="filter-item" type="primary" v-waves icon="search" @click="handleFilter">搜索</el-button>
      <el-button class="filter-item" v-if="warehouseFeeManager_btn_add" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="edit">添加</el-button>
    </div>
    <el-table :key='tableKey' :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">

        <el-table-column width="150px" align="center" label="客户编码">
      <template scope="scope">
        <span>{{scope.row.customerCode}}</span>
      </template>
    </el-table-column>
        <el-table-column width="200px" align="center" label="客户名称" show-overflow-tooltip>
      <template scope="scope">
        <span>{{scope.row.customerName}}</span>
      </template>
    </el-table-column>
        <el-table-column width="150px" align="center" label="类型">
      <template scope="scope">
        <span v-if="scope.row.type == '1'">报关</span>
        <span v-if="scope.row.type == '2'">仓储</span>
      </template>
    </el-table-column>
        <el-table-column width="200px" align="center" label="节点名称">
      <template scope="scope">
        <span>{{scope.row.typeName}}</span>
      </template>
    </el-table-column>
        <el-table-column width="200px" align="center" label="订单号" show-overflow-tooltip>
      <template scope="scope">
        <span>{{scope.row.orderNo}}</span>
      </template>
    </el-table-column>
        <el-table-column width="200px" align="center" label="是否已计算">
      <template scope="scope">
        <span v-if="scope.row.isCount == '0'">否</span>
        <span v-if="scope.row.isCount == '1'">是</span>
      </template>
    </el-table-column>
        <el-table-column width="120px" align="center" label="价格">
      <template scope="scope">
        <span>{{scope.row.price}}</span>
      </template>
    </el-table-column>
        <el-table-column width="120px" align="center" label="重量">
      <template scope="scope">
        <span>{{scope.row.weight}}</span>
      </template>
    </el-table-column>
        <el-table-column width="200px" align="center" label="运单号">
      <template scope="scope">
        <span>{{scope.row.logisticsNo}}</span>
      </template>
    </el-table-column>
        <el-table-column width="150px" align="center" label="物流企业编码">
      <template scope="scope">
        <span>{{scope.row.logisticsCompanyCode}}</span>
      </template>
    </el-table-column>
        <!-- <el-table-column width="200px" align="center" label="省">
      <template scope="scope">
        <span>{{scope.row.province}}</span>
      </template>
    </el-table-column>
        <el-table-column width="200px" align="center" label="市">
      <template scope="scope">
        <span>{{scope.row.city}}</span>
      </template>
    </el-table-column>
        <el-table-column width="200px" align="center" label="区">
      <template scope="scope">
        <span>{{scope.row.county}}</span>
      </template>
    </el-table-column> -->
        <el-table-column width="150px" align="center" label="收件人">
      <template scope="scope">
        <span>{{scope.row.addressee}}</span>
      </template>
    </el-table-column>
        <el-table-column width="200px" align="center" label="耗材编码">
      <template scope="scope">
        <span>{{scope.row.suppliesNo}}</span>
      </template>
    </el-table-column>
        <el-table-column width="200px" align="center" label="创建时间">
      <template scope="scope">
        <span>{{scope.row.createTime}}</span>
      </template>
    </el-table-column>
        <el-table-column width="200px" align="center" label="作业完成时间">
      <template scope="scope">
        <span>{{scope.row.completeTime}}</span>
      </template>
    </el-table-column>
        <el-table-column width="200px" align="center" label="计算时间">
      <template scope="scope">
        <span>{{scope.row.countTime}}</span>
      </template>
    </el-table-column>
        <!-- <el-table-column width="150px" align="center" label="备注">
      <template scope="scope">
        <span>{{scope.row.remark}}</span>
      </template>
    </el-table-column> -->
    </el-table>
    <div v-show="!listLoading" class="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
    </div>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="form" label-width="100px">
        <el-form-item label="客户编码" prop="customerCode">
      <el-input v-model="form.customerCode" placeholder="请输入客户编码"></el-input>
    </el-form-item>
        <el-form-item label="客户名称" prop="customerName">
      <el-input v-model="form.customerName" placeholder="请输入客户名称"></el-input>
    </el-form-item>
        <el-form-item label="类型:1报关，2仓储" prop="type">
      <el-input v-model="form.type" placeholder="请输入类型:1报关，2仓储"></el-input>
    </el-form-item>
        <el-form-item label="节点名称" prop="typeName">
      <el-input v-model="form.typeName" placeholder="请输入节点名称"></el-input>
    </el-form-item>
        <el-form-item label="订单UUID" prop="orderUuid">
      <el-input v-model="form.orderUuid" placeholder="请输入订单UUID"></el-input>
    </el-form-item>
        <el-form-item label="订单号" prop="orderNo">
      <el-input v-model="form.orderNo" placeholder="请输入订单号"></el-input>
    </el-form-item>
        <el-form-item label="是否已计算:0否，1是" prop="isCount">
      <el-input v-model="form.isCount" placeholder="请输入是否已计算:0否，1是"></el-input>
    </el-form-item>
        <el-form-item label="价格" prop="price">
      <el-input v-model="form.price" placeholder="请输入价格"></el-input>
    </el-form-item>
        <el-form-item label="重量" prop="weight">
      <el-input v-model="form.weight" placeholder="请输入重量"></el-input>
    </el-form-item>
        <el-form-item label="运单号" prop="logisticsNo">
      <el-input v-model="form.logisticsNo" placeholder="请输入运单号"></el-input>
    </el-form-item>
        <el-form-item label="物流企业编码" prop="logisticsCompanyCode">
      <el-input v-model="form.logisticsCompanyCode" placeholder="请输入物流企业编码"></el-input>
    </el-form-item>
        <el-form-item label="省" prop="province">
      <el-input v-model="form.province" placeholder="请输入省"></el-input>
    </el-form-item>
        <el-form-item label="市" prop="city">
      <el-input v-model="form.city" placeholder="请输入市"></el-input>
    </el-form-item>
        <el-form-item label="区" prop="county">
      <el-input v-model="form.county" placeholder="请输入区"></el-input>
    </el-form-item>
        <el-form-item label="收件人" prop="addressee">
      <el-input v-model="form.addressee" placeholder="请输入收件人"></el-input>
    </el-form-item>
        <el-form-item label="耗材编码" prop="suppliesNo">
      <el-input v-model="form.suppliesNo" placeholder="请输入耗材编码"></el-input>
    </el-form-item>
        <el-form-item label="创建时间" prop="createTime">
      <el-input v-model="form.createTime" placeholder="请输入创建时间"></el-input>
    </el-form-item>
        <el-form-item label="作业完成时间" prop="completeTime">
      <el-input v-model="form.completeTime" placeholder="请输入作业完成时间"></el-input>
    </el-form-item>
        <el-form-item label="计算时间" prop="countTime">
      <el-input v-model="form.countTime" placeholder="请输入计算时间"></el-input>
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
</template>

<script>
  import {
      page,
      addObj,
      getObj,
      delObj,
      putObj
  } from 'api/financialSys/warehouseFee/index';
  import { mapGetters } from 'vuex';
  export default {
    name: 'warehouseFee',
    data() {
      return {
        form: {
        customerCode : undefined,        customerName : undefined,        type : undefined,        typeName : undefined,        orderUuid : undefined,        orderNo : undefined,        isCount : undefined,        price : undefined,        weight : undefined,        logisticsNo : undefined,        logisticsCompanyCode : undefined,        province : undefined,        city : undefined,        county : undefined,        addressee : undefined,        suppliesNo : undefined,        createTime : undefined,        completeTime : undefined,        countTime : undefined,        remark : undefined,        ext1 : undefined,        ext2 : undefined,        ext3 : undefined          },
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
],   typeName: [
  {
    required: true,
    message: '请输入节点名称',
    trigger: 'blur'
  },
  {
    min: 3,
    max: 20,
    message: '长度在 3 到 20 个字符',
    trigger: 'blur'
  }
],   orderUuid: [
  {
    required: true,
    message: '请输入订单UUID',
    trigger: 'blur'
  },
  {
    min: 3,
    max: 20,
    message: '长度在 3 到 20 个字符',
    trigger: 'blur'
  }
],   orderNo: [
  {
    required: true,
    message: '请输入订单号',
    trigger: 'blur'
  },
  {
    min: 3,
    max: 20,
    message: '长度在 3 到 20 个字符',
    trigger: 'blur'
  }
],   isCount: [
  {
    required: true,
    message: '请输入是否已计算:0否，1是',
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
],   weight: [
  {
    required: true,
    message: '请输入重量',
    trigger: 'blur'
  },
  {
    min: 3,
    max: 20,
    message: '长度在 3 到 20 个字符',
    trigger: 'blur'
  }
],   logisticsNo: [
  {
    required: true,
    message: '请输入运单号',
    trigger: 'blur'
  },
  {
    min: 3,
    max: 20,
    message: '长度在 3 到 20 个字符',
    trigger: 'blur'
  }
],   logisticsCompanyCode: [
  {
    required: true,
    message: '请输入物流企业编码',
    trigger: 'blur'
  },
  {
    min: 3,
    max: 20,
    message: '长度在 3 到 20 个字符',
    trigger: 'blur'
  }
],   province: [
  {
    required: true,
    message: '请输入省',
    trigger: 'blur'
  },
  {
    min: 3,
    max: 20,
    message: '长度在 3 到 20 个字符',
    trigger: 'blur'
  }
],   city: [
  {
    required: true,
    message: '请输入市',
    trigger: 'blur'
  },
  {
    min: 3,
    max: 20,
    message: '长度在 3 到 20 个字符',
    trigger: 'blur'
  }
],   county: [
  {
    required: true,
    message: '请输入区',
    trigger: 'blur'
  },
  {
    min: 3,
    max: 20,
    message: '长度在 3 到 20 个字符',
    trigger: 'blur'
  }
],   addressee: [
  {
    required: true,
    message: '请输入收件人',
    trigger: 'blur'
  },
  {
    min: 3,
    max: 20,
    message: '长度在 3 到 20 个字符',
    trigger: 'blur'
  }
],   suppliesNo: [
  {
    required: true,
    message: '请输入耗材编码',
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
],   completeTime: [
  {
    required: true,
    message: '请输入作业完成时间',
    trigger: 'blur'
  },
  {
    min: 3,
    max: 20,
    message: '长度在 3 到 20 个字符',
    trigger: 'blur'
  }
],   countTime: [
  {
    required: true,
    message: '请输入计算时间',
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
          customerCode: undefined,
          _type_:'equal'
        },
        dialogFormVisible: false,
        dialogStatus: '',
        warehouseFeeManager_btn_edit: false,
        warehouseFeeManager_btn_del: false,
        warehouseFeeManager_btn_add: false,
        textMap: {
          update: '编辑',
          create: '创建'
        },
        tableKey: 0
      }
    },
    created() {
      this.getList();
      this.warehouseFeeManager_btn_edit = this.elements['warehouseFeeManager:btn_edit'];
      this.warehouseFeeManager_btn_del = this.elements['warehouseFeeManager:btn_del'];
      this.warehouseFeeManager_btn_add = this.elements['warehouseFeeManager:btn_add'];
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
