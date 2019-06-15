<template>
    <div :style="widthStyle">
        <el-checkbox-group
            v-model="value"
            :disabled="option.disabled"
            @change="changeHandler"
        >
            <el-checkbox
                v-for="item in option.data"
                :key="item.name"
                :disabled="item.disabled"
                :label="item.value"
                name="type"
                >{{ item.name }}</el-checkbox
            >
        </el-checkbox-group>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { isFunction } from '@/utils/lib'

@Component
export default class Vcheckbox extends Vue {
    @Prop() private option!: any

    private value = []

    mounted() {
        this.value = this.option.value
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
        this.value = val
    }
}
</script>
<style></style>
