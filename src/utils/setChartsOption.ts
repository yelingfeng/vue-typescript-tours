/**
 * 生成折线图option
 * @param {array} data 折线图
 **/
export const getLineOption = () =>{
    let option = {
        title: {
            text: '折线图堆叠'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['邮件营销', '联盟广告']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name: '邮件营销',
                type: 'line',
                stack: '总量',
                data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
                name: '联盟广告',
                type: 'line',
                stack: '总量',
                data: [220, 182, 191, 234, 290, 330, 310]
            }
        ]
    }
    return option
}

/**
 * 生成饼图option
 * @param {array} data 饼图
 **/
export const getPieOption = () =>{
    let option = {
        backgroundColor: '#2c343c',
        title: {
            text: '南丁格尔玫瑰图',
            left: 'center',
            top: 20,
            textStyle: {
                color: '#ccc'
            }
        },
    
        tooltip: {
            trigger: 'item',
            formatter: "{b} : {c} ({d}%)"
        },
    
        visualMap: {
            show: false,
            min: 500,
            max: 600,
            inRange: {
                //colorLightness: [0, 1]
            }
        },
        series: [{
            name: '访问来源',
            type: 'pie',
            radius: '50%',
            center: ['50%', '50%'],
            color: ['rgb(131,249,103)', '#FBFE27', '#FE5050', '#1DB7E5'], //'#FBFE27','rgb(11,228,96)','#FE5050'
            data: [{
                    value: 285,
                    name: '黑名单查询'
                },
                {
                    value: 410,
                    name: '红名单查询'
                },
                {
                    value: 274,
                    name: '法人行政处罚'
                },
                {
                    value: 235,
                    name: '其它查询'
                }
            ].sort(function(a, b) {
                return a.value - b.value
            }),
            roseType: 'radius',
    
            label: {
                normal: {
                    formatter: ['{c|{c}次}', '{b|{b}}'].join('\n'),
                    rich: {
                        c: {
                            color: 'rgb(241,246,104)',
                            fontSize: 20,
                            fontWeight:'bold',
                            lineHeight: 5
                        },
                        b: {
                            color: 'rgb(98,137,169)',
                            fontSize: 15,
                            height: 40
                        },
                    },
                }
            },
            labelLine: {
                normal: {
                    lineStyle: {
                        color: 'rgb(98,137,169)',
                    },
                    smooth: 0.2,
                    length: 10,
                    length2: 20,
    
                }
            },
            itemStyle: {
                normal: {
                    shadowColor: 'rgba(0, 0, 0, 0.8)',
                    shadowBlur: 50,
                }
            }
        }]
    }
    return option
}

/**
 * 生成地图option
 * @param {array} data 地图
 **/
export const getMapOption = () =>{
    let option = {
        title: {
            text: '中国地图',
            left: 'center',
            top: '2%',
            textStyle: {
                color: '#fff'
            }
        },
        backgroundColor: '#070d18',
        series: [{
            type: 'map',
            map: 'china',
            geoIndex: 1,
            aspectScale: 0.75, //长宽比
            zoom:1.2,
            label: {
                normal: {
                    formatter: '{b}',
                    show: true,
                    textStyle:{
                        color:'#fff'
                    }
                },
                emphasis: {
                    show: false,
                    textStyle: {
                        color: '#05C3F9'
                    }
                }
            },
            roam: false,
            itemStyle: {
                normal: {
                    areaColor: 'transparent',
                    borderColor: '#3B5077',
                    borderWidth: 1
                },
                emphasis: {
                    areaColor: '#070d18',
                    shadowColor: '#1773c3',
                    shadowBlur: 20
                }
            },
            data: []
        }]
    }
    return option
}
