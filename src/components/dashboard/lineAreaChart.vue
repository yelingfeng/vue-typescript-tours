<script lang="tsx">
import { Component, Prop, Watch, Mixins } from 'vue-property-decorator'
import { Component as VueComponent } from 'vue-tsx-support'
import { EChartOption } from 'echarts'
import {
    IChartProps,
    IBuildChart,
    IComponentOptions,
    IChildProps
} from '@/interface/Chart'
import MixinChart from '@/common/mixinChart.vue'

// 业务接口类型
interface ILineAreaObj {
    value?: number | string
    type?: string
    time?: string
}

const getLinearGradient = (color: string) => {
    return new window.echarts.graphic.LinearGradient(
        0,
        0,
        0,
        1,
        [
            {
                offset: 0.3,
                color: color
            },
            {
                offset: 1,
                color: 'rgba(24, 117, 240, 0.1)'
            }
        ],
        false
    )
}
const getSeriesObj = (
    name: string,
    color1: string,
    color2: string,
    data: Array<any>
) => {
    return {
        name,
        type: 'line',
        stack: 'count',
        areaStyle: {
            color: getLinearGradient(color2) as any
        },
        itemStyle: {
            normal: {
                color: color1
            }
        },
        symbol: 'circle',
        data,
        smooth: true
    }
}

const enum colors {
    blue1 = 'rgba(0, 170, 255, 1)',
    blue2 = 'rgba(0, 170, 255, 0.7)',
    orange1 = 'rgba(255, 157, 107, 1)',
    orange2 = 'rgba(255, 157, 107, 0.7)',
    red1 = 'rgba(255, 103, 103, 1)',
    red2 = 'rgba(255, 103, 103, 0.7)'
}

@Component({
    mixins: [MixinChart]
})
export default class LineAreaChart extends VueComponent<IChartProps>
    implements IBuildChart {
    @Prop({ default: 0 }) timeType?: number

    buildData(
        originData: Array<ILineAreaObj>,
        options: IComponentOptions
    ): Object {
        let seriesObjs: Array<EChartOption.SeriesLine> = []
        let categories: Array<any> = []
        let {
            gridLeft,
            gridRight,
            gridTop,
            gridBottom
        } = options.props as IChildProps
        let array1: any = []
        let array2: any = []
        let array3: any = []
        originData.forEach(item => {
            if (item.type === '省内') {
                this.timeType === 0 || this.timeType === 1
                    ? categories.push(item.time.slice(-8))
                    : categories.push(item.time)
                array1.push(item.value)
            } else if (item.type === '省外') {
                array2.push(item.value)
            } else if (item.type === '境外') {
                array3.push(item.value)
            }
        })
        seriesObjs = [
            getSeriesObj('省内', colors.blue1, colors.blue2, array1),
            getSeriesObj('省外', colors.red1, colors.red2, array2),
            getSeriesObj('境外', colors.orange1, colors.orange2, array3)
        ]

        let option: Object = {
            grid: {
                // 是否显示网格
                show: false,
                left: gridLeft || '20%',
                right: gridRight || '20%',
                bottom: gridBottom || '20%',
                top: gridTop || '20%'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'line'
                }
            },
            xAxis: [
                {
                    type: 'category',
                    data: categories,
                    boundaryGap: false,
                    axisLabel: {
                        show: true,
                        color: '#A2EEFF'
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#878787',
                            width: 2
                        }
                    },
                    axisTick: {
                        show: false
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    axisLabel: {
                        show: true,
                        color: '#A2EEFF'
                    },
                    splitNumber: 2,
                    axisLine: {
                        lineStyle: {
                            color: '#878787',
                            width: 2
                        }
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: '#939FB5',
                            width: 0.5
                        }
                    },
                    axisTick: {
                        show: false
                    }
                },
                {
                    type: 'value',
                    axisLabel: {
                        show: true,
                        color: '#EF9D33'
                    },
                    axisLine: {
                        lineStyle: {
                            color: 'rgba(239,157,51,.5)',
                            width: 2
                        }
                    },
                    splitNumber: 2,
                    splitLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    }
                }
            ],
            dataZoom: {
                type: 'inside'
            },
            series: seriesObjs,
            textStyle: {
                fontFamily: 'Microsoft YaHei',
                fontSize: '12'
            }
        }

        return option
    }
}
</script>
