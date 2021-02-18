<template>
  <div class="app-container calendar-list-container">
    <el-row>
      <!-- 左边 -->
      <el-col :span="18">
        <div class="app-container-left">
          <div class="filter-container">
            <el-input
              @keyup.enter.native="handleFilter"
              style="width: 200px;"
              class="filter-item"
              placeholder="请输入货号"
              v-model="query.goodsNo"
            ></el-input>
            <el-input
              @keyup.enter.native="handleFilter"
              style="width: 200px;"
              class="filter-item"
              placeholder="请输入条码"
              v-model="query.barCode"
            ></el-input>
            <el-input
              @keyup.enter.native="handleFilter"
              style="width: 200px;"
              class="filter-item"
              placeholder="请输入商品名称"
              v-model="query.goodsName"
            ></el-input>
            <el-select
              placeholder="请选择申报身份"
              v-model="query.cusCode"
              clearable
              style="width: 200px"
              popper-class="optionsContent"
              filterable
            >
              <el-option
                v-for="item in selectCbeName"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-button
              class="filter-item"
              type="primary"
              v-waves
              icon="search"
              @click="handleFilter"
            >搜索</el-button>
            <el-button
              class="filter-item"
              v-if="bdGoodsRecordManager_btn_add"
              style="margin-left: 10px;"
              @click="handleCreate"
              type="primary"
              icon="edit"
            >添加</el-button>
            <el-button
              class="filter-item"
              style="margin-left: 10px;"
              type="primary"
              @click="exportInfo"
            >导入</el-button>
            <el-button
              class="filter-item"
              style="margin-left: 10px;"
              type="primary"
              @click="exportOut"
            >导出</el-button>
          </div>
          <el-table
            :key="tableKey"
            :data="list"
            v-loading.body="listLoading"
            border
            fit
            highlight-current-row
            style="width: 100%"
            @row-click="detailName"
            :height="elTableMediaHeight"
          >
            <el-table-column width="180px" align="center" label="申报身份" show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.cusName}}</span>
              </template>
            </el-table-column>
            <el-table-column width="100px" align="center" label="状态">
              <template scope="scope">
                <span v-if="scope.row.status == 1">有效</span>
                <span v-if="scope.row.status == 0">无效</span>
              </template>
            </el-table-column>
            <el-table-column width="180px" align="center" label="上架商品名称" show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.shelfGoodsName}}</span>
              </template>
            </el-table-column>
            <el-table-column width="150px" align="center" label="货号" show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.goodsNo}}</span>
              </template>
            </el-table-column>
            <el-table-column width="170px" align="center" label="条码" show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.barCode}}</span>
              </template>
            </el-table-column>
            <el-table-column width="130px" align="center" label="品牌" show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.brand}}</span>
              </template>
            </el-table-column>
            <el-table-column width="180px" align="center" label="商品名称" show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.goodsName}}</span>
              </template>
            </el-table-column>

            <el-table-column width="120px" align="center" label="价格" show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.price}}</span>
              </template>
            </el-table-column>
            <el-table-column width="200px" align="center" label="规格" show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.goodsModel}}</span>
              </template>
            </el-table-column>
            <el-table-column width="150px" align="center" label="原产国" show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.originCountry}}</span>
              </template>
            </el-table-column>
            <el-table-column width="100px" align="center" label="单位" show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.unit}}</span>
              </template>
            </el-table-column>
            <el-table-column width="170px" align="center" label="法定第一单位" show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.unit1}}</span>
              </template>
            </el-table-column>
            <el-table-column width="170px" align="center" label="法定第二单位" show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.unit2}}</span>
              </template>
            </el-table-column>
            <el-table-column width="170px" align="center" label="法定第一数量" show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.qtyRate1}}</span>
              </template>
            </el-table-column>
            <el-table-column width="170px" align="center" label="法定第二数量">
              <template scope="scope">
                <span>{{scope.row.qtyRate2}}</span>
              </template>
            </el-table-column>
            <el-table-column width="100px" align="center" label="毛重" show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.grossWeight}}</span>
              </template>
            </el-table-column>
            <el-table-column width="100px" align="center" label="净重" show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.netWeight}}</span>
              </template>
            </el-table-column>
            <el-table-column width="200px" align="center" label="商品描述" show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.goodsDesc}}</span>
              </template>
            </el-table-column>
            <el-table-column width="150px" align="center" label="HS编码" show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.hsCode}}</span>
              </template>
            </el-table-column>
            <el-table-column width="200px" align="center" label="国检备案号" show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.ciqRecordNo}}</span>
              </template>
            </el-table-column>
            <el-table-column width="230px" align="center" label="海关账册备案料号" show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.itemRecordNo}}</span>
              </template>
            </el-table-column>
            <el-table-column width="100px" align="center" label="口岸代码">
              <template scope="scope">
                <span>{{scope.row.customsCode}}</span>
              </template>
            </el-table-column>

            <el-table-column width="100px" align="center" label="操作人">
              <template scope="scope">
                <span>{{scope.row.operator}}</span>
              </template>
            </el-table-column>
            <el-table-column width="180px" align="center" label="操作时间">
              <template scope="scope">
                <span>{{scope.row.gmtCreate}}</span>
              </template>
            </el-table-column>

            <!-- <el-table-column width="120px"
                             align="center"
                             label="是否同步"
                             show-overflow-tooltip>
              <template scope="scope">
                <span v-if="scope.row.isSyn == 1">已同步</span>
                <span v-if="scope.row.isSyn == 0">未同步</span>
              </template>
            </el-table-column>-->
          </el-table>
          <div v-show="!listLoading" class="pagination-container">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="listQuery.page"
              :page-sizes="[10,20,30, 50]"
              :page-size="listQuery.limit"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
            ></el-pagination>
          </div>
          <el-dialog
            :title="textMap[dialogStatus]"
            :visible.sync="dialogFormVisible"
            :before-close="closeDialog"
            :close-on-click-modal="false"
            class="receiptWidth800 logisticsWidth"
          >
            <el-form
              :model="form"
              ref="form"
              label-width="135px"
              :inline="true"
              :rules="rules"
              class="formLeft"
            >
              <el-form-item label="申报身份" prop="cusCode">
                <el-select
                  placeholder="请选择申报身份"
                  v-model="form.cusCode"
                  clearable
                  style="width: 200px"
                  filterable
                >
                  <el-option
                    v-for="item in selectCbeName"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="货号" prop="goodsNo">
                <el-input v-model="form.goodsNo" placeholder="请输入货号"></el-input>
              </el-form-item>
              <el-form-item label="海关账册备案料号" prop="itemRecordNo">
                <el-input v-model="form.itemRecordNo" placeholder="请输入海关账册备案料号"></el-input>
              </el-form-item>
              <el-form-item label="国检备案号">
                <el-input v-model="form.ciqRecordNo" placeholder="请输入国检备案号"></el-input>
              </el-form-item>
              <el-form-item label="HS编码" prop="hsCode">
                <el-input v-model="form.hsCode" placeholder="请输入HS编码"></el-input>
              </el-form-item>
              <el-form-item label="上架商品名称" prop="shelfGoodsName">
                <el-input v-model="form.shelfGoodsName" placeholder="请输入上架商品名称"></el-input>
              </el-form-item>
              <el-form-item label="商品名称" prop="goodsName">
                <el-input v-model="form.goodsName" placeholder="请输入商品名称"></el-input>
              </el-form-item>
              <el-form-item label="描述">
                <el-input v-model="form.goodsDesc" placeholder="请输入描述"></el-input>
              </el-form-item>
              <el-form-item label="规格" prop="goodsModel">
                <el-input v-model="form.goodsModel" placeholder="请输入规格"></el-input>
              </el-form-item>
              <el-form-item label="条码" prop="barCode">
                <el-input v-model="form.barCode" placeholder="请输入条码"></el-input>
              </el-form-item>
              <el-form-item label="价格" prop="price">
                <el-input v-model="form.price" placeholder="请输入价格"></el-input>
              </el-form-item>
              <el-form-item label="原产国" prop="originCountry">
                <el-input v-model="form.originCountry" placeholder="请输入原产国"></el-input>
              </el-form-item>

              <el-form-item label="品牌">
                <el-input v-model="form.brand" placeholder="请输入品牌"></el-input>
              </el-form-item>
              <el-form-item label="单位" prop="unit">
                <el-input v-model="form.unit" placeholder="请输入单位"></el-input>
              </el-form-item>
              <el-form-item label="法定第一单位">
                <el-input v-model="form.unit1" placeholder="请输入法定第一单位"></el-input>
              </el-form-item>
              <el-form-item label="法定第二单位">
                <el-input v-model="form.unit2" placeholder="请输入法定第二单位"></el-input>
              </el-form-item>
              <el-form-item label="法定第一数量">
                <el-input v-model="form.qtyRate1" placeholder="请输入法定第一数量"></el-input>
              </el-form-item>
              <el-form-item label="法定第二数量">
                <el-input v-model="form.qtyRate2" placeholder="请输入法定第二数量"></el-input>
              </el-form-item>
              <el-form-item label="口岸代码" prop="customsCode">
                <el-input v-model="form.customsCode" placeholder="请输入口岸代码"></el-input>
              </el-form-item>
              <el-form-item label="状态">
                <el-select v-model="form.status" clearable placeholder="请选择状态">
                  <el-option
                    v-for="item in approveTypes"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="毛重" prop="grossWeight">
                <el-input v-model="form.grossWeight" placeholder="请输入毛重"></el-input>
              </el-form-item>
              <el-form-item label="净重" prop="netWeight">
                <el-input v-model="form.netWeight" placeholder="请输入净重"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="cancel('form')">取 消</el-button>
              <el-button v-if="dialogStatus=='create'" type="primary" @click="create('form')">确 定</el-button>
              <el-button v-else type="primary" @click="update('form')">确 定</el-button>
            </div>
          </el-dialog>
          <!-- 导入 -->
          <el-dialog
            title="导入备案信息"
            :visible.sync="dialogVisible"
            :before-close="closeDialogExport"
            :close-on-click-modal="false"
            class="receiptWidth600"
          >
            <div class="exportText">
              <p>*修改商品备案信息时，将修改后商品的备案信息填入模板后导入即可</p>
            </div>
            <div class="w85">
              <h5>1.下载模板</h5>
              <span class="exportSpan">《全速通备案信息导入模板》</span>
              <el-button type="primary" size="small">
                <a :href="href" target="_blank">点击下载</a>
              </el-button>
            </div>
            <div class="w85">
              <h5 style="margin-bottom: 13px">2.填写模板并导入</h5>
              <el-upload
                ref="uploadExcel"
                :action="uploadUrls.excelUrl"
                :headers="accessToken"
                :file-list="uploadUrls.excelFileList"
                :on-success="uploadExcelSuccess"
                :on-error="uploadExcelError"
                :before-upload="checkExcelFile"
                accept=".xlsx, .xls"
                :auto-upload="true"
              >
                <el-button
                  slot="trigger"
                  size="small"
                  style="margin-top: -10px"
                  type="primary"
                >选择文件上传</el-button>
                <div slot="tip" class="el-upload__tip">文件大小不能超过10MB</div>
              </el-upload>
            </div>

            <div slot="footer" class="dialog-footer">
              <el-button @click="cancelExport">取 消</el-button>
              <el-button type="primary" @click="exportSave" :loading="listLoading">导 入</el-button>
            </div>
          </el-dialog>
        </div>
      </el-col>
      <!-- 右边 -->
      <el-col :span="1">
        <div class="border"></div>
      </el-col>
      <el-col :span="5">
        <div class="app-container-right" ref="lineHeight">
          <!-- v-on:childMethod="getList"   在子组件里面调用父组件的getList方法 childMethod是子组件里面参数名 -->
          <update-element ref="update" v-on:childMethod="getList"></update-element>
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
  importDataUrl,
  addUpload,
  addDownLoad,
  cbeNameSelect,
} from "api/baseDataSys/bdGoodsRecord/index";
import { mapGetters } from "vuex";
import { getToken } from "utils/auth";
// import { getCusUnitData } from "api/baseDataSys/bdCusUnit/index";
import { getCusMoneyData } from "api/baseDataSys/bdCusMoney/index";
import { numberValidator, validateWeightGross } from "utils/validate";
var dateUtils = require("silly-datetime");
export default {
  name: "bdGoodsRecord",
  components: {
    // 引入编辑的组件
    "update-element": () => import("./components/update"),
  },
  data() {
    /**
     * 净重毛重校验规则
     */
    let compareWeightAndNetWeight = (rule, value, callback) => {
      if (
        /^[0-9]+([.]{1}[0-9]+){0,1}$/.test(this.form.grossWeight) &&
        /^[0-9]+([.]{1}[0-9]+){0,1}$/.test(this.form.netWeight) &&
        Number.parseFloat(this.form.grossWeight).toFixed(4) -
          Number.parseFloat(this.form.netWeight).toFixed(4) >
          0
      ) {
        callback();
      } else if (
        this.form.grossWeight === "" &&
        /^[0-9]+([.]{1}[0-9]+){0,1}$/.test(this.form.netWeight)
      ) {
        callback();
      } else {
        callback(new Error("净重必须小于毛重!"));
      }
    };
    return {
      accessToken: {
        accessToken: getToken(),
      },
      form: {
        cusName: "",
        cusCode: "",
        goodsNo: "",
        itemRecordNo: "",
        ciqRecordNo: "",
        hsCode: "",
        shelfGoodsName: "",
        goodsName: "",
        goodsDesc: "",
        goodsModel: "",
        barCode: "",
        price: "",
        originCountry: "",
        brand: "",
        unit: "",
        unit1: "",
        unit2: "",
        qtyRate1: "",
        qtyRate2: "",
        customsCode: "",
        status: "1",
        grossWeight: "",
        netWeight: "",
      },
      href: "",
      dialogVisible: false,
      // 上传
      uploadUrls: {
        excelUrl: importDataUrl,
        excelFileList: [],
      },
      filePath: "",
      selects: {
        cusUnit: [],
        cusMoney: [],
      },
      approveTypes: [
        {
          value: "1",
          label: "有效",
        },
        {
          value: "0",
          label: "无效",
        },
      ],
      rules: {
        cusCode: [
          {
            required: true,
            message: "请选择申报身份",
            trigger: "change",
          },
        ],
        goodsNo: [
          {
            required: true,
            message: "请输入货号",
            trigger: "blur",
          },
        ],
        itemRecordNo: [
          {
            required: true,
            message: "请输入海关账册备案料号",
            trigger: "blur",
          },
        ],
        // ciqRecordNo: [
        //   {
        //     required: true,
        //     message: "请输入国检备案号",
        //     trigger: "blur"
        //   }
        // ],
        hsCode: [
          {
            required: true,
            message: "请输入HS编码",
            trigger: "blur",
          },
        ],
        shelfGoodsName: [
          {
            required: true,
            message: "请输入上架商品名称",
            trigger: "blur",
          },
        ],
        goodsName: [
          {
            required: true,
            message: "请输入商品名称",
            trigger: "blur",
          },
        ],
        goodsModel: [
          {
            required: true,
            message: "请输入规格",
            trigger: "blur",
          },
        ],
        barCode: [
          {
            required: true,
            message: "请输入条码",
            trigger: "blur",
          },
        ],
        price: [
          {
            required: true,
            message: "请输入价格",
            trigger: "blur",
          },
          {
            validator: numberValidator,
            // message: "请输入数字",
            trigger: "blur",
          },
        ],
        originCountry: [
          {
            required: true,
            message: "请输入原产国",
            trigger: "blur",
          },
        ],
        unit: [
          {
            required: true,
            message: "请输入单位",
            trigger: "blue",
          },
        ],
        customsCode: [
          {
            required: true,
            message: "请输入口岸代码",
            trigger: "blur",
          },
        ],
        grossWeight: [
          {
            validator: numberValidator,
            trigger: "blur",
          },
        ],
        netWeight: [
          {
            validator: numberValidator,
            // message: "请输入数字",
            trigger: "blur",
          },
          // {
          //   validator: compareWeightAndNetWeight,
          //   trigger: 'blur'
          // }
        ],
      },
      list: null,
      total: null,
      listLoading: true,
      query: {
        goodsNo: "",
        cusCode: "",
        barCode: "",
        goodsName: "",
      },
      listQuery: {
        page: 1,
        limit: 10,
        _type_: "equal",
        orderBy: "gmtCreatedesc",
      },
      dialogFormVisible: false,
      dialogStatus: "",
      bdGoodsRecordManager_btn_edit: false,
      bdGoodsRecordManager_btn_del: false,
      bdGoodsRecordManager_btn_add: false,
      textMap: {
        update: "编辑",
        create: "创建",
      },
      tableKey: 0,
      selectCbeName: [],
    };
  },
  created() {
    this.getList();
    this.downLoad();
    this.cbeNameName();
    this.bdGoodsRecordManager_btn_edit = this.elements[
      "bdGoodsRecordManager:btn_edit"
    ];
    this.bdGoodsRecordManager_btn_del = this.elements[
      "bdGoodsRecordManager:btn_del"
    ];
    this.bdGoodsRecordManager_btn_add = this.elements[
      "bdGoodsRecordManager:btn_add"
    ];
  },
  computed: {
    ...mapGetters(["elements", "elTableMediaHeight"]),
  },
  methods: {
    // 关闭el-dialog 前的回调函数 重置表单
    closeDialog() {
      this.dialogFormVisible = false;
      this.$refs["form"].resetFields();
    },
    // 导入备案信息
    closeDialogExport() {
      this.dialogVisible = false;
    },
    // 查看详情
    detailName(row) {
      // this.showDetail = true
      this.$refs.update.formEdit = true;
      this.$refs.update.disabledForm = true;
      this.$refs.update.updateView = true;
      getObj(row.id).then((response) => {
        this.$refs.update.resetFormFields();
        this.$copyJsonProperty(this.$refs.update.form, response.data);
      });
    },
    getList() {
      this.listLoading = true;
      let param = {
        goodsNo: $.trim(this.query.goodsNo),
        cusCode: $.trim(this.query.cusCode),
        barCode: $.trim(this.query.barCode),
        goodsName: $.trim(this.query.goodsName),
        ...this.listQuery,
      };
      page(param).then((response) => {
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
      getObj(row.indx).then((response) => {
        this.form = response.data;
        this.dialogFormVisible = true;
        this.dialogStatus = "update";
      });
    },
    create(formName) {
      const set = this.$refs;
      set[formName].validate((valid) => {
        if (valid) {
          this.$confirm("确定要保存吗", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
            .then(() => {
              let date = new Date();
              this.form.indbTime = dateUtils.format(
                date,
                "YYYY-MM-DD  HH:mm:ss"
              );
              addObj(this.form).then((res) => {
                this.dialogFormVisible = false;
                if (res.rel) {
                  this.getList();
                  this.$notify({
                    title: "成功",
                    message: "创建成功",
                    type: "success",
                    duration: 2000,
                  });
                } else {
                  this.$notify({
                    title: "失败",
                    message: "系统异常",
                    type: "error",
                    duration: 2000,
                  });
                }
                if (res.status !== 200) {
                  this.$notify({
                    title: "失败",
                    message: res.message,
                    type: "error",
                    duration: 2000,
                  });
                }
                this.$refs["form"].resetFields();
              });
            })
            .catch(() => {});
        } else {
          return false;
        }
      });
    },
    // 默认申报身份
    cbeNameName() {
      cbeNameSelect().then((response) => {
        for (var i = 0; i < response.data.length; i++) {
          let cutObj = {};
          cutObj.label = response.data[i].key;
          cutObj.value = response.data[i].value;
          this.selectCbeName.push(cutObj);
        }
      });
    },
    // 下载文件
    downLoad() {
      // addDownLoad().then(res => {
      let host = window.location.host;
      this.href =
        "//" + host + "/api/basedatasys/bdGoods/downloadGoodsTemplate ";
      // })
    },
    //导入备案信息
    exportInfo() {
      this.uploadUrls.excelFileList = [];
      this.dialogVisible = true;
    },
    // 导出
    exportOut() {
      this.$confirm("确定要导出当前数据吗", "导出", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        let param = {
          goodsNo: $.trim(this.query.goodsNo),
          cusCode: $.trim(this.query.cusCode),
          barCode: $.trim(this.query.barCode),
          goodsName: $.trim(this.query.goodsName),
          ...this.listQuery,
        };
        let host = window.location.host;
        window.location.href =
          "//" +
          host +
          "/api/basedatasys/bdGoods/exportGoods?goodsNo=" + param.goodsNo + "&cusCode=" + param.cusCode + "&barCode=" + param.barCode + "&goodsName=" + param.goodsName 
      });
    },
    // 上传成功
    uploadExcelSuccess(response, file, fileList) {
      if (response.rel === false) {
        this.$alert(response.message);
        return;
      } else {
        this.$message({
          message: "提交成功：上传文件成功",
          type: "success",
          duration: 2000,
        });
        this.filePath = response.data;
      }
    },
    // 上传失败
    uploadExcelError(err, file, fileList) {
      this.$message({
        message: "提交失败：上传文件失败",
        type: "error",
        duration: 2000,
      });
    },
    checkExcelFile(file) {
      let endswith = file.name.substring(file.name.lastIndexOf(".") + 1);
      const isJPG = endswith;
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (isJPG !== "xls" && isJPG !== "xlsx") {
        this.$message.error("提交失败：上传文件格式错误！");
        this.uploadUrls.excelFileList = [];
        return false;
      }
      if (!isLt2M) {
        this.$message.error("提交失败：上传文件不能超过10M！");
        this.uploadUrls.excelFileList = [];
        return false;
      }
      return isJPG && isLt2M;
    },
    exportSave() {
      if (this.filePath === "") {
        this.$message({
          message: "提交失败,请选择上传文件！",
          type: "error",
          duration: 2000,
        });
        return false;
      }
      this.$confirm("确定要上传吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let param = {
            filePath: this.filePath,
          };
          this.listLoading = true;
          addUpload(param).then((res) => {
            this.dialogVisible = false;
            // if (res.rel) {
            this.listLoading = false;
            this.$alert(res.message, "导入备案信息", {
              confirmButtonText: "确定",
              callback: (action) => {},
            });
            this.getList();

            // }
          });
        })
        .catch(() => {});
    },
    cancelExport() {
      this.dialogVisible = false;
    },
    cancel(formName) {
      this.dialogFormVisible = false;
      const set = this.$refs;
      set[formName].resetFields();
    },

    // getCusUnit () {
    //   getCusUnitData().then(res => {
    //     if (res.rel) {
    //       this.selects.cusUnit = res.data;
    //     }
    //   });
    // },
    // 获取海关币制
    getCusMoney() {
      getCusMoneyData().then((res) => {
        if (res.rel) {
          this.selects.cusMoney = res.data;
        }
      });
    },
    resetTemp() {
      this.form = {
        cusName: "",
        cusCode: "",
        goodsNo: "",
        itemRecordNo: "",
        ciqRecordNo: "",
        hsCode: "",
        shelfGoodsName: "",
        goodsName: "",
        goodsDesc: "",
        goodsModel: "",
        barCode: "",
        price: "",
        originCountry: "",
        brand: "",
        unit: "",
        unit1: "",
        unit2: "",
        qtyRate1: "",
        qtyRate2: "",
        customsCode: "",
        status: "1",
        grossWeight: "",
        netWeight: "",
      };
    },
  },
};
</script>
<style scoped>
.el-input {
  width: 217px;
}
.el-form--inline .el-form-item {
  /* margin-left: 5%; */
  /* width: 400px; */
}
.formLeft {
  padding-left: 3%;
}
.el-input,
.el-select {
  width: 200px;
}
.widthRadio {
  margin-left: 35px;
  margin-right: 35px;
}
.exportText {
  margin-top: -10px;
  text-align: center;
}
.exportText p {
  background-color: #ffffe9;
  border: 1px solid #cfcfce;
  color: #333;
  width: 85%;
  margin: 0 auto;
  padding-top: 5px;
  padding-bottom: 5px;
  font-size: 14px;
}
.w85 {
  width: 85%;
  margin: 0 auto;
}
.exportSpan {
  display: block;
  margin-top: -13px;
  margin-bottom: 10px;
}
</style>