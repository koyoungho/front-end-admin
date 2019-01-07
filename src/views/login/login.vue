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

      <!-- login wrap  -->
      <div class="login_wrap">
        <!-- login_box -->
        <div class="login_box">
          <h2 class="login">현금영수증 시스템 관리자 로그인</h2>
          <p class="login_text">로그인을 위하여 아래 아이디와 비밀번호를 입력해 주세요.</p>

          <fieldset class="login_form">
            <legend> 로그인</legend>
            <!-- login -->
            <ul class="login">
              <li class="form_id">
                <input type="text" v-model="id" maxlength="50" placeholder="아이디" class="id" title="아이디 입력">
              </li>
              <!--<form>-->
                <li class="form_pw">
                  <input type="password" v-model="password" maxlength="50" placeholder="비밀번호" class="pw" title="비밀번호 입력"
                         autocomplete="username pwd" v-on:keyup.enter="onSubmits(id, password)">
                </li>
              <!--</form>-->
            </ul>
            <!-- btn -->
            <button type="button" id="" class="btn_b01 bg01" @click="onSubmits(id, password)">로그인</button>
          </fieldset>

          <!-- login info -->
          <div class="login_info">
            <a @click="searchId" class="id">아이디 찾기</a> |
            <a @click="initPass" class="pw">비밀번호 초기화</a>
          </div>
        </div>
        <!-- //login_box -->

        <!-- main mid -->
        <div class="main_middle">
          <div class="notice_box">
            <h2>공지사항</h2>
            <ul class="notice_list">
              <li>
                <a>현금영수증 시스템 정기 점검 및 작업 안내현금영수증 시스템 정기 점검 및 작업 안내</a>
                <span class="date">2018.04.04</span>
              </li>
              <li>
                <a>현금영수증 시스템 정기 점검 및 작업 안내</a>
                <span class="date">2018.04.04</span>
              </li>
              <li>
                <a>현금영수증 시스템 정기 점검 및 작업 안내</a>
                <span class="date">2018.04.04</span>
              </li>
            </ul>
            <a class="btn_more">더보기</a>
          </div>

          <!-- login info box -->
          <div class="login_info_box">
            <dl class="info">
              <dt>고객센터</dt>
              <dd>
                <strong>02-2074-0340</strong>
                <span class="sub">상담시간 : </span>
                <span class="text">평일 09:30~18:00</span>
                <span class="cf_text">(점심시간 12:00~1:00)</span>
              </dd>
            </dl>
            <dl class="info">
              <dt>팩스번호</dt>
              <dd>
                <strong>02-2074-6089</strong>
                <span class="cf_text">(사업자등록증 제출용)</span>
              </dd>
            </dl>
          </div>
          <!-- //login info box -->

        </div>
        <!-- //main mid -->

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
          <p class="footer_text02">Copyright ⓒ 2019 KT corporation & LDCC. <span
              class="rights">All rights reserved.</span></p>
        </div>
      </div>
    </footer>
    <OtpCheck v-if="otpChecks" v-on:menuChk ="checkMenu" v-bind:loginId=id @close="otpChecks=false"></OtpCheck>
  </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import OtpCheck from '../../components/contents/login/otpCheck.vue'

    @Component({
        components: {
            Login,OtpCheck
        }
    })
    export default class Login extends Vue {
        otpChecks : boolean =false;
        id : string = "";
        password : string = "";

        created() {
            if (sessionStorage.accessToken) {
                this.goMain();
            }
        }

        mounted() {

        }

        top() {
            window.scrollTo(0, 0);
        }

        onSubmits(id, password) {

            if (id == '') {
                alert('아이디를 입력하세요.');
                return;
            } else if (password == '') {
                alert('비밀번호를 입력하세요.');
                return;
            }

            //보안로직포함할곳
            this.$store.dispatch('LOGIN', {id, password})
                .then((result) => {
                    console.log('로그인 확인 여부');
                    console.log(result);
                    if (result == 'success') {
                        this.checkAuth();
                    }
                    else if (result == 'noinfo') {
                        this.loginChk();
                    }
                    else {
                        this.loginFail();
                    }
                })
                .catch(({message}) => this.loginFail());
        }

        loginChk() { //로그인 코드별 화면 분기
            let nextPage = '';

            //비밀번호 5회 틀릴시 계점 잠긴 상태
            if (sessionStorage.failCnt > 4) {
                alert('비밀번호를 5회이상 틀려서 계정이 잠긴 상태입니다.\n고객센터에 문의하세요.');
                return;
            }

            if(sessionStorage.lastIp == 'null' ||  sessionStorage.lastConnDt == 'null'){ //최초로그인시
                console.log('최초 로그인 한 경우 ip null!!  lastDt null!!')
                this.$router.push({name:'termsCheck'});
            }else {

                if (sessionStorage.code == '000') { // 로그인 성공 -> 메인화면 이동
                    nextPage = 'main';

                    alert('최종 접속정보\n접속 IP 주소 : ' + sessionStorage.lastIp + '\n최종접속 시간 : ' + sessionStorage.lastConnDt);
                } else if (sessionStorage.code == '001') { // 90일동안 비밀번호 변경 않음 -> 비밀번호 변경 페이지 이동
                    nextPage = 'chgPass';

                } else if (sessionStorage.code == '002') { //휴면계정 -> 비밀번호 초기화 화면 이동
                    //nextPage = 'phoneAuth'

                    if (confirm('1년이상 접속하지 않아 접속이 차단되었습니다. 재사용 하시려면 휴대폰 본인인증이 필요합니다.')) {
                        nextPage = 'initPass';
                    } else {
                        return;
                    }
                } else if (sessionStorage.code == '003') { //비밀번호 불일치
                    nextPage = 'notPass';

                    alert('로그인 정보가 맞지 않습니다.\n' + sessionStorage.failCnt + '회 실패. 5회 실패시에는 해당 계정의 접속이 차단됩니다.');
                    return;
                } else if (sessionStorage.code == '004') { //비밀번호 5회이상 틀린 틀림 -> 비밀번호 초기화
                    nextPage = 'initPass';

                    alert('로그인을 5회 실패하여 계정 접속을 차단합니다. 아이디 찾기, 비밀번호 초기화로 계정 로그인 정보를 확인하시기 바랍니다.');
                    //return;
                } else if (sessionStorage.code == '005') { //사업자등록번호로 로그인
                    sessionStorage.saupYn = 'Y'; //가맹점 신규 등록화면에서 사업장정보 조회시 필요
                    nextPage = 'saupLogin';
                } else if (sessionStorage.code == '006') { //동일IP로 로그인
                    alert('다른 기기로 접속하여 접속을 해제합니다.');
                    return;
                } else if (sessionStorage.code == '007') { //IP 불일치
                    alert('다른 곳에서 계정이 사용중 입니다. 기존 접속 계정을 로그아웃 후 다시 시도해 주기시 바랍니다.');
                    return;
                } else if (sessionStorage.code == '008') { //해지
                    alert('계정이 해지된 사용자 입니다.');
                    return;
                } else if (sessionStorage.code == '009') { //승인 대기
                    alert('승인 대기 중 입니다.');
                    return;
                } else {
                    alert('잘못된 로그인 정보입니다. 로그인 정보를 확인하세요.');
                    return;
                }

                // 로그인완료 메뉴로딩완료시  OTP인증 이동한다 무조건 1회성 단 시스템관리자를 제외한 다른권한은 정보변경 및 내용조회시 재인증

                // 인증페이지이동
                this.$router.push('home/' + nextPage);
                //this.$router.push(nextPage);

            }

        }

        checkAuth(){
            //console.log('otp 인증 화면 보이기전 세션 확인!!!')
            //console.log(sessionStorage)
            this.otpChecks=true
            /*if(sessionStorage.role=='0001'){
                this.otpChecks=true
            }
            else{
                this.checkMenu();
            }*/
        }

        checkMenu(){
            this.$store.dispatch('MENU').then(result => {
                if (result == 'Y') {
                    this.loginChk();
                }
                else {
                    this.loginFail();
                }
            });
        }

        loginFail() {
            alert('로그인 정보를 확인하세요.');
            return;
        }

        regFranchise() { //가맹점 가입
            this.$router.push('home/cashInstitution');
        }

        searchId() { //아이디 찾기
            this.$router.push({path: '/searchIdInput'});
        }

        initPass() { //비밀번호 초기화
            this.$router.push({path: '/initPass'});
        }

        goMain() { //메인이동
            this.$router.push('home/main');
        }

        policyDiv(titleNm) {
            this.$router.push({path: '/home/policy', name: 'policy', query: {titleNm: titleNm}});
        }

    }


</script>