<template>

    <!-- container -->
    <section id="container">
        <!-- content  -->
        <div class="content">
            <h2 class="blind">가맹점 관리</h2>

            <h3>매장 일괄 등록</h3>

            <!-- btn top -->
            <div class="btn_top">
                <button type="button" id="" class="btn_m01 bg02">매장 개별 등록</button>
            </div>

            <!-- search box -->
            <div class="search_file_box">
                <ul class="search_list">
                    <li>
                        <label class="sub_filereq" for="">엑셀 파일 등록</label>
                        <div class="input_file_form">
                            <input class="upload_path" readonly="readonly">
                            <label class="upload btn_m01 bg02">
                                <input type="file">
                                <span>파일찾기</span>
                            </label>
                        </div>
                    </li>
                </ul>
                <span class="btn_req_area"><button type="button" id="" class="btn_m01 bg01" v-on:click="excelChk">등록</button></span>
            </div>
            <!-- //search box -->

            <!-- sch info bot -->
            <div class="sch_info_bot">
                <p class="text_type01 center">
                    xls, xlsx 파일로 일괄발급이 가능합니다.
                    <button type="button" id="" class="btn_s01 bg02"><i class="icon download"></i>샘플다운로드</button>
                </p>
                <p class="text_file">모든 파일 업로드 시 DRM 해제 후 파일 업로드 하시기 바랍니다.</p>
            </div>

            <!-- tbl scroll box -->
            <div class="tbl_scroll_box">
                <!-- tbl list02 -->
                <table class="tbl_list02 page_store03">
                    <caption>매장 목록</caption>
                    <colgroup>
                        <col width="50px">
                        <col width="100px">
                        <col width="200px">
                        <col width="150px">
                        <col width="150px">
                        <col width="150px">
                        <col width="184px">
                    </colgroup>
                    <thead>
                    <tr>
                        <th scope="col">순번</th>
                        <th scope="col">사업장명</th>
                        <th scope="col">사업자등록번호</th>
                        <th scope="col">대표자명</th>
                        <th scope="col">전화번호</th>
                        <th scope="col">법인등록번호</th>
                        <th scope="col">검증결과</th>
                    </tr>
                    </thead>
                </table>
                <!-- tbl scroll -->
                <div class="tbl_scroll">
                    <table class="tbl_list02 brd_none page_store03">
                        <caption>매장 목록</caption>
                        <colgroup>
                            <col width="50px">
                            <col width="100px">
                            <col width="200px">
                            <col width="150px">
                            <col width="150px">
                            <col width="150px">
                            <col width="167px">
                        </colgroup>
                        <tbody>
                        <tr>
                            <td>100</td>
                            <td>롯데백화점</td>
                            <td>123-223-2222</td>
                            <td>홍길동</td>
                            <td>02-2323-2222</td>
                            <td>111111-222222</td>
                            <td>정상</td>
                        </tr>
                        <tr class="date_error">
                            <td>100</td>
                            <td>롯데백화점</td>
                            <td>123-223-2222</td>
                            <td>홍길동</td>
                            <td>02-2323-2222</td>
                            <td>111111-222222</td>
                            <td>사업자등록번호 오류</td>
                        </tr>
                        <tr class="date_before">
                            <td>100</td>
                            <td>롯데백화점</td>
                            <td>123-223-2222</td>
                            <td>홍길동</td>
                            <td>02-2323-2222</td>
                            <td>111111-222222</td>
                            <td>기등록</td>
                        </tr>
                        <tr>
                            <td>100</td>
                            <td>롯데백화점</td>
                            <td>123-223-2222</td>
                            <td>홍길동</td>
                            <td>02-2323-2222</td>
                            <td>111111-222222</td>
                            <td>정상</td>
                        </tr>
                        <tr>
                            <td colspan="7" class="no_data">조회된 내용이 없습니다.</td>
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
                <span class="data_result">기등록 : <strong class="fc_re04">1</strong>건</span>
                <span class="data_result">오류 : <strong class="fc_re02">1</strong>건</span>
                <span class="data_result"><strong class="fc_re03">7</strong>개 매장 등록 예정</span>
            </div>

            <!-- btn bot -->
            <div class="btn_bot">
                <button type="button" id="" class="btn_b02 bg01" v-on:click="excelReg">매장 등록</button>
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
            StoreRegBulk
        },
    })
    export default class StoreRegBulk extends Vue {
        message: any = '';

        //돔생성전 호출자
        created() {
        }

        //돔렌더링완료시 진행
        mounted() {
        }

        //엑셀파일 등록
        excelChk(){

        }

        //대량 등록
        excelReg(){

        }

        //가맹점 등록
        insertFranchise() {



            this.$router.push('/home/franchiseRegCmpl')
        }

    }

</script>