<template>
  <div>

    <el-form ref="form"
             :model="form"
             :rules="rules">
      <el-form-item style="width: 100%"
                    class="tableLeft">
        <div class="filter-container">
          <el-input @keyup.enter.native="handleFilter"
                    style="width: 200px;"
                    class="filter-item"
                    placeholder="商品编码"
                    v-model="listQuery.goodsNo"> </el-input>
          <el-button class="filter-item"
                     type="primary"
                     v-waves
                     icon="search"
                     @click="handleFilter">搜索</el-button>
        </div>
        <el-table :key='tableKey'
                  :data="listoms"
                  v-loading="loading.tableLoading"
                  style="">
          <el-table-column align="center"
                           label="商品编码"
                           show-overflow-tooltip
                           min-width="150">
            <template scope="scope">
              <span style="cursor: pointer;">{{scope.row.goodsNo}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center"
                           label="备案电商平台名称"
                           show-overflow-tooltip
                           min-width="150">
            <template scope="scope">
              <span style="cursor: pointer;">{{scope.row.cusName}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center"
                           label="商品名称"
                           show-overflow-tooltip
                           min-width="100">
            <template scope="scope">
              <span style="cursor: pointer;">{{scope.row.goodsName}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center"
                           label="商品条码"
                           show-overflow-tooltip
                           min-width="150">
            <template scope="scope">
              <span style="cursor: pointer;">{{scope.row.barCode}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center"
                           label="数量"
                           show-overflow-tooltip
                           min-width="150">
            <template scope="scope">
              <!-- <el-input v-model="scope.row.count" value="number"></el-input> -->
              <el-input-number v-model="scope.row.count"
                               :min="1"
                               style="width: 130px"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column align="center"
                           label="操作"
                           fixed="right">
            <template scope="scope">
              <el-button type="text"
                         @click="handlerAdd(scope.row)">添加</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination-container">
          <el-pagination @size-change="handleSizeChange"
                         @current-change="handleCurrentChange"
                         :current-page.sync="listQuery.page"
                         :page-sizes="[10,20,30, 50]"
                         :page-size="listQuery.limit"
                         layout="total, sizes, prev, pager, next, jumper"
                         :total="total">
          </el-pagination>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script> 
import { omsOutService } from "api/baseDataSys/bdGoodsRelation/index"
export default {
  data () {
    return {
      form: {
        goodsNo: '',
        cusName: '',
        goodsName: '',
        barCode: '',
        // count:1,
      },
      listoms: [],
      rules: {},
      loading: {
        tableLoading: false,
      },
      query: {
        goodsNo: '',
      },
      listQuery: {
        page: 1,
        limit: 10,
      },
      total: null,
      tableKey: 0,
      goodobj: {}
    }
  },
  created () {
    // this.getList();

  },
  computed: {

  },
  methods: {
    getList () {
      let param = {
        goodsNo: $.trim(this.query.goodsNo),
        ...this.listQuery
      }
      this.loading.tableLoading = true
      omsOutService(param).then(response => {
        this.loading.tableLoading = false
        if (response.status === 200) {
          if(response.data.rows.length > 0) {
              response.data.rows.forEach(el => {
              el.count = 1
            })
          }
          this.listoms = response.data.rows
          this.total = response.data.total
        }
        if (response.status !== 200) {
          this.$notify({
            title: "失败",
            message: response.message,
            type: "error",
            duration: 2000
          });
        }
      })
    },
    handleFilter () {
      this.getList();
    },

    // 分页查询
    handleSizeChange (val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange (val) {
      this.listQuery.page = val
      this.getList()
    },
    //添加
    handlerAdd (row) {
      this.goodobj = row;
      this.$emit("child", "");
      this.resetTemp();
      this.$emit("childMethod", "");


    },
    resetTemp () {
      this.listQuery.goodsNo = '';
      this.listoms = []
    },
  }
}
</script>
<style scoped>
</style>


