<template>
    <div class="trajectoryCom">
        <div class="trajectoryCom__header">
            <p class="trajectoryCom__index">排名</p>
            <p class="trajectoryCom__route">路线</p>
            <p class="trajectoryCom__count">热度</p>
        </div>
        <div
            v-for="(item, index) in renderData"
            class="trajectoryCom__container"
            :key="index"
        >
            <div class="trajectoryCom__index" ref="barIndex"></div>
            <div class="trajectoryCom__back" ref="backBar">
                <span v-text="item.source" class="trajectoryCom__name"></span>
                <i class="trajectoryCom__icon el-icon-right"></i>
                <span v-text="item.target" class="trajectoryCom__name"></span>
            </div>
            <div class="trajectoryCom__count">{{ item.value }}</div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class trajectoryCom extends Vue {
    @Prop() private renderData!: any
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
.trajectoryCom {
    width: 100%;
    height: 100%;
    padding-bottom: 5px;
    display: flex;
    flex-flow: column;
    justify-content: space-between;
    color: $font-color;
    font-size: $sml-size;
    position: relative;
    &__header {
        display: flex;
        text-align: center;
    }
    &__route {
        width: calc(100% - 75px);
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
        background-image: linear-gradient(
            90deg,
            rgba(0, 118, 255, 0.5) 0%,
            rgba(0, 196, 255, 0.5) 100%
        );
        // background: rgba(24, 105, 134, 0.2);
    }
    &__name {
        width: calc(50% - 10px);
        display: inline-block;
        text-align: center;
    }
    &__icon {
        color: $main-color;
        width: 20px;
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
