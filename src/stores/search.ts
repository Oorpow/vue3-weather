import { defineStore } from 'pinia'
import { searchByKeywords } from '@/request/api'

const gaodeKey = import.meta.env.VITE_API_KEY

export const useSearchStore = defineStore('searchStore', {
	state: () => ({}),
	actions: {
        // 搜索POI
        async getResBySearchKeywords(keywords: string) {
            try {
                const res = await searchByKeywords({ key: gaodeKey, keywords })
                console.log(res)
            } catch (error) {
                console.log(error)
            }
        }
    },
})
