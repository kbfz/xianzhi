<template>
  <div class="homeBg">
    <!-- <div class="text">
        <h4>全速通ERP系统  ERP SYSTEM</h4>
        <span class="introduction">ERP系统是指建立在信息技术基础上，以系统化的管理思想，为企业决策层及以上员工提供决策运行手段的管理平台。
          它是从MRP(物料需求计划)发展而来的新一代集成化管理信息系统，它扩展了MRP的功能，其核心思想是供应链管理。
          它跳出了传统企业边界，从供应链范围去优化企业的资源。ERP系统集中信息技术与先进的管理思想于一身，为现代企业运行模式。</span>
     </div> -->
    <!-- <div class="footer">
        <span class="copyRight">Copyright河南全速通供应链管理有限公司 版权所有 保留一切权利</span>
     </div> -->
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { setAppId } from "utils/auth";
export default {
  name: 'HomePage',
  data () {
    return {
      // deijhf
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'avatar'
    ])
  },
  created () {
    this.$store.dispatch('HomeInfo').then(info => { })
  },
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.homeBg {
  background: url('../../assets/images/pic.jpg') no-repeat;
  height: 100%;
  width: 100%;
  position: fixed;
  background-size: cover;
  top: 70px;
  .text {
    width: 60%;
    overflow: hidden;
    padding-top: 20px;
    margin: 0 auto;
    margin-left: 20%;
  }
  .text h4 {
    margin-bottom: 15px;
    color: #7e8285;
  }
  .text .introduction {
    font-size: 13px;
    color: #747b85;
    line-height: 25px;
  }
  .footer {
    text-align: center;
    font-size: 13px;
    color: #b6b6b6;
    position: fixed;
    bottom: 40px;
    width: 50%;
    margin: 0 auto;
    left: 25%;
  }
  .footer .copyRight {
    text-align: center;
  }
}
</style>


