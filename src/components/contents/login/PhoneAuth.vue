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
                        <select id="" name="" class="name" title="수신자 선택" v-on:change="changePhonenum(receiveNumber)" v-model="receiveNumber">
                            <option value="">선택</option>
                            <option value="01027047329">김창현</option>
                            <option value="000">직접입력</option>
                        </select>
                        <input type="text" class="tel" title="전화번호 입력" v-model="phoneNumer" >
                        <button type="button" id="" class="btn_m01 bg03" v-on:click="sendAuthNumber">인증번호 전송</button>
                    </p>
                    <p class="form_cert row02">
                        <input type="text" id="" name="" size="" maxlength="" placeholder="인증번호 입력" class="cert" title="인증번호 입력" v-model="authNumber">
                        <button type="button" id="" class="btn_m01 bg01" v-on:click="chkAuthNumber" >인증번호 확인</button>
                        <span class="time_count">{{message}}</span>
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
    import {CommonBoardService, CommonListService} from '../../../api/common.service';

    @Component({
        components: {
            PhoneAuth
        },
    })
    export default class PhoneAuth extends Vue {

        reqObjectKey : any = "";

        receiveNumber: any = ''; //받는사람 번호
        phoneNumer: any = ''; //휴대폰번호
        authNumber: any = ''; //인증번호
        authSendYn: boolean = false; //인증번호 전송 여부
        authId : any = ''; //인증받고 받은 ID

        reqGbn : any = ''; //정보 수정시 화면 구분
        nextUrl : any = ''; //정보 수정 완료 후 이동 URL

        //confirmButton : boolean = false;

        timer : number = 180;
        counter : boolean = false;
        interval : number = 0;
        message : string = "";

        //돔생성전 호출자
        created() {
            this.reqObjectKey = this.$route.params.objectKey;

            if(this.reqObjectKey != null){

                this.reqGbn = this.reqObjectKey.reqGbn;
                this.nextUrl = this.reqObjectKey.nextPage;

                console.log('넘겨받은 가맹점 정보');
                console.log(this.reqObjectKey);
                console.log('사업장 정보');
                console.log(this.reqObjectKey.saupjangDto)
                console.log('승인대역 정보');
                console.log(this.reqObjectKey.aprvBandAddDtos);
                console.log('관리자 정보');
                console.log(this.reqObjectKey.accounts);
                console.log('호출할 API 정보 및 다음 이동 URL')
                console.log(this.reqObjectKey.reqGbn);
                console.log(this.reqObjectKey.nextPage);

            }else{
                alert('접근할수 없습니다');
//                this.$router.push({name:'franchiseList'});
            }

        }
        //돔렌더링완료시 진행
        mounted(){
        }

        //수신자 변경
        changePhonenum(no){
            if(no == '000'){ //직접입력

            }else if(no != ''){
                this.phoneNumer = no; //전화번호 셋팅
            }
        }

        //인증번호 전송
        sendAuthNumber(){
            if(this.phoneNumer == ''){
                alert('수진자 번호를 입력하세요.');
                return;
            }else{

                let reqData = {
                    id: sessionStorage.accountId,
                    name: sessionStorage.accountNm,
                    saupId: sessionStorage.saupId,
                    phoneNum: this.phoneNumer
                };

                // api 데이터 호출(사업자등록번호 유효성 체크)
                CommonBoardService.postListDatas('otp', null, reqData).then((response) => {
                        let result: any = response.data;
                        console.log(result);
                        if (result != null && result.code == '000') {
                            console.log('OTP 발송 성공')
                            this.startTimer();
                            //this.confirmButton = true;
                        } else {
                            console.log('OTP 발송 실패')
                            clearInterval(this.interval)
                        }
                    }
                    , (error) => {
                        console.log('인증번호 발송 실패');
                        console.log(error);
                    }
                ).catch((response) => {
                    console.log('인증번호 발송 실패');
                    console.log(response);
                });
            }
        }

        //인증번호 검증
        chkAuthNumber(){

            console.log('가맹정 정보 있는지 확인')
            console.log(this.reqObjectKey)
            console.log('사업장 정보');
            console.log(this.reqObjectKey.saupjangDto)
            console.log('승인대역 정보');
            console.log(this.reqObjectKey.aprvBandAddDtos);
            console.log('관리자 정보');
            console.log(this.reqObjectKey.accounts);

            if(this.authNumber == ''){
                alert('전송된 인증번호를 입력하세요.');
                return;
            }else {
                let authData = {
                    id: sessionStorage.accountId,
                    name: sessionStorage.accountNm,
                    saupId: sessionStorage.saupId,
                    phoneNum: this.phoneNumer
                };

                if (this.authNumber){
                    // api 데이터 호출(OTP 인증번호 검증)
                    CommonBoardService.postListDatas('otp', this.authNumber, authData).then((response) => {
                            let result: any = response.data;
                            console.log(result);
                            if (result != null && result.code == '000') {
                                //this.confirmButton = false;
                                this.authId = result.extra; //인증 완료후 받은 ID
                                alert('인증되었습니다.');
                                //this.$router.push({name:'franchiseList'});
                                this.updateInfo()
                            } else {
                                alert('인증에 실패하였습니다.\n인증번호를 확인하세요.');
                                return;
                            }
                        }
                        , (error) => {
                            console.log(error);
                        }
                    ).catch((response) => {
                        console.log(response);
                    });
                }else{
                    alert('전송된 인증번호를 입력하세요.');
                }
            }

        }

        updateInfo(){
            console.log('수정 API 찌르기 직전');
            console.log(this.reqObjectKey.gajumId);
            console.log(this.reqObjectKey);
            console.log(this.nextUrl);
            let apiUrl = '';

            let reqData = this.reqObjectKey;
            reqData['accountId'] = this.authId; //opt인증받은 ID 있어야 수정가능(필수!!)

            console.log('OBJECT로 변경');
            console.log(reqData);

            if(this.reqObjectKey != null){
                if(this.reqGbn == 'branch'){ //지점 수정
                    let gajumId = this.reqObjectKey.gajumId;
                    let jijumId = this.reqObjectKey.jijumId;

                    apiUrl = 'jijum/'+ gajumId + '/' + jijumId;
                }else if(this.reqGbn == 'franchise'){ //가맹점 수정
                    let gajumId = this.reqObjectKey.gajumId;

                    apiUrl = 'gajum/'+ gajumId;
                }else if(this.reqGbn == 'store'){ //상점 수정
                    apiUrl = 'store/';
                }else{
                    apiUrl = '';
                }
            }

            CommonBoardService.updateListData(apiUrl, null, reqData).then((response) => {
                    console.log('수정 API 결과 11')
                    console.log(response)
                    //let result: any = response.data;
                    console.log('수정 API 결과 22')
                    //console.log(result)
                    //if (result.code === '000' || ) { //성공
                    if (response.status == 200) { //성공
                        alert('수정되었습니다.');
                        this.$router.push({name:this.nextUrl});
                    } else { //실패
                        alert('수정이 실패하였습니다.\n다시 시도하세요.')
                    }
                }
                , (error) => {
                }
            ).catch();

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
            }
        }

    }






    // export default {
    //     name: "PhoneAuth"
    // }
</script>

<style scoped>

</style>