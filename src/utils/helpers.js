function formatNumber(n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime(date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}

export function formatDistance(meter) {
  var dst = '';
  if (parseInt(meter) || meter == 0) {
    if (meter > 999) {
      dst = (meter / 1000).toFixed(1) + '公里';
    } else {
      dst = meter + '米';
    }
  }
  return dst;
}

export function formatDuration(second) {
  var min = Math.ceil(parseInt(second) / 60); // 总分钟数

  var h = 0;
  var m = 0;

  m = min % 60; // 对总分钟数以60取余，得到不够一小时的分钟数
  h = Math.floor(min / 60); // 除以3600，然后向下取证去掉不够一个小时的分钟数，得到小时

  var res = '';
  h > 0 && (res += h + '小时');
  m > 0 && (res += m + '分钟');

  return res || '<1分钟';
}


/**
 * @description 获取去除路向的站点名称（公交、地铁、高铁、动车、轻轨等...）
 */
export function formatStationName(name) {
  // 地铁3号线(北延段)(机场南--体育西路) => 地铁3号线(北延段)
  // 替换参考数据中的字符：开始为'('，不含有')('，中间含有'--'，任意字符,结尾为')'。
  // 
  // 关键字 “正则表达式 不包含指定字符串”
  // (?!a) 前面没有a
  // (?=a) 前面有a
  // 对于正则表达式引擎来说，因为它是从文本头部向尾部开始解析的（可以通过正则选项控制解析方向），
  // 因此对于文本尾部方向，称为“前”，因为这个时候，正则引擎还没走到那块。
  // 
  return name.replace(/\((.(?!\)\())*--.*\)$/g, '');
};

/**
 * 从公交数据的segments中，取出格式化（取出路线方向）后的公交路线数据
 */
export function formatTransports(segments) {
  const trps = []
  for (let j = 0, L = segments.length; j < L; j++) {
    const arr = []
    const segment = segments[j];

    if (segment.bus && segment.bus.buslines && segment.bus.buslines.length) { // 公交、地铁，每个片段里都可能有多种线路，所以提供的数据是一个数组
      let buslines = segment.bus.buslines;
      for (let i = 0, Li = buslines.length; i < Li; i++) {
        let name = buslines[i].name;
        arr.push(formatStationName(name));
      }

      arr.length && (trps.push(arr));
    } else if (segment.railway && segment.railway.name) { // 火车、高铁、动车，提供的数据是一个json对象，也就是只有一条线路
      trps.push([segment.railway.name]);
    }
  }

  return trps
}