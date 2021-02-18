<template>
    <el-menu mode="vertical" theme="dark" unique-opened :default-active="$route.path" :collapse="isCollapse" :default-openeds="isOpen">
      <sidebar-item :routes='permissionMenus' :systemCode='currentChildSystemCode'></sidebar-item>
    </el-menu>
</template>
<script>
  import { mapGetters } from 'vuex';
  import SidebarItem from './SidebarItem';
  export default {
    components: { SidebarItem },
    computed: {
      ...mapGetters([
        'sidebar',
        'permissionMenus',
        'currentChildSystemCode'
      ]),
      isCollapse() {
        return !this.sidebar.opened;
      },
      isOpen() {
        return ['客户信息管理', '订单详情', '增值服务'];
      }
    }
  }
</script>
