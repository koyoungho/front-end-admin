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

                <h3>현금영수증 서비스 약관 동의</h3>

                <p class="sub_text type02">현금영수증 서비스를 사용하시기전 아래 약관을 읽어보신 후 서비스 약관에 동의하여 주시기 바랍니다.<br>KT는
                    회원님의 개인정보보호에 최선을 다하고 있으며, 관련법률에 근거하지 않거나 회원님의 동의 없이 기재하신 개인정보가 공개되거나 제3자에게 제공되지 않습니다.<br>자세한 내용은 아래에서 확인하시길
                    바랍니다.</p>

                <p class="agree_all">
          <span class="chk_box">
              <input type="checkbox" v-model="checkAll" id="bb01" v-on:click="termsAllCheck($event)"><label for="bb01"><em class="fc_pt01">전체동의 하기</em></label>
          </span>
                </p>
                <!-- agree_box -->
                <dl class="agree_box">
                    <dt>
                        <span class="chk_box right"><input type="checkbox"  v-model="aa01" id="aa01"><label for="aa01">서비스 이용 약관 동의</label></span>
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
                        <span class="chk_box right"><input type="checkbox" v-model="aa03" id="aa03" ><label for="aa03">고객편의 제공을 위한 업무 위탁</label></span>
                    </dt>
                    <dd>
                        <div class="agree_inner">
                            <p class="text" >
                                KT는 서비스의 제공을 위하여 이용자들의 개인정보를 외부전문업체에 위탁하여 처리할 수 있습니다.<br>
                                개인정보의 취급 위탁은 개인정보취급방침에 명시한 범위 내에서 이용하며, 명시한 범위를 넘어서 개인정보를 이용하거나 제3자에게 제공하지 않습니다.<br>
                                다만, 이용자의 사전동의가 있거나, 관련 법령이 정한 규정과 절차에 따라 제공하는 경우는 예외입니다. 개인정보 취급위탁 업체는 다음과 같습니다.<br>
                                <br>
                                가. 롯데정보통신㈜ : 서비스 운용을 위한 가맹점 회원 및 현금영수증 이용자의 개인정보 열람, 조회 및 관리<br>
                                나. 국세청 : 개인정보제공자에 대한 매출/비용/과세/소득공제/부가세액공제 등 정보제공자에 대한 과세표준 및 연말소득공제 자료로 활용<br>
                                다. “KTIS” 등 고객센터 : 서비스 청약(신규,변경,해지)처리,고객상담 및 그 부대업무의 대행, 해피콜(신규개통 시), 온라인 및 메일 문의 업무 등<br>

                            </p>
                        </div>
                    </dd>
                </dl>
                <!-- //agree_box -->

                <!-- btn bot -->
                <div class="btn_bot">
                    <button type="button" id="" v-on:click="phoneAuth()" class="btn_b02 bg01">본인인증</button>
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
        checkAll: boolean = false;

        serviceList : any = {};
        privateList : any = {};
        customerList : any = {};

        paramId : any = '';

        created(){

            //this.paramId = this.$route.query.id; //url로 들어온 id값 받기

            //console.log("들어온 Id 확인");
            //console.log(this.paramId)
            //console.log('session Id :: ' + sessionStorage.accountId);

            if(sessionStorage.accountId == null || sessionStorage.accountId == ''){
                alert('잘못된 접근입니다.')
                this.$router.push('/login');
            }

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
                        //console.log('약관 조회 오류')
                    }
                }
                , (error) => {
                    //console.log('가맹점 등록 오류');
                    //console.log('약관 조회 오류');
                }
            ).catch((response) => {
                //console.log('약관 조회 오류');
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

            sessionStorage.kmc_id = sessionStorage.accountId; // id

            this.showConfirm = true; //본인인증 화면 보이기

             //this.termsAgree();

            //let reqData : any = { id: this.paramId };
            //this.$router.push({name:'regPass', params:{reqParams:reqData }});

            //약관동의
            /*CommonBoardService.postListData('accounts',sessionStorage.accountId+'/terms', null).then((response) => {
                    if (response.status == 200 || response.status == 200) {
                        //alert('변경이 완료되었습니다')
                        this.$router.push({name:'main'})
                    }
                }
                , (error) => {

                }
            ).catch((response) =>  {

            });*/
        }

        termsAgree(){
            //약관동의
            CommonBoardService.postListData('accounts',sessionStorage.accountId+'/terms', null).then((response) => {
                    if (response.status == 200 || response.status == 200) {
                        //alert('변경이 완료되었습니다')
                        //console.log('약관등록완료!!')
                        //this.$router.push({name:'main'})
                    }
                }
                , (error) => {
                }
            ).catch((response) =>  {

            });

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
                    //console.log('생년월일: '+response.birthday + ' | 성별: ' + response.gender + ' | 이름: ' + response.name + ' | 폰번호: ' + response.phoneNo + ' | ID: ' + response.id);

                    //this.$router.push({name:"regPass", params:{ reqData }});
                    this.termsAgree();

                    this.$router.push({name:'main'})
                }
                else {

                }
            }

        }

    }
</script>
