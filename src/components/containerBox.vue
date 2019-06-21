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

<style lang="scss"></style>
