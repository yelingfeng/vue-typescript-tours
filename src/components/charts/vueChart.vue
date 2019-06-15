<template>
    <div :style="chartStyle" ref="chart"></div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import echarts, { ECharts, EChartOption } from 'echarts'

import 'echarts/map/js/china'

@Component
export default class vueEcharts extends Vue {
    @Prop() private options?: any
    private width: string = '600'
    private height: string = '300'
    private EC: echarts.ECharts | undefined

    created() {
        this.width = this.options.width
        this.height = this.options.height
    }

    mounted() {
        this.EC = echarts.init(this.$refs.chart as HTMLCanvasElement)
    }

    build(option: any) {
        if (this.EC && option) {
            try {
                this.EC.clear()
                this.EC.setOption(option)
            } catch (e) {
                console.error(e)
            }
        }
    }
    resizeComp(newVal: any) {
        if (newVal) {
            this.width = newVal.width
            this.height = newVal.height
            this.$nextTick(() => {
                // this.EC.resize() VS code 会报错
                let EC: any = this.EC
                EC.resize()
            })
        }
    }

    beforeDestory() {
        if (this.EC) {
            this.EC.dispose()
        }
    }

    get chartStyle() {
        let width =
            this.width.substr(this.width.length - 1) === '%'
                ? this.width
                : this.width + 'px'
        let height =
            this.height.substr(this.height.length - 1) === '%'
                ? this.height
                : this.height + 'px'
        return {
            width,
            height
        }
    }
}
</script>

<style></style>
