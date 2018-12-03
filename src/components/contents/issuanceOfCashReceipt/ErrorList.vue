<template>
    <!-- container -->
    <section id="container">
        <!-- content  -->
        <div class="content">
            <h2 class="blind">현금영수증관리</h2>

            <h3>오류 내역 조회</h3>
            <!-- search box -->
            <div class="search_box page_cash02">
                <ul class="search_list">
                    <li>
                        <label for="">사업자 구분</label>
                        <select id="" name="" class="select sch_w100" title="사업자 구분">
                            <option>01</option>
                            <option>02</option>
                            <option>03</option>
                            <option>01</option>
                            <option>02</option>
                            <option>03</option>
                        </select>
                    </li>
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
                        <span class="rdo_box"><input type="radio" name="chk" value="2" id="aa11" checked="checked"><label for="aa11">거래일</label></span>
                        <span class="rdo_box"><input type="radio" name="chk" value="2" id="aa12"><label for="aa12">등록일</label></span>
                    </li>
                    <li>
                        <span class="form_cal"><span class="form_cal"><input type="text" title="날짜 입력" class="input date"><a href="#" id="datepicker-trigger" class="btn_cal">달력</a></span></span>
                    </li>
                    <li>
                        <label for="">오류코드</label>
                        <select id="" name="" class="select sch_w100" title="오류코드">
                            <option>01</option>
                            <option>02</option>
                            <option>03</option>
                            <option>01</option>
                            <option>02</option>
                            <option>03</option>
                        </select>
                    </li>

                    <li>
                        <label for="">오류내용</label>
                        <input type="text" class="input sch_coninput" title="오류내용">
                    </li>
                    <li>
                        <label for="">오류구분</label>
                        <select id="" name="" class="select sch_w100" title="오류구분">
                            <option>01</option>
                            <option>02</option>
                            <option>03</option>
                            <option>01</option>
                            <option>02</option>
                            <option>03</option>
                        </select>
                    </li>
                </ul>
            </div>
            <!-- //search box -->

            <!-- btn mid -->
            <div class="btn_mid">
                <button type="button" class="btn_m01 bg01" v-on:click="goSearch">조회</button>
                <button type="button" class="btn_m01 bg05" v-on:click="excelDownload"><i class="icon download01"></i> 엑셀 다운로드</button>
            </div>

            <!-- tbl info top -->
            <div class="tbl_info_top">
                <span class="total">총 <strong>20</strong>건</span>
            </div>

            <!-- tbl scroll x box -->
            <div class="tbl_scroll_x_box">
                <!-- tbl list02 -->
                <table class="tbl_list04 page_cash03">
                    <caption>회사코드별 통계</caption>
                    <colgroup>
                        <col width="100px">
                        <col span="15">
                    </colgroup>
                    <thead>
                    <tr>
                        <th scope="col" rowspan="2">NO</th>
                        <th scope="col" colspan="10">오류 수신내역</th>
                        <th scope="col" colspan="5">오류 처리내역</th>
                    </tr>
                    <tr>
                        <th scope="col">오류코드</th>
                        <th scope="col">오류내용</th>
                        <th scope="col">승인번호</th>
                        <th scope="col">거래일자</th>
                        <th scope="col">거래금액</th>
                        <th scope="col">거래일시</th>
                        <th scope="col">오류발생일자</th>
                        <th scope="col">사업자등록번호</th>
                        <th scope="col">회사코드</th>
                        <th scope="col">가맹점</th>
                        <th scope="col">승인번호<br>(<em class="fc_pt01">9Byte</em>)</th>
                        <th scope="col">거래일자<br>(<em class="fc_pt01">8Byte</em>)</th>
                        <th scope="col">처리일자<br>(<em class="fc_pt01">8Byte</em>)</th>
                        <th scope="col">오류발생<br>사유</th>
                        <th scope="col">조치결과</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>1</td>
                        <td>TSG</td>
                        <td>거래금액 오류</td>
                        <td>184683281</td>
                        <td>20170630</td>
                        <td><span class="price">1,000</span></td>
                        <td></td>
                        <td>20170701</td>
                        <td>2018630270</td>
                        <td>109</td>
                        <td>현대백화점</td>
                        <td><input type="text" class="input form_w100" value=""></td>
                        <td><input type="text" class="input form_w100" value=""></td>
                        <td><input type="text" class="input form_w100" value=""></td>
                        <td>
                            <select id="" name="" class="select form_w100">
                                <option></option>
                            </select>
                        </td>
                        <td>
                            <select id="" name="" class="select form_w100">
                                <option></option>
                            </select>
                        </td>
                    </tr>
                    <tr class="date_error">
                        <td>1</td>
                        <td>TSG</td>
                        <td>거래금액 오류</td>
                        <td>184683281</td>
                        <td>20170630</td>
                        <td><span class="price">1,000</span></td>
                        <td></td>
                        <td>20170701</td>
                        <td>2018630270</td>
                        <td>109</td>
                        <td>현대백화점</td>
                        <td><input type="text" class="input form_w100" value=""></td>
                        <td><input type="text" class="input form_w100" value=""></td>
                        <td><input type="text" class="input form_w100" value=""></td>
                        <td>
                            <select id="" name="" class="select form_w100">
                                <option></option>
                            </select>
                        </td>
                        <td>
                            <select id="" name="" class="select form_w100">
                                <option></option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="16" class="no_data">조회된 내용이 없습니다.</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <!-- //tbl scroll box -->

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

            <!-- btn bot -->
            <div class="btn_bot type03">
                <button type="button" id="" class="btn_b01 bg02" v-on:click="goCancel">취소</button>
                <button type="button" id="" class="btn_b01 bg03" v-on:click="goPresent">제출</button>
                <button type="button" id="" class="btn_b01 bg01" v-on:click="goInsert">저장</button>
            </div>

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
            ErrorList
        }
    })
    export default class ErrorList extends Vue {
        message: any = '';

        //돔생성전 호출자
        created() {
        }

        //돔렌더링완료시 진행
        mounted() {
        }

        //조회
        goSearch(){

        }

        //엑셀 다운로드
        excelDownload(){

        }

        //취소
        goCancel(){

        }

        //제출
        goPresent(){

        }

        //저장
        goInsert(){

        }

    }

</script>