<template>
    <div>
        <header>
                <div class="l">
                <a href="javascript:history.back(-1)">
                    <i class="fa fa-angle-left"></i>
                </a>
                </div>
                <div class="c">我的订单</div>
                <div class="r">
                    <router-link to="/cart">
                        <i class="fa fa-shopping-cart"></i>
                        <span>{{this.$store.state.cartCount}}</span>
                    </router-link>
                </div>
        </header>
        <div class="content">
            <ul>
                <li class="orderform" v-for="(item,i) of list" :key="i">
                    <p><span>kiss米兰蛋糕小店 >></span><span>交易成功</span></p>
                    <div class="info">
                        <div class="pic">
                            <img :src="item.cpic">
                        </div>
                        <div class="detail">
                            <p>{{item.cname}}</p>
                            <p>规格：{{item.csize}}</p>
                            <p><span>数量：×{{item.count}}</span><span>总价：￥：{{item.count*item.cprice}}</span></p>
                            <h4><span @click="look(item.id)">查看商品</span><span @click="delOrder(item.ordernum)">删除订单</span></h4>
                        </div>
                    </div>
                </li>
            </ul>
            <p class="null">暂无订单</p>
        </div>
    </div>
</template>

<script>
export default {
    data(){
      return {
          list:[],
      }  
    },
    methods:{
        orderform(){
            var url="orderform";
            this.axios.get(url).then(res=>{
              this.list=res.data.data;
            //   console.log(this.list);
            })
        },

        delOrder(ordernum){
            var url="suborderform"
            var obj={ordernum};
            this.axios.get(url,{params:obj}).then(res=>{
                if(res.data.code==1){
                    this.orderform();
                    this.$toast({message:"删除成功",duration:500});
                }
            })
        },
        look(id){
            this.$router.push(`/details/${id}`);
        },
    },
    created(){
        this.orderform();
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
        margin: 60px 0;
    }
    .orderform{
        color: #a36663;
        box-shadow: 0 2px 10px  #ccc;
        padding: 10px 0 10px;
        margin-bottom: 10px;
        border: 0px;
        border-radius: 10px;
    }
    ul{
        list-style-type: none;
        margin:0 5px 0 5px;
    }
    .orderform>p{
        width: 90%;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #ccc;
        margin-bottom: 3px;
    }
    .orderform>.info{
        display: flex;
        
    }
    .info>.pic{
        width: 30%;
    }
    .info>.pic>img{
        width: 100%;
    }
    .info>.detail{
        width: 50%;
        margin-left: 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .info>.detail>p+p+p{
        display: flex;
        justify-content: space-between;
    }
    .info>.detail>h4{
        display: flex;
        justify-content: space-around;
    }
    .info>.detail>h4>span{
        border: 1px solid #b58c78;
        border-radius: 5px;
        padding: 2px;
    }
    .null{
        padding-top: 20px;
        color: #9a5b57;
        text-align: center;
    }
</style>