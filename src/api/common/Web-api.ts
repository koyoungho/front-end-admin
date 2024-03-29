
import store from '@/store/store';

// 공용 클래스 api  / 환경설정 임포트 / 모델임포트
import axios from 'axios';
import {environment} from '@/utill/environment';

export default class WebApi<T>{
    ApiUrl : string = environment.apiUrl
    options : any = null;
    headers : any = "";

    constructor(){
        axios.interceptors.response.use((response) => { // intercept the global error
            return response
        }, function (error) {

            if ( error.response.status === 403 || error.response.code === 403 || error.code === 403 || error.status === 403) { // if the error is 401 and hasent already been retried
                store.commit('TIMEOUT')
            }
        })
    }

    newApi(){
        this.headers =  {"Access-Control-Allow-Origin": "*", "Content-Type": "application/json;charset=utf-8" ,"Access": "application/json"
            ,"x-auth-token": sessionStorage.accessToken ,Pragma: 'no-cache'};
    }

    //삭제api
    deleteListData(path,id,apidata) {
        this.newApi();
        let currentAction = id != null ?  "/"+id : "";
        let currentPath = path != null ?  "/"+path : "";
        return axios.delete(`${this.ApiUrl+currentPath+currentAction}` , {headers: this.headers , params : apidata});
    }
    //리스트 API
    getListData(path,id , param) {
        this.newApi();
        let currentAction = id != null ?  "/"+id : "";
        let currentPath = path != null ?  "/"+path : "";
        return axios.get(`${this.ApiUrl+currentPath+currentAction}`,  {headers: this.headers , params : param})
    }
    //등록 API
    postListData(path,id, apidata) {
        this.newApi();
        let currentAction = id != null ?  "/"+id : "";
        let currentPath = path != null ?  "/"+path : "";
        return axios.post(`${this.ApiUrl+currentPath+currentAction}`, apidata ,{headers: this.headers } )
    }
    //수정 API
    putListData(path,id, apidata) {
        this.newApi();
        let currentAction = id != null ?  "/"+id : "";
        let currentPath = path != null ?  "/"+path : "";
        return axios.put(`${this.ApiUrl+currentPath+currentAction}`,  apidata , {headers: this.headers } )
    }

    //
    // protected extractResponseStatus(res: Response) {
    //     if (res.headers) {
    //         let header = res.headers;
    //         if (header.get('x-auth-token')) {
    //             sessionStorage.setItem("accesstoken", header.get('x-auth-token'));
    //         }
    //     }
    //     return res.ok;
    // }
}

// // 사용하는 싱클돈 뉴객체 이이름으로 임포트
// export const WebApiService = new WebApi(T);

