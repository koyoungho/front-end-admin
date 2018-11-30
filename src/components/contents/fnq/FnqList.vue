<template>

    <!-- container -->
    <section id="container">
        <!-- content  -->
        <div class="content">
            <h2 class="blind">자주 묻는 질문</h2>

            <h3>자주 묻는 질문</h3>

            <!-- btn top -->
            <div class="btn_top">
                <button type="button" class="btn_m01 bg02" v-on:click="regFnq">자주묻는 질문 등록</button>
            </div>

            <!-- search box -->
            <div class="search_box page_customer04">
                <ul class="search_list col0301">
                    <li>
                        <label for="">등록일</label>
                        <span class="form_cal">
                            <input type="text" title="날짜 입력" class="input date">
                        </span>
                        <span class="period_cal">-</span>
                        <span class="form_cal">
                            <input type="text" title="날짜 입력" class="input date">
                            <a href="#" id="datepicker-trigger" class="btn_cal">달력</a>
                        </span>
                    </li>
                    <li>
                        <label for="">구분</label>
                        <select name="" class="select sch_w100" title="구분">
                            <option>01</option>
                            <option>02</option>
                            <option>03</option>
                            <option>01</option>
                            <option>02</option>
                            <option>03</option>
                        </select>
                    </li>
                    <li>
                        <label for="">검색어</label>
                        <input type="text" class="input sch_notice" placeholder="제목+내용" title="검색어입력">
                    </li>
                </ul>
            </div>
            <!-- //search box -->

            <!-- btn mid -->
            <div class="btn_mid">
                <span class="btn_top type02 fleft">
                    <button type="button" id="" class="btn_s01 bg02 manual" v-on:click="manual"><i class="icon download"></i>매뉴얼 다운로드</button>
                </span>
                <button type="button" class="btn_m01 bg01" v-on:click="searchFaq">조회</button>
            </div>

            <!--<template v-if=""> 관리자,콜센터일때-->
            <!-- bbs list box -->
            <div class="bbs_list_box">
                <!-- tbl list01 -->
                <table class="bbs_list page_notice">
                    <caption>자주묻는 질문 목록</caption>
                    <colgroup>
                        <col width="11%">
                        <col width="*">
                        <col width="10%">
                        <col width="10%">
                        <col width="10%">
                    </colgroup>
                    <thead>
                    <tr>
                        <th scope="col">순번</th>
                        <th scope="col">제목</th>
                        <th scope="col">등록일</th>
                        <th scope="col">등록자</th>
                        <th scope="col">구분</th>
                    </tr>
                    </thead>
                    <tbody>
                        <template v-if="listData.length > 0">
                            <template v-for="(datas, index) in listData">
                                <tr>
                                    <td>{{index}}</td>
                                    <td class="left" v-on:click="toDetail(datas.seq)"> {{datas.title}} </td>
                                    <td>{{formatDates(datas.updDt)}}</td>
                                    <td>{{datas.updId}}</td>
                                    <td>{{datas.viewType}}</td>
                                </tr>
                            </template>
                        </template>
                        <template v-else>
                            <tr>
                                <td colspan="5" class="no_data">조회된 내용이 없습니다.</td>
                            </tr>
                        </template>
                    </tbody>
                </table>
            </div>
            <!-- //bbs list box -->
            <!--</template> -->

            <!--<template v-else> 일반관리자-->
            <!-- faq box -->
            <div class="faq_box">
                <dl class="faq_list">
                    <template v-if="listData.length > 0">
                        <template v-for="(datas, index) in listData">
                            <dt v-on:click=" display(index)" v-bind:class="{ 'on': (rownum == index) } " ><i class="icon faq_q">Q</i> {{datas.title}}</dt>
                            <dd v-show="rownum == index"><i class="icon faq_a">A</i> {{datas.content}}</dd>
                        </template>
                    </template>
                    <template v-else>
                        <dd style="text-align: center">데이터가 없습니다.</dd>
                    </template>
                </dl>
            </div>
            <!-- //faq box -->
            <!--</template>-->


            <!-- pagination -->
            <Paging v-bind:pagingDetail=listItem.paging v-on:pageToList="pagingEvent" ></Paging>
            <!-- //pagination -->





        </div>
        <!-- //content -->
    </section>
    <!-- //container -->


</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import {CommonBoardService} from '../../../api/common.service';
    import Paging from '@/components/common/list/paging/paging.vue';
    import moment from 'moment'
    Vue.prototype.moment = moment;

    @Component({
        components: {
            FnqList, Paging
        }
    })
    export default class FnqList extends Vue {

        listData: any = [];
        columControl: any = [];
        searchType: string = '';
        searchKey: string = '';
        totalCount: any = '';
        //searchKey: any;
        isActive:boolean=false;
        arrow:string="";
        rownum:number=999;

        listItem: any =  // 그리드 서치 페이징 옵션 처리 데이터 매우중요 이룰을 어기면 화면깨짐이 발생합니다
            {
                // paging: { currentPage : 1 , lastPage : 3 ,viewPageSize : 10 ,totalRecords : 3 , from : 1 , to : 3 , perPage : 10},
                paging: { currentPage : 1 , lastPage : 3 ,viewPageSize : 10 ,totalRecords : 3 , from : 1 , to : 3 , perPage : 10},
                goDirect : ""
            }

        mounted(){
            this.searchFaq( );//리스트 바인딩
        }

        //조회
        searchFaq() {

            let searchData: any = {};

            searchData['viewType'] = 'ALL';
            //검색
            searchData['searchWord'] = this.searchKey;

            // 페이징요청건
            searchData['currentPage'] = this.listItem.paging.currentPage;
            searchData['perPage'] = this.listItem.paging.perPage;

            // api 데이터 호출
            CommonBoardService.getListDatas('faqs', null, searchData).then((response) => {
                    let result: any = response.data;

                    if (result.data.length > 0) {
                        this.listData=result.data;

                     }

                    this.totalCount = result.totalRecords;
                    this.pageSet(result.from, result.to, result.lastPage, result.perPage, result.totalRecords, result.viewPageSize);
                    //this.$Progress.finish();
                }
                , (error) => {
                    //this.$Progress.finish();
                }
            ).catch();
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
            alert("다운로드");
        }

        /**
         * 등록
         */
        regFnq(){
            this.$router.push({name:'regFnq'})
        }

        /**
         * 상세보기
         */
        toDetail(seq){
            this.$router.push({name:'regFnq', params:{seq:seq}})
        }

        /**
         * 아코디언메뉴 제어
         * @param index
         */
        display(index){
            // alert(index);
            this.isActive =false;
            this.rownum =999;

            this.isActive = !this.isActive;

            if(this.isActive == true){
                this.rownum = index;
            }else{
                this.arrow="";
            }
        }

    }
</script>
