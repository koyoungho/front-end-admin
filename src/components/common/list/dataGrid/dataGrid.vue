<template>

  <div class="cont_mobile">

    <!-- tbl info top -->
    <div class="tbl_info_top">
      <vue-progress-bar></vue-progress-bar>
      <span class="total">총 <strong>{{totalCount}} </strong>건</span>
    </div>
    <!-- 20181112 수정 추가 -->
    <!-- grid total box -->
      <!-- 20181112 수정 추가 -->
      <div class="cash_total_box" v-if="dataGridDetail.dataGrid.mTotal">
        <dl class="cash_total">
          <dt>합계금액</dt>
          <dd>
            <input type="text"  v-model="mTotalCount" value="5,000" class="input form_price" title="합계금액" readonly=""> 원
          </dd>
          <dt>봉사료</dt>
          <dd>
            <input type="text"  v-model="mServiceCharge" class="input form_price" title="봉사료" readonly=""> 원
          </dd>
          <dt>공급가액</dt>
          <dd>
            <input type="text"  v-model="mSupplyValue" class="input form_price" title="공급가액" readonly=""> 원
          </dd>
          <dt>부가세</dt>
          <dd>
            <input type="text"  v-model="mSurtax" class="input form_price" title="부가세" readonly=""> 원
          </dd>
        </dl>
      </div>

     <div class="tbl_scroll_box">
    <!-- tbl list01 -->

      <table class="tbl_list01 page_inquiry" v-on:change="windowSize">
        <caption></caption>
        <colgroup>
          <template v-for="columNames in dataGridDetail.dataGrid.columControl">
            <col  v-bind:width="columNames.width">
          </template>
        </colgroup>
        <thead>
        <tr>
          <template v-for="columNames in dataGridDetail.dataGrid.columControl">
            <th >{{columNames.columName}}</th>
          </template>

        </tr>
        </thead>
        <tbody>
        <template v-if="listData.length > 0">
          <tr v-for="datas in listData">
            <template v-for="rows in datas">
            <td  v-on:click="rowView(datas,publicPageing)">{{rows}}</td>
            </template>
          </tr>
        </template>
        <template v-if="listData.length < 1">
          <tr>
            <td v-bind:colspan="dataGridDetail.dataGrid.totalColum" class="no_data">조회된 내용이 없습니다.</td>
          </tr>
        </template>
        </tbody>
      </table>

    </div>
    <!-- //tbl list box -->
  </div>
</template>


<script lang="ts">
    import {ListData} from '@/model/list';
    import {format} from 'date-fns';
    import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
    import {CommonBoardService} from '../../../../api/common.service';
    import moment from 'moment'

    @Component({
        components: {
            DataGrid
        }
    })
    export default class DataGrid extends Vue {
        @Prop() dataGridDetail  !: any;
        @Prop() listOnLoad !: boolean;
        gridData: any = this.dataGridDetail;
        listOragin :any = [];
        listData: any = [];
        totalCount: any = '0';
        $Progress: any;
        windowSize : any = "";
        publicPageing  : any = "";

        // 토탈합계
        mTotalCount : number = 0;
        mServiceCharge : number = 0;
        mSupplyValue : number = 0;
        mSurtax : number = 0;


        @Watch('listOnLoad') onChange(){
                this.getCommonListData();
        }
        //돔생성전 호출자
        created() {
            if(this.listOnLoad==true){
                this.getCommonListData();
            }
            else{

            }
        }

        //돔렌더링완료시 진행
        mounted() {

        }

        getCommonListData() {
            this.listData = [];
            // 토탈페이지 및 페이징관련 데이터는 다시 페이지 오브젝트에 넣어야한다.
            // 넣어진 페이지 데이터에 의해 페이징 페이지 생성 이벤트는 페이지번호 옴겨와야한다
            // 검색데이터
            let pagingData = this.dataGridDetail.paging;
            let searchData: any = {};

            // 검색조건 객체생성
            this.dataGridDetail.search.filter(e => {
                if (e.type == 'date') {  //날짜
                    searchData['searchStartDate'] = e.searchStartDate;
                    searchData['searchEndDate'] = e.searchEndDate;
                } else if (e.type == 'select') {  //셀렉트박스
                    if (e.value != '') {
                        searchData[e.id] = e.value;
                    }
                } else if (e.type == 'check') {  //체크박스
                    e.option.filter(s => {
                        if (s.value == true) {
                            searchData[s.id] = s.value;
                        }
                    });
                }
                else { // 그외 인풋 라디오
                    if (e.value != '') {
                        searchData[e.id] = e.value;
                    }
                }

                // 페이징요청건
                searchData['currentPage'] = this.dataGridDetail.paging.currentPage;
                searchData['perPage'] = this.dataGridDetail.paging.perPage;
                searchData['viewPageSize'] = this.dataGridDetail.paging.viewPageSize;

                this.publicPageing = searchData;
            });

            // 로딩바
            this.$Progress.start();
            // api 데이터 호출
            CommonBoardService.getListDatas(this.dataGridDetail.dataGrid.apiUrl, null, searchData).then((response) => {
                    let result: any = response.data;
                    let menuHeader: any = {};

                    // 토탈금액 인풋
                    if(this.dataGridDetail.dataGrid.mTotal==true){
                    this.mTotalCount =  result.extra.totalAmt
                    this.mServiceCharge = result.extra.bong
                    this.mSupplyValue = result.extra.amt
                    this.mSurtax  = result.extra.vat;
                    }

                    this.dataGridDetail.dataGrid.columControl.filter(e => {
                        menuHeader[e.id] = e.id;
                    });

                    this.listOragin = result.data;

                    if (result.data.length > 0) {
                        result.data.filter(e => { // 받은데이터 돌리면서
                            let Objects: any = {};
                            Object.keys(e).forEach((key) => {
                                if (menuHeader[key] == key) {
                                    menuHeader[key] = e[key]
                                }
                            });
                            this.listData.push(menuHeader);
                        });
                    }
                    else {

                    }
                    this.totalCount = result.totalRecords;
                    this.pageSet(result.from, result.to, result.lastPage, result.perPage, result.totalRecords, result.viewPageSize);
                    this.$Progress.finish();

                }
                , (error) => {
                    this.$Progress.finish();
                }
            ).catch();
        }

        rowView(row,searchData){
                this.listOragin.filter(data=>{
                    if(data.id==row.id){
                        row = data;
                    }
                })
            let publicDatas ={ row : row , searchOption : searchData };
            this.$emit('rowClick' , publicDatas );
        }

        pageSet(froms, to, lastPage, perPage, totalRecords, viewPageSize) {
            this.dataGridDetail.paging.from = froms;
            this.dataGridDetail.paging.to = to;
            this.dataGridDetail.paging.lastPage = lastPage;
            this.dataGridDetail.paging.perPage = perPage;
            this.dataGridDetail.paging.totalRecords = totalRecords;
            this.dataGridDetail.paging.viewPageSize = viewPageSize;
            this.$emit('dataToPaging', this.dataGridDetail.paging);
        }



        updated() {
            this.$nextTick(function () {
            });
            // data 값 변조하면됨 Y / N   1,2? 이런값들 변경시 필요함
        }
    }

</script>