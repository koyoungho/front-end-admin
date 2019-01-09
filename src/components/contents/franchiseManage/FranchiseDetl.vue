<template>

    <!-- container -->
    <section id="container">
        <!-- content  -->
        <div class="content">
            <h2 class="blind">가맹점 관리</h2>

            <h3>가맹점 조회</h3>

            <h4 class="blind">기본 정보</h4>

            <!-- search reg box -->
            <div class="search_reg_box" v-if="topinfoShow">
                <ul class="search_list col03">
                    <li>
                        <label for="">현금영수증 사업자</label>
                        <select id="" name="" class="select form_w100" title="현금영수증 사업자" v-model="soluId" disabled="disabled">
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
                        <input type="text" class="input form_w100" v-model="gajumId" title="가맹점번호" disabled="disabled">
                    </li>
                    <li>
                        <label for="">사업자 번호</label>
                        <input type="text" class="input form_w100" v-model="saupNo" title="사업자번호" disabled="disabled">
                    </li>
                    <li>
                        <label for="">가맹점명</label>
                        <input type="text" class="input form_w100" v-model="soluNm" title="가맹점명" disabled="disabled">
                    </li>
                </ul>
            </div>
            <!-- //search reg box -->

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
                        <td>
                            <input type="text" class="input form_industry" title="사업자등록번호" v-model="saupId" disabled="disabled">
                        </td>
                        <th scope="row">사업장명</th>
                        <td><input type="text" class="input form_w100" title="사업장명" v-model="storeNm" maxlength="20"></td>
                    </tr>
                    <tr>
                        <th scope="row">대표자명</th>
                        <td><input type="text" class="input form_w100" title="대표자명" v-model="repNm" maxlength="20"></td>
                        <th scope="row">전화번호</th>
                        <td>
                            <input type="text" class="input form_w100" title="전화번호" v-model="repPhonenum" maxlength="20">
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">사업자구분</th>
                        <td>
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
                        <td><input type="text" class="input form_w100" title="법인등록번호" v-model="lawNum" maxlength="10" disabled="disabled"></td>
                    </tr>
                    <tr>
                        <th scope="row">주소</th>
                        <td colspan="3">
                            <ul class="address_list">
                                <li class="con01">
                                    <input type="text" class="input form_post" title="우편번호" v-model="zipCode" disabled="disabled">
                                    <button type="button" id="" class="btn_s01 bg03" v-on:click="addressBox(postText)">우편번호</button>
                                </li>
                                <li class="con02">
                                    <input type="text" class="input form_address01" title="주소" v-model="addr1" maxlength="30">
                                </li>
                                <li class="con03">
                                    <input type="text" class="input form_address02" title="상세 주소" v-model="addr2" maxlength="30">
                                </li>
                            </ul>
                        </td>
                    </tr>
                    <!-- <tr>
                        <th scope="row">회사코드</th>
                        <td>
                            <select id="" name="" class="select form_w100" title="사업자구분" v-model="saupSubSaup">
                                <option value="">선택</option>
                                <template v-for="datas in saupSubSaupList">
                                    <option v-bind:value=datas.code>{{datas.name}}</option>
                                </template>
                            </select>
                        </td>
                        <th scope="row">업종구분</th>
                        <td>
                            <select id="" name="" class="select form_w100" title="사업자구분" v-model="saupUpjong">
                                <option value="">선택</option>
                                <template v-for="datas in saupUpjongList">
                                    <option v-bind:value=datas.code>{{datas.codeNm}}</option>
                                </template>
                            </select>
                        </td>
                    </tr> -->
                    <tr>
                        <th scope="row">가맹점 상태</th>
                        <td colspan="3">
                            <!--<select id="" name="" class="select form_w50" title="가맹점" disabled="disabled" v-model="gajumStatus">
                                <option value="">선택</option>
                                <option value="0">정상</option>
                                <option value="1">해지</option>
                                <option value="2">해지신청</option>
                            </select>-->
                            <input type="text" class="input form_w50" title="가맹점" v-model="gajumStatus" disabled="disabled">
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">사업장 등록일</th>
                        <td><input type="text" class="input form_w100" title="등록일" disabled="disabled" v-model="regiDate"></td>
                        <th scope="row">사업장 해지일</th>
                        <td><input type="text" class="input form_w100 fc_pt01" value="2018.11.20" title="사업장 해지일" disabled="disabled" v-model="canDate"></td>
                    </tr>
                    <tr>
                        <th scope="row">BL 정보</th> <!-- 시스템 관리자만 변경가능 -->
                        <td colspan="3">
                            <select id="blGbID" name="" class="select form_bl" title="BL 정보" v-model="blGb">
                                <option value="">선택</option>
                                <option value="0">BL 적용</option>
                                <option value="1">BL 해지</option>
                            </select>
                            <input type="text" class="input form_bl" title="BL 정보" disabled="disabled" v-model="blGbNm">
                            <input type="text" class="input form_bldate" title="BL 정보" disabled="disabled" v-model="blDate">
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <!-- //tbl view box -->

            <div class="title_area">
                <h4>승인대역 정보</h4>
                <div class="btn_tbl_top type01">
                    <button type="button" id="" class="btn_m01 bg02 add" v-on:click="addAproval('show')">승인대역 추가</button>
                </div>
            </div>

            <!-- tbl view box -->
            <div class="tbl_view_box">
                <!-- tbl view01 -->
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
                            <input type="text" class="input form_w50" title="점코드" v-model="apro.jumCode" v-on:keyup="jumCodeCh(index)" maxlength="10" v-bind:disabled="apro.inputDisGbn">
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
            <!-- //tbl view box -->

            <!-- btn tbl bot -->
            <div class="btn_tbl_bot">
                <button type="button" id="" class="btn_m01 bg01 del" v-on:click="delAproval">승인대역 삭제</button>
            </div>

            <div class="title_area">
                <h4>관리자 정보</h4>
                <div class="btn_tbl_top type01">
                    <button type="button" id="" class="btn_m01 bg02 add" v-on:click="addAdmin('show')">ID 계정추가</button>
                </div>
            </div>

            <!-- account list -->
            <div class="account_list">
                <div class="acc_col">
                    <!-- tbl view box -->
                    <div class="tbl_view_box">
                        <!-- tbl view01 -->
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
                            <tr>
                                <th scope="row">접속IP 대역</th>
                                <td>
                                    <input type="text" class="input form_conip" title="접속IP 대역" v-model="adm.adminConIp1" v-bind:disabled="adm.inputDisGbn" maxlegnth="14">
                                    <span class="period_form">-</span>
                                    <input type="text" class="input form_conip" title="접속IP 대역" v-model="adm.adminConIp2" v-bind:disabled="adm.inputDisGbn" maxlength="14">
                                </td>
                                <th scope="row">최종접속일시</th>
                                <td>
                                    <input type="text" class="input form_w100" value="2018.11.20" title="사업장 해지일" disabled="disabled" v-model="adm.lastConnDate">
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">계정 상태</th>
                                <td colspan="3">
                                    <select id="" name="" class="select form_w50" title="계정상태" v-model="adm.revocationYn">
                                        <option value="">선택</option>
                                        <option value="N">정상</option>
                                        <option value="Y">해지</option>
                                        <!--<template v-for="datas in aproCodeList">
                                            <option v-bind:value=datas.code>{{datas.codeNm}}</option>
                                        </template>-->
                                    </select>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <!-- //tbl view box -->
                    <!-- btn tbl bot -->
                    <div class="btn_tbl_bot">
                        <button type="button" id="" class="btn_m01 bg02 del" v-on:click="delAdmin">ID 계정삭제</button>
                    </div>
                </div>
            </div>

            <!-- btn bot -->
            <div class="btn_bot">
                <button type="button" id="" class="btn_b01 bg02" v-on:click="cancelInfo">취소</button>
                <button type="button" id="" class="btn_b01 bg01" v-if="btnUpdShow" v-on:click="validationChk">정보 변경</button>
            </div>

            <AddressBox v-if="showModal" v-bind:postData="postText" v-on:selectedValue="setDataAddr" @close="showModal = false"></AddressBox>

        </div>
        <!-- //content -->
    </section>
    <!-- //container -->

</template>

<script lang="ts">
    import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
    import {CommonBoardService, CommonListService} from '../../../api/common.service';
    import AddressBox from '@/components/common/addressBox/addressBox.vue'
    import moment from 'moment'
    Vue.prototype.moment = moment;

    @Component({
        components: {
            AddressBox
        },
    })
    export default class FranchiseDetl extends Vue {
        message: any = '';

        btnUpdShow: boolean = false; //수정버튼 권한

        topinfoShow : boolean = false; //상단 현금영수증, 가맹점, 지점 정보 표시

        viewRowItem : {} = {};
        objectKey : any = "";

        soluId: any = ''; //현금영수증 사업자

        gajumId: any = ''; //가맹점 번호
        saupNo: any = ''; //사업자 번호
        soluNm: any = ''; //가맹점명

        saupId: any = ''; //사업자등록번호
        saupIdYn: any = '' //사업자등록번호 중복확인 여부
        storeNm: any = ''; //사업장명
        repNm: any = ''; //대표자명
        repPhonenum: any = ''; //전화번호
        saupType: any = ''; //사업자구분
        lawNum: any = ''; //법인등록번호
        addr1: any = ''; //주소
        addr2: any = ''; //상세주소
        zipCode: any = ''; //우편번호
        saupSubSaup: any = ''; //회사코드
        saupUpjong: any = ''; //업종구분

        gajumStatus: any = ''; //가맹점상태
        regiDate: any = ''; //등록일
        canDate: any = ''; //해지일
        blGb: any = ''; //bl구분
        blGbNm: any = ''; //정상
        blDate: any = ''; //bl등록일

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

        //selectbox list
        receiptSaupList: any = {}; //현금영수증 사업자 코드
        saupGbnList: any = {}; //사업자구분
        companyCodeList: any = {}; //회사코드
        aproCodeList: any = {}; //승인코드
        saupSubSaupList: any = {}; //사업장정보의 회사코드
        saupUpjongList: any = {}; //사업장정보의 업종코드

        aproIdx : number = 0;
        admIdx : number = 0;

        alrAproBandCnt : number = 0;
        alrAdminCnt : number = 0;

        //돔생성전 호출자
        created() {
            console.log('세션정보===============>>>>>')
            console.log(sessionStorage)
            console.log('세션정보===============<<<<<')
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
                        adminConIp1: "", //접속IP대역 시작
                        revocationYn: "", //해지여부
                        adminConIp2: "", //접속IP대역 끝
                        adminDupBtn: "adupbtn0", //중복확인버튼 index주기
                        inputDisGbn: false, //input box의 disabled 여부
                        lastConnDate: "" //최종접속일시
                    }
                ]

            //메뉴별 권한 확인
            let menuList = JSON.parse(sessionStorage.authMenu);
            console.log(menuList)
            let programId = 'franchiseList'; //메뉴ID
            for(let i=0; i<menuList.length; i++){
                for(let j=0; j<menuList[i].subMenuDtos.length; j++){

                    //권한(조회-readYn/ 등록-createYn/ 수정-updateYn/ 삭제-deleteYn)
                    if(menuList[i].subMenuDtos[j].progId == programId && menuList[i].subMenuDtos[j].updateYn == 'Y') {
                        this.btnUpdShow = true;
                    }
                }
            }
            console.log('수정 권한 확인 ?? :: ' + this.btnUpdShow)

            //시스템관리자(0001), 콜센터관리자(0003)만 표시
            if(sessionStorage.role == '0001' || sessionStorage.role == '0003'){
                this.topinfoShow = true;
            }

            this.getSelectbox(); //공통사용 selectbox 조회
            this.franchiseView(); //가맹점 정보 조회

        }

        //돔렌더링완료시 진행
        mounted() {

        }

        //취소
        cancelInfo() {
            this.$router.push('/home/franchiseList')
        }

        //상세정보 보이기
        franchiseView(){
            this.objectKey = this.$route.params.objectKey;

            //console.log(this.$route.params.objectKey);
            if(!this.objectKey){
                alert('접근할수 없습니다')
                this.$router.push({name:'franchiseList'});
            }else{
                this.gajumId = this.objectKey.gajumId; //가맹점 번호

                CommonBoardService.getListDatas('gajum',this.objectKey.gajumId,'').then((response) => {
                    let result: any =  response.data;
                    console.log(result)
                    if(result != null){
                        this.getSelectList('APRO'); //승인코드

                        //사업자 정보
                        this.soluId = result.soluId; //현금영수증 사업자
                        this.saupNo = result.saupId; //사업자 번호
                        this.soluNm = result.shopNm; //가맹점명
                        this.saupId = result.saupId; //사업자등록번호
                        this.storeNm = result.shopNm; //사업자명
                        this.repNm = result.chipNm; //대표자명
                        this.repPhonenum = result.telNum; //전화번호
                        this.saupType = result.saupType; //사업구분
                        this.lawNum = result.lawNum; //법인등록번호
                        this.zipCode = result.zipCode; //우편번호
                        this.addr1 = result.addr1; //주소
                        this.addr2 = result.addr2; //상세주소
                        //this.saupSubSaup = result.subSaup; //회사코드
                        //this.saupUpjong = result.upjong; //업종구분
                        this.gajumStatus = result.gajumStatus; //가맹점 상태
                        this.regiDate = this.dateFormat(result.regiDate); //사업장 등록일
                        this.canDate = this.dateFormat(result.canDate); //사업장 해지일
                        this.blGb = result.blGb; //BL구분(시스템 관리자만 변경가능)
                        this.blGbNm = result.blGbNm; //BL상태
                        this.blDate = result.blDate; //BL등록일

                        if(sessionStorage.role != '0001') { //시스템관리자만 변경 가능
                            let blGb = document.getElementById('blGbID');
                            if (blGb != null) { blGb.setAttribute('disabled', 'disabled'); }
                        }
                        //승인대역 정보
                        //console.log(result.aprvBands.length);

                        this.alrAproBandCnt = result.aprvBands.length; //기등록된 승인대역 카운트(승인대역 row 삭세시 체크)
                        this.alrAdminCnt = result.accounts.length; //기등록된 관리자정보 카운트(관리자정보 row 삭세시 체크)

                        for(let a=0; a<result.aprvBands.length; a++){

                            /* //승인코드 select-box 조회
                            CommonBoardService.getListDatas('code/aprvcode', null, '').then((response) => {
                                    let result: any = response.data;
                                    console.log('승인코드 select 조회')
                                    console.log(result)
                                    if (result.length > 0) {
                                        this.aproCodeList[a] = result;
                                    } else {
                                        //승인코드 조회 실패
                                    }
                                }
                                , (error) => {
                                }
                            ).catch();
                            */

                            if(result.aprvBands.length > 0 && a == 0){
                                this.approvalList[0].aproDupBtn = 'display:none'; //점코드 중확확인 버튼 안보임
                                this.approvalList[0].inputDisGbn = true; //input 수정 못함
                            }
                            if(a > 0){ //승인대역 정보 1개는 기본으로 보여짐으로 1개이상부터 추가
                                this.addAproval('hide'); //승인대역 정보 row 추가
                            }
                            this.approvalList[a].companyCodeNm = result.aprvBands[a].subSaup; //회사코드
                            this.approvalList[a].companyCode = result.aprvBands[a].subSaup; //회사코드
                            this.approvalList[a].jumCode = result.aprvBands[a].jumcode; //점코드
                            this.approvalList[a].aproCode = result.aprvBands[a].aprvCode; //승인코드
                            this.approvalList[a].aproBandFrom = result.aprvBands[a].aprvPermFrom; //접속대역 시작점
                            this.approvalList[a].aproBandTo = result.aprvBands[a].aprvPermTo; //접속대역 끝점
                            this.approvalList[a].jumCodeYn = 'Y'; //기존 등록건은 점코드 중복확인을 한것으로 함

                            if(result.aprvBands[a].aprvPermFrom != null && result.aprvBands[a].aprvPermFrom != '') { //대역폭이 있으면 라디오버튼 대역폭에 체크
                                this.approvalList[a].aproGbn = '1';
                            }else{ //없으면 라디오버튼 건수에 체크
                                this.approvalList[a].aproGbn = '2';
                            }


                            console.log('승인대역 정보 있음');
                            console.log(this.approvalList.length)
                        }

                        //관리자 정보
                        for(let a=0; a<result.accounts.length; a++){

                            if(result.accounts.length > 0 && a == 0){
                                this.adminList[0].admDupBtn = 'display:none'; //ID 중확확인 버튼 안보임
                                this.adminList[0].inputDisGbn = true; //input 수정 못함
                            }
                            if(a > 0){ //관리자 정보 1개는 기본으로 보여짐으로 1개이상부터 추가
                                this.addAdmin('hide'); //승인대역 정보 row 추가
                            }
                            this.adminList[a].adminNm = result.accounts[a].name; //이름
                            this.adminList[a].adminPhonenum = result.accounts[a].phoneNum; //휴대폰번호
                            this.adminList[a].adminId = result.accounts[a].id; //아이디
                            this.adminList[a].adminEmail = result.accounts[a].email; //이메일
                            this.adminList[a].adminConIp1 = result.accounts[a].accessIpFrom; //접속대역IP시작
                            this.adminList[a].adminConIp2 = result.accounts[a].accessIpTo; //접속대역IP종료
                            this.adminList[a].revocationYn = 'N'; //조회되는 관리자는 계정상태가 무조건 정상임
                            this.adminList[a].adminIdYn = 'Y'; //기존 등록건은 ID 중복확인을 한것으로 함
                            this.adminList[a].lastConnDate = result.accounts[a].lastConnDt;

                            if(sessionStorage.role == '0001' || sessionStorage.role == '0003'){ //시스템, 콜센터 수정가능
                                console.log('111111111111111111')
                            }else{
                                //this.adminList[a].revocationYn =
                                console.log('asdasdfsdfsdfsdfsd')
                            }

                            //console.log('관리자 정보 있음');
                            //console.log(this.adminList.length)
                        }

                    }else{

                    }
                    //this.onLoadListView = true;
                }).catch();
            }
            //this.onLoadListView = false
        }

        getSelectbox(){
            this.getSelectList('RECEIPT'); //현금영수증 사업자
            this.getSelectList('SEARCH'); //회사코드
            this.getSelectList('APRO'); //승인코드
            //this.getSelectList('SUBSAUP'); //회사코드(사업장정보)
            //this.getSelectList('UPJONG'); //업종구분(사업장정보)
        }

        //공통 select box 조회
        getSelectList(code: string){
            if(code == ''){
                return;
            }

            let reqData: any = {};
            let apiUrl : string = '';

            if(code == '0001'){ //사업자구분:0001
                apiUrl = 'pcodes/'+code+'/codes';
            }else if(code == 'SEARCH'){ //회사코드(SEARCH-사용가능한것만 조회) -- get
                reqData['searchType'] = 'SEARCH';
                apiUrl = 'company';
            }else if(code == 'APRO'){ //승인코드 -- get
                apiUrl = 'code/aprvcode';
            }else if(code == 'RECEIPT'){ //현금영수증 사업자 코드 -- get
                apiUrl = 'code/issuer';
            }else if(code == 'SUBSAUP'){ //회사코드(사업장정보)
                reqData['searchType'] = 'SEARCH';
                apiUrl = 'company';
            }else if(code == 'UPJONG'){ //업종코드
                apiUrl = 'code/upjong';
            }

            // api 데이터 호출
            CommonBoardService.getListDatas(apiUrl, null, reqData).then((response) => {
                    let result: any = response.data;
                    //console.log(result)
                    if (result.length > 0) {
                        if(code == '0001'){ //사업자구분
                            this.saupGbnList = result;
                        }else if(code == 'APRO'){ //승인코드
                            this.aproCodeList = result;
                        }else if(code == 'SEARCH'){ //회사코드f
                            this.companyCodeList = result;
                        }else if(code == 'RECEIPT'){ //현금영수증 사업자 코드
                            this.receiptSaupList = result;
                        }else if(code == 'SUBSAUP'){
                            this.saupSubSaupList = result;
                        }else if(code == 'UPJONG'){
                            this.saupUpjongList = result;
                        }
                    } else {
                        console.log('코드리스트 조회 오류')
                    }
                }
                , (error) => {
                    console.log(error)
                }
            ).catch();

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
            let aproCnt = this.approvalList.length; //현재 승인대역 row 카운트

            if(this.alrAproBandCnt == aproCnt){ //기등록된 승인대역은 삭제 못함
                alert('등록된 승인대역정보는 삭제할 수 없습니다.');
                return;
            }
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
            this.adminList.push({adminNm: "", adminPhonenum: "", adminId:"", adminIdYn:"", adminIdMsg:msg_name , adminEmail:"", adminConIp1:"", adminConIp2:"", revocationYn:"" , admDupBtn:btn_hide, inputDisGbn:input_dis});
            //this.admIdx = this.admIdx;
        }
        //관리자 삭제
        delAdmin() {
            //console.log(this.adminList.length)
            let admCnt = this.adminList.length;

            if(this.alrAdminCnt == admCnt){
                alert('등록된 관리자정보는 삭제할 수 없습니다.');
                return;
            }
            if(admCnt > 1){
                //this.approvalList.$remove(1)
                this.adminList.splice((admCnt-1),1);
                this.admIdx = this.admIdx - 1; //삭제하면 현재 admIdx - 1로 변경
            }
        }

        validationChk(){
//            this.updateInfo();
//            return;

            /*if(this.soluId == ''{
                alert('현금영수증 사업자를 선택하세요.');
                return;
            }else if(this.saupId == ''){
                alert('사업자등록번호를 입력하세요.');
                return;
            }else */
            if(this.storeNm == ''){
                alert('사업장명을 입력하세요.');
                return;
            }else if(this.repNm == ''){
                alert('대표자명을 입력하세요.');
                return;
            }else if(this.repPhonenum == ''){
                alert('전화번호를 입력하세요.');
                return;
            /*}else if(this.saupType == ''){
                alert('사업자구분을 선택하세요.');
                return;
            }else if(this.lawNum == ''){
                alert('법인등록번호를 입력하세요.');
                return;
                */
            }else if(this.zipCode == ''){
                alert('우편번호를 입력하세요.');
                return;
            }else if(this.addr1 == ''){
                alert('주소를 입력하세요.');
                return;
            }else if(this.addr2 == ''){
                alert('상세주소를 입력하세요.');
                return;
            // }else if(this.saupSubSaup == null || this.saupSubSaup == ''){
            //     alert('회사코드를 선택하세요.');
            //     return;
            // }else if(this.saupUpjong == null || this.saupUpjong == '') {
            //     alert('업종코드를 선택하세요.');
            //     return;
            }

            if(this.approvalList.length > 0){
                for(let i=0; i<this.approvalList.length; i++){
                    //console.log(this.approvalList[i].aproBandTo);

                    //기존 등록건은 체크 안하고(true) 회사코드를 리스트에서 선택하면 승인대역 정보가 필수가 됨
                    if(this.approvalList[i].inputDisGbn != true && (this.approvalList[i].companyCodeNm != undefined || this.approvalList[i].companyCodeNm != '')){

                        if(this.approvalList[i].jumCode == undefined || this.approvalList[i].jumCode == '') {
                            alert('점코드를 입력하세요.')
                            return;
                        }
                        if(this.approvalList[i].jumCodeYn == undefined || this.approvalList[i].jumCodeYn == '') {
                            alert('점코드 중복확인 하세요.')
                            return;
                        }
                        if(this.approvalList[i].aproCode == undefined || this.approvalList[i].aproCode == '') {
                            alert('승인코드를 선택하세요.')
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

            //관리자정보 체크
            if(this.adminList.length > 0){
                for(let i=0; i<this.adminList.length; i++){
                    if(this.adminList[i].adminNm != undefined && this.adminList[i].adminNm != ''){

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
                            alert('입력하신 메일 주소가 올바르지 않습니다.\n메일 주소를 확인하세요.');
                            return;
                        }
                    }
                }
            }

            //승인대역 사용가능 여부 확인
            this.alrBandChk();

        }

        alrBandChk() {

            //승인대역 정보 사용가능여부 확인일 위해 담기
            let aproBand : any = {};
            let arayBand : any = [];

            if(this.approvalList.length > 0){
                for(let j=0; j<this.approvalList.length; j++){
                    if(this.approvalList[j].companyCode != undefined && this.approvalList[j].companyCode != '' && this.approvalList[j].inputDisGbn != true) { //회사코드가 있고 기존 등록된 건이 아닌것만 담기
                        aproBand = {}; //초기화 안하면 값이 이상하게 들어감
                        aproBand['subSaup'] = this.approvalList[j].companyCode; //회사코드
                        aproBand['newApprovedbandFrom'] = this.approvalList[j].aproBandFrom; //승인대역 시작
                        aproBand['newApprovedbandTo'] = this.approvalList[j].aproBandTo; //승인대역 끝
                        aproBand['approvedCode'] = this.approvalList[j].aproCode; //승인코드
                        arayBand.push(aproBand); // 새로 추가한 승인내역만 담기
                    }
                }
            }

            if(arayBand.length > 0){ //새로 추가된 승인대역이 있으면 사용가능 여부 체크
                for(let i=0; i<arayBand.length; i++){
                    let reqData = {};
                    reqData['approvedCode'] = arayBand[i].approvedCode;
                    reqData['approvedbandFrom'] = arayBand[i].approvedbandFrom;
                    reqData['approvedbandTo'] = arayBand[i].approvedbandTo;
                    reqData['subSaup'] = arayBand[i].subSaup;

                    console.log('대역폭 사용가능 여부 체크')
                    CommonBoardService.postListDatas('validation/approvedband', null, aproBand).then((response) => {
                            let result: any = response.data;
                            console.log(result)
                            if (result.code === '000') { //대역폭 사용가능
                                console.log('대역폭 사용 가능')
                                this.updateInfo();
                            } else { //대역폭 사용 못함
                                alert(result.message);
                                return;
                            }
                        }
                        , (error) => {
                        }
                    ).catch();
                }
            }else{
                this.updateInfo();
            }
        }

        alrBandChk_pre(){

            if(this.approvalList.length > 0){

                let bandChk : boolean = true;
                let forCnt : number = 0;
                let bandAlr : number = 100;
                let bandNot : number = 0;
                for(let i=0; i<this.approvalList.length; i++){

                    //console.log('승인대역 확인 :: '+forCnt)
                    console.log('승인대역 확인')
                    console.log(this.approvalList[i].aproBandFrom+' ~ '+this.approvalList[i].aproBandTo)

                    //기존 등록건은 체크 안하고(true) 회사코드를 리스트에서 선택하면 승인대역 정보가 필수가 됨
                    if(this.approvalList[i].inputDisGbn != true && (this.approvalList[i].companyCodeNm != undefined || this.approvalList[i].companyCodeNm != '')){
                        //bandNot++;
                        //승인대역 대역폭 체크
                        if(this.approvalList[i].aproGbn == '1' && this.approvalList[i].aproBandFrom != '' &&  this.approvalList[i].aproBandTo != '') {

                            //대역폭 정보
                            let bandData: any = {};
                            bandData['subSaup'] = this.approvalList[i].companyCodeNm; //회사코드
                            bandData['approvedCode'] = this.approvalList[i].aproCode; //승인코드
                            bandData['approvedbandFrom'] = this.approvalList[i].aproBandFrom; //시작 대역
                            bandData['approvedbandTo'] = this.approvalList[i].aproBandTo; //끝 대역

                            forCnt++;
                            //승인대역 대역폭 사용가능 여부 확인
                            console.log('대역폭 사용가능 여부 체크')
                            CommonBoardService.postListDatas('validation/approvedband', null, bandData).then((response) => {
                                    let result: any = response.data;
                                    console.log(result)
                                    if (result.code === '000') { //대역폭 사용가능
                                        bandNot++;
                                        //bandAlr = 0;
                                        bandChk = false;
                                    } else { //대역폭 사용 못함
                                        alert(result.message)
                                        bandChk = true;
                                        bandAlr++;
                                        //break;
                                    }
                                    if (bandChk == true) {
                                        //break;
                                        return;
                                    } else {
                                        this.updateInfo();
                                    }
                                }
                                , (error) => {
                                }
                            ).catch();

                            /*if (bandChk == true) {
                                return;
                            } else {
                                this.updateInfo();
                            }*/
                        }else{
                            //bandChk = false;
                        }
                    }else{
                        forCnt++;
                    }

/*                    if(bandChk = true){
                        console.log(this.approvalList[i].aproBandFrom + ' ~ ' + this.approvalList[i].aproBandTo)
                        console.log('break!!')
                        break;
                    } */

                } //for
/*
                console.log('11 :: '+this.approvalList.length)
                console.log('22 :: '+forCnt)
                console.log('33 :: '+bandNot)
                console.log('44 :: '+bandAlr)

                if(this.approvalList.length == forCnt){
                    if(bandAlr == 0){
                        this.updateInfo();
                    }else{
                        //alert('중복된 승인 대역입니다.')
                        return;
                    }
                }
*/
                /*
                if(this.approvalList.length == forCnt && bandAlr == 0){
                    this.updateInfo();
                }else{
                    alert('중복된 승인 대역입니다.')
                    return;
                }*/

                /*if(bandChk = true){
                    console.log(this.approvalList[i].aproBandFrom + ' ~ ' + this.approvalList[i].aproBandTo)
                    console.log('break!!')
                    return;
                }*/

            }

        }

        //수정
        updateInfo() {

            let reqData: any = {};

            reqData['soluId'] = this.soluId; //현금영수증 사업자

            //사업장정보
            let saupData: any = {};
            saupData['saupId'] = this.saupId; //사업자등록번호
            saupData['shopNm'] = this.storeNm; //사업장명
            saupData['chipNm'] = this.repNm; //대표자명
            saupData['telNum'] = this.repPhonenum; //전화번호
            saupData['saupType'] = this.saupType; //사업자구분
            saupData['lawNum'] = this.lawNum; //법인등록번호
            saupData['zipCode'] = this.zipCode; //사업장 우편번호
            saupData['addr1'] = this.addr1; //사업장 주소
            saupData['addr2'] = this.addr2; //사업장 상세주소

            reqData['gajumId'] = this.gajumId; //가맹점 ID
            reqData['saupjangDto'] = saupData; //사업장 정보 셋팅

            //승인대역 정보
            let aproData : any = {};
            let addData2 : any = []; //승인대역정보 배열

            console.log('승인대역 정보 뿌리기')
            console.log(this.approvalList)
            console.log('관리자 정보 뿌리기')
            console.log(this.adminList)
            console.log('=======================================================')

            if(this.approvalList.length > 0){
                for(let j=0; j<this.approvalList.length; j++){
                    if(this.approvalList[j].companyCode != undefined && this.approvalList[j].companyCode != '' && this.approvalList[j].inputDisGbn != true) { //회사코드가 있고 기존 등록된 건이 아닌것만 담기
                        aproData = {}; //초기화 안하면 값이 이상하게 들어감
                        aproData['subSaup'] = this.approvalList[j].companyCode; //회사코드
                        aproData['aprvPermFrom'] = this.approvalList[j].aproBandFrom; //승인대역 시작
                        aproData['aprvPermTo'] = this.approvalList[j].aproBandTo; //승인대역 끝
                        aproData['aprvCode'] = this.approvalList[j].aproCode; //승인코드
                        aproData['aprvCount'] = this.approvalList[j].aproCnt; //건수
                        aproData['jumcode'] = this.approvalList[j].jumCode; //점코드
                        aproData['saupId'] = this.saupId; //사업자등록번호
                        addData2.push(aproData);
                    }
                }
            }
            console.log('승인대역 정보 확인');
            console.log(addData2);
            reqData['aprvBandAddDtos'] = addData2; //승인대역 정보 셋팅

            //let admData: any = {};
            let admData: any = {};
            let addData3 : any = []; //승인대역정보 배열
            if(this.adminList.length > 0){
                for(let k=0; k<this.adminList.length; k++){
                    if(this.adminList[k].adminNm != undefined && this.adminList[k].adminNm != '') { //이름이 입력된 경우만 담기
                        admData = {}; //초기화 안하면 값이 이상하게 들어감
                        admData['name'] = this.adminList[k].adminNm; //이름
                        admData['phoneNum'] = this.adminList[k].adminPhonenum; //휴대폰번호
                        admData['id'] = this.adminList[k].adminId; //ID
                        admData['email'] = this.adminList[k].adminEmail; //이메일
                        admData['accessIpFrom'] = this.adminList[k].adminConIp1; //접속IP 시작
                        admData['accessIpTo'] = this.adminList[k].adminConIp2; //접속IP 끝
                        admData['revocationYn'] = this.adminList[k].revocationYn; //계정상태
                        addData3.push(admData);
                    }
                }
            }
            console.log('승인대역 정보 확인');
            console.log(addData3);
            reqData['accounts'] = addData3; //관리자 정보 셋팅

            reqData['reqGbn'] = 'franchise'; //요청구분(필수값!!)
            reqData['nextPage'] = 'franchiseList'; //본인인증 후 완료 URL(필수값!!)

            console.log('최종 등록 정보 확인');
            console.log(reqData);

            //시스템 관리자는 인증 안함. 콜센터/가맹점/지점 관리자는 인증(세션값으로 체크)
            //시스템관리자-0001, 현금영수증관리자-0002, 콜센터-0003, 가맹점-0004, 지점-0005
            if(sessionStorage.role == '0001'){ //시스템 관리자는 인증 안함

                reqData['accountId'] = sessionStorage.accountId; //로그인 ID

                CommonBoardService.updateListData('gajum', this.gajumId, reqData).then((response) => {
                        console.log('수정 API 결과 11')
                        console.log(response)
                        //let result: any = response.data;
                        console.log('수정 API 결과 22')
                        //console.log(result)
                        //if (result.code === '000' || ) { //성공
                        if (response.status == 200) { //성공
                            alert('가맹점 정보가 수정되었습니다.');
                            this.$router.push({name:'franchiseList'});
                        } else { //실패
                            alert('가맹점 정보 수정이 실패하였습니다.\n다시 시도하세요.')
                        }
                    }
                    , (error) => {
                    }
                ).catch();

            }else{ // 그외는 본인인증 필수

                this.$router.push({ name:'phoneAuth' , params: { objectKey : reqData } }) // 라우터 주소를 넣어줘야 히스토리모드 인식

            }

        }

        //사업자 구분(개인,법인) 체크
        saupIdChk() {
            if(this.saupId == ''){
                this.saupIdYn = ''; //입력한 사업자등록번호가 없으면 사업자등록번호 중복체크값 초기화
                this.saupType = '';
            }
            let saupmsg = document.getElementById('saupid_msg');
            if(saupmsg != null){ saupmsg.innerHTML = ''; } //화면에 메시지 제거

            let saupNo : any = '';
            if(this.saupId.length == 10){
                saupNo = this.saupId.substring(2, 4);
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

        //점코드 변경시 점코드 중복확인 여부값 초기화
        jumCodeCh(idx: number){
            this.approvalList[idx].jumCodeYn = ''; //중복확인 여부값 초기화

            let jum_msg = document.getElementById('jumcode_msg'+idx);
            if(jum_msg != null){ jum_msg.innerHTML = ''; } //중복확인 메시지 초기화
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
                    console.log(result);
                    if (result != null && result.code == '000') {
                        this.saupIdYn = 'Y';
                        //사업자등록번호 유효성 체크에 이상이 없으면 기 등록된 사업장등록번호인지 한번 더 체크
//                        this.chkSaupNoAlr(no);
                    } else {
                        this.saupIdYn = '';
                        if(saupmsg != null){
                            saupmsg.innerHTML = result.message; //화면에 메시지 보이기
                        }
                    }
                }
                , (error) => {
                    //console.log('가맹점 등록 오류');
                    console.log(error);
                    this.saupIdYn = '';
                }
            ).catch((response) => {
                console.log(response);
                this.saupIdYn = '';
            });
        }

        //점코드 유효성 체크
        chkJumCode(idx: number) {
            console.log('===================')
            console.log(idx)

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
                    console.log(result);
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
                    console.log(error);
                    this.approvalList[idx].jumCodeYn = '';
                }
            ).catch((response) => {
                this.approvalList[idx].jumCodeYn = '';
                console.log(response);
            });
        }

        //관리자 ID 변경시 ID중복확인 여부값 초기화
        chkIdCh(idx: number){
console.log('중복확인할 index :: ' + idx)
            this.adminList[idx].adminIdYn = '';

            let admid_msg = document.getElementById('adminid_msg'+idx); //중복 확인한 ROW 메시지
            if(admid_msg!=null){ admid_msg.innerHTML = ''; } // 중복확인 메시지 초기화
        }

        //사용자ID 중복확인
        chkAdminId(idx: number) {
            let id = this.adminList[idx].adminId; //ID 가져오기
            let idmsg = document.getElementById('adminid_msg'+idx); //중복 확인한 ROW 메시지

            if(id != null && id == ''){
                alert('ID를 입력하세요.');
                if(idmsg != null){ idmsg.innerHTML = ''; }
                return;
            }
            let reqData: any = {};
            reqData['checkString'] = id; //ID

            // api 데이터 호출
            CommonBoardService.postListDatas('validation/id', null, reqData).then((response) => {
                    let result: any = response.data;
                    console.log(result)
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
                    console.log(error);
                    this.adminList[idx].adminIdYn = '';
                }
            ).catch((response) => {
                console.log(response);
                this.adminList[idx].adminIdYn = '';
            });
        }

        //사업장 주소 팝업 보임
        addressBox(text) {
            this.showModal = true;
            //this.postText = "서울시금천구";
        }

        //사업장 주소 셋팅
        setDataAddr(data) {
            //console.log(data)
            this.addr1 = data.addr;
            this.zipCode = data.zip;
        }

        //회사코드 select 변경시 코드값 표시
        companyCodeCh(idx: number){
            //console.log(idx);
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

    }

</script>