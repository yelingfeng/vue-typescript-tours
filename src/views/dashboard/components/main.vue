<script lang="tsx">
import { Component } from 'vue-property-decorator'
import { Component as VueComponent } from 'vue-tsx-support'
import Box from '@/components/containerBox.vue'
import StackedChart from '@/components/dashboard/stackedChart.vue'
import GraphChart from '@/components/dashboard/graphChart.vue'
import BarCom from '@/components/dashboard/barCom.vue'
import {
    getLeftTopLineArea,
    getGraphChartData,
    getBarChartData
} from '@/api/dashboard'
@Component
export default class ContentMain extends VueComponent<{}> {
    toursLineOpt: Object = {
        width: '100%',
        height: '150px',
        props: {
            gridLeft: 80,
            gridTop: 15,
            gridRight: 40,
            gridBottom: 8
        }
    }
    toursLineData: Array<Object> = []
    sevenlineData: Array<Object> = []
    graphChartData: Object = {}
    barChartData: Array<Object> = []

    mounted() {
        getLeftTopLineArea().then(resp => {
            console.log(resp)
            const { data } = resp
            this.toursLineData = data
            this.sevenlineData = data
        })

        getGraphChartData().then(resp => {
            const { data } = resp
            this.graphChartData = data
        })

        getBarChartData().then(resp => {
            const { data } = resp
            this.barChartData = data
        })
    }

    render(h: any) {
        return (
            <div class="container">
                <div class="container__leftPart">
                    <div class="container__minBox">
                        <Box title="24小时旅游变化趋势">
                            <StackedChart
                                ref="toursLine"
                                option={this.toursLineOpt}
                                renderData={this.toursLineData}
                            />
                        </Box>
                    </div>
                    <div class="container__minBox">
                        <Box title="景区驻留游客排行" />
                    </div>
                    <div class="container__minBox lastBox">
                        <Box title="近7天游客变化趋势">
                            <StackedChart
                                ref="toursLine2"
                                option={this.toursLineOpt}
                                renderData={this.sevenlineData}
                            />
                        </Box>
                    </div>
                </div>
                <div class="container__middlePart">
                    <div class="container__centerBox">
                        <Box cls="border02" isHeader="false" />
                    </div>
                </div>
                <div class="container__rightPart">
                    <div class="container__minCol">
                        <div class="container__minBox">
                            <Box title="外省游客TOP5">
                                <BarCom
                                    ref="barChart"
                                    barType="省份排名"
                                    renderData={this.barChartData}
                                />
                            </Box>
                        </div>
                        <div class="container__minBox">
                            <Box title="出行方式分析">
                                <GraphChart
                                    ref="graphChart"
                                    option={this.toursLineOpt}
                                    renderData={this.graphChartData}
                                />
                            </Box>
                        </div>
                        <div class="container__minBox lastBox">
                            <Box title="出行方式分析" />
                        </div>
                    </div>
                    <div class="container__minCol">
                        <div class="container__minBox">
                            <Box title="境外游客TOP5">
                                <BarCom
                                    ref="barChart"
                                    barType="境外排名"
                                    renderData={this.barChartData}
                                />
                            </Box>
                        </div>
                        <div class="container__minBox">
                            <Box title="出行方式分析" />
                        </div>
                        <div class="container__minBox lastBox">
                            <Box title="出行方式分析" />
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
}
</style>
