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

            <h3 class="login">콜센터 수신자 본인 인증</h3>

            <!-- login wrap  -->
            <div class="login_wrap">
                <!-- login_box -->
                <div class="login_box type02" >
                    <p class="login_text">개인 정보 보호 및 현금영수증 발급 도용, 오남용 방지를 위하여 OTP 추가 인증을 진행합니다.<br>가입 시 등록하신 번호로 인증번호를 전송하고 수신한 인증번호를 아래에 입력하시기 바랍니다.<br>로그인에 문제가 있다면 고객센터 (02-2074-0340)으로 문의하시기 바랍니다.</p>
                    <fieldset class="login_form" v-show="otpTrue==false">
                        <legend> 로그인 </legend>
                        <!-- cert box -->
                        <div class="cert_box">
                            <p class="form_cert row01">
                                <label for="">수신자</label>
                                <input type="text" class="tel" title="수신자명" v-model="name" disabled="disabled">
                                <input type="text" class="tel" title="전화번호 입력" placeholder="전화번호 입력" v-model="phoneNum">
                                <button type="button" id="" class="btn_m01 bg03" v-on:click="optCall">인증번호 전송</button>
                            </p>
                            <p class="form_cert row02">
                                <input type="text" size="" v-model="otpNumber" maxlength="6" placeholder="인증번호 입력" class="cert" title="인증번호 6자리 숫자 입력">
                                <button type="button" id="" class="btn_m01 bg03" v-on:click="optCallConfirm" >확인</button>
                            </p>
                            <p class="form_time">
                                <span class="time_count">{{message}}</span>
                            </p>
                        </div>
                    </fieldset>

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
    export default class  MnUserOtp  extends  Vue{

        inputName : any = '';


        resultId : any = '';
        otpTrue : boolean = false;
        result : boolean = false;
        title : string = "아이디 찾기";
        otpNumber :  string = "";
        showConfirm : boolean = false;
        $modal : any;

        timer : number = 180;
        counter : boolean = false;
        interval : number = 0;
        message : string = "";

        reqParam : any = ''; //요청값
        id : any = ''; //ID
        name : any = ''; //수신자명
        phoneNum : any = ''; //수신자 전화번호
        saupId : any = ''; //사업장번호
        sendOtpYn : boolean = false; //otp전송 여부

        created(){

            this.reqParam = this.$route.params.reqParams;

            if(!this.reqParam){
                alert('접근할수 없습니다')
                this.$router.push({name:'franchiseList'});
            }else{
                this.name = this.reqParam.row.name;
                this.saupId = this.reqParam.row.saupId;
                this.id = this.reqParam.row.id;
            }

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
            if(this.phoneNum == ''){
                alert('휴대폰 번호를 입력하세요.');
                return;
            }

            let otp = {
                id: this.id,
                name: this.name,
                saupId: this.saupId,
                phoneNum : this.phoneNum
            }
            CommonBoardService.postListDatas('otp',null,otp)
                .then(result => {
                    if(result.data.code=='000'){
                        this.sendOtpYn = true;

                        this.startTimer();
                    }
                    else{
                        this.sendOtpYn = false;

                        clearInterval(this.interval)
                    }

                }).catch(e=>{
                    this.sendOtpYn = false;
                    alert('본인인증정보가 불일치합니다')
            })
            // alert('인증번호를 발송하였습니다')
        }

        optCallConfirm(){

            if(!this.sendOtpYn){
                alert('인증번호 전송 버튼을 클릭하세요.');
                return;
            }
            if(this.otpNumber == ''){
                alert('인증번호를 입력하세요.');
                return;
            }

            let otp = {
                id: this.id,
                name: this.name,
                saupId: this.saupId,
                phoneNum : this.phoneNum
            }
            if(this.otpNumber){
                CommonBoardService.postListDatas('otp/', this.otpNumber, otp)
                    .then(result => {
                        if(result.data.code=='000'){
                            alert('인증되었습니다' )
                            this.result = true;

                            this.otpTrue = true;
                            this.resultId = result.data.extra;

                            clearInterval(this.interval)
                            this.reset();

                            //계정정보 상세화면 이동
                            this.$router.push({ name:'modUser' , params: { current : this.reqParam.searchOption , val : this.reqParam.row.id , val2 : this.reqParam.row.role } }) // 라우터 주소를 넣어줘야 히스토리모드 인식

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
                    let reqData: any = {};
                    this.title='아이디 조회완료'
                    this.otpTrue = true;
                    this.resultId = response.id
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
