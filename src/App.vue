<template lang="pug">
  div#app
    tabbar
    keep-alive(include="/")
      router-view
</template>

<script>
	import '../static/css/reset.css'
  import tabbar from '@/components/tabbar.vue'
	export default {
		name: 'app',
    components: {
      tabbar
    }
	}
</script>
