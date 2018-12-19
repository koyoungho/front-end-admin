<template>
    <!-- container -->
    <section id="container">
        <!-- content  -->
        <div class="content">
            <h2 class="blind">통계관리</h2>

            <h3>가맹점수 현황 조회</h3>

            <!-- settle box -->
            <div class="settle_box">
                <h4>기간</h4>
                <div class="form_settle">
                    <span class="form_cal"><input type="text" title="날짜 입력" class="input date"></span><span class="period_cal">-</span><span class="form_cal"><input type="text" title="날짜 입력" class="input date"><a href="#" id="datepicker-trigger" class="btn_cal">달력</a></span>
                    <span class="btn_req_area"><button type="button" class="btn_m01 bg01">조회</button></span>
                </div>

                <h4>현금영수증 가맹점 현황</h4>
                <!-- store list -->
                <ul class="store_list">
                    <li><span class="sub">신규</span> <span class="cont">201 건</span></li>
                    <li><span class="sub">해지</span> <span class="cont">20 건</span></li>
                    <li><span class="sub">누적</span> <span class="cont">10,201 건</span></li>
                    <li><span class="sub">첨부파일</span> <span class="cont"><a href="#" class="link02">신규 / 해지 가맹점 정보</a></span></li>
                </ul>

                <h4>개인정보 보유 갯 수 : <span class="sub_number">1,362건</span></h4>

            </div>

        </div>
        <!-- //content -->
    </section>
    <!-- //container -->
</template>

<script lang="ts">

    import {Component, Vue} from 'vue-property-decorator';

    @Component({

        components: {
            GajumTotal
        }
    })
    export default class GajumTotal extends Vue {

    }
</script>


<style scoped>

</style>