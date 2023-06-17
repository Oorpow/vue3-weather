<template>
	<div id="container" style="font-size: medium;" class="w-full h-[500px] m-0 p-0"></div>
</template>

<script setup lang="ts">
import { shallowRef } from 'vue'
import AMapLoader from '@amap/amap-jsapi-loader'

type Props = {
	longitude: number
	latitude: number
}

const props = withDefaults(defineProps<Props>(), {
	longitude: 0,
	latitude: 0,
})

const map = shallowRef(null)
/** 地图相关配置项 */
const mapConfig = {
	key: import.meta.env.VITE_MAP_KEY,
	version: '2.0',
}

const initInfoWindow = (): string[] => {
	const info: string[] = []
	info.push(`<div style=\"padding: 5px; color: black; font-size: 12px"\>我的位置</div>`)
	return info
}

/** 初始化地图 */
const initMap = () => {
	AMapLoader.load(mapConfig)
		.then((AMap) => {
			map.value = new AMap.Map('container', {
				zoom: 10,
				center: [props.longitude, props.latitude],
			})
			// 标记点
			const marker = new AMap.Marker({
				icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
				position: [props.longitude, props.latitude],
				anchor: 'bottom-center',
			})
			// 信息窗体
			const info = initInfoWindow()
			const infoWindow = new AMap.InfoWindow({
				content: info.join(`<br/>`)
			})

			infoWindow.open(map.value, (map.value as any).getCenter())
			(map.value).add(marker)
			(map.value).setFitView()
		})
		.catch((err) => {
			console.warn(err)
		})
}

initMap()
</script>
