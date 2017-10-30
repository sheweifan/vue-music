<template>

  <transition name="slide-fade">
		<div class="detail_container">
			<appHeader title="详情" goback="true"></appHeader>
			<div class="loading" v-if="loading">正在加载中...</div>
			<div v-else>
				<div class="topimg">
					<img :src="data.pic" alt="">
				</div>
				<div class="infobox">
					<p class="title">{{data.title}}</p>
					<p class="total">
						<span class="saleDesc">{{data.saleDesc}}</span>
						<span class="price">{{data.price | money}}</span>
						<del class="originalPrice">{{data.originalPrice | money}}</del>
					</p>
					<p class="content">
						{{data.content}}
					</p>
					<p class="tags">
						<span v-for="item in data.extList[0].itemList">{{item.title}}</span>
					</p>
				</div>
				<div class="likebox">
					<p class="title">{{data.extList[1].head}}</p>
					<div class="likebox_list">
						<div class="likebox_item" v-for="item in data.extList[1].itemList" @click="runToDetail(item.itemId)">
							<img :src="item.pic" alt="">
							<span class="desc">{{item.desc}}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
  </transition>
</template>

<script>
	import appHeader from '@/components/appHeader/index'
	import item from '@/components/item/index'
	import { detail } from '@/config/uri'
	export default {
		name: 'detail',
		components: {appHeader, item},
		data: function(){
			return {
				data: {},
				loading: true
			}
		},
		mounted: function(){
			let _id = this.$route.params.id
			fetch(detail + '?id=' + _id)
				.then(response => response.json())
				.then(data => {
					console.log(data)
					this.loading = false
					this.data = data.data
				})
		},
		methods: {
			runToDetail: function(_id){
				fetch(detail + '?id=' + _id)
					.then(response => response.json())
					.then(data => {
						console.log(data)
						this.loading = false
						this.data = data.data
					})
			}
		}
	}
</script>

<style>
	.loading{
		text-align: center;
		padding: 10px 0;
	}
	.topimg{
		height: 200px;
		border-bottom: 1px solid #e5e5e5;
	}
	.topimg img{
		height: 100%;
		width: 100%;
		object-fit: contain;
	}
	.infobox{
		padding: 10px;
		border-bottom: 1px solid #e5e5e5;
	}
	.infobox .title{
		font-size: 16px;
		line-height: 1.5;
		padding-bottom: 2px;
	}
	.infobox .total{
		line-height: 1.5;
		font-size: 14px;
		padding-bottom: 4px;
	}
	.infobox .total .saleDesc{
		float: right;
		color: #666;
	}
	.infobox .total .originalPrice{
		color: #999;
	}
	.infobox .tags{
		padding: 10px 0;
	}
	.infobox .tags span{
		display: inline-block;
		padding: 5px;
		margin-right: 5px;
		font-size: 12px;
		color: #fff;
		background: #ccc;
		border-radius: 2px;
	}

	.likebox .title{
		font-size:16px;
		line-height: 3;
		padding:  0 10px;
	}
	.likebox_list{
		font-size: 0;
		line-height: 0;
	}
	.likebox_item{
		width: 33.33%;
		padding-bottom: 33.33%;
		display: inline-block;
		vertical-align: top;
		position: relative;
	}
	.likebox_item img{
		width: 100%;
		height: 100%;
		position: absolute;
	}
	.likebox_item .desc{
		position: absolute;
		right: 0;
		bottom:0;
		width: 100%;
		box-sizing: border-box;
		padding: 0 5px;
		font-size: 12px;
		line-height: 20px;
		text-align: right;
		color: #fff;
		text-shadow: 0 0 2px rgba(0,0,0,0.5)
	}

	/* 可以设置不同的进入和离开动画 */
	/* 设置持续时间和动画函数 */
	.slide-fade-enter-active {
	  transition: all .3s;
	}
	.slide-fade-leave-active {
	  /*transition: all 0*/
	}
	.slide-fade-enter, .slide-fade-leave-to
	/* .slide-fade-leave-active for below version 2.1.8 */ {
	  /*transform: translateX(10px);*/
	  opacity: 0;
	}
</style>
