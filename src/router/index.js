import Vue from 'vue'
import Router from 'vue-router'
import index from '@/container/index/index'
import detail from '@/container/detail/index'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			name: 'index',
			component: index
		},
		{
			path: '/detail/:id',
			name: 'detail',
			component: detail
		}
	]
})
