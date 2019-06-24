<script lang="tsx">
import { Component } from 'vue-property-decorator'
import { Component as VueComponent } from 'vue-tsx-support'
import Header from './components/header.vue'
import ContentMain from './components/main.vue'
@Component
export default class Dashboard extends VueComponent<{}> {
    render(h: any) {
        return (
            <div class="dashboard-container">
                <div class="dc-header">
                    <Header />
                </div>
                <div class="dc-content">
                    <ContentMain />
                </div>
            </div>
        )
    }
}
</script>

<style lang="scss" scoped>
.dashboard-container {
    width: 100%;
    height: 800px;

    & .dc-header {
        position: absolute;
        top: 0;
        width: 100%;
    }

    & .dc-content {
        width: 100%;
        height: calc(100% - 60px);
        left: 0;
        top: 60px;
        position: absolute;
        overflow: hidden;
    }
}
</style>
