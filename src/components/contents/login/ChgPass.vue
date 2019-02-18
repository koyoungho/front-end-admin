<template>

    <div id="wrapper">
        <div id="inc_header">
            <!-- header -->
            <header id="header">
                <!-- top header -->
                <div class="top_header mobile">
                    <h1 class="logo" @click="goMain"><a>현금영수증</a></h1>
                </div>
                <!-- //top header -->
            </header>
            <!-- //header -->
        </div>

    <!-- container -->
    <section id="container">

        <h3 class="login">비밀번호 변경</h3>

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
                    </ul>&nbsp;
                    <p class="info_msg fc_pt01">{{valueChecks}}</p>
                    <p style="text-align: left">
                        * 비밀번호는 영문,숫자,특수문자(!@$%^&* 만 허용)를 조합하여 8~16자로 구성하세요.
                    </p>
                </fieldset>
                <!-- btn area -->
                <div class="btn_area">
                    <!--<button type="button" v-on:click="nextChange()" id="" class="btn_b01 bg02">다음에 변경</button>-->
                    <button type="button" v-on:click="passwordChk()" id="" class="btn_b01 bg01">변경</button>
                </div>
            </div>
            <!-- //login_box -->
        </div>
        <!-- //login wrap  -->

    </section>
    <!-- //container -->

        <footer id="footer">
            <!-- quick banner -->
            <div class="quick_banner">
                <div class="quick">
                    <span class="sub">고객센터</span>
                    <p class="cont">
                        <span class="tel"><strong>(02)</strong><strong>2074-0340</strong></span>
                        <span class="text">평일 09:30~18:00</span>
                    </p>
                </div>
                <span class="page_top" @click="top"><a>TOP</a></span>

            </div>

            <div class="footer_wrap">
                <div class="footer_address">
                    <p class="footer_text01"><span class="company">(주)케이티  대표이사 황창규</span>
                        <span class="address">(우)13606 경기도 성남시 분당구 불정로 90(정자동 206번지)</span>
                        <span class="tel">문의전화 02-2074-0340</span> / <span class="fax">팩스번호 02-2074-6089</span>
                    </p>
                    <p class="footer_text02">Copyright ⓒ 2019 KT corporation & LDCC. <span class="rights">All rights reserved.</span></p>
                </div>
            </div>
        </footer>

    </div>
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
    export default class  ChgPass  extends  Vue{

        curPassword : any = '';
        newPassword : any = '';
        conPassword : any = '';
        resId : any = '';
        passChangChk : boolean = false; //비밀번호 변경 여부 체크값

        valueChecks: string = '';

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
                alert('현재 비밀번호가 입력되지 않았습니다');
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

            /*
            let initPass ={}
            initPass['checkSum'] = sessionStorage.accountId; //ID
            initPass['checkString'] = this.newPassword; //패스워드

            // api 데이터 호출
            CommonBoardService.updateListData('accounts','admin/password', initPass).then((response) => {
                    if (response.data.code == '000') {
                        //sessionStorage.clear();
                        alert('비밀번호 변경이 완료 되었습니다')

                        this.$store.dispatch('LOGOUT')
                            .then(() =>
                                this.$router.push({name: 'login'}) )
                            .catch()
                    } else {
                        //sessionStorage.clear();
                        //alert(response.data.message);
                        this.valueChecks = response.data.message;
                        return;
                    }
                }
                , (error) => {
                    sessionStorage.clear();

                    //alert(error.data.message);
                    this.valueChecks = error.data.message;
                    return;
                }
            ).catch((response) =>  {
                sessionStorage.clear();

                alert('비밀번호 변경중 오류가 발생하였습니다.\n다시 시도하세요.')
            });*/

            let reqData : any = {};
            reqData['checkString'] = this.newPassword; //변경 패스워드
            reqData['checkSum'] = sessionStorage.accountId == null ? sessionStorage.id : sessionStorage.accountId; //ID

            // api 데이터 호출
            CommonBoardService.postListDatas('validation/passwd', null, reqData).then((response) => {
                    let result: any = response.data;
                    if (result.code == '000') {
                        this.valueChecks = '';
                        this.passChange();
                    }else{
                        //alert(result.message); //alert 메시지
                        this.valueChecks = result.message;
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

        beforeDestroy(){
            /*if(!this.passChangChk){
                alert('비밀번호를 변경하지 않으면 사이트 이용이 불가능합니다.');
                this.$store.dispatch('LOGOUT').then(() =>
                    this.$router.push({name: 'login'}) )
                    .catch()
            }*/
        }

        passChange() {

            let reqData: any = {};
            //reqData['curPassword'] = this.curPassword; //현재 비번
            //reqData['id'] = sessionStorage.accountId == null ? sessionStorage.id : sessionStorage.accountId; //로그인 아이디
            reqData['newPass'] = this.newPassword; //새로운 비번

            let changeId = sessionStorage.accountId == null ? sessionStorage.id : sessionStorage.accountId; //로그인 아이디

            // api 데이터 호출
            CommonBoardService.updateListData('accounts', 'admin/password', reqData).then((response) => {
                    let result = response.data;
                    if(result.code == '000'){
                        this.passChangChk = true;
                        alert('비밀번호 변경 완료되었습니다.');

                        this.$store.dispatch('LOGOUT')
                            .then(() =>
                                this.$router.push({name: 'login'}) )
                            .catch()

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

        top(){
            window.scrollTo(0,0);
        }

        goMain() { //메인이동
            //this.$router.push('home/main')

            //비밀번호 변경 필수
            this.$store.dispatch('LOGOUT')
                .then(() =>
                    this.$router.push({name: 'login'}) )
                .catch()
        }
        policyDiv(titleNm){
            this.$router.push({path:'/home/policy', name:'policy', query:{ titleNm:titleNm }})
        }

    }
</script>