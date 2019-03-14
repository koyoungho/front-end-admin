<template>
    <div>
        <!-- popup large -->
        <div id="popup1" class="popup_wrapper biglarge" tabindex="0" :style="clientY">
            <!-- popup header -->
            <div class="popup_header">
                <!-- h2 -->
                <h2>오류상세</h2>
                <button type="button" id="" class="btn_close" @click="closeAddr">Close</button>
            </div>
            <!-- popup body -->
            <div class="popup_body">
                <!-- popup content -->
                <div class="popup_content page_sch2">
                    <!-- tbl scroll box -->
                    <div class="tbl_scroll_box">
                        <div id="loading_bar" v-show="loading">
                            <vue-simple-spinner size="medium" line-fg-color="#D0021B" message="처리중입니다 잠시만기다려주세요!" />
                        </div>
                        <H2>관련내역</H2>
                        <div class="tbl_scrollnew">
                        <!-- tbl list02 -->
                        <table class="tbl_list02" style="width:2000px">
                            <colgroup>
                                <col width="6%">
                                <col width="6%">
                                <col width="6%">
                                <col width="7%">
                                <col width="6%">
                                <col width="6%">
                                <col width="6%"> <!--거래구분-->
                                <col width="8%">
                                <col width="8%">
                                <col width="5%">
                                <col width="5%">
                                <col width="5%">
                                <col width="5%">
                                <col width="5%">
                                <col width="6%">
                                <col width="10%">
                            </colgroup>
                            <thead>
                            <tr>
                                <th scope="col">거래일자</th>
                                <th scope="col">승인번호</th>
                                <th scope="col">거래금액</th>
                                <th scope="col">공급가액</th>
                                <th scope="col">부가세</th>
                                <th scope="col">봉사료</th>
                                <th scope="col">거래구분</th>
                                <th scope="col">사업자등록번호</th>
                                <th scope="col">회사코드</th>
                                <th scope="col">발급용도</th>
                                <th scope="col">신분확인</th>
                                <th scope="col">지출구분</th>
                                <th scope="col">취소사유</th>
                                <th scope="col">전송일자</th>
                                <th scope="col">처리내용</th>
                                <th scope="col">오류내역</th>
                            </tr>
                            </thead>
                        </table>
                        <!-- tbl scroll -->

                            <table class="tbl_list02 brd_none page_store03 "  style="width:2000px">
                                <caption>검색 목록</caption>
                                <colgroup>
                                    <col width="6%">
                                    <col width="6%">
                                    <col width="6%">
                                    <col width="7%">
                                    <col width="6%">
                                    <col width="6%">
                                    <col width="6%"> <!--거래구분-->
                                    <col width="8%">
                                    <col width="8%">
                                    <col width="5%">
                                    <col width="5%">
                                    <col width="5%">
                                    <col width="5%">
                                    <col width="5%">
                                    <col width="6%">
                                    <col width="10%">
                                </colgroup>
                                <tbody>
                                <template v-if="responseData != null && responseData.length > 0">
                                    <template v-for="datas in responseData">
                                    <tr>
                                        <td>{{datas.saleDate}}</td>
                                        <td>{{datas.perm}}</td>
                                        <td>{{datas.totamt}}</td>
                                        <td>{{datas.amt}}</td>
                                        <td>{{datas.vat}}</td>
                                        <td>{{datas.bong}}</td>
                                        <td>{{datas.geoguNm}}</td>
                                        <td>{{datas.saupId}}</td>
                                        <td>{{datas.subSaup}}</td>
                                        <td>{{datas.cultGbNm}}</td>
                                        <td>{{datas.comfirm}}</td>
                                        <td>지출구분?</td>
                                        <td>{{datas.canSayuNm}}</td>
                                        <td>{{datas.saleDate}}</td>
                                        <td>{{datas.trguNm}}</td>
                                        <td>{{datas.taxSend}}</td>
                                    </tr>
                                    </template>
                                </template>
                                <template v-else>
                                    <tr>
                                        <td colspan="17" style="text-align: center">데이터가 없습니다.</td>
                                    </tr>
                                </template>
                                </tbody>
                            </table>
                        </div>

                        <H2>오류내역</H2>

                        <table class="tbl_list02">
                            <colgroup>
                                <col width="10%">
                                <col width="15%">
                                <col width="15%">
                                <col width="15%">
                                <col width="10%">
                                <col width="10%">
                                <col width="10%">
                                <col width="7%">
                                <col width="8%">
                            </colgroup>
                            <thead>
                            <tr>
                                <th scope="col">오류발생일자</th>
                                <th scope="col">오류코드</th>
                                <th scope="col">승인번호</th>
                                <th scope="col">거래일자</th>
                                <th scope="col">거래일시</th>
                                <th scope="col">거래금액</th>
                                <th scope="col">사업자번호</th>
                                <th scope="col">회사코드</th>
                                <th scope="col">가맹점</th>
                            </tr>
                            </thead>
                        </table>
                        <!-- tbl scroll -->
                        <div class="tbl_scrollnew2">
                            <table class="tbl_list02 brd_none page_store03">
                                <caption>검색 목록</caption>
                                <colgroup>
                                    <col width="10%">
                                    <col width="15%">
                                    <col width="15%">
                                    <col width="15%">
                                    <col width="10%">
                                    <col width="10%">
                                    <col width="10%">
                                    <col width="7%">
                                    <col width="8%">
                                </colgroup>
                                <tbody>
                                <template v-if="responseDataError != null && responseDataError.length > 0">
                                    <template v-for="datas in responseDataError">
                                        <tr>
                                            <td>{{datas.sendDate}}</td>
                                            <td>{{datas.retcodeNm}}</td>
                                            <td>{{datas.perm}}</td>
                                            <td>{{datas.geodate}}</td>
                                            <td>{{datas.geodate}}</td>
                                            <td>{{datas.totamt}}</td>
                                            <td>{{datas.saupId}}</td>
                                            <td>{{datas.subSaup}}</td>
                                            <td>가맹점?</td>
                                        </tr>
                                    </template>
                                </template>
                                <template v-else>
                                    <tr>
                                        <td colspan="9" style="text-align: center">데이터가 없습니다.</td>
                                    </tr>
                                </template>
                                </tbody>
                            </table>
                        </div>
                        <!-- //tbl scroll -->

                    </div>
                    <!-- //tbl scroll box -->

                </div>
                <!-- //popup content -->
                <!-- bottom area -->
                <div class="bottom_area">
                    <!-- btn -->
                    <div class="btn_bot">
                        <button type="button" class="btn_b01 bg02" @click="closeAddr">취소</button>
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

    import {Component, Prop, Vue} from 'vue-property-decorator';
    import {CommonBoardService, CommonListService} from '../../../api/common.service';
    import VueSimpleSpinner from 'vue-simple-spinner/src/components/Spinner.vue';

    @Component({
        components: {
            errorModPopup, VueSimpleSpinner
        },
    })
    export default class errorModPopup extends Vue {
        @Prop() viewData !:any;
        responseData : any = [];
        responseDataError : any = [];
        loading :boolean= false;
        clientY : string = '';


        //돔생성전 호출자
        created() {
            this.clientY =  'top : ' +this.viewData.event.layerY+'px !important'
            console.log(this.viewData)
            console.log('top : ' +this.viewData.layerY+'px !important')
            this.searchView()
            this.searchError()
        }
        //돔렌더링완료시 진행
        mounted(){

        }

        closeAddr(){
            this.$emit('saupClose');
        }

        searchView() {
            this.loading = true;
            CommonBoardService.getListData('receipt-error/receipts/'+this.viewData.row.oriAprvPerm+'/'+this.viewData.row.oriSaleDate, null, null).then((response) => {
                    this.responseData = response.data;
                    this.loading = false;
                }
                , (error) => {
                    this.loading = false;
                }
            ).catch();
        }

        searchError() {
            this.loading = true;
            CommonBoardService.getListData('receipt-error/history/'+this.viewData.row.oriAprvPerm+'/'+this.viewData.row.oriSaleDate, null, null).then((response) => {
                    this.responseDataError = response.data;
                    this.loading = false;
                }
                , (error) => {
                    this.loading = false;
                }
            ).catch();
        }


        updated() {
            this.$nextTick(function () {
            });
            // data 값 변조하면됨 Y / N   1,2? 이런값들 변경시 필요함
        }

    }


</script>