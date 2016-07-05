<template>
<div class="u-tab-container">
	<slot></slot>
</div>
</template>

<script>
export default {
	name: 'fui-tab-container',
	props: {
		selected: '',
	},
	
}
</script>