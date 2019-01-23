<template>
  <div class='app-goodslist'>
    <!--商品列表项-->
    <div class='goods-item' v-for='item in list' :key='item.lid'>
      <img :src="item.img_url" alt="" @click='jumpDetail' :data-id='item.lid'>
      <h3 class='title' @click='jumpDetail' :data-id='item.lid'>{{item.lname}}</h3>
      <div class='info'>
        <div class='price'>
          <span class='now'>{{item.price}}</span>
          <span class='old'>{{item.old}}</span>
        </div>
      </div>
      <div class='sell'>
        <span>热卖中</span>
        <span>
          剩 {{item.rest_count}} 个
        </span>
      </div>
      <div class='shelf_time'>
        <span>制作完成日期:</span>
        <p>
          {{item.shelf_time | datatimeFilter}}
        </p>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    created() {
      this.getMore();
      
    },
    methods:{
      jumpDetail(even){
        //console.log(even.target.dataset.id);
        var id = even.target.dataset.id;
        //跳转不同组件
        this.$router.push('/GoodsInfo/'+id);
      },
      getMore(){
        var url = 'goodslist';
        this.$http.get(url).then(result=>{
          //console.log(result.body);
          this.list = result.body;
        })
      }
    },
    data(){
      return {
        list:[]
      }
    }
  }
</script>
<style>
  .app-goodslist{
    display:flex;
    flex-wrap:wrap;
    justify-content:space-between;
    padding:7px;
  }
  .app-goodslist .goods-item{
    width:49%;
    border:1px solid #ccc;
    box-shadow:0 0 8px #ccc;
    margin:4px 0;
    padding:2px;
    display:flex;
    flex-direction:column;
    min-height:210px;
    justify-content:space-between;
  }
  .app-goodslist .goods-item h3{
    font-size:18px;
  }
  .app-goodslist .goods-item img{
    width:100%;
  }
  .app-goodslist .goods-item .now{
    color:red;
    font-weight:bold;
    font-size:16px;
  }
  .app-goodslist .goods-item .old{
    font-size:12px;
    text-decoration:line-through;
  }
  .app-goodslist .shelf_time span{
    font-size:13px;
  }
  .app-goodslist .shelf_time p{
    font-size:13px;
    color:#000;
  }
</style>