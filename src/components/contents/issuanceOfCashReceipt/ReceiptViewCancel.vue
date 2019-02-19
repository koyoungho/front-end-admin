<template>

    <section id="container">
        <!--<resize-observer @notify="handleResize"/>-->

        <div class="content">
            <h2 class="blind">{{titles}}</h2>
            <h3>{{subTitle}} </h3>

            <div class="btn_top">
                <button type="button" id="" class="btn_m01 bg05" v-on:click="downExel"><i data-v-a75fdae8="" class="icon download01"></i>엑셀 다운로드</button>
            </div>

            <ListComponent v-bind:listObject="listItem" v-bind:onLoadList="listItem.dataGrid.onLoadList" v-on:listView="listViewEvent" v-on:eventOnline="onlineVal"></ListComponent>
        </div>
        <!-- //content -->
    </section>

</template>


<script lang="ts">
    import {format} from 'date-fns';
    import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
    import ListComponent from '../../common/list/list.vue';  // 공용리스트 콤포넌트
    import {CommonBoardService} from '../../../api/common.service';
    import moment from 'moment';
    import axios from 'axios'
    import {environment} from '@/utill/environment';

    @Component({
        components: {
            ReceiptViewCancel,ListComponent
        }
    })
    export default class ReceiptViewCancel extends Vue {
        // 리스트 변수
        listOn : boolean = true;
        // setDate =  format(new Date(),'YYYYMMDD')
        titles: string = '발급조회 및 취소'; // 제목
        subTitle: string = '발급 내역 조회/취소'; //서브타이틀
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
        nowKo_str: any ='';

        onlineVal(val){
            if(val=='N'){
            this.listItem.dataGrid.columControl[7].type='hidden'
            this.listItem.dataGrid.columControl[9].type='hidden'
            this.listItem.dataGrid.totalColum = 8
            }else{
            this.listItem.dataGrid.columControl[7].type='text'
            this.listItem.dataGrid.columControl[9].type='text'
            this.listItem.dataGrid.totalColum = 10
            }
        }

        created(){

            let  nowUTC = moment().utc() ; //UTC시간
            let  nowKo= nowUTC// 한국시간
            let  beforeOneDKo=  moment(nowKo).subtract(1, 'days') // 하루전

            this.nowKo_str =  this.formatDates(nowKo);

            if(this.role == '0001' || this.role == '0002' || this.role == '0003'){
                this.onLoadListView = false;
                this.show =false;
            }else{
                this.saupId = sessionStorage.getItem('saupId');
                this.shopNm = sessionStorage.getItem('storeNm');
                this.show =true;
            }
            if(this.$store.state.searchList.menuId==this.$route.name){
                this.onLoadListView=true;
            }

            this.listItem =  // 그리드 서치 페이징 옵션 처리 데이터 매우중요 이룰을 어기면 화면깨짐이 발생합니다
                {
                    dataGrid: {
                        columControl:[  // 반드시 받는 컬럼명과 이 ID 가 같아야데이터가 나옵니다..
                            {columName : '거래일자' ,id : 'saleDate',type:'date', width : '8%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' ,rowColors :'' , dateFormat:'YYYY.MM.DD'},
                            {columName : '승인번호' ,id : 'perm',type:'text', width : '8%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' , colColors : 'color: #008aff' },
                            {columName : '금액' ,id : 'totamt', type:'money', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' , colColors : 'text-align: right' } ,
                            {columName : '발급용도' ,id : 'geoguNm',type:'text', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : ''},
                            {columName : '거래구분' ,id : 'trgu',type:'text', width : '7%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' ,  lineValue: '취소' , options:[{value:'0' , change:'승인' },{value:'1' , change:'취소' }]  }, // 라인컬러와 라인벨류는 오직하나만
                            {columName : '회사코드' ,id : 'subSaup',type:'text', width : '13%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' ,   },
                            {columName : '사업자번호' ,id : 'saupId',type:'bizNum', width : '13%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' ,  },
                            {columName : 'ID명' ,id : 'loginid',type:'text', width : '5%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : ''},
                            {columName : '신분확인' ,id : 'comfirm',type:'text', width : '11%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : ''},
                            {columName : '고객명' ,id : 'cusName',type:'text', width : '8%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : ''},
                            // {columName : '메모' ,id : 'memo',type:'text', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : ''},
                            {columName : '처리내용' ,id : 'taxSend',type:'text', width : '7%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' , textValue: '오류', fontColors :'color: red' ,options:[{value:'전송전' ,change:'처리예정'},{value:'전송' ,change:'처리완료'},{value:'오류' ,change:'오류'}]},
                            {columName : '' ,id : 'errorMsg', width : '11%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '',type : 'hiddens'},
                        ],
                        totalColum: 10,
                        apiUrl : 'receipt',
                        onLoadList : this.onLoadListView,  // onLoad 로딩 유무
                        textSend : '* 처리예정 :  거래일 기준 익일 국세청 전송처리'  // 리스트 상단우측 내용
                        // mTotal : true , // 합계금액 란 활성화여부  합계가 존재하는 페이지도 있음
                        // mTotalControl : [{totalTitle : '합계 금액' , id: 'totalAmt' , value : '' },{totalTitle : '합계봉사료' , id: 'bong' , value : '' },{totalTitle : '합계공급가액' , id: 'amt' , value : '' },
                        //     {totalTitle : '합계부가세' , id: 'vat' , value : '' }]
                    },
                    // 아이디는 실제 컬럼값을 넣어주면됩니다.
                    search: [
                        {type: 'select2' ,class:'w25 ', title :'발급경로',id: 'onlineYn', name:'onlineYn' , value: 'Y' ,  api : '' , option : [{ name : '웹' , value: 'Y' },{name : '일반' , value: 'N' }]},
                        {type: 'selectObjectSearchList' ,class:'w25 ', title :'회사코드',id: 'subSaup', name:'subSaup' , value: '' ,  api : 'company' , option : []},
                        {type: 'popup',class:'w25 ', title :'사업자등록번호', id: 'saupId', name:'사업자번호' , value: this.saupId,   api : '' ,},
                        {type: 'inputPop',class:'w25 text_left', title :'', id: 'shopNm', name:'매장정보' , value: this.shopNm,   api : '' , disable : this.show},
                        {type: 'selectCode' ,class:'w25 ', title :'발급용도',id: 'geogu', name:'geogu' , value: '' ,  api : 'code/?groupCode=0002' , option : []},
                        {type: 'selectCode' ,class:'w25 ', title :'거래구분',id: 'trgu', name:'trgu' , value: '' ,  api : 'code/?groupCode=0003' , option : []},
                        {type: 'selectCode' ,class:'w25 ', title :'지출구분',id: 'cultGb', name:'cultGb' , value: '' ,  api : 'code/?groupCode=0005' , option : []},
                        {type: 'linull',class:'w25 text_left', title :'', id: '123', name:'매장정보' , value: this.shopNm,   api : '' },
                        {type: 'radio' ,class:'w25', title :'', id: 'searchDateType', name: 'radioBox' , value: 'approval' , option : [{ name : '거래일' , value: 'approval' },{ name : '취소일' , value: 'cancel' }] },
                        {type: 'date2',class:'w25 text_left', title :'', id: 'date', name:'date', searchStartDate: [nowKo, nowKo] , calenderCount : 2 , dateType : 'date' , width : 220  , default :'YYYY-MM-DD' , setDates:[nowKo, nowKo]},
                        {type: 'select' ,class:'w25', title :'검색',id: 'searchType', name:'searchType' , value: '' ,  api : '' , option : [{ name : '승인번호' , value: 'perm' },{name : '신분확인번호' , value: 'comfirm' },{name : '고객명' , value: 'cusName' },{name : 'ID명' , value: 'loginid' }]},
                        {type: 'input',class:'w25 text_left', title :'', id: 'searchWord', name:'inputType' , value: '',   api : '' , option : '' },
                    ],
                    paging: { currentPage : 1 , lastPage : 0 ,viewPageSize : 10 ,totalRecords : 0 , from : 0 , to : 0 , perPage : 20},
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
            this.$router.push({ name:'receiptViewCancelDetl', params: { current : row.searchOption , objectKey : row.row , onlineYn: this.listItem.search[0].value} }) // 라우터 주소를 넣어줘야 히스토리모드 인식
        }

        updated(){
        }

        downExel(){

            let reqData ={}

            reqData['currentPage'] =  this.listItem.paging.currentPage ;//검색페이지
            reqData['perPage'] = this.listItem.paging.perPage ; //페이지당 row 수

            reqData['subSaup'] =this.listItem.search[0].value; //회사코드
            reqData['saupId'] =this.listItem.search[1].value;//사업자등록번호

            reqData['geogu'] =this.listItem.search[3].value; //발급 용도
            reqData['trgu'] =this.listItem.search[4].value; //거래구분(승인 : 0 , 취소 : 1)
            reqData['onlineYn']= this.listItem.search[5].value;//온라인여부(온라인 : Y, 오프라인 : N)
            reqData['searchDateType']= this.listItem.search[6].value;//검색일 종류
            reqData['searchEndDate']=this.formatDates(this.listItem.search[7].searchStartDate[1]);//검색 종료일
            reqData['searchStartDate']= this.formatDates(this.listItem.search[7].searchStartDate[0]);//검색 시작일
            reqData['searchType'] =this.listItem.search[8].value;//검색타입(승인번호 : PERM, 신분확인 : COMFIRM, 고객명:CUSNAME, 아이디:LOGINID)
            reqData['searchWord'] =this.listItem.search[9].value;//검색어

            let fileOrigin = "cash_history_"+this.nowKo_str+".xlsx"

            axios({
                url: environment.apiUrl + "/receipt/excel",
                method: 'GET',
                responseType : 'blob', // important
                params : reqData,
                headers : { "x-auth-token" : sessionStorage.accessToken }
            }).then((response) => {
                // It is necessary to create a new blob object with mime-type explicitly set
                // otherwise only Chrome works like it should
                var newBlob = new Blob([response.data], {type: 'application/vnd.ms-excel'})

                // IE doesn't allow using a blob object directly as link href
                // instead it is necessary to use msSaveOrOpenBlob
                if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                    window.navigator.msSaveOrOpenBlob(newBlob, fileOrigin)
                    return
                }

                // For other browsers:
                // Create a link pointing to the ObjectURL containing the blob.
                const data = window.URL.createObjectURL(newBlob)
                var link = document.createElement('a')

                link.href = data
                link.download = fileOrigin

                link.click()
                setTimeout(function () {
                    // For Firefox it is necessary to delay revoking the ObjectURL
                    window.URL.revokeObjectURL(data)
                }, 100)

            })

        }

        formatDates(date) {
            return moment(date, 'YYYYMMDDHHmmss').format('YYYYMMDD')
        }
    }

</script>

