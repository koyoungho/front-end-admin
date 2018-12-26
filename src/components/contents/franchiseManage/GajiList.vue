<template>
    <div>
    <!-- popup large -->
    <div id="popup1" class="popup_wrapper large" tabindex="0" style="display: block;">
        <!-- popup header -->
        <div class="popup_header">
            <!-- h2 -->
            <h2>가맹점 검색</h2>
            <button type="button" id="" class="btn_close" @click="closeAddr()">Close</button>
        </div>
        <!-- popup body -->
        <div class="popup_body">
            <!-- popup content -->
            <div class="popup_content page_sch">
                <!-- search box -->
                <div class="search_box type01">
                    <div class="search_inner">
                        <ul class="search_list">
                            <li>
                                <label for="">가맹점 검색</label>
                                <select id="" name="" class="select sch_appnum" title="사업장명" v-model="searchType">
                                    <option value="">선택</option>
                                    <option value="saupId">사업자등록번호</option>
                                    <option value="shopNm">사업장명</option>
                                </select>
                                <input type="text" class="input sch_appuser" title="고객명" v-model="searchWord">
                            </li>
                        </ul>
                        <span class="btn_req_area"><button type="button" class="btn_m01 bg01" v-on:click="searchGajum">조회</button></span>
                    </div>
                </div>
                <!-- //search box -->

                <!-- tbl scroll box -->
                <div class="tbl_scroll_box">
                    <!-- tbl list02 -->
                    <table class="tbl_list02">
                        <caption>검색 목록</caption>
                        <colgroup>
                            <col width="68px">
                            <col width="100px">
                            <col width="100px">
                            <col width="400px">
                        </colgroup>
                        <thead>
                        <tr>
                            <th scope="col">선택</th>
                            <th scope="col">가맹점 번호</th>
                            <th scope="col">사업자번호</th>
                            <th scope="col">사업장명</th>
                        </tr>
                        </thead>
                    </table>
                    <!-- tbl scroll -->
                    <div class="tbl_scroll">
                        <table class="tbl_list02 brd_none page_store03">
                            <caption>검색 목록</caption>
                            <colgroup>
                                <col width="68px">
                                <col width="100px">
                                <col width="100px">
                                <col width="383px">
                            </colgroup>
                            <tbody v-for="datas in responseData">
                                <tr>
                                    <td><span class="rdo_box"><input type="radio" name="chk" value="2" id="aa11" v-on:click="selectedRow(datas)"><label for="aa41"><span class="blind">선택</span></label></span></td>
                                    <td>{{datas.gajumId}}</td>
                                    <td>{{datas.saupId}}</td>
                                    <td class="left">{{datas.shopNm}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!-- //tbl scroll -->

                    <!-- pagination -->
                    <!--<div class="pagination">
                        <a href="#" class="btn_prev" v-on:click="prePages()">이전</a>
                        <span class="num">
                          <a v-for="page in paggingStr" v-on:click="goPage(page.page)">
                            <template v-if="pageNum==page.page"><strong>{{page.page}}</strong></template>
                            <template v-else="pageNum=page.page">{{page.page}}</template>
                          </a>
                        </span>
                        <a href="#" class="btn_next" v-on:click="nextPages()">다음</a>
                    </div>-->
                    <!-- //pagination -->

                </div>
                <!-- //tbl scroll box -->

            </div>
            <!-- //popup content -->
            <!-- bottom area -->
            <div class="bottom_area">
                <!-- btn -->
                <div class="btn_bot">
                    <button type="button" class="btn_b01 bg02" @click="closeAddr()">취소</button>
                    <!-- <button type="button" class="btn_b01 bg01">확인</button> -->
                </div>
            </div>

        </div>
        <!-- //popup body -->
    </div>
    </div>
    <!-- //popup -->


</template>

<script lang="ts">

    import {Component, Vue} from "vue-property-decorator";
    import {CommonBoardService, CommonListService} from '../../../api/common.service';

    @Component({
        components: {
            GajiList
        },
    })
    export default class GajiList extends Vue {

        gajiGbn : string = ''; //가맹점,지점 구분(1-가맹점, 2-지점)

        responseData : any = [];

        searchType : any = ''; //검색 타입(사업자등록번호-saupId, 사업장명-shopNm
        searchWord : any = ''; //검색어

        //페이징 데이터
        PAGEBLOCK: number = 5;
        pageSize: number = 5;
        totalPages: number = 0;
        firstPage: number = 0;
        lastPage: number = 0;
        nextPage: number = 0;
        prePage: number = 0;
        paggingStr: any = [];
        total: number = 0;
        pageNum: number = 1;

        //돔생성전 호출자
        created() {

        }
        //돔렌더링완료시 진행
        mounted(){

        }
        selectedRow(obj) {
            //console.log(obj);
            let selectedRow : any  = {};
            selectedRow['gajumId'] = obj.gajumId;
            selectedRow['saupId'] = obj.saupId;
            selectedRow['shopNm'] = obj.shopNm;
            this.$emit('selectedGaji', selectedRow); //선택한 가맹점만 값 넘김
            this.$emit('gajiClose')
        }

        pageMake() {
            this.paggingStr = [];
            if (this.total < 1) {

            } else {
                if (this.firstPage <= 0) {
                    this.firstPage = 1;
                }
                this.firstPage = Math.floor((this.pageNum - 1) / this.PAGEBLOCK) * this.PAGEBLOCK + 1;
                this.totalPages = Math.floor((this.total - 1) / this.pageSize) + 1;
                this.lastPage = this.firstPage - 1 + this.PAGEBLOCK;

                if (this.lastPage > this.totalPages) this.lastPage = this.totalPages;
                this.nextPage = this.lastPage + 1;
                this.prePage = this.firstPage - 5;

                for (let i = this.firstPage; i <= this.lastPage; i++) {
                    this.paggingStr.push({page: i});
                }
            }
        }

        closeAddr(){
            this.$emit('gajiClose');
        }

        searchGajum() {

            // SM006M00 테이블 조회
            if(this.searchType == ''){
                alert('가맹점 검색 항목을 선택하세요.');
                return;
            }else if(this.searchWord == ''){
                alert('검색어를 입력하세요.');
                return;
            }

            // 토탈페이지 및 페이징관련 데이터는 다시 페이지 오브젝트에 넣어야한다.
            // 넣어진 페이지 데이터에 의해 페이징 페이지 생성 이벤트는 페이지번호 옴겨와야한다
            // 검색데이터
            let reqData = {
                searchType : this.searchType,
                searchWord : this.searchWord,
                //currentPage : this.pageNum,
                //perPage  : this.PAGEBLOCK,
            }

            CommonBoardService.getListData('gajum/popup', null, reqData).then((response) => {
                //console.log(response)
                    this.responseData = response.data;

                    /*this.total = parseInt(response.data.totalRecords);
                    this.pageNum = parseInt(response.data.currentPage);
                    this.pageSize = parseInt(response.data.perPage);
                    this.PAGEBLOCK = parseInt(response.data.perPage);
                    this.pageMake();*/
                }
                , (error) => {
                }
            ).catch();
        }

        prePages() {
            if (this.firstPage > this.PAGEBLOCK) {
                this.goPage(this.prePage);
            }
        }

        nextPages() {
            if (this.lastPage < this.totalPages) {
                this.goPage(this.nextPage);
            }
        }

        goPage(pageNum) {
            this.pageNum = pageNum;
            this.searchGajum();
        }

        updated() {
            this.$nextTick(function () {
            });
            // data 값 변조하면됨 Y / N   1,2? 이런값들 변경시 필요함
        }

    }


</script>