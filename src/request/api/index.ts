import requestInstance from '..'

/** 获取所有城市的acode */
export const fetchCityAcode = async () => {
	return (await fetch('/data/acode.json')).json()
}

/** 关键字搜索 */
export const searchByKeywords = ({ key, keywords }: ApiGaoDe.SearchRequest) =>
	requestInstance({
		url: `/v5/place/text?key=${key}&keywords=${keywords}`,
	})

/** 查询指定城市 | 地区的天气状况 */
export const queryWeatherOfTargetLocation =
	({ key, city, extensions }: ApiGaoDe.WeatherSearchRequest) =>
		requestInstance.get(`/v3/weather/weatherInfo?key=${key}&city=${city}&extensions=${extensions}`)