<template>
<div class="scroll-body">
	<ul>
		<li v-for="(key, item) in list">
			{{key}}.{{item.title}}
		</li>
	</ul>
	<u-infinite-loading :on-infinite="onInfinite" :distance="distance"></u-infinite-loading>
</div>
</template>

<script>
export default {
	data(){
		return {
			distance: 100,
			list: [],
			page: 1
		}
	},
	methods: {
		onInfinite: function () {
			this.$http.get('https://cnodejs.org/api/v1/topics', {
				params: {
					page: this.page
				}
			}).then(
				function (response) {
					// console.log(response)
					this.list = this.list.concat(response.data.data);
					this.page++;
					this.$broadcast('infinite:loaded');
				}, function () {
					if(this.page == 1){
						this.$broadcast('infinite:noResults');
					} else {
						this.$broadcast('infinite:noMore');
					}
				}
			)
			// setTimeout(function () {
			// 	var temp = [];
			// 	for (var i = this.list.length; i <= this.list.length + 20; i++) {
			// 		temp.push(i);
			// 	}
			// 	this.list = this.list.concat(temp);
			// 	this.$broadcast('infinite:loaded');
			// }.bind(this), 2000);
		}
	}
}
</script>


<style lang="sass">

.scroll-body
	height: 400px
	overflow: auto
	font-size: 14px
	li
		padding: 5px
		background: #fafafa
		border-top: 1px solid #fff
		border-bottom: 1px solid #e3e3e3
</style>