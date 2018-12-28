<template>

    <!-- container -->
    <section id="container">
        <!-- content  -->
        <div class="content">
            <h2 class="blind">가맹점 관리</h2>

            <h3>승인대역 범위 수정</h3>

            <!-- tbl view box -->
            <div class="tbl_view_box">
                <!-- tbl view01 -->
                <table class="tbl_view01">
                    <caption>승인 대역</caption>
                    <colgroup>
                        <col width="17%">
                        <col width="33%">
                        <col width="17%">
                        <col width="33%">
                    </colgroup>
                    <tbody>
                    <tr>
                        <th scope="row">회사코드</th>
                        <td class="con_comcode">
                            <select id="" name="" class="select form_comcode" title="회사코드" v-model="subSaup" disabled="disabled">
                                <option value="">선택</option>
                                <template v-for="datas in companyCodeList">
                                    <option v-bind:value=datas.code>{{datas.name}}</option>
                                </template>
                            </select>
                            <input type="text" class="input form_comcode" title="승인코드" disabled="disabled" v-model="subSaupNo" disabled="disabled">
                        </td>
                        <th scope="row">승인코드</th>
                        <td>
                            <select id="" name="" class="select form_w100" title="승인번호" v-model="aproCode">
                                <option value="">선택</option>
                                <template v-for="datas in aproCodeList">
                                    <option v-bind:value=datas.code>{{datas.codeNm}}</option>
                                </template>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">승인대역</th>
                        <td colspan="3">
                            <input type="text" class="input form_app01" title="승인대역 시작점" v-model="aproBandFrom">
                            <span class="period_cal">-</span>
                            <input type="text" class="input form_app01" title="승인대역 끝점" v-model="aproBandTo">
                            (단일 최대 건수 <input type="text" class="input form_app02" placeholder="건수(1000건 단위)" value="" title="건수" v-model="aproCnt"> )
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <!-- //tbl view box -->

            <!-- btn bot -->
            <div class="btn_bot">
                <button type="button" id="" class="btn_b01 bg02">취소</button>
                <button type="button" id="" class="btn_b01 bg03">승인대역 범위 수정</button>
                <button type="button" id="" class="btn_b01 bg03">승인대역 범위 삭제</button>
                <button type="button" id="" class="btn_b01 bg01">승인대역 범위 등록</button>
            </div>

        </div>
        <!-- //content -->
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
            ApprovalBandScopeDetl, SaupBox
        },
    })
    export default class ApprovalBandScopeDetl extends Vue {
        message: any = '';

        objectKey: any = '';

        subSaup : any = '';
        subSaupNo : any = '';
        aproCode : any = '';

        aproBandFrom : any = '';
        aproBandTo : any = '';

        aproCnt: any = '';

        //돔생성전 호출자
        created() {

            this.getSelectList('SEARCH'); //회사코드
            this.getSelectList('APRO'); //승인코드

            this.detailView();

        }

        //돔렌더링완료시 진행
        mounted() {
        }

        //상세정보 조회
        detailView(){
            this.objectKey = this.$route.params.objectKey;
            console.log('넘겨받은 값 확인');
            console.log(this.objectKey);

            if(!this.objectKey){
                alert('접근할수 없습니다')
                this.$router.push({name:'approvalBandScopeList'});
            }else{

                let subSaup : string = this.objectKey.subSaup; // 회사코드
                let aproCode : string = this.objectKey.aprvCode; // 승인코드
                let aproBandFrom : string = this.objectKey.aprvFrom; // 승인 시작대역
                let aproBandTo : string = this.objectKey.aprvTo; // 승인 끝대역

                let reqData : any = { subSaup :  subSaup, aproBandFrom : aproBandFrom, aproBandTo : aproBandTo };

                CommonBoardService.getListDatas('approvalband/range/'+aproCode, null, reqData).then((response) => {
                    let result: any =  response.data;
                    console.log(result)
                    if(result != null){
                        this.subSaup = result.subSaup; //회사코드
                        this.aproCode = result.aprvCode; // 승인코드
                        this.aproBandFrom = result.aprvFrom; // 회사코드 표시
                        this.aproBandTo = result.aprvTo; //점코드
                        this.aproCnt = result.perCount; //변경시 체크를 위한 점코드
                    }
                }).catch();

            }
        }

        cancelInfo(){
            this.$router.push('/home/approvalBandScopeList')
        }

        //수정
        updateInfo(){

            let reqData : any = {
                subSaup : this.subSaup,
                aprvCode : this.aproCode,
                aprvFrom : this.aproBandFrom,
                aprvTo : this.aproBandTo,
                aprvCount : this.aproCnt,
            };
            console.log('승인대역 범위 수정')
            // api 데이터 호출(승인대역 등록)
            CommonBoardService.updateListData('approvalband/range'+this.aproCode, null, reqData).then((response) => {
                    let result: any = response.data;
                    console.log(result);
                    if (result != null) {
                        alert('승인대역 범위가 수정되었습니다.')
                        this.$router.push('/home/approvalBandScopeList')
                    } else {
                        alert('승인대역 범위 수정이 실패하였습니다.\n다시 시도하세요.');
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

    }

</script>