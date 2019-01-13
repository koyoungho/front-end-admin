<template>
  <div class="cont_mobile">
    <!--<resize-observer @notify="handleResize"/>-->
    <!-- tbl search box -->
    <div v-bind:class="searchStyle" v-if="searchItem.length > 0">
      <!--{{searchItemDetail}}-->
      <ul v-bind:class="searchStyle2">
        <template v-for="item in searchItem">

          <template v-if="item.type=='date2'" >
            <li>
              <label for="aa">{{item.title}}</label>
              <template v-if="item.calenderCount==1">
                <span class="form_cal">
                <date-picker v-model="item.searchStartDate"  :lang="lang" :type="item.dateType"
                             :first-day-of-week="1"  :format="item.default" :width="item.width" confirm ></date-picker>
                </span>
              </template>
              <template v-else="item.calenderCount==2">
                <span class="form_cal">
                <date-picker v-model="item.searchStartDate"  :lang="lang" :type="item.dateType"
                             :first-day-of-week="1" range :format="item.default" :width="item.width" confirm ></date-picker>
                </span>
              </template>
            </li>
          </template>

          <template v-if="item.type=='date3'" >
            <li>
              <label for="aa">{{item.title}}</label>
              <template v-if="item.calenderCount==1">
                <span class="form_cal">
                <date-picker v-model="item.searchStartDate" v-on:change="dateChangeEvent"  :lang="lang" :type="item.dateType"
                             :first-day-of-week="1"  :format="item.default" :width="item.width" confirm ></date-picker>
                </span>
              </template>
              <template v-else="item.calenderCount==2">
                <span class="form_cal">
                <date-picker v-model="item.searchStartDate"  :lang="lang" :type="item.dateType"
                             :first-day-of-week="1" range :format="item.default" :width="item.width" confirm ></date-picker>
                </span>
              </template>
            </li>
          </template>

          <template v-if="item.type=='input'">
            <li>
              <template v-if="item.title !=''"><label for="aa">{{item.title}}</label></template>
              <template v-if="item.title ==''"><input type="text"  v-model="item.value"   class="input sch_appuser"></template>
            </li>
          </template>

          <template v-if="item.type=='input2'">
            <li>
              <label for="aa">{{item.title}}</label>
              <input type="text"  v-model="item.value"   class="input sch_appnum"  :title="item.title"  :placeholder="item.placeholder">
            </li>
          </template>
          <template v-if="item.type=='select'">
            <li>
              <label for="aa">{{item.title}}</label>
              <select v-model="item.value"  class="select form_w50" title="발급용도 선택">
                <option value="">선택</option>
                <option v-for="tt in item.option" :value="tt.value" >{{tt.name}}</option>
              </select>
            </li>
          </template>
          <template v-if="item.type=='selectObject'">
            <li>
              <label for="aa">{{item.title}}</label>
              <select v-model="item.value"  class="select form_w50" title="발급용도 선택">
                <option value="">선택</option>
                <option v-for="tt in item.option" :value="tt.code" >{{tt.name}}</option>
              </select>
            </li>
          </template>
          <template v-if="item.type=='selectCode'">
            <li>
              <label for="aa">{{item.title}}</label>
                <select v-model="item.value"  class="select form_w100" title="발급용도 선택" v-bind:disabled="item.disable">
                  <option value="">선택</option>
                  <option v-for="tt in item.option" :value="tt.code">{{tt.codeNm}}</option>
                </select>
            </li>
          </template>
          <template v-if="item.type=='radio'">
            <li>
              <label for="aa">{{item.title}}</label>
              <span v-for="radioItem in item.option" class="rdo_box" >
                <input type="radio" name="radioBox"  :value="radioItem.value" v-model="item.value"  ><label for="aa11">{{radioItem.name}}</label>
              </span>
            </li>
          </template>
          <template v-if="item.type=='check'">
            <li>
              <label for="aa">{{item.title}}</label>
              <span class="chk_box" v-for="checkItem in item.option">
              <input type="checkbox" v-model="checkItem.value" ><label for="aa01">{{checkItem.name}}</label>
            </span>
            </li>
          </template>
          <template v-if="item.type=='popup'">
            <li>
              <label for="aa">{{item.title}}</label>
                <input type="text"  class="input" v-model="item.value" readonly>
            </li>
          </template>
          <template v-if="item.type=='inputPop'">
            <li>
              <label for="aa">{{item.title}}</label>
              <input type="text"  v-model="item.value"   class="input sch_appnum"  title="고객명 입력" readonly>
              <template v-if="!item.disable"> <!-- 가맹점관리자는 검색 못함(자신것만 볼수 있음) -->
                <button type="button" id="" class="btn_sch01" @click="popupOpen">검색</button>
              </template>
            </li>
          </template>
          <template v-if="item.type=='inputPop2'">
            <li>
              <label for="aa">{{item.title}}</label>
              <input type="text"  v-model="item.value"   class="input sch_appnum"  title="고객명 입력" readonly>
              <template v-if="!item.disable"> <!-- 지점관리자는 검색 못함(자신것만 볼수 있음) -->
                <button type="button" id="" class="btn_sch01" @click="gajiPopupOpen($event, item)">검색</button>
              </template>
            </li>
          </template>
          <template v-if="item.type=='selectYYMM'">
            <li>
              <label for="aa">{{item.title}}</label>
              <select v-model="item.value"  class="select form_w50" title="발급용도 선택">
                <option value="">선택</option>
                <option v-for="tt in item.option" :value="tt.value" >{{tt.name}}</option>
              </select>
              <select v-model="item.value"  class="select form_w50" title="발급용도 선택">
                <option value="">선택</option>
                <option v-for="tt in item.option" :value="tt.value" >{{tt.name}}</option>
              </select>
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
    <GajiBox v-if="showModal1"  v-on:selectedGaji="setGajiData" @gajiClose="showModal1 = false"></GajiBox>
    <GajijumBox v-if="showModal2" v-bind:gajumNum="gajumNo" v-on:selectedGaJijum="setGaJijumData" @gajiumClose="showModal2 = false"></GajijumBox>
  </div>
</template>

<script lang="ts">
    import format from 'date-fns/format'
    import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
    import {CommonBoardService} from '../../../../api/common.service';
    import GajiBox from '@/components/contents/franchiseManage/GajiList.vue'
    import GajijumBox from '@/components/contents/franchiseManage/GajijumBox.vue'
    // see docs for available options

    @Component({
        components: {
            Search,GajiBox,GajijumBox
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
        nowDate : any = new Date();
        showMode : string = "single";

        lang : any =  {
            days: ['일', '월', '화', '수', '목', '금', '토'],
            months: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
            pickers: ['다음주', '다음달', '이전주', '이전달'],
            placeholder: {
                date: '선택',
                dateRange: '범위 선택'
            }
        }

        // 가지팝업
        showModal1 : boolean = false;

        // 가맹점 지점 팝업
        showModal2 : boolean = false;
        gajumNo : string  = ''; //가맹점ID

        dateChangeEvent(date){
            this.$emit('dateCheck' , date)
        }

        formatDates(date) {
            let formattedDates = ''
            formattedDates = format(date, this.dateFormat)
            return formattedDates
        }

        popupOpen(){
            this.showModal1= true;
        }

        gajiPopupOpen(event, data){
            if(data.id == 'jijumId'){
                this.gajumNo = event.currentTarget.parentElement.parentElement.children['1'].children['1'].value; //가맹점 ID 넘기기
            }
            this.showModal2= true;
        }

        created() {
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
                      e.value='';
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
                            // console.log(result)

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
                }else if(e.type=='radio'){

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
            this.$emit('SearchToList', this.searchItem);
        }

        resetData(){
            this.searchItem.filter(e=>{
                if(e.type=='radio' ){

                }else{
                    if(e.disable == true) { //로그인 권한에 따라 변경하지 못하는 값
                    }else{
                        e.value="";
                        e.searchStartDate = this.formatDates(new Date());
                        e.searchEndDate =this.formatDates(new Date());
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
            console.log(data)
            this.searchItem.filter(e=>{
                if(e.id=='gajumId'){
                    e.value=data.gajumId;
                }else if(e.id=='jijumId'){
                    e.value = data.jijumId;
                }
            })
        }
    }


</script>

<style>
  /*.mx-calendar-content .cell.actived {*/
    /*background-color: #fa0b40 !important;*/
  /*}*/
  /*.mx-calendar-content .cell.disabled {*/
    /*cursor: not-allowed;*/
    /*color: black!important;*/
    /*background-color: white!important;*/
  /*}*/
  /*.mx-calendar-content .cell.inrange {*/
    /*color: white;*/
    /*background-color:  #fa7f9e!important;*/
  /*}*/
</style>