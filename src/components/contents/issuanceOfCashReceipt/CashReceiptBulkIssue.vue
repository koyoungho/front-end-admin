<template>

    <!-- container -->
    <section id="container">
        <!-- content  -->
        <div class="content">
            <h2 class="blind">현금영수증 발급</h2>

            <h3>현금영수증 발급</h3>

            <!-- btn top -->
            <div class="btn_top">
                <button type="button" id="" class="btn_m01 bg04" v-on:click="indivIssue()">개별 발급</button>
            </div>

            <!-- tbl view box -->
            <div class="tbl_view_box">
                <!-- tbl view01 -->
                <table class="tbl_view01">
                    <caption>사업장 기본 정보</caption>
                    <colgroup>
                        <col width="20%">
                        <col width="30%">
                        <col width="20%">
                        <col width="30%">
                    </colgroup>
                    <tbody>
                    <tr>
                        <th scope="row">사업자등록번호<em class="form_req">*</em></th>
                        <td>
                            <input type="text" class="input form_indcode02" title="사업자등록번호" v-model="saupId" disabled="disabled">
                            <!--<input type="text" class="input form_w45" title="가맹점명" v-model="gajumNm">-->
                            <button type="button" id="" class="btn_sch01" @click="popupOpen">검색</button>
                        </td>
                        <th scope="row">회사코드<em class="form_req">*</em></th>
                        <td>
                            <select id="" name="" class="select form_w100" title="회사코드" v-model="subSaup">
                                <option value="">선택</option>
                                <template v-for="datas in subSaupList">
                                    <option v-bind:value=datas.code>{{datas.name}}</option>
                                </template>
                            </select>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div><br>
            <!-- //tbl view box -->

            <!-- cont_mobile -->
            <div class="cont_mobile">
                <!-- search box -->
                <div class="search_file_box">
                    <ul class="search_list page_issue">
                        <li>
                            <label class="sub_filereq" for="">엑셀 파일 등록</label>
                            <div class="input_file_form">
                                <input class="upload_path" readonly="readonly" v-model="uploadPath">
                                <label class="upload btn_m01 bg02">
                                    <input type="file" @change="uploadFile($event)" id="fileUpload">
                                    <span>파일찾기</span>
                                </label>
                            </div>
                        </li>
                    </ul>
                    <span class="btn_req_area"><button type="button" id="" class="btn_m01 bg01" v-on:click="excelRegist()" v-show="regShow">등록</button></span>
                </div>
                <!-- //search box -->
            </div>
            <!-- //cont_mobile -->

            <!-- 2018-11-06 수정 -->
            <!-- sch info bot -->
            <div class="sch_info_bot">
                <p class="text_type01 center">
                    xls, xlsx 파일로 일괄발급이 가능합니다.
                    <button type="button" id="" class="btn_s01 bg02" v-on:click="downloadSample()"><i class="icon download"></i>샘플다운로드</button>
                </p>
                <p class="text_file">모든 파일 업로드 시 DRM 해제 후 파일 업로드 하시기 바랍니다.</p>
            </div>

            <!-- tbl scroll box -->
            <div class="tbl_scroll_box">
                <!-- tbl list02 -->
                <table class="tbl_list02 page_cashissue">
                    <caption>현금영수증 발급</caption>
                    <colgroup>
                        <col width="100px">
                        <col width="100px">
                        <col width="100px">
                        <col width="80px">
                        <col width="80px">
                        <col width="80px">
                        <col width="130px">
                        <col width="80px">
                        <col width="90px">
                        <col width="144px">
                    </colgroup>
                    <thead>
                    <tr>
                        <th scope="col">거래일자</th>
                        <th scope="col">총액</th>
                        <th scope="col">공급가액</th>
                        <th scope="col">부가세</th>
                        <th scope="col">봉사료</th>
                        <th scope="col">발급용도</th>
                        <th scope="col">신분확인</th>
                        <th scope="col">고객명</th>
                        <th scope="col">메모</th>
                        <th scope="col">오류내역</th>
                    </tr>
                    </thead>
                </table>
                <!-- tbl scroll -->
                <div class="tbl_scroll">
                    <table class="tbl_list02 brd_none page_cashissue">
                        <caption>현금영수증 발급</caption>
                        <colgroup>
                            <col width="100px">
                            <col width="100px">
                            <col width="100px">
                            <col width="80px">
                            <col width="80px">
                            <col width="80px">
                            <col width="130px">
                            <col width="80px">
                            <col width="90px">
                            <col width="127px">
                        </colgroup>
                        <tbody>
                        <template v-if="listData.length > 1">
                            <template v-for="datas in listData">
                                <tr v-bind:class="datas.className">
                                    <td>{{datas.saleDate}}</td>
                                    <td class="right">{{datas.totalAmt}}</td>
                                    <td class="right">{{datas.amt}}</td>
                                    <td class="right">{{datas.vat}}</td>
                                    <td class="right">{{datas.bong}}</td>
                                    <td>{{datas.geogu}}</td>
                                    <td>{{datas.confirm}}</td>
                                    <td>{{datas.custNm}}</td>
                                    <td class="left">{{datas.memo}}</td>
                                    <td class="left">{{datas.error}}</td>
                                </tr>
                            </template>
                        </template>
                        <template v-if="listData.length < 1">
                            <tr>
                                <td colspan="10" class="no_data">조회된 내용이 없습니다.</td>
                            </tr>
                        </template>
                        </tbody>
                    </table>
                </div>
                <!-- //tbl scroll -->
            </div>
            <!-- //tbl scroll box -->

            <!-- tbl info result -->
            <div class="tbl_info_result">
                <span class="data_result">정상 : <strong class="fc_re01">{{normalData}}</strong>건</span>
                <span class="data_result">오류 : <strong class="fc_re02">{{errorData}}</strong>건</span>
                <span class="data_result">현금영수증 : <strong class="fc_re03">{{possibleData}}</strong>건 발급 예정</span>
            </div>

            <!-- btn bot -->
            <div class="btn_bot">
                <button type="button" id="" class="btn_b02 bg01" v-on:click="cashReceiptIssue()">현금영수증 일괄 발급</button>
            </div>

        </div>

        <SaupBox v-if="showModal1"  v-on:selectedSaup="setSaupData" @saupClose="showModal1 = false"></SaupBox>

        <!-- //content -->
    </section>
    <!-- //container -->


</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import {CommonBoardService} from '../../../api/common.service';
    import axios from 'axios';
    import {environment} from '../../../utill/environment';
    import SaupBox from '@/components/contents/issuanceOfCashReceipt/SaupList.vue'
    import moment from 'moment'

    @Component({
        components: {
            CashReceiptBulkIssue, SaupBox
        }
    })
    export default class CashReceiptBulkIssue extends Vue {

        listData: any = []; //엑셀파일 대량 발급 파일 체크 결과 리스트
        file: any  = ''; //첨부한 파일 객체
        uploadPath : any = ''; //첨부한 파일

        //엑셀파일 결과 값
        normalData : any = '0'; //엑셀파일 체크 결과(정상 건수)
        errorData : any = '0'; //엑셀파일 체크 결과(오류 건수)
        possibleData : any = '0'; //엑셀파일 체크 결과(발급 예정)
        regShow:boolean = false;

        saupId : string = '';
        subSaup : string = '';

        gajumList: any = {};
        jijumList: any = {};
        subSaupList: any = {};

        showModal1 : boolean= false; // 팝업

        created(){
            this.getSelectList('subsaup');
        }

        indivIssue() { //개별발급 화면 이동
            this.$router.push('/home/cashReceiptIssue');
        }
        cashReceiptIssue() { //현금영수증 대량 발급

            let formData = new FormData();
            //console.log(this.file);
            formData.append('file', this.file);
            formData.append('saupId ', this.saupId);
            formData.append('subSaup', this.subSaup);
            /*
                        axios.post('/api/receipts/file', formData, {
                            headers: {
                                "x-auth-token": sessionStorage.accessToken
                            }
                        }).then((response) => {
                                if (response.status.toString() == '201') {
                                    console.log('엑셀 파일 대량 등록 성공 ^_^');
                                    this.$router.push('/home/main')
                                } else {
                                    console.log('엑셀 파일 대량 등록 실패 -_-');
                                }
                            },
                            (error) => {
                                console.log(error);
                            }
                        ).catch();
            */

            let param = 'saupId='+this.saupId + '&subSaup='+this.subSaup;

            CommonBoardService.postListDatas('receipt/file?'+param, null, formData).then((response) => {
                    let result: any = response.data;
                    console.log(response);

                    // response.data 값
                    // data : []
                    // failCount: 7
                    // totalCount: 14
                    if (response.status.toString() == '201') {
                        alert('현금영수증 일괄등록 되었습니다.')

                        this.saupId = '';
                        this.subSaup = '';
                        this.file = '';

                        this.normalData = '0'; //엑셀파일 체크 결과(정상 건수)
                        this.errorData = '0'; //엑셀파일 체크 결과(오류 건수)
                        this.possibleData  = '0'; //엑셀파일 체크 결과(발급 예정)

                        this.listData = [];

                        this.uploadPath = '';

                    } else {
                        alert('현금영수증 일괄등록이 실패되었습니다.\n다시 시도 해 주세요.')
                    }
                }
                , (error) => {
                    //console.log(error);
                }
            ).catch();

        }

        downloadSample() { //샘플다운로드

            //파일 다운로드
            axios({
                url: environment.apiUrl + '/file/sample/receipt',
                method: 'GET',
                responseType: 'blob', // important
                headers: {"x-auth-token": sessionStorage.accessToken}
            }).then((response) => {
                console.log(response);
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', '현금영수증 일괄 등록 양식.xlsx'); //or any other extension
                document.body.appendChild(link);
                link.click();
            });

        }

        excelRegist() { //엑셀파일 등록

            if(this.saupId == ''){
                alert('사업자등록번호를 입력하세요.')
                return;
            }
            if(this.subSaup == ''){
                alert('회사코드를 선택하세요.')
                return;
            }
            if(this.file == null || this.file == ''){
                alert('파일찾기 버튼을 클릭하여 등록할 파일을 선택하세요.')
                return;
            }
            //파일 확장자 확인(xls, xlsx만 등록 가능)
            let fileExt =  this.file.name.split('.');
            if(fileExt[1].includes('xls') || fileExt[1].includes('xlsx')){
            }else{
                alert('파일 확장자를 확인하세요.\n(xls, xlsx파일만 등록 가능합니다)');
                return;
            }

            let formData = new FormData();
            formData.append('file', this.file);
            formData.append('saupId ', this.saupId);
            formData.append('subSaup', this.subSaup);
            //
            /*
            axios.post('http://211.39.150.112/api/receipts/filecheck', formData, {
                headers: {
                    "x-auth-token": localStorage.accessToken
                }
            }).then((response) => {
                    if (response.status.toString() == '201') {
                        console.log('엑셀 파일 대량 등록 성공 ^_^');
                        this.$router.push('/home/main')
                    } else {
                        console.log('엑셀 파일 대량 등록 실패 -_-');
                    }
                },
                (error) => {
                    console.log(error);
                }
            ).catch();
*/

            let param = 'saupId='+this.saupId + '&subSaup='+this.subSaup;

            CommonBoardService.postListDatas('receipt/file/check?'+param, null, formData).then((response) => {
                    let result: any = response.data;
                    // data - list
                    // failCount
                    // totalCount
                    if (result.data.length > 0) {
                        console.log('엑셀 파일 체크 성공');

                        let rowData : any = {};
                        let arrData : any = [];
                        let resData : any = result.data;
                        resData.filter(e =>{
                            rowData = {};
                            rowData['saleDate'] = moment(e.saleDate).format('YYYY.MM.DD');
                            rowData['totalAmt'] = this.numberWithCommas(e.totalAmt);
                            rowData['amt'] = this.numberWithCommas(e.amt);
                            rowData['vat'] = this.numberWithCommas(e.vat);
                            rowData['bong'] = this.numberWithCommas(e.bong);
                            rowData['geogu'] = e.geogu;
                            rowData['confirm'] = e.confirm;
                            rowData['custNm'] = e.custNm;
                            rowData['memo'] = e.memo;
                            rowData['error'] = e.error;
                            if(e.error != null && e.error != ''){
                                rowData['className'] = 'date_error';
                            }
                            arrData.push(rowData);
                        });

                        this.listData =  arrData; //리스트
                        this.errorData = result.failCount; //오류 건수
                        this.normalData = result.totalCount - result.failCount; //정상 건수
                        this.possibleData = result.totalCount - result.failCount; //발급예정 건수
                    } else {
                        console.log('엑셀 파일 체크 실패');
                    }
                }
                , (error) => {
                    //console.log(error)
                }
            ).catch();

        }
        uploadFile(event: any) { //파일 업로드
            this.file = event.target.files[0];
            this.uploadPath = this.file.name;
            //console.log(this.file)
            //let formData = new FormData();
            //formData.append('file',this.file);
        }
        mounted() {

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


            /*this.listData = [
                {dealData : '2018.10.04' ,totAmt : '100,000', supplyAmt : '9,000' , addedTax : '1,000' , coverAmt : '100' , issueUse : '소득공제' , customerPosition : '01023231234' , customerNm : '홍길동' , memo : 'sdfs2222' , error : ''},
                {dealData : '2018.10.02' ,totAmt : '100,000', supplyAmt : '9,000' , addedTax : '2,000' , coverAmt : '100' , issueUse : '소득공제' , customerPosition : '01023235462' , customerNm : '김길동' , memo : '12222222' , error : '신분확인번호오류'},
                {dealData : '2018.09.08' ,totAmt : '200,000', supplyAmt : '8,000' , addedTax : '1,000' , coverAmt : '100' , issueUse : '소득공제' , customerPosition : '01023239875' , customerNm : '박길동' , memo : '565454' , error : ''},
                {dealData : '2018.10.11' ,totAmt : '140,000', supplyAmt : '5,000' , addedTax : '3,000' , coverAmt : '100' , issueUse : '소득공제' , customerPosition : '01023235654' , customerNm : '남길동' , memo : '1zzzz222' , error : ''},
                {dealData : '2018.10.05' ,totAmt : '111,000', supplyAmt : '3,000' , addedTax : '1,000' , coverAmt : '100' , issueUse : '소득공제' , customerPosition : '01023239999' , customerNm : '이길동' , memo : '5555555' , error : ''}
            ]*/

        }

        //공통 select box 조회
        getSelectList(code: string){
            if(code == ''){
                return;
            }

            let reqData: any = {};
            let apiUrl : string = '';

            if(code == 'gajum'){ //가맹점
                apiUrl = 'saupjang/gajum/summary';
            }else if(code == 'jijum'){ //지점
                apiUrl = 'saupjang/jijum/summary';
            }else if(code == 'subsaup'){ //회사코드
                reqData['searchType'] = 'SEARCH';
                apiUrl = 'company';
            }

            // api 데이터 호출
            CommonBoardService.getListDatas(apiUrl, null, reqData).then((response) => {
                    let result: any = response.data;
                    //console.log(result)
                    if (result.length > 0) {
                        if(code == 'gajum'){ //가맹점
                            this.gajumList = result;
                        }else if(code == 'jijum'){ //지점
                            this.jijumList = result;
                        }else if(code == 'subsaup'){ //회사코드
                            //let rSaup = result;
                            this.subSaupList = result;
                        }
                    }
                }
                , (error) => {
                    //console.log(error)
                }
            ).catch();
        }


        popupOpen(){
            this.showModal1= true;
        }

        setSaupData(data) {
            //this.storeId = data.storeId; // 매장번호 번호
            this.saupId = data.saupId; //사업자 번호
            //this.shopNm = data.shopNm; //가맹점명
            //this.soluId = data.soluId; //가맹점명

        }

        numberWithCommas(n) {
            let parts=n.toString().split(".");
            return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "");
        }



    }
</script>
