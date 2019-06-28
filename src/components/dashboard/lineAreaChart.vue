<script lang="tsx">
import { Component, Prop, Watch } from 'vue-property-decorator'
import { Component as VueComponent } from 'vue-tsx-support'
interface IProps {
    width?: string
    heigth?: string
    renderData?: Array<Object>
    options?: Object
}
@Component
export default class LineAreaChart extends VueComponent<IProps> {
    private EC: any
    @Prop({ default: '100%', type: String }) width!: string
    @Prop({ default: '300px', type: String }) height!: string
    @Prop() options!: Object

    get chartStyle() {
        return {
            width: this.width,
            height: this.height
        }
    }

    @Watch('options.renderData', { immediate: true, deep: true })
    dataRender(newData: Array<Object>, oldVal: Array<Object>): void {
        if (newData && newData.length) {
            this.loadData(newData)
        }
    }

    mounted() {
        this.EC = window.echarts.init(this.$refs.stacked as HTMLDivElement)
    }

    loadData(data: Array<Object>) {
        let op = this.buildData(data || [])
        this.EC.setOption(op)
    }

    buildData(data: Array<Object>) {
        console.log(data)
        return {}
    }

    render(h: any) {
        return <div style={this.chartStyle} ref="stacked" />
    }
}
</script>
