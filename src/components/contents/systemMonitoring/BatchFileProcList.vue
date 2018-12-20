<template>
    <div>
        <!-- search box -->
        <div class="search_box page_system06">
            <ul class="search_list">
                <li>
                    <label for="aa">처리 일시</label><span class="form_cal"><input type="text" title="날짜 입력" class="input date"></span><span class="period_cal">-</span><span class="form_cal"><input type="text" title="날짜 입력" class="input date"><a href="#" id="datepicker-trigger" class="btn_cal">달력</a></span>
                </li>
                <li>
                    <label for="">처리결과</label>
                    <select id="" name="" class="select sch_w100" title="가맹점상태">
                        <option>01</option>
                        <option>02</option>
                        <option>03</option>
                        <option>01</option>
                        <option>02</option>
                        <option>03</option>
                    </select>
                </li>
                <li>
                    <label for="">검색</label>
                    <select id="" name="" class="select sch_appnum" title="사업장명">
                        <option>사업장명</option>
                    </select>
                </li>
                <li>
                    <input type="text" class="input sch_appuser" title="고객명">
                </li>
            </ul>
        </div>
        <!-- //search box -->

        <!-- btn mid -->
        <div class="btn_mid">
            <button type="button" class="btn_m01 bg01">조회</button>
        </div>

        <!-- tbl list box -->
        <div class="tbl_list_box">
            <!-- tbl list01 -->
            <table class="tbl_list01">
                <caption>배치 파일 처리 현황 목록</caption>
                <colgroup>
                    <col width="20%">
                    <col width="14%">
                    <col width="18%">
                    <col width="14%">
                    <col width="12%">
                    <col width="12%">
                    <col width="10%">
                </colgroup>
                <thead>
                <tr>
                    <th scope="col">처리 일시</th>
                    <th scope="col">작업 ID</th>
                    <th scope="col">작업명</th>
                    <th scope="col">파일명</th>
                    <th scope="col">파일사이즈</th>
                    <th scope="col">처리결과</th>
                    <th scope="col">내용</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>대기중</td>
                    <td></td>
                    <td>작업명</td>
                    <td class="left">/home/cash/sdata/CSI20181012_01.dat</td>
                    <td>100</td>
                    <td>성공</td>
                    <td>1000</td>
                </tr>
                <tr>
                    <td>2018/10/12 05:22:16</td>
                    <td></td>
                    <td>작업명</td>
                    <td class="left">/home/cash/sdata/CSI20181012_01.dat</td>
                    <td>100</td>
                    <td>성공</td>
                    <td>1000</td>
                </tr>
                <tr>
                    <td colspan="7" class="no_data">조회된 내용이 없습니다.</td>
                </tr>
                </tbody>
            </table>
        </div>
        <!-- //tbl list box -->

        <!-- pagination -->
        <div class="pagination">
            <a href="#" class="btn_fprev">맨앞</a>
            <a href="#" class="btn_prev">이전</a>
            <span class="num">
                <a href="#">1</a>
                <a href="#">2</a>
                <strong>3</strong>
                <a href="#">4</a>
                <a href="#">5</a>
            </span>
            <a href="#" class="btn_next">다음</a>
            <a href="#" class="btn_enext">맨뒤</a>
        </div>
        <!-- //pagination -->


        <!--리스트-->
        <ListComponent v-bind:listObject="listItem" v-bind:onLoadList="listItem.dataGrid.onLoadList" v-on:listView="listViewEvent"></ListComponent>



    </div>
</template>

<script lang="ts">

    import {Component, Vue} from "vue-property-decorator";
    import ListComponent from '../../common/list/list.vue';  // 공용리스트 콤포넌트

    @Component({
        components: {
            BatchFileProcList, ListComponent

        }
    })
    export default class BatchFileProcList extends Vue {

        originItem : any = {} // 오리지널데이터
        listItem: any =  // 그리드 서치 페이징 옵션 처리 데이터 매우중요 이룰을 어기면 화면깨짐이 발생합니다
            {
                dataGrid: {
                    columControl:[  // 반드시 받는 컬럼명과 이 ID 가 같아야데이터가 나옵니다..
                        {columName : '처리일시' ,type:'text', id : 'title', width : '20%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' ,rowColors :'' },
                        {columName : '작업ID'  ,type:'text', id : 'attFileYn', width : '14%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' },
                        {columName : '작업명' ,type:'text', id : 'updDt', width : '18%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : ''},
                        {columName : '파일명'  ,type:'text', id : 'regRoll', width : '14%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : ''},
                        {columName : '파일사이즈'  ,type:'text', id : 'trguNm', width : '12%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : ''   }, // 라인컬러와 라인벨류는 오직하나만
                        {columName : '처리결과'  ,type:'text', id : 'trguNm', width : '12%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : ''   }, // 라인컬러와 라인벨류는 오직하나만
                        {columName : '내용'  ,type:'text', id : 'trguNm', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : ''   }, // 라인컬러와 라인벨류는 오직하나만
                    ],
                    totalColum: 7,
                    apiUrl : 'notices',
                    onLoadList : true,  // onLoad 로딩 유무
                },
                // 아이디는 실제 컬럼값을 넣어주면됩니다.
                search: [
                    {type: 'date', title :'처리일시', id: 'date' , name:'date', searchStartDate: null ,  searchEndDate: null, calenderCount : 2},
                    {type: 'select' , title :'처리결과',id: 'importantYn', name:'importantYn' , value: '' ,  api : '' , option : [{ name : '성공' , value: '0' },{name : '실패' , value: '1' }]},
                    {type: 'select' , title :'검색',id: 'searchType', name:'searchType' , value: '' ,  api : '' , option : [{ name : '작업ID' , value: 'saupId' },{name : '작업명' , value: 'chipNm' },{name : '파일명' , value: 'chipNm' }]},
                    {type: 'input', title :'', id: 'searchWord', name:'searchWord' , value: '',   api : '' , option : '' }

                ],

                paging: { currentPage : 1 , lastPage : 3 ,viewPageSize : 10 ,totalRecords : 3 , from : 1 , to : 3 , perPage : 10},
                goSearch : "iocSearch",
                searchStyle : 'search_box page_customer02',
                // searchStyle2 : 'search_list col0301'

            }

        // 뷰페이지 클릭이벤트 받아서 여는곳
        listViewEvent(row){
            this.$router.push({ name:'noticeDetl' , params: { current : row.searchOption , objectKey : row.row } }) // 라우터 주소를 넣어줘야 히스토리모드 인식
        }

        created(){
            this.originItem  = this.listItem.dataGrid.columControl
        }




    }
</script>

<style scoped>

</style>