


<template>
  <div >
    <div >
      <router-link v-if="authenticated" to="/login" v-on:click.native="logout()" replace></router-link>
    </div>
    <router-view @authenticated="setAuthenticated" />
  </div>
</template>

<script>


    export default {
        name: 'App',
        data() {
            return {
                authenticated: false,
                mockAccount: {
                    username: "111",
                    password: "111"
                }
            }
        },
        mounted() {
            // 최초 접근시 로그인정보 있을경우 없을경우 해당 이동페이지 설정
             if(!this.authenticated) {
               // alert('login N');
               // this.$router.replace('/login');
            }
        },
        methods: {
            setAuthenticated(status) {
                this.authenticated = status;
            },
            logout() {
                this.authenticated = false;
            },
        },
    }
</script>




<style>
   @import "assets/css/default.css";
   @import "assets/css/common.css";

</style>

