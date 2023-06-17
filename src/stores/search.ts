import { ref } from 'vue'
import { defineStore } from 'pinia'
import { locateByIP, reverseGeocoding } from '@/request/api'

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
		currentAdcode: ''
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
			try {
				const res = await locateByIP(gaodeKey)
				this.currentLocation = res.data
			} catch (error) {
				console.warn(error)
			}
		},
		/** 逆地理编码转换，经纬度 => acode */
		async reverseGeoLocation(location: string) {
			try {
				const res = await reverseGeocoding({
					key: gaodeKey,
					location
				})
				this.currentAdcode = res.data.regeocode.addressComponent.adcode
			} catch (error) {
				console.warn(error)
			}
		}
	},
})
