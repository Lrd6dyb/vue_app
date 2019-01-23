<template>
  <div class='app-seach'>
    <div class="mui-card">
			<div class="mui-card-header">
         <input type="text" value='' name='keyword' v-model='keyword' placeholder='关键字'>
      </div>
      <div class="mui-card-header">
        <input type="number" value='' name='low' v-model='low' placeholder='价格下限'>
      </div>
      <div class="mui-card-header">
        <input type="number" v-model='high' value='' name='high' placeholder='价格上限'>
      </div>
      <div class="mui-card-header">
        <mt-button type='danger' @click='handleSearch'>搜索</mt-button>
      </div>
			<div class="mui-card-content">
			  <div class="mui-card-content-inner">
          <ul class="mui-table-view">
            <li v-for='item in list' :key='item.lid' class="mui-table-view-cell mui-media">
              <router-link   :to="'/GoodsInfo/'+item.lid">
                <img class="mui-media-object mui-pull-left" :src="item.img_url">
                <div class="mui-media-body">
                  {{item.lname}}
                  <p class='mui-ellipsis'>
                    现价：￥{{item.price}}
                  </p>
                </div>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
      <div class="mui-card-footer">
        
      </div>
    </div>
  </div>
</template>
<script>
import {Toast} from 'mint-ui';
  export default {
    data(){
      return {
        keyword:'',
        low:'',
        high:'',
        list:[]
      }
    },
    methods:{
      handleSearch(){
       //1.获取三个参数
        var kw = this.keyword;
        var low = this.low;
        var high = this.high;
        if(kw == ''){
          //Toast('请输入你要搜索的商品');
          kw = '';
        }
        if(low == ""){
          low = 0;
        }
        if(high == ""){
          high = 2100000000;
        }
        //2.关键词
        //3.下限0
        //4.上限2100000000
        //5.发送ajax
         var url="http://127.0.0.1:3000/search?keyword="+kw+"&low="+low+"&high="+high;
        this.axios.get(url).then(result=>{
          console.log(result.data);
          if(result.data.code == -1){
            Toast('请输入你要搜索的商品');
          }else if(result.data.code == -2){
            Toast('搜索的商品不存在,请重新查找');
          }else{
            this.list=result.data.data;
          }
          
        })
      } 
    }
  }
</script>
<style>

</style>