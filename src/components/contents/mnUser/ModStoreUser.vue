<template>

    <!-- container -->
    <section id="container">
        <!-- content  -->
        <div class="content">
            <h2 class="blind">사용자 계정 조회</h2>

            <h3>사용자 계정 조회</h3>

            <h4>사업장 기본 정보 <span class="sub_cf">(사업자 등록증 상의 정보)</span></h4>

            <p class="req_info type01">(<em class="form_req">*</em>)는 필수항목입니다.</p>

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
                        <th scope="row">사업자등록번호<em class="form_req">*</em></th>
                        <td>
                            <input type="text" class="input form_industry" title="사업자등록번호 입력" disabled="disabled" v-model="saupId">
                            <p class="info_msg2" id="saupid_msg"></p> <!-- 메시지 표시 -->
                        </td>
                        <th scope="row">사업장명<em class="form_req">*</em></th>
                        <td class="vtop"><input type="text" class="input form_w100" title="사업장명 입력" v-model="storeNm" maxlength="30"></td>
                    </tr>
                    <tr>
                        <th scope="row">대표자명<em class="form_req">*</em></th>
                        <td class="vtop"><input type="text" class="input form_w100" title="대표자명 입력" v-model="repNm" maxlength="20"></td>
                        <th scope="row">전화번호<em class="form_req">*</em></th>
                        <td>
                            <input type="text" class="input form_w100" title="전화번호 입력" v-model="repPhonenum" @keyup="changeRepPhonenum" maxlength="12">
                            <p class="info_msg2" id="saupid_msg"></p> <!-- 메시지 표시 -->
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">사업자구분<em class="form_req">*</em></th>
                        <td class="vtop">
                            <select id="" name="" class="select form_w100" title="사업자 선택" v-model="saupType" disabled="disabled">
                                <option value="">선택</option>
                                <option value="2">개인</option>
                                <option value="1">법인</option>
                                <!--<template v-for="datas in saupGbnList">
                                    <option v-bind:value=datas.code>{{datas.codeName}}</option>
                                </template>-->
                            </select>
                        </td>
                        <th scope="row"><template v-if="saupType=='1'">법인등록번호<em class="form_req">*</em></template></th>
                        <td>
                            <input type="text" class="input form_w100" title="법인등록번호 입력" v-model="lawNum" disabled="disabled">
                            <p class="info_msg2" id="saupid_msg"></p> <!-- 메시지 표시 -->
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">계정상태<em class="form_req">*</em></th>
                        <td colspan="3">
                            <span style="vertical-align: bottom">{{statusNm}}</span>
                            <template v-if="status !='6'">
                                <span class="chk_box" id="ts" style="margin-left: 50px;" ><input type="checkbox"  @click="useStop($event)"><label for="ts">사용중지</label></span>
                            </template>
                        </td>
                    </tr>
                    <tr v-if="saupjangSajin">
                        <th scope="row">사업자등록증 확인</th>
                        <td class="con01" colspan="3">
                            <a href="#" class="link02" v-on:click="downloadFile">사업자등록증 다운로드</a>
                        </td>
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
                    <tr>
                        <th scope="row">업종구분<em class="form_req">*</em></th>
                        <td colspan="1">
                            <select id="upjongCodeID" name="" class="select form_w100" title="업종 선택" v-model="upjongCode">
                                <option value="">선택</option>
                                <template v-for="datas in upjongList">
                                    <option v-bind:value=datas.code>{{datas.codeNm}}</option>
                                </template>
                            </select>
                        </td>
                        <th scope="row" class="com_code codenone">회사코드<em class="form_req">*</em></th>
                        <td colspan="1" class="com_code codenone">
                            <select id="subSaupID" name="" class="select form_w100" title="업종구분 상세" v-model="subSaup">
                                <option value="">선택</option>
                                <template v-for="datas in companyList">
                                    <option v-bind:value=datas.code>{{datas.name}}</option>
                                </template>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">BL 정보</th>
                        <td>
                            <select id="blGbID" name="" class="select form_w100" title="BL 정보" v-model="blGb" disabled="disabled">
                                <option value="">선택</option>
                                <!--<option value="0">BL 적용</option>-->
                                <!--<option value="1">BL 해지</option>-->
                                <template v-for="datas in blcodeList">
                                    <option v-bind:value=datas.code>{{datas.codeNm}}</option>
                                </template>
                            </select>
                        </td>
                        <th scope="row">사업장 등록일</th>
                        <td><input type="text" class="input form_w100" title="사업장 등록일" disabled="disabled" v-model="regDt"></td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <!-- //tbl view box -->

            <div class="btn_tbl_bot">
                <button type="button" id="" class="btn_m01 bg01" v-on:click="getEncrptId">비밀번호 초기화</button>
            </div>

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
                        <td class="vtop"><input type="text" class="input form_name" title="이름" disabled="disabled" v-model="name"></td>
                        <th scope="row">휴대폰번호<em class="form_req">*</em></th>
                        <td>
                            <input type="text" class="input form_w100" title="휴대폰번호 입력" disabled="disabled" v-model="phoneNum">
                            <p class="info_msg2" id="saupid_msg"></p> <!-- 메시지 표시 -->
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">ID<em class="form_req">*</em></th>
                        <td class="vtop">
                            <input type="text" class="input form_w100" title="ID 입력" disabled="disabled" v-model="id">
                            <p class="info_msg2" id="saupid_msg"></p> <!-- 메시지 표시 -->
                        </td>
                        <th scope="row">이메일주소<em class="form_req">*</em></th>
                        <td class="vtop">
                            <input type="text" class="input form_w100" title="이메일주소 입력" v-model="email" maxlength="30">
                            <p class="info_msg2" id="saupid_msg"></p> <!-- 메시지 표시 -->
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">사용자 등록일</th>
                        <td><input type="text" class="input form_w100" title="사용자 등록일 입력" disabled="disabled" v-model="accRegDt"></td>
                        <th scope="row">최종접속일시</th>
                        <td><input type="text" class="input form_w100" title="최종접속일시" disabled="disabled" v-model="lastConnDt"></td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <!-- //tbl view box -->

            <!-- btn tbl bot -->
            <!--<div class="btn_tbl_bot">
                <button type="button" id="" class="btn_m01 bg01" v-on:click="cancelId">ID 계정 해지</button>
            </div>-->

            <!-- btn bot -->
            <div class="btn_bot cols">
    
                <template v-if="status=='0'">
                    <button type="button" id="" class="btn_b01 bg02" v-on:click="cancelModify">취소</button>
                    <button type="button" id="" class="btn_b01 bg01" v-on:click="dataValidation('10')" >정보변경</button>
                    <button type="button" id="" class="btn_b01 bg01" v-on:click="dataValidation('1')" >승인</button>
                </template>
                <template v-if="status=='1'">
                    <button type="button" id="" class="btn_b01 bg02" v-on:click="cancelModify">취소</button>
                    <button type="button" id="" class="btn_b01 bg01" v-on:click="dataValidation('10')" >정보변경</button>
                    <button type="button" id="" class="btn_b01 bg01" v-on:click="dataValidation('3')" >해지</button>
                </template>
                <template v-if="status=='2'">
                    <button type="button" id="" class="btn_b01 bg02" v-on:click="cancelModify">취소</button>
                    <button type="button" id="" class="btn_b01 bg01" v-on:click="dataValidation('10')" >정보변경</button>
                    <button type="button" id="" class="btn_b01 bg01" v-on:click="dataValidation('1')" >정상</button>
                    <button type="button" id="" class="btn_b01 bg01" v-on:click="dataValidation('3')" >해지</button>
                </template>
                <template v-if="status=='3'">
                    <button type="button" id="" class="btn_b01 bg02" v-on:click="cancelModify">취소</button>
                    <button type="button" id="" class="btn_b01 bg01" v-on:click="dataValidation('10')" >정보변경</button>
                </template>
                <template v-if="status=='4'">
                    <button type="button" id="" class="btn_b01 bg02" v-on:click="cancelModify">취소</button>
                    <button type="button" id="" class="btn_b01 bg01" v-on:click="dataValidation('10')" >정보변경</button>
                </template>
                <template v-if="status=='5'">
                    <button type="button" id="" class="btn_b01 bg02" v-on:click="cancelModify">취소</button>
                    <button type="button" id="" class="btn_b01 bg01" v-on:click="dataValidation('10')" >정보변경</button>
                </template>
                <template v-if="status=='6'">
                    <button type="button" id="" class="btn_b01 bg02" v-on:click="cancelModify">취소</button>
                    <button type="button" id="" class="btn_b01 bg01" v-on:click="dataValidation('10')" >정보변경</button>
                    <button type="button" id="" class="btn_b01 bg01" v-on:click="dataValidation('1')" >정상</button>
                    <button type="button" id="" class="btn_b01 bg01" v-on:click="dataValidation('3')" >해지</button>
                </template>
            </div>
            <AddressBox v-if="showModal1" v-bind:postData="postText" v-on:selectedValue="setDataAddr1" @close="showModal1 = false"></AddressBox>
        </div>
        <!--<KmcConfirm v-if="showConfirm" v-on:closeKcm="closeMove"></KmcConfirm>-->
        <!-- //content -->
    </section>
    <!-- //container -->


</template>

<script lang="ts">
    import {Component, Vue, Watch} from 'vue-property-decorator'; // 뷰 cli;
    import {CommonBoardService} from "../../../api/common.service"; // 본인인증
    import AddressBox from '@/components/common/addressBox/addressBox.vue';
    //import KmcConfirm from '../../common/kmc/kmcConfirm.vue';
    import axios from 'axios';
    import {environment} from '../../../utill/environment';
    import moment from 'moment'
    Vue.prototype.moment = moment;

    @Component({
        components: {
            AddressBox
        }
    })
    export default class  ModStoreUser  extends  Vue{

        //본인인증
        showConfirm: boolean = false;
        confirmResult: boolean = false;
        checkVal : boolean = false;
        saupId : any = ''; //사업자등록번호
        storeNm : any = ''; //사업장명
        repNm : any = ''; //대표자명
        repPhonenum : any = ''; //대표 전화번호
        saupType : any = ''; //사업자구분
        lawNum : any = ''; //법인번호
        status : any = ''; //계정상태
        statusNm : string = ''; // 상태명
        oldStatus : any = ''; //이전 계정상태
        zipCode : any = ''; //우편번호
        addr1 : any = ''; //주소
        addr2 : any = ''; //상세주소
        upjongCode : any = ''; //업종구분
        upjongCodeNm : any = ''; //업종구분명
        subSaup : any = ''; //회사코드(신문사, 택배사 경우)
        blGb : any = ''; //BL명
        blGbNm : any = ''; //BL명
        name : any = ''; //이름
        phoneNum : any = ''; //휴대폰번호
        id : any = ''; //id
        role : any = ''; //role
        //password : any = ''; //비밀번호
        //passwordCon : any = ''; //비밀번호 확인
        email : any = ''; //이메일
        saupFileNm : any = ''; //사업자등록증
        lastConnDt : any = ''; //최근접속일자
        passChk : boolean = false;
        regDt : any = ''; //사업자 등록일
        accRegDt : any = ''; //사용자등록일

        //select box 객체
        saupGbnList: any = []; //사업자구분
        upjongList: any = []; //업종구분
        companyList: any = []; //회사코드
        blcodeList: any = []; //bl코드

        postText : any = '';
        showModal1: boolean = false; // 사업장 주소

        objectKey : any = "";

        saupjangSajin : boolean = false; //사업자등록증 뷰 여부

        encryptId : string = ''; //암호화된 ID

        created() {

            this.objectKey = this.$route.params.reqParams;

            if(!this.objectKey) {
                Vue.swal({text:'접근할수 없습니다'})
                //this.$router.push({name: 'mnUser'});
                this.$router.push('/home/mnUser');
            }

            console.log('넘어온값 확인')
            console.log(this.objectKey)

            //this.getSelectList('0001'); //사업자구분
            this.getSelectList('UPJONG'); //업종구분
            this.getSelectList('SUBSAUP'); //회사코드
            this.getSelectList('BL'); //BL코드

            this.infoDetail(); //상세조회

        }

        mounted() {

            // this.getSelectList('0001'); //사업자구분
            // this.getSelectList('UPJONG'); //업종구분
            // this.getSelectList('SUBSAUP'); //회사코드
            // this.getSelectList('BL'); //BL코드

        }

        useStop(event){
            if(event.target.checked==true){
                this.checkVal = true;
            }else{
                this.checkVal = false;
            }
        }

        infoDetail(){

            let reqId : string = this.objectKey.row.id;
            let reqRole : string = this.objectKey.row.role;

            this.role = this.objectKey.row.role;

            //let accountId : string = sessionStorage.accountId;
            //accountId = 'minitest';

            let reqData : any = { id : reqId, role : reqRole };

            // api 데이터 호출
            CommonBoardService.getListDatas('accounts/storemember/'+reqId, null, reqData).then((response) => {
                    //console.log('1111111111111')
                    let result: any = response.data;
                    console.log(result)
                    if (result != null) {
                        //console.log('조회 성공');

                        this.saupId = this.saupnoFormat(result.saupId);
                        this.storeNm = result.storeNm;
                        this.repNm = result.repNm;
                        this.repPhonenum = result.repPhonenum;
                        this.saupType = result.saupType;
                        this.lawNum = result.lawNum;
                        this.status = result.status;
                        this.statusNm = result.statusNm
                        this.oldStatus = result.status;
                        this.zipCode = result.zipCode;
                        this.addr1 = result.addr1;
                        this.addr2 = result.addr2;
                        this.upjongCode = result.upjongCode;
                        this.subSaup = result.companyCode;
                        this.blGb = result.blGb;
                        this.saupFileNm = result.saupFileNm;
                        if(this.status == '0' && result.saupFileNm != null && result.saupFileNm != ''){ //승인대기이고 파일이 있으며
                            this.saupjangSajin = true;
                        }

                        if(sessionStorage.role == '0001' ){ //시스템 관리자만 BL정보 수정가능
                            let blGbn = document.getElementById('blGbID');
                            if(blGbn!=null){ blGbn.removeAttribute('disabled'); }
                        }

                        let upjong : any = '001,002,003,004,005,006,007,008';
                        if(upjong.indexOf(result.upjongCode) < 0){
                            this.upjongCode = '000';
                        }

                        //this.blGbNm = result.blGbNm;
                        //사용자에서는 업종구분 수정 불가능
                        //let obj = document.getElementById('upjongCodeID');  //업종구분
                        //if(obj!=null){ obj.setAttribute('disabled', 'disabled'); }
                        //let obj2 = document.getElementById('subSaupID'); //회사코드
                        //if(obj2!=null){ obj2.setAttribute('disabled', 'disabled'); }
                        //console.log(result.accRegDt)
                        //사용자
                        this.name = result.name;
                        this.phoneNum = result.phoneNum;
                        this.id = result.id;
                        this.email = result.email;
                        this.regDt = this.dateFormat_hms(result.regDt); //사업장 등록일
                        //this.password = result.password;
                        this.lastConnDt = this.dateFormat_hms(result.lastConnDt); //최종접속일시
                        this.accRegDt = this.dateFormat_hms(result.accRegDt); //사용자 등록일
                    } else {
                        //console.log('조회 실패');
                    }
                }
                , (error) => {
                    //console.log(error)
                }
            ).catch((response) =>  {
                //console.log('response code check!!');
            });

        }

        @Watch('repPhonenum1') changeRepPhonenum1(){
            let regNumber = /^[0-9]*$/;
            if(!regNumber.test(this.repPhonenum)){
                Vue.swal({ text: '숫자만가능합니다'});
                this.repPhonenum = '';
            }
        }

        changeRepPhonenum(){
            let regNumber = /^[0-9]*$/;
            if(!regNumber.test(this.repPhonenum)){
                Vue.swal({ text: '숫자만가능합니다'});
                this.repPhonenum = '';
            }
        }

        //공통 select box 조회
        getSelectList(code: string){
            if(code == ''){
                return;
            }

            let apiUrl : string = '';
            if(code == '0001' || code == '1000'){ //사업자구분:0001, 업종구분:1000
                apiUrl = 'pcodes/'+code+'/codes';
            }else if(code == '0003' || code == '0002'){ //회사코드(택배사:0003, 신문사:0002)
                apiUrl = 'company-codes/upjong/'+code;
            }else if(code == 'SUBSAUP'){
                //reqData['searchType'] = 'SEARCH';
                apiUrl = 'company';
            }else if(code == 'UPJONG'){ //업종
                apiUrl = 'code/upjong';
            }else if(code = 'BL'){
                apiUrl = 'code/bl';
            }

            // api 데이터 호출
            CommonBoardService.getListDatas(apiUrl, null, '').then((response) => {
                    let result: any = response.data;
                    //console.log(result)
                    if (result.length > 0) {
                        if(code == '0001'){ //사업자구분
                            this.saupGbnList = result;
                        }else if(code == '1000'){ //업종구분
                            //this.upjongList = result;
                        }else if(code == '0003' || code == '0002'){ //회사코드(003-택배사, 0002-신문사)
                            //this.companyList = result;
                        }else if(code == 'SUBSAUP') {
                            this.companyList = result;
                        }else if(code == 'UPJONG'){
                            this.upjongList = result;
                        }else if(code = 'BL'){
                            this.blcodeList = result;
                        }

                    } else {
                        //console.log(result)
                    }
                }
                , (error) => {
                }
            ).catch();

        }

        // 날짜 포맷
        dateFormat(val: string){
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

        @Watch('upjongCode') onChange(){
            //if(this.upjongCode == '0003') { //택배사는 택배사 회사코드 보임
            //let obj = document.getElementById('companyViewChk');

            //this.getSelectList('0003');
            //if(obj != null) {
            //obj.children['0'].className = 'com_code';
            //obj.children['1'].className = 'com_code';
            //obj.children['1'].children['0'].setAttribute('style', 'width:100%');
            //obj.children['1'].setAttribute('colspan', '1');
            //obj.children['2'].hidden = false;
            //obj.children['3'].hidden = false;
            //}
            //this.subSaup = ''; //회사코드 값 초기화
            //}else if(this.upjongCode == '0002') { //신문사는 신문사 회사코드 보임
            //let obj = document.getElementById('companyViewChk');

            //this.getSelectList('0002');
            //if(obj != null) {
            //obj.children['0'].className = 'com_code';
            //obj.children['1'].className = 'com_code';
            // obj.children['1'].children['0'].setAttribute('style', 'width:100%');
            // obj.children['1'].setAttribute('colspan', '1');
            // obj.children['2'].hidden = false;
            // obj.children['3'].hidden = false;
            //}
            //this.subSaup = ''; //회사코드 값 초기화
            //}else{ //일반, 신문사는 회사코드 안보임
            //let obj = document.getElementById('companyViewChk');

            //if(obj != null) {
            //obj.children['0'].className = 'com_code codenone';
            //obj.children['1'].className = 'com_code codenone';
            // obj.children['2'].hidden = true;
            // obj.children['3'].hidden = true;
            // obj.children['1'].setAttribute('colspan', '3');
            // obj.children['1'].children['0'].setAttribute('style', 'width:36%');
            //}
            //}
        }

        //정보변경
        updFranciseInfo(){

            //본인인증 여부 확인
            /*if(this.confirmResult==false){
                alert('본인인증 후 정보변경이 가능합니다.');
                this.showConfirm = true;
                return;
            }*/

            let reqData : any = {};
            let rep = this.saupId
            reqData['saupId'] = rep.replace(/-/gi,""); //사업자등록번호
            reqData['storeNm'] = this.storeNm; //사업장명
            reqData['repNm'] = this.repNm; //대표자명
            reqData['repPhonenum'] = this.repPhonenum; //대표자 전화번호
            reqData['status'] = this.status; //계정상태
            reqData['zipCode'] = this.zipCode; //우편번호
            reqData['addr1'] = this.addr1; //주소
            reqData['addr2'] = this.addr2; //상세주소
            reqData['upjongCode'] = this.upjongCode; //업종코드
            reqData['subSaup'] = this.subSaup; //회사코드
            //사용자 정보
            reqData['email'] = this.email; //이메일

            let accountId : string = this.objectKey.row.id;
            //accountId = 'minitest';

            // // api 데이터 호출
            CommonBoardService.putListData('accounts/storemember/'+accountId, null, reqData).then((response) => {
                    let result: any = response.data;
                    //console.log(result)
                    if (result != null) {
                        Vue.swal({text:'사용자 계정 정보가 변경되었습니다.'});
                        if(this.status == '1' && this.oldStatus == '0'){ //계정 승인 처리시
                            this.sendMailAprv();
                        }
                        this.$router.push({name:'mnUserList'})
                        //this.confirmResult = false; //다시 수정시 본인인증 진행
                    } else {
                        Vue.swal({text:'사용자 정보 변경 중 오류가 발생하였습니다.'});
                        //this.confirmResult = false; //다시 수정시 본인인증 진행
                    }
                }
                , (error) => {
                    //console.log(error);
                    Vue.swal({text:'사용자 정보 변경 중 오류가 발생하였습니다.'});
                }
            ).catch();

        }
        //정보 변경시 validation 체크
        dataValidation(val) {

            if(val=='10') {
                if(this.checkVal==true){
                    this.status='6'
                }
            }else{
                this.status=val
            }
            
            let regNumber = /^[0-9]*$/;

            if(this.storeNm == '') {
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
            }else if(this.status == null || this.status == '') {
                Vue.swal({text:'계정상태를 선택하세요.'});
                return false;
                /*
                }else if(this.saupType == '') {
                    alert('사업자구분을 선택하세요.');
                    return false;
                }else if(this.lawNum == '') {
                    alert('법인등록번호를 입력하세요.');
                    return false;
                */
            }else if(this.addr1 == '') {
                Vue.swal({text:'사업장 주소를 입력하세요.'});
                return false;
            }else if(this.zipCode == '') {
                Vue.swal({text:'사업장 우편번호를 입력하세요.'});
                return false;
            }else if(this.addr2 == '') {
                Vue.swal({text:'사업장 상세주소를 입력하세요.'});
                return false;
            }else if(this.upjongCode == null || this.upjongCode == '') { //업종구분 변경 안됨(20181210)
                Vue.swal({text:'업종구분을 선택하세요.'});
                return false;
                //업종구분 변경 안됨(20181210)
            //}else if((this.upjongCode == '0003' || this.upjongCode == '0002') && this.subSaup == '') { //업종구분이 택배사(0003), 신문(0002) 경우에만 체크
                //업종구분이 택배사, 학원인 경우 업종구분 상세 표시
                //alert('회사코드를 선택하세요.');
                //return false;
            }else if(this.subSaup == null || this.subSaup == '') {
                Vue.swal({text:'회사코드를 선택하세요.'});
                return false;
            //}else if(this.blGb == null || this.blGb == '') {
            //    Vue.swal({text:'BL정보를 선택하세요.'});
            //    return false;
            }else if(this.email == '') {
                Vue.swal({text:'이메일 주소를 입력하세요.'});
                return false;
            }else if(this.email != '' && !this.emailCheck(this.email)) {
                Vue.swal({text:'입력하신 메일 주소가 올바르지 않습니다.\n메일 주소를 확인하세요.'});
                return false;
            }else{

                this.updFranciseInfo();
                //this.passwordChk();
                //return true;
            }

        }
        //가맹점 계정 해지
        cancelAccount() {

            if(!confirm('가맹점을 해지하시면 국세청에 본 사업자의 현금영수증 가맹이 해지됩니다. 가맹점 해지 후에는 재가입을 하여야 현금영수증을 발행할 수 있고 지금까지의 발급 내역은 삭제됩니다.\n가맹점 해지신청을 하시겠습니까?')){
                return false;
            }

            let accountId : string = sessionStorage.accountId;; //사업장번호
            //let accountId : string = 'test';
            //console.log('cancelAccount :: '+accountId);

            // api 데이터 호출
            CommonBoardService.putListData('members/'+accountId, null, null).then((response) => {
                    let result: any = response.data;
                    //console.log(result)
                    if (result != null) {

                    } else {
                        //console.log(result)
                    }
                }
                , (error) => {
                }
            ).catch((response) => {
                console.log(response);
            });

        }
        //ID 계정 해지
        cancelId() {

            //본인인증 여부 확인
            /*if(this.confirmResult==false){
                alert('본인인증 후 정보변경이 가능합니다.');
                this.showConfirm = true;
                return;
            }*/

            if(!confirm('계정을 해지하시면 본 사업자의 국세청 현금영수증 가맹은 유지되고, 계정만 해지됩니다. 계정을 해지할 경우 지금까지의 발급 내역은 삭제됩니다.\n계정을 해지하시겠습니까?')){
                return false;
            }

            let reqId : string = this.objectKey.row.id;
            let reqRole : string = this.objectKey.row.role;

            let reqData : any = { id : reqId , role : reqRole };

            console.log('최종 param')
            console.log(reqData)

            // api 데이터 호출
            CommonBoardService.deleteListDatas('accounts/'+reqId, null, reqData).then((response) => {
                    let result: any = response.data;
                    //console.log(result)
                    if (result != null) {
                        Vue.swal({text:'ID 계정이 해지되었습니다.'});
                        this.$store.dispatch('LOGOUT')
                            .then(() => this.$router.push('home/main') )
                            .catch(({message}) => {} )
                    } else {
                        Vue.swal({text:'ID 계정이 해지시 오류가 발생하였습니다.'});
                        //this.confirmResult = false; //다시 수정시 본인인증 진행
                    }
                }
                , (error) => {
                    console.log(error);
                }
            ).catch((response) => {
                console.log(response);
            });
        }

        //password 유효성 체크
        passwordChk(){
            /*
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
                        alert(result.message); //alert 메시지
                        rtn = false;
                    }
                    if(rtn == true){
                        this.updFranciseInfo();
                    }
                    //return rtn;
                }
            ).catch((response) =>  {
                //console.log('response code check!!');
            });
            // if(rtn == true){
            //     this.updFranciseInfo();
            // }
            */
        }

        //비밀번호 초기화
        initPassword2(){

            let reqData : any = {
                to : [this.email],
                title : '현금영수증 비밀번호 초기화 안내 메일입니다.',
                message : '현금영수증 비빌번호 초기화 안내입니다.\nhttps://www.hellocash.co.kr/ 에서 비밀번호 초기화 하세요.',
                cc : [''],
            };
            // api 데이터 호출
            CommonBoardService.postListDatas('mail', null, reqData).then((response) => {
                    console.log(response);
                    if (response.status.toString() == '201'|| response.status.toString() == '200') { //메일 전송 완료
                        Vue.swal({text: '비밀번호 초기화 관련 메일 발송이 완료되었습니다.\n발송된 메일을 확인하세요.'});
                    }
                }
                , (error) => {
                    //this.$Progress.finish();
                    console.log(error);
                }
            ).catch();

        }

        cancelModify() {
            this.$router.push({name:'mnUserList'})
        }

        //사업장 주소 팝업 보임
        addressBox1(text) {
            this.showModal1 = true;
            //this.postText = "서울시금천구";
        }

        //사업장 주소 셋팅
        setDataAddr1(data) {
            //console.log(data)
            this.addr1 = data.addr;
            this.zipCode = data.zip;
        }

        //메일 주소 정규표현식 체크
        emailCheck( email ) {
            var regex=/([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
            return (email != '' && email != 'undefined' && regex.test(email));
        }

        closeMove(response) {
            this.showConfirm = false;
            if(response){
                if (response.success == 'Y') {
                    //console.log('본인인증 응답 결과')
                    //console.log(response.birthday + ' | ' + response.gender + ' | ' + response.name + ' | ' + response.phoneNo)
                    this.confirmResult = true;
                }
                else {
                    this.confirmResult = false;
                }
            }
        }

        dateFormat_hms(data){
            if(data == null || data == ''){
                return '';
            }else {
                return moment(data, 'YYYYMMDDHHmmss').format('YYYY.MM.DD HH:mm:ss')
            }
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

        downloadFile(){

            console.log('사업자등록증 파일 다운로드');
            //this.rowData = data.row;            //파일 다운로드
            let fileName : string = this.saupFileNm;
            axios({
                url: environment.apiUrl +"/file/"+fileName,
                method: 'GET',
                responseType: 'blob', // important
                headers: {"x-auth-token": sessionStorage.accessToken}
            }).then((response) => {
                console.log(response)
                // It is necessary to create a new blob object with mime-type explicitly set
                // otherwise only Chrome works like it should
                var newBlob = new Blob([response.data],{type: 'application/xlsx'})

                // IE doesn't allow using a blob object directly as link href
                // instead it is necessary to use msSaveOrOpenBlob
                if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                    window.navigator.msSaveOrOpenBlob(newBlob,fileName)
                    return
                }

                // For other browsers:
                // Create a link pointing to the ObjectURL containing the blob.
                const data = window.URL.createObjectURL(newBlob)
                var link = document.createElement('a')
                link.href = data
                link.download = fileName
                link.click()
                setTimeout(function () {
                    // For Firefox it is necessary to delay revoking the ObjectURL
                    window.URL.revokeObjectURL(data)
                }, 100)
            })
            //this.popComfirm();
        }

        removeAccount(){
            let reqData : any = { role : this.role };

            // api 데이터 호출(계정 정보 수정)
            CommonBoardService.deleteListData('accounts', this.id, reqData).then((response) => {
                    let result: any = response.data;
                    //console.log(result);
                    if (result.code == '000') {
                        //계정 해지 완료
                        //this.$router.push({ name:'mnUserList' , params: { objectKey : reqData } }) // 라우터 주소를 넣어줘야 히스토리모드 인식
                        //this.$router.push({name:'mnUserList'})
                        this.$router.push('/home/mnUser');
                    } else {
                        Vue.swal({text:'계정 해지에 실패하였습니다. 다시 시도하세요.'});
                        return;
                    }
                }
                , (error) => {
                    //console.log(error);
                }
            ).catch((response) => {
                //console.log(response);
            });

        }

        //암호화 ID 조회
        getEncrptId(){

            CommonBoardService.getListData('code/uuid', this.id, null).then((response) => {
                    let result: any = response.data;
                    //console.log(response);
                    //console.log(result);
                    if (response.status == 200 || response.status == 201) {
                        this.encryptId = result.code;
                        this.initPassword(); //실제 메일 발송
                    } else {
                        Vue.swal({text:'메일 발송에 실패하였습니다. 다시 시도하세요.'});
                    }
                }
                , (error) => {
                    //console.log(error);
                }
            ).catch((response) => {
                //console.log(response);
            });
        }

        initPassword() { //메일 발송

            //let account : any = this.account;
            //let dt = new Date();
            //let sendDate = this.nowTimehms;
            //let regId = this.id;
            //let regNm = this.name;
            let imgsrc = environment.imgApiUrl+"/img/img_logo.07141310.png"; //로고
            let userUrl = environment.userUrl+"/#/home/regPassEmail?id="+this.encryptId; //온라인 가맹점 사용자 URL

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
                "\t\t\t\t\t<td style=\"font-size:26px;font-family:'나눔고딕',NanumGothic,'맑은고딕',Malgun Gothic,'돋움',Dotum,Helvetica,'Apple SD Gothic Neo',Sans-serif;color:#212121; letter-spacing: -1px;\">[Hellocash 현금영수증] 관리자에 의한 비밀번호 초기화 안내 메일</td>\n" +
                "\t\t\t\t</tr>\n" +
                "\t\t\t\t<tr>\n" +
                "\t\t\t\t\t<td style=\"font-size:14px;font-family:'나눔고딕',NanumGothic,'맑은고딕',Malgun Gothic,'돋움',Dotum,Helvetica,'Apple SD Gothic Neo',Sans-serif;color:#212121; padding-top:24px;\">안녕하세요.</td>\n" +
                "\t\t\t\t</tr>\n" +
                "\t\t\t\t<tr>\n" +
                "\t\t\t\t\t<td style=\"font-size:14px;font-family:'나눔고딕',NanumGothic,'맑은고딕',Malgun Gothic,'돋움',Dotum,Helvetica,'Apple SD Gothic Neo',Sans-serif;color:#939393; padding-top:20px;\">저희 KT 롯데정보통신 현금 영수증 서비스를 이용해 주시는 회원님께 감사 드립니다.</td>\n" +
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
                "\t\t\t\t\t<td style=\"font-size:14px;font-family:'나눔고딕',NanumGothic,'맑은고딕',Malgun Gothic,'돋움',Dotum,Helvetica,'Apple SD Gothic Neo',Sans-serif;color:#939393; padding-top:15px;\">PW 초기화 링크 주소 :  <a :href="+userUrl+" target=\"_blank\" style=\"color:#008aff;\">"+userUrl+"</a> (패스워드 변경 주소링크)</td>\n" +
                "\t\t\t\t</tr>\n" +
                "\t\t\t\t<tr>\n" +
                "\t\t\t\t\t<td style=\"font-size:14px;font-family:'나눔고딕',NanumGothic,'맑은고딕',Malgun Gothic,'돋움',Dotum,Helvetica,'Apple SD Gothic Neo',Sans-serif;color:#939393; padding-top:20px;\">(* PW 초기화 링크 주소가 클릭되지 않을때 마우스로 복사해서 주소창에 넣고 변경해 주세요.)</td>\n" +
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

            let reqData : any = {
                to : [this.email],
                title : '[Hellocash 현금영수증]비밀번호 초기화 안내 메일',
                message : mailMessage,
                cc : [''],
            };
            // api 데이터 호출
            CommonBoardService.postListDatas('mail', null, reqData).then((response) => {
                    console.log(response);
                    if (response.status.toString() == '201'|| response.status.toString() == '200') { //메일 전송 완료
                        Vue.swal({text: '비밀번호 초기화 관련 메일 발송이 완료되었습니다.\n발송된 메일을 확인하세요.'});
                    }
                }
                , (error) => {
                    //this.$Progress.finish();
                    console.log(error);
                }
            ).catch();

        }

        //승인처리시 메일 발송
        sendMailAprv() { //메일 발송

            //let account : any = this.account;
            //let dt = new Date();
            //let sendDate = this.nowTimehms;
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
                "\t\t\t\t\t<td style=\"font-size:26px;font-family:'나눔고딕',NanumGothic,'맑은고딕',Malgun Gothic,'돋움',Dotum,Helvetica,'Apple SD Gothic Neo',Sans-serif;color:#212121; letter-spacing: -1px;\">[Hellocash 현금영수증] 관리자에 의한 계정 승인 완료 안내 메일</td>\n" +
                "\t\t\t\t</tr>\n" +
                "\t\t\t\t<tr>\n" +
                "\t\t\t\t\t<td style=\"font-size:14px;font-family:'나눔고딕',NanumGothic,'맑은고딕',Malgun Gothic,'돋움',Dotum,Helvetica,'Apple SD Gothic Neo',Sans-serif;color:#212121; padding-top:24px;\">안녕하세요.</td>\n" +
                "\t\t\t\t</tr>\n" +
                "\t\t\t\t<tr>\n" +
                "\t\t\t\t\t<td style=\"font-size:14px;font-family:'나눔고딕',NanumGothic,'맑은고딕',Malgun Gothic,'돋움',Dotum,Helvetica,'Apple SD Gothic Neo',Sans-serif;color:#939393; padding-top:20px;\">저희 KT 롯데정보통신 현금 영수증 서비스를 이용해 주시는 회원님께 감사 드립니다. </td>\n" +
                "\t\t\t\t</tr>\n" +
                "\t\t\t\t<tr>\n" +
                "\t\t\t\t\t<td style=\"font-size:14px;font-family:'나눔고딕',NanumGothic,'맑은고딕',Malgun Gothic,'돋움',Dotum,Helvetica,'Apple SD Gothic Neo',Sans-serif;color:#939393; padding-top:20px;\">가입하신 KT 롯데정보통신 현금 영수증 서비스의 계정 승인이 완료되었습니다. </td>\n" +
                "\t\t\t\t</tr>\n" +
                "\t\t\t\t<tr>\n" +
                "\t\t\t\t\t<td style=\"font-size:14px;font-family:'나눔고딕',NanumGothic,'맑은고딕',Malgun Gothic,'돋움',Dotum,Helvetica,'Apple SD Gothic Neo',Sans-serif;color:#939393; padding-top:20px;\">아래 링크 주소를 클릭하여 서비스를 이용해 주시기 바랍니다.</td>\n" +
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
                "\t\t\t\t\t<td style=\"font-size:14px;font-family:'나눔고딕',NanumGothic,'맑은고딕',Malgun Gothic,'돋움',Dotum,Helvetica,'Apple SD Gothic Neo',Sans-serif;color:#939393; padding-top:15px;\">현금영수증 사이트 링크 주소 :  <a :href="+userUrl+" target=\"_blank\" style=\"color:#008aff;\">"+userUrl+"</a></td>\n" +
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

            let reqData : any = {
                to : [this.email],
                title : '[Hellocash 현금영수증] 현금영수증 서비스 계정 승인 완료 안내 메일',
                message : mailMessage,
                cc : [''],
            };
            // api 데이터 호출
            CommonBoardService.postListDatas('mail', null, reqData).then((response) => {
                    console.log(response);
                    if (response.status.toString() == '201'|| response.status.toString() == '200') { //메일 전송 완료
                        //Vue.swal({text: '비밀번호 초기화 관련 메일 발송이 완료되었습니다.\n발송된 메일을 확인하세요.'});
                    }
                }
                , (error) => {
                    //this.$Progress.finish();
                    console.log(error);
                }
            ).catch();

        }

        amtComma(num){
            return  Number(num).toLocaleString()
        }

        saupnoFormat(val) {
            return val.substring(0, 3) + '-' + val.substring(3, 5) + '-' + val.substring(5, 10);
        }



    }
</script>