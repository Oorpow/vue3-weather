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

    /** 天气查询 */
    interface WeatherSearchRequest extends CommonKey {
        key: string
        city: string
        /** base(实况) all(预报) */
        extensions?: 'base' | 'all'
        output?: 'JSON' | 'XML'
    }
}

declare namespace ApiCity {
    interface City {
        name: string
        adcode: string
        citycode?: string
    }

    /** 搜索查询出的结果 */
    interface Location {
        adcode: string
        address: string
        adname: string
        id: string
        name: string
        location: string
        pcode: string
        [propName: string]: any
    }
}

declare namespace ApiWeather {
    interface WeatherLive {
        adcode: string
        province: string
        city: string
        humidity: string
        reporttime: string
        temperature: string
        weather: string
        winddirection: string
        windpower: string
        [propName: string]: any
    }
    interface WeatherCast {
        date: Date | string
        dayweather: string
        daytemp: string
        nighttemp: string
        nightweather: string
        week: string
    }
}