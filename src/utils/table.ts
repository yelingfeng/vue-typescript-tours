// 要加密的数据库字端集合
const columnKeys = [
    'msisdn',
    'receiveMsisdn',
    'innerMsisdn',
    'sendMsisdn',
    'goalMsisdn',
    'phone',
    'relateNum',
    'usernum',
    'phoneNum',
    'sendNum',
    'receiveNum',
    'userNum',
    'rltNumber',
    'targetnumber'
]

/**
 * [getSecurityRegExp 获取加密要验证的集合字符串 ]
 * @return {String} [description]
 */
export const getSecurityRegExp = () => {
    return new RegExp(columnKeys.join('|'))
}
