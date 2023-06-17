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

    /** 输入提示 */
    interface InputTips extends CommonKey {
        keywords: string
        city?: 'citycode' | 'adcode'
    }

    type Key = Pick<CommonKey, 'key'>
    type ReverseReq = Key & {
        location: string
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
        citycode: string
        name: string
    }

    /** 当前IP显示的位置信息 */
    interface IpLocationRes {
        adcode: string
        city: string
        info: string
        infocode: string
        province: string
        rectangle: string
        status: string
    }
}

declare namespace ApiWeather {
    /** 实况天气 */
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
    /** 预报天气 */
    interface WeatherCast {
        date: Date | string
        dayweather: string
        daytemp: string
        nighttemp: string
        nightweather: string
        week: string
    }
}

declare namespace ApiStaticMap {
    interface StaticMapReq {
        key: string
        location: string
        /** 缩放区间[1,17] */
        zoom: string
        [propName: string]: any
    }
}