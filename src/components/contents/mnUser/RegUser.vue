<template>
    <!-- container -->
    <section id="container">
        <!-- content  -->
        <div class="content">
            <h2 class="blind">시스템관리</h2>

            <h3>계정 등록</h3>

            <h4>사용자 정보</h4>
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
                        <td><input type="text" class="input form_w100" title="이름" v-model="name"></td>
                        <th scope="row">휴대폰번호</th>
                        <td>
                            <input type="text" class="input form_w100" title="휴대폰번호" v-model="phoneNum">
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">ID</th>
                        <td>
                            <input type="text" class="input form_id" title="ID" v-model="id" v-on:keyup="idCh()">
                            <input type="hidden" v-model="idChkYn">
                            <button type="button" id="" class="btn_s01 bg04" @click="idChk()">중복확인</button>
                            <p class="info_msg" id="id_msg"></p>
                        </td>
                        <th scope="row">이메일주소</th>
                        <td>
                            <input type="text" class="input form_w100" title="이메일주소" v-model="email">
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">계정등급</th>
                        <td>
                            <select id="" name="" class="select form_w100" title="계정등급saupId" v-model="accountLevel">
                                <option value="">선택</option>
                                <option value="0001">시스템관리자</option>
                                <option value="0002">현금영수증사업자</option>
                                <option value="0003">콜센터관리자</option>
                                <option value="0004">가맹점관리자</option>
                                <option value="0005">지점관리자</option>
                                <option value="0006">매장관리자</option>
                            </select>
                        </td>
                        <th scope="row">계정상태</th>
                        <td>
                            <select id="" name="" class="select form_w100" title="계정상태" v-model="accountStatus">
                                <option value="">선택</option>
                                <option value="0">정상</option>
                                <option value="1">승인대기</option>
                                <option value="2">해지대기</option>
                                <option value="3">사용중지</option>
                                <option value="4">해지</option>
                            </select>
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
                        <th scope="row">사업자등록번호</th>
                        <td>
                            <input type="text" class="input form_industry" title="사업자등록번호" v-model="saupId" v-on:keyup="saupIdCh()" maxlength="10">
                            <input type="hidden" v-model="saupIdChkYn">
                            <button type="button" id="" class="btn_s01 bg04" v-on:click="saupIdChk">중복확인</button>
                            <p class="info_msg" id="saupid_msg"></p>
                        </td>
                        <th scope="row">사업장명</th>
                        <td class="vtop"><input type="text" class="input form_w100" title="사업장명" v-model="shopNm"></td>
                    </tr>
                    <tr>
                        <th scope="row">대표자명</th>
                        <td><input type="text" class="input form_w100" title="대표자명" v-model="reqNm"></td>
                        <th scope="row">전화번호</th>
                        <td>
                            <input type="text" class="input form_w100" title="전화번호" v-model="telno">
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">주소</th>
                        <td colspan="3">
                            <ul class="address_list">
                                <li class="con01">
                                    <input type="text" class="input form_post" title="우편번호" v-model="zipCode">
                                    <button type="button" id="" class="btn_s01 bg03" @click="addressBoxOn">우편번호</button>
                                </li>
                                <li class="con02">
                                    <input type="text" class="input form_address01" title="주소" v-model="addr1">
                                </li>
                                <li class="con03">
                                    <input type="text" class="input form_address02" title="상세 주소" v-model="addr2">
                                </li>
                            </ul>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <!-- //tbl view box -->

            <h4>회사/매장 정보</h4>
            <!-- tbl view box -->
            <div class="tbl_view_box">
                <!-- tbl view01 -->
                <table class="tbl_view01">
                    <caption>회사/매장 정보</caption>
                    <colgroup>
                        <col width="17%">
                        <col width="33%">
                        <col width="17%">
                        <col width="33%">
                    </colgroup>
                    <tbody>
                    <tr>
                        <th scope="row">매장명</th>
                        <td>
                            <input type="text" class="input form_w100" title="매장명" v-model="storeNm">
                        </td>
                        <th scope="row">전화번호</th>
                        <td>
                            <input type="text" class="input form_w100" title="전화번호" v-model="storeTelno">
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">주소</th>
                        <td colspan="3">
                            <ul class="address_list">
                                <li class="con01">
                                    <input type="text" class="input form_post" title="우편번호" v-model="storeZipCd">
                                    <button type="button" id="" class="btn_s01 bg03" @click="addressBoxOn2">우편번호</button>
                                </li>
                                <li class="con02">
                                    <input type="text" class="input form_address01" title="주소" v-model="storeAddr1">
                                </li>
                                <li class="con03">
                                    <input type="text" class="input form_address02" title="상세 주소" v-model="storeAddr2">
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
            <ListComponent v-bind:listObject="listItem" v-bind:onLoadList="listItem.dataGrid.onLoadList" v-on:listView="listViewEvent" v-on:listCheckEvent="checkBoxEvent"></ListComponent>
            <!-- //tbl list box -->

            <!-- btn bot -->
            <div class="btn_bot">
                <button type="button" id="" class="btn_b01 bg02">취소</button>
                <button type="button" id="" class="btn_b01 bg01" v-on:click="validationChk()">등록</button>
            </div>

        </div>
        <AddressBox v-if="addressBox1" v-on:selectedValue="setDataAddr1" @close="addressBox1 = false"></AddressBox>
        <AddressBox v-if="addressBox2" v-on:selectedValue="setDataAddr2" @close="addressBox2 = false"></AddressBox>
        <!-- //content -->
    </section>
    <!-- //container -->
</template>

<script lang="ts">

    import {Component, Vue} from "vue-property-decorator";
    import {CommonBoardService} from '../../../api/common.service';
    import AddressBox from '@/components/common/addressBox/addressBox.vue';
    import ListComponent from '../../common/list/list.vue';  // 공용리스트 콤포넌트

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

        //사업장정보
        saupId: any = ''; //사업자등록번호
        saupIdChkYn: any = ''; //사업자등록번호 사용가능 여부
        shopNm: any = ''; //사업장명
        reqNm: any = ''; //대표자명
        telno: any = ''; //전화번호
        zipCode: any = ''; //우편번호
        addr1: any = ''; //주소
        addr2: any = ''; //상세주소

        //매장정보
        storeNm: any = ''; //매장명
        storeTelno: any = ''; //전화번호
        storeZipCd: any = ''; //우편번호
        storeAddr1: any = ''; //주소
        storeAddr2: any = ''; //상세주소


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
        }
        mounted(){

        }
        commonCode(){
            // CommonBoardService.postListDatas('validattion','null',this.model).then(e=>{
            //   디폴트 코드 로딩하기
            // })
        }

        //아이디 중복 체크
        idChk(){
            if(this.id == ''){
                alert('아이디를 입력하세요.');
                return;
            }

            let id_msg = document.getElementById('id_msg');

            let reqData = {
                checkString : this.id,
                checkSum : ''
            }
            console.log('아이디 사용가능 여부 체크')
            CommonBoardService.postListDatas('validation/id', null, reqData).then((response) => {
                    let result: any = response.data;
                    console.log(result)
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
                alert('사업자등록번호를 입력하세요.');
                return;
            }

            let saupid_msg = document.getElementById('saupid_msg');

            let reqData = {
                checkString : this.saupId,
                checkSum : ''
            }
            console.log('사업자등록번호 사용가능 여부 체크')
            CommonBoardService.postListDatas('validation/saupid', null, reqData).then((response) => {
                    let result: any = response.data;
                    console.log(result)
                    if (result.code === '000') {
                        this.saupIdChkYn = 'Y'
                        if(saupid_msg!=null){ saupid_msg.innerHTML = '사용가능한 사업자등록번호입니다.'; }
                    } else { //대역폭 사용 못함
                        this.saupIdChkYn = ''
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
            console.log(e);
            // 주소값 리턴 받기
        }

        setDataAddr2(e){
            console.log(e);
            // 주소값 리턴 받기
        }

        //입력값 validation 체크
        validationChk(){

            if(this.name == ''){
                alert('이름을 입력하세요.');
                return;
            }else if(this.phoneNum == ''){
                alert('휴대폰번호를 입력하세요.');
                return;
            }else if(this.id == ''){
                alert('ID를 입력하세요.');
                return;
            }else if(this.idChkYn == ''){
                alert('ID를 중복확인 하세요.');
                return;
            }else if(this.email == ''){
                alert('이메일 주소를 입력하세요.');
                return;
            }else if(this.accountLevel == ''){
                alert('계정등급을 확인하세요.');
                return;
            }else if(this.accountStatus == ''){
                alert('계정상태를 선택하세요..');
                return;
            }else if(this.saupId == ''){
                alert('사업자등록번호를 입력 하세요.');
                return;
            }else if(this.saupIdChkYn == ''){
                alert('사업자등록번호를 중복확인 하세요.');
                return;
            }else if(this.shopNm == ''){
                alert('사업장명을 중복확인 하세요.');
                return;
            }else if(this.reqNm == ''){
                alert('대표자명을 중복확인 하세요.');
                return;
            }else if(this.telno == ''){
                alert('전화번호를 확인하세요.');
                return;
            }else if(this.zipCode == ''){
                alert('우편번호를 입력하세요.');
                return;
            }else if(this.addr1 == ''){
                alert('주소를 입력하세요.');
                return;
            }else if(this.addr2 == ''){
                alert('상세주소를 입력하세요.');
                return;
            }else if(this.storeNm == ''){
                alert('매장명을 입력하세요.');
                return;
            }else if(this.storeTelno == ''){
                alert('전화번호를 입력하세요.');
                return;
            }else if(this.storeAddr1 == ''){
                alert('주소를 입력하세요.');
                return;
            }else if(this.storeAddr2 == '') {
                alert('상세주소를 입력하세요.');
                return;
            }else{
                this.insertInfo();
            }

        }

        //계정 등록
        insertInfo(){
            console.log('계정등록')
        }

    }

</script>