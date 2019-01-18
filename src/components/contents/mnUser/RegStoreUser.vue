<template>

    <!-- container -->
    <section id="container">
        <!-- content  -->
        <div class="content page_joinapp">
            <h2 class="blind">사용자 계정 등록</h2>

            <h3>사용자 계정 등록</h3>

            <h4>사업장 기본 정보 <span class="sub_cf">(사업자 등록증 상의 정보)</span></h4>

            <p class="req_info type01">(<em class="form_req">*</em>)는 필수항목입니다.</p> <!-- 2018-11-06 수정 -->

            <!-- tbl view box -->
            <div class="tbl_view_box">
                <!-- tbl view01 -->
                <table class="tbl_view01">
                    <caption>사업장 기본 정보</caption>
                    <colgroup>
                        <col class="col_mob" width="18%">
                        <col class="col_mob" width="32%">
                        <col class="col_mob" width="18%">
                        <col class="col_mob" width="32%">
                    </colgroup>
                    <tbody>
                    <tr>
                        <th scope="row" class="sub_msg01">사업자등록번호<em class="form_req">*</em></th>
                        <td class="con_msg01">
                            <input type="text" class="input form_industry" title="사업자등록번호 입력" id="inputSaupId" v-on:keyup="saupIdChk" v-model="saupId" maxlength="10">
                            <input type="hidden" v-model="saupIdYn">
                            <button type="button" class="btn_s01 bg04" id="btnRegConfirm" v-on:click="saupInfo(saupId)">등록확인</button>
                            <p class="info_msg" id="saupid_msg"></p> <!-- 메시지 표시 -->
                        </td>
                        <th scope="row">사업장명<em class="form_req">*</em></th>
                        <td class="vtop"><input type="text" class="input form_w100" title="사업장명 입력" v-model="storeNm" maxlength="30"></td>
                    </tr>
                    <tr>
                        <th scope="row">대표자명<em class="form_req">*</em></th>
                        <td><input type="text" class="input form_w100" title="대표자명 입력" v-model="repNm" maxlength="20"></td>
                        <th scope="row">전화번호<em class="form_req">*</em></th>
                        <td>
                            <input type="text" class="input form_w100" title="전화번호 입력" v-model="repPhonenum" maxlength="12">
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">사업자구분<em class="form_req">*</em></th>
                        <td>
                            <select id="" name="" class="select form_w100" title="사업자 선택" v-model="saupType">
                                <option value="">선택</option>
                                <option value="2">개인</option>
                                <option value="1">법인</option>
                                <!--<template v-for="datas in saupGbnList">
                                    <option v-bind:value=datas.code>{{datas.codeName}}</option>
                                </template>-->
                            </select>
                        </td>
                        <th scope="row"><template v-if="saupType=='1'">법인등록번호<em class="form_req">*</em></template></th>
                        <td><input type="text" class="input form_w100" title="법인등록번호 입력" v-model="lawNum" maxlength="13"></td>
                    </tr>
                    <tr>
                        <th scope="row" class="sub_address">주소 <em class="form_req">*</em></th>
                        <td colspan="3">
                            <ul class="address_list">
                                <li class="con01">
                                    <input type="text" class="input form_post" title="우편번호 입력" v-model="zipCode" disabled="disabled">
                                    <button type="button" id="" class="btn_s01 bg03" @click="addressBox1(postText)">우편번호</button>
                                </li>
                                <li class="con02">
                                    <input type="text" class="input form_address01" title="주소 입력" v-model="addr1" maxlength="40">
                                </li>
                                <li class="con03">
                                    <input type="text" class="input form_address02" title="상세 주소 입력" v-model="addr2" maxlength="40">
                                </li>
                            </ul>
                        </td>
                    </tr>
                    <tr id="companyViewChk1">
                        <th scope="row">업종구분<em class="form_req">*</em></th>
                        <td colspan="1">
                            <select id="" name="" class="select form_w100" title="업종 선택" v-model="upjongCode">
                                <option value="">선택</option>
                                <template v-for="datas in upjongCodeList">
                                    <option v-bind:value=datas.code>{{datas.codeNm}}</option>
                                </template>
                            </select>
                            <input type="hidden" v-model="upjongCodeNm">
                        </td>
                        <th scope="row" class="com_code codenone">회사코드<em class="form_req">*</em></th>
                        <td class="com_code codenone" colspan="">
                            <select id="" name="" class="select form_w100" title="회사코드 상세" v-model="companyCode">
                                <option value="">선택</option>
                                <template v-for="datas in subsaupList">
                                    <option v-bind:value=datas.code>{{datas.name}}</option>
                                </template>
                            </select>
                        </td>
                    </tr>
                    <!--<tr>
                        <th scope="row" class="sub_ind02">사업자등록증사본<em class="form_req">*</em></th>
                        <td colspan="3" class="con_ind02">
                            <div class="form_row upload">
                                <span class="rdo_box"><input type="radio" name="chk" value="1" id="aa11" v-model="fileUploadGbn" checked="checked"><label for="aa11">파일 업로드</label></span>
                                <div class="input_file_form">
                                    <input class="upload_path9" readonly="readonly" v-model="uploadFileNm">
                                    <label class="upload btn_s01 bg03" id="btnFile">
                                        <input type="file" @change="uploadFile($event)" />
                                        <span>파일찾기</span>
                                    </label>
                                </div>
                                <p class="form_info">
                                    <span class="send_text">(* 사업자등록증 사본 이미지 는  jpg.png.tiff.pdf 파일 형식으로 업로드 해주세요.)</span>
                                </p>
                            </div>
                            <div class="form_row send">
                                <span class="rdo_box"><input type="radio" name="chk" value="2" id="aa12" v-model="fileUploadGbn"><label for="aa12">팩스 전송</label></span>
                                <p class="form_info">: 가입 신청 후 2일 이내에  02-2074-6089 으로 팩스를 전송해 주시기 바랍니다. <br>
                                    <span class="send_text">(* 팩스 전송 후 온라인 가맹점 가입 승인 까지는 영업 일 기준 3~4일의 시간이 소요 될 수 있습니다.)</span>
                                </p>
                            </div>
                        </td>
                    </tr>-->
                    </tbody>
                </table>
            </div>
            <!-- //tbl view box -->

            <h4>사용자 정보</h4>
            <!-- tbl view box -->
            <div class="tbl_view_box">
                <!-- tbl view01 -->
                <table class="tbl_view01">
                    <caption>사용자 정보</caption>
                    <colgroup>
                        <col class="col_mob" width="18%">
                        <col class="col_mob" width="32%">
                        <col class="col_mob" width="18%">
                        <col class="col_mob" width="32%">
                    </colgroup>
                    <tbody>
                    <tr>
                        <th scope="row">이름<em class="form_req">*</em></th>
                        <td><input type="text" class="input form_name" title="이름"  v-model="name" maxlength="20"></td>
                        <th scope="row">휴대폰번호<em class="form_req">*</em></th>
                        <td>
                            <input type="text" class="input form_w100" title="휴대폰번호 입력" v-model="phoneNum" maxlength="12">
                        </td>
                    </tr>
                    <tr>
                        <th scope="row" class="sub_msg01">ID<em class="form_req">*</em></th>
                        <td class="con_msg01">
                            <input type="text" class="input form_id" title="ID 입력" v-model="id" maxlength="16">
                            <input type="hidden" title="ID 중복확인 여부" v-model="idYn">
                            <button type="button" id="" class="btn_s01 bg04" v-on:click="chkUserId(id)">중복확인</button>
                            <p class="info_msg" id="id_msg"></p>
                        </td>
                        <th scope="row" class="sub_msg01">이메일주소<em class="form_req">*</em></th>
                        <td class="con_msg01">
                            <input type="text" class="input form_w100" title="이메일주소 입력" v-model="email" maxlength="30">
                            <!--<p class="info_msg">이미 등록된 아이디 입니다.</p>-->
                        </td>
                    </tr>
                    <!--<tr>
                        <th scope="row" class="sub_msg01">비밀번호<em class="form_req">*</em></th>
                        <td class="con_msg01">
                            <input type="password" class="input form_w100" title="비밀번호 입력" v-model="password" >
                        </td>
                        <th scope="row">비밀번호 확인<em class="form_req">*</em></th>
                        <td>
                            <input type="password" class="input form_w100" title="비밀번호 확인 입력" v-model="passwordCon">
                        </td>
                    </tr>-->
                    </tbody>
                </table>
            </div>
            <!-- //tbl view box -->

            <!-- btn bot -->
            <div class="btn_bot">
                <button type="button" id="" v-on:click="franchiseCancel" class="btn_b01 bg02">취소</button>
                <!--<button type="button" id="" v-on:click="dataValidation" class="btn_b01 bg01">가입신청</button>-->
                <button type="button" id="" class="btn_b01 bg01" v-on:click="dataValidation" >등록</button>
            </div>

            <AddressBox v-if="showModal1" v-bind:postData="postText" v-on:selectedValue="setDataAddr1" @close="showModal1 = false"></AddressBox>

        </div>
        <!-- //content -->
    </section>
    <!-- //container -->


</template>

<style>
    .test {height:50%}
</style>

<script lang="ts">
    import {Component, Vue, Watch} from 'vue-property-decorator';
    import AddressBox from '@/components/common/addressBox/addressBox.vue'
    import {CommonBoardService} from '../../../api/common.service';
    //import vuePwd from '../../../views/login/VuePassword.vue'
    import {environment} from '../../../utill/environment';
    import moment from 'moment'
    Vue.prototype.moment = moment;

    @Component({
        components: {
            AddressBox
        }
    })

    export default class RegStoreUser extends Vue {

        file: any = ''; //파일 객체
        uploadFileNm: any = ''; //업로드 파일 명
        saupIdYn: any = ''; //사업자등록번호 등록확인 여부
        idYn: any = ''; //사용자ID 중복체크 여부
        score : number = 0;
        scoreEmail : number = 0;

        //사업장 기본 정보
        saupId: any = ''; //사업자등록번호
        //alrSaupId: string = ''; //기 등록된 사업자 번호 여부
        storeNm: string = ''; //사업장명
        repNm: string = ''; //대표자명
        repPhonenum: string = ''; //전화번호
        saupType: string = ''; //사업자구분
        lawNum: string = ''; //법인등록번호
        addr1: string = ''; //사업장 주소
        zipCode: string = ''; //사업장 우편번호
        addr2: string = ''; //상세주소
        upjongCode: string = ''; //업종구분
        upjongCodeNm: string = ''; //업종코드명
        companyCode: string = ''; //회사코드
        //사용자 정보
        name: string = ''; //이름
        phoneNum: string = '' //휴대폰번호
        id: string = '' //ID
        email: string = '' //이메일 주소
        password: string = '' //비밀번호
        passwordCon: string = '' //비밀번호 확인

        showModal1: boolean = false; // 사업장 주소
        postText: string = ""; //테스트 주소

        //select box 객체
        saupGbnList: any = []; //사업자구분
        upjongList: any = []; //업종구분
        companyList: any = []; //회사코드
        subsaupList: any = [];
        upjongCodeList: any = []; //업종구분

        //fileUploadGbn : string = ''; //사업자등록증사본 제출 방법
        //resultFileNm : string = ''; //등록된 파일명

        //휴대폰 본인인증에서 받은 값
        reBirthday : string = ''; //생년월일
        reGender : string = ''; //성별
        reName : string = ''; //이름
        rePhoneNum : string = ''; //폰번호

        deviceGbn : string = 'PC'; //모바일, PC 구분

        created() {

            /*
            //인증후 넘겨받은 필수값
            this.reBirthday = this.$route.params.reqBirthday; //생년월일
            this.reGender = this.$route.params.reqGender; //성별
            this.reName = this.$route.params.reqName; //이름
            this.rePhoneNum = this.$route.params.reqPhoneNum; //폰번호

            console.log('=====휴대폰 인증 후 넘겨받은 값=====')
            console.log(this.reBirthday + ' | ' + this.reGender + ' | '+ this.reName + ' | ' + this.rePhoneNum)

            if(this.reName == null || this.reName == ''){
                alert('접근할수 없습니다')
                this.$router.push({name:'franchiseRegStep1'});
            }

            //모바일, PC 구분
            let filter : string = "win16|win32|win64|mac";
            if (navigator.platform ) {
                if (filter.indexOf(navigator.platform.toLowerCase()) > -1) {
                    this.deviceGbn = "PC";
                } else {
                    this.deviceGbn = "MO";
                }
            }*/

        }

        mounted() {
            //처음에는 회사코드 안보임
            /*
            let obj = document.getElementById('companyViewChk');

            if(obj != null) {
                obj.children['2'].hidden = true;
                obj.children['3'].hidden = true;
                obj.children['1'].setAttribute('colspan', '3');
                obj.children['1'].children['0'].setAttribute('style', 'width:36%');
            }*/

            this.saupIdYn = ''; //사업자등록번호 등록확인 여부
            this.idYn = ''; //사용자ID 중복체크 여부

//            this.name = this.reName; //사용자 이름 (휴대폰 인증에서 넘겨준 이름으로 셋팅)
//            this.phoneNum = this.rePhoneNum; //사용자 휴대폰 번호 (휴대폰 인증에서 넘겨준 이름으로 셋팅)

            //this.getSelectList('0001'); //사업자구분
            this.getSelectList('UPJONG'); //업종구분
            this.getSelectList('SUBSAUP'); //회사코드

            /*if(sessionStorage != null && sessionStorage.saupYn == 'Y'){
                let reqData: any = {};
                reqData['saupId'] = sessionStorage.saupId; //사업자등록번호

                // api 데이터 호출
                CommonBoardService.getListDatas('members', null, reqData).then((response) => {
                        let result: any = response.data;
                        console.log(result);
                        if (result != null && result != '') {
                            //사업장 기본 정보 셋팅
                            this.saupId = this.nullCheck(result.saupId);
                            this.saupIdYn = 'Y'; //등록확인여부
                            //this.alrSaupId = 'true'; //이미 등록된 번호 체크
                            let saup = document.getElementById('inputSaupId');
                            let btnReg = document.getElementById('btnRegConfirm');
                            if(saup != null){
                                saup.setAttribute('disabled','true'); //사업자등록번호 입력 비활성화
                            }
                            if(btnReg != null){
                                btnReg.setAttribute('disabled','disabled'); //등록확인 버튼 비활성화
                            }
                            this.storeNm = this.nullCheck(result.storeNm);
                            this.repNm = this.nullCheck(result.repNm);
                            this.repPhonenum = this.nullCheck(result.repPhonenum);
                            this.saupType = this.nullCheck(result.saupType);
                            this.lawNum = this.nullCheck(result.lawNum);
                            this.zipCode = this.nullCheck(result.zipCode);
                            this.addr1 = this.nullCheck(result.addr1);
                            this.addr2 = this.nullCheck(result.addr2);
                            this.upjongCode = this.nullCheck(result.upjongCode);
                            this.companyCode = this.nullCheck(result.companyCode);

                            //사업자 구분
                            if(this.nullCheck(result.saupType) == '') {
                                let saupNo = result.saupId.substring(3, 5);
                                if (saupNo.substring(0, 1) == 0) {
                                    saupNo = saupNo.substring(2, 1)
                                }
                                if ((saupNo >= 1 && saupNo < 81) || (saupNo >= 89 && saupNo <= 99)) { //개인
                                    this.saupType = '2';
                                } else { //법인
                                    this.saupType = '1';
                                }
                            }
                        }
                    }
                    , (error) => {
                        //console.log('가맹점 등록 오류');
                        console.log(error);
                    }
                ).catch((response) => {
                    console.log(response);
                });
            }*/

            /*
            if(this.deviceGbn == 'PC'){ //PC 접속인 경우 사진좔영 버튼 안보이게
                let bit_pic = document.getElementById('btnPicture');
                if(bit_pic != null) {  bit_pic.setAttribute('style', 'display:none'); }
            }else if(this.deviceGbn == 'MO'){ //모바일 접속일 경우 파일찾기 버튼 안보이게
                let bit_file = document.getElementById('btnFile');
                if(bit_file != null) {  bit_file.setAttribute('style', 'display:none'); }
            }*/
        }

        @Watch('id') onIdChange(){
            this.idYn = '';
            let idmsg = document.getElementById('id_msg');
            if(idmsg!=null){ idmsg.innerHTML = ''; }
        }

        /*@Watch('saupId') changeSaupId(){
            let regNumber = /^[0-9]*$/;
            if(!regNumber.test(this.saupId)){
                Vue.swal({ text: '숫자만가능합니다'});
                this.saupId = '';
            }
        }*/

        @Watch('repPhonenum') changeRepPhonenum(){
            let regNumber = /^[0-9]*$/;
            if(!regNumber.test(this.repPhonenum)){
                Vue.swal({ text: '숫자만가능합니다'});
                this.repPhonenum = '';
            }
        }

        @Watch('lawNum') changeLawNm(){
            let regNumber = /^[0-9]*$/;
            if(!regNumber.test(this.lawNum)){
                Vue.swal({ text: '숫자만가능합니다'});
                this.lawNum = '';
            }
        }

        @Watch('phoneNum') changePhoneNum(){
            let regNumber = /^[0-9]*$/;
            if(!regNumber.test(this.phoneNum)){
                Vue.swal({ text: '숫자만가능합니다'});
                this.phoneNum = '';
            }
        }

        updateScore (data) {
            console.log(data);
            this.score=3
            // The input event sends the current password and any included user inputs (email in this case).
            // Calculate the score here either using a custom
            // javascript library or a request to the server.

            // Note: The score must be an integer between 0 and 4.
        }

        //사업자등록번호 유효성 체크
        chkSaupNo(no: string) {
            let saupmsg = document.getElementById('saupid_msg');

            if(no == ''){
                Vue.swal({text:'사업자등록번호를 입력하세요.'});
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
                        //사업자등록번호 유효성 체크에 이상이 없으면 기 등록된 사업장등록번호인지 한번 더 체크
                        this.chkSaupNoAlr(no);
                    } else {
                        if(saupmsg != null){
                            saupmsg.innerHTML = result.message; //화면에 메시지 보이기
                        }
                        return;
                    }
                }
                , (error) => {
                    //console.log('가맹점 등록 오류');
                    console.log(error);
                    this.saupIdYn = '';
                }
            ).catch((response) => {
                console.log(response);
            });
            this.saupIdYn = '';
        }

        //기 등록된 사업장등록번호인지 체크
        chkSaupNoAlr(no: string) {

            let reqData: any = {};
            reqData['saupId'] = no; //사업자등록번호

            // api 데이터 호출
            CommonBoardService.getListDatas('members', null, reqData).then((response) => {
                    let result: any = response.data;
                    //console.log(result);
                    if (result != null && result != '') {
                        //console.log('가맹점 등록 성공');
                        if(confirm('이미 등록된 사업자 등록번호입니다.\n기 등록된 사업자로 가맹점을 등록하시겠습니까?')) {

                            //기 등록된 사업장번호로 신청할 경우 기본 정보 셋팅
                            this.saupIdYn = 'Y'; //사업장번호 등록확인여부
                            this.storeNm = this.nullCheck(result.storeNm); //사업장명
                            this.repNm = this.nullCheck(result.repNm); //대표자명
                            this.repPhonenum = this.nullCheck(result.repPhonenum); //전화번호
                            this.saupType = this.nullCheck(result.saupType); //사업자구분
                            this.lawNum = this.nullCheck(result.lawNum); //법인등록번호
                            this.zipCode = this.nullCheck(result.zipCode); //우편번호
                            this.addr1 = this.nullCheck(result.addr1); //주소
                            this.addr2 = this.nullCheck(result.addr2); //상세주소
                            this.upjongCode = this.nullCheck(result.upjongCode); //업종코드
                            this.companyCode = this.nullCheck(result.companyCode); //회사코드
                        }else{
                            this.saupIdYn = '';
                        }
                    } else {
                        Vue.swal({text:'가맹점으로 등록되지 않은 사업자입니다.\n신규 가맹점으로 등록합니다.'});
                        this.saupIdYn = 'Y';
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

        //휴대폰번호 등록여부 체크
        phonenumberChk(){
            let reqData: any = {};
            reqData['checkString'] = this.phoneNum;
            reqData['checkSum'] = '';
            reqData['checkType'] = 'USER';

            // api 데이터 호출(사업자등록번호 유효성 체크)
            CommonBoardService.postListDatas('validation/phonenum', null, reqData).then((response) => {
                    let result: any = response.data;
                    //console.log(result);
                    if (result != null && result.code == '000') {
                        //휴대폰번호 유효성 체크에 이상이 없으면 가맹점등록
                        //this.franchiseFileReg();
                        this.franchiseReg();
                    } else {
                        Vue.swal({text:'휴대폰번호로 등록된 가맹점이 존재합니다.'});
                    }
                }
                , (error) => {
                    //console.log('가맹점 등록 오류');
                    console.log(error);
                    this.saupIdYn = '';
                }
            ).catch((response) => {
                console.log(response);
            });
        }

        //가맹점 가입 신청
        franchiseReg(){
            let regData: any = {};

            //사업장 기본 정보
            regData['saupId'] = this.saupId; //사업자등록번호
            //regData['alrBusinessNo'] = this.alrSaupId; //기 등록된 사업자 번호 여부
            regData['storeNm'] = this.storeNm; //사업장명
            regData['repNm'] = this.repNm; //대표자명
            regData['repPhonenum'] = this.repPhonenum; //전화번호
            //regData['birthday'] = this.reBirthday; //생년월일
            //regData['gender'] = this.reGender; //성별
            regData['saupType'] = this.saupType; //사업자구분
            regData['lawNum'] = this.lawNum; //법인등록번호
            regData['zipCode'] = this.zipCode; //사업장 우편번호
            regData['addr1'] = this.addr1; //사업장 주소
            regData['addr2'] = this.addr2; //사업장 상세주소
            regData['upjongCode'] = this.upjongCode; //업종구분
            regData['upjongCodeNm'] = this.upjongCodeNm; //업종구분명
            regData['companyCode'] = this.companyCode; //회사코드
            //사용자 정보
            regData['name'] = this.name; //이름
            regData['phoneNum'] = this.phoneNum; //휴대폰번호
            regData['id'] = this.id; //ID
            regData['email'] = this.email; //이메일 주소
            //regData['password'] = this.password; //비밀번호
            //regData['saupFileNm'] = this.resultFileNm; //등록된 파일 명

            // api 데이터 호출
            CommonBoardService.postListDatas('accounts/storemember', null, regData).then((response) => {
                    let result: any = response.data;
                    console.log(response)
                    if (result != null && result != '') {
                        //console.log('가맹점 등록 성공');
                        this.sendMail(); //가입완료 메일 발송
                        //this.$router.push({name:"franchiseRegStep3", params:{reqId:result.id, reqSaupId:result.saupId, reqStoreNm:result.storeNm}});
                        this.$router.push('/home/mnUser');
                    } else {
                        Vue.swal({text: '계정 정보 등록에 실패하였습니다. 다시 시도하세요.'});
                        return;
                    }
                }
                , (error) => {
                    //console.log('가맹점 등록 오류');
                    Vue.swal({text: '계정 정보 등록에 실패하였습니다. 다시 시도하세요.'});
                }
            ).catch();
        }

        //사업자등록증 사본 등록
        franchiseFileReg(){

            //사업자등록증사본 제출을 파일 업로드로 선택하고 첨부파일이 있으면 등록
            /*if(this.fileUploadGbn == '1' && this.file != null && this.file != '') {

                //파일 확장자 확인(jpg, png, tiff, pdf파밀만 등록 가능)
                let fileExt =  this.file.name.split('.');
                let lowerExt = fileExt[1].toLowerCase();
                if(lowerExt.includes('jpg') || lowerExt.includes('png') || lowerExt.includes('tiff') || lowerExt.includes('pdf')){
                }else{
                    alert('파일 확장자를 확인하세요.\n(jpg, png, tiff, pdf파일만 등록 가능합니다)');
                    return;
                }

                let formData = new FormData();
                formData.append('file', this.file);

                CommonBoardService.postListDatas('members/file', null, formData).then((response) => {
                        let result: any = response.data;
                        console.log(result);
                        // data - list
                        // failCount
                        // totalCount
                        if (result.file != null && result.file != '') {
                            //console.log('파일 등록 성공');
                            this.resultFileNm = result.file; //리스트
                            //console.log('등록된 파일명 :: ' + this.resultFileNm)
                            this.franchiseReg();
                        } else {
                            console.log('파일 등록 실패');
                        }
                    }
                    , (error) => {
                        console.log(error)
                    }
                ).catch();
                //첨부파일이 없으면
            }else{
                this.franchiseReg();
            }*/
        }

        dataValidation() {
            let regNumber = /^[0-9]*$/;
            if(this.saupId == '') {
                Vue.swal({text: '사업자등록번호를 입력하세요.'});
                return false;
            }else if(this.saupIdYn == ''){
                Vue.swal({text: '사업자등록번호 등록확인하세요.'});
                return false;
            }else if(this.storeNm == '') {
                Vue.swal({text:'사업장명을 입력하세요.'});
                return false;
            }else if(this.repNm == '') {
                Vue.swal({text:'대표자명을 입력하세요.'});
                return false;
            }else if(this.repPhonenum == '') {
                Vue.swal({text:'전화번호를 입력하세요.'});
                return false;
            }else if(!regNumber.test(this.repPhonenum)){
                Vue.swal({text:'전화번호는 숫자로 입력하세요.'});
                return;
            }else if(this.saupType == '') {
                alert('사업자구분을 선택하세요.');
                return false;
            }else if(this.saupType == '1' && this.lawNum == '') { //사업자구분이 법인인 경우 체크
                alert('법인등록번호를 입력하세요.');
                return false;
            }else if(this.saupType == '1' && this.lawNum != '' && !regNumber.test(this.lawNum)) { //사업자구분이 법인인 경우 체크
                alert('법인등록번호는 숫자만 입력하세요.');
                return false;
            }else if(this.saupType == '1' && this.lawNum != '' && this.lawNum.length != 13) { //사업자구분이 법인인 경우 체크
                alert('법인등록번호는 13자리로 입력하세요.');
                return false;
            }else if(this.addr1 == '') {
                Vue.swal({text:'사업장 주소를 입력하세요.'});
                return false;
            }else if(this.zipCode == '') {
                Vue.swal({text:'사업장 우편번호를 입력하세요.'});
                return false;
            }else if(this.addr2 == '') {
                Vue.swal({text:'사업장 상세주소를 입력하세요.'});
                return false;
            }else if(this.upjongCode == null || this.upjongCode == '') {
                Vue.swal({text:'업종구분을 선택하세요.'});
                return false;
            }else if(this.companyCode == null || this.companyCode == '') { //업종구분이 택배사(0003), 신문사(0002) 경우
                Vue.swal({text: '회사코드를 선택하세요.'});
                return false;
            /*}else if((this.upjongCode == '0003' || this.upjongCode == '0002') && this.companyCode == '') { //업종구분이 택배사(0003), 신문사(0002) 경우
                alert('회사코드를 선택하세요.');
                return false;
            }else if(this.fileUploadGbn == '') {
                alert('사업자등록증사본 제출 방법을 선택하세요.')
                return false;
            }else if(this.fileUploadGbn == '1' && this.uploadFileNm == ''){ //파일업로드를 선택하고 파일 첨부를 안한경우
                alert('사업자등록증사본 파일을 첨부 하세요.');
                return false;*/
            }else if(this.name == '') {
                Vue.swal({text:'사용자 이름을 입력하세요.'});
                return false;
            }else if(this.phoneNum == '') {
                Vue.swal({text:'사용자 휴대폰번호를 입력하세요.'});
                return false;
            }else if(!regNumber.test(this.phoneNum)){
                Vue.swal({text:'사용자 휴대폰번호는 숫자로 입력하세요.'});
                return;
            }else if(this.id == '') {
                Vue.swal({text:'사용자 ID를 입력하세요.'});
                return false;
            }else if(this.email == '') {
                Vue.swal({text:'이메일 주소를 입력하세요.'});
                return false;
            }else if(this.email != '' && !this.emailCheck(this.email)) {
                Vue.swal({text:'입력하신 메일 주소가 올바르지 않습니다.\n메일 주소를 확인하세요.'});
                return false;
            /*}else if(this.password == '') {
                alert('비밀번호를 입력하세요.');
                return false;
            }else if(this.passwordCon == '') {
                alert('비밀번호 확인을 입력하세요.');
                return false;
            }else if(this.password != this.passwordCon) {
                alert('비밀번호 확인을 잘못입력 하셨습니다.')
                return false;
                */
            }else if(this.idYn != 'Y') {
                Vue.swal({text:'사용자ID 중복체크를 하세요.'});
                return false;
            }else{
                this.phonenumberChk();
                //this.passwordChk(); //패스워드 유효성 체크
                //return true;
            }
        }

        //password 유효성 체크
        passwordChk(){
            let reqData : any = {};
            reqData['checkString'] = this.password; //패스워드
            reqData['checkSum'] = this.id; //ID
            let rtn : boolean = false;

            // api 데이터 호출
            CommonBoardService.postListDatas('validation/passwd', null, reqData).then((response) => {
                    let result: any = response.data;
                    if (result.code == '000') {
                        rtn = true;
                    }else{
                        Vue.swal({text:result.message}); //alert 메시지
                        rtn = false;
                    }
                    if(rtn == true){
                        //this.franchiseReg(); //첨부파일 등록
                        this.phonenumberChk() //휴대폰번호 기 등록여부 체크
                    }
                }
                , (error) => {
                    //console.log(error)
                    return rtn;
                }
            ).catch((response) =>  {
                //console.log('response code check!!');
                return rtn;
            });
            return rtn;
        }

        //공통 select box 조회
        getSelectList(code: string){
            if(code == ''){
                return;
            }

            let apiUrl : string = '';
            if(code == '0001' || code == '1000'){ //사업자구분:0001, 업종구분:1000
                apiUrl = 'pcodes/'+code+'/codes';
            }else if(code == '0003' || code == '0002') { //회사코드(택배사:0003, 신문사:0002)
                apiUrl = 'company-codes/upjong/' + code;
            }else if(code == 'SUBSAUP'){
                //reqData['searchType'] = 'SEARCH';
                apiUrl = 'company';
            }else if(code == 'UPJONG'){ //업종
                apiUrl = 'code/upjong';
            }

            // api 데이터 호출
            CommonBoardService.getListDatas(apiUrl, null, '').then((response) => {
                    let result: any = response.data;
                    //console.log(result)
                    if (result.length > 0) {
                        if(code == '0001'){ //사업자구분
                            this.saupGbnList = result;
                        }else if(code == '1000'){ //업종구분
                            this.upjongList = result;
                        }else if(code == '0003' || code == '0002'){ //회사코드
                            this.companyList = result;
                        }else if(code == 'SUBSAUP') {
                            this.subsaupList = result;
                        }else if(code == 'UPJONG'){
                            this.upjongCodeList = result;
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

        @Watch('upjongCode') onChange(){
            if(this.upjongCode == '0003') { //택배사는 택배사 회사코드 보임
                let obj = document.getElementById('companyViewChk');
                this.getSelectList('0003');
                if(obj != null) {
                    console.log('바뀜')

                    obj.children['0'].className = 'com_code';
                    obj.children['1'].className = 'com_code';

                    //obj.children['1'].children['0'].setAttribute('style', 'width:100%');
                    //obj.children['1'].setAttribute('colspan', '1');
                    //obj.children['2'].hidden = false;
                    //obj.children['3'].hidden = false;

                    //obj.children['2'].setAttribute('style', 'display:table-cell');
                    //obj.children['3'].setAttribute('style', 'display:');
                }
                /*
                let obj = document.getElementById('companyViewChk');
                this.getSelectList('0003');
                if(obj != null) {
                    obj.children['1'].children['0'].setAttribute('style', 'width:100%');
                    obj.children['1'].setAttribute('colspan', '1');
                    obj.children['2'].hidden = false;
                    obj.children['3'].hidden = false;
                    //obj.children['2'].setAttribute('style', 'display:table-cell');
                    //obj.children['3'].setAttribute('style', 'display:');
                }*/
                this.companyCode = ''; //회사코드 초기화
                this.upjongCodeNm = '택배사';
            }else if(this.upjongCode == '0002') { //신문사는 신문사 회사코드 보임
                let obj = document.getElementById('companyViewChk');
                this.getSelectList('0002');
                if(obj != null) {
                    obj.children['0'].className = 'com_code';
                    obj.children['1'].className = 'com_code';
                    // obj.children['1'].children['0'].setAttribute('style', 'width:100%');
                    // obj.children['1'].setAttribute('colspan', '1');
                    // obj.children['2'].hidden = false;
                    // obj.children['3'].hidden = false;
                    //obj.children['2'].setAttribute('style', 'display:table-cell');
                    //obj.children['3'].setAttribute('style', 'display:table-cell');
                }
                this.companyCode = ''; //회사코드 초기화
                this.upjongCodeNm = '신문사';
            }else{ //일반, 신문사는 회사코드 안보임
                let obj = document.getElementById('companyViewChk');
                if(obj != null) {
                    obj.children['0'].className = 'com_code codenone';
                    obj.children['1'].className = 'com_code codenone';
                    // obj.children['2'].hidden = true;
                    // obj.children['3'].hidden = true;
                    //obj.children['2'].setAttribute('style', 'display:none');
                    //obj.children['3'].setAttribute('style', 'display:none');
                    //obj.children['1'].setAttribute('colspan', '3');
                    //obj.children['1'].children['0'].setAttribute('style', 'width:36%');
                }

                if(this.upjongCode == '0001'){
                    this.upjongCodeNm = '일반';
                }else if(this.upjongCode == '0004'){
                    this.upjongCodeNm = '학원';
                }
            }
        }

        //취소
        franchiseCancel() {
            this.$router.replace('/home/main');
            //this.$router.go(-1)
        }

        //사업장 주소 팝업 보임
        addressBox1(text) {
            this.showModal1 = true;
            //this.postText = "서울시금천구";
        }

        //사업장 주소 셋팅
        setDataAddr1(data) {
            console.log(data)
            this.addr1 = data.addr;
            this.zipCode = data.zip;
        }

        uploadFile(event: any) { //파일 업로드
            this.file = '';
            this.uploadFileNm = '';
            this.file = event.target.files[0];
            this.uploadFileNm = this.file.name;
            console.log(this.file);
            //let formData = new FormData();
            //formData.append('file',this.file);
        }

        //사용자ID 중복확인
        chkUserId(id) {
            let idmsg = document.getElementById('id_msg');

            if(id == ''){
                Vue.swal({ text: '아이디를 확인하세요.'});
                return;
            }

            let reqData : any = { checkString : id, checkType : 'USER' };
;
            // api 데이터 호출
            CommonBoardService.postListDatas('validation/id', null, reqData).then((response) => {
                    let result: any = response.data;

                    if (result.code == '000') {
                        this.idYn = 'Y';
                        //alert('사용 가능한 아이디입니다.');
                        if(idmsg!=null){ idmsg.innerHTML = '사용 가능한 아이디입니다.'; }
                    }else{
                        this.idYn = '';
                        //alert('이미 등록된 아이디입니다. 다른 아이디를 사용해 주세요.');
                        if(idmsg!=null){ idmsg.innerHTML = result.message; }
                        return;
                    }
                }
                , (error) => {
                    console.log(error);
                    this.idYn = '';
                }
            ).catch((response) => {
                console.log(response);
                this.idYn = '';
                Vue.swal({text:'입력한 아이디를 확인하세요.'});
            });
        }

        //사용자 ID값 체크
        idInputChk() {
            if(this.id == ''){
                this.idYn = ''; //입력한 ID가 없으면 ID 중복체크값 초기화
            }
            let idmsg = document.getElementById('id_msg');
            if(idmsg != null){ idmsg.innerHTML = ''; } //화면에 메시지 제거

        }

        //사업자 구분(개인,법인) 체크
        saupIdChk() {
            if(this.saupId == ''){
                this.saupIdYn = ''; //입력한 사업자등록번호가 없으면 사업자등록번호 중복체크값 초기화
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

        sendMail() { //메일 발송

            //let dt = new Date();
            //let sendDate = moment(dt).format('YYYY-MM-DD HH:mm:ss'); //메일 발송일자
            //let regId = this.id;
            //let regNm = this.name;
            let imgsrc = environment.imgApiUrl+"/img/img_logo.07141310.png"; //로고
            let userUrl = environment.userUrl; //온라인 가맹점 사용자 URL

            let mailMessage : string = ''; //메일 메시지 내용
            mailMessage = "<html lang=\"ko\">\n" +
                "<head>\n" +
                "\t<meta charset=\"utf-8\">\n" +
                "</head>\n" +
                "<body>\n" +
                "<table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"width:100%;background-color:#f0f0f0;letter-spacing:0px\">\n" +
                "\t<tbody><tr><td align=\"center\">\n" +
                "    <div style=\"max-width:720px; margin:0 auto\">\n" +
                "\t\t<table cellpadding=\"0\" cellspacing=\"0\" style=\"width:100%;margin:40px auto;background-color:#fff; border:1px solid #dedede; border-top:2px solid #da291c; -webkit-text-size-adjust:100%;text-align:left\">\n" +
                "\t\t\t<tbody><tr><td width=\"30\"></td><td>\n" +
                "\t\t\t\t<table cellpadding=\"0\" cellspacing=\"0\" style=\"width:100%;margin:30px auto 0;background-color:#fff;-webkit-text-size-adjust:100%;text-align:left\">\n" +
                "\t\t\t\t<tbody><tr>\n" +
                "\t\t\t\t\t<td><a href=\"\" target=\"_blank\"><img :src="+imgsrc+" width=\"238\" height=\"28\" alt=\"케이티/롯데정보통신 현금영수증\" style=\"border:0;margin-right:5px;\"></a></td>\n" +
                "\t\t\t\t\t<td style=\"padding-top:10px; text-align:right; padding-right:0px;padding-bottom:13px;font-size:13px;font-family:'나눔고딕',NanumGothic,'맑은고딕',Malgun Gothic,'돋움',Dotum,Helvetica,'Apple SD Gothic Neo',Sans-serif;color:#939393;line-height:17px\"></td>\n" +
                "\t\t\t\t\t<td style=\"width:100px;text-align: right; padding-bottom:13px;font-size:20px;font-family:'나눔고딕',NanumGothic,'맑은고딕',Malgun Gothic,'돋움',Dotum,Helvetica,'Apple SD Gothic Neo',Sans-serif;color:#212121;line-height:17px;font-weight: bold;\"></td>\n" +
                "\t\t\t\t</tr>\n" +
                "\t\t\t\t</tbody>\n" +
                "\t\t\t\t</table>\n" +
                "\t\t\t</td><td width=\"30\"></td></tr>\n" +
                "\t\t\t<tr><td width=\"30\"></td><td style=\"vertical-align: top;\">\n" +
                "\t\t\t\t<table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"margin-top:60px;\">\n" +
                "\t\t\t\t<tbody>\n" +
                "\t\t\t\t<tr>\n" +
                "\t\t\t\t\t<td style=\"font-size:26px;font-family:'나눔고딕',NanumGothic,'맑은고딕',Malgun Gothic,'돋움',Dotum,Helvetica,'Apple SD Gothic Neo',Sans-serif;color:#212121; letter-spacing: -1px;\">[Hellocash 현금영수증] 관리자에 의한 신규 사용자 계정 생성 완료 메일</td>\n" +
                "\t\t\t\t</tr>\n" +
                "\t\t\t\t<tr>\n" +
                "\t\t\t\t\t<td style=\"font-size:14px;font-family:'나눔고딕',NanumGothic,'맑은고딕',Malgun Gothic,'돋움',Dotum,Helvetica,'Apple SD Gothic Neo',Sans-serif;color:#212121; padding-top:24px;\">안녕하세요.</td>\n" +
                "\t\t\t\t</tr>\n" +
                "\t\t\t\t<tr>\n" +
                "\t\t\t\t\t<td style=\"font-size:14px;font-family:'나눔고딕',NanumGothic,'맑은고딕',Malgun Gothic,'돋움',Dotum,Helvetica,'Apple SD Gothic Neo',Sans-serif;color:#939393; padding-top:20px;\">저희 KT 롯데정보통신 현금 영수증 서비스를 이용해 주시는 회원님께 감사 드립니다.<br>투명한 거래를 위한 KT 롯데 정보통신 현금영수증 사이트 신규 회원 가입이 완료되었습니다.</td>\n" +
                "\t\t\t\t</tr>\n" +
                "\t\t\t\t<tr>\n" +
                "\t\t\t\t\t<td style=\"font-size:14px;font-family:'나눔고딕',NanumGothic,'맑은고딕',Malgun Gothic,'돋움',Dotum,Helvetica,'Apple SD Gothic Neo',Sans-serif;color:#939393; padding-top:20px;\">아래 링크 주소를 클릭하여 비밀번호를 설정 하신 후 서비스를 이용해 주시기 바랍니다.</td>\n" +
                "\t\t\t\t</tr>\n" +
                "\t\t\t\t</tbody>\n" +
                "\t\t\t\t</table>\n" +
                "\t\t\t\t<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class=\"tbl_view02\" style=\"width:100%; border-top:1px solid #dedede; margin-top:20px\">\n" +
                "\t\t\t\t<colgroup>\n" +
                "\t\t\t\t\t<col width=\"30%\">\n" +
                "\t\t\t\t\t<col width=\"70%\">\n" +
                "\t\t\t\t</colgroup>\n" +
                "\t\t\t\t<tbody>\n" +
                "\t\t\t\t<tr>\n" +
                "\t\t\t\t\t<th scope=\"row\" style=\"font-family:'나눔고딕',NanumGothic,'맑은고딕',Malgun Gothic,'돋움',Dotum,Helvetica,'Apple SD Gothic Neo',Sans-serif; font-size:14px; color:#505050; height:50px; line-height: 50px; padding:0 18px 0 30px; border-right:1px solid #dedede; background:#fafafa; border-bottom:1px solid #dedede; text-align:left; vertical-align:top;\">ID</th>\n" +
                "\t\t\t\t\t<td style=\"font-family:'나눔고딕',NanumGothic,'맑은고딕',Malgun Gothic,'돋움',Dotum,Helvetica,'Apple SD Gothic Neo',Sans-serif; font-size:14px;color:#505050; height:50px; line-height: 50px; padding:0 18px 0 20px; background:#ffffff; border-bottom:1px solid #dedede; text-align:left; word-wrap:break-word;\">"+this.id+"</td>\n" +
                "\t\t\t\t</tr>\n" +
                "\t\t\t\t<tr>\n" +
                "\t\t\t\t\t<th scope=\"row\" style=\"font-family:'나눔고딕',NanumGothic,'맑은고딕',Malgun Gothic,'돋움',Dotum,Helvetica,'Apple SD Gothic Neo',Sans-serif; font-size:14px; color:#505050; height:50px; line-height: 50px; padding:0 18px 0 30px; border-right:1px solid #dedede; background:#fafafa; border-bottom:1px solid #dedede; text-align:left; vertical-align:top;\">이름</th>\n" +
                "\t\t\t\t\t<td style=\"font-family:'나눔고딕',NanumGothic,'맑은고딕',Malgun Gothic,'돋움',Dotum,Helvetica,'Apple SD Gothic Neo',Sans-serif; font-size:14px;color:#505050; height:50px; line-height: 50px; padding:0 18px 0 20px; background:#ffffff; border-bottom:1px solid #dedede; text-align:left; word-wrap:break-word;\">"+this.name+"</td>\n" +
                "\t\t\t\t</tr>\n" +
                "\t\t\t\t</tbody>\n" +
                "\t\t\t\t</table>\n" +
                "\t\t\t\t<table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"margin-top:0px; margin-bottom:150px;\">\n" +
                "\t\t\t\t<tbody>\n" +
                "\t\t\t\t<tr>\n" +
                "\t\t\t\t\t<td style=\"font-size:14px;font-family:'나눔고딕',NanumGothic,'맑은고딕',Malgun Gothic,'돋움',Dotum,Helvetica,'Apple SD Gothic Neo',Sans-serif;color:#939393; padding-top:15px;\">PW 초기화 링크 주소 :  <a href="+userUrl+" target=\"_blank\" style=\"color:#008aff;\">"+userUrl+"</a> (패스워드 변경 주소링크)</td>\n" +
                "\t\t\t\t</tr>\n" +
                "\t\t\t\t</tbody>\n" +
                "\t\t\t\t</table>\n" +
                "\t\t\t</td>\n" +
                "\t\t\t<td width=\"30\"></td></tr>\n" +
                "\t\t\t<tr><td colspan=\"3\" height=\"40\"></td></tr>\n" +
                "\t\t\t<tr><td colspan=\"3\" style=\"border-top:1px solid #dedede; padding-top:34px;padding-left:21px;padding-right:21px;padding-bottom:13px;background:#ffffff;font-size:12px;font-family:'나눔고딕',NanumGothic,'맑은고딕',Malgun Gothic,'돋움',Dotum,Helvetica,'Apple SD Gothic Neo',Sans-serif;color:#939393;line-height:22px\">\n" +
                "\t\t\t\t본 메일은 Hellocash 현금영수증 이용에 관한 안내와 공지를 위한 발신 전용 메일입니다.<br>\n" +
                "\t\t\t\t따라서 본 메일에는 수신거부 장치가 장착되어 있지 않습니다.<br>문의전화 02-2074-0340 / 팩스번호 : 02-2074-6089\n" +
                "\t\t\t\t</td></tr>\n" +
                "\t\t\t<tr><td colspan=\"3\" style=\"padding-left:21px;padding-right:21px;padding-bottom:37px;background:#ffffff;font-size:12px;font-family:Helvetica;color:#939393;line-height:17px\">\n" +
                "\t\t\t\t\tCopyright ⓒ 2019 KT corporation & LDCC. All rights reserved.\n" +
                "\t\t\t\t</td></tr>\n" +
                "\t\t</tbody></table>\n" +
                "        </div>\n" +
                "      </td></tr>\n" +
                "  </table>\n" +
                "\t</td></tr>\n" +
                "</tbody></table>\n" +
                "</body>\n" +
                "</html>";

            let reqData: any = {};
            reqData['to'] = [this.email]; //메일 수신자
            reqData['title'] = '[Hellocash 혐금영수증]관리자에 의한 신규 사용자 계정 생성 완료 메일'; //메일 제목
            reqData['message'] = mailMessage; //메일 내용
            reqData['cc'] = [''];

            // api 데이터 호출
            CommonBoardService.postListDatas('mail', null, reqData).then((response) => {
                    if (response.status.toString() == '201' || response.status.toString() == '200') { //메일 전송 완료
                        console.log('메일 발송 성공');
                        //console.log(response);
                    } else { //메일 전송 실패
                        console.log('메일 발송 실패');
                        //console.log(response);
                    }
                }
                , (error) => {
                    //this.$Progress.finish();
                    console.log(error);
                }
            ).catch();

        }

        //메일 주소 정규표현식 체크
        emailCheck( email ) {
            var regex=/([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
            return (email != '' && email != 'undefined' && regex.test(email));
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

        // 숫자 체크(숫자만 입력가능)
        numberChk(event:any){
            if (event.keyCode >= 48 && event.keyCode <= 57) { //숫자키만 입력
                return true;
            } else {
                event.preventDefault();
            }
        }

        //사업장 정보 조회
        saupInfo(saupId){
            if(saupId == null || saupId == ''){
                Vue.swal({text: '사업자등록번호를 입력하세요.'});
                return;
            }

            let regNumber = /^[0-9]*$/;
            if(!regNumber.test(this.saupId)){
                Vue.swal({ text: '숫자만가능합니다'});
                return;
            }

            CommonBoardService.getListDatas('saupjang',saupId,null).then(result=>{
                if(result.status==200){

                    console.log('사업장 정보 조회')
                    console.log(result.data)
                    //this.saupjang = result.data;
                    //this.saupIdChkYn = 'Y';

                    if(result.data != null && result.data != ""){
                        this.saupIdYn = 'Y';
                        this.saupId = result.data.saupId;
                        this.storeNm = result.data.shopNm;
                        this.repNm = result.data.chipNm;
                        this.repPhonenum = result.data.telNum.replace(/-/gi, "");
                        this.saupType  = this.nullCheck(result.data.regiGb);
                        this.lawNum = result.data.lawNum;
                        this.zipCode = result.data.zipCode;
                        this.addr1 = result.data.addr1;
                        this.addr2 = result.data.addr2;
                        this.upjongCode = this.nullCheck(result.data.upjong);
                        this.companyCode = this.nullCheck(result.data.subSaup);
                    }else{
                        Vue.swal({text: '등록된 사업장정보가 없습니다. 사업장등록번호를 확인하세요.'});
                        this.saupIdYn = '';
                        this.storeNm = "";
                        this.repNm = "";
                        this.repPhonenum = "";
                        this.saupType  = "";
                        this.lawNum = "";
                        this.zipCode = "";
                        this.addr1 = "";
                        this.addr2 = "";
                        this.upjongCode = "";
                        this.companyCode = "";
                    }
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
                }else{
                    Vue.swal({text: '등록된 사업장정보가 없습니다. 신규사업장으로 등록합니다.'});
                }
            },(error) => {
                //this.$Progress.finish();
                console.log(error);

            })
        }

        validationCheck(val,type){
            let regNumber = /^[0-9]*$/;
            if(type=='number'){
                if(!regNumber.test(val)){
                    Vue.swal({ text: '숫자만가능합니다'});
                    return 'N';
                }
            }
            else{
            }
        }
    }
</script>
