<script lang="tsx">
import { Component } from 'vue-property-decorator'
import { Component as VueComponent } from 'vue-tsx-support'
import Box from '@/components/containerBox.vue'
import StackedChart from '@/components/dashboard/stackedChart.vue'
import TableCom from '@/components/table/index.vue'
import FormComp from '@/components/Form/index.vue'
import { getLeftTopLineArea } from '@/api/dashboard'
import { forbiddenDate, getIntervalDate } from '@/utils/index.ts'
@Component
export default class ContentMain extends VueComponent<{}> {
    toursLineOpt: Object = {
        width: '100%',
        height: '150px',
        props: {
            gridLeft: 80,
            gridTop: 15,
            gridRight: 40,
            gridBottom: 8
        }
    }
    toursLineData: Array<Object> = []
    sevenlineData: Array<Object> = []
    tableData: Array<Object> = [
        {
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
        },
        {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
        },
        {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
        },
        {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
        },
        {
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
        },
        {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
        },
        {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
        },
        {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
        },
        {
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
        },
        {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
        },
        {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
        },
        {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
        }
    ]
    tableOpt: Object = {
        listLoading: true,
        stripe: false,
        highlightRow: true,
        column: [
            { name: '序号', value: 'index', width: 100, align: 'left' },
            {
                name: '姓名',
                value: 'name',
                width: 120,
                align: 'center'
            },
            { name: '时间', value: 'date', width: 180, align: 'center' },
            { name: '地址', value: 'address', tooltip: true, align: 'center' }
        ],
        data: [],
        // 是否分页
        pagination: true,
        // 分页参数
        pageOpt: {
            total: 0,
            pageSizes: [10, 20, 30, 40, 50],
            pageSize: 10,
            currentPage: 1
        }
    }
    formOpt: Object = {
        // form 表单true横排，false竖排
        inline: true,
        labelPos: 'right',
        labelWidth: '200',
        btnPos: 'right',
        // canSlider: true,
        // 表单项
        items: [
            {
                label: '任务名称',
                type: 'text',
                required: true,
                wrap: true,
                comOpt: {
                    id: 'taskName',
                    width: 610,
                    required: true,
                    value: ''
                }
            },
            {
                label: '开始时间',
                type: 'date',
                required: true,
                comOpt: {
                    id: 'queryStartTime',
                    value: getIntervalDate(1),
                    type: 'datetime',
                    isStart: true,
                    disabled: false,
                    width: '200',
                    pickOptions: {
                        disabledDate(time) {
                            let maxDay = getIntervalDate(1)
                            return forbiddenDate(time, maxDay)
                        }
                    }
                }
            },
            {
                label: '结束时间',
                type: 'date',
                required: true,
                wrap: true,
                comOpt: {
                    id: 'queryEndTime',
                    value: getIntervalDate(),
                    disabled: false,
                    type: 'datetime',
                    width: '200',
                    pickOptions: {
                        disabledDate(time) {
                            return forbiddenDate(time)
                        }
                    }
                }
            },
            {
                label: '目标号码',
                type: 'autoCompletet',
                required: true,
                comOpt: {
                    id: 'goalMsisdn',
                    value: '',
                    width: 200,
                    data: [],
                    disabled: false
                }
            },
            {
                label: '对方号码',
                type: 'text',
                wrap: true,
                comOpt: {
                    id: 'receiveMsisdn',
                    value: '',
                    width: 200,
                    disabled: false
                    // show: false
                }
            },
            // {
            //     label: '目标号码所在地',
            //     type: 'select',
            //     comOpt: {
            //         id: 'goalHomeCode',
            //         placeholder: '请选择省份',
            //         value: '',
            //         width: 200,
            //         data: [],
            //         change: function(val) {
            //             if (val === '999') {
            //                 me.$refs.form.setShow([
            //                     { id: 'goalAreaCode', value: false }
            //                 ])
            //             } else {
            //                 me.$refs.form.setShow([
            //                     { id: 'goalAreaCode', value: true }
            //                 ])
            //                 me.getCityHomeCode = val
            //                 me.getCityName()
            //             }
            //         },
            //         disabled: false
            //     }
            // },
            // {
            //     // label: '（市）',
            //     type: 'select',
            //     wrap: true,
            //     comOpt: {
            //         id: 'goalAreaCode',
            //         placeholder: '请选择地市',
            //         value: '',
            //         show: false,
            //         width: 200,
            //         disabled: false,
            //         data: [],
            //         change: function() {}
            //     }
            // },
            {
                label: '短信类型',
                type: 'select',
                required: true,
                // wrap: true,
                comOpt: {
                    id: 'smsType',
                    value: '',
                    disabled: false,
                    width: 200,
                    data: [],
                    change: function() {}
                }
            },
            {
                label: '手机属性',
                type: 'select',
                required: true,
                wrap: true,
                comOpt: {
                    id: 'phoneProperties',
                    value: '',
                    disabled: false,
                    width: 200,
                    data: [],
                    change: function() {}
                }
            },
            {
                label: '包含短信平台',
                type: 'checkbox',
                required: false,
                wrap: true,
                comOpt: {
                    id: 'containPlatformSms',
                    value: false,
                    disabled: false,
                    width: 20,
                    data: ['包含短信平台'],
                    change(val) {
                        console.log('111111', val)
                        // me.$refs.form.setItemShow('receiveMsisdn', val)
                        // setItemShow
                    }
                }
            },
            // {
            //     label: '对方所在地',
            //     type: 'select',
            //     comOpt: {
            //         id: 'receiveAreaCode',
            //         value: '',
            //         width: 200,
            //         disabled: false,
            //         data: [],
            //         change: function () {
            //         }
            //     }
            // },
            // {
            //     label: '对方号码归属地',
            //     type: 'select',
            //     comOpt: {
            //         id: 'receiveProvinceName',
            //         placeholder: '请选择省份',
            //         value: '',
            //         width: 200,
            //         data: [],
            //         change: function (val) {
            //             if (val) {
            //                 me.getCityName(val)
            //             }
            //         },
            //         disabled: false
            //     }
            // },
            {
                label: '关键词类型',
                type: 'keyWord',
                comOpt: {
                    width: 200,
                    // required: true,
                    id: 'words',
                    data: []
                }
            }
        ]
    }
    get tableSize() {
        return { height: 200 }
    }

    mounted() {
        this.tableOpt.data = this.tableData
        this.tableOpt.pageOpt.total = this.tableData.length
        this.tableOpt.listLoading = false
        getLeftTopLineArea().then(resp => {
            console.log(resp)
            const { data } = resp
            this.toursLineData = data
            this.sevenlineData = data
        })

        // this.toursLineData = allUserData
    }

    render(h: any) {
        return (
            <div class="container">
                <div class="container__leftPart">
                    <div class="container__minBox">
                        <Box title="24小时旅游变化趋势">
                            <StackedChart
                                ref="toursLine"
                                option={this.toursLineOpt}
                                renderData={this.toursLineData}
                            />
                        </Box>
                    </div>
                    <div class="container__minBox">
                        <Box title="景区驻留游客排行" />
                    </div>
                    <div class="container__minBox lastBox">
                        <Box title="近7天游客变化趋势" />
                    </div>
                </div>
                <div class="container__middlePart">
                    <div class="container__centerBox">
                        <Box cls="border02" isHeader="false">
                            <TableCom
                                option={this.tableOpt}
                                comSize={this.tableSize}
                            />
                            <FormComp option={this.formOpt} ref="form" />
                        </Box>
                    </div>
                </div>
                <div class="container__rightPart">
                    <div class="container__minCol">
                        <div class="container__minBox">
                            <Box title="外省游客TOP5" />
                        </div>
                        <div class="container__minBox">
                            <Box title="出行方式分析" />
                        </div>
                        <div class="container__minBox lastBox">
                            <Box title="出行方式分析" />
                        </div>
                    </div>
                    <div class="container__minCol">
                        <div class="container__minBox">
                            <Box title="境外游客TOP5" />
                        </div>
                        <div class="container__minBox">
                            <Box title="出行方式分析" />
                        </div>
                        <div class="container__minBox lastBox">
                            <Box title="出行方式分析" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
</script>

<style lang="scss" scope>
@import '@/styles/mixin.scss';
.container {
    @include clearfix;
    width: 100%;
    height: 100%;
    display: flex;
    padding: 20px 10px;
    flex-direction: row;
    align-items: flex-end;

    &__leftPart {
        height: 100%;
        display: flex;
        flex-direction: column;
        width: 25%;
    }

    &__middlePart {
        height: 100%;
        display: flex;
        flex-direction: column;
        width: 40%;
    }

    &__rightPart {
        height: 100%;
        display: flex;
        flex-direction: row;
        width: 35%;
    }

    &__minBox {
        height: 33%;
        margin: 0 3px 10px;
        position: relative;

        &.lastBox {
            height: calc(33% - 20px);
        }
    }

    &__minCol {
        height: 100%;
        width: 50%;
        display: flex;
        flex-direction: column;
        position: relative;
    }

    &__centerBox {
        height: 100%;
        margin: 0 4px 4px;
    }
}
</style>
