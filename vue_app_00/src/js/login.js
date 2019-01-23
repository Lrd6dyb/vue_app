export default{
} = function(Vue,options){
  Vue.prototype.changeData = function(){
    //alert('执行成功');
    //console.log(this);
    var that = this;
    //console.log(that);
    var t=null;
    console.log(t);
    t=setTimeout(function(){that.$router.push("/Login");},3000);
    //console.log(t);
    console.log('跳转成功');
  };
};