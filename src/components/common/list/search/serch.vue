<template>
  <div class="cont_mobile">
    <!--<resize-observer @notify="handleResize"/>-->
    <!-- tbl search box -->
    <div v-bind:class="searchStyle" v-if="searchItem.length > 0">
      <!--{{searchItemDetail}}-->
      <ul v-bind:class="searchStyle2">
        <template v-for="item,index in searchItem">

          <template v-if="item.type=='date2'" >
            <li :class="item.class">
              <label for="aa">{{item.title}}</label>
              <template v-if="item.calenderCount==1">
                <span class="form_cal" >
                <date-picker v-model="item.searchStartDate"  :lang="lang" :type="item.dateType"
                             :first-day-of-week="1"  :format="item.default" :width="item.width"  confirm></date-picker>
                </span>
              </template>
              <template v-else="item.calenderCount==2">
                <span class="form_cal" @click="setDate(index)">
                <date-picker v-model="item.searchStartDate"  :lang="lang" :type="item.dateType" :shortcuts = shortcuts
                             :first-day-of-week="1"   range :format="item.default" :width="item.width"  confirm></date-picker>
                </span>
              </template>
            </li>
            <template v-if="item.liNull">
            <li :class="item.class" style=height:50px><label for="aa"></label></li>
            </template>
          </template>

          <template v-if="item.type=='date3'" >
            <li :class="item.class">
              <label for="aa">{{item.title}}</label>
              <template v-if="item.calenderCount==1">
                <span class="form_cal">
                <date-picker v-model="item.searchStartDate" v-on:change="dateChangeEvent"  :lang="lang" :type="item.dateType"
                             :first-day-of-week="1"   :format="item.default" :width="item.width"  confirm></date-picker>
                </span>
              </template>
              <template v-else="item.calenderCount==2">
                <span class="form_cal">
                <date-picker v-model="item.searchStartDate"  :lang="lang" :type="item.dateType" :shortcuts = shortcuts
                             :first-day-of-week="1"  range :format="item.default" :width="item.width"  confirm></date-picker>
                </span>
              </template>
            </li>
            <template v-if="item.liNull">
              <li :class="item.class" style=height:50px><label for="aa"></label></li>
            </template>
          </template>

          <template v-if="item.type=='linull'" >
            <li :class="item.class" style=height:50px><label for="aa"></label></li>
          </template>

          <template v-if="item.type=='input'">
            <li :class="item.class">
              <template v-if="item.title !=''"><label for="aa">{{item.title}}</label></template>
              <template v-if="item.title ==''"><input type="text"  v-model="item.value"   class="input sch_appuser"></template>
            </li>
            <template v-if="item.liNull">
              <li :class="item.class" style=height:50px><label for="aa"></label></li>
            </template>
          </template>

          <template v-if="item.type=='input2'">
            <li :class="item.class">
              <label for="aa">{{item.title}}</label>
              <input type="text"  v-model="item.value"   class="input sch_appnum"  :title="item.title"  :placeholder="item.placeholder">
            </li>
            <template v-if="item.liNull">
              <li :class="item.class" style=height:50px><label for="aa"></label></li>
            </template>
          </template>
          <template v-if="item.type=='select'">
            <li :class="item.class">
              <label for="aa">{{item.title}}</label>
              <select v-model="item.value"  class="select form_w50" v-bind:title="item.title">
                <option value="">선택</option>
                <option v-for="tt in item.option" :value="tt.value" >{{tt.name}}</option>
              </select>
            </li>
            <template v-if="item.liNull">
              <li :class="item.class" style=height:50px><label for="aa"></label></li>
            </template>
          </template>
          <template v-if="item.type=='select2'">
            <li :class="item.class">

              <label for="aa">{{item.title}}</label>
              <!--<template v-if="item.id=='onlineYn'">-->
              <!--<select v-model="item.value"  class="select form_w50" title="발급용도 선택" :onclick="eventClick(item.value)">-->
                <!--<option v-for="tt in item.option" :value="tt.value" >{{tt.name}}</option>-->
              <!--</select>-->
              <!--</template>-->
              <!--<template v-else>-->
                <select v-model="item.value"  class="select form_w50" v-bind:title="item.title">
                  <option v-for="tt in item.option" :value="tt.value" >{{tt.name}}</option>
                </select>
              <!--</template>-->

            </li>
            <template v-if="item.liNull">
              <li :class="item.class" style=height:50px><label for="aa"></label></li>
            </template>
          </template>
          <template v-if="item.type=='selectObjectSearchList'">
            <li :class="item.class">
              <label for="aa">{{item.title}}</label>
              <!--<select v-model="item.value"  class="select form_w50" title="발급용도 선택">-->
                <!--<option v-for="tt in item.option" :value="tt.value" >{{tt.name}}</option>-->
              <!--</select>-->
              <model-list-select :list="item.option"
                                 v-model="item.value"
                                 option-value="code"
                                 option-text="name"
                                 style="height :15px; width:200px ; float: right ; bottom: 3px"></model-list-select >
            </li>
            <template v-if="item.liNull">
              <li :class="item.class" style=height:50px><label for="aa"></label></li>
            </template>
          </template>
          <template v-if="item.type=='selectObject'">
            <li :class="item.class">
              <label for="aa">{{item.title}}</label>
              <select v-model="item.value"  class="select form_w50" v-bind:title="item.title">
                <option value="">선택</option>
                <option v-for="tt in item.option" :value="tt.code" >{{tt.name}}</option>
              </select>
            </li>
            <template v-if="item.liNull">
              <li :class="item.class" style=height:50px><label for="aa"></label></li>
            </template>
          </template>
          <template v-if="item.type=='selectCode'">
            <li :class="item.class">
              <label for="aa">{{item.title}}</label>
                <select v-model="item.value"  class="select form_w100" v-bind:title="item.title" v-bind:disabled="item.disable">
                  <option value="">선택</option>
                  <option v-for="tt in item.option" :value="tt.code">{{tt.codeNm}}</option>
                </select>
            </li>
            <template v-if="item.liNull">
              <li :class="item.class" style=height:50px><label for="aa"></label></li>
            </template>
          </template>
          <template v-if="item.type=='radio'">
            <li :class="item.class">
              <label for="aa">{{item.title}}</label>
              <span v-for="radioItem in item.option" class="rdo_box" >
                <input type="radio" name="radioBox"  :value="radioItem.value" v-model="item.value"  ><label for="aa11">{{radioItem.name}}</label>
              </span>
            </li>
            <template v-if="item.liNull">
              <li :class="item.class" style=height:50px><label for="aa"></label></li>
            </template>
          </template>
          <template v-if="item.type=='check'">
            <li :class="item.class">
              <label for="aa">{{item.title}}</label>
              <span class="chk_box" v-for="checkItem in item.option">
              <input type="checkbox" v-model="checkItem.value" ><label for="aa01">{{checkItem.name}}</label>
            </span>
            </li>
            <template v-if="item.liNull">
              <li :class="item.class" style=height:50px><label for="aa"></label></li>
            </template>
          </template>
          <template v-if="item.type=='popup'">
            <li :class="item.class">
              <label for="aa">{{item.title}}</label>
                <input type="text"  class="input" v-model="item.value">
            </li>
            <template v-if="item.liNull">
              <li :class="item.class" style=height:50px><label for="aa"></label></li>
            </template>
          </template>
          <template v-if="item.type=='inputPop'">
            <li :class="item.class">
              <label for="aa">{{item.title}}</label>
              <input type="text"  v-model="item.value"   class="input sch_appnum"  v-bind:title="item.title" readonly>
              <template v-if="!item.disable"> <!-- 가맹점관리자는 검색 못함(자신것만 볼수 있음) -->
                <button type="button" id="" class="btn_sch01" @click="popupOpen">검색</button>
              </template>
            </li>
            <template v-if="item.liNull">
              <li :class="item.class" style=height:50px><label for="aa"></label></li>
            </template>
          </template>
          <template v-if="item.type=='inputPop2'">
            <li :class="item.class">
              <label for="aa">{{item.title}}</label>
              <input type="text"  v-model="item.value"   class="input sch_appnum"  v-bind:title="item.title" readonly>
              <template v-if="!item.disable"> <!-- 지점관리자는 검색 못함(자신것만 볼수 있음) -->
                <button type="button" id="" class="btn_sch01" @click="gajiPopupOpen($event, item)">검색</button>
              </template>
            </li>
            <template v-if="item.liNull">
              <li :class="item.class" style=height:50px><label for="aa"></label></li>
            </template>
          </template>
          <template v-if="item.type=='selectYYMM'">
            <li :class="item.class">
              <label for="aa">{{item.title}}</label>
              <select v-model="item.value"  class="select form_w50" v-bind:title="item.title">
                <option value="">선택</option>
                <option v-for="tt in item.option" :value="tt.value" >{{tt.name}}</option>
              </select>
              <select v-model="item.value"  class="select form_w50" v-bind:title="item.title">
                <option value="">선택</option>
                <option v-for="tt in item.option" :value="tt.value" >{{tt.name}}</option>
              </select>
            </li>
            <template v-if="item.liNull">
              <li :class="item.class" style=height:50px><label for="aa"></label></li>
            </template>
          </template>
          <template v-if="item.type=='checkbox'">
            <li :class="item.class">
              <label for="aa">{{item.title}}</label>
              <span class="chk_box" v-for="checkItem in item.option">
                <input type="checkbox" v-model="item.value" v-bind:value="checkItem.value"><label for="aa01">{{checkItem.name}}</label>
            </span>
            </li>
          </template>
            <template v-if="item.type=='hidden'">
                <li :class="item.class">
                    <input type="hidden"  v-model="item.value"   class="input sch_appnum"  :title="item.title">
                </li>
            </template>

        </template>

      </ul>
      <!--</div>-->
      <!-- //tbl search box -->
    </div>
    <!-- btn mid -->
    <div class="btn_mid" v-if="searchItem.length > 0">
      <button type="button" class="btn_m01 bg02" @click="resetData">초기화</button>
      <button type="button" class="btn_m01 bg01" @click="SearchButton">조회</button>
    </div>

      <template v-if="searchItemDetail.tapSearch">
          <div class="tab_box">
              <ul class="tab01 col04">
                  <li v-on:click="getTemp('tot')" v-bind:class="{'on': (tap00 == true)}"><a>전체</a></li>
                  <li v-on:click="getTemp('reg')" v-bind:class="{'on': (tap01 == true)}"><a>가입관련</a></li>
                  <li v-on:click="getTemp('use')" v-bind:class="{'on': (tap02 == true)}" ><a>이용문의</a></li>
                  <li v-on:click="getTemp('etc')" v-bind:class="{'on': (tap03 == true)}" ><a>기타문의</a></li>
              </ul>
          </div>
      </template>

    <GajiBox v-if="showModal1"  v-bind:soluId="soluId" v-on:selectedGaji="setGajiData" @gajiClose="showModal1 = false"></GajiBox>
    <GajijumBox v-if="showModal2" v-bind:listInfo="listInfo" v-on:selectedGaJijum="setGaJijumData" @gajiumClose="showModal2 = false"></GajijumBox>
    <SaupBox v-if="showModal3"  v-on:selectedSaup="setSaupData" @saupClose="showModal3 = false"></SaupBox>
  </div>
</template>

<script lang="ts">
    import format from 'date-fns/format'
    import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
    import {CommonBoardService} from '../../../../api/common.service';
    import GajiBox from '@/components/contents/franchiseManage/GajiList.vue'
    import GajijumBox from '@/components/contents/franchiseManage/GajijumBox.vue'
    import SaupBox from '@/components/contents/issuanceOfCashReceipt/SaupList.vue'
    import  moment from 'moment'
    // see docs for available options

    @Component({
        components: {
            Search,GajiBox,GajijumBox,SaupBox
        }
    })
    export default class Search extends Vue {
        @Prop() searchItemDetail !: any;
        searchItem : any = this.searchItemDetail.search;
        selectObjects : any = {};
        totalitems  : number = 0;
        searchStyle : string= ''
        searchStyle2 : string = ''
        dateStyle : any = 'left : 450px';
        title : string = "";
        placeholder : string = "";
        ttss  : boolean = true

        //팝업용
        gajumId : string='';
        saupId : string ='';
        shopNm : string ='';

        // 달력용
        dateFormat:any =  'YYYYMMDD';
        // dateStyle : any = 'left : 0px';
        dateOne: any =  "";
        dateTwo: any =  "";
        nowDate : any ='';
        showMode : string = "single";

        lang : any =  {
            days: ['일', '월', '화', '수', '목', '금', '토'],
            months: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
            // pickers: ['다음주', '다음달', '이전주', '이전달'],
            placeholder: {
                date: '선택',
                dateRange: '범위 선택'
            }
        }

        tap00:boolean=true;
        tap01:boolean=false;
        tap02:boolean=false;
        tap03:boolean=false;

        shortcuts : any = [
            {
                text: '1분기',
                onClick :  ()=>{
                    let  nowUTC =  moment().utc() ; //UTC시간
                    this.nowDate= nowUTC.add(9, 'hours')// 한국시간
                    let nowYear = moment(new Date()).format('YYYY')
                    let nextYear = moment(new Date()).add(1,'years').format('YYYY')

                    let quarter1First = moment(nowYear).quarter(1)
                    let quarter2First = moment(nowYear).quarter(2)
                    let quarter3First = moment(nowYear).quarter(3)
                    let quarter4First = moment(nowYear).quarter(4)
                    let quarter1Last = moment(quarter2First).subtract(1,'ms').endOf('day')
                    let quarter2Last = moment(quarter3First).subtract(1,'ms').endOf('day')
                    let quarter3Last = moment(quarter4First).subtract(1,'ms').endOf('day')
                    let quarter4Last = moment(nextYear).subtract(1,'ms').endOf('day')


                    this.searchItem.filter(e=>{
                        if(e.type=='date2' && e.calenderCount==2){
                            e.searchStartDate = [quarter1First,quarter1Last]
                        }
                    })
                }
            },
            {
                text: '2분기',
                onClick :  ()=>{
                    let  nowUTC =  moment().utc() ; //UTC시간
                    this.nowDate= nowUTC.add(9, 'hours')// 한국시간
                    let nowYear = moment(new Date()).format('YYYY')
                    let nextYear = moment(new Date()).add(1,'years').format('YYYY')
                    let quarter1First = moment(nowYear).quarter(1)
                    let quarter2First = moment(nowYear).quarter(2)
                    let quarter3First = moment(nowYear).quarter(3)
                    let quarter4First = moment(nowYear).quarter(4)
                    let quarter1Last = moment(quarter2First).subtract(1,'ms').endOf('day')
                    let quarter2Last = moment(quarter3First).subtract(1,'ms').endOf('day')
                    let quarter3Last = moment(quarter4First).subtract(1,'ms').endOf('day')
                    let quarter4Last = moment(nextYear).subtract(1,'ms').endOf('day')

                    this.searchItem.filter(e=>{
                        if(e.type=='date2' && e.calenderCount==2){
                            e.searchStartDate = [quarter2First,quarter2Last]
                        }
                    })
                }
            },
            {
                text: '3분기',
                onClick :  ()=>{
                    let  nowUTC =  moment().utc() ; //UTC시간
                    this.nowDate= nowUTC.add(9, 'hours')// 한국시간
                    let nowYear = moment(new Date()).format('YYYY')
                    let nextYear = moment(new Date()).add(1,'years').format('YYYY')
                    let quarter1First = moment(nowYear).quarter(1)
                    let quarter2First = moment(nowYear).quarter(2)
                    let quarter3First = moment(nowYear).quarter(3)
                    let quarter4First = moment(nowYear).quarter(4)
                    let quarter1Last = moment(quarter2First).subtract(1,'ms').endOf('day')
                    let quarter2Last = moment(quarter3First).subtract(1,'ms').endOf('day')
                    let quarter3Last = moment(quarter4First).subtract(1,'ms').endOf('day')
                    let quarter4Last = moment(nextYear).subtract(1,'ms').endOf('day')

                    this.searchItem.filter(e=>{
                        if(e.type=='date2' && e.calenderCount==2){
                            e.searchStartDate = [quarter3First,quarter3Last]
                        }
                    })
                }
            },
            {
                text: '4분기',
                onClick :  ()=>{
                    let  nowUTC =  moment().utc() ; //UTC시간
                    this.nowDate= nowUTC.add(9, 'hours')// 한국시간
                    let nowYear = moment(new Date()).format('YYYY')
                    let nextYear = moment(new Date()).add(1,'years').format('YYYY')
                    let quarter1First = moment(nowYear).quarter(1)
                    let quarter2First = moment(nowYear).quarter(2)
                    let quarter3First = moment(nowYear).quarter(3)
                    let quarter4First = moment(nowYear).quarter(4)
                    let quarter1Last = moment(quarter2First).subtract(1,'ms').endOf('day')
                    let quarter2Last = moment(quarter3First).subtract(1,'ms').endOf('day')
                    let quarter3Last = moment(quarter4First).subtract(1,'ms').endOf('day')
                    let quarter4Last = moment(nextYear).subtract(1,'ms').endOf('day')

                    this.searchItem.filter(e=>{
                        if(e.type=='date2' && e.calenderCount==2){
                            e.searchStartDate = [quarter4First,quarter4Last]
                        }
                    })
                }
            },
            {
                text: '이전주',
                onClick :()=>{
                    let  nowUTC =  moment().utc() ; //UTC시간
                    this.nowDate= nowUTC.add(9, 'hours')// 한국시간

                    this.searchItem.filter(e=>{
                        if(e.type=='date2' && e.calenderCount==2){
                            e.searchStartDate = [moment(this.nowDate).subtract(7,'days'),this.nowDate]
                        }
                    })
                }
            },
            {
                text: '이전달',
                onClick :  ()=>{
                    let  nowUTC =  moment().utc() ; //UTC시간
                    this.nowDate= nowUTC.add(9, 'hours')// 한국시간
                    let nowYear = moment(new Date()).format('YYYY')

                    this.searchItem.filter(e=>{
                        if(e.type=='date2' && e.calenderCount==2){
                            e.searchStartDate = [moment(this.nowDate).subtract(1,'months'),this.nowDate]
                        }
                    })
                }
            },
        ]

        // 가지팝업
        showModal1 : boolean = false;

        // 가맹점 지점 팝업
        showModal2 : boolean = false;
        // 사업장 검색 팝업
        showModal3 : boolean = false;
        gajumNo : string  = ''; //가맹점ID
        listInfo : any = '';
        soluId : any = '';

        dateChangeEvent(date){
            this.$emit('dateCheck' , date)
        }

        eventClick(val){
            this.$emit('eventOnline' , val)
        }

        formatDates(date) {
            let formattedDates = ''
            formattedDates = format(date, this.dateFormat)
            return formattedDates
        }

        popupOpen(){
            this.showModal3= true;
        }

        gajiPopupOpen(event, data){
            if(data.id == 'gajumId'){
                let soluId1 = event.currentTarget.parentElement.parentElement.children['0'].children['1'].value; //suluId 넘기기
                //this.listInfo = { soluId : soluId };
                this.soluId = soluId1;
                this.showModal1= true;
            }else if(data.id == 'jijumId'){
                let soluId = event.currentTarget.parentElement.parentElement.children['0'].children['1'].value; //suluId 넘기기
                let gajumNo1 = event.currentTarget.parentElement.parentElement.children['1'].children['1'].value; //가맹점 ID 넘기기
                this.listInfo = { soluId : soluId, gajumId : gajumNo1 };
                this.showModal2= true;
            }
        }

        setDate(index){
            if(this.searchItem[index].setDates.length > 0 ){
            this.searchItem[index].searchStartDate = this.searchItem[index].setDates
            }
        }

        created() {

            let  nowUTC =  moment().utc() ; //UTC시간

            this.nowDate= nowUTC.add(9, 'hours')// 한국시간

            this.searchStyle = this.searchItemDetail.searchClass
            this.searchStyle2 = this.searchItemDetail.searchClass2

            this.getSearchData();
        }


        getSearchData(){
            this.searchItem.filter(e=>{

                if(e.type=='date'){
                    if(e.calenderCount > 1){
                        this.showMode='range'
                    }

                }else if(e.type=='choiseDate') {
                    if(e.calenderCount > 1){
                        this.showMode='range'
                    }

                }else if(e.type=='input'){
                      // e.value='';
                }else if(e.type=='input2'){
                    this.title = e.title;
                    this.placeholder = e.placeholder;
                }else if(e.type=='selectCode'){
                    if(e.api ==''){
                        this.selectObjects[e.name] = e.option;
                    }
                    else{
                        CommonBoardService.getListDatas(e.api, null, '').then((response) => {
                                let result: any = response.data;
                                if (result.length > 0) {
                                    e.option = result;
                                } else {
                                }
                            }
                            , (error) => {
                            }
                        ).catch();
                        //api 호출한다
                    }
                }else if(e.type=='selectObject'){
                    if(e.api ==''){
                        this.selectObjects[e.name] = e.option;
                    }else{
                        let optNm :string = e.optNm;
                        let optVal :string = e.optVal
                    CommonBoardService.getListDatas(e.api, null, '').then((response) => {
                            let result: any = response.data;

                            if (result.length > 0) {
                                e.option = result;

                                e.option.name = result.optNm;
                                e.option.value = result.optVal;
                            } else {
                            }
                        }
                        , (error) => {
                        }
                    ).catch();
                    }
                }else if(e.type=='selectObjectSearchList'){
                    if(e.api ==''){
                        this.selectObjects[e.name] = e.option;
                    }else{
                        CommonBoardService.getListDatas(e.api, null, '').then((response) => {
                                let result: any = response.data;

                                if (result.length > 0) {
                                    e.option = result;
                                } else {
                                }
                            }
                            , (error) => {
                            }
                        ).catch();
                    }
                }
                else if(e.type=='radio'){

                }else if(e.type=='check'){

                }else if(e.type=='popup'){

                }else if(e.type=='selectYYMM'){
                       for(let i=e.min ; i < e.max ; i++){
                           e.option.push({name : e.min+i+'년' , value : e.min+i})
                       }
                }
            })

            // CommonBoardService.getListDatas('/receipt','10').then(response => (this.listData = response.data)).catch();
        }

        SearchButton(){
            let checkYn = 'Y'
            this.searchItem.filter(e=> {
                if (e.type == 'date3') {
                    if(e.validation==true){
                        if(!e.searchStartDate){
                            checkYn='N'
                        }
                    }
                }
            })
            if( checkYn=='N'){
              Vue.swal({text:"오류발생월을 입력해주세요"})
            }else{
                let name = this.$route.name
                let object :Object= this.searchItem

                let  beforeOneY = moment(this.nowDate).subtract(1, 'years');//1년전 날짜
                if(name == 'receiptViewCancel') {//발급내역조회

                    let searchEndDate = this.formatDates(object[9].searchStartDate[1]);
                    let searchStartDate = this.formatDates(object[9].searchStartDate[0]);
                    let range = moment(searchStartDate).isBetween(beforeOneY, this.nowDate); // true

                  if (range == false) {
                    Vue.swal({text:"현재일 기준 최대 검색가능기간은 1년이며 3개월 범위로 조회 가능합니다."})
                  } else {
                      let endDateBeforeThreeM = moment(searchEndDate).subtract(3, 'months');// 3개월 전 날짜
                      let rangeLimit = moment(searchStartDate).isBetween(endDateBeforeThreeM, searchEndDate); // true

                      if (rangeLimit == true || (searchEndDate == searchStartDate)) {

                        let name = this.$route.name
                        let object: Object = this.searchItem
                        let menu = {menuId: name, listDt: object}
                        this.$store.commit('SEARCHLISTINPUT', {menu})
                        this.$emit('SearchToList', this.searchItem);

                        this.$store.commit('SEARCHLISTOUT')
                      } else {
                        Vue.swal({text:"검색가능기간은 3개월입니다."})
                      }
                  }

                }else if(name=='fnqList'){//자주묻는질문

                    let catagory = '';
                    if(this.tap01==true){
                        catagory = '1';
                    }else if(this.tap02==true){
                        catagory = '2';
                    }else if(this.tap03==true){
                        catagory = '3';
                    }else{
                        catagory = '';
                    }
                    this.searchItem[3] .value = catagory;

                    let menu = {menuId: name ,listDt : object}
                    this.$store.commit('SEARCHLISTINPUT', {menu})
                    this.$emit('SearchToList', this.searchItem);
                    this.$store.commit('SEARCHLISTOUT')

                }else{//다른 페이지

                  let menu = {menuId: name ,listDt : object}
                  this.$store.commit('SEARCHLISTINPUT', {menu})
                  this.$emit('SearchToList', this.searchItem);
                  this.$store.commit('SEARCHLISTOUT')
                }
            }

        }

        resetData(){
            this.searchItem.filter(e=>{
                if(e.type=='radio' ){

                }
                else if(e.id=='onlineYn'){

                }else
                {
                    if(e.disable == true) { //로그인 권한에 따라 변경하지 못하는 값
                    }else{
                        e.value="";
                        e.searchStartDate = [];
                        e.searchEndDate =this.formatDates( this.nowDate);
                    }
                }
            })

        }

        //선택한 가맹점 정보 셋팅(지점 등록화면 상단의 지점 정보)
        setGajiData(data) {
            this.searchItem.filter(e=>{
                if(e.id=='saupId'){
                    e.value=data.saupId
                }else if(e.id=='shopNm'){
                    e.value = data.shopNm
                }else if(e.id=='gajumId'){
                    e.value = data.gajumId
                }
            })
        }

        //선택한 가맹점,지점 정보 셋팅(지점 등록화면 상단의 지점 정보)
        setGaJijumData(data) {
            this.searchItem.filter(e=>{

                if(sessionStorage.role == '0004'){
                    if(e.id=='jijumId'){
                        e.value = data.jijumId;
                    }
                }else{
                    if(e.id=='gajumId'){
                        e.value=data.gajumId;
                    }else if(e.id=='jijumId'){
                        e.value = data.jijumId;
                    }
                }
            })
        }
        // 선택한 사업장 정보검색
        setSaupData(data) {
            // this.storeId = data.storeId; // 매장번호 번호
            // this.saupId = data.saupId; //사업자 번호
            // this.shopNm = data.shopNm; //가맹점명

            this.searchItem.filter(e=>{
                if(e.id=='saupId'){
                    e.value=data.saupId;
                }else if(e.id=='shopNm'){
                    e.value = data.shopNm;
                }
            })
        }

        /**
         * 탭변경
         * @param comp
         */
        getTemp(comp){

            this.tap00 =false;
            this.tap01 =false;
            this.tap02 =false;
            this.tap03 =false;

            if(comp == 'reg' ){
                this.tap01 =true;
            }else if(comp =='use'){
                this.tap02 =true;
            }else if(comp =='etc'){
                this.tap03 =true;
            }else{
                this.tap00 =true;
            }

            this.SearchButton();
        }

    }


</script>

<style>
  .mx-datepicker-btn-confirm {
    border: 1px solid rgba(0, 0, 0, 0.1) !important;
    color: white!important;
    background: #da291c !important;
  }
  .mx-calendar-content .cell.actived {
    color: #fff !important;
    background-color: #da291c !important;
  }
  .mx-calendar-content .cell.inrange {
    background-color: #ffe2e4 !important;
    border: #e9574d !important;
  }
</style>