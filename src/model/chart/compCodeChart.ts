export class CcChart { //  차트데이터
    subSaup : string = '';  // 회사코드
    shopNm : string='';  // 사업장명
    saupId : string  = ''  // 사업자 ID
    compNm:string = ''  // 회사명

    //온라인  //승인
    aprvOnline :number = 0
    aprvOnlineAccount : number  = 0; // 승인온라인 비자진 합계
    aprvOnlineSelf :number  = 0;
    aprvOnlineSelfAccount : number  = 0; // 승인온라인 자진 합계
    // 오프라인
    aprvOfflineSelf : number = 0;
    aprvOfflineSelfAccount : number = 0;
    aprvOffline : number = 0;
    aprvOfflineAccount : number = 0;
    
    //온라인   //취소
    cancelOnlineSelf : number =0;
    cancelOnlineSelfAccount : number =0; // 캔슬 온라인 자진 합계
    cancelOnline : number =0;
    cancelOnlineAccount : number =0; // 캔슬 온라인 비자진 합계
    // 오프라인
    cancelOfflineSelf : number =0;
    cancelOfflineSelfAccount : number =0; // 캔슬 온라인 자진 합계
    cancelOffline : number =0;
    cancelOfflineAccount : number =0; // 캔슬 온라인 비자진 합계

    // 온라인      // 국세청 승인
    taxOnlineSelf : number =0;
    taxOnlineSelfAccount : number =0;   // 캔슬 오프라인 자진 합계
    taxOnline : number =0;
    taxOnlineAccount : number =0;   // 캔슬 오프라인 비자진 합계
    
    //오프라인 자진 비자진
    taxOfflineSelf : number =0;
    taxOfflineSelfAccount : number =0;   // 캔슬 오프라인 자진 합계
    taxOffline : number =0;
    taxOfflineAccount : number =0;   // 캔슬 오프라인 비자진 합계

    // 온라인      // 국세청 취소
    taxCancelOnlineSelf : number =0;
    taxCancelOnlineSelfAccount : number =0;   // 캔슬 오프라인 자진 합계
    taxCancelOnline : number =0;
    taxCancelOnlineAccount : number =0;   // 캔슬 오프라인 비자진 합계

    //오프라인 자진 비자진
    taxCancelOfflineSelf : number =0;
    taxCancelOfflineSelfAccount : number =0;   // 캔슬 오프라인 자진 합계
    taxCancelOffline : number =0;
    taxCancelOfflineAccount : number =0;   // 캔슬 오프라인 비자진 합계

    


}



