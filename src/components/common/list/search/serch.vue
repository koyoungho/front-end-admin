<template>
  <div class="cont_mobile">
    <!--<resize-observer @notify="handleResize"/>-->
    <!-- tbl search box -->
    <div :class="searchStyle" v-if="searchItem.length > 0">
      <!--{{searchItemDetail}}-->
      <ul :class="searchStyle2">
        <template v-for="item in searchItem">
          <template v-if="item.type=='date'" >
            <li>
              <label for="aa">{{item.title}}</label>
              <template v-if="item.calenderCount==2">
              <span class="form_cal">
                            <input type="text" v-model="item.searchStartDate==null ? dateOne : item.searchStartDate"  class="input date" title="날짜 입력">
                          </span>
                <span class="period_cal">-</span>
                <span class="form_cal">
                            <input type="text" v-model="item.searchEndDate==null ? dateTwo : item.searchEndDate"  class="input date" title="날짜 입력">
                            <a href="" class="btn_cal" :id="item.id">달력</a>
                          </span>
                <template class="datepicker-trigger">
                  <AirbnbStyleDatepicker
                      :trigger-element-id="item.id"
                      :mode=showMode
                      :fullscreen-mobile="true"
                      :months-to-show="1"
                      :offsetX="-636"
                      :offsetY="-20"
                      :date-one="dateOne"
                      :date-two="dateTwo"
                      @date-one-selected="val => { item.searchStartDate = formatDates(val) }"
                      @date-two-selected="val => { item.searchEndDate = formatDates(val) }"
                  />
                </template>
              </template>
              <template v-else="item.caleanderCount==1">
                <span class="form_cal">
                            <input type="text" v-model="item.searchEndDate=formatDates(dateOne)"  class="input date" title="날짜 입력">
                            <a href="" class="btn_cal" id="datepicker-trigger">달력</a>
                          </span>
                <template class="datepicker-trigger" >
                  <AirbnbStyleDatepicker
                      :trigger-element-id="item.id"
                      :mode=showMode
                      :fullscreen-mobile="true"
                      :months-to-show="1"
                      :offsetX="-636"
                      :offsetY="-20"
                      :date-one="dateOne"
                      :date-two="dateTwo"
                      @date-one-selected="val => { item.searchStartDate = formatDates(val) }"
                      @date-two-selected="val => { item.searchEndDate = formatDates(val) }"
                  />
                </template>
              </template>
            </li>
          </template>

          <template v-if="item.type=='input'">
            <li>
              <template v-if="item.title !=''"><label for="aa">{{item.title}}</label></template>
              <template v-if="item.title ==''"><input type="text"  v-model="item.value"   class="input sch_appnum"  title="고객명 입력" ></template>
            </li>
          </template>

          <template v-if="item.type=='input2'">
            <li>
              <label for="aa">{{item.title}}</label>
              <input type="text"  v-model="item.value"   class="input sch_appnum"  title="고객명 입력" >
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
          <template v-if="item.type=='selectCode'">
            <li>
              <label for="aa">{{item.title}}</label>
              <select v-model="item.value"  class="select form_w50" title="발급용도 선택">
                <option value="">선택</option>
                <option v-for="tt in item.option" :value="tt.code" >{{tt.codeName}}</option>
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
        </template>
      </ul>
      <!--</div>-->
      <!-- //tbl search box -->
    </div>
    <!-- btn mid -->
    <div class="btn_mid" v-if="searchItem.length > 0">
      <button type="button" class="btn_m01 bg01" @click="SearchButton">조회</button>
    </div>
  </div>
</template>



<script lang="ts">
    import format from 'date-fns/format'
    import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
    import {CommonBoardService} from '../../../../api/common.service';
    // see docs for available options




    @Component({
        components: {
            Search
        }
    })
    export default class Search extends Vue {
        @Prop() searchItemDetail !: any;
        searchItem : any = this.searchItemDetail;
        selectObjects : any = {};
        totalitems  : number = 0;
        searchStyle : string= 'search_box page_system03'

        // 달력용
        dateFormat:any =  'YYYYMMDD';
        // dateStyle : any = 'left : 0px';
        dateOne: any =  new Date();
        dateTwo: any =  new Date();
        showMode : string = "single";


        formatDates(date) {
            let formattedDates = ''
            formattedDates = format(date, this.dateFormat)
            return formattedDates
        }

        created() {


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

                }else if(e.type=='selectCode'){

                    if(e.api ==''){
                        this.selectObjects[e.name] = e.option;
                    }
                    else{
                        CommonBoardService.getListDatas('pcodes/'+e.api+'/codes', null, '').then((response) => {
                                let result: any = response.data;
                                //console.log(result)
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
                    CommonBoardService.getListDatas('pcodes/'+e.api+'/codes', null, '').then((response) => {
                            let result: any = response.data;
                            //console.log(result)
                            if (result.length > 0) {
                                e.option = result;
                            } else {
                            }
                        }
                        , (error) => {
                        }
                    ).catch();

                }else if(e.type=='radio'){

                }else if(e.type=='check'){

                }
            })

            // CommonBoardService.getListDatas('/receipt','10').then(response => (this.listData = response.data)).catch();
        }


        SearchButton(){
            this.$emit('SearchToList', this.searchItem);
        }

    }


</script>