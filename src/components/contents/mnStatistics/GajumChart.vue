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
                            <label>기간</label>
                            <span class="form_cal"><input type="text" title="날짜 입력" class="input date"></span><span class="period_cal">-</span><span class="form_cal"><input type="text" title="날짜 입력" class="input date"><a href="#" id="datepicker-trigger" class="btn_cal">달력</a></span>
                        </li>
                    </ul>
                    <span class="btn_req_area"><button type="button" class="btn_m01 bg01">조회</button></span>
                </div>
            </div>
            <!-- //search box -->

            <!-- tab box -->
            <div class="tab_box">
                <ul class="tab01">
                    <li :class="{'on': (listShow == true) } " @click="show('list')"><a >표로 보기</a></li>
                    <li  :class="{'on': (chartShow == true) } " @click="show('chart')"><a >차트 보기</a></li>
                </ul>
            </div>

            <GajumList  v-show="listShow"></GajumList>
            <GajumLineChart v-show="chartShow"></GajumLineChart>


        </div>
        <!-- //content -->
    </section>
    <!-- //container -->

</template>

<script lang="ts">

    import {Component, Vue} from 'vue-property-decorator';
    import  GajumList from "@/components/contents/mnStatistics/GajumList.vue"
    import  GajumLineChart from "@/components/contents/mnStatistics/GajumLineChart.vue"

    @Component({

        components: {
            GajumChart, GajumList, GajumLineChart
        }
    })
    export default class GajumChart extends Vue {
        listShow:boolean=true;
        chartShow:boolean=true;

        mounted(){
            this.chartShow=false;
        }

        /**
         * 표로보기
         */
        show(div){

            if(div == 'chart'){
                this.listShow =false;
                this.chartShow =true;

            }else{
                this.chartShow =false;
                this.listShow =true;
            }
        }


    }
</script>

<style scoped>

</style>