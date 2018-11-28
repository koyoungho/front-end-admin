<template>
    <!-- container -->
    <section id="container">
        <!-- content  -->
        <div class="content">
            <h2 class="blind">가맹점 관리</h2>

            <h3>매장 관리</h3>

            <!-- btn top -->
            <div class="btn_top">
                <button type="button" id="" class="btn_m01 bg02 reg">신규 등록</button>
            </div>

            <!-- search box -->
            <div class="search_box type01">
                <div class="search_inner">
                    <ul class="search_list">
                        <li>
                            <label for="">검색</label>
                            <select id="" name="" class="select sch_appnum" title="사업자등록번호 선택">
                                <option>사업장번호</option>
                            </select>
                            <input type="text" class="input sch_appuser" title="고객명 입력">
                        </li>
                    </ul>
                    <span class="btn_req_area"><button type="button" class="btn_m01 bg01">조회</button></span>
                </div>
            </div>
            <!-- //search box -->

            <!-- search box -->
            <div class="search_box page_store03">
                <ul class="search_list">
                    <li>
                        <label for="">가맹점</label>
                        <select id="" name="" class="select sch_w100" title="가맹점 선택">
                            <option>01</option>
                            <option>02</option>
                            <option>03</option>
                            <option>01</option>
                            <option>02</option>
                            <option>03</option>
                        </select>
                    </li>
                    <li>
                        <label for="">지점</label>
                        <select id="" name="" class="select sch_w100" title="지점 선택">
                            <option>01</option>
                            <option>02</option>
                            <option>03</option>
                            <option>01</option>
                            <option>02</option>
                            <option>03</option>
                        </select>
                    </li>
                    <li>
                        <label for="">매장 상태</label>
                        <select id="" name="" class="select sch_w100" title="매장 선택">
                            <option>01</option>
                            <option>02</option>
                            <option>03</option>
                            <option>01</option>
                            <option>02</option>
                            <option>03</option>
                        </select>
                    </li>
                    <li>
                        <label for="">BL 상태</label>
                        <select id="" name="" class="select sch_w100" title="BL 상태 선택">
                            <option>01</option>
                            <option>02</option>
                            <option>03</option>
                            <option>01</option>
                            <option>02</option>
                            <option>03</option>
                        </select>
                    </li>
                    <li>
                        <label for="">등록일</label>
                        <span class="form_cal"><input type="text" title="날짜 입력" class="input date"></span><span class="period_cal">-</span><span class="form_cal"><input type="text" title="날짜 입력" class="input date"><a href="#" id="datepicker-trigger" class="btn_cal">달력</a></span>
                    </li>
                    <li>
                        <label for="">검색</label>
                        <select id="" name="" class="select sch_appnum" title="사업자등록번호 선택">
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
                    <caption>매장 목록</caption>
                    <colgroup>
                        <col width="10%">
                        <col width="10%">
                        <col width="15%">
                        <col width="10%">
                        <col width="10%">
                        <col width="10%">
                        <col width="12%">
                        <col width="12%">
                        <col width="*">
                    </colgroup>
                    <thead>
                    <tr>
                        <th scope="col">순번</th>
                        <th scope="col">사업장명</th>
                        <th scope="col">사업자등록번호</th>
                        <th scope="col">매장번호</th>
                        <th scope="col">업종</th>
                        <th scope="col">매장상태</th>
                        <th scope="col">B/L 상태</th>
                        <th scope="col">등록일</th>
                        <th scope="col">계정상태</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>100</td>
                        <td>롯데정보통신</td>
                        <td>132-**-**232</td>
                        <td>120</td>
                        <td></td>
                        <td>승인대기</td>
                        <td>정상</td>
                        <td>2018.10.04</td>
                        <td>승인대기</td>
                    </tr>
                    <tr>
                        <td>100</td>
                        <td>롯데정보통신</td>
                        <td>132-**-**232</td>
                        <td>120</td>
                        <td></td>
                        <td>승인대기</td>
                        <td>정상</td>
                        <td>2018.10.04</td>
                        <td>승인대기</td>
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

    import {Component, Vue} from "vue-property-decorator";
    import Paging from '@/components/common/list/paging/paging.vue';

    @Component({
        components: {
            ManageShopList,
            Paging
        },
    })
    export default class ManageShopList extends Vue {
        // name: "ManageShopList",

    }
</script>

<style scoped>

</style>