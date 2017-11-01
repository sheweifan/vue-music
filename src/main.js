// http://ustbhuangyi.com/music/#/recommend
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// import { InfiniteScroll } from 'mint-ui'
import router from './router'

Vue.config.productionTip = false
// Vue.component(InfiniteScroll.name, InfiniteScroll)

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	template: '<App/>',
	components: { App }
})

Vue.filter('money', function (value) {
	return '￥' + parseFloat(value).toFixed(2)
})
