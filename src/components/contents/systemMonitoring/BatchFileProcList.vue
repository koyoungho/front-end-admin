<template>
    <!-- container -->
    <section id="container">
        <!-- content  -->
        <div class="content">
            <h2 class="blind">시스템 관리</h2>

            <!-- cont_mobile -->
            <div class="cont_mobile">
                <!-- title area -->
                <div class="title_area">
                    <div class="fleft">
                        <h3>시스템 모니터링</h3>
                    </div>
                </div>

                <!-- tab box -->
                <div class="tab_box page_system06">
                    <ul class="tab01 col04">
                        <li><a href="#">승인 현황</a></li>
                        <li class="on"><a href="#">배치 파일 처리 현황</a></li>
                        <li><a href="#">시스템 자원</a></li>
                        <li><a href="#">서비스 상태</a></li>
                    </ul>
                </div>

                <!-- search box -->
                <div class="search_box page_system06">
                    <ul class="search_list">
                        <li>
                            <label for="aa">처리 일시</label><span class="form_cal"><input type="text" title="날짜 입력" class="input date"></span><span class="period_cal">-</span><span class="form_cal"><input type="text" title="날짜 입력" class="input date"><a href="#" id="datepicker-trigger" class="btn_cal">달력</a></span>
                        </li>
                        <li>
                            <label for="">처리결과</label>
                            <select id="" name="" class="select sch_w100" title="가맹점상태">
                                <option>01</option>
                                <option>02</option>
                                <option>03</option>
                                <option>01</option>
                                <option>02</option>
                                <option>03</option>
                            </select>
                        </li>
                        <li>
                            <label for="">검색</label>
                            <select id="" name="" class="select sch_appnum" title="사업장명">
                                <option>사업장명</option>
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

                <!-- tbl list box -->
                <div class="tbl_list_box">
                    <!-- tbl list01 -->
                    <table class="tbl_list01">
                        <caption>배치 파일 처리 현황 목록</caption>
                        <colgroup>
                            <col width="20%">
                            <col width="14%">
                            <col width="18%">
                            <col width="14%">
                            <col width="12%">
                            <col width="12%">
                            <col width="10%">
                        </colgroup>
                        <thead>
                        <tr>
                            <th scope="col">처리 일시</th>
                            <th scope="col">작업 ID</th>
                            <th scope="col">작업명</th>
                            <th scope="col">파일명</th>
                            <th scope="col">파일사이즈</th>
                            <th scope="col">처리결과</th>
                            <th scope="col">내용</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>대기중</td>
                            <td></td>
                            <td>작업명</td>
                            <td class="left">/home/cash/sdata/CSI20181012_01.dat</td>
                            <td>100</td>
                            <td>성공</td>
                            <td>1000</td>
                        </tr>
                        <tr>
                            <td>2018/10/12 05:22:16</td>
                            <td></td>
                            <td>작업명</td>
                            <td class="left">/home/cash/sdata/CSI20181012_01.dat</td>
                            <td>100</td>
                            <td>성공</td>
                            <td>1000</td>
                        </tr>
                        <tr>
                            <td colspan="7" class="no_data">조회된 내용이 없습니다.</td>
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
            <!-- //cont_mobile -->

        </div>
        <!-- //content -->
    </section>
    <!-- //container -->
</template>

<script lang="ts">

    import {Component, Vue} from "vue-property-decorator";

    @Component({
        components: {
            BatchFileProcList

        }
    })
    export default class BatchFileProcList extends Vue {



    }
</script>

<style scoped>

</style>