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
                            <input type="text" v-model="searchStartDate=='' ? formatDates(nowDate) : searchStartDate"  class="input date" title="날짜 입력">
                          </span>
                            <span class="period_cal">-</span>
                            <span class="form_cal">
                            <input type="text" v-model="searchEndDate=='' ? formatDates(nowDate) : searchEndDate"  class="input date" title="날짜 입력">
                            <a href="" class="btn_cal" id="datepicker">달력</a>
                          </span>
                            <template class="datepicker-trigger">
                                <AirbnbStyleDatepicker
                                    :trigger-element-id="'datepicker'"
                                    :mode="'range'"
                                    :fullscreen-mobile="true"
                                    :months-to-show="2"
                                    :offsetY="-20"
                                    :showMonthYearSelect = "true"
                                    :date-one="formatDates(nowDate)"
                                    :date-two="formatDates(nowDate)"
                                    @date-one-selected="val => { searchStartDate = formatDates(val) }"
                                    @date-two-selected="val => { searchEndDate = formatDates(val) }"
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

    import {format} from 'date-fns';
    import {Component, Vue} from 'vue-property-decorator';
    import  GajumList from "@/components/contents/mnStatistics/GajumList.vue"
    import  GajumLineChart from "@/components/contents/mnStatistics/GajumLineChart.vue"
    import  GajumPoint from "@/components/contents/mnStatistics/GajumPoint.vue"

    @Component({

        components: {
            GajumChart, GajumList, GajumLineChart,GajumPoint
        }
    })
    export default class GajumChart extends Vue {
        listShow:boolean=true;
        chartShow:boolean=true;
        tabShow:boolean=true;
        searchStartDate = "";
        searchEndDate = "";
        dateOne: any =  "";
        dateTwo: any =  "";
        nowDate : any = new Date();
        showMode : string = "single";

        created(){
            this.nowDate= this.formatDates(new Date())
            this.searchStartDate =  this.nowDate
            this.searchEndDate =  this.nowDate
        }

        mounted(){
            this.chartShow=false;
            this.tabShow=false;
        }

        formatDates(date) {
            let formattedDates = ''
            formattedDates = format(date, 'YYYYMM')
            return formattedDates
        }

        /**
         * 표로보기
         */
        show(div){

            this.listShow=false;
            this.chartShow=false;
            this.tabShow=false;

            if(div == 'chart'){
                this.chartShow =true;
            }else if(div == 'list'){
                this.listShow =true;
            }else{
                this.tabShow =true;
            }
        }


        btnClick(){
            if(this.listShow){ // 리스트쇼우
                this.$children['1'].gajumStatistics();
                this.$children['1'].receuptStatistics();
            } else if(this.chartShow){ //차트

            }else{ // 요약

            }
        }


    }
</script>

<style scoped>

</style>