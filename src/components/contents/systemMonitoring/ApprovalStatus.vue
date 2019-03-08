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
                            <span class="total">{{realTimeAprvTotal}}</span>
                            <span class="num">{{realTimeAprvFep}}</span>
                            <span class="num">{{realTimeAprvTmax}}</span>
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
                            <span class="total">{{taxAprvErrorTotal}}</span>
                            <span class="num">{{taxAprvErrorKt}}</span>
                            <span class="num">{{taxAprvErrorLdcc}}</span>
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
                            <span class="total">{{innerAprvErrorTotal}}</span>
                            <span class="num">{{innerAprvErrorKt}}</span>
                            <span class="num">{{innerAprvErrorLdcc}}</span>
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
                                <span class="text_type04">가맹점 정보</span>
                                <span class="text_type04">발급내역</span>
                            </a>
                        </div>
                        <div class="system_col02">
                            <span class="total">{{taxTransSum}}</span>
                            <span class="num">{{taxTransGajum}}</span>
                            <span class="num">{{taxTransReceipt}}</span>
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

    import {Component, Vue, Prop} from "vue-property-decorator";
    import {CommonBoardService} from "../../../api/common.service";

    @Component({
        components: {
            ApprovalStatus
        }
    })

    export default class ApprovalStatus extends Vue {

        @Prop() approvalGbn  !: any;

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

        //실시간 승인
        realTimeAprvTotal : any = '0';
        realTimeAprvTmax : any = '0';
        realTimeAprvFep : any = '0';

        //국세청 승인 거절 건수
        taxAprvErrorTotal : any = '0';
        taxAprvErrorKt : any = '0';
        taxAprvErrorLdcc : any = '0';

        //내부 승인 거절 건수
        innerAprvErrorTotal : any = '0';
        innerAprvErrorKt : any = '0';
        innerAprvErrorLdcc : any = '0';

        //국세청 전송 현황
        taxTransSum : any = '0';
        taxTransGajum : any = '0';
        taxTransReceipt : any = '0';

        tempValue : any = '';

        interval:any = '';

        created(){

            this.interval = setInterval(this.approvalStatusApi, 5000);
        }

        updated(){

        }

        mounted () {

            this.realTimeSec()
            this.taxServiceSec()
            this.innerSec()
            this.transferTimeSec()

            this.realTime =false;//실시간승인
            this.taxService =false;//국세청승인
            this.inner =false;//내부승인
            this.transfer=false;//국세청전송

            this.approvalStatusApi()

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

            /*if(div == 'realTime'){
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
            }*/
        }

        amtComma(num){
            if(num == null || num == ''){
                return '0';
            }else if(num == 0 || num == '0'){
                return '0';
            }else{
                return Number(num).toLocaleString();
            }
        }

        approvalStatusApi(){

            if(this.approvalGbn){

                CommonBoardService.getListDatas('monitoring/approval', null, null).then(result=>{
                    if(result.status==200){

                        for(let i=0; i<result.data.length; i++){

                            if(result.data[i].objType != null){

                                //실시간 승인
                                if(result.data[i].objType == 'realTimeAprv' && result.data[i].objName == 'fep'){
                                    this.realTimeAprvFep = this.amtComma(result.data[i].value);
                                }else if(result.data[i].objType == 'realTimeAprv' && result.data[i].objName == 'tmax'){
                                    this.realTimeAprvTmax = this.amtComma(result.data[i].value);
                                }
                                this.realTimeAprvTotal = this.amtComma(Number(this.realTimeAprvFep.replace(/,/gi,"")) + Number(this.realTimeAprvTmax.replace(/,/gi,"")));

                                //국세청 승인 거절 건수
                                if(result.data[i].objType == 'taxAprvError' && result.data[i].objName == 'kt'){
                                    this.taxAprvErrorKt = this.amtComma(result.data[i].value);
                                }else if(result.data[i].objType == 'taxAprvError' && result.data[i].objName == 'ldcc'){
                                    this.taxAprvErrorLdcc = this.amtComma(result.data[i].value);
                                }
                                this.taxAprvErrorTotal = this.amtComma(Number(this.taxAprvErrorKt.replace(/,/gi,"")) + Number(this.taxAprvErrorLdcc.replace(/,/gi,"")));

                                //내부 승인 거절 건수
                                if(result.data[i].objType == 'innerAprvError' && result.data[i].objName == 'kt'){
                                    this.innerAprvErrorKt = this.amtComma(result.data[i].value);
                                }else if(result.data[i].objType == 'innerAprvError' && result.data[i].objName == 'ldcc'){
                                    this.innerAprvErrorLdcc = this.amtComma(result.data[i].value);
                                }
                                this.innerAprvErrorTotal = this.amtComma(Number(this.innerAprvErrorKt.replace(/,/gi,"")) + Number(this.innerAprvErrorLdcc.replace(/,/gi,"")));

                                //국세청 전송 현황
                                if(result.data[i].objType == 'taxTransSum'){
                                    this.taxTransSum = this.amtComma(result.data[i].value);
                                }else if(result.data[i].objType == 'taxTransGajum'){
                                    this.taxTransGajum = this.amtComma(result.data[i].value);
                                }else if(result.data[i].objType == 'taxTransReceipt'){
                                    this.taxTransReceipt = this.amtComma(result.data[i].value);
                                }

                            }

                        }

                    }
                })

            }



        }

        destroyed(){
            clearInterval(this.interval);
        }

    }
</script>

<style scoped>

</style>