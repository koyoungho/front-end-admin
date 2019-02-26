<template>
    <section id="container" style="width:1580px">
      <!-- content  -->
      <div class="content" style="width:1580px">
        <h2 class="blind">현금영수증관리</h2>
        <h3>오류 내역 조회</h3>

        <ListComponent v-bind:listObject="listItem" v-bind:onLoadList="listItem.dataGrid.onLoadList" v-on:searchDateChange="dateCheck" v-on:listView="listViewEvent"></ListComponent>

        <div class="btn_bot type03">
          <template v-if="getData['mode']=='read'">
          <button type="button" id="" class="btn_b01 bg03" v-on:click="goBack()" >돌아가기</button>
            <button type="button" id="" class="btn_b01 bg03" v-on:click="goInsert" >임시저장</button>
          </template>
          <template v-if="getData['mode']=='update'">
            <button type="button" id="" class="btn_b01 bg03" v-on:click="goBack()" >돌아가기</button>
          <button type="button" id="" class="btn_b01 bg03" v-on:click="goInsert" >임시저장</button>
          </template>
        </div>
      </div>

      <errorModPopup v-if="showModal1"  :viewData="viewData"  @saupClose="showModal1 = false"></errorModPopup>

    </section>
</template>

<script lang="ts">
    import {format} from 'date-fns';
    import {Component, Vue, Watch} from 'vue-property-decorator';
    import {CommonBoardService} from '../../../api/common.service';
    import ListComponent from '../../common/list/list.vue';  // 공용리스트 콤포넌트
    import moment from 'moment';
    import VueSimpleSpinner from 'vue-simple-spinner/src/components/Spinner.vue';
    import errorModPopup from './errorModPopup.vue'

    @Component({
        components: {
            ErrorListMod,ListComponent,VueSimpleSpinner,errorModPopup
        }
    })
    export default class ErrorListMod extends Vue {
        message: any = '';
        regShow : boolean = false;
        searchYear : string = moment(new Date).format('YYYY');  //선택연도
        showModal1 : boolean = false;
        role: any = sessionStorage.getItem('role');
        getData : any = {};
        receiveDate:string = "";
        viewData : any = [];

        lang : any =  {
            days: [ '월', '화', '수', '목', '금', '토','일'],
            months: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
            pickers: ['다음주', '다음달', '이전주', '이전달'],
            placeholder: {
                date: '선택',
                dateRange: '범위 선택'
            }
        }

        listItem: any =  {}

        //돔생성전 호출자
        created() {
            // 메뉴별 권한 확인
            this.getData = this.$route.params
            this.receiveDate = this.getData['date'];

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

            this.listItem =  // 그리드 서치 페이징 옵션 처리 데이터 매우중요 이룰을 어기면 화면깨짐이 발생합니다
                {
                    dataGrid: {
                        columTopHeader : [
                            {level : [
                                    {headerName : '순번', value:'', cols : '1' , rows :'3' , level : '1'},
                                    {headerName : '오류수신내역' ,value:'',  cols : '9' , rows :'1' , level : '1'},
                                    {headerName : '오류처리내역' ,value:'',  cols : '5' , rows :'1' , level : '1'},
                                ]},
                        ],
                        columControl:[  // 반드시 받는 컬럼명과 이 ID 가 같아야데이터가 나옵니다..
                            {columName : '순번' ,id : 'num', type:'number', width : '5%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : ''  },
                            {columName : '오류발생일자' ,id :'errorDate',type:'text', width : '8%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' },
                            {columName : '오류코드' ,id :'retCode',type:'text', width : '4%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : ''  , colColors : 'color: #008aff' },
                            // {columName : '오류내용' ,id :'retCodeNm',type:'hidden', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' },
                            {columName : '승인번호' ,id :'errorAprvPerm',type:'text', width : '7%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' },
                            {columName : '거래일자' ,id :'saleDate',type:'text', width : '7%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' },
                            {columName : '거래일시' ,id :'geodate',type:'text', width : '7%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' },
                            {columName : '거래금액' ,id :'totamt',type:'text', width : '8%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' },
                            // {columName : '원거래승인번호' ,id :'oriAprvPerm',type:'text', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' },
                            // {columName : '원거래승일일자' ,id :'oriSaleDate',type:'text', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' },
                            {columName : '사업자번호' ,id :'saupId',type:'text', width : '8%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' },
                            {columName : '회사코드' ,id :'subSaup',type:'text', width : '8%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' },
                            {columName : '가맹점' ,id :'shopNm',type:'text', width : '8%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' },
                            {columName : '승인번호' ,id :'fixPerm',type:'input', width : '9%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' ,value: '' , colColors: ''},
                            {columName : '거래일자' ,id :'fixSaleDate',type:'input', width : '9%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '',value:'' , colColors: '' },
                            {columName : '처리일자' ,id :'fixDate',type:'input', width : '9%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' ,value:'' , colColors: ''},
                            {columName : '오류발생사유' ,id :'rsnCode',type:'select', width : '9%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' ,value:'' , selectList : '1' , colColors: ''}, // api 데이터를 가져와야할때
                            {columName : '조치결과' ,id :'rstCode',type:'select', width : '9%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' ,value:'', selectList : '2' , colColors: '' },

                        ],
                        commonApiOneUse : true, // 공용셀렉트 조건 1/2 두개까지만 일단적용
                        commonApiOne : 'code/rsncode',
                        commonSelectListOne : [],
                        commonApiTwoUse : true,
                        commonApiTwo : 'code/rstcode',
                        commonSelectListTwo : [],
                        tableClass:'',
                        tableClass2:'tbl_list04 page_cash03',
                        totalColum: 15, //
                        apiUrl : 'receipt-error',
                        onLoadList : false,  // onLoad 로딩 유무
                    },
                    // 아이디는 실제 컬럼값을 넣어주면됩니다.
                    search: [
                        {type: 'date3',class:'w25 text_center', title :'원거래승인일자',  id: 'searchOriSaleStartDate',id2:'searchOriSaleEndDate', name:'searchDate', searchStartDate: [] , calenderCount : 2 , dateType : 'date' , width : 220 , default :'YYYY-MM-DD'},
                        {type: 'input2',class:'w15 text_center', title :'승인번호', id: 'errorPerm', name:'inputType' , value: '',   api : '' , option : '' },
                        {type: 'input2',class:'w20 text_center', title :'원거래승인번호', id: 'oriPerm', name:'inputType' , value: '',   api : '' , option : '' },
                        {type: 'popup',class:'w15 text_right', title :'사업자번호', id: 'saupId', name:'사업자번호' , value: '',   api : '' },
                        {type: 'inputPop',class:'w15 text_left', title :'', id: 'shopNm', name:'매장정보' , value: '',   api : ''  },


                        {type: 'date3',class:'w25 text_center', title :'거래일자', id: 'searchSaleStartDate',id2:'searchSaleEndDate', name:'searchDate', searchStartDate: [] , calenderCount : 2 , dateType : 'date' , width : 220  , default :'YYYY-MM-DD'},
                        {type: 'selectCode' ,class:'w15 text_center', title :'오류코드',id: 'errorCode', name:'issuePurpose' , value: '' ,  api : 'code/taxerror' , option : [{ codeName : '소득공제' , code: '0' },{codeName : '지출증빙' , code: '1' }]},
                        {type: 'input2',class:'w20 text_center', title :'오류내용', id: 'errorCodeNm', name:'inputType' , value: '',   api : '' , option : '' },
                        {type: 'select',class:'w15 text_center' , title :'오류구분',id: 'errorType', name:'searchType' , value: 'tax' ,  api : '' , option : [{ name : '전체' , value: 'all' },{name : '국세청' , value: 'tax' },{name : '내부오류' , value: 'inner' }]},
                        {type: 'input2',class:'w15 text_center', title :'거래금액', id: 'totAmt', name:'inputType' , value: '',   api : '' , option : '' },


                        {type: 'hidden',class:'w25 text_center', title :'원거래승인번호', id: 'saupUpjongCode', name:'inputType' , value: this.getData['saupUpjongCode'],   api : '' , option : '' },
                        {type: 'hidden',class:'w25 text_center', title :'원거래승인번호', id: 'searchErrorYearMonth', name:'inputType' , value: this.receiveDate,   api : '' , option : '' },
                        {type: 'hidden',class:'w25 text_center', title :'원거래승인번호', id: 'companyCode', name:'inputType' , value: this.getData['companyCode'],   api : '' , option : '' },


                        // {type: 'radio' , title :'', id: 'searchDateType', name: 'radioBox' , value: 'saleDate' , option : [{ name : '거래일' , value: 'saleDate' },{ name : '등록일' , value: 'sendDate' }] },

                    ],
                    paging: { currentPage : 1 , lastPage : 0 ,viewPageSize : 10 ,totalRecords : 0 , from : 0 , to : 0 , perPage : 100},
                    goSearch : "iocSearch",
                    searchClass : 'search_box  page_new',
                    searchClass2 : 'search_list'
                }
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

        //돔렌더링완료시 진행
        mounted() {
        }

        //조회
        goSearch(){

        }

        listViewEvent(data){
            if(data.key=='retCode'){
                Vue.swal({text:data.row.retCodeNm})
            }else{
                this.viewData = data;
                this.showModal1 = true;
            }
        }

        //엑셀 다운로드
        excelDownload(){

        }

        goBack(){

        }

        //임시저장
        goInsert(){
                let ObjectData = this.$children['0'].$children['1'].listData // 리스트데이터
                let checkTrue = this.$children['0'].$children['1'].lineCheckOk // 오류없으면 true 하나라도있을시 false

                if(ObjectData) {

                    if (ObjectData.length > 0){
                        if(checkTrue){
                            CommonBoardService.putListData('receipt-error', null, ObjectData).then(result => {
                                if (result.status == 200) {
                                    Vue.swal({text: '임시 저장을 완료 하였습니다'});
                                }
                            })
                        }else{
                            Vue.swal({text: '오류 내역이 존재하지 않아야합니다'});
                        }

                    }else{
                        Vue.swal({text: '데이터가 존재하지않습니다'});
                    }
                }else{
                    Vue.swal({text: '데이터가 존재하지않습니다'});
                }
            }

    }

</script>