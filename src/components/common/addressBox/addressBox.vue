<template>
  <div>
    <vue-progress-bar></vue-progress-bar>
    <div v-html="cssStyle"></div>
    <div id="popup1" class="popup_wrapper medium Pstyle" tabindex="0" style="display:block;">
      <!-- style="display:block;"  삭제 -->
      <!-- popup header -->
      <div class="popup_header">
        <!-- h2 -->
        <h2>주소 찾기</h2>
        <a href="#" class="btn_close b-close" @click="closeAddr()">Close</a>
      </div>
      <!-- popup body -->
      <div class="popup_body">
        <!-- popup content -->
        <div class="popup_content_post">
          <!-- post box -->
          <div class="post_box">
            <!-- search post box -->
            <p class="search_post_box">
              <input type="text" v-model="addressData" class="input sch_post"
                     placeholder="도로명 + 건물번호, 건물명, 지번을 입력하세요." title="주소 입력">
              <span class="btn_post_area"><button type="button" class="btn_m01 bg03"
                                                  v-on:click="getAddressLoding()">검색</button></span>
            </p>
            <!-- info box -->
            <div class="info_box" v-show="total < 1">
              <p class="info_text"><em class="fc_pt01">건물번호</em> 또는 <em class="fc_pt01">번지수</em>를 같이 입력하면 더
                빨라요!</p>
              <ul class="cont_list02">
                <li>가산디지털2로 179 (도로명 + 건물번호)</li>
                <li>롯데정보통신 (건물명, 아파트명)</li>
                <li>가산디지털2로 533-2 (동/읍/면/리 + 번지)</li>
              </ul>
            </div>
          </div>
          <!-- //post box -->

          <!-- post data box -->
          <div class="post_data_box" v-show="total > 0">
            <div class="tbl_info_top">
              <span class="total">검색결과 <strong>{{total}}</strong>건</span>
            </div>
            <!-- post scroll -->
            <div class="post_scroll">
              <!-- post list -->
              <ul class="post_list">
                <li v-for="address in responseAddressData">
                  <a href="#">
                    <dl class="post_data" v-on:click="selectedAddr(address.roadAddr, address.zipNo)">
                      <dt><span class="sub01">도로명</span></dt>
                      <dd>{{address.roadAddr}}</dd>
                      <dt><span class="sub02">지번</span></dt>
                      <dd>{{address.jibunAddr}}</dd>
                    </dl>
                    <span class="post_code">{{address.zipNo}}</span>
                  </a>
                </li>
              </ul>
            </div>
            <!-- post scroll -->

            <!-- pagination -->
            <div class="pagination">
              <a href="#" class="btn_prev" v-on:click="prePages()">이전</a>
              <span class="num">
                          <a v-for="page in paggingStr" v-on:click="goPage(page.page)">
                            <template v-if="pageNum==page.page"><strong>{{page.page}}</strong></template>
                            <template v-else="pageNum=page.page">{{page.page}}</template>
                          </a>
                        </span>
              <a href="#" class="btn_next" v-on:click="nextPages()">다음</a>
            </div>
            <!-- //pagination -->
          </div>
          <!-- //post data box -->

        </div>
        <!-- //popup content -->
        <!-- bottom area -->
        <!--<div class="bottom_area">-->
        <!--&lt;!&ndash; btn &ndash;&gt;-->
        <!--<div class="btn_bot">-->
        <!--<button type="button" class="btn_b01 bg02">닫기</button>-->
        <!--<button type="button" class="btn_b01 bg01">주소입력</button>-->
        <!--</div>-->
        <!--</div>-->
      </div>
      <!-- //popup body -->
    </div>
  </div>
</template>


<script lang="ts">
    import {environment} from '@/utill/environment';
    import axios from 'axios';
    import {Component, Vue} from 'vue-property-decorator';


    @Component({
        components: {
            AddressBox
        }
    })
    export default class AddressBox extends Vue {

        addressData: string = '';
        responseAddressData: any = [];
        $Progress: any;
        addressUrl: string = environment.addressApiUrl;

        // keyword : any = this.addressData;
        confmKey: string = environment.addressKey;
        resultType: string = 'json';

        originId : any = "header2";

        //페이징 데이터
        PAGEBLOCK: number = 5;
        pageSize: number = 5;
        totalPages: number = 0;
        firstPage: number = 0;
        lastPage: number = 0;
        nextPage: number = 0;
        prePage: number = 0;
        paggingStr: any = [];
        total: number = 0;
        pageNum: number = 0;

        cssStyle : string = `<div class="popup_modal" v-bind:style="#header {position : ""}"></div>`

        //돔생성전 호출자
        created() {

        }

        //돔렌더링완료시 진행
        mounted() {
            // let documentHeader : any = document.getElementById('header');
            // documentHeader.attributes.item(0).value=this.originId;
        }

        closeAddr(){
            this.$emit('close');
            // let documentHeader : any = document.getElementById('header2');
            // this.originId = 'header'
            // documentHeader.attributes.item(0).value=this.originId
        }

        getAddressLoding() {
            // 토탈페이지 및 페이징관련 데이터는 다시 페이지 오브젝트에 넣어야한다.
            // 넣어진 페이지 데이터에 의해 페이징 페이지 생성 이벤트는 페이지번호 옴겨와야한다
            // 검색데이터
            let searchData: any = '';
            // searchData = '?currentPage='+this.currentPage+'&countPerPage='+this.countPerPage+'&keyword='+this.keyword+'&confmKey='+this.confmKey+'&resultType='+this.resultType;
            searchData = '?currentPage=' + this.pageNum + '&countPerPage=' + this.PAGEBLOCK + '&keyword=' + this.addressData + '&confmKey=' + this.confmKey + '&resultType=' + this.resultType;
            // 로딩바
            this.pageMake();

            // api 데이터 호출
            axios.get(this.addressUrl+searchData )
                .then((response) => {
                        this.responseAddressData = response.data.results.juso;
                        this.total = parseInt(response.data.results['common'].totalCount);
                        this.pageNum = parseInt(response.data.results['common'].currentPage);
                        this.pageSize = parseInt(response.data.results['common'].countPerPage);
                        this.PAGEBLOCK = parseInt(response.data.results['common'].countPerPage);
                        this.pageMake();

                    }
                    , error => {
                        this.$Progress.finish();
                    }
                ).catch(
            );
        }

        pageMake() {
            this.paggingStr = [];
            if (this.total < 1) {

            } else {
                if (this.firstPage <= 0) {
                    this.firstPage = 1;
                }
                this.firstPage = Math.floor((this.pageNum - 1) / this.PAGEBLOCK) * this.PAGEBLOCK + 1;
                this.totalPages = Math.floor((this.total - 1) / this.pageSize) + 1;
                this.lastPage = this.firstPage - 1 + this.PAGEBLOCK;

                if (this.lastPage > this.totalPages) this.lastPage = this.totalPages;
                this.nextPage = this.lastPage + 1;
                this.prePage = this.firstPage - 5;

                for (let i = this.firstPage; i <= this.lastPage; i++) {
                    this.paggingStr.push({page: i});
                }
            }
        }

        selectedAddr(addr:string, zip:string) {
            let selectedAddr : any  = {};
            selectedAddr['addr'] = addr;
            selectedAddr['zip'] = zip;
            this.$emit('selectedValue', selectedAddr); //선택한 주소만 값 넘김
            //this.$emit('selectedValue', this.responseAddressData);
            this.$emit('close')

            //header2 를 header로 바꿈
            // let header : any = document.getElementById('header2');
            // this.originId = 'header'
            // header.attributes.item(0).value=this.originId
        }

        prePages() {
            if (this.firstPage > this.PAGEBLOCK) {
                this.goPage(this.prePage);
            }
        }

        nextPages() {
            if (this.lastPage < this.totalPages) {
                this.goPage(this.nextPage);
            }
        }

        goPage(pageNum) {
            this.pageNum = pageNum;
            this.getAddressLoding();
        }

        updated() {
            this.$nextTick(function () {
            });
            // data 값 변조하면됨 Y / N   1,2? 이런값들 변경시 필요함
        }
    }

</script>

