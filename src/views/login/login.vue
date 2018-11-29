<template>
<div id="wrapper">

  <div id="inc_header">
    <!-- header -->
    <header id="header">
      <!-- top header -->
      <div class="top_header mobile">
        <h1 class="logo" v-on:click="goMain"><a href="#">현금영수증</a></h1>
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
          <legend> 로그인 </legend>
          <!-- login -->
          <ul class="login">
            <li class="form_id">
              <input type="text" name="" size="" v-model="id" maxlength="" placeholder="아이디" class="id" title="아이디 입력">
            </li>
            <li class="form_pw">
              <input type="password" name="" size="" v-model="password" maxlength="" placeholder="비밀번호" class="pw" title="비밀번호 입력">
            </li>
          </ul>

          <!-- btn -->
          <button type="button" id="" class="btn_b01 bg01" v-on:click="onSubmit(id, password)">로그인</button>
        </fieldset>

        <!-- login info -->
        <div class="login_info">
          <a href="#" v-on:click="searchId()" class="id">아이디 찾기</a> |
          <a href="#" v-on:click="initPass()" class="pw">비밀번호 초기화</a>
        </div>
      </div>
      <!-- //login_box -->

      <!-- main mid -->
      <div class="main_middle">
        <div class="notice_box">
          <h2>공지사항</h2>
          <ul class="notice_list">
            <li>
              <a href="#">현금영수증 시스템 정기 점검 및 작업 안내현금영수증 시스템 정기 점검 및 작업 안내</a>
              <span class="date">2018.04.04</span>
            </li>
            <li>
              <a href="#">현금영수증 시스템 정기 점검 및 작업 안내</a>
              <span class="date">2018.04.04</span>
            </li>
            <li>
              <a href="#">현금영수증 시스템 정기 점검 및 작업 안내</a>
              <span class="date">2018.04.04</span>
            </li>
          </ul>
          <a href="#" class="btn_more">더보기</a>
        </div>

        <!-- login info box -->
        <div class="login_info_box">
          <dl class="info">
            <dt>현금 영수증 관련 문의</dt>
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
          <strong>02-2074-0340</strong>
          <span class="text">평일 09:30~18:00</span>
        </p>
      </div>
      <span class="page_top" v-on:click="top"><a href="typeScript:void()">TOP</a></span>

    </div>

    <div class="footer_wrap">
      <ul class="footer_links">
        <li><a href="https://www.kt.com/">(주) 케이티</a></li>
        <li><a href="https://www.ldcc.co.kr/">롯데정보통신 (주)</a></li>
        <li><a href="#">이용약관</a></li>
        <li><a href="#">개인보호처리방침</a></li>
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
</template>

<script >

    export default {
        name: 'login',
        data() {
            return {
                id: "111",
                password: "111",
            }
        },
        methods: {
            top(){
                window.scrollTo(0,0);
            },
            onSubmit(id, password) {

                if(id == ''){
                    alert("아이디를 입력하세요.")
                    return;
                }else if(password == ''){
                    alert("비밀번호를 입력하세요.")
                    return;
                }

                // if(this.id != "" && this.password != "") {
                //     this.$emit("authenticated", true);
                //보안로직포함할곳
                this.$store.dispatch('LOGIN', {id, password})
                //.then(() => this.redirect())
                    .then(() => this.loginChk())
                    .catch(({message}) => this.loginFail())
                // this.$router.replace('secure');
                // this.$router.replace({ name: "home" });
                // } else {
                //   console.log("A id and password must be present");
                //   this.$router.replace({ name: "home" });
                // }
            },
            redirect(nextPage) {
                //console.log('====='+nextPage+'=====')
                const {search} = window.location
                const tokens = search.replace(/^\?/, '').split('&')
                const {returnPath} = tokens.reduce((qs, tkn) => {
                    const pair = tkn.split('=')
                    qs[pair[0]] = decodeURIComponent(pair[1])
                    return qs
                }, {})

                // 리다이렉트 처리
                this.$router.push('home/'+nextPage)
                //this.$router.push(nextPage)
            },
            vueRecaptchaApiLoaded() {
            },
            loginChk() { //로그인 코드별 화면 분기
                var nextPage = ''
                //console.log("login auth check!!!!!!")
                //this.$router.push('home/ioc')

                // if(localStorage.code == '000'){
                //     //console.log('로그인 성공 | code :: ' + localStorage.code)
                //     nextPage = 'phoneAuth'
                //
                //     alert('최종 접속정보\n접속 IP 주소 : '+ localStorage.lastIp +'\n최종접속 시간 : '+ localStorage.lastConnDt)
                // }else if(localStorage.code == '001'){ // 비밀번호 변경 페이지 이동
                //     //console.log('90일동안 비밀번호 변경 않음 | code :: ' + localStorage.code)
                //     nextPage = 'chgPass'
                //
                // }else if(localStorage.code == '002'){ //4번 -> 휴대폰 화면 이동
                //     //console.log('휴면계정 | code :: ' + localStorage.code)
                //     nextPage = 'phoneAuth'
                //
                //     if(confirm('1년이상 접속하지 않아 접속이 차단되었습니다. 재사용 하시려면 휴대폰 본인인증이 필요합니다.')){
                //
                //     }else{
                //         return;
                //     }
                // }else if(localStorage.code == '003'){ //2번
                //     //console.log('비밀번호 틀림 | code :: ' + localStorage.code)
                //     nextPage = 'notPass'
                //
                //     alert('로그인 정보가 맞지 않습니다.\n' + localStorage.failCnt + '회 실패. 5회 실패시에는 해당 계정의 접속이 차단됩니다.')
                //     return;
                // }else if(localStorage.code == '004'){
                //     //console.log('잠긴계정 | code :: ' + localStorage.code)
                //     nextPage = 'phoneAuth'
                //
                //     if(confirm('1년이상 접속하지 않아 접속이 차단되었습니다. 재사용 하시려면 휴대폰 본인인증이 필요합니다.')){
                //
                //     }else{
                //         return;
                //     }
                // }else if(localStorage.code == '005') {
                //     nextPage = 'bussinessLogin'
                //     //console.log('사업자등록번호 로그인 | code :: ' + localStorage.code)
                // }else if(localStorage.code == '006') {
                //
                // }else if(localStorage.code == '007') { //다른 곳에서 계정이 사용중 입니다
                //     alert('다른 곳에서 계정이 사용중 입니다.')
                //     return;
                // }
                // /*
                // else if((localStorage.code == ){ //TODO 로그인 5회이상 실패시
                //   alert('로그인을 5회 실패하여 계정 접속을 차단합니다. 아이디 찾기, 비밀번호 초기화로 계정 로그인 정보를 확인하시기 바랍니다.');
                //   retrurn;
                // }else if (localStorage.code ==){//TODO 승인대기
                //     alert('승인대기중입니다..')
                //     return;
                // }
                //  */
                //
                // else {
                //     //console.log('잘못된 로그인 정보입니다. 로그인 정보를 확인하세요')
                //     return;
                // }
                // //console.log(localStorage.code)

                this.redirect('main')
            },
            loginFail() {
                alert('로그인 정보를 확인하세요.')
                return;
            },
            searchId() { //아이디 찾기
                //console.log('아이디 찾기')
                this.$router.push('home/searchIdInput')
            },
            initPass() { //비밀번호 초기화
                //console.log('비밀번호 초기화')
                //TODO OTP페이지로 이동
                this.$router.push('home/initPass')
            },
            goMain() {
                this.$router.push('home/main')
            }


        }, created() {



        }, mounted() {

        }
    }


</script>