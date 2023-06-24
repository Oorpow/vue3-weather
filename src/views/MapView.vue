<template>
	<KeepAlive>
		<div id="container" class="w-full h-screen relative"></div>
	</KeepAlive>
	<!-- 地点搜索结果面板 -->
	<div class="absolute top-[100px] left-[20px] w-[400px]" v-if="false">
		<!-- 搜索框 -->
		<div id="myPageTop">
			<input
				ref="tipInputRef"
				type="search"
				class="input-search"
				placeholder="请输入关键字"
			/>
		</div>
		<!-- 搜索结果面板显示 -->
		<div
			ref="tipPanelRef"
			class="top-[100px] left-[50px] w-full h-[300px]"
		></div>
	</div>
	<!-- 路线规划面板 -->
	<div class="absolute top-[100px] left-[20px] w-[400px] p-4">
		<!-- panel header -->
		<div class="flex flex-col bg-gaode-primary p-4 rounded-t-md">
			<div class="flex">
				<div class="flex flex-1 justify-center gap-10">
					<FontAwesomeIcon
						class="fa-icon"
						:class="
							currentIconItem === iconItem.id ? 'text-white' : ''
						"
						v-for="iconItem in iconList"
						:key="iconItem.id"
						:icon="iconItem.icon"
						@click="currentIconItem = iconItem.id"
					/>
				</div>
				<FontAwesomeIcon
					class="fa-icon text-white text-2xl"
					icon="xmark"
				/>
			</div>
			<!-- 搜索框容器 -->
			<div class="my-5">
				<div
					class="flex h-[34px] leading-[34px] px-2 my-2 bg-line-search-input-primary"
				>
					<label class="text-placeholder-color">起</label>
					<input
						ref="startPointInputRef"
						type="search"
						class="input-line-search"
						style="box-shadow: none"
						placeholder="请输入起点"
					/>
				</div>
				<div
					class="flex h-[34px] leading-[34px] px-2 bg-line-search-input-primary"
				>
					<label class="text-placeholder-color">终</label>
					<input
						ref="endPointInputRef"
						type="search"
						class="input-line-search"
						style="box-shadow: none"
						placeholder="请输入终点"
					/>
				</div>
			</div>
			<div class="flex justify-end">
				<FontAwesomeIcon
					class="fa-icon hover:text-white text-2xl"
					icon="fa-location-arrow"
					@click="handleRoutePlanning"
				/>
			</div>
		</div>
		<div
			ref="searchPlacePanelRef"
			class="top-[100px] left-[50px] w-full h-[300px] overflow-y-auto rounded-b-md"
		></div>
	</div>
	<!-- 路线规划结果 -->
	<div
		ref="linePanelRef"
		class="absolute top-[100px] right-[50px] w-[300px] h-[300px] rounded-b-md"
	></div>
</template>

<script setup lang="ts">
import { onMounted, ref, shallowRef, watchEffect } from 'vue'
import '@amap/amap-jsapi-types'
import AMapLoader from '@amap/amap-jsapi-loader'
import { useMapPlugin } from '@/hooks'
import { TravelEnum } from '@/common'

const map: any = shallowRef(null)
/** 存放placeSearch插件实例对象 */
const placeSearch: any = ref(null)
const globalPluginInstance: any = ref(null)
// 存放inputRef
const startPointInputRef = ref<HTMLElement | null>(null)
const endPointInputRef = ref<HTMLElement | null>(null)
const tipInputRef = ref<HTMLElement | null>(null)
const tipPanelRef = ref<HTMLElement | null>(null)
const linePanelRef = ref<HTMLElement | null>(null)
const searchPlacePanelRef = ref<HTMLElement | null>(null)

/** icon列表 */
const iconList = [
	{
		id: 1,
		icon: 'car',
	},
	{
		id: 2,
		icon: 'bus',
	},
	{
		id: 3,
		icon: 'bicycle',
	},
	{
		id: 4,
		icon: 'person-walking',
	},
]
// 当前选中的icon
const currentIconItem = ref<number>(1)

/** 插件列表 */
const mapPluginsList: string[] = [
	'AMap.PlaceSearch',
	'AMap.AutoComplete',
	'AMap.Driving',
	'AMap.Transfer',
	'AMap.Riding',
	'AMap.Walking',
]
/** 搜索插件配置项 */
const searchPluginOptions = {
	pageSize: 5, // 单页显示结果条数
	pageIndex: 1, // 页码
	map: null, // 展现结果的地图实例
	panel: linePanelRef.value, // 结果列表将在此容器中进行展示。
	autoFitView: true, // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
}

/** 地图初始化 */
function initMap() {
	AMapLoader.load({
		key: import.meta.env.VITE_MAP_KEY,
		version: '2.0',
		plugins: mapPluginsList,
	})
		.then((AMap) => {
			// 注册实例对象
			map.value = new AMap.Map('container', {
				zoom: 13, //初始化地图级别
			})
			searchPluginOptions.map = map.value

			// 挂载插件
			AMap.plugin(mapPluginsList, () => {
				watchEffect(() => {
					const [currentInstance] = useMapPlugin(
						AMap,
						currentIconItem.value,
						map.value,
						linePanelRef.value!
					)
					globalPluginInstance.value = currentInstance
					console.log('effect', globalPluginInstance.value)
				})
				const startPointComplete = new AMap.AutoComplete({
					input: startPointInputRef.value,
				})
				const endPointComplete = new AMap.AutoComplete({
					input: endPointInputRef.value,
				})
				// 根据面板来决定使用哪个panel作为搜索结果的展示
				placeSearch.value = new AMap.PlaceSearch({
					...searchPluginOptions,
					panel: searchPlacePanelRef.value,
				})
				startPointComplete.on('select', handleStartPointSelect)
				endPointComplete.on('select', handleEndPointSelect)
			})
		})
		.catch((e) => {
			console.log(e)
		})
}

/** 起点和终点数组 */
const transportSearchArr: ApiStaticMap.DrivingSearchArr[] = []

/** 当用户选中起点搜索结果的项时触发 */
const handleStartPointSelect = (e: any) => {
	transportSearchArr[0] = {
		keyword: e.poi.name,
	}
	placeSearch.value.setCity(e.poi.adcode)
	placeSearch.value.search(e.poi.name)
}

/** 当用户选中起点搜索结果的项时触发 */
const handleEndPointSelect = (e: any) => {
	transportSearchArr[1] = {
		keyword: e.poi.name,
	}
	placeSearch.value.setCity(e.poi.adcode)
	placeSearch.value.search(e.poi.name)
}

/** 执行路线规划操作 */
const handleRoutePlanning = () => {
	if (transportSearchArr[0] && transportSearchArr.length === 2) {
		globalPluginInstance.value.search(transportSearchArr)
	}
}

onMounted(() => {
	initMap()
})
</script>

<style>
.amap-lib-driving {
	@apply h-[300px] overflow-y-auto;
}
</style>
