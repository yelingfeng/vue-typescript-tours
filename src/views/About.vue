<template>
    <div class="about">
        <el-button type="primary" @click="changeStyle">改变图表大小</el-button>
        <vueChart ref="line" :options="lineChartStyle"></vueChart>
        <vueChart ref="pie" :options="chartStyle"></vueChart>
        <vueChart ref="map" :options="chartStyle"></vueChart>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import vueChart from '@/components/charts/vueChart.vue'
import {
    getLineOption,
    getPieOption,
    getMapOption
} from '@/utils/setChartsOption.ts'
@Component({
    components: { vueChart }
})
export default class Home extends Vue {
    lineChartStyle: Object = {
        width: '100%',
        height: '300'
    }
    chartStyle: Object = {
        width: '700',
        height: '400'
    }

    mounted() {
        this.init()
    }

    init() {
        let lineEl: any = this.$refs.line
        let lineOption = getLineOption()
        lineEl.build(lineOption)

        let pieEl: any = this.$refs.pie
        let pieOption = getPieOption()
        pieEl.build(pieOption)

        let mapEl: any = this.$refs.map
        let mapOption = getMapOption()
        mapEl.build(mapOption)
    }

    changeStyle() {
        let sizeObj = {
            width: '500',
            height: '300'
        }
        let lineEl: any = this.$refs.line
        lineEl.resizeComp(sizeObj)
    }
}
</script>
