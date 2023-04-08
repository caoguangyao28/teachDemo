/**
 * 格式化一个日期
 * @param {date} date 日期对象
 * @param {formate} formate 格式化
 * 
 */

// fu辅助函数
function _formateNormalize(formatter) {
  if(typeof formatter === 'function') {
    return formatter
  }
  if(typeof formatter !== 'string') {
    return new TypeError('formatter must be a string or function')
  }

  // 固定的字符串 ‘date’ 'datetime' 转换成 不固定的 yyyy年MM月dd日 HH:mm:ss.ms
  // 后者涵盖 前两种
  if(formatter === 'date'){
    formatter = 'yyyy-MM-dd'
  } else if(formatter === 'datetime') {
    formatter = 'yyyy-MM-dd HH:mm:ss'
  }
  // yyyy-MM-dd HH:mm:ss 将这种转换成函数 
  const formatterFun = (dateinfo) => {
    const {yyyy, MM, dd, HH, mm, ss, ms} = dateinfo
    return formatter
    .replaceAll('yyyy', yyyy)
    .replaceAll('MM', MM)
    .replaceAll('dd', dd)
    .replaceAll('HH', HH)
    .replaceAll('mm', mm)
    .replaceAll('ss', ss)
    .replaceAll('ms', ms)
  }


  return formatterFun
}

function formate(date, formatter, isPad = false) {
  formatter = _formateNormalize(formatter)
  // console.log(formatter) // 都转成函数了
  const dateinfo = {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    date: date.getDate(),
    hour: date.getHours(),
    minute: date.getMinutes(),
    second: date.getSeconds(),
    miniSecond: date.getMilliseconds()
  };
  dateinfo.yyyy = dateinfo.year.toString();
  dateinfo.MM = dateinfo.month.toString();
  dateinfo.dd = dateinfo.date.toString();
  dateinfo.HH = dateinfo.hour.toString();
  dateinfo.mm = dateinfo.minute.toString();
  dateinfo.ss = dateinfo.second.toString();
  dateinfo.ms = dateinfo.miniSecond.toString();
  // 补位0
  function _pad(prop, len) {
    dateinfo[prop] = dateinfo[prop].padStart(len, '0')
  }
  if(isPad) {
    _pad('yyyy', 4)
    _pad('MM', 2)
    _pad('dd', 2)
    _pad('HH', 2)
    _pad('mm', 2)
    _pad('ss', 2)
    _pad('ms', 3)
  }
  const result = formatter(dateinfo)
  console.log(result)
  return result
}
// 可能调用的方式

// 2023-4-8
formate(new Date(), 'date')

// 2023-4-8 19:9:13
formate(new Date(), 'datetime')

// 2023-04-08
formate(new Date(), 'date', true)

// 2023-04-08 17:20:33
formate(new Date(), 'datetime', true)

// 2023年4月8日 17:4:23.22
formate(new Date(), 'yyyy年MM月dd日 HH:mm:ss.ms')

// 2023年4月8日 17:4:23.229  
// 场景最灵活 最强大  考虑其他情况转换成函数 -- 参数归一
formate(new Date('2022/1/1'), (dateinfo) => {
  const {year} = dateinfo
  const thisyear = new Date().getFullYear()
  if(year < thisyear) {
    return `${thisyear - year}年前`
  } else if(year > thisyear) {
    return `${year - thisyear}年后`
  } else {
    return '今年'
  }
},true)