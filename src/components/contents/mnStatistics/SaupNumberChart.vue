<template>
    <!-- container -->
    <section id="container">
        <!-- content  -->
        <div class="content">
            <div id="loading_bar" v-show="loading">
                <vue-simple-spinner size="medium" line-fg-color="#D0021B" message="처리중입니다 잠시만기다려주세요!" />
            </div>
            <h2 class="blind">통계관리</h2>
            <h3>사업자번호별 거래현황</h3>
            <!-- btn top -->
            <!-- search box -->
            <div class="search_box page_stats02">
                <ul class="search_list">
                    <li>
                        <label for="">기간</label>
                        <span class="form_cal">
                          <date-picker v-model="searchStartDate"  :lang="lang" :type="'month'"
                                       :first-day-of-week="1" range  format="YYYY-MM" width="200" confirm ></date-picker>
                          </span>
                    </li>
                    <li>
                        <label for="">회사코드</label>
                        <select  class="select sch_w100" title="회사코드" v-model="companyCode" >
                            <option value="">전체</option>
                            <template v-for="data in companyCodeList">
                                <option  :value="data.code">{{data.name}}</option>
                            </template>
                        </select>
                    </li>
                    <li>
                        <label for="aa">사업자등록번호</label>
                        <input type="text"  v-model="saupId"   class="input sch_appnum"  title="고객명 입력" readonly>
                        <button type="button" id="" class="btn_sch01" @click="popupOpen">검색</button>
                    </li>

                </ul>
            </div>
            <!-- //search box -->

            <!-- btn mid -->
            <div class="btn_mid">
                <button type="button" class="btn_m01 bg05" @click="excelDown"><i class="icon download01"></i> 엑셀 다운로드</button>
                <button type="button" class="btn_m01 bg01" @click="compCodeChart()">조회</button>
            </div>

            <!-- tbl scroll x box -->
            <div class="tbl_scroll_x_box" >
                <!-- 데이터가 존재 -->
                <template v-if="monthCount">
                    <!--개월수만큼 데이터 오픈-->
                    <template v-for="data,index in ChartModel">
                        <!--개월중 데이터 존재하는것만 -->
                        <template v-if="data.data.length > 0">
                            <div style="display:block; width:5000px">
                                <!-- tbl list02 -->
                                <!--border-left:none"-->
                                <table class="tbl_list04 page_stats01" style="float:left;">
                                    <caption>사업자번호별 통계</caption>
                                    <colgroup>
                                        <!--<template v-if="data(-1).length < 1">-->
                                        <col width="100px">
                                        <col width="120px">
                                        <!--</template>-->
                                        <col span="16">
                                    </colgroup>
                                    <thead>
                                    <tr>
                                        <!--<template v-if="data(-1).length < 1">-->
                                        <th scope="col" rowspan="4">사업자등록번호</th>
                                        <th scope="col" rowspan="4">사업장명</th>
                                        <!--</template>-->
                                        <th scope="col" colspan="16">{{data.searchDate}}</th>
                                    </tr>
                                    <tr>
                                        <th scope="col" colspan="4">승인</th>
                                        <th scope="col" colspan="4">취소</th>
                                        <th scope="col" colspan="4">국세청 승인 오류</th>
                                        <th scope="col" colspan="4">국세청 취소 오류</th>
                                    </tr>
                                    <tr>
                                        <th scope="col" colspan="2">온라인</th>
                                        <th scope="col" colspan="2">오프라인</th>
                                        <th scope="col" colspan="2">온라인</th>
                                        <th scope="col" colspan="2">오프라인</th>
                                        <th scope="col" colspan="2">온라인</th>
                                        <th scope="col" colspan="2">오프라인</th>
                                        <th scope="col" colspan="2">온라인</th>
                                        <th scope="col" colspan="2">오프라인</th>
                                    </tr>
                                    <tr>
                                        <th scope="col">자진</th>
                                        <th scope="col">비자진</th>
                                        <th scope="col">자진</th>
                                        <th scope="col">비자진</th>
                                        <th scope="col">자진</th>
                                        <th scope="col">비자진</th>
                                        <th scope="col">자진</th>
                                        <th scope="col">비자진</th>
                                        <th scope="col">자진</th>
                                        <th scope="col">비자진</th>
                                        <th scope="col">자진</th>
                                        <th scope="col">비자진</th>
                                        <th scope="col">자진</th>
                                        <th scope="col">비자진</th>
                                        <th scope="col">자진</th>
                                        <th scope="col">비자진</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <template v-if="data.data.length > 0" >
                                        <template v-for="countData in data.data">
                                            <tr>
                                                <!--<template v-if="data.searchDate==searchStartDate">-->
                                                <td class="name">{{countData.saupId}}</td>
                                                <td class="name">{{countData.shopNm}}</td>
                                                <!--</template>-->
                                                <td class="right">{{countData.aprvOnlineSelf}}</td>
                                                <td class="right">{{countData.aprvOnline}}</td>
                                                <td class="right">{{countData.aprvOfflineSelf}}</td>
                                                <td class="right">{{countData.aprvOffline}}</td>
                                                <td class="right">{{countData.cancelOnlineSelf}}</td>
                                                <td class="right">{{countData.cancelOnline}}</td>
                                                <td class="right">{{countData.cancelOfflineSelf}}</td>
                                                <td class="right">{{countData.cancelOffline}}</td>
                                                <td class="right">{{countData.taxOnlineSelf}}</td>
                                                <td class="right">{{countData.taxOnline}}</td>
                                                <td class="right">{{countData.taxOfflineSelf}}</td>
                                                <td class="right">{{countData.taxOffline}}</td>
                                                <td class="right">{{countData.taxCancelOnlineSelf}}</td>
                                                <td class="right">{{countData.taxCancelOnline}}</td>
                                                <td class="right">{{countData.taxCancelOfflineSelf}}</td>
                                                <td class="right">{{countData.taxCancelOffline}}</td>
                                            </tr>
                                        </template>
                                    </template>
                                    <template v-else>
                                        <!--<template v-for="e in monthCount">-->
                                        <!--<tr>-->
                                        <!--<template v-if="index == 0">-->
                                        <!--<td class="name">{{countData.subSaup}}</td>-->
                                        <!--<td class="name">{{countData.shopNm}}</td>-->
                                        <!--</template>-->
                                        <!--<td class="right">{{countData.aprvOnlineSelf}}</td>-->
                                        <!--<td class="right">{{countData.aprvOnline}}</td>-->
                                        <!--<td class="right">{{countData.aprvOfflineSelf}}</td>-->
                                        <!--<td class="right">{{countData.aprvOffline}}</td>-->
                                        <!--<td class="right">{{countData.cancelOnlineSelf}}</td>-->
                                        <!--<td class="right">{{countData.cancelOnline}}</td>-->
                                        <!--<td class="right">{{countData.cancelOfflineSelf}}</td>-->
                                        <!--<td class="right">{{countData.cancelOffline}}</td>-->
                                        <!--<td class="right">{{countData.taxOnlineSelf}}</td>-->
                                        <!--<td class="right">{{countData.taxOnline}}</td>-->
                                        <!--<td class="right">{{countData.taxOfflineSelf}}</td>-->
                                        <!--<td class="right">{{countData.taxOffline}}</td>-->
                                        <!--<td class="right">{{countData.taxCancelOnlineSelf}}</td>-->
                                        <!--<td class="right">{{countData.taxCancelOnline}}</td>-->
                                        <!--<td class="right">{{countData.taxCancelOfflineSelf}}</td>-->
                                        <!--<td class="right">{{countData.taxCancelOffline}}</td>-->
                                        <!--</tr>-->
                                        <!--</template>-->
                                    </template>

                                    <!--<tr>-->
                                    <!---->
                                    <!--</tr>-->
                                    </tbody>
                                    <tfoot>
                                    <tr class="total">
                                        <!--<template v-if="index == 0">-->
                                        <th scope="row" colspan="2">합계</th>
                                        <!--</template>-->
                                        <td class="right">{{data.total.aprvOnlineSelf}}</td>
                                        <td class="right">{{data.total.aprvOnline}}</td>
                                        <td class="right">{{data.total.aprvOfflineSelf}}</td>
                                        <td class="right">{{data.total.aprvOffline}}</td>
                                        <td class="right">{{data.total.cancelOnlineSelf}}</td>
                                        <td class="right">{{data.total.cancelOnline}}</td>
                                        <td class="right">{{data.total.cancelOfflineSelf}}</td>
                                        <td class="right">{{data.total.cancelOffline}}</td>
                                        <td class="right">{{data.total.taxOnlineSelf}}</td>
                                        <td class="right">{{data.total.taxOnline}}</td>
                                        <td class="right">{{data.total.taxOfflineSelf}}</td>
                                        <td class="right">{{data.total.taxOffline}}</td>
                                        <td class="right">{{data.total.taxCancelOnlineSelf}}</td>
                                        <td class="right">{{data.total.taxCancelOnline}}</td>
                                        <td class="right">{{data.total.taxCancelOfflineSelf}}</td>
                                        <td class="right">{{data.total.taxCancelOffline}}</td>
                                    </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </template>

                    </template>
                </template>
                <!-- 데이터가 하나도 존재하지않을경우 -->
                <template v-else>

                    <div style="display:block; width:5000px">
                        <!-- tbl list02 -->
                        <!--border-left:none"-->
                        <table class="tbl_list04 page_stats01" style="float:left;">
                            <caption>사업자번호별 통계</caption>
                            <colgroup>
                                <!--<template v-if="data(-1).length < 1">-->
                                <col width="100px">
                                <col width="120px">
                                <!--</template>-->
                                <col span="16">
                            </colgroup>
                            <thead>
                            <tr>
                                <!--<template v-if="data(-1).length < 1">-->
                                <th scope="col" rowspan="4">사업자등록번호</th>
                                <th scope="col" rowspan="4">사업장명</th>
                                <!--</template>-->
                                <th scope="col" colspan="16">-</th>
                            </tr>
                            <tr>
                                <th scope="col" colspan="4">승인</th>
                                <th scope="col" colspan="4">취소</th>
                                <th scope="col" colspan="4">국세청 승인 오류</th>
                                <th scope="col" colspan="4">국세청 취소 오류</th>
                            </tr>
                            <tr>
                                <th scope="col" colspan="2">온라인</th>
                                <th scope="col" colspan="2">오프라인</th>
                                <th scope="col" colspan="2">온라인</th>
                                <th scope="col" colspan="2">오프라인</th>
                                <th scope="col" colspan="2">온라인</th>
                                <th scope="col" colspan="2">오프라인</th>
                                <th scope="col" colspan="2">온라인</th>
                                <th scope="col" colspan="2">오프라인</th>
                            </tr>
                            <tr>
                                <th scope="col">자진</th>
                                <th scope="col">비자진</th>
                                <th scope="col">자진</th>
                                <th scope="col">비자진</th>
                                <th scope="col">자진</th>
                                <th scope="col">비자진</th>
                                <th scope="col">자진</th>
                                <th scope="col">비자진</th>
                                <th scope="col">자진</th>
                                <th scope="col">비자진</th>
                                <th scope="col">자진</th>
                                <th scope="col">비자진</th>
                                <th scope="col">자진</th>
                                <th scope="col">비자진</th>
                                <th scope="col">자진</th>
                                <th scope="col">비자진</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td colspan="18">데이터가 존재하지않습니다</td>
                            </tr>

                            </tbody>
                            <tfoot>
                            <tr class="total">
                                <!--<template v-if="index == 0">-->
                                <th scope="row" colspan="2">합계</th>
                                <!--</template>-->
                                <td class="right">-</td>
                                <td class="right">-</td>
                                <td class="right">-</td>
                                <td class="right">-</td>
                                <td class="right">-</td>
                                <td class="right">-</td>
                                <td class="right">-</td>
                                <td class="right">-</td>
                                <td class="right">-</td>
                                <td class="right">-</td>
                                <td class="right">-</td>
                                <td class="right">-</td>
                                <td class="right">-</td>
                                <td class="right">-</td>
                                <td class="right">-</td>
                                <td class="right">-</td>
                            </tr>
                            </tfoot>
                        </table>
                    </div>
                </template>





            </div>
            <!-- //tbl scroll box -->

        </div>
        <!-- //content -->
        <SaupBox v-if="showModal1"  v-on:selectedSaup="setSaupData" @saupClose="showModal1 = false"></SaupBox>
    </section>
    <!-- //container -->
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import CompCodeChartPop from "@/components/contents/mnStatistics/CompCodeChartPop.vue";
    import {CommonBoardService} from '../../../api/common.service';
    import {CcChart} from '../../../model/chart/compCodeChart';
    import SaupBox from '@/components/contents/issuanceOfCashReceipt/SaupList.vue'
    import moment from 'moment';
    import VueSimpleSpinner from 'vue-simple-spinner/src/components/Spinner.vue';

    @Component({

        components: {
             CompCodeChartPop,SaupBox,VueSimpleSpinner
        }
    })
    export default class saupNumberChart extends Vue {
        ChartModel : CcChart[] = [];
        companyCodeList : any = []; // 회사코드
        companyCode : string = "";
        searchStartDate:any = []
        searchEndDate = "";
        dateOne: any =  "";
        dateTwo: any =  "";
        // nowDate : any = new Date();
        showMode : string = "single";
        monthCount : boolean = false;
        saupId : string="";
        storeId : string ="";
        showModal1 : boolean = false;
        loading :boolean =false;
        nowKo : any ='';

        lang : any =  {
            days: ['일', '월', '화', '수', '목', '금', '토'],
            months: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
            pickers: ['다음주', '다음달', '이전주', '이전달'],
            placeholder: {
                date: '선택',
                dateRange: '범위 선택'
            }
        }

        created(){ // api 데이터
            let  nowUTC =  moment().utc() ; //UTC시간
            this.nowKo= nowUTC.add(9, 'hours')// 한국시간

            this.searchStartDate =[this.nowKo, this.nowKo]
            this.companyList()
        }

        popupOpen(){
            this.showModal1= true;
        }
        //선택한 가맹점 정보 셋팅(지점 등록화면 상단의 지점 정보)
        setSaupData(data) {
              this.saupId=data.saupId
        }
        mounted(){

        }

        companyList(){
            CommonBoardService.getListDatas('company',null,null).then(result=>{
                if(result.status==200){
                    this.companyCodeList = result.data
                }
            }).catch(e=>{
            })
        }

        compCodeChart(){
            if(!this.companyCode){
                alert('회사코드를 선택해주세요')
                return ;
            }

            let  beforeOneYKo=  moment(this.nowKo).subtract(1, 'years') // 일년전
            let  beforeOneYKoMm =moment(beforeOneYKo).format('YYYYMM')
            let  nowKoMm =moment(this.nowKo).format('YYYYMM')
            let  fromDate =moment(this.searchStartDate[0]).format('YYYYMM')

            let range = moment(fromDate).isBetween(beforeOneYKoMm, nowKoMm); // true

            if (range == false) {
                Vue.swal({text:"현재일 기준 최대 검색가능기간은 1년입니다."})
                return;
            }

            this.loading =true;
            let Object = {searchStartDate : moment(this.searchStartDate[0]).format('YYYYMM') , searchEndDate : moment(this.searchStartDate[1]).format('YYYYMM') , subSaup : this.companyCode ,saupId: this.saupId}
            CommonBoardService.getListDatas('statistics','saupid',Object).then(result=>{
                if(result.status==200){
                    this.ChartModel = result.data;
                    result.data.filter(e=>{
                        if(e.data.length > 0){
                            this.monthCount=true;
                        }
                    })
                    this.loading =false;
                }
            }).catch(e=>{
            })
        }

        /**
         * 엑셀다운로드
         */
        excelDown(){
            alert("엑셀다운로드");
        }


    }
</script>

<style scoped>

</style>