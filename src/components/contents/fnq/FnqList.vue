<template>

    <!-- container -->
    <section id="container">
        <!-- content  -->
        <div class="content">
            <h2 class="blind">자주 묻는 질문</h2>

            <h3>자주 묻는 질문</h3>
            <!-- btn top -->
            <div class="btn_top" v-show="regShow">
                <button type="button" class="btn_m01 bg02" v-on:click="regFnq">자주묻는 질문 등록</button>
            </div>


            <template v-if="role == '0001' || role == '0003' ||  role == '0002'">
                <!--리스트-->
                <ListComponent v-bind:listObject="listItem" v-bind:onLoadList="listItem.dataGrid.onLoadList" v-on:listView="listViewEvent"></ListComponent>
            </template>

            <template v-else>
                <!--btn mid -->
                <p class="btn_top type02">
                    <button type="button"  class="btn_s01 bg02 manual" v-on:click="manual"><i class="icon download"></i>매뉴얼 다운로드</button>
                </p>
                <!-- search bbs box -->
                <div class="search_bbs_box type01">
                    <ul class="search_list">
                        <li>
                            <input type="text" class="input sch_notice" placeholder="제목+내용" title="검색어 입력" v-model="searchWord" v-on:keyup.enter="searchFaq">
                        </li>
                        <li>
                            <span class="btn_area">
                                <button type="button"  class="btn_sch01" v-on:click="searchFaq">검색</button>
                            </span>
                        </li>
                        <li>
                            <span class="btn_area">
                                <button type="button" class="btn_sch02" v-on:click="searchReset">리셋</button>
                            </span>
                        </li>
                    </ul>
                </div>
                <!-- //search bbs box -->

                <!--<div class="tab_box">-->
                    <!--<ul class="tab01 col04">-->
                        <!--<li v-on:click="getTemp('Approval')" v-bind:class="{'on': (showApproval == true) } "><a>승인 현황</a></li>-->
                        <!--&lt;!&ndash;<li v-on:click="getTemp('BatchFile')" v-bind:class="{'on': (showBatchFile == true || showBatchFileList == true)}" ><a>배치 파일 처리 현황</a></li>&ndash;&gt;-->
                        <!--<li v-on:click="getTemp('Resource')" v-bind:class="{'on': (showResource == true)}" ><a>시스템 자원</a></li>-->
                        <!--<li v-on:click="getTemp('Service')" v-bind:class="{'on': (showService == true)}" ><a>서비스 상태</a></li>-->
                    <!--</ul>-->
                <!--</div>-->

                <div class="faq_box">
                    <dl class="faq_list">
                        <template v-if="listData.length > 0">
                            <template v-for="(datas, index) in listData">
                                <dt v-on:click=" display(index)" v-bind:class="{ 'on': (rownum == index) } " ><i class="icon faq_q">Q</i> {{datas.title}}</dt>
                                <dd v-show="rownum == index" >
                                    <div><i class="icon faq_a">A </i></div>
                                    <div style="vertical-align: middle;   margin: -25px 0 0 70px;"><span v-html="datas.content"></span></div>
                                </dd>
                            </template>
                        </template>
                        <template v-else>
                            <dd style="text-align: center">데이터가 없습니다.</dd>
                        </template>
                    </dl>
                </div>
                <!--//faq box-->
                <!-- pagination -->
                <Paging v-bind:pagingDetail=pagingUser v-on:pageToList="pagingEvents" ></Paging>
                <!-- //pagination -->
            </template>

        </div>
        <!-- //content -->
    </section>
    <!-- //container -->


</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    import ListComponent from '../../common/list/list.vue';  // 공용리스트 콤포넌트

    import {CommonBoardService} from '../../../api/common.service';
    import Paging from '@/components/common/list/paging/paging.vue';
    import moment from 'moment'

    @Component({
        components: {
            FnqList, Paging, ListComponent
        }
    })
    export default class FnqList extends Vue {

        listData: any = [];
        searchType: string = '';
        searchKey: string = '';
        totalCount: any = '';
        startPage: any = '';

        role: any = sessionStorage.getItem('role');
        regShow : boolean=false;

        originItem : any = {} // 오리지널데이터
        listItem: any = {} // 그리드 서치 페이징 옵션 처리 데이터 매우중요 이룰을 어기면 화면깨짐이 발생합니다

        isActive:boolean=false;
        arrow:string="";
        rownum:number=999;
        pagingUser : any =   { currentPage : 1 , lastPage : 3 ,viewPageSize : 10 ,totalRecords : 3 , from : 1 , to : 3 , perPage : 10};

        created(){
            let  nowUTC =  moment().utc() ; //UTC시간
            let  nowKo= nowUTC// 한국시간
            let  beforeOneYKo=  moment(nowKo).subtract(1, 'years') // 일년전

            this.listItem={
                dataGrid: {
                    columControl:[  // 반드시 받는 컬럼명과 이 ID 가 같아야데이터가 나옵니다..
                        {columName : '순번', type:'number', id : 'rnum', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' ,rowColors :'' },
                        {columName : '제목', type:'text', id : 'title', width : '60%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' ,rowColors :'', imageUse : true },
                        {columName : '등록일', type:'date', id : 'regDt', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' , dateFormat:'YYYY.MM.DD'},
                        {columName : '등록자', type:'text', id : 'regNm', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' },
                        {columName : '구분', type:'text', id : 'viewType', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : ''  ,options : [{ value : 'ALL' , change : '공통'},{ value : 'ADM' , change : '관리자'},{ value : 'USR' , change : '사용자'}] }, // 라인컬러와 라인벨류는 오직하나만
                    ],
                    totalColum: 5,
                    apiUrl : 'faq',
                    onLoadList : true,  // onLoad 로딩 유무
                },
                // 아이디는 실제 컬럼값을 넣어주면됩니다.
                search: [
                    {type: 'date2', title :'등록일', id: 'date' , name:'date',searchStartDate: [beforeOneYKo ,nowKo] , calenderCount : 2 , dateType : 'date' , width : 220  , default :'YYYY-MM-DD'},
                    {type: 'select' , title :'구분',id: 'viewType', name:'viewType' , value: '' ,  api : '' , option : [{ name : '공통' , value: 'ALL' },{ name : '사용자' , value: 'USR' },{name : '관리자' , value: 'ADM' }]},
                    {type: 'input2' , title :'검색어',id: 'searchWord', name:'searchWord' , value: '' ,placeholder:'제목+내용',  },
                    {type: 'hidden' , title :'검색어',id: 'categoryId', name:'categoryId' , value: '' ,placeholder:'',  },
                ],
                searchClass: 'search_box page_customer04',
                searchClass2: 'search_list col0301',
                paging: { currentPage : 1 , lastPage : 3 ,viewPageSize : 10 ,totalRecords : 3 , from : 1 , to : 3 , perPage : 10},
                goDirect : "",
                tapSearch : true,
            }


            this.originItem  = this.listItem.dataGrid.columControl
        }

        mounted(){
            if(this.role == '0004'|| this.role == '0005' ){
                this.searchFaq( );//리스트 바인딩
            }

            // 메뉴별 권한 확인
            let menuList = JSON.parse(sessionStorage.authMenu);
            let programId = 'fnqList'; //메뉴ID
            for (let i = 0; i < menuList.length; i++) {
                for (let j = 0; j < menuList[i].subMenuDtos.length; j++) {

                    //권한(조회-readYn/ 등록-createYn/ 수정-updateYn/ 삭제-deleteYn)
                    if (menuList[i].subMenuDtos[j].progId == programId && menuList[i].subMenuDtos[j].createYn == 'Y') {
                        this.regShow = true;
                    }
                }
            }
        }

        //조회
        searchFaq() {

            let searchData: any = {};

            searchData['viewType'] = 'ADM';
            //검색
            searchData['searchWord'] = this.searchKey;

            // 페이징요청건
            searchData['currentPage'] = this.pagingUser.currentPage;
            searchData['perPage'] = this.pagingUser.perPage;

            // api 데이터 호출
            CommonBoardService.getListDatas('faq', null, searchData).then((response) => {
                    let result: any = response.data;

                    if (result.data.length > 0) {
                        this.listData=result.data;
                     }else{
                        this.listData=[];
                    }

                    this.totalCount = result.totalRecords;
                    this.startPage= (result.currentPage -1) * result.perPage;
                    this.pageSet(result.from, result.to, result.lastPage, result.perPage, result.totalRecords, result.viewPageSize);
                }
                , (error) => {
                    //this.$Progress.finish();
                }
            ).catch();
        }
        pageSet(froms, to, lastPage, perPage, totalRecords, viewPageSize) {
            this.pagingUser.from = froms;
            this.pagingUser.to = to;
            this.pagingUser.lastPage = lastPage;
            this.pagingUser.perPage = perPage;
            this.pagingUser.totalRecords = totalRecords;
            this.pagingUser.viewPageSize = viewPageSize;
            // this.$emit('dataToPaging', this.pagingUser);
            this.dataEvent(this.pagingUser);
        }
        pagingEvents(page) {
            this.searchFaq();
        }
        dataEvent(es){
            //데이터 로딩된후 이벤트를 받으면  변경된 페이지 정보를 전달해준다.
            if(es.lastPage > 0){
                this.$children['0'].defaultPaging(es)
                this.$children['0'].arrayPaging(es);
            }
        }

        /**
         * 검색어 초기화 및 리스트 전체목록
         */
        searchReset(){
            this.searchKey="";
            this.searchFaq();
        }
        /**
         * 날짜 포맷 변경
         * @param date
         */
        formatDates(date) {

            let formattedDates = '';
            formattedDates = moment(date.substr(0,8)).format( "YYYY.MM.DD");
            return formattedDates
        }

        /**
         * 매뉴얼 다운로드
          */
        manual(){
            this.$router.push({name:'noticeDetl', params:{seq:'195'}})
        }

        /**
         * 등록
         */
        regFnq(){
            this.$router.push({name:'regFnq'})
        }

        /**
         * 아코디언메뉴 제어
         * @param index
         */
        display(index){
            this.isActive =false;
            this.rownum =999;

            this.isActive = !this.isActive;

            if(this.isActive == true){
                this.rownum = index;
            }else{
                this.arrow="";
            }
        }

        // 뷰페이지 클릭이벤트 받아서 여는곳
        listViewEvent(row){
            this.$router.push({ name:'regFnq' , params: { current : row.searchOption , objectKey : row.row } }) // 라우터 주소를 넣어줘야 히스토리모드 인식
        }


    }
</script>
