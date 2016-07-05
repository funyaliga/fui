<!-- form: https://github.com/PeachScript/vue-infinite-loading -->

<template>
	<div class="u-infinite-loading">
		<i class="loading" v-show="isLoading"></i>
		<div class="infinite-status-tips" v-show="!isLoading && isNoResults">
			<slot name="no-results">没有结果 :(</slot>
		</div>
		<div class="infinite-status-tips" v-show="!isLoading && isNoMore">
			<slot name="no-more">没有更多数据 :)</slot>
		</div>
	</div>
</template>

<script>
// 获取滚动父级
function getScrollParent(elm) {
	if (elm.tagName === 'BODY') {
		return window;
	} else if (['scroll', 'auto'].indexOf(getComputedStyle(elm).overflowY) > -1) {
		return elm;
	}
	return getScrollParent(elm.parentNode);
}

function getCurrentDistance(elm) {
	// 获取滚动父级的内高
	const innerHeight = elm === window
		? window.innerHeight
		: parseInt(getComputedStyle(elm).height, 10);
	// 获取滚动父级的滚动条总高度
	const scrollHeight = elm === window
		? document.body.scrollHeight
		: elm.scrollHeight;
	// 获取滚动父级的滚动条滑动高度
	const scrollTop = isNaN(elm.scrollTop) 
		? elm.pageYOffset 
		: elm.scrollTop;

	return scrollHeight - innerHeight - scrollTop;
}

export default {
	name: 'u-infinite-loading',
	data(){
		return {
			isLoading: false, // 是否loading
			isNoResults: false, // 是否没有结果
			isNoMore: false, // 是否没有更多
			scrollParent: null, // 滚动父级
			scrollHandler: function () {
				const currentDistance = getCurrentDistance(this.scrollParent);
				if (!this.isLoading && currentDistance <= this.distance) {
					this.isLoading = true;
					if (this.onInfinite) {
						this.onInfinite.call();
					}
				}
			}.bind(this), // 滚动处理程序
		}
	},
	props: {
		// 距离
		distance: {
			type: Number,
			default: 100
		}, 
		onInfinite: Function
	},
	ready(){
		this.scrollParent = getScrollParent(this.$el);
		setTimeout(this.scrollHandler, 1);
		this.scrollParent.addEventListener('scroll', this.scrollHandler);
	},
	events: {
		'infinite:loaded'() {
			this.isLoading = false;
		},
		'infinite:noResults'() {
			this.isLoading = false;
			this.isNoMore = false;
			this.isNoResults = true;
			this.scrollParent.removeEventListener('scroll', this.scrollHandler);
		},
		'infinite:noMore'() {
			this.isLoading = false;
			this.isNoResults = false;
			this.isNoMore = true;
			this.scrollParent.removeEventListener('scroll', this.scrollHandler);
		},
		'infinite:reset'() {
			this.isLoading = false;
			this.isNoMore = false;
			this.isNoResults = false;
			this.scrollParent.addEventListener('scroll', this.scrollHandler);
			this.scrollHandler();
		},
	},
	destroyed() {
		if (!this.isNoResults && !this.isNoMore) {
			this.scrollParent.removeEventListener('scroll', this.scrollHandler);
		}
	},
}
</script>


<style lang="sass">

.u-infinite-loading
	text-align: center
	.loading
		&:after
			content: '￠'
			display: inline-block
			animation: ease loading 1.5s infinite


@keyframes loading
	0%
		transform: rotate(-38deg)
	100%
		transform: rotate(322deg)
</style>
