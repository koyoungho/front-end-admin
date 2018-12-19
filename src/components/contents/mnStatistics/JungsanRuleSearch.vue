<template>
    <!-- container -->
    <section id="container">
        <!-- content  -->
        <div class="content">
            <h2 class="blind">통계관리</h2>

            <h3>현금영수증 사업자 정산룰 조회결과</h3>

            <!-- btn top -->
            <div class="btn_top">
                <button type="button" @click="jungsanRuleReg" class="btn_m01 bg02">정산룰 등록</button>
            </div>

            <!-- tbl list box -->
            <div class="tbl_list_box">
                <!-- tbl list01 -->
                <table class="tbl_list01">
                    <caption>사업자 정산룰 목록</caption>
                    <colgroup>
                        <col width="*">
                        <col width="8%">
                        <col width="8%">
                        <col width="8%">
                        <col width="8%">
                        <col width="8%">
                        <col width="8%">
                        <col width="8%">
                        <col width="15%">
                    </colgroup>
                    <thead>
                    <tr>
                        <th scope="col">적용일자</th>
                        <th scope="col">비 온라인</th>
                        <th scope="col">온라인</th>
                        <th scope="col">자진발급</th>
                        <th scope="col" colspan="2">KT 배분율</th>
                        <th scope="col" colspan="2">LDCC 배분율</th>
                        <th scope="col">등록일</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>2018년 9월 20일~2018년 10 월 4일</td>
                        <td class="right">12.5원</td>
                        <td class="right">11.5원</td>
                        <td class="right">11.5원</td>
                        <td>일반</td>
                        <td>편의점</td>
                        <td>일반</td>
                        <td>편의점</td>
                        <td>2018.10.31 13:00</td>
                    </tr>
                    <tr>
                        <td colspan="9" class="no_data">조회된 내용이 없습니다.</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <!-- //tbl list box -->

        </div>
        <!-- //content -->
    </section>
    <!-- //container -->

</template>

<script lang="ts">

    import {Component, Vue} from 'vue-property-decorator';

    @Component({

        components: {
            JungsanRuleSearch
        }
    })
    export default class JungsanRuleSearch extends Vue {

        /**
         * 정산룰등록
         */
        jungsanRuleReg(){
            this.$router.push({path:'jungsanRuleReg' });
        }

    }
</script>

<style scoped>

</style>