<template>
    <div :style="chartStyle" ref="stacked"></div>
</template>

<script>
const buildData = data => {
    let originData = data.map(item => {
        return {
            name: item.name,
            value: item.count || 0,
            dataObj: item
        }
    })
    let yRightData = []
    let yRightName = []
    let backData = []
    let yData = []
    originData.forEach((it, index) => {
        yRightName.push(it.name)
        yRightData.push(it.value)
        backData.push({ name: it.name, value: originData[0].value })
        yData.push(index + 1)
    })
    let rich = {
        red: {
            color: 'rgba(255,80,80,1)',
            fontSize: 10
        },
        orange: {
            color: 'rgba(255,157,107,1)',
            fontSize: 10
        },
        yellow: {
            color: 'rgba(218,210,106,1)',
            fontSize: 10
        },
        normal: {
            color: 'rgba(162,238,255,1)',
            fontSize: 10
        }
    }
    let option = {
        grid: {
            top: '10',
            left: '20',
            right: '50',
            bottom: '10'
        },
        tooltip: {
            show: true,
            textStyle: {
                fontSize: 12,
                fontFamily: 'Microsoft YaHei'
            },
            position: function(pos, params, dom, rect, size) {
                // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
                let obj = { top: 60 }
                obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5
                return obj
            },
            formatter(source) {
                if (source.data.dataObj) {
                    let { tipsText } = source.data.dataObj
                    return tipsText || source.data.value
                }
                return ''
            }
        },
        textStyle: {
            fontFamily: 'Microsoft YaHei',
            fontSize: '10'
        },
        series: [
            {
                type: 'bar',
                yAxisIndex: 1,
                barGap: '-100%',
                data: backData,
                barWidth: 12,
                barCategoryGap: 10,
                z: 0,
                itemStyle: {
                    normal: {
                        color: 'rgba(60,181,255,0.18)',
                        barBorderRadius: [0, 20, 20, 0]
                    }
                }
            },
            {
                type: 'bar',
                data: originData.reverse(),
                barWidth: 12,
                itemStyle: {
                    barBorderRadius: [0, 20, 20, 0],
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 1,
                        x2: 1,
                        y2: 0,
                        colorStops: [
                            {
                                offset: 0,
                                color: 'rgba(0,118,255,1)' // 0% 处的颜色
                            },
                            {
                                offset: 1,
                                color: 'rgba(0,196,255,1)' // 100% 处的颜色
                            }
                        ],
                        globalCoord: false // 缺省为 false
                    }
                },
                label: {
                    normal: {
                        show: false,
                        textBorderColor: '#fff'
                    }
                },
                z: 1
            }
        ],
        xAxis: [
            {
                type: 'value',
                axisLabel: {
                    show: false,
                    interval: 'auto',
                    textStyle: {
                        color: '#fff',
                        fontFamily: 'Microsoft YaHei',
                        fontSize: 10
                    }
                },
                axisLine: false,
                splitLine: {
                    show: false,
                    lineStyle: {
                        color: 'rgba(255,255,255,.3)',
                        width: 0.3
                    }
                },
                axisTick: { show: false },
                // boundaryGap: ['1%', '1%'],
                name: '',
                nameTextStyle: { color: '' }
            }
        ],
        yAxis: [
            {
                axisLabel: {
                    interval: 'auto',
                    align: 'right',
                    formatter: function(value) {
                        let str
                        if (value === '1') {
                            str = '{red|' + value + '}'
                        } else if (value === '2') {
                            str = '{orange|' + value + '}'
                        } else if (value === '3') {
                            str = '{yellow|' + value + '}'
                        } else {
                            str = '{normal|' + value + '}'
                        }
                        // let str = value.length > 6 ? value.substring(0, 6) + '...' : value
                        return str
                    },
                    textStyle: {
                        // color: 'rgba(162,238,255,1)',
                        // fontFamily: 'Microsoft YaHei',
                        fontSize: 10
                    },
                    rich: rich
                },
                position: 'left',
                offset: 0,
                data: yData.reverse(),
                axisLine: {
                    lineStyle: {
                        color: 'rgba(52,71,85,1)'
                    }
                },
                splitLine: false,
                axisTick: { show: false },
                boundaryGap: ['0%', '5%'],
                name: '',
                nameTextStyle: { color: '' }
            },
            {
                name: '',
                data: yRightData,
                nameLocation: 'start',
                nameTextStyle: {
                    fontWeight: 'bold'
                },
                position: 'right',
                offset: 0,
                inverse: true,
                axisLine: {
                    onZero: false,
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    interval: 0,
                    formatter: function(value) {
                        let maxLength = 16
                        let strlenght = 0
                        let length = 0
                        for (let i = 0; i < value.length; i++) {
                            if (strlenght < maxLength) {
                                length++
                                if (value.charCodeAt(i) > 128) {
                                    strlenght = strlenght + 2
                                } else {
                                    strlenght = strlenght + 1
                                }
                            }
                        }
                        let str =
                            value.length > length
                                ? value.substring(0, length) + '...'
                                : value
                        return str
                    },
                    textStyle: {
                        fontSize: 10,
                        color: 'rgba(162,238,255,1)'
                    }
                }
            },
            {
                name: '',
                data: yRightName,
                nameLocation: 'start',
                nameTextStyle: {
                    fontWeight: 'bold'
                },
                position: 'left',
                offset: -50,
                z: 2,
                inverse: true,
                axisLine: {
                    onZero: false,
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    interval: 0,
                    textStyle: {
                        fontSize: 10,
                        color: 'rgba(162,238,255,1)'
                    }
                }
            }
        ]
    }
    return option
}
export default {
    name: 'barChart',
    data() {
        return {
            width: 100,
            height: 100
        }
    },
    props: ['option', 'renderData'],
    computed: {
        chartStyle() {
            return {
                width: this.width,
                height: this.height
            }
        }
    },
    watch: {
        renderData(newVal) {
            this.loadData(newVal)
        },
        option: {
            deep: true,
            handler(newval) {
                if (newval.width && newval.height) {
                    this.width = newval.width
                    this.height = newval.height
                    this.$nextTick(() => {
                        this.resize()
                    })
                }
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
            if (data && data.length) {
                let op = buildData(data || {})
                this.EC.setOption(op)
            }
        },
        resize() {
            this.EC.resize()
        },
        resizeComp(newVal) {
            if (newVal) {
                this.width = newVal.width
                this.height = newVal.height
                this.$nextTick(() => {
                    this.EC.resize()
                })
            }
        },
        startLoading() {
            if (this.EC) {
                this.EC.showLoading('', {
                    text: 'loading',
                    color: '#00ccff',
                    textColor: '#fff',
                    maskColor: 'rgba(0, 0, 0, 0.3)',
                    zlevel: 0
                })
            }
        },
        endLoading() {
            if (this.EC) this.EC.hideLoading()
        }
    }
}
</script>
