<template>
	<div></div>
</template>

<script setup lang="ts">
import { watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { useWeatherStore } from '@/stores/weather'

const route = useRoute()
const weatherStore = useWeatherStore()

watchEffect(() => {
    weatherStore.getWeatherOfCity(route.params.city as string)
})
</script>
