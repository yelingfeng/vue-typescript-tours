<template>
    <div class="hc">
        <div class="hc-left">
            <span class="hc-left-sysname">{{ sysName }}</span>
            <i class="hc-left-menu"></i>
        </div>
        <div class="hc-center">
            <span class="hc-center-title">{{ this.$route.name }}</span>
        </div>
        <div class="hc-right">
            <span class="hc-right-clock">
                <Clock />
            </span>
            <span class="hc-right-userinfo">{{ userMsg }}</span>
            <i class="hc-right-exit" @click="exitLogin" title="退出系统"></i>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Clock from './time-clock.vue'
@Component({
    components: {
        Clock
    }
})
export default class Header extends Vue {
    private sysName = '旅游监测分析系统'
    private userMsg = 'admin'
    mounted() {}

    exitLogin(e: any) {
        console.log(e)
    }
}
</script>

<style lang="scss"></style>
