<template>
    <div class="page-infinite">
        <h1 class="page-title">Infinite Scroll</h1>
            <p class="page-infinite-desc">当即将滚动至列表底部时, 自动加载更多数据</p>
            <div class="page-infinite-wrapper" v-el:wrapper :style="{ height: wrapperHeight + 'px' }">
            <ul class="page-infinite-list" v-infinite-scroll="loadMore()" infinite-scroll-disabled="loading" infinite-scroll-distance="50">
                <li v-for="item in list" class="page-infinite-listitem">{{ item }}</li>
            </ul>
            <p v-show="loading" class="page-infinite-loading">
            加载中...
            </p>
        </div>
    </div>
</template>

<style>

</style>

<script type="text/babel">
import infiniteScroll from '../fn/infinite-scroll';
// infiniteScroll.name = 'infinite-scroll';
  export default {
    data() {
      return {
        list: [],
        loading: false,
        allLoaded: false,
        wrapperHeight: 0
      };
    },

    methods: {
      loadMore() {
        this.loading = true;
        setTimeout(() => {
          let last = this.list[this.list.length - 1];
          for (let i = 1; i <= 10; i++) {
            this.list.push(last + i);
          }
          this.loading = false;
        }, 2500);
      }
    },

    compiled() {
      for (let i = 1; i <= 20; i++) {
        this.list.push(i);
      }
    },

    ready() {
      this.wrapperHeight = document.documentElement.clientHeight - this.$els.wrapper.getBoundingClientRect().top;
    }
  };
</script>
