<template>
  <div>
    <div v-html="cssStyle"></div>
    <div id="popup3" class="popup_wrapperModal3 medium Pstyle3" tabindex="0" style="display:block;">
      <!-- style="display:block;"  삭제 -->
      <!-- popup header -->
      <div class="popup_header3">
        <!-- h2 -->
        <h2>발급내역 이관</h2>
        <a href="#" class="btn_close b-close" @click="closeAddr()">Close</a>
      </div>
      <!-- popup body -->
      <div class="popup_body3">
        <!-- popup content -->
        <div class="popup_content_post">
          <!-- post box -->
          <div class="post_box">
            <!-- search post box -->
            <p class="search_post_box">
              <select v-model="id" class="select" style="width: 500px">
                <option value="">선택</option>
                <template v-for="data in canIdList">
                  <option :value=data>{{data}}</option>
                </template>

              </select>
            </p>
            <p class="search_post_box" style="top:3px" v-if="idMessage">
              &nbsp;<font Color="red" size="2"> {{idMessage}}</font>
            </p>
            <!-- info box -->
            <div class="info_box">
              <p class="info_text"><em class="fc_pt01">이관을 받을 ID </em>를 꼭 확인해주세요!</p>
              <p class="info_text" v-if="idOk">ID : <em class="fc_pt01">  {{id}} </em>에서<em class="fc_pt01"> {{sendId}}  </em> 로 발급내역 이관을 진행합니다</p>
              <p class="info_text" v-if="idOk">발급내역 이관 기간은 <em class="fc_pt01">{{startDate}} ~  {{endDate}} </em> 까지 이관됩니다</p>
              <ul class="cont_list02">
                <li>이관후에는 이관하려는 아이디로 발급내역이 옴겨집니다</li>
                <li>이관을 원치 않으면 취소를 선택해주세요</li>
              </ul>
            </div>
            <div class="pagination">
            <button type="button" class="btn_m01 bg01"
                                                v-on:click="idMove()">이관</button><button type="button" class="btn_m01 bg03"
                                                                                            v-on:click="idCancel()">취소</button>
            </div>
          </div>
        </div>
      </div>
      <!-- //popup body -->
    </div>
  </div>
</template>


<script lang="ts">
    import {environment} from '@/utill/environment';
    import axios from 'axios';
    import  moment from 'moment';
    import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
    import {CommonBoardService} from '../../../api/common.service';

    @Component({
        components: {
            DataSend
        }
    })
    export default class DataSend extends Vue {
        @Prop() sendId !: string;

        cssStyle : string = `<div class="popup_modal" v-bind:style="#header {position : "50px"}"></div>`
        id : string = '';
        idMessage :string = "";
        idOk : boolean = false;
        endDate : string =  moment().format('YYYY-MM-DD');
        startDate : string = moment().subtract(90,'days').format('YYYY-MM-DD');
        canIdList : any = [];

        //돔생성전 호출자
        created() {
        }

        //돔렌더링완료시 진행
        mounted() {
            this.idConfirm()
        }

        @Watch('id') onchange(){
            if(this.id !=''){
                this.idMessage = '';
                this.idOk=true;
            }else{
                this.idMessage = 'ID 를 선택해주세요';
                this.idOk=false;
            }
        }

        closeAddr(){
            this.$emit('closeData');
        }

        idConfirm() {
             CommonBoardService.getListDatas('migration',this.sendId+'/targets',null).then(result=>{
                  if(result.status==200){
                      let resultYn = 'N';
                      this.canIdList = result.data
                      this.idMessage = '* 이관받을 ID를 선택해주세요 *'

                  }
             }).catch()
        }

        idMove() {
            if(this.id){
                if(this.idOk){
                    //이관하는 로직태우기
                    let Object = { migrationStartDt: moment(this.startDate).format('YYYYMMDD'), migrationEndDt : moment(this.endDate).format('YYYYMMDD') , targetAccountId : this.sendId , sourceAccountId: this.id}
                    CommonBoardService.postListDatas('/migration',null,Object).then(result=>{
                              if(result.status==201){
                                  this.$emit('dataSendGo',{id:this.id,ok:true})
                              }
                              else{
                                  Vue.swal({text:'이관 신청이 실패하였습니다 잠시 후에 재 시도해주세요'})
                              }
                    }).catch()
                    //이관후 해지로 이동
                }
                else{
                    Vue.swal({text:'이관 받을 아이디를 선택해주세요'})
                }
            }else{
                Vue.swal({text:'ID 를 선택해주세요'})
            }
        }
        idCancel(){
            this.$emit('closeData')
        }
    }

</script>

