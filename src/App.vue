<template lang="pug">
  div#app
    div.app-tab-brank
    app-tab
    keep-alive
      router-view
    player
</template>

<script>
	import '../static/css/reset.css'
  import appTab from '@/container/app/app-tab.vue'
  import player from '@/container/player'
	export default {
		name: 'app',
    components: {
      appTab,
      player
    }
	}
</script>

<style lang="stylus" scoped>
  .app-tab-brank
    padding-top: 52px
</style>
