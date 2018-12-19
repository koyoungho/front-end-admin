<template>
  <div id="wrapper">
    <div id="inc_header">
      <!-- header -->
      <header id="header">
        <!-- top header -->
        <div class="top_header mobile">
          <h1 class="logo" @click="goMain"><a>현금영수증</a></h1>
        </div>
        <!-- //top header -->
      </header>
      <!-- //header -->
    </div>
    <!-- container -->
    <section id="container">
      <h3 class="login">관리자 본인 인증</h3>
      <!-- login wrap  -->
      <div class="login_wrap">
        <!-- login_box -->
        <div class="login_box type02">
          <p class="login_text">개인 정보 보호 및 현금영수증 발급 도용, 오남용 방지를 위하여 OTP 추가 인증을 진행합니다.<br>가입 시 등록하신 번호로 인증번호를 전송하고 수신한 인증번호를 아래에 입력하시기 바랍니다.<br>로그인에 문제가 있다면 고객센터 (02-2074-0340)으로 문의하시기 바랍니다.</p>
          <!-- cert box -->
          <div class="cert_box">
            <p class="form_cert row01">
              <label for="">수신자</label>
              <select id="" name="" class="name" title="수신자 선택">
                <option>홍길동</option>
              </select>
              <input type="text" class="tel" title="전화번호 입력">
              <button type="button" id="" class="btn_m01 bg03">인증번호 전송</button>
            </p>
            <p class="form_cert row02">
              <input type="text" id="" name="" size="" maxlength="" placeholder="인증번호 입력" class="cert" title="인증번호 입력" v-model="otpNumber">
              <span class="time_count">{{message}}</span>
              <button type="button" id="" class="btn_m01 bg01" @click="optCallConfirm">인증번호 확인</button>
            </p>
          </div>
        </div>
        <!-- //login_box -->
      </div>
      <!-- //login wrap  -->

    </section>
    <!-- //container -->

    <!-- include footer -->
    <footer id="footer">
      <!-- quick banner -->
      <div class="quick_banner">
        <div class="quick">
          <span class="sub">고객센터</span>
          <p class="cont">
            <span class="tel">(02)<strong>2074-0340</strong></span>
            <span class="text">평일 09:30~18:00</span>
          </p>
        </div>
        <span class="page_top" @click="top"><a>TOP</a></span>
      </div>

      <div class="footer_wrap">
        <ul class="footer_links">
          <li><a href="https://www.kt.com/">(주) 케이티</a></li>
          <li><a href="https://www.ldcc.co.kr/">롯데정보통신 (주)</a></li>
          <li><a v-on:click="policyDiv('site')">이용약관</a></li>
          <li><a v-on:click="policyDiv('user')">개인보호처리방침</a></li>
        </ul>
        <div class="footer_address">
          <p class="footer_text01"><span class="company">(주)케이티  대표이사 황창규</span>
            <span class="address">(우)13606 경기도 성남시 분당구 불정로 90(정자동 206번지)</span>
            <span class="tel">문의전화 02-2074-0340</span> / <span class="fax">팩스번호 02-2074-6089</span>
          </p>
          <p class="footer_text02">Copyright ⓒ 2019 KT corporation & LDCC. <span class="rights">All rights reserved.</span></p>
        </div>
      </div>
    </footer>

  </div>
  <!-- container -->

  <!-- //container -->
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import {CommonBoardService} from '../../api/common.service';

    @Component({
        components: {

        }
    })

    export default class OtpCheckm extends Vue {
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

        created(){
          // this.accountGet()
        }
        mounted(){

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
            CommonBoardService.getListDatas('accounts','myself',null)
                .then(result => {
                    if(result.data.id ==null){
                        alert('아이디가 존재하지 않습니다');
                    }else{
                        this.phoneNum = result.data.phoneNum;
                        this.inputName = result.data.name;
                        this.saupId = result.data.saupId;
                        this.optCall();
                    }
                }).catch()
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


        optCallConfirm(){
            let otp = {
                id: "",
                name: this.inputName,
                saupId:this.saupId,
                phoneNum : this.phoneNum
            }
           if(this.otpNumber){
                CommonBoardService.postListDatas('otp',this.otpNumber,otp)
                    .then(result => {
                        if(result.data.code=='000'){
                            alert('인증되었습니다' )
                            clearInterval(this.interval)
                            this.reset();
                            sessionStorage.setItem('sisMgtToken',sessionStorage.accountId)
                            this.$router.push({name:'main'})
                        }
                        else{
                            clearInterval(this.interval)
                        }

                    })
            }
            else{
                alert('otp번호를 입력해주세요')
            }

        }

        reset(){
            this.timer=180;
            this.message = ""
            this.counter = false;
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
    }

</script>