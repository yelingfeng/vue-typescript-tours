<template>
    <div class="dashboard-container">
        <div class="dc-header">
            <Header></Header>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Header from './header.vue'

@Component({
    components: {
        Header
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
}
</style>
