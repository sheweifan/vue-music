import Vue from 'vue'
import Router from 'vue-router'
import recommend from '@/container/recommend'
import singer from '@/container/singer'
import rank from '@/container/rank'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			redirect: '/recommend'
		},
		{
			path: '/recommend',
			component: recommend
		},
		{
			path: '/singer',
			component: singer
		},
		{
			path: '/rank',
			component: rank
		}
	]
})
