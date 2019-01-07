<!--아이디 찾기 화면 - 아이디, 전화번호 입력-->

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

        <h3 class="login">{{title}}</h3>

        <!-- login wrap  -->
        <div class="login_wrap">
            <!-- login_box -->
            <div class="login_box type01" v-show="otpTrue==false">
                <p class="login_text" >비밀번호를 초기화 하기 위해서는 가입시 등록하신 이름과 <br>휴대폰 번호화 사업자등록번호를 입력해주시기 바랍니다</p>
                <fieldset class="login_form" >
                    <legend> 로그인 </legend>
                    <!-- login -->
                    <ul class="login">
                        <li class="form_name">
                            <input type="text"  size="" maxlength="" placeholder="이름" class="name" title="이름 입력" v-model="inputName">
                        </li>
                        <li class="form_tel">
                            <input type="text"  size="" maxlength="" placeholder="휴대폰 번호" class="tel" title="휴대폰 입력" v-model="phoneNum">
                        </li>
                        <li class="form_ind">
                            <input type="text"  size="" maxlength="" placeholder="사업자 등록번호" class="tel" title="사업자 등록번호 입력" v-model="saupId">
                        </li>
                    </ul>
                    <!-- cert box -->
                    <div class="cert_box">
                        <p class="form_cert">
                            <input type="text" v-model="otpNumber" size="" maxlength="" placeholder="인증번호 6자리 숫자 입력" class="cert2" title="인증번호 6자리 숫자 입력">
                            <button type="button" id="" class="btn_m01 bg03" v-on:click="optCall" v-show="confirmButton==false">인증번호 받기</button>
                            <button type="button" id="" class="btn_m01 bg03" v-on:click="optCallConfirm" v-show="confirmButton==true">확인</button>
                        </p>
                        <p class="form_time">
                            <span class="time_count">{{message}}</span>
                        </p>
                    </div>
                </fieldset>
                <div class="btn_area" v-show="otpTrue==false">
                    <button type="button" v-on:click="searchCancel()"   class="btn_b01 bg02">취소</button>
                    <button type="button" v-on:click="changePwd()"   class="btn_b01 bg01">변경</button>
                </div>
                <div class="info_bot" v-show="otpTrue==false">
                    <span class="text_type03">휴대폰 번호가 바뀌었을 시 휴대폰 본인인증으로 변경해 주세요.</span>
                    <span class="btn_cert_area"><button type="button"  class="btn_s01 bg03" v-on:click="kcmPop">휴대폰 본인인증</button></span>
                </div>
            </div>
            <div class="login_box type01" v-show="otpTrue==true">
                <p class="login_text"> 사용하고자 하는 비밀번호를 입력해주시기 바랍니다</p>
                <fieldset class="login_form">
                    <legend> 로그인 </legend>
                    <!-- login -->
                    <ul class="login">
                        <ul class="login">
                            <li class="form_pw">
                                <input type="password"  class="pw" v-model="pwdChange" size="" maxlength="" placeholder="비밀번호"  title="비밀번호 입력" id="password"  autocomplete="current-password">
                            </li>
                            <li class="form_pwcom" >
                                <input type="password" class="pw"  v-model="pwdConfirm"  size="" maxlength="" placeholder="비밀번호 확인"  id="passwordconf" title="비밀번호 확인 입력" autocomplete="new-password">
                            </li>
                        </ul>
                    </ul>&nbsp;
                    <p class="info_msg fc_pt01">{{valueChecks}}</p>
                </fieldset>
                <!-- btn area -->
                <div class="btn_area">
                    <button type="button" v-on:click="searchCancel()"  class="btn_b01 bg02">취소</button>
                    <button type="button" v-on:click="savePwd"   class="btn_b01 bg01">등록</button>
                </div>
            </div>
            <KmcConfirm v-if="showConfirm" v-on:closeKcm="closeMove"></KmcConfirm>
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
                    <span class="tel">(02)<strong>2074-0340</strong></span>
                    <span class="text">평일 09:30~18:00</span>
                </p>
            </div>
            <span class="page_top" @click="top"><a>TOP</a></span>

        </div>

        <div class="footer_wrap">
            <ul class="footer_links">
                <li><a href="https://www.kt.com/">(주) 케이티</a></li>
                <li><a href="https://www.ldcc.co.kr/">롯데정보통신 (주)</a></li>
                <li><a v-on:click="policyDiv('site')">이용약관</a></li>
                <li><a v-on:click="policyDiv('user')">개인보호처리방침</a></li>
            </ul>
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
    import {Component, Vue, Watch} from 'vue-property-decorator'; // 뷰 cli;
    import {CommonBoardService} from "../../../api/common.service"; // 본인인증
    import KmcConfirm from '../../common/kmc/kmcConfirm.vue';

    @Component({
        components: {
            KmcConfirm
        }
    })
    export default class  InitPass  extends  Vue{

        inputName : any = '';
        saupId : any = '';
        phoneNum : any = '';
        resultId : any = '';
        otpTrue : boolean = false;
        result : boolean = false;
        title : string = "비밀번호 초기화";
        otpNumber :  string = "";
        showConfirm : boolean = false;
        pwdChange : string ="";
        pwdConfirm : string = "";
        $modal : any;
        confirmButton : boolean = false;
        valueChecks: string = '';
        stylePwd :any= "";
        saveOk : boolean = false;

        timer : number = 180;
        counter : boolean = false;
        interval : number = 0;
        message : string = "";


        searchCancel() {
            clearInterval(this.interval);
            this.$router.push('/login')
        }
        changePwd() {
            if(this.inputName == ''){
                alert('이름을 입력하세요.');
                return;
            }else if(this.saupId == ''){
                alert('사업자등록번호를 입력하세요.');
                return;
            }else if(this.phoneNum == ''){
                alert('휴대폰 번호를 입력하세요.');
                return;
            }else if(this.result == false){
                alert('인증 확인을 해주세요');
                return;
            }
            this.otpTrue = true;
            this.title = '비밀번호 변경';


        }

        @Watch('pwdConfirm') onchange(){
            this.valueChecks =''
            /*
            if(this.pwdChange==this.pwdConfirm){
                this.valueChecks ='정상입력'
                this.saveOk = true;
            }else{
                this.valueChecks ='패스워드가 일치하지않습니다'
                this.stylePwd = {test: '1px solid #da291c'};
                this.saveOk= false;
            }
            */
        }


        optCall(){
            if(this.inputName == ''){
                alert('이름을 입력하세요.');
                return;
            }else if(this.saupId == ''){
                alert('사업자등록번호를 입력하세요.');
                return;
            }else if(this.phoneNum == '') {
                alert('휴대폰 번호를 입력하세요.');
                return;
            }

            let otp = {
                id: "",
                name: this.inputName,
                saupId:this.saupId,
                phoneNum : this.phoneNum
            }
            CommonBoardService.postListDatas('otp',null,otp)
                .then(result => {
                    if(result.data.code=='000'){
                        this.startTimer();
                        this.confirmButton = true;

                    }
                    else{
                        clearInterval(this.interval)
                    }

                }).catch(e=>{
                alert('본인인증정보가 불일치합니다')
            })
            alert('인증번호를 발송하였습니다')
        }

        optCallConfirm(){
            let otp = {
                id: "",
                name: this.inputName,
                saupId:this.saupId,
                phoneNum : this.phoneNum
            }
            if(this.otpNumber){
                CommonBoardService.postListDatas('otp',this.otpNumber,otp)
                    .then(result => {
                        if(result.data.code=='000'){
                            alert('인증되었습니다' )
                            this.result = true;
                            this.confirmButton = false;
                            this.resultId = result.data.extra;
                            clearInterval(this.interval)
                            this.reset();
                        }
                        else{
                            clearInterval(this.interval)
                        }

                    })
            }
            else{
                alert('otp번호를 입력해주세요')
            }

        }



        startTimer() {
            this.interval = setInterval(this.countDown, 1000);
        }
        countDown() {
            var n = this.timer
            if (!this.counter) {
                this.counter = true;
            } else if (n > 0) {
                n = n - 1
                let minute = Math.floor(n/60)
                let sec  = n - (minute * 60)
                let stringVal  : string= sec.toString();
                if(sec < 10 ){
                    stringVal = "0"+ stringVal
                }
                this.timer = n
                this.message = minute+":"+ stringVal
            } else {
                clearInterval(this.interval);
                this.counter = false
                this.otpTrue = false;
            }
        }

        reset(){
            this.timer=180;
            this.message = ""
            this.counter = false;
        }


        loginGo(){
            this.$router.push('/login')
        }

        kcmPop(){
            this.showConfirm = true;
        }

        closeMove(response) {
            this.showConfirm = false;
            // this.$emit('close','');
            if(response){
                if (response.success == 'Y') {
                    this.title='아이디 조회완료'
                    this.otpTrue = true;
                    this.resultId = response.id
                }
                else {
                }
            }
        }


        savePwd(){

            // 벨리데이션을 체크한다

            if(!this.pwdChange){
                alert('비밀번호를 확인해주세요')
                return ;
            }
            if(!this.pwdConfirm){
                alert('비밀번호를 확인해주세요')
                return ;
            }
            if(this.pwdChange!=this.pwdConfirm){
                alert('비밀번호를 확인해주세요')
                return ;
            /*}if(this.saveOk==false){
                alert('비밀번호를 확인해주세요')
                return ;*/
            }

            let initPass ={}
            initPass['id'] = this.resultId; //이름
            initPass['newPass'] = this.pwdConfirm; //패스워드
            // api 데이터 호출
            CommonBoardService.updateListData('accounts',this.resultId+'/password', initPass).then((response) => {
                console.log(response)
                    if (response.status == 200) {
                        alert('변경이 완료되었습니다')
                        this.$router.push({name:'login'})
                    } else {
                        //alert(response.data.message);
                        this.valueChecks = response.data.message;
                        return;
                    }
                }
                , (error) => {
                    //alert(error.data.message);
                    this.valueChecks = error.data.message;
                    return;
                }
            ).catch((response) =>  {
                console.log(response)
                alert('비밀번호 변경중 오류가 발생하였습니다.\n다시 시도하세요.')
            });
        }
        top(){
            window.scrollTo(0,0);
        }
        goMain() { //메인이동
            this.$router.push('home/main')
        }
        policyDiv(titleNm){
            this.$router.push({path:'/home/policy', name:'policy', query:{ titleNm:titleNm }})
        }

    }
</script>

<style>
    .test {
        background-color: #da291c;
        opacity: 0.3;}
</style>
