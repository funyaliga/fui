<template>
    <div class="page-hd">
        <span class="page-back"  @click="back">&lt;</span>
        <h1 class="page-title"><slot></slot></h1>
    </div>
</template>

<script>
export default {
    name: 'fui-page-hd',
    props: {},
    methods: {
        back: function  () {
            this.$route.router.go(window.history.back())
        }
    }
}
</script>

<style lang="scss">
@import 'src/assets/sass/core/fn';

.page-hd{
    height: 60px;
    background: #fafafa;
    box-shadow: 0 1px 1px rgba(#000, .1);
}
.page-back{
    position: absolute;
    top: 10px;
    left: 10px;
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
}
.page-title{
    text-align: center;
    font-size: 20px;
    line-height: 60px;
}
</style>
