<script lang="tsx">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class ContainerBox extends Vue {
    @Prop() title!: string
    @Prop({ default: false }) isMaxBox!: boolean
    @Prop({ default: true }) isHeader!: boolean

    render(h: any) {
        let titleContent
        if (this.isHeader) {
            titleContent = (
                <div class="containerBox__header">
                    <div class="containerBox__title">{this.title}</div>
                </div>
            )
        }

        let boxImageClass = [
            'containerBox',
            this.isMaxBox ? 'border02' : 'border01'
        ]

        return (
            <div class={boxImageClass}>
                <div class="containerBox__wrapper">
                    {titleContent}
                    <div class="containerBox__main">{this.$slots.default}</div>
                </div>
            </div>
        )
    }
}
</script>

<style lang="scss">
@import '@/styles/mixin.scss';

$borderImgWidth: 50px;
$borderImgHeight: 50px;
$headerHeight: 28px;

.containerBox {
    @include clearfix;
    width: 100%;
    height: 100%;
    // border: 1px solid #00c7ff;
    background-color: rgba(0, 199, 255, 0.1);
    position: relative;
    text-align: left;

    &__wrapper {
        width: 100%;
        height: 110%;
        position: absolute;
        top: -10px;
    }

    &__header {
        width: calc(100% + 20px);
        height: $headerHeight;
        line-height: $headerHeight;
        background: linear-gradient(
            -269deg,
            rgba(0, 187, 255, 0.25) 0%,
            rgba(0, 187, 255, 0.1) 100%
        );
        position: absolute;
        z-index: 10;
        left: -10px;
    }
    &__title {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        height: $headerHeight;
        width: 100%;
        padding-left: 15px;
        font-size: 12px;
        z-index: 11;
        color: #fff;
    }
    &__main {
        position: absolute;
        top: $headerHeight;
        width: 100%;
        height: calc(100% - #{$headerHeight});
    }
}

.border01 {
    border: 10px solid;
    border-image-source: url('./../assets/images/containerBox/borderImg01.png');
    border-image-slice: 28;
    border-image-repeat: stretch;
}

.border02 {
    border: 10px solid;
    border-image-source: url('./../assets/images/containerBox/borderImg02.png');
    border-image-slice: 28;
    border-image-repeat: stretch;
}
</style>
