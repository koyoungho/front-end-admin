<template>
    <!-- container -->
    <section id="container">
        <!-- content  -->
        <div class="content">
            <h2 class="blind">시스템 관리</h2>

            <h3>{{titleNm}} 이력 관리</h3>


            <!-- btn top -->
            <div class="btn_top"  v-if="policyList.length == 0">
                <button type="button" id="" class="btn_m01 bg02" v-on:click="toRegPolicy">약관 등록</button>
            </div>

            <!-- search box -->
            <div class="search_box page_system01">
                <ul class="search_list col0201">
                    <li>
                        <label for="">등록일</label>
                        <span class="form_cal"><input type="text" title="날짜 입력" class="input date"></span>
                        <span class="period_cal">-</span>
                        <span class="form_cal"><input type="text" title="날짜 입력" class="input date"><a href="#" id="datepicker-trigger" class="btn_cal">달력</a></span>
                    </li>
                    <li>
                        <label for="">구분</label>
                        <select id="" name="" class="select sch_w100" title="구분">
                            <option>01</option>
                            <option>02</option>
                            <option>03</option>
                            <option>01</option>
                            <option>02</option>
                            <option>03</option>
                        </select>
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
                    <caption>이용약관 관리</caption>
                    <colgroup>
                        <col width="10%">
                        <col width="15%">
                        <col width="*">
                        <col width="15%">
                        <col width="15%">
                    </colgroup>
                    <thead>
                    <tr>
                        <th scope="col">순번</th>
                        <th scope="col">등록일</th>
                        <th scope="col">제목</th>
                        <th scope="col">상태</th>
                        <th scope="col">등록자</th>
                    </tr>
                    </thead>
                    <tbody>
                    <template v-if="policyList.length>0">
                        <tr v-for="(policyList, index) in policyList">
                            <td>{{totalCount - startPage -index }}</td>
                            <td>{{formatDates(policyList.regDt)}}</td>
                            <td class="left" v-on:click="toPolicy(policyList.hisSeq)"><span class="sub">{{policyList.hisTitle}}</span></td>
                            <td>임시저장</td>
                            <td>관리자</td>
                        </tr>
                    </template>
                    <template v-else>
                        <tr>
                            <td colspan="5" class="no_data">조회된 내용이 없습니다.</td>
                        </tr>
                    </template>
                    </tbody>
                </table>
            </div>
            <!-- //tbl list box -->

             <!--pagination-->
            <Paging v-bind:pagingDetail=listItem.paging v-on:pageToList="pagingEvent" ></Paging>
             <!--//pagination-->
        </div>
        <!-- //content -->
    </section>
    <!-- //container -->


</template>


<script lang="ts">

    import {Component, Vue, Watch} from "vue-property-decorator";
    import {CommonBoardService} from "../../../api/common.service";
    import Paging from '@/components/common/list/paging/paging.vue';
    import format from 'date-fns/format'

    @Component({
        components: {
            PolicyHistoryList, Paging
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

        listItem: any =  // 그리드 서치 페이징 옵션 처리 데이터 매우중요 이룰을 어기면 화면깨짐이 발생합니다
            {
                paging: { currentPage : 1 , lastPage : 3 ,viewPageSize : 10 ,totalRecords : 3 , from : 1 , to : 3 , perPage : 10},
                goDirect : ""
            }

        mounted(){
            this.pageDiv();
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

            }else if(routeNm == 'personalHistoryList' ){
                this.titleNm ='개인보호처리방침';
                this.termsType="user";
            }

            this.searchPolicy();
        }

        /**
         *리스트 호출
         */
        searchPolicy(){

            let searchData: any = {};

            // 페이징요청건
            searchData['currentPage'] = this.listItem.paging.currentPage;
            searchData['perPage'] = this.listItem.paging.perPage;

            // searchData['viewType'] = 'USR';
            // searchData['searchWord'] = this.searchKey;


            // api 데이터 호출 -  약관/개인 이력조회
            CommonBoardService.getListDatas('terms/'+this.termsType+'/history', null, null).then((response) => {
                let resultList: any = response.data;
                this.hisSeq ="";

                if (resultList.length > 0) {
                    this.policyList = resultList;
                }
                this.totalCount = resultList.totalRecords;
                this.startPage= (resultList.currentPage -1) * resultList.perPage;

                this.pageSet(resultList.from, resultList.to, resultList.lastPage, resultList.perPage, resultList.totalRecords, resultList.viewPageSize);
            }
            , (error) => {
                //this.$Progress.finish();
            } ).catch();
        }

        pageSet(froms, to, lastPage, perPage, totalRecords, viewPageSize) {
            this.listItem.paging.from = froms;
            this.listItem.paging.to = to;
            this.listItem.paging.lastPage = lastPage;
            this.listItem.paging.perPage = perPage;
            this.listItem.paging.totalRecords = totalRecords;
            this.listItem.paging.viewPageSize = viewPageSize;
            //this.$emit('dataToPaging', this.listItem.paging);
            this.dataEvent(this.listItem.paging);
        }

        pagingEvent(page) {
            this.searchPolicy();
        }

        dataEvent(es){
            //데이터 로딩된후 이벤트를 받으면  변경된 페이지 정보를 전달해준다.
            if(es.lastPage > 0){
                this.$children['0'].defaultPaging(es)
                this.$children['0'].arrayPaging(es);
            }
        }

        /**
         * 데이트 포맷 변경
         * @param date
         */
        formatDates(date) {
            let formattedDates = '';
            formattedDates = format(date, "YYYY.MM.DD")
            return formattedDates
        }

        /**
         * 제목클릭 시  소메뉴 리스트로 이동
         */
        toPolicy(hisSeq){

            if(this.termsType == 'site'){
                this.$router.push({name:'policyList',params:{hisSeq:hisSeq}});
            }else{
                this.$router.push({name:'personalList',params:{hisSeq:hisSeq}});
            }

        }
        /**
         * 등록버튼 클릭
         */
        toRegPolicy(){

            if(this.termsType == 'site'){
                this.$router.push({name:'policyReg'});
            }else{
                this.$router.push({name:'personalReg'});
            }

        }

    }
</script>

<style scoped>

</style>