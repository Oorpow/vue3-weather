import type { ECharts, EChartsOption } from 'echarts'
import { init } from 'echarts'

/**
 * 初始化图表
 * @param container 挂载容器
 * @param options 图表配置项
 */
export const useChart = <T extends Chart.LineChartDataSource>(
	container: HTMLElement,
	dataSource: T,
	options?: EChartsOption
) => {
	const chartInstance: ECharts = init(container)

	const chartOptions: EChartsOption = {
		title: {
			text: '近4日早晚温差',
			textStyle: {
				color: '#fff',
			},
		},
		xAxis: {
			type: 'category',
			data: dataSource.xAxisData,
			axisLabel: {
				color: '#fff',
			},
			axisLine: {
				lineStyle: {
					color: '#fff',
				},
			},
		},
		yAxis: {
			type: 'value',
			axisLabel: {
				color: '#fff',
			},
			splitLine: {
				show: false,
			},
		},
		tooltip: {
			trigger: 'axis',
			valueFormatter: (value) => `${value}°`,
		},
		series: [
			{
				name: '日间气温',
				type: 'line',
				data: dataSource.dayTempData,
				lineStyle: {
					color: 'white',
				},
			},
			{
				name: '夜间气温',
				type: 'line',
				data: dataSource.nightTempData,
				lineStyle: {
					color: 'white',
				},
			},
		],
	}

	chartInstance.setOption(options || chartOptions)
}
