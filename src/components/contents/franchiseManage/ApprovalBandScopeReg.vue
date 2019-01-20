<template>

    <!-- container -->
    <section id="container">
        <!-- content  -->
        <div class="content">
            <h2 class="blind">가맹점 관리</h2>

            <h3>승인대역 범위 설정</h3>

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
                        <!--<th scope="row">회사코드</th>
                        <td class="con_comcode">
                            <select id="" name="" class="select form_comcode" title="회사코드" v-model="subSaup">
                                <option value="">선택</option>
                                <template v-for="datas in companyCodeList">
                                    <option v-bind:value=datas.code>{{datas.name}}</option>
                                </template>
                            </select>
                            <input type="text" class="input form_comcode" title="승인코드" disabled="disabled" v-model="subSaupNo">
                        </td>-->
                        <th scope="row">승인코드</th>
                        <td colspan="3">
                            <!--<select id="" name="" class="select form_w100" title="승인번호" v-model="aproCode">
                                <option value="">선택</option>
                                <template v-for="datas in aproCodeList">
                                    <option v-bind:value=datas.code>{{datas.codeNm}}</option>
                                </template>
                            </select>-->
                            <input type="text" class="input form_app01" title="승인코드" v-model="aproCode" maxlength="2">
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
                <!--<button type="button" id="" class="btn_b01 bg03">승인대역 범위 수정</button>-->
                <!--<button type="button" id="" class="btn_b01 bg03" v-on:click="deleteScope">승인대역 범위 삭제</button>-->
                <button type="button" id="" class="btn_b01 bg01" v-on:click="validationChk">승인대역 범위 등록</button>
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
            ApprovalBandScopeReg, SaupBox
        },
    })
    export default class ApprovalBandScopeReg extends Vue {
        message: any = '';

        subSaup : any = '';
        subSaupNo : any = '';
        aproCode : any = '';
        aproBandFrom : any = '';
        aproBandTo : any = '';
        aproCnt: any = '';

        aproCodeList: any = {};
        companyCodeList: any = {};

        //돔생성전 호출자
        created() {

            //this.getSelectList('SEARCH'); //회사코드
            //this.getSelectList('APRO'); //승인코드
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
                //saupId : this.saupId,
                //subSaup : this.companyCode,
                aprvFrom : this.aproBandFrom,
                aprvTo : this.aproBandTo,
                aprvCode : this.aproCode,
                aprvCount : this.aproCnt,
            };

            let reqParam : any = { 'addDto' : reqData };

            // api 데이터 호출(승인대역 등록)
            CommonBoardService.postListDatas('approvalband/range', null, reqData).then((response) => {
                    //let result: any = response.data;
                    if(response.status == 200 || response.status == 201) {
                        alert('승인대역 범위 등록되었습니다.')
                        this.$router.push('/home/approvalBandScopeList')
                    } else {
                        alert('승인대역 범위 등록이 실패하였습니다.\n다시 시도하세요.');
                    }
                }
                , (error) => {
                    if(error.data.code == 400){
                        alert(error.data.message);
                        return;
                    }
                }
            ).catch((response) => {
            });

            //this.$router.push('/home/approvalBandList')
        }

        @Watch('aproBandFrom') onFromChange(){
            if(this.aproBandFrom != '' && this.aproBandTo != '') {
                this.aproCnt = (Number(this.aproBandTo) - Number(this.aproBandFrom) + 1);
            }
        }

        @Watch('aproBandTo') onToChange(){
            if(this.aproBandFrom != '' && this.aproBandTo != '') {
                this.aproCnt = (Number(this.aproBandTo) - Number(this.aproBandFrom) + 1);
            }
        }

        validationChk(){

            /*if(this.subSaup == ''){
                alert('회사코드를 선택하세요.')
                return;
            }else */
            if(this.aproCode == ''){
                alert('승인코드를 입력하세요.')
                return;
            }else if(this.aproBandFrom == ''){
                alert('승인대역 시작점을 입력하세요.')
                return;
            }else if(this.aproBandTo == ''){
                alert('승인대역 끝점을 입력하세요.')
                return;
            }/*else if(this.aproCnt == ''){
                alert('단일 최대건수를 입력하세요.')
                return;
            }*/
            else{
                //this.aproBandChk();
                this.insertInfo();
            }

        }

        //승인대역 사용 가능여부 검증
        aproBandChk(){

            //대역폭 정보
            let bandData: any = {
                //subSaup: this.subSaup, //회사코드
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
                apiUrl = 'code/aprvcode';
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
                }
            ).catch();

        }

    }

</script>