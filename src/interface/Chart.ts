/**
 * 组件option 属性子接口
 */
export interface IChildProps {
    gridLeft?: string
    gridRight?: string
    gridTop?: string
    gridBottom?: string
}
/**
 * 图表组件 属性接口
 */
export interface IChartProps {
    options?: dataOptions
}

/**
 * 组件option类型接口
 */
export interface IComponentOptions {
    width?: string
    height?: string
    props?: IChildProps
    renderData?: Array<Object>
}

/**
 * 构建方法接口
 */
export interface IBuildChart {
    // 构建echart option
    buildData(data: any, options: IComponentOptions): Object
}
