<template>
	<div class="app-container">
		<!--导航栏-->
		<mt-header fixed title='好再来糕点坊'></mt-header>
		<!--router-view-->
		<router-view>
		</router-view>
		<!--tabbar-->
		<nav class="mui-bar mui-bar-tab">		
      <router-link class="mui-tab-item mui-active" to='/'>
			  <span class="mui-icon mui-icon-home">
        </span>
				<span class="mui-tab-label">
          首页
        </span>
			</router-link>
			<router-link class="mui-tab-item" to='/Search'>
				<span class="mui-icon mui-icon-search">  
        </span>
				<span class="mui-tab-label">
          搜索
        </span>
			</router-link>
			<router-link to='/Cart' class="mui-tab-item" href="#tabbar-with-contact">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart">
          <span class="mui-badge">
            {{$store.getters.optCartCount}} 
          </span>
        </span>
				<span class="mui-tab-label">
          购物车 
        </span>
			</router-link>
			<router-link class="mui-tab-item" to='/My'>
				<span class="mui-icon mui-icon-contact">
        </span>
				<span class="mui-tab-label">
          我的
        </span>
			</router-link>
		</nav>
	</div>
</template>
<script>
	 export default {
		 	data(){
				return {
				}
			},
		  created() {
				//this.appMy();
			},
			methods:{
				/*appMy(){
					
				}*/
			}
	 }
</script>
<style>
	.app-container{
		padding-top:40px;
		padding-bottom:50px;
		overflow-x:hidden;
	}
</style> 
