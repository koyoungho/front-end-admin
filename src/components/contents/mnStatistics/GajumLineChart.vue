<template>
    <div>
        <h4>가맹점 현황</h4>
        <!-- grid chart box -->
        <div class="grid_chart_box col02">
            <!--<div class="col">-->
                <!--&lt;!&ndash;<ul class="chart_list">&ndash;&gt;-->
                    <!--&lt;!&ndash;<li class="on"><a href="#">전체</a></li>&ndash;&gt;-->
                    <!--&lt;!&ndash;<li><a href="#">KT</a></li>&ndash;&gt;-->
                    <!--&lt;!&ndash;<li><a href="#">롯데</a></li>&ndash;&gt;-->
                    <!--&lt;!&ndash;<li><a href="#">가입</a></li>&ndash;&gt;-->
                    <!--&lt;!&ndash;<li><a href="#">해지</a></li>&ndash;&gt;-->
                <!--&lt;!&ndash;</ul>&ndash;&gt;-->
            <!--</div>-->
            <div class="col" style ="width:100%">
                <div class="chart_box">
                    <vcha :data="chartDataJoin" :settings="ChartSettingsJoin" height="280px"></vcha>
                </div>
            </div>
        </div>

        <h4>현금영수증 발행 현황</h4>
        <!-- grid chart box -->
        <div class="grid_chart_box col02">
            <div class="col">
                <ul class="chart_list">
                    <li class="on"><a href="#">전체</a></li>
                    <li><a href="#">KT 가맹점 발행</a></li>
                    <li><a href="#">롯데 가맹점 발행</a></li>
                    <li><a href="#">일반 발행</a></li>
                    <li><a href="#">웹 발행</a></li>
                </ul>
            </div>
            <div class="col">
                <div class="chart_box">
                    <!--<img src="../../../assets/images/img_chart01.png" alt="" style="margin:30px 50px 0 50px">-->
                    <ve-line :data="chartDataCash" :settings="ChartSettingsCash" height="280px"></ve-line>
                </div>
            </div>
        </div>

    </div>

</template>

<script lang="ts">

    import {format} from 'date-fns';
    import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
    import {CommonBoardService} from '../../../api/common.service';

    @Component({

        components: {
            GajumLineChart
        }
    })
    export default class GajumLineChart extends Vue {
        @Prop() searchStartDate !:string
        @Prop() searchEndDate !:string

        newDateStart : string = this.searchStartDate
        newDateEnd : string = this.searchEndDate
        gajumList : Object = [];
        gajumCount : number = 0;
        receiptList : Object = [];
        receiptCount : number = 0;
        nowDate : any = new Date();
        dateArray : any = [];
        dateArray2 : any = [];

        @Watch('searchStartDate') onChange(){
            this.newDateStart = this.searchStartDate
        }
        @Watch('searchEndDate') onChange2(){
            this.newDateEnd = this.searchEndDate
        }

        formatDates(date) {
            let formattedDates = ''
            formattedDates = format(date, 'YYYYMM')
            return formattedDates
        }

        //가맹점현황
        ChartSettingsJoin : any  ={
            labelMap: {
                ktAprv: 'KT가입',
                ktCancel: 'KT해지',
                ldccAprv: '롯데가입',
                ldccCancel: '롯데해지',
            },

        }
        chartDataJoin : any = {
            columns: ['date', 'ktAprv', 'ktCancel', 'ldccAprv', 'ldccCancel'],
            rows: [

            ]}

            //현금영수증
        ChartSettingsCash : any  ={
            labelMap: {
                cost: 'KT 가맹점 발행',
                profit: '롯데 가맹점 발행',
                growthRate: '일반발행',
                people: '웹발행',
            }
        }
        chartDataCash : any = {
            columns: ['date', 'cost', 'profit', 'growthRate', 'people'],
            rows: [
                { 'cost': 152, 'date': '01/01', 'profit': 152, 'growthRate': 0.12, 'people': 100 },
                { 'cost': 122, 'date': '01/02', 'profit': 153, 'growthRate': 0.345, 'people': 100 },
                { 'cost': 212, 'date': '01/03', 'profit': 153, 'growthRate': 0.7, 'people': 100 },
                { 'cost': 412, 'date': '01/04', 'profit': 123, 'growthRate': 0.31, 'people': 100 },
                { 'cost': 312, 'date': '01/05', 'profit': 123, 'growthRate': 0.12, 'people': 100 },
                { 'cost': 712, 'date': '01/06', 'profit': 152, 'growthRate': 0.65, 'people': 100 },
                { 'cost': 152, 'date': '01/07', 'profit': 152, 'growthRate': 0.12, 'people': 100 },
                { 'cost': 122, 'date': '01/08', 'profit': 153, 'growthRate': 0.345, 'people': 100 },
                { 'cost': 212, 'date': '01/09', 'profit': 153, 'growthRate': 0.7, 'people': 100 },
                { 'cost': 412, 'date': '01/10', 'profit': 123, 'growthRate': 0.31, 'people': 100 },
                { 'cost': 312, 'date': '01/11', 'profit': 123, 'growthRate': 0.12, 'people': 100 },
                { 'cost': 712, 'date': '01/12', 'profit': 152, 'growthRate': 0.65, 'people': 100 }
            ]}

        dateFormats(date) {
            let dates = '';
            dates = date.substr(2,2)+'/'+date.substr(4,2)
            return dates
        }

        created(){
            this.gajumStatistics()
        }

        mounted(){

        }

        gajumStatistics(){
            CommonBoardService.getListDatas('statistics','gajum',{responseType:'CHART',searchStartDate: this.newDateStart , searchEndDate: this.newDateEnd}).then(result=>{
                if(result.status==200){
                    this.gajumList = result.data
                    this.chartDataJoin.rows=[];
                    result.data.filter(e=>{
                        this.chartDataJoin.rows.push(e)
                    })

                }
            }).catch(e=>{
            })
        }

        receuptStatistics(){
            CommonBoardService.getListDatas('statistics','receipt',{responseType:'CHART',searchStartDate: this.newDateStart , searchEndDate: this.newDateEnd}).then(result=>{
                if(result.status==200){
                    console.log(result)
                    this.receiptList = result.data
                    // this.chartDataCash = {
                    //     column: [ObjectColumn],
                    //     row : [ObjectRowList]
                    // }
                }
            }).catch(e=>{
            })
        }
    }
</script>

<style scoped>

</style>