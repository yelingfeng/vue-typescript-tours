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
