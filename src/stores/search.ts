import { ref } from 'vue'
import { defineStore } from 'pinia'
import { locateByIP } from '@/request/api'

const gaodeKey = import.meta.env.VITE_API_KEY

export const useSearchStore = defineStore('searchStore', {
	state: () => ({
		relatedLocations: <ApiCity.Location[]>[],
		currentLocation: ref<ApiCity.IpLocationRes>({
			adcode: '',
			city: '',
			info: '',
			infocode: '',
			province: '',
			rectangle: '',
			status: ''
		}),
	}),
	actions: {
		// 搜索POI
		// async getResBySearchKeywords(keywords: string) {
		// 	try {
		// 		const res = await searchByKeywords({ key: gaodeKey, keywords })
		// 		this.relatedLocations.length = 0
		// 		this.relatedLocations.push(...res.data.pois)
		// 	} catch (error) {
		// 		console.log(error)
		// 	}
		// },
		/** 根据ip获取定位信息 */
		async getLocationByIP() {
			const res = await locateByIP(gaodeKey)
			this.currentLocation = res.data
		},
	},
})
