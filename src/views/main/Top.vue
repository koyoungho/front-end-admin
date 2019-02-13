<template>
  <!-- top header -->
  <div class="top_header">
    <h1 class="logo" v-on:click="mainPage" ><a >현금영수증</a></h1>
    <!-- util wrap -->
    <div class="util_wrap">
			<ul class="util" id="topLoginInfo">
				<li class="user"><span class="name">{{loginName}}</span>님 </li>
			<li class="user_info">
				<span class="company">{{loginRoleNm}}</span>
			</li>
		</ul>
		<!-- btn_area -->
		<span class="btn_area">
			<template v-if="sessionCheck"><span class="btn_util bg01" v-on:click="tokenRefresh"> {{message}} 연장</span></template>
			<a class="btn_util bg01 " id="topInfoUpd" v-on:click="infoModity">정보변경</a>
			<a class="btn_util bg01 " id="topLogout" v-on:click="loginOut">로그아웃</a>
			<a class="btn_util bg01 " id="topLogin" v-on:click="loginPage">로그인</a>
		</span>
    </div>
  </div>
  <!-- //top header -->

</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import {CommonBoardService} from '../../api/common.service';

    @Component({
        components: {
            Top
        }
    })

    export default class Top extends Vue {
        @Prop() private msg!: string;

        loginName : any = ''; //로그인 사용자 성명
        loginRoleNm : any = ''; //사용자 등급
        sessionCheck : boolean = sessionStorage.accessToken ? true : false
			// 세션타임 카운트
        timer : number = 1770;
        counter : boolean = false;
        interval : number = 0;
        message : string = "";

        mounted() {
            let infoUpd = document.getElementById('topInfoUpd'); //정보수정
            let logout = document.getElementById('topLogout'); //로그아웃
            let login = document.getElementById('topLogin'); //로그인
			let loginInfo = document.getElementById('topLoginInfo'); //로그인 사용자 정보
            if(sessionStorage.accessToken){ //로그인 상태
                //localStore 값으로 보여줌
                this.loginName = sessionStorage.accountNm; //김현금
                this.loginRoleNm = sessionStorage.roleNm; //콜센터

                if(loginInfo != null){ loginInfo.hidden = false; } //로그인 사용자 정보
                if(infoUpd != null){ infoUpd.setAttribute('style', 'display:'); } //정보수정
                if(logout != null){ logout.setAttribute('style', 'display:'); } //로그아웃
                if(login != null) { login.setAttribute('style', 'display:none'); } //로그인
            }else{ //로그인 안한 상태
                if(loginInfo != null){ loginInfo.hidden = true; } //로그인 사용자 정보
                if(infoUpd != null){ infoUpd.setAttribute('style', 'display:none'); } //정보수정
                if(logout != null){ logout.setAttribute('style', 'display:none'); } //로그아웃
                if(login != null) { login.setAttribute('style', 'display:'); } //로그인
            }
        }

        loginPage() { //로그인
            this.$router.push('/login');
        }

        mainPage() { //메인
                this.$router.replace({name:'main'});
        }

        infoModity() {
            // if(sessionStorage.sisMgtToken == sessionStorage.accountId){
            this.$router.replace('/home/myPage');
            // }
            // else{
              //  OTP 필요

						// }
				}

        loginOut() {
            alert('세션이 종료되어 로그인화면으로 이동합니다');
            this.$store.dispatch('LOGOUT')
                .then(() =>
										this.$router.push({name: 'login'}) )
                .catch()
				}

        tokenRefresh() {
            if(sessionStorage.accessToken) { //로그인을 한 상태 확인
                // api 데이터 호출
              return  CommonBoardService.getListDatas('auth', null, '').then((response) => {
                        let result: any = response.data;
                        if (result != null) {
                            sessionStorage.accessToken = result.accesstoken;
                            this.reset();
                        } else {
                        }
                    }
                    , (error) => {
                    }
                ).catch((response) => {
                });
            }
            else{
                this.loginOut();
						}
        }

        created(){
            this.startTimer();
            this.tokenRefresh();
				}

        reset(){
            this.timer=1770;
            this.message = ""
            this.counter = false;
        }

        startTimer() {
            this.interval = setInterval(this.countDown, 1000);
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
								this.loginOut();
            }
        }
    }

</script>