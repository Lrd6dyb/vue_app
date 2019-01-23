<template>
  <div class='app-newsinfo'>
    <h3>{{info.title}}</h3>
    <textarea>
      {{info.content}}
    </textarea>
    <h3>{{info.ctime | datatimeFilter}}</h3>
    <h3>点击 {{info.point}} 次数</h3>
    <!--评论子组件-->
    <comment-box :p_nid='p_nid'>
    </comment-box>
  </div>
</template>
<script>
  //1.引入子组件
  import comment from '../sub/comment.vue'
  
  export default {
    data(){
      //var counter=0;
      return {
      
      info:{},
      p_nid:this.$route.query.p_nid
    }},
    created() {
      //console.log('接收新闻列表参数'+this.$route.query.p_nid);
      this.getInfo();
      //this.counter();
      
    },
    methods:{
      // counter(){
      //   counter++;
      //   console.log(counter);
      // },
      getInfo(){
        var p_nid = this.$route.query.p_nid;
        this.$http.get('NewsInfo?p_nid='+p_nid).then(result=>{
          //console.log(result);
          this.info = result.body.data[0];
        });
      }
    },
    components:{
      "comment-box":comment
    }

  }
</script>
<style>

</style>