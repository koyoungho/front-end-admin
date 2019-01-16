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
        <!-- content  -->
        <div class="content">
            <h2 class="blind">현금영수증 제도 안내</h2>

            <h3>온라인 가맹점 가입 신청</h3>

            <p class="sub_text type02">가입하시기 전에 반드시 <a href="#" class="link01" v-on:click="policyDiv('user');">개인정보취급방침</a>을 읽어보신 후 가입신청을 하시기 바랍니다.<br>KT는
                회원님의 개인정보보호에 최선을 다하고 있으며, 관련법률에 근거하지 않거나 회원님의 동의 없이 기재하신 개인정보가 공개되거나 제3자에게 제공되지 않습니다.<br>자세한 내용은 아래에서 확인하시길
                바랍니다.</p>

            <p class="agree_all"><span class="chk_box"><input type="checkbox" v-model="bb01" id="checkAll" v-on:click="termsAllCheck($event)"><label for="bb01"><em class="fc_pt01">전체동의 하기</em></label></span></p>
            <!-- agree_box -->
            <dl class="agree_box">
                <dt>
                    <span class="chk_box right"><input type="checkbox"  v-model="aa01" id="aa01" ><label for="aa01">서비스 이용 약관 동의</label></span>
                </dt>
                <dd>
                    <div class="agree_inner">
                        <template v-for="item in serviceList">
                            <h3 class="agree">{{item.detTitle}}</h3>
                            <p class="text" v-html="item.detContent"></p>
                        </template>
                    </div>
                </dd>
            </dl>
            <!-- //agree_box -->

            <!-- agree_box -->
            <dl class="agree_box">
                <dt>
                    <span class="chk_box right"><input type="checkbox" v-model="aa02" id="aa02"><label for="aa02">개인정보 수집 및 이용 동의</label></span>
                </dt>
                <dd>
                    <div class="agree_inner">
                        <template v-for="item in privateList">
                            <h3 class="agree">{{item.detTitle}}</h3>
                            <p class="text" v-html="item.detContent"></p>
                        </template>
                    </div>
                </dd>
            </dl>
            <!-- //agree_box -->

            <!-- agree_box -->
            <dl class="agree_box">
                <dt>
          <span class="chk_box right"><input type="checkbox" v-model="aa03" id="aa03" ><label
                  for="aa03">고객편의 제공을 위한 업무 위탁</label></span>
                </dt>
                <dd>
                    <div class="agree_inner">
                        고객편의 제공을 위한 업무 위탁 내용입니다.
                        <br><br><br><br><br><br>
                        <!--
                        <template v-for="item in privateList">
                            <h4 class="agree">{{item.detTitle}}</h4>
                            <p class="text">{{item.detContent}}</p>
                        </template>
                        -->
                    </div>
                </dd>
            </dl>
            <!-- //agree_box -->

            <!-- btn bot -->
            <div class="btn_bot">
                <button type="button" id="" v-on:click="phoneAuth" class="btn_b02 bg01">본인인증</button>
            </div>

        </div>
        <KmcConfirm v-if="showConfirm" v-on:closeKcm="closeMove"></KmcConfirm>
        <!-- //content -->
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
    import {Component, Vue} from 'vue-property-decorator'; // 뷰 cli;
    import KmcConfirm from '../../common/kmc/kmcConfirm.vue';
    import {CommonBoardService} from "../../../api/common.service"; // 본인인증

    @Component({
        components: {
            KmcConfirm
        }
    })
    export default class TermsCheck extends Vue {
        showConfirm: boolean = false;
        confirmResult: boolean = false;
        bb01: boolean = false;
        aa01: boolean = false;
        aa02: boolean = false;
        aa03: boolean = false;

        serviceList : any = {};
        privateList : any = {};
        customerList : any = {};

        created(){

            this.getTerms('site'); //서비스 이용 약관
            this.getTerms('user'); //개인정보 수집 및 이용동의
            //this.getTerms('2'); //고객편의 제공을 위한 업무 위탁
        }

        // 약관 조회
        getTerms(gbn : string) {

            let termSeq : string = gbn;
            // api 데이터 호출
            CommonBoardService.getListDatas('terms/current', termSeq, null).then((response) => {
                    let result: any = response.data;
                    //console.log(result);
                    if (result != null && result != '') {
                        if(gbn == 'site'){ //서비스 이용 약관
                            this.serviceList = result;
                            //console.log(this.serviceList);
                        }
                        else if(gbn == 'user') { //개인정보 수집 및 이용동의
                            this.privateList = result;
                        }
                        else if(gbn == '2') { //고객편의 제공을 위한 업무 위탁
                            this.customerList = result;
                        }
                    }else{
                        console.log('약관 조회 오류')
                    }
                }
                , (error) => {
                    //console.log('가맹점 등록 오류');
                    console.log('약관 조회 오류');
                }
            ).catch((response) => {
                console.log('약관 조회 오류');
            });
        }

        //약관 전체 동의
        termsAllCheck(event : any) {
            if(event.currentTarget.checked == true){
                this.aa01 = true;
                this.aa02 = true;
                this.aa03 = true;
            }else if(event.currentTarget.checked == false){
                this.aa01 = false;
                this.aa02 = false;
                this.aa03 = false;
            }
        }

        phoneAuth() {
            if (this.aa01==false) {
                alert('서비스 이용 약관 동의에 체크하세요');
                return;
            }
            if (this.aa02==false) {
                alert('개인정보 수집 및 이용 동의에 체크하세요');
                return;
            }
            if (this.aa03==false) {
                alert('고객편의 제공을 위한 업무 위탁에 체크하세요');
                return;
            }

            //this.showConfirm = true; //본인인증 화면 보이기

            /*
            let reqData: any = {};
            reqData['birthday'] = '20010101'; //생년월일
            reqData['gender'] = '0'; //성별
            reqData['name'] = '김창현'; //이름
            reqData['phoneNum'] = '01027047329'; //전화번호
            reqData['id'] = 'test123'; //아이디

            this.$router.push({name:"regPass", params:{ reqParams : reqData }});
            */

/*
            //약관동의
            CommonBoardService.postListData('accounts',sessionStorage.accountId+'/terms', null).then((response) => {
                    if (response.status == 200 || response.status == 200) {
                        //alert('변경이 완료되었습니다')
                        this.$router.push({name:'main'})
                    }
                }
                , (error) => {

                }
            ).catch((response) =>  {

            });
*/
        }

        top(){
            window.scrollTo(0,0);
        }

        goMain() { //로그아웃
            this.$store.dispatch('LOGOUT')
                .then(() =>
                    this.$router.push({name: 'login'}) )
                .catch()
        }

        policyDiv(titleNm){
            this.$router.push({path:'/home/policy', name:'policy', query:{ titleNm:titleNm }})
        }

        closeMove(response) {
            this.showConfirm = false;
            if(response){
                if (response.success == 'Y') {
                    let reqData: any = {};
                    reqData['birthday'] = response.birthday; //이름
                    reqData['gender'] = response.gender; //사업자등록번호
                    reqData['name'] = response.name; //전화번호
                    reqData['phoneNum'] = response.phoneNo; //전화번호
                    reqData['id'] = response.id; //아이디
                    //this.idCallApi(reqData)*/
                    //console.log('본인인증 후 값 넘기기전')
                    console.log('생년월일: '+response.birthday + ' | 성별: ' + response.gender + ' | 이름: ' + response.name + ' | 폰번호: ' + response.phoneNo + ' | ID: ' + response.id);

                    this.$router.push({name:"RegPass", params:{ reqData }});
                }
                else {

                }
            }

        }

    }
</script>
