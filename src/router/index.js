import Vue from 'vue'
import Router from 'vue-router'

const recommend = () => import('@/container/recommend/index.vue')
const singer = () => import('@/container/singer/index.vue')
const rank = () => import('@/container/rank/index.vue')
const songList = () => import('@/container/song-list/index.vue')
const search = () => import('@/container/search/index.vue')
const user = () => import('@/container/user/index.vue')

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
		},
		{
			path: '/search',
			component: search,
			children: [
				{
					path: 'singer/:id',
					component: songList
				}
			]
		},
		{
			path: '/user',
			component: user
		}
	]
})
