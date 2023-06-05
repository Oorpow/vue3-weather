declare namespace ApiGaoDe {
    /** 一些公共的属性 */
    interface CommonKey {
        /** 高德key */
        key: string
        page_size?: number
        page_num?: number
    }

    /** 搜索POI */
    interface SearchRequest extends CommonKey {
        /** 地点关键字 */
        keywords: string
    }
}

declare namespace ApiCity {
    interface City {
        name: string
        adcode: string
        citycode?: string
    }
}