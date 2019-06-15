/**
 * 常用工具函数
 */
import cloneDeep from 'lodash/cloneDeep'
import assign from 'lodash/assign'
import concat from 'lodash/concat'

export const isFunction = (obj: any) => {
    return typeof obj === 'function'
}

export const isArray = (obj: any) => {
    return Array.isArray(obj)
}

export const cloneDeeps = (obj: any) => {
    return cloneDeep(obj)
}

export const assigns = (arr1: any, arr2: any) => {
    return assign(arr1, arr2)
}

export const concats = (arr1: any, arr2: any) => {
    return concat(arr1, arr2)
}
