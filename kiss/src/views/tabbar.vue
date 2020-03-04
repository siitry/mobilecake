<template>
    <div>
        <nav>
            <router-link to="/">
                <div>
                    <i class="fa fa-home"></i>
                    <p>首页</p>
                </div>
            </router-link>
            <router-link  to="/list/0">
                <div>
                    <i class="fa fa-th-large"></i>
                    <p>蛋糕目录</p>
                </div>
            </router-link>
            <router-link  to="/orderform">
                <div>
                    <i class="fa fa-file-text"></i>
                    <p>订单</p>
                </div>
            </router-link>
            <router-link  to="/login">
                <div>
                    <i class="fa fa-user"></i>
                    <p>会员中心</p>
                </div>
            </router-link>
        </nav>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
    nav{
        background: #fff;
        position: fixed;
        bottom: 0;
        right: 0;
        left: 0;
        justify-content: space-between;
        padding: 7px 0;
        box-shadow: 0 2px 10px #ccc;
        z-index: 10;
        display: flex;
    }
    nav>a{
        text-align: center;
        width: 25%;
        color: #b58c78;
        display: flex;
        justify-content: center;
        
    }
    nav>a i{
        font-size: 20px;
    }
    nav>a p{
        margin-top: 3px;
    }
</style>