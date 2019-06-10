<template>
    <div class="home">
        <img alt="Vue logo" src="../assets/logo.png" />
        <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import HelloWorld from '@/components/HelloWorld.vue'
import { getMenuList } from '@/api/menu.ts'
@Component({
    components: { HelloWorld }
})
export default class Home extends Vue {
    mounted() {
        getMenuList(1).then(resp => {
            console.log(resp.data)
        })
    }
}
</script>
