/**
 * 把电话号码中间4位****显示
 * @param {data} data 需要改变的手机号
 * @param {phone} 改变之后的号码
 */
export const phoneNumChange = (data: any) => {
    let phone
    if (data === null || data === undefined) return data
    data = String(data)
    if (data.substr(0, 2) === '86') {
        phone = data.replace(/(\d{5})\d{4}(\d{4})/, '$1****$2')
    } else {
        phone = data.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
    }
    return phone
}
/**
 * [getIntervalDate 获取距离系统n天的日期]
 * @param  {n}  num            [需要往前推的天数，负数表示往后推]
 */
export const getIntervalDate = (n = 0) => {
    // let gTime = localStorage.gTime
    let gTime = sessionStorage.gTime || new Date()
    // let { gTime } = JSON.parse(sessionStorage.getItem('globalKeys'))
    let ms = new Date(gTime).getTime() - 24 * n * 3600 * 1000
    return new Date(ms)
}
/**
 * [forbiddenDate 选择日期范围]
 * @param  {Date} time                       [选择的日期]
 * @param  {Date}  lastDate=new  Date()      [可选的最后日期]
 * @param  {Number} [duration=180]          [间隔时间 默认6个月 ]
 * @return {Boolean}  [true:xxxx, false:xxxxxx]
 */
export const forbiddenDate = (time, lastDate, duration = 180) => {
    // let { gTime } = JSON.parse(sessionStorage.getItem('globalKeys'))
    let gTime = sessionStorage.gTime || new Date()
    let dateNew
    if (lastDate) {
        dateNew = lastDate
    } else {
        dateNew = gTime
    }
    // let dateNew = lastDate ? lastDate : gTime
    let cDate = moment(dateNew).format('YYYY-MM-DD HH:mm:ss')
    let cTime = moment(time).format('YYYY-MM-DD HH:mm:ss')
    let pDate = moment(dateNew)
        .subtract(duration, 'days')
        .format('YYYY-MM-DD HH:mm:ss')
    return !moment(cTime).isBetween(pDate, cDate)
}
