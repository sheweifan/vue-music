import Vue from 'vue'
import Router from 'vue-router'
import recommend from '@/container/recommend'

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
		}
	]
})
