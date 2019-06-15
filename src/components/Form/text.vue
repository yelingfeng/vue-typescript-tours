<template>
    <el-input
        v-model="value"
        :disabled="option.disabled"
        :placeholder="placeholder"
        auto-complete="on"
        :style="widthStyle"
        :type="option.iptType"
        :rows="option.rows"
        @change="changeEvent"
    ></el-input>
</template>
<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator'
import { isFunction } from '@/utils/lib'
@Component
export default class vtext extends Vue {
    @Prop() private option!: any

    private value = ''
    private placeholder = ''

    // watch
    @Watch('option.value', { immediate: true, deep: true })
    optionValueChange(newVal: string) {
        this.value = newVal
    }

    @Watch('option.placeholder', { immediate: true, deep: true })
    optionPlaceholderChange(newVal: string) {
        this.value = newVal
    }

    // mounted
    mounted() {
        this.value = this.option.value
        this.placeholder = this.option.placeholder
            ? this.option.placeholder
            : '请输入内容'
    }

    // computed
    get widthStyle() {
        return {
            width: this.option.width + 'px'
        }
    }

    // methods
    getValue() {
        return { [this.option.id]: this.value || '' }
    }
    setValue(val: any) {
        this.value = val
    }
    changeEvent(val: any) {
        if (this.option.changeEvent && isFunction(this.option.changeEvent)) {
            this.option.changeEvent(val)
        }
    }
}
</script>
<style></style>
