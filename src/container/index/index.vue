<template>
	<div>
		<appHeader title="首页"></appHeader>
		<div class="list">
			<item v-for="item in list" :item="item" :key="item.contentId"></item>
		</div>
		<div class="loading" v-if="this.pageIndex < this.pageTotal">正在加载中...</div>
		<div class="loading" v-else>没有更多了</div>
	</div>
</template>

<script>
	import appHeader from '@/components/appHeader/index'
	import item from '@/components/item/index'
	import { list } from '@/config/uri'
	export default {
		name: 'index',
		components: {appHeader, item},
		data: function(){
			return {
				list: [],
				pageIndex: 1,
				loading: true,
				pageTotal: 999
			}
		},
		methods: {
			fetchData: function(pageIndex){
				this.loading = true
				fetch(`${list}?pageIndex=${pageIndex}`, {
						dataType: 'json'
					})
					.then(response => response.json())
					.then((data) => {
						// setTimeout(function (){
						this.loading = false
						this.list = this.list.concat(data.data.resultList)
						this.pageTotal = data.data.returnCount
						// }.bind(this), 1000)
					})
			},
			scrollLoad(e){
				if (this.loading || this.pageIndex >= this.pageTotal) return
				var body = document.body
				var sct = body.scrollTop
				var bodyH = body.scrollHeight
				var winH = window.screen.availHeight
				if (sct >= bodyH - winH){
					this.pageIndex = this.pageIndex + 1
					this.fetchData(this.pageIndex)
				}
			}
		},
		created: function(){
			this.fetchData(1)

			window.addEventListener('scroll', this.scrollLoad)
		},
		beforeDestroy: function(){
			window.removeEventListener('scroll', this.scrollLoad)
		}
	}
</script>

<style>
	.loading{
		text-align: center;
		padding: 10px 0;
	}
</style>
