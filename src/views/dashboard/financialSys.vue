<template>
  <div class="dashboard-container">
    <component v-bind:is="currentRole"> </component>
  </div>
</template>


<style  rel="stylesheet/scss" lang="scss" scoped>
</style>
<script>
  import { mapGetters } from 'vuex';
  // 引入新的index.vue
  import EditorDashboard from './editor/financialSysIndex.vue';
  export default {
    name: 'dashboard',
    components: { EditorDashboard },
    data() {
      return {
      currentRole: 'EditorDashboard'
      }
    },
    computed: {
      ...mapGetters([
        'name',
        'avatar',
        'email',
        'introduction'
      ])
    }
  }
</script>
