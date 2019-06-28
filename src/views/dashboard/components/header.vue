<script lang="tsx">
import { Component, Vue } from 'vue-property-decorator'
import { Component as VueComponent } from 'vue-tsx-support'
import Clock from './time-clock.vue'

@Component
export default class Header extends VueComponent<{}> {
    private sysName = '旅游监测分析系统'
    private userMsg = 'admin'
    mounted() {}

    exitLogin(e: any) {
        console.log(e)
    }

    render(h: any) {
        return (
            <div class="hc">
                <div class="hc-left">
                    <span class="hc-left-sysname">{this.sysName}</span>
                    <i class="hc-left-menu" />
                </div>
                <div class="hc-center">
                    <span class="hc-center-title">{this.$route.name}</span>
                </div>
                <div class="hc-right">
                    <span class="hc-right-clock">
                        <Clock />
                    </span>
                    <span class="hc-right-userinfo">{this.userMsg}</span>
                    <i
                        class="hc-right-exit"
                        onClick={this.exitLogin}
                        title="退出系统"
                    />
                </div>
            </div>
        )
    }
}
</script>

<style lang="scss"></style>
