<template>
<el-menu class="navbar" mode="horizontal">
  <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
  <levelbar></levelbar>
  <!--  系统选择 下拉菜单 -->
  <!-- <el-dropdown class="avatar-container downRight">
      <span class="el-dropdown-link" style="color:#20A0FF">
        系统选择
         <i class="el-icon-arrow-down el-icon-right"></i> 
       </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item v-for="item in select" :value="item.title" :key="item.title">
          <router-link to="item.attr3" target="_blank">{{item.title}}</router-link> 
           <a :href="item.attr3" target="_self">{{item.title}}</a> 
           </el-dropdown-item> 
       </el-dropdown-menu> 
     </el-dropdown> -->
  <!-- <tabs-view></tabs-view> -->
  <!-- <error-log v-if="log.length>0" class="errLog-container" :logsList="log"></error-log> -->
  <!-- <screenfull class='screenfull'></screenfull> -->
  <!-- <el-dropdown class="avatar-container" trigger="click">
    <div class="avatar-wrapper"> <img class="user-avatar" :src="avatar"> <i class="el-icon-caret-bottom"></i> </div>
    <el-dropdown-menu class="user-dropdown" slot="dropdown">
      <router-link class='inlineBlock' to="/">
        <el-dropdown-item> 首页 </el-dropdown-item>
      </router-link>
      <el-dropdown-item divided><span @click="logout" style="display:block;">退出登录</span></el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown> -->
</el-menu>
</template>

<script>
import {
  mapGetters
} from 'vuex';
import Levelbar from './Levelbar';
import TabsView from './TabsView';
import Hamburger from 'components/Hamburger';
import Screenfull from 'components/Screenfull';
import ErrorLog from 'components/ErrLog';
import errLogStore from 'store/errLog';
// 系统选择 下拉菜单
import { getUserSystem } from 'api/admin/menu/index';
export default {
  components: {
    Levelbar,
    TabsView,
    Hamburger,
    ErrorLog,
    Screenfull
  },
  data() {
    return {
      log: errLogStore.state.errLog,
      select: []
  }
 },
  computed: { ...mapGetters([
      'sidebar',
      'name',
      'avatar'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    // logout() {
      // this.$store.dispatch('FedLogOut')
      // this.$store.dispatch('LogOut')
        // .then(() => {
          // location.reload(); // 为了重新实例化vue-router对象 避免bug
        // });
    // },
    // 系统选择 下拉菜单
    // systemSelect() {
    //   getUserSystem().then(res => {
    //     this.select = res.data
    //     console.log(this.select)
    //   })
    // }
  },
  created() {
    // this.systemSelect()
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
      height: 50px;
      line-height: 50px;
      border-radius: 0 !important;
      position: fixed;
      z-index: 888;
      width: 100%;
      top: 90px;
    position: fixed;
    z-index: 888;
    width: 100%;
    .hamburger-container {
        line-height: 58px;
        height: 50px;
        float: left;
        padding: 0 10px;
    }
    .errLog-container {
        display: inline-block;
        position: absolute;
        right: 150px;
    }
    .screenfull {
        position: absolute;
        right: 90px;
        top: 16px;
        color: red;
    }
    .avatar-container {
        height: 50px;
        display: inline-block;
        position: absolute;
        right: 35px;
        .avatar-wrapper {
            cursor: pointer;
            margin-top: 5px;
            position: relative;
            .user-avatar {
                width: 40px;
                height: 40px;
                border-radius: 10px;
            }
            .el-icon-caret-bottom {
                position: absolute;
                right: -20px;
                top: 25px;
                font-size: 12px;
            }
        }
    }
    // 系统选择下拉框
    .downRight{
      margin-right: 110px;
      cursor: pointer;
      font-size: 15px;
      margin-top: 3px
    }
}
</style>
