import requestInstance from '..'

export const fetchCityAcode = async () => {
	return (await fetch('/data/acode.json')).json()
}

export const searchByKeywords = ({ key, keywords }: ApiGaoDe.SearchRequest) =>
	requestInstance({
		url: `/v5/place/text?key=${key}&keywords=${keywords}`,
	})

