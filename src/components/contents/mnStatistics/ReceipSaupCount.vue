<template>
    <!-- container -->
    <section id="container">
        <!-- content  -->
        <div class="content">
            <h2 class="blind">통계관리</h2>

            <h3>현금영수증 사업자 정산</h3>

            <!-- btn top -->
            <div class="btn_top">
                <button type="button" @click="newReg" class="btn_m01 bg02">신규 정산 등록</button>
                <button type="button" @click="ruleSearch" class="btn_m01 bg02">정산룰 조회</button>
            </div>

            <!-- search box -->
            <div class="search_box page_stats0301">
                <ul class="search_list col02">
                    <li>
                        <label for="">정산월</label><span class="form_cal"><input type="text" title="날짜 입력" class="input date"></span><span class="period_cal">-</span><span class="form_cal"><input type="text" title="날짜 입력" class="input date"><a href="#" id="datepicker-trigger" class="btn_cal">달력</a></span>
                    </li>
                    <li>
                        <label for="">구분</label>
                        <select id="" name="" class="select sch_w100" title="구분">
                            <option>전체</option>
                            <option>국세청정산</option>
                            <option>가정산</option>
                        </select>
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
                    <caption>사업자 정산 목록</caption>
                    <colgroup>
                        <col width="*">
                        <col width="15%">
                        <col width="15%">
                        <col width="15%">
                        <col width="15%">
                        <col width="15%">
                    </colgroup>
                    <thead>
                    <tr>
                        <th scope="col">최종 수정일시</th>
                        <th scope="col">정산월</th>
                        <th scope="col">구분</th>
                        <th scope="col">상태</th>
                        <th scope="col">작성자</th>
                        <th scope="col">승인자</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr @click="detailJungsan">
                        <td>2018.10.12 05:22:16</td>
                        <td>2018년 10월</td>
                        <td class="left">국세청정산</td>
                        <td>임시저장</td>
                        <td>작성자ID</td>
                        <td>승인자ID</td>
                    </tr>
                    <tr>
                        <td>2018.10.12 05:22:16</td>
                        <td>2018년 10월</td>
                        <td class="left">국세청정산</td>
                        <td>임시저장</td>
                        <td>작성자ID</td>
                        <td>승인자ID</td>
                    </tr>
                    <tr>
                        <td colspan="6" class="no_data">조회된 내용이 없습니다.</td>
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

    import {Component, Vue} from 'vue-property-decorator';

    @Component({

        components: {
            ReceipSaupCount
        }
    })
    export default class ReceipSaupCount extends Vue {

        /**
         * 신규정산등록
         * LDCC로그인시 버튼 보임
         */
        newReg(){
            this.$router.push({path:'jungsanReg' });
        }

        /**
         * 정산룰조회
         * LDCC로그인시 버튼 보임
         */
        ruleSearch(){
            this.$router.push({path:'jungsanRuleSearch' });
        }

        detailJungsan(){
            // 구분값(?), 권한에 따라 상세정보 분기-화면설계 참조할것

            // 구분값-정산완료, 가정산/국세청정산 저장, KT로그인시
            this.$router.push({path:'jungsanDetail' });

            // 구분값-임시저장, 수정요청 ,LDCC로그인일때만 보임
            // this.$router.push({path:'jungsanReg' });

        }

    }
</script>

<style scoped>

</style>