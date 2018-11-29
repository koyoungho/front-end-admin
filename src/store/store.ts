import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

// api 주소 설정
//const resourceHost = 'http://localhost:4200'
const resourceHost = 'http://211.39.150.112/api/auth'
//const resourceHost = 'http://10.131.150.254:9999/api/auth'

export default new Vuex.Store({
    state: {
        accessToken: null
    },
    getters: {

    },
    mutations: {
        LOGIN (state, accessToken) {
            // console.log('######## store.ts ########')
            // console.log(accessToken)
            //
            // state.accessToken = accessToken
            // sessionStorage.setItem("data", accessToken)
            // sessionStorage.accessToken = accessToken.accesstoken //token
            // sessionStorage.code = accessToken.code //결과코드
            // sessionStorage.message = accessToken.message //결과메시지
            // sessionStorage.failCnt = accessToken.failCnt //실패카운트
            // sessionStorage.lastIp = accessToken.lastIp //최종접속IP
            // sessionStorage.lastConnDt = accessToken.lastConnDt //최종접속 시간
        },
        LOGOUT (state) {
            //state.accessToken = null
            sessionStorage.clear();
        }
    },
    actions: {
        LOGIN ({commit}, {id, password}) {
            // 로그인결과 리턴해줌
            // return axios.post(`${resourceHost}`, {id, password})
            //      .then(({data}) => {
            //          commit('LOGIN', data)
            //          // axios.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;
            //          //console.log("//===== store.ts =====")
            //          //console.log(data)
            //          //console.log("===== store.ts =====//")
            //      })
             return "ok"
        },
        LOGOUT ({commit}) {
            commit('LOGOUT')
        },
    }
})
