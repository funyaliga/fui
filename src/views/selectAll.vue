<template>
<div id="demo">
	<input type="checkbox" v-model="toggleAll" v-on:click="selectchange" />select all
	<div v-for="item in array">
		<input type="checkbox" v-model="checklist" :value="item.id" />{{item.id}}
	</div>
	<div>
		<p>{{checklist|json}}</p>
	</div>
</div>
</template>

<script>
export default{
	data(){
		return {
			checklist: [],
			array: [
				{ id: 1 },
				{ id: 2 },
			],
		}
	},
	computed: {
		toggleAll: function () {
			return this.checklist.length == this.array.length
		}
	},
	methods: {
		selectchange: function () {
			var selectall = this.toggleAll;
			if (!selectall) {
				this.checklist = [];
				for (var i = 0; i < this.array.length; i++) {
					this.checklist.push(this.array[i].id)
				}
			} else {
				this.checklist = []
			}
		}	
	}
}
</script>