// http://ustbhuangyi.com/music/#/recommend
// http://mint-ui.github.io/docs/#/zh-cn2
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import { Swipe, SwipeItem, Lazyload, IndexList, IndexSection, Spinner } from 'mint-ui'
import router from './router'
import store from './store'

Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.use(Lazyload)
Vue.component(IndexList.name, IndexList)
Vue.component(IndexSection.name, IndexSection)
Vue.component(Spinner.name, Spinner)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
  store,
	template: '<App/>',
	components: { App }
})
