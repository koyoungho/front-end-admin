<template>
    <div>
        <h4>가맹점 현황</h4>
        <!-- grid chart box -->
        <div v-show="loading1">
            <vue-simple-spinner size="medium" line-fg-color="#D0021B" message="loading..." />
        </div>

        <div class="grid_chart_box col02">
            <div class="col" style ="width:100%">
                <div class="chart_box" >
                    <ve-line :data="chartDataJoin" :settings="ChartSettingsJoin" height="280px"></ve-line>
                </div>
            </div>
        </div>

        <h4>현금영수증 발행 현황</h4>
        <!-- grid chart box -->
        <div  v-show="loading2">
        <vue-simple-spinner size="medium" line-fg-color="#D0021B" message="loading..." />
        </div>
        <div class="grid_chart_box col02">
            <div class="col">
                <ul class="chart_list">
                    <li class="on"><a @click="dataCheck('all')">전체</a></li>
                    <li><a  @click="dataCheck('ktAprv')">KT 승인</a></li>
                    <li><a  @click="dataCheck('ktCancel')">KT 취소</a></li>
                    <li><a  @click="dataCheck('ldccAprv')">롯데 승인</a></li>
                    <li><a  @click="dataCheck('ldccCancel')">롯데 취소</a></li>
                </ul>
            </div>
            <div class="col">
                <div class="chart_box" >
                    <ve-line v-bind:data="chartDataCash" v-bind:settings="ChartSettingsCash" height="280px"></ve-line>

                </div>
            </div>
        </div>

    </div>

</template>

<script lang="ts">

    import {format} from 'date-fns';
    import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
    import {CommonBoardService} from '../../../api/common.service';
    import VueSimpleSpinner from 'vue-simple-spinner/src/components/Spinner.vue';

    @Component({

        components: {
            GajumLineChart
            , VueSimpleSpinner
        }
    })
    export default class GajumLineChart extends Vue {
        @Prop() searchStartDate !:string

        gajumList : Object = [];
        gajumCount : number = 0;
        receiptList : Object = [];
        receiptCount : number = 0;
        // nowDate : any = new Date();
        dateArray : any = [];
        dateArray2 : any = [];
        chart1 : boolean = false;
        OringinChart : any = "";

        loading1 :boolean= false;
        loading2 :boolean= false;

        ChartSettingsJoin :any = {
            labelMap: {
                ktAprv: 'KT가입',
                ktCancel: 'KT해지',
                ldccAprv: '롯데가입',
                ldccCancel: '롯데해지',
            }
        };
        chartDataJoin :any = {
            columns: ['date', 'ktAprv', 'ktCancel', 'ldccAprv', 'ldccCancel'],
            rows: [
            ]}
        //     //현금영수증
        ChartSettingsCash : any  ={
            labelMap: {
                ktAprv: 'KT승인',
                ktCancel: 'KT취소',
                ldccAprv: '롯데승인',
                ldccCancel: '롯데취소',
            }
        }
        chartDataCash : any = {
            columns: ['date', 'ktAprv', 'ktCancel', 'ldccAprv', 'ldccCancel'],
            rows: [
            ]}

        dataCheck(data){
            if (data =='all'){
                this.chartDataCash.columns = this.OringinChart
            }else{
                this.chartDataCash.columns= ['date', data]
            }
        }

        formatDates(date) {
            let formattedDates = ''
            formattedDates = format(date, 'YYYYMM')
            return formattedDates
        }


        dateFormats(date) {
            let dates = '';
            dates = date.substr(2,2)+'/'+date.substr(4,2)
            return dates
        }

        created(){
            this.loading1 = true;
            this.loading2 = true;
        }

        mounted(){

        }

        gajumStatisticsChart(date1,date2){
            this.loading1=true;
            CommonBoardService.getListDatas('statistics','gajum',{responseType:'CHART',searchStartDate: date1 , searchEndDate: date2 }).then(result=>{
                if(result.status==200) {
                    this.gajumList = result.data
                    this.chartDataJoin.rows=[];
                    result.data.filter(e=>{
                        this.chartDataJoin.rows.push(e)
                    })
                }else{

                }
                this.loading1 = false;
            }).catch(e=>{
                this.loading1=false;
            })
        }

        receuptStatisticsChart(date1,date2){
            this.loading2=true;
            CommonBoardService.getListDatas('statistics','receipt',{responseType:'CHART',searchStartDate: date1 , searchEndDate: date2}).then(result=>{
                if(result.status==200){
                    console.log(result)
                    this.receiptList = result.data
                    this.chartDataCash.rows=[];
                    result.data.filter(e=>{
                        this.chartDataCash.rows.push(e)
                    })
                    this.OringinChart = this.chartDataCash.columns
                }
                this.loading2=false;
            }).catch(e=>{
                this.loading2=false;
            })
        }
    }
</script>

<style scoped>

</style>