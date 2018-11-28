<template>

  <div>

    <!-- tbl info top -->
    <div class="tbl_info_top">
      <vue-progress-bar></vue-progress-bar>
      <span class="total">총 <strong>{{totalCount}} </strong>건</span>
    </div>

    <!-- tbl list box -->

    <div class="tbl_list_box">
      <!-- tbl list01 -->

      <table class="tbl_list01 mb_list01" v-on:change="windowSize">
        <caption>계정 목록</caption>
        <colgroup>
          <col v-for="columNames in dataGridDetail.dataGrid.columControl" v-bind:width="columNames.width">
        </colgroup>
        <thead>
        <tr>
          <th scope="col" v-for="columNames in dataGridDetail.dataGrid.columControl">{{columNames.columName}}</th>
        </tr>
        </thead>
        <tbody>
        <template v-if="listData.length > 1">
          <tr v-for="datas in listData">
            <td v-for="rows in datas" v-on:click="rowView(datas)">{{rows}}</td>
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
    import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
    import {CommonBoardService} from '../../../../api/common.service';

    @Component({
        components: {
            DataGrid
        }
    })
    export default class DataGrid extends Vue {
        @Prop() dataGridDetail  !: any;
        gridData: any = this.dataGridDetail;
        listOragin :any = [];
        listData: any = [];
        totalCount: any = '';
        $Progress: any;
        windowSize : any = "";


        //돔생성전 호출자
        created() {
        }

        //돔렌더링완료시 진행
        mounted() {
            this.getCommonListData();

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

            });


            // 로딩바
            this.$Progress.start();

            // api 데이터 호출
            CommonBoardService.getListDatas(this.dataGridDetail.dataGrid.apiUrl, null, searchData).then((response) => {
                    let result: any = response.data;
                    let menuHeader: any = {};

                    this.dataGridDetail.dataGrid.columControl.filter(e => {
                        menuHeader[e.id] = e.id;
                    });
                    this.listOragin = result.data;

                    if (result.data.length > 0)
                        result.data.filter(e => {
                            let Objects: any = {};
                            Object.keys(e).forEach(key => {
                                if (menuHeader[key] == key) {
                                     Objects[key]=e[key]
                                }
                            });
                            this.listData.push(Objects)

                            console.log(this.listOragin)
                            console.log(Objects)
                        });
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

        rowView(row){
                this.listOragin.filter(data=>{
                    if(data.id==row.id){
                        row = data;
                    }
                })
            this.$emit('rowClick' , row);
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