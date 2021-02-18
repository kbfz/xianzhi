<template>
  <div style="height:100%;width: 100%">
    <div class="topNav">
      <div class="logo"
           @click="indexPage">
        <router-link to="/">
          <img src="../../assets/images/sqLogo.png" alt="" v-if="href == 'erp.dongdamen.net'">
          <img src="../../assets/images/logo.png"
               alt="" v-else>
        
        </router-link>
      </div>
      <ul>
        <li v-for="(item, index) in nevMenu"
            v-bind:key="item.id"
            @click.stop="userClick(item.appId, item.path, index)"
            :class="{'active': index === nowIndex}">
          <div style="width: 100%; height: 100px">
            <p>
              <i :class="item.icon"></i>
            </p>
            <p>{{item.title}}</p>
          </div>
        </li>
      </ul>
      <!-- 点击按钮显示多余的菜单 -->
      <i class="el-icon-arrow-right"
         @click="showMenu"
         v-if="showView"></i>
      <div class="userInfo">
        <el-dropdown class="avatar-container upDown"
                     trigger="click">
          <div class="avatar-wrapper">
            <span class="user-name">{{name}}</span> <img class="user-avatar"
                 :src="avatar">
            <i class="el-icon-arrow-down"></i>
          </div>
          <el-dropdown-menu class="user-dropdown changePass"
                            slot="dropdown">
            <span @click="indexPage">
              <router-link class='inlineBlock'
                           to="/">
                <el-dropdown-item> 首页 </el-dropdown-item>
              </router-link>
            </span>
            <!-- <router-link class='inlineBlock'
                         to="/index/changePassword"> -->
              <el-dropdown-item divided>
                <span style="display:block;" @click="changePass">修改密码</span>
              </el-dropdown-item>
            <!-- </router-link> -->

            <el-dropdown-item divided>
              <span @click="logout"
                    style="display:block;">退出登录</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <!-- <div @click="logout" class="laginOut">
			<img src="../../assets/images/erp_nav_21.png" alt="">
			<span style="display:block;">退出</span>
		</div> -->
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getUserSystem } from "api/admin/menu/index";
import { setAppId, getToken } from "utils/auth";
import {
  logout
} from 'api/login';
//   import { Navbar, Sidebar, AppMain } from 'views/layout';
export default {
  name: "layout",
  data () {
    return {
      showView: false,
      hidden: false,
      // 导航菜单
      nevMenu: [],
      nowIndex: -1,
      ind: '0',
      href: window.location.host
    };
  },
  // components: {
  //  'home-page': () => import('./HomePage'),
  //   Navbar,
  //   Sidebar,
  //   AppMain
  // },
  computed: {
    ...mapGetters([
      'name',
      'avatar'
    ]),
    sidebar () {
      return this.$store.state.app.sidebar;
    }
  },

  mounted () {
    this.topMenu();
  },
  methods: {
    systemClick (index) {
      this.nowIndex = index;
    },
    userClick (appId, routerPath, index) {
      this.nowIndex = index;
      this.$store.commit("SET_APPID", appId);
      setAppId(appId);
      this.$store.commit("SET_MENUS", undefined);
      this.$router.push(routerPath);

      //   this.showView = true
      //   console.log(this.showView);
    },
    logout () {
      // // this.$store.dispatch("FedLogOut");
      // this.$store.dispatch("LogOut").then((res) => {
      //   //location.reload(); // 为了重新实例化vue-router对象 避免bug
      //  // console.log()
      //   window.location.href=res.data;
      // });
      let token = getToken()
      // console.log(token)
      logout(token).then(res => {
       window.location.href=res.data;
      })
    },
    indexPage () {
      this.isActive = false;
      this.isActive1 = false;
      this.isActive2 = false;
      this.isActive3 = false;
      this.isActive4 = false;
      this.isActive5 = false;
      this.isActive6 = false;
    },
    showMenu () {
      this.hidden = !this.hidden;
    },
    // 导航菜单
    topMenu () {
      let param = {};
      getUserSystem(param).then(response => {
        // console.log(response.data);
        for (var i = 0; i < response.data.length; i++) {
          if ("microService" === response.data[i].code) continue;
          let menuObj = {};
          menuObj.appId = response.data[i].attr2;
          menuObj.path = "/index" + response.data[i].path;
          menuObj.icon = response.data[i].icon;
          menuObj.title = response.data[i].title;
          menuObj.id = i;
          this.nevMenu.push(menuObj);
          // if (response.data.length > 7) {
          // 	this.showView = true
          // }
        }
        // console.log(this.nevMenu)
      });
    },
    changePass() {
      let self = this
     self.$router.push('/index/changePassword')
    }
  },

};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import 'src/styles/mixin.scss';
.topNav {
  background: #31333f;
  height: 90px;
  color: #fff;
  padding-left: 10px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1999;
  // 系统图标
  .permissionIcon {
    background-image: url('../../assets/images/erp_nav_01.png');
    background-position: center center;
    background-repeat: no-repeat;
  }
  .baseDataSysIcon {
    background-image: url('../../assets/images/erp_nav_07.png');
    background-position: center center;
    background-repeat: no-repeat;
  }
  .orderSysIcon {
    background-image: url('../../assets/images/erp_nav_02.png');
    background-position: center center;
    background-repeat: no-repeat;
  }
  .finanIcon {
    background-image: url('../../assets/images/erp_nav_14.png');
    background-position: center center;
    background-repeat: no-repeat;
  }
  .addServiceIcon{
     background-image: url('../../assets/images/addServiceIcon.png');
    background-position: center center;
    background-repeat: no-repeat;
  }
  .purchaseIcon{
     background-image: url('../../assets/images/caixiaologo.png');
    background-position: center center;
    background-repeat: no-repeat;
  }
  .curtomIcon {
    background-image: url('../../assets/images/erp_nav_05.png');
    background-position: center center;
    background-repeat: no-repeat;
  }
  .oaIcon {
    background-image: url('../../assets/images/erp_nav_12.png');
    background-position: center center;
    background-repeat: no-repeat;
  }
  .dataIcon {
    background-image: url('../../assets/images/erp_nav_16.png');
    background-position: center center;
    background-repeat: no-repeat;
  }
  .tradeIcon {
    background-image: url('../../assets/images/erp_nav_18.png');
    background-position: center center;
    background-repeat: no-repeat;
  }
  .logo {
    float: left;
    height: 90px;
    padding-top: 25px;
    padding-left: 20px;
  }
  ul {
    width: 65%;
    height: 90px;
    margin: 0 auto;
    // margin-left: 1%;
    float: left;
    overflow: hidden;
  }
  ul li {
    float: left;
    width: 13%;
    text-align: center;
    position: relative;
    height: 90px;
    text-align: center;
    margin-left: 1%;
    cursor: pointer;
  }
  .active {
    background: #265dd1;
  }
  ul li p i {
    display: inline-block;
    width: 40px;
    height: 40px;
  }
  ul li p {
    text-align: center;
    margin-top: 13px;
    line-height: 3px;
    font-size: 14px;
  }
  .userInfo {
    float: right;
    height: 100%;
  }
  .laginOut {
    height: 100%;
    background: #262a35;
    width: 90px;
    text-align: center;
    font-size: 14px;
    padding-top: 15px;
    float: right;
    cursor: pointer;
  }
  .laginOut img {
    width: 40px;
    height: 40px;
  }
  .upDown {
    margin-right: 10px;
  }
}
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  &.hideSidebar {
    .sidebar-container {
      width: 36px;
      overflow: inherit;
    }
    .main-container {
      margin-left: 36px;
    }
  }
  .sidebar-container {
    transition: width 0.28s ease-out;
    width: 210px;
    height: 100%;
    position: fixed;
    // top: 0;
    top: 90px;
    bottom: 0;
    left: 0;
    z-index: 1001;
    overflow-y: auto;
    border-radius: 0;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  .main-container {
    min-height: 100%;
    transition: margin-left 0.28s ease-out;
    margin-left: 210px;
    padding-top: 90px;
  }
}

// 头像显示
.avatar-container {
  height: 50px;
  display: inline-block;
  position: absolute;
  right: 30px;
  top: 20px;
  .avatar-wrapper {
    cursor: pointer;
    margin-top: 5px;
    position: relative;
    .user-avatar {
      width: 38px;
      height: 38px;
      // border-radius: 10px;
      float: left;
      margin-right: 6px;
    }
    .user-name {
      color: #fff;
      line-height: 50px;
    }
    .el-icon-arrow-down {
      position: absolute;
      right: -20px;
      top: 21px;
      font-size: 12px;
      color: #fff;
    }
  }
}
@media screen and (max-width: 1642px) {
  .logo img {
    // width: 142px;
    // height: 70px;
  }
  .topNav ul li p i {
    width: 38px;
    height: 38px;
  }
  .topNav ul li p:nth-of-type(1) {
    text-align: center;
    margin-top: 11px;
    line-height: 0px;
    font-size: 12px;
    margin-bottom: 10px;
  }
  .topNav ul li p:nth-of-type(2) {
    text-align: center;
    line-height: 15px;
    font-size: 12px;
    margin-top: 0;
  }
  .topNav ul {
    width: 65%;
    height: 90px;
    margin: 0 auto;
    float: left;
  }
  .topNav .laginOut img {
    width: 38px;
    height: 38px;
  }
}
@media screen and (max-width: 1300px) {
  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 25px;
    top: 20px;
  }
}
@media screen and (max-width: 1100px) {
  .topNav .laginOut {
    width: 70px;
  }
  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 25px;
    top: 20px;
  }
  .user-avatar {
    width: 35px;
    height: 35px;
    border-radius: 10px;
    float: left;
    margin-right: 6px;
  }
}
// 点击按钮追加class
.hiddenMenu {
  display: none;
}
.el-icon-arrow-right {
  line-height: 90px;
}
</style>
