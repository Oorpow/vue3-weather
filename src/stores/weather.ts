import { defineStore } from 'pinia'
import { queryWeatherOfTargetLocation } from '@/request/api'

const gaodeKey = import.meta.env.VITE_API_KEY

export const useWeatherStore = defineStore('weatherStore', {
	state: () => ({
		// 实况天气
		weatherInfoLives: {} as ApiWeather.WeatherLive,
		// 预报天气
		weatherInfoCasts: [] as ApiWeather.WeatherCast[]
	}),
	actions: {
		/**
		 * 获取特定城市 | 地区的实况天气
		 * @param city 城市|地区的编码
		 */
		async getWeatherLivesOfCity(city: string) {
			try {
				const res: any = await queryWeatherOfTargetLocation({
					key: gaodeKey,
					city,
					extensions: 'base'
				})
				this.weatherInfoLives.adcode = res.data.lives[0].adcode
				this.weatherInfoLives.reporttime = res.data.lives[0].reporttime
				this.weatherInfoLives.humidity = res.data.lives[0].humidity
				this.weatherInfoLives.temperature = res.data.lives[0].temperature
				this.weatherInfoLives.weather = res.data.lives[0].weather
				this.weatherInfoLives.city = res.data.lives[0].city
			} catch (error) {
				console.error(error)
			}
		},
		/**
		 * 获取某个城市的预报天气
		 * @param city 
		 */
		async getWeatherCastsOfCity(city: string) {
			const res: any = await queryWeatherOfTargetLocation({
				key: gaodeKey,
				city,
				extensions: 'all'
			})
			this.weatherInfoCasts.length = 0
			this.weatherInfoCasts.push(...res.data.forecasts[0].casts)
		}
	},
})
