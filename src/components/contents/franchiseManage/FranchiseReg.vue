<template>

    <!-- container -->
    <section id="container">
        <!-- content  -->
        <div class="content">
            <h2 class="blind">가맹점 관리</h2>

            <h3>가맹점 등록</h3>

            <h4 class="blind">기본 정보</h4>
            <!-- search reg box -->
            <div class="search_reg_box">
                <ul class="search_list col03">
                    <li>
                        <label for="">현금영수증 사업자</label>
                        <select id="soluIdCon" name="" class="select form_w100" title="현금영수증 사업자" v-model="soluId">
                            <option value="">선택</option>
                            <template v-for="datas in receiptSaupList">
                                <option v-bind:value=datas.code>{{datas.codeNm}}</option>
                            </template>
                        </select>
                    </li>
                </ul>
            </div>
            <!-- //search reg box -->

            <h4>사업장 기본 정보 <span class="sub_cf">(사업자 등록증 상의 정보)</span></h4>
            <p class="req_info type01">(<em class="form_req">*</em>)는 필수항목입니다.</p>
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
                        <th scope="row">사업자등록번호<em class="form_req">*</em></th>
                        <td>
                            <input type="text" class="input form_industry" title="사업자등록번호" v-model="saupId"  @input="validationCheck(saupId,'number')=='N' ? saupId='' : ''"  v-on:keyup="saupIdChk" maxlength="10">
                            <input type="hidden" v-model="saupIdYn">
                            <button type="button" id="" class="btn_s01 bg04" v-on:click="chkSaupNo(saupId)">중복확인</button>
                            <p class="info_msg" id="saupid_msg"></p> <!-- 메시지 표시 -->
                        </td>
                        <th scope="row">사업장명<em class="form_req">*</em></th>
                        <td><input type="text" class="input form_w100" title="사업장명" v-model="storeNm" maxlength="20"></td>
                    </tr>
                    <tr>
                        <th scope="row">대표자명<em class="form_req">*</em></th>
                        <td><input type="text" class="input form_w100" title="대표자명" v-model="repNm" maxlength="20"></td>
                        <th scope="row">전화번호<em class="form_req">*</em></th>
                        <td>
                            <input type="text" class="input form_w100"   title="전화번호" v-model="repPhonenum" @input="validationCheck(repPhonenum,'number')=='N' ? repPhonenum='' : ''">
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">사업자구분<em class="form_req">*</em></th>
                        <td>
                            <select id="" name="" class="select form_w100" title="사업자구분" v-model="saupType">
                                <option value="">선택</option>
                                <option value="2">개인사업자</option>
                                <option value="1">법인사업자</option>
                                <!--<option value="">선택</option>listSend
                                <template v-for="datas in saupGbnList">
                                    <option v-bind:value=datas.code>{{datas.name}}</option>
                                </template>-->
                            </select>
                        </td>
                        <template v-if="saupType=='1'">
                        <th scope="row">법인등록번호<em class="form_req">*</em></th>
                        <td><input type="text" class="input form_w100" title="법인등록번호" v-model="lawNum" maxlength="13" @input="validationCheck(lawNum,'number')=='N' ? lawNum='' : ''" v-on:keydown="showKeyCode($event)"></td>
                        </template>
                        <template v-else>
                            <th scope="row"></th>
                            <td></td>
                        </template>
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
                                    <input type="text" class="input form_address01" title="주소" v-model="addr1" maxlength="30">
                                </li>
                                <li class="con03">
                                    <input type="text" class="input form_address02" title="상세 주소" v-model="addr2" maxlength="30">
                                </li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">회사코드<em class="form_req">*</em></th>
                        <td>
                            <input type="text" class="input form_post" title="사업자등록번호" v-model="saupSubSaupCnt" disabled="disabled"> 개
                            <button type="button" id="" class="btn_s01 bg04" v-on:click="subSaupPop">회사코드 등록</button>
                            <!--<select id="" name="" class="select form_w100" title="사업자구분" v-model="saupSubSaup">
                                <option value="">선택</option>
                                <template v-for="datas in saupSubSaupList">
                                    <option v-bind:value=datas.code>{{datas.name}}</option>
                                </template>
                            </select>-->
                        </td>
                        <th scope="row">업종구분<em class="form_req">*</em></th>
                        <td>
                            <select id="" name="" class="select form_w100" title="사업자구분" v-model="saupUpjong">
                                <option value="">선택</option>
                                <template v-for="datas in saupUpjongList">
                                    <option v-bind:value=datas.code>{{datas.codeNm}}</option>
                                </template>
                            </select>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <!-- //tbl view box -->

<!-- 승인대역, 관리자 정보 주석 처리
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
                                <select class="select form_comcode" title="회사코드" v-model="apro.companyCodeNm" v-on:change="companyCodeCh(index)">
                                    <option value="">선택</option>
                                    <template v-for="datas in companyCodeList">
                                        <option v-bind:value=datas.code>{{datas.name}}</option>
                                    </template>
                                </select>
                                <input type="text" id="companyCode" class="input form_comcode" title="회사코드" v-model="apro.companyCode" disabled="disabled">
                            </td>
                            <th scope="row">점코드</th>
                            <td>
                                <input type="text" class="input form_branchcode" title="점코드" v-model="apro.jumCode" v-on:keyup="jumCodeCh(index)" maxlength="10" v-on:keydown="showKeyCode($event)">
                                <input type="hidden" v-model="apro.jumCodeYn">
                                <button type="button" id="" class="btn_s01 bg04" v-on:click="chkJumCode(index)">중복확인</button>
                                <p class="info_msg" v-bind:id="apro.jumCodeMsg"></p>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">승인코드</th>
                            <td>
                                <select id="" name="" class="select form_w100" title="승인번호" v-model="apro.aproCode">
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
                                    <span class="rdo_box"><input type="radio" value="1" v-bind:id="apro.aproRadio" v-model="apro.aproGbn" checked="checked" v-on:change="aproBandChk(index, 'B')"><label for="aa11">대역폭</label></span>
                                    <input type="text" class="input form_app01" placeholder="시작점(0000000)" title="승인대역 시작점" v-model="apro.aproBandFrom">
                                    <span class="period_form">-</span>
                                    <input type="text" class="input form_app01" placeholder="끝점(1000000)" title="승인대역 끝점" v-model="apro.aproBandTo">
                                </div>
                                <div class="form_col approval">
                                    <span class="rdo_box"><input type="radio" value="2" v-bind:id="apro.aproRadio" v-model="apro.aproGbn" v-on:change="aproBandChk(index, 'C')"><label for="aa12">건수</label></span>
                                    <input type="text" class="input form_app02" placeholder="건수(1000건 단위)" value="" title="승인대역 시작점" v-model="apro.aproCnt">
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
                <h4>관리자 정보</h4>
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
                                <td><input type="text" class="input form_w100" title="이름" v-model="adm.adminNm"></td>
                                <th scope="row">휴대폰번호</th>
                                <td>
                                    <input type="text" class="input form_w100" title="휴대폰번호" v-model="adm.adminPhonenum">
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">ID</th>
                                <td>
                                    <input type="text" class="input form_id" title="ID" v-model="adm.adminId" v-on:keyup="chkIdCh(index)">
                                    <input type="hidden" v-model="adm.adminIdYn" title="idcheckYn">
                                    <button type="button" id="" class="btn_s01 bg04" v-on:click="chkAdminId(index)">중복확인</button>
                                    <p class="info_msg" v-bind:id="adm.adminIdMsg" ></p>
                                </td>
                                <th scope="row">이메일주소</th>
                                <td>
                                    <input type="text" class="input form_w100" title="이메일주소" v-model="adm.adminEmail">
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">접속IP 대역</th>
                                <td colspan="">
                                    <input type="text" class="input form_conip" title="접속IP 대역" v-model="adm.adminConIp1" maxlength="14">
                                    <span class="period_form">-</span>
                                    <input type="text" class="input form_conip" title="접속IP 대역" v-model="adm.adminConIp2" maxlength="14">
                                </td>
                                <th scope="row">회사코드</th>
                                <td colspan="">
                                    <select class="select form_comcode" title="회사코드" v-model="adm.adminSubsaup" v-on:change="adminCompanyCodeCh(index)">
                                        <option value="">선택</option>
                                        <template v-for="datas in companyCodeList">
                                            <option v-bind:value=datas.code>{{datas.name}}</option>
                                        </template>
                                    </select>
                                    <input type="text" id="adminSubsaupNm" class="input form_comcode" title="회사코드" v-model="adm.adminSubsaupNm" disabled="disabled">
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="btn_tbl_bot">
                        <button type="button" class="btn_m01 bg02 del" v-on:click="delAdmin">ID 계정삭제</button>
                    </div>
                </div>

            </div>
-->

            <!-- btn bot -->
            <div class="btn_bot">
                <button type="button" class="btn_b01 bg01" v-if="regbtnShow" v-on:click="validationChk">가맹점 등록</button>
            </div>

            <AddressBox v-if="showModal" v-bind:postData="postText" v-on:selectedValue="setDataAddr" @close="showModal = false"></AddressBox>

            <CompanyCodePop v-if="companyCodeYn" v-bind:companyCodeVal="loadCodeList" @closeCompany="companyCodeYn=false"  v-on:listSend="getCodeList"></CompanyCodePop>

        </div>
        <!-- //content -->

    </section>
    <!-- //container -->

</template>

<script lang="ts">
    import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
    import {CommonBoardService, CommonListService} from '../../../api/common.service';
    import AddressBox from '@/components/common/addressBox/addressBox.vue'
    import {environment} from '../../../utill/environment';
    import CompanyCodePop from '@/components/contents/franchiseManage/CompanyCodePop.vue'

    @Component({
        components: {
            AddressBox, CompanyCodePop
        }
    })
    export default class FranchiseReg extends Vue {
        message: any = '';

        companyCodeYn:boolean =false; //회사코드 팝업 구분
        loadCodeList : any = [];
        companyCodeArr : any = ['001','003','006']

        soluId: any = ''; //현금영수증 사업자

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
        saupSubSaupCnt: any = ''; //회사코드 카운트
        saupUpjong: any = ''; //업종코드

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

        regbtnShow : boolean = false; //신규등록 버튼 보여주는지 여부

        //돔생성전 호출자
        created() {

            console.log('세선정보 확인===========>>>>>')
            console.log(sessionStorage)
            console.log('세선정보 확인===========<<<<<')

            //시스템관리자(0001), 현금영수증사업자(0002), 콜센터관리자(0003)만 등록버튼 보임
            if(sessionStorage.role == '0001' || sessionStorage.role == '0002' || sessionStorage.role == '0003'){
                this.regbtnShow = true;
            }else{
                this.regbtnShow = false;
            }

            //data: {
                //승인대역 정보
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
                        aproCnt: "" //승인대역 건수
                        ,aproRadio: "band_radio0"
                    }
                ],
                //관리자 정보
                this.adminList = [
                    {
                        adminNm: '', //이름
                        adminPhonenum: '', //휴대폰번호
                        adminId: '', //ID
                        adminIdYn: '', //ID 체크 여부
                        adminIdMsg: 'adminid_msg0', //추가되는 row의 메시지 표시부분 id를 다르게 하기위해
                        adminEmail: '', //이메일주소
                        adminConIp1: '', //접속IP대역 시작
                        adminConIp2: '', //접속IP대역 끝
                        adminSubsaup: '' //회사코드
                    }
                ]

                this.aproIdx = this.aproIdx;
            //}

            //주석 제거해야 해
            this.getSelectList('RECEIPT'); //현금영수증 사업자
            this.getSelectList('SEARCH'); //회사코드(승인대역)
            this.getSelectList('APRO'); //승인코드
            this.getSelectList('SUBSAUP'); //회사코드(사업장정보)
            this.getSelectList('UPJONG'); //업종구분(사업장정보)
        }

        //돔렌더링완료시 진행
        mounted() {

            //현금영수증사업자 경우 자동 셋팅
            if(sessionStorage.role == '0002'){
                this.soluId = sessionStorage.soluId;
                let soluIdCon = document.getElementById('soluIdCon');
                if (soluIdCon != null) { soluIdCon.setAttribute('disabled', 'disabled'); }
            }

        }

        //회사코드 등록 팝업
        subSaupPop(){
            this.companyCodeYn = true;

        }
        getCodeList(data){ // 회사코드 선택 데이터 받는다
            console.log('받은 회사코드')
            console.log(data)
            console.log('받은 회사코드 수 :: ' +data.length);

            if(data!=null){
                this.saupSubSaupCnt = data.length;
            }

            this.loadCodeList = data;
        }

        //승인대역 유효성 체크
        alrBandChk() {

/* 승인대역 체크 주석처리함 end
            //승인대역 정보 체크
            if(this.approvalList.length > 0){
                for(let i=0; i<this.approvalList.length; i++){
                    if(this.approvalList[i].companyCodeNm != undefined && this.approvalList[i].companyCodeNm != ''){ //회사코드를 선택하면 승인대역 정보는 필수 입력항목이 됨

                        console.log('승인내역 사용가능 여부 확인!!!!!!!!!!!!!!!!!! ');
                        console.log('승인내역 건수 :: '+this.approvalList.length);

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
                            console.log('대역폭 사용가능 여부 체크')
                            CommonBoardService.postListDatas('validation/approvedband', null, bandData).then((response) => {
                                    let result: any = response.data;
                                    console.log(result)
                                    if (result.code === '000') { //대역폭 사용가능
                                        bandChk = false;
                                    } else { //대역폭 사용 못함
                                        alert(result.message)
                                        bandChk = true;
                                    }
                                    if(bandChk == true){
                                        return;
                                    }else{
                                        this.insertInfo(); //등록
                                    }
                                }
                                , (error) => {
                                }
                            ).catch();
                        }else if(this.approvalList[i].aproGbn == '2'){ //승인대역 건수 선택은 그냥 지나감
                            bandChk = false;
                        }

                        if(bandChk == true){ //승인대역 사용 불가
                            return;
                        }else{
                            this.insertInfo(); //등록
                        }
                    }else{
                        this.insertInfo(); //등록
                    }
                }
            }
승인대역 체크 주석처리함 end */

            this.insertInfo(); //등록
        }

        //등록
        insertInfo() {

            let reqData: any = {};

            reqData['soluId'] = this.soluId; //현금영수증 사업자

            //사업장정보
            let saupData: any = {};
            saupData['saupId'] = this.saupId; //사업자등록번호
            saupData['shopNm'] = this.storeNm; //사업장명
            saupData['chipNm'] = this.repNm; //대표자명
            saupData['telNum'] = this.repPhonenum; //전화번호
            //saupData['birthday'] = this.reBirthday; //생년월일
            //saupData['gender'] = this.reGender; //성별
            saupData['saupType'] = this.saupType; //사업자구분
            saupData['lawNum'] = this.lawNum; //법인등록번호
            saupData['zipCode'] = this.zipCode; //사업장 우편번호
            saupData['addr1'] = this.addr1; //사업장 주소
            saupData['addr2'] = this.addr2; //사업장 상세주소
            saupData['subSaup'] = this.loadCodeList; //this.saupSubSaup; //회사코드(배열값)
            saupData['upjong'] = this.saupUpjong; //업종구분

            reqData['saupjangDto'] = saupData; //사업장 정보 셋팅

            //승인대역 정보
            //let aproData: any = [];
            let aproData : any = {};
            let addData2 : any = []; //승인대역정보 배열

            console.log('승인대역 정보 뿌리기')
            console.log(this.approvalList)
            console.log('관리자 정보 뿌리기')
            console.log(this.adminList)
            console.log('=======================================================')

/* 승인대역 주석 처리함
            if(this.approvalList.length > 0){
                for(let j=0; j<this.approvalList.length; j++){
                    if(this.approvalList[j].companyCode != undefined && this.approvalList[j].companyCode != '') { //회사코드가 있는 경우만 담기
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
            console.log('승인대역 정보 확인');
            console.log(addData2);
승인대역 주석 처리함 end */
            reqData['approvalBandAddDtos'] = addData2; //승인대역 정보 셋팅

            //let admData: any = {};
            let admData: any = {};
            let addData3 : any = []; //승인대역정보 배열

/* 관리자 정보 주석처리함 sta
            if(this.adminList.length > 0){
                for(let k=0; k<this.adminList.length; k++){
                    if(this.adminList[k].adminNm != undefined && this.adminList[k].adminNm != '') { //이름이 입력된 경우만 담기
                        admData = {}; //초기화 안하면 값이 이상하게 들어감
                        admData['name'] = this.adminList[k].adminNm; //이름
                        admData['phoneNum'] = this.adminList[k].adminPhonenum; //휴대폰번호
                        admData['id'] = this.adminList[k].adminId; //ID
                        admData['email'] = this.adminList[k].adminEmail; //이메일
                        admData['accessIpFrom'] = this.adminList[k].adminConIp1; //접속IP 시작
                        admData['accessIpTo'] = this.adminList[k].adminConIp2 //접속IP 끝
                        admData['subSaup'] = this.adminList[k].adminSubsaup //회사코드
                        addData3.push(admData);
                        //addData3.push(admData);
                    }
                }
            }
관리자정보 주석 처리함 end */

            console.log('승인대역 정보 확인');
            console.log(addData3);
            reqData['accounts'] = addData3; //관리자 정보 셋팅

            console.log('최종 등록 정보 확인');
            console.log(reqData);

            // api 데이터 호출(가맹점 등록)
            CommonBoardService.postListDatas('gajum', null, reqData).then((response) => {
                    let result: any = response.data;
                    console.log(result);
                    if (result != null) {
                        //사업자등록번호 유효성 체크에 이상이 없으면 기 등록된 사업장등록번호인지 한번 더 체크
//                        this.chkSaupNoAlr(no);
                        this.$router.push({ name:'franchiseRegCmpl' , params: { objectKey : reqData } }) // 라우터 주소를 넣어줘야 히스토리모드 인식

                    } else {
                        //if(saupmsg != null){
                            //saupmsg.innerHTML = result.message; //화면에 메시지 보이기
                        //}
                        return;
                    }
                }
                , (error) => {
                    console.log(error);
                }
            ).catch((response) => {
                console.log(response);
            });


        }

        //승인대역 추가
        addAproval() {
            this.aproIdx = this.aproIdx + 1;
            let msg_name = 'jumcode_msg'+ this.aproIdx; //점코드 중확확인 메시지 표시위해 ID 만듬
            let radio_name = 'band_radio'+this.aproIdx; //승인대역 라이오 버튼 ID또는 NAME 다르게
            this.approvalList.push({companyCodeNm: "", companyCode: "", jumCode:"", jumCodeYn:"", jumCodeMsg:msg_name, aproCode:"", aproStat:"", aproGbn:"", aproBandFrom:"", aproBandTo:"", aproCnt:"", aproRadio:radio_name});
            this.aproIdx = this.aproIdx;
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
        addAdmin() {
            this.admIdx = this.admIdx + 1;
            let msg_name = 'adminid_msg' + this.admIdx;
            this.adminList.push({adminNm: "", adminPhonenum: "", adminId:"", adminIdYn:"", adminIdMsg:msg_name , adminEmail:"", adminConIp1:"", adminConIp2:"", adminSubsaup:''});
            this.admIdx = this.admIdx;
        }
        //관리자 삭제
        delAdmin() {
            console.log(this.adminList.length)
            let admCnt = this.adminList.length;
            if(admCnt > 1){
                //this.approvalList.$remove(1)
                this.adminList.splice((admCnt-1),1);
                this.admIdx = this.admIdx - 1; //삭제하면 현재 admIdx - 1로 변경
            }
        }

        validationChk(){
//            this.insertInfo();
//return;

            let regNumber = /^[0-9]*$/;

            if(this.soluId == ''){
                alert('현금영수증 사업자를 선택하세요.');
                return;
            }else if(this.saupId == ''){
                alert('사업자등록번호를 입력하세요.');
                return;
            }else if(this.storeNm == ''){
                alert('사업장명을 입력하세요.');
                return;
            }else if(this.repNm == ''){
                alert('대표자명을 입력하세요.');
                return;
            }else if(this.repPhonenum == ''){
                alert('전화번호를 입력하세요.');
                return;
            }else if(!regNumber.test(this.repPhonenum)){
                alert('전화번호는 숫자로 입력하세요.');
                return;
            }else if(this.saupType == ''){
                alert('사업자구분을 선택하세요.');
                return;
            }else if(this.saupType == '1' && this.lawNum == ''){ //사업자구분이 법인인 경우 필수
                alert('법인등록번호를 입력하세요.');
                return;
            }else if(this.saupType == '1' && this.lawNum.length != 13) { //사업자구분이 법인인
                alert('법인사업자의 자리수가 맞지않습니다');
                return;
            }
            else if(this.saupType == '1' && this.lawNum != '' && !regNumber.test(this.lawNum)){
                alert('법인등록번호는 숫자로 입력하세요.');
                return;
            }else if(this.zipCode == ''){
                alert('우편번호를 입력하세요.');
                return;
            }else if(this.addr1 == ''){
                alert('주소를 입력하세요.');
                return;
            }else if(this.addr2 == '') {
                alert('상세주소를 입력하세요.');
                return;
            }else if(this.saupSubSaupCnt == ''){
                alert('회사코드 등록버튼을 클릭하여 회사코드를 선택하세요.');
                return;
            }else if(this.saupUpjong == '') {
                alert('업종구분를 선택하세요.');
                return;
            }

/* 승인대역 주석 처리함 sta
            //승인대역 정보 체크
            if(this.approvalList.length > 0){
                for(let i=0; i<this.approvalList.length; i++){
                    if(this.approvalList[i].companyCodeNm != undefined && this.approvalList[i].companyCodeNm != ''){ //회사코드를 선택하면 승인대역 정보는 필수 입력항목이 됨
                        console.log('승인내역 건수 :: '+this.approvalList.length);
                        if(this.approvalList[i].jumCode == undefined || this.approvalList[i].jumCode == '') {
                            alert('점코드를 입력하세요.')
                            return;
                        }
                        if(this.approvalList[i].jumCode != '' && !regNumber.test(this.approvalList[i].jumCode)) {
                            alert('점코드는 숫자로 입력하세요.')
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
승인대역 주석처리함 end */

/* 관리자정보 주석처리함 end
            //관리자 정보 체크
            if(this.adminList.length > 0){
                for(let i=0; i<this.adminList.length; i++){
                    if(this.adminList[i].adminNm != undefined && this.adminList[i].adminNm != ''){ //이름을 입력하면 관리자정보는 필수 입력항목이 됨
                        console.log('관리자 정보 건수 :: '+this.adminList.length);
                        if(this.adminList[i].adminPhonenum == undefined || this.adminList[i].adminPhonenum == '') {
                            alert('휴대폰번호를 입력하세요.');
                            return;
                        }
                        if(this.adminList[i].adminPhonenum != '' && !regNumber.test(this.adminList[i].adminPhonenum)) {
                            alert('휴대폰번호는 숫자로 입력하세요.');
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
                        if(this.adminList[i].adminSubsaup == undefined || this.adminList[i].adminSubsaup == ''){
                            alert('회사코드를 입력하세요.');
                            return;
                        }
                    }
                }
            }
관리자정보 주석처리함 end */

            //다음 단계 functon 들어오는 곳!!
            //this.insertInfo();
            this.alrBandChk();
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
                if(saupmsg!=null){ saupmsg.innerHTML = '사업자등록번호를 입력하세요.'; }
                return;
            }else if(no.length != 10){
                if(saupmsg!=null){ saupmsg.innerHTML = '사업자등록번호 길이가 부적합 합니다.'; }
                return;
            }

            let reqData: any = {};
            reqData['checkString'] = no; //사업자등록번호

            // api 데이터 호출(사업자등록번호 유효성 체크)
            CommonBoardService.postListDatas('validation/saupid', null, reqData).then((response) => {
                console.log(response)
                console.log(response.status)
                    let result: any = response.data;
                    console.log(result);
                    if (result != null && result.code == '000') {
                        this.saupIdYn = 'Y';
                        if(saupmsg != null){
                            saupmsg.innerHTML = "사용가능한 사업자등록번호입니다."; //화면에 메시지 보이기
                        }
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
            let regNumber = /^[0-9]*$/;
            if(no == ''){
                //alert('점코드를 입력하세요.');
                if(saupmsg!=null){ saupmsg.innerHTML = "점코드를 입력하세요."; }
                return;
            }
            if(!regNumber.test(no)){
                alert('점코드는 숫자만 입력가능합니다.');
                //if(saupmsg!=null){ saupmsg.innerHTML = "점코드는 숫자만 입력가능합니다."; }
                return;
            }
            if(no.length != 10) {
                alert('점코드는 10자리로 입력하세요.');
                //if(saupmsg!=null){ saupmsg.innerHTML = "점코드는 10자리로 입력하세요."; }
                return;
            }

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
            let idmsg = document.getElementById('adminid_msg'+idx); //중복 확인한 ROW 메시지
            if(idmsg!=null){ idmsg.innerText = ''; }
        }

        //사용자ID 중복확인
        chkAdminId(idx: number) {
            let id = this.adminList[idx].adminId; //ID 가져오기
            let idmsg = document.getElementById('adminid_msg'+idx); //중복 확인한 ROW 메시지

            if(id != null && id == ''){
                //alert('ID를 입력하세요.');
                if(idmsg!=null){ idmsg.innerHTML = 'ID를 입력하세요.'; }
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
                        }else if(code == 'SEARCH'){ //회사코드
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

        //사용자 회사코드 select 변경시 코드값 표시
        adminCompanyCodeCh(idx: number){
            //console.log(idx);
            this.adminList[idx].adminSubsaupNm = this.adminList[idx].adminSubsaup;
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

        maxlengthChk(e, len){
            let val =  e.target.value;
            if (val.length > len){
                e.target.preventDefault();
            }
        }

        showKeyCode(event) {
            event = event || window.event;
            var keyID = (event.which) ? event.which : event.keyCode;
            if ((keyID >= 48 && keyID <= 57) || (keyID >= 96 && keyID <= 105)) {
                //console.log('숫자')
            }
            else {
                event.target.value='';
            }
            /* 48~57:일반 숫자키 코드, 96~105:숫자키패드 숫자키 코드 */
        }

        validationCheck(val,type){
            let regNumber = /^[0-9]*$/;
            let check = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
            if(type=='number'){
                if(check.test(val)){
                    Vue.swal({ text: '숫자만가능합니다'});
                    return "N";
                }
                else if(!regNumber.test(val)){
                    Vue.swal({ text: '숫자만가능합니다'});
                    return "N";
                }
                else{
                    return "Y"
                }
            }
            else{
            }
        }
    }

</script>