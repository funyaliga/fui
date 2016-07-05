<template>
	<fui-page-hd>resource</fui-page-hd>
	<table>
		<colgroup>
			<col width="10%">
			<col width="30%">
			<col width="40%">
			<col width="20%">
		</colgroup>
		<thead>
			<tr>
			<th>名称</th>
			<th>电话</th>
			<th>内容</th>
			<th>时间</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="poem in poems">
				<td>{{poem.name}}</td>
				<td>{{poem.phone}}</td>
				<td>{{poem.content}}</td>
				<td>{{ setTime(poem.time) }}</td>
			</tr>
		</tbody>

	</table>
</template>

<script type="text/babel">
export default {
	data() {
		return {
			poems: [],
		};
	},
	route: {
		data() {
			return {
				poems: this.$http.jsonp('http://funya.in/work/sql0426.php?type=get&callback=jsonp1', '').then(
					function  (response) {
						return response.data.data
					},
					function  () {
					}
				)
			}
		}
	},
	methods: {
		setTime: function  (time) {
			return new Date(parseInt(time) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');
		}
	}
}
</script>

<style lang="sass">
table
	width: 100%

td,th
	border: 1px solid red
	padding: 10px
	font-size: 14px
</style>
