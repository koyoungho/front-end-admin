<template>

    <!-- container -->
    <section id="container">
        <!-- content  -->
        <div class="content">
            <h2 class="blind">통계관리</h2>

            <h3>가맹점 증감 현황</h3>

            <h4 class="blind">기간조회</h4>

            <!-- search box -->
            <div class="search_box type02 page_stats04">
                <div class="search_inner">
                    <ul class="search_list">
                        <li>
                            <label for="">기간</label>
                            <span class="form_cal">
                            <input type="text" v-model="searchStartDate=='' ? agoDate : searchStartDate"  class="input date" title="날짜 입력">
                          </span>
                            <span class="period_cal">-</span>
                            <span class="form_cal">
                            <input type="text" v-model="searchEndDate=='' ? nowDate : searchEndDate"  class="input date" title="날짜 입력">
                            <a href="" class="btn_cal" id="datepicker">달력</a>
                          </span>
                            <template class="datepicker-trigger">
                                <AirbnbStyleDatepicker
                                    :trigger-element-id="'datepicker'"
                                    :mode="'range'"
                                    :fullscreen-mobile="true"
                                    :months-to-show="2"
                                    :offsetY="-20"
                                    :style = "defaultStyle"
                                    :showMonthYearSelect = "true"
                                    :date-one="formatDates(agoDate)"
                                    :date-two="formatDates(nowDate)"
                                    @date-one-selected="val => { searchStartDate = tabShow==true ? tabDates(val) : formatDates(val)  }"
                                    @date-two-selected="val => { searchEndDate = tabShow==true ? tabDates(val) : formatDates(val) }"
                                />
                            </template>
                        </li>
                    </ul>
                    <span class="btn_req_area"><button type="button" class="btn_m01 bg01" @click="btnClick">조회</button></span>
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

            <GajumList  v-show="listShow" :searchStartDate="searchStartDate" :searchEndDate="searchEndDate"></GajumList>
            <GajumLineChart v-show="chartShow" :searchStartDate="searchStartDate" :searchEndDate="searchEndDate"></GajumLineChart>
            <GajumPoint v-show="tabShow" :searchStartDate="searchStartDate" :searchEndDate="searchEndDate"></GajumPoint>
        </div>
        <!-- //content -->
    </section>
    <!-- //container -->

</template>

<script lang="ts">

    import {format, getMonth} from 'date-fns';
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
        searchStartDate = "";
        searchEndDate = "";
        dateOne: any =  "";
        dateTwo: any =  "";
        nowDate : any = new Date();
        agoDate : any = new Date();
        showMode : string = "single";
        defaultStyle : string = "left : 0px"

        created(){
            this.agoDate = this.tabShow==true ?  this.tabDates(moment().subtract(6, 'month').calendar()) :this.formatDates(this.tabDates(moment().subtract(6, 'month').calendar()))
            this.nowDate=  this.tabShow==true ?  this.tabDates(new Date()) :this.formatDates(new Date())
            this.searchStartDate =  this.agoDate
            this.searchEndDate =  this.nowDate
        }

        mounted(){
            this.show('list');
        }

        formatDates(date) {
            let formattedDates = ''
                formattedDates = format(date, 'YYYYMM')
            return formattedDates
        }
        formatFirstDates(date){
            let formattedDates = ''
            formattedDates = moment().subtract(10, 'month').calendar()
            return formattedDates
        }

        tabDates(date){
            let formattedDates = ''
            formattedDates = format(date, 'YYYYMMDD')
            return formattedDates
        }

        /**
         * 표로보기
         */
        show(div){

            if(div == 'chart'){
                this.chartShow =true;
                this.listShow =false;
                this.tabShow =false;
            }else if(div == 'list'){
                this.chartShow =false;
                this.listShow =true;
                this.tabShow =false;
            }else if(div=='tab'){
                this.searchStartDate=this.tabDates(new Date())
                this.searchEndDate=this.tabDates(new Date())
                this.chartShow =false;
                this.listShow =false
                this.tabShow =true;
            }

            this.tabClick()
        }


        tabClick(){
            if(this.listShow){ // 리스트쇼우
                this.searchStartDate = this.searchStartDate.substr(0,6)
                this.searchEndDate = this.searchEndDate.substr(0,6)
                this.$children['1'].gajumStatistics(this.searchStartDate,this.searchEndDate);
                this.$children['1'].receuptStatistics(this.searchStartDate,this.searchEndDate);
            } else if(this.chartShow){ //차트
                this.searchStartDate = this.searchStartDate.substr(0,6)
                this.searchEndDate = this.searchEndDate.substr(0,6)
                this.$children['2'].gajumStatisticsChart(this.searchStartDate,this.searchEndDate);
                this.$children['2'].receuptStatisticsChart(this.searchStartDate,this.searchEndDate);
            }else{ // 요약
                this.$children['3'].searchCount(this.searchStartDate,this.searchEndDate);
            }
        }

        btnClick(){
            if(this.listShow){ // 리스트쇼우
                this.$children['1'].gajumStatistics(this.searchStartDate,this.searchEndDate);
                this.$children['1'].receuptStatistics(this.searchStartDate,this.searchEndDate);
            } else if(this.chartShow){ //차트
                this.$children['2'].gajumStatisticsChart(this.searchStartDate,this.searchEndDate);
                this.$children['2'].receuptStatisticsChart(this.searchStartDate,this.searchEndDate);
            }else{ // 요약
                this.$children['3'].searchCount(this.searchStartDate,this.searchEndDate);
            }
        }


    }
</script>

<style scoped>

</style>