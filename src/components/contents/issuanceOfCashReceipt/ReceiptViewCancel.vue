<template>

    <!-- container -->
    <section id="container">
        <!-- content  -->
        <div class="content">
            <h2 class="blind">현금영수증관리</h2>

            <h3>현금영수증 발급 조회 및 취소</h3>
            <!-- search box -->
            <div class="search_box page_cash01">
                <ul class="search_list">
                    <li>
                        <label for="">회사코드</label>
                        <select id="" name="" class="select sch_w100" title="회사코드">
                            <option>01</option>
                            <option>02</option>
                            <option>03</option>
                            <option>01</option>
                            <option>02</option>
                            <option>03</option>
                        </select>
                    </li>
                    <li>
                        <label for="">사업자등록번호</label>
                        <input type="text" class="input sch_indcode01" value="000-00-00000" title="사업자등록번호">
                        <button type="button" id="" class="btn_sch01">검색</button>
                    </li>
                    <li>
                        <input type="text" class="input sch_indcode02" value="롯데백화점 강남점" title="가맹점명">
                    </li>
                    <li>
                        <label for="">거래일</label><span class="form_cal"><input type="text" title="날짜 입력" class="input date"></span><span class="period_cal">-</span><span class="form_cal"><input type="text" title="날짜 입력" class="input date"><a href="#" id="datepicker-trigger" class="btn_cal">달력</a></span>
                    </li>
                    <li>
                        <label for="">발급용도</label>
                        <select id="" name="" class="select sch_w100" title="발급용도">
                            <option>현금(소득공제)</option>
                        </select>
                    </li>
                    <li>
                        <label for="">거래</label>
                        <select id="" name="" class="select sch_w100" title="거래">
                            <option></option>
                        </select>
                    </li>
                    <li>
                        <label for="">상품구분</label>
                        <select id="" name="" class="select sch_w100" title="상품구분">
                            <option></option>
                        </select>
                    </li>
                    <li>
                        <label for="">발급경로</label>
                        <select id="" name="" class="select sch_w100" title="발급경로">
                            <option></option>
                        </select>
                    </li>
                    <li>
                        <label for="">검색</label>
                        <select id="" name="" class="select sch_appnum" title="승인번호">
                            <option></option>
                        </select>
                    </li>
                    <li>
                        <input type="text" class="input sch_appuser" title="고객명">
                    </li>
                </ul>
            </div>
            <!-- //search box -->

            <!-- btn mid -->
            <div class="btn_mid">
                <button type="button" class="btn_m01 bg01">조회</button>
            </div>

            <!-- tbl info top -->
            <div class="tbl_info_top">
                <span class="total">총 <strong>20</strong>건</span>
            </div>

            <!-- 20181112 수정 추가 -->
            <div class="cash_total_box">
                <dl class="cash_total">
                    <dt>합계금액</dt>
                    <dd>
                        <input type="text" id="" name="" value="5,000" class="input form_price" title="합계금액" readonly=""> 원
                    </dd>
                    <dt>합계봉사료</dt>
                    <dd>
                        <input type="text" id="" name="" class="input form_price" title="봉사료" readonly=""> 원
                    </dd>
                    <dt>합계공급가액</dt>
                    <dd>
                        <input type="text" id="" name="" class="input form_price" title="공급가액" readonly=""> 원
                    </dd>
                    <dt>합계부가세</dt>
                    <dd>
                        <input type="text" id="" name="" class="input form_price" title="부가세" readonly=""> 원
                    </dd>
                </dl>
            </div>

            <!-- tbl list box -->
            <div class="tbl_list_box">
                <!-- tbl list01 -->
                <table class="tbl_list01 page_cash01">
                    <caption>현금영수증 발급 목록</caption>
                    <colgroup>
                        <col width="10%">
                        <col width="8%">
                        <col width="10%">
                        <col width="8%">
                        <col width="10%">
                        <col width="14%">
                        <col width="10%">
                        <col width="10%">
                        <col width="10%">
                        <col width="*">
                    </colgroup>
                    <thead>
                    <tr>
                        <th scope="col">거래일자</th>
                        <th scope="col">승인번호</th>
                        <th scope="col">금액</th>
                        <th scope="col">발급용도</th>
                        <th scope="col">거래구분</th>
                        <th scope="col">신분확인</th>
                        <th scope="col">고객명</th>
                        <th scope="col">사업장명</th>
                        <th scope="col">메모</th>
                        <th scope="col">처리내역</th>
                    </tr>
                    </thead>
                    <tbody v-on:click="goDetl">
                    <tr>
                        <td>2018.10.04</td>
                        <td>C23233</td>
                        <td class="right">100.000</td>
                        <td>소득공제</td>
                        <td>승인</td>
                        <td>010 **** 1234</td>
                        <td>홍길동</td>
                        <td>롯데정보통신</td>
                        <td class="left">12212112</td>
                        <td><sapn class="fc_state01">성공</sapn></td>
                    </tr>
                    <tr class="date_del">
                        <td>2018.10.04</td>
                        <td>C23233</td>
                        <td class="right">100.000</td>
                        <td>지출증빙</td>
                        <td>취소</td>
                        <td>010 **** 1234</td>
                        <td>홍길동</td>
                        <td>롯데정보통신</td>
                        <td class="left">12212112</td>
                        <td><sapn class="fc_state02">취소</sapn></td>
                    </tr>
                    <tr class="date_del">
                        <td>2018.10.04</td>
                        <td>C23233</td>
                        <td class="right">100.000</td>
                        <td>소득공제</td>
                        <td>취소</td>
                        <td>010 **** 1234</td>
                        <td>홍길동</td>
                        <td>롯데정보통신</td>
                        <td class="left">12212112</td>
                        <td><sapn class="fc_state03">오류</sapn></td>
                    </tr>
                    <tr>
                        <td>2018.10.04</td>
                        <td>C23233</td>
                        <td class="right">100.000</td>
                        <td>소득공제</td>
                        <td>승인</td>
                        <td>010 **** 1234</td>
                        <td>홍길동</td>
                        <td>롯데정보통신</td>
                        <td class="left">12212112</td>
                        <td><sapn class="fc_state01">성공</sapn></td>
                    </tr>
                    <tr class="date_del">
                        <td>2018.10.04</td>
                        <td>C23233</td>
                        <td class="right">100.000</td>
                        <td>소득공제</td>
                        <td>취소</td>
                        <td>010 **** 1234</td>
                        <td>홍길동</td>
                        <td>롯데정보통신</td>
                        <td class="left">12212112</td>
                        <td><sapn class="fc_state01">성공</sapn></td>
                    </tr>
                    <tr>
                        <td colspan="10" class="no_data">조회된 내용이 없습니다.</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <!-- //tbl list box -->

            <!-- tbl info bot -->
            <p class="tbl_info_bot type01 text_type02">색으로 표시된 항목은 취소 건이 있는 거래입니다.</p>

            <!-- pagination -->
            <div class="pagination">
                <a href="#" class="btn_fprev">맨앞</a>
                <a href="#" class="btn_prev">이전</a>
                <span class="num">
					<a href="#">1</a>
					<a href="#">2</a>
					<strong>3</strong>
					<a href="#">4</a>
					<a href="#">5</a>
				</span>
                <a href="#" class="btn_next">다음</a>
                <a href="#" class="btn_enext">맨뒤</a>
            </div>
            <!-- //pagination -->

        </div>
        <!-- //content -->
    </section>
    <!-- //container -->

</template>

<script lang="ts">
    import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
    import {CommonBoardService, CommonListService} from '../../../api/common.service';
    import {environment} from '../../../utill/environment';

    @Component({
        components: {
            ReceiptViewCancel
        },
    })
    export default class ReceiptViewCancel extends Vue {
        message: any = '';

        //돔생성전 호출자
        created() {
        }

        //돔렌더링완료시 진행
        mounted() {
        }

        //가맹점 상세이동
        goDetl(){
            this.$router.push('/home/ReceiptViewCancelDetl')
        }

    }

</script>