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
                        <li style="margin-left: 25px">
                            <label>정산 기간</label>
                            <span class="form_cal">
                            <date-picker v-model="searchDate"  :lang="lang1" :type="'month'" :title="test"
                                         :first-day-of-week="1" range format="YYYY-MM" width="220" confirm ></date-picker>
                            </span>
                        </li>
                        <li style="margin-left: 20px">
                            <label>전월</label>
                            <span class="form_cal">
                                 <date-picker v-model="preDate"  :lang="lang2" :type="'day'"
                                              :first-day-of-week="1"  format="YYYY-MM-DD" width="180" confirm ></date-picker>
                            </span>
                        </li>
                        <li style="margin-left: 20px">
                            <label>당월</label>
                            <span class="form_cal">
                                 <date-picker v-model="curDate"  :lang="lang3" :type="'day'"
                                              :first-day-of-week="1"  format="YYYY-MM-DD" width="180" confirm ></date-picker>
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
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                    </tr>
                    <tr>
                        <th scope="row">삭제건수</th>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                    </tr>
                    <tr>
                        <th scope="row">기타오류</th>
                        <td class="right"><input type="text" class="input form_price" value="-" title="금액"></td>
                    </tr>
                    <tr class="sum01">
                        <th scope="row">합계</th>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                    </tr>
                    <tr class="sum02">
                        <th scope="row" colspan="2"><strong>조세지원액</strong></th>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                    </tr>
                    <tr>
                        <th scope="row" rowspan="7">정산건수</th>
                        <th scope="row" rowspan="3">KT</th>
                        <th scope="row">일반</th>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                    </tr>
                    <tr>
                        <th scope="row">편의점</th>
                        <td class="right"><input type="text" class="input form_price" value="-" title="금액"></td>
                    </tr>
                    <tr class="sum02">
                        <th scope="row">소계</th>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                    </tr>
                    <tr>
                        <th scope="row" rowspan="3">롯데</th>
                        <th scope="row">일반</th>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                    </tr>
                    <tr>
                        <th scope="row">편의점</th>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                    </tr>
                    <tr class="sum02">
                        <th scope="row">소계</th>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                    </tr>
                    <tr class="sum01">
                        <th scope="row" colspan="2">합계</th>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                    </tr>

                    <tr>
                        <th scope="row" rowspan="7">정산실적</th>
                        <th scope="row" rowspan="3">KT</th>
                        <th scope="row">일반</th>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                    </tr>
                    <tr>
                        <th scope="row">편의점</th>
                        <td class="right"><input type="text" class="input form_price" value="-" title="금액"></td>
                    </tr>
                    <tr class="sum02">
                        <th scope="row">소계</th>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                    </tr>
                    <tr>
                        <th scope="row" rowspan="3">롯데</th>
                        <th scope="row">일반</th>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                    </tr>
                    <tr>
                        <th scope="row">편의점</th>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                    </tr>
                    <tr class="sum02">
                        <th scope="row">소계</th>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                    </tr>
                    <tr class="sum01">
                        <th scope="row" colspan="2">합계</th>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                    </tr>

                    <tr>
                        <th scope="row" rowspan="7">배분결과</th>
                        <th scope="row" rowspan="3">KT</th>
                        <th scope="row">일반</th>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                    </tr>
                    <tr>
                        <th scope="row">편의점</th>
                        <td class="right"><input type="text" class="input form_price" value="-" title="금액"></td>
                    </tr>
                    <tr class="sum02">
                        <th scope="row">소계</th>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                    </tr>
                    <tr>
                        <th scope="row" rowspan="3">롯데</th>
                        <th scope="row">일반</th>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                    </tr>
                    <tr>
                        <th scope="row">편의점</th>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                    </tr>
                    <tr class="sum02">
                        <th scope="row">소계</th>
                        <td class="right"><input type="text" class="input form_price" value="1,000" title="금액"></td>
                    </tr>
                    <tr class="sum01">
                        <th scope="row" colspan="2">합계</th>
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

    @Component({

        components: {
            JungsanReg
        }
    })
    export default class JungsanReg extends Vue {
        //서치박스
        preDate : string = ""; // 현재정산일
        curDate : string = ""; // 이전정산일
        searchDate : any = [];
        serachStandardDate: any ="";

        lang1 : any =  {
            days: ['일', '월', '화', '수', '목', '금', '토'],
            months: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
            pickers: ['다음주', '다음달', '이전주', '이전달'],
            placeholder: {
                date: '선택',
                dateRange: '정산기간'
            }
        }
        lang2 : any =  {
            days: ['일', '월', '화', '수', '목', '금', '토'],
            months: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
            pickers: ['다음주', '다음달', '이전주', '이전달'],
            placeholder: {
                date: '집계 기준일(당월)',
                dateRange: ''
            }
        }
        lang3 : any =  {
            days: ['일', '월', '화', '수', '목', '금', '토'],
            months: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
            pickers: ['다음주', '다음달', '이전주', '이전달'],
            placeholder: {
                date: '집계 기준일(전월)',
                dateRange: ''
            }
        }

        created(){

        }

        roadData(){
            let loadDatas :any = {}


            if(this.serachStandardDate=='cur'){
                loadDatas = {}
            }else{

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