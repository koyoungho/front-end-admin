<template>

    <!-- container -->
    <section id="container">
        <!-- content  -->
        <div class="content">
            <h2 class="blind">가맹점 관리</h2>

            <h3>승인 대역 신청 및 등록</h3>

            <!-- tbl view box -->
            <div class="tbl_view_box tbl_blank02">
                <!-- tbl view01 -->
                <table class="tbl_view01">
                    <caption>승인대역 정보</caption>
                    <colgroup>
                        <col width="17%">
                        <col width="33%">
                        <col width="17%">
                        <col width="33%">
                    </colgroup>
                    <tbody>
                    <tr>
                        <th scope="row">사업자등록번호</th>
                        <td class="con_indcode" colspan="3">
                            <input type="text" class="input sch_indcode01" value="000-00-00000" title="사업자등록번호" v-model="saupId" disabled="disabled">
                            <button type="button" id="" class="btn_sch01" @click="searchSaupPop">검색</button>
                            <input type="text" class="input form_store02" value="롯데백화점 강남점" title="사업장명" v-model="shopNm" disabled="disabled">
                            <input type="hidden" title="매장번호" v-model="storeId">
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">회사코드</th>
                        <td class="con_comcode">
                            <select id="" name="" class="select form_comcode" title="회사코드명" v-model="companyCode">
                                <option value="">선택</option>
                                <template v-for="datas in companyCodeList">
                                    <option v-bind:value=datas.code>{{datas.name}}</option>
                                </template>
                            </select>
                            <input type="text" class="input form_comcode" title="회사코드" disabled="disabled" v-model="companyCd">
                        </td>
                        <th scope="row">점코드</th>
                        <td>
                            <input type="text" class="input form_branchcode" title="점코드" v-model="jumCode" maxlength="10">
                            <input type="hidden" v-model="jumCodeYn">
                            <button type="button" id="" class="btn_s01 bg04" v-on:click="chkJumCode" title="점코드 중복확인">중복확인</button>
                            <p class="info_msg" id="jumcode_msg"></p>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">승인코드</th>
                        <td>
                            <select id="" name="" class="select form_w100" title="승인번호" v-model="aproCode">
                                <option value="">선택</option>
                                <template v-for="datas in aproCodeList">
                                    <option v-bind:value=datas.code>{{datas.codeNm}}</option>
                                </template>
                            </select>
                        </td>
                        <th scope="row">승인 상태</th>
                        <td><input type="text" class="input form_w100" title="승인 상태" disabled="disabled" v-model="aproStatus"></td>
                    </tr>
                    <tr>
                        <th scope="row">승인 대역</th>
                        <td colspan="3">
                            <div class="form_col approval">
                                <span class="rdo_box"><input type="radio" name="chk" value="1" id="aa11" checked="checked" v-model="aproGbn" title="대역폭 선택"><label for="aa11">대역폭</label></span>
                                <input type="text" class="input form_app01" placeholder="시작점(0000000)" title="승인대역 시작점" v-model="aproBandFrom" maxlength="7">
                                <span class="period_form">-</span>
                                <input type="text" class="input form_app01" placeholder="끝점(1000000)" title="승인대역 끝점" v-model="aproBandTo" maxlength="7">
                            </div>
                            <div class="form_col approval">
                                <span class="rdo_box"><input type="radio" name="chk" value="2" id="aa12" v-model="aproGbn" title="건수 선택"><label for="aa12">건수</label></span>
                                <input type="text" class="input form_app02" placeholder="건수(1000건 단위)" value="" title="승인대역 건수" v-model="aproCnt" maxlength="7">
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <!-- //tbl view box -->

            <!-- btn bot -->
            <div class="btn_bot">
                <button type="button" id="" class="btn_b01 bg02" v-on:click="cancelInfo" title="승인대역 등록 취소">취소</button>
                <!--<button type="button" id="" class="btn_b01 bg03">승인대역 수정</button>-->
                <!--<button type="button" id="" class="btn_b01 bg01">승인대역 신청</button>-->
                <!--<button type="button" id="" class="btn_b01 bg03">승인대역 삭제</button>-->
                <button type="button" id="" class="btn_b01 bg01" v-on:click="validationChk" title="승인대역 등록">승인대역 등록</button>
            </div>

        </div>
        <!-- //content -->

        <SaupBox v-if="showModal1"  v-on:selectedSaup="setSaupData" @saupClose="showModal1 = false"></SaupBox>

    </section>
    <!-- //container -->

</template>

<script lang="ts">
    import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
    import SaupBox from '@/components/contents/issuanceOfCashReceipt/SaupList.vue'
    import {CommonBoardService, CommonListService} from '../../../api/common.service';
    import {environment} from '../../../utill/environment';

    @Component({
        components: {
            ApprovalBandReg, SaupBox
        },
    })
    export default class ApprovalBandReg extends Vue {
        message: any = '';

        showModal1 : boolean= false; // 팝업

        storeId : any = '';
        saupId : any = '';
        shopNm : any = '';

        companyCode : any = '';
        companyCd : any = '';

        jumCode: any = '';
        jumCodeYn: any = '';

        aproCode: any = ''; //승인코드
        aproStatus: any = ''; //승인상태
        aproGbn: any = ''; //승인대역 rodio 선택

        aproBandFrom: any = ''; //승인 대역폭 시작점
        aproBandTo: any = ''; //승인 대역폭 끝점
        aproCnt: any = ''; //승인대역 건수

        companyCodeList: any = {}; //회사코드
        aproCodeList: any = {}; //승인코드

        //돔생성전 호출자
        created() {

            this.getSelectList('SEARCH'); //회사코드
            this.getSelectList('APRO'); //승인코드
        }

        //돔렌더링완료시 진행
        mounted() {
        }

        cancelInfo(){
            this.$router.push('/home/approvalBandList')
        }

        //등록
        insertInfo(){

            let reqData : any = {
                saupId : this.saupId,
                subSaup : this.companyCode,
                aprvPermFrom : this.aproBandFrom,
                aprvPermTo : this.aproBandTo,
                aprvCode : this.aproCode,
                aprvCount : this.aproCnt,
                jumcode : this.jumCode
            };
            // api 데이터 호출(승인대역 등록)
            CommonBoardService.postListDatas('approvalband', null, reqData).then((response) => {
                    let result: any = response.data;
                    if (result != null) {
                        alert('승인대역이 등록되었습니다.')
                        this.$router.push('/home/approvalBandList')
                    } else {
                        alert('승인대역 등록이 실패하였습니다.\n다시 시도하세요.');
                    }
                }
                , (error) => {
                }
            ).catch((response) => {
            });

            //this.$router.push('/home/approvalBandList')
        }

        //사업자등록번호 조회 팝업
        searchSaupPop(){
            this.showModal1 = true;
        }

        setSaupData(data) {
            this.storeId = data.storeId; // 매장번호 번호
            this.saupId = data.saupId; //사업자 번호
            this.shopNm = data.shopNm; //가맹점명
        }

        @Watch('companyCode') onChange(){
            this.companyCd = this.companyCode;
        }

        @Watch('aproBandFrom') onBandChange(){
            if(this.aproBandFrom != ''){
                this.aproGbn = '1';
                this.aproCnt = '';
            }
        }

        @Watch('aproCnt') onCntChange(){
            if(this.aproCnt != ''){
                this.aproGbn = '2';
                this.aproBandFrom = '';
                this.aproBandTo = '';
            }
        }

        @Watch('jumCode') changeJumcode(){
            let regNumber = /^[0-9]*$/;
            if(!regNumber.test(this.jumCode)){
                Vue.swal({ text: '숫자만가능합니다'});
            }
            //console.log('회사코드')
            let saupmsg = document.getElementById('jumcode_msg'); //중복 확인한 메시지
            if(saupmsg != null){ saupmsg.innerHTML = ""; }
        }

        //점코드 유효성 체크
        chkJumCode() {
            let regNumber = /^[0-9]*$/;
            let saupmsg = document.getElementById('jumcode_msg'); //중복 확인한 메시지

            if(this.saupId == ''){
                alert('사업자등록번호를 입력하셔야 확인이 가능합니다.');
                return;
            }else if(this.jumCode == ''){
                //alert('점코드를 입력하세요.');
                if(saupmsg != null){ saupmsg.innerHTML = "점코드를 입력하세요."; }
                return;
            }else if(!regNumber.test(this.jumCode)){
                //alert('점코드는 숫자만 입력가능합니다.');
                if(saupmsg != null){ saupmsg.innerHTML = "점코드는 숫자만 입력가능합니다."; }
                return;
            }else if(this.jumCode.length != 10){
                //alert('점코드는 10자리로 입력하세요.');
                if(saupmsg != null){ saupmsg.innerHTML = "점코드는 10자리로 입력하세요."; }
                return;
            }

            let reqData: any = {};
            reqData['newJumCode'] = this.jumCode; //점코드
            reqData['saupId'] = this.saupId; //사업자등록번호

            // api 데이터 호출(사업자등록번호 유효성 체크)
            CommonBoardService.postListDatas('validation/jumcode', null, reqData).then((response) => {
                    let result: any = response.data;
                    if (result != null && result.code == '000') {
                        if(saupmsg != null){
                            saupmsg.innerHTML = "사용가능한 점코드입니다."; //화면에 메시지 보이기
                        }
                        this.jumCodeYn = 'Y';
                    } else {
                        this.jumCodeYn = '';
                        if(saupmsg != null){
                            saupmsg.innerHTML = result.message; //화면에 메시지 보이기
                        }
                    }
                }
                , (error) => {
                    this.jumCodeYn = '';
                }
            ).catch((response) => {
                this.jumCodeYn = '';
            });
        }

        validationChk(){

            if(this.saupId == ''){
                alert('사업자등록번호를 입력하세요.')
                return;
            }else if(this.companyCode == ''){
                alert('회사코드를 선택하세요.')
                return;
            }else if(this.jumCode == ''){
                alert('점코드를 입력하세요.')
                return;
            }else if(this.jumCodeYn == ''){
                alert('점코드 중복확인 하세요.')
                return;
            }else if(this.jumCodeYn == ''){
                alert('점코드 중복확인 하세요.')
                return;
            }else if(this.aproCode == ''){
                alert('승인코드를 선택하세요.')
                return;
            }else if(this.aproGbn == '1' &&  this.aproBandFrom == ''){
                alert('대역폭 시작점을 입력하세요.')
                return;
            }else if(this.aproGbn == '1' &&  this.aproBandTo == ''){
                alert('대역폭 끝점을 입력하세요.')
                return;
            }else if(this.aproGbn == '2' &&  this.aproCnt == ''){
                alert('승인대역 건수를 입력하세요.')
                return;
            }else{
                //this.insertInfo();
                this.aproBandChk();
            }

        }

        //승인대역 사용 가능여부 검증
        aproBandChk(){

            //대역폭 정보
            let bandData: any = {
                subSaup: this.companyCode, //회사코드
                approvedCode: this.aproCode, //승인코드
                newApprovedbandFrom: this.aproBandFrom, //시작대역
                newApprovedbandTo: this.aproBandTo //끝대역
            };

            //승인대역 대역폭 사용가능 여부 확인
            //승인대역 대역폭 체크
            let bandChk : boolean = true;
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
                        this.insertInfo(); //등록
                    }
                }
                , (error) => {
                }
            ).catch();
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
            }else if(code == 'RECEIPT'){ //현금영수증 사업자 코드 -- get
                apiUrl = 'code/issuer';
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
                            //this.receiptSaupList = result;
                        }
                    } else {
                    }
                }
                , (error) => {
                    console.log(error)
                }
            ).catch();

        }

    }

</script>
