import { defineStore } from 'pinia'
import { fetchCityAcode } from '@/request/api'

export const useCityStore = defineStore('cityStore', {
	state: () => ({
		cityList: <ApiCity.City[]>[],
		relatedLocations: <ApiCity.Location[]>[]
	}),
	actions: {
		/** 获取城市adcode编码表 */
		async getCityACodeList() {
			const res = await fetchCityAcode()
            this.cityList.length = 0
            this.cityList.push(...res.Sheet1)
		},
		/** 根据关键字从adcode编码表进行筛选行政区域 */
		async pickAdcodeFromAdcodeList(keywords: string) {
			if (!this.cityList.length) {
				await this.getCityACodeList()
			}
			const result = this.cityList.filter(city => city.name.includes(keywords))
			this.relatedLocations.length = 0
			this.relatedLocations.push(...(result as ApiCity.Location[]))
		},
		clearRelatedLocations() {
			this.relatedLocations.length = 0
		}
	},
})
