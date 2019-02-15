<template>

    <!-- container -->
    <section id="container">
        <!-- content  -->
        <div class="content">
            <h2 class="blind">가맹점 관리</h2>

            <h3>매장 관리</h3>

            <!-- btn top -->
            <div class="btn_top" v-if="regbtnShow">
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
    import  moment from 'moment'

    @Component({
        components: {
            StoreList, ListComponent
        },
    })
    export default class StoreList extends Vue {
        message: any = '';

        receiptSaupList: any = {}; //현금영수증 사업자 코드

        // 리스트 변수
        listOn : boolean = true;
        titles: string = '가맹점 관리'; // 제목
        subTitle: string = '가맹점 관리'; //서브타이틀
        windowResize : boolean = false; // 리사이즈
        originItem : any = {} // 오리지널데이터
        exceptColum : any = [] // 리사이즈 됬을경우 숨겨져야할 컬럼
        regbtnShow : boolean = false; //신규등록 버튼 보여주는지 여부

        soluVal : string = ''; //현금영수증사업자
        soluDis : boolean = false; //현금영수증사업자 disabled 여부
        gajumVal : string = ''; //가맹점
        gajumNmVal : string = ''; //가맹점명
        gajumDis : boolean = false; //가맹점 disabled 여부
        jijumVal : string = ''; //지점
        jijumNmVal : string = ''; //지점명
        jijumDis : boolean = false; //지점 disabled 여부
        onLoadListView : boolean = false;

        listItem: any = {} // 그리드 서치 페이징 옵션 처리 데이터 매우중요 이룰을 어기면 화면깨짐이 발생합니다

        //돔생성전 호출자
        created() {

            //this.getSelectList('RECEIPT');
            let  nowUTC =  moment().utc() ; //UTC시간
            let  nowKo= nowUTC// 한국시간
            let  beforeOneDKo=  moment(nowKo).subtract(1, 'days') // 하루전

            //메뉴별 권한 확인
            let menuList = JSON.parse(sessionStorage.authMenu);
            let programId = 'storeList'; //메뉴ID
            for(let i=0; i<menuList.length; i++){
                for(let j=0; j<menuList[i].subMenuDtos.length; j++){

                    //권한(조회-readYn/ 등록-createYn/ 수정-updateYn/ 삭제-deleteYn)
                    if(menuList[i].subMenuDtos[j].progId == programId && menuList[i].subMenuDtos[j].createYn == 'Y') {
                        this.regbtnShow = true;
                    }
                }
            }

            if(sessionStorage.role == '0002') { //현금영수증 사업자
                this.soluVal = sessionStorage.soluId == null ? '' : sessionStorage.soluId;
                this.soluDis = true;
            }else if(sessionStorage.role == '0004'){ //가맹점관리자
                console.log('세션 값 확인')
                console.log('id : '+sessionStorage.soluId)

                this.soluVal = sessionStorage.soluId;
                this.soluDis = true;

                this.gajumVal = sessionStorage.gajumId == null ? '' : sessionStorage.gajumId;
                this.gajumDis = true;
            }else if(sessionStorage.role == '0005') { //지점관리자
                this.soluVal = sessionStorage.soluId == null ? '' : sessionStorage.soluId;
                this.soluDis = true;

                this.gajumVal = sessionStorage.gajumId == null ? '' : sessionStorage.gajumId;
                this.gajumNmVal = sessionStorage.gajumNm == null ? '' : sessionStorage.gajumNm;
                this.gajumDis = true;
                this.jijumVal = sessionStorage.jijumId == null ? '' : sessionStorage.jijumId;
                this.jijumNmVal = sessionStorage.jijumNm == null ? '' : sessionStorage.jijumNm;
                this.jijumDis = true;
            }

            if(this.$store.state.searchList.menuId==this.$route.name){
                this.onLoadListView = true;
            }

            this.listItem =  // 그리드 서치 페이징 옵션 처리 데이터 매우중요 이룰을 어기면 화면깨짐이 발생합니다
                {
                    dataGrid: {
                        columControl:[  // 반드시 받는 컬럼명과 이 ID 가 같아야데이터가 나옵니다..
                            {columName : '순번' ,id : 'rnum',type:'number', width : '8%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' ,rowColors :'' },
                            {columName : '사업장명' ,id : 'shopNm',type:'text', width : '15%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' , colColors : 'color: #008aff' },
                            {columName : '사업자등록번호' ,id : 'saupId',type:'text', width : '16%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : ''},
                            {columName : '매장번호' ,id : 'storId',type:'text', width : '8%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : ''},
                            {columName : '업종' ,id : 'upjong',type:'text', width : '8%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' ,  lineValue: '취소'  }, // 라인컬러와 라인벨류는 오직하나만
                            {columName : '매장상태' ,id : 'storStsNm',type:'text', width : '8%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : ''},
                            {columName : 'B/L 상태' ,id : 'blStatus',type:'text', width : '8%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : ''},
                            {columName : '등록일' ,id : 'regiDate',type:'date', width : '11%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' , dateFormat: 'YYYY.MM.DD'}
                        ],
                        totalColum: 8,
                        apiUrl : 'store',
                        onLoadList : this.onLoadListView,  // onLoad 로딩 유무
                        //mTotal : false , // 합계금액 란 활성화여부  합계가 존재하는 페이지도 있음
                        //mTotalControl : [{totalTitle : '합계 금액' , id: 'totalCount' , value : '' },{totalTitle : '봉사료' , id: 'serviceCharge' , value : '' },{totalTitle : '공급가액' , id: 'supplyValue' , value : '' },
                        //    {totalTitle : '부가세' , id: 'surtax' , value : '' }]
                    },
                    // 아이디는 실제 컬럼값을 넣어주면됩니다.
                    search: [
                        {type: 'selectCode' ,class:'w33',liNull:false, title :'현금영수증사업자',id: 'soluId', name:'soluId' , value: this.soluVal , disable : this.soluDis , api : 'code/issuer' , option : [{codeNm : '(주)롯데정보통신', code: '0001'},{codeNm : '주식회사 케이티', code: '0002'},{codeNm : '앤드컴', code: '0003'}]},

                        // {type: 'inputPop2' ,class:'w33',liNull:false, title :'가맹점',id: 'gajumNm', name:'gajumNm' , value: this.gajumNmVal , disable : this.gajumDis,  api : '' , option : ''},
                        // {type: 'hidden' ,class:'w33 ',liNull:false, title :'가맹점ID',id: 'gajumId', name:'gajumId' , value: this.gajumVal ,  api : '' , option : ''},
                        {type: 'inputPop2' ,class:'w33',liNull:false, title :'가맹점',id: 'gajumId', name:'gajumId' , value: this.gajumVal , disable : this.gajumDis,  api : '' , option : ''},
                        // {type: 'hidden' ,class:'w33 ',liNull:false, title :'가맹점ID',id: 'gajumNm', name:'gajumNm' , value: this.gajumNmVal ,  api : '' , option : ''},


                        //{type: 'inputPop2' ,class:'w33 text_center',liNull:false, title :'지점',id: 'jijumNm', name:'jijumNm' , value: this.jijumNmVal , disable : this.jijumDis ,  api : '' , option : ''},
                        //{type: 'hidden' ,class:'w33 ',liNull:false, title :'지점ID',id: 'jijumId', name:'jijumId' , value: this.jijumVal ,  api : '' , option : ''},
                        {type: 'inputPop2' ,class:'w33 text_center',liNull:false, title :'지점',id: 'jijumId', name:'jijumId' , value: this.jijumVal , disable : this.jijumDis ,  api : '' , option : ''},
                        // {type: 'hidden' ,class:'w33 ',liNull:false, title :'지점ID',id: 'jijumNm', name:'jijumNm' , value: this.jijumNmVal ,  api : '' , option : ''},

                        {type: 'selectCode' ,class:'w33',liNull:false, title :'매장상태',id: 'storeStatus', name:'storeStatus' , value: '' ,  api : 'code/storestatus' , option : [{ codeNm : '' , code: '' }]},
                        {type: 'selectCode' ,class:'w33 ',liNull:true, title :'BL 상태',id: 'blGb', name:'blGb' , value: '' ,  api : 'code/bl' , option : [{ codeNm : '' , code: '' }]},
                        {type: 'radio' ,class:'w25',liNull:false, title :'', id: 'searchDateType', name: 'radioBox' , value: 'REG' , option : [{ name : '수정일' , value: 'UP' },{ name : '등록일' , value: 'REG' }] },
                        {type: 'date2',class:'w25',liNull:false, title :'', id: 'date', name:'date', searchStartDate: [] , calenderCount : 2 , dateType : 'date' , width : 220  , default :'YYYY-MM-DD', setDates: [beforeOneDKo,nowKo]},
                        {type: 'select' ,class:'w25',liNull:false, title :'검색',id: 'searchType', name:'searchType' , value: '' ,  api : '' , option : [{ name : '사업장명' , value: 'shopNm' },{ name : '사업자등록번호' , value: 'saupId' },{ name : '아이디' , value: 'id' }]},
                        {type: 'input',class:'w25 text_left',liNull:false, title :'', id: 'searchWord', name:'searchWord' , value: '',   api : '' , option : '' }
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

        //돔렌더링완료시 진행
        mounted() {
            let comCode = document.getElementById('soluId');
            //comCode.childNodes() = this.receiptSaupList;
        }

        checkBoxEvent(data){
        }

        // 뷰페이지 클릭이벤트 받아서 여는곳
        listViewEvent(row){

            if(sessionStorage.role == '0003'){
                row['entranceUrl'] = 'storeList';
                row['nextUrl'] = 'storeDetl';
                //OTP인증 화면으로 이동
                this.$router.push({ name:'franchiseOtp' , params: { reqParams : row } }) // 라우터 주소를 넣어줘야 히스토리모드 인식
            }else{
                this.$router.push({ name:'storeDetl' , params: { current : row.searchOption , objectKey : row.row } }) // 라우터 주소를 넣어줘야 히스토리모드 인식
            }
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

            if(code == 'SEARCH'){ //회사코드(SEARCH-사용가능한것만 조회) -- get
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
                    if (result.length > 0) {
                        if(code == 'APRO'){ //승인코드
                            //this.aproCodeList = result;
                        }else if(code == 'SEARCH'){ //회사코드
                            //this.companyCodeList = result;
                        }else if(code == 'RECEIPT'){ //현금영수증 사업자 코드
                            let comCode = document.getElementById('soluId');

                            if(comCode!=null){
                                //comCode.setAttribute('option', '')
                            }
                            let op = new Option();
                            //this.receiptSaupList = result;
                            let saupList = result;
                            let rowData : any = {};
                            let arrData : any = [];
                            saupList.filter(e=>{
                                rowData = {};
                                rowData['value'] = e.code;
                                rowData['text'] = e.codeNm;
                                arrData.push(rowData);
                            })
                            this.receiptSaupList = arrData;
                        }
                    } else {
                    }
                }
                , (error) => {
                }
            ).catch();

        }

    }

</script>