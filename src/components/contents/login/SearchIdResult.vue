<!--아이디 찾기 결과 보이기 화면-->

<template>

    <!-- container -->
    <section id="container">

        <h2 class="blind">로그인</h2>
        <h3 class="login">아이디 찾기</h3>

        <div class="page_control">
            <a href="#" class="btn_back">이전페이지</a>
            <a href="#" class="btn_pageclose">닫기</a>
        </div>

        <!-- login wrap  -->
        <div class="login_wrap">
            <!-- login_box -->
            <div class="login_box type01">

                <p class="login_complete">등록된 아이디는 <strong class="fc_pt02">gu****mi</strong> 입니다.</p>

                <!-- btn area -->
                <div class="btn_area">
                    <button type="button"  class="btn_b02 bg01" v-on:click="toLogin()">로그인 화면으로 이동</button>
                </div>
            </div>
            <!-- //login_box -->
        </div>
        <!-- //login wrap  -->

    </section>
    <!-- //container -->


</template>

<script>
    export default {
        name: "SearchIdResult",
        methods: {
            toLogin(){
                this.$router.push('/login');
            }
        }
    }
</script>

<style scoped>

</style>