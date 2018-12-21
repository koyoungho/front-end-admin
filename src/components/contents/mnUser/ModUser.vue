<template>
    <!-- container -->
    <section id="container">
        <!-- content  -->
        <div class="content">
            <h2 class="blind">시스템관리</h2>

            <h3>계정 조회</h3>

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
                        <td><input type="text" class="input form_w100" title="이름" disabled="disabled" v-model="account.name" ></td>
                        <th scope="row">휴대폰번호</th>
                        <td>
                            <input type="text" class="input form_w100" title="휴대폰번호" v-model="account.phoneNum">
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">ID</th>
                        <td>
                            <input type="text" class="input form_id" title="ID" disabled="disabled" v-model="account.id">
                            <!--<button type="button" id="" class="btn_s01 bg04" @click="validateForm()">중복확인</button>-->
                        </td>
                        <th scope="row">이메일주소</th>
                        <td>
                            <input type="text" class="input form_w100" title="이메일주소" v-model="account.email">
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">계정등급</th>
                        <td>
                            <select id="" name="" class="select form_w100" title="계정등급" v-model="account.role">
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
                            <select id="" name="" class="select form_w100" title="계정상태" v-model="account.accountStatus">
                                <option value="">선택</option>
                                <option value="0">정상</option>
                                <option value="1">승인대기</option>
                                <option value="2">해지대기</option>
                                <option value="3">사용중지</option>
                                <option value="4">해지</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">최종접속일시</th>
                        <td colspan="3">
                            <input type="text" class="input form_w50" title="최종접속일시" disabled="disabled" v-model="account.lastConnDt">
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">사업자등록증 확인</th>
                        <td class="con01">
                            <a href="#" class="link02">신일약국 사업자등록증 사업자등록증 뷰화면</a>
                        </td>
                        <th scope="row">전화번호</th>
                        <td class="con01">
                            <input type="text" class="input form_w100" title="전화번호" v-model="account.telNum">
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">주소</th>
                        <td colspan="3">
                            <ul class="address_list">
                                <li class="con01">
                                    <input type="text" class="input form_post" title="우편번호" v-model="account.zipCode">
                                    <button type="button" id="" class="btn_s01 bg03">우편번호</button>
                                </li>
                                <li class="con02">
                                    <input type="text" class="input form_address01" title="주소" v-model="account.addr1">
                                </li>
                                <li class="con03">
                                    <input type="text" class="input form_address02" title="상세 주소" v-model="account.addr2">
                                </li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">접속IP 대역</th>
                        <td colspan="3">
                            <input type="text" class="input form_conip" title="접속IP 대역" v-model="account.accessIpStart">
                            <span class="period_form">-</span>
                            <input type="text" class="input form_conip" title="접속IP 대역" v-model="account.accessIpEnd">
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">등록일</th>
                        <td><input type="text" class="input form_w100" title="등록일" v-model="account.lastConnDt" disabled="disabled"></td>
                        <th scope="row">해지일</th>
                        <td><input type="text" class="input form_w100 fc_pt01" value="2018.11.20" title="해지일" v-model="account.cancelDt" disabled="disabled"></td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <!-- //tbl view box -->
            <!-- btn tbl bot -->
            <div class="btn_tbl_bot">
                <button type="button" id="" class="btn_m01 bg01" v-on:click="initPassword">비밀번호 초기화</button>
            </div>

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
                            <input type="text" class="input form_industry" title="사업자등록번호" v-model="saupjang.saupId" disabled="disabled">
                            <!--<button type="button" id="" class="btn_s01 bg04">중복확인</button>-->
                            <!--<p class="info_msg">이미 등록된 사업자 번호입니다.</p>-->
                        </td>
                        <th scope="row">사업장명</th>
                        <td class="vtop"><input type="text" class="input form_w100" title="사업장명" disabled="disabled" v-model="saupjang.shopNm"></td>
                    </tr>
                    <tr>
                        <th scope="row">대표자명</th>
                        <td><input type="text" class="input form_w100" title="대표자명" disabled="disabled" v-model="saupjang.chipNm"></td>
                        <th scope="row">전화번호</th>
                        <td>
                            <input type="text" class="input form_w100" title="전화번호" disabled="disabled" v-model="saupjang.telNum">
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">주소</th>
                        <td colspan="3">
                            <ul class="address_list">
                                <li class="con01">
                                    <input type="text" class="input form_post" title="우편번호" disabled="disabled" v-model="saupjang.zipCode">
                                    <!--<button type="button" id="" class="btn_s01 bg03" @click="addressBoxOn">우편번호</button>-->
                                </li>
                                <li class="con02">
                                    <input type="text" class="input form_address01" title="주소" disabled="disabled" v-model="saupjang.addr1">
                                </li>
                                <li class="con03">
                                    <input type="text" class="input form_address02" title="상세 주소" disabled="disabled" v-model="saupjang.addr2">
                                </li>
                            </ul>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <!-- //tbl view box -->

            <!-- //tbl view box -->

            <h4>메뉴사용권한</h4>
            <!-- tbl list box -->
            <!--<ListComponent v-bind:listObject="listItem" v-bind:onLoadList="listItem.dataGrid.onLoadList" v-on:listView="listViewEvent" v-on:listCheckEvent="checkBoxEvent"></ListComponent>-->
            <!-- //tbl list box -->

            <!-- tbl list box -->
            <div class="tbl_list_box">
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
                    <tbody>
                    <tr v-if="gajumShow">
                        <th scope="row">가맹점관리</th>
                        <td><span class="chk_box"><input type="checkbox" id="" v-model="gajum1"><label for=""><span class="blind">선택</span></label></span></td>
                        <td><span class="chk_box"><input type="checkbox" id="" v-model="gajum2"><label for=""><span class="blind">선택</span></label></span></td>
                        <td><span class="chk_box"><input type="checkbox" id="" v-model="gajum3"><label for=""><span class="blind">선택</span></label></span></td>
                        <td><span class="chk_box"><input type="checkbox" id="" v-model="gajum4"><label for=""><span class="blind">선택</span></label></span></td>
                    </tr>
                    <tr v-if="jijumShow">
                        <th scope="row">지점관리</th>
                        <td><span class="chk_box"><input type="checkbox" id="" v-model="jijum1"><label for=""><span class="blind">선택</span></label></span></td>
                        <td><span class="chk_box"><input type="checkbox" id="" v-model="jijum2"><label for=""><span class="blind">선택</span></label></span></td>
                        <td><span class="chk_box"><input type="checkbox" id="" v-model="jijum3"><label for=""><span class="blind">선택</span></label></span></td>
                        <td><span class="chk_box"><input type="checkbox" id="" v-model="jijum4"><label for=""><span class="blind">선택</span></label></span></td>
                    </tr>
                    <tr v-if="storeShow">
                        <th scope="row">매장관리</th>
                        <td><span class="chk_box"><input type="checkbox" id="" v-model="store1"><label for=""><span class="blind">선택</span></label></span></td>
                        <td><span class="chk_box"><input type="checkbox" id="" v-model="store2"><label for=""><span class="blind">선택</span></label></span></td>
                        <td><span class="chk_box"><input type="checkbox" id="" v-model="store3"><label for=""><span class="blind">선택</span></label></span></td>
                        <td><span class="chk_box"><input type="checkbox" id="" v-model="store4"><label for=""><span class="blind">선택</span></label></span></td>
                    </tr>
                    <tr v-if="aprovShow">
                        <th scope="row">승인대역관리</th>
                        <td><span class="chk_box"><input type="checkbox" id="" v-model="aprov1"><label for=""><span class="blind">선택</span></label></span></td>
                        <td><span class="chk_box"><input type="checkbox" id="" v-model="aprov2"><label for=""><span class="blind">선택</span></label></span></td>
                        <td><span class="chk_box"><input type="checkbox" id="" v-model="aprov3"><label for=""><span class="blind">선택</span></label></span></td>
                        <td><span class="chk_box"><input type="checkbox" id="" v-model="aprov4"><label for=""><span class="blind">선택</span></label></span></td>
                    </tr>
                    <tr v-if="storeShow">
                        <th scope="row">매장일괄등록</th>
                        <td><span class="chk_box"><input type="checkbox" id="" v-model="sbulk1"><label for=""><span class="blind">선택</span></label></span></td>
                        <td><span class="chk_box"><input type="checkbox" id="" v-model="sbulk2"><label for=""><span class="blind">선택</span></label></span></td>
                        <td><span class="chk_box"><input type="checkbox" id="" v-model="sbulk3"><label for=""><span class="blind">선택</span></label></span></td>
                        <td><span class="chk_box"><input type="checkbox" id="" v-model="sbulk4"><label for=""><span class="blind">선택</span></label></span></td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <!-- //tbl list box -->


            <!-- btn bot -->
            <div class="btn_bot">
                <button type="button" id="" class="btn_b01 bg02">취소</button>
                <button type="button" id="" class="btn_b01 bg01" v-on:click="validationChk">정보변경</button>
            </div>

        </div>
        <AddressBox v-if="addressBox" v-on:selectedValue="setDataAddr1" @close="addressBox = false"></AddressBox>
        <!-- //content -->
    </section>
    <!-- //container -->
</template>

<script lang="ts">

    import {Component, Vue} from "vue-property-decorator";
    import AddressBox from '@/components/common/addressBox/addressBox.vue';
    import {CommonBoardService} from '../../../api/common.service';
    import {Account} from '../../../model/account/account';
    import {Gajum} from '../../../model/account/gajum';
    import {Saupjang} from '../../../model/account/saupjang';
    import ListComponent from '../../common/list/list.vue';  // 공용리스트 콤포넌트
    import moment from 'moment'
    Vue.prototype.moment = moment;

    @Component({
        components: {
            ModUser,AddressBox,ListComponent
        }
    })
    export default class ModUser extends Vue {

        //권한별 메뉴사용 보이기
        gajumShow : boolean = false; //가맹점관리
        jijumShow : boolean = false; //지점관리
        storeShow : boolean = false; //매장관리, 매장일괄등록
        aprovShow : boolean = false; //승인대역

        gajum1 : any = '';
        gajum2 : any = '';
        gajum3 : any = '';
        gajum4 : any = '';

        jijum1 : any = '';
        jijum2 : any = '';
        jijum3 : any = '';
        jijum4 : any = '';

        store1 : any = '';
        store2 : any = '';
        store3 : any = '';
        store4 : any = '';

        aprov1 : any = '';
        aprov2 : any = '';
        aprov3 : any = '';
        aprov4 : any = '';

        sbulk1 : any = '';
        sbulk2 : any = '';
        sbulk3 : any = '';
        sbulk4 : any = '';


        account : Account[]=[];
        gajum : Gajum[]=[];
        saupjang : Saupjang[]=[];

        auth : any = "";
        addressBox : boolean = false;
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
                searchClass : 'search_box page_system03',
                /*menuAuth: [

                ]*/
            }
        created(){
            let id : any = this.$route.params.val
            let auth : any = this.$route.params.val2

            this.accountInfo(id,auth);
            //
            // let level = 0;
            // if(level == 0){
            //     //0 관리자정보
            //     //1 가맹점정보
            //     //2 매장정보
            //     //3 콜센터
            //     //4 대표자
            // }

            this.commonCode();
            //this.gajumInfo();
            //this.saupInfo(); //사업장 정보 조회


            if(sessionStorage.accessToken){
                let role = sessionStorage.role;
                console.log('사용자 권한 확인 :: ' + role)
                if(role == '0001'){ //시스템관리자
                    this.gajumShow = true;
                    this.jijumShow = true;
                    this.storeShow = true;
                    this.aprovShow = true;
                }else if(role == '0002'){ //현금영수증사업자
                    this.gajumShow = true;
                    this.jijumShow = true;
                    this.storeShow = true;
                    this.aprovShow = true;
                }else if(role == '0003'){ //콜센터관리자
                    this.gajumShow = true;
                    this.jijumShow = true;
                    this.storeShow = true;
                    this.aprovShow = true;
                }else if(role == '0004'){ //가맹점관리자
                    this.jijumShow = true;
                    this.storeShow = true;
                }else if(role == '0005'){ //지점관리자
                    this.storeShow = true;
                }else if(role == '0006'){ //매장관리자

                }

            }


        }

        accountInfo(id,auth){
            CommonBoardService.getListDatas('accounts',id,{id :id ,role : auth}).then(result=>{
               if(result.status==200){
                   console.log('계정정보 조회 결과')
                   console.log(result.data)

                   this.saupInfo(result.data.saupId); //조회된 사업자등록번호로 사업장 정보 조회

                   this.account = result.data
               }else{
                   alert('에러')
               }
            })
        }
/*
        gajumInfo(){
            CommonBoardService.getListDatas('accounts',this.$route.params.val+'/gajum',null).then(result=>{
                if(result.status==200){
                    console.log('가점정보 조회')
                    console.log(result.data)
                    this.gajum = result.data
                }else{
                    alert('에러')
                }
            })
        }
*/
        //사업장 정보 조회
        saupInfo(saupId){
            CommonBoardService.getListDatas('saupjang',saupId,null).then(result=>{
                if(result.status==200){
                    console.log('사업장 정보 조회')
                    console.log(result.data)
                    this.saupjang = result.data
                }else{
                    alert('에러')
                }
            })
        }

        validationChk(){
            let account : any = this.account;
/*
            if(account.phoneNum == ''){
                alert('휴대폰번호를 입력하세요.')
                return;
            }else if(account.email == ''){
                alert('휴대폰번호를 입력하세요.')
                return;
            }else if(account.role == ''){
                alert('계정등급을 선택하세요.')
                return;
            }else if(account.accountStatus == ''){
                alert('계정상태를 선택하세요.')
                return;
            }else if(account.telNum == ''){
                alert('전화번호를 입력하세요.')
                return;
            }else if(account.zipCode == ''){
                alert('우편번호 버튼을 클릭하여 주소를 선택하세요.')
                return;
            }else if(account.addr1 == ''){
                alert('주소를 입력하세요.')
                return;
            }else if(account.addr2 == ''){
                alert('상세주소를 입력하세요.')
                return;
            }else if(account.accessIpStart == ''){
                alert('접속IP 대역 시작점을 입력하세요.')
                return;
            }else if(account.accessIpEnd == '') {
                alert('접속IP 대역 끝점을 입력하세요.')
                return;
            }else{
                //수정 펑션 들어가는 곳!!!
                this.updateInfo();
            }
            */

            this.updateInfo();
        }

        //계정 정보 변경
        updateInfo(){

            let reqData : any = {};

            let gajumData : any = [];

/*
            if(this.gajumShow){ //가맹점관리
                let arayAuth = ['select', 'insert', 'update', 'delete'];
                console.log(arayAuth)
                for(let i=1; i<5; i++){
                    let rowData = {};
                    //let colNm = arayAuth[i-1];
                    //let colVal = 'this.gajum'+ i;
                    let colVal = document.getElementById('this.gajum'+1);
                    rowData[arayAuth[i-1]] = colVal;
                    gajumData.push(rowData);
                }
                reqData['gajumDto'] = gajumData;
                console.log(reqData)

            }
*/


        }

        mounted(){

        }
        commonCode(){
            // CommonBoardService.postListDatas('validattion','null',this.model).then(e=>{
            //   디폴트 코드 로딩하기
            // })
        }
        validateForm(){
            alert('중복확인준비중 입니다')
            // CommonBoardService.postListDatas('validattion','null',this.model).then(e=>{
            //     // 벨리데이션체크 폼
            // })
        }

        addressBoxOn(){
            this.addressBox = true;
            // 우편번호 호출하기
        }

        setDataAddr1(e){
            console.log(e);
            // 주소값 리턴 받기
        }
        checkBoxEvent(){

        }

        //비밀번호 초기화
        initPassword(){

            let acntId = sessionStorage.accountId;

            console.log("비밀번호 초기화")
            console.log(this.account)

//            let apiUrl = 'accounts/'+acntId+
/*
            CommonBoardService.getListDatas('accounts',null,{id :id ,role : auth}).then(result=>{
                if(result.status==200){
                    console.log('계정정보 조회 결과')
                    console.log(result.data)
                    this.account = result.data
                }else{
                    alert('에러')
                }
            })
*/
        }

        // 날짜 포맷
        dateFormat(val: string){
            if(val == undefined || val == ''){
                return '';
            }else{
                if(val.length != 14){
                    return '';
                }else{
                    let y1 : number  = Number(val.substring(0, 4));
                    let m1 : number = Number(val.substring(4,6));
                    let d1 : number = Number(val.substring(6,8));
                    let hH : number = Number(val.substring(8,10));
                    let mM : number = Number(val.substring(10,12));
                    let sS : number = Number(val.substring(12));

                    let date = new Date(y1, m1, d1, hH, mM, sS); //날짜로 변경
                    let formatDate = moment(date).format('YYYY-MM-DD HH:mm:ss');

                    return formatDate;
                }
            }
        }

    }
</script>

<style scoped>

</style>