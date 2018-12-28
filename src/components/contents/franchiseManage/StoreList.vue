<template>

    <!-- container -->
    <section id="container">
        <!-- content  -->
        <div class="content">
            <h2 class="blind">가맹점 관리</h2>

            <h3>매장 관리</h3>

            <!-- btn top -->
            <div class="btn_top">
                <button type="button" id="" class="btn_m01 bg02 reg" v-on:click="newReg">신규 등록</button>
            </div>

            <ListComponent v-bind:listObject="listItem" v-bind:onLoadList="listItem.dataGrid.onLoadList" v-on:listView="listViewEvent" v-on:listCheckEvent="checkBoxEvent"></ListComponent>

        </div>
        <!-- //content -->
    </section>
    <!-- //container -->

</template>

<script lang="ts">
    import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
    import {CommonBoardService, CommonListService} from '../../../api/common.service';
    import {environment} from '../../../utill/environment';
    import ListComponent from '../../common/list/list.vue';  // 공용리스트 콤포넌트
    import {format} from 'date-fns';

    @Component({
        components: {
            StoreList, ListComponent
        },
    })
    export default class StoreList extends Vue {
        message: any = '';

        // 리스트 변수
        listOn : boolean = true;
        titles: string = '가맹점 관리'; // 제목
        subTitle: string = '가맹점 관리'; //서브타이틀
        windowResize : boolean = false; // 리사이즈
        originItem : any = {} // 오리지널데이터
        exceptColum : any = [] // 리사이즈 됬을경우 숨겨져야할 컬럼
        regbtnShow : boolean = false; //신규등록 버튼 보여주는지 여부
        setDate =  format(new Date(),'YYYYMMDD');
        listItem: any =  // 그리드 서치 페이징 옵션 처리 데이터 매우중요 이룰을 어기면 화면깨짐이 발생합니다
            {
                dataGrid: {
                    columControl:[  // 반드시 받는 컬럼명과 이 ID 가 같아야데이터가 나옵니다..
                        {columName : '순번' ,id : 'rnum',type:'number', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' ,rowColors :'' },
                        {columName : '사업장명' ,id : 'shopNm',type:'text', width : '15%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' , colColors : 'color: #008aff' },
                        {columName : '사업자등록번호' ,id : 'saupId',type:'text', width : '16%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : ''},
                        {columName : '매장번호' ,id : 'storId',type:'text', width : '14%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : ''},
                        {columName : '업종' ,id : 'upjong',type:'text', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' ,  lineValue: '취소'  }, // 라인컬러와 라인벨류는 오직하나만
                        {columName : '매장상태' ,id : 'storStsNm',type:'text', width : '12%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : ''},
                        {columName : 'B/L 상태' ,id : 'blStatus',type:'text', width : '12%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : ''},
                        {columName : '등록일' ,id : 'regiDate',type:'text', width : '11%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : ''}
                    ],
                    totalColum: 8,
                    apiUrl : 'store',
                    onLoadList : true,  // onLoad 로딩 유무
                    //mTotal : false , // 합계금액 란 활성화여부  합계가 존재하는 페이지도 있음
                    //mTotalControl : [{totalTitle : '합계 금액' , id: 'totalCount' , value : '' },{totalTitle : '봉사료' , id: 'serviceCharge' , value : '' },{totalTitle : '공급가액' , id: 'supplyValue' , value : '' },
                    //    {totalTitle : '부가세' , id: 'surtax' , value : '' }]
                },
                // 아이디는 실제 컬럼값을 넣어주면됩니다.
                search: [
                    {type: 'selectCode' , title :'가맹점',id: 'gajumId', name:'gajumId' , value: '' ,  api : '' , option : [{ codeName : '승인신청' , code: '0' },{codeName : '해지신청' , code: '1' },{codeName : '정상' , code: '2' },{codeName : '해지' , code: '3' }]},
                    {type: 'selectCode' , title :'지점',id: 'jijumId', name:'jijumId' , value: '' ,  api : '' , option : [{ codeName : '승인신청' , code: '0' },{codeName : '해지신청' , code: '1' },{codeName : '정상' , code: '2' },{codeName : '해지' , code: '3' }]},
                    {type: 'selectCode' , title :'매장상태',id: 'gajumStatus', name:'gajumStatus' , value: '' ,  api : '' , option : [{ codeNm : '승인신청' , code: '0' },{codeNm : '해지신청' , code: '1' },{codeNm : '정상' , code: '2' },{codeNm : '해지' , code: '3' }]},
                    {type: 'selectCode' , title :'BL 상태',id: 'blGb', name:'blGb' , value: '' ,  api : '' , option : [{ codeNm : '휴업' , code: '1' },{codeNm : '수기BL' , code: '11' },{codeNm : '수기BL취소' , code: '17' },{codeNm : '폐업' , code: '2' },{codeNm : '신용카드위장' , code: '3' },{codeNm : '현금위장' , code: '4' },{codeNm : '신용카드/현금위장' , code: '5' },{codeNm : '현금영수증발급불가' , code: '6' },{codeNm : '적용취소' , code: '7' },{codeNm : '삭제된사업자' , code: '8' }]},
                    {type: 'radio' , title :'', id: 'searchDateType', name: 'radioBox' , value: 'lastConnDt' , option : [{ name : '수정일' , value: 'UP' },{ name : '등록일' , value: 'REG' }] },
                    {type: 'date', title :'', id: 'date' , name:'date', searchStartDate: this.setDate,  searchEndDate: this.setDate, calenderCount : 2},
                    {type: 'select' , title :'검색',id: 'searchType', name:'searchType' , value: '' ,  api : '' , option : [{ name : '사업장명' , value: 'shopNm' },{ name : '사업자등록번호' , value: 'saupId' }]},
                    {type: 'input', title :'', id: 'searchWord', name:'searchWord' , value: '',   api : '' , option : '' }
                ],
                paging: { currentPage : 1 , lastPage : 0 ,viewPageSize : 10 ,totalRecords : 0 , from : 0 , to : 0 , perPage : 10},
                goSearch : "iocSearch",
                searchClass : 'search_box page_system03',
                searchClass2 : 'search_list'
            }

        //돔생성전 호출자
        created() {

            //this.getSelectList('RECEIPT'); //현금영수증사업자 selectbox 조회
        }

        //돔렌더링완료시 진행
        mounted() {
        }

        checkBoxEvent(data){
            console.log(data); // 체크한데이터 받는다
        }

        // 뷰페이지 클릭이벤트 받아서 여는곳
        listViewEvent(row){
            this.$router.push({ name:'storeDetl' , params: { current : row.searchOption , objectKey : row.row } }) // 라우터 주소를 넣어줘야 히스토리모드 인식
        }

        //가맹점 상세이동
        goDetl(){
            this.$router.push('/home/storeDetl')
        }

        newReg(){
            this.$router.push('/home/storeReg')
        }

//공통 select box 조회
        getSelectList(code: string){
            if(code == ''){
                return;
            }

            let reqData: any = {};
            let apiUrl : string = '';

            if(code == '0001'){ //사업자구분:0001
                apiUrl = 'pcodes/'+code+'/codes';
            }else if(code == 'SEARCH'){ //회사코드(SEARCH-사용가능한것만 조회) -- get
                reqData['searchType'] = 'SEARCH';
                apiUrl = 'company';
            }else if(code == 'APRO'){ //승인코드 -- get
                apiUrl = 'code/aprvcode';
            }else if(code == 'RECEIPT'){ //현금영수증 사업자 코드 -- get
                apiUrl = 'code/issuer';
            }

            // api 데이터 호출
            CommonBoardService.getListDatas(apiUrl, null, reqData).then((response) => {
                    let result: any = response.data;
                    //console.log(result)
                    if (result.length > 0) {
                        if(code == '0001'){ //사업자구분
                            //this.saupGbnList = result;
                        }else if(code == 'APRO'){ //승인코드
                            //this.aproCodeList = result;
                        }else if(code == 'SEARCH'){ //회사코드
                            //this.companyCodeList = result;
                        }else if(code == 'RECEIPT'){ //현금영수증 사업자 코드
                            //this.receiptSaupList = result;
                        }
                    } else {
                        console.log('코드리스트 조회 오류')
                    }
                }
                , (error) => {
                    console.log(error)
                }
            ).catch();

        }

    }

</script>