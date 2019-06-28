<script lang="tsx">
import { Component, Prop } from 'vue-property-decorator'
import { Component as VueComponent } from 'vue-tsx-support'
@Component
export default class TimeClock extends VueComponent<{}> {
    @Prop({ default: '' }) gTime!: string
    private timeContent: string = ''
    private timerID!: number
    mounted() {
        clearInterval(this.timerID)
        this.timerID = setInterval(this.updateTime, 1000)
        this.updateTime()
    }
    updateTime() {
        let cd = new Date()
        let time = `${this.zeroPadding(cd.getHours(), 2)}:${this.zeroPadding(
            cd.getMinutes(),
            2
        )}:${this.zeroPadding(cd.getSeconds(), 2)}`
        let date = `${this.zeroPadding(cd.getFullYear(), 4)}-${this.zeroPadding(
            cd.getMonth() + 1,
            2
        )}-${this.zeroPadding(cd.getDate(), 2)}`
        this.timeContent = `${date} ${time}`
    }
    zeroPadding(num: number, digit: number) {
        var zero = ''
        for (var i = 0; i < digit; i++) {
            zero += '0'
        }
        return (zero + num).slice(-digit)
    }

    render(h: any) {
        return (
            <div>
                <span>{this.timeContent}</span>
            </div>
        )
    }
}
</script>
