<template>
  <div class='menu-wrapper'>

    <template v-for="item in routes">
      <!-- <router-link v-if="item.children.length>0" :to="item.code+'/'+item.children[0].code">
			<el-menu-item :index="item.code+'/'+item.children[0].code" class='submenu-title-noDropdown'>
				<icon-svg v-if='item.icon' :icon-class="item.icon"></icon-svg>
				<span slot="title">{{item.children[0].title}}</span>
			</el-menu-item>
		</router-link> -->
      <el-submenu :index="item.title">
        <template slot="title"
                  v-if="item.code !== 'vipOrder'">
          <icon-svg v-if='item.icon'
                    :icon-class="item.icon"></icon-svg>
          <span>{{item.title}}</span>
        </template>
        <!-- 唯品菜单显示 -->
        <template slot="title"
                  v-else>
          <icon-svg v-if='item.icon'
                    :icon-class="item.icon"
                    class="el-submenu__title2"></icon-svg>
          <span class="el-submenu__title2">{{item.title}}</span>
        </template>
        <template v-for="(child, index) in item.children">
          <sidebar-item class='nest-menu'
                        v-if='child.children&&child.children.length>0'
                        :routes='[child]'
                        :systemCode='systemCode'> </sidebar-item>
          <router-link v-else
                       :to="'/index/'+systemCode+'/'+child.code">
            <el-menu-item v-if="item.code !== 'vipOrder'"
                          :index="item.code+'/'+child.code"
                          :class="{'is-active': index === nowIndex}"
                          @click="clickMenuItem(index)">
              <icon-svg v-if='child.icon'
                        :icon-class="child.icon"></icon-svg>
              <span>{{child.title}}</span>
            </el-menu-item>
            <!-- 唯品菜单显示 -->
            <el-menu-item v-else
                          :index="item.code+'/'+child.code"
                          class="el-submenu__title2"
                          :class="{'is-active2': index === nowIndex}"
                          @click="clickMenuItem(index)">
              <icon-svg v-if='child.icon'
                        :icon-class="child.icon"></icon-svg>
              <span>{{child.title}}</span>
            </el-menu-item>
          </router-link>
        </template>
      </el-submenu>
    </template>
  </div>
</template>
<script>
export default {
  name: "SidebarItem",
  props: {
    routes: {
      type: Array
    },
    systemCode: {
      type: String
    }
  },
  mounted () {
    this.defaultActive()
  },
  data () {
    return {
      nowIndex: -1
    };
  },
  methods: {
    defaultActive () {
      if (this.$route.path == '/index/orderSys/OrderExport') {
        this.routes.forEach((element, i) => {
          if (element.code == 'orderDetail') {
            element.children.forEach((el2, m) => {
              if (el2.code == 'OrderExport') {
                this.nowIndex = m
                console.log('active')
              }
            })
          }
          // if (this.$route.path == '/index/addService') {
          //   this.routes.forEach((element, l) => {
          //     if (element.code == 'addServiceManage') {
          //       element.children.forEach((el2, n) => {
          //         if (el2.code == 'myaddService') {
          //           this.nowIndex = n
          //           console.log('active2')
          //         }
          //       })
          //     }
          //   })
          // }
        })
      } else {
        this.nowIndex = this.nowIndex
      }
    },
    clickMenuItem (index) {
      this.nowIndex = index;
    }
  },
  watch: {
    $route () {
      this.defaultActive()
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
.el-menu--dark {
  background-color: #31333f;
}

.el-submenu__title2 {
  color: #f10180 !important;
}
.is-active2 {
  color: #fff !important;
}
</style>

