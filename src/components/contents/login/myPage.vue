
<template>
    <!-- container -->
    <section id="container">
        <template v-if="delComplate==false">
          <div class="content">
            <h2 class="blind">정보변경</h2>

            <h3>정보변경</h3>

            <h4 class="blind">기본 정보</h4>

            <!-- search reg box -->
            <div class="search_reg_box" v-if="saInfo.soluNm">
                <ul class="search_list col03">
                    <li v-if="saInfo.soluNm">
                        <label for="">현금영수증 사업자</label>
                        <select id="" name="" class="select form_w100" title="현금영수증 사업자" disabled="disabled">
                            <option selected="">{{saInfo.soluNm}}</option>
                        </select>
                    </li>
                </ul>
                <ul class="search_list col03">
                    <template v-if="gajumInfo">
                    <li>
                        <label for="">가맹점 번호</label>
                        <input type="text" class="input form_w100" value="0000000000" title="가맹점번호" disabled="disabled" v-model="gaInfo.gajumId">
                    </li>
                    <li>
                        <label for="">사업자 번호</label>
                        <input type="text" class="input form_w100" value="0000000000" title="사업자번호" disabled="disabled" v-model="gaInfo.saupId">
                    </li>
                    <li>
                        <label for="">가맹점명</label>
                        <input type="text" class="input form_w100" value="신일약국" title="가맹점명" disabled="disabled"  v-model="gaInfo.shopNm">
                    </li>
                    </template>
                    <template v-if="jijumInfo">
                    <li>
                        <label for="">지점 번호</label>
                        <input type="text" class="input form_w100" value="000-00-00000" title="지점번호" disabled="disabled"  v-model="jiInfo.jijumId" >
                    </li>
                    <li>
                        <label for="">사업자 번호</label>
                        <input type="text" class="input form_w100" value="000-00-00000" title="사업자번호" disabled="disabled" v-model="jiInfo.saupId" >
                    </li>
                    <li>
                        <label for="">지점명</label>
                        <input type="text" class="input form_w100" value="신일약국 영등포점" title="지점명" disabled="disabled" v-model="jiInfo.shopNm" >
                    </li>
                    </template>
                </ul>
            </div>
            <!-- //search reg box -->

            <h4>관리자 정보</h4>
            <!-- btn top
            <div class="btn_top type01">
              <button type="button" id="" class="btn_m01 bg02">가맹점 해지 신청</button>
            </div>-->

            <!-- tbl view box -->
            <div class="tbl_view_box">
                <!-- tbl view01 -->
                <table class="tbl_view01">
                    <caption>사용자 정보</caption>
                    <colgroup>
                        <col width="17%">
                        <col width="33%">
                        <col width="17%">
                        <col width="33%">
                    </colgroup>
                    <tbody>
                    <tr>
                        <th scope="row">이름</th>
                        <td><input type="text"  class="input form_w100"  title="이름" disabled="disabled" v-model="account.name" maxlength="20"></td>
                        <th scope="row">휴대폰번호</th>
                        <td>
                            <input type="text" class="input form_w100"  title="휴대폰번호" v-model="account.phoneNum" maxlength="12" disabled="disabled">
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">ID</th>
                        <td>
                            <input type="text" class="input form_id" title="ID" disabled="disabled" v-model="account.id">
                        </td>
                        <th scope="row">이메일주소</th>
                        <td>
                            <input type="text" class="input form_w100" title="이메일주소" v-model="account.email">
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">비밀번호</th>
                        <td>
                            <input type="password" class="input form_w100" title="비밀번호" v-model="account.password">
                        </td>
                        <th scope="row">비밀번호 확인</th>
                        <td>
                            <input type="password" class="input form_w100" title="비밀번호 확인" v-model="account.passwordConfirm">
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">접속IP 대역</th>
                        <td>
                            <input type="text" class="input form_conip" title="접속IP 대역" disabled="disabled" v-model="account.accessIpFrom">
                            <span class="period_form">-</span>
                            <input type="text" class="input form_conip" title="접속IP 대역" disabled="disabled" v-model="account.accessIpTo">
                        </td>
                        <th scope="row">최종접속일시</th>
                        <td>
                            <input type="text" class="input form_w100" title="최종접속일시" disabled="disabled" v-model="account.lastConnDt">
                        </td>
                    </tr>
                    <!--
                    <tr>
                        <th scope="row">전화번호</th>
                        <td colspan="3">
                            <input type="text" class="input form_w50" title="전화번호" v-model="account.newPassword">
                        </td>
                    </tr> -->
                    <!--<tr>
                        <th scope="row">주소</th>
                        <td colspan="3">
                            <ul class="address_list">
                                <li class="con01">
                                    <input type="text" class="input form_post" title="우편번호" v-model="account.zipCode">
                                    <button type="button" id="" class="btn_s01 bg03" @click="showAddress">우편번호</button>
                                </li>
                                <li class="con02">
                                    <input type="text" class="input form_address01" title="주소" v-model="account.addr1">
                                </li>
                                <li class="con03">
                                    <input type="text" class="input form_address02" title="상세 주소" v-model="account.addr2">
                                </li>
                            </ul>
                        </td>
                    </tr>-->
                    </tbody>
                </table>
            </div>
            <!-- //tbl view box -->

            <!-- btn tbl bot -->
            <div class="btn_tbl_bot">
                <button type="button" class="btn_m01 bg01" v-on:click="changePhone">휴대폰번호 변경</button>
                <button type="button" id="" class="btn_m01 bg01" @click="delAccount">ID 계정 해지</button>
            </div>


            <!-- btn bot -->
            <div class="btn_bot">
                <button type="button" id="" class="btn_b01 bg02">취소</button>
                <button type="button" id="" class="btn_b01 bg01" @click="saveInfo">정보변경</button>
            </div>
        </div>
        </template>
        <template v-if="delComplate==true">
            <div class="content">
            <h2 class="blind">정보변경</h2>

            <h3 class="join">ID 계정 해지 완료</h3>

            <!-- complete wrap -->
            <div class="complete_wrap">
                <div class="result_box">
                    <ul class="result_info">
                        <li><span class="sub">사업자등록번호 : </span>{{delInfo.saupId}}</li>
                        <li><span class="sub">매장명 : </span>{{delInfo.shopNm}}</li>
                        <li><span class="sub">아이디 : </span>{{delInfo.id}}</li>
                    </ul>
                </div>
                <!--<p class="complete_result ok">ID 계정이 해지되었습니다.</p>-->
                <p class="complete_info01">국세청 현금영수증 가맹은 유지됩니다.<br>궁금하신 점은 고객센터(02-2074-0340)로 문의 바랍니다.</p>
                <!-- btn area -->
                <div class="btn_area">
                    <button type="button" id="" class="btn_b02 bg01">ID 계정이 해지되었습니다</button>
                </div>
            </div>
            </div>
        </template>
        <AddressBox v-if="showModal"  v-on:selectedValue="setDataAddr" @close="showModal = false"></AddressBox>
        <KmcConfirm v-if="showConfirm" v-on:closeKcm="closeMove"></KmcConfirm>
        <!-- //content -->
    </section>
    <!-- //container -->

</template>

<script lang="ts">
    import {Component, Vue, Watch} from 'vue-property-decorator'; // 뷰 cli;
    import {CommonBoardService} from "../../../api/common.service";
    import {Account} from '../../../model/account/account';
    import AddressBox from '@/components/common/addressBox/addressBox.vue'
    import KmcConfirm from '../../common/kmc/kmcConfirm.vue';
    import moment from 'moment'
    Vue.prototype.moment = moment;

    @Component({
        components: {
            MyPage,AddressBox,KmcConfirm
        }
    })
    export default class  MyPage  extends  Vue{
     account : Account[] = [];
     gaInfo : any = {}
     saInfo : any = {}
     jiInfo : any = {}
     delInfo : any = {};
     showModal :boolean =  false;
     delComplate : boolean = false;
     $modal : any;

     gajumInfo : boolean = false;
     jijumInfo : boolean = false;

     showConfirm : boolean = false;

     created(){
        this.accountInfo();
         this.saupInfo();
         //this.gajumInfo();
         //this.jijumInfo();
     }

     mounted(){

         if(sessionStorage.role=='0004'||sessionStorage.role=='0005'){ //현금영수증사업자, 가맹점, 지점관리자
             if(sessionStorage.gajumId!=null&&sessionStorage.gajumId!=''){
                 this.gajumInfo = true;
                 this.gaInfo.gajumId = (sessionStorage.gajumId ==null||sessionStorage.gajumId =='null') ? '' : sessionStorage.gajumId;
                 this.gaInfo.saupId = (sessionStorage.gajumSaupId==null||sessionStorage.gajumSaupId=='null') ? '' : sessionStorage.gajumSaupId;
                 this.gaInfo.shopNm = (sessionStorage.gajumNm==null||sessionStorage.gajumNm=='null') ? '' : sessionStorage.gajumNm;

             }
             if(sessionStorage.jijumId!=null&&sessionStorage.jijumId!=''){
                 this.jijumInfo = true;
                 this.jiInfo.jijumId = (sessionStorage.jijumId ==null||sessionStorage.jijumId =='null') ? '' : sessionStorage.jijumId;
                 this.jiInfo.saupId = (sessionStorage.jijumSaupId==null||sessionStorage.jijumSaupId=='null') ? '' : sessionStorage.jijumSaupId;
                 this.jiInfo.shopNm = (sessionStorage.jijumNm==null||sessionStorage.jijumNm=='null') ? '' : sessionStorage.jijumNm;
             }
         }
     }

    @Watch('account.phoneNum') changePhoneNum(){
        let account : any = this.account;
        let regNumber = /^[0-9]*$/;
        if(!regNumber.test(account.phoneNum)){
            Vue.swal({ text: '숫자만가능합니다'});
            account.phoneNum = '';
        }
    }

    accountInfo(){
        CommonBoardService.getListDatas('accounts','myself',null).then(result=>{
            if(result.status==200){
                this.account = result.data;

                let accounts : any = this.account;
                if(accounts != null && accounts.lastConnDt != ''){
                    accounts.lastConnDt = this.dateFormat(accounts.lastConnDt);
                }
            }
        })
    }

    saupInfo(){
        CommonBoardService.getListDatas('accounts',sessionStorage.accountId+'/issuer',null).then(result=>{
            if(result.status==200){
                this.saInfo = result.data
            }
        })
    }
    /*gajumInfo(){
        CommonBoardService.getListDatas('accounts',sessionStorage.accountId+'/gajum',null).then(result=>{
            if(result.status==200){
                this.gaInfo = result.data
            }
        })
    }
    jijumInfo(){
        CommonBoardService.getListDatas('accounts',sessionStorage.accountId+'/jijum',null).then(result=>{
            if(result.status==200){
                this.jiInfo = result.data
            }
        })
    }*/
    delAccount(){
        if(confirm('정말 해지 하시겠습니까?')){
            CommonBoardService.deleteListDatas('accounts','myself',null).then(result=>{
                if(result.status==200){
                    this.delInfo = result.data
                    this.delComplate = true;
                    sessionStorage.clear();
                }
            })
        }else{
        }

    }

    saveInfo(){
         if(this.account['password'] == null || this.account['password'] == ''){
             Vue.swal({text: '패스워드를 입력해주세요'});
             return;
         }
         if(this.account['passwordConfirm'] == null || this.account['passwordConfirm'] == ""){
             Vue.swal({text: '패스워드 확인을 입력해주세요'});
             return;
         }
        if(this.account['password'] !=  this.account['passwordConfirm']){
            Vue.swal({text: '패스워드가 같지 않습니다'});
            return;
        }

        let reqData : any = {
                checkString : this.account['password'],
                checkSum : sessionStorage.accountId
        };

        CommonBoardService.postListDatas('validation','passwd', reqData).then(result=>{
            if(result.status==200){
                if(result.data.code=='000')
                this.saveAction();
                else{
                    Vue.swal({text: result.data.message});
                }
            }
        })
    }

    saveAction(){ //실제 데이터 액션 처리
         let data ={
             phoneNum : this.account['phoneNum'],
             telnum : this.account['telnum'],
             email:this.account['email'],
             newPassword:this.account['password'],
             //zipCode:this.account['zipCode'],
             //addr1:this.account['addr1'],
             //addr2:this.account['addr2'],
             role:this.account['role'],
             accessIpFrom: this.account['accessIpTo'],
             accessIpTo: this.account['accessIpFrom']
         }
        CommonBoardService.putListData('accounts','myself/'+this.account['id'], data).then(result=>{
            if(result.status==200){
                Vue.swal({text: '수정이완료 되었습니다'});
            }
        })
    }

    showAddress(){
       this.showModal= true;
    }
    setDataAddr(data) {
        this.account['addr1'] = data.addr;
        this.account['zipCode'] = data.zip;
    }

    // 날짜 포맷
    dateFormat(val){
        if(val == null || val == ''){
            return '';
        }else{
            return moment(val, 'YYYYMMDDHHmmss').format('YYYY.MM.DD HH:mm:ss')
        }
    }

    changePhone(){
        let account : any = this.account;

        //휴대폰 번호 변경에 필요한 값 셋팅
        sessionStorage.kmc_name = account.name;
        sessionStorage.kmc_saupId = account.saupId;
        sessionStorage.kmc_id = account.id;
        //
        // this.kmcGbn = '1'; //휴대폰번호 변경

        this.showConfirm = true;
    }

    closeMove(response) {
        this.showConfirm = false;
        // this.$emit('close','');
        if(response){
            if (response.success == 'Y') {

                this.account['phoneNum'] = response.phoneNo; //변경된 휴대폰번호 셋팅

                alert('휴대폰번호가 변경되었습니다.');

                // this.title='아이디 조회완료'
                // this.otpTrue = true;
                // this.resultId = response.id
                // this.accesstoken = response.token; //토큰
            }
            else {
            }
        }
    }


    }
</script>

