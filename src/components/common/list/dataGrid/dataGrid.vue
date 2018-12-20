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
    <template v-if="dataGridDetail.dataGrid.mTotal">
    <div class="cash_total_box" >
      <dl class="cash_total">
        <dt>합계금액</dt>
        <dd>
          <input type="text" v-model="mTotalCount" value="5,000" class="input form_price" title="합계금액" readonly=""> 원
        </dd>
        <dt>봉사료</dt>
        <dd>
          <input type="text" v-model="mServiceCharge" class="input form_price" title="봉사료" readonly=""> 원
        </dd>
        <dt>공급가액</dt>
        <dd>
          <input type="text" v-model="mSupplyValue" class="input form_price" title="공급가액" readonly=""> 원
        </dd>
        <dt>부가세</dt>
        <dd>
          <input type="text" v-model="mSurtax" class="input form_price" title="부가세" readonly=""> 원
        </dd>
      </dl>
    </div>
    </template>

    <div class="tbl_scroll_box">
      <!-- tbl list01 -->

      <table class="tbl_list01 page_inquiry" v-on:change="windowSize">
        <caption></caption>
        <colgroup>
          <template v-for="columNames,index in dataGridDetail.dataGrid.columControl">
            <col v-bind:width="columNames.width">
          </template>
        </colgroup>
        <thead>
        <tr>

          <template v-for="columNames,index in dataGridDetail.dataGrid.columControl">
            <template v-if="dataGridDetail.dataGrid.columControl[index].type==='checkBox'">
              <th scope="col">
                <template v-if="dataGridDetail.dataGrid.columControl[index].allCheck==true">
                  <span class="chk_box"><input type="checkbox" @click="checkAlls(columNames.id,index)" v-model="dataGridDetail.dataGrid.columControl[index].checkVal"><label id=""><span class="blind">전체선택</span></label></span>
                </template>
                <template v-if="dataGridDetail.dataGrid.columControl[index].allCheck==''">
                {{columNames.columName}}
                </template>
              </th>
            </template>
            <template v-if="dataGridDetail.dataGrid.columControl[index].type==='number'">
             <th>{{columNames.columName}}</th>
            </template>
            <template v-if="dataGridDetail.dataGrid.columControl[index].type==='text'">
            <th>{{columNames.columName}}</th>
            </template>
          </template>

        </tr>
        </thead>
        <tbody>
        <template v-if="listData.length > 0" >
          <tr v-for="(datas,index) in listData" v-bind:class="rowColor(index,datas)" >
            <template v-for="(rows,key,indexs) in datas">
              <template v-if="dataGridDetail.dataGrid.columControl[indexs].type=='checkBox'">
                <td>
                  <span class="chk_box"><input type="checkbox"  :value="dataGridDetail.dataGrid.columControl[indexs].id+'@'+rows+'@'+index" v-model="checkBoxDatas"><label for=""></label></span>
                </td>
              </template>
              <template v-if="dataGridDetail.dataGrid.columControl[indexs].type=='number'">
                <td>{{rows}}</td>
              </template>
              <template v-if="dataGridDetail.dataGrid.columControl[indexs].type=='text'">
                  <td v-on:click="rowView(datas,publicPageing,index,key)" v-bind:style="fontColor(indexs,rows)"><span v-bind:style="colColor(indexs)">{{rows}}</span></td>
              </template>
            </template>
          </tr>
        </template>
        <template v-if="listData.length < 1">
          <tr>
            <td v-bind:colspan="dataGridDetail.dataGrid.columControl.length" class="no_data">조회된 내용이 없습니다.</td>
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

    @Component({
        components: {
            DataGrid
        }
    })
    export default class DataGrid extends Vue {
        @Prop() dataGridDetail  !: any;
        @Prop() listOnLoad !: boolean;
        gridData: any = this.dataGridDetail;
        listOragin: any = [];
        listData: any = [];
        totalCount: any = '0';
        $Progress: any;
        windowSize: any = '';
        publicPageing: any = '';
        menuHeader: any = {};
        bgColor : any = "";
        trColor : any = "";
        lineColumName : string="";
        lineColumIndex :  number = 10000;
        checkBoxDatas :any[]= [];
        selectAll : boolean = false;


        // 토탈합계
        mTotalCount: number = 0;
        mServiceCharge: number = 0;
        mSupplyValue: number = 0;
        mSurtax: number = 0;


        @Watch('listOnLoad') onChange() {
            this.getCommonListData();
        }
        @Watch('checkBoxDatas') onChangeCheckBox() {
            console.log(this.checkBoxDatas);
            this.$emit('checkBoxEvent', this.checkBoxDatas)
        }


        checkAlls(id,indexs){
            if (!this.dataGridDetail.dataGrid.columControl[indexs].checkVal) {
                this.listData.filter((e,index)=>{
                    Object.keys(e).forEach((s,count)=>{
                        if(indexs==count){
                            this.checkBoxDatas.push(id+'@'+e[s]);
                        }
                    })
                })
                this.dataGridDetail.dataGrid.columControl[indexs].checkVal=true;
            }else{
                let tempDelCheck :any[] = [];
                this.checkBoxDatas.filter((e)=>{
                     if(e.split('@')[0]!=id){
                         tempDelCheck.push(e);
                     }
                })
                this.checkBoxDatas = tempDelCheck;
                this.dataGridDetail.dataGrid.columControl[indexs].checkVal=false;
            }

        }
        // checkBoxList(key,rows){
        //     let id = rows+'@'+key
        //     if(this.checkBoxDatas.length < 1){
        //         this.checkBoxDatas.push(id)
        //     }else{
        //        if(this.checkBoxDatas.indexOf(id) > -1){ // 0 이면 존재한다
        //            this.checkBoxDatas.splice(this.checkBoxDatas.indexOf(id),1);
        //        }
        //        else{ // 아니면 없는거다
        //            this.checkBoxDatas.push(id)
        //        }
        //     }
        // }


        //돔생성전 호출자
        created() {
        }

        numberFormatCount(index){
            let nowPage = Number(this.dataGridDetail.paging.currentPage)
            let nowTotal = Number(this.dataGridDetail.paging.totalRecords) ;
            let viewPageSize = Number(this.dataGridDetail.paging.viewPageSize)
            let nowNumber = nowTotal-(nowPage-1) * viewPageSize-index
            return nowNumber
        }

        rowColor(index) {
            if (this.lineColumIndex != 10000) {
                if (this.listData[index][this.lineColumName] == this.dataGridDetail.dataGrid.columControl[this.lineColumIndex].lineValue) {
                    return "date_del"
                }
            }
        }
        fontColor(index,rows){
            if(rows == this.dataGridDetail.dataGrid.columControl[index].textValue){
                return this.dataGridDetail.dataGrid.columControl[index].fontColors
            }
        }
        colColor(index){
            return this.dataGridDetail.dataGrid.columControl[index].colColors
        }

        //돔렌더링완료시 진행
        mounted() {
            this.dataGridDetail.dataGrid.columControl.filter((e,index)=>{
                if(e.lineValue){
                    this.lineColumName = e.id;
                    this.lineColumIndex = index ;
                }
            })

            if (this.listOnLoad == true) {
                this.getCommonListData();
            }
            else {

            }
        }

        getCommonListData() {
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
                    this.listData = [];
                    this.checkBoxDatas=[];
                    // 토탈금액 인풋
                    if (this.dataGridDetail.dataGrid.mTotal == true) {
                        this.mTotalCount = result.extra.totalAmt;
                        this.mServiceCharge = result.extra.bong;
                        this.mSupplyValue = result.extra.amt;
                        this.mSurtax = result.extra.vat;
                    }

                    this.dataGridDetail.dataGrid.columControl.filter(e => {
                            if(e.type=='checkBox'){
                                this.menuHeader['check_'+e.id] = e.id;
                            }else{
                            this.menuHeader[e.id] = e.id;
                            }
                    });
                    this.listOragin = result.data;

                    this.totalCount = result.totalRecords;
                    this.pageSet(result.from, result.to, result.lastPage, result.perPage, result.totalRecords, result.viewPageSize);

                    if (result.data.length > 0) { // 데이터 키맵에 맞게 매핑하기
                        result.data.filter((e,indexs) => {
                            let Objects = {};
                            Object.keys(e).forEach((key) => {
                                if (this.menuHeader[key] == key) {
                                    Objects[key] = e[key];
                                }
                            });

                            let numberObject = {};
                            Object.keys(this.menuHeader).forEach((menuHeaderkey,index) => {
                                if(this.dataGridDetail.dataGrid.columControl[index].type=='number'){
                                    numberObject[menuHeaderkey] = this.numberFormatCount(indexs)
                                }
                                else{
                                Object.keys(Objects).forEach((Objectskey) => {
                                    if (menuHeaderkey == Objectskey) {
                                        let option = this.dataGridDetail.dataGrid.columControl[index].options // 옵션에있는 문자열 치환하기
                                        if(option){
                                            option.filter(e=>{
                                                if(e.value==Objectskey){
                                                    numberObject[menuHeaderkey] = e.change;
                                                }
                                                else{
                                                    numberObject[menuHeaderkey] = e.change;
                                                }
                                            })

                                        }else{
                                            numberObject[menuHeaderkey] = Objects[Objectskey];
                                        }
                                    }
                                    else{ // 헤더가 체크박스일때
                                        if(this.dataGridDetail.dataGrid.columControl[index].type=='checkBox'){
                                            let heder = menuHeaderkey.split('_')[1]
                                            if (heder == Objectskey) {
                                                numberObject[menuHeaderkey] = Objects[Objectskey];
                                            }
                                        }
                                    }
                                });
                                }
                            });
                            this.listData.push(numberObject);
                        });


                    }
                    else {

                    }

                    this.$Progress.finish();

                }
                , (error) => {
                    this.$Progress.finish();
                }
            ).catch();
        }

        rowView(row, searchData, index, key) {
            let rowData = this.listOragin[index];
            let publicDatas = {row: rowData, searchOption: searchData, key: key};
            this.$emit('rowClick', publicDatas);
        }

        pageSet(froms, to, lastPage, perPage, totalRecords, viewPageSize) {
            this.dataGridDetail.paging.from = Number(froms);
            this.dataGridDetail.paging.to = Number(to);
            this.dataGridDetail.paging.lastPage = Number(lastPage);
            this.dataGridDetail.paging.perPage = Number(perPage);
            this.dataGridDetail.paging.totalRecords = Number(totalRecords);
            this.dataGridDetail.paging.viewPageSize = Number(viewPageSize);
            this.$emit('dataToPaging', this.dataGridDetail.paging);
        }


        updated() {
            this.$nextTick(function () {

            });
            // data 값 변조하면됨 Y / N   1,2? 이런값들 변경시 필요함
        }
    }

</script>