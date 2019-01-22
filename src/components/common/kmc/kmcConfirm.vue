<template>
  <div >
    <div v-html="cssStyle"></div>
    <div id="popup1" class="popup_wrapper Pstyle" tabindex="0" style="display:block;width: 420px;">
      <!-- style="display:block;"  삭제 -->
      <!-- popup header -->
      <div class="popup_header">
        <!-- h2 -->
        <h2>본인인증</h2>
        <a  class="btn_close b-close" v-on:click="closeKcmNull()">Close</a>
      </div>
      <div class="popup_body" style="width: 418px;height: 713px">
        <div >
          <p class="sub_text">
            <a v-on:click="IeShow" >
              IE 에서 본인인증 창이 보이지 않을때 해결방법 <strong>▶ Help</strong>
            </a>
          </p>
        </div>

        <iframe name="cert" id="cert" style="width:100%; height:100%; border:none;"   v-on:load ="eventGet"></iframe>
      </div>
    </div>

    <form id="myForm" :action="hostUrl" target="cert" refs="myForm">
      <input type="hidden"  name="tr_cert" :value="tr_cert">
      <input type="hidden"  name="tr_url" :value="tr_url">
    </form>
    <ieShowFrm v-show="ieShowYn" @close="ieShowYn=false"></ieShowFrm>
  </div>


</template>


<script lang="ts">
    import axios from 'axios';
    import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
    import {CommonBoardService, CommonListService} from '../../../api/common.service';
    import {environment} from '../../../utill/environment';
    import ieShowFrm from "@/components/common/kmc/ieShowFrm.vue";

    @Component({
        components: {
            kmcConfirm, ieShowFrm
        }
    })
    export default class kmcConfirm extends Vue {
        @Prop() kmcData  !: any;

        cssStyle: string = `<div class="popup_modal"></div>`;
        originId: any = 'header2';
        hostUrl: string = environment.selfCertificationUrl;
        resultValue : any = "";
        result : boolean = false;
        tr_cert: any = '';
        tr_url: any = '';
        ieShowYn :boolean =false;


        //돔생성전 호출자
        created() {
            this.makeHeader('hide','','')
            this.getBlaindLoding();
        }

        closeKcm(result,val) {
            this.makeHeader('show' , result , val)
        }
        closeKcmNull(){
            // let documentHeader: any = document.getElementById('header2');
            // this.originId = 'header';
            // documentHeader.attributes.item(0).value = this.originId;
            this.$emit('closeKcm');
        }

        eventGet(){
            if(this.result == false){
                this.resultValue =  setInterval(this.wating,3000)
                this.result=true;
            }

        }
        wating(){
            if(this.result==true) {
                let val = sessionStorage.getItem('resultKey')
                let fail = sessionStorage.getItem('failKey')
                if (val) {
                    sessionStorage.removeItem('resultKey')
                    clearInterval(this.resultValue)
                    this.result = false;
                    this.closeKcm('Y', JSON.parse(val))

                } else {
                    if (fail) {
                        clearInterval(this.resultValue)
                        sessionStorage.removeItem('failKey')
                        this.result = false;
                        this.closeKcm('N', fail)
                    }
                }
            }

        }
        //돔렌더링완료시 진행
        mounted() {
        }
        getBlaindLoding() {
            // api 요청코드 암호화 요청
            CommonBoardService.getListData('kmc/cert', null, {reqUrl: environment.imgApiUrl+'/#'+ this.$route.fullPath})
                .then((response) => {
                        this.tr_cert = response.data.cert;
                        this.tr_url = environment.imgApiUrl+'/#/kmcResult';
                        this.sendCerticication();
                    }
                    , error => {
                    }
                ).catch();
            // 전송
        }
        sendCerticication() {
            let myForm = <HTMLFormElement>document.createElement('form');
            myForm.setAttribute('method','post')
            myForm.setAttribute('action', this.hostUrl)
            myForm.setAttribute('target','cert')
            let input = <HTMLElement>document.createElement('input');
            input.setAttribute('type','hidden')
            input.setAttribute('name','tr_cert')
            input.setAttribute('value',this.tr_cert)
            myForm.appendChild(input);
            let input2 = <HTMLElement>document.createElement('input');
            input2.setAttribute('type','hidden')
            input2.setAttribute('name','tr_url')
            input2.setAttribute('value',this.tr_url)
            myForm.appendChild(input2)
            document.body.appendChild(myForm);
            myForm.submit();
        }

        makeHeader(val, result , response){
            if(val=='hide'){
                // let documentHeader: any = document.getElementById('header');
                // documentHeader.attributes.item(0).value = this.originId;
            }
            else{
                // let documentHeader: any = document.getElementById('header2');
                // this.originId = 'header';
                // documentHeader.attributes.item(0).value = this.originId;

                //alert(result);
                if(response){
                    if(result =='Y' ){
                        response["success"] = result
                    }
                }

                this.$emit('closeKcm',response);

            }
        }

        updated() {
            this.$nextTick(function () {
                this.eventGet()
            });
            // data 값 변조하면됨 Y / N   1,2? 이런값들 변경시 필요함
        }

      IeShow(){
        this.ieShowYn = true;
      }

    }

</script>
