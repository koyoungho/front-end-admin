<template>
  <div>
    <!-- popup small -->
    <div class="popup_modal"></div>
    <div id="popup_code" class="popup_wrapper large Pstyle" tabindex="0" style="display: block;">
      <!-- popup header -->
      <div class="popup_header">
        <!-- h2 -->
        <h2>관리자 본인인증</h2>
        <button type="button" v-on:click="closePop" class="btn_close">Close</button>
      </div>
      <!-- popup body -->
      <div class="popup_body">
        <!-- popup content -->
        <div class="popup_content page_code">

          <!-- search box -->
          <div class="login_wrap">
            <!-- login_box -->
            <div class="login_box type02">
              <p class="login_text">개인 정보 보호 및 현금영수증 발급 도용, 오남용 방지를 위하여 OTP 추가 인증을 진행합니다.<br>가입 시 등록하신 번호로 인증번호를 전송하고 수신한 인증번호를 아래에 입력하시기 바랍니다.<br>로그인에 문제가 있다면 고객센터 (02-2074-0340)으로 문의하시기 바랍니다.</p>
              <!-- cert box -->
              <div class="cert_box">
                <p class="form_cert row01">
                  <input type="text" id="otpNumberId" name="" size="" maxlength="" autofocus="autofocus" placeholder="인증번호 입력" class="cert" title="인증번호 입력" v-model="otpNumber" v-on:keyup.enter="optCallConfirm(otpNumber)">
                  <span class="time_count" style="right: 240px">{{message}}</span>
                  <a><span style="margin-left: 10px" v-on:click="otpRetry">재전송</span></a>
                  <!--<button type="button" class="btn_m01 bg02" v-on:click="otpRetry">재전송</button>-->
                </p>

              </div>
              <div class="cert_box">
                <p class="form_cert row01">
                  <button type="button" class="btn_m01 bg01" @click="optCallConfirm(otpNumber)">인증번호 확인</button>
                </p>
              </div>
          </div>
            <!-- //login_box -->
          </div>
        </div>
      </div>
      <!-- //popup body -->
    </div>
    <!-- //popup -->
  </div>
  <!-- //container -->
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import {CommonBoardService} from '../../../api/common.service';

    @Component({
        components: {

        }
    })

    export default class OtpCheck extends Vue {
        inputName : any = '';
        saupId : any = '';
        phoneNum : any = '';
        otpTrue : boolean = false;
        result : boolean = false;
        title : string = "아이디 찾기";
        otpNumber :  string = "";
        showConfirm : boolean = false;
        $modal : any;
        confirmButton : boolean = false;

        timer : number = 180;
        counter : boolean = false;
        interval : number = 0;
        message : string = "";

        @Prop() loginId !: string;
        id : string = this.loginId;

        created(){
          this.accountGet();

          this.startTimer();
        }
        mounted(){

            let otp_Id = document.getElementById('otpNumberId');
            if(otp_Id!=null) otp_Id.focus();
        }
        goMain() { //메인이동
            this.$router.push('home/main')
        }
        policyDiv(titleNm){
            this.$router.push({path:'/home/policy', name:'policy', query:{ titleNm:titleNm }})
        }
        top(){
            window.scrollTo(0,0);
        }

        accountGet(){
            // CommonBoardService.getListDatas('accounts','myself',null)
            //     .then(result => {
            //         if(result.data.id ==null){
            //             alert('아이디가 존재하지 않습니다');
            //         }else{
            //             this.phoneNum = result.data.phoneNum;
            //             this.inputName = result.data.name;
            //             this.saupId = result.data.saupId;
            //             this.optCall();
            //         }
            //     }).catch()
        }

        optCall(){
            if(this.inputName == ''){
                alert('이름이 존재하지않습니다');
                return;
            }else if(this.saupId == ''){
                alert('사업자등록번호가 존재하지않습니다.');
                return;
            }else if(this.phoneNum == '') {
                alert('휴대폰 번호가 존재하지않습니다');
                return;
            }

            let otp = {
                        id: "",
                        name: this.inputName,
                        saupId:this.saupId,
                        phoneNum : this.phoneNum
                      }
                      CommonBoardService.postListDatas('otp',null,otp)
                              .then(result => {
                                if(result.data.code=='000'){
                                  this.startTimer();
                    }
                    else{
                        clearInterval(this.interval)
                    }

                }).catch(e=>{
                alert('본인인증정보가 불일치합니다')
            })
            // alert('인증번호를 발송하였습니다')
        }

        startTimer() {
            this.interval = setInterval(this.countDown, 1000);
        }

        optCallConfirm(auth_opt){

            if(this.message == '0:00'){
                alert('인증 시간이 초과되었습니다. 다시 로그인하세요.');
                this.closePop();
                return;
            }

            let otp = {
                /*id: "",
                name: this.inputName,
                saupId:this.saupId,
                phoneNum : this.phoneNum*/
            }

            let id : string = this.id;

            if(this.otpNumber){
                /*
                CommonBoardService.postListDatas('/otp/'+this.otpNumber+'/login', null, otp)
                    .then(result => {
                        if(result.data.code=='000'){
                            alert('인증되었습니다' )
                            //commit('LOGIN', result.data)

                            clearInterval(this.interval)
                            this.reset();
                            sessionStorage.setItem('sisMgtToken',sessionStorage.accountId)
                            this.$router.push({name:'main'})
                        }
                        else{
                            clearInterval(this.interval)
                        }

                    })*/

                //보안로직포함할곳
                this.$store.dispatch('OTP_LOGIN', {auth_opt, id})
                    .then((result) => {
                        //console.log(result);
                        if (result == 'success'||result == 'noinfo') {
                            sessionStorage.setItem('sisMgtToken',sessionStorage.accountId)

                            if(sessionStorage.code=='006'){
                              let sameConMsg = '현재 접속중인 사용자 정보입니다.\n\n접속정보\n접속 IP 주소 : '+ sessionStorage.lastIp +'\n최종접속 시간 : '+ sessionStorage.lastConnDt + '\n** 현재 접속 IP : '+ sessionStorage.currentIp + '\n\n종료후 접속하시겠습니까?';
                              if(confirm(sameConMsg)){
                                  CommonBoardService.updateListData('auth/force', sessionStorage.accountId+'/token' ,{token : sessionStorage.accessToken}).then((response) => {
                                      if(response.status == 200){
                                          this.$emit('menuChk');
                                      }
                                  }).catch(e=>{
                                          sessionStorage.clear()
                                          alert('오류가 발생하였습니다 잠시후에 시도해주세요')
                                      }
                                  );
                              }else{
                                  sessionStorage.clear()
                                  return;
                              }
                            }else{
                                this.$emit('menuChk');
                            }


                            //메뉴권한 부분 추가
                            //this.$router.push({name:'main'})
                        } else {
                            this.otpFail();
                        }
                    })
                    .catch(({message}) => this.otpFail());
            }
            else{
                alert('OTP번호를 입력해주세요')
            }

        }

        reset(){
            this.timer = 180;
            this.counter = false;
            this.interval = 0;
            this.message = "";
        }

        countDown() {
            var n = this.timer
            if (!this.counter) {
                this.counter = true;
            } else if (n > 0) {
                n = n - 1
                let minute = Math.floor(n/60)
                let sec  = n - (minute * 60)
                let stringVal  : string= sec.toString();
                if(sec < 10 ){
                    stringVal = "0"+ stringVal
                }
                this.timer = n
                this.message = minute+":"+ stringVal
            } else {
                clearInterval(this.interval);
                this.counter = false
                this.otpTrue = false;
            }
        }

        closePop(){
            this.$emit('close');
        }

        otpFail(){
            alert(sessionStorage.message);

            sessionStorage.clear();
        }

        otpRetry(){

            //this.reset();

            /*
        let otp = {
          id: this.loginId,
          name: this.inputName,
          saupId:this.saupId,
          phoneNum : this.phoneNum
        }*/

        CommonBoardService.getListDatas('otp/retry',this.id, '').then(result => {
              if(result.status==200){
                  alert('OTP번호가 재전송 되었습니다.');
                  this.reset();

                  let otp_Id = document.getElementById('otpNumberId');
                  if(otp_Id!=null) otp_Id.focus();
                  //this.startTimer();
              }
              else{
                  clearInterval(this.interval)
              }
            }).catch(e=>{
              alert('본인인증정보가 불일치합니다')
        })
      }




    }

</script>