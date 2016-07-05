<template>
<div 
	class="u-tab-item" 
	@click="$parent.selected = id"
	:class="{ 'is-select': $parent.selected == id }"
>
	<slot></slot>
</div>
</template>

<script>
export default {
	name: 'fui-tab-item',
	props: {
		id: [String, Number],
	}
}
</script>

<style lang="sass">
.u-tab-item
	cursor: pointer
</style>