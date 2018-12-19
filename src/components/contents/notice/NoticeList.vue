<template>

    <!-- container -->
    <section id="container">
        <!-- content  -->
        <div class="content">
            <h2 class="blind">공지사항</h2>

            <h3>공지사항</h3>

            <!-- btn top -->
            <!--권한에 따라 숨기기 설정-->
            <div class="btn_top">
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
        listItem: any =  // 그리드 서치 페이징 옵션 처리 데이터 매우중요 이룰을 어기면 화면깨짐이 발생합니다
            {
                dataGrid: {
                    columControl:[  // 반드시 받는 컬럼명과 이 ID 가 같아야데이터가 나옵니다..
                        {columName : '제목' ,type:'text', id : 'title', width : '60%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' ,rowColors :'' },
                        {columName : '첨부파일'  ,type:'text', id : 'attFileYn', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' },
                        {columName : '등록일' ,type:'text', id : 'updDt', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : ''},
                        {columName : '등록자'  ,type:'text', id : 'regRoll', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : ''},
                        {columName : '구분'  ,type:'text', id : 'trguNm', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : ''   }, // 라인컬러와 라인벨류는 오직하나만
                    ],
                    totalColum: 5,
                    apiUrl : 'notices',
                    onLoadList : true,  // onLoad 로딩 유무
                },
                // 아이디는 실제 컬럼값을 넣어주면됩니다.
                search: [
                    {type: 'date', title :'등록일', id: 'date' , name:'date', searchStartDate: null ,  searchEndDate: null, calenderCount : 2},
                    {type: 'select' , title :'구분',id: 'importantYn', name:'importantYn' , value: '' ,  api : '' , option : [{ name : '공통' , value: '0' },{name : '관리자' , value: '1' },{name : '사용자' , value: '2' }]},
                    {type: 'input2' , title :'검색어',id: 'searchWord', name:'searchWord' , value: '' },
                ],

                paging: { currentPage : 1 , lastPage : 3 ,viewPageSize : 10 ,totalRecords : 3 , from : 1 , to : 3 , perPage : 10},
                goSearch : "iocSearch",
                // searchStyle : 'search_box page_customer02',
                // searchStyle2 : 'search_list col0301'

            }

        // 뷰페이지 클릭이벤트 받아서 여는곳
        listViewEvent(row){
            this.$router.push({ name:'noticeDetl' , params: { current : row.searchOption , objectKey : row.row } }) // 라우터 주소를 넣어줘야 히스토리모드 인식
        }

        created(){
            this.originItem  = this.listItem.dataGrid.columControl
        }

        mounted() {
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