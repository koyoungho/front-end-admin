<template>

    <!-- container -->
    <section id="container">
        <!-- content  -->
        <div class="content">
            <h2 class="blind">현금영수증관리</h2>
            <h3>현금영수증 발급</h3>
            <!-- btn top -->
            <div class="btn_top">
                <button type="button" id="" class="btn_m01 bg05" v-on:click="bulkIssue">Excel 일괄 발급</button>
            </div>

            <p class="req_info">(<em class="form_req">*</em>)는 필수항목입니다.</p>

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
                        <th scope="row">사업자등록번호</th>
                        <td>
                            <input type="text" class="input sch_indcode01" v-model="saupId" title="사업자등록번호" readonly>
                            <input type="text" class="input sch_indcode02" v-model="shopNm" title="가맹점명" readonly>
                            <button type="button" id="" class="btn_sch01" @click="popupOpen">검색</button>
                        </td>
                        <th scope="row">거래일자</th>
                        <td class="con_row01"><strong>{{ymd}}</strong> </td>
                    </tr>

                    <tr>
                        <th scope="row">발급용도<em class="form_req">*</em></th>
                        <td>
                            <select name="" class="select form_w100" title="발급용도 선택" v-model="geogu">
                                <option value="">선택</option>
                                    <option value="0">소득공제</option>
                                    <option value="1">지출증빙</option>
                            </select>
                        </td>
                        <th scope="row">고객신분확인<em class="form_req">*</em></th>
                        <td>
                            <select name="" class="select form_userfind" title="고객신분 선택" v-model="positionGb">
                                <option value="">선택</option>
                                <template v-for="datas in confirmList">
                                    <option v-bind:value=datas.code>{{datas.codeNm}}</option>
                                </template>
                            </select>
                            <input type="text" class="input form_userint" title="고객신분 입력" v-model="confirm" maxlength="20">
                        </td>

                    </tr>
                    <tr>
                        <th scope="row">지출구분<em class="form_req">*</em></th>
                        <td>
                            <span class="rdo_box"><input type="radio" name="chk" value="0" id="aa11" checked="checked" v-model="cultGb"><label for="aa11">일반</label></span>
                            <span class="rdo_box"><input type="radio" name="chk" value="1" id="aa12" v-model="cultGb"><label for="aa12">도서/공연</label></span>
                            <span class="rdo_box"><input type="radio" name="chk" value="2" id="aa13" v-model="cultGb"><label for="aa13">대중교통</label></span>
                        </td>
                        <th scope="row">회사코드</th>
                        <td>
                            <select id="" name="" class="select form_w100" title="회사코드" v-model="compoanyCode">
                                <option value="">선택</option>
                                <template v-for="datas in productList">
                                    <option v-bind:value=datas.code>{{datas.name}}</option>
                                </template>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">고객성명</th>
                        <td><input type="text" class="input form_w100" title="고객성명 입력" maxlength="20" v-model="custNm"></td>
                        <th scope="row">메모</th>
                        <td><input type="text" class="input form_w100" title="메모 입력" maxlength="30" v-model="memo"></td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <!-- //tbl view box -->
            <h4 class="first">거래 금액 <em class="form_req">*</em>
                <span>(* "거래금액"란에 입력하시면 "공급가액과 부가세"가 자동으로 분배됩니다.)</span>
            </h4> <!-- 2018-11-06 추가 -->
            <!-- grid box -->
            <div class="grid_box col02 tbl_blank01">
                <!-- col -->
                <div class="col">
                    <!-- tbl list box -->
                    <div class="tbl_list_box">
                        <!-- tbl list03 -->
                        <table class="tbl_list03">
                            <caption>기본 정보</caption>
                            <colgroup>
                                <col class="col_mob" width="50%">
                                <col class="col_mob" width="50%">
                            </colgroup>
                            <thead>
                            <tr>
                                <th scope="col" class="fc_pt01">거래금액</th>
                                <th scope="col">봉사료</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td class="center">
                                    <input type="text" class="input form_price" title="거래금액 입력" v-model="totalAmt" maxlength="9" v-on:keydown="numberChk($event)">
                                    <em class="text_price">원</em>
                                </td>
                                <td class="center">
                                    <input type="text" class="input form_price" title="봉사료 입력" v-model="bong" maxlength="9" v-on:keydown="numberChk($event)">
                                    <em class="text_price">원</em>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <!-- //tbl list box -->
                </div>


                <!-- col -->
                <div class="col">
                    <!-- tbl list box -->
                    <div class="tbl_list_box">
                        <!-- tbl list03 -->
                        <table class="tbl_list03">
                            <caption>기본 정보</caption>
                            <colgroup>
                                <col width="50%">
                                <col width="50%">
                            </colgroup>
                            <thead>
                            <tr>
                                <th scope="col">공급가액</th>
                                <th scope="col">부가세</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td class="center">
                                    <input type="text" id="supplyAmt" name="" class="input form_price" value="10,000" readonly="" title="공급가액 입력" v-model="supplyAmt">
                                    <em class="text_price">원</em>
                                </td>
                                <td class="center">
                                    <input type="text" id="vat" name="" class="input form_price" readonly="" title="부가세 입력" v-model="vat">
                                    <em class="text_price">원</em>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <!-- //tbl list box -->
                </div>
            </div>
            <!-- tbl info bot -->
            <div class="tbl_info_bot">
                <span class="chk_box"><input type="checkbox" id="aa01" v-model="noTax" v-on:click="noTaxGbn"><label for="aa01">면세 및 간이과세자</label></span>
            </div>

            <!-- btn bot -->
            <div class="btn_bot">
                <button type="button" class="btn_b01 bg02" v-on:click="receiptInit()">초기화</button>
                <button type="button" class="btn_b01 bg01" v-on:click="receiptIssue()" v-show="regShow">발급</button>
            </div>

        </div>
        <SaupBox v-if="showModal1"  v-on:selectedSaup="setSaupData" @saupClose="showModal1 = false"></SaupBox>
        <!-- //content -->
    </section>
    <!-- //container -->

</template>

<script lang="ts">
    import {format} from 'date-fns';
    import {Component, Vue, Watch} from 'vue-property-decorator';
    import {CommonBoardService} from '../../../api/common.service';
    import SaupBox from '@/components/contents/issuanceOfCashReceipt/SaupList.vue'
    //import {common} from '../../../utill/common';


    @Component({
        components: {
            CashReceiptIssue,SaupBox
        }
    })
    export default class CashReceiptIssue extends Vue {

        saupNo : any = ''; //사업자등록번호
        storeNm : any = ''; //상점명

        positionGb: any = ''; //고객신분확인 선택
        confirm: any = ''; //고객신분확인 입력
        custNm: any = ''; //고객명
        geogu: any = ''; //발급용도
        productGbn: any = ''; //상품구분
        compoanyCode: any = ''; //상품구분
        cultGb: any = '0'; //지출구분
        memo: any = ''; //메모
        totalAmt: any = '0'; //합계
        bong: any = '0'; //봉사료
        supplyAmt: any = '0'; //공급가액
        vat: any = '0'; //부가세
        //noTaxGbn: any = '';
        noTax: boolean = false; //면세 및 간이과세
        perm : any = ''; //현금영수증 발급 결과
        saleDate : string = '';
        showModal1 : boolean= false; // 팝업
        sendYmd : string = ''; // 현재날짜포맷
        regShow:boolean = false;

        ymd: any = '';

        //popupData
        shopNm :string = "";
        saupId :string = "";
        storeId :string = "";
        soluId : string = "";

        //select box 객체
        confirmList: any = []; //고객신분확인
        geoguList: any = []; //발급용도
        productList: any = []; //상품구분

        @Watch('positionGb') onChange(){
            if(this.positionGb == '6') { //자진발급이면 0100001234로 자동 입력
                this.confirm = '0100001234';
            }else{
                this.confirm = '';
            }
        }
        @Watch('totalAmt') onTotalamtChange(){ //거래금액 변경시
            this.calculateAmt();
        }
        @Watch('bong') onBongChange(){ //봉사료 변경시
            this.calculateAmt();
        }
        //면세 및 간이과세자 클릭
        noTaxGbn(){
            if(this.noTax==true){
                this.noTax = false;
            }else{
                this.noTax = true;
            }
            this.calculateAmt();
        }
        //공급가액, 부가세
        calculateAmt(){
            let amt1 = this.supplyAmt; //공급가액
            let gerle1 = this.totalAmt; //거래금액
            let bong1 = this.bong; //봉사료
            if(Number(gerle1) == 0 || gerle1 == ''){ //거래금액이 없으면 공급가액, 부가세 계산 안함
                this.supplyAmt = 0; //공급가액
                this.vat = 0; //부가세
                return;
            }else if(Number(gerle1) > 999999999 || Number(gerle1) < 1 ){
                alert('거래금액 입력이 잘못되었습니다.');
                return;
            }else if(Number(amt1) < Number(bong1)){
                alert('봉사료가 공급가액보다 큰 액수입니다.');
                return;
            }

            if(this.noTax == true){ //면세 및 간이과세자 체크
                this.supplyAmt = (Number(gerle1) - Number(bong1));  //공급가액
                this.vat = '0'; //부가세
            }else{
                let amt2 = Math.round( (Number(gerle1) - Number(bong1)) * (10/11) ); //공급가액 계산
                let vat2 = Math.round( (Number(gerle1) - Number(bong1)) * (1/11) ); //부가세

                this.supplyAmt = amt2; //공급가액
                this.vat = vat2; //부가세
            }
        }

        bulkIssue() { //대량발송 화면 이동
            this.$router.push('/home/cashReceiptBulkIssue')
        }
        cancelReceipt() { //취소
            this.positionGb = ''; //고객신분확인 선택
            this.confirm = ''; //고객신ㄴ분확인 입력
            this.custNm = ''; //고객명
            this.geogu = ''; //발급용도
            this.productGbn = ''; //상품구분
            this.cultGb = ''; //지출구분
            this.memo = ''; //메모
        }
        searchId() { //아이디 조회(고객신분으로 아이디 조회)

            if(this.positionGb == ''){
                alert('고객신분확인을 선택하세요.');
                return;
            }else if(this.positionGb != '' && this.confirm == ''){
                if(this.positionGb == '1'){ //휴대폰
                    alert('고객신분확인에 휴대폰 번호를 입력하세요.');
                    return;
                }else if(this.positionGb == '2'){ //주민등록번호
                    alert('고객신분확인에 주민등록번호를 입력하세요.');
                    return;
                }else if(this.positionGb == '3'){ //사업자등록번호
                    alert('고객신분확인에 사업자등록번호를 입력하세요.');
                    return;
                }else if(this.positionGb == '4'){ //카드번호
                    alert('고객신분확인에 카드번호를 입력하세요.');
                    return;
                }else if(this.positionGb == '5'){ //QR번호
                    alert('고객신분확인에 QR번호를 입력하세요.');
                    return;
                }else if(this.positionGb == '6'){ //자진발급
                    this.confirm =  '0100001234';
                }
            }

            let searchData: any = {};

            searchData['positionGb'] = this.positionGb; //고객신분확인 선택
            searchData['confirm'] = this.confirm; //고객신분확인 입력
            //searchData['custNm'] = this.custNm; //고객명
            //searchData['geogu'] = this.geogu; //발급용도
            //searchData['cultGb'] = this.cultGb; //지출구분

            // api 데이터 호출
            CommonBoardService.getListDatas('getSearchId', null, searchData).then((response) => {
                    let result: any = response.data;

                    if (result.data.length > 0) {

                    } else {

                    }

                    //this.$Progress.finish();
                }
                , (error) => {
                    //this.$Progress.finish();
                }
            ).catch();

        }
        receiptInit() { //초기화(전체)
            this.positionGb = ""; //고객신분확인 선택
            this.confirm = ''; //고객신분확인 입력
            this.custNm = ''; //고객명
            this.geogu = ''; //발급용도
            this.productGbn = ''; //상품구분
            this.cultGb = ''; //지출구분
            this.memo = ''; //메모
            this.totalAmt = '0'; //합계
            this.bong = '0'; //봉사료
            this.supplyAmt = '0'; //공급가액
            this.vat = '0'; //부가세
        }
        receiptIssue() { //현금영수증 발급

            if(this.positionGb == '') {
                alert('고객신분확인을 선택하세요.');
                return;

            }else if(this.positionGb != '' && this.confirm == ''){
                if(this.positionGb == '1'){ //휴대폰
                    alert('고객신분확인에 휴대폰 번호를 입력하세요.');
                    return;
                }else if(this.positionGb == '2'){ //주민등록번호
                    alert('고객신분확인에 주민등록번호를 입력하세요.');
                    return;
                }else if(this.positionGb == '3'){ //사업자등록번호
                    alert('고객신분확인에 사업자등록번호를 입력하세요.');
                    return;
                }else if(this.positionGb == '4'){ //카드번호
                    alert('고객신분확인에 현금영수증 카드번호를 입력하세요.');
                    return;
                }else if(this.positionGb == '5'){ //QR번호
                    alert('고객신분확인에 QR번호를 입력하세요.');
                    return;
                }
                /*
                }else if(this.custNm == ''){
                    alert('고객성명을 입력하세요.');
                    return;
                 */
            }else if(this.geogu == ''){
                alert('발급용도를 선택하세요.');
                return;
            }else if(this.soluId == ''){
                alert('발급 사업자가 존재하지않습니다');
                return;
            }else if(this.compoanyCode == ''){ //신문사, 택배사만 체크
                alert('회사코드를 선택하세요.');
                return;
            }else if(this.cultGb == ''){
                alert('지출구분을 선택하세요.');
                return;
            }else if(this.totalAmt == ''){
                alert('거래금액을 입력하세요.');
                return;
            }else if(this.totalAmt == '0'){
                alert('거래금액을 바르게 입력하세요.');
                return;
            }else if(this.bong == ''){
                alert('봉사료를 입력하세요.');
                return;
            }

            let reqData: any = {};

            reqData['ymd'] = this.ymd; //거래일자

            reqData['saupId'] = this.saupId; // 선택한 사업ID
            reqData['soluId'] = this.soluId; // 회사코드 선택
            reqData['custNm'] = this.custNm; //고객명
            reqData['amt'] = this.supplyAmt; //공급가액
            reqData['vat'] = this.vat; //부가세
            reqData['bong'] = this.bong; //봉사료
            reqData['totalAmt'] = this.totalAmt; //합계
            reqData['geogu'] = this.geogu; //발급용도
            reqData['cultGb'] = this.cultGb; //지출구분
            reqData['confirm'] = this.confirm; //고객신분확인 입력
            reqData['positionGb'] = this.positionGb; //고객신분확인 선택
            reqData['subSaup'] = this.compoanyCode; //상품구분
            reqData['memo'] = this.memo; //메모
            reqData['trgu'] = '0'; //거래구분(0:승인)으로 고정

            let apiUrl = 'receipt';

            // api 데이터 호출
            CommonBoardService.postListDatas(apiUrl, null, reqData).then((response) => {
                    let result: any = response.data;
                    console.log(response)
                    if (response.status == 201) { //현금영수증 발급 성공
                        //console.log('현금영수증 발급 성공');
                        this.perm = result.perm;
                        // 현금영수증 발급 완료 화면 이동
                        this.$router.push({name:"cashReceiptIssueView", params:{reqPerm:this.perm , reqDate : this.sendYmd}});
                    } else {
                        alert('현금영수증 발급에 실패하였습니다.')
                        //console.log('현금영수증 발급 실패');
                        //console.log(result);
                    }
                }
                , (error) => {
                    //this.$Progress.finish();
                }
            ).catch((response) =>  {
                //console.log('response code check!!');
                //console.log(response);
                if(response.status.toString() == '401'){ // 토큰오류(401)면 로그인 이동
                    this.$router.push('/login')
                }
            });
            //this.$router.push('/home/cashReceiptIssueView')
            //this.$router.push({name:"cashReceiptIssueView", params:{reqPerm:'C39044964'}});
        }
        mounted() {
            //거래일자(현재 일자) 가져오기
            let d = new Date();
            this.ymd = d.getFullYear() +'.'+ (d.getMonth() + 1) +'.'+ d.getDate();
            this.sendYmd =  format(d,'YYYYMMDD')

            this.saupNo = sessionStorage.saupId;
            this.storeNm = sessionStorage.storeNm;

            this.getUpjongSelectList();
            this.getSinbunSelectList();

            // 메뉴별 권한 확인
            let menuList = JSON.parse(sessionStorage.authMenu);
            let programId = 'cashReceiptIssue'; //메뉴ID
            for (let i = 0; i < menuList.length; i++) {
                for (let j = 0; j < menuList[i].subMenuDtos.length; j++) {

                    //권한(조회-readYn/ 등록-createYn/ 수정-updateYn/ 삭제-deleteYn)
                    if (menuList[i].subMenuDtos[j].progId == programId && menuList[i].subMenuDtos[j].createYn == 'Y') {
                        this.regShow = true;
                    }
                }
            }



            // let upjong = sessionStorage.upJong; //일반-0001, 신문사-0002, 택배사-0003, 학원-0004
            // if(upjong == '0002' || upjong == '0003'){ //업종이 신문사, 택배사인 경우에만 상품구분이 보임
            //     this.getUpjongSelectList(upjong); //상품구분 코드 리스트 조회
            //     let obj = document.getElementById('companyViewChk');
            //     if(obj != null) {
            //         obj.children['0'].className = 'com_code';
            //         obj.children['1'].className = 'com_code';
            //     }
            // }else{ //상품구분 안보이기
            //     //let obj = document.getElementById('companyViewChk');
            //     //if(obj != null) {
            //     // obj.children['2'].setAttribute('style', 'display:none');
            //     // obj.children['3'].setAttribute('style', 'display:none');
            //     // obj.children['2'].hidden = true;
            //     // obj.children['3'].hidden = true;
            //     // obj.children['1'].setAttribute('colspan', '3');
            //     // obj.children['1'].children['0'].setAttribute('style', 'width:270px');
            //     //}
            // }
        }

        //상품구분(회사코드) select box 조회
        getUpjongSelectList(){
            // api 데이터 호출
            CommonBoardService.getListDatas('company',null,null).then((response) => {
                    let result: any = response.data;
                    //console.log(result)
                    if (result.length > 0) {
                        this.productList = result;
                    } else {
                        //console.log(result)
                    }
                }
                , (error) => {
                }
            ).catch();

        }

        // 신분확인 코드
        getSinbunSelectList(){
            CommonBoardService.getListDatas('code','positiongb',null).then((response) => {
                    let result: any = response.data;
                    //console.log(result)
                    if (result.length > 0) {
                        this.confirmList = result;
                    } else {
                        //console.log(result)
                    }
                }
                , (error) => {
                }
            ).catch();
        }

        // 숫자 체크(숫자만 입력가능)
        numberChk(event:any){
            //숫자, delete
            if(((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode > 95 && event.keyCode < 106) || event.keyCode == 8 || event.keyCode == 46 )){
                return true;
            } else {
                //event.preventDefault();
                event.returnValue = false;
            }
        }

        popupOpen(){
            this.showModal1= true;
        }

        setSaupData(data) {
            this.storeId = data.storeId; // 매장번호 번호
            this.saupId = data.saupId; //사업자 번호
            this.shopNm = data.shopNm; //가맹점명
            this.soluId = data.soluId; //가맹점명
            CommonBoardService.getListDatas('company',null,null).then(e=>{

            });
        }
    }
</script>