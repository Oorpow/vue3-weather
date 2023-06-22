<template>
	<KeepAlive>
		<div id="container" class="w-full h-screen relative"></div>
	</KeepAlive>
	<div class="absolute top-[100px] left-[20px] w-[400px]">
		<!-- 搜索框 -->
		<div id="myPageTop">
			<input
				id="tipinput"
				type="search"
				class="input-search"
				placeholder="请输入关键字"
			/>
		</div>
		<!-- 搜索结果面板显示 -->
		<div id="panel" class="top-[100px] left-[50px] w-full h-[300px]"></div>
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref, shallowRef } from 'vue'
import AMapLoader from '@amap/amap-jsapi-loader'

const map: any = shallowRef(null)
/** 存放placeSearch插件实例对象 */
const placeSearch: any = ref(null)

/** 插件列表 */
const mapPluginsList: string[] = ['AMap.PlaceSearch', 'AMap.AutoComplete']

/** 搜索插件配置项 */
const searchPluginOptions = {
	pageSize: 5, // 单页显示结果条数
	pageIndex: 1, // 页码
	map: null, // 展现结果的地图实例
	panel: 'panel', // 结果列表将在此容器中进行展示。
	autoFitView: true, // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
}

/** 搜索提示插件配置项 */
const autoCompletePluginOptions = {
	input: 'tipinput',
}

/** 地图初始化 */
const initMap = () => {
	;(window as any)._AMapSecurityConfig = {
		securityJsCode: import.meta.env.VITE_MAP_SECURITY_KEY,
	}

	AMapLoader.load({
		key: import.meta.env.VITE_MAP_KEY, // 申请好的Web端开发者Key，首次调用 load 时必填
		version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
	})
		.then((AMap) => {
			// 注册实例对象
			map.value = new AMap.Map('container', {
				zoom: 13, //初始化地图级别
			})
			searchPluginOptions.map = map.value
			// 挂载插件
			AMap.plugin(mapPluginsList, () => {
				const autoComplete = new AMap.AutoComplete(
					autoCompletePluginOptions
				)
				placeSearch.value = new AMap.PlaceSearch(searchPluginOptions)
				autoComplete.on('select', handleSelect)
			})
		})
		.catch((e) => {
			console.log(e)
		})
}

/** 当用户选中搜索结果的项时触发 */
const handleSelect = (e: any) => {
	placeSearch.value.setCity(e.poi.adcode)
	placeSearch.value.search(e.poi.name, (status, result) => {
		// 自定义选点
	})
}

onMounted(() => {
	initMap()
})
</script>
