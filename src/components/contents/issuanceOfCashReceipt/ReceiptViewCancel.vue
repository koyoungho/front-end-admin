<template>

    <section id="container">
        <!--<resize-observer @notify="handleResize"/>-->
        <div class="content">
            <div>
                <h2 class="blind">{{titles}}</h2>
                <h3>{{subTitle}}</h3>
                <ListComponent v-bind:listObject="listItem" v-bind:onLoadList="listItem.dataGrid.onLoadList" v-on:listView="listViewEvent"></ListComponent>
            </div>
        </div>
        <!-- //content -->
    </section>

</template>


<script lang="ts">
    import {format} from 'date-fns';
    import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
    import ListComponent from '../../common/list/list.vue';  // 공용리스트 콤포넌트
    @Component({
        components: {
            ReceiptViewCancel,ListComponent
        }
    })
    export default class ReceiptViewCancel extends Vue {
        // 리스트 변수
        listOn : boolean = true;
        setDate =  format(new Date(),'YYYYMMDD')
        titles: string = '발급조회 및 취소'; // 제목
        subTitle: string = '현금영수증 발급'; //서브타이틀
        windowResize : boolean = false; // 리사이즈
        originItem : any = {} // 오리지널데이터
        exceptColum : any = [] // 리사이즈 됬을경우 숨겨져야할 컬럼
        listItem: any =  // 그리드 서치 페이징 옵션 처리 데이터 매우중요 이룰을 어기면 화면깨짐이 발생합니다
            {
                dataGrid: {
                    columControl:[  // 반드시 받는 컬럼명과 이 ID 가 같아야데이터가 나옵니다..
                        {columName : '거래일자' ,id : 'saleDate', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' ,rowColors :'' },
                        {columName : '승인번호' ,id : 'perm', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' , colColors : 'color: #008aff' },
                        {columName : '금액' ,id : 'totamt', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : ''},
                        {columName : '발급용도' ,id : 'geoguNm', width : '13s%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : ''},
                        {columName : '거래구분' ,id : 'trguNm', width : '5%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' ,  lineValue: '취소'  }, // 라인컬러와 라인벨류는 오직하나만
                        {columName : '신분확인' ,id : 'comfirm', width : '11%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : ''},
                        {columName : '고객명' ,id : 'cusName', width : '8%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : ''},
                        {columName : '사업장명' ,id : 'storeNm', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : ''},
                        {columName : '메모' ,id : 'memo', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : ''},
                        {columName : '처리상태' ,id : 'taxErr', width : '8%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' , textValue: '오류', fontColors :'color: red' },
                        // {columName : '처리결과' ,id : 'taxErr', width : '8%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' , options : [{ value : 'Y' , change : '전송'},{ value : 'N' , change : '미전송'}] ,fontColors :'color: red' },
                    ],
                    totalColum: 10,
                    apiUrl : 'receipts',
                    onLoadList : true,  // onLoad 로딩 유무
                    mTotal : true , // 합계금액 란 활성화여부  합계가 존재하는 페이지도 있음
                    mTotalControl : [{totalTitle : '합계 금액' , id: 'totalCount' , value : '' },{totalTitle : '봉사료' , id: 'serviceCharge' , value : '' },{totalTitle : '공급가액' , id: 'supplyValue' , value : '' },
                        {totalTitle : '부가세' , id: 'surtax' , value : '' }]
                },
                // 아이디는 실제 컬럼값을 넣어주면됩니다.
                search: [
                    {type: 'selectCode' , title :'회사코드',id: '123', name:'issuePurpose' , value: '' ,  api : '0034' , option : [{ codeName : '소득공제' , code: '0' },{codeName : '지출증빙' , code: '1' }]},
                    {type: 'popup', title :'사업장정보', id: '3', name:'사업자번호' , value: '',   api : '' },
                    {type: 'date', title :'거래일', id: 'date' , name:'date', searchStartDate: this.setDate ,  searchEndDate: this.setDate , calenderCount : 2},
                    {type: 'selectCode' , title :'발급용도',id: 'issuePurpose', name:'issuePurpose' , value: '' ,  api : '0034' , option : [{ codeName : '소득공제' , code: '0' },{codeName : '지출증빙' , code: '1' }]},
                    {type: 'selectCode' , title :'거래',id: 'dealType', name:'dealType' , value: '' ,  api : '0035' , option : [{ codeName : '승인' , code: '0' },{codeName : '취소' , code: '1' }]},
                    {type: 'selectCode' , title :'상품구분',id: 'prodType', name:'prodType' , value: '' ,  api : '0035' , option : []},
                    {type: 'selectCode' , title :'발급경로',id: '22', name:'prodType' , value: '' ,  api : '0035' , option : []},
                    {type: 'select' , title :'검색',id: 'searchType', name:'searchType' , value: '' ,  api : '' , option : [{ name : '승인번호' , value: 'perm' },{name : '신분확인번호' , value: 'confirm' },{name : '고객명' , value: 'custName' }]},
                    {type: 'input', title :'', id: 'searchWord', name:'inputType' , value: '',   api : '' , option : '' },
                    // {type: 'check' , title :'체크해', id: 'checkType', name: 'checkType' ,  value: '' , option : [{ name : '선택' , id: 'cho1', value: true },{ name : '선택2' ,id: 'cho2', value: false}] },
                    // {type: 'radio' , title :'선택해', id: 'radioBox', name: 'radioBox' , value: '' , option : [{ name : '선택' , value: '111' },{ name : '선택2' , value: '222' }] },
                ],
                paging: { currentPage : 1 , lastPage : 0 ,viewPageSize : 10 ,totalRecords : 0 , from : 0 , to : 0 , perPage : 10},
                goSearch : "iocSearch",
                searchClass : 'search_box page_cash01',
                searchClass2 : 'search_list'
            }

        created(){
            this.originItem  = this.listItem.dataGrid.columControl
        }

        mounted(){

        }

        // 뷰페이지 클릭이벤트 받아서 여는곳
        listViewEvent(row){
            this.$router.push({ name:'iocView' , params: { current : row.searchOption , objectKey : row.row.oriAprv } }) // 라우터 주소를 넣어줘야 히스토리모드 인식
        }


        updated(){
        }
    }

</script>

