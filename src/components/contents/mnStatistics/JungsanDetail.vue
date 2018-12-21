<template>

    <!-- container -->
    <section id="container">
        <!-- content  -->
        <div class="content">
            <h2 class="blind">통계관리</h2>

            <h3>현금영수증 사업자별 정산</h3>

            <!-- btn top -->
            <div class="btn_top">
                <button type="button" class="btn_m01 bg05" @click="excelDown"><i class="icon download01"></i> 엑셀 다운로드</button>
            </div>

            <!-- search box -->
            <div class="search_box type02 page_stats03">
                <div class="search_inner">
                    <ul class="search_list">
                        <li>
                            <span class="rdo_box"><input type="radio" name="chk" value="2" id="aa11" checked="checked"><label for="aa11">월별</label></span>
                        </li>
                        <li>
                            <select id="" name="" class="select sch_w100" title="월별">
                                <option>2018년 9월 국세청정산</option>
                            </select>
                        </li>
                        <li>
                            <span class="rdo_box"><input type="radio" name="chk" value="2" id="aa12"><label for="aa12">분기별</label></span>
                        </li>
                        <li>
                            <input type="text" class="input sch_w100" title="분기별" disabled="disabled">
                        </li>
                    </ul>
                    <span class="btn_req_area"><button type="button" class="btn_m01 bg01">조회</button></span>
                </div>
            </div>
            <!-- //search box -->

            <!-- cash title -->
            <div class="cash_title">2018년 9월 현금영수증 국세청정산</div>

            <!-- tbl list04 box top -->
            <div class="tbl_list04_box top">
                <!-- tbl list04 -->
                <table class="tbl_list04 type01">
                    <caption>현금영수증 사업자별 정산</caption>
                    <colgroup>
                        <col span="5">
                    </colgroup>
                    <thead>
                    <tr>
                        <th scope="col">구분</th>
                        <th scope="col" colspan="2">일반</th>
                        <th scope="col" colspan="2">편의점</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <th scope="row">KT</th>
                        <td class="right">85%</td>
                        <td class="right">15%</td>
                        <td class="right">90%</td>
                        <td class="right">10%</td>
                    </tr>
                    <tr>
                        <th scope="row">LDCC</th>
                        <td class="right">84%</td>
                        <td class="right">16%</td>
                        <td class="right">95%</td>
                        <td class="right">5%</td>
                    </tr>
                    </tbody>
                </table>
            </div>

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
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                    </tr>
                    <tr>
                        <th scope="row">삭제건수</th>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="-" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="-" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="-" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="-" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="-" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="-" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="-" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="-" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="-" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="-" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="-" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="-" title="금액"></td>
                    </tr>
                    <tr>
                        <th scope="row">기타오류</th>
                        <td class="right"><input type="text" class="input form_price" value="-" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="-" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="-" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="-" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="-" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="-" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="-" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="-" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="-" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="-" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="-" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="-" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="-" title="금액"></td>
                    </tr>
                    <tr class="sum01">
                        <th scope="row">합계</th>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                    </tr>
                    <tr class="sum02">
                        <th scope="row" colspan="2"><strong>조세지원액</strong></th>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                    </tr>
                    <tr>
                        <th scope="row" rowspan="7">정산건수</th>
                        <th scope="row" rowspan="3">KT</th>
                        <th scope="row">일반</th>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                    </tr>
                    <tr>
                        <th scope="row">편의점</th>
                        <td class="right"><input type="text" class="input form_price" value="-" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="-" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="-" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="-" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="-" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="-" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="-" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="-" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="-" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="-" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="-" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="-" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="-" title="금액"></td>
                    </tr>
                    <tr class="sum02">
                        <th scope="row">소계</th>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                    </tr>
                    <tr>
                        <th scope="row" rowspan="3">롯데</th>
                        <th scope="row">일반</th>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                    </tr>
                    <tr>
                        <th scope="row">편의점</th>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="-" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="-" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="-" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="-" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="-" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                    </tr>
                    <tr class="sum02">
                        <th scope="row">소계</th>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                    </tr>
                    <tr class="sum01">
                        <th scope="row" colspan="2">합계</th>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                    </tr>

                    <tr>
                        <th scope="row" rowspan="7">정산실적</th>
                        <th scope="row" rowspan="3">KT</th>
                        <th scope="row">일반</th>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                    </tr>
                    <tr>
                        <th scope="row">편의점</th>
                        <td class="right"><input type="text" class="input form_price" value="-" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="-" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="-" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="-" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="-" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="-" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="-" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="-" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="-" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="-" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="-" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="-" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="-" title="금액"></td>
                    </tr>
                    <tr class="sum02">
                        <th scope="row">소계</th>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                    </tr>
                    <tr>
                        <th scope="row" rowspan="3">롯데</th>
                        <th scope="row">일반</th>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                    </tr>
                    <tr>
                        <th scope="row">편의점</th>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="-" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="-" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="-" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="-" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="-" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                    </tr>
                    <tr class="sum02">
                        <th scope="row">소계</th>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                    </tr>
                    <tr class="sum01">
                        <th scope="row" colspan="2">합계</th>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                    </tr>

                    <tr>
                        <th scope="row" rowspan="7">배분결과</th>
                        <th scope="row" rowspan="3">KT</th>
                        <th scope="row">일반</th>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                    </tr>
                    <tr>
                        <th scope="row">편의점</th>
                        <td class="right"><input type="text" class="input form_price" value="-" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="-" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="-" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="-" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="-" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="-" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="-" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="-" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="-" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="-" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="-" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="-" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="-" title="금액"></td>
                    </tr>
                    <tr class="sum02">
                        <th scope="row">소계</th>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                    </tr>
                    <tr>
                        <th scope="row" rowspan="3">롯데</th>
                        <th scope="row">일반</th>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                    </tr>
                    <tr>
                        <th scope="row">편의점</th>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="-" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="-" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="-" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="-" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="-" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                    </tr>
                    <tr class="sum02">
                        <th scope="row">소계</th>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                    </tr>
                    <tr class="sum01">
                        <th scope="row" colspan="2">합계</th>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
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
                <button type="button" @click="modReq" class="btn_b01 bg02">수정 요청</button>
                <button type="button" @click="fix" class="btn_b01 bg01">확정</button>
            </div>

        </div>
        <!-- //content -->
    </section>
    <!-- //container -->


</template>

<script lang="ts">

    import {format} from 'date-fns';
    import {Component, Vue} from 'vue-property-decorator';
    import ListComponent from '../../common/list/list.vue';  // 공용리스트 콤포넌트

    @Component({

        components: {
            JungsanDetail,ListComponent
        }
    })
    export default class JungsanDetail extends Vue {
        setDate =  format(new Date(),'YYYYMMDD')
        listItem: any =  // 그리드 서치 페이징 옵션 처리 데이터 매우중요 이룰을 어기면 화면깨짐이 발생합니다
            {
                dataGrid: {
                    columTopHeader : [
                        {level : [
                                {headerName : '순번', value:'', cols : '1' , rows :'3' , level : '1'},
                                {headerName : '오류수신내역' ,value:'',  cols : '12' , rows :'1' , level : '1'},
                                {headerName : '오류처리내역' ,value:'',  cols : '6' , rows :'1' , level : '1'},
                            ]},
                        // {level : [
                        //         {headerName : '순번', value:'', cols : '' , rows :'0' , level : '1'},
                        //         {headerName : '오류수신내역' ,value:'',  cols : '10' , rows :'1' , level : '1'},
                        //         {headerName : '오류처리내역' ,value:'',  cols : '6' , rows :'1' , level : '1'},
                        //     ]}
                    ],
                    columLeftHeader : [
                        // {headerName : '순번',id:'no', cols : '' , rows :'2' , level : '1'},
                        // {headerName : '오류수신내역', cols : '10' , rows :'' , level : '1'},
                        // {headerName : '오류처리내역', cols : '5' , rows :'' , level : '1'},
                    ],
                    columControl:[  // 반드시 받는 컬럼명과 이 ID 가 같아야데이터가 나옵니다..
                        {columName : '순번' ,id : 'num', type:'number', width : '5%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : ''  },
                        {columName : '오류코드' ,id :'1',type:'text', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : ''  , colColors : 'color: #008aff' },
                        {columName : '오류내용' ,id :'2',type:'text', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : ''  ,  lineValue: '승인대기'},
                        {columName : '원거래승인번호' ,id :'23',type:'text', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' },
                        {columName : '원거래승일일자' ,id :'243',type:'text', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' },
                        {columName : '승인번호' ,id :'3',type:'text', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' },
                        {columName : '거래일자' ,id :'4',type:'text', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' },
                        {columName : '거래금액' ,id :'5',type:'text', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' },
                        {columName : '거래일시' ,id :'6',type:'text', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' },
                        {columName : '오류발생일자' ,id :'7',type:'text', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' },
                        {columName : '사업자등록번호' ,id :'8',type:'text', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' },
                        {columName : '회사코드' ,id :'9',type:'text', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' },
                        {columName : '가맹점' ,id :'10',type:'text', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' },
                        {columName : '승인번호' ,id :'11',type:'text', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' },
                        {columName : '거래일자' ,id :'12',type:'text', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' },
                        {columName : '처리일자' ,id :'13',type:'text', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' },
                        {columName : '오류발생사유' ,id :'14',type:'text', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' },
                        {columName : '조치결과' ,id :'15',type:'text', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' },
                    ],
                    tableClass:'tbl_scroll_x_box',
                    tableClass2:'tbl_list04 page_cash03',
                    totalColum: 15, //
                    apiUrl : 'receipt-error',
                    onLoadList : true,  // onLoad 로딩 유무
                },
                // 아이디는 실제 컬럼값을 넣어주면됩니다.
                search: [
                    {type: 'select' , title :'사업자구분',id: 'test', name:'searchType' , value: '' ,  api : '' , option : [{name : '' , value: 'saupId' },{name : '사업자등록번호' , value: 'shopNm' }]},
                    {type: 'select' , title :'회사코드',id: 'subSaup', name:'' , value: '' ,  api : '' , option : [{ name : '아이디' , value: 'id' },{name : '이름' , value: 'name' },{name : '사업자등록번호' , value: 'saupId' },{name : '소속회사' , value: 'shopNm' }]},
                    {type: 'popup', title :'매장선택', id: '3', name:'사업자번호' , value: '',   api : '' },
                    {type: 'inputPop', title :'', id: '4', name:'매장정보' , value: '',   api : ''  },
                    {type: 'radio' , title :'', id: 'saupType', name: 'radioBox' , value: 'lastConnDt' , option : [{ name : '거래일' , value: 'lastConnDt' },{ name : '등록일' , value: 'regDt' }] },
                    {type: 'date', title :'', id: '6' , name:'date', searchStartDate: '20181010' ,  searchEndDate: this.setDate , calenderCount : 1},
                    {type: 'select' , title :'오류구분',id: 'errorType', name:'searchType' , value: '' ,  api : '' , option : [{ name : '아이디' , value: 'id' },{name : '이름' , value: 'name' },{name : '사업자등록번호' , value: 'saupId' },{name : '소속회사' , value: 'shopNm' }]},
                    {type: 'selectCode' , title :'오류코드',id: 'errorCode', name:'issuePurpose' , value: '' ,  api : '0034' , option : [{ codeName : '소득공제' , code: '0' },{codeName : '지출증빙' , code: '1' }]},
                    {type: 'input2', title :'오류내용', id: 'errorMsg', name:'inputType' , value: '',   api : '' , option : '' },
                    // {type: 'check' , title :'체크해', id: 'checkType', name: 'checkType' ,  value: '' , option : [{ name : '선택' , id: 'cho1', value: true },{ name : '선택2' ,id: 'cho2', value: false}] },
                    // {type: 'radio' , title :'선택해', id: 'radioBox', name: 'radioBox' , value: '' , option : [{ name : '선택' , value: '111' },{ name : '선택2' , value: '222' }] },
                ],
                paging: { currentPage : 1 , lastPage : 0 ,viewPageSize : 10 ,totalRecords : 0 , from : 0 , to : 0 , perPage : 10},
                goSearch : "iocSearch",
                searchClass : 'search_box page_cash02',
                searchClass2 : 'search_list'
            }

        /**
         * 수정요청
         */
        modReq(){
            this.$router.push({path:'receipSaupCount' });
        }

        /**
         * 확정
         */
        fix(){
            this.$router.push({path:'receipSaupCount' });
        }

        /**
         * 엑셀다운로드
         */
        excelDown(){
            alert("엑셀다운로드");
        }
    }
</script>

<style scoped>

</style>