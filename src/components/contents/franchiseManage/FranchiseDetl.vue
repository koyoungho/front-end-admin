<template>

    <!-- container -->
    <section id="container">
        <!-- content  -->
        <div class="content">
            <h2 class="blind">가맹점 관리</h2>

            <h3>가맹점 조회</h3>

            <h4 class="blind">기본 정보</h4>

            <!-- search reg box -->
            <div class="search_reg_box">
                <ul class="search_list col03">
                    <li>
                        <label for="">현금영수증 사업자</label>
                        <select id="" name="" class="select form_w100" title="현금영수증 사업자" v-model="soluId">
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
                        <input type="text" class="input form_w100" value="0000000000" title="가맹점번호" disabled="disabled">
                    </li>
                    <li>
                        <label for="">사업자 번호</label>
                        <input type="text" class="input form_w100" value="0000000000" title="사업자번호" disabled="disabled">
                    </li>
                    <li>
                        <label for="">가맹점명</label>
                        <input type="text" class="input form_w100" value="신일약국" title="가맹점명" disabled="disabled">
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
                        <th scope="row">BL 정보</th>
                        <td colspan="3">
                            <select id="blGbID" name="" class="select form_bl" title="BL 정보" v-model="blGb">
                                <option value=""></option>
                                <option value="0">BL적용</option>
                                <option value="1">BL해지</option>
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
                    <tbody v-for="(apro, index) in approvalList">
                    <tr>
                        <th scope="row">회사코드</th>
                        <td>
                            <select id="" name="" class="select form_comcode" title="회사코드" v-model="apro.companyCodeNm" v-on:change="companyCodeCh(index)">
                                <option value="">선택</option>
                                <option value="1">롯데슈퍼</option>
                                <option value="2">롯데리아</option>
                                <option value="3">롯데제과</option>
                                <!--<option value="">선택</option>
                                <template v-for="datas in companyCodeList">
                                    <option v-bind:value=datas.code>{{datas.name}}</option>
                                </template>-->
                            </select>
                            <input type="text" class="input form_comcode" title="회사코드" v-model="apro.companyCode">
                        </td>
                        <th scope="row">점코드</th>
                        <td>
                            <input type="text" class="input form_branchcode" title="점코드" v-model="apro.jumCode" v-on:keyup="jumCodeCh($event)" maxlength="10">
                            <input type="hidden" v-model="apro.jumCodeYn">
                            <button type="button" class="btn_s01 bg04" v-on:click="chkJumCode(index)" v-bind:style="apro.aproDupBtn">중복확인</button>
                            <p class="info_msg" v-bind:id="apro.jumCodeMsg"></p>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">승인코드</th>
                        <td>
                            <select id="" name="" class="select form_w100" title="승인번호" v-model="apro.aproCode">
                                <option></option>
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
            <!-- //tbl view box -->

            <!-- btn tbl bot -->
            <div class="btn_tbl_bot">
                <button type="button" id="" class="btn_m01 bg01 del" v-on:click="delAproval">승인대역 삭제</button>
            </div>

            <div class="title_area">
                <h4>관리자 정보</h4>
                <div class="btn_tbl_top type01">
                    <button type="button" id="" class="btn_m01 bg02 add" v-on:click="addAdmin">ID 계정추가</button>
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
                            <tbody v-for="(adm, index) in adminList">
                            <tr>
                                <th scope="row">이름<em class="form_req">*</em></th>
                                <td><input type="text" class="input form_w100" title="이름" v-model="adm.adminNm"></td>
                                <th scope="row">휴대폰번호<em class="form_req">*</em></th>
                                <td>
                                    <input type="text" class="input form_w100" title="휴대폰번호" v-model="adm.adminPhonenum">
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">ID<em class="form_req">*</em></th>
                                <td>
                                    <input type="text" class="input form_id" title="ID" v-model="adm.adminId" v-on:keyup="chkIdCh(index)">
                                    <input type="hidden" v-model="adm.adminIdYn" title="idcheckYn">
                                    <button type="button" id="" class="btn_s01 bg04" v-on:click="chkAdminId(index)">중복확인</button>
                                    <p class="info_msg" id=id v-bind:id="adm.adminIdMsg" ></p>
                                </td>
                                <th scope="row">이메일주소<em class="form_req">*</em></th>
                                <td>
                                    <input type="text" class="input form_w100" title="이메일주소" v-model="adm.adminEmail">
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">접속IP 대역</th>
                                <td colspan="3">
                                    <input type="text" class="input form_conip" title="접속IP 대역" v-model="adm.adminConIp1">
                                    <span class="period_form">-</span>
                                    <input type="text" class="input form_conip" title="접속IP 대역" v-model="adm.adminConIp2">
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <!-- //tbl view box -->
                    <!-- btn tbl bot -->
                    <div class="btn_tbl_bot">
                        <button type="button" id="" class="btn_m01 bg02 del" v-on:click="delAdmin">ID 계정해지</button>
                    </div>
                </div>
            </div>

            <!-- btn bot -->
            <div class="btn_bot">
                <button type="button" id="" class="btn_b01 bg02" v-on:click="cancelInfo">취소</button>
                <button type="button" id="" class="btn_b01 bg01" v-on:click="updateInfo">정보 변경</button>
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
    import {environment} from '../../../utill/environment';

    @Component({
        components: {
            AddressBox
        },
    })
    export default class FranchiseDetl extends Vue {
        message: any = '';

        viewRowItem : {} = {};
        objectKey : any = "";

        soluId: any = ''; //현금영수증 사업자(KT로 초기화)

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

        aproIdx : number = 0;
        admIdx : number = 0;

        //돔생성전 호출자
        created() {

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
                    aproDupBtn: "dupbtn0"
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
                        adminConIp2: '' //접속IP대역 끝
                    }
                ]

            this.franchiseView();
            this.getSelectbox();



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
            this.objectKey = this.$route.params.objectKey

            console.log(this.$route.params.objectKey);
            if(!this.objectKey){
                alert('접근할수 없습니다')
                this.$router.push({name:'franchiseList'});
            }else{
                CommonBoardService.getListDatas('gajum',this.objectKey.gajumId,'').then((response) => {
                    let result: any =  response.data
                    console.log(result)
                    if(result != null){
                        //사업자 정보
                        this.soluId = result.soluId; //현금영수증 사업자
                        this.saupId = result.saupId; //사업자등록번호
                        this.storeNm = result.shopNm; //사업자명
                        this.repNm = result.chipNm; //대표자명
                        this.repPhonenum = result.telNum; //전화번호
                        this.saupType = result.saupType; //사업구분
                        this.lawNum = result.lawNum; //법인등록번호
                        this.zipCode = result.zipCode; //우편번호
                        this.addr1 = result.addr1; //주소
                        this.addr2 = result.addr2; //상세주소
                        this.gajumStatus = result.gajumStatus; //가맹점 상태
                        this.regiDate = result.regiDate; //사업장 등록일
                        this.canDate = result.canDate; //사업장 해지일
                        this.blGb = result.blGb; //BL구분
                        this.blGbNm = result.blGbNm; //BL상태
                        this.blDate = result.blDate; //BL일짜
                        let blGb = document.getElementById('blGbID');
                        if(blGb != null){ blGb.setAttribute('disabled', 'disabled'); }

                        //승인대역 정보
                        console.log(result.aprvBands.length);
                        for(let a=0; a<result.aprvBands.length; a++){ //하나는 기본표시이기때문에 1부터시작



                            if(result.aprvBands.length > 0 && a == 0){
                                this.approvalList[0].aproDupBtn = 'display:none';
                            }
                            if(a > 0){ //승인대역 정보 1개는 기본으로 보여짐으로 1개이상부터 추가
                                this.addAproval('hide'); //승인대역 정보 row 추가
                            }

                            this.approvalList[a].companyCodeName = result.aprvBands[a].subSaup;
                            this.approvalList[a].companyCode = result.aprvBands[a].subSaup;
                            this.approvalList[a].jumCode = result.aprvBands[a].jumcode;
                            this.approvalList[a].aproCode = result.aprvBands[a].aprvCode;
                            this.approvalList[a].aproBandFrom = result.aprvBands[a].aprvPermFrom;
                            this.approvalList[a].aproBandTo = result.aprvBands[a].aprvPermTo;

                            console.log('승인대역 정보 있음');
                            console.log(this.approvalList.length)

                            /*
                            console.log('==================================')
                            console.log(document.getElementById('dupbtn0'));
                            console.log(document.getElementById('dupbtn1'));
                            console.log('==================================')

                            let btn_id = 'dupbtn'+a; //점코드 버튼 id 생성
                            console.log('중복버튼 ID 만듬 :: '+btn_id);
                            let dup_btn = document.getElementById(btn_id); //버튼 id
                            console.log('중복버튼 ID 객체 가져옴 :: '+dup_btn);
                            if(dup_btn != null){ dup_btn.setAttribute('style', 'display:none'); }
                            */
                        }

                        //관리자 정보


                    }else{

                    }
                    //this.onLoadListView = true;
                }).catch();
            }
            //this.onLoadListView = false
        }

        getSelectbox(){
            //this.getSelectList('SEARCH'); //승인코드
            this.getSelectList('RECEIPT'); //현금영수증 사업자
            this.getSelectList('APRO'); //승인코드
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
            let btn_hide : string = '';
            if(display == 'hide') { //hide이면 중복확인 버튼 안나옴
                btn_hide = 'display:none;';
            }
            this.approvalList.push({companyCodeNm: "", companyCode: "", jumCode:"", jumCodeYn:"", jumCodeMsg:msg_name, aproCode:"", aproStat:"", aproGbn:"", aproBandFrom:"", aproBandTo:"", aproCnt:"", aproRadio:radio_name, aproDupBtn: btn_hide});
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
            this.adminList.push({adminNm: "", adminPhonenum: "", adminId:"", adminIdYn:"", adminIdMsg:msg_name , adminEmail:"", adminConIp1:"", adminConIp2:""});
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
            this.updateInfo();
            return;
            /*
                        if(this.soluId == ''{
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
                        }else if(this.saupType == ''){
                            alert('사업자구분을 선택하세요.');
                            return;
                        }else if(this.lawNum == ''){
                            alert('법인등록번호를 입력하세요.');
                            return;
                        }else if(this.zipCode == ''){
                            alert('우편번호를 입력하세요.');
                            return;
                        }else if(this.addr1 == ''){
                            alert('주소를 입력하세요.');
                            return;
                        }else if(this.addr2 == ''){
                            alert('상세주소를 입력하세요.');
                            return;
                        }
            */
            //승인대역 입력 정보 체크
            if(this.approvalList.length == 1){
                if(this.approvalList['0'].companyCodeNm != undefined || this.approvalList['0'].companyCodeNm != ''){ //회사코드를 리스트에서 선택하면 승인대역 정보가 필수가 됨

                    if(this.approvalList['0'].jumCode == undefined || this.approvalList['0'].jumCode == ''){
                        alert('점코드를 입력하세요.');
                        return;
                    }
                    if(this.approvalList['0'].jumCodeYn == undefined || this.approvalList['0'].jumCodeYn == ''){
                        alert('점코드 중복확인 하세요.');
                        return;
                    }
                    if(this.approvalList['0'].aproCode == undefined || this.approvalList['0'].aproCode == ''){
                        alert('승인코드를 선택하세요.');
                        return;
                    }
                    if(this.approvalList['0'].aproGbn == undefined || this.approvalList['0'].aproGbn == ''){
                        alert('승역대역 항목을 선택하세요.');
                        return;
                    }
                    if(this.approvalList['0'].aproGbn == '1' && (this.approvalList['0'].aproBandFrom == undefined || this.approvalList['0'].aproBandFrom == '')){
                        alert('승인대역 시작점을 입력하세요.');
                        return;
                    }
                    if(this.approvalList['0'].aproGbn == '1' && (this.approvalList['0'].aproBandTo == undefined || this.approvalList['0'].aproBandTo == '')){
                        alert('승인대역 끝점을 입력하세요.');
                        return;
                    }
                    if(this.approvalList['0'].aproGbn == '2' && (this.approvalList['0'].aproCnt == undefined || this.approvalList['0'].aproCnt == '')){
                        alert('승인대역 건수를 입력하세요.');
                        return;
                    }
                }
            }
            if(this.approvalList.length > 1){
                for(let i=0; i<this.approvalList.length; i++){
                    console.log(this.approvalList[i].aproBandTo);
                    if(this.approvalList[i].companyCodeNm != undefined || this.approvalList[i].companyCodeNm != ''){ //회사코드를 리스트에서 선택하면 승인대역 정보가 필수가 됨

                        if(this.approvalList[i].jumCode == undefined || this.approvalList[i].jumCode == '') {
                            alert('점코드를 입력하세요.')
                            return;
                        }
                        if(this.approvalList[i].jumCodeYn == undefined || this.approvalList[i].jumCodeYn == '') {
                            alert('점코드 중복확인 하세요.')
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

            /*
                        //관리자 정보 입력 체크
                        if(this.adminList.length == 1){
                            if(this.adminList['0'].adminNm == undefined || this.adminList['0'].adminNm == ''){
                                alert('이름을 입력하세요.');
                                return;
                            }
                            if(this.adminList['0'].adminPhonenum == undefined || this.adminList['0'].adminPhonenum == ''){
                                alert('휴대폰번호를 입력하세요.');
                                return;
                            }
                            if(this.adminList['0'].adminId == undefined || this.adminList['0'].adminId == ''){
                                alert('ID를 입력하세요.');
                                return;
                            }
                            if(this.adminList['0'].adminIdYn == undefined || this.adminList['0'].adminIdYn == ''){
                                alert('ID 중복확인 하세요.');
                                return;
                            }
                            if(this.adminList['0'].adminEmail == undefined || this.adminList['0'].adminEmail == ''){
                                alert('이메일주소를 입력하세요.');
                                return;
                            }
                            if(this.adminList['0'].adminEmail != '' && !this.emailCheck(this.adminList['0'].adminEmail)){
                                alert('입력하신 메일 주소가 올바르지 않습니다.\n메일 주소를 확인하세요.');
                                return;
                            }
                        }
                        if(this.adminList.length > 1){
                            for(let i=0; i<this.adminList.length; i++){
                                if(this.adminList[i].adminNm == undefined || this.adminList[i].adminNm == ''){
                                    alert('이름을 입력하세요.');
                                    return;
                                }
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
            */

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
            //saupData['birthday'] = this.reBirthday; //생년월일
            //saupData['gender'] = this.reGender; //성별
            saupData['saupType'] = this.saupType; //사업자구분
            saupData['lawNum'] = this.lawNum; //법인등록번호
            saupData['zipCode'] = this.zipCode; //사업장 우편번호
            saupData['addr1'] = this.addr1; //사업장 주소
            saupData['addr2'] = this.addr2; //사업장 상세주소

            reqData['saupjangDto'] = saupData; //사업장 정보 셋팅

            //승인대역 정보
            //let aproData: any = [];
            let aproData : any = [];
            let addData2 : any = []; //승인대역정보 배열

            console.log('승인대역 정보 뿌리기')
            console.log(this.approvalList)
            console.log('관리자 정보 뿌리기')
            console.log(this.adminList)
            console.log('=======================================================')

            if(this.approvalList.length > 0){
                for(let j=0; j<this.approvalList.length; j++){
                    if(this.approvalList[j].companyCode != undefined && this.approvalList[j].companyCode != '') { //회사코드가 있는 경우만 담기
                        aproData = []; //초기화 안하면 값이 이상하게 들어감
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
            let admData: any = [];
            let addData3 : any = []; //승인대역정보 배열
            if(this.adminList.length > 0){
                for(let k=0; k<this.adminList.length; k++){
                    if(this.adminList[k].adminNm != undefined && this.adminList[k].adminNm != '') { //이름이 입력된 경우만 담기
                        admData = []; //초기화 안하면 값이 이상하게 들어감
                        admData['name'] = this.adminList[k].adminNm; //이름
                        admData['phoneNum'] = this.adminList[k].adminPhonenum; //휴대폰번호
                        admData['id'] = this.adminList[k].adminId; //ID
                        admData['email'] = this.adminList[k].adminEmail; //이메일
                        admData['accessIpFrom'] = this.adminList[k].adminConIp1; //접속IP 시작
                        admData['accessIpTo'] = this.adminList[k].adminConIp2 //접속IP 끝
                        addData3.push(admData);
                    }
                }
            }
            console.log('승인대역 정보 확인');
            console.log(addData3);
            reqData['accounts'] = addData3; //관리자 정보 셋팅

            console.log('최종 등록 정보 확인');
            console.log(reqData);

            /*
                        // api 데이터 호출(사업자등록번호 유효성 체크)
                        CommonBoardService.postListDatas('validation/saupid', null, reqData).then((response) => {
                                let result: any = response.data;
                                console.log(result);
                                if (result != null && result.code == '000') {
                                    //사업자등록번호 유효성 체크에 이상이 없으면 기 등록된 사업장등록번호인지 한번 더 체크
            //                        this.chkSaupNoAlr(no);
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
            */
            //this.$router.push('/home/franchiseRegCmpl')
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

            let no = this.approvalList[idx].jumCode; //점코드
            let saupmsg = document.getElementById('jumcode_msg'+idx); //중복 확인한 ROW 메시지

            let reqData: any = {};
            reqData['checkString'] = no; //점코드

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
            this.adminList[idx].adminIdYn = '';
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

    }

</script>