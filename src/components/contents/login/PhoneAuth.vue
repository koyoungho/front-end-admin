<template>

    <!-- container -->
    <section id="container">
        <h2 class="blind">로그인</h2>

        <h3 class="login">관리자 본인 인증</h3>

        <!-- login wrap  -->
        <div class="login_wrap">
            <!-- login_box -->
            <div class="login_box type02">
                <p class="login_text">개인 정보 보호 및 현금영수증 발급 도용, 오남용 방지를 위하여 OTP 추가 인증을 진행합니다.<br>가입 시 등록하신 번호로 인증번호를 전송하고 수신한 인증번호를 아래에 입력하시기 바랍니다.<br>로그인에 문제가 있다면 고객센터 (02-2074-0340)으로 문의하시기 바랍니다.</p>

                <!-- cert box -->
                <div class="cert_box">
                    <p class="form_cert row01">
                        <label for="">수신자</label>
                        <select id="" name="" class="name" title="수신자 선택">
                            <option>홍길동</option>
                        </select>
                        <input type="text" class="tel" title="전화번호 입력">
                        <button type="button" id="" class="btn_m01 bg03">인증번호 전송</button>
                    </p>
                    <p class="form_cert row02">
                        <input type="text" id="" name="" size="" maxlength="" placeholder="인증번호 입력" class="cert" title="인증번호 입력">
                        <button type="button" id="" class="btn_m01 bg01" v-on:click="checkAuth()" >인증번호 확인</button>
                        <span class="time_count">00:00</span>
                    </p>

                </div>

            </div>
            <!-- //login_box -->
        </div>
        <!-- //login wrap  -->

    </section>
    <!-- //container -->


</template>

<script lang="ts">

    import {Component, Vue} from "vue-property-decorator";

    @Component({
        components: {
            PhoneAuth
        },
    })
    export default class PhoneAuth extends Vue {

        checkAuth(){
/*
            if() {//성공
                this.$router.push('/home/InitPass')

            }else if(){//실패
                alert("인증번호가 일치하지 않습니다. 다시 시도해 주십시오");
                return;
            }
*/
        }

    }






    // export default {
    //     name: "PhoneAuth"
    // }
</script>

<style scoped>

</style>