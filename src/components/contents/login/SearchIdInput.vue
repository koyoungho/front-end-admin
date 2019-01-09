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
            <div class="login_box type01" >
                <p class="login_text" v-show="otpTrue==false">아이디를 확인하기 위해서는 가입시 등록하신 이름과<br>전화번호를 입력해 주시기 바랍니다.</p>
                <p class="login_text" v-show="otpTrue==true">등록된 ID : {{resultId}}</p>
                <fieldset class="login_form" v-show="otpTrue==false">
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
                <!-- btn area -->
                <div class="btn_area" v-show="otpTrue==false">
                    <button type="button" v-on:click="searchCancel()"  class="btn_b01 bg02">취소</button>
                    <button type="button" v-on:click="searchId()"  class="btn_b01 bg01">아이디 조회</button>
                </div>
                <div class="btn_area" v-show="otpTrue==true">
                    <button type="button" v-on:click="loginGo" id="login" class="btn_b01 bg01">로그인하기</button>
                </div>
                <!-- info bot -->
                <div class="info_bot" v-show="otpTrue==false">
                    <span class="text_type03">휴대폰 번호가 바뀌었을 시 휴대폰 본인인증으로 변경해 주세요.</span>
                    <span class="btn_cert_area"><button type="button"  class="btn_s01 bg03" v-on:click="kcmPop">휴대폰 본인인증</button></span>
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
    import {Component, Vue} from 'vue-property-decorator'; // 뷰 cli;
    import KmcConfirm from '../../common/kmc/kmcConfirm.vue';
    import {CommonBoardService} from "../../../api/common.service"; // 본인인증

    @Component({
        components: {
            KmcConfirm
        }
    })
    export default class  SearchIdInput  extends  Vue{

        inputName : any = '';
        saupId : any = '';
        phoneNum : any = '';
        resultId : any = '';
        otpTrue : boolean = false;
        result : boolean = false;
        title : string = "아이디 찾기";
        otpNumber :  string = "";
        showConfirm : boolean = false;
        $modal : any;
        confirmButton : boolean = false;

        timer : number = 180;
        counter : boolean = false;
        interval : number = 0;
        message : string = "";

        created(){
            clearInterval(this.interval)
        }

        searchCancel() {
            clearInterval(this.interval);
            this.$router.push('/login')
        }
        searchId() {
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
            let reqData: any = {};
            reqData['name'] = this.inputName; //이름
            reqData['saupId'] = this.saupId; //사업자등록번호
            reqData['phoneNum'] = this.phoneNum; //전화번호
            this.idCallApi(reqData)
        }

        idCallApi(reqData){
            // api 데이터 호출
            CommonBoardService.getListDatas('accounts','id', reqData).then((response) => {
                    let result: any = response.data;
                    if (result != null) {
                        if(result.id ==null){
                            alert('아이디가 존재하지 않습니다');
                        }else{
                            this.title='아이디 조회완료'
                            this.otpTrue = true;
                            this.resultId = result.id;
                        }
                    } else {
                        alert('입력하신 내용을 확인하세요');
                    }
                }
                , (error) => {
                    alert('아이디를 찾을수 없습니다.')
                    return;;
                }
            ).catch((response) =>  {
                alert('아이디를 찾을수 없습니다.')
            });
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
            // alert('인증번호를 발송하였습니다')
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

                            this.title='아이디 조회완료'
                            this.otpTrue = true;
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
            // this.$modal.show(KmcConfirm);
            this.showConfirm = true;
        }

        closeMove(response) {

            this.showConfirm = false;
            // this.$emit('close','');
            if(response){
                if (response.success == 'Y') {
                    //let reqData: any = {};
                    this.otpTrue = true;

                    if(response.id == null || response.id == ''){ //조회된 ID없음
                        this.title='아이디 조회완료';
                        this.resultId = '조회된 ID가 없습니다.';
                    }else{ //조회된 ID있음
                        this.title='아이디 조회완료';
                        this.resultId = response.id;
                    }
                }
                else {
                }
            }
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
