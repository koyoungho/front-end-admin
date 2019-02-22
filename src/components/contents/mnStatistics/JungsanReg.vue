<template>
    <!-- container -->
    <section id="container">
        <!-- content  -->
        <div class="content">
            <h2 class="blind">통계관리</h2>

            <h3>현금영수증 사업자 정산 등록</h3>

            <!-- search box -->
            <div class="search_box type03 page_stats04">
                <div class="search_inner">
                    <ul class="search_list">
                        <li>
                            <label>정산 월</label>
                            <span class="form_cal">
                            <date-picker v-model="nowDate"  :lang="lang1" :type="'month'"
                                         :first-day-of-week="1" format="YYYY-MM" width="200" confirm ></date-picker>
                            </span>
                        </li>
                        <li style="margin-left: 20px">
                            <label>집계 기준일   (전월)</label>
                            <span class="form_cal">
                                 <date-picker v-model="preDate"  :lang="lang1" :type="'day'"
                                              :first-day-of-week="1"  format="YYYY-MM-DD" width="150" confirm ></date-picker>
                            </span>
                        </li>
                        <li style="margin-left: 10px">
                            <label>(당월)</label>
                            <span class="form_cal">
                                 <date-picker v-model="curDate"  :lang="lang1" :type="'day'"
                                              :first-day-of-week="7"  format="YYYY-MM-DD" width="150" confirm ></date-picker>
                            </span>
                            <button type="button" class="btn_m01 bg03" @click="roadData">데이터 수집</button>
                        </li>
                    </ul>

                </div>
            </div>
            <!-- //search box -->

            <!-- cash title -->
            <div class="cash_title">{{dateFormat(nowDate)}} 현금영수증 국세청정산</div>

            <div class="data_date01">작성일자 : {{nowDT}}</div>
            <div class="data_date02">({{dateFormat(curDate)}} 기준)</div>

            <!-- tbl scroll x box -->
            <div class="tbl_scroll_x_box">
                <!-- tbl list04 -->
                <table class="tbl_list04 page_stats03">
                    <caption>현금영수증 사업자별 정산</caption>
                    <colgroup>
                        <col span="16">
                    </colgroup>
                    <thead>
                    <tr class="bg01">
                        <th scope="col" colspan="3" rowspan="3">구분</th>
                        <th scope="col" colspan="4">비온라인</th>
                        <th scope="col" colspan="4">온라인</th>
                        <th scope="col" colspan="4">자진발급</th>
                        <th scope="col" rowspan="3">전체합계</th>
                    </tr>
                    <tr class="bg02">
                        <th scope="col" colspan="4">국세청 기준단가 (<em class="fc_pt01">{{jungsanRate.taxOffline}}</em>원)</th>
                        <th scope="col" colspan="4">국세청 기준단가 (<em class="fc_pt01">{{jungsanRate.taxOnline}}</em>원)</th>
                        <th scope="col" colspan="4">국세청 기준단가 (<em class="fc_pt01">{{jungsanRate.taxSelf}}</em>원)</th>
                    </tr>
                    <tr class="bg01">
                        <th scope="col">당월</th>
                        <th scope="col">전월소급</th>
                        <th scope="col">취소</th>
                        <th scope="col">합계</th>
                        <th scope="col">당월</th>
                        <th scope="col">전월소급</th>
                        <th scope="col">취소</th>
                        <th scope="col">합계</th>
                        <th scope="col">당월</th>
                        <th scope="col">전월소급</th>
                        <th scope="col">취소</th>
                        <th scope="col">합계</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <th scope="row" rowspan="5">국세청</th>
                        <th scope="row" rowspan="4">결제건수</th>
                        <th>승인건수</th>
                        <!--비온라인-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['0'].data.offlineCur" @input="inputSetResultCount('0','offlineCur',1)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['0'].data.offlineRet" @input="inputSetResultCount('0','offlineRet',2)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['0'].data.offlineCancel" @input="inputSetResultCount('0','offlineCancel',3)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['0'].data.offlineTotal" readonly></td>
                        <!--온라인-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['0'].data.onlineCur" @input="inputSetResultCount('0','onlineCur',5)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['0'].data.onlineRet" @input="inputSetResultCount('0','onlineRet',6)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['0'].data.onlineCancel" @input="inputSetResultCount('0','onlineCancel',7)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['0'].data.onlineTotal" readonly></td>
                        <!--자진발급-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['0'].data.selfCur" @input="inputSetResultCount('0','selfCur',9)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['0'].data.selfRet" @input="inputSetResultCount('0','selfRet',10)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['0'].data.selfCancel" @input="inputSetResultCount('0','selfCancel',11)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['0'].data.selfTotal" readonly></td>
                        <!--전체합계-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['0'].data.total" readonly></td>
                    </tr>
                    <tr>
                        <th scope="row">삭제건수</th>
                        <!--비온라인-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['1'].data.offlineCur" @input="inputSetResultCount('1','offlineCur',1)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['1'].data.offlineRet" @input="inputSetResultCount('1','offlineRet',2)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['1'].data.offlineCancel" @input="inputSetResultCount('1','offlineCancel',3)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['1'].data.offlineTotal" readonly></td>
                        <!--온라인-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['1'].data.onlineCur" @input="inputSetResultCount('1','onlineCur',5)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['1'].data.onlineRet" @input="inputSetResultCount('1','onlineRet',6)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['1'].data.onlineCancel" @input="inputSetResultCount('1','onlineCancel',7)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['1'].data.onlineTotal" readonly></td>
                        <!--자진발급-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['1'].data.selfCur" @input="inputSetResultCount('1','selfCur',9)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['1'].data.selfRet" @input="inputSetResultCount('1','selfRet',10)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['1'].data.selfCancel" @input="inputSetResultCount('1','selfCancel',11)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['1'].data.selfTotal" readonly></td>
                        <!--전체합계-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['1'].data.total" readonly></td>
                    </tr>
                    <tr>
                        <th scope="row">기타오류</th>
                        <!--비온라인-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['2'].data.offlineCur" @input="inputSetResultCount('2','offlineCur',1)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['2'].data.offlineRet" @input="inputSetResultCount('2','offlineRet',2)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['2'].data.offlineCancel" @input="inputSetResultCount('2','offlineCancel',3)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['2'].data.offlineTotal" readonly></td>
                        <!--온라인-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['2'].data.onlineCur" @input="inputSetResultCount('2','onlineCur',5)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['2'].data.onlineRet" @input="inputSetResultCount('2','onlineRet',6)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['2'].data.onlineCancel" @input="inputSetResultCount('2','onlineCancel',7)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['2'].data.onlineTotal" readonly></td>
                        <!--자진발급-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['2'].data.selfCur" @input="inputSetResultCount('2','selfCur',9)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['2'].data.selfRet" @input="inputSetResultCount('2','selfRet',10)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['2'].data.selfCancel" @input="inputSetResultCount('2','selfCancel',11)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['2'].data.selfTotal" readonly></td>
                        <!--전체합계-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['2'].data.total" readonly></td>
                    </tr>
                    <tr class="sum01">
                        <th scope="row">합계</th>
                        <!--비온라인-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['3'].data.offlineCur" readonly></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['3'].data.offlineRet" readonly></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['3'].data.offlineCancel" readonly></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['3'].data.offlineTotal" readonly></td>
                        <!--온라인-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['3'].data.onlineCur" readonly></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['3'].data.onlineRet" readonly></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['3'].data.onlineCancel" readonly></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['3'].data.onlineTotal" readonly></td>
                        <!--자진발급-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['3'].data.selfCur" readonly></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['3'].data.selfRet" readonly></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['3'].data.selfCancel" readonly></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['3'].data.selfTotal" readonly></td>
                        <!--전체합계-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['3'].data.total" readonly></td>
                    </tr>
                    <tr class="sum02">
                        <th scope="row" colspan="2"><strong>조세지원액</strong></th>
                        <!--비온라인-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['4'].data.offlineCur" readonly></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['4'].data.offlineRet" readonly></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['4'].data.offlineCancel" readonly></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['4'].data.offlineTotal" readonly></td>
                        <!--온라인-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['4'].data.onlineCur" readonly></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['4'].data.onlineRet" readonly></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['4'].data.onlineCancel" readonly></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['4'].data.onlineTotal" readonly></td>
                        <!--자진발급-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['4'].data.selfCur" readonly></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['4'].data.selfRet" readonly></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['4'].data.selfCancel" readonly></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['4'].data.selfTotal" readonly></td>
                        <!--전체합계-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['4'].data.total" readonly></td>
                    </tr>
                    <tr>
                        <th scope="row" rowspan="7">정산건수</th>
                        <th scope="row" rowspan="3">KT</th>
                        <th scope="row">일반</th>
                        <!--비온라인-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['5'].data.offlineCur" @input="inputSetResultCount('5','offlineCur',1)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['5'].data.offlineRet" @input="inputSetResultCount('5','offlineRet',2)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['5'].data.offlineCancel" @input="inputSetResultCount('5','offlineCancel',3)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['5'].data.offlineTotal" readonly></td>
                        <!--온라인-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['5'].data.onlineCur" @input="inputSetResultCount('5','onlineCur',5)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['5'].data.onlineRet" @input="inputSetResultCount('5','onlineRet',6)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['5'].data.onlineCancel" @input="inputSetResultCount('5','onlineCancel',7)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['5'].data.onlineTotal" readonly></td>
                        <!--자진발급-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['5'].data.selfCur" @input="inputSetResultCount('5','selfCur',9)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['5'].data.selfRet" @input="inputSetResultCount('5','selfRet',10)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['5'].data.selfCancel" @input="inputSetResultCount('5','selfCancel',11)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['5'].data.selfTotal" readonly></td>
                        <!--전체합계-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['5'].data.total" readonly></td>
                    </tr>
                    <tr>
                        <th scope="row">편의점</th>
                        <!--비온라인-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['6'].data.offlineCur" @input="inputSetResultCount('6','offlineCur',1)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['6'].data.offlineRet" @input="inputSetResultCount('6','offlineRet',2)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['6'].data.offlineCancel" @input="inputSetResultCount('6','offlineCancel',3)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['6'].data.offlineTotal" readonly></td>
                        <!--온라인-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['6'].data.onlineCur" @input="inputSetResultCount('6','onlineCur',5)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['6'].data.onlineRet" @input="inputSetResultCount('6','onlineRet',6)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['6'].data.onlineCancel" @input="inputSetResultCount('6','onlineCancel',7)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['6'].data.onlineTotal" readonly></td>
                        <!--자진발급-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['6'].data.selfCur" @input="inputSetResultCount('6','selfCur',9)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['6'].data.selfRet" @input="inputSetResultCount('6','selfRet',10)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['6'].data.selfCancel" @input="inputSetResultCount('6','selfCancel',11)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['6'].data.selfTotal" readonly></td>
                        <!--전체합계-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['6'].data.total" readonly></td>
                    </tr>
                    <tr class="sum62">
                        <th scope="row">소계</th>
                        <!--비온라인-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['7'].data.offlineCur" readonly></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['7'].data.offlineRet" readonly></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['7'].data.offlineCancel" readonly></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['7'].data.offlineTotal" readonly></td>
                        <!--온라인-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['7'].data.onlineCur" readonly></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['7'].data.onlineRet" readonly></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['7'].data.onlineCancel" readonly></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['7'].data.onlineTotal" readonly></td>
                        <!--자진발급-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['7'].data.selfCur" readonly></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['7'].data.selfRet" readonly></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['7'].data.selfCancel" readonly></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['7'].data.selfTotal" readonly></td>
                        <!--전체합계-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['7'].data.total" readonly></td>
                    </tr>
                    <tr>
                        <th scope="row" rowspan="3">롯데</th>
                        <th scope="row">일반</th>
                        <!--비온라인-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['8'].data.offlineCur" @input="inputSetResultCount('8','offlineCur',1)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['8'].data.offlineRet" @input="inputSetResultCount('8','offlineRet',2)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['8'].data.offlineCancel" @input="inputSetResultCount('8','offlineCancel',3)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['8'].data.offlineTotal" readonly></td>
                        <!--온라인-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['8'].data.onlineCur" @input="inputSetResultCount('8','onlineCur',5)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['8'].data.onlineRet" @input="inputSetResultCount('8','onlineRet',6)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['8'].data.onlineCancel" @input="inputSetResultCount('8','onlineCancel',7)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['8'].data.onlineTotal" readonly></td>
                        <!--자진발급-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['8'].data.selfCur" @input="inputSetResultCount('8','selfCur',9)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['8'].data.selfRet" @input="inputSetResultCount('8','selfRet',10)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['8'].data.selfCancel" @input="inputSetResultCount('8','selfCancel',11)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['8'].data.selfTotal" readonly></td>
                        <!--전체합계-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['8'].data.total" readonly></td>
                    </tr>
                    <tr>
                        <th scope="row">편의점</th>
                        <!--비온라인-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['9'].data.offlineCur" @input="inputSetResultCount('9','offlineCur',1)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['9'].data.offlineRet" @input="inputSetResultCount('9','offlineRet',2)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['9'].data.offlineCancel" @input="inputSetResultCount('9','offlineCancel',3)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['9'].data.offlineTotal" readonly></td>
                        <!--온라인-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['9'].data.onlineCur" @input="inputSetResultCount('9','onlineCur',5)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['9'].data.onlineRet" @input="inputSetResultCount('9','onlineRet',6)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['9'].data.onlineCancel" @input="inputSetResultCount('9','onlineCancel',7)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['9'].data.onlineTotal" readonly></td>
                        <!--자진발급-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['9'].data.selfCur" @input="inputSetResultCount('9','selfCur',9)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['9'].data.selfRet" @input="inputSetResultCount('9','selfRet',10)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['9'].data.selfCancel" @input="inputSetResultCount('9','selfCancel',11)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['9'].data.selfTotal" readonly></td>
                        <!--전체합계-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['9'].data.total" readonly></td>
                    </tr>
                    <tr class="sum02">
                        <th scope="row">소계</th>
                        <!--비온라인-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['10'].data.offlineCur" readonly></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['10'].data.offlineRet" readonly></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['10'].data.offlineCancel" readonly></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['10'].data.offlineTotal" readonly></td>
                        <!--온라인-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['10'].data.onlineCur" readonly></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['10'].data.onlineRet" readonly></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['10'].data.onlineCancel" readonly></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['10'].data.onlineTotal" readonly></td>
                        <!--자진발급-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['10'].data.selfCur" readonly></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['10'].data.selfRet" readonly></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['10'].data.selfCancel" readonly></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['10'].data.selfTotal" readonly></td>
                        <!--전체합계-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['10'].data.total" readonly></td>
                    </tr>
                    <tr class="sum01">
                        <th scope="row" colspan="2">합계</th>
                        <!--비온라인-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['11'].data.offlineCur" readonly></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['11'].data.offlineRet" readonly></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['11'].data.offlineCancel" readonly></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['11'].data.offlineTotal" readonly></td>
                        <!--온라인-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['11'].data.onlineCur" readonly></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['11'].data.onlineRet" readonly></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['11'].data.onlineCancel" readonly></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['11'].data.onlineTotal" readonly></td>
                        <!--자진발급-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['11'].data.selfCur" readonly></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['11'].data.selfRet" readonly></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['11'].data.selfCancel" readonly></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['11'].data.selfTotal" readonly></td>
                        <!--전체합계-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['11'].data.total" readonly></td>
                    </tr>

                    <tr>
                        <th scope="row" rowspan="7">정산실적</th>
                        <th scope="row" rowspan="3">KT</th>
                        <th scope="row">일반</th>
                        <!--비온라인-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['12'].data.offlineCur" @input="inputSetResultCount('12','offlineCur',1)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['12'].data.offlineRet" @input="inputSetResultCount('12','offlineRet',2)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['12'].data.offlineCancel" @input="inputSetResultCount('12','offlineCancel',3)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['12'].data.offlineTotal" readonly></td>
                        <!--온라인-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['12'].data.onlineCur" @input="inputSetResultCount('12','onlineCur',5)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['12'].data.onlineRet" @input="inputSetResultCount('12','onlineRet',6)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['12'].data.onlineCancel" @input="inputSetResultCount('12','onlineCancel',7)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['12'].data.onlineTotal" readonly></td>
                        <!--자진발급-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['12'].data.selfCur" @input="inputSetResultCount('12','selfCur',9)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['12'].data.selfRet" @input="inputSetResultCount('12','selfRet',10)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['12'].data.selfCancel" @input="inputSetResultCount('12','selfCancel',11)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['12'].data.selfTotal" readonly></td>
                        <!--전체합계-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['12'].data.total" readonly></td>
                    </tr>
                    <tr>
                        <th scope="row">편의점</th>
                        <!--비온라인-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['13'].data.offlineCur" @input="inputSetResultCount('13','offlineCur',1)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['13'].data.offlineRet" @input="inputSetResultCount('13','offlineRet',2)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['13'].data.offlineCancel" @input="inputSetResultCount('13','offlineCancel',3)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['13'].data.offlineTotal" readonly></td>
                        <!--온라인-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['13'].data.onlineCur" @input="inputSetResultCount('13','onlineCur',5)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['13'].data.onlineRet" @input="inputSetResultCount('13','onlineRet',6)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['13'].data.onlineCancel" @input="inputSetResultCount('13','onlineCancel',7)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['13'].data.onlineTotal" readonly></td>
                        <!--자진발급-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['13'].data.selfCur" @input="inputSetResultCount('13','selfCur',9)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['13'].data.selfRet" @input="inputSetResultCount('13','selfRet',10)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['13'].data.selfCancel" @input="inputSetResultCount('13','selfCancel',11)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['13'].data.selfTotal" readonly></td>
                        <!--전체합계-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['13'].data.total" readonly></td>
                    </tr>
                    <tr class="sum02">
                        <th scope="row">소계</th>
                        <!--비온라인-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['14'].data.offlineCur" readonly></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['14'].data.offlineRet" readonly></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['14'].data.offlineCancel" readonly></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['14'].data.offlineTotal" readonly></td>
                        <!--온라인-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['14'].data.onlineCur" readonly></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['14'].data.onlineRet" readonly></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['14'].data.onlineCancel" readonly></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['14'].data.onlineTotal" readonly></td>
                        <!--자진발급-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['14'].data.selfCur" readonly></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['14'].data.selfRet" readonly></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['14'].data.selfCancel" readonly></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['14'].data.selfTotal" readonly></td>
                        <!--전체합계-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['14'].data.total" readonly></td>
                    </tr>
                    <tr>
                        <th scope="row" rowspan="3">롯데</th>
                        <th scope="row">일반</th>
                        <!--비온라인-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['15'].data.offlineCur" @input="inputSetResultCount('15','offlineCur',1)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['15'].data.offlineRet" @input="inputSetResultCount('15','offlineRet',2)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['15'].data.offlineCancel" @input="inputSetResultCount('15','offlineCancel',3)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['15'].data.offlineTotal" readonly></td>
                        <!--온라인-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['15'].data.onlineCur" @input="inputSetResultCount('15','onlineCur',5)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['15'].data.onlineRet" @input="inputSetResultCount('15','onlineRet',6)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['15'].data.onlineCancel" @input="inputSetResultCount('15','onlineCancel',7)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['15'].data.onlineTotal" readonly></td>
                        <!--자진발급-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['15'].data.selfCur" @input="inputSetResultCount('15','selfCur',9)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['15'].data.selfRet" @input="inputSetResultCount('15','selfRet',10)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['15'].data.selfCancel" @input="inputSetResultCount('15','selfCancel',11)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['15'].data.selfTotal" readonly></td>
                        <!--전체합계-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['15'].data.total" readonly></td>
                    </tr>
                    <tr>
                        <th scope="row">편의점</th>
                        <!--비온라인-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['16'].data.offlineCur" @input="inputSetResultCount('16','offlineCur',1)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['16'].data.offlineRet" @input="inputSetResultCount('16','offlineRet',2)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['16'].data.offlineCancel" @input="inputSetResultCount('16','offlineCancel',3)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['16'].data.offlineTotal" readonly></td>
                        <!--온라인-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['16'].data.onlineCur" @input="inputSetResultCount('16','onlineCur',5)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['16'].data.onlineRet" @input="inputSetResultCount('16','onlineRet',6)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['16'].data.onlineCancel" @input="inputSetResultCount('16','onlineCancel',7)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['16'].data.onlineTotal" readonly></td>
                        <!--자진발급-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['16'].data.selfCur" @input="inputSetResultCount('16','selfCur',9)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['16'].data.selfRet" @input="inputSetResultCount('16','selfRet',10)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['16'].data.selfCancel" @input="inputSetResultCount('16','selfCancel',11)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['16'].data.selfTotal" readonly></td>
                        <!--전체합계-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['16'].data.total" readonly></td>
                    </tr>
                    <tr class="sum02">
                        <th scope="row">소계</th>
                        <!--비온라인-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['17'].data.offlineCur" readonly></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['17'].data.offlineRet" readonly></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['17'].data.offlineCancel" readonly></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['17'].data.offlineTotal" readonly></td>
                        <!--온라인-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['17'].data.onlineCur" readonly></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['17'].data.onlineRet" readonly></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['17'].data.onlineCancel" readonly></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['17'].data.onlineTotal" readonly></td>
                        <!--자진발급-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['17'].data.selfCur" readonly></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['17'].data.selfRet" readonly></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['17'].data.selfCancel" readonly></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['17'].data.selfTotal" readonly></td>
                        <!--전체합계-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['17'].data.total" readonly></td>
                    </tr>
                    <tr class="sum01">
                        <th scope="row" colspan="2">합계</th>
                        <!--비온라인-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['18'].data.offlineCur" readonly></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['18'].data.offlineRet" readonly></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['18'].data.offlineCancel" readonly></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['18'].data.offlineTotal" readonly></td>
                        <!--온라인-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['18'].data.onlineCur" readonly></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['18'].data.onlineRet" readonly></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['18'].data.onlineCancel" readonly></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['18'].data.onlineTotal" readonly></td>
                        <!--자진발급-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['18'].data.selfCur" readonly></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['18'].data.selfRet" readonly></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['18'].data.selfCancel" readonly></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['18'].data.selfTotal" readonly></td>
                        <!--전체합계-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['18'].data.total" readonly></td>
                    </tr>

                    <tr>
                        <th scope="row" rowspan="7">배분결과</th>
                        <th scope="row" rowspan="3">KT</th>
                        <th scope="row">일반</th>
                        <!--비온라인-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['19'].data.offlineCur" @input="inputSetResultCount('19','offlineCur',1)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['19'].data.offlineRet" @input="inputSetResultCount('19','offlineRet',2)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['19'].data.offlineCancel" @input="inputSetResultCount('19','offlineCancel',3)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['19'].data.offlineTotal" readonly></td>
                        <!--온라인-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['19'].data.onlineCur" @input="inputSetResultCount('19','onlineCur',5)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['19'].data.onlineRet" @input="inputSetResultCount('19','onlineRet',6)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['19'].data.onlineCancel" @input="inputSetResultCount('19','onlineCancel',7)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['19'].data.onlineTotal" readonly></td>
                        <!--자진발급-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['19'].data.selfCur" @input="inputSetResultCount('19','selfCur',9)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['19'].data.selfRet" @input="inputSetResultCount('19','selfRet',10)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['19'].data.selfCancel" @input="inputSetResultCount('19','selfCancel',11)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['19'].data.selfTotal" readonly></td>
                        <!--전체합계-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['19'].data.total" readonly></td>
                    </tr>
                    <tr>
                        <th scope="row">편의점</th>
                        <!--비온라인-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['20'].data.offlineCur" @input="inputSetResultCount('20','offlineCur',1)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['20'].data.offlineRet" @input="inputSetResultCount('20','offlineRet',2)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['20'].data.offlineCancel" @input="inputSetResultCount('20','offlineCancel',3)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['20'].data.offlineTotal" readonly></td>
                        <!--온라인-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['20'].data.onlineCur" @input="inputSetResultCount('20','onlineCur',5)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['20'].data.onlineRet" @input="inputSetResultCount('20','onlineRet',6)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['20'].data.onlineCancel" @input="inputSetResultCount('20','onlineCancel',7)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['20'].data.onlineTotal" readonly></td>
                        <!--자진발급-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['20'].data.selfCur" @input="inputSetResultCount('20','selfCur',9)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['20'].data.selfRet" @input="inputSetResultCount('20','selfRet',10)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['20'].data.selfCancel" @input="inputSetResultCount('20','selfCancel',11)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['20'].data.selfTotal" readonly></td>
                        <!--전체합계-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['20'].data.total" readonly></td>
                    </tr>
                    <tr class="sum02">
                        <th scope="row">소계</th>
                        <!--비온라인-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['21'].data.offlineCur" readonly></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['21'].data.offlineRet" readonly></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['21'].data.offlineCancel" readonly></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['21'].data.offlineTotal" readonly></td>
                        <!--온라인-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['21'].data.onlineCur" readonly></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['21'].data.onlineRet" readonly></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['21'].data.onlineCancel" readonly></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['21'].data.onlineTotal" readonly></td>
                        <!--자진발급-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['21'].data.selfCur" readonly></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['21'].data.selfRet" readonly></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['21'].data.selfCancel" readonly></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['21'].data.selfTotal" readonly></td>
                        <!--전체합계-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['21'].data.total" readonly></td>
                    </tr>
                    <tr>
                        <th scope="row" rowspan="3">롯데</th>
                        <th scope="row">일반</th>
                        <!--비온라인-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['22'].data.offlineCur" @input="inputSetResultCount('22','offlineCur',1)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['22'].data.offlineRet" @input="inputSetResultCount('22','offlineRet',2)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['22'].data.offlineCancel" @input="inputSetResultCount('22','offlineCancel',3)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['22'].data.offlineTotal" readonly></td>
                        <!--온라인-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['22'].data.onlineCur" @input="inputSetResultCount('22','onlineCur',5)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['22'].data.onlineRet" @input="inputSetResultCount('22','onlineRet',6)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['22'].data.onlineCancel" @input="inputSetResultCount('22','onlineCancel',7)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['22'].data.onlineTotal" readonly></td>
                        <!--자진발급-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['22'].data.selfCur" @input="inputSetResultCount('22','selfCur',9)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['22'].data.selfRet" @input="inputSetResultCount('22','selfRet',10)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['22'].data.selfCancel" @input="inputSetResultCount('22','selfCancel',11)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['22'].data.selfTotal" readonly></td>
                        <!--전체합계-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['22'].data.total" readonly></td>
                    </tr>
                    <tr>
                        <th scope="row">편의점</th>
                        <!--비온라인-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['23'].data.offlineCur" @input="inputSetResultCount('23','offlineCur',1)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['23'].data.offlineRet" @input="inputSetResultCount('23','offlineRet',2)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['23'].data.offlineCancel" @input="inputSetResultCount('23','offlineCancel',3)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['23'].data.offlineTotal" readonly></td>
                        <!--온라인-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['23'].data.onlineCur" @input="inputSetResultCount('23','onlineCur',5)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['23'].data.onlineRet" @input="inputSetResultCount('23','onlineRet',6)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['23'].data.onlineCancel" @input="inputSetResultCount('23','onlineCancel',7)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['23'].data.onlineTotal" readonly></td>
                        <!--자진발급-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['23'].data.selfCur" @input="inputSetResultCount('23','selfCur',9)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['23'].data.selfRet" @input="inputSetResultCount('23','selfRet',10)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['23'].data.selfCancel" @input="inputSetResultCount('23','selfCancel',11)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['23'].data.selfTotal" readonly></td>
                        <!--전체합계-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['23'].data.total" readonly></td>
                    </tr>
                    <tr class="sum02">
                        <th scope="row">소계</th>
                        <!--비온라인-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['24'].data.offlineCur" readonly></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['24'].data.offlineRet" readonly></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['24'].data.offlineCancel" readonly></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['24'].data.offlineTotal" readonly></td>
                        <!--온라인-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['24'].data.onlineCur" readonly></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['24'].data.onlineRet" readonly></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['24'].data.onlineCancel" readonly></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['24'].data.onlineTotal" readonly></td>
                        <!--자진발급-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['24'].data.selfCur" readonly></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['24'].data.selfRet" readonly></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['24'].data.selfCancel" readonly></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['24'].data.selfTotal" readonly></td>
                        <!--전체합계-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['24'].data.total" readonly></td>
                    </tr>
                    <tr class="sum01">
                        <th scope="row" colspan="2">합계</th>
                        <!--비온라인-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['25'].data.offlineCur" readonly></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['25'].data.offlineRet" readonly></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['25'].data.offlineCancel" readonly></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['25'].data.offlineTotal" readonly></td>
                        <!--온라인-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['25'].data.onlineCur" readonly></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['25'].data.onlineRet" readonly></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['25'].data.onlineCancel" readonly></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['25'].data.onlineTotal" readonly></td>
                        <!--자진발급-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['25'].data.selfCur" readonly></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['25'].data.selfRet" readonly></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['25'].data.selfCancel" readonly></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['25'].data.selfTotal" readonly></td>
                        <!--전체합계-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['25'].data.total" readonly></td>
                    </tr>
                    <!-- 			<tr>
                                    <td colspan="16" class="no_data">조회된 내용이 없습니다.</td>
                                </tr> -->
                    </tbody>
                </table>
            </div>
            <!-- //tbl scroll box -->

            <!-- tbl list04 box bot -->
            <div class="tbl_list04_box bot">
                <!-- tbl list04 -->
                <table class="tbl_list04 type02">
                    <caption>현금영수증 사업자별 정산</caption>
                    <colgroup>
                        <col span="6">
                    </colgroup>
                    <thead>
                    <tr>
                        <th scope="col">품목</th>
                        <th scope="col">수량</th>
                        <th scope="col">공급가액</th>
                        <th scope="col">부가세</th>
                        <th scope="col">합계</th>
                        <th scope="col">비고</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <th scope="row" class="left">당월정산 ①</th>
                        <td class="right"><input type="text" class="input form_price" v-model="countTotal.receiptCount" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" v-model="countTotal.receiptAmt" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" v-model="countTotal.receiptVat" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" v-model="countTotal.receiptTotal" title="금액"></td>
                        <td class="left"></td>
                    </tr>
                    <tr>
                        <th scope="row" class="left">취소정산 ②</th>
                        <td class="right"><input type="text" class="input form_price" v-model="countTotal.receiptCancelCount" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" v-model="countTotal.receiptCancelAmt" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" v-model="countTotal.receiptCancelVat" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" v-model="countTotal.receiptCancelTotal" title="금액"></td>
                        <td class="left"></td>
                    </tr>
                    <tr>
                        <th scope="row" class="left">소급정산 ③</th>
                        <td class="right"><input type="text" class="input form_price" v-model="countTotal.receiptRetCount" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" v-model="countTotal.receiptRetAmt" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" v-model="countTotal.receiptRetVat" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" v-model="countTotal.receiptRetTotal" title="금액"></td>
                        <td class="left"></td>
                    </tr>
                    <tr>
                        <th scope="row" class="left">최종정산 (①-②+③)</th>
                        <td class="right"><input type="text" class="input form_price" v-model="countTotal.finalCount" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" v-model="countTotal.finalAtm" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" v-model="countTotal.finalVat" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" v-model="countTotal.finalTotal" title="금액"></td>
                        <td class="left"></td>
                    </tr>
                    </tbody>
                </table>
            </div>

            <!-- btn bot -->
            <div class="btn_bot">
                <button type="button" @click="tempReg" class="btn_b01 bg02">임시저장</button>
                <span class="form_sch">
					<select  class="select sch_save" title="저장" v-model="sendType">
						<option value="">선택</option>
						<option value="TEMP">가정산 저장</option>
						<option value="TAX">국세청 저장</option>
					</select>
				</span>
                <button type="button" @click="reg" class="btn_b01 bg01">저장</button>
                <button type="button" @click="listGo" class="btn_b01 bg03">돌아가기</button>
            </div>

        </div>
        <!-- //content -->
    </section>
    <!-- //container -->
</template>

<script lang="ts">

    import {Component, Vue} from 'vue-property-decorator';
    import moment from "moment"
    import {CommonBoardService} from '../../../api/common.service';

    @Component({

        components: {
            JungsanReg
        }
    })
    export default class JungsanReg extends Vue {
        //서치박스
        preDate : any = "" // 이전정산일
        curDate : any = ""; // 현재정산일
        nowDate : any = "";  //정산월
        countTotal : any = [];
        jungsanData :any = [];
        jungsanRate : any = [];
        junhsanRateOk : boolean = false;
        saupJaJungSanSummaryAddDto : any = {curStandardDate: '',jungsanMonth: '',jungsanType: '',previewStandardDate: '',
            regId: '',status: '',
            finalAtm: 0,finalCount: 0,finalTotal: 0,finalVat: 0,receiptAmt: 0,receiptCancelAmt: 0,receiptCancelCount: 0,
            receiptCancelTotal: 0,receiptCancelVat: 0,receiptCount: 0,receiptRetAmt: 0,receiptRetCount: 0,receiptRetTotal: 0,
            receiptRetVat: 0,receiptTotal: 0,receiptVat: 0 }
        saupJaJungSanlList : any = []
        saupjaJungSanTaxList : any = [];

        taxList : any = "";
        nowDT :any = "";
        sendType : string = "";
        realList : any = [
            {id:'0' , data: {}},{id:'1' , data: {}},{id:'2' , data: {}},{id:'3' , data: {}},{id:'4' , data: {}},{id:'5' , data: {}},{id:'6' , data: {}},{id:'7' , data: {}},
            {id:'8' , data: {}},{id:'9' , data: {}},{id:'10' , data: {}},{id:'11' , data: {}},{id:'12' , data: {}},{id:'13' , data: {}},{id:'14' , data: {}},{id:'15' , data: {}},
            {id:'16' , data: {}},{id:'17' , data: {}},{id:'18' , data: {}},{id:'19' , data: {}},{id:'20' , data: {}},{id:'21' , data: {}},{id:'22' , data: {}},{id:'23' , data: {}},
            {id:'24' , data: {}},{id:'25' , data: {}}
        ];


        lang1 : any =  {
            days: ['일', '월', '화', '수', '목', '금', '토'],
            months: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
            pickers: ['다음주', '다음달', '이전주', '이전달'],
            placeholder: {
                date: '집계 기준일',
                dateRange: '정산기간'
            }
        }
        nowKo:any='';

        created(){
            let  nowUTC =  moment().utc() ; //UTC시간
           this.nowKo= nowUTC.add(9, 'hours')// 한국시간


            this.dateSet()
            this.getRate()
        }

        dateSet(){
            this.nowDT = moment(this.nowKo).format('YYYY-MM-DD'),
            this.curDate= moment(moment().startOf('month')).subtract(1,'month');
            this.preDate= moment(this.curDate).subtract(1, 'month')
            this.nowDate= moment(this.curDate).subtract(1, 'month')
        }

        getRate(){
            let date = moment(this.curDate).format('YYYYMMDD')
            CommonBoardService.getListDatas('statistics/jungsanrate/'+date,'rate',null).then(result=>{
                 if(result.status==200){
                     if (result.data > 0){
                     this.jungsanRate = result.data
                     this.junhsanRateOk = true;
                     }
                 }else{
                 }
            })
        }

        dateFormat(date){
            return moment(date).format('YYYY-MM-DD')
        }

        roadData(){

            if(this.junhsanRateOk){
            let loadDatas :any = {
                curStandardDate : moment(this.curDate).format('YYYYMMDD') ,
                previewStandardDate : moment(this.preDate).format('YYYYMMDD'),
                jungsanmonth  : moment(this.nowDate).format('YYYYMM')
            }

            CommonBoardService.getListDatas('statistics/saupjajungsan/data',moment(this.nowDate).format('YYYYMM'),loadDatas).then(result=>{
                if(result.status==200){
                    this.countTotal  = result.data.summary  // 정산합계
                    this.taxList  =result.data.tax
                    let ObjectTax :any[]  = result.data.tax  // 국세청자료
                    let ObjectList :any[]  = result.data.data   //
                    this.realList=[];
                    ObjectTax.filter((e,index)=>{
                        this.realList.push({id:index+'' , data: e})
                    })
                    ObjectList.filter((e,index)=>{
                        this.realList.push({id:index+6+'' , data: e})
                    })
                }

            })
            }else{
                Vue.swal({text:"정산률이 존재하지 않습니다"})
            }

        }

        colColumData3(colum,data,num){ //조세지원액
            if (data == 1 || data == 2 || data == 3) {
                this.realList['4'].data[colum]  =  this.realList['3'].data[colum] * this.jungsanRate.taxOffline
                this.realList['4'].data['offlineTotal'] =  this.nullCheck(Number(this.realList['3'].data['offlineTotal']))* this.jungsanRate.taxOffline
                this.realList['4'].data['total'] = this.nullCheck(Number(this.realList['4'].data['offlineTotal']))+ this.nullCheck(Number(this.realList['4'].data['onlineTotal']))+this.nullCheck(Number(this.realList['4'].data['selfTotal']))
            }else if (data == 5 || data == 6 || data == 7) {
                this.realList['4'].data[colum]  =  this.realList['3'].data[colum] * this.jungsanRate.taxOnline
                this.realList['4'].data['onlineTotal'] = this.nullCheck(Number(this.realList['3'].data['onlineTotal'])) * this.jungsanRate.taxOnline
                this.realList['4'].data['total'] = this.nullCheck(Number(this.realList['4'].data['offlineTotal']))+ this.nullCheck(Number(this.realList['4'].data['onlineTotal']))+this.nullCheck(Number(this.realList['4'].data['selfTotal']))
            }else if (data == 9 || data == 10 || data == 11) {
                this.realList['4'].data[colum]  =  this.realList['3'].data[colum] * this.jungsanRate.taxSelf
                this.realList['4'].data['selfTotal'] = this.nullCheck(Number(this.realList['3'].data['selfTotal']))* this.jungsanRate.taxSelf
                this.realList['4'].data['total'] = this.nullCheck(Number(this.realList['4'].data['offlineTotal']))+ this.nullCheck(Number(this.realList['4'].data['onlineTotal']))+this.nullCheck(Number(this.realList['4'].data['selfTotal']))
            }
        }

        colColumData2(row,data,num){
            if (data == 1 || data == 2 || data == 3) {
                this.realList[num].data['offlineTotal'] =
                    this.nullCheck(Number(this.realList[num].data['offlineCur'])) + this.nullCheck(Number(this.realList[num].data['offlineRet']))- this.nullCheck(Number(this.realList[num].data['offlineCancel']))
                this.realList[num].data['total'] = this.nullCheck(Number(this.realList[num].data['offlineTotal']))+ this.nullCheck(Number(this.realList[num].data['onlineTotal']))+this.nullCheck(Number(this.realList[num].data['selfTotal']))
            }else if (data == 5 || data == 6 || data == 7) {
                this.realList[num].data['onlineTotal'] =
                    this.nullCheck(Number(this.realList[num].data['onlineCur'])) + this.nullCheck(Number(this.realList[num].data['onlineRet']))- this.nullCheck(Number(this.realList[num].data['onlineCancel']))
                this.realList[num].data['total'] = this.nullCheck(Number(this.realList[num].data['offlineTotal']))+ this.nullCheck(Number(this.realList[num].data['onlineTotal']))+this.nullCheck(Number(this.realList[num].data['selfTotal']))
            }else if (data == 9 || data == 10 || data == 11) {
                this.realList[num].data['selfTotal'] =
                    this.nullCheck(Number(this.realList[num].data['selfCur'])) + this.nullCheck(Number(this.realList[num].data['selfRet']))- this.nullCheck(Number(this.realList[num].data['selfCancel']))
                this.realList[num].data['total'] = this.nullCheck(Number(this.realList[num].data['offlineTotal']))+ this.nullCheck(Number(this.realList[num].data['onlineTotal']))+this.nullCheck(Number(this.realList[num].data['selfTotal']))
            }
        }


        colColumData(row,data,num) {
            if (data == 1 || data == 2 || data == 3) {
                // 콜->합계
                this.realList[row].data['offlineTotal'] =
                    this.nullCheck(Number(this.realList[row].data['offlineCur'])) + this.nullCheck(Number(this.realList[row].data['offlineRet']))- this.nullCheck(Number(this.realList[row].data['offlineCancel']))
                // 콜->합계 로우더한것
                this.realList[num.toString()].data['offlineTotal'] =  this.nullCheck(Number(this.realList[(num-2).toString()].data['offlineTotal'])) +   this.nullCheck(Number(this.realList[(num-1).toString()].data['offlineTotal']))
                // 로우 전체 합계
                this.realList[row].data['total'] = this.nullCheck(Number(this.realList[row].data['offlineTotal']))+ this.nullCheck(Number(this.realList[row].data['onlineTotal']))+this.nullCheck(Number(this.realList[row].data['selfTotal']))
            }
            else if (data == 5 || data == 6 || data == 7) {
                    this.realList[row].data['onlineTotal'] =
                        this.nullCheck(Number(this.realList[row].data['onlineCur'])) + this.nullCheck(Number(this.realList[row].data['onlineRet'])) - this.nullCheck(Number(this.realList[row].data['onlineCancel']))
                this.realList[num.toString()].data['onlineTotal'] =  this.nullCheck(Number(this.realList[(num-2).toString()].data['onlineTotal'])) +   this.nullCheck(Number(this.realList[(num-1).toString()].data['onlineTotal']))
                this.realList[row].data['total'] = this.nullCheck(Number(this.realList[row].data['offlineTotal']))+ this.nullCheck(Number(this.realList[row].data['onlineTotal']))+this.nullCheck(Number(this.realList[row].data['selfTotal']))
            } else if (data == 9 || data == 10 || data == 11) {
                    this.realList[row].data['selfTotal'] =
                        this.nullCheck(Number(this.realList[row].data['selfCur'])) + this.nullCheck(Number(this.realList[row].data['selfRet'])) - this.nullCheck(Number(this.realList[row].data['selfCancel']))
                this.realList[num.toString()].data['selfTotal'] =  this.nullCheck(Number(this.realList[(num-2).toString()].data['selfTotal'])) +   this.nullCheck(Number(this.realList[(num-1).toString()].data['selfTotal']))
                this.realList[row].data['total'] = this.nullCheck(Number(this.realList[row].data['offlineTotal']))+ this.nullCheck(Number(this.realList[row].data['onlineTotal']))+this.nullCheck(Number(this.realList[row].data['selfTotal']))
            }
        }

        inputSetTax(){ //국세청 데이터변경시
        }

        // 그외 데이터 변경시
        inputSetResultCount(row , data ,col){ //정산건수 데이터변경시

            if(row==0 || row == 1 || row==2 ){
                this.realList['3'].data[data] =   this.nullCheck(Number(this.realList['0'].data[data])) - this.nullCheck(Number(this.realList['1'].data[data])) - this.nullCheck(Number(this.realList['2'].data[data]))
                this.colColumData(row,col,3)  // 콜합계
                this.realList['3'].data['total'] = this.nullCheck(Number(this.realList['3'].data['offlineTotal']))+ this.nullCheck(Number(this.realList['3'].data['onlineTotal']))+this.nullCheck(Number(this.realList['3'].data['selfTotal']))
                this.colColumData2(row,col,3)  // 콜별 계산
                this.colColumData3(data,col,4)  //조세지원액변경

            }else if(row==5 || row==6){ // 소계 정산
                this.realList['7'].data[data] =   this.nullCheck(Number(this.realList['5'].data[data])) + this.nullCheck(Number(this.realList['6'].data[data]))
                this.colColumData(row,col,7)  // 콜합계
                this.realList['7'].data['total'] = this.nullCheck(Number(this.realList['7'].data['offlineTotal']))+ this.nullCheck(Number(this.realList['7'].data['onlineTotal']))+this.nullCheck(Number(this.realList['7'].data['selfTotal']))
                //각 소계 합
                this.realList['11'].data[data]=   this.nullCheck(Number(this.realList['7'].data[data])) +  this.nullCheck(Number(this.realList['10'].data[data]))
                this.realList['11'].data['total']=   this.nullCheck(Number(this.realList['11'].data['offlineTotal']))+ this.nullCheck(Number(this.realList['11'].data['onlineTotal']))+this.nullCheck(Number(this.realList['11'].data['selfTotal']))
                this.colColumData2(row,col,11)  // 콜합계
                this.toTalCountResult()

            }else if(row==8 || row ==9){
                this.realList['10'].data[data] =  this.nullCheck(Number(this.realList['8'].data[data])) + this.nullCheck(Number(this.realList['9'].data[data]))
                this.colColumData(row,col,10)  // 콜합계
                //소계
                this.realList['10'].data['total'] = this.nullCheck(Number(this.realList['10'].data['offlineTotal']))+ this.nullCheck(Number(this.realList['10'].data['onlineTotal']))+this.nullCheck(Number(this.realList['10'].data['selfTotal']))
                //각 소계 합
                this.realList['11'].data[data]=   this.nullCheck(Number(this.realList['7'].data[data])) +  this.nullCheck(Number(this.realList['10'].data[data]))
                this.realList['11'].data['total']=   this.nullCheck(Number(this.realList['11'].data['offlineTotal']))+ this.nullCheck(Number(this.realList['11'].data['onlineTotal']))+this.nullCheck(Number(this.realList['11'].data['selfTotal']))
                this.colColumData2(row,col,11)  // 콜합계의 합계
                this.toTalCountResult()
            }else if(row==12 || row ==13){
                this.realList['14'].data[data] =  this.nullCheck(Number(this.realList['12'].data[data])) + this.nullCheck(Number(this.realList['13'].data[data]))
                this.colColumData(row,col,14)  // 콜합계

                //소계
                this.realList['14'].data['total'] = this.nullCheck(Number(this.realList['14'].data['offlineTotal']))+ this.nullCheck(Number(this.realList['14'].data['onlineTotal']))+this.nullCheck(Number(this.realList['13'].data['selfTotal']))
                //각 소계 합
                this.realList['18'].data[data]=   this.nullCheck(Number(this.realList['14'].data[data])) +  this.nullCheck(Number(this.realList['17'].data[data]))
                this.realList['18'].data['total']=   this.nullCheck(Number(this.realList['18'].data['offlineTotal']))+ this.nullCheck(Number(this.realList['18'].data['onlineTotal']))+this.nullCheck(Number(this.realList['18'].data['selfTotal']))
                this.colColumData2(row,col,18)
                this.toTalCountResult()

            }else if(row==15 || row ==16){
                this.realList['17'].data[data] =  this.nullCheck(Number(this.realList['15'].data[data])) + this.nullCheck(Number(this.realList['16'].data[data]))
                this.colColumData(row,col,17)  // 콜합계

                //소계
                this.realList['17'].data['total'] = this.nullCheck(Number(this.realList['17'].data['offlineTotal']))+ this.nullCheck(Number(this.realList['17'].data['onlineTotal']))+this.nullCheck(Number(this.realList['16'].data['selfTotal']))
                //각 소계 합
                this.realList['18'].data[data]=   this.nullCheck(Number(this.realList['14'].data[data])) +  this.nullCheck(Number(this.realList['17'].data[data]))
                this.realList['18'].data['total']=   this.nullCheck(Number(this.realList['18'].data['offlineTotal']))+ this.nullCheck(Number(this.realList['18'].data['onlineTotal']))+this.nullCheck(Number(this.realList['18'].data['selfTotal']))
                this.colColumData2(row,col,18)
                this.toTalCountResult()
            }else if(row==19 || row ==20){
                this.realList['21'].data[data] =  this.nullCheck(Number(this.realList['19'].data[data])) + this.nullCheck(Number(this.realList['20'].data[data]))
                this.colColumData(row,col,21)  // 콜합계

                this.realList['21'].data['total'] = this.nullCheck(Number(this.realList['21'].data['offlineTotal']))+ this.nullCheck(Number(this.realList['21'].data['onlineTotal']))+this.nullCheck(Number(this.realList['19'].data['selfTotal']))
                //각 소계 합
                this.realList['25'].data[data]=   this.nullCheck(Number(this.realList['21'].data[data])) +  this.nullCheck(Number(this.realList['24'].data[data]))
                this.realList['25'].data['total']=   this.nullCheck(Number(this.realList['25'].data['offlineTotal']))+ this.nullCheck(Number(this.realList['25'].data['onlineTotal']))+this.nullCheck(Number(this.realList['25'].data['selfTotal']))
                this.colColumData2(row,col,25)
                this.toTalCountResult()
            }else if(row==22 || row ==23){
                this.realList['24'].data[data] =  this.nullCheck(Number(this.realList['22'].data[data])) + this.nullCheck(Number(this.realList['23'].data[data]))
                this.colColumData(row,col,24)  // 콜합계

                this.realList['24'].data['total'] = this.nullCheck(Number(this.realList['24'].data['offlineTotal']))+ this.nullCheck(Number(this.realList['24'].data['onlineTotal']))+this.nullCheck(Number(this.realList['22'].data['selfTotal']))
                //각 소계 합
                this.realList['25'].data[data]=   this.nullCheck(Number(this.realList['21'].data[data])) +  this.nullCheck(Number(this.realList['24'].data[data]))
                this.realList['25'].data['total']=   this.nullCheck(Number(this.realList['25'].data['offlineTotal']))+ this.nullCheck(Number(this.realList['25'].data['onlineTotal']))+this.nullCheck(Number(this.realList['25'].data['selfTotal']))
                this.colColumData2(row,col,25)
                this.toTalCountResult()
            }

        }
        toTalCountResult(){
            //당월정산
            this.countTotal.receiptCount = this.nullCheck(Number(this.realList['10'].data['offlineCur'])) + this.nullCheck(Number(this.realList['10'].data['offlineRet'])) +this.nullCheck(Number(this.realList['10'].data['onlineCur'])) + this.nullCheck(Number(this.realList['10'].data['onlineRet']))
                                            +this.nullCheck(Number(this.realList['10'].data['selfCur'])) + this.nullCheck(Number(this.realList['10'].data['selfRet']))
            this.countTotal.receiptAmt =  this.nullCheck(Number(this.realList['24'].data['offlineCur'])) + this.nullCheck(Number(this.realList['24'].data['offlineRet'])) +this.nullCheck(Number(this.realList['24'].data['onlineCur'])) + this.nullCheck(Number(this.realList['24'].data['onlineRet']))
                                             +this.nullCheck(Number(this.realList['24'].data['selfCur'])) + this.nullCheck(Number(this.realList['24'].data['selfRet']))
            this.countTotal.receiptVat =    (this.nullCheck(Number(this.countTotal.receiptAmt)) / 10).toFixed(0)
            this.countTotal.receiptTotal =  this.nullCheck(Number(this.countTotal.receiptAmt)) + this.nullCheck(Number(this.countTotal.receiptVat))
            //취소정산
            this.countTotal.receiptCancelCount = this.nullCheck(Number(this.realList['10'].data['offlineCancel'])) + this.nullCheck(Number(this.realList['10'].data['onlineCancel'])) +this.nullCheck(Number(this.realList['10'].data['selfCancel']))
            this.countTotal.receiptCancelAmt =this.nullCheck(Number(this.realList['24'].data['offlineCancel'])) + this.nullCheck(Number(this.realList['24'].data['onlineCancel'])) +this.nullCheck(Number(this.realList['24'].data['selfCancel']))
            this.countTotal.receiptCancelVat =  (this.nullCheck(Number(this.countTotal.receiptCancelAmt)) /10).toFixed(0)
            this.countTotal.receiptCancelTotal=  this.nullCheck(Number(this.countTotal.receiptCancelAmt))+this.nullCheck(Number(this.countTotal.receiptCancelVat))
            //소급정산
            this.countTotal.receiptRetCount = this.countTotal.receiptRetCount
            this.countTotal.receiptRetAmt = this.countTotal.receiptRetAmt
            this.countTotal.receiptRetVat =  (this.nullCheck(Number(this.countTotal.receiptRetAmt)) / 10).toFixed(0)
            this.countTotal.receiptRetTotal=  this.nullCheck(Number(this.countTotal.receiptRetVat))+this.nullCheck(Number(this.countTotal.receiptRetTotal))
            //최종정산
            this.countTotal.finalCount = this.nullCheck(Number(this.countTotal.receiptCount)) -  this.nullCheck(Number(this.countTotal.receiptCancelCount)) - this.nullCheck(Number(this.countTotal.receiptRetCount))
            this.countTotal.finalAmt = this.nullCheck(Number(this.countTotal.receiptAmt)) - this.nullCheck(Number(this.countTotal.receiptCancelAmt))-this.nullCheck(Number(this.countTotal.receiptRetAmt))
            this.countTotal.finalVat = (this.nullCheck(Number(this.countTotal.finalAmt)) / 10).toFixed(0)
            this.countTotal.finalTotal = this.nullCheck(Number(this.countTotal.finalVat))+this.nullCheck(Number(this.countTotal.finalTotal))
        }

        nullCheck(data){
            if(data){
                return data
            }else{
                return 0
            }
        }


        /**
         * 임시저장
         */
        tempReg(){

            if(this.sendType==''){
                alert('저장 타입을 선택해주세요')
                return ;
            }else{
                this.countTotal.jungsanType=this.sendType
            }


            console.log(this.realList['25'].data['total'])

            let listReal : any = [];
            this.realList.filter((e,index)=>{
                if(index >4){
                    if(index < 25){
                    listReal.push(e.data)
                    }
                }
            })

            console.log(listReal);

            // let object = {
            //     curStandardDate : moment(this.curDate).format('YYYYMMDD'),
            //     jungSanMonth : moment(this.nowDate).format('YYYYMM'),
            //     previewStandardDate :  moment(this.preDate).format('YYYYMMDD'),
            //     saupJaJungSanSummaryAddDto :  this.realList['25'],
            //     saupJaJungSanlList: listReal,
            //     saupjaJungSanTaxList : ''
            // }


            // CommonBoardService.postListDatas('statistics/saupjajungsan','temp',object).then(result=>{
            //     if(result.status==201){
            //         alert('전송완료')
            //         // this.$router.push({path:'receipSaupCount' });
            //     }
            // })
        }

        /**
         * 저장
         */
        reg(){
            if(this.sendType==''){
                alert('저장 타입을 선택해주세요')
                return ;
            }else{
                this.countTotal.jungsanType=this.sendType
            }

            let listReal : any = [];
            this.realList.filter((e,index)=>{
                if(index >4){
                listReal.push(e.data)
                }
            })



            let object = {
                curStandardDate : moment(this.curDate).format('YYYYMMDD'),
                jungSanMonth : moment(this.nowDate).format('YYYYMM'),
                previewStandardDate :  moment(this.preDate).format('YYYYMMDD'),
                saupJaJungSanSummaryAddDto :  this.countTotal,
                saupJaJungSanlList: listReal,
                saupjaJungSanTaxList : this.taxList
            }
            //
            // CommonBoardService.postListDatas('statistics/saupjajungsan','ready',object).then(result=>{
            //     if(result.status==201){
            //         alert('전송완료')
            //         // this.$router.push({path:'receipSaupCount' });
            //     }
            // })

        }

        listGo(){
            this.$router.push({path:'receipSaupCount' });
        }

    }
</script>

<style scoped>

</style>