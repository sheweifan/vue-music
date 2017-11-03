import Vue from 'vue'
import Router from 'vue-router'
import recommend from '@/container/recommend'
import singer from '@/container/singer'
import rank from '@/container/rank'
import songList from '@/container/song-list'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			redirect: '/recommend'
		},
		{
			path: '/recommend',
			component: recommend,
			children: [
				{
					path: ':id',
					component: songList
				}
			]
		},
		{
			path: '/singer',
			component: singer,
			children: [
				{
					path: ':id',
					component: songList
				}
			]
		},
		{
			path: '/rank',
			component: rank,
			children: [
				{
					path: ':id',
					component: songList
				}
			]
		}
	]
})
