<template>
	<div class="item" @click="runToDetail(item.contentId)">
		<div class="img">
			<img :src="item.pic">
		</div>
		<div class="info">
			<p class="contentTitle">{{item.contentTitle}}</p>
			<p class="summary">{{item.summary}}</p>
			<span class="zanTotal">{{item.zanTotal}}</span>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'item',
		props: ['item'],
		methods: {
			runToDetail: function(id){
				console.log(1)
				this.$router.push(`/detail/${id}`)
			}
		},
		beforeMount: function(){
			// console.log()
			// this.$props = JSON.parse(this.$props)
		}
	}
</script>

<style>
	.item{
		font-size: 0;
		line-height: 0;
		border-bottom: 1px solid #e5e5e5;
		padding: 10px 10px 10px 100px;
		position: relative;
	}
	.item .img{
		width: 90px;
		height: 100%;
		position: absolute;
		left: 10px;
		top: 0;
		overflow: hidden;
	}
	.item .img img{
		height: 100%;
		object-fit: contain;
	}
	.item .info{
		box-sizing: border-box;
		padding-left: 10px;
	}
	.item .contentTitle{
		font-size: 16px;
		line-height: 1.5;
		color: #333;
	}
	.item .summary{
		font-size: 14px;
		line-height: 1.5;
		height: 63px;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
		overflow: hidden;
	}
	
</style>
