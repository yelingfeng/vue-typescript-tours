import request from '@/common/request'

/**
 * 折线图 左上角
 */
export const getLeftTopLineArea = () => {
    return request({
        url: '/dashboard/lineAreaMock',
        method: 'post'
    })
}

/**
 * 关系图 出行方式分析
 */
export const getGraphChartData = () => {
    return request({
        url: '/dashboard/relation',
        method: 'post'
    })
}

/**
 * 柱图 外省游客TOP5
 */
export const getBarChartData = () => {
    return request({
        url: '/dashboard/barMcok',
        method: 'post'
    })
}
export const getZLdata = () => {
    return request({
        url: '/dashboard/ravellerData',
        method: 'post'
    })
}
