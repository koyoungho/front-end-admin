<template>

  <div class="cont_mobile">

    <!-- tbl info top -->
    <div class="tbl_info_top">
      <div v-show="loading">
        <!--<ClipLoader class="custom-class" :loading="loading" :size="35" :sizeUnit="`px`"  :color='`#D0021B`'></ClipLoader>-->
          <vue-simple-spinner size="medium" line-fg-color="#D0021B" message="loading..." />
      </div>
      <!--<vue-progress-bar></vue-progress-bar>-->
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
        <!-- content goes here -->
      <table :class="tableOriginCss2" >
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
                  <template v-else-if="dataGridDetail.dataGrid.columControl[index].type==='input'">
                    <template v-if="headerCheck(dataGridDetail.dataGrid.columControl[index].columName) !=true"><th>{{columNames.columName}}</th></template>
                  </template>
              <template v-else-if="dataGridDetail.dataGrid.columControl[index].type==='select'">
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
              <template v-else-if="dataGridDetail.dataGrid.columControl[index].type==='money'">
                <th>{{columNames.columName}}</th>
              </template>
              <template v-else-if="dataGridDetail.dataGrid.columControl[index].type==='date'">
                <th>{{columNames.columName}}</th>
              </template>
              <template v-else-if="dataGridDetail.dataGrid.columControl[index].type==='text'">
               <th>{{columNames.columName}}</th>
              </template>
              <template v-else-if="dataGridDetail.dataGrid.columControl[index].type==='input'">
                <th>{{columNames.columName}}</th>
              </template>
              <template v-else-if="dataGridDetail.dataGrid.columControl[index].type==='select'">
                <th>{{columNames.columName}}</th>
              </template>
            </template>
            </template>
        </tr>
        </thead>
        <tbody>
        <template v-if="listData.length > 0">
          <tr v-for="(datas,index) in listData" v-bind:class="rowColor(index,datas)" :id="index" >
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
                  <template v-if="dataGridDetail.dataGrid.columControl[indexs].imageUse">
                    <td v-on:click="rowView(datas,publicPageing,index,key)" v-bind:style="fontColor(indexs,rows)">
                      <template v-if="listData[index].importantYn == 'Y'"> <i class="icon notice">공지</i></template>
                      <span v-bind:style="colColor(indexs)">{{rows}} </span>
                      <i class="icon new" v-if="listData[index].newYn == 'Y'">new</i>
                    </td>
                  </template>
                  <template v-if="!dataGridDetail.dataGrid.columControl[indexs].imageUse">
                    <td v-on:click="rowView(datas,publicPageing,index,key)" v-bind:style="fontColor(indexs,rows)"><span v-bind:style="colColor(indexs)">{{rows}}</span></td>
                  </template>

              </template>
              <!--주의 인풋박스는 공용보다 하나의 별개추가된 부분입니다-->
              <template v-if="dataGridDetail.dataGrid.columControl[indexs].type=='input'" >
                <td><input type="text"  class="input form_w100"  v-model="listData[index][dataGridDetail.dataGrid.columControl[indexs].id]" @input="dataVal(index,indexs,$event)" :aria-disabled="disableVal(index)" ></td>
              </template>
              <!--주의 셀렉트박스는 공용보다 하나의 별개추가된 부분입니다-->
              <template v-if="dataGridDetail.dataGrid.columControl[indexs].type=='select'">
                <td>
                  <template v-if="dataGridDetail.dataGrid.columControl[indexs].selectList=='1'">
                    <select class="select form_w100" v-model="listData[index].rsnCode" @change="dataVal(index,indexs)" :aria-disabled="disableVal(index)">
                      <option value="null">선택</option>
                      <option v-for="commonList1 in dataGridDetail.dataGrid.commonSelectListOne"  v-bind:value="commonList1.code">{{commonList1.codeNm}}</option>
                    </select>
                  </template>
                  <template v-if="dataGridDetail.dataGrid.columControl[indexs].selectList=='2'">
                    <select class="select form_w100" v-model="listData[index].rstCode" @change="dataVal(index,indexs)">
                      <option value="null">선택</option>
                      <option v-for="commonList2 in dataGridDetail.dataGrid.commonSelectListTwo"  v-bind:value="commonList2.code">{{commonList2.codeNm}}</option>
                    </select>
                  </template>
              </td>
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
    import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
    import {CommonBoardService} from '../../../../api/common.service';
    import VueSimpleSpinner from 'vue-simple-spinner/src/components/Spinner.vue';
    import moment from 'moment'


    @Component({
        components: {
            DataGrid,
            VueSimpleSpinner,
        }
    })
    export default class DataGrid extends Vue {
        @Prop() dataGridDetail  !: any;
        @Prop() listOnLoad !: boolean;
        gridData: any = this.dataGridDetail;  // 전달받은 list 데이터
        listOragin: any = [];  // 오리지널데이터
        listData: any = [];    // 실제 가공해서 뿌리는데이터
        totalCount: any = '0';  // 리스트 전체 카운트
        $Progress: any;  // 프로그래스바
        windowSize: any = '';  // 윈도우 사이즈 체크
        publicPageing: any = '';  // 페이징
        menuHeader: any = {};  // 메뉴헤더생성
        bgColor : any = ""; // 배경색
        trColor : any = ""; // tr 컬러
        lineColumName : string="";
        lineColumIndex :  number = 10000;  // 라인컬러 인덱스
        checkBoxDatas :any[]= [];  // 체크박스 체크데이터리스트
        selectAll : boolean = false; // 전체선택옵션
        tableOriginCss= this.dataGridDetail.dataGrid.tableClass==null ? 'tbl_scroll_box' :  this.dataGridDetail.dataGrid.tableClass  // 테이블 스크롤 없는것
        tableOriginCss2= this.dataGridDetail.dataGrid.tableClass2==null ? 'tbl_list01 page_inquiry' :  this.dataGridDetail.dataGrid.tableClass2 // 테이블 스크롤 있는것

        // 토탈합계
        mTotalCount: number = 0;
        mServiceCharge: number = 0;
        mSupplyValue: number = 0;
        mSurtax: number = 0;

        authButton: boolean = false; //승인버튼 보이기
        //인풋 벨리데이션 체크
        styleCss : string = "";
        inputString : string = "";
        lineCheckOk : boolean = true;
        dataStatus : string = '';
        loading :boolean= false;

        //오류내역용 변수
        innerFixYn : string ='';
        taxfixYn  : string ='';

        @Watch('listOnLoad') onChange() {
            this.getCommonListData();
        }
        @Watch('dataGridDetail') onChange2() {
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

        disableVal(index){
            return this.listOragin[index].innerFixYn =='Y' ? true : false
        }

        dataVal(listIndex, columIndex,$event){
            let trObject : any = document.getElementById(listIndex)
            let nowLineOk :boolean = true;
            console.log(this.dataGridDetail.dataGrid.columControl[columIndex].id)

            if(this.dataGridDetail.dataGrid.columControl[columIndex].id=='fixPerm') {
                if (this.listData[listIndex].fixPerm.length != 9) {
                    if(this.listData[listIndex].fixPerm.length < 1){
                        $event.target.style=''
                    }
                    else{
                        nowLineOk = false;
                    $event.target.style='background:red'
                        trObject.setAttribute('style','background:red')
                    }
                }
                else{
                    $event.target.style=''
                }
            }
            else if(this.dataGridDetail.dataGrid.columControl[columIndex].id=='fixDate'){
                if(this.listData[listIndex].fixDate.length != 8) {
                    if(this.listData[listIndex].fixDate.length < 1){
                        $event.target.style=''
                    }
                    else{
                        nowLineOk = false;
                        $event.target.style='background:red'
                        trObject.setAttribute('style','background:red')
                    }
                }
                else{
                    $event.target.style=''
                }
            }
            else if(this.dataGridDetail.dataGrid.columControl[columIndex].id=='fixSaleDate'){
                if(this.listData[listIndex].fixSaleDate.length != 8) {
                    if(this.listData[listIndex].fixSaleDate.length < 1){
                        $event.target.style=''
                    }
                    else{
                        nowLineOk = false;
                        $event.target.style='background:red'
                    }
                }else{
                    $event.target.style=''
                }
            }
            else if(this.dataGridDetail.dataGrid.columControl[columIndex].id=='rsnCode'){
                console.log('rsnCode || ' + this.listData[listIndex].rsnCode )
                if(this.listData[listIndex].rsnCode !='null'){
                    trObject.setAttribute('style','')
                }else{
                    nowLineOk = false;
                }
            }
            else if(this.dataGridDetail.dataGrid.columControl[columIndex].id=='rstCode') {
                console.log('rsnCode || ' + this.listData[listIndex].rstCode )
                if(this.listData[listIndex].rstCode !='null'){
                    trObject.setAttribute('style','')
                }else{
                    nowLineOk = false;
                    trObject.setAttribute('style','background:red')
                }
            }

            if(this.listData[listIndex].fixPerm && this.listData[listIndex].fixDate
                && this.listData[listIndex].fixSaleDate && this.listData[listIndex].rsnCode && this.listData[listIndex].rstCode){
                if(nowLineOk){
                    this.lineCheckOk = true;
                trObject.setAttribute('style','')
                }
                else{
                    this.lineCheckOk = false;
                }
                console.log('다입력됨')
            }
            else if( (this.listData[listIndex].fixPerm =='' || this.listData[listIndex].fixPerm ==null) && (this.listData[listIndex].fixDate ==''  || this.listData[listIndex].fixDate ==null)
                && (this.listData[listIndex].fixSaleDate=='' || this.listData[listIndex].fixSaleDate==null)
                && (this.listData[listIndex].rsnCode=='null' ||  this.listData[listIndex].rsnCode==null) && (this.listData[listIndex].rstCode=='null' || this.listData[listIndex].rstCode==null)){
                this.lineCheckOk = true;
                trObject.setAttribute('style','')
            }
            else{
                this.lineCheckOk = false;
                trObject.setAttribute('style','background:red')
                console.log('다입력안됨')
            }
        }

        checkAlls(id,indexs){  // 전체 체크박스선택
            if (!this.dataGridDetail.dataGrid.columControl[indexs].checkVal) {
                    // 중복제거
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
            }else{  // 체크박스내용삭제
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
            let viewPageSize = Number(this.dataGridDetail.paging.perPage)
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
                // 오류내역때문에 추가
                if(this.listOragin[index].innerYn=='Y'){
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

            if (this.listOnLoad == true) {  //  바로 조회 값
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

            // let routerName = this.$route.name+''
            // let searchBox  = JSON.parse();
            //
            let searchData: any = {};
            // if(searchBox.length > 0){
            //     this.dataGridDetail.search = searchBox
            // }

            // 검색조건 객체생성
            this.dataGridDetail.search.filter(e => {
                if (e.type == 'date' ) {  //날짜
                        searchData['searchStartDate'] = e.searchStartDate
                        searchData['searchEndDate'] =  e.searchEndDate

                }else if (e.type == 'date2') {  //날짜
                    if(e.searchStartDate.length>0) {
                        if (e.dateType == 'date') {
                            searchData['searchStartDate'] = moment(e.searchStartDate[0]).format('YYYYMMDD')
                            searchData['searchEndDate'] = moment(e.searchStartDate[1]).format('YYYYMMDD')
                        } else if (e.dateType == 'month') {
                            searchData['searchStartDate'] = moment(e.searchStartDate[0]).format('YYYYMM')
                            searchData['searchEndDate'] = moment(e.searchStartDate[1]).format('YYYYMM')
                        } else {
                            searchData['searchStartDate'] = moment(e.searchStartDate[0]).format('YYYYMMDD')
                            searchData['searchEndDate'] = moment(e.searchStartDate[1]).format('YYYYMMDD')
                        }
                    }

                }else if (e.type == 'date3') {  //날짜
                    if(e.calenderCount==1){ //1개짜리일때
                        if(e.searchStartDate) {
                            if (e.dateType == 'date') {
                                searchData[e.id] = moment(e.searchStartDate).format('YYYYMMDD')
                            } else if (e.dateType == 'month') {
                                searchData[e.id] = moment(e.searchStartDate).format('YYYYMM')
                            } else {
                                searchData[e.id] = moment(e.searchStartDate).format('YYYYMMDD')
                            }
                        }
                    }else{ //2개짜리일때
                        if(e.searchStartDate.length > 0 ){
                        if(e.dateType == 'date'){
                            searchData[e.id] = moment(e.searchStartDate[0]).format('YYYYMMDD')
                            searchData[e.id2] =  moment(e.searchStartDate[1]).format('YYYYMMDD')
                        }else if(e.dateType == 'month'){
                            searchData[e.id] =  moment(e.searchStartDate[0]).format('YYYYMM')
                            searchData[e.id2] = moment(e.searchStartDate[1]).format('YYYYMM')
                        }else{
                            searchData[e.id] =  moment(e.searchStartDate[0]).format('YYYYMMDD')
                            searchData[e.id2] = moment(e.searchStartDate[1]).format('YYYYMMDD')
                        }
                        }
                    }
                }

                else if (e.type == 'select') {  //셀렉트박스
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
            // this.$Progress.start();
            this.loading = true;
            // api 데이터 호출
            CommonBoardService.getListDatas(this.dataGridDetail.dataGrid.apiUrl, null, searchData).then((response) => {
                console.log(response)
                    let result : any = '';

                    if(response.data.data) {  // api 값중에 형태가 data 를 빼서써야하는경우 와 그냥 그대로 쓰는경우 response.data.data 가 없으면 그냥 배열이 담긴것으로 판단한다
                        result = response.data;
                    }else{
                        result = response;

                    }

                    this.listData = [];
                    this.checkBoxDatas=[];
                    // 토탈금액 인풋
                    if (this.dataGridDetail.dataGrid.mTotal == true) {
                        this.mTotalCount = (result.extra.totalAmt).toLocaleString();
                        this.mServiceCharge = (result.extra.bong).toLocaleString();
                        this.mSupplyValue = (result.extra.amt).toLocaleString();
                        this.mSurtax = (result.extra.vat).toLocaleString();
                    }

                    this.dataGridDetail.dataGrid.columControl.filter(e => { // 헤더를 먼저 만들어준다
                        this.menuHeader[e.id] = e.id;
                    });

                    // 오류전문때문에 추가한부분
                    if(this.dataGridDetail.dataGrid.commonApiOneUse){
                        CommonBoardService.getListDatas(this.dataGridDetail.dataGrid.commonApiOne,null,null).then(result=>{
                            if(result.status==200){
                            this.dataGridDetail.dataGrid.commonSelectListOne = result.data
                            }
                        })
                    }
                    if(this.dataGridDetail.dataGrid.commonApiTwoUse){
                        CommonBoardService.getListDatas(this.dataGridDetail.dataGrid.commonApiTwo,null,null).then(result=>{
                            if(result.status==200){
                                this.dataGridDetail.dataGrid.commonSelectListTwo = result.data
                            }
                        })
                    }


                    this.listOragin = result.data;

                    if(result.totalRecords){
                    this.totalCount = result.totalRecords;
                    }else{
                    this.totalCount = result.data.length
                    }

                    this.pageSet(result.from, result.to, result.lastPage, result.perPage, result.totalRecords, result.viewPageSize);

                    let nowData :any = []


                    if(result.data){
                        nowData = result.data;
                    }else{
                        nowData = result
                    }

                    if (nowData.length > 0) { // 데이터 키맵에 맞게 매핑하기
                        nowData.filter((e,indexs) => {
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
                                    if(indexsss==0){
                                        //오류내역관리때문에 추가
                                        if(Objectskey =='innerFixYn'){
                                             this.innerFixYn=Objects[Objectskey]
                                        }else if(Objectskey =='taxfixYn'){
                                            this.taxfixYn=Objects[Objectskey]
                                        }
                                    }

                                    if (menuHeaderkey == Objectskey) {
                                        if(this.dataGridDetail.dataGrid.columControl[index].type=='checkBox'){  // 체크박스일경우 현재데이터를 체크박스에 담아논다
                                            this.checkBoxDatas.push(this.dataGridDetail.dataGrid.columControl[index].id+'@'+Objects[Objectskey]+'@'+indexs+'@'+this.dataGridDetail.dataGrid.columControl[index].returnKey)
                                        }
                                        let option = this.dataGridDetail.dataGrid.columControl[index].options // 옵션에있는 문자열 데이터코드값이 Y,N ; 전송 , 미전송  같은 문자열치환할때 사용
                                        let selectOption = this.dataGridDetail.dataGrid.columControl[index].selectOptionApi // 옵션데이터를 받아와야하는경우

                                        if(option){ // 문자열 치환옵션  사용시
                                            option.filter(e=>{
                                                if(e.value==Objects[Objectskey]){
                                                    numberObject[menuHeaderkey] = e.change;
                                                }
                                            })
                                        }
                                        else{ // 데이터가 세렉트박스일경우
                                            numberObject[menuHeaderkey] = Objects[Objectskey];
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
                            // 예외 컬러처리에 필요한 로우데이터 생성
                            this.listData.push(numberObject);
                        });
                    }
                    else {

                    }
                    this.loading = false;
                    // this.$Progress.finish();
                }
                , (error) => {
                    this.loading = false;
                    // this.$Progress.finish();
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

        getListData(){
            this.$emit('listData', this.listData)
        }
    }

</script>