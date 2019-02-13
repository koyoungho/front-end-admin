<template>

    <!-- container -->
    <section id="container">
        <!-- content  -->
        <div class="content">
            <h2 class="blind">가맹점관리</h2>

            <h3>매장 조회</h3>

            <h4 class="blind">기본정보</h4>

            <!-- search reg box -->
            <div class="search_reg_box">
                <ul class="search_list col03">
                    <li>
                        <label for="">현금영수증 사업자</label>
                        <select name="" class="select form_w100" title="현금영수증 사업자" disabled="disabled" v-model="soluId">
                            <option value="">선택</option>
                            <template v-for="datas in receiptSaupList">
                                <option v-bind:value=datas.code>{{datas.codeNm}}</option>
                            </template>
                        </select>
                    </li>
                </ul>
                <ul class="search_list col03">
                    <li>
                        <label for="">가맹점 번호</label>
                        <input type="text" class="input form_w100" value="0000000000" title="가맹점번호" disabled="disabled" v-model="gajumId">
                    </li>
                    <li>
                        <label for="">사업자 번호</label>
                        <input type="text" class="input form_w100" value="0000000000" title="사업자번호" disabled="disabled" v-model="gajumSaupId">
                    </li>
                    <li>
                        <label for="">가맹점명</label>
                        <input type="text" class="input form_w100" value="신일약국" title="가맹점명" disabled="disabled" v-model="gajumNm">
                    </li>
                    <li>
                        <label for="">지점 번호</label>
                        <input type="text" class="input form_w100" value="000-00-00000" title="지점번호" disabled="disabled" v-model="jijumId">
                    </li>
                    <li>
                        <label for="">사업자 번호</label>
                        <input type="text" class="input form_w100" value="000-00-00000" title="사업자번호" disabled="disabled" v-model="jijumSaupId">
                    </li>
                    <li>
                        <label for="">지점명</label>
                        <input type="text" class="input form_w100" value="신일약국 영등포점" title="지점명" disabled="disabled" v-model="jijumNm">
                    </li>
                    <li>
                        <label for="">매장 번호</label>
                        <input type="text" class="input form_w100" value="000-00-00000" title="매장 번호" disabled="disabled" v-model="storeId">
                    </li>
                    <li>
                        <label for="">사업자 번호</label>
                        <input type="text" class="input form_w100" value="000-00-00000" title="사업자번호" disabled="disabled" v-model="storeSaupId">
                    </li>
                    <li>
                        <label for="">매장명</label>
                        <input type="text" class="input form_w100" value="신일약국 영등포점" title="매장명" disabled="disabled" v-model="storeName">
                    </li>
                </ul>
            </div>
            <!-- //search reg box -->

            <!-- btn tbl bot -->
            <!--<div class="btn_tbl_bot">
                <button type="button" id="" class="btn_m01 bg01 sch">가맹점 검색</button>
            </div>-->

            <h4>사업장 기본 정보 <span class="sub_cf">(사업자 등록증 상의 정보)</span></h4>

            <!-- tbl view box -->
            <div class="tbl_view_box">
                <!-- tbl view01 -->
                <table class="tbl_view01">
                    <caption>사업장 기본 정보</caption>
                    <colgroup>
                        <col width="17%">
                        <col width="33%">
                        <col width="17%">
                        <col width="33%">
                    </colgroup>
                    <tbody>
                    <tr>
                        <th scope="row">사업자등록번호</th>
                        <td colspan="1">
                            <input type="text" class="input form_industry" title="사업자등록번호" disabled="disabled" v-model="saupId">
                        </td>
                        <th scope="row">사업장명<em class="form_req">*</em></th>
                        <td colspan="1"><input type="text" class="input form_w100" title="사업장명" v-model="storeNm" maxlength="20"></td>
                    </tr>
                    <tr>
                        <th scope="row">대표자명<em class="form_req">*</em></th>
                        <td class="vtop" colspan="1"><input type="text" class="input form_w100" title="대표자명" v-model="repNm" maxlength="20"></td>
                        <th scope="row">전화번호<em class="form_req">*</em></th>
                        <td colspan="1">
                            <input type="text" class="input form_w100" title="전화번호" v-model="telNum" @keyup="changeTelNum" maxlength="20">
                            <p class="info_msg2" id="saupid_msg1"></p> <!-- 메시지 표시 -->
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">사업자구분</th>
                        <td class="vtop" colspan="1">
                            <select id="" name="" class="select form_w100" title="사업자구분" v-model="saupType" disabled="disabled">
                                <option value="">선택</option>
                                <option value="2">개인사업자</option>
                                <option value="1">법인사업자</option>
                                <!--<option value="">선택</option>
                                <template v-for="datas in saupGbnList">
                                    <option v-bind:value=datas.code>{{datas.name}}</option>
                                </template>-->
                            </select>
                        </td>
                        <th scope="row">법인등록번호</th>
                        <td colspan="1">
                            <input type="text" class="input form_w100" title="법인등록번호" v-model="lawNum" maxlength="13" disabled="disabled">
                            <p class="info_msg2" id="saupid_msg2"></p> <!-- 메시지 표시 -->
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">주소<em class="form_req">*</em></th>
                        <td colspan="3">
                            <ul class="address_list">
                                <li class="con01">
                                    <input type="text" class="input form_post" title="우편번호" v-model="zipCode" disabled="disabled">
                                    <button type="button" id="" class="btn_s01 bg03" v-on:click="addressBox(postText)">우편번호</button>
                                </li>
                                <li class="con02">
                                    <input type="text" class="input form_address01" title="주소" v-model="addr1" maxlength="30" disabled="disabled">
                                </li>
                                <li class="con03">
                                    <input type="text" class="input form_address02" title="상세 주소" v-model="addr2" maxlength="30">
                                </li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">매장 상태</th>
                        <td colspan="3">
                            <!--<input type="text" class="input form_w50" title="지점" v-model="storeStatus" disabled="disabled">-->
                            <select id="storeStatusID" name="" class="select form_bl" title="매장 상태" v-model="storeStatus" disabled="disabled">
                                <option value="">선택</option>
                                <option value="0">승인신청</option>
                                <option value="1">해지신청</option>
                                <option value="2">정상</option>
                                <option value="3">해지</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">사업장 등록일</th>
                        <td colspan="1"><input type="text" class="input form_w100" title="등록일" disabled="disabled" v-model="regiDate"></td>
                        <th scope="row">사업장 수정일</th>
                        <td colspan="1"><input type="text" class="input form_w100 fc_pt01" value="2018.11.20" title="사업장 해지일" disabled="disabled" v-model="canDate"></td>
                    </tr>
                    <tr>
                        <th scope="row">BL 정보</th>
                        <td colspan="3">
                            <select id="blGbID" name="" class="select form_bl" title="BL 정보" v-model="blGb" disabled="disabled">
                                <option value="">선택</option>
                                <option value="0">BL적용</option>
                                <option value="1">BL해지</option>
                            </select>
                            <input type="text" class="input form_bl" title="BL 정보" disabled="disabled" v-model="blGbNm">
                            <input type="text" class="input form_bldate" title="BL 정보" disabled="disabled" v-model="blDate">
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">업종구분<em class="form_req">*</em></th>
                        <td colspan="1">
                            <select id="" name="" class="select form_w100" title="업종" v-model="upjong">
                                <option value="">선택</option>
                                <template v-for="datas in upjongList">
                                    <option v-bind:value=datas.code>{{datas.codeNm}}</option>
                                </template>
                            </select>
                        </td>
                        <th scope="row">회사코드</th>
                        <td colspan="1">
                            <input type="text" class="input form_post" title="회사코드" v-model="subCompanyCnt" disabled="disabled"> 개
                            <button type="button" id="" class="btn_s01 bg04" v-on:click="subSaupPop">회사코드 등록</button>
                        </td>
                    </tr>
                    <tr v-if="upjong=='002'||upjong=='003'">
                        <th scope="row">요양기관기호<em class="form_req">*</em></th>
                        <td colspan="3"><input type="text" class="input form_w50" title="요양기관기호" v-model="gikanId" maxlength="10"></td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <!-- //tbl view box -->

<!-- 임시 주석 처리
            <div class="title_area">
                <h4>승인대역 정보</h4>
                <div class="btn_tbl_top type01">
                    <button type="button" id="" class="btn_m01 bg02 add" v-on:click="addAproval">승인대역 추가</button>
                </div>
            </div>

            <div class="tbl_view_box">
                <table class="tbl_view01">
                    <caption>승인대역 정보</caption>
                    <colgroup>
                        <col width="17%">
                        <col width="33%">
                        <col width="17%">
                        <col width="33%">
                    </colgroup>
                    <tbody v-for="(apro, index) in approvalList" class="bottom_space">
                    <tr>
                        <th scope="row">회사코드</th>
                        <td>
                            <select id="" name="" class="select form_comcode" title="회사코드" v-model="apro.companyCodeNm" v-on:change="companyCodeCh(index)" v-bind:disabled="apro.inputDisGbn">
                                <option value="">선택</option>
                                <template v-for="datas in companyCodeList">
                                    <option v-bind:value=datas.code>{{datas.name}}</option>
                                </template>
                            </select>
                            <input type="text" class="input form_comcode" title="회사코드" v-model="apro.companyCode" v-bind:disabled="apro.inputDisGbn">
                        </td>
                        <th scope="row">점코드</th>
                        <td>
                            <input type="text" class="input form_branchcode" title="점코드" v-model="apro.jumCode" v-on:keyup="jumCodeCh(index)" maxlength="10" v-bind:disabled="apro.inputDisGbn">
                            <input type="hidden" v-model="apro.jumCodeYn">
                            <button type="button" class="btn_s01 bg04" v-on:click="chkJumCode(index)" v-bind:style="apro.aproDupBtn">중복확인</button>
                            <p class="info_msg" v-bind:id="apro.jumCodeMsg"></p>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">승인코드</th>
                        <td>
                            <select id="" name="" class="select form_w100" title="승인번호" v-model="apro.aproCode" v-bind:disabled="apro.inputDisGbn">
                                <option value="">선택</option>
                                <template v-for="datas in aproCodeList">
                                    <option v-bind:value=datas.code>{{datas.codeNm}}</option>
                                </template>
                            </select>
                        </td>
                        <th scope="row">승인 상태</th>
                        <td><input type="text" class="input form_w100" title="승인 상태" disabled="disabled" v-model="apro.aproStat"></td>
                    </tr>
                    <tr>
                        <th scope="row">승인 대역</th>
                        <td colspan="3">
                            <div class="form_col approval">
                                <span class="rdo_box"><input type="radio" value="1" v-bind:id="apro.aproRadio" v-model="apro.aproGbn" checked="checked" v-on:change="aproBandChk(index, 'B')" v-bind:disabled="apro.inputDisGbn"><label for="aa11">대역폭</label></span>
                                <input type="text" class="input form_app01" placeholder="시작점(0000000)" title="승인대역 시작점" v-model="apro.aproBandFrom" v-bind:disabled="apro.inputDisGbn">
                                <span class="period_form">-</span>
                                <input type="text" class="input form_app01" placeholder="끝점(1000000)" title="승인대역 끝점" v-model="apro.aproBandTo" v-bind:disabled="apro.inputDisGbn">
                            </div>
                            <div class="form_col approval">
                                <span class="rdo_box"><input type="radio" value="2" v-bind:id="apro.aproRadio" v-model="apro.aproGbn" v-on:change="aproBandChk(index, 'C')" v-bind:disabled="apro.inputDisGbn"><label for="aa12">건수</label></span>
                                <input type="text" class="input form_app02" placeholder="건수(1000건 단위)" value="" title="승인대역 시작점" v-model="apro.aproCnt" v-bind:disabled="apro.inputDisGbn">
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>

            <div class="btn_tbl_bot">
                <button type="button" id="" class="btn_m01 bg01 del" v-on:click="delAproval">승인대역 삭제</button>
            </div>

            <div class="title_area">
                <h4>사용자 정보</h4>
                <div class="btn_tbl_top type01">
                    <button type="button" id="" class="btn_m01 bg02 add" v-on:click="addAdmin">ID 계정추가</button>
                </div>
            </div>

            <div class="account_list">
                <div class="acc_col">
                    <div class="tbl_view_box">
                        <table class="tbl_view01">
                            <caption>정보</caption>
                            <colgroup>
                                <col width="17%">
                                <col width="33%">
                                <col width="17%">
                                <col width="33%">
                            </colgroup>
                            <tbody v-for="(adm, index) in adminList" class="bottom_space">
                            <tr>
                                <th scope="row">이름</th>
                                <td><input type="text" class="input form_w100" title="이름" v-model="adm.adminNm" v-bind:disabled="adm.inputDisGbn"></td>
                                <th scope="row">휴대폰번호</th>
                                <td>
                                    <input type="text" class="input form_w100" title="휴대폰번호" v-model="adm.adminPhonenum" v-bind:disabled="adm.inputDisGbn">
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">ID</th>
                                <td>
                                    <input type="text" class="input form_id" title="ID" v-model="adm.adminId" v-on:keyup="chkIdCh(index)" v-bind:disabled="adm.inputDisGbn">
                                    <input type="hidden" v-model="adm.adminIdYn" title="idcheckYn">
                                    <button type="button" id="" class="btn_s01 bg04" v-on:click="chkAdminId(index)" v-bind:style="adm.admDupBtn">중복확인</button>
                                    <p class="info_msg" v-bind:id="adm.adminIdMsg" ></p>
                                </td>
                                <th scope="row">이메일주소</th>
                                <td>
                                    <input type="text" class="input form_w100" title="이메일주소" v-model="adm.adminEmail">
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="btn_tbl_bot">
                        <button type="button" id="" class="btn_m01 bg02 del" v-on:click="delAdmin">ID 계정삭제</button>
                    </div>
                </div>
            </div>
-->
            <!-- btn bot -->
            <div class="btn_bot">
                <button type="button" id="" class="btn_b01 bg02" v-on:click="cancelInfo">취소</button>
                <button type="button" id="" class="btn_b01 bg01" v-if="btnUpdShow" v-on:click="validationChk">정보 변경</button>
            </div>

            <AddressBox v-if="showModal" v-bind:postData="postText" v-on:selectedValue="setDataAddr" @close="showModal = false"></AddressBox>
            <GajijumBox v-if="showModal1" v-bind:postData="postText1" v-on:selectedGaji="setGajiData" @gajiClose="showModal1 = false"></GajijumBox>

            <CompanyCodePop v-if="companyCodeYn" v-bind:companyCodeVal="loadCodeList" @closeCompany="companyCodeYn=false"  v-on:listSend="getCodeList"></CompanyCodePop>

        </div>
        <!-- //content -->
    </section>
    <!-- //container -->

</template>

<script lang="ts">
    import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
    import {CommonBoardService, CommonListService} from '../../../api/common.service';
    import AddressBox from '@/components/common/addressBox/addressBox.vue';
    import GajijumBox from '@/components/contents/franchiseManage/GajijumBox.vue';
    import {environment} from '../../../utill/environment';
    import CompanyCodePop from '@/components/contents/franchiseManage/CompanyCodePop.vue'
    import moment from 'moment'
    Vue.prototype.moment = moment;

    @Component({
        components: {
            StoreDetl, AddressBox, GajijumBox,  CompanyCodePop
        },
    })
    export default class StoreDetl extends Vue {
        message: any = '';

        companyCodeYn:boolean =false; //회사코드 팝업 구분
        loadCodeList : any = [];
        companyCodeArr : any = ['001','003','006']

        btnUpdShow: boolean = false; //수정 권한
        topinfoShow : boolean = false; //상단 현금영수증, 가맹점, 지점 정보 표시

        objectKey : any = "";

        soluId: any = ''; //현금영수증 사업자

        gajumId: any = ''; //가맹점 번호
        gajumSaupId: any = ''; //사업자 번호
        gajumNm: any = ''; //가맹점명
        jijumId: any = ''; //지점ID
        jijumSaupId: any = ''; //지점번호
        jijumNm: any = ''; //지점명
        storeId: any = ''; //매장ID
        storeSaupId: any = ''; //매장번호
        storeName: any = ''; //매장명

        saupId: any = ''; //사업자등록번호
        //saupIdYn: any = '' //사업자등록번호 중복확인 여부
        storeNm: any = ''; //사업장명
        repNm: any = ''; //대표자명

        telNum: any = ''; //전화번호
        saupType: any = ''; //사업자구분
        lawNum: any = ''; //법인등록번호
        addr1: any = ''; //주소
        addr2: any = ''; //상세주소
        zipCode: any = ''; //우편번호
        upjong: any = ''; //업종구분
        subCompany: any = ''; //회사코드
        subCompanyCnt: any = ''; //회사코드
        storeStatus: any = ''; //매장상태
        gikanId: any = ''; //요양기관기호

        regiDate: any = ''; //매장등록일
        canDate: any = ''; //매장해지일

        blGb: any = ''; //BL 정보
        blGbNm: any = ''; //BL국분
        blDate: any = ''; //BL등록일

        //gajumStat: any = ''; //가점상태
        //saupjangRegDt: any = ''; //사업장등록일
        //saupjangDelDt: any = ''; //사업장해지일
        //blGbn: any = ''; //BL 정보
        //blNm: any = ''; //BL 명
        //blNm2: any = '';//BL 명

        approvalList: any = {}; //승인대역 정보 리스트
        adminList: any = {}; //관리자 정보 리스트

        showModal: boolean = false; // 사업장 주소
        postText: string = ""; //테스트 주소

        showModal1: boolean = false; // 가맹점 검색
        postText1: string = ""; //테스트 가맹점

        //selectbox list
        receiptSaupList: any = {}; //현금영수증 사업자 코드
        saupGbnList: any = {}; //사업자구분
        companyCodeList: any = {}; //회사코드
        subCompanyList: any = {}; //회사코드
        aproCodeList: any = {}; //승인코드
        upjongList: any = {}; //업종코드


        aproIdx : number = 0;
        admIdx : number = 0;

        alrAproBandCnt : number = 0;
        alrAdminCnt : number = 0;

        //돔생성전 호출자
        created() {

            //메뉴별 권한 확인
            let menuList = JSON.parse(sessionStorage.authMenu);
            let programId = 'storeList'; //메뉴ID
            for(let i=0; i<menuList.length; i++){
                for(let j=0; j<menuList[i].subMenuDtos.length; j++){

                    //권한(조회-readYn/ 등록-createYn/ 수정-updateYn/ 삭제-deleteYn)
                    if(menuList[i].subMenuDtos[j].progId == programId && menuList[i].subMenuDtos[j].updateYn == 'Y') {
                        this.btnUpdShow = true;
                    }
                }
            }

            this.approvalList = [
                {
                    companyCodeNm: "", //회사명
                    companyCode: "", //회사코드
                    jumCode: "", //점코드
                    jumCodeYn: "", //점토드 중복확인 여부
                    jumCodeMsg: "jumcode_msg0", //추가되는 row의 메시지 표시부분 id를 다른게 하기위해
                    aproCode: "", //승인코드
                    aproStat: "", //승인상태
                    aproGbn: "",
                    aproBandFrom: "", //승인대역 시작
                    aproBandTo: "", //승인대역 끝
                    aproCnt: "", //승인대역 건수
                    aproRadio: "band_radio0",
                    aproDupBtn: "dupbtn0",
                    inputDisGbn: false //input box의 disabled 여부
                }
            ],
                //관리자 정보
                this.adminList = [
                    {
                        adminNm: "", //이름
                        adminPhonenum: "", //휴대폰번호
                        adminId: "", //ID
                        adminIdYn: "", //ID 체크 여부
                        adminIdMsg: "adminid_msg0", //추가되는 row의 메시지 표시부분 id를 다르게 하기위해
                        adminEmail: "", //이메일주소
                        //adminConIp1: "", //접속IP대역 시작
                        revocationYn: "", //해지여부
                        //adminConIp2: "", //접속IP대역 끝
                        adminDupBtn: "adupbtn0", //중복확인버튼 index주기
                        inputDisGbn: false, //input box의 disabled 여부
                        lastConnDate: "" //최종접속일시
                    }
                ]

            //시스템관리자(0001), 콜센터관리자(0003)만 표시
            if(sessionStorage.role == '0001' || sessionStorage.role == '0003'){
                this.topinfoShow = true;

            }

            this.getSelectbox(); //공통사용 selectbox 조회
            this.franchiseView(); //가맹점 정보 조회



        }



        //돔렌더링완료시 진행
        mounted() {

            //시스템관리자(0001), 콜센터관리자(0003)만 표시
            /*if(sessionStorage.role == '0001'){

            }else{
                let blGb_btn = document.getElementById('blGb');
                if(blGb_btn!=null){ blGb_btn.setAttribute('disabled', 'disabled') }
            }*/



        }

        @Watch('telNum1') changeTelNum1(){
            let regNumber = /^[0-9]*$/;
            if(!regNumber.test(this.telNum)){
                Vue.swal({ text: '숫자만가능합니다'});
                this.telNum = '';
            }
        }

        changeTelNum(){
            let regNumber = /^[0-9]*$/;
            if(!regNumber.test(this.telNum)){
                Vue.swal({ text: '숫자만가능합니다'});
                this.telNum = '';
            }
        }

        //상세정보 보이기
        franchiseView(){
            this.objectKey = this.$route.params.objectKey;
            if(!this.objectKey){
                alert('접근할수 없습니다')
                this.$router.push({name:'franchiseList'});
            }else{
                this.saupId = this.objectKey.saupId; //가맹점 번호

                CommonBoardService.getListDatas('store/'+this.saupId, null, null).then((response) => {
                    let result: any =  response.data;
                    if(result != null){
                        this.getSelectList('APRO'); //승인코드

                        //사업자 정보
                        this.soluId = result.soluId; //현금영수증 사업자

                        this.gajumId = result.gajumId; // 가맹점 번호
                        this.gajumSaupId = result.gajumSaupId; // 가맹점 사업자번호
                        this.gajumNm = result.gajumNm; //가맹점명

                        this.jijumId = result.jijumId; // 지점 번호
                        this.jijumSaupId = result.jijumSaupId; // 가맹점 사업자번호
                        this.jijumNm = result.jijumNm; //지점명

                        this.storeId = result.storeId; // 지점 번호
                        this.storeSaupId = result.storeSaupId; // 가맹점 사업자번호
                        this.storeName = result.storeNm; //지점명

                        //this.saupNo = result.saupId; //사업자 번호
                        //this.saupId = result.storeSaupId; //사업자등록번호
                        //this.storeNm = result.storeNm;; //사업자명

                        if(result.saupjang != null){
                            this.saupId = result.saupjang.saupId; //사업자등록번호
                            this.storeNm = result.saupjang.shopNm; //사업장명
                            this.repNm = result.saupjang.chipNm; //대표자명
                            this.telNum = result.saupjang.telNum; //전화번호
                            this.saupType = result.saupjang.regiGb; //사업자구분
                            this.lawNum = result.saupjang.lawNum; //법인등록번호
                            this.zipCode = result.saupjang.zipCode;
                            this.addr1 = result.saupjang.addr1;
                            this.addr2 = result.saupjang.addr2;
                            this.upjong = this.nullCheck(result.saupjang.upjong);
                            if(result.saupjang.upjong == '002'||result.saupjang.upjong == '003'){ //병원,의원이면 요양기관 표시
                                this.gikanId = result.saupjang.gikanId;
                            }
                            this.loadCodeList = result.saupjang.subSaup;
                            if(result.saupjang.subSaup != null && result.saupjang.subSaup.length > 0){
                                this.subCompanyCnt = result.saupjang.subSaup.length;
                            }

                        }

                        this.storeStatus = result.storSts; //매장 상태 storStsNm
                        this.regiDate = result.regDate; //매장 등록일
                        this.canDate = result.updDate; //매장 수정일
                        this.blGb = result.blGb; //BL구분(시스템 관리자만 변경가능)
                        this.blGbNm = result.blStatus; //BL상태
                        this.blDate = result.blDate; //BL등록일

                        if(sessionStorage.role == '0001') { //시스템관리자만 변경 가능
                            let blGb = document.getElementById('blGbID');
                            //if (blGb != null) { blGb.setAttribute('disabled', 'disabled'); }
                            if (blGb != null) { blGb.removeAttribute('disabled'); }

                            let storeSts = document.getElementById('storeStatusID');
                            if (storeSts != null) { storeSts.removeAttribute('disabled'); }
                        }
/* 임시 주석 처리
                        //승인대역 정보

                        this.alrAproBandCnt = result.approvalBandList.length; //기등록된 승인대역 카운트(승인대역 row 삭세시 체크)
                        this.alrAdminCnt = result.accountList.length; //기등록된 관리자정보 카운트(관리자정보 row 삭세시 체크)

                        for(let a=0; a<result.approvalBandList.length; a++){

                            if(result.approvalBandList.length > 0 && a == 0){
                                this.approvalList[0].aproDupBtn = 'display:none'; //점코드 중확확인 버튼 안보임
                                this.approvalList[0].inputDisGbn = true; //input 수정 못함
                            }
                            if(a > 0){ //승인대역 정보 1개는 기본으로 보여짐으로 1개이상부터 추가
                                this.addAproval('hide'); //승인대역 정보 row 추가
                            }
                            this.approvalList[a].companyCodeNm = result.approvalBandList[a].subSaup; //회사코드
                            this.approvalList[a].companyCode = result.approvalBandList[a].subSaup; //회사코드
                            this.approvalList[a].jumCode = result.approvalBandList[a].jumcode; //점코드
                            this.approvalList[a].aproCode = result.approvalBandList[a].aprvCode; //승인코드
                            this.approvalList[a].aproBandFrom = result.approvalBandList[a].aprvPermFrom; //접속대역 시작점
                            this.approvalList[a].aproBandTo = result.approvalBandList[a].aprvPermTo; //접속대역 끝점
                            this.approvalList[a].jumCodeYn = 'Y'; //기존 등록건은 점코드 중복확인을 한것으로 함
                            this.approvalList[a].aproStat = result.approvalBandList[a].aprvYn; //승인상태
                            if(result.approvalBandList[a].aprvPermFrom != null && result.approvalBandList[a].aprvPermFrom != '') { //대역폭이 있으면 라디오버튼 대역폭에 체크
                                this.approvalList[a].aproGbn = '1';
                            }else{ //없으면 라디오버튼 건수에 체크
                                this.approvalList[a].aproGbn = '2';
                            }

                        }

                        //관리자 정보
                        for(let a=0; a<result.accountList.length; a++){

                            if(result.accountList.length > 0 && a == 0){
                                this.adminList[0].admDupBtn = 'display:none'; //ID 중확확인 버튼 안보임
                                this.adminList[0].inputDisGbn = true; //input 수정 못함
                            }
                            if(a > 0){ //관리자 정보 1개는 기본으로 보여짐으로 1개이상부터 추가
                                this.addAdmin('hide'); //승인대역 정보 row 추가
                            }
                            this.adminList[a].adminNm = result.accountList[a].name; //이름
                            this.adminList[a].adminPhonenum = result.accountList[a].phoneNum; //휴대폰번호
                            this.adminList[a].adminId = result.accountList[a].id; //아이디
                            this.adminList[a].adminEmail = result.accountList[a].email; //이메일
                            //this.adminList[a].adminConIp1 = result.accountList[a].accessIpFrom; //접속대역IP시작
                            //this.adminList[a].adminConIp2 = result.accountList[a].accessIpTo; //접속대역IP종료
                            this.adminList[a].revocationYn = 'N'; //조회되는 관리자는 계정상태가 무조건 정상임
                            this.adminList[a].adminIdYn = 'Y'; //기존 등록건은 ID 중복확인을 한것으로 함
                            this.adminList[a].lastConnDate = '2018.12.01 15:35:13'; //변경해야해!!

                        }
임시 주석 처리 */
                    }else{

                    }
                    //this.onLoadListView = true;
                }).catch();
            }
            //this.onLoadListView = false
        }

        //취소
        cancelInfo(){
            this.$router.push('/home/storeList')
        }

        getSelectbox(){
            this.getSelectList('RECEIPT'); //현금영수증 사업자
            this.getSelectList('SEARCH'); //회사코드
            this.getSelectList('APRO'); //승인코드
            this.getSelectList('UPJONG'); //업종코드
            this.getSelectList('SUBSAUP'); //회사코드(사업장)
        }

        @Watch('upjong') onChange(){
            if(this.upjong == '0002' || this.upjong == '0003') { //업종구분이 신문사(0002), 택배사(0003) 이면 회사코드 조회
                //this.getSelectList('SUBSAUP');
            }else{
            }
        }

        //승인대역 유효성 체크
        alrBandChk() {
/* 임시 주석 처리
            //승인대역 정보 체크
            if(this.approvalList.length > 0){
                for(let i=0; i<this.approvalList.length; i++){
                    if(this.approvalList[i].inputDisGbn != true && this.approvalList[i].companyCodeNm != undefined && this.approvalList[i].companyCodeNm != ''){ //회사코드를 선택하면 승인대역 정보는 필수 입력항목이 됨


                        //승인대역 대역폭 체크
                        let bandChk : boolean = true;
                        if(this.approvalList[i].aproGbn == '1' && this.approvalList[i].aproBandFrom != '' &&  this.approvalList[i].aproBandTo != '') { //승인대역이 대역폭이고 대역폭 시작, 끝이 있으면 체크
                            //대역폭 정보
                            let bandData: any = {};
                            bandData['subSaup'] = this.approvalList[i].companyCodeNm; //회사코드
                            bandData['approvedCode'] = this.approvalList[i].aproCode; //승인코드
                            bandData['newApprovedbandFrom'] = this.approvalList[i].aproBandFrom; //시작 대역
                            bandData['newApprovedbandTo'] = this.approvalList[i].aproBandTo; //끝 대역

                            //승인대역 대역폭 사용가능 여부 확인
                            CommonBoardService.postListDatas('validation/approvedband', null, bandData).then((response) => {
                                    let result: any = response.data;
                                    if (result.code === '000') { //대역폭 사용가능
                                        bandChk = false;
                                    } else { //대역폭 사용 못함
                                        alert(result.message)
                                        bandChk = true;
                                    }
                                    if(bandChk == true){
                                        return;
                                    }else{
                                        this.updateInfo(); //등록
                                    }
                                }
                                , (error) => {
                                }
                            ).catch();
                        }

                        if(bandChk == true){ //승인대역 사용 불가
                            return;
                        }else{
                            this.updateInfo(); //등록
                        }
                    }else{
                        this.updateInfo(); //승인대역 리스트가 없으면 그냥 등록
                    }
                }
            }
임시 주석 처리 */

            this.updateInfo();

        }

        //수정
        updateInfo() {

            let reqData: any = {};

            reqData['soluId'] = this.soluId; //현금영수증 사업자
            reqData['gajumId'] = this.gajumId; //가맹점번호
            reqData['gajumSaupId'] = this.gajumSaupId; //가맹점 사업자번호
            reqData['gajumNm'] = this.gajumNm; //가맹점 명
            reqData['jijumId'] = this.jijumId; //지점번호
            reqData['jijumSaupId'] = this.jijumSaupId; //지점 사업자번호
            reqData['jijumNm'] = this.jijumNm; //지점 명

            //사업장정보
            let saupData: any = {};
            saupData['blCode'] = this.blGb; //BL정보
            saupData['storeStatus'] = this.storeStatus; //매장상태
            saupData['saupId'] = this.saupId; //사업자등록번호
            saupData['shopNm'] = this.storeNm; //사업장명
            saupData['chipNm'] = this.repNm; //대표자명
            saupData['telNum'] = this.telNum; //전화번호
            saupData['saupType'] = this.saupType; //사업자구분
            saupData['lawNum'] = this.lawNum; //법인등록번호
            saupData['upjong'] = this.upjong; //업종코드
            saupData['subSaup'] = this.loadCodeList; //this.subCompany; //회사코드
            saupData['gikanId'] = this.gikanId; //요양기간 번호
            saupData['zipCode'] = this.zipCode; //사업장 우편번호
            saupData['addr1'] = this.addr1; //사업장 주소
            saupData['addr2'] = this.addr2; //사업장 상세주소

            reqData['saupjang'] = saupData; //사업장 정보 셋팅

            //승인대역 정보
            //let aproData: any = [];
            let aproData : any = {};
            let addData2 : any = []; //승인대역정보 배열
/* 임시 주석 처리

            if(this.approvalList.length > 0){
                for(let j=0; j<this.approvalList.length; j++){
                    if(this.approvalList[j].companyCode != undefined && this.approvalList[j].companyCode != '' && this.approvalList[j].inputDisGbn != true) { //회사코드가 있는 경우만 담기
                        aproData = {}; //초기화 안하면 값이 이상하게 들어감
                        aproData['subSaup'] = this.approvalList[j].companyCode; //회사코드
                        aproData['aprvPermFrom'] = this.approvalList[j].aproBandFrom; //승인대역 시작
                        aproData['aprvPermTo'] = this.approvalList[j].aproBandTo; //승인대역 끝
                        aproData['aprvCode'] = this.approvalList[j].aproCode; //승인코드
                        aproData['aprvCount'] = this.approvalList[j].aproCnt; //건수
                        aproData['jumcode'] = this.approvalList[j].jumCode; //점코드
                        aproData['saupId'] = this.saupId; //사업자등록번호
                        addData2.push(aproData);
                        //addData2.push(aproData);
                    }
                }
            }
임시 주석 처리 */
            reqData['approvalBand'] = addData2; //승인대역 정보 셋팅

            //let admData: any = {};
            let admData: any = {};
            let addData3 : any = []; //사용자 정보 배열
/* 임시 주석 처리
            if(this.adminList.length > 0){
                for(let k=0; k<this.adminList.length; k++){
                    if(this.adminList[k].adminNm != undefined && this.adminList[k].adminNm != '') { //이름이 입력된 경우만 담기
                        admData = {}; //초기화 안하면 값이 이상하게 들어감
                        admData['name'] = this.adminList[k].adminNm; //이름
                        admData['phoneNum'] = this.adminList[k].adminPhonenum; //휴대폰번호
                        admData['id'] = this.adminList[k].adminId; //ID
                        admData['email'] = this.adminList[k].adminEmail; //이메일
                        //admData['accessIpFrom'] = this.adminList[k].adminConIp1; //접속IP 시작
                        //admData['accessIpTo'] = this.adminList[k].adminConIp2 //접속IP 끝
                        addData3.push(admData);
                        //addData3.push(admData);
                    }
                }
            }
임시 주석 처리 */
            reqData['accounts'] = addData3; //관리자 정보 셋팅

            reqData['saupFileNm'] = 'attachFileNm.jpg'; //관리자 정보 셋팅

            if(confirm('매장 정보를 수정하시겠습니까?')){

                // api 데이터 호출(매장 수정)
                CommonBoardService.updateListData('store/'+this.saupId, null, reqData).then((response) => {
                        let result: any = response.data;
                        if (result != null) {
                            alert('매장 정보가 수정되었습니다.');
                            this.$router.push({name:'storeList'});
                        } else {
                            alert('매장 정보 수정이 실패하였습니다.\n다시 시도하세요.');
                            return;
                        }
                    }
                    , (error) => {
                    }
                ).catch((response) => {
                });
            }
        }

        //승인대역 추가
        addAproval(display) {
            this.aproIdx = this.aproIdx + 1;
            let msg_name = 'jumcode_msg'+ this.aproIdx; //점코드 중확확인 메시지 표시위해 ID 만듬
            let radio_name = 'band_radio'+this.aproIdx; //승인대역 라이오 버튼 ID또는 NAME 다르게
            let btn_hide : string = ''; //버튼 감추기 여부
            let input_dis : boolean = false; //input disabled 여부
            if(display == 'hide') { //hide이면 중복확인 버튼 안나옴
                btn_hide = 'display:none;';
                input_dis = true;
            }
            this.approvalList.push({companyCodeNm: "", companyCode: "", jumCode:"", jumCodeYn:"", jumCodeMsg:msg_name, aproCode:"", aproStat:"", aproGbn:"", aproBandFrom:"", aproBandTo:"", aproCnt:"", aproRadio:radio_name, aproDupBtn:btn_hide, inputDisGbn:input_dis});
        }

        //승인대역 삭제
        delAproval() {
            //console.log(this.approvalList.length)
            let aproCnt = this.approvalList.length;
            if(aproCnt > 1){
                //this.approvalList.$remove(1)
                this.approvalList.splice((aproCnt-1),1);
                this.aproIdx = this.aproIdx - 1; //삭제하면 현재 aproIdx - 1로 변경
            }
            //this.approvalList.$remove(row);
        }

        //관리자 추가
        addAdmin(display) {
            this.admIdx = this.admIdx + 1;
            let msg_name = 'adminid_msg' + this.admIdx;

            let btn_hide : string = ''; //버튼 감추기 여부
            let input_dis : boolean = false; //input disabled 여부
            if(display == 'hide') { //hide이면 중복확인 버튼 안나옴
                btn_hide = 'display:none;';
                input_dis = true;
            }
            this.adminList.push({adminNm: "", adminPhonenum: "", adminId:"", adminIdYn:"", adminIdMsg:msg_name , adminEmail:""/*, adminConIp1:"", adminConIp2:"",*/, revocationYn:"" , admDupBtn:btn_hide, inputDisGbn:input_dis});
            //this.admIdx = this.admIdx;
        }
        //관리자 삭제
        delAdmin() {
            let admCnt = this.adminList.length;
            if(admCnt > 1){
                //this.approvalList.$remove(1)
                this.adminList.splice((admCnt-1),1);
                this.admIdx = this.admIdx - 1; //삭제하면 현재 admIdx - 1로 변경
            }
        }

        validationChk(){

            /*if(this.soluId == ''){
                alert('현금영수증 사업자를 선택하세요.');
                return;
            }else if(this.gajumId == ''){
                alert('가맹점 검색버튼을 클릭하여 가맹점을 선택하세요.');
                return;
            }else if(this.saupId == ''){
                alert('사업자등록번호를 입력하세요.');
                return;
            }else if(this.saupIdYn == '') {
                alert('사업자등록번호를 중복확인하세요.');
                return;
            }else */
            if(this.storeNm == ''){
                alert('사업장명을 입력하세요.');
                return;
            }else if(this.repNm == ''){
                alert('대표자명을 입력하세요.');
                return;
            }else if(this.telNum == ''){
                alert('전화번호를 입력하세요.');
                return;
            /*}else if(this.saupType == ''){
                alert('사업자구분을 선택하세요.');
                return;
            }else if(this.saupType == '1' && this.lawNum == ''){ //법인사업자 경우만 체크
                alert('법인등록번호를 입력하세요.');
                return;*/
            }else if(this.zipCode == ''){
                alert('우편번호 버튼을 클릭하여 우편번호를 입력하세요.');
                return;
            }else if(this.addr1 == ''){
                alert('우편번호 버튼을 클릭하여 주소를 입력하세요.');
                return;
            }else if(this.addr2 == ''){
                alert('상세주소를 입력하세요.');
                return;
            }else if(this.upjong == ''){
                alert('업종구분을 선택하세요.');
                return;
            }else if((this.upjong == '002' || this.upjong == '003') && (this.gikanId == null || this.gikanId == '')){ // 업종구분이 병원, 의원인 경우 필수입력
                alert('요양기관기호를 입력하세요.');
                return;
            }
/* 임시 주석 처리
            //승인대역 정보 체크
            if(this.approvalList.length > 0){
                for(let i=0; i<this.approvalList.length; i++){
                    if(this.approvalList[i].companyCodeNm != undefined && this.approvalList[i].companyCodeNm != ''){ //회사코드를 선택하면 승인대역 정보는 필수 입력항목이 됨
                        if(this.approvalList[i].jumCode == undefined || this.approvalList[i].jumCode == '') {
                            alert('점코드를 입력하세요.')
                            return;
                        }
                        if(this.approvalList[i].jumCodeYn == undefined || this.approvalList[i].jumCodeYn == '') {
                            alert('점코드 중복확인 하세요.')
                            return;
                        }
                        if(this.approvalList[i].aproCode == undefined || this.approvalList[i].aproCode == ''){
                            alert('승인코드를 선택하세요.');
                            return;
                        }
                        if(this.approvalList[i].aproGbn == undefined || this.approvalList[i].aproGbn == ''){
                            alert('승역대역 항목을 체크하세요.')
                            return;
                        }
                        if(this.approvalList[i].aproGbn == '1' && (this.approvalList[i].aproBandFrom == undefined || this.approvalList[i].aproBandFrom == '')){
                            alert('승인대역 시작점을 입력하세요.')
                            return;
                        }
                        if(this.approvalList[i].aproGbn == '1' && (this.approvalList[i].aproBandTo == undefined || this.approvalList[i].aproBandTo == '')){
                            alert('승인대역 끝점을 입력하세요.')
                            return;
                        }
                        if(this.approvalList[i].aproGbn == '2' && (this.approvalList[i].aproCnt == undefined || this.approvalList[i].aproCnt == '')){
                            alert('승인대역 건수를 입력하세요.')
                            return;
                        }
                    }
                }
            }

            //사용자 정보 체크
            if(this.adminList.length > 0){
                for(let i=0; i<this.adminList.length; i++){
                    if(this.adminList[i].adminNm != undefined && this.adminList[i].adminNm != ''){ //이름을 입력하면 관리자정보는 필수 입력항목이 됨
                        console.log('사용자 정보 건수 :: '+this.adminList.length);
                        if(this.adminList[i].adminPhonenum == undefined || this.adminList[i].adminPhonenum == '') {
                            alert('휴대폰번호를 입력하세요.');
                            return;
                        }
                        if(this.adminList[i].adminId == undefined || this.adminList[i].adminId == ''){
                            alert('ID를 입력하세요.');
                            return;
                        }
                        if(this.adminList[i].adminIdYn == undefined || this.adminList[i].adminIdYn == ''){
                            alert('ID 중복확인 하세요.');
                            return;
                        }
                        if(this.adminList[i].adminEmail == undefined || this.adminList[i].adminEmail == ''){
                            alert('이메일주소를 입력하세요.');
                            return;
                        }
                        if(this.adminList[i].adminEmail != '' && !this.emailCheck(this.adminList[i].adminEmail)){
                            alert('입력하신 이메일 주소가 올바르지 않습니다.\n이메일 주소를 확인하세요.');
                            return;
                        }
                    }
                }
            }
임시 주석 처리 */
            //다음 단계 functon 들어오는 곳!!
            //this.insertInfo();
            this.alrBandChk();
        }

//사업자 구분(개인,법인) 체크
        saupIdChk() {
            if(this.saupId == ''){
                //this.saupIdYn = ''; //입력한 사업자등록번호가 없으면 사업자등록번호 중복체크값 초기화
                this.saupType = '';
            }
            let saupmsg = document.getElementById('saupid_msg');
            if(saupmsg != null){ saupmsg.innerHTML = ''; } //화면에 메시지 제거

            let saupNo : any = '';
            if(this.saupId.length == 10){
                saupNo = this.saupId.substring(3, 5);
                if(saupNo.substring(0,1) == 0){
                    saupNo = saupNo.substring(2,1)
                }
                if((saupNo >= 1 && saupNo < 81) || (saupNo >= 89 && saupNo <= 99)){ //개인
                    this.saupType = '2';
                }else{ //법인
                    this.saupType = '1';
                }
            }

        }

        //사업자등록번호 유효성 체크
        chkSaupNo(no: string) {
            let saupmsg = document.getElementById('saupid_msg');

            if(no == ''){
                alert('사업자등록번호를 입력하세요.');
                return;
            }else if(no.length != 10){
                if(saupmsg!=null){ saupmsg.innerHTML = '사업자등록번호 길이가 부적합 합니다.'; }
                return;
            }

            let reqData: any = {};
            reqData['checkString'] = no; //사업자등록번호

            // api 데이터 호출(사업자등록번호 유효성 체크)
            CommonBoardService.postListDatas('validation/saupid', null, reqData).then((response) => {
                    let result: any = response.data;
                    if (result != null && result.code == '000') {
                        //this.saupIdYn = 'Y';
                        //사업자등록번호 유효성 체크에 이상이 없으면 기 등록된 사업장등록번호인지 한번 더 체크
//                        this.chkSaupNoAlr(no);
                    } else {
                        //this.saupIdYn = 'Y'; //개발 반영시 ''로 바꾸어야 함
                        if(saupmsg != null){
                            saupmsg.innerHTML = result.message; //화면에 메시지 보이기
                        }
                    }
                }
                , (error) => {
                    //this.saupIdYn = '';
                }
            ).catch((response) => {
                //this.saupIdYn = '';
            });
        }

        //점코드 유효성 체크
        chkJumCode(idx: number) {

            if(this.saupId == ''){
                alert('사업자등록번호를 입력하셔야 확인이 가능합니다.');
                return;
            }
            let no = this.approvalList[idx].jumCode; //점코드
            let saupmsg = document.getElementById('jumcode_msg'+idx); //중복 확인한 ROW 메시지

            let reqData: any = {};
            reqData['newJumCode'] = no; //점코드
            reqData['saupId'] = this.saupId; //사업자등록번호

            // api 데이터 호출(사업자등록번호 유효성 체크)
            CommonBoardService.postListDatas('validation/jumcode', null, reqData).then((response) => {
                    let result: any = response.data;
                    if (result != null && result.code == '000') {
                        if(saupmsg != null){
                            saupmsg.innerHTML = "사용가능한 점코드입니다."; //화면에 메시지 보이기
                        }
                        this.approvalList[idx].jumCodeYn = 'Y';
                    } else {
                        this.approvalList[idx].jumCodeYn = '';
                        if(saupmsg != null){
                            saupmsg.innerHTML = result.message; //화면에 메시지 보이기
                        }
                    }
                }
                , (error) => {
                    this.approvalList[idx].jumCodeYn = '';
                }
            ).catch((response) => {
                this.approvalList[idx].jumCodeYn = '';
            });
        }

        //점코드 변경시 초기화
        jumCodeCh1(event: any){

            //let code = event.currentTarget.value;  //점코드 가져오기
            let jumcode_msg = event.path['1'].children['2'].nextSibling //점코드 체크 메시지

            //if(code == ''){
            //this.aproCodeList.jumCodeYn = ''; //입력한 사업자등록번호가 없으면 사업자등록번호 중복체크값 초기화
            event.path['1'].children['1'].value = ''; //점코드 중복확인 여부(jumCodeYn) 초기화
            jumcode_msg.innerHTML = '';
            //    return;
            //}else if(code.length != 10){
            //    //this.aproCodeList.jumCodeYn = '';
            //    event.path['1'].children['1'].value = ''; //jumCodeYn 초기화
            //    jumcode_msg.innerHTML = '';
            //    return;
            //}
        }

        //점코드 변경시 점코드 중확확인 여부값 초기화
        jumCodeCh(idx: number){
            this.approvalList[idx].aproJumCodeYn = '';
        }

        //관리자 ID 변경시 ID 중복확인 여부값 초기화
        chkIdCh(idx: number){
            this.adminList[idx].adminIdYn = '';
        }

        //사용자ID 중복확인
        chkAdminId(idx: number) {
            let id = this.adminList[idx].adminId; //ID 가져오기
            let idmsg = document.getElementById('adminid_msg'+idx); //중복 확인한 ROW 메시지

            if(id != null && id == ''){
                alert('ID를 입력하세요.');
                if(idmsg!=null){ idmsg.innerHTML = ''; }
                return;
            }
            let reqData: any = {};
            reqData['checkString'] = id; //ID

            // api 데이터 호출
            CommonBoardService.postListDatas('validation/id', null, reqData).then((response) => {
                    let result: any = response.data;
                    if (result.code == '000') {
                        this.adminList[idx].adminIdYn = 'Y';
                        if(idmsg!=null){ idmsg.innerHTML = '사용 가능한 아이디입니다.'; }
                    }else{
                        this.adminList[idx].adminIdYn = '';
                        if(idmsg!=null){ idmsg.innerHTML = result.message; }
                        return;
                    }
                }
                , (error) => {
                    this.adminList[idx].adminIdYn = '';
                }
            ).catch((response) => {
                this.adminList[idx].adminIdYn = '';
            });
        }

        //공통 select box 조회
        getSelectList(code: string){
            if(code == ''){
                return;
            }

            let reqData: any = {};
            let apiUrl : string = '';

            if(code == 'SEARCH'){ //회사코드(SEARCH-사용가능한것만 조회) -- get
                reqData['searchType'] = 'SEARCH';
                apiUrl = 'company';
            }else if(code == 'APRO'){ //승인코드 -- get
                apiUrl = 'code/approvalcode';
            }else if(code == 'RECEIPT') { //현금영수증 사업자 코드 -- get
                apiUrl = 'code/issuer';
            }else if(code == 'UPJONG'){ //업종코드
                apiUrl = 'code/upjong';
            }else if(code == 'SUBSAUP'){ //SW제공회사
                //reqData['upjongCode'] = this.upjong;
                apiUrl = 'company';
            }

            // api 데이터 호출
            CommonBoardService.getListDatas(apiUrl, null, reqData).then((response) => {
                    let result: any = response.data;
                    //console.log(result)
                    if (result.length > 0) {
                        if(code == 'APRO'){ //승인코드
                            this.aproCodeList = result;
                        }else if(code == 'SEARCH'){ //회사코드
                            this.companyCodeList = result;
                        }else if(code == 'RECEIPT'){ //현금영수증 사업자 코드
                            this.receiptSaupList = result;
                        }else if(code == 'UPJONG'){
                            this.upjongList = result; //업종코드
                        }else if(code == 'SUBSAUP'){
                            this.subCompanyList = result; //회사코드
                        }
                    } else {
                    }
                }
                , (error) => {
                }
            ).catch();

        }

        //사업장 주소 팝업 보임
        addressBox(text) {
            this.showModal = true;
            //this.postText = "서울시금천구";
        }

        //사업장 주소 셋팅
        setDataAddr(data) {
            this.addr1 = data.addr;
            this.zipCode = data.zip;
        }

        //회사코드 select 변경시 코드값 표시
        companyCodeCh(idx: number){
            this.approvalList[idx].companyCode = this.approvalList[idx].companyCodeNm;
        }

        //승인대역(대역폭, 건수) 선택시 기입력된 값 초기화
        aproBandChk(idx: number, gbn: string){
            if(gbn == 'B'){ //대역폭 선택
                this.approvalList[idx].aproCnt = ''; //건수 초기화
            }else if(gbn == 'C'){ //건수 선택
                this.approvalList[idx].aproBandFrom = ''; //대역폭 시작점 초기화
                this.approvalList[idx].aproBandTo = ''; //대역폭 끝좀 초기화
            }
        }

        //메일 주소 정규표현식 체크
        emailCheck( email ) {
            var regex=/([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
            return (email != '' && email != 'undefined' && regex.test(email));
        }

        //가맹점 팝업 보임
        gajiBox(text) {
            this.showModal1 = true;
            //this.postText = "서울시금천구";
        }

        //선택한 가맹점 정보 셋팅(지점 등록화면 상단의 지점 정보)
        setGajiData(data) {
            this.gajumId = data.gajumId; //가맹점 번호
            this.gajumSaupId = data.gajumSaupId; //가맹점 사업자 번호
            this.gajumNm = data.gajumNm; //가맹점명
            this.jijumId = data.jijumId; //지점 번호
            this.jijumSaupId = data.jijumSaupId; //지점 사업자 번호
            this.jijumNm = data.jijumNm; //지점명
        }

        // 날짜 포맷
        dateFormat(val: string){
            if(val == undefined || val == ''){
                return '';
            }else{
                if(val.length != 14){
                    return '';
                }else{
                    let y1 : number  = Number(val.substring(0, 4));
                    let m1 : number = Number(val.substring(4,6));
                    let d1 : number = Number(val.substring(6,8));
                    let hH : number = Number(val.substring(8,10));
                    let mM : number = Number(val.substring(10,12));
                    let sS : number = Number(val.substring(12));

                    let date = new Date(y1, m1, d1, hH, mM, sS); //날짜로 변경
                    let formatDate = moment(date).format('YYYY-MM-DD HH:mm:ss');

                    return formatDate;
                }
            }
        }

        // Null체크
        nullCheck(val){
            if(val == null){
                return '';
            }else if(val == ''){
                return '';
            }else{
                return val;
            }
        }

        //회사코드 등록 팝업
        subSaupPop(){
            this.companyCodeYn = true;

        }
        getCodeList(data){ // 회사코드 선택 데이터 받는다

            if(data!=null){
                //this.saupSubSaupCnt = data.length;
                this.subCompanyCnt = data.length;
            }

            this.loadCodeList = data;
        }

        //
        dateFormat_hms(data, format){
            let bef_format : string = '';
            let aft_format : string = '';

            if(format == 'hms'){ //년월일 시분초
                bef_format = 'YYYYMMDDHHmmss';
                aft_format = 'YYYY.MM.DD HH:mm:ss';
            }else if(format == 'ymd'){ //년월일
                bef_format = 'YYYYMMDD';
                aft_format = 'YYYY.MM.DD';
            }
            if(data == null || data == ''){
                return '';
            }else {
                return moment(data, bef_format).format(aft_format)
            }
        }

    }

</script>