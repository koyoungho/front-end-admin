export class CcChart { //  차트데이터
    subSaup : string = '';  // 회사코드
    shopNm : string='';  // 사업장명
    saupId : string  = ''  // 사업자 ID
    compNm:string = ''  // 회사명

    //온라인  //승인
    aprvOnline :number = 0
    aprvOnlineSelf :number  = 0;
    // 오프라인
    aprvOfflineSelf : number = 0;
    aprvOffline : number = 0;
    //온라인   //취소
    cancelOnlineSelf : number =0;
    cancelOnline : number =0;
    // 오프라인
    cancelOfflineSelf : number =0;
    cancelOffline : number =0;
    // 온라인      // 국세청 승인
    taxOnlineSelf : number =0;
    taxOnline : number =0;
    //오프라인 자진 비자진
    taxOfflineSelf : number =0;
    taxOffline : number =0;
    // 온라인      // 국세청 취소
    taxCancelOnlineSelf : number =0;
    taxCancelOnline : number =0;
    //오프라인 자진 비자진
    taxCancelOfflineSelf : number =0;
    taxCancelOffline : number =0;



}



