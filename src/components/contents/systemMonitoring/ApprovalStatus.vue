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
                                <span class="text_type04">FEP</span>

                                <div class="system_chart">
                                    <ve-line :data="chartDataRealTime1" :settings="realChartSettings1"></ve-line>
                                </div>
                                <span class="text_type04">TMAX</span>
                                <div class="system_chart">
                                    <ve-line :data="chartDataRealTime2" :settings="realChartSettings2"></ve-line>
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
                                    <ve-line :data="chartDataTaxService" :settings="taxChartSettings"></ve-line>
                                </div>
                            </a>
                        </div>
                    </div>
                    <!-- //system row chart -->
                </li>
                <li>
                    <!-- system row -->
                    <div class="system_row" v-on:click="getDetail('inner')" >
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
                    <div class="system_row chart" v-show="inner" >
                        <div class="system_col">
                            <div class="system_chart">
                                <ve-line :data="chartDataInner" :settings="innerChartSettings"></ve-line>
                            </div>
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
                            <div class="system_chart">
                                <ve-line :data="chartDataTransfer" :settings="transferChartSettings"></ve-line>
                            </div>

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

        realTime:boolean =true;//실시간승인
        taxService:boolean =true;//국세청승인
        inner:boolean =true;//내부승인
        transfer:boolean =true;//국세청전송

        chartDataRealTime1 : any ={};
        chartDataRealTime2 : any ={};
        chartDataTaxService : any ={};
        chartDataInner : any ={};
        chartDataTransfer : any ={};

        realChartSettings1 : any  ={};
        realChartSettings2 : any  ={};
        taxChartSettings : any  ={};
        innerChartSettings : any  ={};
        transferChartSettings : any  ={};

        mounted () {

            this.realTimeSec()
            this.taxServiceSec()
            this.innerSec()
            this.transferTimeSec()

            this.realTime =false;//실시간승인
            this.taxService =false;//국세청승인
            this.inner =false;//내부승인
            this.transfer=false;//국세청전송
        }

        realTimeSec(){
            //FEP
            this.realChartSettings1 ={
                labelMap: {
                    cost: '승인요청',
                    profit: '응답',
                    growthRate: '지연',
                    people: '실패',
                }

            }
            this.chartDataRealTime1 ={
                columns: ['date', 'cost', 'profit', 'growthRate', 'people'],
                rows: [
                    { 'cost': 1523, 'date': '01/01', 'profit': 1523, 'growthRate': 0.12, 'people': 100 },
                    { 'cost': 1223, 'date': '01/02', 'profit': 1523, 'growthRate': 0.345, 'people': 100 },
                    { 'cost': 2123, 'date': '01/03', 'profit': 1523, 'growthRate': 0.7, 'people': 100 },
                    { 'cost': 4123, 'date': '01/04', 'profit': 1523, 'growthRate': 0.31, 'people': 100 },
                    { 'cost': 3123, 'date': '01/05', 'profit': 1523, 'growthRate': 0.12, 'people': 100 },
                    { 'cost': 7123, 'date': '01/06', 'profit': 1523, 'growthRate': 0.65, 'people': 100 }
                ]}

            // TMAX
            this.realChartSettings2 ={
                labelMap: {
                    cost: '승인요청',
                    profit: '응답',
                    growthRate: '지연',
                    people: '실패',
                }
            }

            this.chartDataRealTime2 ={
                columns: ['date', 'cost', 'profit', 'growthRate', 'people'],
                rows: [
                    { 'cost': 1523, 'date': '01/01', 'profit': 1523, 'growthRate': 0.12, 'people': 100 },
                    { 'cost': 1223, 'date': '01/02', 'profit': 1523, 'growthRate': 0.345, 'people': 100 },
                    { 'cost': 2123, 'date': '01/03', 'profit': 1523, 'growthRate': 0.7, 'people': 100 },
                    { 'cost': 4123, 'date': '01/04', 'profit': 1523, 'growthRate': 0.31, 'people': 100 },
                    { 'cost': 3123, 'date': '01/05', 'profit': 1523, 'growthRate': 0.12, 'people': 100 },
                    { 'cost': 7123, 'date': '01/06', 'profit': 1523, 'growthRate': 0.65, 'people': 100 }
                ]}
        }

        taxServiceSec(){
            this.taxChartSettings ={
                labelMap: {
                    cost: 'KT',
                    profit: 'LDCC'
                }
            }
            this.chartDataTaxService ={
                columns: ['date', 'cost', 'profit'],
                rows: [
                    { 'cost': 1523, 'date': '01/01', 'profit': 1523 },
                    { 'cost': 1223, 'date': '01/02', 'profit': 1523 },
                    { 'cost': 2123, 'date': '01/03', 'profit': 1523 },
                    { 'cost': 4123, 'date': '01/04', 'profit': 1523 },
                    { 'cost': 3123, 'date': '01/05', 'profit': 1523 },
                    { 'cost': 7123, 'date': '01/06', 'profit': 1523 }
                ]}

        }
        innerSec(){
            this.innerChartSettings ={
                labelMap: {
                    cost: 'KT',
                    profit: 'LDCC'
                }
            }
            this.chartDataInner=   {columns: ['date', 'cost', 'profit'],
                rows: [
                    { 'cost': 1523, 'date': '01/01', 'profit': 1523 },
                    { 'cost': 1223, 'date': '01/02', 'profit': 1523 },
                    { 'cost': 2123, 'date': '01/03', 'profit': 1523 },
                    { 'cost': 4123, 'date': '01/04', 'profit': 1523 },
                    { 'cost': 3123, 'date': '01/05', 'profit': 1523 },
                    { 'cost': 7123, 'date': '01/06', 'profit': 1523 }
                ]}

        }

        transferTimeSec(){
            this.transferChartSettings ={
                labelMap: {
                    cost: '전송',
                }
            }
            this.chartDataTransfer= {
                columns: ['date','cost'],
                rows: [
                    { 'cost': 1523, 'date': '01/01' },
                    { 'cost': 1223, 'date': '01/02' },
                    { 'cost': 2123, 'date': '01/03' },
                    { 'cost': 4123, 'date': '01/04' },
                    { 'cost': 3123, 'date': '01/05' },
                    { 'cost': 7123, 'date': '01/06' }
                ]
            }
        }

        /**
         * 화면제어
         * @param div
         */
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
            if(div == 'transfer') {
                if (this.transfer == true) {
                    this.transfer = false;
                } else {
                    this.transfer = true;
                }
            }
        }

    }
</script>

<style scoped>

</style>