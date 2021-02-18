<template>
	<div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">
	  <!-- <div class="bgColor"> -->
		  <sidebar class="sidebar-container"></sidebar>
	  <!-- </div>
	   -->
		<div class="main-container">
			<navbar></navbar>
			<app-main></app-main>
		</div>
</div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { Navbar, Sidebar, AppMain } from 'views/layout';

  export default {
    name: 'layout',
    components: {
      Navbar,
      Sidebar,
      AppMain
    },
    computed: {
	 ...mapGetters([
      'name',
      'avatar'
    ]),
      sidebar() {
        return this.$store.state.app.sidebar;
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	@import "src/styles/mixin.scss";
	 .laginOut{
		  height: 100%;
		  background: #262A35;
		 width: 90px;
		  text-align: center;
		  font-size: 14px;
		 padding-top: 15px;
		 float: right;
		 cursor: pointer;
	  }
	.laginOut img {
		width: 40px;
		height: 40px
	}
	.upDown{
		margin-right: 10px;
	
	}
	.app-wrapper {
		@include clearfix;
		position: relative;
		height: 100%;
		width: 100%;
		&.hideSidebar {
			.sidebar-container{
				width:36px;
				overflow: inherit;
			}
			.main-container {
				margin-left: 36px;
			}
		}
		// .bgColor{
		// -webkit-transition: width 0.28s ease-out;
		// 	transition: width 0.28s ease-out;
		// 	width: 210px;
		// 	// height: 100%;
		// 	position: fixed;
		// 	bottom: 0;
		// 	top: 89px;
		// 	left: 0;
		// 	z-index: 1001;
		// 	overflow-y: auto;
		//   background: #31333f;;
		// }
		.sidebar-container {
			transition: width 0.28s ease-out;
			width: 210px;
		//  height: 100%;
		 	position: fixed;
			bottom: 0;
				top: 89px;
				left: 0;
			z-index: 1001;
			overflow-y: auto;
 			&::-webkit-scrollbar {display:none}
		}
		.main-container {
			min-height: 100%;
			transition: margin-left 0.28s ease-out;
			margin-left: 210px;
			padding-top: 150px;
			height: 600px;
			overflow-y:auto;
		}
	}
	@media screen and (max-width: 1300px) { 
		 .topNav ul {
               margin-left: -2%;
         }
		.avatar-container {
        height: 50px;
        display: inline-block;
        position: absolute;
		right: 105px;
		top: 20px;}
	}
	 @media screen and (max-width: 1100px) {
		 .topNav .laginOut {
	       width: 70px
	   }
	   .topNav ul {
    margin-left: -4%;
}
   .avatar-container {
        height: 50px;
        display: inline-block;
        position: absolute;
		right: 85px;
		top: 20px;}
	.user-avatar {
                width: 35px;
                height: 35px;
				border-radius: 10px;
				float: left;
				margin-right: 6px;
			}
	 }
</style>
