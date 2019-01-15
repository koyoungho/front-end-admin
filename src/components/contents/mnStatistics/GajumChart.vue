<template>

    <!-- container -->
    <section id="container">

        <!-- content  -->
        <div class="content">
            <h2 class="blind">통계관리</h2>

            <h3>가맹점 증감 현황</h3>

            <h4 class="blind">기간조회</h4>

            <!-- search box -->
            <div class="search_box type02 page_new">
                <div class="search_inner">
                    <ul class="search_list">
                        <li class="w100">
                            <label for="">기간</label>
                            <span class="form_cal">
                                <template v-if="tabShow">
                                   <date-picker v-model="searchDate"  v-bind:lang="lang" :type="'day'"
                                             :first-day-of-week="1" range  format="YYYY-MM-DD" width="220" confirm ></date-picker>
                                 </template>
                                <template v-else>
                                    <date-picker v-model="searchDate"  v-bind:lang="lang" :type="'month'"
                                                 :first-day-of-week="1" range  format="YYYY-MM" width="220" confirm ></date-picker>
                                </template>
                            </span>
                        </li>
                    </ul>
                    <span class="btn_req_area"><button type="button" class="btn_m01 bg01" style="margin-bottom: 4px" @click="btnClick">조회</button></span>
                </div>
            </div>
            <!-- //search box -->

            <!-- tab box -->
            <div class="tab_box">
                <ul class="tab01">
                    <li :class="{'on': (listShow == true) } " @click="show('list')"><a >표로 보기</a></li>
                    <li  :class="{'on': (chartShow == true) } " @click="show('chart')"><a >차트 보기</a></li>
                    <li  :class="{'on': (tabShow == true) } " @click="show('tab')"><a >요약정보</a></li>
                </ul>
            </div>

            <GajumList  v-show="listShow" ></GajumList>
            <GajumLineChart v-show="chartShow" ></GajumLineChart>
            <GajumPoint v-show="tabShow" ></GajumPoint>
        </div>
        <!-- //content -->
    </section>
    <!-- //container -->

</template>

<script lang="ts">

    import {Component, Vue} from 'vue-property-decorator';
    import  GajumList from "@/components/contents/mnStatistics/GajumList.vue"
    import  GajumLineChart from "@/components/contents/mnStatistics/GajumLineChart.vue"
    import  GajumPoint from "@/components/contents/mnStatistics/GajumPoint.vue"
    import moment from 'moment'

    @Component({
        components: {
            GajumChart, GajumList, GajumLineChart,GajumPoint
        }
    })
    export default class GajumChart extends Vue {
        listShow:boolean=false;
        chartShow:boolean=true;
        tabShow:boolean=false;
        searchDate :any  = [new Date(),new Date()];
        searchEndDate = "";
        lang : any =  {
            days: ['일', '월', '화', '수', '목', '금', '토'],
            months: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
            pickers: ['다음주', '다음달', '이전주', '이전달'],
            placeholder: {
                date: '선택',
                dateRange: '범위 선택'
            }
        }

        created(){
            let now = moment(new Date()).subtract(11, 'month');
            this.searchDate = [now,new Date()]

        }
        mounted(){
            this.show('list');
        }


        /**
         * 표로보기
         */
        show(div){

            if(div == 'chart'){
                if(this.tabShow){
                    this.searchDate[0] = moment(new Date()).subtract(11, 'month');
                }
                this.chartShow =true;
                this.listShow =false;
                this.tabShow =false;
            }else if(div == 'list'){
                if(this.tabShow){
                    this.searchDate[0] = moment(new Date()).subtract(11, 'month');
                }
                this.chartShow =false;
                this.listShow =true;
                this.tabShow =false;
            }else if(div=='tab'){
                this.chartShow =false;
                this.listShow =false
                this.tabShow =true;
            }

            this.tabClick()
        }


        tabClick(){
            if(this.listShow){ // 리스트쇼우
                this.$children['1'].gajumStatistics(moment(this.searchDate[0]).format("YYYYMM"),moment(this.searchDate[1]).format("YYYYMM"));
                this.$children['1'].receuptStatistics(moment(this.searchDate[0]).format("YYYYMM"),moment(this.searchDate[1]).format("YYYYMM"));
            } else if(this.chartShow){ //차트
                this.$children['2'].gajumStatisticsChart(moment(this.searchDate[0]).format("YYYYMM"),moment(this.searchDate[1]).format("YYYYMM"));
                this.$children['2'].receuptStatisticsChart(moment(this.searchDate[0]).format("YYYYMM"),moment(this.searchDate[1]).format("YYYYMM"));
            }else{ // 요약
                let timeChange = moment(new Date()).subtract(7, 'day')
                this.searchDate = [timeChange,new Date()]
                this.$children['3'].searchCount(moment(timeChange).format("YYYYMMDD"),moment(new Date()).format("YYYYMMDD"));
            }
        }

        btnClick(){
            if(this.listShow){ // 리스트쇼우
                this.$children['1'].gajumStatistics(moment(this.searchDate[0]).format("YYYYMM"),moment(this.searchDate[1]).format("YYYYMM"));
                this.$children['1'].receuptStatistics(moment(this.searchDate[0]).format("YYYYMM"),moment(this.searchDate[1]).format("YYYYMM"));
            } else if(this.chartShow){ //차트
                this.$children['2'].gajumStatisticsChart(moment(this.searchDate[0]).format("YYYYMM"),moment(this.searchDate[1]).format("YYYYMM"));
                this.$children['2'].receuptStatisticsChart(moment(this.searchDate[0]).format("YYYYMM"),moment(this.searchDate[1]).format("YYYYMM"));
            }else{ // 요약
                let timeChange = moment(new Date()).subtract(7, 'day')
                this.searchDate = [timeChange,new Date()]
                this.$children['3'].searchCount(moment(timeChange).format("YYYYMMDD"),moment(new Date()).format("YYYYMMDD"));
            }
        }


    }
</script>

<style scoped>

</style>