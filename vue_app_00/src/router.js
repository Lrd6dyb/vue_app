import Vue from 'vue'
import Router from 'vue-router'
import HelloContainer from "./components/HelloWorld.vue"
//1:引入自定义组件
import Home from "./components/tabbar/Home.vue"
import NewsList from './components/news/NewsList.vue'
import NewsInfo from './components/news/NewsInfo.vue'
import GoodsList from './components/good/GoodsList.vue'
import GoodsInfo from './components/good/GoodsInfo.vue'
import Login from './components/login/Login.vue'
import Cart from './components/tabbar/Cart.vue'
import Search from './components/tabbar/Search.vue'
import My from './components/tabbar/My.vue'
import Register from './components/tabbar/Register.vue'
Vue.use(Router)
export default new Router({
  //2:为组件配置访问路径
  routes: [
    {path:'/',component:Home},
    
    {path:"/NewsList",component:NewsList},
    {path:"/NewsInfo",component:NewsInfo},
    {path:"/GoodsList",component:GoodsList},
    {path:"/GoodsInfo/:id",component:GoodsInfo},
    {path:"/Login",component:Login},
    {path:"/Cart",component:Cart},
    {path:"/Search",component:Search},
    {path:"/My",component:My},
    {path:"/Register",component:Register}
  ]
})
