import { TravelEnum } from "@/common"

/** 交通方式 */
type TransportType = TravelEnum

/**
 * 根据当前选中的出行方式，构造对应出行方式的实例对象
 * @param SuperClass AMap
 * @param type 出行方式
 * @param map 渲染的地图
 * @param panelElement 结果展示面板
 */
export const useMapPlugin = (
	SuperClass: any,
	type: TransportType,
	map: any,
	panelElement: HTMLElement
) => {
	let instance = null

	switch (type) {
		case TravelEnum.Driving:
			instance = new SuperClass.Driving({
				map,
				panel: panelElement,
			})
			break
		case TravelEnum.Bus:
			instance = new SuperClass.Transfer({
				map,
				panel: panelElement,
			})
			break
		case TravelEnum.Riding:
			instance = new SuperClass.Riding({
				map,
				panel: panelElement,
			})
			break
		case TravelEnum.Walking:
			break
		default:
			break
	}

	return [instance]
}
