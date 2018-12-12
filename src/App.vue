


<template>
  <div >
    <div >
      <router-link v-if="authenticated" to="/login" replace></router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>

  import {CommonBoardService} from '../src/api/common.service';
  import Router from 'vue-router'

  export default {
    name: 'App',
    data() {
      return {
        authenticated: false,
        mockAccount: {
          username: "",
          password: ""
        }
      }
    },
    created() {
      // 세션이 존재할때

      this.$router.beforeEach(function(to, from, next) {
        // to: 이동할 url에 해당하는 라우팅 객체
        let menuName = "";
        let loginOk = to.matched.some(function(routeInfo) {
          menuName = routeInfo.name
          return routeInfo.meta.authRequired;
        })
        if (sessionStorage.accessToken) {
          if(menuName =='error' || menuName=='login' ){ // 공용페이지 접근시 통과
            next()
          }
          else{ // 권한필요한페이지 접근시 체크
            if (loginOk) {
              // CommonBoardService.getListDatas('menu', null, null).then(response => {
              //   let datas = response.data;
              //   if (datas) { // 해당 메뉴 결과값받아서 비교후 접근가능일시
              //     // TODO 체크로직넣어야함f
              //     sessionStorage.setItem('authMenu',JSON.stringify(datas))
              //     next()
              //   } else { // 접근권한 없을시
              //     alert('메뉴 접근권한이 없습니다');
              //   }
              // }).catch(e=>{
              //   // window.location.href='/#/error'
              // })
              next();
            } else {
              next(); // 페이지 전환
            }
          }
        }else{
          window.location.href='/'
        }

      })
    },
    mounted() {

    },
    methods: {
    },
  }
</script>




<style>
  @import "assets/css/default.css";
  @import "assets/css/common.css";
  @import "assets/css/vue-airbnb-style-datepicker.css";
</style>

