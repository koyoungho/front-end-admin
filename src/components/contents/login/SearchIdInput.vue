<!--아이디 찾기 화면 - 아이디, 전화번호 입력-->

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
                <p class="login_text">아이디를 확인하기 위해서는 가입시 등록하신 이름과<br>휴대폰 번호와 사업자등록번호를 입력해 주시기 바랍니다.</p>  <!-- 20181112 수정 -->

                <fieldset class="login_form">
                    <legend> 로그인 </legend>
                    <!-- login -->
                    <ul class="login">
                        <li class="form_name">
                            <input type="text"  v-model="name" name="" size="" maxlength="" placeholder="이름" class="name" title="이름 입력">
                        </li>
                        <li class="form_tel">
                            <input type="text"  v-model="phoneNum" name="" size="" maxlength="" placeholder="휴대폰번호" class="tel" title="휴대폰번호 입력">
                        </li>
                        <li class="form_ind">
                            <input type="text"  v-model="bizNum" name="" size="" maxlength="" placeholder="사업자등록번호" class="tel" title="사업자등록번호 입력">
                        </li>
                    </ul>
                </fieldset>
                <!-- btn area -->
                <div class="btn_area">
                    <button type="button" v-on:click="searchCancel()" id="cancel" class="btn_b01 bg02">취소</button>
                    <button type="button" v-on:click="onSubmit(name, phoneNum, bizNum)" id="searchId" class="btn_b01 bg01">아이디 조회</button>
                </div>
            </div>
            <!-- //login_box -->
        </div>
        <!-- //login wrap  -->

    </section>
    <!-- //container -->


</template>

<script >
    export default {
        name: "SearchIdInput",
        data() {
            return {
                name: "",
                phoneNum: "",
                bizNum: "",
            }
        },
        methods: {
            searchCancel() {
                this.$router.push('/login')
            },
            onSubmit(name, phoneNum, bizNum) {
                if(name == ''){
                    alert("이름을 입력하세요.");
                    return;
                }
                if(phoneNum == ''){
                    alert("휴대폰번호를 입력하세요.")
                    return;
                }
                if(bizNum == ''){
                    alert("사업자등록번호를 입력하세요.")
                    return;
                }

                //TODO 아이디 찾기 로직
                // if(){//정보가 있을경우
                this.$router.push('/home/searchIdResult');

                // }else{//정보가 없을경우
                //     alert('입력하신 정보로 등록된 계정이 없습니다.');
                // }


            }
        }
    }
</script>

<style scoped>

</style>