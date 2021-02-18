<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-col :span="10">
          <div style="width:98%">
            <p>搜索选择</p>
            <el-input placeholder="输入关键字进行过滤"
                      v-model="filterText"
                      style="position: relative">
            </el-input>
            <div class="wAuto"
                 ref="wAuto">
              <el-tree class="filter-tree"
                       :data="dataList"
                       :props="defaultProps"
                       default-expand-all
                       :filter-node-method="filterNode"
                       @node-click="getNodeData"
                       ref="tree">
              </el-tree>
            </div>
          </div>
        </el-col>
        <el-col :span="14">
          <p>已选择</p>
          <div class="rightBorder"
               ref="rightBorder">
            <el-tag v-for="item in form.serviceDetailList"
                    :key="item.id"
                    :closable="true"
                    @close="handleClose(item)">
              <div class="bordercontent">
                <span :class="{'text': item.minQuantity > 1 && item.minQuantity !== undefined}">{{item.serviceName}}
                  <span v-if="item.minQuantity > 1 && item.minQuantity !== undefined">数量不可低于{{item.minQuantity}}个</span>
                </span>
                <el-tooltip class="item"
                            effect="light"
                            placement="bottom-start">
                  <div slot="content"
                       class="textContent">{{item.description}}</div>
                  <img src="../../../../assets/images/notice.png"
                       alt=""
                       style="margin-right:10px;">
                </el-tooltip>
                <el-input-number v-model="item.serviceQuantity"
                                 :min="parseInt(item.minQuantity) || 1"> </el-input-number>
              </div>
            </el-tag>
            <div class="fotter"
                 v-if="this.form.serviceDetailList.length > 0">
              <div class="fotterLeft">
                注：部分增值服务因实际情况数量会出现浮动，届时请根据客服通知进行调整
              </div>
            </div>
          </div>
        </el-col>
        <div class="fotterRight">
          <el-button @click="cancelServices">取消</el-button>
          <el-button type="primary"
                     @click="applyServices"
                     v-if="applyStatus">保存</el-button>
          <el-button type="primary"
                     @click="newApplyServices"
                     v-if="newApplyStatus">重新申请</el-button>

        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { selectObj, updateObj } from "api/addService/myaddService/index";
export default {
  data () {
    return {
      filterText: '',
      dataList: [],
      chooseArr: [],
      applyStatus: true,
      newApplyStatus: false,
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      form: {
        id: '',
        serviceDetailList: []
      },
     serviceStatus: 0,
    }
  },
  watch: {
    filterText (val) {
      this.$refs.tree.filter(val);
    }
  },
  methods: {
    // 申请增值服务
    servicesSelect () {
      selectObj().then(res => {
        res.data.forEach(el => {
          el.serviceQuantity = 1
          if (el.minQuantity) {
            el.serviceQuantity = el.minQuantity
          } else {
            el.minQuantity = 1
          }
        })
        this.dataList = res.data
        // console.log(this.dataList)
      })
    },
    filterNode (value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    getNodeData (data) {
      let arrObj = { 'serviceName': data.serviceName, 'serviceQuantity': data.serviceQuantity, 'serviceUnit': data.serviceUnit, 'unitPrice': data.unitPrice, 'description': data.description, 'minQuantity': data.minQuantity, 'serviceCodeId':data.id}
        this.form.serviceDetailList.push(arrObj)
      },
    handleClose (tag) {
        this.form.serviceDetailList.splice(this.form.serviceDetailList.indexOf(tag), 1);
    },
    isRepeat (arr) {
      // 验证重复元素，有重复返回true；否则返回false
      var hash = {};
      for (var i in arr) {
        if (hash[arr[i].serviceName]) {
          return true;
        }
        // 不存在该元素，则赋值为true，可以赋任意值，相应的修改if判断条件即可
        hash[arr[i].serviceName] = true;
      }
      return false;
    },
    // 取消申请
    cancelServices () {
      this.$emit('child', '');
    },
    // 保存
    applyServices () {
      let arrDetail = this.form.serviceDetailList
      if (arrDetail.length < 1) {
        this.$message({
          message: "增值服务项目不能为空！",
          type: 'error',
          duration: 2000
        });
        return false
      }
      if (this.isRepeat(arrDetail) === true) {
        this.$message({
          message: "增值服务项目重复！",
          type: 'error',
          duration: 2000
        });
        return false
      }
      for (var i = 0; i < arrDetail.length; i++) {
        if (arrDetail[i].serviceQuantity < arrDetail[i].minQuantity) {
          this.$message({
            message: "增值服务单量不能小于最小数量！",
            type: 'error',
            duration: 2000
          });
          return false
        }
      }

      this.$confirm('确定要保存吗?', '编辑', {
        confirmButtonText: '保存',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        updateObj(this.form).then(res => {
          this.$emit('child', '');
          if (res.rel) {
            this.$notify({
              title: "成功",
              message: "保存成功",
              type: "success",
              duration: 2000
            });
            this.$emit('childMethod', '');
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
        })
      }).catch(() => { })
    },
    // 重新申请
    newApplyServices () {
      let arrDetail = this.form.serviceDetailList
      if (arrDetail.length < 1) {
        this.$message({
          message: "增值服务项目不能为空！",
          type: 'error',
          duration: 2000
        });
        return false
      }
      if (this.isRepeat(arrDetail) === true) {
        this.$message({
          message: "增值服务项目重复！",
          type: 'error',
          duration: 2000
        });
        return false
      }
      for (var i = 0; i < arrDetail.length; i++) {
        if (arrDetail[i].serviceQuantity < arrDetail[i].minQuantity) {
          this.$message({
            message: "增值服务单量不能小于最小数量！",
            type: 'error',
            duration: 2000
          });
          return false
        }
      }

      this.$confirm('确定要重新申请吗?', '重新申请', {
        confirmButtonText: '保存',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let formApply = {
         id: this.form.id,
         serviceStatus: 0,
         serviceDetailList: this.form.serviceDetailList
        }
        updateObj(formApply).then(res => {
          this.$emit('child', '');
          if (res.rel) {
            this.$notify({
              title: "成功",
              message: "申请成功",
              type: "success",
              duration: 2000
            });
            this.$emit('childMethod', '');
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
        })
      }).catch(() => { })
    }
  },
  created () {
    this.servicesSelect()
  },
  mounted () {
    //   左侧tree的高度自适应
    let self = this
    this.$refs.wAuto.style.height = window.innerHeight * 0.49 + "px"
    this.$refs.rightBorder.style.height = window.innerHeight * 0.53 + "px"
    window.onresize = () => {
      self.$refs.wAuto.style.height = window.innerHeight * 0.49 + "px"
      self.$refs.rightBorder.style.height = window.innerHeight * 0.53 + "px"
    }
  },
}
</script>
<style scoped>
.rightBorder {
  width: 100%;
  overflow: auto;
  border: 1px solid #bfcbd9;
  position: relative;
}
/* .rightBorder ul {
  margin: 0;
  padding: 0;
} */
.rightBorder .bordercontent {
  float: left;
  text-align: center;
}
.rightBorder .bordercontent .delItem {
  cursor: pointer;
  display: inline-block;
  height: 47px;
  line-height: 48px;
  border-left: 1px solid #bfcbd9;
  margin-left: 10px;
  padding-left: 10px;
  width: 25px;
}
.rightBorder .bordercontent .text {
  float: left;
  line-height: 18px;
  margin-top: 8px;
  text-align: left
}
.rightBorder .bordercontent .text span {
  font-size: 10px;
  display: block;
  color: #999999;
  text-align: left;
}
.el-input-number {
  display: inline-block;
  width: 135px;
  position: relative;
  line-height: normal;
  margin-right: 5px;
}
.wAuto {
  /* height: 600px; */
  overflow: auto;
}
.textContent {
  color: #333;
  width: 200px
}
.el-tag {
  background-color: #fff;
  padding: 0 8px;
  height: 48px;
  line-height: 48px;
  font-size: 14px;
  color: #333;
  border-radius: 4px;
  box-sizing: border-box;
  border: 1px solid #bfcbd9;
  margin-left: 10px;
  margin-right: 7px;
  margin-bottom: 8px;
  margin-top: 8px;
}
.fotter {
  width: 100%;
  overflow: hidden;
  padding-left: 10px;
  padding-right: 10px;
  margin-bottom: 15px;
}
.fotterLeft {
  /* float: left; */
  font-size: 12px;
  color: #999999;
}
.fotterRight {
  float: right;
  margin-top: 10px;
}
</style>


