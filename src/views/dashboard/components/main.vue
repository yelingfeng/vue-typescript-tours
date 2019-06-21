<template>
    <div class="content-main"></div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
@Component
export default class ContentMain extends Vue {}
</script>

<style lang="scss">
@import '@/styles/mixin.scss';
.content-main {
    @include clearfix;
    width: 100%;
    height: 100%;
}
</style>
