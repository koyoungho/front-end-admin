
// 공용 클래스 api  / 환경설정 임포트 / 모델임포트
import axios from 'axios';
import {environment} from '@/utill/environment';
import {Vue} from 'vue/types/vue';

export default class WebApi<T>{
          ApiUrl : string = environment.apiUrl
          options : any = null;
          headers : any = null;

    constructor(){
        this.headers = { "Content-Type": "application/json;charset=utf-8","Access-Control-Allow-Origin": "*"};
    }


    //삭제api
    deleteListData(path,id,listData: T) {
        let currentAction = id != null ?  "/"+id : "";
        let currentPath = path != null ?  "/"+path : "";
        return axios.delete(`${this.ApiUrl+currentPath+currentAction}` , listData  );
    }
    //리스트 API
    getListData(path,id , param) {

        let currentAction = id != null ?  "/"+id : "";
        let currentPath = path != null ?  "/"+path : "";
        return axios.get(`${this.ApiUrl+currentPath+currentAction}`,  {headers: this.headers , params : param}  );
    }
    //등록 API
    postListData(path,id, apidata: T) {
        let currentAction = id != null ?  "/"+id : "";
        let currentPath = path != null ?  "/"+path : "";
        return axios.post(`${this.ApiUrl+currentPath+currentAction}`, apidata , this.options );
    }
    //수정 API
    updateListData(path,id, apidata: T) {
        let currentAction = id != null ?  "/"+id : "";
        let currentPath = path != null ?  "/"+path : "";
        return axios.put(`${this.ApiUrl+currentPath+currentAction}`, apidata , this.options).catch();
    }

    // protected extractData(res: Response) {
    //     let body = res.json();
    //     let header = res.headers;
    //     if (header.get('x-auth-token')) {
    //         // sessionStorage.setItem("accesstoken", header.get('x-auth-token'));
    //     }
    //     return body || {};
    // }
    //
    // protected handleError(error: any) {
    //     let errBody = error.json();
    //     let errMsg = (errBody.message) ? errBody.message :
    //         error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    //     if(error.status=='401'){
    //         sessionStorage.clear();
    //         window.location.href='/#/error'
    //     }
    //     return Observable.throw(errMsg);
    // }
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

