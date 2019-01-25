import {CommonBoardService} from '@/api/common.service';
import router from '@/routes/router';
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
        accessToken: null,
        searchList :[],
    },
    getters: {
    },
    mutations: {
        LOGIN (state, accessToken) {
            /*
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
            sessionStorage.role = accessToken.role; //사업장번호
            sessionStorage.roleNm = accessToken.roleNm; //사업장번호
            */
            sessionStorage.code = accessToken.code; //결과코드
            sessionStorage.message = accessToken.message; //결과메시지
            sessionStorage.id = accessToken.id; //ID
        },
        OTP_LOGIN (state, accessToken) {
            state.accessToken = accessToken;
            sessionStorage.setItem("data", accessToken);
            sessionStorage.accessToken = accessToken.accesstoken; //token
            sessionStorage.code = accessToken.code; //결과코드
            sessionStorage.message = accessToken.message; //결과메시지
            sessionStorage.failCnt = accessToken.failCnt; //실패카운트
            sessionStorage.lastIp = accessToken.lastIp; //최종접속IP
            sessionStorage.accountId = accessToken.accountId; //계정ID
            sessionStorage.accountNm = accessToken.accountNm; //계정명
            sessionStorage.gajumId = accessToken.gajumId; //가점ID
            sessionStorage.gajumNm = accessToken.gajumNm; //가점명
            sessionStorage.jijumId = accessToken.jijumId; //지점ID
            sessionStorage.jijumNm = accessToken.jijumNm; //지점명
            sessionStorage.id = accessToken.id; //ID
            sessionStorage.lastConnDt = accessToken.lastConnDt; //마지막접속일자
            sessionStorage.saupId = accessToken.saupId; //사업장번호
            sessionStorage.upJong = accessToken.upJong; //업종코드
            sessionStorage.newspaperYn = accessToken.newspaperYn; //신문사여부
            sessionStorage.role = accessToken.role; //권한
            sessionStorage.roleNm = accessToken.roleNm; //권한명
            sessionStorage.currentIp = accessToken.currentIp; //현재IP
            sessionStorage.soluId = accessToken.soluId; //현금영수증사업자
            sessionStorage.storeId = accessToken.storeId; //상점ID
            sessionStorage.storeNm = accessToken.storeNm; //상점명
            sessionStorage.subSaup = accessToken.subSaup; //회사코드
            sessionStorage.termsYn = accessToken.termsYn; //약관동의 여부
        },
        LOGOUT (state) {
            //state.accessToken = null
            // token 삭제
            CommonBoardService.deleteListDatas('auth', null, null).then((response) => {
                let result: any = response.data;
                if (result != null && result.code == '000') {
                }
            }
            , (error) => {
            })
            sessionStorage.clear(); //세션스토리지 삭제
        },
        TIMEOUT (state) {
            Vue.swal({text:'세션이 종료 되었습니다'})
            sessionStorage.clear(); //세션스토리지 삭제
            window.location.href ="/#/login"
        },
        INFO_SET(state, data) {
            sessionStorage.role = data.role;
            sessionStorage.code = data.code;
            sessionStorage.message = data.message;
            sessionStorage.failCnt = data.failCnt;
        },
        SEARCHLISTINPUT(state,{menu}){
            state.searchList = menu
        },
        SEARCHLISTOUT(state){
             return state.searchList
        }
    },
    actions: {
        LOGIN ({commit}, {id, password}) {
            sessionStorage.clear();

            // 로그인결과 리턴해줌
            return CommonBoardService.postListDatas('auth', null,{id, password})
                .then(({data}) => {
                    if(data.code=='000'){
                        commit('LOGIN', data)
                        //commit('INFO_SET', data)
                        return "success"
                    }else{ // 응답코드가 000이 아닌경우에도 세션스토리지에 값 넣어줌
                        commit('INFO_SET', data)
                        return "noinfo"
                    }
                }).catch(e=>{
                        return 'fail'
                    }
                )
        },
        OTP_LOGIN ({commit}, {auth_opt, id}) {
            // 로그인결과 리턴해줌
            let apiUrl = 'otp/'+auth_opt+'/login';
            return CommonBoardService.postListDatas(apiUrl, null,{id})
                .then(({data}) => {
                    if(data.code=='000'){
                        //commit('LOGIN', data)
                        commit('OTP_LOGIN', data)
                        return "success"
                    }else{ // 응답코드가 000이 아닌경우에도 세션스토리지에 값 넣어줌
                        commit('INFO_SET', data)
                        return "noinfo"
                    }
                }).catch(e=>{
                        return 'fail'
                    }
                )
        },
        LOGOUT ({commit}) {
            commit('LOGOUT')
        },
        MENU ({commit}){
            return CommonBoardService.getListDatas('menu', null, null).then(response => {
                let datas = response.data;
                if (datas) {
                    sessionStorage.authMenu=JSON.stringify(datas)
                    return "Y"
                }
                else{
                    return "N"
                }
            })
        }
    }
})
