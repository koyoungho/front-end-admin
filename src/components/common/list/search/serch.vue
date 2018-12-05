<template>
  <div class="cont_mobile">
    <!--<resize-observer @notify="handleResize"/>-->
  <!-- tbl search box -->
    <div class="search_box page_issueinq" v-if="searchItem.length > 0">
    <!--{{searchItemDetail}}-->
      <ul class="search_list col03">
      <template v-for="item in searchItem">
           <template v-if="item.type=='date'" >
            <li class="sch_col01">
              <label for="aa">{{item.title}}</label>
              <template v-if="item.calenderCount==2">
              <span class="form_cal">
                            <input type="text"   v-model="item.searchStartDate=formatDates(dateOne)"  class="input date" title="날짜 입력">
                          </span>
              <span class="period_cal">-</span>
              <span class="form_cal">
                            <input type="text" v-model="item.searchEndDate=formatDates(dateTwo)"  class="input date" title="날짜 입력">
                            <a href="#" class="btn_cal" id="datepicker-trigger">달력</a>
                          </span>
              </template>
              <template v-else="item.caleanderCount==1">
                <span class="form_cal">
                            <input type="text" v-model="item.searchEndDate=formatDates(dateOne)"  class="input date" title="날짜 입력">
                            <a href="#" class="btn_cal" id="datepicker-trigger">달력</a>
                          </span>
              </template>

            </li>
          </template>

          <template v-if="item.type=='input'">
              <li>
                <template v-if="item.title !=''"><label for="aa">{{item.title}}</label></template>
                <template v-if="item.title ==''"><input type="text"  v-model="item.value"   class="input sch_appuser"  title="고객명 입력" ></template>
              </li>
          </template>

          <template v-if="item.type=='select'">
              <li>
                <label for="aa">{{item.title}}</label>
                <select v-model="item.value"  class="select form_w100" title="발급용도 선택">
                  <option value="">선택</option>
                  <option v-for="tt in item.option" v-bind:value="tt.value" >{{tt.name}}</option>
                </select>
              </li>
          </template>
        <template v-if="item.type=='selectCode'">
          <li>
            <label for="aa">{{item.title}}</label>
            <select v-model="item.value"  class="select form_w100" title="발급용도 선택">
              <option value="">선택</option>
              <option v-for="tt in item.option" v-bind:value="tt.code" >{{tt.codeName}}</option>
            </select>
          </li>
        </template>
          <template v-if="item.type=='radio'">
            <li>
              <label for="aa">{{item.title}}</label>
              <span v-for="radioItem in item.option" class="rdo_box" >
                <input type="radio" name="radioBox"  v-bind:value="radioItem.value" v-model="item.value"><label for="aa11">{{radioItem.name}}{{radioItem.value}}</label>
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
    <template class="datepicker-trigger">
      <AirbnbStyleDatepicker
          v-bind:trigger-element-id="'datepicker-trigger'"
          v-bind:mode=showMode
          v-bind:fullscreen-mobile="true"
          v-bind:date-one="dateOne"
          v-bind:date-two="dateTwo"
          v-bind:months-to-show="1"
          v-bind:style="dateStyle"
          @date-one-selected="val => { dateOne = val }"
          @date-two-selected="val => { dateTwo = val }"
      />
    </template>
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


        // 달력용
        dateFormat:any =  'YYYYMMDD';
        dateStyle : any = '';
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


        handleResize() {
            if(window.innerWidth < 482){
                this.dateStyle = '';
            }else{
                this.dateStyle = 'left : 350px';
            }
        }

    }


</script>