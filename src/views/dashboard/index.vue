<template>
    <div class="dashboard-container">
        <div class="dc-header">
            <Header></Header>
        </div>
        <div class="dc-content">
            <el-row :gutter="20">
                <el-col :span="8">
                    <div style="width:300px;height:200px;margin-top:100px;">
                        <containerBox title="24小时旅游变化趋势"></containerBox>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div style="width:500px;height:500px;margin-top:100px;">
                        <containerBox
                            :isMaxBox="max"
                            :isHeader="min"
                            title="24小时旅游变化趋势"
                        ></containerBox>
                    </div>
                </el-col>
                <el-col :span="8"> </el-col>
            </el-row>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Header from './header.vue'
import containerBox from '@/components/containerBox.vue'
@Component({
    components: {
        Header,
        containerBox
    }
})
export default class Dashboard extends Vue {
    max: boolean = true
    min: boolean = false
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
        height: 100%;
        padding: 0 16px 12px;
        position: relative;
    }
}

.el-row {
    margin-bottom: 20px;
    &:last-child {
        margin-bottom: 0;
    }
}
</style>
