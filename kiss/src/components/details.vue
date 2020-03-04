<template>
    <div>
            <header>
                <div class="l">
                <a href="javascript:history.back(-1)">
                    <i class="fa fa-angle-left"></i>
                </a>
                </div>
                <div class="c">{{data.cname}}</div>
                <div class="r">
                    <router-link to="/cart">
                        <i class="fa fa-shopping-cart"></i>
                        <span>{{this.$store.state.cartCount}}</span>
                    </router-link>
                </div>
            </header>
            <div class="detail">
                <div class="cpic">
                    <img :src=data.cpic>
                </div>
                <div class="info">
                    <h1 class="cname"><i>{{data.cname}}</i></h1>
                    <p class="ctitle">{{data.ctitle}}</p>
                    <p class="csize">数量：1 规格：{{data.csize}}</p>
                    <div class="proinfo">
                        <img src="../img/detail1.jpg">
                        <img src="../img/detail2.jpg">
                    </div>
                    <div style="margin-bottom:100px"><myfooter></myfooter></div>
                </div>
            </div>
            <div class="shop">
                <span @click="cart">加入购物车</span>
                <span @click="buy">立即购买</span>
            </div>
        </div>
</template>

<script>
import Myfooter from "./Myfooter";
export default {
    props:["id"],
    components:{
        "myfooter":Myfooter
    },
    data() {
        return {
            data:[],
        }
    },
    methods:{
        detail(){
            var url="details";
            var id=this.id;
            var obj={id};
            this.axios.get(url,{params:obj}).then(res=>{
                this.data=res.data.data;
            })
        },
        // 加入购物车
        cart(){
            // 获取当前商品数据
            var id=this.data.id;        
            var cname=this.data.cname;   
            var csize=this.data.csize;   
            var cprice=this.data.cprice; 
            var cpic=this.data.cpic;     
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
        buy(){
            // 获取当前商品数据
            var id=this.data.id;         
            var cname=this.data.cname;  
            var csize=this.data.csize;   
            var cprice=this.data.cprice; 
            var cpic=this.data.cpic;     
            var count=1; 
            var url="buy";
            var obj={id,cname,csize,cprice,cpic,count};
            this.axios.get(url,{params:obj}).then(res=>{
                if(res.data.code==-1){
                    this.$toast({message:"请先登录",duration:1000});
                }else{
                    this.$toast({message:"购买成功",iconClass:"iconfont icon-duigou",duration:1000});
                    this.cartCount();
                }
            })
        },
        // 购物车数量
        cartCount(){
            var url="cartcount";
            this.axios.get(url).then(res=>{
                this.$store.state.cartCount=res.data.data.length;
            })
        },
        more(){
            window.scrollTo(0, 0);//回到顶部
        },
    },
     created() {
         this.detail();
         this.more();

    },
    mounted(){
        
    },
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
    .detail{margin-top: 50px;}
    .cpic>img{
        width: 100%;
    }
    .info{
        color: #522725;
        margin-left: 10px;
        margin-top: 10px;
    }
    .cname{
        font-size: 14px;
    }
    .csize{
        margin-top: 10px;
    }
    .proinfo{
        margin-top: 20px;
        width: 100%;
    }
    .proinfo img{
        width: 100%;
    }
    .shop{
        z-index: 20;
        position: fixed;
        height: 40px;
        left: 0;bottom: 0;right: 0;
        padding: 10px 0;
        background: #e1e1e1;
        text-align: center;
    }
    .shop>span{
        height: 40px;
        line-height: 40px;
        background: #4a2321;
        color: #fff;
        width: 45%;
        margin: 0 1%;
        font-size: 14px;
        text-align:center;
        display:inline-block;
    }
    span:last-child{
        background: #7b4342;
    }
</style>