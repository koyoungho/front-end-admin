<template>

    <section id="container">
        <!--<resize-observer @notify="handleResize"/>-->

        <div class="content">
            <h2 class="blind">{{titles}}</h2>
            <h3>{{subTitle}} </h3>

            <div class="btn_top">
                <button type="button" id="" class="btn_m01 bg05" v-on:click="downExel"><i data-v-a75fdae8="" class="icon download01"></i>엑셀 다운로드</button>
            </div>

            <ListComponent v-bind:listObject="listItem" v-bind:onLoadList="listItem.dataGrid.onLoadList" v-on:listView="listViewEvent"></ListComponent>
        </div>
        <!-- //content -->
    </section>

</template>


<script lang="ts">
    import {format} from 'date-fns';
    import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
    import ListComponent from '../../common/list/list.vue';  // 공용리스트 콤포넌트
    import {CommonBoardService} from '../../../api/common.service';

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
        subTitle: string = '발급조회 및 취소'; //서브타이틀
        windowResize : boolean = false; // 리사이즈
        originItem : any = {} // 오리지널데이터
        exceptColum : any = [] // 리사이즈 됬을경우 숨겨져야할 컬럼
        role: any = sessionStorage.getItem('role');
        saupId: any = "";
        onLoadListView : any = true;
        listItem: any ={};
        listData:any ={};
        shopNm:any ="";
        show : boolean = true;

        created(){

            if(this.role == '0001' || this.role == '0003' ){
                this.onLoadListView = false;
                this.show =false;
            }else{
                this.saupId = sessionStorage.getItem('saupId');
                this.shopNm = sessionStorage.getItem('storeNm');
                this.show =true;
            }
            this.listItem =  // 그리드 서치 페이징 옵션 처리 데이터 매우중요 이룰을 어기면 화면깨짐이 발생합니다
                {
                    dataGrid: {
                        columControl:[  // 반드시 받는 컬럼명과 이 ID 가 같아야데이터가 나옵니다..
                            {columName : '거래일자' ,id : 'saleDate',type:'date', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' ,rowColors :'' , dateFormat:'YYYY.MM.DD'},
                            {columName : '승인번호' ,id : 'perm',type:'text', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' , colColors : 'color: #008aff' },
                            {columName : '금액' ,id : 'totamt', type:'money', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' , colColors : 'text-align: right' } ,
                            {columName : '발급용도' ,id : 'geoguNm',type:'text', width : '13%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : ''},
                            {columName : '거래구분' ,id : 'trgu',type:'text', width : '5%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' ,  lineValue: '취소' , options:[{value:'0' , change:'승인' },{value:'1' , change:'취소' }]  }, // 라인컬러와 라인벨류는 오직하나만
                            {columName : '회사코드' ,id : 'subSaup',type:'text', width : '5%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' ,   },
                            {columName : '사업자번호' ,id : 'saupId',type:'text', width : '5%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' ,  },
                            {columName : 'ID명' ,id : 'loginid',type:'text', width : '5%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : ''},
                            {columName : '신분확인' ,id : 'comfirm',type:'text', width : '11%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : ''},
                            {columName : '고객명' ,id : 'cusName',type:'text', width : '8%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : ''},
                            {columName : '메모' ,id : 'memo',type:'text', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : ''},
                            {columName : '처리내용' ,id : 'taxSend',type:'text', width : '5%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' , textValue: '오류', fontColors :'color: red' },
                        ],
                        totalColum: 10,
                        apiUrl : 'receipt',
                        onLoadList : this.onLoadListView,  // onLoad 로딩 유무
                        mTotal : true , // 합계금액 란 활성화여부  합계가 존재하는 페이지도 있음
                        mTotalControl : [{totalTitle : '합계 금액' , id: 'totalAmt' , value : '' },{totalTitle : '합계봉사료' , id: 'bong' , value : '' },{totalTitle : '합계공급가액' , id: 'amt' , value : '' },
                            {totalTitle : '합계부가세' , id: 'vat' , value : '' }]
                    },
                    // 아이디는 실제 컬럼값을 넣어주면됩니다.
                    search: [
                        {type: 'selectObject' ,class:'w30', title :'회사코드',id: 'subSaup', name:'subSaup' , value: '' ,  api : 'company' , option : []},
                        {type: 'popup',class:'w30 ', title :'사업자등록번호', id: 'saupId', name:'사업자번호' , value: this.saupId,   api : '' ,},
                        {type: 'inputPop',class:'w30 text_left', title :'', id: 'shopNm', name:'매장정보' , value: this.shopNm,   api : '' , disable : this.show},
                        {type: 'select' ,class:'w30', title :'발급용도',id: 'geogu', name:'geogu' , value: '' ,  api : '' , option : [{ name : '현금(소득공제)' , value: '0' },{name : '현금(지출증빙)' , value: '1' }]},
                        {type: 'select' ,class:'w30', title :'거래구분',id: 'trgu', name:'trgu' , value: '0' ,  api : '' , option : [{ name : '승인' , value: '0' },{name : '취소' , value: '1' }]},
                        {type: 'select' ,class:'w30', title :'발급경로',id: 'onlineYn', name:'onlineYn' , value: 'Y' ,  api : '' , option : [{ name : '온라인' , value: 'Y' },{name : '오프라인' , value: 'N' }]},
                        {type: 'radio' ,class:'w25', title :'', id: 'searchDateType', name: 'radioBox' , value: 'approval' , option : [{ name : '거래일' , value: 'approval' },{ name : '취소일' , value: 'cancel' }] },
                        {type: 'date2',class:'w25 text_left', title :'', id: 'date', name:'date', searchStartDate: [new Date(),new Date()] , calenderCount : 2 , dateType : 'date' , width : 220  , default :'YYYY-MM-DD'},
                        {type: 'select' ,class:'w25', title :'검색',id: 'searchType', name:'searchType' , value: '' ,  api : '' , option : [{ name : '승인번호' , value: 'perm' },{name : '신분확인번호' , value: 'comfirm' },{name : '고객명' , value: 'cusName' },{name : 'ID명' , value: 'loginid' }]},
                        {type: 'input',class:'w25 text_left', title :'', id: 'searchWord', name:'inputType' , value: '',   api : '' , option : '' },
                    ],
                    paging: { currentPage : 1 , lastPage : 0 ,viewPageSize : 10 ,totalRecords : 0 , from : 0 , to : 0 , perPage : 10},
                    goSearch : "iocSearch",
                    searchClass : 'search_box page_new',
                    searchClass2 : 'search_list'
                }

            if(this.$store.state.searchList.menuId==this.$route.name){
                this.listItem.search  = this.$store.state.searchList.listDt
            }

        }
        mounted() {
        }
        // 뷰페이지 클릭이벤트 받아서 여는곳
        listViewEvent(row){
            this.$router.push({ name:'receiptViewCancelDetl', params: { current : row.searchOption , objectKey : row.row , onlineYn: this.listItem.search[6].value} }) // 라우터 주소를 넣어줘야 히스토리모드 인식
        }



        updated(){
        }

        downExel(){
            Vue.swal({text:"다운로드 준비중입니다."});
        }
    }

</script>

