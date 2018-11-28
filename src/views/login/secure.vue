<template>

</template>

<script>
  import decode from 'jwt-decode';
  import axios from 'axios';
  import Router from 'vue-router';
  import auth0 from 'auth0-js';

  const ID_TOKEN_KEY = 'id_token';
  const ACCESS_TOKEN_KEY = 'access_token';

  const CLIENT_ID = '{AUTH0_CLIENT_ID}';
  const CLIENT_DOMAIN = '{AUTH0_DOMAIN}';
  const REDIRECT = 'YOUR_CALLBACK_URL';
  const SCOPE = '{SCOPE}';
  const AUDIENCE = 'AUDIENCE_ATTRIBUTE';


  var auth = new auth0.WebAuth({
    clientID: CLIENT_ID,
    domain: CLIENT_DOMAIN
  });

  export function login() {
    auth.authorize({
      responseType: 'token id_token',
      redirectUri: REDIRECT,
      audience: AUDIENCE,
      scope: SCOPE
    });
  }

  var router = new Router({
    mode: 'history',
  });

  export function logout() {
    clearIdToken();
    clearAccessToken();
    this.router.go('/');
  }

  export function requireAuth(to, from, next) {
    if (!isLoggedIn()) {
      next({
        path: '/',
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  }

  export function getIdToken() {
    return localStorage.getItem(ID_TOKEN_KEY);
  }

  export function getAccessToken() {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  }

  function clearIdToken() {
    localStorage.removeItem(ID_TOKEN_KEY);
  }

  function clearAccessToken() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  }

  // Helper function that will allow us to extract the access_token and id_token
  function getParameterByName(name) {
    let match = RegExp('[#&]' + name + '=([^&]*)').exec(window.location.hash);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
  }

  // Get and store access_token in local storage
  export function setAccessToken() {
    let accessToken = getParameterByName('access_token');
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  }

  // Get and store id_token in local storage
  export function setIdToken() {
    let idToken = getParameterByName('id_token');
    localStorage.setItem(ID_TOKEN_KEY, idToken);
  }

  export function isLoggedIn() {
    const idToken = getIdToken();
    return !!idToken && !isTokenExpired(idToken);
  }

  function getTokenExpirationDate(encodedToken) {
    const token = decode(encodedToken);
    if (!token.exp) { return null; }

    const date = new Date(0);
    date.setUTCSeconds(token.exp);

    return date;
  }

  function isTokenExpired(token) {
    const expirationDate = getTokenExpirationDate(token);
    return expirationDate < new Date();
  }

    export default {
        name: 'secure',
        data() {
            return ({ test: 'ok'});
        },
        beforeCreate(){
            console.log('1 data와 events(vm.$on, vm.$once, vm.$off, vm.$emit)가 세팅되지 않은 시점이므로 접근하려고 하면 에러를 뿜어낼 것이다.');
        },
        created(){
            console.log('2 data와 events 활성화 접근가능 여전히 템플릿과 가상돔은 마운트 렌더링되지 않은 상태이다' , '컴포넌트 초기에 세팅되어야할 데이터 페치' , '부모에서 -> 자식으로 실행');
        },
        beforeMount(){
            console.log('3 컴파일후에 첫렌더링  사용안하는게좋다')
        },
        mounted() {
            console.log('4 컴포넌트 템플릿 렌더링된 돔에 접근가능  자식부터 종료된후에 부모 마운트 실행한다.')
            this.$nextTick(function (){
                console.log('4 모든 화면이 렌더링된후 실행한다 ')
                // if(this.test=='ok'){


              setAccessToken();
                console.log(localStorage.getItem("accessToken"));

              alert('세큐어쪽에서 로직 처리하고 이동한다 ')
                // this.$router.replace('home/menu1');
                // }
            })

        },
        updated(){
            console.log('6 재렌더링 된후에 이벤트완료후에 진행하는 단 무한루프를 조심 ')
            this.$nextTick(function (){
                console.log('6 모든 화면이 렌더링된후 실행한다 ')
            })
        },
        beforeDestroy(){
             console.log('뷰인스턴스제거 되기직전 호출  이벤트관련 리스너 제거 reactive subsctiption 제거');
        },
        destroyed(){
            console.log('뷰 인스턴스 제거된 후에 호출 ');
            console.log('activated deactivated keep-alive 컴포넌트가 활성화될때와 비활성화될때 호출된다 ');
        }

    }
</script>

