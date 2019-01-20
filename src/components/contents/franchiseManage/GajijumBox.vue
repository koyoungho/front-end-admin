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
                <div class="popup_content page_sch" v-if="gajumHide">
                    <!-- search box -->
                    <div class="search_box type01" >
                        <div class="search_inner">
                            <ul class="search_list">
                                <li>
                                    <label for="">가맹점 검색</label>
                                    <select id="" name="" class="select sch_appnum" title="사업장명" v-model="searchType">
                                        <option value="">선택</option>
                                        <option value="saupId">사업자등록번호</option>
                                        <option value="shopNm">사업장명</option>
                                    </select>
                                    <input type="text" class="input sch_appuser" title="고객명" v-model="searchWord" v-on:keyup.enter="searchGajum">
                                </li>
                            </ul>
                            <span class="btn_req_area"><button type="button" class="btn_m01 bg01" v-on:click="searchGajum">조회</button></span>
                        </div>
                    </div>
                    <!-- //search box -->

                    <!-- sch result box -->
                    <div class="search_box ptype02">
                        <div class="search_inner">
                            <ul class="sch_result">
                                <li>
                                    <label>가맹점</label>
                                    <input type="text" class="input form_code01" value="" title="가맹점 코드" v-model="gajumId">
                                    <input type="text" class="input form_code02" value="" title="가맹점명" v-model="gajumNm">
                                    <input type="hidden" class="input form_code02" value="" title="사업자번호" v-model="gajumNo">
                                    <span class="btn_sch_area"><button type="button" class="btn_m01 bg01" v-on:click="searchJijum" v-if="jijumBtnShow">지점 번호 조회</button></span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <!-- tbl scroll box -->
                    <div class="tbl_scroll_box">
                        <div id="loading_bar" v-show="loading">
                            <vue-simple-spinner size="medium" line-fg-color="#D0021B" message="loading..." />
                        </div>
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
                                <th scope="col">{{gajuNm}}</th>
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
                                <template v-if="gajiGbn == true">
                                    <tbody v-for="datas in responseData">
                                    <tr>
                                        <td><span class="rdo_box"><input type="radio" name="chk" value="2" id="aa11" v-on:click="selectedRow(datas)"><label for="aa41"><span class="blind">선택</span></label></span></td>
                                        <td>{{datas.gajumId}}</td>
                                        <td>{{datas.saupId}}</td>
                                        <td class="left">{{datas.shopNm}}</td>
                                    </tr>
                                    </tbody>
                                </template>
                                <template v-if="gajiGbn != true">
                                    <tbody v-for="datas in responseData">
                                    <tr>
                                        <td><span class="rdo_box"><input type="radio" name="chk" value="2" id="aa11" v-on:click="selectedRow(datas)"><label for="aa41"><span class="blind">선택</span></label></span></td>
                                        <td>{{datas.jijumId}}</td>
                                        <td>{{datas.saupId}}</td>
                                        <td class="left">{{datas.shopNm}}</td>
                                    </tr>
                                    </tbody>
                                </template>
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

                <div class="popup_content page_sch" v-if="jijumShow">

                    <!-- sch result box -->
                    <div class="search_box type01">
                        <div class="search_inner">
                            <ul class="search_list">
                                <li>
                                    <label>가맹점</label>
                                    <input type="text" class="input sch_appuser" value="" title="가맹점 코드" v-model="gajumId" disabled="disabled">
                                    <span class="btn_sch_area"><button type="button" class="btn_m01 bg01" v-on:click="searchJijum">지점 번호 조회</button></span>
                                </li>
                            </ul>
                        </div>
                    </div>

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
                                <th scope="col">지점번호</th>
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
                                    <td>{{datas.jijumId}}</td>
                                    <td>{{datas.saupId}}</td>
                                    <td class="left">{{datas.shopNm}}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <!-- //tbl scroll -->
                    </div>
                    <!-- //tbl scroll box -->

                </div>

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

    import {Component, Vue, Prop} from "vue-property-decorator";
    import {CommonBoardService, CommonListService} from '../../../api/common.service';
    import VueSimpleSpinner from 'vue-simple-spinner/src/components/Spinner.vue';

    @Component({
        components: {
            GajijumList, VueSimpleSpinner
        },
    })
    export default class GajijumList extends Vue {

        @Prop() gajumNum !: any;
        gajumNumber : string = this.gajumNum;
        gajumHide : boolean = true;
        jijumShow : boolean = false;

        gajiGbn : boolean = true; //가맹점,지점 구분(true-가맹점, false-지점)
        gajuNm : any = '가맹점 번호';

        responseData : any = [];

        searchType : any = ''; //검색 타입(사업자등록번호-saupId, 사업장명-shopNm
        searchWord : any = ''; //검색어

        gajumId : any = ''; //가맹점 id
        gajumNm : any = ''; //가맹점 명
        gajumNo : any = ''; //가맹점 사업자번호

        jijumBtnShow : boolean = false; //지점 버튼 show

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

        loading :boolean= false;

        //돔생성전 호출자
        created() {

            if(this.gajumNum != null && this.gajumNum != ''){
                this.gajumId = this.gajumNum; //가맹점 ID 셋팅
                this.gajumHide = false; //가맹점 검색 감추기
                this.jijumShow = true; //지점 검색 보이기
                this.jijumBtnShow = false; //지점 검색 버튼 감추기
            }

        }
        //돔렌더링완료시 진행
        mounted(){

        }
        selectedRow(obj) {

            if(obj.gajuGbn == 'gajum'){ //가맹점 선택인 경우
                this.jijumBtnShow = true;
                this.gajumId = obj.gajumId;
                this.gajumNm = obj.shopNm;
                this.gajumNo = obj.saupId;
            }else { //지점 선택인 경우
                let selectedRow: any = {};
                selectedRow['gajumId'] = this.gajumId; //가맹점 ID
                selectedRow['gajumSaupId'] = this.gajumNo; //가맹점 사업자번호
                selectedRow['gajumNm'] = this.gajumNm; //가맹점명
                selectedRow['jijumId'] = obj.jijumId; //지점 ID
                selectedRow['jijumSaupId'] = obj.saupId; //지점 사업자번호
                selectedRow['jijumNm'] = obj.shopNm; //지점명
                this.$emit('selectedGaJijum', selectedRow); //선택한 가맹점만 값 넘김
                this.$emit('gajiumClose')
            }
        }

        selectedJijumRow(obj) {

            let selectedRow: any = {};
            selectedRow['gajumId'] = this.gajumId; //가맹점 ID
            selectedRow['gajumSaupId'] = this.gajumNo; //가맹점 사업자번호
            selectedRow['gajumNm'] = this.gajumNm; //가맹점명
            selectedRow['jijumId'] = obj.jijumId; //지점 ID
            selectedRow['jijumSaupId'] = obj.saupId; //지점 사업자번호
            selectedRow['jijumNm'] = obj.shopNm; //지점명
            this.$emit('selectedGaJijum', selectedRow); //선택한 가맹점만 값 넘김
            this.$emit('gajiumClose')
        }

        closeAddr(){
            this.$emit('gajiumClose');
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

            this.loading = true;
            CommonBoardService.getListData('gajum/popup', null, reqData).then((response) => {
                    //console.log(response)
                    //this.responseData = response.data;
                    let arrData : any = response.data;
                    let rowData : any = {};
                    let putData : any = [];
                    arrData.filter(e=>{
                        rowData = {};
                        rowData['gajumId'] = e.gajumId;
                        rowData['saupId'] = e.saupId;
                        rowData['shopNm'] = e.shopNm;
                        rowData['gajuGbn'] = 'gajum';
                        putData.push(rowData);
                    });
                    this.responseData = putData;
                    this.loading = false;
                }
                , (error) => {
                    this.loading = false;
                }
            ).catch();
        }

        searchJijum(){
            // 검색데이터

            this.gajiGbn = false;
            this.gajuNm = '지점 번호';
            this.responseData = [];
            CommonBoardService.getListData('jijum/'+this.gajumId, null, null).then((response) => {
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

    }


</script>