<template>
  <div class='app-register'>
    <div class="mui-card">
			<div class="mui-card-header">
        <h3>用户注册</h3>
      </div>
			<div class="mui-card-content">
			  <div class="mui-card-content-inner">
          <form>
            用户名：
            <input type="text" value='' v-model='uname' placeholder='请输入用户名' @blur.prevent='checkName'>
            密码：
            <input type="password" value='' placeholder='请输入密码' v-model='upwd'>
            确认密码：
            <input type="password" value='' placeholder='请再次输入密码' v-model='upwd2'>
            <mt-button @click='handlerRegister' size='large'>注册</mt-button>
          </form>
        </div>
      </div>
      <div class="mui-card-footer">
        
      </div>``
    </div>
  </div>
</template>
<script>
import {Toast} from 'mint-ui';
  export default {
    data(){
      return {
        uname:'',
        upwd:'',
        upwd2:'',
        isSumit:false
      }
    },
    created() {
      
    },
    methods:{
      checkName(){
        var uname = this.uname;
        var url = 'http://127.0.0.1:3000/exissName';
        var param = `uname=${uname}`;
        this.axios.post(url,param).then(result=>{ 
          if(result.data.code > 0){
            this.isSumit = true;
            Toast('用户名可用');
          }else{
            this.isSumit = false;
            Toast('用户名已存在');
          }
        });
      },
      handlerRegister(){
        if(!this.isSumit){
          return;
        }
        var u = this.uname;
        var p = this.upwd;
        var p2 = this.upwd2;
        console.log(u,p,p2);
        var reguname = /^[a-z0-9_]{2,12}$/i;
        var regpwd = /^[a-z0-9_]{3,12}$/i;
        if(!reguname.test(u)){
          Toast('用户名格式不正确');
          return ;
        }
        if(!regpwd.test(p)){
          Toast('密码格式不正确');
          return ;
        }
        if(p != p2){
          Toast('两次密码不一致，请修改');
          return ;
        }
        var url = 'http://127.0.0.1:3000/register';
        var param = `uname=${u}&upwd=${p}`;
        this.axios.post(url,param).then(result=>{
          Toast(result.data.msg+'3s后自动跳转登录页面');
          var that = this;
          //console.log(that);
          var t=null;
          console.log(t);
          t=setTimeout(function(){that.$router.push("/Login");},3000);
          //console.log(t);
          console.log('跳转成功');
        });
      }
    }
  }
</script>
<style>

</style>