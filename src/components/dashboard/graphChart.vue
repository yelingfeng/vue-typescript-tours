<template>
    <div :style="chartStyle" ref="stacked"></div>
</template>

<script>
const buildData = data => {
    let colors = [
        '#E5C905',
        '#67CCFF',
        '#855CFE',
        '#FE868E',
        '#4c55b0',
        '#cf83f4',
        '#e6af15',
        '#00e3f3',
        '#6b81e1',
        '#00fbae'
    ]
    if (data.node) {
        data.node.forEach((node, index) => {
            let i = index % 10
            let size =
                (node.value / data.node[0].value) * 10 > 3
                    ? (node.value / data.node[0].value) * 10
                    : 3
            node.itemStyle = { color: colors[i] }
            node.symbolSize = size
            node.label = {
                normal: {
                    show: true,
                    fontSzie: 10,
                    color: '#fff'
                }
            }
        })
    }
    let option = {
        tooltip: {},
        animationDurationUpdate: 1500,
        animationEasingUpdate: 'quinticInOut',
        series: [
            {
                name: '',
                type: 'graph',
                layout: 'circular',
                circular: {
                    rotateLabel: true
                },
                data: data.node,
                links: data.link,
                categories: data.node,
                roam: true,
                label: {
                    normal: {
                        position: 'right',
                        formatter: '{b}'
                    }
                },
                lineStyle: {
                    normal: {
                        color: 'source',
                        curveness: 0.3
                    }
                },
                top: '30%',
                bottom: '30%'
            }
        ]
    }
    return option
}
export default {
    name: 'graphChart',
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
            if (data) {
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
