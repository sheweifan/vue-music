<template>
	<div class="app_header">
		<span class="goback" v-if="goback==='true'" v-on:click="handleGoback"> < </span>
		{{title}}
	</div>
</template>

<script>
	export default {
		name: 'appHeader',
		props: ['title', 'goback'],
		methods: {
			handleGoback: function(){
				this.$router.back(-1)
			}
		},
		created: function(){
		}
	}
</script>

<style>
	.app_header{
		width: 100%;
		background: #52bfe6;
		text-align: center;
		line-height: 40px;
		color: #fff;
		position: relative;
	}
	.app_header .goback{
		position: absolute;
		left: 0;
		top: 0;
		width: 40px;
		height: 100%;
	}
</style>
