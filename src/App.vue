<template>
	<div id="app">
    <keep-alive include="/">
      <router-view></router-view>
    </keep-alive>
	</div>
</template>

<script>
	import '../static/css/reset.css'
	export default {
		name: 'app'
	}
</script>

<style>

</style>
