<template>

    <!-- container -->
    <section id="container">
        <!-- content  -->
        <div class="content">
            <h2 class="blind">가맹점 관리</h2>

            <h3>매장 일괄 등록</h3>

            <!-- btn top -->
            <div class="btn_top" v-if="regbtnShow">
                <button type="button" id="" class="btn_m01 bg02" v-on:click="indivReg">매장 개별 등록</button>
            </div>

            <!-- tbl view box -->
            <div class="tbl_view_box">
                <!-- tbl view01 -->
                <table class="tbl_view01">
                    <caption>사업장 기본 정보</caption>
                    <colgroup>
                        <col width="10%">
                        <col width="23%">
                        <col width="10%">
                        <col width="23%">
                        <col width="12%">
                        <col width="18%">
                    </colgroup>
                    <tbody>
                    <tr>
                        <th scope="row">가맹점<em class="form_req">*</em></th>
                        <td>
                            <!--<select id="" name="" class="select form_w100" title="가맹점" v-model="gajumId">
                                <option value="">선택</option>
                                <template v-for="datas in gajumList">
                                    <option v-bind:value=datas.gajumId>{{datas.shopNm}}</option>
                                </template>
                                <option value="0000011">롯데쇼핑㈜본점</option>
                            </select>-->
                            <input type="text" class="input form_industry" title="가맹점번호" v-model="gajumId">
                            <!--<input type="text" class="input form_w45" title="가맹점명" v-model="gajumNm">-->
                            <button type="button" id="" class="btn_sch01" v-if="regbtnShow" @click="gajiPopupOpen">검색</button>
                        </td>
                        <th scope="row">지점<em class="form_req">*</em></th>
                        <td>
                            <!--<select id="" name="" class="select form_w100" title="지점" v-model="jijumId">
                                <option value="">선택</option>
                                <template v-for="datas in jijumList">
                                    <option v-bind:value=datas.jijumId>{{datas.shopNm}}</option>
                                </template>
                                <option value="0001">롯데쇼핑㈜본점</option>
                                <option value="0003">롯데쇼핑㈜영등포점</option>
                            </select>-->
                            <input type="text" class="input form_industry" title="지점번호" v-model="jijumId">
                            <!--<input type="text" class="input form_w45" title="지점번호" v-model="jijumNm">-->
                            <button type="button" id="" class="btn_sch01" v-if="regbtnShow" @click="gajiPopupOpen">검색</button>
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

            <!-- search box -->
            <div class="search_file_box">
                <ul class="search_list">
                    <li>
                        <label class="sub_filereq" for="">엑셀 파일 등록</label>
                        <div class="input_file_form">
                            <input class="upload_path9" readonly="readonly" v-model="uploadFileNm">
                            <label class="upload btn_m01 bg02" id="btnFile">
                                <input type="file" @change="uploadFile($event)" />
                                <span>파일찾기</span>
                            </label>
                        </div>
                    </li>
                </ul>
                <span class="btn_req_area"><button type="button" id="" class="btn_m01 bg01"  v-if="regbtnShow" v-on:click="excelRegist('check')">등록</button></span>
            </div>
            <!-- //search box -->

            <!-- sch info bot -->
            <div class="sch_info_bot">
                <p class="text_type01 center">
                    xls, xlsx 파일로 일괄발급이 가능합니다.
                    <button type="button" id="" class="btn_s01 bg02" v-on:click="downloadSample"><i class="icon download"></i>샘플다운로드</button>
                </p>
                <p class="text_file">모든 파일 업로드 시 DRM 해제 후 파일 업로드 하시기 바랍니다.</p>
            </div>

            <!-- tbl scroll box -->
            <div class="tbl_scroll_box">
                <!-- tbl list02 -->
                <table class="tbl_list02 page_store03">
                    <caption>매장 목록</caption>
                    <colgroup>
                        <col width="50px">
                        <col width="100px">
                        <col width="200px">
                        <col width="150px">
                        <col width="150px">
                        <col width="150px">
                        <col width="184px">
                    </colgroup>
                    <thead>
                    <tr>
                        <th scope="col">순번</th>
                        <th scope="col">사업장명</th>
                        <th scope="col">사업자등록번호</th>
                        <th scope="col">대표자명</th>
                        <th scope="col">전화번호</th>
                        <th scope="col">법인등록번호</th>
                        <th scope="col">검증결과</th>
                    </tr>
                    </thead>
                </table>
                <!-- tbl scroll -->
                <div class="tbl_scroll">
                    <table class="tbl_list02 brd_none page_store03">
                        <caption>매장 목록</caption>
                        <colgroup>
                            <col width="50px">
                            <col width="100px">
                            <col width="200px">
                            <col width="150px">
                            <col width="150px">
                            <col width="150px">
                            <col width="167px">
                        </colgroup>
                        <tbody>
                            <template v-if="listData.length > 1">
                                <template v-for="(datas, index) in listData">
                                    <tr v-bind:class="datas.className">
                                        <td>{{datas.rowCnt}}</td>
                                        <td>{{datas.shopNm}}</td>
                                        <td>{{datas.saupId}}</td>
                                        <td>{{datas.chipNm}}</td>
                                        <td>{{datas.phoneNum}}</td>
                                        <td>{{datas.lawNum}}</td>
                                        <td>{{datas.resultMsg}}</td>
                                    </tr>
                                </template>
                            </template>
                            <template v-if="listData.length < 1">
                                <tr>
                                    <td colspan="7" class="no_data">조회된 내용이 없습니다.</td>
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
                <span class="data_result">기등록 : <strong class="fc_re04">{{alreadyData}}</strong>건</span>
                <span class="data_result">오류 : <strong class="fc_re02">{{errorData}}</strong>건</span>
                <span class="data_result"><strong class="fc_re03">{{possibleData}}</strong>개 매장 등록 예정</span>
            </div>

            <!-- btn bot -->
            <div class="btn_bot" v-if="storeRegShow">
                <button type="button" id="" class="btn_b02 bg01" v-on:click="excelRegist('add')">매장 등록</button>
            </div>

            <GajijumBox v-if="showModal1" v-bind:postData="postText1" v-on:selectedGaJijum="setGaJijumData" @gajiumClose="showModal1 = false"></GajijumBox>

        </div>
        <!-- //content -->
    </section>
    <!-- //container -->

</template>

<script lang="ts">
    import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
    import {CommonBoardService, CommonListService} from '../../../api/common.service';
    import {environment} from '../../../utill/environment';
    import GajijumBox from '@/components/contents/franchiseManage/GajijumBox.vue';
    import axios from 'axios';

    @Component({
        components: {
            StoreRegBulk, GajijumBox
        },
    })
    export default class StoreRegBulk extends Vue {
        message: any = '';

        gajumId: any = '';
        gajumNm: any = '';
        jijumId: any = '';
        jijumNm: any = '';
        subSaup: any = '';
        gajumList: any = {};
        jijumList: any = {};
        subSaupList: any = {};

        listData: any = []; //엑셀파일 대량 발급 파일 체크 결과 리스트
        file: any  = ''; //첨부한 파일 객체
        uploadPath : any = ''; //첨부한 파일
        fileUploadGbn: any = '1'; //파일업로드 구분(기본-파일 업로드)
        uploadFileNm: any = '';

        //엑셀파일 결과 값
        normalData : any = '0'; //엑셀파일 체크 결과(정상 건수)
        alreadyData: any = '0'; //엑셀파일 체크 결과(기등록 건수)
        errorData : any = '0'; //엑셀파일 체크 결과(오류 건수)
        possibleData : any = '0'; //엑셀파일 체크 결과(발급 예정)

        storeRegShow: boolean = false; //매장 등록버튼 제어

        showModal1: boolean = false; // 가맹점 검색
        postText1: string = ""; //테스트 가맹점

        regbtnShow: boolean = false; //등록버튼

        //돔생성전 호출자
        created() {

            //메뉴별 권한 확인
            let menuList = JSON.parse(sessionStorage.authMenu);
            console.log(menuList)
            let programId = 'storeRegBulk'; //메뉴ID
            for(let i=0; i<menuList.length; i++){
                for(let j=0; j<menuList[i].subMenuDtos.length; j++){

                    //권한(조회-readYn/ 등록-createYn/ 수정-updateYn/ 삭제-deleteYn)
                    if(menuList[i].subMenuDtos[j].progId == programId && menuList[i].subMenuDtos[j].createYn == 'Y') {
                        this.regbtnShow = true;
                    }
                }
            }
            //console.log('등록 권한 확인 ?? :: ' + this.regbtnShow)

            this.getCommonSelect();
        }

        //돔렌더링완료시 진행
        mounted() {
        }

        //가맹점 팝업 보임
        gajiPopupOpen(text) {
            console.log(text)
            this.showModal1 = true;
            //this.postText = "서울시금천구";
        }

        indivReg(){
            this.$router.push('/home/storeReg')
        }

        excelRegist(gbn) { //엑셀파일 등록

            if(this.gajumId == ''){
                alert('검색버튼을 클릭하여 가맹점을 입력하세요.');
                return;
            }else if(this.jijumId == ''){
                alert('검색버튼을 클릭하여 지점을 입력하세요.');
                return;
            }else if(this.subSaup == ''){
                alert('회사코드를 선택하세요.');
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

            let params : string = '?gajumId='+ this.gajumId + '&jijumId=' + this.jijumId + '&processType=' + gbn + '&subSaup=' + this.subSaup;

            let formData = new FormData();
            formData.append('file', this.file);

            CommonBoardService.postListDatas('store/file'+params, null, formData).then((response) => {
                    let result: any = response.data;
                    // data - list
                    // failCount
                    // duplicationCount
                    // successCount
                    // totalCount
                    console.log(result)
                    if(gbn == 'check') { //엑셀파일 체크

                        if (result.data.length > 0) {
                            console.log('엑셀 파일 체크 성공');
                            //this.listData =  result.data; //리스트
                            let rList: any = result.data; //리스트
                            let rowData: any = {};
                            let arrData: any = [];
                            let rowCnt: number = 0;
                            rList.filter(e => {
                                rowData = {};
                                rowCnt++;
                                if (e.resultCode == '000') {
                                    rowData['className'] = '';
                                } else if (e.resultCode == '001') { //데이터 오류
                                    rowData['className'] = 'date_error';
                                } else if (e.resultCode == '002') { //기등록
                                    rowData['className'] = 'date_before';
                                }
                                rowData['chipNm'] = e.chipNm;
                                rowData['lawNum'] = e.lawNum;
                                rowData['phoneNum'] = e.phoneNum;
                                rowData['resultCode'] = e.resultCode;
                                rowData['resultMsg'] = e.resultMsg;
                                rowData['saupId'] = e.saupId;
                                rowData['shopNm'] = e.shopNm;
                                rowData['rowCnt'] = rowCnt;
                                arrData.push(rowData);
                            });
                            this.listData = arrData;
                            this.errorData = result.failCount; //오류 건수
                            this.alreadyData = result.duplicationCount; //기등록
                            this.normalData = result.successCount; //정상 건수
                            this.possibleData = result.successCount; //등록예정 건수
                            if (result.successCount > 0) {
                                this.storeRegShow = true; //매장등록 버튼 보이기
                            }
                        } else {
                            console.log('엑셀 파일 체크 실패');
                        }
                    }else{ //엑셀파일 등록(매장 등록)
                        if(response.status == 200 || response.status == 201){
                            alert('매장 일괄 등록이 완료되었습니다.');
                            this.initData();
                        }
                    }
                }
                , (error) => {
                    //console.log(error)
                }
            ).catch();

        }

        initData(){

            this.gajumId = '';
            this.jijumId = '';
            this.subSaup = '';
            this.uploadFileNm = '';
            this.file = '';
            this.storeRegShow = false; //매장등록 버튼 감추기

            this.normalData = '0'; //엑셀파일 체크 결과(정상 건수)
            this.alreadyData = '0'; //엑셀파일 체크 결과(기등록 건수)
            this.errorData = '0'; //엑셀파일 체크 결과(오류 건수)
            this.possibleData = '0'; //엑셀파일 체크 결과(발급 예정)
            this.listData = []; //리스트 초기화
        }

        //대량 등록
        excelReg(){
            alert('등록되었습니다.')
        }

        //가맹점 등록
        insertFranchise() {

            this.$router.push('/home/franchiseRegCmpl')
        }

        uploadFile(event: any) { //파일 업로드
            this.file = '';
            this.uploadFileNm = '';
            this.file = event.target.files[0];
            this.uploadFileNm = this.file.name;
            console.log(this.file);
        }

        getCommonSelect(){
            //this.getSelectList('gajum');
            //this.getSelectList('jijum');
            this.getSelectList('subsaup');
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
                            /*let rList : any = result;
                            let resArr : any = [];
                            rList.filter(e => {
                                let resList : any = {};
                                resList['name'] = e.shopNm;
                                resList['value'] = e.gajumId;
                                resArr.push(resList);
                            });*/
                            this.gajumList = result;
                        }else if(code == 'jijum'){ //지점
                            /*let rList : any = result;
                            let resArr : any = [];
                            rList.filter(e => {
                                let resList : any = {};
                                resList['name'] = e.shopNm;
                                resList['value'] = e.jijumId;
                                resArr.push(resList);
                            });*/
                            this.jijumList = result;
                        }else if(code == 'subsaup'){ //회사코드
                            //let rSaup = result;
                            this.subSaupList = result;
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

        //선택한 가맹점,지점 정보 셋팅(지점 등록화면 상단의 지점 정보)
        setGaJijumData(data) {
            console.log(data)
            this.gajumId = data.gajumId;
            //this.gajumNm = data.gajumNm;
            this.jijumId = data.jijumId;
            //this.jijumNm = data.jijumNm;
        }

        downloadSample(){

            //파일 다운로드
            axios({
                url: environment.apiUrl + '/file/sample/store',
                method: 'GET',
                responseType: 'blob', // important
                headers: {"x-auth-token": sessionStorage.accessToken}
            }).then((response) => {
                console.log(response);
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', '매장 일괄 등록 양식.xlsx'); //or any other extension
                document.body.appendChild(link);
                link.click();
            });

            /*
            CommonBoardService.getListDatas('file/sample/store', null, null).then((response) => {
                    let result: any = response.data;
                    console.log(result)
                    if (result.length > 0) {
                        console.log('샘플 다운로드 성공')
                    } else {
                        console.log('샘플 다운로드 오류')
                    }
                }
                , (error) => {
                    console.log(error)
                }
            ).catch();
            */
        }

    }

</script>