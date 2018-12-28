<template>

    <!-- container -->
    <section id="container">
        <!-- content  -->
        <div class="content">
            <h2 class="blind">가맹점 관리</h2>

            <h3>승인 대역 수정</h3>

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
                            <!--<button type="button" id="" class="btn_sch01" @click="searchSaupPop">검색</button>-->
                            <input type="text" class="input form_store02" value="롯데백화점 강남점" title="가맹점명" v-model="shopNm" disabled="disabled">
                            <input type="hidden" title="매장번호" v-model="storeId">
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">회사코드</th>
                        <td class="con_comcode">
                            <select id="" name="" class="select form_comcode" title="회사코드" v-model="companyCode" disabled="disabled">
                                <option value="">선택</option>
                                <template v-for="datas in companyCodeList">
                                    <option v-bind:value=datas.code>{{datas.name}}</option>
                                </template>
                            </select>
                            <input type="text" class="input form_comcode" title="회사코드" disabled="disabled" v-model="companyCd">
                        </td>
                        <th scope="row">점코드</th>
                        <td>
                            <input type="text" class="input form_branchcode" title="점코드" v-model="jumCode" v-on:keyup="jumCodeCh()" maxlength="10">
                            <input type="hidden" title="기존 점코드" v-model="oldJumCode">
                            <input type="hidden" v-model="jumCodeYn">
                            <button type="button" id="" class="btn_s01 bg04" v-on:click="chkJumCode">중복확인</button>
                            <p class="info_msg" id="jumcode_msg"></p>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">승인코드</th>
                        <td>
                            <select id="" name="" class="select form_w100" title="승인번호" v-model="aproCode" disabled="disabled">
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
                                <span class="rdo_box"><input type="radio" name="chk" value="1" id="aa11" checked="checked" v-model="aproGbn"><label for="aa11">대역폭</label></span>
                                <input type="text" class="input form_app01" placeholder="시작점(0000000)" title="승인대역 시작점" v-model="aproBandFrom">
                                <input type="hidden" title="기존 승인대역 시작점" v-model="oldAproBandFrom">
                                <span class="period_form">-</span>
                                <input type="text" class="input form_app01" placeholder="끝점(1000000)" title="승인대역 끝점" v-model="aproBandTo">
                                <input type="hidden" title="기존 승인대역 끝점" v-model="oldAproBandTo">
                            </div>
                            <div class="form_col approval">
                                <span class="rdo_box"><input type="radio" name="chk" value="2" id="aa12" v-model="aproGbn"><label for="aa12">건수</label></span>
                                <input type="text" class="input form_app02" placeholder="건수(1000건 단위)" value="" title="승인대역 시작점" v-model="aproCnt">
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <!-- //tbl view box -->

            <!-- btn bot -->
            <div class="btn_bot">
                <button type="button" id="" class="btn_b01 bg02" v-on:click="cancelInfo">취소</button>
                <button type="button" id="" class="btn_b01 bg03" v-on:click="deleteInfo">승인대역 삭제</button>
                <button type="button" id="" class="btn_b01 bg03" v-on:click="validationChk">승인대역 수정</button>
                <!--<button type="button" id="" class="btn_b01 bg01">승인대역 신청</button>-->

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
            SaupBox
        },
    })
    export default class ApprovalBandDetl extends Vue {
        message: any = '';

        showModal1 : boolean= false; // 팝업

        storeId : any = '';
        saupId : any = '';
        shopNm : any = '';

        companyCode : any = '';
        companyCd : any = '';

        jumCode: any = '';
        oldJumCode: any = '';
        jumCodeYn: any = '';

        aproCode: any = ''; //승인코드
        aproStatus: any = ''; //승인상태
        aproGbn: any = ''; //승인대역 rodio 선택

        aproBandFrom: any = ''; //승인 대역폭 시작점
        oldAproBandFrom: any = ''; //기존 승인 대역폭 시작점
        aproBandTo: any = ''; //승인 대역폭 끝점
        oldAproBandTo: any = ''; //기존 승인 대역폭 끝점
        aproCnt: any = ''; //승인대역 건수

        companyCodeList: any = {}; //회사코드
        aproCodeList: any = {}; //승인코드

        objectKey : any = "";

        //돔생성전 호출자
        created() {

            this.getSelectList('SEARCH'); //회사코드
            this.getSelectList('APRO'); //승인코드

            this.detailView(); //정보 조회

        }

        //돔렌더링완료시 진행
        mounted() {
        }

        cancelInfo(){
            this.$router.push('/home/approvalBandList')
        }

        //승인대역 삭제
        deleteInfo(){

            let reqData : any = { aprvCode : this.aproCode , aprvPermFrom : this.aproBandFrom, aprvPermTo : this.aproBandTo };

            CommonBoardService.deleteListDatas('approvalband', null, reqData).then((response) => {
                let result: any =  response.data;
                console.log(response)
                if(result != null){
                    alert('승인대역이 삭제되었습니다.')
                    this.$router.push('/home/approvalBandList')
                }else{
                    alert('승인대역 등록이 실패하였습니다.\n다시 시도하세요.');
                }
            }).catch();
        }

        //상세정보 조회
        detailView(){
            this.objectKey = this.$route.params.objectKey;
            console.log('넘겨받은 값 확인');
            console.log(this.objectKey);

            if(!this.objectKey){
                alert('접근할수 없습니다')
                this.$router.push({name:'approvalBandList'});
            }else{

                this.aproCode = this.objectKey.lpermid; // 승인코드
                this.aproBandFrom = this.objectKey.lpermfrom; // 승인 시작대역
                this.aproBandTo = this.objectKey.lpermto; // 승인 끝대역

                let reqData : any = { aprvPermFrom : this.aproBandFrom, aprvPermTo : this.aproBandTo };

                CommonBoardService.getListDatas('approvalband/'+this.aproCode, null, reqData).then((response) => {
                    let result: any =  response.data;
                    console.log(result)
                    if(result != null){
                        this.saupId = result.saupId; //사업자등록번호
                        this.companyCode = result.subSaup; // 회사코드 select
                        this.companyCd = result.subSaup; // 회사코드 표시
                        this.jumCode = result.jumCode; //점코드
                        this.oldJumCode = result.jumCode; //변경시 체크를 위한 점코드
                        this.jumCodeYn = 'Y';
                        this.aproCode = result.aprvCode; //승인코드
                        this.aproStatus = result.aprvYn; //승인상태
                        this.aproBandFrom = result.aprvPermFrom; //시작점
                        this.oldAproBandFrom = result.aprvPermFrom; //변경시 체크를 위한 시작점
                        this.aproBandTo = result.aprvPermTo; //끝점
                        this.oldAproBandTo = result.aprvPermTo; //변경시 체크를 위한 끝점
                        //this.aproCnt = result.aprvPermTo;
                        if(result.aprvPermFrom != null || result.aprvPermFrom != ''){
                            this.aproGbn = '1'; //대역폭 선택
                        }else{
                            this.aproGbn = '2'; //건수 선택
                        }

                        this.saupjangInfo(result.saupId);

                    }else{

                    }
                    //this.onLoadListView = true;
                }).catch();

            }
        }

        //수정
        updateInfo(){

            let reqData : any = {
                saupId : this.saupId,
                subSaup : this.companyCode,
                newAprvPermFrom : this.aproBandFrom,
                originAprvPermFrom : this.oldAproBandFrom,
                newAprvPermTo : this.aproBandTo,
                originAprvPermTo : this.oldAproBandTo,
                aprvCode : this.aproCode,
                aprvCount : this.aproCnt,
                newJumcode : this.jumCode,
                originJumcode : this.oldJumCode
            };
            console.log('승인대역 등록')
            // api 데이터 호출(승인대역 등록)
            CommonBoardService.updateListData('approvalband', null, reqData).then((response) => {
                    let result: any = response.data;
                    console.log(result);
                    if (result != null) {
                        alert('승인대역이 등록되었습니다.')
                        this.$router.push('/home/approvalBandList')
                    } else {
                        alert('승인대역 등록이 실패하였습니다.\n다시 시도하세요.');
                    }
                }
                , (error) => {
                    //console.log(error);
                }
            ).catch((response) => {
                //console.log(response);
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
            console.log('회사코드')
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

        //점코드 유효성 체크
        chkJumCode() {

            if(this.saupId == ''){
                alert('사업자등록번호를 입력하셔야 확인이 가능합니다.');
                return;
            }else if(this.jumCode == ''){
                alert('점코드를 입력하세요.');
                return;
            }

            let saupmsg = document.getElementById('jumcode_msg'); //중복 확인한 메시지

            let reqData: any = {};
            reqData['newJumCode'] = this.jumCode; //점코드
            reqData['saupId'] = this.saupId; //사업자등록번호

            // api 데이터 호출(사업자등록번호 유효성 체크)
            CommonBoardService.postListDatas('validation/jumcode', null, reqData).then((response) => {
                    let result: any = response.data;
                    console.log(result);
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
                    console.log(error);
                    this.jumCodeYn = '';
                }
            ).catch((response) => {
                this.jumCodeYn = '';
                console.log(response);
            });
        }

        validationChk(){

            if(this.jumCode == ''){
                alert('점코드를 입력하세요.')
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

                if(this.aproBandFrom != '' && this.aproBandTo != '') { //승인대역이 있으면 체크
                    this.aproBandChk();
                }else{ //업으면 그냥 수정
                    this.updateInfo();
                }
            }
        }

        //승인대역 사용 가능여부 검증
        aproBandChk(){

            //대역폭 정보
            let bandData: any = {
                subSaup: this.companyCode, //회사코드
                approvedCode: this.aproCode, //승인코드
                newApprovedbandFrom: this.aproBandFrom, //시작대역
                oldApprovedbandFrom: this.oldAproBandFrom, //시작대역
                newApprovedbandTo: this.aproBandTo, //끝대역
                oldApprovedbandTo: this.oldAproBandTo //끝대역
            };

            //승인대역 대역폭 사용가능 여부 확인
            console.log('대역폭 사용가능 여부 체크')
            //승인대역 대역폭 체크
            let bandChk : boolean = true;
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
                        this.updateInfo(); //등록
                    }
                }
                , (error) => {
                }
            ).catch();
        }

        //점코드 변경시 점코드 중확확인 여부값 초기화
        jumCodeCh(){
            this.jumCodeYn = '';
        }

        //사업장정보 조회
        saupjangInfo(no){

            CommonBoardService.getListDatas('saupjang',no,null).then(result=>{
                if(result.status==200){
                    this.shopNm = result.data.shopNm; //사업장명
                }else{
                }
            })

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
                            //this.saupGbnList = result;
                        }else if(code == 'APRO'){ //승인코드
                            this.aproCodeList = result;
                        }else if(code == 'SEARCH'){ //회사코드
                            this.companyCodeList = result;
                        }else if(code == 'RECEIPT'){ //현금영수증 사업자 코드
                            //this.receiptSaupList = result;
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

    }

</script>
