<template>
    <el-button
        :type="option.btnType ? option.btnType : 'primary'"
        :size="option.size ? option.size : 'medium'"
        :style="widthStyle"
        v-if="option.popover"
        v-popover:option.popover
        :disabled="option.disabled"
        @click.native="clickHandler"
    >
        {{ option.value }}
    </el-button>
    <el-button
        :type="option.btnType ? option.btnType : 'primary'"
        :size="option.size ? option.size : 'medium'"
        :style="widthStyle"
        v-else
        :disabled="option.disabled"
        @click.native="clickHandler"
    >
        {{ option.value }}
    </el-button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { isFunction } from '@/utils/lib'

@Component
export default class Vbutton extends Vue {
    @Prop() private option!: any

    get widthStyle() {
        return {
            width: this.option.width + 'px'
        }
    }

    clickHandler() {
        if (this.option.click && isFunction(this.option.click)) {
            this.option.click()
        }
    }
    getValue() {
        return { [this.option.id]: this.option.value }
    }
}
</script>
