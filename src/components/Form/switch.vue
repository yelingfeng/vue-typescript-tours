<template>
    <div class="yq-switch">
        <span class="yq-switch__label">{{ option.text }}</span>
        <div class="yq-switch__lcs" :style="swicthStyle" @click="radioChange">
            <div class="yq-switch__cursor" :style="cursorStyle"></div>
            <div class="yq-switch__text yq-switch__on" v-show="value">
                {{ option.onText }}
            </div>
            <div class="yq-switch__text yq-switch__off" v-show="value">
                {{ option.offText }}
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { isFunction } from '@/utils/lib'

@Component
export default class Vswitch extends Vue {
    @Prop() private option!: any

    private value = true

    mounted() {
        this.value = this.option.value
    }

    get swicthStyle() {
        if (this.value) {
            return {
                width: this.option.width + 'px',
                background: '#015b8f',
                boxShadow: '0 0 2px #579022 inset'
            }
        }
        return {
            width: this.option.width + 'px',
            background: '#041024',
            boxShadow: '0 0 2px #a4a4a4 inset'
        }
    }

    get cursorStyle() {
        let leftVal = this.option.width - 20 + 'px'
        if (this.value) {
            return {
                left: leftVal
            }
        }
        return {
            left: '3px'
        }
    }

    radioChange() {
        this.value = !this.value
        if (this.option.click && isFunction(this.option.click)) {
            this.option.click(this.value)
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
<style>
@component-namespace yq {
    @b switch {
        @e label {
            font-size: 12px;
            color: #fff;
            height: 28px;
            line-height: 23px;
            margin-right: 5px;
            display: block;
            float: left;
            text-align: right;
        }
        @e lcs {
            display: block;
            position: relative;
            height: 20px;
            border-radius: 20px;
            overflow: hidden;
            cursor: pointer;

            -webkit-transition: all 0.2s ease-in-out;
            -ms-transition: all 0.2s ease-in-out;
            transition: all 0.2s ease-in-out;
            width: 60px;
        }
        @e cursor {
            display: inline-block;
            position: absolute;
            top: 2px;
            width: 16px;
            height: 16px;
            border-radius: 100%;
            background: #fff;
            /*box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 3px 4px 0 rgba(0, 0, 0, 0.1);*/
            box-shadow: 0px 0px 5px 2px rgba(0, 161, 228, 1);
            z-index: 10;

            -webkit-transition: all 0.3s linear;
            -ms-transition: all 0.3s linear;
            transition: all 0.3s linear;
        }
        @e text {
            font-family: 'Trebuchet MS', Helvetica, sans-serif;
            font-size: 12px;
            letter-spacing: 1px;
            line-height: 18px;
            color: #fff;
            font-weight: bold;
            position: absolute;
            top: 2px;
            overflow: hidden;
            text-align: center;
            -webkit-transition: all 0.2s ease-in-out 0.1s;
            -ms-transition: all 0.2s ease-in-out 0.1s;
            transition: all 0.2s ease-in-out 0.1s;
        }
        @e on {
            left: 5px;
            z-index: 6;
        }
        @e off {
            right: 5px;
            z-index: 5;
        }
    }
}
</style>
