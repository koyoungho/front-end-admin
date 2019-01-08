<template>

    <!-- container -->
    <section id="container">
        <!-- content  -->
        <div class="content">
            <h2 class="blind">공지사항</h2>

            <h3>공지사항</h3>

            <!-- btn top -->
            <!--권한에 따라 숨기기 설정-->
            <div class="btn_top" v-show="regShow">
                <button type="button" id="" class="btn_m01 bg02" v-on:click="goRegNotice">공지사항 등록</button>
            </div>
            <!--리스트-->
            <ListComponent v-bind:listObject="listItem" v-bind:onLoadList="listItem.dataGrid.onLoadList" v-on:listView="listViewEvent"></ListComponent>


        </div>


        <!-- //content -->
    </section>
    <!-- //container -->


</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import ListComponent from '../../common/list/list.vue';  // 공용리스트 콤포넌트
    import {format} from 'date-fns';

    @Component({
        components: {
            NoticeList, ListComponent
        }
    })
    export default class NoticeList extends Vue {
        listOn : boolean = true;
        searchType: string = '';
        startPage: any = '';
        originItem : any = {} // 오리지널데이터
        searchStartDate_str: any = '';
        searchEndDate_str: any =  format(new Date(),'YYYYMMDD');
        listItem: any ={}  // 그리드 서치 페이징 옵션 처리 데이터 매우중요 이룰을 어기면 화면깨짐이 발생합니다
        role: any = sessionStorage.getItem('role');
        regShow : boolean = false; //신규등록 버튼 보여주는지 여부


        // 뷰페이지 클릭이벤트 받아서 여는곳
        listViewEvent(row){
            console.log(row);
            this.$router.push({ name:'noticeDetl' , params: { current : row.searchOption , objectKey : row.row } }) // 라우터 주소를 넣어줘야 히스토리모드 인식
        }

        created(){
            this.searchStartDate_str =new Date();
            this.searchStartDate_str.setFullYear(this.searchStartDate_str.getFullYear()-3);
            this.searchStartDate_str = format(this.searchStartDate_str ,'YYYYMMDD');


            this.listItem= {
                dataGrid: {
                    columControl:[  // 반드시 받는 컬럼명과 이 ID 가 같아야데이터가 나옵니다..
                        {columName : '제목' ,type:'text', id : 'title', width : '60%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' ,rowColors :''  , imageUse : true},
                        {columName : '첨부파일'  ,type:'text', id : 'fileYn', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : ''  },
                        {columName : '등록일' ,type:'date', id : 'regDt', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' , dateFormat:'YYYY.MM.DD'},
                        {columName : '등록자'  ,type:'text', id : 'regRoleNm', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : ''},
                        {columName : '구분'  ,type:'text', id : 'viewType', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : ''  ,options : [{ value : 'ALL' , change : '공통'},{ value : 'ADM' , change : '관리자'},{ value : 'USR' , change : '사용자'}]}, // 라인컬러와 라인벨류는 오직하나만
                        {columName : '공지'  ,type:'textNone', id : 'importantYn', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : ''   },
                        {columName : 'new'  ,type:'textNone', id : 'newYn', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : ''   },
                    ],
                    totalColum: 5,
                    apiUrl : 'notice',
                    onLoadList : true,  // onLoad 로딩 유무
                },
                // 아이디는 실제 컬럼값을 넣어주면됩니다.
                search: [
                    {type: 'date', title :'등록일', id: 'date' , name:'date', searchStartDate: this.searchStartDate_str ,  searchEndDate: this.searchEndDate_str, calenderCount : 2},
                    {type: 'select' , title :'구분',id: 'viewType', name:'viewType' , value: '' ,  api : '' , option : [{ name : '공통' , value: 'ALL' },{name : '관리자' , value: 'ADM' },{name : '사용자' , value: 'USR' }]},
                    {type: 'input2' , title :'검색어',id: 'searchWord', name:'searchWord' , value: '' },
                ],

                paging: { currentPage : 1 , lastPage : 3 ,viewPageSize : 10 ,totalRecords : 3 , from : 1 , to : 3 , perPage : 10},
                goSearch : "iocSearch",
                searchClass : 'search_box page_customer02',
                searchClass2 : 'search_list col0301'
            }

            this.originItem  = this.listItem.dataGrid.columControl
        }

        mounted() {

        // 메뉴별 권한 확인
            let menuList = JSON.parse(sessionStorage.authMenu);
            let programId = 'compCodeChart'; //메뉴ID
            for (let i = 0; i < menuList.length; i++) {
                for (let j = 0; j < menuList[i].subMenuDtos.length; j++) {

                    //권한(조회-readYn/ 등록-createYn/ 수정-updateYn/ 삭제-deleteYn)
                    if (menuList[i].subMenuDtos[j].progId == programId && menuList[i].subMenuDtos[j].createYn == 'Y') {
                        this.regShow = true;
                    }
                }
            }

        }


        dataEvent(es){
            //데이터 로딩된후 이벤트를 받으면  변경된 페이지 정보를 전달해준다.
            if(es.lastPage > 0){
                this.$children['0'].defaultPaging(es)
                this.$children['0'].arrayPaging(es);
            }
        }

        /**
         * 날짜 포맷 변경
         * @param date
         */
        // formatDates(date) {
        //
        //     let formattedDates = '';
        //     formattedDates = moment(date.substr(0,8)).format( "YYYY.MM.DD");
        //     return formattedDates
        // }

        /**
         * 등록 이동
         */
        goRegNotice(){
            this.$router.push({path:'regNotice' });
        }



    }
</script>

<style scoped>

</style>