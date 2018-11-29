<template>

    <!-- container -->
    <section id="container">
        <!-- content  -->
        <div class="content">
            <h2 class="blind">가맹점관리</h2>

            <h3>매장 등록</h3>

            <h4 class="blind">기본정보</h4>

            <!-- btn top -->
            <div class="btn_top">
                <button type="button" id="" class="btn_m01 bg02">매장 일괄 등록</button>
            </div>

            <!-- search reg box -->
            <div class="search_reg_box">
                <ul class="search_list col03">
                    <li>
                        <label for="">현금영수증 사업자</label>
                        <select id="" name="" class="select form_w100" title="현금영수증 사업자" disabled="disabled">
                            <option>KT</option>
                            <option selected="">롯데정보통신</option>
                        </select>
                    </li>
                </ul>
                <ul class="search_list col03">
                    <li>
                        <label for="">가맹점 번호</label>
                        <input type="text" class="input form_w100" value="0000000000" title="가맹점번호">
                    </li>
                    <li>
                        <label for="">사업자 번호</label>
                        <input type="text" class="input form_w100" value="0000000000" title="사업자번호">
                    </li>
                    <li>
                        <label for="">가맹점명</label>
                        <input type="text" class="input form_w100" value="신일약국" title="가맹점명">
                    </li>
                    <li>
                        <label for="">지점 번호</label>
                        <input type="text" class="input form_w100" value="000-00-00000" title="지점번호">
                    </li>
                    <li>
                        <label for="">사업자 번호</label>
                        <input type="text" class="input form_w100" value="000-00-00000" title="사업자번호">
                    </li>
                    <li>
                        <label for="">지점명</label>
                        <input type="text" class="input form_w100" value="신일약국 영등포점" title="지점명">
                    </li>
                </ul>
            </div>
            <!-- //search reg box -->

            <!-- btn tbl bot -->
            <div class="btn_tbl_bot">
                <button type="button" id="" class="btn_m01 bg01 sch">가맹점 검색</button>
            </div>

            <h4>사업장 기본 정보 <span class="sub_cf">(사업자 등록증 상의 정보)</span></h4>

            <!-- tbl view box -->
            <div class="tbl_view_box">
                <!-- tbl view01 -->
                <table class="tbl_view01">
                    <caption>사업장 기본 정보</caption>
                    <colgroup>
                        <col width="17%">
                        <col width="19%">
                        <col width="14%">
                        <col width="19%">
                        <col width="15%">
                        <col width="18%">
                    </colgroup>
                    <tbody>
                    <tr>
                        <th scope="row">사업자등록번호</th>
                        <td colspan="2">
                            <input type="text" class="input form_industry" title="사업자등록번호">
                            <button type="button" id="" class="btn_s01 bg04">중복확인</button>
                            <p class="info_msg">이미 등록된 사업자 번호입니다.</p>
                        </td>
                        <th scope="row">사업장명</th>
                        <td colspan="2"><input type="text" class="input form_w100" title="사업장명"></td>
                    </tr>
                    <tr>
                        <th scope="row">대표자명</th>
                        <td colspan="2"><input type="text" class="input form_w100" title="대표자명"></td>
                        <th scope="row">전화번호</th>
                        <td colspan="2">
                            <input type="text" class="input form_w100" title="전화번호">
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">사업자구분</th>
                        <td colspan="2">
                            <input type="text" class="input form_w100" title="사업자구분" disabled="disabled">
                        </td>
                        <th scope="row">법인등록번호</th>
                        <td colspan="2"><input type="text" class="input form_w100" title="법인등록번호"></td>
                    </tr>
                    <tr>
                        <th scope="row">주소</th>
                        <td colspan="5">
                            <ul class="address_list">
                                <li class="con01">
                                    <input type="text" class="input form_post" title="우편번호">
                                    <button type="button" id="" class="btn_s01 bg03">우편번호</button>
                                </li>
                                <li class="con02">
                                    <input type="text" class="input form_address01" title="주소">
                                </li>
                                <li class="con03">
                                    <input type="text" class="input form_address02" title="상세 주소">
                                </li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">업종구분<em class="form_req">*</em></th>
                        <td>
                            <select id="" name="" class="select form_w100" title="업종">
                                <option></option>
                            </select>
                        </td>
                        <th scope="row">SW 제공회사<em class="form_req">*</em></th>
                        <td>
                            <select id="" name="" class="select form_w100" title="SW 제공회사">
                                <option></option>
                            </select>
                        </td>
                        <th scope="row">요양기관기호<em class="form_req">*</em></th>
                        <td><input type="text" class="input form_w100" title="요양기관기호"></td>
                    </tr>
                    <tr>
                        <th scope="row">매장 상태</th>
                        <td colspan="5">
                            <select id="" name="" class="select form_w50" title="가맹점" disabled="disabled">
                                <option></option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">사업장 등록일</th>
                        <td colspan="2"><input type="text" class="input form_w100" title="등록일" disabled="disabled"></td>
                        <th scope="row">사업장 해지일</th>
                        <td colspan="2"><input type="text" class="input form_w100 fc_pt01" value="2018.11.20" title="사업장 해지일" disabled="disabled"></td>
                    </tr>
                    <tr>
                        <th scope="row">BL 정보</th>
                        <td colspan="5">
                            <select id="" name="" class="select form_bl" title="BL 정보">
                                <option></option>
                            </select>
                            <input type="text" class="input form_bl" title="BL 정보" disabled="disabled">
                            <input type="text" class="input form_bldate" title="BL 정보" disabled="disabled">
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <!-- //tbl view box -->

            <div class="title_area">
                <h4>승인대역 정보</h4>
                <div class="btn_tbl_top type01">
                    <button type="button" id="" class="btn_m01 bg02 add">승인대역 추가</button>
                </div>
            </div>

            <!-- tbl view box -->
            <div class="tbl_view_box">
                <!-- tbl view01 -->
                <table class="tbl_view01">
                    <caption>승인대역 정보</caption>
                    <colgroup>
                        <col width="17%">
                        <col width="33%">
                        <col width="17%">
                        <col width="33%">
                    </colgroup>
                    <tbody>
                    <tr>
                        <th scope="row">회사코드</th>
                        <td>
                            <select id="" name="" class="select form_comcode" title="회사코드" disabled="disabled">
                                <option></option>
                            </select>
                            <input type="text" class="input form_comcode" title="회사코드" disabled="disabled">
                        </td>
                        <th scope="row">점코드</th>
                        <td>
                            <input type="text" class="input form_branchcode" title="점코드">
                            <button type="button" id="" class="btn_s01 bg04">중복확인</button>
                            <p class="info_msg">사용중인 점코드 입니다.</p>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">승인코드</th>
                        <td>
                            <select id="" name="" class="select form_w100" title="승인번호" disabled="disabled">
                                <option></option>
                            </select>
                        </td>
                        <th scope="row">승인 상태</th>
                        <td><input type="text" class="input form_w100" title="승인 상태" disabled="disabled"></td>
                    </tr>
                    <tr>
                        <th scope="row">승인 대역</th>
                        <td colspan="3">
                            <div class="form_col approval">
                                <span class="rdo_box"><input type="radio" name="chk" value="2" id="aa11" checked="checked"><label for="aa11">대역폭</label></span>
                                <input type="text" class="input form_app01" placeholder="시작점(0000000)" title="승인대역 시작점">
                                <span class="period_form">-</span>
                                <input type="text" class="input form_app01" placeholder="끝점(1000000)" title="승인대역 끝점">
                            </div>
                            <div class="form_col approval">
                                <span class="rdo_box"><input type="radio" name="chk" value="2" id="aa12"><label for="aa12">건수</label></span>
                                <input type="text" class="input form_app02" placeholder="건수(1000건 단위)" value="" title="승인대역 시작점">
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <!-- //tbl view box -->

            <!-- btn tbl bot -->
            <div class="btn_tbl_bot">
                <button type="button" id="" class="btn_m01 bg01 del">승인대역 삭제</button>
            </div>

            <div class="title_area">
                <h4>사용자 정보</h4>
                <div class="btn_tbl_top type01">
                    <button type="button" id="" class="btn_m01 bg02 add">ID 계정추가</button>
                </div>
            </div>

            <!-- account list -->
            <div class="account_list">
                <div class="acc_col">
                    <!-- tbl view box -->
                    <div class="tbl_view_box">
                        <!-- tbl view01 -->
                        <table class="tbl_view01">
                            <caption>정보</caption>
                            <colgroup>
                                <col width="17%">
                                <col width="33%">
                                <col width="17%">
                                <col width="33%">
                            </colgroup>
                            <tbody>
                            <tr>
                                <th scope="row">이름</th>
                                <td><input type="text" class="input form_w100" title="이름" disabled="disabled"></td>
                                <th scope="row">휴대폰번호</th>
                                <td>
                                    <input type="text" class="input form_w100" title="휴대폰번호" disabled="disabled">
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">ID</th>
                                <td>
                                    <input type="text" class="input form_id" title="ID" disabled="disabled">
                                </td>
                                <th scope="row">이메일주소</th>
                                <td>
                                    <input type="text" class="input form_w100" title="이메일주소">
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">최종접속일시</th>
                                <td>
                                    <input type="text" class="input form_w100" title="최종접속일시" disabled="disabled">
                                </td>
                                <th scope="row">계정상태</th>
                                <td>
                                    <select id="" name="" class="select form_w100" title="계정상태">
                                        <option></option>
                                    </select>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <!-- //tbl view box -->
                    <!-- btn tbl bot -->
                    <div class="btn_tbl_bot">
                        <button type="button" id="" class="btn_m01 bg02 del">ID 계정해지</button>
                    </div>
                </div>
                <div class="acc_col">
                    <!-- tbl view box -->
                    <div class="tbl_view_box">
                        <!-- tbl view01 -->
                        <table class="tbl_view01">
                            <caption>정보</caption>
                            <colgroup>
                                <col width="17%">
                                <col width="33%">
                                <col width="17%">
                                <col width="33%">
                            </colgroup>
                            <tbody>
                            <tr>
                                <th scope="row">이름</th>
                                <td><input type="text" class="input form_w100" title="이름" disabled="disabled"></td>
                                <th scope="row">휴대폰번호</th>
                                <td>
                                    <input type="text" class="input form_w100" title="휴대폰번호" disabled="disabled">
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">ID</th>
                                <td>
                                    <input type="text" class="input form_id" title="ID" disabled="disabled">
                                </td>
                                <th scope="row">이메일주소</th>
                                <td>
                                    <input type="text" class="input form_w100" title="이메일주소">
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">최종접속일시</th>
                                <td>
                                    <input type="text" class="input form_w100" title="최종접속일시" disabled="disabled">
                                </td>
                                <th scope="row">계정상태</th>
                                <td>
                                    <select id="" name="" class="select form_w100" title="계정상태">
                                        <option></option>
                                    </select>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <!-- //tbl view box -->
                    <!-- btn tbl bot -->
                    <div class="btn_tbl_bot">
                        <button type="button" id="" class="btn_m01 bg02 del">ID 계정해지</button>
                    </div>
                </div>
            </div>

            <!-- btn bot -->
            <div class="btn_bot">
                <button type="button" id="" class="btn_b01 bg01" v-on:click="insertInfo">매장 등록</button>
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
            StoreReg
        },
    })
    export default class StoreReg extends Vue {
        message: any = '';

        //돔생성전 호출자
        created() {
        }

        //돔렌더링완료시 진행
        mounted() {
        }

        //등록
        insertInfo() {


            this.$router.push('/home/storeRegCmpl')
        }

    }

</script>