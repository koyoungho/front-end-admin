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

    <div :class="tableOriginCss">
      <!-- tbl list01 -->

      <table :class="tableOriginCss2" v-on:change="windowSize">
        <caption></caption>
        <colgroup>
          <template v-for="columNames,index in dataGridDetail.dataGrid.columControl">
            <col v-bind:width="columNames.width">
          </template>
        </colgroup>
        <thead>
         <!--탑헤더 추가하기-->
        <template v-if="dataGridDetail.dataGrid.columTopHeader">
          <template v-for="topHeader in dataGridDetail.dataGrid.columTopHeader">
                <tr>
                    <template v-for="header in topHeader.level">
                      <template v-if="header.rows!=0">
                      <th :colspan="header.cols" :rowspan="header.rows">{{header.headerName}}</th>
                      </template>
                    </template>
                </tr>
          </template>
        </template>
         <!--헤더 Make 부분 -->
        <tr>
          <template v-for="columNames,index in dataGridDetail.dataGrid.columControl">
            <!-- top 헤더가 존재할경우 -->
            <template v-if="dataGridDetail.dataGrid.columTopHeader">

                  <template v-if="dataGridDetail.dataGrid.columControl[index].type==='checkBox'">
                    <th scope="col">
                      <template v-if="dataGridDetail.dataGrid.columControl[index].allCheck==true">
                        <span class="chk_box"><input type="checkbox" v-on:click="checkAlls(columNames.id,index)" v-model="dataGridDetail.dataGrid.columControl[index].checkVal"><label id=""><span class="blind">전체선택</span></label></span>
                      </template>
                      <template v-if="dataGridDetail.dataGrid.columControl[index].allCheck==''">
                      {{columNames.columName}}
                      </template>
                    </th>
                  </template>
                  <template v-else-if="dataGridDetail.dataGrid.columControl[index].type==='number'">
                      <template v-if="headerCheck(dataGridDetail.dataGrid.columControl[index].columName) !=true"><th>{{columNames.columName}}</th></template>
                  </template>
                  <template v-else-if="dataGridDetail.dataGrid.columControl[index].type==='text'">
                    <template v-if="headerCheck(dataGridDetail.dataGrid.columControl[index].columName) !=true"><th>{{columNames.columName}}</th></template>
                  </template>
            </template>
            <!-- top 헤더가 없을경우 -->
            <template v-if="!dataGridDetail.dataGrid.columTopHeader">
              <template v-if="dataGridDetail.dataGrid.columControl[index].type==='checkBox'">
                <th scope="col">
                  <template v-if="dataGridDetail.dataGrid.columControl[index].allCheck==true">
                    <span class="chk_box"><input type="checkbox" v-on:click="checkAlls(columNames.id,index)" v-model="dataGridDetail.dataGrid.columControl[index].checkVal"><label id=""><span class="blind">전체선택</span></label></span>
                  </template>
                  <template v-if="dataGridDetail.dataGrid.columControl[index].allCheck==''">
                    {{columNames.columName}}
                  </template>
                </th>
              </template>
              <template v-else-if="dataGridDetail.dataGrid.columControl[index].type==='number'">
                <th>{{columNames.columName}}</th>
              </template>
              <template v-else-if="dataGridDetail.dataGrid.columControl[index].type==='text'">
               <th>{{columNames.columName}}</th>
              </template>
            </template>
            </template>
        </tr>
        </thead>
        <tbody>
        <template v-if="listData.length > 0">
          <tr v-for="(datas,index) in listData" v-bind:class="rowColor(index,datas)" >
            <template v-for="(rows,key,indexs) in datas">
              <template v-if="dataGridDetail.dataGrid.columControl[indexs].type=='checkBox'">
                <td>
                  <span class="chk_box"><input type="checkbox"  :value="dataGridDetail.dataGrid.columControl[indexs].id+'@'+rows+'@'+index+'@'+dataGridDetail.dataGrid.columControl[indexs].returnKey" v-model="checkBoxDatas"><label for=""></label></span>
                </td>
              </template>
              <template v-if="dataGridDetail.dataGrid.columControl[indexs].type=='number'">
                <td>{{rows}}</td>
              </template>
              <template v-if="dataGridDetail.dataGrid.columControl[indexs].type=='text'">
                  <td v-on:click="rowView(datas,publicPageing,index,key)" v-bind:style="fontColor(indexs,rows)"><span v-bind:style="colColor(indexs)">{{rows}}</span></td>
              </template>
              <template v-if="dataGridDetail.dataGrid.columControl[indexs].type=='input'">
                <td  v-bind:style="fontColor(indexs,rows)"><span v-bind:style="colColor(indexs)"><input type="text" v-bind:value="rows"></span></td>
              </template>
            </template>
          </tr>
        </template>
        <template v-if="listData.length < 1">
          <tr>
              <template v-if="dataGridDetail.dataGrid.apiUrl == 'accounts'"> <!-- 계정 권한 관리 화면은 columControl에 hidden이 있기때문 totalColum 으로 함 -->
                <td v-bind:colspan="dataGridDetail.dataGrid.totalColum" class="no_data">조회된 내용이 없습니다.</td>
              </template>
              <template v-if="dataGridDetail.dataGrid.apiUrl != 'accounts'">
                <td v-bind:colspan="dataGridDetail.dataGrid.columControl.length" class="no_data">조회된 내용이 없습니다.</td>
              </template>
          </tr>
        </template>
        </tbody>
      </table>
    </div>
    <!-- //tbl list box -->
    <!-- btn tbl bot -->
    <template v-if="authButton"> <!--계정 권한 관리에서 사용-->
      <div class="btn_tbl_bot">
        <button type="button" id="" class="btn_m01 bg01" v-on:click="accountAuth">승인</button>
      </div>
    </template>

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
        tableOriginCss= this.dataGridDetail.dataGrid.tableClass==null ? 'tbl_scroll_box' :  this.dataGridDetail.dataGrid.tableClass
        tableOriginCss2= this.dataGridDetail.dataGrid.tableClass2==null ? 'tbl_list01 page_inquiry' :  this.dataGridDetail.dataGrid.tableClass2

        // 토탈합계
        mTotalCount: number = 0;
        mServiceCharge: number = 0;
        mSupplyValue: number = 0;
        mSurtax: number = 0;

        authButton: boolean = false; //승인버튼 보이기


        @Watch('listOnLoad') onChange() {
            this.getCommonListData();
        }
        @Watch('checkBoxDatas') onChangeCheckBox() { // 체크박스 선택시 및 데이터 전달하는곳
            let rowData :any=[]
            this.checkBoxDatas.filter(e=>{
                let dt1 = e.split('@')[0]
                let dt2 = e.split('@')[1]
                let dt3 = e.split('@')[2]
                let dt4 = e.split('@')[3]
                let dt4Key = "";
                let row = this.listOragin[dt3];
                rowData.push({key:dt1 , value : dt2 , withKey : row[dt4] })
            })
           this.$emit('checkBoxEvent', rowData)

            // 계정권한관리 화면이고, 계정권한관리 리스트에서 체크박스에 체크 건이 있고, 시스템관리자이거나 콜센터관리자이면 승인버튼 보임
            if(this.dataGridDetail.dataGrid.acntAuthMng == true && this.checkBoxDatas != null && this.checkBoxDatas.length > 0 && (sessionStorage.role == '0001' || sessionStorage.role == '0003')){
                this.authButton = true;
            }else{
                this.authButton = false;
            }
        }

        headerCheck(columName,index){  // 헤더 로우스가 존재할경우 그리지않는 체크헤더
            // alert(columName+'||'+ index)
            let result : boolean = false;
            if(this.dataGridDetail.dataGrid.columTopHeader[0].level.length < 1){
              return result
            }else{
              this.dataGridDetail.dataGrid.columTopHeader[0].level.filter((e)=>{
                      if(e.headerName == columName){
                          //로우체크
                          if(e.rows > 1){
                              result = true;
                          }
                          else{
                              result = false;
                          }
                      }
              })
              return result;
            }
        }

        checkAlls(id,indexs){  // 전체 체크박스선택
            if (!this.dataGridDetail.dataGrid.columControl[indexs].checkVal) {
                //중복된거있으면 뺸다
                let tempDelCheck :any[] = [];
                this.checkBoxDatas.filter((e)=>{
                    if(e.split('@')[0] !=this.dataGridDetail.dataGrid.columControl[indexs].id){
                        tempDelCheck.push(e);
                    }
                })
                this.checkBoxDatas = tempDelCheck;

                // 전체로우 추가
                this.listData.filter((e,index)=>{
                    Object.keys(e).forEach((s,count)=>{
                        if(indexs==count){
                            this.checkBoxDatas.push(this.dataGridDetail.dataGrid.columControl[indexs].id+'@'+e[s]+'@'+index+'@'+this.dataGridDetail.dataGrid.columControl[indexs].returnKey);
                        }
                    })
                })
                this.dataGridDetail.dataGrid.columControl[indexs].checkVal=true;
            }else{
                let tempDelCheck :any[] = [];
                this.checkBoxDatas.filter((e)=>{
                    if(e.split('@')[0] !=this.dataGridDetail.dataGrid.columControl[indexs].id){
                        tempDelCheck.push(e);
                    }
                })
                this.checkBoxDatas = tempDelCheck;
                this.dataGridDetail.dataGrid.columControl[indexs].checkVal=false;
            }

        }

        //돔생성전 호출자
        created() {
        }

        numberFormatCount(index){  // 넘버링시 전체값 받아서 변경하는값

            let nowNumber = 0;
            if(this.dataGridDetail.paging.totalRecords){
            let nowPage = Number(this.dataGridDetail.paging.currentPage)
            let nowTotal = Number(this.dataGridDetail.paging.totalRecords) ;
            let viewPageSize = Number(this.dataGridDetail.paging.viewPageSize)
             nowNumber = nowTotal-(nowPage-1) * viewPageSize-index
            }
            else{
                nowNumber = index+1
            }
            return nowNumber
        }

        rowColor(index) {  //로우전체색변경시  클래스 변경한다
            if (this.lineColumIndex != 10000) {
                if (this.listData[index][this.lineColumName] == this.dataGridDetail.dataGrid.columControl[this.lineColumIndex].lineValue) {
                    return "date_del"
                }
            }
        }
        fontColor(index,rows){  // 폰트컬러변경시사용
            if(rows == this.dataGridDetail.dataGrid.columControl[index].textValue){
                return this.dataGridDetail.dataGrid.columControl[index].fontColors
            }
        }
        colColor(index){  // 콜컬러변경
            return this.dataGridDetail.dataGrid.columControl[index].colColors
        }

        //돔렌더링완료시 진행
        mounted() {
            // 랜더링후 라인텍스트 색을바꿀때사용
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

                    let result : any = "";

                    if(response.data.data){  // api 값중에 형태가 data 를 빼서써야하는경우 와 그냥 그대로 쓰는경우 response.data.data 가 없으면 그냥 배열이 담긴것으로 판단한다
                        result = response.data;
                    }else{
                        result = response
                    }

                    this.listData = [];
                    this.checkBoxDatas=[];
                    // 토탈금액 인풋
                    if (this.dataGridDetail.dataGrid.mTotal == true) {
                        this.mTotalCount = result.extra.totalAmt;
                        this.mServiceCharge = result.extra.bong;
                        this.mSupplyValue = result.extra.amt;
                        this.mSurtax = result.extra.vat;
                    }

                    this.dataGridDetail.dataGrid.columControl.filter(e => { // 뿌릴헤더를 먼저 만들어준다
                            this.menuHeader[e.id] = e.id;
                    });

                    this.listOragin = result.data;

                    if(result.totalRecords){
                    this.totalCount = result.totalRecords;
                    }else{
                    this.totalCount = result.data.length
                    }

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
                            Object.keys(this.menuHeader).forEach((menuHeaderkey,index) => { // 헤더순서에 맞게 받은키값을돌리면서 해당데이터를 넣는다

                                if(this.dataGridDetail.dataGrid.columControl[index].type=='number'){ // 넘버링일경우 따로만들어서 컬럼값에 담는다
                                    numberObject[menuHeaderkey] = this.numberFormatCount(indexs)
                                }
                                else{
                                Object.keys(Objects).forEach((Objectskey,indexsss) => {
                                    if (menuHeaderkey == Objectskey) {
                                        if(this.dataGridDetail.dataGrid.columControl[index].type=='checkBox'){  // 체크박스일경우 현재데이터를 체크박스에 담아논다
                                            this.checkBoxDatas.push(this.dataGridDetail.dataGrid.columControl[index].id+'@'+Objects[Objectskey]+'@'+indexs+'@'+this.dataGridDetail.dataGrid.columControl[index].returnKey)
                                        }

                                        let option = this.dataGridDetail.dataGrid.columControl[index].options // 옵션에있는 문자열 데이터코드값이 Y,N ; 전송 , 미전송  같은 문자열치환할때 사용
                                        if(option){
                                            option.filter(e=>{
                                                if(e.value==Objects[Objectskey]){
                                                    numberObject[menuHeaderkey] = e.change;
                                                }
                                            })

                                        }else{
                                            numberObject[menuHeaderkey] = Objects[Objectskey];  // 치환하지않은 일반 TEXT 타입은 그대로 넣어준다
                                        }
                                    }
                                    else{ // 헤더가 체크박스일때   ID 가 신규일대 무조건 check_ 를 붙여서 만들어줘야한다
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


                    this.listData = [{num : 0 ,retCode:'test',retCodeNm:'test23',originPerm:'test3',originDate:'test4',perm:'test5',saleDate:'test6',totamt:'7',geodate:'8',sendDate:'9',saupId:'10'
                        ,subSaup:'11',shopNm:'12',reperm:'13',resaleDate:'14',fixDate:'15',rsnCode:'16',rstCode:'17'},
                        {num : 1 ,retCode:'test',retCodeNm:'test23',originPerm:'test3',originDate:'test4',perm:'test5',saleDate:'test6',totamt:'7',geodate:'8',sendDate:'9',saupId:'10'
                            ,subSaup:'11',shopNm:'12',reperm:'13',resaleDate:'14',fixDate:'15',rsnCode:'16',rstCode:'17'},
                        {num : 2 ,retCode:'test',retCodeNm:'test23',originPerm:'test3',originDate:'test4',perm:'test5',saleDate:'test6',totamt:'7',geodate:'8',sendDate:'9',saupId:'10'
                            ,subSaup:'11',shopNm:'12',reperm:'13',resaleDate:'14',fixDate:'15',rsnCode:'16',rstCode:'17'}]
                    this.$Progress.finish();
                }
                , (error) => {
                    this.$Progress.finish();
                }
            ).catch();
        }

        rowView(row, searchData, index, key) {  // 로우클릭시 검색데이터 로우열 전체 데이터를 이벤트로 전송한다
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

        //계정 권한 관리의 승인처리
        accountAuth() {
            let reqData : any = {};
            let arayData : any = [];
            if(this.checkBoxDatas != null && this.checkBoxDatas.length > 0){
                for(let i=0; i<this.checkBoxDatas.length; i++){
                    let sData = {};
                    let splitData = this.checkBoxDatas[i].split('@');
                    sData['id'] = splitData[1]; //id
                    sData['role'] = splitData[2]; //role
                    arayData.push(sData);
                }
                reqData['selectedId'] = arayData;
            }
            console.log('계정 권한 관리 승인 처리시 최종 parameter');
            console.log(reqData);
/*
            // api 데이터 호출
            CommonBoardService.getListDatas('accounts/approval', null, reqData).then((response) => {
                    let result: any = response.data;
                    //console.log(result)
                    if (result.code == '000') {
                        console.log('승인 처리 성공');
                        this.$emit('authCompl'); //승인처리 완료후 페이지 로딩
                    } else {
                        console.log('승인 처리 실패')
                    }
                }
                , (error) => {
                    console.log(error)
                }
            ).catch();
*/

        }
    }

</script>