<template>

    <!-- container -->
    <section id="container">
        <!-- content  -->
        <div class="content">
            <h2 class="blind">현금영수증관리</h2>

            <h3>승인 파일 전송</h3>

            <!-- search box -->
            <div class="search_file_box label01">
                <ul class="search_list">
                    <li>
                        <label class="sub_filereq" for="">오프라인 승인 파일 업로드</label>
                        <div class="input_file_form">
                            <input class="upload_path" readonly="readonly">
                            <label class="upload btn_m01 bg02">
                                <input type="file">
                                <span>파일찾기</span>
                            </label>
                        </div>
                    </li>
                </ul>
                <span class="btn_req_area"><button type="button" id="" class="btn_m01 bg01" v-on:click="approvalFile">등록</button></span>
            </div>
            <!-- //search box -->

            <!-- sch info bot -->
            <div class="sch_info_bot">
                <p class="text_file">모든 파일 업로드 시 DRM 해제 후 파일 업로드 하시기 바랍니다.</p>
            </div>

            <!-- tbl scroll box -->
            <div class="tbl_scroll_box">
                <!-- tbl list02 -->
                <table class="tbl_list02 page_cash03">
                    <caption>승인 내역 목록</caption>
                    <colgroup>
                        <col width="104px">
                        <col width="110px">
                        <col width="110px">
                        <col width="110px">
                        <col width="110px">
                        <col width="110px">
                        <col width="120px">
                        <col width="105px">
                        <col width="105px">
                    </colgroup>
                    <thead>
                    <tr>
                        <th scope="col">거래일자</th>
                        <th scope="col">총액</th>
                        <th scope="col">공급가액</th>
                        <th scope="col">부가세</th>
                        <th scope="col">봉사료</th>
                        <th scope="col">발급용도</th>
                        <th scope="col">신분확인</th>
                        <th scope="col">고객명</th>
                        <th scope="col">메모</th>
                    </tr>
                    </thead>
                </table>
                <!-- tbl scroll -->
                <div class="tbl_scroll">
                    <table class="tbl_list02 brd_none page_cash03">
                        <caption>승인 내역 목록</caption>
                        <colgroup>
                            <col width="104px">
                            <col width="110px">
                            <col width="110px">
                            <col width="110px">
                            <col width="110px">
                            <col width="110px">
                            <col width="120px">
                            <col width="105px">
                            <col width="88px">
                        </colgroup>
                        <tbody>
                        <tr>
                            <td>2018.10.12</td>
                            <td class="right">100,000</td>
                            <td class="right">100,000</td>
                            <td class="right">100,000</td>
                            <td class="right">100,000</td>
                            <td>소득공제</td>
                            <td>000 0000 0000</td>
                            <td>홍길동</td>
                            <td class="left">12211111</td>
                        </tr>
                        <tr class="date_error">
                            <td>2018.10.12</td>
                            <td class="right">100,000</td>
                            <td class="right">100,000</td>
                            <td class="right">100,000</td>
                            <td class="right">100,000</td>
                            <td>소득공제</td>
                            <td>000 0000 0000</td>
                            <td>홍길동</td>
                            <td class="left">12211111</td>
                        </tr>
                        <tr>
                            <td>2018.10.12</td>
                            <td class="right">100,000</td>
                            <td class="right">100,000</td>
                            <td class="right">100,000</td>
                            <td class="right">100,000</td>
                            <td>소득공제</td>
                            <td>000 0000 0000</td>
                            <td>홍길동</td>
                            <td class="left">12211111</td>
                        </tr>
                        <tr>
                            <td colspan="9" class="no_data">조회된 내용이 없습니다.</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <!-- //tbl scroll -->
            </div>
            <!-- //tbl scroll box -->

            <!-- tbl info result -->
            <div class="tbl_info_result">
                <span class="data_result">정상 : <strong class="fc_re01">7</strong>건</span>
                <span class="data_result">오류 : <strong class="fc_re02">1</strong>건</span>
                <span class="data_result">승인건 <strong class="fc_re03">7</strong>건 전송 예정</span>
            </div>

            <!-- btn bot -->
            <div class="btn_bot">
                <button type="button" id="" class="btn_b02 bg01" v-on:click="goInsert">승인 등록</button>
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
            ApprovalFileSend
        },
    })
    export default class ApprovalFileSend extends Vue {
        message: any = '';

        //돔생성전 호출자
        created() {
        }

        //돔렌더링완료시 진행
        mounted() {
        }

        //파일 등록
        approvalFile(){

        }

        //승인등록
        goInsert(){

        }


    }

</script>