<template>
    <!-- container -->
    <section id="container">
        <!-- content  -->
        <div class="content">
            <h2 class="blind">통계관리</h2>

            <h3>현금영수증 사업자 정산룰 등록</h3>

            <!-- settle box -->
            <div class="settle_box">
                <h4>기간</h4>
                <div class="form_settle">
                    <span class="form_cal"><input type="text" title="날짜 입력" class="input date"></span><span class="period_cal">-</span><span class="form_cal"><input type="text" title="날짜 입력" class="input date"><a href="#" id="datepicker-trigger" class="btn_cal">달력</a></span>
                </div>

                <h4>국세청 단가</h4>
                <!-- tbl view box -->
                <div class="tbl_view_box">
                    <!-- tbl view01 -->
                    <table class="tbl_view01">
                        <caption>국세청 단가</caption>
                        <colgroup>
                            <col width="32%">
                            <col width="68%">
                        </colgroup>
                        <tbody>
                        <tr>
                            <th scope="row">비온라인</th>
                            <td><input type="text" class="input form_settle01" title="비온라인"> 원</td>
                        </tr>
                        <tr>
                            <th scope="row">온라인</th>
                            <td><input type="text" class="input form_settle01" title="온라인"> 원</td>
                        </tr>
                        <tr>
                            <th scope="row">자진발급</th>
                            <td><input type="text" class="input form_settle01" title="자진발급"> 원</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <!-- //tbl view box -->

                <h4>KT-LDCC 배분율</h4>
                <!-- tbl view box -->
                <div class="tbl_view_box">
                    <!-- tbl view01 -->
                    <table class="tbl_view01">
                        <caption>KT-LDCC 배분율</caption>
                        <colgroup>
                            <col width="32%">
                            <col width="68%">
                        </colgroup>
                        <tbody>
                        <tr>
                            <th scope="row">KT 가맹 일반</th>
                            <td>
                                <div class="form_settle_area">
							<span class="col left">
								<label>KT</label>
								<input type="text" class="input form_settle02" value="85" title=""> %
							</span>
                                    <span class="col right">
								<label>LDCC</label>
								<input type="text" class="input form_settle02" value="15" title=""> %
							</span>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">KT 가맹 편의점</th>
                            <td>
                                <div class="form_settle_area">
							<span class="col left">
								<label>KT</label>
								<input type="text" class="input form_settle02" value="90" title=""> %
							</span>
                                    <span class="col right">
								<label>LDCC</label>
								<input type="text" class="input form_settle02" value="10" title=""> %
							</span>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">LDCC 가맹 일반</th>
                            <td>
                                <div class="form_settle_area">
							<span class="col left">
								<label>LDCC</label>
								<input type="text" class="input form_settle02" value="84" title=""> %
							</span>
                                    <span class="col right">
								<label>KT</label>
								<input type="text" class="input form_settle02" value="16" title=""> %
							</span>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">LDCC 가맹 편의점</th>
                            <td>
                                <div class="form_settle_area">
							<span class="col left">
								<label>LDCC</label>
								<input type="text" class="input form_settle02" value="95" title=""> %
							</span>
                                    <span class="col right">
								<label>KT</label>
								<input type="text" class="input form_settle02" value="5" title=""> %
							</span>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <!-- //tbl view box -->
            </div>

            <!-- btn bot -->
            <div class="btn_bot">
                <button type="button" @click="ruleReg" class="btn_b01 bg01">등록</button>
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
            JungsanRuleReg
        }
    })
    export default class JungsanRuleReg extends Vue {

        /**
         * 정산룰등록
         */
        ruleReg(){
            this.$router.push({path:'jungsanRuleSearch' });
        }
    }
</script>

<style scoped>

</style>