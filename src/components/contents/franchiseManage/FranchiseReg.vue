<template>

    <!-- container -->
    <section id="container">
        <!-- content  -->
        <div class="content">
            <h2 class="blind">가맹점 관리</h2>

            <h3>가맹점 등록</h3>

            <h4 class="blind">기본 정보</h4>
            <!-- search reg box -->
            <div class="search_reg_box">
                <ul class="search_list col03">
                    <li>
                        <label for="">현금영수증 사업자</label>
                        <select id="" name="" class="select form_w100" title="현금영수증 사업자">
                            <option>KT</option>
                            <option>롯데정보통신</option>
                        </select>
                    </li>
                </ul>
            </div>
            <!-- //search reg box -->

            <h4>사업장 기본 정보 <span class="sub_cf">(사업자 등록증 상의 정보)</span></h4>
            <p class="req_info type01">(<em class="form_req">*</em>)는 필수항목입니다.</p>
            <!-- tbl view box -->
            <div class="tbl_view_box">
                <!-- tbl view01 -->
                <table class="tbl_view01">
                    <caption>사업장 기본 정보</caption>
                    <colgroup>
                        <col width="17%">
                        <col width="33%">
                        <col width="17%">
                        <col width="33%">
                    </colgroup>
                    <tbody>
                    <tr>
                        <th scope="row">사업자등록번호<em class="form_req">*</em></th>
                        <td>
                            <input type="text" class="input form_industry" title="사업자등록번호">
                            <button type="button" id="" class="btn_s01 bg04">중복확인</button>
                            <p class="info_msg">이미 등록된 사업자 번호입니다.</p>
                        </td>
                        <th scope="row">사업장명<em class="form_req">*</em></th>
                        <td><input type="text" class="input form_w100" title="사업장명"></td>
                    </tr>
                    <tr>
                        <th scope="row">대표자명<em class="form_req">*</em></th>
                        <td><input type="text" class="input form_w100" title="대표자명"></td>
                        <th scope="row">전화번호<em class="form_req">*</em></th>
                        <td>
                            <input type="text" class="input form_w100" title="전화번호">
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">사업자구분</th>
                        <td>
                            <input type="text" class="input form_w100" title="사업자구분" disabled="disabled">
                        </td>
                        <th scope="row">법인등록번호<em class="form_req">*</em></th>
                        <td><input type="text" class="input form_w100" title="법인등록번호"></td>
                    </tr>
                    <tr>
                        <th scope="row">주소<em class="form_req">*</em></th>
                        <td colspan="3">
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
                        <th scope="row">가맹점 상태</th>
                        <td colspan="3">
                            <select id="" name="" class="select form_w50" title="가맹점" disabled="disabled">
                                <option></option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">사업장 등록일</th>
                        <td><input type="text" class="input form_w100" title="등록일" disabled="disabled"></td>
                        <th scope="row">사업장 해지일</th>
                        <td><input type="text" class="input form_w100 fc_pt01" value="2018.11.20" title="사업장 해지일" disabled="disabled"></td>
                    </tr>
                    <tr>
                        <th scope="row">BL 정보</th>
                        <td colspan="3">
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
                <h4>관리자 정보</h4>
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
                                <th scope="row">이름<em class="form_req">*</em></th>
                                <td><input type="text" class="input form_w100" title="이름"></td>
                                <th scope="row">휴대폰번호<em class="form_req">*</em></th>
                                <td>
                                    <input type="text" class="input form_w100" title="휴대폰번호">
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">ID<em class="form_req">*</em></th>
                                <td>
                                    <input type="text" class="input form_id" title="ID">
                                    <button type="button" id="" class="btn_s01 bg04">중복확인</button>
                                    <p class="info_msg">사용중인 아이디 입니다.</p>
                                </td>
                                <th scope="row">이메일주소<em class="form_req">*</em></th>
                                <td>
                                    <input type="text" class="input form_w100" title="이메일주소">
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">접속IP 대역</th>
                                <td colspan="3">
                                    <input type="text" class="input form_conip" title="접속IP 대역">
                                    <span class="period_form">-</span>
                                    <input type="text" class="input form_conip" title="접속IP 대역">
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
                                <th scope="row">이름<em class="form_req">*</em></th>
                                <td><input type="text" class="input form_name" title="이름"></td>
                                <th scope="row">휴대폰번호<em class="form_req">*</em></th>
                                <td>
                                    <input type="text" class="input form_w100" title="휴대폰번호">
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">ID<em class="form_req">*</em></th>
                                <td>
                                    <input type="text" class="input form_id" title="ID">
                                    <button type="button" id="" class="btn_s01 bg04">중복확인</button>
                                    <p class="info_msg">사용중인 아이디 입니다.</p>
                                </td>
                                <th scope="row">이메일주소<em class="form_req">*</em></th>
                                <td>
                                    <input type="text" class="input form_w100" title="이메일주소">
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">접속IP 대역</th>
                                <td colspan="3">
                                    <input type="text" class="input form_conip" title="접속IP 대역">
                                    <span class="period_form">-</span>
                                    <input type="text" class="input form_conip" title="접속IP 대역">
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
                <button type="button" id="" class="btn_b01 bg01" v-on:click="insertInfo">가맹점 등록</button>
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
            FranchiseReg
        },
    })
    export default class FranchiseReg extends Vue {
        message: any = '';

        //돔생성전 호출자
        created() {
        }

        //돔렌더링완료시 진행
        mounted() {
        }

        //등록
        insertInfo() {



            this.$router.push('/home/franchiseRegCmpl')
        }

    }

</script>