<template>

    <!-- container -->
    <section id="container">
        <!-- content  -->
        <div class="content">
            <h2 class="blind">가맹점 관리</h2>

            <h3>지점 등록</h3>

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
                        <input type="text" class="input form_w100" title="가맹점번호" v-model="gajumId" disabled="disabled">
                    </li>
                    <li>
                        <label for="">사업자 번호</label>
                        <input type="text" class="input form_w100" title="사업자번호" v-model="saupNo" disabled="disabled">
                    </li>
                    <li>
                        <label for="">가맹점명</label>
                        <input type="text" class="input form_w100" title="가맹점명" v-model="soluNm" disabled="disabled">
                    </li>
                </ul>
            </div>
            <!-- //search reg box -->
            <!-- btn tbl bot -->
            <div class="btn_tbl_bot">
                <button type="button" id="" class="btn_m01 bg01 sch" v-on:click="gajiBox(postText)">가맹점 검색</button>
            </div>

            <h4>사업장 기본 정보
                <span class="sub_cf">(사업자 등록증 상의 정보)</span>
            </h4>

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
                            <input type="text" class="input form_industry" title="사업자등록번호" v-model="saupId" v-on:keyup="saupIdChk" maxlength="10">
                            <input type="hidden" v-model="saupIdYn">
                            <button type="button" id="" class="btn_s01 bg04" v-on:click="chkSaupNo(saupId)">중복확인</button>
                            <p class="info_msg" id="saupid_msg"></p>
                        </td>
                        <th scope="row">사업장명<em class="form_req">*</em></th>
                        <td><input type="text" class="input form_w100" title="사업장명" v-model="storeNm" maxlength="20"></td>
                    </tr>
                    <tr>
                        <th scope="row">대표자명<em class="form_req">*</em></th>
                        <td><input type="text" class="input form_w100" title="대표자명" v-model="repNm" maxlength="20"></td>
                        <th scope="row">전화번호<em class="form_req">*</em></th>
                        <td>
                            <input type="text" class="input form_w100" title="전화번호" v-model="repPhonenum" maxlength="20">
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">사업자구분</th>
                        <td>
                            <select id="" name="" class="select form_w100" title="사업자구분" v-model="saupType">
                                <option value="">선택</option>
                                <option value="2">개인사업자</option>
                                <option value="1">법인사업자</option>
                                <!--<option value="">선택</option>
                                <template v-for="datas in saupGbnList">
                                    <option v-bind:value=datas.code>{{datas.name}}</option>
                                </template>-->
                            </select>
                        </td>
                        <th scope="row">법인등록번호<em class="form_req">*</em></th>
                        <td><input type="text" class="input form_w100" title="법인등록번호" v-model="lawNum" maxlength="10"></td>
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
                    </tbody>
                </table>
            </div>
            <!-- //tbl view box -->

            <div class="title_area">
                <h4>승인대역 정보</h4>
                <div class="btn_tbl_top type01">
                    <button type="button" id="" class="btn_m01 bg02 add" v-on:click="addAproval">승인대역 추가</button>
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
                            <select name="" class="select form_comcode" title="회사코드" v-model="apro.companyCodeNm" v-on:change="companyCodeCh(index)">
                                <option value="">선택</option>
                                <template v-for="datas in companyCodeList">
                                    <option v-bind:value=datas.code>{{datas.name}}</option>
                                </template>
                            </select>
                            <input type="text" class="input form_comcode" title="회사코드" v-model="apro.companyCode" disabled="disabled">
                        </td>
                        <th scope="row">점코드</th>
                        <td>
                            <input type="text" class="input form_branchcode" title="점코드" v-model="apro.jumCode" v-on:keyup="jumCodeCh(index)" maxlength="10">
                            <input type="hidden" v-model="apro.jumCodeYn">
                            <button type="button" id="" class="btn_s01 bg04" v-on:click="chkJumCode(index)">중복확인</button>
                            <p class="info_msg" id=id v-bind:id="apro.jumCodeMsg"></p>
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
                                    <p class="info_msg" id=id v-bind:id="adm.adminIdMsg" ></p>
                                </td>
                                <th scope="row">이메일주소</th>
                                <td>
                                    <input type="text" class="input form_w100" title="이메일주소" v-model="adm.adminEmail">
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">접속IP 대역</th>
                                <td colspan="3">
                                    <input type="text" class="input form_conip" title="접속IP 대역" v-model="adm.adminConIp1" maxlength="14">
                                    <span class="period_form">-</span>
                                    <input type="text" class="input form_conip" title="접속IP 대역" v-model="adm.adminConIp2" maxlength="14">
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
                <button type="button" id="" class="btn_b01 bg02">취소</button>
                <button type="button" id="" class="btn_b01 bg01" v-on:click="validationChk">지점 등록</button>
            </div>

            <AddressBox v-if="showModal" v-bind:postData="postText" v-on:selectedValue="setDataAddr" @close="showModal = false"></AddressBox>

            <GajiBox v-if="showModal1" v-bind:postData="postText1" v-on:selectedGaji="setGajiData" @gajiClose="showModal1 = false"></GajiBox>

        </div>
        <!-- //content -->
    </section>
    <!-- //container -->

</template>

<script lang="ts">
    import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
    import {CommonBoardService, CommonListService} from '../../../api/common.service';
    import AddressBox from '@/components/common/addressBox/addressBox.vue'
    import GajiBox from '@/components/contents/franchiseManage/GajiList.vue'
    import {environment} from '../../../utill/environment';

    @Component({
        components: {
            BranchReg, AddressBox, GajiBox
        }
    })
    export default class BranchReg extends Vue {
        message: any = '';

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
        aproCodeList: any = {}; //승인코드

        aproIdx : number = 0;
        admIdx : number = 0;

        //돔생성전 호출자
        created() {

            console.log('세선정보 확인===========>>>>>')
            console.log(sessionStorage)
            console.log('세선정보 확인===========<<<<<')

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
                        adminConIp2: '' //접속IP대역 끝
                    }
                ]

            this.aproIdx = this.aproIdx;
            //}

            //주석 제거해야 해
            this.getSelectList('RECEIPT');
            this.getSelectList('SEARCH'); //회사코드
            this.getSelectList('APRO'); //승인코드

        }

        //돔렌더링완료시 진행
        mounted() {
        }

        //승인대역 유효성 체크
        alrBandChk() {

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
                            bandData['approvedbandFrom'] = this.approvalList[i].aproBandFrom; //시작 대역
                            bandData['approvedbandTo'] = this.approvalList[i].aproBandTo; //끝 대역

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
                        }

                        if(bandChk == true){ //승인대역 사용 불가
                            return;
                        }else{
                            this.insertInfo(); //등록
                        }
                    }else{
                        this.insertInfo(); //승인대역 리스트가 없으면 그냥 등록
                    }
                }
            }

        }

        //등록
        insertInfo() {

            let reqData: any = {};

            reqData['soluId'] = this.soluId; //현금영수증 사업자
            reqData['gajumId'] = this.gajumId; //가맹점번호

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
            let aproData : any = {};
            let addData2 : any = []; //승인대역정보 배열

            console.log('승인대역 정보 뿌리기')
            console.log(this.approvalList)
            console.log('관리자 정보 뿌리기')
            console.log(this.adminList)
            console.log('=======================================================')

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
            reqData['approvalBandAddDtos'] = addData2; //승인대역 정보 셋팅

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
                        admData['accessIpTo'] = this.adminList[k].adminConIp2 //접속IP 끝
                        addData3.push(admData);
                        //addData3.push(admData);
                    }
                }
            }
            console.log('승인대역 정보 확인');
            console.log(addData3);
            reqData['accounts'] = addData3; //관리자 정보 셋팅

            console.log('최종 등록 정보 확인');
            console.log(reqData);


            // api 데이터 호출(가맹점 등록)
            CommonBoardService.postListDatas('jijum', null, reqData).then((response) => {
                    let result: any = response.data;
                    console.log(result);
                    if (result != null) {
                        //지점등록 완료 화면으로 이동
                        this.$router.push({ name:'branchRegCmpl' , params: { objectKey : reqData } }) // 라우터 주소를 넣어줘야 히스토리모드 인식
                    } else {
                        alert('지점 등록에 실패하였습니다.\n다시 시도하세요.');
                        return;
                    }
                }
                , (error) => {
                    console.log(error);
                }
            ).catch((response) => {
                console.log(response);
            });

            //지점등록 완료 화면으로 이동
            //this.$router.push({ name:'branchRegCmpl' , params: { objectKey : reqData } }) // 라우터 주소를 넣어줘야 히스토리모드 인식

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
//            this.insertInfo();
//return;

            if(this.soluId == ''){
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
            }else if(this.saupType == '1' && this.lawNum == ''){ //법인사업자 경우만 체크
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

            //승인대역 정보 체크
            if(this.approvalList.length > 0){
                for(let i=0; i<this.approvalList.length; i++){
                    if(this.approvalList[i].companyCodeNm != undefined && this.approvalList[i].companyCodeNm != ''){ //회사코드를 선택하면 승인대역 정보는 필수 입력항목이 됨
                        console.log('승인내역 건수 :: '+this.approvalList.length);
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

                        //승인대역 대역폭 체크
                        /*
                        let bandChk : boolean = true;
                        if(this.approvalList[i].aproGbn == '1' && this.approvalList[i].aproBandFrom != '' &&  this.approvalList[i].aproBandTo != '') { //승인대역이 대역폭이고 대역폭 시작, 끝이 있으면 체크
                            //대역폭 정보
                            let bandData: any = {};
                            bandData['subSaup'] = this.approvalList[i].companyCodeNm; //회사코드
                            bandData['approvedCode'] = this.approvalList[i].aproCode; //승인코드
                            bandData['approvedbandFrom'] = this.approvalList[i].aproBandFrom; //시작 대역
                            bandData['approvedbandTo'] = this.approvalList[i].aproBandTo; //끝 대역

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
                                    }
                                }
                                , (error) => {
                                }
                            ).catch();
                        }*/

                    }
                }
            }

            //관리자 정보 체크
            if(this.adminList.length > 0){
                for(let i=0; i<this.adminList.length; i++){
                    if(this.adminList[i].adminNm != undefined && this.adminList[i].adminNm != ''){ //이름을 입력하면 관리자정보는 필수 입력항목이 됨
                        console.log('관리자 정보 건수 :: '+this.adminList.length);
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
                        this.saupIdYn = 'Y'; //개발 반영시 ''로 바꾸어야 함
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

        //가맹점 팝업 보임
        gajiBox(text) {
            console.log(text)
            this.showModal1 = true;
            //this.postText = "서울시금천구";
        }

        //선택한 가맹점 정보 셋팅(지점 등록화면 상단의 지점 정보)
        setGajiData(data) {
            this.gajumId = data.gajumId; //가맹점 번호
            this.saupNo = data.saupId; //사업자 번호
            this.soluNm = data.shopNm; //가맹점명
        }

    }

</script>
