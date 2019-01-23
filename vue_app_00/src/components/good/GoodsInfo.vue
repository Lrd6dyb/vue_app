<template>
 <div class="app-goodsinfo">
    <!--轮播图卡片-->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <swiper-box :list="list"></swiper-box>
        </div>
      </div>
		</div>
    <!--商品信息-->  
    <div class="mui-card">
			<div class="mui-card-header">
        {{info.lname}}
      </div>
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
					<img  class='laptop_img' :src="info.img_url" alt="">
          <p class="price">
            市场价:<del>{{info.old}}</del> 
            单售价:<span class="now" >{{info.price}}</span>   
          </p>
          购买数量：<div class="mui-numbox">
					<button class="mui-btn mui-btn-numbox-minus" type="button" @click="goodSub">-</button>
					<input class="mui-input-numbox" type="number"  v-model="val">
					<button class="mui-btn mui-btn-numbox-plus" type="button" @click="goodAdd">+</button>
				</div> 	
				</div>
			</div>
      <div class="mui-card-footer">
        <mt-button type="primary" size="small">立即购买</mt-button>
        <mt-button type="danger" size="small" @click="addCart">加入购物车</mt-button>
      </div>
		</div> 
    <!--商品参数-->     
 </div>
</template>
<script>
  //1.轮播图子组件
  import swipe from '../sub/swipe.vue'
  import {Toast} from 'mint-ui' 
  //2.引入mui.js库
  //报错  自己写点击事件
  export default {
    created() {
      //console.log(this.$route.params.id);
      this.getImages();
      this.laptop();
    },
    data(){
      return {
        nid:this.$route.params.id,
        list:[],
        info:{},
        val:1
      }
    },
    methods:{
      laptop(){
        var lid = this.$route.params.id;
        var url = 'http://127.0.0.1:3000/goodsinfo?lid='+lid;
        this.axios.get(url).then(result=>{
          console.log(result.data);
          this.info = result.data.data;
        })
      },
      addCart(){
        //获取参数 pid count uid
        var pid = this.$route.params.id;
        var count = this.val;
        var price = this.info.price;
        console.log(pid,count,price);
        //var uid = this.uid; 
        //发送请求
        var url = "http://127.0.0.1:3000/addCart?pid="+pid+"&count="+count+"&price="+price;
        this.axios.get(url).then(result=>{
          if(result.data.code==1){
            //修改 全局共享数据cart Count
            this.$store.commit("increment",count);
            Toast("购物车添加成功");
          }else{
            Toast("购物车添加失败,请登录,3s后自动跳转登录页面");
            this.changeData();
          }
        });
        //请求成功提示
      },
      goodSub(){
        if(this.val>1){
          this.val--
        }
      },
      goodAdd(){
        if(this.val<=998){
          this.val++
        }
      },
      getImages(){
        var url = "http://127.0.0.1:3000/imagelist";
        this.axios.get(url).then(result=>{
          this.list=result.data;
        })
      }
    },
    components:{
      "swiper-box":swipe
    }
  }
</script>
<style>
  .mui-card-content-inner>.laptop_img{
    margin:0 16%;
    height:100px;
  }
</style>
<!--
<template>
  <div class='app-goodsinfo'>
    <h1>商品的详细信息</h1>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        nid:this.$route.params.id
      }
    },
    created() {
      console.log(this.$route.params.id);  
    }
  }
  //创建子组件
  
</script>
<style>

</style>
-->