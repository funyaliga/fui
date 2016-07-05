<template>
<div 
	class="u-tab-container-item" 
	:class="{ 'is-select': $parent.selected == id }"
>
	<slot></slot>
</div>
</template>

<script>
export default {
	name: 'fui-tab-container-item',
	props: {
		id: [String, Number],
	}
}
</script>

<style lang="sass">
.u-tab-container-item
	display: none
	&.is-select
		display: block
</style>