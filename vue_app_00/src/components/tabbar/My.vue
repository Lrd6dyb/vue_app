<template>
  <div class='app-my'>
    <div class="mui-card">
      <div class="mui-card-content">
        <div id='my_card-content' class="mui-card-content-inner">
          <img id='login' src="http://127.0.0.1:3000/img/login_active.png" alt="">
          <p class='p' @click="change" :class="flag?'active':''">
            <router-link to='/Login'>登录</router-link>/
            <router-link to='/Register'>注册</router-link>  
          </p>
          <p class='p' @click="change" :class="flag?'':'active'">
            欢迎{{uname}} <mt-button type="danger" id='btn' @click='logout'>退出</mt-button>
          </p>
        </div>
      </div>
    </div>
    <div class="mui-card">
      <div class="mui-card-header">
        个人资料
        <div class='arrow'></div>
      </div>
    </div>
    <div class="mui-card">
      <div class="mui-card-header ">
        支付
        <div class='arrow'></div>
      </div>
    </div>
    <div class="mui-card">
      <div class="mui-card-header">
        收藏
        <div class='arrow'></div>
      </div>
    </div>
    <div class="mui-card">
      <div class="mui-card-header">
        卡包
        <div class='arrow'></div>
      </div>
    </div>
    <div class="mui-card">
      <div class="mui-card-header">
        常见问题
        <div class='arrow'></div>
      </div>
    </div>
    
    <div class="mui-card">
      <div class="mui-card-header">
        使用条款
        <div class='arrow'></div>
      </div>
    </div>
    <div class="mui-card">
      <div class="mui-card-header">
        设置
        <div class='arrow'></div>
      </div>
    </div>
  </div>
</template>
<script>
import {Toast} from 'mint-ui';
  export default {
    data(){
      return {
        flag:true,
        uname:''
        //display:none;
      }
    },
    created() {
      this.My();
      this.change();
    },
    methods:{
      logout(){
        var uid = sessionStorage.getItem("uid");
				var uname = sessionStorage.getItem("uname");
        if(!this.uid||!this.uname){
          sessionStorage.clear();
          Toast('退出成功');
          this.$router.push("/");
        }
      },
      My(){//
        var uid = sessionStorage.getItem("uid");
				var uname = sessionStorage.getItem("uname");
        this.uname=uname;
        /*console.log(sessionStorage.getItem("uname"));
        this.my = {uid,uname};
					if(uid==false){

					}else{
						
					}*/
      }, 
      change(){//
        if(!sessionStorage.getItem('uid'))//判断uid是否存在 存在则将登陆/注册用class隐藏
        {
          this.flag=false;
        }
      }
    }
  }
</script>
<style>
  .app-my>.mui-card #my_card-content{
    height:150px;
  }
  .mui-card>.div{
    width:355px;
    height:24px;
    background :##efeff4;
  }
  #login{
    /* height:40%;
    margin:0px 10px;
    */ 
    width:55px;
    position:absolute;
    top:33%;
    left:24%;
  }
  #my_card-content>.p{
    font-size:20px;
    width: 140px;
    height: 50px;
    line-height: 35px;
    position:absolute;
    top:43%;
    left:46%;
  }
  .arrow{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .arrow::after{
    content: "";
    width: 15px;
    height: 15px;
    border-top:3px solid #999;/*箭头边框*/
    border-right: 3px solid #999;
    transform:rotate(45deg);/*旋转45度*/
  }
  #btn{
    position: relative;
    top:-5px;
    left:5px;
  }
  .active{
    display:none;
  }
</style>