<template>
  <div class='app-login'>
    <div class="mui-card">
      <div class='mui-card-header'>
        <h3>用户登录</h3>
      </div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <form action="#">
            用户名：<input type="text"  placeholder='请输入用户名'   v-model='uname' value="">
            密码：<input v-model='upwd' type="password" value="" placeholder='请输入密码'>
            <mt-button size='large' @click='handleLogin'>
              登录
            </mt-button>
          </form>
        </div>
      </div>
      <div class="mui-card-footer">
      </div>
		</div>
  </div>
</template>
<script>
  import {Toast} from 'mint-ui'
  export default {
    data(){
      
      return {
        uname:'',
        upwd:''
      }
    },
    methods:{
      handleLogin(){
        //1:获取参数
        var u = this.uname;
        var p = this.upwd;
        sessionStorage.setItem("uname",u);
        
        //2:正则表达式验证
        var reg = /^[a-z0-9_]{2,8}$/i;
        if(!reg.test(u)){
          Toast('用户名格式不正确');
          return;
        }
        if(!reg.test(p)){
          Toast('密码格式不正确');
          return;
          
        }
        var url = 'http://127.0.0.1:3000/Login?uname='+u+'&upwd='+p;
        this.axios.get(url).then(result=>{
          var uid = result.data.uid;
          sessionStorage.setItem('uid',uid);
          if(result.data.code == 1){
            Toast('登录成功');
            this.$router.push("/");
          }else{
            Toast("用户名或密码有误");
          }/*
          var uid = result.data[0].uid;
          var c = result.data[0].c;
          sessionStorage.setItem("uid",uid);
          if(c == 1){
            this.$router.push("/");
          }else{
            Toast("用户名或密码有误");
          }*/
        });
      }
    }
  }
</script>
<style>

</style>