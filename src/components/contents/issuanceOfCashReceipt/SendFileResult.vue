<template>

    <!-- container -->
    <section id="container">
        <!-- content  -->
        <div class="content">
            <h2 class="blind">현금영수증관리</h2>

            <h3>전송파일 처리결과</h3>

            <!--리스트-->
            <ListComponent v-bind:listObject="listItem" v-bind:onLoadList="listItem.dataGrid.onLoadList" ></ListComponent>

        </div>
        <!-- //content -->
    </section>
    <!-- //container -->


</template>

<script lang="ts">
    import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
    import {format} from 'date-fns';
    import ListComponent from '../../common/list/list.vue';  // 공용리스트 콤포넌트

    @Component({
        components: {
            SendFileResult, ListComponent
        },
    })
    export default class SendFileResult extends Vue {
        message: any = '';
        setDate =  format(new Date(),'YYYYMMDD');

        listItem : any= {
            dataGrid: {
                columControl:[  // 반드시 받는 컬럼명과 이 ID 가 같아야데이터가 나옵니다..
                    {columName : '처리일' ,type:'text', id : 'procDate', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' ,rowColors :'' , date: true},
                    {columName : '작업명'  ,type:'text', id : 'jobNm', width : '15%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' },
                    {columName : '파일명' ,type:'text', id : 'batchFname', width : '37%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : ''},
                    {columName : '건수'  ,type:'text', id : 'procNum', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : ''},
                    {columName : '처리결과'  ,type:'text', id : 'procYnNm', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '', option : [{ name : '성공' , value: 'Y' },{ name : '실패' , value: 'N' }]   },
                    {columName : '메모'  ,type:'text', id : 'memo', width : '18%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : ''   },
                    {columName : '처리결과YN'  ,type:'textNone', id : 'procYn', width : '18%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : ''   },
                ],
                totalColum: 7,
                apiUrl : 'approval/file/transaction',
                onLoadList : true,  // onLoad 로딩 유무
            },
            // 아이디는 실제 컬럼값을 넣어주면됩니다.
            search: [
                {type: 'selectObject' , title :'회사코드',id: 'upjongCode', name:'upjongCode' , value: '' ,  api : 'company',  optNm : 'name', optVal: 'code', option : []},
                {type: 'date', title :'등록일', id: 'date' , name:'date', searchStartDate: this.setDate ,  searchEndDate: this.setDate , calenderCount : 2},
                {type: 'select' , title :'처리결과',id: 'procYn', name:'procYn' , value: '' , option : [{ name : '성공' , value: 'Y' },{ name : '실패' , value: 'N' }]},
    ],

            paging: { currentPage : 1 , lastPage : 3 ,viewPageSize : 10 ,totalRecords : 3 , from : 1 , to : 3 , perPage : 10},
            goSearch : "iocSearch",
            searchClass : 'search_box page_customer02',
            searchClass2 : 'search_list col0301'
        };

        originItem : any = {} // 오리지널데이터


        dataEvent(es){
            //데이터 로딩된후 이벤트를 받으면  변경된 페이지 정보를 전달해준다.
            if(es.lastPage > 0){
                this.$children['0'].defaultPaging(es)
                this.$children['0'].arrayPaging(es);
            }
        }




        //돔생성전 호출자
        created() {

            this.originItem  = this.listItem.dataGrid.columControl
        }

        //돔렌더링완료시 진행
        mounted() {
        }

        //조회
        goSearch(){

        }




    }

</script>
