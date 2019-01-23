<template>
  <div class='app-cart'>
    <h3>购物车</h3>
    <!--商品列表-->
    <!--卡片-->
    <div class="mui-card">
			<div class="mui-card-header">
        商品列表
      </div>
			<div class="mui-card-content">
			  <div class="mui-card-content-inner">
          <ul class="mui-table-view">
            <li v-for='item in list' :key='item.iid' class="mui-table-view-cell mui-media">
              <a href="javascript:;">
                <img class="mui-media-object mui-pull-left" :src="item.img_url">
                <div class="mui-media-body">
                  {{item.lname}}
                  <p class='mui-ellipsis'>
                    <span class="price">{{item.price}}</span>
                    <span class="count">
                      <div class="mui-numbox">
                        <button @click='cartSub' :data-iid='item.iid' class="mui-btn mui-btn-numbox-minus" type="button">-</button>
                        <input class="mui-input-numbox" type="number"  :value='item.count'/>
                        <button class="mui-btn mui-btn-numbox-plus" type="button" @click='cartAdd' :data-iid='item.iid'>+</button>
                      </div>
                    </span>
                  </p>
                </div>
              </a>
            </li>
          </ul>
				</div> 	
			</div>
      <div class="mui-card-footer">
        合计：￥{{getSubTotal}}
      </div>
		</div> 
  </div>
</template>
<script>
import  {Toast}  from 'mint-ui'
  export default {
    data(){
      return {
        list:[]
      }
    },
    created() {
      this.getMore();
    },
    methods:{
      getMore(){
        var url = 'http://127.0.0.1:3000/getCarts';
        this.axios.get(url).then(result=>{
          console.log(result);
          if(result.data.code == 1){
            this.list = result.data.data;
          }else{
            Toast('你还未登录,请登录查看购物车,3s后自动跳转登录页面');
            this.changeData();
          }
          
        })
      },/**/
      cartSub(e){
        var iid =  e.target.dataset.iid;
        console.log('-'+iid);
        //修改当前购物车项数量
        //1:创建循环list
        for(var item of this.list){
         //2:判断当前元素iid是否是iid
          if(item.iid == iid && item.count > 1){
            //3:当前数据减1
            item.count--;
            this.updateCart(iid,item.count);
            //4:跳出循环
            break;
          }
        }/**/
        //5:更新数据库值减
      },
      cartAdd(e){
        var iid = e.target.dataset.iid;
        console.log('+'+iid);
        for(var item of this.list){
          if(item.iid == iid && item.count < 999){
            item.count++;
            this.updateCart(iid,item.count);
            break;
          }
        }/**/
      },
      updateCart(iid,count){
        var url = 'http://127.0.0.1:3000/updateCart?iid='+iid+'&count='+count;
        this.axios.get(url).then(result=>{
          if(result.data.code == 1){
            Toast(result.data.msg);
          }else{
            Toast(result.data.msg);
          }
        })
      }
    },
    computed:{
      getSubTotal:function(){
        //计算购物车内所有物品价格 累加和
        var sum = 0;
        for(var item of this.list){
          sum += item.price * item.count;
        }
        return sum;
      }
    }
  }
</script>
<style>
  div ul li a{
    line-height:40px;
  }
  div ul li a img{
    margin-top:0.9rem;
  }
</style>