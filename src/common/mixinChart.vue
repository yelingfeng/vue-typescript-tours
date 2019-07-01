<script lang="tsx">
import { Component, Mixins, Vue, Prop, Watch } from 'vue-property-decorator'
import { IComponentOptions } from '@/interface/Chart'
/**
 * 抽象Chart
 */
@Component
export default class MixinChart extends Vue {
    private EC: any
    private width: string = '100%'
    private height: string = '300px'

    @Prop()
    private readonly options!: IComponentOptions

    get chartStyle() {
        return {
            width: this.width,
            height: this.height
        }
    }

    render(h: any) {
        return <div style={this.chartStyle} ref="stacked" />
    }

    @Watch('options.renderData', { immediate: true, deep: true })
    dataRender<T>(newData: Array<T>, oldVal: Array<T>): void {
        if (newData && newData.length) {
            this.loadData(newData)
        }
    }

    created() {
        this.width = this.options.width as string
        this.height = this.options.height as string
    }

    mounted() {
        this.EC = window.echarts.init(this.$refs.stacked as HTMLDivElement)
    }
    loadData<T>(data: Array<T>) {
        let op = this.buildData(data || [], this.options)
        this.EC && this.EC.setOption(op)
    }

    buildData(data: Array<any>, options: Object) {}
}
</script>
