<template>
    <el-radio-group
        v-model="value"
        :disabled="option.disabled"
        @change="changeHandler"
    >
        <el-radio
            v-for="item in option.data"
            :key="item.name"
            :label="item.value"
            >{{ item.name }}</el-radio
        >
    </el-radio-group>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { isFunction } from '@/utils/lib'

@Component
export default class Vradio extends Vue {
    @Prop() private option!: any

    private value = ''

    mounted() {
        this.value = this.option.value
    }

    changeHandler(value: any) {
        if (this.option.change && isFunction(this.option.change)) {
            this.option.change(value)
        }
    }
    getValue() {
        return { [this.option.id]: this.value }
    }
    setValue(val: any) {
        if (val !== undefined) {
            this.value = val
        }
    }
}
</script>
<style></style>
