/*
 * @Author: erye 
 * @Date: 2018-04-30 15:43:18 
 * @Last Modified by: erye
 * @Last Modified time: 2018-04-30 21:32:28
 */
const KEY_HISTORY = 'History'

const RouteModule = {
    namespaced: true,

    // 路线页数据
    state: {
        place: {
            a: {
                name: null,
                latitude: null,
                longitude: null
            },
            b: {
                name: null,
                latitude: null,
                longitude: null
            },
        },
        historys: [],
    },
    getters: {},
    mutations: {
        /**
         * route
         */
        navigateToRouteList: (state) => {
            let a = state.place.a;
            let b = state.place.b;

            let place = JSON.stringify({
                a,
                b,
            });

            wx.navigateTo({
                'url': `/pages/list/main?place=${place}`,
            });
        },

        /**
         * place
         */
        clearPlace: (state) => {
            state.place.a = {}
            state.place.b = {}
        },
        updatePlace: (state, payload) => {
            const {
                place,
                which
            } = payload
            state.place[which] = place
        },
        switchAB: (state) => {
            const a = state.place.a
            const b = state.place.b
            state.place.a = b
            state.place.b = a
        },

        /**
         * history
         */
        initHistorys: (state) => {
            let historys = wx.getStorageSync(KEY_HISTORY) || [];
            state.historys = historys
        },
        clearHistorys: (state) => {
            wx.setStorageSync(KEY_HISTORY, []);
            state.historys = []
        },
        saveHistory: (state) => {
            let olds = wx.getStorageSync(KEY_HISTORY) || [];

            let a = state.place.a;
            let b = state.place.b;
            let one = {
                a: a,
                b: b,
            };

            // 历史查询记录限制15个
            if (olds.length >= 15) {
                olds.pop();
            }

            olds.unshift(one);

            wx.setStorageSync(KEY_HISTORY, olds)

            // 更新页面
            state.historys = olds
        }, // end saveHistory
    },
    actions: {}
}

export default RouteModule