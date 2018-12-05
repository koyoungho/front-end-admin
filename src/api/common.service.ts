
//데이터 전송모델을 임포트한다
import {ApiData} from '../model/ApiData';
//공통모듈 임포트한다 Webapi
import {default as WebApi} from './common/Web-api';

export class CommonListService extends WebApi<ApiData>{

    // 리스트 데이터
    getListDatas(path, id , param){
        return this.getListData(path ,id , param);
    }

    // 등록
    postListDatas(api,id , param){
        return this.postListData(api,id , param);
    }

    // 수정
    updateListData(api, id, param) {
        return this.putListData(api, id, param);
    }

    // 삭제
    deleteListDatas(api, id, param) {
        return this.deleteListData(api, id, param);
    }
}

export const CommonBoardService = new CommonListService()


