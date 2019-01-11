<template>
    <!-- container -->
    <section id="container">
        <!-- content  -->
        <div class="content">
            <h2 class="blind">현금영수증관리</h2>

            <h3>오류 내역 조회</h3>
            <ListComponent v-bind:listObject="listItem" v-bind:onLoadList="listItem.dataGrid.onLoadList" v-on:searchDateChange="dateCheck"></ListComponent>
        <!-- //content -->

        <div class="btn_bot type03">
            <button type="button" id="" class="btn_b01 bg02" v-on:click="goCancel">취소</button>
            <button type="button" id="" class="btn_b01 bg03" v-on:click="goInsert" v-show="regShow">임시저장</button>
            <button type="button" id="" class="btn_b01 bg01" v-on:click="goPresent"  v-show="regShow">제출</button>
        </div>
        </div>
    </section>
    <!-- //container -->

</template>

<script lang="ts">
    import {format} from 'date-fns';
    import {Component, Vue, Watch} from 'vue-property-decorator';
    import {CommonBoardService} from '../../../api/common.service';
    import ListComponent from '../../common/list/list.vue';  // 공용리스트 콤포넌트
    import moment from 'moment'

    @Component({
        components: {
            ErrorList,ListComponent
        }
    })
    export default class ErrorList extends Vue {
        message: any = '';
        regShow : boolean = false;

        listItem: any =  // 그리드 서치 페이징 옵션 처리 데이터 매우중요 이룰을 어기면 화면깨짐이 발생합니다
            {
                dataGrid: {
                    columTopHeader : [
                        {level : [
                                {headerName : '순번', value:'', cols : '1' , rows :'3' , level : '1'},
                                {headerName : '오류수신내역' ,value:'',  cols : '12' , rows :'1' , level : '1'},
                                {headerName : '오류처리내역' ,value:'',  cols : '5' , rows :'1' , level : '1'},
                            ]},
                    ],
                    columControl:[  // 반드시 받는 컬럼명과 이 ID 가 같아야데이터가 나옵니다..
                        {columName : '순번' ,id : 'num', type:'number', width : '5%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : ''  },
                        {columName : '오류발생일자' ,id :'sendDate',type:'text', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' },
                        {columName : '오류코드' ,id :'retCode',type:'text', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : ''  , colColors : 'color: #008aff' },
                        {columName : '오류내용' ,id :'retCodeNm',type:'text', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' },
                        {columName : '승인번호' ,id :'errorAprvPerm',type:'text', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' },
                        {columName : '거래일자' ,id :'saleDate',type:'text', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' },
                        {columName : '거래일시' ,id :'geodate',type:'text', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' },
                        {columName : '거래금액' ,id :'totamt',type:'text', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' },
                        {columName : '원거래승인번호' ,id :'oriAprvPerm',type:'text', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' },
                        {columName : '원거래승일일자' ,id :'oriSaleDate',type:'text', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' },
                        {columName : '사업자등록번호' ,id :'saupId',type:'text', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' },
                        {columName : '회사코드' ,id :'subSaup',type:'text', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' },
                        {columName : '가맹점' ,id :'shopNm',type:'text', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' },
                        {columName : '승인번호' ,id :'fixPerm',type:'input', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' ,value: '' , colColors: ''},
                        {columName : '거래일자' ,id :'fixSaleDate',type:'input', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '',value:'' , colColors: '' },
                        {columName : '처리일자' ,id :'fixDate',type:'input', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' ,value:'' , colColors: ''},
                        {columName : '오류발생사유' ,id :'rsnCode',type:'select', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' ,value:'' , selectList : '1' , colColors: ''}, // api 데이터를 가져와야할때
                        {columName : '조치결과' ,id :'rstCode',type:'select', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' ,value:'', selectList : '2' , colColors: '' },

                    ],
                    commonApiOneUse : true, // 공용셀렉트 조건 1/2 두개까지만 일단적용
                    commonApiOne : 'code/rsncode',
                    commonSelectListOne : [],
                    commonApiTwoUse : true,
                    commonApiTwo : 'code/rstcode',
                    commonSelectListTwo : [],
                    tableClass:'tbl_scroll_x_box',
                    tableClass2:'tbl_list04 page_cash03',
                    totalColum: 15, //
                    apiUrl : 'receipt-error',
                    onLoadList : false,  // onLoad 로딩 유무
                },
                // 아이디는 실제 컬럼값을 넣어주면됩니다.
                search: [
                    {type: 'select' , title :'사업자구분',id: 'test', name:'searchType' , value: '' ,  api : '' , option : [{name : '회사코드' , value: 'saupId' },{name : '사업자등록번호' , value: 'saupId' }]},
                    {type: 'selectObject' , title :'회사코드',id: 'subSaup', name:'' , value: '' ,  api : 'company' , option : [{ name : '아이디' , value: 'id' },{name : '이름' , value: 'name' },{name : '사업자등록번호' , value: 'saupId' },{name : '소속회사' , value: 'shopNm' }]},
                    {type: 'popup', title :'사업자등록번호', id: 'saupId', name:'사업자번호' , value: '',   api : '' },
                    {type: 'inputPop', title :'', id: 'shopNm', name:'매장정보' , value: '',   api : ''  },
                    {type: 'date3', title :'오류발생월', id: 'searchErrorYearMonth' ,id2:'', name:'searchDate', searchStartDate: "" , calenderCount : 1 , dateType : 'month' , width : 140 ,default :'YYYY-MM'},
                    {type: 'select' , title :'오류구분',id: 'errorType', name:'searchType' , value: '' ,  api : '' , option : [{ name : '전체' , value: 'all' },{name : '국세청' , value: 'tax' },{name : '내부오류' , value: 'inner' }]},
                    {type: 'selectCode' , title :'오류코드',id: 'errorCode', name:'issuePurpose' , value: '' ,  api : 'code/taxerror' , option : [{ codeName : '소득공제' , code: '0' },{codeName : '지출증빙' , code: '1' }]},
                    {type: 'input2', title :'오류내용', id: 'errorCodeNm', name:'inputType' , value: '',   api : '' , option : '' },
                    {type: 'input2', title :'승인번호', id: 'errorPerm', name:'inputType' , value: '',   api : '' , option : '' },
                    {type: 'date3', title :'거래일자', id: 'searchSaleStartDate',id2:'searchSaleEndDate', name:'searchDate', searchStartDate: [] , calenderCount : 2 , dateType : 'date' , width : 220  , default :'YYYY-MM-DD'},
                    {type: 'input2', title :'거래금액', id: 'totAmt', name:'inputType' , value: '',   api : '' , option : '' },
                    {type: 'input2', title :'원거래승인번호', id: 'oriPerm', name:'inputType' , value: '',   api : '' , option : '' },
                    {type: 'date3', title :'원거래승인일자',  id: 'searchOriSaleStartsDate',id2:'searchOriSaleEndDate', name:'searchDate', searchStartDate: [] , calenderCount : 2 , dateType : 'date' , width : 220 , default :'YYYY-MM-DD'},
                    // {type: 'radio' , title :'', id: 'searchDateType', name: 'radioBox' , value: 'saleDate' , option : [{ name : '거래일' , value: 'saleDate' },{ name : '등록일' , value: 'sendDate' }] },

                ],
                paging: { currentPage : 1 , lastPage : 0 ,viewPageSize : 10 ,totalRecords : 0 , from : 0 , to : 0 , perPage : 50},
                goSearch : "iocSearch",
                searchClass : 'search_box page_cash02',
                searchClass2 : 'search_list'
            }

        //돔생성전 호출자
        created() {
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
        }
        dateCheck(data){
            if(moment(data).format('YYYYMM') == moment(new Date()).format('YYYYMM')){
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

        //엑셀 다운로드
        excelDownload(){

        }

        //취소
        goCancel(){

        }

        //제출
        goPresent(){
            Vue.swal({text: '준비중입니다'});
        }

        //저장
        goInsert(){
            // alert('준비중입니다')
            let ObjectData = this.$children['0'].$children['1'].listData // 리스트데이터
            let checkTrue = this.$children['0'].$children['1'].lineCheckOk // 오류없으면 true 하나라도있을시 false

            if(checkTrue){
                    console.log(ObjectData)
            }
        }

    }

</script>