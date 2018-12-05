<template>

    <!-- container -->
    <section id="container">
        <!-- content  -->
        <div class="content">
            <h2 class="blind">현금영수증관리</h2>

            <h3>현금영수증 발급 조회 및 취소</h3>
            <h4 class="blind">현금영수증 발급 조회</h4>

            <!-- tbl grid wrap -->
            <div class="tbl_grid_wrap">
                <!-- tbl grid01 -->
                <table class="tbl_grid01">
                    <caption>현금영수증</caption>
                    <colgroup>
                        <col class="col_mob" width="50%">
                        <col class="col_mob" width="50%">
                    </colgroup>
                    <thead>
                    <tr>
                        <th scope="col" colspan="2">현금영수증 (고객용)</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td class="left">
                            <!-- tbl view02 -->
                            <table class="tbl_view02">
                                <caption>현금영수증</caption>
                                <colgroup>
                                    <col class="col_mob" width="100%">
                                </colgroup>
                                <tbody>
                                <tr>
                                    <th scope="row">신분확인번호</th>
                                </tr>
                                <tr>
                                    <td>010****1234</td>
                                </tr>
                                <tr>
                                    <th scope="row">거래구분</th>
                                </tr>
                                <tr>
                                    <td>현금(소득공제)</td>
                                </tr>
                                <tr>
                                    <th scope="row">승인번호</th>
                                </tr>
                                <tr>
                                    <td>C339221</td>
                                </tr>
                                <tr>
                                    <th scope="row">사업자명</th>
                                </tr>
                                <tr>
                                    <td>롯데정보통신(주)</td>
                                </tr>
                                <tr>
                                    <th scope="row">대표자명</th>
                                </tr>
                                <tr>
                                    <td>홍길동</td>
                                </tr>
                                </tbody>
                            </table>
                        </td>
                        <td class="right">
                            <table class="tbl_view02">
                                <caption>현금영수증</caption>
                                <colgroup>
                                    <col class="col_mob" width="35%">
                                    <col class="col_mob" width="65%">
                                </colgroup>
                                <tbody>
                                <tr>
                                    <th scope="row" colspan="2">거래일시</th>
                                </tr>
                                <tr>
                                    <td colspan="2">2018.10.04 17:51:00</td>
                                </tr>
                                <tr>
                                    <th scope="row" class="bg01">공급가액</th>
                                    <td class="right">10,000</td>
                                </tr>
                                <tr>
                                    <th scope="row" class="bg01">부가세</th>
                                    <td class="right">1,000</td>
                                </tr>
                                <tr>
                                    <th scope="row" class="bg01">봉사료</th>
                                    <td class="right">1,000</td>
                                </tr>
                                <tr>
                                    <th scope="row" class="bg01">합계</th>
                                    <td class="right">12,000</td>
                                </tr>
                                <tr>
                                    <th scope="row" colspan="2">사업자등록번호</th>
                                </tr>
                                <tr>
                                    <td colspan="2">123-45-67890</td>
                                </tr>
                                <tr>
                                    <th scope="row" colspan="2">사업장전화번호</th>
                                </tr>
                                <tr>
                                    <td colspan="2">02-333-3333</td>
                                </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <th scope="col" colspan="2">사업장 주소</th>
                    </tr>
                    <tr>
                        <td colspan="2" class="con01">서울시 강서구 가산디지털2로 롯데정보통신 18층</td>
                    </tr>
                    <tr>
                        <td colspan="2" class="con01">
                            <span class="text01">현금영수증 문의 <a href="#"><i class="icon tel"></i> 126-1-1</a></span>
                            <span class="text01">국세청 홈택스 : <a href="http://www.hometax.go.kr" target="_blank" title="새창열기" class="link02">www.hometax.go.kr</a></span>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <!-- //tbl grid01 -->

                <!-- result msg box -->
                <div class="result_msg_box">
                    <ul class="result_msg">
                        <li><span class="sub">취소 사유 : </span> 거래취소</li>
                    </ul>
                </div>

                <!-- receipt info -->
                <div class="receipt_info">
                    <ul class="receipt">
                        <li><span class="sub">지출구분 : </span> 일반</li>
                        <li><span class="sub">메모 : </span> 메모 내용메모 내용</li>
                    </ul>
                </div>

            </div>

            <!-- btn bot -->
            <div class="btn_bot type02">
                <button type="button" id="" class="btn_b01 bg01" v-on:click="cashReceiptCancel">현금영수증 발급 취소</button>
            </div>

            <h4>현금영수증 발급 취소</h4>

            <!-- btn top -->
            <div class="btn_top type03">
                <button type="button" id="" class="btn_m01 bg04">전체금액 입력</button>
            </div>

            <!-- grid box -->
            <div class="grid_box col02">
                <!-- col -->
                <div class="col">
                    <!-- tbl list box -->
                    <div class="tbl_list_box">
                        <!-- tbl list03 -->
                        <table class="tbl_list03">
                            <caption>기본 정보</caption>
                            <colgroup>
                                <col width="50%">
                                <col width="50%">
                            </colgroup>
                            <thead>
                            <tr>
                                <th scope="col">취소금액</th>
                                <th scope="col">봉사료</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td class="center">
                                    <input type="text" id="" name="" class="input form_price" title="거래금액">
                                    <em class="text_price">원</em>
                                </td>
                                <td class="center">
                                    <input type="text" id="" name="" class="input form_price" title="봉사료">
                                    <em class="text_price">원</em>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <!-- //tbl list box -->
                </div>
                <!-- col -->
                <div class="col">
                    <!-- tbl list box -->
                    <div class="tbl_list_box">
                        <!-- tbl list03 -->
                        <table class="tbl_list03">
                            <caption>기본 정보</caption>
                            <colgroup>
                                <col width="50%">
                                <col width="50%">
                            </colgroup>
                            <thead>
                            <tr>
                                <th scope="col">공급가액</th>
                                <th scope="col">부가세</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td class="center">
                                    <input type="text" id="" name="" class="input form_price" value="10,000" readonly="" title="공급가액">
                                    <em class="text_price">원</em>
                                </td>
                                <td class="center">
                                    <input type="text" id="" name="" class="input form_price" readonly="" title="봉사료">
                                    <em class="text_price">원</em>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <!-- //tbl list box -->
                </div>
            </div>
            <!-- tbl info bot -->
            <div class="tbl_info_bot">
                <span class="chk_box"><input type="checkbox" id="aa01"><label for="aa01">면세 및 간이과세자</label></span>
            </div>

            <!-- tbl list box -->
            <div class="tbl_list_box tbl_blank01">
                <!-- tbl view01 -->
                <table class="tbl_list03">
                    <caption>현금영수증 발급 취소</caption>
                    <colgroup>
                        <col class="col_mob" width="20%">
                        <col class="col_mob" width="80%">
                    </colgroup>
                    <tbody>
                    <tr>
                        <th scope="row">취소 사유 입력</th>
                        <td class="left">
                            <span class="rdo_box"><input type="radio" name="chk" value="2" id="aa11" checked="checked"><label for="aa11">거래취소</label></span>
                            <span class="rdo_box"><input type="radio" name="chk" value="2" id="aa12"><label for="aa12">오류발급</label></span>
                            <span class="rdo_box"><input type="radio" name="chk" value="2" id="aa13"><label for="aa13">기타</label></span>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <!-- //tbl list box -->

            <!-- btn bot -->
            <div class="btn_bot type01">
                <button type="button" id="" class="btn_b01 bg01" v-on:click="receiptCancel">영수증 발급 취소</button>
            </div>

            <h4>관련 발급 내역</h4>
            <!-- tbl list box -->
            <div class="tbl_list_box">
                <!-- tbl list01 -->
                <table class="tbl_list01 page_inquiry">
                    <caption>현금영수증 발급 목록</caption>
                    <colgroup>
                        <col width="11%">
                        <col width="11%">
                        <col width="11%">
                        <col width="11%">
                        <col width="11%">
                        <col width="14%">
                        <col width="12%">
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
                        <th scope="col">메모</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr class="date_org">
                        <td>2018.10.04</td>
                        <td>C23233</td>
                        <td class="right">100,000</td>
                        <td>소득공제</td>
                        <td>승인</td>
                        <td>010 **** 1234</td>
                        <td>홍길동</td>
                        <td class="left">12212112</td>
                    </tr>
                    <tr>
                        <td>2018.10.04</td>
                        <td>C23233</td>
                        <td class="right">100,000</td>
                        <td>소득공제</td>
                        <td>승인</td>
                        <td>010 **** 1234</td>
                        <td>홍길동</td>
                        <td class="left">12212112</td>
                    </tr>
                    <tr>
                        <td colspan="8" class="no_data">조회된 내용이 없습니다.</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <!-- //tbl list box -->

            <!-- tbl info bot -->
            <p class="tbl_info_bot type01 text_type02">승인거래와 취소거래는 각각 별도의 승인번호로 발급됩니다.</p>

            <!-- btn bot -->
            <div class="btn_bot type02">
                <button type="button" id="" class="btn_b01 bg02" v-on:click="goCancel">취소</button>
                <button type="button" id="" class="btn_b01 bg01" v-on:click="goConfirm">확인</button>
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
            ReceiptViewCancelDetl
        },
    })
    export default class ReceiptViewCancelDetl extends Vue {
        message: any = '';

        //돔생성전 호출자
        created() {
        }

        //돔렌더링완료시 진행
        mounted() {
        }

        //현금영수증발급 취소
        cashReceiptCancel(){
            alert('취소되었습니다.')
        }

        //영수증 발급 취소
        receiptCancel(){
            alert('취소되었습니다.')
        }

        //취소
        goCancel(){
            this.$router.push('/home/receiptViewCancel')
        }

        //확인
        goConfirm(){
            this.$router.push('/home/receiptViewCancel')
        }


    }

</script>