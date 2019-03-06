<template>
    <div>

        <!--리스트-->
        <ListComponent v-bind:listObject="listItem" v-bind:onLoadList="listItem.dataGrid.onLoadList" v-on:listView="listViewEvent"></ListComponent>

    </div>
</template>

<script lang="ts">

    import {Component, Vue} from "vue-property-decorator";
    import ListComponent from '../../common/list/list.vue';  // 공용리스트 콤포넌트
    import {format} from 'date-fns';
    import  moment from 'moment'

    @Component({
        components: {
            BatchFileProcList, ListComponent

        }
    })
    export default class BatchFileProcList extends Vue {

        originItem : any = {} // 오리지널데이터
        listItem: any = []

        // 뷰페이지 클릭이벤트 받아서 여는곳
        listViewEvent(row){
            this.$router.push({ name:'noticeDetl' , params: { current : row.searchOption , objectKey : row.row } }) // 라우터 주소를 넣어줘야 히스토리모드 인식
        }

        created(){

            let  nowUTC =  moment().utc() ; //UTC시간
            let  nowKo= nowUTC// 한국시간
            let  beforeOneDKo=  moment(nowKo).subtract(1, 'days') // 하루전

            this.listItem =  // 그리드 서치 페이징 옵션 처리 데이터 매우중요 이룰을 어기면 화면깨짐이 발생합니다
                {
                    dataGrid: {
                        columControl:[  // 반드시 받는 컬럼명과 이 ID 가 같아야데이터가 나옵니다..
                            {columName : '처리일시' ,type:'date', id : 'procDate', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' , dateFormat: 'YYYY.MM.DD'},
                            {columName : '작업ID'  ,type:'text', id : 'jobId', width : '13%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' },
                            {columName : '작업명' ,type:'text', id : 'jobNm', width : '15%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : ''},
                            {columName : '파일명'  ,type:'text', id : 'batchFname', width : '25%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : ''},
                            {columName : '파일사이즈'  ,type:'text', id : 'procNum', width : '12%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : ''   }, // 라인컬러와 라인벨류는 오직하나만
                            {columName : '처리결과'  ,type:'text', id : 'procYnNm', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : ''   }, // 라인컬러와 라인벨류는 오직하나만
                            {columName : '내용'  ,type:'text', id : 'memo', width : '15%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : ''   }, // 라인컬러와 라인벨류는 오직하나만
                        ],
                        totalColum: 7,
                        apiUrl : 'approval/file',
                        onLoadList : false,  // onLoad 로딩 유무
                    },
                    // 아이디는 실제 컬럼값을 넣어주면됩니다.
                    search: [
                        {type: 'date2',class:'w30 text_left', title :'처리일시', id: 'date', name:'date', searchStartDate: [beforeOneDKo, nowKo] , calenderCount : 2 , dateType : 'date' , width : 220  , default :'YYYY-MM-DD', setDates: [beforeOneDKo,nowKo]},
                        {type: 'select' ,class:'w20', title :'처리상태',id: 'procYn', name:'procYn' , value: '' ,  api : '' , option : [{ name : '성공' , value: 'Y' },{name : '실패' , value: 'N' }]},
                        {type: 'select' ,class:'w20', title :'검색',id: 'searchType', name:'searchType' , value: '' ,  api : '' , option : [{ name : '작업ID' , value: 'jobId' },{name : '작업명' , value: 'jobNm' },{name : '파일명' , value: 'findNm' }]},
                        {type: 'input',class:'w30 text_left', title :'', id: 'searchWord', name:'searchWord' , value: '',   api : '' , option : '' },
                    ],
                    paging: { currentPage : 1 , lastPage : 3 ,viewPageSize : 10 ,totalRecords : 3 , from : 1 , to : 3 , perPage : 10},
                    goSearch : "iocSearch",
                    searchClass : 'search_box page_customer02',
                    searchClass2 : 'search_list col0303'
                }

                this.originItem  = this.listItem.dataGrid.columControl
        }




    }
</script>

<style scoped>

</style>