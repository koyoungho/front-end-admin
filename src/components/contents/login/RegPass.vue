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
            <h2 class="blind">로그인</h2>

            <h3 class="login">비밀번호 등록</h3>

            <!-- login wrap  -->
            <div class="login_wrap">
                <!-- login_box -->
                <div class="login_box type01">
                    <p class="login_text">사용하고자 하는 비밀번호를 입력해 주시기 바랍니다.</p>

                    <fieldset class="login_form">
                        <legend> 로그인 </legend>
                        <!-- login -->
                        <ul class="login">
                            <li class="form_pw">
                                <input type="password" size="" maxlength="" placeholder="비밀번호" class="pw" title="비밀번호 입력" v-model="password">
                            </li>
                            <li class="form_pwcom">
                                <input type="password" size="" maxlength="" placeholder="비밀번호 확인" class="pw" title="비밀번호 확인 입력" v-model="conPassword">
                            </li>
                        </ul>&nbsp;
                        <p class="info_msg fc_pt01">{{valueChecks}}</p>
                        <p style="text-align: left">
                            * 비밀번호는 영문,숫자,특수문자(!@$%^&* 만 허용)를 조합하여 8~16자로 구성하세요.
                        </p>
                    </fieldset>
                    <!-- btn area -->
                    <div class="btn_area">
                        <button type="button" id="" class="btn_b01 bg02" v-on:click="cancelPass">취소</button>
                        <button type="button" id="" class="btn_b01 bg01" v-on:click="validationChk">등록</button>
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
                <ul class="footer_links">
                    <li><a href="https://www.kt.com/">(주) 케이티</a></li>
                    <li><a href="https://www.ldcc.co.kr/">롯데정보통신 (주)</a></li>
                    <li><a v-on:click="policyDiv('site')">이용약관</a></li>
                    <li><a v-on:click="policyDiv('user')">개인정보처리방침</a></li>
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

    @Component({
        components: {
            RegPass
        }
    })
    export default class RegPass extends Vue{

        id : string = '';
        password : string = '';
        conPassword : string = '';
        valueChecks : string = '';
        passChk : boolean = false;

        reqParams : any = '';

        created(){
            this.reqParams = this.$route.params.reqParams;


            if(!this.reqParams){
                alert('접근할수 없습니다')
                this.$router.push({name:'termsCheck'});
            }else{

                this.id = this.reqParams.id; //ID

            }
        }

        @Watch('password') changePass(){
            this.valueChecks =''
            this.passChk = false;
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

        validationChk() {
            if (this.password == '') {
                alert('비밀번호를 입력하세요.');
                return;
            } else if (this.conPassword == '') {
                alert('비밀번호 확인을 입력하세요.');
                return;
            } else if (this.password != this.conPassword) {
                alert('비밀번호를 확인하세요.');
                return;
            }

            let reqData: any = {};
            reqData['checkString'] = this.password; //변경 패스워드
            reqData['checkSum'] = this.id; //ID

            // api 데이터 호출
            CommonBoardService.postListDatas('validation/passwd', null, reqData).then((response) => {
                    let result: any = response.data;
                    if (result.code == '000') {
                        this.passChange();
                    } else {
                        //alert(result.message); //alert 메시지
                        this.valueChecks = result.message;
                        return;
                    }
                }
            ).catch((response) => {
                this.valueChecks = response.data.message;
            });
        }

        passChange() {

            let reqData : any = { id : this.id, newPass : this.password };

            // api 데이터 호출
            CommonBoardService.updateListData('accounts',this.id+'/password', reqData).then((response) => {
                    if (response.status == 200) {
                        alert('비밀번호 등록이 완료되었습니다')
                        this.termsAgree(); //약관동의 호출
                        this.$router.push({name:'login'})
                    } else {
                        alert(response.data.message);
                        return;
                    }
                }
                , (error) => {
                    //alert(error.data.message);
                    this.valueChecks = error.data.message;
                    //this.passChk = false;
                    return;
                }
            ).catch((response) =>  {
                this.valueChecks = response.data.message;
                //this.passChk = false;
                //alert('비밀번호 변경중 오류가 발생하였습니다.\n다시 시도하세요.')
            });
        }

        termsAgree(){
            // api 데이터 호출
            CommonBoardService.postListData('accounts',this.id+'/terms', null).then((response) => {
                    if (response.status == 200 || response.status == 200) {

                        //this.$router.push({name:'login'})
                    } else {
                        return;
                    }
                }
                , (error) => {
                }
            ).catch((response) =>  {
            });
        }

        cancelPass(){
            this.$router.push('/termsCheck')
        }

        top(){
            window.scrollTo(0,0);
        }

        goMain() { //로그인이동
            this.$router.push('/login')
        }

        policyDiv(titleNm){
            this.$router.push({path:'/home/policy', name:'policy', query:{ titleNm:titleNm }})
        }

    }
</script>