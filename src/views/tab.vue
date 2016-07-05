<template>
	<fui-tab :selected.sync=demo1>
		<fui-tab-item id="哈哈">哈哈</fui-tab-item>
		<fui-tab-item id="呵呵">呵呵</fui-tab-item>
		<fui-tab-item id="拉拉">拉拉</fui-tab-item>
	</fui-tab>
	<fui-tab-container :selected.sync=demo1>
		<fui-tab-container-item id="哈哈">内容框：哈哈</fui-tab-container-item>
		<fui-tab-container-item id="呵呵">内容框：呵呵</fui-tab-container-item>
		<fui-tab-container-item id="拉拉">内容框：拉拉</fui-tab-container-item>
	</fui-tab-container>

	<fui-tab :selected.sync=demo2>
		<fui-tab-item id="a">a</fui-tab-item>
		<fui-tab-item id="b">b</fui-tab-item>
		<fui-tab-item id="c">c</fui-tab-item>
	</fui-tab>
	{{demo2}}
</template>

<script>
export default {
	data(){
		return {
			demo1: '拉拉',
			demo2: 'a',
		}
	}
}
</script>

<style lang="sass">

.u-tab
	display: flex
	margin-top: 20px
	border-bottom: 1px solid #999

.u-tab-item
	flex: 1
	text-align: center
	line-height: 30px
	&.is-select
		background: #999
		color: #fff
</style>