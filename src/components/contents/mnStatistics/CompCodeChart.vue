<template>
    <!-- container -->
    <section id="container">
        <!-- content  -->
        <div class="content">
            <h2 class="blind">통계관리</h2>

            <h3>회사코드별 거래현황</h3>

            <!-- btn top -->
            <div class="btn_top" v-show="regShow">
                <button type="button" @click="viewPop"  class="btn_m01 bg02" >정산 회사코드 설정</button>
            </div>

            <!-- search box -->
            <div class="search_box page_stats01">
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
                  <li>
                    <span class="chk_box ml"><input type="checkbox" id="aa03" :checked="loadCode" @click="checkTrue(loadCode)" ><label for="aa03">정산대상</label></span>
                  </li>

                    <li v-if="!loadCode">
                        <label for="">회사코드</label>
                        <select  class="select sch_w100" title="회사코드" v-model="companyCode" >
                            <option value="">전체</option>
                            <template v-for="data in companyCodeList">
                            <option  :value="data.code">{{data.name}}</option>
                            </template>
                        </select>
                    </li>
                    <li>
                        <label for="">업종별</label>
                        <select  class="select sch_w100" title="업태" v-model="upjongCode">
                            <option value="">선택안함</option>
                            <template v-for="data in upjongCodeList">
                                <option :value="data.code">{{data.codeNm}}</option>
                            </template>
                        </select>
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
              <template v-if="monthCount">
              <template v-for="data,index in ChartModel">
              <template v-if="data.data.length > 0">
              <div style="display:block; width:5000px">
                <!-- tbl list02 -->
                    <!--border-left:none"-->
                <table class="tbl_list04 page_stats01" style="float:left;">
                    <caption>회사코드별 통계</caption>
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
                        <th scope="col" rowspan="4">회사코드</th>
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
                                    <td class="name">{{countData.subSaup}}</td>
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
                      <th scope="col" rowspan="4">회사코드</th>
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

        <compCodeChartPop v-if="popupYn" @close="popupYn=false"  v-on:listSend="getCodeList"></compCodeChartPop>
    </section>
    <!-- //container -->
</template>

<script lang="ts">
    import {format} from 'date-fns';
    import {Component, Vue} from 'vue-property-decorator';
    import CompCodeChartPop from "@/components/contents/mnStatistics/CompCodeChartPop.vue";
    import {CommonBoardService} from '../../../api/common.service';
    import {CcChart} from '../../../model/chart/compCodeChart';
    import {CcChartAcount} from '../../../model/chart/compCodeChartAccount';

    @Component({

        components: {
            CompCodeChart, CompCodeChartPop
        }
    })
    export default class CompCodeChart extends Vue {
        ChartModel : CcChart[] = [];
        ChartAccountModel : CcChartAcount[] = [];
        companyCodeList : any = []; // 회사코드
        companyCode : string = "";
        upjongCodeList : any = "";  //  업종코드
        upjongCode : string = "";
        popupYn:boolean =false;
        maxList1 : any = [];
        maxList2 : any = [];
        maxList3 : any = [];
        searchStartDate = "";
        searchEndDate = "";
        dateOne: any =  "";
        dateTwo: any =  "";
        nowDate : any = new Date();
        showMode : string = "single";
        monthCount : boolean =false;
        loadCodeList : any = [];
        loadCode : boolean = false;
        regShow : boolean = false;


        formatDates(date) {
            let formattedDates = ''
            formattedDates = format(date, 'YYYYMM')
            return formattedDates
        }

        getCodeList(data){ // 정산설정한데이터 받는다
            this.loadCodeList = data;
        }


        created(){ // api 데이터
            this.nowDate= this.formatDates(new Date())
            this.searchStartDate =  this.nowDate
            this.searchEndDate =  this.nowDate
            this.companyList()
            this.upjongList()
            this.compCodeChart()

            // 메뉴별 권한 확인
            let menuList = JSON.parse(sessionStorage.authMenu);
            let programId = 'compCodeChart'; //메뉴ID
            for (let i = 0; i < menuList.length; i++) {
                for (let j = 0; j < menuList[i].subMenuDtos.length; j++) {

                    //권한(조회-readYn/ 등록-createYn/ 수정-updateYn/ 삭제-deleteYn)
                    if (menuList[i].subMenuDtos[j].progId == programId && menuList[i].subMenuDtos[j].createYn == 'Y') {
                        this.regShow = true;
                    }
                }
            }
        }

        mounted(){

        }
        /**
         * 팝업기능
         * @param fc
         */
        viewPop(fc, div){
            this.popupYn = true;
        }

        companyList(){
            CommonBoardService.getListDatas('company',null,null).then(result=>{
                    if(result.status==200){
                        this.companyCodeList = result.data
                        this.loadCodeList = [];
                        result.data.filter(data=>{
                            if(data.favYn=='Y'){
                                this.loadCodeList.push(data.code)
                            }
                        })
                    }
            }).catch(e=>{
            })
        }

        checkTrue(data){
            if(data==false){
                this.loadCode=true;
                this.companyList()
            }else{
                this.loadCode=false;
                this.loadCodeList = [];
            }
        }

        upjongList(){
            CommonBoardService.getListDatas('code','upjong',null).then(result=>{
                    if(result.status==200){
                        this.upjongCodeList = result.data
                    }
            }).catch(e=>{

            })
        }

        compCodeChart(){

            if(this.loadCode){
              this.loadCodeList = this.loadCodeList
            }else{
                this.loadCodeList = [];
                this.loadCodeList.push(this.companyCode)
            }
            console.log(this.loadCodeList);
            let Object = {searchStartDate : this.searchStartDate , searchEndDate : this.searchEndDate , subSaups : this.loadCodeList.toString() , upjong : this.upjongCode}
            CommonBoardService.getListDatas('statistics','subsaup',Object).then(result=>{
                    if(result.status==200){
                        this.ChartModel = result.data;
                        result.data.filter(e=>{
                            if(e.data.length > 0){
                                this.monthCount=true;
                            }
                        })
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