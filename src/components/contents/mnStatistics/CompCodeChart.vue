<template>
    <!-- container -->
    <section id="container">
        <!-- content  -->
        <div class="content">
            <h2 class="blind">통계관리</h2>

            <h3>회사코드별 거래현황</h3>

            <!-- btn top -->
            <div class="btn_top">
                <button type="button" @click="viewPop"  class="btn_m01 bg02">정산 회사코드 설정</button>
            </div>

            <!-- search box -->
            <div class="search_box page_stats01">
                <ul class="search_list">
                    <li>
                        <label for="">기간</label><span class="form_cal"><input type="text" title="날짜 입력" class="input date"></span><span class="period_cal">-</span><span class="form_cal"><input type="text" title="날짜 입력" class="input date"><a href="#" id="datepicker-trigger" class="btn_cal">달력</a></span>
                    </li>
                    <li>
                        <label for="">회사코드</label>
                        <select id="" name="" class="select sch_w100" title="회사코드">
                            <option>전체</option>
                            <option>롯데정보통신가맹</option>
                            <option>KT가맹</option>
                            <option>온라인(웹발급)</option>
                            <option>회사코드1</option>
                            <option>회사코드2</option>
                            <option>KOCERA</option>
                        </select>
                    </li>
                    <li>
                        <label for="">업종별</label>
                    <li>
                        <select id="" name="" class="select sch_w100" title="업태">
                            <option>선택안함</option>
                            <option>병원</option>
                            <option>의원</option>
                            <option>약국</option>
                        </select>
                    </li>
                </ul>
            </div>
            <!-- //search box -->

            <!-- btn mid -->
            <div class="btn_mid">
                <button type="button" class="btn_m01 bg05" @click="excelDown"><i class="icon download01"></i> 엑셀 다운로드</button>
                <button type="button" class="btn_m01 bg01">조회</button>
            </div>

            <!-- tbl scroll x box -->
            <div class="tbl_scroll_x_box">
                <!-- tbl list02 -->
                <table class="tbl_list04 page_stats01">
                    <caption>회사코드별 통계</caption>
                    <colgroup>
                        <col width="100px">
                        <col width="120px">
                        <col span="16">
                    </colgroup>
                    <thead>
                    <tr>
                        <th scope="col" rowspan="4">회사코드</th>
                        <th scope="col" rowspan="4">사업장명</th>
                        <th scope="col" colspan="16">2018년 10월</th>
                    </tr>
                    <tr>
                        <th scope="col" colspan="4">승인</th>
                        <th scope="col" colspan="4">취소</th>
                        <th scope="col" colspan="4">국세청 승인 오류</th>
                        <th scope="col" colspan="4">국세청 취소 오류</th>
                    </tr>
                    <tr>
                        <th scope="col" colspan="2">온라인</th>
                        <th scope="col" colspan="2">오프라인</th>
                        <th scope="col" colspan="2">온라인</th>
                        <th scope="col" colspan="2">오프라인</th>
                        <th scope="col" colspan="2">온라인</th>
                        <th scope="col" colspan="2">오프라인</th>
                        <th scope="col" colspan="2">온라인</th>
                        <th scope="col" colspan="2">오프라인</th>
                    </tr>
                    <tr>
                        <th scope="col">자진</th>
                        <th scope="col">비자진</th>
                        <th scope="col">자진</th>
                        <th scope="col">비자진</th>
                        <th scope="col">자진</th>
                        <th scope="col">비자진</th>
                        <th scope="col">자진</th>
                        <th scope="col">비자진</th>
                        <th scope="col">자진</th>
                        <th scope="col">비자진</th>
                        <th scope="col">자진</th>
                        <th scope="col">비자진</th>
                        <th scope="col">자진</th>
                        <th scope="col">비자진</th>
                        <th scope="col">자진</th>
                        <th scope="col">비자진</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>0000</td>
                        <td class="name">롯데정보통신</td>
                        <td class="right">1,000</td>
                        <td class="right">-</td>
                        <td class="right">1,000</td>
                        <td class="right">1,000</td>
                        <td class="right">1,000</td>
                        <td class="right">1,000</td>
                        <td class="right">1,000</td>
                        <td class="right">1,000</td>
                        <td class="right">1,000</td>
                        <td class="right">1,000</td>
                        <td class="right">-</td>
                        <td class="right">-</td>
                        <td class="right">1,000</td>
                        <td class="right">1,000</td>
                        <td class="right">1,000</td>
                        <td class="right">1,000</td>
                    </tr>
                    <tr>
                        <td>0000</td>
                        <td class="name">롯데정보통신</td>
                        <td class="right">1,000</td>
                        <td class="right">-</td>
                        <td class="right">1,000</td>
                        <td class="right">1,000</td>
                        <td class="right">1,000</td>
                        <td class="right">1,000</td>
                        <td class="right">1,000</td>
                        <td class="right">1,000</td>
                        <td class="right">1,000</td>
                        <td class="right">1,000</td>
                        <td class="right">1,000</td>
                        <td class="right">1,000</td>
                        <td class="right">1,000</td>
                        <td class="right">1,000</td>
                        <td class="right">1,000</td>
                        <td class="right">1,000</td>
                    </tr>
                    <tr>
                        <td colspan="18" class="no_data">조회된 내용이 없습니다.</td>
                    </tr>
                    </tbody>
                    <tfoot>
                    <tr class="total">
                        <th scope="row" colspan="2">합계</th>
                        <td class="right">1,000</td>
                        <td class="right">1,000</td>
                        <td class="right">1,000</td>
                        <td class="right">1,000</td>
                        <td class="right">1,000</td>
                        <td class="right">1,000</td>
                        <td class="right">1,000</td>
                        <td class="right">1,000</td>
                        <td class="right">1,000</td>
                        <td class="right">1,000</td>
                        <td class="right">1,000</td>
                        <td class="right">1,000</td>
                        <td class="right">1,000</td>
                        <td class="right">1,000</td>
                        <td class="right">1,000</td>
                        <td class="right">1,000</td>
                    </tr>
                    </tfoot>
                </table>
            </div>
            <!-- //tbl scroll box -->

        </div>
        <!-- //content -->

        <compCodeChartPop v-if="popupYn" @close="popupYn=false" v-bind:dataObject="data"></compCodeChartPop>
    </section>
    <!-- //container -->
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import CompCodeChartPop from "@/components/contents/mnStatistics/CompCodeChartPop.vue";

    @Component({

        components: {
            CompCodeChart, CompCodeChartPop
        }
    })
    export default class CompCodeChart extends Vue {
        popupYn:boolean =false;

        /**
         * 팝업기능
         * @param fc
         */
        viewPop(fc, div){
            this.popupYn = true;
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