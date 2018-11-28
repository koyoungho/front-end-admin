<template>

    <!-- container -->
    <section id="container">

        <h2 class="login">비밀번호 변경</h2>

        <div class="page_control">
            <a href="#" class="btn_back">이전페이지</a>
            <a href="#" class="btn_pageclose">닫기</a>
        </div>

        <!-- login wrap  -->
        <div class="login_wrap">
            <!-- login_box -->
            <div class="login_box type01">

                <p class="login_text">비밀번호를<em class="fc_pt01">90일동안</em> 변경하지 않았습니다.<br>계정 도용을 방지하기 위해 비밀번호를 변경해 주시기 바랍니다.</p>

                <fieldset class="login_form">
                    <legend> 로그인 </legend>
                    <!-- login -->
                    <ul class="login">
                        <li class="form_id">
                            <input type="text" id="curPassword" name="curPassword" v-model="curPassword" size="" maxlength="20" placeholder="현재 비밀번호" class="id" title="현재 비밀번호 입력">
                        </li>
                        <li class="form_pw">
                            <input type="password" id="newPassword" name="newPassword" v-model="newPassword" size="" maxlength="20" placeholder="새로운 비밀번호" class="pw" title="새로운 비밀번호 입력">
                        </li>
                        <li class="form_pwcom">
                            <input type="password" id="conPassword" name="conPassword" v-model="conPassword" size="" maxlength="20" placeholder="비밀번호 확인" class="pw" title="비밀번호 확인 입력">
                        </li>
                    </ul>
                </fieldset>
                <!-- btn area -->
                <div class="btn_area">
                    <button type="button" v-on:click="nextChange()" id="" class="btn_b01 bg02">다음에 변경</button>
                    <button type="button" v-on:click="passChange()" id="" class="btn_b01 bg01">변경</button>
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
        name: "ChgPass",
        methods: {
            nextChange() {
            },
            passChange() {

                if(curPassword.value == ''){
                    alert('현재 비밀번호를 입력하세요.')
                    return;
                }else if(newPassword.value == ''){
                    alert('새로운 비빌번호를 입력하세요.')
                    return;
                }else if(conPassword.value == ''){
                    alert('확인 비밀번호를 입력하세요.')
                    return;
                }

            }
        }
    }
</script>

<style scoped>

</style>