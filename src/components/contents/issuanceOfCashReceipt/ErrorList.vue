<template>
    <!-- container -->
    <section id="container">
        <!-- content  -->
        <div class="content">
            <h2 class="blind">현금영수증관리</h2>

            <h3>오류 내역 조회</h3>
            <ListComponent v-bind:listObject="listItem" v-bind:onLoadList="listItem.dataGrid.onLoadList" ></ListComponent>
        <!-- //content -->

        <div class="btn_bot type03">
            <button type="button" id="" class="btn_b01 bg02" v-on:click="goCancel">취소</button>
            <button type="button" id="" class="btn_b01 bg03" v-on:click="goPresent">제출</button>
            <button type="button" id="" class="btn_b01 bg01" v-on:click="goInsert">저장</button>
        </div>
        </div>
    </section>
    <!-- //container -->

</template>

<script lang="ts">
    import {format} from 'date-fns';
    import {Component, Vue} from "vue-property-decorator";
    import ListComponent from '../../common/list/list.vue';  // 공용리스트 콤포넌트

    @Component({
        components: {
            ErrorList,ListComponent
        }
    })
    export default class ErrorList extends Vue {
        message: any = '';
        setDate =  format(new Date(),'YYYYMMDD')

        listItem: any =  // 그리드 서치 페이징 옵션 처리 데이터 매우중요 이룰을 어기면 화면깨짐이 발생합니다
            {
                dataGrid: {
                    columTopHeader : [
                        {level : [
                                {headerName : '순번', value:'', cols : '1' , rows :'3' , level : '1'},
                                {headerName : '오류수신내역' ,value:'',  cols : '11' , rows :'1' , level : '1'},
                                {headerName : '오류처리내역' ,value:'',  cols : '5' , rows :'1' , level : '1'},
                            ]},
                    ],
                    columControl:[  // 반드시 받는 컬럼명과 이 ID 가 같아야데이터가 나옵니다..
                        {columName : '순번' ,id : 'num', type:'number', width : '5%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : ''  },
                        {columName : '오류코드' ,id :'retCode',type:'text', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : ''  , colColors : 'color: #008aff' },
                        {columName : '오류내용' ,id :'',type:'retCodeNm', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : ''  ,  lineValue: '승인대기'},
                        {columName : '원거래승인번호' ,id :'23',type:'text', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' },
                        {columName : '원거래승일일자' ,id :'243',type:'text', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' },
                        {columName : '승인번호' ,id :'perm',type:'text', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' },
                        {columName : '승인일자' ,id :'saleDate',type:'text', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' },
                        {columName : '거래금액' ,id :'totamt',type:'text', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' },
                        {columName : '거래일시' ,id :'geodate',type:'text', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' },
                        {columName : '오류발생일자' ,id :'sendDate',type:'text', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' },
                        {columName : '사업자등록번호' ,id :'saupId',type:'text', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' },
                        {columName : '회사코드' ,id :'subSaup',type:'text', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' },
                        {columName : '가맹점' ,id :'shopNm',type:'text', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' },
                        {columName : '승인번호' ,id :'reperm',type:'input', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' },
                        {columName : '거래일자' ,id :'resaleDate',type:'input', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' },
                        {columName : '처리일자' ,id :'fixDate',type:'input', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' },
                        {columName : '오류발생사유' ,id :'rsnCode',type:'input', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' },
                        {columName : '조치결과' ,id :'rstCode',type:'input', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' },

                    ],
                    tableClass:'tbl_scroll_x_box',
                    tableClass2:'tbl_list04 page_cash03',
                    totalColum: 15, //
                    apiUrl : 'receipt-error',
                    onLoadList : true,  // onLoad 로딩 유무
                },
                // 아이디는 실제 컬럼값을 넣어주면됩니다.
                search: [
                    {type: 'select' , title :'사업자구분',id: 'test', name:'searchType' , value: '' ,  api : '' , option : [{name : '' , value: 'saupId' },{name : '사업자등록번호' , value: 'shopNm' }]},
                    {type: 'selectObject' , title :'회사코드',id: 'subSaup', name:'' , value: '' ,  api : 'company' , option : [{ name : '아이디' , value: 'id' },{name : '이름' , value: 'name' },{name : '사업자등록번호' , value: 'saupId' },{name : '소속회사' , value: 'shopNm' }]},
                    {type: 'popup', title :'매장선택', id: '3', name:'사업자번호' , value: '',   api : '' },
                    {type: 'inputPop', title :'', id: '4', name:'매장정보' , value: '',   api : ''  },
                    {type: 'radio' , title :'', id: 'searchDateType', name: 'radioBox' , value: 'saleDate' , option : [{ name : '거래일' , value: 'saleDate' },{ name : '등록일' , value: 'sendDate' }] },
                    {type: 'date', title :'', id: '6' , name:'searchDate', searchStartDate: '20181010' ,  searchEndDate: this.setDate , calenderCount : 1},
                    {type: 'select' , title :'오류구분',id: 'errorType', name:'searchType' , value: '' ,  api : '' , option : [{ name : '전체' , value: 'all' },{name : '국세청' , value: 'tax' },{name : '내부오류' , value: 'inner' }]},
                    {type: 'selectCode' , title :'오류코드',id: 'errorCode', name:'issuePurpose' , value: '' ,  api : 'code/taxerror' , option : [{ codeName : '소득공제' , code: '0' },{codeName : '지출증빙' , code: '1' }]},
                    {type: 'input', title :'', id: 'errorMsg', name:'inputType' , value: '',   api : '' , option : '' },
                ],
                paging: { currentPage : 1 , lastPage : 0 ,viewPageSize : 10 ,totalRecords : 0 , from : 0 , to : 0 , perPage : 10},
                goSearch : "iocSearch",
                searchClass : 'search_box page_cash02',
                searchClass2 : 'search_list'
            }

        //돔생성전 호출자
        created() {
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

        }

        //저장
        goInsert(){

        }

    }

</script>