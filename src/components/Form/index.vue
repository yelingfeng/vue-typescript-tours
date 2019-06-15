<script lang="tsx">
import { CreateElement } from 'vue'
import { Component, Prop, Vue } from 'vue-property-decorator'
import buttonComp from '@/components/Form/button.vue'
import checkBoxComp from '@/components/Form/checkbox.vue'
import textComp from '@/components/Form/text.vue'
import textNumberComp from '@/components/Form/textNumber.vue'
import dateComp from '@/components/Form/date.vue'
import selectComp from '@/components/Form/select.vue'
import radioComp from '@/components/Form/radio.vue'
import switchComp from '@/components/Form/switch.vue'
import { cloneDeeps, isFunction, isArray, assigns } from '@/utils/lib'

@Component({
    components: {
        buttonComp,
        checkBoxComp,
        textComp,
        textNumberComp,
        dateComp,
        selectComp,
        radioComp,
        switchComp
    }
})
export default class Vform extends Vue {
    @Prop() private option!: any

    // data
    private wrapIndex: any = []
    private btnIndex: any = []
    private labelPos = ''
    private items = []
    private labelWidth = ''
    private sliderUp = false
    private temArray = []

    // computed
    get formOpt() {
        return this.option
    }
    get sliderClass() {
        return !this.sliderUp
            ? 'slider-up el-icon-caret-bottom'
            : 'slider-up el-icon-caret-top'
    }
    get btnsStyle() {
        let r = 10
        if (this.formOpt.canSlider) {
            r = 60
        }
        return {
            right: r + 'px'
        }
    }

    // created
    created() {
        if (this.option.canSlider && this.option.items.length >= 3) {
            this.option.items.map((item: any, index: any) => {
                if (item.wrap) {
                    this.wrapIndex.push(index)
                }
                if (item.type === 'button') {
                    this.btnIndex.push(index)
                }
            })
            this.slider()
        }
    }

    // mounted
    mounted() {
        this.labelPos = this.option.labelPos || 'right'
        this.items = cloneDeeps(this.formOpt.items) || []
        if (this.option.labelWidth) {
            this.labelWidth = this.option.labelWidth + 'px'
        }
    }

    // methods
    getValue() {
        let me = this
        let returnData = {}
        me.formOpt.items.forEach((it: any, index: number) => {
            if (it.show === undefined || it.show) {
                if (me.$refs['comp' + index]) {
                    let vm: any = me.$refs['comp' + index]
                    if (isFunction(vm.getValue)) {
                        assigns(returnData, vm.getValue())
                    }
                }
            }
        })
        return returnData
    }
    // data: [{id: 'text1', value: '22'},{id: 'checkbox1', value: ['1', '2']}]
    setValue(data: any) {
        let me = this
        this.formOpt.items.forEach((it: any, index: number) => {
            data.forEach((d: any) => {
                if (it.comOpt.id === d.id) {
                    me.$nextTick(() => {
                        let ref: any = me.$refs['comp' + index]
                        ref.setValue(d.value)
                    })
                }
            })
        })
    }
    // 清空value
    clearValue() {
        this.formOpt.items.forEach((it: any, index: number) => {
            let vm: any = this.$refs['comp' + index]
            if (vm && isFunction(vm.setValue)) {
                vm.setValue('')
            }
        })
    }
    // 获得当前form容器的高度
    getContainerHeight() {
        return $(this.$el).outerHeight(true)
    }
    setItemData(id: any, data: any) {
        let me = this
        this.formOpt.items.forEach((it: any) => {
            if (it.comOpt.id === id) {
                it.comOpt.data = data
            }
        })
    }
    setShow(data: any) {
        let me = this
        this.formOpt.items.forEach((item: any) => {
            data.forEach((d: any) => {
                if (item.comOpt.id === d.id) {
                    item.comOpt.show = d.value
                }
            })
        })
    }
    // 设置form元素item属性
    setOtherAttribute(id: any, attr: any, data: any) {
        let me = this
        this.formOpt.items.forEach((it: any) => {
            if (it.comOpt.id === id) {
                it.comOpt[attr] = data
            }
        })
    }
    slider() {
        const LEN = this.formOpt.items.length
        let btnLen = this.btnIndex.length
        let INDEX = this.wrapIndex[0] + 1
        if (this.sliderUp) {
            this.temArray = this.formOpt.items.slice(INDEX, LEN - btnLen)
            this.formOpt.items.splice(INDEX, LEN - INDEX - btnLen)
            this.formOpt.items[INDEX - 1].wrap = false
        } else {
            this.formOpt.items.splice(INDEX, 0, ...this.temArray)
            this.formOpt.items[INDEX - 1].wrap = true
        }
        this.sliderUp = !this.sliderUp
        this.$nextTick(() => {
            this.$emit('formSlideChange', this.sliderUp)
        })
    }

    render(h: CreateElement) {
        let elItems, elBtns
        let elSlider
        let me = this
        let br = <br />
        elItems = me.formOpt.items.map((it: any, index: number) => {
            let comp
            let ref = 'comp' + index
            switch (it.type) {
                case 'text':
                    comp = <textComp option={it.comOpt} ref={ref} />
                    break
                case 'textNumber':
                    comp = <textNumberComp option={it.comOpt} ref={ref} />
                    break
                case 'date':
                    comp = <dateComp option={it.comOpt} ref={ref} />
                    break
                case 'select':
                    comp = <selectComp option={it.comOpt} ref={ref} />
                    break
                case 'radio':
                    comp = <radioComp option={it.comOpt} ref={ref} />
                    break
                case 'checkbox':
                    comp = <checkBoxComp option={it.comOpt} ref={ref} />
                    break
                case 'switch':
                    comp = <switchComp option={it.comOpt} ref={ref} />
                    break
                case 'keyWord':
                    comp = <keywordComp option={it.comOpt} ref={ref} />
                    break
                case 'keyWordSelect':
                    comp = <keywordSelectComp option={it.comOpt} ref={ref} />
                    break
                case 'keyWordAuto':
                    comp = <keywordAutoComp option={it.comOpt} ref={ref} />
                    break
                case 'button':
                    comp = <buttonComp option={it.comOpt} ref={ref} />
                    break
                case 'autoCompletet':
                    comp = <autoCompleteComp option={it.comOpt} ref={ref} />
                    break
                default:
                    break
            }
            let formBox
            let required
            let divarrow
            if (it.comOpt.show === undefined || it.comOpt.show) {
                if (it.required) {
                    required = <span class="rormRequired">*</span>
                }
                if (
                    it.type === 'text' ||
                    it.type === 'date' ||
                    it.type === 'autoCompletet'
                ) {
                    divarrow = (
                        <div class="formArrow">
                            <span class="arrowLeftTop" />
                            <span class="arrowRightBottom" />
                        </div>
                    )
                }
                formBox = (
                    <el-form-item label={it.label}>
                        {comp}
                        {divarrow} {required}
                    </el-form-item>
                )
            }
            if (it.wrap) {
                return (
                    <span>
                        {formBox} {br}
                    </span>
                )
            }
            return formBox
        })
        if (me.formOpt.btns && isArray(me.formOpt.btns)) {
            elBtns = me.formOpt.btns.map((it: any, index: any) => {
                let comp, formBox
                let ref = 'btn' + index
                comp = <buttonComp option={it.comOpt} ref={ref} />
                if (it.comOpt.show === undefined || it.comOpt.show) {
                    formBox = (
                        <el-form-item label={it.label}>{comp}</el-form-item>
                    )
                }
                if (it.wrap) {
                    return (
                        <span>
                            {formBox} {br}
                        </span>
                    )
                }
                return formBox
            })
            if (this.formOpt.btnPos === 'right') {
                elBtns = (
                    <div class="formBtns" style={this.btnsStyle}>
                        {elBtns}
                    </div>
                )
            }
        }
        elSlider = me.formOpt.canSlider ? (
            <i class={this.sliderClass} onClick={this.slider} />
        ) : (
            ''
        )
        return (
            <div class="form">
                {elSlider}
                <el-form
                    inline={this.formOpt.inline}
                    label-position={this.labelPos}
                    label-width={this.labelWidth}
                    ref="form"
                >
                    {elItems}
                    {elBtns}
                </el-form>
            </div>
        )
    }
}
</script>
