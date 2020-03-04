<template>
    <div>
            <header v-show="$store.getters.show">
                <div class="l">
                <a href="javascript:history.back(-1)">
                    <i class="fa fa-angle-left"></i>
                </a>
                </div>
                <div class="c">会员中心</div>
                <div class="r">
                    <router-link to="/cart">
                        <i class="fa fa-shopping-cart"></i>
                        <span>{{this.$store.state.cartCount}}</span>
                    </router-link>
                </div>
            </header>
            <h2 v-show="!$store.getters.show">请先登录!</h2>
            <div v-if="$store.getters.show" class="content">
                <div class="meber">
                    <div class="meber-top">
                        <div class="head">
                            <img style="width:100%;" src="../img/login.jpeg">
                        </div>
                        <div class="info">
                            <p>
                                <span class="icon-top fa fa-user-circle"></span>
                                <span>昵称：{{this.$store.state.np.uname}}</span>
                            </p>
                            <p>
                                <span style="font-size:20px" class="icon-top1 fa fa-mobile"></span>
                                <span>{{this.$store.state.np.phone}}</span>
                            </p>
                            <p>
                                <span class="icon-top3 fa fa-cny"></span>
                                <span>余额：999.00</span>
                            </p>
                            <p>
                                <span class="icon-top3 fa fa-street-view"></span>
                                <span>付费等级：暂无</span>
                            </p>
                        </div>
                    </div>
                    <div class="meber-con">
                        <span>
                            <i class="fa fa-money"></i>
                            <span>待付款</span>
                        </span>
                        <span>
                            <i class="fa fa-truck"></i>
                            <span>待收货</span>
                        </span>
                        <span>
                            <i class="fa fa-check-square-o"></i>
                            <span>已完成</span>
                        </span>
                        <span>
                            <i class="fa fa-volume-control-phone"></i>
                            <span>客服</span>
                        </span>
                        <span @click="order">
                            <i class="fa fa-clipboard"></i>
                            <span>我的订单</span>
                        </span>
                        <span>
                            <i class="fa fa-map-pin"></i>
                            <span>收货地址</span>
                        </span>
                        <span>
                            <p style="padding-bottom:10px;">999</p>
                            <span>积分</span>
                        </span>
                        <span>
                            <p style="padding-bottom:10px;">0</p>
                            <span>我的礼券</span>
                        </span>
                        <span>
                            <i class="fa fa-gift"></i>
                            <span>礼券领取</span>
                        </span>
                        <span @click="logout">
                            <i class="fa fa-sign-out"></i>
                            <span>退出登录</span>
                        </span>
                    </div>
                </div>
            </div>
            <div v-else class="login">
                <div v-if="isture">
                    <mt-field label="账号" v-model="uname" placeholder="请输入用户名"></mt-field>
                    <mt-field label="密码" v-model="upwd" placeholder="请输入密码" type="password"></mt-field>
                    <mt-button @click="login">登录</mt-button>
                    <span class="reg" @click="back">还未注册，点击注册</span>
                </div>
                <div class="login2" v-else>
                    <mt-field label="用户名" v-model="uname" placeholder="6~12位字母加数字"></mt-field>
                    <mt-field label="密码" v-model="upwd" placeholder="6~12位字母加数字"></mt-field>
                    <mt-field label="邮箱" v-model="email" placeholder="请输入邮箱"></mt-field>
                    <mt-field label="手机号" v-model="phone" placeholder="请输入手机号"></mt-field>
                    <mt-button @click="reg">注册</mt-button>
                    <span class="reg" @click="back">返回登陆页面</span>
                </div>
            </div>
    </div>
</template>

<script>
import Myfooter from "./Myfooter";
export default {
    components:{
        "myfooter":Myfooter
    },
    data(){
        return {
            show:false,
            uname:"",
            upwd:"",
            isture:true,
            email:"",
            phone:"",
        }
    },
    methods:{
        // 登录功能
        login(){
            var u=this.uname;
            var p=this.upwd;
            // 发送ajax请求
            var url = "login";
            var obj={uname:u,upwd:p};
            this.axios.get(url,{params:obj})
            .then(res=>{
                if(res.data.code==-1){
                    this.$toast({message:"密码或用户名错误",iconClass:"fa fa-times",duration:1000})
                }else{
                    this.$toast({message:"登陆成功",iconClass:"iconfont icon-duigou",duration:1000})
                    this.$store.commit("show");
                    // 获取用户名和电话
                    this.$store.state.np=res.data.data;
                    this.cartCount();
                }
            })
        },
        // 退出登录功能
        logout(){
            var url="logout";
            this.axios.get(url).then(res=>{
                if(res.data.code==1){
                    this.$toast({message:"已退出登录,返回登陆页面",position:"bottom",duration:1000});
                    this.$store.state.show=false;
                }
            })
        },
        // 注册功能
        reg(){
            // 获取用户名密码邮箱手机号
            var uname=this.uname;
            var upwd=this.upwd;
            var email=this.email;
            var phone=this.phone;
            // 密码和账号为6-12位字母加数字
            var reg=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/;
            // 验证用户名不正确提示错误信息
            if(!reg.test(uname)){
                this.$toast({message:"用户名格式不正确",duration:1000});
                return;
            }
            // 验证密码不正确提示错误信息
            if(!reg.test(upwd)){
                this.$toast({message:"密码格式不正确",duration:1000});
                return;
            }
            // 验证邮箱
            var reg2=/^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/
            if(!reg2.test(email)){
                this.$toast({message:"邮箱格式不正确",duration:1000});
                return;
            }            
            // 验证电话号码
            var reg3=/^1[3456789]\d{9}$/;
            if(!reg3.test(phone)){
                this.$toast({message:"手机号格式不正确",duration:1000});
                return;
            }
            // 发送Ajax请求
            var url = "reg";
            var obj={uname,upwd,email,phone};
            this.axios.get(url,{params:obj})
            .then(res=>{
                if(res.data.code==-1){
                    this.$toast({message:"该用户名已注册",duration:1000})
                }else{
                    this.$toast({message:"注册成功，返回登录页面",iconClass:"iconfont icon-duigou",duration:1000});
                    this.back();
                }
            })
        },
        // 登录注册之间切换
        back(){
            this.isture=this.isture==true?false:true;
        },
        // 购物车数量
        cartCount(){
            var url="cartcount";
            this.axios.get(url).then(res=>{
                this.$store.state.cartCount=res.data.data.length;
            })
        },
        // 跳转订单功能
        order(){
            this.$router.push("/orderform");
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
        width: 100%;
        padding: 50px 0 60px;
        color: #8f5451;
    }
    .meber{
        margin: 3%;
    }
    .meber-top{
        width: 100%;
        height: 100px;
    }
    .head{
        width:  100px;
        height: 100px;
        border-radius: 50%;
        overflow: hidden;
        margin-right: 20px;
        float: left;
    }
    .info{margin-top:10px;float: left;line-height: 30px;}
    .info>p{
        margin-left:15px;
    }
    p span:first-child{
        font-size: 14px;
        margin-right: 10px;
    }
    .meber-con{
        margin-top: 40px;
        margin-bottom: 20px;
    }
    .meber-con>span{
        width:20%;
        display: inline-block;
        text-align: center;
        margin-bottom: 20px;
    }
    .meber-con>span>span{
        display: block;
    }
    .meber-con>span>i{
        font-size: 26px;
    }
    .login{
        margin-top: 200px;
        text-align: center;
        position: relative;
        transition:all 2s; 
    }
    .mint-field{
        margin: 25px;
        border-top: 1px solid #000;
        border-bottom: 1px solid #000;
    }
    .mint-button{
        width: 50%;
        margin-bottom:30px;
        background: #8f5451;
        color: #fff;
    }
    .reg{
        color: #8f5451;
        position: absolute;
        right: 15px;bottom: 0;
        border: 1px solid #ccc;
        border-radius: 5px;
    }
    h2{
        background: #ccc;
        color: #8f5451;
        margin-top: 20px;padding-left: 20px; 
        font-family: KaiTi;
    }
    .login2{
        margin-top: -100px;
    }
</style>