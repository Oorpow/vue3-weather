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
export const queryWeatherOfTargetLocation = ({
	key,
	city,
	extensions,
}: ApiGaoDe.WeatherSearchRequest) =>
	requestInstance.get(
		`/v3/weather/weatherInfo?key=${key}&city=${city}&extensions=${extensions}`
	)

/** 根据IP进行定位 */
export const locateByIP = (key: string) =>
	requestInstance.get(`/v3/ip?key=${key}`)

/** 静态地区绘制 */
export const getStaticMap = ({
	key,
	location,
	zoom,
}: ApiStaticMap.StaticMapReq) =>
	requestInstance.get(
		`/v3/staticmap?key=${key}&location=${location}&zoom=${zoom}&scale=2`,
		{
			responseType: 'blob'
		}
	)
