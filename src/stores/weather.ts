import { defineStore } from 'pinia'
import { queryWeatherOfTargetLocation } from '@/request/api'

const gaodeKey = import.meta.env.VITE_API_KEY

export const useWeatherStore = defineStore('weatherStore', {
	state: () => ({
        weatherInfo: {} as ApiWeather.Weather
    }),
	actions: {
        /**
         * 获取特定城市 | 地区的天气
         * @param city 城市|地区的编码
         */
        async getWeatherOfCity(city: string) {
            try {
                const res: any = await queryWeatherOfTargetLocation({ key: gaodeKey, city })
                if (res.infocode === '10000') {
                    this.weatherInfo = res.data.lives[0]
                }
            } catch (error) {
                console.error(error)
            }
        }
    },
})
