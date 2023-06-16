import { defineStore } from 'pinia'
import { getStaticMap } from '@/request/api'

const gaodeKey = import.meta.env.VITE_API_KEY

export const useMapStore = defineStore('mapStore', {
	state: () => ({
        staticMapImage: ''
    }),
	actions: {
		async queryStaticMapByLocation(location: string) {
			const res = await getStaticMap({
                key: gaodeKey,
                location,
                zoom: '2'
            })
            const url = URL.createObjectURL(res.data)
            this.staticMapImage = url
		},
	},
})
