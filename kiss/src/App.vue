<template>
  <div id="app">
    <router-view></router-view>
    <tabbar></tabbar>
  </div>
</template>

<script>
import tabbar from "./views/tabbar";
export default {
  components:{
    "tabbar":tabbar
  },
  methods:{
    // 购物车数量
    cartCount(){
      var url="cartcount";
      this.axios.get(url).then(res=>{
        if(res.data.code==-1){
          this.$store.state.cartCount=0;
        }else{
        this.$store.state.cartCount=res.data.data.length;          
        }
      })
    },
    state(){
      var url="state";
      this.axios.get(url).then(res=>{
        if(res.data.code==-1){  
          this.$store.state.show=false;
        }else{
           this.$store.state.show=true;
           this.$store.state.np=res.data.data[0];
        }
      })
    },
  },
  created(){
      this.state();
      this.cartCount();
  }
}
</script>

<style>

</style>
