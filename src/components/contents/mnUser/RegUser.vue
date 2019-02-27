<template>
    <!-- container -->
    <section id="container">
        <!-- content  -->
        <div class="content">
            <h2 class="blind">시스템관리</h2>

            <h3>계정 등록</h3>

            <h4>관리자 정보</h4>
            <!-- tbl view box -->
            <div class="tbl_view_box">
                <!-- tbl view01 -->
                <table class="tbl_view01">
                    <caption>관리자 정보</caption>
                    <colgroup>
                        <col width="17%">
                        <col width="33%">
                        <col width="17%">
                        <col width="33%">
                    </colgroup>
                    <tbody>
                    <tr>
                        <th scope="row">이름<em class="form_req">*</em></th>
                        <td class="vtop"><input type="text" class="input form_w100" title="이름" v-model="name" maxlength="20"></td>
                        <th scope="row">휴대폰번호<em class="form_req">*</em></th>
                        <td>
                            <input type="text" class="input form_w100" title="휴대폰번호" v-model="phoneNum" maxlength="12">
                            <p class="info_msg2" id="phone_msg"></p> <!-- 메시지 표시 -->
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">ID<em class="form_req">*</em></th>
                        <td class="vtop">
                            <input type="text" class="input form_id" title="ID" v-model="id" v-on:keyup="idCh()" maxlength="16">
                            <input type="hidden" v-model="idChkYn">
                            <button type="button" id="" class="btn_s01 bg04" @click="idChk()">중복확인</button>
                            <p class="info_msg2" id="id_msg"></p> <!-- 메시지 표시 -->
                        </td>
                        <th scope="row">이메일주소<em class="form_req">*</em></th>
                        <td class="vtop">
                            <input type="text" class="input form_w100" title="이메일주소" v-model="email" maxlength="30">
                            <p class="info_msg2" id="email_msg"></p> <!-- 메시지 표시 -->
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">계정등급<em class="form_req">*</em></th>
                        <td>
                            <select id="" name="" class="select form_w100" title="계정등급" v-model="accountLevel">
                                <option value="">선택</option>
                                <template v-for="datas in roleList">
                                    <option v-bind:value=datas.code>{{datas.codeNm}}</option>
                                </template>
                            </select>
                        </td>
                        <th scope="row">계정상태</th>
                        <td>
                            <input type="input" class="select form_w100" title="계정상태" value="승인" disabled="disabled">
                        </td>
                    </tr>
                    <!--<tr>
                        <th scope="row">주소</th>
                        <td colspan="3">
                            <ul class="address_list">
                                <li class="con01">
                                    <input type="text" class="input form_post" title="우편번호" v-model="zipCode" disabled="disabled">
                                    <button type="button" id="" class="btn_s01 bg03" @click="addressBoxOn">우편번호</button>
                                </li>
                                <li class="con02">
                                    <input type="text" class="input form_address01" title="주소" v-model="addr1" maxlength="40">
                                </li>
                                <li class="con03">
                                    <input type="text" class="input form_address02" title="상세 주소" v-model="addr2" maxlength="40">
                                </li>
                            </ul>
                        </td>
                    </tr>-->
                    <tr>
                        <th scope="row">회사코드<em class="form_req">*</em></th>
                        <td colspan="1">
                            <model-list-select :list="subSaupList"
                                               v-model="subSaupCode"
                                               option-value="code"
                                               option-text="name"
                                               style="height :10px"
                            >
                            </model-list-select >
                        </td>
                        <th scope="row">접속IP 대역</th>
                        <td colspan="1">
                            <input type="text" class="input form_conip" title="접속IP 대역" v-model="accessIpFrom" maxlegnth="15">
                            <span class="period_form">-</span>
                            <input type="text" class="input form_conip" title="접속IP 대역" v-model="accessIpTo" maxlength="15">
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <!-- //tbl view box -->

            <h4>가맹점 사업자등록정보</h4>
            <!-- tbl view box -->
            <div class="tbl_view_box">
                <!-- tbl view01 -->
                <table class="tbl_view01">
                    <caption>사업장 기본 정보</caption>
                    <colgroup>
                        <col width="17%">
                        <col width="33%">
                        <col width="17%">
                        <col width="33%">
                    </colgroup>
                    <tbody>
                    <tr>
                        <th scope="row">사업자등록번호<em class="form_req">*</em></th>
                        <td>
                            <input type="text" class="input form_industry" title="사업자등록번호" v-model="saupId" v-on:keyup="saupIdCh()" maxlength="10">
                            <input type="hidden" v-model="saupIdChkYn">
                            <button type="button" id="" class="btn_s01 bg04" v-on:click="saupInfo(saupId)">찾기</button>
                            <p class="info_msg2" id="saupid_msg"></p> <!-- 메시지 표시 -->
                        </td>
                        <th scope="row">사업장명</th>
                        <td class="vtop"><input type="text" class="input form_w100" title="사업장명" v-model="saupjang.shopNm" disabled="disabled"></td>
                    </tr>
                    <tr>
                        <th scope="row">대표자명</th>
                        <td class="vtop"><input type="text" class="input form_w100" title="대표자명" v-model="saupjang.chipNm" disabled="disabled"></td>
                        <th scope="row">전화번호</th>
                        <td>
                            <input type="text" class="input form_w100" title="전화번호" v-model="saupjang.telNum" disabled="disabled">
                            <p class="info_msg2" id="telnum_msg"></p> <!-- 메시지 표시 -->
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">주소</th>
                        <td colspan="3">
                            <ul class="address_list">
                                <li class="con01">
                                    <input type="text" class="input form_post" title="우편번호" v-model="saupjang.zipCode" disabled="disabled">
                                    <!--<button type="button" id="" class="btn_s01 bg03" @click="addressBoxOn">우편번호</button>-->
                                </li>
                                <li class="con02">
                                    <input type="text" class="input form_address01" title="주소" v-model="saupjang.addr1" disabled="disabled">
                                </li>
                                <li class="con03">
                                    <input type="text" class="input form_address02" title="상세 주소" v-model="saupjang.addr2" disabled="disabled">
                                </li>
                            </ul>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <!-- //tbl view box -->

            <h4>메뉴사용권한</h4>
            <!-- tbl list box -->
            <!--<ListComponent v-bind:listObject="listItem" v-bind:onLoadList="listItem.dataGrid.onLoadList" v-on:listView="listViewEvent" v-on:listCheckEvent="checkBoxEvent"></ListComponent>-->
            <!-- //tbl list box -->

            <!-- tbl list box -->
            <div class="tbl_list_box">
                <!-- tbl list01 -->
                <table class="tbl_list01">
                    <caption>메뉴사용권한 목록</caption>
                    <colgroup>
                        <col width="17%">
                        <col width="21%">
                        <col width="21%">
                        <col width="21%">
                        <col width="20%">
                    </colgroup>
                    <thead>
                    <tr>
                        <th scope="col">메뉴</th>
                        <th scope="col">조회</th>
                        <th scope="col">등록</th>
                        <th scope="col">수정</th>
                        <th scope="col">삭제</th>
                    </tr>
                    </thead>
                    <tbody v-for="datas in menuList">
                    <tr>
                        <th scope="row">{{datas.name}}</th>
                        <td><span class="chk_box"><input type="checkbox" v-bind:id="datas.readId" v-model="datas.readGbn"><label for=""><span class="blind">선택</span></label></span></td>
                        <td><span class="chk_box"><input type="checkbox" v-bind:id="datas.createId" v-model="datas.createGbn"><label for=""><span class="blind">선택</span></label></span></td>
                        <td><span class="chk_box"><input type="checkbox" v-bind:id="datas.updateId" v-model="datas.updateGbn"><label for=""><span class="blind">선택</span></label></span></td>
                        <td><span class="chk_box"><input type="checkbox" v-bind:id="datas.deleteId" v-model="datas.deleteGbn"><label for=""><span class="blind">선택</span></label></span></td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <!-- //tbl list box -->

            <!-- btn bot -->
            <div class="btn_bot">
                <button type="button" id="" class="btn_b01 bg02" v-on:click="regCancel()">취소</button>
                <button type="button" id="" class="btn_b01 bg01" v-on:click="validationChk()" v-show="regShow">등록</button>
            </div>

        </div>
        <AddressBox v-if="addressBox1" v-on:selectedValue="setDataAddr1" @close="addressBox1 = false"></AddressBox>
        <AddressBox v-if="addressBox2" v-on:selectedValue="setDataAddr2" @close="addressBox2 = false"></AddressBox>
        <!-- //content -->
    </section>
    <!-- //container -->
</template>

<script lang="ts">

    import {Component, Vue, Watch} from "vue-property-decorator";
    import {CommonBoardService} from '../../../api/common.service';
    import AddressBox from '@/components/common/addressBox/addressBox.vue';
    import ListComponent from '../../common/list/list.vue';  // 공용리스트 콤포넌트
    import {Saupjang} from '../../../model/account/saupjang';
    import {environment} from '../../../utill/environment';
    import { ModelListSelect } from 'vue-search-select'

    @Component({
        components: {
            RegUser,AddressBox,ListComponent
        }
    })
    export default class RegUser extends Vue {

        //사용자정보
        name: any = ''; //이름
        phoneNum: any = ''; //휴대폰번호
        id: any = ''; //ID
        idChkYn: any = ''; //아이디 사용가능 여부
        email: any = ''; //이메일
        accountLevel: any = ''; //계정등급
        accountStatus: any = ''; //계정상태
        zipCode: any = ''; //우편번호
        addr1: any = ''; //주소
        addr2: any = ''; //상세주소
        subSaupCode: any = ''; //회사코드
        accessIpFrom: any = ''; //접속IP 시작
        accessIpTo: any = ''; //접속IP 끝

        //사업장정보
        saupId: any = ''; //사업자등록번호
        saupIdChkYn: any = ''; //사업자정보 찾기 여부

        menuList: any = []; //메뉴 권한 리스트
        regShow :boolean =false;

        saupjang : Saupjang[]=[];

        subSaupList : any = [];
        roleList : any = [];

        model : any = [];
        auth : any = "";
        addressBox1 : boolean = false;
        addressBox2 : boolean = false;
        listItem: any =
            {
                dataGrid: {
                    columControl:[
                        {columName : '메뉴' ,id : 'number0',type:'number', width : '5%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' },
                        {columName : '조회' ,id : 'rnum',type:'checkBox', width : '5%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' ,checkVal :  false , allCheck: false},
                        {columName : '등록' ,id : 'rnum',type:'checkBox', width : '5%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' ,checkVal :  false , allCheck: false},
                        {columName : '수정' ,id : 'rnum',type:'checkBox', width : '5%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' ,checkVal :  false , allCheck: false},
                        {columName : '삭제' ,id : 'rnum',type:'checkBox', width : '5%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' ,checkVal :  false , allCheck: false},
                        // {columName : '체크박스' ,id : 'gajumId',type:'checkBox', width : '5%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '',checkVal :  false},
                        // {columName : '순번' ,id : 'number0',type:'number', width : '5%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' },
                        // {columName : '아이디' ,id : 'gajumId',type:'text', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' , colColors : 'color: #008aff' },
                        // {columName : '이름' ,id : 'shopNm',type:'text', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : ''},
                        // {columName : '등급' ,id : 'geoguNm',type:'text', width : '13%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : ''},
                        // {columName : '소속' ,id : 'saupId',type:'text', width : '5%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' ,  lineValue: '취소'  }, // 라인컬러와 라인벨류는 오직하나만
                        // {columName : '상태' ,id : 'regiDate',type:'text', width : '11%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' , colColors : 'color: #008aff'},
                        // {columName : '등록일' ,id : 'cusName',type:'text', width : '8%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : ''},
                        // {columName : '최종접속' ,id : 'storeNm',type:'text', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : ''},
                        // {columName : '처리결과' ,id : 'taxErr', width : '8%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' , options : [{ value : 'Y' , change : '전송'},{ value : 'N' , change : '미전송'}] ,fontColors :'color: red' },
                    ],
                    totalColum: 5, //
                    apiUrl : 'menu',
                    onLoadList : true,  // onLoad 로딩 유무
                    // mTotal : true , // 합계금액 란 활성화여부  합계가 존재하는 페이지도 있음
                    // mTotalControl : [{totalTitle : '합계 금액' , id: 'totalCount' , value : '' },{totalTitle : '봉사료' , id: 'serviceCharge' , value : '' },{totalTitle : '공급가액' , id: 'supplyValue' , value : '' },
                    //     {totalTitle : '부가세' , id: 'surtax' , value : '' }]
                },
                // 아이디는 실제 컬럼값을 넣어주면됩니다.
                search: [
                ],
                paging: { currentPage : 1 , lastPage : 0 ,viewPageSize : 10 ,totalRecords : 0 , from : 0 , to : 0 , perPage : 10},
                goSearch : "iocSearch",
                searchClass : 'search_box page_system03'
            }
        created(){
            this.commonCode();
            //this.authMenuList();

            this.accountStatus = '1'; //계정상태 정상(1)으로 셋팅

            // 메뉴별 권한 확인
            let menuList = JSON.parse(sessionStorage.authMenu);
            let programId = 'mnUser'; //메뉴ID
            for (let i = 0; i < menuList.length; i++) {
                for (let j = 0; j < menuList[i].subMenuDtos.length; j++) {

                    //권한(조회-readYn/ 등록-createYn/ 수정-updateYn/ 삭제-deleteYn)
                    if (menuList[i].subMenuDtos[j].progId == programId && menuList[i].subMenuDtos[j].createYn == 'Y') {
                        this.regShow = true;
                    }
                }
            }


        }
        mounted(){

        }

        @Watch('accountLevel') onLevelChange(){
            if(this.accountLevel != ''){
                this.authMenuList(this.accountLevel);
            }
        }

        @Watch('phoneNum') changePhoneNum(){
            let regNumber = /^[0-9]*$/;
            if(!regNumber.test(this.phoneNum)){
                Vue.swal({ text: '숫자만가능합니다'});
                this.phoneNum = '';
            }
        }

        @Watch('saupId') changeSaupId(){
            let regNumber = /^[0-9]*$/;
            if(!regNumber.test(this.saupId)){
                Vue.swal({ text: '숫자만가능합니다'});
                this.saupId = '';
            }
        }

        commonCode(){

            this.getSelectList('SUBSAUP');
            this.getSelectList('ROLE');

            // CommonBoardService.postListDatas('validattion','null',this.model).then(e=>{
            //   디폴트 코드 로딩하기
            // })
        }

        //아이디 중복 체크
        idChk(){

            let regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
            let id = this.id

            if(regExp.test(id)){
                Vue.swal({text: 'ID 는 숫자와 문자만 입력해주세요'});
                return ;
            }


            if(this.id == ''){
                Vue.swal({text: '아이디를 입력하세요.'});
                return;
            }
            if(this.noHangle(this.id ) == true ) {
                Vue.swal({text: 'ID는 한글이 입력되지 않습니다.'});
                return;
            }

            let id_msg = document.getElementById('id_msg');

            let reqData = {
                checkString : this.id,
                checkSum : ''
            }
            CommonBoardService.postListDatas('validation/id', null, reqData).then((response) => {
                    let result: any = response.data;
                    if (result.code === '000') {
                        this.idChkYn = 'Y'
                        if(id_msg!=null){ id_msg.innerHTML = '사용가능한 ID입니다.'; }
                    } else { //대역폭 사용 못함
                        this.idChkYn = ''
                        if(id_msg!=null){ id_msg.innerHTML = result.message; }
                        return;
                    }
                }
                , (error) => {
                }
            ).catch();
        }

        //아아디 변경시 중복확인 값 초기화
        idCh(){
            this.idChkYn = '';
            let id_msg = document.getElementById('id_msg');
            if(id_msg!=null){ id_msg.innerHTML = ''; }
        }

        //사업자등록번호 중복 체크
        saupIdChk(){
            if(this.saupId == ''){
                Vue.swal({text: '사업자등록번호를 입력하세요.'});
                return;
            }

            let saupid_msg = document.getElementById('saupid_msg');

            let reqData = {
                checkString : this.saupId,
                checkSum : ''
            }
            CommonBoardService.postListDatas('validation/saupid', null, reqData).then((response) => {
                    let result: any = response.data;
                    if (result.code === '000') {
                        //this.saupIdChkYn = 'Y'
                        if(saupid_msg!=null){ saupid_msg.innerHTML = '사용가능한 사업자등록번호입니다.'; }
                    } else { //대역폭 사용 못함
                        //this.saupIdChkYn = ''
                        if(saupid_msg!=null){ saupid_msg.innerHTML = result.message; }
                        return;
                    }
                }
                , (error) => {

                }
            ).catch();
        }

        //사업자등록번호 변경시 중복확인 값 초기화
        saupIdCh(){
            this.saupIdChkYn = '';
            let saupid_msg = document.getElementById('saupid_msg')
            if(saupid_msg!=null){ saupid_msg.innerHTML = ''; }

            this.saupjang = []; //사업장 조회 정보 초기화
        }

        addressBoxOn(){
            this.addressBox1 = true;
            // 우편번호 호출하기
        }

        addressBoxOn2(){
            this.addressBox2 = true;
            // 우편번호 호출하기
        }


        setDataAddr1(e){
            //console.log(e);
            // 주소값 리턴 받기

            this.zipCode = e.zip;
            this.addr1 = e.addr;
        }

        setDataAddr2(e){
            //console.log(e);
            //console.log('1111')
            // 주소값 리턴 받기
        }

        //입력값 validation 체크
        validationChk(){

            //console.log('Form 정보 보이기')
            //console.log(this.menuList)
            let saupjang = this.saupjang;

            if(this.name == ''){
                Vue.swal({text: '이름을 입력하세요.'});
                return;
            }else if(this.phoneNum == ''){
                Vue.swal({text: '휴대폰번호를 입력하세요.'});
                return;
            }else if(this.id == ''){
                Vue.swal({text: 'ID를 입력하세요.'});
                return;
            }else if(this.idChkYn == ''){
                Vue.swal({text: 'ID를 중복확인 하세요.'});
                return;
            }else if(this.email == ''){
                Vue.swal({text: '이메일 주소를 입력하세요.'});
                return;
            }else if(! this.email_check(this.email)){
                Vue.swal({text: '이메일 형식에 맞지 않습니다.'});
                return;
            }else if(this.accountLevel == ''){
                Vue.swal({text: '계정등급을 확인하세요.'});
                return;
            }else if(this.subSaupCode == ''){
                Vue.swal({text: '회사코드를 선택하세요.'});
                return;
            /*}else if(this.zipCode == ''){
                Vue.swal({text: '우편번호 버튼을 클릭하여 주소를 선택하세요.'});
                return;
            }else if(this.addr1 == ''){
                Vue.swal({text: '우편번호 버튼을 클릭하여 주소를 선택하세요.'});
                return;
            }else if(this.addr2 == ''){
                Vue.swal({text: '상세주소를 입력하세요.'});
                return;
            }else if(this.accessIpFrom == ''){
                Vue.swal({text: '접속IP 시작 대역을 입력하세요.'});
                return;
            }else if(this.accessIpTo == ''){
                Vue.swal({text: '접속IP 끝 대역을 입력하세요.'});
                return;*/
            }else if(this.saupId == ''){
                Vue.swal({text: '사업자등록번호를 입력 하세요.'});
                return;
            }else if(this.saupIdChkYn == ''){
                Vue.swal({text: '사업자등록번호를 입력 후 찾기 버튼을 클릭하세요.'});
                return;
            }else{
                //this.insertInfo();
                this.phonenumberChk();
            }

        }

//휴대폰번호 등록여부 체크
        phonenumberChk(){
            let reqData: any = {};
            reqData['checkString'] = this.phoneNum;
            reqData['checkSum'] = '';
            reqData['checkType'] = 'ADMIN';

            // api 데이터 호출(사업자등록번호 유효성 체크)
            CommonBoardService.postListDatas('validation/phonenum', null, reqData).then((response) => {
                    let result: any = response.data;
                    //console.log(result);
                    if (result != null && result.code == '000') {
                        //휴대폰번호 유효성 체크에 이상이 없으면 가맹점등록
                        //this.franchiseFileReg();
                        this.insertInfo();
                    } else {
                        Vue.swal({text:result.message});
                    }
                }
                , (error) => {
                    //console.log(error);
                }
            ).catch((response) => {
                //console.log(response);
            });
        }

        //계정 등록
        insertInfo(){

            let chkList : any = this.menuList; //메뉴 권한 정보

            let reqData : any = {};
            let rowData : any = {};
            let arrData : any = [];

            //사용자 정보
            reqData['name'] = this.name;
            reqData['phoneNum'] = this.phoneNum;
            reqData['id'] = this.id;
            reqData['email'] = this.email;
            reqData['role'] = this.accountLevel; //계정등급
            reqData['status'] = this.accountStatus; //계정상태
            //reqData['zipCode'] = this.zipCode;
            //reqData['addr1'] = this.addr1;
            //reqData['addr2'] = this.addr2;
            reqData['subSaup'] = this.subSaupCode;
            reqData['accessIpFrom'] = this.accessIpFrom;
            reqData['accessIpTo'] = this.accessIpTo;
            reqData['saupId'] = this.saupId;

            chkList.filter(e=>{
                rowData = {};
                if(e.readGbn == true){ //조회
                    rowData['readYn'] = 'Y';
                }else{
                    rowData['readYn'] = 'N';
                }
                if(e.createGbn == true){ //등록
                    rowData['createYn'] = 'Y';
                }else{
                    rowData['createYn'] = 'N';
                }
                if(e.updateGbn == true){ //수정
                    rowData['updateYn'] = 'Y';
                }else{
                    rowData['updateYn'] = 'N';
                }
                if(e.deleteGbn == true){ //삭제
                    rowData['deleteYn'] = 'Y';
                }else{
                    rowData['deleteYn'] = 'N';
                }
                rowData['groupCode'] = e.groupCode;
                //rowData['groupCodeNm'] = e.groupCodeNm;
                rowData['menuCode'] = e.menuCode;
                //rowData['progId'] = e.progId;
                rowData['name'] = e.name;
                //rowData['menuLevel'] = e.menuLevel;
                //rowData['sub'] = e.sub;
                //rowData['apiUri'] = e.apiUri;

                arrData.push(rowData)
            });
            reqData['menuList'] = arrData

            //console.log('최종 요청값 확인')
            //console.log(reqData)

            // api 데이터 호출(계정 정보 수정)
            CommonBoardService.postListData('accounts', null, reqData).then((response) => {
                    let result: any = response.data;
                    if (result != null) {
                        //계정 수정 완료
                        //this.$router.push({ name:'mnUserList' , params: { objectKey : reqData } }) // 라우터 주소를 넣어줘야 히스토리모드 인식
                        //this.$router.push({name:'mnUserList'})
                        this.sendMail();
                        Vue.swal({text: '계정 정보가 등록되었습니다'});
                        this.$router.push('/home/mnUser');
                        //this.$router.push({name:'policyTempList'});
                    } else {
                        Vue.swal({text: '계정 정보 등록에 실패하였습니다. 다시 시도하세요.'});
                        return;
                    }
                }
                , (error) => {
                    //console.log(error);
                }
            ).catch((response) => {
            });

        }

        //메뉴 사용 권한 리스트 뿌리기
        authMenuList(role){

            if(role==''){
                return;
            }

            //let role = sessionStorage.role;

            CommonBoardService.getListDatas('menu/role/'+role, null, null).then(result=>{
                if(result.status==200){
                    //console.log('메뉴 정보 조회 결과')
                    //console.log(result.data)

                    let mList = result.data;
                    let rowData : any = {};
                    let arrData : any = [];
                    let rowCnt : number = 0;
                    mList.filter(e => {
                        rowData = {};
                        rowCnt++;
                        rowData['groupCode'] = e.groupCode;
                        rowData['menuCode'] = e.menuCode;
                        rowData['name'] = e.name;
                        rowData['readYn'] = e.readYn;
                        rowData['createYn'] = e.createYn;
                        rowData['updateYn'] = e.updateYn;
                        rowData['deleteYn'] = e.deleteYn;
                        rowData['readId'] = e.menuCode + rowCnt;
                        rowData['createId'] = e.menuCode + rowCnt;
                        rowData['updateId'] = e.menuCode + rowCnt;
                        rowData['deleteId'] = e.menuCode + rowCnt;

                        if(e.createYn == 'Y'){ rowData['createGbn'] = true; }else{ rowData['createGbn'] = false; }
                        if(e.readYn == 'Y'){ rowData['readGbn'] = true; }else{ rowData['readGbn'] = false; }
                        if(e.updateYn == 'Y'){ rowData['updateGbn'] = true; }else{ rowData['updateGbn'] = false; }
                        if(e.deleteYn == 'Y'){ rowData['deleteGbn'] = true; }else{ rowData['deleteGbn'] = false; }

                        arrData.push(rowData);
                    });

                    this.menuList = arrData;

                }else{
                    //Vue.swal({text: '에러'});
                }
            })

        }

        //사업장 정보 조회
        saupInfo(saupId){
            if(saupId == ''){
                Vue.swal({text: '사업자등록번호를 입력하세요.'});
                return;
            }

            CommonBoardService.getListDatas('saupjang',saupId,null).then(result=>{
                if(result.status==200 && result.data!=null){
                    //console.log(result.data)
                    this.saupjang = result.data;
                    this.saupIdChkYn = 'Y';
                }else{
                    Vue.swal({text: '미등록된 사업자등록번호입니다. 등록후 사용하세요.'});
                }
            }, (error) => {
                Vue.swal({text: '미등록된 사업자등록번호입니다. 등록후 사용하세요.'});
                }
            ).catch((response) => {
            });
        }

        sendMail() { //메일 발송

            //let dt = new Date();
            //let sendDate = this.nowTimehms;
            //let regId = this.id;
            //let regNm = this.name;
            let imgsrc = environment.imgApiUrl+"/img/img_logo.07141310.png"; //로고
            let siteUrl = environment.imgApiUrl;
            let termsUrl = environment.imgApiUrl+"/#/termsCheck?id="+this.id; //약관동의 링크에 id 포함

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
                "\t\t\t\t\t<td style=\"font-size:26px;font-family:'나눔고딕',NanumGothic,'맑은고딕',Malgun Gothic,'돋움',Dotum,Helvetica,'Apple SD Gothic Neo',Sans-serif;color:#212121; letter-spacing: -1px;\">[Hellocash 현금영수증] 관리자에 의한 신규 관리자 계정 생성 완료 메일</td>\n" +
                "\t\t\t\t</tr>\n" +
                "\t\t\t\t<tr>\n" +
                "\t\t\t\t\t<td style=\"font-size:14px;font-family:'나눔고딕',NanumGothic,'맑은고딕',Malgun Gothic,'돋움',Dotum,Helvetica,'Apple SD Gothic Neo',Sans-serif;color:#212121; padding-top:24px;\">안녕하세요.</td>\n" +
                "\t\t\t\t</tr>\n" +
                "\t\t\t\t<tr>\n" +
                "\t\t\t\t\t<td style=\"font-size:14px;font-family:'나눔고딕',NanumGothic,'맑은고딕',Malgun Gothic,'돋움',Dotum,Helvetica,'Apple SD Gothic Neo',Sans-serif;color:#939393; padding-top:20px;\">저희 KT 롯데정보통신 현금 영수증 서비스를 이용해 주시는 회원님께 감사 드립니다.<br>투명한 거래를 위한 KT 롯데 정보통신 현금영수증 사이트 신규 회원 가입이 완료되었습니다.</td>\n" +
                "\t\t\t\t</tr>\n" +
                "\t\t\t\t<tr>\n" +
                "\t\t\t\t\t<td style=\"font-size:14px;font-family:'나눔고딕',NanumGothic,'맑은고딕',Malgun Gothic,'돋움',Dotum,Helvetica,'Apple SD Gothic Neo',Sans-serif;color:#939393; padding-top:20px;\">휴대폰 SMS로 임시 비밀번호를 발송하였으니 사이트 접속후 서비스 이용이 가능합니다.</td>\n" +
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
                "\t\t\t\t\t<td style=\"font-size:14px;font-family:'나눔고딕',NanumGothic,'맑은고딕',Malgun Gothic,'돋움',Dotum,Helvetica,'Apple SD Gothic Neo',Sans-serif;color:#939393; padding-top:15px;\"></td>\n" +
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

            let reqData: any = {};
            reqData['to'] = [this.email]; //메일 수신자
            reqData['title'] = '[Hellocash 현금영수증] 관리자에 의한 신규 관리자 계정 생성 완료 메일'; //메일 제목
            reqData['message'] = mailMessage; //메일 내용
            reqData['cc'] = [''];

            // api 데이터 호출
            CommonBoardService.postListDatas('mail', null, reqData).then((response) => {
                    if (response.status.toString() == '201' || response.status.toString() == '200') { //메일 전송 완료
                        Vue.swal({text: '계정등록 메일이 발송되었습니다.'});
                    } else { //메일 전송 실패
                        console.log('메일 발송 실패');
                        Vue.swal({text: '메일이 전송 실패하였습니다'});
                    }
                }
                , (error) => {
                    //this.$Progress.finish();
                    //console.log(error);
                }
            ).catch();

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

        //메일 주소 정규표현식 체크
        email_check( email ) {
            var regex=/([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
            return (email != '' && email != 'undefined' && regex.test(email));
        }

        noHangle(val){
            var check = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
            let check_boolean = check.test(val);

            return check_boolean;
        }

        //공통 select box 조회
        getSelectList(code: string){
            if(code == ''){
                return;
            }

            let reqData: any = {};
            let apiUrl : string = '';

            if(code == 'SUBSAUP') { //회사코드(사업장정보)
                reqData['searchType'] = 'SEARCH';
                apiUrl = 'company';
            }else if(code == 'ROLE'){
                apiUrl = 'code?groupCode=0015';
            }

            // api 데이터 호출
            CommonBoardService.getListDatas(apiUrl, null, reqData).then((response) => {
                    let result: any = response.data;
                    //console.log(result)
                    if (result.length > 0) {
                        if(code == 'SUBSAUP'){
                            this.subSaupList = result;
                        }else if(code == 'ROLE'){
                            this.roleList = result;
                        }
                    } else {
                    }
                }
                , (error) => {
                }
            ).catch();

        }

        regCancel(){
            this.$router.push('/home/mnUser');
        }

    }

</script>