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
                    columHeader : [
                        {headerName : '순번',id:'num', cols : '' , rows :'2' , level : '1'},
                        {headerName : '오류수신내역', cols : '10' , rows :'' , level : '1'},
                        {headerName : '오류처리내역', cols : '5' , rows :'' , level : '1'},
                    ],
                    columControl:[  // 반드시 받는 컬럼명과 이 ID 가 같아야데이터가 나옵니다..
                        {columName : '순번' ,id : 'num', type:'number', width : '5%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' },
                        {columName : '오류코드' ,id :'1',type:'text', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : ''  , colColors : 'color: #008aff' },
                        {columName : '오류내용' ,id :'2',type:'text', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : ''  ,  lineValue: '승인대기'},
                        {columName : '승인번호' ,id :'3',type:'text', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' },
                        {columName : '거래일자' ,id :'4',type:'text', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' },
                        {columName : '거래금액' ,id :'5',type:'text', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' },
                        {columName : '거래일시' ,id :'6',type:'text', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' },
                        {columName : '오류발생일자' ,id :'7',type:'text', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' },
                        {columName : '사업자등록번호' ,id :'8',type:'text', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' },
                        {columName : '회사코드' ,id :'9',type:'text', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' },
                        {columName : '가맹점' ,id :'10',type:'text', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' },
                        {columName : '승인번호' ,id :'11',type:'text', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' },
                        {columName : '거래일자' ,id :'12',type:'text', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' },
                        {columName : '처리일자' ,id :'13',type:'text', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' },
                        {columName : '오류발생사유' ,id :'14',type:'text', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' },
                        {columName : '조치결과' ,id :'15',type:'text', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' },
                    ],
                    tableClass:'tbl_scroll_x_box',
                    tableClass2:'tbl_list04 page_cash03',
                    totalColum: 15, //
                    apiUrl : 'receipt-error',
                    onLoadList : true,  // onLoad 로딩 유무
                },
                // 아이디는 실제 컬럼값을 넣어주면됩니다.
                search: [
                    {type: 'select' , title :'사업자구분',id: '1', name:'searchType' , value: '' ,  api : '' , option : [{ name : '아이디' , value: 'id' },{name : '이름' , value: 'name' },{name : '사업자등록번호' , value: 'saupId' },{name : '소속회사' , value: 'shopNm' }]},
                    {type: 'select' , title :'회사코드',id: '2', name:'' , value: '' ,  api : '' , option : [{ name : '아이디' , value: 'id' },{name : '이름' , value: 'name' },{name : '사업자등록번호' , value: 'saupId' },{name : '소속회사' , value: 'shopNm' }]},
                    {type: 'popup', title :'매장선택', id: '3', name:'사업자번호' , value: '',   api : '' },
                    {type: 'inputPop', title :'', id: '4', name:'매장정보' , value: '',   api : ''  },
                    {type: 'radio' , title :'', id: '5', name: 'radioBox' , value: 'lastConnDt' , option : [{ name : '거래일' , value: 'lastConnDt' },{ name : '등록일' , value: 'regDt' }] },
                    {type: 'date', title :'', id: '6' , name:'date', searchStartDate: this.setDate ,  searchEndDate: this.setDate , calenderCount : 1},
                    {type: 'select' , title :'오류코드',id: '7', name:'searchType' , value: '' ,  api : '' , option : [{ name : '아이디' , value: 'id' },{name : '이름' , value: 'name' },{name : '사업자등록번호' , value: 'saupId' },{name : '소속회사' , value: 'shopNm' }]},
                    {type: 'selectCode' , title :'오류코드',id: '8', name:'issuePurpose' , value: '' ,  api : '0034' , option : [{ codeName : '소득공제' , code: '0' },{codeName : '지출증빙' , code: '1' }]},
                    {type: 'input2', title :'오류내용', id: '9', name:'inputType' , value: '',   api : '' , option : '' },
                    // {type: 'check' , title :'체크해', id: 'checkType', name: 'checkType' ,  value: '' , option : [{ name : '선택' , id: 'cho1', value: true },{ name : '선택2' ,id: 'cho2', value: false}] },
                    // {type: 'radio' , title :'선택해', id: 'radioBox', name: 'radioBox' , value: '' , option : [{ name : '선택' , value: '111' },{ name : '선택2' , value: '222' }] },
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