<template>
    <!-- container -->
    <section id="container">
        <!-- content  -->
        <div class="content">
            <h2 class="blind">현금영수증관리</h2>
            <h3>오류 내역 조회</h3>

            <div class="search_box page_new">
                <ul class="search_list">
                    <li class="w25">
                        <label for="">오류내역(년)</label>
                        <span class="form_cal">
                          <date-picker v-model="searchYear" :lang="lang" :type="'year'"
                                       :first-day-of-week="1"  format="YYYY" width="100" confirm></date-picker>
                        </span>
                    </li>
                    <li class="w25">
                        <td style="vertical-align: middle"><label for="">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;사업자구분&nbsp;</label></td>
                        <td>
                          <model-list-select :list="saupUpjongList"
                                             v-model="saupUpjongCode"
                                             option-value="code"
                                             option-text="codeNm"
                                             style="height :10px;width:160px;float:left"
                                             :isDisabled = "upjongDisable"
                          >
                          </model-list-select >
                        </td>
                    </li>
                    <li class="w25" style="text-align: center">
                        <td style="vertical-align: middle"><label for="">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;회사코드&nbsp;</label></td>
                        <td>
                        <model-list-select :list="companyCodeList"
                                           v-model="companyCode"
                                           option-value="code"
                                           option-text="name"
                                           style="height :10px;width:170px;float:left"
                                           :isDisabled = "companyDisable"
                        >
                        </model-list-select >
                        </td>
                    </li>
                    <!--<li class="w25">-->
                        <!--<label for="">사업자등록번호</label>-->
                        <!--<input type="text"  v-model="saupId"   class="input sch_appnum"  title="고객명 입력" readonly>-->
                        <!--<button type="button" id="" class="btn_sch01" @click="popupOpen">검색</button>-->
                    <!--</li>-->
                </ul>
            </div>
            <!-- btn mid -->
            <div class="btn_mid">
                <!--<button type="button" class="btn_m01 bg05" @click="excelDown"><i class="icon download01"></i> 엑셀 다운로드</button>-->
                <button type="button" class="btn_m01 bg01" @click="goSearch()">조회</button>
            </div>
            <!-- system box -->
          <div id="loading_bar" v-show="loading">
            <vue-simple-spinner size="medium" line-fg-color="#D0021B" message="처리중입니다 잠시만기다려주세요" />
          </div>
          <div class="fcalendar">
            <ul>
              <template v-if="allList.length > 0">

              <template v-for="data,index in allList">
              <li>
                <span class="title"><font color="white">{{data.errorYearMonth}}월</font></span>
                <ul class="con">
                  <li>
                    <div>건수 :  {{data.errorCount}} / {{data.totalErrorCount}}</div>
                  </li>
                  <li>
                    <div>회사코드 : {{data.fixSubSaupCount}} / {{data.totalSubSaupCount}}</div>
                  </li>
                  <li>
                    <div>현재상태 : 제출불가</div>
                  </li>
                  <li>
                    <div style="float:left">
                      <button type="button" class="btn_s011 bg031"  @click="showList(data.errorYearMonth,'read')">보기</button>
                    </div>
                    <div style="float:left" v-if="data.errorCount >= 1">
                      <button type="button" class="btn_s011 bg011" @click="modList(data.errorYearMonth,'update')">수정</button>
                    </div>
                    <template v-if="data.errorCount >= 1">
                    <div style="float:left">
                      <button type="button" class="btn_s011 bg051" @click="jeculButton(data.errorYearMonth)">제출</button>
                    </div>
                    </template>
                    <template v-else>
                      <div style="float:left">
                        <button type="button" class="btn_s011 bg051" @click="jeculCancelButton(data.errorYearMonth)">제출취소</button>
                      </div>
                    </template>
                    <template v-if="role=='0001'">
                    <div style="float:left">
                      <button type="button" class="btn_s011 bg051" @click="kukseButton(data.errorYearMonth)">국세청</button>
                    </div>
                    </template>
                  </li>

                </ul>
              </li>
              </template>
              </template>
              <template v-else>

               <table style="width: 100%; text-align: center">
                 <tr>
                     <!-- 계정 권한 관리 화면은 columControl에 hidden이 있기때문 totalColum 으로 함 -->
                   <td class="no_data"><font color="#dcdcdc">조회된 내용이 없습니다</font></td>
                 </tr>
               </table>

              </template>
            </ul>

          </div>
          <!-- //달력 -->


          <!--<ListComponent v-bind:listObject="listItem" v-bind:onLoadList="listItem.dataGrid.onLoadList" v-on:searchDateChange="dateCheck"></ListComponent>-->
        <!-- //content -->

        <!--<div class="btn_bot type03">-->
            <!--<button type="button" id="" class="btn_b01 bg03" v-on:click="goInsert" >임시저장</button>-->
            <!--<button type="button" id="" class="btn_b01 bg01" v-on:click="goPresent"  v-show="regShow">제출</button>-->
            <!--<button type="button" id="" class="btn_b01 bg01" v-on:click="goPresentCancel"  v-show="regShow">제출취소</button>-->
            <!--<button type="button" id="" class="btn_b01 bg01" v-on:click="goPresentTax"  v-show="regShow">국세청제출</button>-->
        <!--</div>-->
        </div>
      <SaupBox v-if="showModal1"  v-on:selectedSaup="setSaupData" @saupClose="showModal1 = false"></SaupBox>

    </section>
    <!-- //container -->

</template>

<script lang="ts">
    import {format} from 'date-fns';
    import {Component, Vue, Watch} from 'vue-property-decorator';
    import {CommonBoardService} from '../../../api/common.service';
    import SaupBox from '@/components/contents/issuanceOfCashReceipt/SaupList.vue'
    import moment from 'moment';
    import VueSimpleSpinner from 'vue-simple-spinner/src/components/Spinner.vue';
    import ErrorListMode from './ErrorListMod.vue'


    @Component({
        components: {
            ErrorList,SaupBox,VueSimpleSpinner,ErrorListMode
        }
    })
    export default class ErrorList extends Vue {
        message: any = '';
        loading : boolean = false;
        regShow : boolean = false;
        ErrorListModeView : boolean = false;
        searchYear : string = moment().format('YYYY');  //선택연도
        companyCodeList : any = [];
        saupId  :string = '';
        companyCode : string = "";
        showModal1 : boolean = false;
        role: any = sessionStorage.getItem('role');
        readYn : boolean = false;
        gukseYn : boolean  = false;
        modYn : boolean  = false;
        saveYn : boolean  = false;
        saupUpjongList : any = [];
        saupUpjongCode : string = '';
        allList : any = [];
        companyDisable : boolean = false;
        upjongDisable : boolean = false;


        lang : any =  {
            days: [ '월', '화', '수', '목', '금', '토','일'],
            months: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
            pickers: ['다음주', '다음달', '이전주', '이전달'],
            placeholder: {
                date: '선택',
                dateRange: '범위 선택'
            }
        }


        //돔생성전 호출자
        created() {

            if(sessionStorage.searchYear){
                this.searchYear = sessionStorage.searchYear
            }
            if(sessionStorage.saupUpjongCode){
                this.saupUpjongCode = sessionStorage.saupUpjongCode
            }
            if(sessionStorage.companyCode){
                this.companyCode = sessionStorage.companyCode
            }

            // 메뉴별 권한 확인
            let menuList = JSON.parse(sessionStorage.authMenu);
            let programId = 'cashReceiptIssue'; //메뉴ID
            for (let i = 0; i < menuList.length; i++) {
                for (let j = 0; j < menuList[i].subMenuDtos.length; j++) {

                    //권한(조회-readYn/ 등록-createYn/ 수정-updateYn/ 삭제-deleteYn)
                    if (menuList[i].subMenuDtos[j].progId == programId && menuList[i].subMenuDtos[j].createYn == 'Y') {
                        // 월데이터가 현재달과 동일시에는 버튼 숨긴다
                            this.regShow = true;
                        }

                    }
                }

            if(this.role == '0000'){
                 // 버튼 및 권한용도
                this.gukseYn = true; // 국세청제출
                this.modYn = true;   // 수정가능
                this.readYn = true;  // 읽기 간능
                this.saveYn = true;  // 제출 가능
            }else if(this.role == '0001'){
                this.modYn = true;
                this.readYn = true;
                this.saveYn = true;
            }else{
                this.modYn = true;
                this.readYn = true;
                this.saveYn = true;
            }


            this.companyList();

            if(sessionStorage.role == '0002') { //현금영수증 사업자
                this.saupUpjongCode = sessionStorage.soluId == null ? "" : sessionStorage.soluId;
                this.upjongDisable = true;
            }else if(sessionStorage.role == '0004'){ //가맹점관리자
                this.saupUpjongCode =  sessionStorage.soluId == null ? "" : sessionStorage.soluId;
                this.companyCode = sessionStorage.upjong == null ? "" : sessionStorage.upjong;
                this.companyDisable = true;
                this.upjongDisable = true;

            }else if(sessionStorage.role == '0005') { //지점관리자
                this.saupUpjongCode = sessionStorage.soluId == null ? "" : sessionStorage.soluId;
                this.companyCode = sessionStorage.upjong == null ? "" : sessionStorage.upjong;
                this.companyDisable = true;
                this.upjongDisable = true;
            }



        }
        showList(date,mode){
            if(Number(this.role) ==1){
               this.$router.push({name: 'statAll', params: {date: date, saupUpjongCode : this.saupUpjongCode , companyCode : this.companyCode ,mode : mode}});
            }else if(Number(this.role)==2){
                this.$router.push({name: 'statAll', params: {date: date, saupUpjongCode : this.saupUpjongCode , companyCode : this.companyCode ,mode : mode}});
            }else{
                this.$router.push({name: 'statAll', params: {date: date, saupUpjongCode : this.saupUpjongCode , companyCode : this.companyCode,mode : mode }});
            }
        }


        modList(date,mode){
            if(Number(this.role) ==1){
                this.$router.push({name: 'statAll', params: {date: date, saupUpjongCode : this.saupUpjongCode , companyCode : this.companyCode ,mode : mode}});
            }else if(Number(this.role)==2){
                this.$router.push({name: 'statAll', params: {date: date, saupUpjongCode : this.saupUpjongCode , companyCode : this.companyCode ,mode : mode}});
            }else{
                this.$router.push({name: 'statAll', params: {date: date, saupUpjongCode : this.saupUpjongCode , companyCode : this.companyCode,mode : mode }});
            }
        }

        jeculButton(data){
            if(this.companyCode==''){
                Vue.swal({text: '회사 코드가 존재하지 않습니다'});
            }else{
                CommonBoardService.putListData('/receipt-error/innerfix/',data+'/'+this.companyCode,null).then(result=>{
                    if(result.status==200){
                        Vue.swal({text: '제출이 완료 되었습니다'});
                    }
                }).catch(e=>{

                })
                this.goSearch();
            }
        }

        jeculCancelButton(data){
             if(this.companyCode==''){
                 Vue.swal({text: '회사 코드가 존재하지 않습니다'});
             }else{
              CommonBoardService.putListData('/receipt-error/innerfix',data+'/cancel/'+this.companyCode,null).then(result=>{
                      if(result.status==200){
                          Vue.swal({text: '제출이 취소 되었습니다'});
                      }
              }).catch(e=>{

              })
                 this.goSearch();
             }

        }

        kukseButton(data){
            CommonBoardService.putListData('/receipt-error/taxfix',data,null).then(result=>{
                if(result.status==200){
                    Vue.swal({text: '국세청 제출이 완료되었습니다'});
                }
            }).catch(e=>{

            })
            this.goSearch();
        }

        dateCheck(data){

            let  nowUTC =  moment().utc() ; //UTC시간
            let  nowKo= nowUTC.add(9, 'hours')// 한국시간

            if(moment(data).format('YYYYMM') == moment(nowKo).format('YYYYMM')){
                this.regShow = false;
            }else{
                this.regShow = true;
            }
        }

        setSaupData(data){
            this.saupId = data.saupId
        }

        //돔렌더링완료시 진행
        mounted() {
        }

        //조회
        goSearch(){

            this.loading = true;

            sessionStorage.searchYear =this.searchYear
            sessionStorage.saupUpjongCode  = this.saupUpjongCode
            sessionStorage.companyCode  = this.companyCode

            let Object = {
                saupId : this.saupId,
                soluId : this.saupUpjongCode,
                subSaup : this.companyCode,
            };
            CommonBoardService.getListDatas('receipt-error',moment(this.searchYear).format('YYYY'),Object).then(result=>{
                if(result.status==200){
                    this.allList = result.data
                    this.loading = false;
                }
                else{
                    this.loading = false;
                }
            }).catch(e=>{
                this.loading = false;
            })

        }

        popupOpen(){
            this.showModal1= true;
        }

        companyList(){
            CommonBoardService.getListDatas('company',null,null).then(result=>{
                if(result.status==200){
                    this.companyCodeList = result.data
                }
            }).catch(e=>{
            })

            // api 데이터 호출
            let reqData: any = {};
            CommonBoardService.getListDatas('code/issuer', null, reqData).then((response) => {
                    let result: any = response.data;
                    //console.log(result)
                    if (result.length > 0) {
                        this.saupUpjongList = result;
                    }
                }
                , (error) => {
                }
            ).catch();
        }

        //엑셀 다운로드
        excelDownload(){

        }

    }

</script>