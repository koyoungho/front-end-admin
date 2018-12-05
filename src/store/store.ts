import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import {environment} from '../utill/environment'

Vue.use(Vuex)

// api 주소 설정
//const resourceHost = 'http://localhost:4200'
const resourceHost =  environment.apiUrl
//const resourceHost = 'http://10.131.150.254:9999/api/auth'

export default new Vuex.Store({
    state: {
        accessToken: null
    },
    getters: {

    },
    mutations: {
        LOGIN (state, accessToken) {

            state.accessToken = accessToken;
            sessionStorage.setItem("data", accessToken);
            sessionStorage.accessToken = accessToken.accesstoken; //token
            sessionStorage.code = accessToken.code; //결과코드
            sessionStorage.message = accessToken.message; //결과메시지
            sessionStorage.failCnt = accessToken.failCnt; //실패카운트
            sessionStorage.lastIp = accessToken.lastIp; //최종접속IP
            sessionStorage.lastConnDt = accessToken.lastConnDt; //최종접속 시간
            sessionStorage.accountId = accessToken.accountId; //계정ID
            sessionStorage.accountNm = accessToken.accountNm; //계정명
            sessionStorage.gajumNm = accessToken.gajumNm; //가점명
            sessionStorage.jijumNm = accessToken.jijumNm; //지점명
            sessionStorage.lastConnDt = accessToken.lastConnDt; //마지막접속일자
            sessionStorage.storeNm = accessToken.storeNm; //상점명
            sessionStorage.saupId = accessToken.saupId; //사업장번호
            sessionStorage.upJong = accessToken.upJong; //업종코드
            sessionStorage.newspaperYn = accessToken.newspaperYn; //신문사여부
            return "ok"
        },
        LOGOUT (state) {
            //state.accessToken = null
            sessionStorage.clear();
        },
        INFO_SET(state, data) {
            sessionStorage.code = data.code;
            sessionStorage.message = data.message;
            sessionStorage.failCnt = data.failCnt;
        }
    },
    actions: {
        LOGIN ({commit}, {id, password, captcha}) {
            // 로그인결과 리턴해줌
            return axios.post('auth', {id, password, captcha})
                .then(({data}) => {
                    if(data.code=='000'){
                        commit('LOGIN', data)
                        return "success"
                    }else{ // 응답코드가 000이 아닌경우에도 세션스토리지에 값 넣어줌
                        commit('INFO_SET', data)
                        return "success"
                    }
                }).catch(e=>{
                        return 'fail'
                    }
                )
            // return "ok"
        },
        LOGOUT ({commit}) {
            commit('LOGOUT')
        },
    }
})
