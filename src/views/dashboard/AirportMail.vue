<template>
  <div class="dashboard-container">
    <component v-bind:is="currentRole"> </component>
  </div>
</template>


<script>
  import { mapGetters } from 'vuex';
  // import EditorDashboard from './editor/index';
  // 引入新的index.vue
  //  import EditorDashboard from './editor/newIndex.vue';
  // import EditorDashboard from './editor/charsindex.vue';
  export default {
    name: 'dashboard',
    // components: { EditorDashboard },
    data() {
      return {
      currentRole: ''
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
<style  rel="stylesheet/scss" lang="scss" scoped>
.dashboard-container{
  background: url('../../assets/images/jczy_body_png.png') left center no-repeat;
  height: 90%;
  width: 90%;
  position: fixed; 
  background-size:cover;
}
</style>