<template>
  <!-- top header -->
  <div class="top_header">
    <h1 class="logo" v-on:click="mainPage" ><a >현금영수증</a></h1>
    <!-- util wrap -->
    <div class="util_wrap">
		<ul class="util" id="topLoginInfo">
			<li class="user"><span class="name">{{loginName}}</span>님</li>
			<li class="user_info">
				<span class="company">{{loginCompany}}</span>
				<span class="branch">{{loginBranch}}</span>
				<span class="store">{{loginStore}}</span>
				<span class="number">({{loginBusinessNo}})</span>
			</li>
		</ul>
		<!-- btn_area -->
		<span class="btn_area">
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

    @Component({
        components: {
            Top
        }
    })

    export default class Top extends Vue {
        @Prop() private msg!: string;

        loginName : any = ''; //로그인 사용자 성명
		loginCompany : any = ''; //로그인 사용자 회사
		loginBranch : any = ''; //로그인 사용자 지점
		loginStore : any = ''; //로그인 사용자 상점
		loginBusinessNo : any = ''; //로그인 사용자 사업장등록번호

        mounted() {
            let infoUpd = document.getElementById('topInfoUpd'); //정보수정
            let logout = document.getElementById('topLogout'); //로그아웃
            let login = document.getElementById('topLogin'); //로그인
			let loginInfo = document.getElementById('topLoginInfo'); //로그인 사용자 정보

            if(sessionStorage.accessToken){ //로그인 상태
                //localStore 값으로 보여줌
                this.loginName = '김현금';
                this.loginCompany = '롯데백화점';
                this.loginBranch = '강남점';
                this.loginStore = 'GUZZA몰';
                this.loginBusinessNo = '123-34-12345';
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
            this.$router.replace('/home/IssueViewingCancel');
				}

        loginOut() {
            this.$store.dispatch('LOGOUT')
                .then(() =>
										this.$router.push({name: 'login'}) )
                .catch()
		}
    }

</script>