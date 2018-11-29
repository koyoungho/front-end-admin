<template>

    <!-- container -->
    <section id="container">
        <!-- content  -->
        <div class="content">
            <h2 class="blind">가맹점 관리</h2>

            <h3>승인 대역 관리</h3>

            <!-- btn top -->
            <div class="btn_top">
                <button type="button" id="" class="btn_m01 bg02" v-on:click="newReg">승인대역신청 및 등록</button>
            </div>

            <!-- search box -->
            <div class="search_box page_store04">
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
                        <label for="">승인코드</label>
                        <select id="" name="" class="select sch_w100" title="승인코드">
                            <option>01</option>
                            <option>02</option>
                            <option>03</option>
                            <option>01</option>
                            <option>02</option>
                            <option>03</option>
                        </select>
                    </li>
                    <li>
                        <label for="">상태</label>
                        <select id="" name="" class="select sch_w100" title="상태">
                            <option>01</option>
                            <option>02</option>
                            <option>03</option>
                            <option>01</option>
                            <option>02</option>
                            <option>03</option>
                        </select>
                    </li>
                    <li>
                        <label for="">등록일</label><span class="form_cal"><input type="text" title="날짜 입력" class="input date"></span><span class="period_cal">-</span><span class="form_cal"><input type="text" title="날짜 입력" class="input date"><a href="#" id="datepicker-trigger" class="btn_cal">달력</a></span>
                    </li>
                    <li>
                        <label for="">검색</label>
                        <select id="" name="" class="select sch_appnum" title="사업장명">
                            <option>사업장명</option>
                        </select>
                    </li>
                    <li>
                        <input type="text" class="input sch_appuser" title="고객명 입력">
                    </li>
                </ul>
            </div>
            <!-- //search box -->

            <!-- btn mid -->
            <div class="btn_mid">
                <button type="button" class="btn_m01 bg01">조회</button>
            </div>

            <!-- tbl list box -->
            <div class="tbl_list_box">
                <!-- tbl list01 -->
                <table class="tbl_list01">
                    <caption>승인 대역 관리 목록</caption>
                    <colgroup>
                        <col width="10%">
                        <col width="10%">
                        <col width="15%">
                        <col width="10%">
                        <col width="12%">
                        <col width="12%">
                        <col width="12%">
                        <col width="12%">
                        <col width="*">
                    </colgroup>
                    <thead>
                    <tr>
                        <th scope="col">순번</th>
                        <th scope="col">사업장명</th>
                        <th scope="col">사업자등록번호</th>
                        <th scope="col">회사코드</th>
                        <th scope="col">승인코드</th>
                        <th scope="col">승인대역 (시작)</th>
                        <th scope="col">승인대역 (끝)</th>
                        <th scope="col">등록일</th>
                        <th scope="col">상태</th>
                    </tr>
                    </thead>
                    <tbody v-on:click="goDetl">
                    <tr>
                        <td>100</td>
                        <td>롯데정보통신</td>
                        <td>132-**-**232</td>
                        <td>120</td>
                        <td>A1</td>
                        <td>10000</td>
                        <td>10000</td>
                        <td>2018.10.04</td>
                        <td>승인</td>
                    </tr>
                    <tr>
                        <td>100</td>
                        <td>롯데정보통신</td>
                        <td>132-**-**232</td>
                        <td>120</td>
                        <td>A1</td>
                        <td>10000</td>
                        <td>10000</td>
                        <td>2018.10.04</td>
                        <td>승인대기</td>
                    </tr>
                    <tr>
                        <td>100</td>
                        <td>롯데정보통신</td>
                        <td>132-**-**232</td>
                        <td>120</td>
                        <td>A1</td>
                        <td>10000</td>
                        <td>10000</td>
                        <td>2018.10.04</td>
                        <td><span class="fc_pt01">해지</span></td>
                    </tr>
                    <tr>
                        <td colspan="9" class="no_data">조회된 내용이 없습니다.</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <!-- //tbl list box -->

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
            ApprovalBandList
        },
    })
    export default class ApprovalBandList extends Vue {
        message: any = '';

        //돔생성전 호출자
        created() {
        }

        //돔렌더링완료시 진행
        mounted() {
        }

        //상세이동
        goDetl(){
            this.$router.push('/home/approvalBandReg')
        }

        //등록
        newReg(){
            this.$router.push('/home/approvalBandReg')
        }
    }

</script>