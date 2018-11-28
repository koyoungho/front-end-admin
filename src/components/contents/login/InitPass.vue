<template>

    <!-- container -->
    <section id="container">
        <h2 class="blind">로그인</h2>
        <h3 class="login">비밀번호 {{div}}</h3>

        <div class="page_control">
            <a href="#" class="btn_back">이전페이지</a>
            <a href="#" class="btn_pageclose">닫기</a>
        </div>

        <!-- login wrap  -->
        <div class="login_wrap">
            <!-- login_box -->
            <div class="login_box type01">
                <p class="login_text" >사용하고자 하는 비밀번호를 입력해 주시기 바랍니다.</p>

                <fieldset class="login_form">
                    <legend> 로그인 </legend>
                    <!-- login -->
                    <ul class="login">
                        <li class="form_pw">
                            <input type="password" id="password" name="" size="" maxlength="" placeholder="비밀번호" class="pw" title="비밀번호 입력">
                        </li>
                        <li class="form_pwcom">
                            <input type="password" id="passwordCom" name="" size="" maxlength="" placeholder="비밀번호 확인" class="pw" title="비밀번호 확인 입력">
                        </li>
                    </ul>
                </fieldset>
                <!-- btn area -->
                <div class="btn_area">
                    <button type="button" v-on:click="passCancel()" id="passCancel" class="btn_b01 bg02">취소</button>
                    <button type="button" v-on:click="passRegist()" id="passRegist" class="btn_b01 bg01">등록</button>
                </div>
                <!-- info bot -->
                <div class="info_bot">
                    <span class="text_type02">비밀번호는 (숫자 + 문자 등 2가지 조합의 경우 10자리) 또는 <br>(숫자 + 문자 + 특수문자 등3가지 조합의 경우 8자리) 로 만들어 주세요.</span>
                </div>
            </div>
            <!-- //login_box -->
        </div>
        <!-- //login wrap  -->

    </section>
    <!-- //container -->

</template>

<script lang="ts">

    import {Component, Prop, Vue} from 'vue-property-decorator';

    @Component({
        components: {
            InitPass
        }
    })

    export default class InitPass extends Vue {
        div :string ="";

        mounted () {
            // if(){//비밀번호 초기화 및 최초 로그인
                // this.div = '등록';
            // }else if(){//비밀번호 초기화 및 최초 로그인
            //     this.div = '초기화';
        // }
        }
        passCancel() {
            this.$router.push('/login')
        }
        passRegist() {
        }
    }
</script>

<style scoped>

</style>