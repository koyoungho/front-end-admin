<template>
    <!-- container -->
    <section id="container">
        <!-- content  -->
        <div class="content">
            <h2 class="blind">가맹점 관리</h2>

            <h3>지점 관리</h3>

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
    import ListComponent from '../../common/list/list.vue';  // 공용리스트 콤포넌트
    import {format} from 'date-fns';
    import  moment from 'moment'

    @Component({
        components: {
            BranchList, ListComponent
        },
    })
    export default class BranchList extends Vue {
        // 리스트 변수
        listOn : boolean = true;
        titles: string = '가맹점 관리'; // 제목
        subTitle: string = '지점 관리'; //서브타이틀
        windowResize : boolean = false; // 리사이즈
        originItem : any = {} // 오리지널데이터
        exceptColum : any = [] // 리사이즈 됬을경우 숨겨져야할 컬럼
        regbtnShow : boolean = false; //신규등록 버튼 보여주는지 여부

        soluVal : string = ''; //현금영수증사업자
        soluDis : boolean = false; //disabled 여부
        gajumVal : string = ''; //가맹점
        gajumDis : boolean = false; //disabled 여부
        onLoadListView :boolean = false;

        listItem: any = []

        created(){
            let  nowUTC =  moment().utc() ; //UTC시간
            let  nowKo= nowUTC.add(9, 'hours')// 한국시간
            let  beforeOneDKo=  moment(nowKo).subtract(1, 'days') // 하루전

            //메뉴별 권한 확인
            let menuList = JSON.parse(sessionStorage.authMenu);
            let programId = 'branchList'; //메뉴ID
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
            }else if(sessionStorage.role == '0004' || sessionStorage.role == '0005'){ //가맹점관리자, 지점관리자 기본 셋팅
                this.soluVal = sessionStorage.soluId == null ? '' : sessionStorage.soluId;
                this.soluDis = true;

                this.gajumVal = sessionStorage.gajumId == null ? '' : sessionStorage.gajumId;
                this.gajumDis = true;
            }

            // 바로 로딩확인
            if(this.$store.state.searchList.menuId==this.$route.name){
                this.onLoadListView = true;
            }

            this.listItem =  // 그리드 서치 페이징 옵션 처리 데이터 매우중요 이룰을 어기면 화면깨짐이 발생합니다
                {
                    dataGrid: {
                        columControl:[  // 반드시 받는 컬럼명과 이 ID 가 같아야데이터가 나옵니다..
                            {columName : '순번' ,id : 'rnum',type:'number', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' ,rowColors :'' },
                            {columName : '사업장명' ,id : 'shopNm',type:'text', width : '16%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' , colColors : 'color: #008aff' },
                            {columName : '사업자등록번호' ,id : 'saupId',type:'text', width : '15%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : ''},
                            {columName : '가맹점번호' ,id : 'gajumId',type:'text', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : ''},
                            {columName : '지점번호' ,id : 'jijumId',type:'text', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : ''},
                            {columName : '지점상태' ,id : 'jijumStatus',type:'text', width : '12%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' ,  lineValue: '취소'  }, // 라인컬러와 라인벨류는 오직하나만
                            {columName : 'B/L 상태' ,id : 'blStatus',type:'text', width : '12%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : ''},
                            {columName : '등록일' ,id : 'regDt',type:'date', width : '15%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' , dateFormat: 'YYYY.MM.DD'},
                        ],
                        totalColum: 8,
                        apiUrl : 'jijum',
                        onLoadList : this.onLoadListView,  // onLoad 로딩 유무
                        //mTotal : false , // 합계금액 란 활성화여부  합계가 존재하는 페이지도 있음
                        //mTotalControl : [{totalTitle : '합계 금액' , id: 'totalCount' , value : '' },{totalTitle : '봉사료' , id: 'serviceCharge' , value : '' },{totalTitle : '공급가액' , id: 'supplyValue' , value : '' },
                        //    {totalTitle : '부가세' , id: 'surtax' , value : '' }]
                    },
                    // 아이디는 실제 컬럼값을 넣어주면됩니다.
                    search: [
                        {type: 'selectCode' ,class:'w33', title :'현금영수증사업자',id: 'soluId', name:'soluId' , value: this.soluVal , disable : this.soluDis ,  api : 'code/issuer',  option : [{codeNm : '(주)롯데정보통신', code: '0001'}]},
                        //{type: 'selectObject' , title :'가맹점',id: 'gajumId', name:'gajumId' , value: '0093032' ,  api : 'saupjang/gajum/summary' , option : [{ codeNm: '', code:''}]},
                        {type: 'inputPop' ,class:'w33', title :'가맹점',id: 'gajumId', name:'gajumId' , value: this.gajumVal , disable : this.gajumDis, api : '',  option : ''},
                        {type: 'selectCode' ,class:'w33 text_center', title :'지점상태',id: 'jijumStatus', name:'jijumStatus' , value: '' ,  api : 'code/storestatus' , option : [{ codeNm : '' , code: '0' }]},
                        //{type: 'selectCode' , title :'BL 상태',id: 'blGb', name:'blGb' , value: '' ,  api : '' , option : [{ codeName : '휴업' , code: '1' },{codeName : '수기BL' , code: '11' },{codeName : '수기BL취소' , code: '17' },{codeName : '폐업' , code: '2' },{codeName : '신용카드위장' , code: '3' },{codeName : '현금위장' , code: '4' },{codeName : '신용카드/현금위장' , code: '5' },{codeName : '현금영수증발급불가' , code: '6' },{codeName : '적용취소' , code: '7' },{codeName : '삭제된사업자' , code: '8' }]},
                        //{type: 'selectCode' , title :'BL 상태',id: 'blGb', name:'blGb' , value: '' ,  api : 'code/bl' , option : [{ codeNm : '' , code: '' }]},
                        {type: 'radio' ,class:'w20', title :'', id: 'searchDateType', name: 'radioBox' , value: 'REG' , option : [{ name : '수정일' , value: 'UP' },{ name : '등록일' , value: 'REG' }] },
                        {type: 'date2',class:'w30 text_left', title :'', id: 'date', name:'date', searchStartDate: [] , calenderCount : 2 , dateType : 'date' , width : 220  , default :'YYYY-MM-DD', setDates: [beforeOneDKo,nowKo]},
                        {type: 'select' ,class:'w20', title :'검색',id: 'searchType', name:'searchType' , value: '' ,  api : '' , option : [{ name : '사업장명' , value: '0' },{name : '사업자등록번호' , value: '1' },{name : '대표자명' , value: '2' }]},
                        {type: 'input',class:'w30 text_left', title :'', id: 'searchWord', name:'searchWord' , value: '',   api : '' , option : '' },
                        //{type: 'hidden', title :'', id: 'gajumId', name:'gajumId' , value: '0093032',   api : '' , option : '' }
                        // {type: 'check' , title :'체크해', id: 'checkType', name: 'checkType' ,  value: '' , option : [{ name : '선택' , id: 'cho1', value: true },{ name : '선택2' ,id: 'cho2', value: false}] },
                        // {type: 'radio' , title :'선택해', id: 'radioBox', name: 'radioBox' , value: '' , option : [{ name : '선택' , value: '111' },{ name : '선택2' , value: '222' }] },
                    ],
                    paging: { currentPage : 1 , lastPage : 0 ,viewPageSize : 10 ,totalRecords : 0 , from : 0 , to : 0 , perPage : 10},
                    goSearch : "iocSearch",
                    searchClass : 'search_box page_new',
                    searchClass2 : 'search_list'
                }
            // 검색조건 갱신
            if(this.$store.state.searchList.menuId==this.$route.name){
                this.listItem.search  = this.$store.state.searchList.listDt
            }
            this.originItem  = this.listItem.dataGrid.columControl

        }


        mounted(){

        }

        checkBoxEvent(data){
        }

        // 뷰페이지 클릭이벤트 받아서 여는곳
        listViewEvent(row){

            //console.log(row)
            if(sessionStorage.role == '0003'){ //콜센터는 휴대폰 인증
                row['entranceUrl'] = 'branchList';
                row['nextUrl'] = 'branchDetl';
                //OTP인증 화면으로 이동
                this.$router.push({ name:'franchiseOtp' , params: { reqParams : row } }) // 라우터 주소를 넣어줘야 히스토리모드 인식
            }else{
                this.$router.push({ name:'branchDetl' , params: { current : row.searchOption , objectKey : row.row } }) // 라우터 주소를 넣어줘야 히스토리모드 인식
            }
        }

        // }
        updated(){
        }

        //가맹점 상세이동
        goDetl(){
            this.$router.push('/home/franchiseDetl')
        }
        //신규등록
        newReg(){
            this.$router.push('/home/branchReg')
        }
    }

</script>
