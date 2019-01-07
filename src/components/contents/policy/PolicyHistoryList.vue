<template>
    <!-- container -->
    <section id="container">
        <!-- content  -->
        <div class="content">
            <h2 class="blind">시스템 관리</h2>

            <h3>{{titleNm}} 이력 관리</h3>


            <!-- btn top -->
            <div class="btn_top" v-show = regShow>
                <button type="button" id="" class="btn_m01 bg02" v-on:click="toRegPolicy" >{{titleNm}} 등록</button>
            </div>

            <!--리스트-->
            <ListComponent v-bind:listObject="listItem" v-bind:onLoadList="listItem.dataGrid.onLoadList" v-on:listView="listViewEvent" ></ListComponent>

        </div>
        <!-- //content -->
    </section>
    <!-- //container -->


</template>


<script lang="ts">

    import {Component, Vue, Watch} from "vue-property-decorator";
    import {CommonBoardService} from "../../../api/common.service";
    import ListComponent from '../../common/list/list.vue';  // 공용리스트 콤포넌트

    import format from 'date-fns/format'

    @Component({
        components: {
            PolicyHistoryList, ListComponent
        }
    })
    export default class PolicyHistoryList extends Vue {
        titleNm: string ="";
        policyList:any[]=[];
        hisSeq:string = "";
        termsType:string = "";
        totalCount: any = '';
        startPage: any = '';
        columControl: any = [];
        searchStartDate_str: any = '';
        searchEndDate_str: any =  format(new Date(),'YYYYMMDD');
        originItem : any = {} // 오리지널데이터
        listItem: any = {} // 그리드 서치 페이징 옵션 처리 데이터 매우중요 이룰을 어기면 화면깨짐이 발생합니다
        regShow : boolean = false;

        created(){
            this.pageDiv();
        }


        mounted() {
            let routeNm = this.$route.name;
            // 메뉴별 권한 확인
            let menuList = JSON.parse(sessionStorage.authMenu);
            let programId = routeNm; //메뉴ID
            for (let i = 0; i < menuList.length; i++) {
                for (let j = 0; j < menuList[i].subMenuDtos.length; j++) {

                    //권한(조회-readYn/ 등록-createYn/ 수정-updateYn/ 삭제-deleteYn)
                    if (menuList[i].subMenuDtos[j].progId == programId && menuList[i].subMenuDtos[j].createYn == 'Y') {
                        this.regShow = true;
                    }
                }
            }
        }

        // 라우터 경로 변경시 이벤트 발생
        @Watch('$route') onChange(){
            this.pageDiv();
        }

        /**
         * 페이지 분기 - 셀렉트 박스 리스트호출
         */
        pageDiv(){

            let routeNm = this.$route.name;
            if(routeNm == 'policyHistoryList' ) {
                this.titleNm = '이용약관';
                this.termsType="site";

                // 메뉴별 권한 확인
                    let menuList = JSON.parse(sessionStorage.authMenu);
                    let programId = 'policyHistoryList'; //메뉴ID
                    for (let i = 0; i < menuList.length; i++) {
                        for (let j = 0; j < menuList[i].subMenuDtos.length; j++) {

                            //권한(조회-readYn/ 등록-createYn/ 수정-updateYn/ 삭제-deleteYn)
                            if (menuList[i].subMenuDtos[j].progId == programId && menuList[i].subMenuDtos[j].createYn == 'Y') {
                                this.regShow = true;
                            }
                        }
                }

            }else if(routeNm == 'personalHistoryList' ){
                this.titleNm ='개인보호처리방침';
                this.termsType="user";

                // 메뉴별 권한 확인
                let menuList = JSON.parse(sessionStorage.authMenu);
                let programId = 'personalHistoryList'; //메뉴ID
                for (let i = 0; i < menuList.length; i++) {
                    for (let j = 0; j < menuList[i].subMenuDtos.length; j++) {

                        //권한(조회-readYn/ 등록-createYn/ 수정-updateYn/ 삭제-deleteYn)
                        if (menuList[i].subMenuDtos[j].progId == programId && menuList[i].subMenuDtos[j].createYn == 'Y') {
                            this.regShow = true;
                        }
                    }
                }
            }

            this.searchStartDate_str =new Date();
            this.searchStartDate_str.setFullYear(this.searchStartDate_str.getFullYear()-3);
            this.searchStartDate_str = format(this.searchStartDate_str ,'YYYYMMDD');
            this.listItem={
                dataGrid: {
                    columControl:[  // 반드시 받는 컬럼명과 이 ID 가 같아야데이터가 나옵니다..
                        {columName : '순번', type:'number', id : 'rnum', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' ,rowColors :'' },
                        {columName : '등록일', type:'text', id : 'regDt', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : ''},
                        {columName : '제목', type:'text', id : 'hisTitle', width : '70%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' ,rowColors :'' },
                        {columName : '등록자', type:'text', id : 'regRole', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' ,options : [{ value : '0001' , change : '시스템'},{ value : '0002' , change : '사업자'},{ value : '0003' , change : '콜센터'},{ value : '0004' , change : '가맹점'},{ value : '0005' , change : '지점'}]},
                    ],
                    totalColum: 4,
                    apiUrl : 'terms/history',
                    onLoadList : true,  // onLoad 로딩 유무
                },
                // 아이디는 실제 컬럼값을 넣어주면됩니다.
                search: [
                    {type: 'date', title :'등록일', id: 'date' , name:'date', searchStartDate: this.searchStartDate_str ,  searchEndDate: this.searchEndDate_str, calenderCount : 2},
                    {type: 'textNone', title :'termsType', id: 'termsType' , name:'termsType', value: this.termsType} ,
                ],
                searchClass: 'search_box page_system01',
                searchClass2: 'search_list col0201',
                paging: { currentPage : 1 , lastPage : 3 ,viewPageSize : 10 ,totalRecords : 3 , from : 1 , to : 3 , perPage : 10},
                goDirect : "",

            }

            this.originItem  = this.listItem.dataGrid.columControl;
        }

        /**
         * 등록버튼 클릭
         */
        toRegPolicy(){

            if(this.termsType == 'site'){
                this.$router.push({name:'policyTempList'});
            }else{
                this.$router.push({name:'personalTempList'});
            }

        }

        // 뷰페이지 클릭이벤트 받아서 여는곳
        listViewEvent(row){
            if(this.termsType == 'site'){
                this.$router.push({name:'policyList', params: { current : row.searchOption , objectKey : row.row } }) // 라우터 주소를 넣어줘야 히스토리모드 인식
            }else{
                this.$router.push({name:'personalList', params: { current : row.searchOption , objectKey : row.row } }) // 라우터 주소를 넣어줘야 히스토리모드 인식
            }

        }

    }
</script>

<style scoped>

</style>