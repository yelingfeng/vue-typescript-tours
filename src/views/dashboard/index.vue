<template>
    <div class="dashboard-container">
        <div class="dc-header">
            <Header></Header>
        </div>
        <div class="dc-content">
            <ContentMain></ContentMain>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Header from './components/header.vue'
import ContentMain from './components/main.vue'
@Component({
    components: {
        Header,
        ContentMain
    }
})
export default class Dashboard extends Vue {}
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
