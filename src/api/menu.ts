import request from '@/common/request'

/**
 * 测试接口
 * @param id
 */
export const getMenuList = (id: number) => {
    return request({
        url: '/getMenuList',
        method: 'get',
        data: {
            id
        }
    })
}
