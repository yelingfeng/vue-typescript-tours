<template>
    <el-select
        v-model="value"
        :disabled="option.disabled"
        :filterable="option.filterable"
        :clearable="clearable"
        :multiple="option.multiple"
        @change="changeHandler"
        :placeholder="placeholder"
        :style="widthStyle"
    >
        <el-option
            v-for="item in data"
            :key="item.name"
            :label="item.name"
            :value="item.value"
        ></el-option>
    </el-select>
</template>
<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator'
import { concats, isFunction } from '@/utils/lib'

@Component
export default class Vselect extends Vue {
    @Prop() private option!: any
    @Prop() private clearable?: boolean

    private value = ''
    private placeholder = ''
    private data: any = []

    mounted() {
        this.value = this.option.value
        this.groupData(this.option.data)
        this.placeholder = this.option.placeholder
            ? this.option.placeholder
            : '请选择'
    }

    @Watch('option.data', { immediate: true, deep: true })
    optinDataChange(newVal: any) {
        this.groupData(newVal)
    }

    get widthStyle() {
        return {
            width: this.option.width + 'px'
        }
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
        if (val !== undefined) this.value = val
    }
    groupData(data = []) {
        let list = []
        if (this.option.isAll) {
            list.push({
                name: '全部',
                value: ''
            })
        }
        this.data = concats(list, data)
    }
}
</script>
<style></style>
