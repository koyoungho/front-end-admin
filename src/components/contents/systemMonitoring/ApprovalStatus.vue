<template>
    <div>
        <h4 class="blind">승인 현황</h4>

        <!-- system box -->
        <div class="system_box">
            <ul class="system_list">
                <li>
                    <!-- system row -->
                    <div class="system_row" v-on:click="getDetail('realTime')">
                        <div class="system_col01">
                            <a>
                                <h5 class="system">실시간 승인</h5>
                                <span class="text_type04">FEP 승인요청, 응답, 지연, 실패 (로그 챠트 표시)</span>
                                <span class="text_type04">TMAX 승인요청, 응답, 지연, 실패 (로그 챠트 표시)</span>
                            </a>
                        </div>
                        <div class="system_col02">
                            <span class="total">10</span>
                        </div>
                    </div>

                    <!-- system row chart -->
                    <div class="system_row chart" v-show="realTime">
                        <div class="system_col">
                            <a>
                                <h5 class="system">실시간 승인</h5>
                                <span class="text_type04">FEP</span>
                                <div class="system_chart">
                                    <img src="../../../assets/images/img_system01.png" alt="">
                                </div>
                                <span class="text_type04">TMAX</span>
                                <div class="system_chart">
                                    <img src="../../../assets/images/img_system01.png" alt="">
                                </div>
                            </a>
                        </div>
                    </div>
                    <!-- //system row chart -->
                </li>
                <li>
                    <!-- system row -->
                    <div class="system_row" v-on:click="getDetail('taxService')">
                        <div class="system_col01">
                            <a>
                                <h5 class="system">국세청  승인 거절 건수</h5>
                                <span class="text_type04">KT</span>
                                <span class="text_type04">LDCC</span>
                            </a>
                        </div>
                        <div class="system_col02">
                            <span class="total">10</span>
                            <span class="num">5</span>
                            <span class="num">5</span>
                        </div>
                    </div>

                    <!-- system row chart -->
                    <div class="system_row chart" v-show="taxService">
                        <div class="system_col">
                            <a>
                                <h5 class="system">국세청  승인 거절 건수</h5>
                                <div class="system_chart">
                                    <img src="../../../assets/images/img_system01.png" alt="">
                                </div>
                            </a>
                        </div>
                    </div>
                    <!-- //system row chart -->
                </li>
                <li>
                    <!-- system row -->
                    <div class="system_row" v-on:click="getDetail('inner')">
                        <div class="system_col01">
                            <a>
                                <h5 class="system">내부 승인 거절 건수</h5>
                                <span class="text_type04">KT</span>
                                <span class="text_type04">LDCC</span>
                            </a>
                        </div>
                        <div class="system_col02">
                            <span class="total">10</span>
                            <span class="num">5</span>
                            <span class="num">5</span>
                        </div>
                    </div>

                    <!-- system row chart -->
                    <div class="system_row chart" v-show="inner">
                        <div class="system_col">
                            <a>
                                <h5 class="system">내부 승인 거절 건수</h5>
                                <div class="system_chart">
                                    <img src="../../../assets/images/img_system01.png" alt="">
                                </div>
                            </a>
                        </div>
                    </div>
                    <!-- //system row chart -->
                </li>
                <li>
                    <!-- system row -->
                    <div class="system_row" v-on:click="getDetail('transfer')">
                        <div class="system_col01">
                            <a>
                                <h5 class="system">국세청 전송 현황</h5>
                            </a>
                        </div>
                        <div class="system_col02">
                            <span class="total">10</span>
                        </div>
                    </div>

                    <!-- system row chart -->
                    <div class="system_row chart" v-show="transfer">
                        <div class="system_col">
                            <a>
                                <h5 class="system">국세청 전송 현황</h5>
                                <div class="system_chart">
                                    <img src="../../../assets/images/img_system01.png" alt="">
                                </div>
                            </a>
                        </div>
                    </div>
                    <!-- //system row chart -->
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">

    import {Component, Vue} from "vue-property-decorator";

    @Component({
        components: {
            ApprovalStatus
        }
    })
    export default class ApprovalStatus extends Vue {
        realTime:boolean =false;//실시간승인
        taxService:boolean =false;//국세청승인
        inner:boolean =false;//내부승인
        transfer:boolean =false;//국세청전송

        mounted(){
        }

        getDetail(div){

            if(div == 'realTime'){
                if(this.realTime ==true){
                    this.realTime = false;
                }else{
                    this.realTime = true;
                }
            }
            if(div == 'taxService'){
                if(this.taxService ==true){
                    this.taxService =false;
                }else{
                    this.taxService = true;
                }
            }
            if(div == 'inner'){
                if(this.inner ==true){
                    this.inner =false;
                }else{
                    this.inner = true;
                }
            }
            if(div == 'transfer'){
                if(this.transfer ==true){
                    this.transfer =false;
                }else{
                    this.transfer = true;
                }
            }



        }

    }
</script>

<style scoped>

</style>