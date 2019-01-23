<template>
  <div class='app-comment'>
    <h3>评论{{p_nid}}子组件</h3>
    <!--发表评论区域-->
    <textarea placeholder='请吐槽最多120个字' maxlength='120' v-model='msg'></textarea>
    <mt-button size='large' @click='postComment'>发表评论</mt-button>
    <!--显示评论区域-->
    <div class='cmt-list'>
      <div class='cmt-item' v-for="(item,i) in list" :key="item.id">
        <div class='cmt-info'>
          第 {{i+1}} 楼：用户名：{{item.user_name}}
          <div class='cmt-body'>
            {{item.content}}
          </div>
          <br>
          发表时间：{{item.ctime | datatimeFilter}}
        </div>
      </div>
    </div>
    <mt-button size="large" @click="getMore">加载更多</mt-button> 
  </div>
</template>
<script>
  import {Toast} from 'mint-ui';
  export default {
    created() {
      //console.log(this);
      this.getMore();
    },
    methods:{
      postComment(){
        //console.log('123');
        //1.获取用户输入内容，用户名
        var msg = this.msg;
        var nid = this.p_nid;
        //2.判断评论内容为空
        var size = msg.trim().length;
        //3.提示评论内容不能为空
        if(size == 0){
          Toast('评论内容不能为空');
          return;
        }
        var url = 'http://127.0.0.1:3000/addComment';
        var param = `nid=${nid}&content=${msg}`;
         
        this.axios.post(url,param).then(result=>{
          console.log(result);
          if(result.data.code == 1){
            Toast("评论成功");
            this.pno = 0;
            this.list = [];
            this.getMore();
            console.log(this.p_nid+':'+this.msg);
          }else{ 
            Toast("评论发表失败,请登录,3s后自动跳转登录页面");
            this.changeData(); 
          }
        });
      },
      getMore(){
        //1.发送请求获取评论列表
        var nid = this.p_nid;
        this.pno++;
        var pno = this.pno;
        var pageSize = this.pageSize;
        var url = 'getcomment?pno='+pno+'&nid='+nid+'&pageSize='+pageSize;
        this.$http.get(url).then(result=>{
          console.log(result.body.data);
          var number = result.body.data[0].id;
          var rows = this.list.concat(result.body.data);
          this.list = rows;
        });
        
        //2.追加list
        //3.在模板中创建循环显示当前评论列表
        //4.楼层 1234
        //5.在模板中添加‘加载更多’ 按钮
        //6.点击事件

      }
    },
    data(){
      return {
        list:[],
        pno:0,
        pageSize:7,
        pageCount:1,
        msg:''
      }
    },
    props:['p_nid']
  }
</script>
<style>
  .app-comment h3{
    font-size:18px;
  }
  .app-comment textarea{
    font-size:14px;
    height:68px;
    margin:0;
  }
  .app-comment .cmt-list{
    margin:5px 0;
  }
  .app-comment .cmt-list .cmt-item{
    border:1px solid #aaa;
    margin-top:15px;
  }
  .app-comment .cmt-list .cmt-item .cmt-info{
    line-height:30px;
    background:#ccc;
  }
</style>