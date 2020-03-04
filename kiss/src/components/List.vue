<template>
    <div>
        <header>
            <div class="l">
               <a href="javascript:history.back(-1)">
                   <i data-v-0283b7bb="" class="fa fa-angle-left"></i>
               </a>
            </div>
            <div class="c">蛋糕名录</div>
            <div class="r">
                <router-link to="/cart">
                    <i data-v-0283b7bb="" class="fa fa-shopping-cart"></i>
                    <span>{{this.$store.state.cartCount}}</span>
                </router-link>
            </div>
        </header>
        <div class="content">
            <div class="category">
                <router-link @click.native="goods(0)" to="/list/0">全部</router-link>
                <router-link @click.native="goods(9)" to="/list/9">卡通系列</router-link>
                <router-link @click.native="goods(8)" to="/list/8">礼盒系列</router-link>
                <router-link @click.native="goods(1)" to="/list/1">慕斯蛋糕</router-link>
                <router-link @click.native="goods(2)" to="/list/2">乳脂奶油蛋糕</router-link>
                <router-link @click.native="goods(3)" to="/list/3">芝士蛋糕</router-link>
                <router-link @click.native="goods(4)" to="/list/4">巧克力蛋糕</router-link>
            </div>
            <ul class="list">
                <li v-for="(item,i) of list" :key="i">
                    <a @click="toDetail(item.id)">
                        <img :src=item.cpic>
                        <p class="name">{{item.cname}}</p>
                    </a>
                    <p class="price">
                        <span>
                            <p>￥{{item.cprice}}.00</p>
                            <p>{{item.csize}}</p>
                        </span>
                        <i @click="addcart(item)" class="fa fa-cart-plus"></i>
                    </p>
                </li>
            </ul>
            <myfooter></myfooter>
        </div>
        
    </div>
</template>

<script>
import Myfooter from "./Myfooter";
export default {
    components:{
    "myfooter":Myfooter,
  },
    //  接收路由传参过来的clsid   
  props:["clsid"],
    data(){
        return{
            list:[],
        }
    },
    created(){
        this.goods(0);
    },
    mounted(){ 
    },
    methods:{
        addcart(item){
            var id=item.id;         
            var cname=item.cname; 
            var csize=item.csize;  
            var cprice=item.cprice;
            var cpic=item.cpic;    
            var url="addcart";
            var obj={id,cname,csize,cprice,cpic};
            this.axios.get(url,{params:obj}).then(res=>{
                if(res.data.code==-1){
                    this.$toast({message:"请先登录",duration:1000});
                }else{
                    this.$toast({message:"添加成功",iconClass:"iconfont icon-duigou",duration:1000});
                    this.cartCount();
                }
            })
            
        },
        toDetail(id) {
            this.$router.push(`/details/${id}`)
        },
        goods(clsid){
            var url="goods";
            var obj={clsid}
            this.axios.get(url,{params:obj}).then(res=>{
                this.list=res.data.data;
            })
        },
        cartCount(){
            var url="cartcount";
            this.axios.get(url).then(res=>{
                this.$store.state.cartCount=res.data.data.length;
            })
        },
    }
}
</script>

<style scoped>
    header{
        height: 50px;
        line-height: 50px;
        justify-content: space-between;
        display: flex;
        position: fixed;
        left: 0;top: 0;right: 0;
        background: #fff;
        z-index: 10;
        box-shadow: 0 -2px 10px #ccc;
    }
    header>.l{
        padding-left: 10px;
        max-width: 25%;
        font-size: 28px;
    }
    header a{color: #8f5451;}
    header .c{
        width: 65%;
        font-size: 14px;
        color: #a36663;
        text-align: center;
    }
    header .r{
        padding-right: 10px;
    }
    header .r .fa{
        font-size: 22px;
        vertical-align: middle;
        margin-top: -3px;
    }
    .r i{font-size: 22px;}
    .r span{
        position: absolute;
        top:5px;
        right: 2px;
        border: 1px solid #fff;
        background: #8f5451;
        color: #fff;
        height: 17px;
        line-height: 18px;
        padding: 0 5px;
        border-radius: 50%;
        transform: scale(.8)
    }
    .content{
        padding: 50px 0 60px;
    }
    .category{
        width: 100%;
        position:fixed;
        top: 50px;left: 0;
        overflow: hidden;
        overflow-x:scroll;
        height: 35px;
        line-height: 35px;
        border-bottom: 1px solid #492321;
        white-space: nowrap;
        background: #fff;
    }
    .category>a{
        padding: 0 15px;
        display: inline-block;
        color:#492321;
    }
    .category .router-link-active{
        position: relative;
    }
    .category .router-link-active:after{
        content: "";
        position:absolute;
        height: 3px;
        width: 100%;
        background: #492321;
        left:0;
        bottom:0;
    }
    .list{
        margin-top: 40px;
        margin-left: 2px;
    }
    .list>li{
        width: 50%;
        margin-bottom: 10px;
        display: inline-block;
    }
    .list>li>a{
        display: block;
    }
    .list>li img{
        width: 99%;
        vertical-align: middle;
        margin-bottom: 10px;
    }
    .list>li .name{
        padding: 0 10px;
        color:#492321;
        line-height: 20px;
        height: 20px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .price{
        color: #bba080;
        padding: 5px 10px;
        line-height: 25px;
    }
    .list>li .price>span{
        line-height: 20px;
        width: 85%;
        display: inline-block;
    }
    .list>li .price>i{
        font-size: 20px;
        color:#492321;
    }
</style>