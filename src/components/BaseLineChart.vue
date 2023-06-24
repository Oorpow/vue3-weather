<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useChart } from '@/hooks'

type Props = {
	dataSource: Chart.LineChartDataSource
}

const props = defineProps<Props>()

const chartRef = ref<HTMLElement | null>(null)
onMounted(() => {
	useChart<Chart.LineChartDataSource>(chartRef.value as HTMLElement, props.dataSource)
})
</script>

<template>
	<div id="chart-container" ref="chartRef" class="w-full h-[600px]"></div>
</template>
