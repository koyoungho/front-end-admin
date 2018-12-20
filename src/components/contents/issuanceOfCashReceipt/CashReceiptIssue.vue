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
                            <input type="text" class="input sch_indcode01" value="000-00-00000" title="사업자등록번호">
                            <button type="button" id="" class="btn_sch01">검색</button>
                            <input type="text" class="input sch_indcode02" value="롯데백화점 강남점" title="가맹점명">
                        </td>
                        <th scope="row">거래일자</th>
                        <td class="con_row01"><strong>{{ymd}}</strong> </td>
                    </tr>

                    <tr>
                        <th scope="row">발급용도<em class="form_req">*</em></th>
                        <td>
                            <select id="" name="" class="select form_w100" title="발급용도">
                                <option>선택</option>
                            </select>
                        </td>
                        <th scope="row">고객신분확인<em class="form_req">*</em></th>
                        <td>
                            <select id="" name="" class="select form_userfind" title="고객신분">
                                <option>휴대폰01</option>
                                <option>휴대폰02</option>
                            </select>
                            <input type="text" class="input form_userint" title="고객신분">
                        </td>

                    </tr>
                    <tr>
                        <th scope="row">지출구분<em class="form_req">*</em></th>
                        <td>
                        <span class="rdo_box"><input type="radio" name="chk" value="2" id="aa11" checked="checked"><label for="aa11">일반</label></span>
                        <span class="rdo_box"><input type="radio" name="chk" value="2" id="aa12"><label for="aa12">도서/공연</label></span>
                        <span class="rdo_box"><input type="radio" name="chk" value="2" id="aa13"><label for="aa13">대중교통</label></span>
                        </td>
                        <th scope="row">회사코드</th>
                        <td>
                            <select id="" name="" class="select form_w100" title="회사코드">
                                <option>선택</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">고객성명</th>
                        <td><input type="text" class="input form_w100" title="고객성명"></td>
                        <th scope="row">메모</th>
                        <td><input type="text" class="input form_w100" title="메모"></td>
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
                                    <input type="text" id="" name="" class="input form_price" title="거래금액">
                                    <em class="text_price">원</em>
                                </td>
                                <td class="center">
                                    <input type="text" id="" name="" class="input form_price" title="봉사료">
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
                                    <input type="text" id="" name="" class="input form_price" value="10,000" readonly="" title="공급가액">
                                    <em class="text_price">원</em>
                                </td>
                                <td class="center">
                                    <input type="text" id="" name="" class="input form_price" readonly="" title="봉사료">
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
                <span class="chk_box"><input type="checkbox" id="aa01"><label for="aa01">면세 및 간이과세자</label></span>
            </div>

            <!-- btn bot -->
            <div class="btn_bot">
                <button type="button" id="" class="btn_b01 bg02">초기화</button>
                <button type="button" id="" class="btn_b01 bg01" v-on:click="receiptIssue">발급</button>
            </div>

        </div>
        <!-- //content -->
    </section>
    <!-- //container -->

</template>

<script lang="ts">
    import {Component, Vue, Watch} from 'vue-property-decorator';
    import {CommonBoardService} from '../../../api/common.service';

    @Component({
        components: {
            CashReceiptIssue
        }
    })
    export default class CashReceiptIssue extends Vue {

        positionGb: any = ''; //고객신분확인 선택
        confirm: any = ''; //고객신분확인 입력
        custNm: any = ''; //고객명
        geogu: any = ''; //발급용도
        productGbn: any = ''; //상품구분
        trgu: any = '0'; //지출구분
        memo: any = '0'; //메모
        totalAmt: any = 0; //합계
        bong: any = 0; //봉사료
        supplyAmt: any = 0; //공급가액
        vat: any = 0; //부가세
        noTaxGbn: any = '';
        perm : any = ''; //현금영수증 발급 결과

        ymd: any = '';

        //select box 객체
        confirmList: any = []; //고객신분확인
        geoguList: any = []; //발급용도

        @Watch('positionGb') onChange(){
            if(this.positionGb == '6') { //자진발급이면 0100001234로 자동 입력
                this.confirm = '0100001234';
            }else{
                this.confirm = '';
            }
        }
        @Watch('totalAmt') onTotalamtChange(){ //합계 변경시
            this.supplyAmt = Math.floor((Number(this.totalAmt) + Number(this.bong)) / 1.1); // 공급가액 : (합계+봉사료) * 1.1
            this.vat = Math.floor(Math.floor((Number(this.totalAmt) + Number(this.bong)) / 1.1) * 0.1); // 부가세 : 공급가액의 10%
        }
        @Watch('bong') onBongChange(){ //봉사료 변경시
            this.supplyAmt = Math.floor((Number(this.totalAmt) + Number(this.bong)) / 1.1); // 공급가액 : (합계+봉사료) * 1.1
            this.vat = Math.floor(Math.floor((Number(this.totalAmt) + Number(this.bong)) / 1.1) * 0.1); // 부가세 : 공급가액의 10%
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
            this.trgu = ''; //지출구분
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
                }else if(this.positionGb == '3'){ //사업자번호
                    alert('고객신분확인에 사업자번호를 입력하세요.');
                    return;
                }else if(this.positionGb == '4'){ //현금영수증카드
                    alert('고객신분확인에 현금영수증카드 번호를 입력하세요.');
                    return;
                }else if(this.positionGb == '5'){ //신용카드
                    alert('고객신분확인에 신용카드 번호를 입력하세요.');
                    return;
                }else if(this.positionGb == '6'){ //QR번호
                    alert('고객신분확인에 QR번호를 입력하세요.');
                    return;
                }
            }

            let searchData: any = {};

            searchData['positionGb'] = this.positionGb; //고객신분확인 선택
            searchData['confirm'] = this.confirm; //고객신분확인 입력
            //searchData['custNm'] = this.custNm; //고객명
            //searchData['geogu'] = this.geogu; //발급용도
            //searchData['trgu'] = this.trgu; //지출구분

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
            this.positionGb = ''; //고객신분확인 선택
            this.confirm = ''; //고객신ㄴ분확인 입력
            this.custNm = ''; //고객명
            this.geogu = ''; //발급용도
            this.productGbn = ''; //상품구분
            this.trgu = ''; //지출구분
            this.memo = ''; //메모
            this.totalAmt = 0; //합계
            this.bong = 0; //봉사료
            this.supplyAmt = 0; //공급가액
            this.vat = 0; //부가세
        }
        receiptIssue() { //현금영수증 발급
/*
            if(this.positionGb == ''){
                alert('고객신분확인을 선택하세요.');
                return;
            }else if(this.confirm == ''){
                alert('고객신분확인을 입력하세요.');
                return;
            //}else if(this.custNm == ''){
            //    alert('고객성명을 입력하세요.');
            //    return;
            }else if(this.geogu == ''){
                alert('발급용도를 선택하세요.');
                return;
            }else if(this.trgu == ''){
                alert('지출구분을 선택하세요.');
                return;
            }else if(this.totalAmt == ''){
                alert('합계를 입력하세요.');
                return;
            }else if(this.bong == ''){
                alert('봉사료를 입력하세요.');
                return;
            }

            let reqData: any = {};

            reqData['ymd'] = this.ymd; //거래일자

            reqData['custNm'] = this.custNm; //고객명
            reqData['amt'] = '5'//this.supplyAmt; //공급가액
            reqData['vat'] = '5'//this.vat; //부가세
            reqData['bong'] = this.bong; //봉사료
            reqData['totalAmt'] = this.totalAmt; //합계
            reqData['geogu'] = this.geogu; //발급용도
            reqData['trgu'] = this.trgu; //지출구분
            reqData['confirm'] = this.confirm; //고객신분확인 입력
            reqData['positionGb'] = this.positionGb; //고객신분확인 선택
            reqData['subSaup'] = this.productGbn; //상품구분
            reqData['custId'] = this.memo; //메모

            let apiUrl = 'receipts';
            //let apiUrl = 'receipts99999999';

            // api 데이터 호출
            CommonBoardService.postListDatas(apiUrl, null, reqData).then((response) => {
                    let result: any = response.data;

                    if (result.code == '000') { //현금영수증 발급 성공
                        console.log('현금영수증 발급 성공');
                        this.perm = result.perm;
                        console.log(result);
                        // 현금영수증 발급 완료 화면 이동
                        this.$router.push({name:"cashReceiptIssueView", params:{reqPerm:this.perm}});
                    } else {
                        console.log('현금영수증 발급 실패');
                        console.log(result);
                    }
                }
                , (error) => {
                    //this.$Progress.finish();
                    console.log(error);
                }
            ).catch((response) =>  {
                console.log('response code check!!');
                console.log(response);
                if(response.status.toString() == '401'){ // 토큰오류(401)면 로그인 이동
                    this.$router.push('/login')
                }
            });
*/


            //this.$router.push('/home/cashReceiptIssueView')
            this.$router.push({name:"cashReceiptIssueView", params:{reqPerm:'C39044964'}});
        }
        mounted() {
            //거래일자(현재 일자) 가져오기
            let d = new Date();
            this.ymd = d.getFullYear() +'.'+ (d.getMonth() + 1) +'.'+ d.getDate();

            this.getSelectList('0047'); //고객신분코드 조회
            this.getSelectList('0034'); //발급용도 조회

            //테스트 데이터
            //this.positionGb = '6'; //고객신분확인 선택
            //this.confirm = '0100001234'; //고객신분확인 입력
            //this.custNm = '김남주'; //고객명
            // this.geogu = '1'; //발급용도
            // this.productGbn = ''; //상품구분
            // this.trgu = '1'; //지출구분
            // this.memo = ''; //메모
            // this.totalAmt = 1000; //합계
            // this.bong = 100; //봉사료
            // this.supplyAmt = 50; //공급가액
            // this.vat = 100; //부가세
        }
        //공통 select box 조회
        getSelectList(code: string){
            if(code == ''){
                return;
            }
            // api 데이터 호출
            CommonBoardService.getListDatas('pcodes/'+code+'/codes', null, '').then((response) => {
                    let result: any = response.data;
                    //console.log(result)
                    if (result.length > 0) {
                        if(code == '0047'){ //고객신분코드
                            this.confirmList = result;
                        }else if(code == '0034'){ //발급용도
                            this.geoguList = result;
                        }
                    } else {
                        //console.log(result)
                    }
                }
                , (error) => {
                }
            ).catch();

        }
    }
</script>