<template>
    <div class="barCom">
        <p>{{ barType }}</p>
        <p class="barCom__numCount">人数</p>
        <div
            v-for="(item, index) in renderData"
            class="barCom__container"
            :key="index"
        >
            <div class="barCom__index" :c="index" ref="barIndex">
                {{ index + 1 }}
            </div>
            <div class="barCom__back" ref="backBar">
                <div class="barCom__bar" :w="item.count" ref="lightBar">
                    {{ item.name }}
                </div>
            </div>
            <div class="barCom__count">{{ item.count }}</div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class BarCom extends Vue {
    @Prop() private barType!: string
    @Prop() private renderData!: any

    updated() {
        this.$nextTick(function() {
            this.barStyle()
        })
    }

    get baseWidth() {
        if (this.renderData && this.renderData.length !== 0) {
            return this.renderData[0].count
        }
        return 5
    }

    barStyle() {
        let bar: any = this.$refs.lightBar
        let baseWidth = this.baseWidth
        if (bar) {
            bar.forEach((item: any) => {
                let width = item.getAttribute('w')
                let per = (width / baseWidth) * 100
                item.style.width = `calc(${per}%)`
            })
        }
        let index: any = this.$refs.barIndex
        if (index) {
            index.forEach((item: any) => {
                let c = item.getAttribute('c')
                let color = 'rgba(162, 238, 255, 1)'
                switch (c) {
                    case '0':
                        color = 'rgba(255,80,80,1)'
                        break
                    case '1':
                        color = 'rgba(255,157,107,1)'
                        break
                    case '2':
                        color = 'rgba(218,210,106,1)'
                        break
                    default:
                        color = 'rgba(162, 238, 255, 1)'
                        break
                }
                item.style.color = color
            })
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
.barCom {
    width: 100%;
    height: 100%;
    padding-bottom: 5px;
    display: flex;
    flex-flow: column;
    justify-content: space-between;
    color: $font-color;
    font-size: $sml-size;
    position: relative;
    p {
        margin-top: 2px;
    }
    &__numCount {
        position: absolute;
        top: 0;
        right: 14px;
    }
    &__container {
        height: 25px;
        line-height: 25px;
        display: flex;
        border: 1px solid $border-color;
        border-radius: 3px;
    }
    &__index {
        width: 25px;
        text-align: center;
    }
    &__back {
        width: calc(100% - 75px);
        border-radius: 4px;
        // background-image: linear-gradient(
        //     90deg,
        //     $border-color 0%,
        //     rgba(24, 105, 134, 0.2) 100%
        // );
        background: rgba(24, 105, 134, 0.2);
    }
    &__bar {
        padding-left: 6px;
        margin-right: 10px;
        min-width: 5px;
        margin-top: -1px;
        height: 25px;
        border-radius: 0 4px 4px 0;
        background-image: linear-gradient(
            90deg,
            rgba(0, 118, 255, 1) 0%,
            rgba(0, 196, 255, 1) 100%
        );
        transition: width 1s;
        -moz-transition: width 1s; /* Firefox 4 */
        -webkit-transition: width 1s; /* Safari and Chrome */
        -o-transition: width 1s; /* Opera */
    }
    &__count {
        padding: 0 6px;
        width: 50px;
        text-align: center;
        text-overflow: ellipsis;
        overflow: hidden;
    }
}
</style>
