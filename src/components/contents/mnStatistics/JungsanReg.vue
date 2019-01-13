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
            <div class="cash_title">2018년 9월 현금영수증 국세청정산</div>

            <div class="data_date01">작성일자 : 2018년 10월 15일</div>
            <div class="data_date02">(2018년 10월 1일 기준)</div>

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
                        <th scope="col" colspan="4">국세청 기준단가 (<em class="fc_pt01">12.5</em>원)</th>
                        <th scope="col" colspan="4">국세청 기준단가 (<em class="fc_pt01">11.5</em>원)</th>
                        <th scope="col" colspan="4">국세청 기준단가 (<em class="fc_pt01">11.5</em>원)</th>
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
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['0'].data.offlineCur" @input="inputSetTax(realList['0'].data.offlineCur)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['0'].data.offlineRet" @input="inputSetTax(realList['0'].data.offlineRet)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['0'].data.offlineCancel" @input="inputSetTax(realList['0'].data.offlineCancel)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['0'].data.offlineTotal" @input="inputSetTax(realList['0'].data.offlineTotal)"></td>
                        <!--온라인-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['0'].data.onlineCur" @input="inputSetTax(realList['0'].data.onlineCur)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['0'].data.onlineRet" @input="inputSetTax(realList['0'].data.onlineRet)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['0'].data.onlineCancel" @input="inputSetTax(realList['0'].data.onlineCancel)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['0'].data.onlineTotal" @input="inputSetTax(realList['0'].data.onlineTotal)"></td>
                        <!--자진발급-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['0'].data.selfCur" @input="inputSetTax(realList['0'].data.selfCur)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['0'].data.selfRet" @input="inputSetTax(realList['0'].data.selfRet)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['0'].data.selfCancel" @input="inputSetTax(realList['0'].data.selfCancel)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['0'].data.selfTotal" @input="inputSetTax(realList['0'].data.selfTotal)"></td>
                        <!--전체합계-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['0'].data.total" @input="inputSetTax(realList['0'].data.total)"></td>
                    </tr>
                    <tr>
                        <th scope="row">삭제건수</th>
                        <!--비온라인-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['1'].data.offlineCur" @input="inputSetTax(realList['1'].data.offlineCur)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['1'].data.offlineRet" @input="inputSetTax(realList['1'].data.offlineRet)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['1'].data.offlineCancel" @input="inputSetTax(realList['1'].data.offlineCancel)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['1'].data.offlineTotal" @input="inputSetTax(realList['1'].data.offlineTotal)"></td>
                        <!--온라인-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['1'].data.onlineCur" @input="inputSetTax(realList['1'].data.onlineCur)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['1'].data.onlineRet" @input="inputSetTax(realList['1'].data.onlineRet)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['1'].data.onlineCancel" @input="inputSetTax(realList['1'].data.onlineCancel)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['1'].data.onlineTotal" @input="inputSetTax(realList['1'].data.onlineTotal)"></td>
                        <!--자진발급-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['1'].data.selfCur" @input="inputSetTax(realList['1'].data.selfCur)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['1'].data.selfRet" @input="inputSetTax(realList['1'].data.selfRet)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['1'].data.selfCancel" @input="inputSetTax(realList['1'].data.selfCancel)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['1'].data.selfTotal" @input="inputSetTax(realList['1'].data.selfTotal)"></td>
                        <!--전체합계-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['1'].data.total" @input="inputSetTax(realList['1'].data.total)"></td>
                    </tr>
                    <tr>
                        <th scope="row">기타오류</th>
                        <!--비온라인-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['2'].data.offlineCur" @input="inputSetTax(realList['2'].data.offlineCur)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['2'].data.offlineRet" @input="inputSetTax(realList['2'].data.offlineRet)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['2'].data.offlineCancel" @input="inputSetTax(realList['2'].data.offlineCancel)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['2'].data.offlineTotal" @input="inputSetTax(realList['2'].data.offlineTotal)"></td>
                        <!--온라인-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['2'].data.onlineCur" @input="inputSetTax(realList['2'].data.onlineCur)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['2'].data.onlineRet" @input="inputSetTax(realList['2'].data.onlineRet)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['2'].data.onlineCancel" @input="inputSetTax(realList['2'].data.onlineCancel)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['2'].data.onlineTotal" @input="inputSetTax(realList['2'].data.onlineTotal)"></td>
                        <!--자진발급-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['2'].data.selfCur" @input="inputSetTax(realList['2'].data.selfCur)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['2'].data.selfRet" @input="inputSetTax(realList['2'].data.selfRet)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['2'].data.selfCancel" @input="inputSetTax(realList['2'].data.selfCancel)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['2'].data.selfTotal" @input="inputSetTax(realList['2'].data.selfTotal)"></td>
                        <!--전체합계-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['2'].data.total" @input="inputSetTax(realList['2'].data.total)"></td>
                    </tr>
                    <tr class="sum01">
                        <th scope="row">합계</th>
                        <!--비온라인-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['3'].data.offlineCur" @input="inputSetTax(realList['3'].data.offlineCur)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['3'].data.offlineRet" @input="inputSetTax(realList['3'].data.offlineRet)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['3'].data.offlineCancel" @input="inputSetTax(realList['3'].data.offlineCancel)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['3'].data.offlineTotal" @input="inputSetTax(realList['3'].data.offlineTotal)"></td>
                        <!--온라인-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['3'].data.onlineCur" @input="inputSetTax(realList['3'].data.onlineCur)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['3'].data.onlineRet" @input="inputSetTax(realList['3'].data.onlineRet)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['3'].data.onlineCancel" @input="inputSetTax(realList['3'].data.onlineCancel)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['3'].data.onlineTotal" @input="inputSetTax(realList['3'].data.onlineTotal)"></td>
                        <!--자진발급-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['3'].data.selfCur" @input="inputSetTax(realList['3'].data.selfCur)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['3'].data.selfRet" @input="inputSetTax(realList['3'].data.selfRet)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['3'].data.selfCancel" @input="inputSetTax(realList['3'].data.selfCancel)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['3'].data.selfTotal" @input="inputSetTax(realList['3'].data.selfTotal)"></td>
                        <!--전체합계-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['3'].data.total" @input="inputSetTax(realList['3'].data.total)"></td>
                    </tr>
                    <tr class="sum02">
                        <th scope="row" colspan="2"><strong>조세지원액</strong></th>
                        <!--비온라인-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['4'].data.offlineCur" @input="inputSetTax(realList['4'].data.offlineCur)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['4'].data.offlineRet" @input="inputSetTax(realList['4'].data.offlineRet)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['4'].data.offlineCancel" @input="inputSetTax(realList['4'].data.offlineCancel)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['4'].data.offlineTotal" @input="inputSetTax(realList['4'].data.offlineTotal)"></td>
                        <!--온라인-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['4'].data.onlineCur" @input="inputSetTax(realList['4'].data.onlineCur)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['4'].data.onlineRet" @input="inputSetTax(realList['4'].data.onlineRet)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['4'].data.onlineCancel" @input="inputSetTax(realList['4'].data.onlineCancel)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['4'].data.onlineTotal" @input="inputSetTax(realList['4'].data.onlineTotal)"></td>
                        <!--자진발급-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['4'].data.selfCur" @input="inputSetTax(realList['4'].data.selfCur)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['4'].data.selfRet" @input="inputSetTax(realList['4'].data.selfRet)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['4'].data.selfCancel" @input="inputSetTax(realList['4'].data.selfCancel)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['4'].data.selfTotal" @input="inputSetTax(realList['4'].data.selfTotal)"></td>
                        <!--전체합계-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['4'].data.total" @input="inputSetTax(realList['4'].data.total)"></td>
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
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['10'].data.offlineCur" @input="inputSetResultCount('10','offlineCur',1)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['10'].data.offlineRet" @input="inputSetResultCount('10','offlineRet',2)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['10'].data.offlineCancel" @input="inputSetResultCount('10','offlineCancel',3)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['10'].data.offlineTotal" readonly></td>
                        <!--온라인-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['10'].data.onlineCur" @input="inputSetResultCount('10','onlineCur',5)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['10'].data.onlineRet" @input="inputSetResultCount('10','onlineRet',6)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['10'].data.onlineCancel" @input="inputSetResultCount('10','onlineCancel',7)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['10'].data.onlineTotal" readonly></td>
                        <!--자진발급-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['10'].data.selfCur" @input="inputSetResultCount('10','selfCur',9)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['10'].data.selfRet" @input="inputSetResultCount('10','selfRet',10)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['10'].data.selfCancel" @input="inputSetResultCount('10','selfCancel',11)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['10'].data.selfTotal" readonly></td>
                        <!--전체합계-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['10'].data.total" readonly></td>
                    </tr>
                    <tr class="sum01">
                        <th scope="row" colspan="2">합계</th>
                        <!--비온라인-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['11'].data.offlineCur" @input="inputSetResultCount('11','offlineCur',1)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['11'].data.offlineRet" @input="inputSetResultCount('11','offlineRet',2)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['11'].data.offlineCancel" @input="inputSetResultCount('11','offlineCancel',3)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['11'].data.offlineTotal" readonly></td>
                        <!--온라인-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['11'].data.onlineCur" @input="inputSetResultCount('11','onlineCur',5)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['11'].data.onlineRet" @input="inputSetResultCount('11','onlineRet',6)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['11'].data.onlineCancel" @input="inputSetResultCount('11','onlineCancel',7)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['11'].data.onlineTotal" readonly></td>
                        <!--자진발급-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['11'].data.selfCur" @input="inputSetResultCount('11','selfCur',9)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['11'].data.selfRet" @input="inputSetResultCount('11','selfRet',10)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['11'].data.selfCancel" @input="inputSetResultCount('11','selfCancel',11)"></td>
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
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['14'].data.offlineCur" @input="inputSetResultCount('14','offlineCur',1)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['14'].data.offlineRet" @input="inputSetResultCount('14','offlineRet',2)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['14'].data.offlineCancel" @input="inputSetResultCount('14','offlineCancel',3)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['14'].data.offlineTotal" readonly></td>
                        <!--온라인-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['14'].data.onlineCur" @input="inputSetResultCount('14','onlineCur',5)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['14'].data.onlineRet" @input="inputSetResultCount('14','onlineRet',6)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['14'].data.onlineCancel" @input="inputSetResultCount('14','onlineCancel',7)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['14'].data.onlineTotal" readonly></td>
                        <!--자진발급-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['14'].data.selfCur" @input="inputSetResultCount('14','selfCur',9)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['14'].data.selfRet" @input="inputSetResultCount('14','selfRet',10)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['14'].data.selfCancel" @input="inputSetResultCount('14','selfCancel',11)"></td>
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
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['17'].data.offlineCur" @input="inputSetResultCount('17','offlineCur',1)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['17'].data.offlineRet" @input="inputSetResultCount('17','offlineRet',2)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['17'].data.offlineCancel" @input="inputSetResultCount('17','offlineCancel',3)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['17'].data.offlineTotal" readonly></td>
                        <!--온라인-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['17'].data.onlineCur" @input="inputSetResultCount('17','onlineCur',5)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['17'].data.onlineRet" @input="inputSetResultCount('17','onlineRet',6)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['17'].data.onlineCancel" @input="inputSetResultCount('17','onlineCancel',7)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['17'].data.onlineTotal" readonly></td>
                        <!--자진발급-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['17'].data.selfCur" @input="inputSetResultCount('17','selfCur',9)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['17'].data.selfRet" @input="inputSetResultCount('17','selfRet',10)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['17'].data.selfCancel" @input="inputSetResultCount('17','selfCancel',11)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['17'].data.selfTotal" readonly></td>
                        <!--전체합계-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['17'].data.total" readonly></td>
                    </tr>
                    <tr class="sum01">
                        <th scope="row" colspan="2">합계</th>
                        <!--비온라인-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['18'].data.offlineCur" @input="inputSetResultCount('18','offlineCur',1)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['18'].data.offlineRet" @input="inputSetResultCount('18','offlineRet',2)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['18'].data.offlineCancel" @input="inputSetResultCount('18','offlineCancel',3)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['18'].data.offlineTotal" readonly></td>
                        <!--온라인-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['18'].data.onlineCur" @input="inputSetResultCount('18','onlineCur',5)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['18'].data.onlineRet" @input="inputSetResultCount('18','onlineRet',6)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['18'].data.onlineCancel" @input="inputSetResultCount('18','onlineCancel',7)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['18'].data.onlineTotal" readonly></td>
                        <!--자진발급-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['18'].data.selfCur" @input="inputSetResultCount('18','selfCur',9)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['18'].data.selfRet" @input="inputSetResultCount('18','selfRet',10)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['18'].data.selfCancel" @input="inputSetResultCount('18','selfCancel',11)"></td>
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
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['21'].data.offlineCur" @input="inputSetResultCount('21','offlineCur',1)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['21'].data.offlineRet" @input="inputSetResultCount('21','offlineRet',2)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['21'].data.offlineCancel" @input="inputSetResultCount('21','offlineCancel',3)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['21'].data.offlineTotal" readonly></td>
                        <!--온라인-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['21'].data.onlineCur" @input="inputSetResultCount('21','onlineCur',5)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['21'].data.onlineRet" @input="inputSetResultCount('21','onlineRet',6)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['21'].data.onlineCancel" @input="inputSetResultCount('21','onlineCancel',7)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['21'].data.onlineTotal" readonly></td>
                        <!--자진발급-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['21'].data.selfCur" @input="inputSetResultCount('21','selfCur',9)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['21'].data.selfRet" @input="inputSetResultCount('21','selfRet',10)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['21'].data.selfCancel" @input="inputSetResultCount('21','selfCancel',11)"></td>
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
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['24'].data.offlineCur" @input="inputSetResultCount('24','offlineCur',1)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['24'].data.offlineRet" @input="inputSetResultCount('24','offlineRet',2)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['24'].data.offlineCancel" @input="inputSetResultCount('24','offlineCancel',3)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['24'].data.offlineTotal" readonly></td>
                        <!--온라인-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['24'].data.onlineCur" @input="inputSetResultCount('24','onlineCur',5)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['24'].data.onlineRet" @input="inputSetResultCount('24','onlineRet',6)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['24'].data.onlineCancel" @input="inputSetResultCount('24','onlineCancel',7)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['24'].data.onlineTotal" readonly></td>
                        <!--자진발급-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['24'].data.selfCur" @input="inputSetResultCount('24','selfCur',9)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['24'].data.selfRet" @input="inputSetResultCount('24','selfRet',10)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['24'].data.selfCancel" @input="inputSetResultCount('24','selfCancel',11)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['24'].data.selfTotal" readonly></td>
                        <!--전체합계-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['24'].data.total" readonly></td>
                    </tr>
                    <tr class="sum01">
                        <th scope="row" colspan="2">합계</th>
                        <!--비온라인-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['25'].data.offlineCur" @input="inputSetResultCount('25','offlineCur',1)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['25'].data.offlineRet" @input="inputSetResultCount('25','offlineRet',2)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['25'].data.offlineCancel" @input="inputSetResultCount('25','offlineCancel',3)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['25'].data.offlineTotal" readonly></td>
                        <!--온라인-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['25'].data.onlineCur" @input="inputSetResultCount('25','onlineCur',5)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['25'].data.onlineRet" @input="inputSetResultCount('25','onlineRet',6)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['25'].data.onlineCancel" @input="inputSetResultCount('25','onlineCancel',7)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['25'].data.onlineTotal" readonly></td>
                        <!--자진발급-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['25'].data.selfCur" @input="inputSetResultCount('25','selfCur',9)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['25'].data.selfRet" @input="inputSetResultCount('25','selfRet',10)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['25'].data.selfCancel" @input="inputSetResultCount('25','selfCancel',11)"></td>
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
					<select id="" name="" class="select sch_save" title="저장">
						<option>선택</option>
						<option>가정산 저장</option>
						<option>국세청 저장</option>
					</select>
				</span>
                <button type="button" @click="reg" class="btn_b01 bg01">저장</button>
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

        created(){
            this.dateSet()
        }

        dateSet(){
            this.curDate= moment(moment().startOf('month')).subtract(1,'month');
            this.preDate= moment(this.curDate).subtract(1, 'month')
            this.nowDate= moment(this.curDate).subtract(1, 'month')

        }

        roadData(){
            let loadDatas :any = {
                curStandardDate : moment(this.curDate).format('YYYYMMDD') ,
                previewStandardDate : moment(this.preDate).format('YYYYMMDD'),
                jungsanmonth  : moment(this.nowDate).format('YYYYMM')
            }

            CommonBoardService.getListDatas('statistics/saupjajungsan/data',moment(this.nowDate).format('YYYYMM'),loadDatas).then(result=>{
                if(result.status==200){
                    this.countTotal  = result.data.summary  // 정산합계
                    let ObjectTax :any[]  = result.data.tax  // 정산합계
                    let ObjectList :any[]  = result.data.data   //
                    this.realList=[];
                    ObjectTax.filter((e,index)=>{
                        this.realList.push({id:index+'' , data: e})
                    })
                    ObjectList.filter((e,index)=>{
                        this.realList.push({id:index+6+'' , data: e})
                    })
                    console.log(this.realList);
                }

            })

        }


        colColumData2(row,data,num){
            if (data == 1 || data == 2 || data == 3) {
                this.realList[num].data['offlineTotal'] =
                    this.nullCheck(Number(this.realList[num].data['offlineCur'])) + this.nullCheck(Number(this.realList[num].data['offlineRet']))+ this.nullCheck(Number(this.realList[num].data['offlineCancel']))
                this.realList[num].data['total'] = this.nullCheck(Number(this.realList[num].data['offlineTotal']))+ this.nullCheck(Number(this.realList[num].data['onlineTotal']))+this.nullCheck(Number(this.realList[num].data['selfTotal']))
            }else if (data == 5 || data == 6 || data == 7) {
                this.realList[num].data['onlineTotal'] =
                    this.nullCheck(Number(this.realList[num].data['onlineCur'])) + this.nullCheck(Number(this.realList[num].data['onlineRet']))+ this.nullCheck(Number(this.realList[num].data['onlineCancel']))
                this.realList[num].data['total'] = this.nullCheck(Number(this.realList[num].data['offlineTotal']))+ this.nullCheck(Number(this.realList[num].data['onlineTotal']))+this.nullCheck(Number(this.realList[num].data['selfTotal']))
            }else if (data == 9 || data == 10 || data == 11) {
                this.realList[num].data['selfTotal'] =
                    this.nullCheck(Number(this.realList[num].data['selfCur'])) + this.nullCheck(Number(this.realList[num].data['selfRet']))+ this.nullCheck(Number(this.realList[num].data['selfCancel']))
                this.realList[num].data['total'] = this.nullCheck(Number(this.realList[num].data['offlineTotal']))+ this.nullCheck(Number(this.realList[num].data['onlineTotal']))+this.nullCheck(Number(this.realList[num].data['selfTotal']))
            }
        }


        colColumData(row,data,num) {
            if (data == 1 || data == 2 || data == 3) {
                // 콜->합계
                this.realList[row].data['offlineTotal'] =
                    this.nullCheck(Number(this.realList[row].data['offlineCur'])) + this.nullCheck(Number(this.realList[row].data['offlineRet']))+ this.nullCheck(Number(this.realList[row].data['offlineCancel']))
                // 콜->합계 로우더한것
                this.realList[num.toString()].data['offlineTotal'] =  this.nullCheck(Number(this.realList[(num-2).toString()].data['offlineTotal'])) +   this.nullCheck(Number(this.realList[(num-1).toString()].data['offlineTotal']))
                // 로우 전체 합계
                this.realList[row].data['total'] = this.nullCheck(Number(this.realList[row].data['offlineTotal']))+ this.nullCheck(Number(this.realList[row].data['onlineTotal']))+this.nullCheck(Number(this.realList[row].data['selfTotal']))
            }
            else if (data == 5 || data == 6 || data == 7) {
                    this.realList[row].data['onlineTotal'] =
                        this.nullCheck(Number(this.realList[row].data['onlineCur'])) + this.nullCheck(Number(this.realList[row].data['onlineRet'])) + this.nullCheck(Number(this.realList[row].data['onlineCancel']))
                this.realList[num.toString()].data['onlineTotal'] =  this.nullCheck(Number(this.realList[(num-2).toString()].data['onlineTotal'])) +   this.nullCheck(Number(this.realList[(num-1).toString()].data['onlineTotal']))
                this.realList[row].data['total'] = this.nullCheck(Number(this.realList[row].data['offlineTotal']))+ this.nullCheck(Number(this.realList[row].data['onlineTotal']))+this.nullCheck(Number(this.realList[row].data['selfTotal']))
            } else if (data == 9 || data == 10 || data == 11) {
                    this.realList[row].data['selfTotal'] =
                        this.nullCheck(Number(this.realList[row].data['selfCur'])) + this.nullCheck(Number(this.realList[row].data['selfRet'])) + this.nullCheck(Number(this.realList[row].data['selfCancel']))
                this.realList[num.toString()].data['selfTotal'] =  this.nullCheck(Number(this.realList[(num-2).toString()].data['selfTotal'])) +   this.nullCheck(Number(this.realList[(num-1).toString()].data['selfTotal']))
                this.realList[row].data['total'] = this.nullCheck(Number(this.realList[row].data['offlineTotal']))+ this.nullCheck(Number(this.realList[row].data['onlineTotal']))+this.nullCheck(Number(this.realList[row].data['selfTotal']))
            }
        }

        inputSetTax(){ //국세청 데이터변경시
            console.log('offList Data Change')
        }

        // 그외 데이터 변경시
        inputSetResultCount(row , data ,col){ //정산건수 데이터변경시

            if(row==5 || row==6){ // 소계 정산
                this.realList['7'].data[data] =   this.nullCheck(Number(this.realList['5'].data[data])) + this.nullCheck(Number(this.realList['6'].data[data]))
                this.colColumData(row,col,7)  // 콜합계
                this.realList['7'].data['total'] = this.nullCheck(Number(this.realList['7'].data['offlineTotal']))+ this.nullCheck(Number(this.realList['7'].data['onlineTotal']))+this.nullCheck(Number(this.realList['7'].data['selfTotal']))
                //각 소계 합
                this.realList['11'].data[data]=   this.nullCheck(Number(this.realList['7'].data[data])) +  this.nullCheck(Number(this.realList['10'].data[data]))
                this.realList['11'].data['total']=   this.nullCheck(Number(this.realList['11'].data['offlineTotal']))+ this.nullCheck(Number(this.realList['11'].data['onlineTotal']))+this.nullCheck(Number(this.realList['11'].data['selfTotal']))
                this.colColumData2(row,col,11)  // 콜합계

            }else if(row==8 || row ==9){
                this.realList['10'].data[data] =  this.nullCheck(Number(this.realList['8'].data[data])) + this.nullCheck(Number(this.realList['9'].data[data]))
                this.colColumData(row,col,10)  // 콜합계
                //소계
                this.realList['10'].data['total'] = this.nullCheck(Number(this.realList['10'].data['offlineTotal']))+ this.nullCheck(Number(this.realList['10'].data['onlineTotal']))+this.nullCheck(Number(this.realList['10'].data['selfTotal']))
                //각 소계 합
                this.realList['11'].data[data]=   this.nullCheck(Number(this.realList['7'].data[data])) +  this.nullCheck(Number(this.realList['10'].data[data]))
                this.realList['11'].data['total']=   this.nullCheck(Number(this.realList['11'].data['offlineTotal']))+ this.nullCheck(Number(this.realList['11'].data['onlineTotal']))+this.nullCheck(Number(this.realList['11'].data['selfTotal']))
                this.colColumData2(row,col,11)  // 콜합계의 합계
            }else if(row==12 || row ==13){
                this.realList['14'].data[data] =  this.nullCheck(Number(this.realList['12'].data[data])) + this.nullCheck(Number(this.realList['13'].data[data]))
                this.colColumData(row,col,14)  // 콜합계

                //소계
                this.realList['14'].data['total'] = this.nullCheck(Number(this.realList['14'].data['offlineTotal']))+ this.nullCheck(Number(this.realList['14'].data['onlineTotal']))+this.nullCheck(Number(this.realList['13'].data['selfTotal']))
                //각 소계 합
                this.realList['18'].data[data]=   this.nullCheck(Number(this.realList['14'].data[data])) +  this.nullCheck(Number(this.realList['17'].data[data]))
                this.realList['18'].data['total']=   this.nullCheck(Number(this.realList['18'].data['offlineTotal']))+ this.nullCheck(Number(this.realList['18'].data['onlineTotal']))+this.nullCheck(Number(this.realList['18'].data['selfTotal']))
                this.colColumData2(row,col,18)

            }else if(row==15 || row ==16){
                this.realList['17'].data[data] =  this.nullCheck(Number(this.realList['15'].data[data])) + this.nullCheck(Number(this.realList['16'].data[data]))
                this.colColumData(row,col,17)  // 콜합계

                //소계
                this.realList['17'].data['total'] = this.nullCheck(Number(this.realList['17'].data['offlineTotal']))+ this.nullCheck(Number(this.realList['17'].data['onlineTotal']))+this.nullCheck(Number(this.realList['16'].data['selfTotal']))
                //각 소계 합
                this.realList['18'].data[data]=   this.nullCheck(Number(this.realList['14'].data[data])) +  this.nullCheck(Number(this.realList['17'].data[data]))
                this.realList['18'].data['total']=   this.nullCheck(Number(this.realList['18'].data['offlineTotal']))+ this.nullCheck(Number(this.realList['18'].data['onlineTotal']))+this.nullCheck(Number(this.realList['18'].data['selfTotal']))
                this.colColumData2(row,col,18)
            }else if(row==19 || row ==20){
                this.realList['21'].data[data] =  this.nullCheck(Number(this.realList['19'].data[data])) + this.nullCheck(Number(this.realList['20'].data[data]))
                this.colColumData(row,col,21)  // 콜합계

                this.realList['21'].data['total'] = this.nullCheck(Number(this.realList['21'].data['offlineTotal']))+ this.nullCheck(Number(this.realList['21'].data['onlineTotal']))+this.nullCheck(Number(this.realList['19'].data['selfTotal']))
                //각 소계 합
                this.realList['25'].data[data]=   this.nullCheck(Number(this.realList['21'].data[data])) +  this.nullCheck(Number(this.realList['24'].data[data]))
                this.realList['25'].data['total']=   this.nullCheck(Number(this.realList['25'].data['offlineTotal']))+ this.nullCheck(Number(this.realList['25'].data['onlineTotal']))+this.nullCheck(Number(this.realList['25'].data['selfTotal']))
                this.colColumData2(row,col,25)

            }else if(row==22 || row ==23){
                this.realList['24'].data[data] =  this.nullCheck(Number(this.realList['22'].data[data])) + this.nullCheck(Number(this.realList['23'].data[data]))
                this.colColumData(row,col,24)  // 콜합계

                this.realList['24'].data['total'] = this.nullCheck(Number(this.realList['24'].data['offlineTotal']))+ this.nullCheck(Number(this.realList['24'].data['onlineTotal']))+this.nullCheck(Number(this.realList['22'].data['selfTotal']))
                //각 소계 합
                this.realList['25'].data[data]=   this.nullCheck(Number(this.realList['21'].data[data])) +  this.nullCheck(Number(this.realList['24'].data[data]))
                this.realList['25'].data['total']=   this.nullCheck(Number(this.realList['25'].data['offlineTotal']))+ this.nullCheck(Number(this.realList['25'].data['onlineTotal']))+this.nullCheck(Number(this.realList['25'].data['selfTotal']))
                this.colColumData2(row,col,25)
            }

        }

        nullCheck(data){
            if(data > 0 ){
                return data
            }else{
                return 0
            }
        }


        /**
         * 임시저장
         */
        tempReg(){
            this.$router.push({path:'receipSaupCount' });
        }

        /**
         * 저장
         */
        reg(){
            this.$router.push({path:'receipSaupCount' });
        }

    }
</script>

<style scoped>

</style>