<template>
    <el-input
        v-model.number="value"
        type="number"
        :disabled="option.disabled"
        placeholder="请输入数字"
        :style="widthStyle"
    ></el-input>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class VtextNum extends Vue {
    @Prop() private option!: any

    private value = ''

    mounted() {
        this.value = this.option.value
    }

    get widthStyle() {
        return {
            width: this.option.width + 'px'
        }
    }

    getValue() {
        return { [this.option.id]: this.value }
    }
    setValue(val: any) {
        if (val) {
            this.value = val
        }
    }
}
</script>
<style></style>
