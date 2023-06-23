<script setup lang="ts">
import { RouterView } from 'vue-router'
import SiteNavigation from './components/SiteNavigation.vue'

;(window as any)._AMapSecurityConfig = {
	securityJsCode: import.meta.env.VITE_MAP_SECURITY_KEY,
}
</script>

<template>
	<div class="flex flex-col min-h-screen bg-weather-primary">
		<SiteNavigation />
		<RouterView />
	</div>
</template>
