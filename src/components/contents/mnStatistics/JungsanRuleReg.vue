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
                    <span class="form_cal">
                         <date-picker v-model="searchStartDate"  v-bind:lang="langs" :type="'day'"
                                      :first-day-of-week="1" range  format="YYYY-MM-DD" width="220" confirm ></date-picker>
                    </span>
                </div>

                <div class="s_left">
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
                                <td><input type="text" class="input form_settle01" title="비온라인" v-model="jungsanRule.taxOffline"> 원</td>
                            </tr>
                            <tr>
                                <th scope="row">온라인</th>
                                <td><input type="text" class="input form_settle01" title="온라인" v-model="jungsanRule.taxOnline"> 원</td>
                            </tr>
                            <tr>
                                <th scope="row">자진발급</th>
                                <td><input type="text" class="input form_settle01" title="자진발급" v-model="jungsanRule.taxSelf"> 원</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <!-- //tbl view box -->
                </div>
                <div class="s_right">
                    <h4>KT-LDCC 배분율</h4>
                    <!-- tbl view box -->
                    <div class="tbl_view_box">
                        <!-- tbl view01 -->
                        <table class="tbl_view01">
                            <caption>KT-LDCC 배분율</caption>
                            <colgroup>
                                <col width="30%">
                                <col width="70%">
                            </colgroup>
                            <tbody>
                            <tr>
                                <th scope="row">KT 가맹 일반</th>
                                <td>
                                    <div class="form_settle_area">
                                        <span class="col left">
                                            <label>KT</label>
                                            <input type="text" class="input form_settle02" value="85" title="" v-model="jungsanRule.ktKtNor"> %
                                        </span>
                                        <span class="col right">
                                            <label>LDCC</label>
                                            <input type="text" class="input form_settle02" value="15" title="" v-model="jungsanRule.ktLdccNor"> %
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
                                            <input type="text" class="input form_settle02" value="90" title="" v-model="jungsanRule.ktKtConven"> %
                                        </span>
                                        <span class="col right">
                                            <label>LDCC</label>
                                            <input type="text" class="input form_settle02" value="10" title="" v-model="jungsanRule.ktLdccConven"> %
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
                                            <input type="text" class="input form_settle02" value="84" title="" v-model="jungsanRule.ldccLdccNor"> %
                                        </span>
                                        <span class="col right">
                                            <label>KT</label>
                                            <input type="text" class="input form_settle02" value="16" title="" v-model="jungsanRule.ldccKtNor"> %
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
                                            <input type="text" class="input form_settle02" value="95" title="" v-model="jungsanRule.ldccLdccConven"> %
                                        </span>
                                        <span class="col right">
                                            <label>KT</label>
                                            <input type="text" class="input form_settle02" value="5" title="" v-model="jungsanRule.ldccKtConven"> %
                                        </span>
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <!-- //tbl view box -->
                </div>
            </div>

            <!-- btn bot -->
            <div class="btn_bot">
                <button type="button"  class="btn_b01 bg01" @click="saveData">등록</button>
            </div>

        </div>
        <!-- //content -->
    </section>
    <!-- //container -->
</template>

<script lang="ts">

    import {Component, Vue} from 'vue-property-decorator';
    import moment from 'moment'
    import {CommonBoardService} from '../../../api/common.service';

    @Component({
        components: {
            JungsanRuleReg
        }
    })
    export default class JungsanRuleReg extends Vue {
        searchStartDate :any = [new Date(),new Date()];
        langs : any =  {
            days: ['일', '월', '화', '수', '목', '금', '토'],
            months: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
            pickers: ['다음주', '다음달', '이전주', '이전달'],
            placeholder: {
                date: '선택',
                dateRange: '범위 선택'
            }
        }

        jungsanRule : any = {startDate :'' , endDate :'' , taxOffline :0 , taxOnline :0 , taxSelf :0
            , ktKtNor :0 , ktLdccNor :0, ktKtConven :0, ktLdccConven :0 , ldccLdccNor :0, ldccKtNor :0 , ldccLdccConven : 0 , ldccKtConven : 0 , regDt : ''}


            created(){
                this.jungsanRule.startDate = moment(this.searchStartDate[0]).format('YYYYMMDD')
                this.jungsanRule.endDate = moment(this.searchStartDate[1]).format('YYYYMMDD')
                this.jungsanRule.regDt = moment(new Date()).format('YYYYMMDD') // 등록날짜를 보내야되나요?
            }

        /**
         * 정산룰등록
         */

            saveData(){
            this.jungsanRule.startDate = moment(this.searchStartDate[0]).format('YYYYMMDD')
            this.jungsanRule.endDate = moment(this.searchStartDate[1]).format('YYYYMMDD')
            this.jungsanRule.regDt = moment(new Date()).format('YYYYMMDD') //

                CommonBoardService.postListDatas('statistics' ,'jungsanrate', this.jungsanRule).then(result=>{
                    if(result.status ==200 || result.status==201){
                        Vue.swal({
                            text: '등록되었습니다',
                        }).then((result) => {
                            // 리스트로 이동
                            this.$router.push({ name:'jungsanRuleSearch' })
                        });

                    } else {
                        Vue.swal({ text: '등록 실패 되었습니다.'});
                    }
                })
            }

    }
</script>

<style scoped>

</style>