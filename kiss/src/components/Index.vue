<template>
    <div>
      <header>
        <div class="l">
          <i class="fa fa-map-marker" aria-hidden="true"></i>
          <span>成都</span>
        </div>
        <div class="c tc pa">
            <img src="../img/title.png" alt="">
        </div>
        <div class="r pa">
          <router-link to="/cart" class="cart">
            <i class="fa fa-shopping-cart"></i>
            <span class="pa">{{this.$store.state.cartCount}}</span>
          </router-link>
        </div>
      </header>
        <div class="content">
          <div class="swipe-wrap pa">
            <mt-swipe :auto="3000">
                <mt-swipe-item class="img1">
                </mt-swipe-item>
                <mt-swipe-item class="img2">
                </mt-swipe-item>
                <mt-swipe-item class="img3">
                </mt-swipe-item>
                <mt-swipe-item class="img4">
                </mt-swipe-item>
            </mt-swipe>
          </div>
          <div class="home-main pa">
            <div class="category">
              <router-link to="/list/9">
                <img src="../img/kt.jpg" alt="">
              </router-link>
              <router-link to="/list/8">
                <img src="../img/lh.jpg" alt="">
              </router-link>
              <router-link to="/list/1">
                <img src="../img/musi.jpg" alt="">
              </router-link>
              <router-link to="/list/2">
                <img src="../img/rz.jpg" alt="">
              </router-link>
              <router-link to="/list/3">
                <img src="../img/zs.jpg" alt="">
              </router-link>
              <router-link to="/list/4">
                <img src="../img/qkl.jpg" alt="">
              </router-link>
            </div>
            <myfooter></myfooter>
          </div>
        </div>
    </div>
</template>

<script>
import Myfooter from "./Myfooter";
export default {
  components:{
    "myfooter":Myfooter,
  },
    data(){
      return {}
    },methods:{
      
    }
}
</script>

<style scoped>
  header{
    height: 50px;
    line-height: 50px;
    justify-content: space-between;
    box-shadow:0 -2px 10px #ccc;
    position: fixed;
    top: 0;left: 0;right: 0;
    background: #fff;
    z-index: 10;
  }
  .l{
    padding-left: 10px;
    max-width: 25%;
    color: #8f5451;
  }
  .fa-map-marker{
    font-size: 22px;
    vertical-align: middle;
    margin-top: -3px;
  }
  header .l>span{
    padding-left: 3px;
  }
  header .c{
    width: 65%;
    left: 17.5%;
    font-size: 14px;
    color: #a36663;
    top: 0;
  }
  .tc{
    text-align: center;
  }
  .pa{
    position: absolute;
  }
  header .c img{
    max-height: 25px;
    vertical-align: middle;
  }
  header .r{
    padding-right: 10px;
    color: #8f5451;
    top: 0;right: 0;
  }
  .cart{
    color: #8f5451;
  }
  .fa-shopping-cart{
    font-size: 22px;
    vertical-align: middle;
    margin-top: -3px;
  }
  header .r .cart>span{
    top: 5px;
    right: 2px;
    border: 1px solid #fff;
    background: #8f5451;
    color: #fff;
    height: 17px;
    line-height: 18px;
    padding: 0 5px;
    border-radius: 50%;
    transform: scale(.8);
  }
  .content{
    padding: 50px 0 60px;
  }
  .img1{
    background-image: url(../img/1.jpg);
    background-size: cover !important;
    background-repeat: no-repeat;
  }
  .img2{
    background-image: url(../img/2.jpg);
    background-size: cover !important;
    background-repeat: no-repeat;
  }
  .img3{
    background-image: url(../img/3.jpg);
    background-size: cover !important;
    background-repeat: no-repeat;
  }
  .img4{
    background-image: url(../img/4.jpg);
    background-size: cover !important;
    background-repeat: no-repeat;
  }
  .swipe-wrap{
    top: 50px;bottom: 50px;
    left: 0;right: 0;
  }
  .home-main{
    width: 100%;
    top:calc(100% - 50px);
    padding-bottom: 60px;
  }
  .category>a{
    display:block;
  }
  .category>a>img{
    width: 100%;
    margin-top: 10px;
    vertical-align: middle;
  }
</style>
