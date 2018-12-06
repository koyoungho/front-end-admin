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

            <!-- search box -->
            <div class="search_box page_customer02">
                <ul class="search_list col0301">
                    <li>
                        <label for="">등록일</label>
                        <span class="form_cal">
                            <input type="text" title="날짜 입력" class="input date"  >
                        </span>
                        <span class="period_cal">-</span>
                        <span class="form_cal">
                            <input type="text" title="날짜 입력" class="input date">
                            <a href="#" id="datepicker-trigger" class="btn_cal" >달력</a>
                        </span>
                    </li>
                    <li>
                        <label for="">구분</label>
                        <select  name="" class="select sch_w100" title="구분">
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
                        <input type="text" class="input sch_notice" v-model="searchKey" placeholder="제목+내용" title="검색어 입력" v-on:keyup.enter="searchNotice()">
                    </li>
                </ul>
                <!-- //search box -->
                <template class="datepicker-trigger">
                    <AirbnbStyleDatepicker
                            v-bind:trigger-element-id="'datepicker-trigger'"
                            v-bind:mode=showMode
                            v-bind:fullscreen-mobile="true"
                            v-bind:date-one="dateOne"
                            v-bind:date-two="dateTwo"
                            v-bind:months-to-show="1"
                            v-bind:style="dateStyle"
                            v-bind:offset-x="0"
                            @date-one-selected="val => { dateOne = val }"
                            @date-two-selected="val => { dateTwo = val }"
                    />
                </template>
            </div>


            <!-- btn mid -->
            <div class="btn_mid">
                <button type="button" class="btn_m01 bg01">조회</button>
            </div>



            <!-- bbs list box -->
                <div class="bbs_list_box">
                    <!-- tbl list01 -->
                    <table class="bbs_list page_notice">
                        <caption>공지사항 목록</caption>
                        <colgroup>
                            <col width="60%">
                            <col width="10%">
                            <col width="10%">
                            <col width="10%">
                            <col width="10%">
                        </colgroup>
                        <thead>
                        <tr>
                            <th scope="col">제목</th>
                            <th scope="col">첨부파일</th>
                            <th scope="col">등록일</th>
                            <th scope="col">등록자</th>
                            <th scope="col">구분</th>
                        </tr>
                        </thead>
                        <tbody>

                        <template v-if="listData.length > 0">
                            <tr v-for="(datas, index) in listData" v-on:click="goNoticeDetl(datas.seq)" v-bind:class="{'data_top': (datas.importantYn == 'Y') } ">
                                <td class="left">
                                    <span class="sub" >
                                        <template v-if="datas.importantYn == 'Y'"> <i class="icon notice">공지</i></template>
                                         {{datas.title}}
                                    </span>
                                    <template v-bind:class="{'sub icon_new': (datas.newYn == 'Y') }">
                                        <i class="icon new">new</i>
                                    </template>
                                </td>
                                <td><i v-bind:class="{'icon_file': (datas.attFileYn =='Y') } "/></td>
                                <td>{{formatDates(datas.updDt)}}</td>
                                <td >{{datas.regRoll}}</td>
                                <td>공통</td>
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
                <!-- //bbs list box -->

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
            NoticeList, Paging
        }
    })
    export default class NoticeList extends Vue {
        listData: any = [];
        columControl: any = [];
        searchType: string = '';
        searchKey: string = '';
        totalCount: any = '';
        startPage: any = '';
        //searchKey: any;

        // 달력용
        dateFormat:any =  'YYYYMMDD';
        dateStyle : any = 'left:332px';
        dateOne: any =  new Date();
        dateTwo: any =  new Date();
        showMode : string = "single";


        listItem: any =  // 그리드 서치 페이징 옵션 처리 데이터 매우중요 이룰을 어기면 화면깨짐이 발생합니다
            {
                paging: { currentPage : 1 , lastPage : 3 ,viewPageSize : 10 ,totalRecords : 3 , from : 1 , to : 3 , perPage : 10},
                goDirect : ""
            }

        /**
         *  리스트 조회
         * */
        searchNotice() {
            let searchData: any = {};

            // 페이징요청건
            searchData['currentPage'] = this.listItem.paging.currentPage;
            searchData['perPage'] = this.listItem.paging.perPage;

            searchData['viewType'] = 'USR';
            searchData['searchWord'] = this.searchKey;

            // api 데이터 호출
            CommonBoardService.getListDatas('notices', null, searchData).then((response) => {
                    let result: any = response.data;

                    if (result.data.length > 0) {
                        this.listData=result.data;
                    }
                    this.totalCount = result.totalRecords;
                    this.startPage= (result.currentPage -1) * result.perPage;

                    this.pageSet(result.from, result.to, result.lastPage, result.perPage, result.totalRecords, result.viewPageSize);
                    //this.$Progress.finish();
                }
                , (error) => {
                    //this.$Progress.finish();
                }  ).catch();


        }
        //상세화면 이동
        goNoticeDetl(seq) {
            this.$router.push({name:'noticeDetl', params:{seq:seq}})
        }

        mounted() {
            this.searchNotice();
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
            this.searchNotice();
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
         * 등록 이동
         */
        goRegNotice(){
            this.$router.push({path:'regNotice'});
        }
    }
</script>

<style scoped>

</style>