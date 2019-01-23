<template>
  <div class="app-newlist">
    <ul class="mui-table-view">
      <li v-for="item in list" :key="item.p_nid" class="mui-table-view-cell mui-media">
        <router-link  :to="'/NewsInfo?p_nid='+item.p_nid">
          <img class="mui-media-object mui-pull-left" :src="item.img_url">
          <div class="mui-media-body">
            {{item.title}}
            <p class='mui-ellipsis'>
              <span>{{item.ctime | datatimeFilter}}</span>
              <span>点击: {{item.point}} 次</span>
            </p>
          </div>
        </router-link>
      </li>
    </ul>
    <mt-button type='primary' size='large' @click='getMore'>加载更多</mt-button>
  </div>  
</template>
<script>
 export default {
  data(){
    
    return {
      list:[],    //显示数据列表
      pno:0,      //当前页码
      pageSize:7, //页大小
      pageCount:1 //总页数
    }
  },
  methods:{
      
    getMore(){
      this.pno++;
      //创建变量保存是否有当前页条件
      //true 有数据 false 无数据
      var hasMore = this.pno <= this.pageCount;
      //如果没有页数,停止函数执行
      if(!hasMore){return}
      //console.log('123');
      //1.发送请求 获取分页数据
      var url = 'newslist?pno='+this.pno+'&pageSize='+this.pageSize;
      this.$http.get(url).then(result=>{
        //console.log(result.body);
        //this.list = result.body.data;
        var rows = this.list.concat(result.body.data);
        //console.log(rows);
        this.list = rows;
        //console.log(this.list);
        this.pageCount = result.body.pageCount;

      });
      //2.显示组件模板中

    }
  },
  created() {
    this.getMore();
    
  }
 }
</script>
<style>
  .app-newlist .mui-table-view li .mui-ellipsis{
    display:flex;
    font-size:12px;
    color:#226aff;
    justify-content:space-between;
  }
</style>