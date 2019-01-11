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
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['0'].data.offline" @input="offLine(realList['0'].data.offline)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['0'].data.offlineRet" @input="offLine(realList['0'].data.offlineRet)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['0'].data.offlineCancel" @input="offLine(realList['0'].data.offlineCancel)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['0'].data.offlineTotal" @input="offLine(realList['0'].data.offlineTotal)"></td>
                        <!--온라인-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['0'].data.online" @input="offLine(realList['0'].data.online)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['0'].data.onlineRet" @input="offLine(realList['0'].data.onlineRet)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['0'].data.onlineCancel" @input="offLine(realList['0'].data.onlineCancel)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['0'].data.onlineTotal" @input="offLine(realList['0'].data.onlineTotal)"></td>
                        <!--자진발급-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['0'].data.self" @input="offLine(realList['0'].data.self)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['0'].data.selfRet" @input="offLine(realList['0'].data.selfRet)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['0'].data.selfCancel" @input="offLine(realList['0'].data.selfCancel)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['0'].data.selfTotal" @input="offLine(realList['0'].data.selfTotal)"></td>
                        <!--전체합계-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['0'].data.total" @input="offLine(realList['0'].data.total)"></td>
                    </tr>
                    <tr>
                        <th scope="row">삭제건수</th>
                        <!--비온라인-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['1'].data.offline" @input="offLine(realList['1'].data.offline)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['1'].data.offlineRet" @input="offLine(realList['1'].data.offlineRet)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['1'].data.offlineCancel" @input="offLine(realList['1'].data.offlineCancel)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['1'].data.offlineTotal" @input="offLine(realList['1'].data.offlineTotal)"></td>
                        <!--온라인-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['1'].data.online" @input="offLine(realList['1'].data.online)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['1'].data.onlineRet" @input="offLine(realList['1'].data.onlineRet)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['1'].data.onlineCancel" @input="offLine(realList['1'].data.onlineCancel)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['1'].data.onlineTotal" @input="offLine(realList['1'].data.onlineTotal)"></td>
                        <!--자진발급-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['1'].data.self" @input="offLine(realList['1'].data.self)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['1'].data.selfRet" @input="offLine(realList['1'].data.selfRet)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['1'].data.selfCancel" @input="offLine(realList['1'].data.selfCancel)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['1'].data.selfTotal" @input="offLine(realList['1'].data.selfTotal)"></td>
                        <!--전체합계-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['1'].data.total" @input="offLine(realList['1'].data.total)"></td>
                    </tr>
                    <tr>
                        <th scope="row">기타오류</th>
                        <!--비온라인-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['2'].data.offline" @input="offLine(realList['2'].data.offline)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['2'].data.offlineRet" @input="offLine(realList['2'].data.offlineRet)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['2'].data.offlineCancel" @input="offLine(realList['2'].data.offlineCancel)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['2'].data.offlineTotal" @input="offLine(realList['2'].data.offlineTotal)"></td>
                        <!--온라인-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['2'].data.online" @input="offLine(realList['2'].data.online)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['2'].data.onlineRet" @input="offLine(realList['2'].data.onlineRet)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['2'].data.onlineCancel" @input="offLine(realList['2'].data.onlineCancel)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['2'].data.onlineTotal" @input="offLine(realList['2'].data.onlineTotal)"></td>
                        <!--자진발급-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['2'].data.self" @input="offLine(realList['2'].data.self)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['2'].data.selfRet" @input="offLine(realList['2'].data.selfRet)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['2'].data.selfCancel" @input="offLine(realList['2'].data.selfCancel)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['2'].data.selfTotal" @input="offLine(realList['2'].data.selfTotal)"></td>
                        <!--전체합계-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['2'].data.total" @input="offLine(realList['2'].data.total)"></td>
                    </tr>
                    <tr class="sum01">
                        <th scope="row">합계</th>
                        <!--비온라인-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['3'].data.offline" @input="offLine(realList['3'].data.offline)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['3'].data.offlineRet" @input="offLine(realList['3'].data.offlineRet)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['3'].data.offlineCancel" @input="offLine(realList['3'].data.offlineCancel)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['3'].data.offlineTotal" @input="offLine(realList['3'].data.offlineTotal)"></td>
                        <!--온라인-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['3'].data.online" @input="offLine(realList['3'].data.online)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['3'].data.onlineRet" @input="offLine(realList['3'].data.onlineRet)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['3'].data.onlineCancel" @input="offLine(realList['3'].data.onlineCancel)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['3'].data.onlineTotal" @input="offLine(realList['3'].data.onlineTotal)"></td>
                        <!--자진발급-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['3'].data.self" @input="offLine(realList['3'].data.self)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['3'].data.selfRet" @input="offLine(realList['3'].data.selfRet)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['3'].data.selfCancel" @input="offLine(realList['3'].data.selfCancel)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['3'].data.selfTotal" @input="offLine(realList['3'].data.selfTotal)"></td>
                        <!--전체합계-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['3'].data.total" @input="offLine(realList['3'].data.total)"></td>
                    </tr>
                    <tr class="sum02">
                        <th scope="row" colspan="2"><strong>조세지원액</strong></th>
                        <!--비온라인-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['4'].data.offline" @input="offLine(realList['4'].data.offline)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['4'].data.offlineRet" @input="offLine(realList['4'].data.offlineRet)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['4'].data.offlineCancel" @input="offLine(realList['4'].data.offlineCancel)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['4'].data.offlineTotal" @input="offLine(realList['4'].data.offlineTotal)"></td>
                        <!--온라인-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['4'].data.online" @input="offLine(realList['4'].data.online)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['4'].data.onlineRet" @input="offLine(realList['4'].data.onlineRet)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['4'].data.onlineCancel" @input="offLine(realList['4'].data.onlineCancel)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['4'].data.onlineTotal" @input="offLine(realList['4'].data.onlineTotal)"></td>
                        <!--자진발급-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['4'].data.self" @input="offLine(realList['4'].data.self)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['4'].data.selfRet" @input="offLine(realList['4'].data.selfRet)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['4'].data.selfCancel" @input="offLine(realList['4'].data.selfCancel)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['4'].data.selfTotal" @input="offLine(realList['4'].data.selfTotal)"></td>
                        <!--전체합계-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['4'].data.total" @input="offLine(realList['4'].data.total)"></td>
                    </tr>
                    <tr>
                        <th scope="row" rowspan="7">정산건수</th>
                        <th scope="row" rowspan="3">KT</th>
                        <th scope="row">일반</th>
                        <!--비온라인-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['5'].data.offline" @input="offLine(realList['5'].data.offline)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['5'].data.offlineRet" @input="offLine(realList['5'].data.offlineRet)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['5'].data.offlineCancel" @input="offLine(realList['5'].data.offlineCancel)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['5'].data.offlineTotal" @input="offLine(realList['5'].data.offlineTotal)"></td>
                        <!--온라인-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['5'].data.online" @input="offLine(realList['5'].data.online)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['5'].data.onlineRet" @input="offLine(realList['5'].data.onlineRet)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['5'].data.onlineCancel" @input="offLine(realList['5'].data.onlineCancel)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['5'].data.onlineTotal" @input="offLine(realList['5'].data.onlineTotal)"></td>
                        <!--자진발급-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['5'].data.self" @input="offLine(realList['5'].data.self)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['5'].data.selfRet" @input="offLine(realList['5'].data.selfRet)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['5'].data.selfCancel" @input="offLine(realList['5'].data.selfCancel)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['5'].data.selfTotal" @input="offLine(realList['5'].data.selfTotal)"></td>
                        <!--전체합계-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['5'].data.total" @input="offLine(realList['5'].data.total)"></td>
                    </tr>
                    <tr>
                        <th scope="row">편의점</th>
                        <!--비온라인-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['6'].data.offline" @input="offLine(realList['6'].data.offline)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['6'].data.offlineRet" @input="offLine(realList['6'].data.offlineRet)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['6'].data.offlineCancel" @input="offLine(realList['6'].data.offlineCancel)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['6'].data.offlineTotal" @input="offLine(realList['6'].data.offlineTotal)"></td>
                        <!--온라인-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['6'].data.online" @input="offLine(realList['6'].data.online)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['6'].data.onlineRet" @input="offLine(realList['6'].data.onlineRet)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['6'].data.onlineCancel" @input="offLine(realList['6'].data.onlineCancel)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['6'].data.onlineTotal" @input="offLine(realList['6'].data.onlineTotal)"></td>
                        <!--자진발급-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['6'].data.self" @input="offLine(realList['6'].data.self)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['6'].data.selfRet" @input="offLine(realList['6'].data.selfRet)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['6'].data.selfCancel" @input="offLine(realList['6'].data.selfCancel)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['6'].data.selfTotal" @input="offLine(realList['6'].data.selfTotal)"></td>
                        <!--전체합계-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['6'].data.total" @input="offLine(realList['6'].data.total)"></td>
                    </tr>
                    <tr class="sum62">
                        <th scope="row">소계</th>
                        <!--비온라인-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['7'].data.offline" @input="offLine(realList['7'].data.offline)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['7'].data.offlineRet" @input="offLine(realList['7'].data.offlineRet)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['7'].data.offlineCancel" @input="offLine(realList['7'].data.offlineCancel)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['7'].data.offlineTotal" @input="offLine(realList['7'].data.offlineTotal)"></td>
                        <!--온라인-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['7'].data.online" @input="offLine(realList['7'].data.online)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['7'].data.onlineRet" @input="offLine(realList['7'].data.onlineRet)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['7'].data.onlineCancel" @input="offLine(realList['7'].data.onlineCancel)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['7'].data.onlineTotal" @input="offLine(realList['7'].data.onlineTotal)"></td>
                        <!--자진발급-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['7'].data.self" @input="offLine(realList['7'].data.self)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['7'].data.selfRet" @input="offLine(realList['7'].data.selfRet)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['7'].data.selfCancel" @input="offLine(realList['7'].data.selfCancel)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['7'].data.selfTotal" @input="offLine(realList['7'].data.selfTotal)"></td>
                        <!--전체합계-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['7'].data.total" @input="offLine(realList['7'].data.total)"></td>
                    </tr>
                    <tr>
                        <th scope="row" rowspan="3">롯데</th>
                        <th scope="row">일반</th>
                        <!--비온라인-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['8'].data.offline" @input="offLine(realList['8'].data.offline)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['8'].data.offlineRet" @input="offLine(realList['8'].data.offlineRet)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['8'].data.offlineCancel" @input="offLine(realList['8'].data.offlineCancel)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['8'].data.offlineTotal" @input="offLine(realList['8'].data.offlineTotal)"></td>
                        <!--온라인-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['8'].data.online" @input="offLine(realList['8'].data.online)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['8'].data.onlineRet" @input="offLine(realList['8'].data.onlineRet)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['8'].data.onlineCancel" @input="offLine(realList['8'].data.onlineCancel)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['8'].data.onlineTotal" @input="offLine(realList['8'].data.onlineTotal)"></td>
                        <!--자진발급-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['8'].data.self" @input="offLine(realList['8'].data.self)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['8'].data.selfRet" @input="offLine(realList['8'].data.selfRet)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['8'].data.selfCancel" @input="offLine(realList['8'].data.selfCancel)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['8'].data.selfTotal" @input="offLine(realList['8'].data.selfTotal)"></td>
                        <!--전체합계-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['8'].data.total" @input="offLine(realList['8'].data.total)"></td>
                    </tr>
                    <tr>
                        <th scope="row">편의점</th>
                        <!--비온라인-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['9'].data.offline" @input="offLine(realList['9'].data.offline)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['9'].data.offlineRet" @input="offLine(realList['9'].data.offlineRet)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['9'].data.offlineCancel" @input="offLine(realList['9'].data.offlineCancel)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['9'].data.offlineTotal" @input="offLine(realList['9'].data.offlineTotal)"></td>
                        <!--온라인-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['9'].data.online" @input="offLine(realList['9'].data.online)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['9'].data.onlineRet" @input="offLine(realList['9'].data.onlineRet)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['9'].data.onlineCancel" @input="offLine(realList['9'].data.onlineCancel)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['9'].data.onlineTotal" @input="offLine(realList['9'].data.onlineTotal)"></td>
                        <!--자진발급-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['9'].data.self" @input="offLine(realList['9'].data.self)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['9'].data.selfRet" @input="offLine(realList['9'].data.selfRet)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['9'].data.selfCancel" @input="offLine(realList['9'].data.selfCancel)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['9'].data.selfTotal" @input="offLine(realList['9'].data.selfTotal)"></td>
                        <!--전체합계-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['9'].data.total" @input="offLine(realList['9'].data.total)"></td>
                    </tr>
                    <tr class="sum02">
                        <th scope="row">소계</th>
                        <!--비온라인-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['10'].data.offline" @input="offLine(realList['10'].data.offline)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['10'].data.offlineRet" @input="offLine(realList['10'].data.offlineRet)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['10'].data.offlineCancel" @input="offLine(realList['10'].data.offlineCancel)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['10'].data.offlineTotal" @input="offLine(realList['10'].data.offlineTotal)"></td>
                        <!--온라인-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['10'].data.online" @input="offLine(realList['10'].data.online)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['10'].data.onlineRet" @input="offLine(realList['10'].data.onlineRet)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['10'].data.onlineCancel" @input="offLine(realList['10'].data.onlineCancel)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['10'].data.onlineTotal" @input="offLine(realList['10'].data.onlineTotal)"></td>
                        <!--자진발급-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['10'].data.self" @input="offLine(realList['10'].data.self)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['10'].data.selfRet" @input="offLine(realList['10'].data.selfRet)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['10'].data.selfCancel" @input="offLine(realList['10'].data.selfCancel)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['10'].data.selfTotal" @input="offLine(realList['10'].data.selfTotal)"></td>
                        <!--전체합계-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['10'].data.total" @input="offLine(realList['10'].data.total)"></td>
                    </tr>
                    <tr class="sum01">
                        <th scope="row" colspan="2">합계</th>
                        <!--비온라인-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['11'].data.offline" @input="offLine(realList['11'].data.offline)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['11'].data.offlineRet" @input="offLine(realList['11'].data.offlineRet)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['11'].data.offlineCancel" @input="offLine(realList['11'].data.offlineCancel)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['11'].data.offlineTotal" @input="offLine(realList['11'].data.offlineTotal)"></td>
                        <!--온라인-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['11'].data.online" @input="offLine(realList['11'].data.online)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['11'].data.onlineRet" @input="offLine(realList['11'].data.onlineRet)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['11'].data.onlineCancel" @input="offLine(realList['11'].data.onlineCancel)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['11'].data.onlineTotal" @input="offLine(realList['11'].data.onlineTotal)"></td>
                        <!--자진발급-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['11'].data.self" @input="offLine(realList['11'].data.self)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['11'].data.selfRet" @input="offLine(realList['11'].data.selfRet)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['11'].data.selfCancel" @input="offLine(realList['11'].data.selfCancel)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['11'].data.selfTotal" @input="offLine(realList['11'].data.selfTotal)"></td>
                        <!--전체합계-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['11'].data.total" @input="offLine(realList['11'].data.total)"></td>
                    </tr>

                    <tr>
                        <th scope="row" rowspan="7">정산실적</th>
                        <th scope="row" rowspan="3">KT</th>
                        <th scope="row">일반</th>
                        <!--비온라인-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['12'].data.offline" @input="offLine(realList['12'].data.offline)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['12'].data.offlineRet" @input="offLine(realList['12'].data.offlineRet)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['12'].data.offlineCancel" @input="offLine(realList['12'].data.offlineCancel)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['12'].data.offlineTotal" @input="offLine(realList['12'].data.offlineTotal)"></td>
                        <!--온라인-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['12'].data.online" @input="offLine(realList['12'].data.online)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['12'].data.onlineRet" @input="offLine(realList['12'].data.onlineRet)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['12'].data.onlineCancel" @input="offLine(realList['12'].data.onlineCancel)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['12'].data.onlineTotal" @input="offLine(realList['12'].data.onlineTotal)"></td>
                        <!--자진발급-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['12'].data.self" @input="offLine(realList['12'].data.self)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['12'].data.selfRet" @input="offLine(realList['12'].data.selfRet)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['12'].data.selfCancel" @input="offLine(realList['12'].data.selfCancel)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['12'].data.selfTotal" @input="offLine(realList['12'].data.selfTotal)"></td>
                        <!--전체합계-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['12'].data.total" @input="offLine(realList['12'].data.total)"></td>
                    </tr>
                    <tr>
                        <th scope="row">편의점</th>
                        <!--비온라인-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['13'].data.offline" @input="offLine(realList['13'].data.offline)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['13'].data.offlineRet" @input="offLine(realList['13'].data.offlineRet)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['13'].data.offlineCancel" @input="offLine(realList['13'].data.offlineCancel)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['13'].data.offlineTotal" @input="offLine(realList['13'].data.offlineTotal)"></td>
                        <!--온라인-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['13'].data.online" @input="offLine(realList['13'].data.online)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['13'].data.onlineRet" @input="offLine(realList['13'].data.onlineRet)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['13'].data.onlineCancel" @input="offLine(realList['13'].data.onlineCancel)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['13'].data.onlineTotal" @input="offLine(realList['13'].data.onlineTotal)"></td>
                        <!--자진발급-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['13'].data.self" @input="offLine(realList['13'].data.self)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['13'].data.selfRet" @input="offLine(realList['13'].data.selfRet)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['13'].data.selfCancel" @input="offLine(realList['13'].data.selfCancel)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['13'].data.selfTotal" @input="offLine(realList['13'].data.selfTotal)"></td>
                        <!--전체합계-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['13'].data.total" @input="offLine(realList['13'].data.total)"></td>
                    </tr>
                    <tr class="sum02">
                        <th scope="row">소계</th>
                        <!--비온라인-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['14'].data.offline" @input="offLine(realList['14'].data.offline)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['14'].data.offlineRet" @input="offLine(realList['14'].data.offlineRet)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['14'].data.offlineCancel" @input="offLine(realList['14'].data.offlineCancel)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['14'].data.offlineTotal" @input="offLine(realList['14'].data.offlineTotal)"></td>
                        <!--온라인-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['14'].data.online" @input="offLine(realList['14'].data.online)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['14'].data.onlineRet" @input="offLine(realList['14'].data.onlineRet)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['14'].data.onlineCancel" @input="offLine(realList['14'].data.onlineCancel)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['14'].data.onlineTotal" @input="offLine(realList['14'].data.onlineTotal)"></td>
                        <!--자진발급-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['14'].data.self" @input="offLine(realList['14'].data.self)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['14'].data.selfRet" @input="offLine(realList['14'].data.selfRet)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['14'].data.selfCancel" @input="offLine(realList['14'].data.selfCancel)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['14'].data.selfTotal" @input="offLine(realList['14'].data.selfTotal)"></td>
                        <!--전체합계-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['14'].data.total" @input="offLine(realList['14'].data.total)"></td>
                    </tr>
                    <tr>
                        <th scope="row" rowspan="3">롯데</th>
                        <th scope="row">일반</th>
                        <!--비온라인-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['15'].data.offline" @input="offLine(realList['15'].data.offline)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['15'].data.offlineRet" @input="offLine(realList['15'].data.offlineRet)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['15'].data.offlineCancel" @input="offLine(realList['15'].data.offlineCancel)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['15'].data.offlineTotal" @input="offLine(realList['15'].data.offlineTotal)"></td>
                        <!--온라인-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['15'].data.online" @input="offLine(realList['15'].data.online)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['15'].data.onlineRet" @input="offLine(realList['15'].data.onlineRet)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['15'].data.onlineCancel" @input="offLine(realList['15'].data.onlineCancel)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['15'].data.onlineTotal" @input="offLine(realList['15'].data.onlineTotal)"></td>
                        <!--자진발급-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['15'].data.self" @input="offLine(realList['15'].data.self)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['15'].data.selfRet" @input="offLine(realList['15'].data.selfRet)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['15'].data.selfCancel" @input="offLine(realList['15'].data.selfCancel)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['15'].data.selfTotal" @input="offLine(realList['15'].data.selfTotal)"></td>
                        <!--전체합계-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['15'].data.total" @input="offLine(realList['15'].data.total)"></td>
                    </tr>
                    <tr>
                        <th scope="row">편의점</th>
                        <!--비온라인-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['16'].data.offline" @input="offLine(realList['16'].data.offline)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['16'].data.offlineRet" @input="offLine(realList['16'].data.offlineRet)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['16'].data.offlineCancel" @input="offLine(realList['16'].data.offlineCancel)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['16'].data.offlineTotal" @input="offLine(realList['16'].data.offlineTotal)"></td>
                        <!--온라인-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['16'].data.online" @input="offLine(realList['16'].data.online)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['16'].data.onlineRet" @input="offLine(realList['16'].data.onlineRet)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['16'].data.onlineCancel" @input="offLine(realList['16'].data.onlineCancel)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['16'].data.onlineTotal" @input="offLine(realList['16'].data.onlineTotal)"></td>
                        <!--자진발급-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['16'].data.self" @input="offLine(realList['16'].data.self)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['16'].data.selfRet" @input="offLine(realList['16'].data.selfRet)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['16'].data.selfCancel" @input="offLine(realList['16'].data.selfCancel)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['16'].data.selfTotal" @input="offLine(realList['16'].data.selfTotal)"></td>
                        <!--전체합계-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['16'].data.total" @input="offLine(realList['16'].data.total)"></td>
                    </tr>
                    <tr class="sum02">
                        <th scope="row">소계</th>
                        <!--비온라인-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['17'].data.offline" @input="offLine(realList['17'].data.offline)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['17'].data.offlineRet" @input="offLine(realList['17'].data.offlineRet)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['17'].data.offlineCancel" @input="offLine(realList['17'].data.offlineCancel)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['17'].data.offlineTotal" @input="offLine(realList['17'].data.offlineTotal)"></td>
                        <!--온라인-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['17'].data.online" @input="offLine(realList['17'].data.online)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['17'].data.onlineRet" @input="offLine(realList['17'].data.onlineRet)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['17'].data.onlineCancel" @input="offLine(realList['17'].data.onlineCancel)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['17'].data.onlineTotal" @input="offLine(realList['17'].data.onlineTotal)"></td>
                        <!--자진발급-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['17'].data.self" @input="offLine(realList['17'].data.self)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['17'].data.selfRet" @input="offLine(realList['17'].data.selfRet)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['17'].data.selfCancel" @input="offLine(realList['17'].data.selfCancel)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['17'].data.selfTotal" @input="offLine(realList['17'].data.selfTotal)"></td>
                        <!--전체합계-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['17'].data.total" @input="offLine(realList['17'].data.total)"></td>
                    </tr>
                    <tr class="sum01">
                        <th scope="row" colspan="2">합계</th>
                        <!--비온라인-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['18'].data.offline" @input="offLine(realList['18'].data.offline)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['18'].data.offlineRet" @input="offLine(realList['18'].data.offlineRet)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['18'].data.offlineCancel" @input="offLine(realList['18'].data.offlineCancel)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['18'].data.offlineTotal" @input="offLine(realList['18'].data.offlineTotal)"></td>
                        <!--온라인-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['18'].data.online" @input="offLine(realList['18'].data.online)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['18'].data.onlineRet" @input="offLine(realList['18'].data.onlineRet)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['18'].data.onlineCancel" @input="offLine(realList['18'].data.onlineCancel)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['18'].data.onlineTotal" @input="offLine(realList['18'].data.onlineTotal)"></td>
                        <!--자진발급-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['18'].data.self" @input="offLine(realList['18'].data.self)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['18'].data.selfRet" @input="offLine(realList['18'].data.selfRet)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['18'].data.selfCancel" @input="offLine(realList['18'].data.selfCancel)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['18'].data.selfTotal" @input="offLine(realList['18'].data.selfTotal)"></td>
                        <!--전체합계-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['18'].data.total" @input="offLine(realList['18'].data.total)"></td>
                    </tr>

                    <tr>
                        <th scope="row" rowspan="7">배분결과</th>
                        <th scope="row" rowspan="3">KT</th>
                        <th scope="row">일반</th>
                        <!--비온라인-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['19'].data.offline" @input="offLine(realList['19'].data.offline)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['19'].data.offlineRet" @input="offLine(realList['19'].data.offlineRet)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['19'].data.offlineCancel" @input="offLine(realList['19'].data.offlineCancel)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['19'].data.offlineTotal" @input="offLine(realList['19'].data.offlineTotal)"></td>
                        <!--온라인-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['19'].data.online" @input="offLine(realList['19'].data.online)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['19'].data.onlineRet" @input="offLine(realList['19'].data.onlineRet)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['19'].data.onlineCancel" @input="offLine(realList['19'].data.onlineCancel)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['19'].data.onlineTotal" @input="offLine(realList['19'].data.onlineTotal)"></td>
                        <!--자진발급-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['19'].data.self" @input="offLine(realList['19'].data.self)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['19'].data.selfRet" @input="offLine(realList['19'].data.selfRet)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['19'].data.selfCancel" @input="offLine(realList['19'].data.selfCancel)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['19'].data.selfTotal" @input="offLine(realList['19'].data.selfTotal)"></td>
                        <!--전체합계-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['19'].data.total" @input="offLine(realList['19'].data.total)"></td>
                    </tr>
                    <tr>
                        <th scope="row">편의점</th>
                        <!--비온라인-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['20'].data.offline" @input="offLine(realList['20'].data.offline)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['20'].data.offlineRet" @input="offLine(realList['20'].data.offlineRet)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['20'].data.offlineCancel" @input="offLine(realList['20'].data.offlineCancel)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['20'].data.offlineTotal" @input="offLine(realList['20'].data.offlineTotal)"></td>
                        <!--온라인-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['20'].data.online" @input="offLine(realList['20'].data.online)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['20'].data.onlineRet" @input="offLine(realList['20'].data.onlineRet)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['20'].data.onlineCancel" @input="offLine(realList['20'].data.onlineCancel)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['20'].data.onlineTotal" @input="offLine(realList['20'].data.onlineTotal)"></td>
                        <!--자진발급-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['20'].data.self" @input="offLine(realList['20'].data.self)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['20'].data.selfRet" @input="offLine(realList['20'].data.selfRet)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['20'].data.selfCancel" @input="offLine(realList['20'].data.selfCancel)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['20'].data.selfTotal" @input="offLine(realList['20'].data.selfTotal)"></td>
                        <!--전체합계-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['20'].data.total" @input="offLine(realList['20'].data.total)"></td>
                    </tr>
                    <tr class="sum02">
                        <th scope="row">소계</th>
                        <!--비온라인-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['21'].data.offline" @input="offLine(realList['21'].data.offline)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['21'].data.offlineRet" @input="offLine(realList['21'].data.offlineRet)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['21'].data.offlineCancel" @input="offLine(realList['21'].data.offlineCancel)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['21'].data.offlineTotal" @input="offLine(realList['21'].data.offlineTotal)"></td>
                        <!--온라인-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['21'].data.online" @input="offLine(realList['21'].data.online)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['21'].data.onlineRet" @input="offLine(realList['21'].data.onlineRet)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['21'].data.onlineCancel" @input="offLine(realList['21'].data.onlineCancel)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['21'].data.onlineTotal" @input="offLine(realList['21'].data.onlineTotal)"></td>
                        <!--자진발급-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['21'].data.self" @input="offLine(realList['21'].data.self)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['21'].data.selfRet" @input="offLine(realList['21'].data.selfRet)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['21'].data.selfCancel" @input="offLine(realList['21'].data.selfCancel)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['21'].data.selfTotal" @input="offLine(realList['21'].data.selfTotal)"></td>
                        <!--전체합계-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['21'].data.total" @input="offLine(realList['21'].data.total)"></td>
                    </tr>
                    <tr>
                        <th scope="row" rowspan="3">롯데</th>
                        <th scope="row">일반</th>
                        <!--비온라인-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['22'].data.offline" @input="offLine(realList['22'].data.offline)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['22'].data.offlineRet" @input="offLine(realList['22'].data.offlineRet)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['22'].data.offlineCancel" @input="offLine(realList['22'].data.offlineCancel)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['22'].data.offlineTotal" @input="offLine(realList['22'].data.offlineTotal)"></td>
                        <!--온라인-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['22'].data.online" @input="offLine(realList['22'].data.online)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['22'].data.onlineRet" @input="offLine(realList['22'].data.onlineRet)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['22'].data.onlineCancel" @input="offLine(realList['22'].data.onlineCancel)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['22'].data.onlineTotal" @input="offLine(realList['22'].data.onlineTotal)"></td>
                        <!--자진발급-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['22'].data.self" @input="offLine(realList['22'].data.self)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['22'].data.selfRet" @input="offLine(realList['22'].data.selfRet)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['22'].data.selfCancel" @input="offLine(realList['22'].data.selfCancel)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['22'].data.selfTotal" @input="offLine(realList['22'].data.selfTotal)"></td>
                        <!--전체합계-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['22'].data.total" @input="offLine(realList['22'].data.total)"></td>
                    </tr>
                    <tr>
                        <th scope="row">편의점</th>
                        <!--비온라인-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['23'].data.offline" @input="offLine(realList['23'].data.offline)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['23'].data.offlineRet" @input="offLine(realList['23'].data.offlineRet)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['23'].data.offlineCancel" @input="offLine(realList['23'].data.offlineCancel)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['23'].data.offlineTotal" @input="offLine(realList['23'].data.offlineTotal)"></td>
                        <!--온라인-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['23'].data.online" @input="offLine(realList['23'].data.online)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['23'].data.onlineRet" @input="offLine(realList['23'].data.onlineRet)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['23'].data.onlineCancel" @input="offLine(realList['23'].data.onlineCancel)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['23'].data.onlineTotal" @input="offLine(realList['23'].data.onlineTotal)"></td>
                        <!--자진발급-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['23'].data.self" @input="offLine(realList['23'].data.self)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['23'].data.selfRet" @input="offLine(realList['23'].data.selfRet)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['23'].data.selfCancel" @input="offLine(realList['23'].data.selfCancel)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['23'].data.selfTotal" @input="offLine(realList['23'].data.selfTotal)"></td>
                        <!--전체합계-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['23'].data.total" @input="offLine(realList['23'].data.total)"></td>
                    </tr>
                    <tr class="sum02">
                        <th scope="row">소계</th>
                        <!--비온라인-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['24'].data.offline" @input="offLine(realList['24'].data.offline)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['24'].data.offlineRet" @input="offLine(realList['24'].data.offlineRet)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['24'].data.offlineCancel" @input="offLine(realList['24'].data.offlineCancel)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['24'].data.offlineTotal" @input="offLine(realList['24'].data.offlineTotal)"></td>
                        <!--온라인-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['24'].data.online" @input="offLine(realList['24'].data.online)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['24'].data.onlineRet" @input="offLine(realList['24'].data.onlineRet)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['24'].data.onlineCancel" @input="offLine(realList['24'].data.onlineCancel)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['24'].data.onlineTotal" @input="offLine(realList['24'].data.onlineTotal)"></td>
                        <!--자진발급-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['24'].data.self" @input="offLine(realList['24'].data.self)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['24'].data.selfRet" @input="offLine(realList['24'].data.selfRet)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['24'].data.selfCancel" @input="offLine(realList['24'].data.selfCancel)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['24'].data.selfTotal" @input="offLine(realList['24'].data.selfTotal)"></td>
                        <!--전체합계-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['24'].data.total" @input="offLine(realList['24'].data.total)"></td>
                    </tr>
                    <tr class="sum01">
                        <th scope="row" colspan="2">합계</th>
                        <!--비온라인-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['25'].data.offline" @input="offLine(realList['25'].data.offline)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['25'].data.offlineRet" @input="offLine(realList['25'].data.offlineRet)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['25'].data.offlineCancel" @input="offLine(realList['25'].data.offlineCancel)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['25'].data.offlineTotal" @input="offLine(realList['25'].data.offlineTotal)"></td>
                        <!--온라인-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['25'].data.online" @input="offLine(realList['25'].data.online)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['25'].data.onlineRet" @input="offLine(realList['25'].data.onlineRet)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['25'].data.onlineCancel" @input="offLine(realList['25'].data.onlineCancel)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['25'].data.onlineTotal" @input="offLine(realList['25'].data.onlineTotal)"></td>
                        <!--자진발급-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['25'].data.self" @input="offLine(realList['25'].data.self)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['25'].data.selfRet" @input="offLine(realList['25'].data.selfRet)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['25'].data.selfCancel" @input="offLine(realList['25'].data.selfCancel)"></td>
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['25'].data.selfTotal" @input="offLine(realList['25'].data.selfTotal)"></td>
                        <!--전체합계-->
                        <td class="right"><input type="text" class="input form_price"  v-model="realList['25'].data.total" @input="offLine(realList['25'].data.total)"></td>
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
                        <td class="right"><input type="text" class="input form_price" value="1,000,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000,000" title="금액"></td>
                        <td class="left"></td>
                    </tr>
                    <tr>
                        <th scope="row" class="left">취소정산 ②</th>
                        <td class="right"><input type="text" class="input form_price" value="1,000,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000,000" title="금액"></td>
                        <td class="left"></td>
                    </tr>
                    <tr>
                        <th scope="row" class="left">소급정산 ③</th>
                        <td class="right"><input type="text" class="input form_price" value="1,000,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000,000" title="금액"></td>
                        <td class="left"></td>
                    </tr>
                    <tr>
                        <th scope="row" class="left">최종정산 (①-②+③)</th>
                        <td class="right"><input type="text" class="input form_price" value="1,000,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price fc_pt01" value="1,000,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000,000" title="금액"></td>
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
                    let ObjectSum :any[]  = result.data.summary  // 정산합계
                    let ObjectList :any[]  = result.data.data   //
                    this.realList=[];
                    ObjectList.filter((e,index)=>{
                        this.realList.push({id:index+'' , data: e})
                    })
                    console.log(this.realList);
                }

            })

        }

        offLine(){
            console.log('offList Data Change')
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