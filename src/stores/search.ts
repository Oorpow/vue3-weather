import { defineStore } from 'pinia'
import { searchByKeywords } from '@/request/api'

const gaodeKey = import.meta.env.VITE_API_KEY

export const useSearchStore = defineStore('searchStore', {
	state: () => ({
		relatedLocations: <ApiCity.Location[]>[],
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
		// // 清空搜索结果
		// clearRelatedLocations() {
		// 	this.relatedLocations.length = 0
		// },
        /** 根据关键字查询行政区 */
	},
})
