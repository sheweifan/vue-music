<template lang="pug">
  div#app
    div.app-tab-brank
    app-tab
    keep-alive
      router-view
    player
    play-list
</template>

<script>
	import '@/static/css/reset.css'
  import appTab from '@/container/app/app-tab.vue'
  import player from '@/container/player'
  import playList from '@/container/play-list'
	export default {
		name: 'app',
    components: {
      appTab,
      player,
      playList
    },
    mounted(){
      setTimeout(() => {
        navigator.splashscreen && navigator.splashscreen.hide()
      }, 1000)
    }
	}
</script>

<style lang="stylus" scoped>
  .app-tab-brank
    padding-top: 52px
</style>
