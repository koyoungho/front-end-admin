export class CcChart { //  차트데이터
    compCode :number = 0  // 회사코드
    saupId :number = 0  // 사업자 ID
    compNm:number = 0  // 회사명
    approval:number = 0  // 승인
    cancle:number = 0  // 취소
    gukseApporvalError:number = 0  // 국세청 승인오류
    gukseCancleError :number = 0   // 국세청 취소 오류

    //온라인 자진 비자진   //승인
    apOnline :number = 0
    apOnlineSelf :number  = 0;
    apOnlineSelfAccount : number  = 0; // 승인온라인 자진 합계
    apOnlineNoneSelf :number = 0
    apOnlineSelfNoneAccount : number  = 0; // 승인온라인 비자진 합계
    //오프라인 자진/비자진
    apOffline :number = 0
    apOfflineSelf :number = 0
    apOfflineSelfAccount :number = 0  // 승인 오프라인 자진 합계
    apOfflineNoneSelf :number = 0
    apOfflineSelfNoneAccount :number = 0  // 승인 오프라인 비자진 합계

    //온라인 자진 비자진  //취소
    canOnline : number =0;
    canOnlineSelf : number =0;
    canOnlineSelfAccount : number =0; // 캔슬 온라인 자진 합계
    canOnlineNoneSelf : number =0;
    canOnlineSelfNoneAccount : number =0; // 캔슬 온라인 비자진 합계
    //오프라인 자진 비자진
    canOffline : number =0;
    canOfflineSelf : number =0;
    canOfflineSelfAccount : number =0;   // 캔슬 오프라인 자진 합계
    canOfflineNoneSelf : number =0;
    canOfflineNoneSelfAccount : number =0;   // 캔슬 오프라인 비자진 합계

    // 온라인 자진 비자진  // 국세청승인오류
    gukseApOnline :number =0;
    gukseApOnlineSelf :number =0;
    gukseApOnlineSelfAccount :number =0; // 국세청승인오류 온라인 자진 합계
    gukseApOnlineNoneSelf :number =0;
    gukseApOnlineNoneSelfAccount :number =0; // 국세청승인오류 온라인 비자진 합계

    // 오프라인 자진 비자진
    gukseApOffline :number =0;
    gukseApOfflineSelf :number =0;
    gukseApOfflineSelfAccount :number =0; // 국세청승인오류 오프라인 자진합계
    gukseApOfflineNoneSelf :number =0;
    gukseApOfflineNoneSelfAccount :number =0; // 국세청승인오류 오프라인 비자진합계

    // 온라인 자진 비자진  // 국세청 취소오류
    gukseCanOnline :number =0;
    gukseCanOnlineSelf :number =0;
    gukseCanOnlineSelfAccount :number =0; // 국세청 승인취소 온라인 자진 합계
    gukseCanOnlineNoneSelf :number =0;
    gukseCanOnlineNoneSelfAccount :number =0; // 국세청 승인취소 온라인 비자진 합계

    // 오프라인 자진 비자진  // 국세청 취소 오류
    gukseCanOffline :number =0;
    gukseCanOfflineSelf :number =0;
    gukseCanOfflineSelfAccount :number =0; // 국세청 승인취소 오프라인 자진 합계
    gukseCanOfflineNoneSelf :number =0;
    gukseCanOfflineNoneSelfAccount :number =0; // 국세청 승인취소 오프라인 비자진 합계

}



