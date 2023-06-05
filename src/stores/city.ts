import { defineStore } from 'pinia'
import { fetchCityAcode } from '@/request/api'

export const useCityStore = defineStore('cityStore', {
	state: () => ({
		cityList: <ApiCity.City[]>[],
	}),
	actions: {
		async getCityACodeList() {
			const res = await fetchCityAcode()
            this.cityList.length = 0
            this.cityList.push(...res.Sheet1)
		},
	},
})
