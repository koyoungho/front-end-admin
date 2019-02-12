<template>
  <div>
    <router-link v-if="authenticated" to="/login" replace></router-link>
    <router-view/>
  </div>
</template>

<script>

  export default {
    name: 'App',
    data() {
      return {
        authenticated: false,
        mockAccount: {
          username: '',
          password: ''
        }
      };
    },
    created() {
      // 세션이 존재할때
      let ua = navigator.userAgent.toLowerCase();
      let isWinXP = ua.indexOf('windows nt 5.1') > 0;

      if(ua.indexOf('chrome') !=-1){ // 크롬이아닐때
      }else {
        if (ua.indexOf('windows nt 5.0') > -1) {
          this.$router.push({name: 'noticeUpXp'})
        } else if (ua.indexOf('windows nt 5.1') > -1) {
          this.$router.push({name: 'noticeUpXp'})
        } else if (ua.indexOf('windows nt 6.0') > -1) {
          this.$router.push({name: 'noticeUpXp'})
        }
      }

      // 브라우저일경우
      if (navigator.userAgent.indexOf("MSIE 10") > -1) {
        // this is internet explorer 10
        this.$router.push({name:'noticeUp'})
      }else if(navigator.userAgent.indexOf("MSIE 9") > -1){
        this.$router.push({name:'noticeUp'})
      }else if(navigator.userAgent.indexOf("MSIE 8") > -1){
        this.$router.push({name:'noticeUp'})
      }

      if(window.location.pathname=='/index.html'){
        window.location.href = '/'
      }


      this.$router.beforeEach(function(to, from, next) {
        // to: 이동할 url에 해당하는 라우팅 객체
        let menuName = '';
        let loginOk = to.matched.some(function(routeInfo) {
          menuName = routeInfo.name;
          return routeInfo.meta.authRequired;
        });

        if (menuName == 'error' || menuName == 'home' || menuName == 'login' || menuName == 'searchIdInput' || menuName == 'searchIdResult' || menuName == 'initPass' || menuName == 'policy' || menuName == 'termsCheck' || menuName == 'regPass' || menuName == 'kmcResult' ) { // 공용페이지 접근시 통과
          next();
        } else {
          if (sessionStorage.accessToken) { // 토큰
            if (loginOk) { // 메타확인
              let result = 'sucess';
              let authMenu = sessionStorage.getItem('authMenu');
              let menu = JSON.parse(authMenu);
              let passOk = 'Y';
              // 라우터주소는 있지만 권한받지않는 메뉴는 넘어간다
              //     if (menuName == 'main') {
              //         passOk='Y'
              //     } else {
              //       menu.filter(e => {
              //         e.subMenuDtos.filter(s => {
              //           if (s.progId == menuName) {
              //             passOk = 'Y';
              //           }
              //         });
              //       });
              //     }
              //     alert(passOk);
              if (passOk == 'Y') { // 로그인한살람이 접근할수 있는 메뉴면
                //     alert(menuName)
                // alert('넘어갑니다');
                next();
              } else {
                alert(menuName)
                alert('권한이 없습니다');
                window.location.href = '/';
              }
            } else { // 메타체크안하는 파일일경우 그냥 넘김
              next();
            }
          }
          else {  // 토큰이 없을경우 무조건 로그인페이지로 돌림
            window.location.href = '/#/login';
          }
        }

      });
    },
    mounted() {
    }
  };
</script>


<style>
  @import "assets/css/default.css";
  @import "assets/css/common.css";
/*에디터 메뉴 숨기기*/
  .mce-container .mce-menubar {display: none; }
</style>

