<script lang="tsx">
import { Component, Prop } from 'vue-property-decorator'
import { Component as VueComponent } from 'vue-tsx-support'

interface IProps {
    name?: string
    clsName?: string
    isHeader?: boolean
}
@Component
export default class ContainerBox extends VueComponent<IProps> {
    @Prop({ default: '', type: String }) name!: string
    @Prop({ default: 'border01', type: String }) clsName!: string
    @Prop({ default: true, type: Boolean }) isHeader!: boolean
    render(h: any) {
        let titleContent
        if (this.isHeader) {
            titleContent = (
                <div class="containerBox__header">
                    <div class="containerBox__title">{this.name}</div>
                </div>
            )
        }

        let boxImageClass = ['containerBox', this.clsName]

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
