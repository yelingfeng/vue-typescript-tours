<template>
    <div class="container">
        <div class="container__leftPart">
            <div class="container__minBox">
                <containerBox title="24小时旅游变化趋势">
                    <lineArea
                        ref="toursLine"
                        :option="toursLineOpt"
                        :renderData="toursLineData"
                    ></lineArea>
                </containerBox>
            </div>
            <div class="container__minBox">
                <containerBox title="景区驻留游客排行"></containerBox>
            </div>
            <div class="container__minBox lastBox">
                <containerBox title="近7天游客变化趋势">
                    <lineArea
                        ref="toursLine2"
                        :option="toursLineOpt"
                        :renderData="sevenlineData"
                    ></lineArea>
                </containerBox>
            </div>
        </div>
        <div class="container__middlePart">
            <div class="container__centerBox">
                <containerBox :isMaxBox="true" :isHeader="false"></containerBox>
            </div>
        </div>
        <div class="container__rightPart">
            <div class="container__minCol">
                <div class="container__minBox">
                    <containerBox title="外省游客TOP5"></containerBox>
                </div>
                <div class="container__minBox">
                    <containerBox title="出行方式分析"></containerBox>
                </div>
                <div class="container__minBox lastBox">
                    <containerBox title="出行方式分析"></containerBox>
                </div>
            </div>
            <div class="container__minCol">
                <div class="container__minBox">
                    <containerBox title="境外游客TOP5"></containerBox>
                </div>
                <div class="container__minBox">
                    <containerBox title="出行方式分析"></containerBox>
                </div>
                <div class="container__minBox lastBox">
                    <containerBox title="出行方式分析"></containerBox>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import containerBox from '@/components/containerBox.vue'
import lineArea from '@/components/dashboard/stackedChart.vue'
import { getLeftTopLineArea } from '@/api/dashboard'
@Component({
    components: { containerBox, lineArea }
})
export default class ContentMain extends Vue {
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

    mounted() {
        getLeftTopLineArea().then(resp => {
            console.log(resp)
            const { data } = resp
            this.toursLineData = data
            this.sevenlineData = data
        })

        // this.toursLineData = allUserData
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
