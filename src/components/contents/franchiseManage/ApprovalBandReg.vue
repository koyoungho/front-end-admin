<template>

    <!-- container -->
    <section id="container">
        <!-- content  -->
        <div class="content">
            <h2 class="blind">가맹점 관리</h2>

            <h3>승인 대역 신청 및 등록</h3>

            <!-- tbl view box -->
            <div class="tbl_view_box">
                <!-- tbl view01 -->
                <table class="tbl_view01">
                    <caption>승인 대역</caption>
                    <colgroup>
                        <col width="15%">
                        <col width="42%">
                        <col width="15%">
                        <col width="28%">
                    </colgroup>
                    <tbody>
                    <tr>
                        <th scope="row">가맹점</th>
                        <td class="con_store">
                            <input type="text" class="input form_store01" value="000-00-00000" title="사업자등록번호" disabled="disabled">
                            <input type="text" class="input form_store02" value="가맹점명" title="가맹점명" disabled="disabled">
                        </td>
                        <th scope="row">상태</th>
                        <td>
                            <select id="" name="" class="select form_w100" title="상태" disabled="disabled">
                                <option></option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">회사코드</th>
                        <td class="con_comcode">
                            <select id="" name="" class="select form_comcode" title="회사코드" disabled="disabled">
                                <option></option>
                            </select>
                            <input type="text" class="input form_comcode" title="회사코드" disabled="disabled">
                        </td>
                        <th scope="row">승인번호</th>
                        <td>
                            <select id="" name="" class="select form_w100" title="승인번호" disabled="disabled">
                                <option></option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">승인대역</th>
                        <td colspan="3">
                            <input type="text" class="input form_app01" title="승인대역 시작점" disabled="disabled">
                            <span class="period_cal">-</span>
                            <input type="text" class="input form_app02" title="승인대역 끝점" disabled="disabled">
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <!-- //tbl view box -->

            <!-- tbl view box -->
            <div class="tbl_view_box tbl_blank02">
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
                        <th scope="row">사업자등록번호</th>
                        <td class="con_indcode">
                            <input type="text" class="input sch_indcode01" value="000-00-00000" title="사업자등록번호">
                            <button type="button" id="" class="btn_sch01">검색</button>
                            <input type="text" class="input sch_indcode02" value="롯데백화점 강남점" title="가맹점명">
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

            <!-- btn bot -->
            <div class="btn_bot">
                <button type="button" id="" class="btn_b01 bg02" v-on:click="cancelInfo">취소</button>
                <button type="button" id="" class="btn_b01 bg03">승인대역 수정</button>
                <button type="button" id="" class="btn_b01 bg01">승인대역 신청</button>
                <button type="button" id="" class="btn_b01 bg03">승인대역 삭제</button>
                <button type="button" id="" class="btn_b01 bg01" v-on:click="insertInfo">승인대역 등록</button>
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
            ApprovalBandReg
        },
    })
    export default class ApprovalBandReg extends Vue {
        message: any = '';

        //돔생성전 호출자
        created() {
        }

        //돔렌더링완료시 진행
        mounted() {
        }

        cancelInfo(){
            this.$router.push('/home/approvalBandList')
        }

        //등록
        insertInfo(){
            this.$router.push('/home/approvalBandList')
        }
    }

</script>
