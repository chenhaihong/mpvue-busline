/**
 * 通用函数
 */

/**
 * @description 检查网络
 */
const checkNetwork = ({ success, fail }) => {
    const showNoNetwork = () => {
        wx.showModal({
            showCancel: false,
            confirmColor: '#0099FF',
            content: '当前网络已断开，请检查您的网络',
        });
    };

    const doFail = () => {
        fail && fail();

        wx.navigateTo({
            url: '/pages/noNetwork/index',
        });
    };

    wx.getNetworkType({
        success(res) {
            if (res.networkType !== 'none') {
                success && success();
            } else {
                doFail();
            }
        },
        fail: () => {
            doFail();
        },
    }); // end getNetworkType
};

/**
 * @description 当前位置
 */
const getLocation = ({ success, fail, complete }) => {
    wx.getLocation({
        type: "gcj02",
        success: (res) => {
            success && success(res);
        },
        fail: (err) => {
            fail && fail(err);
        },
        complete: () => {
            complete && complete();
        },
    });
};

/**
 * @description 选择位置
 */
const chooseLocation = ({ success, fail, complete }) => {
    wx.chooseLocation({
        type: "gcj02",
        success: (res) => {
            success && success(res);
        },
        fail: (err) => {
            fail && fail(err);
        },
        complete: () => {
            complete && complete();
        },
    });
};

/**
 * @desc 获取中文时间（xx时xx分）
 * @return {String}
 */
const getDurationZh = (second) => {
    let hour = 0;
    let min = (second / 60).toFixed(2);
    if (min >= 60) {
        hour = Math.floor(min / 60);
        min = Math.ceil(min - hour * 60);
    } else {
        min = Math.ceil(min);
    }

    let houtStr = '';
    if (hour > 0) {
        houtStr = `${hour}小时`;
    }

    let minStr = '';
    if (min > 0) {
        minStr = hour > 0 ? `${min}分` : `${min}分钟`;
    }
    return `${houtStr}${minStr}` || '<1分钟';
};

const getDurationZh2 = (second) => {
    let s = second % 60;
    let m = (second % 3600 - s) / 60;
    let h = (second - 60 * m - s) / 3600;

    h = h ? `${h}小时` : '';
    m = m ? `${m}分钟` : '';
    s = s ? `${s}秒` : '';

    return h + m + s;
};

const getDuration = (second) => {
    let s = second % 60;
    let m = (second % 3600 - s) / 60;
    let h = (second - 60 * m - s) / 3600;
    return {
        h, m, s,
    }
};

/**
 * @description 将米数值转换为xx米或xx公里格式
 */
const getDistanceZh = (meter) => {
    let distanceZh = '';
    if (parseInt(meter) || meter == 0) {
        if (meter > 999) {
            distanceZh = `${(meter / 1000).toFixed(2)}公里`;
        } else {
            distanceZh = `${meter}米`;
        }
    }
    return distanceZh;
};

/**
 * @description 获取优化轨迹点的公差值（距离越大，公差值越大）
 */
const getTolerance = (distance) => {
    let tolerance = null;
    if (distance < 10000) {
        tolerance = (distance / 100000 / 10000).toFixed(8); // 10km （测试：天河可以运站=>五山公交站 0.91km，天河客运站=>体育西路站 7~8km）
    } else if (distance < 50000) {
        tolerance = (distance / 100000 / 9000).toFixed(7); // 50km (测试：广州天河客运站=>琶洲地铁站 10~16km)
    } else if (distance < 80000) {
        tolerance = (distance / 100000 / 5500).toFixed(6); // 80km (测试：广州天河客运站=>三角镇 70~80km)
    } else if (distance < 100000) {
        tolerance = (distance / 100000 / 2000).toFixed(5); // 100km (测试：广州天河客运站=>小榄 80~95km)
    } else if (distance < 1000000) {
        tolerance = (distance / 100000 / 1200).toFixed(4); // 1000km (测试：广州天河客运站=>普宁池尾站 350~380km，广州天河客运站=>长沙南站 650~700km)
    } else if (distance < 10000000) {
        tolerance = (distance / 100000 / 600).toFixed(4); // 10000km （测试：广州天河客运站=>天津市政府 2000~2200km）
    } else { //（未测试）
        tolerance = (distance / 100000 / 300).toFixed(4);
    }

    return parseFloat(tolerance);
};

/**
 * @description 获取优化的：缩放视野需要展示的所有经纬度
 */
const getIncludePoints = (polyline) => {
    let points = [];
    for (let i = 0, L = polyline.length; i < L; i++) {
        points = points.concat(polyline[i]['points']);
    }

    if (points.length <= 4) {
        return points;
    }

    let x1 = points[0].latitude, x2 = points[0].latitude, // 纬度 最小最大值
        y1 = points[0].longitude, y2 = points[0].longitude; // 经度 最小最大值

    for (let i = 1, L = points.length; i < L; i++) {
        let latitude = points[i].latitude;
        let longitude = points[i].longitude;

        x1 = x1 < latitude ? x1 : latitude;
        x2 = x2 > latitude ? x2 : latitude;

        y1 = y1 < longitude ? y1 : longitude;
        y2 = y2 > longitude ? y2 : longitude;
    }

    return [
        { latitude: x1, longitude: y1, },
        { latitude: x1, longitude: y2, },
        { latitude: x2, longitude: y1, },
        { latitude: x2, longitude: y2, },
    ];
};

/**
 * @description 获取格式化为小数点后6位的数字（'1.010100'）
 * @return {String}
 */
const getFormattedDecimal = (num) => {
    return num.toFixed(6);
};

/**
 * @description 获取去除路向的站点名称（公交、地铁、高铁、动车、轻轨等...）
 */
const getPureStationName = (name) => {
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

export default {
    checkNetwork,
    chooseLocation,

    getDuration,
    getDurationZh,
    getDurationZh2,
    getDistanceZh,
    getLocation,
    getTolerance,
    getIncludePoints,

    getFormattedDecimal,
    getPureStationName,
};