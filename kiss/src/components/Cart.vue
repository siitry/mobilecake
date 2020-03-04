<template>
    <div>
        <header>
            <div @click="back" class="l">
                <i class="fa fa-angle-left"></i>
            </div>
            <div class="c">购物车</div>
            <div class="r">
                <i class="fa fa-trash-o" @click="clear"></i>
            </div>
        </header>
        <div class="content">
            <ul class="cart">
                <li v-for="(item,i) of list" :key=i :data-item="item">
                    <img :src=item.cpic>
                    <p>
                        {{item.cname}}
                        <br>
                        规格：{{item.csize}}
                        <br>
                        ￥{{item.cprice}}.00
                    </p>
                    <i class="fa fa-check-square-o cur" 
                    :data-id="item.id" 
                    :data-cname="item.cname"
                    :data-csize="item.csize"
                    :data-cprice="item.cprice" 
                    :data-cpic="item.cpic"
                    :data-count="item.count"  
                    @click="iscur"></i>
                    <div class="quantity">
                        <span @click="subcart(item)">-</span>
                        <span class="num">{{item.count}}</span>
                        <span @click="addcart(item)">+</span>
                    </div>
                </li>
            </ul>
            <div class="null" v-show="list.length<1">
                <p>
                    <i class="fa fa-shopping-basket"></i>
                </p>
                <p>您的购物车空空如也</p>
                <p><router-link to="list/0">去购物 >></router-link></p>
            </div>
            <div class="hanlde">
                <i class="fa fa-check-square-o cur" @click="allcheck"></i>
                商品总价：{{total}}
                <span @click="accounts">去结算</span>
            </div>
        </div>    
    </div>
</template>

<script>
export default {
    data(){
        return {
            list:[],
            total:0,
            curc:false,
        }
    },
    methods:{
        back(){
            window.history.back();
        },
        clear(){
            var all= $(".cart .fa.fa-check-square-o.cur");
            if(all.length<1){
                this.$toast({message:"请选择您要清空的商品",duration:1000});
                return;
            }
            var arr=[];
            for (const elem of all) {
                arr.push(parseInt(elem.dataset.id))
            }
            var url="clear";
            var obj={arr}
            this.axios.get(url,{params:obj}).then(res=>{
                this.cart();
            });
            
        },
        isall(){
            var lis=$(".cart>li>i");
            var i=true;
            for (const li of lis) {
                if(li.getAttribute("class")!=='fa fa-check-square-o cur'){
                    
                    i=false;
                }
            }
            if(i){
                $(".hanlde>i").addClass("cur")
            }else{
                $(".hanlde>i").removeClass("cur")
            }
        },
        allcheck(){
            $(".hanlde>i").toggleClass("cur")
            if($(".hanlde>i").hasClass("cur")){
                $(".cart>li>i").addClass("cur");
            }else{
                $(".cart>li>i").removeClass("cur");
            }
            this.test();
        },
        iscur(e){
            if(e.target.getAttribute("class")=='fa fa-check-square-o cur'){
　　　　        e.target.classList.remove("cur");
            }else{
                e.target.classList.add("cur")
            }
            this.isall();
            this.test();
        },
        cart(){
            var url="cart"
            this.axios.get(url).then(res=>{
                if(res.data.code==-1){
                    this.$toast("未登录");
                }else{
                    this.list=res.data.data;
                    this.$store.state.cartCount=this.list.length;
                    this.totals();
                    if(this.list.length<1){
                        $(".hanlde>i").removeClass("cur")
                    }
                }
            })
        },
        addcart(item){
            var event = window.event||arguments[0];
            var target = event.srcElement||event.target;
            $(target).parent().prev().addClass("cur")
            var id=item.id;
            var cname=item.cname;
            var csize=item.csize; 
            var cprice=item.cprice; 
            var cpic=item.cpic;
            var url="addcart";
            var obj={id,cname,csize,cprice,cpic};
            this.axios.get(url,{params:obj}).then(res=>{
                this.$toast({message:"+1",duration:500});
                this.cart();
            });
            
        },
        subcart(item){
            if(item.count==1){
                this.$toast({message:"减不了啦！",duration:500});
                return;
            }
            var event = window.event||arguments[0];
            var target = event.srcElement||event.target;
            $(target).parent().prev().addClass("cur")
            var id=item.id;
            var url="subcart";
            var obj={id};
            this.axios.get(url,{params:obj}).then(res=>{
                this.$toast({message:"-1",duration:1000});
                this.cart();
            })
        },
        // 总价
        totals(){
            this.total=0;
            for (const elem of this.list) {
                this.total+=elem.cprice*elem.count;
            };
        },
        test(){
            var i= $(".cart .fa.fa-check-square-o.cur");
            this.total=0;
            for (const elem of i) {
                this.total+=elem.dataset.cprice*elem.dataset.count
            }
        },
        // 结算功能
        accounts(){
            var all= $(".cart .fa.fa-check-square-o.cur")
            // 如果未选中弹出提示
            if(all.length<1){
                this.$toast({message:"请选择您要结算的商品",duration:1000});
                return;
            }
            var arr=[];
            for (const elem of all) {
                arr.push(elem.dataset); 
            }
            var url="accounts";
            var obj={arr};
            this.axios.get(url,{params:obj}).then(
                this.$toast({message:"购买成功",duration:1000}),this.clear()
            )
        },
    },
    created(){
        this.cart();
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
        box-shadow: 0 -2px 10px #ccc;
        position: fixed;
        top: 0;left: 0;right: 0;
        background: #fff;
        z-index: 10;
        display: flex;
        color: #8f5451;
    }
    header .l{
        padding: 10px;
        max-width: 25%;
        color: #8f5451;
        font-size: 28px;
        margin-top: -10px;
    }
    header .c{
        width: 65%;
        left:17.5%;
        font-size: 14px;
        text-align: center;
    }
    header .r{
        padding-right: 10px;
        font-size: 22px;
    }
    .content{
        padding:50px 0 60px;
    }
    .hanlde{
        position: fixed;
        bottom: 0;left: 0;right: 0;
        height: 53px;
        line-height: 53px;
        background: #e5e6e8;
        text-indent: 7px;
        color: #9a5b57;
        z-index: 20;
    }
    .hanlde .fa{
        color: #8c8989;
        font-size: 22px;
        vertical-align: middle;
        margin-right: 20px;
    }
    .hanlde>span{
        padding: 0 20px;
        background: #492321;
        color: #fff;
        text-indent: 0;
        font-size: 14px;
        letter-spacing: 2px;
        float: right;
    }
    .cur{
        color: #8f5451 !important;
    }
    .cart{
        padding-bottom: 70px;
    }
    .cart li{
        position: relative;
        padding: 10px;
        box-shadow: 0 2px 10px  #ccc;
    }
    .cart li>img{
        float: left;
        width: 100px;
        height: 100px;
        margin-right: 10px;
    }
    .cart li>p{
        line-height: 33.3px;
        color: #9a5b57;
    }
    .cart li .fa-check-square-o{
        color:#ccc;
        font-size: 20px;
        position: absolute;
        right: 15px;
        top:33px;
    }
    .cart li .quantity{
        position: absolute;
        right: 10px;
        bottom: 13px;
        line-height: 30px;
    }
    .cart li .quantity>span{
        height: 30px;width: 30px;
        text-align: center;
        margin: 0 2px;
        background: #9a5b57;
        color: #fff;
        border: 1px solid #9a5b57;
        display: inline-block;
        vertical-align: middle;
        border-radius: 3px;
    }
    .cart li .quantity>span.num{
        width: 45px;
        background: #fff;
        color: #9a5b57;
    }
    .null{
        color: #9a5b57;
        text-align: center;
    }
    .null >p{
        padding: 10px 0;
    }
    .null .fa-shopping-basket{
        font-size: 50px;
        margin: 30px 0;
    }
    .null a{
        color: #9a5b57;
    }
</style>