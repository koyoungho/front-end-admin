<template>
    <!-- container -->
    <section id="container">

        <h2 class="login">비밀번호 변경</h2>

        <!-- login wrap  -->
        <div class="login_wrap">
            <!-- login_box -->
            <div class="login_box type01">

                <p class="login_text">비밀번호를 90일동안 변경하지 않았습니다.<br>계정 도용을 방지하기 위해 비밀번호를 변경해 주시기 바랍니다.</p>

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
                    <button type="button" v-on:click="passwordChk()" id="" class="btn_b01 bg01">변경</button>
                </div>
            </div>
            <!-- //login_box -->
        </div>
        <!-- //login wrap  -->

    </section>
    <!-- //container -->

</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator'; // 뷰 cli;
    import KmcConfirm from '../../common/kmc/kmcConfirm.vue';
    import {CommonBoardService} from "../../../api/common.service"; // 본인인증

    @Component({
        components: {
            KmcConfirm
        }
    })
    export default class  SearchIdInput  extends  Vue{

        curPassword : any = '';
        newPassword : any = '';
        conPassword : any = '';
        resId : any = '';

        created(){
            /*this.resId = this.$route.params.reqId;
            if(this.resId === null || this.resId == '' || this.resId == undefined){
                this.$router.push('/login');
            }*/
        }

        nextChange() {
            this.$router.push('/home/main');
        }

        //password 유효성 체크
        passwordChk(){

            if(this.curPassword == ''){
                alert('현재 비밀번호가 입력되지 않았습니다.');
                return;
            }else if(this.newPassword == ''){
                alert('새로운 비밀번호가 입력되지 않았습니다.');
                return;
            }else if(this.conPassword == '') {
                alert('확인 비밀번호가 입력되지 않았습니다.');
                return;
            }else if(this.curPassword == this.newPassword){
                alert('현재 비밀번호와 같은 비밀번호로는 변경할 수 없습니다.');
                return;
            }else if(this.newPassword != this.conPassword){
                alert('확인 비밀번호가 잘못 입력되었습니다.\n입력하신 비밀번호를 확인하세요.');
                return;
            }

            let reqData : any = {};
            reqData['checkString'] = this.newPassword; //변경 패스워드
            reqData['checkSum'] = sessionStorage.accountId; //ID

            // api 데이터 호출
            CommonBoardService.postListDatas('validation/passwd', null, reqData).then((response) => {
                    let result: any = response.data;
                    if (result.code == '000') {
                        this.passChange();
                    }else{
                        alert(result.message); //alert 메시지
                        return;
                    }
                }
            ).catch((response) =>  {
                //console.log('response code check!!');
            });
            // if(rtn == true){
            //     this.updFranciseInfo();
            // }
        }

        passChange() {

            let reqData: any = {};
            //reqData['curPassword'] = this.curPassword; //현재 비번
            reqData['id'] = sessionStorage.accountId; //로그인 아이디
            reqData['newPass'] = this.newPassword; //새로운 비번

            // api 데이터 호출
            CommonBoardService.postListData('accounts/pass', null, reqData).then((response) => {
                    let result = response.data;
                    if(result.code == '000'){
                        alert('비밀번호 변경 완료되었습니다.');
                        this.$router.push('/login');
                    }else{
                        alert('비밀번호 변경이 실패하였습니다.\n다시 시도해 주세요');
                    }
                }
                , (error) => {
                    alert('비밀번호 변경이 실패하였습니다.\n다시 시도해 주세요');
                }
            ).catch((response) =>  {
                alert('비밀번호 변경이 실패하였습니다.\n다시 시도해 주세요');
            });

        }

    }
</script>