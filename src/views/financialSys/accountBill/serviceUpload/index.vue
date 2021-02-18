<template>
  <div class="app-container calendar-list-container" id="app-container">
    <el-row>
      <!-- 左边 -->
      <el-col :span="24">
        <el-tabs type="card" class="wareTab">
            <el-tab-pane label="退件转寄上传">
               <material-upload></material-upload>
            </el-tab-pane>
            <el-tab-pane label="提货转关上传">
              <ware-upload></ware-upload>
            </el-tab-pane>
            <el-tab-pane label="赔付上传">
                <check-Upload></check-Upload>
            </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "CustomerData",
  components: {
    // 引入编辑的组件
    "material-upload": () => import("./components/materialUpload.vue"),
    "ware-upload": () => import("./components/wareUpload.vue"),
     "check-Upload": () => import("./components/checkUpload.vue")
  },
  data() {
    return {
      total: 0,
      loading: {
        tableLoading: false,
      },
      list: [],
      listQuery: {
        page: 1,
        limit: 10,
        orderBy: "createTimedesc",
        // customerCode: undefined,
      },
    };
  },
  created() {
  },
  computed: {
  },
  methods: {
  }
};
</script>
<style scoped rel="stylesheet/scss" lang="scss">
// 右侧背景颜色
.lineHeight {
  height: 20px;
}
.btnMb {
  margin-bottom: 5px;
  // float: right;
  margin-right: 15px;
  margin-top: 10px;
  text-align: right;
}
.btnMb button {
  margin-left: 15px;
}
.el-input,
.el-select {
  width: 200px;
}
.dialog-footer {
  text-align: right;
  margin-top: -20px;
}
.btnSize {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  color: #fff;
  margin: 0;
  padding: 6px 14px;
  border-radius: 4px;
  margin-right: 3px;
  text-align: center;
  margin-top: 1px;
  margin-left: 4px;
}
.enterpriseStyle{
    width: 100%;
    overflow: hidden;
}
.enterpriseStyle p{
   margin: 0;
}
.enterpriseStyle ul{
    width: 100%;
    overflow: hidden;
    margin: 0;
    padding: 0;
    margin-top: 10px;
    font-size: 14px;
}
.enterpriseStyle ul li{
  width: 100%;
  height: 35px;
  line-height: 35px;  
}

</style>



