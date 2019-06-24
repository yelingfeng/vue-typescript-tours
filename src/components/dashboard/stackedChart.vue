<template>
    <div :style="chartStyle" ref="stacked"></div>
</template>

<script>
const buildData = (data, props, timeType) => {
    let seriesObjs = []
    let categories = []
    let colors = {
        blue: ['rgba(0, 170, 255, 1)', 'rgba(0, 170, 255, 0.7)'],
        orange: ['rgba(255, 157, 107, 1)', 'rgba(255, 157, 107, 0.7)'],
        red: ['rgba(255, 103, 103, 1)', 'rgba(255, 103, 103, 0.7)']
    }
    // let color = ['#36DF7A', '#30ABE4', '#E2BD38'];
    let { gridLeft, gridRight, gridTop, gridBottom } = props
    seriesObjs = [
        {
            name: '省内',
            type: 'line',
            stack: 'count',
            areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(
                        0,
                        0,
                        0,
                        1,
                        [
                            {
                                offset: 0.3,
                                color: colors.blue[1]
                            },
                            {
                                offset: 1,
                                color: 'rgba(24, 117, 240, 0.1)'
                            }
                        ],
                        false
                    )
                }
            },
            itemStyle: {
                normal: {
                    color: colors.blue[0]
                }
            },
            symbol: 'circle',
            data: [],
            barGap: 0,
            smooth: true,
            barCategoryGap: 0
        },
        {
            name: '省外',
            type: 'line',
            stack: 'count',
            areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(
                        0,
                        0,
                        0,
                        1,
                        [
                            {
                                offset: 0.3,
                                color: colors.red[1]
                            },
                            {
                                offset: 1,
                                color: 'rgba(24, 117, 240, 0.1)'
                            }
                        ],
                        false
                    )
                }
            },
            itemStyle: {
                normal: {
                    color: colors.red[0]
                }
            },
            data: [],
            symbol: 'circle',
            barGap: 0,
            smooth: true,
            barCategoryGap: 0
        },
        {
            name: '境外',
            type: 'line',
            yAxisIndex: 1,
            areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(
                        0,
                        0,
                        0,
                        1,
                        [
                            {
                                offset: 0.3,
                                color: colors.orange[1]
                            },
                            {
                                offset: 1,
                                color: 'rgba(24, 117, 240, 0.1)'
                            }
                        ],
                        false
                    )
                }
            },
            itemStyle: {
                normal: {
                    color: colors.orange[0]
                }
            },
            symbol: 'circle',
            smooth: true,
            data: []
        }
    ]
    data.forEach(item => {
        if (item.type === '省内') {
            timeType === 0 || timeType === 1
                ? categories.push(item.time.slice(-8))
                : categories.push(item.time)
            seriesObjs[0].data.push(item.value)
        } else if (item.type === '省外') {
            seriesObjs[1].data.push(item.value)
        } else if (item.type === '境外') {
            seriesObjs[2].data.push(item.value)
        }
    })
    let option = {
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
        series: seriesObjs
    }
    option.textStyle = {
        fontFamily: 'Microsoft YaHei',
        fontSize: '12'
    }
    return option
}
export default {
    name: 'stacked',
    props: ['option', 'renderData'],
    data() {
        return {
            width: '100%',
            height: '300px'
        }
    },
    computed: {
        chartStyle() {
            return {
                width: this.width,
                height: this.option.height
            }
        }
    },
    watch: {
        renderData(newVal) {
            if (newVal && newVal.length) {
                this.loadData(newVal)
            }
        }
    },
    created() {
        this.width = this.option.width
        this.height = this.option.height
    },
    mounted() {
        this.initChart()
        this.loadData(this.renderData)
    },
    methods: {
        initChart() {
            this.EC = echarts.init(this.$el)
        },
        loadData(data) {
            let op = buildData(
                data || [],
                this.option.props,
                this.option.timeType
            )
            this.EC.setOption(op)
        },
        resize() {
            this.EC.resize()
        }
    }
}
</script>

<style></style>
