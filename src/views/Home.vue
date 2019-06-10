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
import { GlobalModule } from '@/store/modules/global'
@Component({
    components: { HelloWorld }
})
export default class Home extends Vue {
    get getMapZoom() {
        return GlobalModule.gMapMaxZoom
    }

    mounted() {
        getMenuList(1).then(resp => {
            console.log(resp.data)
        })

        console.log(this.getMapZoom)
    }
}
</script>
