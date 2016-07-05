<template>
<div class="u-tab">
	<slot></slot>
</div>
</template>

<script>
export default {
	name: 'fui-tab',
	props: {
		selected: '',
	},
	
}
</script>