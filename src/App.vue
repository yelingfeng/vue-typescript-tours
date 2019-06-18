<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
@Component
export default class App extends Vue {}
</script>

<style lang="scss" scoped>
#app {
    background: url('./assets/images/dashboard/mainBg.png') no-repeat center 0;
    -webkit-background-size: cover;
    background-size: cover;
}
</style>
