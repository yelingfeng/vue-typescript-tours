<script lang="tsx">
import { Component } from 'vue-property-decorator'
import { Component as VueComponent } from 'vue-tsx-support'
import ContainerBox from '@/components/containerBox.vue'
import LineAreaChart from '@/components/dashboard/lineAreaChart.vue'
interface lineOptions {
    width?: string
    height?: string
    props?: Object
    renderData?: Array<Object>
}
import StackedChart from '@/components/dashboard/stackedChart.vue'
import GraphChart from '@/components/dashboard/graphChart.vue'
import BarCom from '@/components/dashboard/barCom.vue'
import TrajectoryCom from '@/components/dashboard/trajectoryCom.vue'
import {
    getLeftTopLineArea,
    getGraphChartData,
    getBarChartData,
    getTrajectoryData,
    getZLdata
} from '@/api/dashboard'
@Component
export default class ContentMain extends VueComponent<{}> {
    toursLineOpt: lineOptions = {
        width: '100%',
        height: '150px',
        props: {
            gridLeft: 80,
            gridTop: 15,
            gridRight: 40,
            gridBottom: 8
        },
        renderData: Object.create(null)
    }
    toursLineData: Array<Object> = []
    sevenlineData: Array<Object> = []
    graphChartData: Object = {}
    barChartData: Array<Object> = []
    trajectoryData: Array<Object> = []
    tableData: Array<Object> = []

    get tableHeight() {
        return {
            height: 150
        }
    }

    mounted() {
        getLeftTopLineArea().then(resp => {
            const { data } = resp
            this.toursLineData = data
            this.toursLineOpt.renderData = data
        })
        // this.toursLineData = allUserData

        getGraphChartData().then(resp => {
            const { data } = resp
            this.graphChartData = data
        })

        getBarChartData().then(resp => {
            const { data } = resp
            this.barChartData = data
        })

        getTrajectoryData().then(resp => {
            const { data } = resp
            this.trajectoryData = data
        })

        getZLdata().then(resp => {
            let { data } = resp
            data.forEach((item: any, index: number) => {
                item.index = index + 1
            })
            this.tableData = data
        })
    }

    render(h: any) {
        return (
            <div class="container">
                <div class="container__leftPart">
                    <div class="container__minBox">
                        <ContainerBox name="24小时旅游变化趋势">
                            <LineAreaChart
                                width="300px"
                                height="300px"
                                options={this.toursLineOpt}
                            />
                        </ContainerBox>
                    </div>
                    <div class="container__minBox">
                        <ContainerBox name="景区驻留游客排行" />
                    </div>
                    <div class="container__minBox lastBox">
                        <ContainerBox name="近7天游客变化趋势" />
                    </div>
                </div>
                <div class="container__middlePart">
                    <div class="container__centerBox">
                        <ContainerBox clsName="border02" isHeader={false} />
                    </div>
                </div>
                <div class="container__rightPart">
                    <div class="container__minCol">
                        <div class="container__minBox">
                            <ContainerBox name="外省游客TOP5">
                                <BarCom
                                    ref="barChart"
                                    barType="省份排名"
                                    renderData={this.barChartData}
                                />
                            </ContainerBox>
                        </div>
                        <div class="container__minBox">
                            <ContainerBox name="出行方式分析">
                                <GraphChart
                                    ref="graphChart"
                                    option={this.toursLineOpt}
                                    renderData={this.graphChartData}
                                />
                            </ContainerBox>
                        </div>
                        <div class="container__minBox lastBox">
                            <ContainerBox name="出行方式分析" />
                        </div>
                    </div>
                    <div class="container__minCol">
                        <div class="container__minBox">
                            <ContainerBox name="境外游客TOP5">
                                <BarCom
                                    ref="barChart"
                                    barType="境外排名"
                                    renderData={this.barChartData}
                                />
                            </ContainerBox>
                        </div>
                        <div class="container__minBox">
                            <ContainerBox name="出行方式分析">
                                <TrajectoryCom
                                    ref="trajectoryCom"
                                    renderData={this.trajectoryData}
                                />
                            </ContainerBox>
                        </div>
                        <div class="container__minBox lastBox">
                            <ContainerBox name="出行方式分析" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
</script>

<style lang="scss" scope>
@import '@/styles/mixin.scss';
.container {
    @include clearfix;
    width: 100%;
    height: 100%;
    display: flex;
    padding: 20px 10px;
    flex-direction: row;
    align-items: flex-end;

    &__leftPart {
        height: 100%;
        display: flex;
        flex-direction: column;
        width: 25%;
    }

    &__middlePart {
        height: 100%;
        display: flex;
        flex-direction: column;
        width: 40%;
    }

    &__rightPart {
        height: 100%;
        display: flex;
        flex-direction: row;
        width: 35%;
    }

    &__minBox {
        height: 33%;
        margin: 0 3px 10px;
        position: relative;

        &.lastBox {
            height: calc(33% - 20px);
        }
    }

    &__minCol {
        height: 100%;
        width: 50%;
        display: flex;
        flex-direction: column;
        position: relative;
    }

    &__centerBox {
        height: 100%;
        margin: 0 4px 4px;
    }
    &__tableWrap {
        margin-top: 6px;
    }
}
</style>
