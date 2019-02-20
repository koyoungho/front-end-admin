<template>
    <!-- container -->
    <section id="container">
        <!-- content  -->
        <div class="content">
            <h2 class="blind">시스템관리</h2>

            <h3>계정 조회</h3>

            <h4>관리자 정보</h4>
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
                        <td class="vtop"><input type="text" class="input form_w100" title="이름" disabled="disabled" v-model="account.name"></td>
                        <th scope="row">휴대폰번호<em class="form_req">*</em></th>
                        <td>
                            <input type="text" class="input form_w100" title="휴대폰번호" v-model="account.phoneNum" maxlength="12" @keyup="changePhoneNum">
                            <p class="info_msg2" id="phone_msg"></p> <!-- 메시지 표시 -->
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">ID</th>
                        <td class="vtop">
                            <input type="text" class="input form_id" title="ID" disabled="disabled" v-model="account.id">
                            <!--<button type="button" id="" class="btn_s01 bg04" @click="validateForm()">중복확인</button>-->
                        </td>
                        <th scope="row">이메일주소<em class="form_req">*</em></th>
                        <td class="vtop">
                            <input type="text" class="input form_w100" title="이메일주소" v-model="account.email" maxlength="30">
                            <p class="info_msg2" id="email_msg"></p> <!-- 메시지 표시 -->
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">계정등급</th>
                        <td>
                            <select id="" name="" class="select form_w100" title="계정등급" v-model="account.role">
                                <option value="">선택</option>
                                <template v-for="datas in roleList">
                                    <option v-bind:value=datas.code>{{datas.codeNm}}</option>
                                </template>
                            </select>
                        </td>
                        <th scope="row">계정상태</th>
                        <td>
                           <span style="vertical-align: bottom">{{account.statusNm}}</span>
                            <template v-if="account.status !='6'">
                            <span class="chk_box" id="ts" style="margin-left: 50px;" ><input type="checkbox"  @click="useStop($event)"><label for="ts">사용중지</label></span>
                            </template>
                        </td>

                    </tr>
                    <tr>
                        <th scope="row">최종접속일시</th>
                        <td colspan="3">
                            <input type="text" class="input form_w50" title="최종접속일시" disabled="disabled" v-model="lastConnDt">
                        </td>
                    </tr>
                    <tr v-if="saupjangSajin">
                        <th scope="row">사업자등록증 확인</th>
                        <td class="con01" colspan="3">
                            <a href="#" class="link02" v-on:click="downloadFile">사업자등록증 다운로드</a>
                        </td>
                    </tr>
                    <!--<tr>
                        <th scope="row">주소</th>
                        <td colspan="3">
                            <ul class="address_list">
                                <li class="con01">
                                    <input type="text" class="input form_post" title="우편번호" v-model="account.zipCode" disabled="disabled">
                                    <button type="button" id="" class="btn_s01 bg03" @click="addressBoxOn">우편번호</button>
                                </li>
                                <li class="con02">
                                    <input type="text" class="input form_address01" title="주소" v-model="account.addr1" maxlength="40">
                                </li>
                                <li class="con03">
                                    <input type="text" class="input form_address02" title="상세 주소" v-model="account.addr2" maxlength="40">
                                </li>
                            </ul>
                        </td>
                    </tr>-->
                    <tr>
                        <th scope="row">접속IP 대역</th>
                        <td colspan="3">
                            <input type="text" class="input form_conip" title="접속IP 대역" v-model="account.accessIpFrom" disabled="disabled">
                            <span class="period_form">-</span>
                            <input type="text" class="input form_conip" title="접속IP 대역" v-model="account.accessIpTo" disabled="disabled">
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">등록일</th>
                        <td><input type="text" class="input form_w100" title="등록일" v-model="regDt" disabled="disabled"></td>
                        <th scope="row">해지일</th>
                        <td><input type="text" class="input form_w100 fc_pt01" value="" title="해지일" v-model="cancelDt" disabled="disabled"></td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <!-- //tbl view box -->
            <!-- btn tbl bot -->
            <div class="btn_tbl_bot">
                <button type="button" id="" class="btn_m01 bg01" v-on:click="sendPassSms">비밀번호 초기화</button>
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
                            <input type="text" class="input form_industry" title="사업자등록번호" v-model="saupId" disabled="disabled">
                            <!--<button type="button" id="" class="btn_s01 bg04">중복확인</button>-->
                            <!--<p class="info_msg">이미 등록된 사업자 번호입니다.</p>-->
                            <p class="info_msg2" id="saupid_msg"></p> <!-- 메시지 표시 -->
                        </td>
                        <th scope="row">사업장명</th>
                        <td class="vtop"><input type="text" class="input form_w100" title="사업장명" disabled="disabled" v-model="saupjang.shopNm"></td>
                    </tr>
                    <tr>
                        <th scope="row">대표자명</th>
                        <td class="vtop"><input type="text" class="input form_w100" title="대표자명" disabled="disabled" v-model="saupjang.chipNm"></td>
                        <th scope="row">전화번호</th>
                        <td>
                            <input type="text" class="input form_w100" title="전화번호" disabled="disabled" v-model="saupjang.telNum">
                            <p class="info_msg2" id="telnum_msg"></p> <!-- 메시지 표시 -->
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
                        <th scope="col" rowspan="2">메뉴</th>
                        <th scope="col">조회</th>
                        <th scope="col">등록</th>
                        <th scope="col">수정</th>
                        <th scope="col">삭제</th>
                    </tr>
                    <tr>
                        <th scope="col"><span class="chk_box"><input type="checkbox"  @click="checkAll('readYn')"><label for=""><span class="blind"></span></label></span></th>
                        <th scope="col"><span class="chk_box"><input type="checkbox" @click="checkAll('createYn')"><label for=""><span class="blind"></span></label></span></th>
                        <th scope="col"><span class="chk_box"><input type="checkbox" @click="checkAll('updateYn')"><label for=""><span class="blind"></span></label></span></th>
                        <th scope="col"><span class="chk_box"><input type="checkbox" @click="checkAll('deleteYn')"><label for=""><span class="blind"></span></label></span></th>
                    </tr>
                    </thead>
                    <tbody v-for="(datas,index) in  menuList">
                    <tr>
                        <th scope="row">{{datas.name}}</th>
                        <td><span class="chk_box"><input type="checkbox" v-bind:id="datas.readId" v-model="datas.readGbn"><label for=""><span class="blind">선택</span></label></span></td>
                        <td><span class="chk_box"><input type="checkbox" v-bind:id="datas.createId" v-model="datas.createGbn" ><label for=""><span class="blind">선택</span></label></span></td>
                        <td><span class="chk_box"><input type="checkbox" v-bind:id="datas.updateId" v-model="datas.updateGbn" ><label for=""><span class="blind">선택</span></label></span></td>
                        <td><span class="chk_box"><input type="checkbox" v-bind:id="datas.deleteId" v-model="datas.deleteGbn" ><label for=""><span class="blind">선택</span></label></span></td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <!-- //tbl list box -->

            <!-- btn bot -->
            <div class="btn_bot">
                <template v-if="account.status=='0'">
                    <button type="button" id="" class="btn_b01 bg02" v-on:click="cancelUpdate">취소</button>
                    <button type="button" id="" class="btn_b01 bg01" v-on:click="validationChk('10')" v-show="regShow">정보변경</button>
                    <button type="button" id="" class="btn_b01 bg01" v-on:click="validationChk('1')" v-show="regShow">승인</button>
                </template>
                <template v-if="account.status=='1'">
                <button type="button" id="" class="btn_b01 bg02" v-on:click="cancelUpdate">취소</button>
                    <button type="button" id="" class="btn_b01 bg01" v-on:click="validationChk('10')" v-show="regShow">정보변경</button>
                <button type="button" id="" class="btn_b01 bg01" v-on:click="validationChk('3')" v-show="regShow">해지</button>
                </template>
                <template v-if="account.status=='2'">
                    <button type="button" id="" class="btn_b01 bg02" v-on:click="cancelUpdate">취소</button>
                    <button type="button" id="" class="btn_b01 bg01" v-on:click="validationChk('10')" v-show="regShow">정보변경</button>
                    <button type="button" id="" class="btn_b01 bg01" v-on:click="validationChk('1')" v-show="regShow">정상</button>
                    <button type="button" id="" class="btn_b01 bg01" v-on:click="validationChk('3')" v-show="regShow">해지</button>
                </template>
                <template v-if="account.status=='3'">
                    <button type="button" id="" class="btn_b01 bg02" v-on:click="cancelUpdate">취소</button>
                    <button type="button" id="" class="btn_b01 bg01" v-on:click="validationChk('10')" v-show="regShow">정보변경</button>
                </template>
                <template v-if="account.status=='4'">
                    <button type="button" id="" class="btn_b01 bg02" v-on:click="cancelUpdate">취소</button>
                    <button type="button" id="" class="btn_b01 bg01" v-on:click="validationChk('10')" v-show="regShow">정보변경</button>
                </template>
                <template v-if="account.status=='5'">
                    <button type="button" id="" class="btn_b01 bg02" v-on:click="cancelUpdate">취소</button>
                    <button type="button" id="" class="btn_b01 bg01" v-on:click="validationChk('10')" v-show="regShow">정보변경</button>
                </template>
                <template v-if="account.status=='6'">
                    <button type="button" id="" class="btn_b01 bg02" v-on:click="cancelUpdate">취소</button>
                    <button type="button" id="" class="btn_b01 bg01" v-on:click="validationChk('10')" v-show="regShow">정보변경</button>
                    <button type="button" id="" class="btn_b01 bg01" v-on:click="validationChk('1')" v-show="regShow">정상</button>
                    <button type="button" id="" class="btn_b01 bg01" v-on:click="validationChk('3')" v-show="regShow">해지</button>
                </template>
            </div>

            <!-- 승인 일경우 해지 ,사용중지
    해지 일경우 버튼 없음
   승인 대기 -> 승인
   사용중지 -> 정상 ,해지
   해지대기 ->  정상 , 해지
   잠금  ->  none
   휴먼 -> none
   -->

        </div>
        <AddressBox v-if="addressBox" v-on:selectedValue="setDataAddr1" @close="addressBox = false"></AddressBox>
        <!-- //content -->
    </section>
    <!-- //container -->
</template>

<script lang="ts">

    import {Component, Vue, Watch} from "vue-property-decorator";
    import AddressBox from '@/components/common/addressBox/addressBox.vue';
    import {CommonBoardService} from '../../../api/common.service';
    import {Account} from '../../../model/account/account';
    import {Gajum} from '../../../model/account/gajum';
    import {Saupjang} from '../../../model/account/saupjang';
    import ListComponent from '../../common/list/list.vue';  // 공용리스트 콤포넌트
    import axios from 'axios';
    import {environment} from '../../../utill/environment';
    import moment from 'moment'
    Vue.prototype.moment = moment;

    @Component({
        components: {
            ModUser,AddressBox,ListComponent
        }
    })
    export default class ModUser extends Vue {

        ct : boolean = false;
        rd : boolean = false;
        ut : boolean = false;
        dt : boolean = false;

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

        roleList : any = [];

        menuList : any = [];
        regShow : boolean = false;

        account : Account[]=[];
        gajum : Gajum[]=[];
        saupjang : Saupjang[]=[];

        saupId:string ='';

        oldRole : any = ''; //이전 role

        saupjangSajin : boolean = false; //사업자등록증 뷰 여부
        saupFileNm : any = '';
        lastConnDt:string  ="";
        regDt:string ="";
        cancelDt:string ="";

        checkVal :boolean  = false;

        auth : any = "";
        addressBox : boolean = false;
        listItem: any =
            {
                dataGrid: {
                    columControl:[
                        {columName : '메뉴' ,id : 'name',type:'text', width : '5%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' },
                        {columName : '조회' ,id : 'readYn',type:'checkBox', width : '5%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' ,checkVal :  false , allCheck: false , returnKey :'menuCode'},
                        {columName : '등록' ,id : 'createYn',type:'checkBox', width : '5%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' ,checkVal :  false , allCheck: false , returnKey :'menuCode'},
                        {columName : '수정' ,id : 'updateYn',type:'checkBox', width : '5%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' ,checkVal :  false , allCheck: false , returnKey :'menuCode'},
                        {columName : '삭제' ,id : 'deleteYn',type:'checkBox', width : '5%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' ,checkVal :  false , allCheck: false , returnKey :'menuCode'},
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
                    apiUrl : 'menu/role/'+sessionStorage.role,
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
            //id = 'test'

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

            // 메뉴별 권한 확인
            let menuList = JSON.parse(sessionStorage.authMenu);
            let programId = 'mnUser'; //메뉴ID
            for (let i = 0; i < menuList.length; i++) {
                for (let j = 0; j < menuList[i].subMenuDtos.length; j++) {

                    //권한(조회-readYn/ 등록-createYn/ 수정-updateYn/ 삭제-deleteYn)
                    if (menuList[i].subMenuDtos[j].progId == programId && menuList[i].subMenuDtos[j].updateYn == 'Y') {
                        this.regShow = true;
                    }
                }
            }

        }

        @Watch('account.role') onLevelChange(){
            let account : any = this.account;
            if(account.role != ''){
                this.authMenuList(account.role);
            }
        }

        changePhoneNum(){
            let account : any = this.account;
            let regNumber = /^[0-9]*$/;
            if(!regNumber.test(account.phoneNum)){
                Vue.swal({ text: '숫자만가능합니다'});
                account.phoneNum = '';
            }
        }

        checkAll(e){
            if(e=='readYn'){
                if(this.rd){ // 체크풀때
                    this.rd = false
                    this.menuList.filter(e=>{
                        e.readGbn=false
                    })
                }else{ // 체크할때
                    this.rd = true
                    this.menuList.filter(e=>{
                        e.readGbn=true
                    })
                }
            }else if(e=='createYn'){
                if(this.ct){ // 체크풀때
                    this.ct = false
                    this.menuList.filter(e=>{
                        e.createGbn=false
                    })
                }else{ // 체크할때
                    this.ct = true
                    this.menuList.filter(e=>{
                        e.createGbn=true
                    })
                }
            }else if(e=='updateYn'){
                if(this.ut){ // 체크풀때
                    this.ut = false
                    this.menuList.filter(e=>{
                        e.updateGbn=false
                    })
                }else{ // 체크할때
                    this.ut = true
                    this.menuList.filter(e=>{
                        e.updateGbn=true
                    })
                }
            }else if(e=='deleteYn'){
                if(this.dt){ // 체크풀때
                    this.dt = false
                    this.menuList.filter(e=>{
                        e.deleteGbn=false
                    })
                }else{ // 체크할때
                    this.dt = true
                    this.menuList.filter(e=>{
                        e.deleteGbn=true
                    })
                }
            }
        }

        // 날짜 포맷
        dateFormat(val){
            if(val == null || val == ''){
                return '';
            }else{
                return moment(val, 'YYYYMMDDHHmmss').format('YYYY.MM.DD HH:mm:ss')
            }
        }

        accountInfo(id,auth){
            let reqData = { id: id ,role: auth }
            CommonBoardService.getListDatas('accounts/'+id, null, reqData).then(result=>{
               if(result.status==200){
                   //console.log('계정정보 조회 결과')
                   //console.log(result.data)
                   this.saupInfo(result.data.saupId); //조회된 사업자등록번호로 사업장 정보 조회
                   this.account = result.data


                   //this.setData()

                   this.lastConnDt =this.dateFormat(result.data.lastConnDt)
                   this.regDt = this.dateFormat(result.data.regDt)
                   this.cancelDt = this.dateFormat(result.data.cancelDt)


                   this.oldRole = result.data.role;
                   /*if(result.data.aprvYn != null && result.data.aprvYn != 'Y'){ //승인이 안된경우만 사업자등록증 확인 보여줌
                       this.saupjangSajin = true;
                   }*/

                   let arrList : any = [];
                   let objList : any = {};
                   let mList = result.data.menuList;
                   let rowCnt : number  = 0;

                   mList.filter(e=>{
                       rowCnt++;
                       objList = {};
                       objList['groupCode'] = e.groupCode;
                       objList['groupCodeNm'] = e.groupCodeNm;
                       objList['menuCode'] = e.menuCode;
                       objList['progId'] = e.progId;
                       objList['name'] = e.name;
                       objList['menuLevel'] = e.menuLevel;
                       objList['sub'] = e.sub;
                       objList['createYn'] = e.createYn;
                       objList['readYn'] = e.readYn;
                       objList['updateYn'] = e.updateYn;
                       objList['deleteYn'] = e.deleteYn;
                       objList['rowCnt'] = rowCnt;
                       objList['readId'] = e.groupCode + rowCnt;
                       objList['createId'] = e.groupCode + rowCnt;
                       objList['updateId'] = e.groupCode + rowCnt;
                       objList['deleteId'] = e.groupCode + rowCnt;
                       if(e.createYn == 'Y'){ objList['createGbn'] = true; }else{ objList['createGbn'] = false; }
                       if(e.readYn == 'Y'){ objList['readGbn'] = true; }else{ objList['readGbn'] = false; }
                       if(e.updateYn == 'Y'){ objList['updateGbn'] = true; }else{ objList['updateGbn'] = false; }
                       if(e.deleteYn == 'Y'){ objList['deleteGbn'] = true; }else{ objList['deleteGbn'] = false; }

                       arrList.push(objList)
                   })
                   //console.log('다시 담은 값')
                   //console.log(arrList)
                   this.menuList = arrList;

               }else{
                   Vue.swal({text: '조회실패'});
               }
            })
        }

        listViewEvent(){

        }

        //취소
        cancelUpdate(){
            this.$router.push('/home/mnUser');
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
                    this.saupjang = result.data
                    this.saupId = this.saupnoFormat( result.data.saupId)
                }else{
                    //alert('에러')
                }
            })
        }

        validationChk(val){


            let account : any = this.account;

            if(val=='10') {
                if(this.checkVal==true){
                    this.account['status']='6'
                }
            }else{
                this.account['status']=val
            }
/*s
            let checkBoxData = this.$children['0'].$children['1'].chkDatas;

            console.log('메뉴 체크 권한 데이터')
            console.log(checkBoxData)
            let arayMenuCode : any = [];
            //console.log('배열값 확인!!!!!')
            //console.log(arayMenuCode.indexOf('0003'));

            for(let i=0; i<checkBoxData.length; i++){ //96번 돌리기
                let menuCode = checkBoxData[i].withKey;
                if(arayMenuCode.indexOf(menuCode) == -1){ //배열에 값이 없으면
                    arayMenuCode.push(menuCode.toString());
                }
            }
            console.log('전체 메뉴 코드 확인!!')
            console.log(arayMenuCode); //전체 메뉴 확인

            for(let j=0; j<arayMenuCode.length; j++) { //24번 돌리기
                let newArr = checkBoxData.filter(e => {
                    //console.log("eeeeeeeeeeeeeeeeeeee :: " +e)
                    return e.withKey == arayMenuCode[j];
                });
                console.log('메뉴별로 리스트 뿌리기!!!!!');
                console.log(newArr); //메뉴별로 들어감
                //console.log(JSON.stringify(newArr));
            }
*/

/*
            let rowData = {};
            for(let j=0; j<checkBoxData.length; j++) { //96번
                //console.log(checkBoxData[j]);

            }
*/



            if(account.phoneNum == '' || account.phoneNum == null){
                Vue.swal({text:'휴대폰번호를 입력하세요.'});
                return;
            }else if(account.email == '' || account.email == null){
                Vue.swal({text:'이메일 주소를 입력하세요.'});
                return;
            }else if(!this.email_check(account.email)){
                Vue.swal({text: '이메일 형식에 맞지 않습니다.'});
                return;
            }else if(account.role == '' || account.role == null){
                Vue.swal({text:'계정등급을 선택하세요.'});
                return;
            }else if(account.status == '' || account.status == null){
                Vue.swal({text:'계정상태를 선택하세요.'});
                return;
            //}else if(account.telNum == '' || account.telNum == null){
            //    alert('전화번호를 입력하세요.')
            //    return;
            /*}else if(account.zipCode == '' || account.zipCode == null){
                Vue.swal({text:'우편번호 버튼을 클릭하여 주소를 선택하세요.'});
                return;
            }else if(account.addr1 == '' || account.addr1 == null){
                Vue.swal({text:'우편번호 버튼을 클릭하여 주소를 선택하세요.'});
                return;
            }else if(account.addr2 == '' || account.addr2 == null){
                Vue.swal({text:'상세주소를 입력하세요.'});
                return;
            }else if(account.accessIpFrom == '' || account.accessIpFrom == null){
                Vue.swal({text:'접속IP 대역 시작점을 입력하세요.'});
            /*}else if(account.accessIpFrom == '' || account.accessIpFrom == null){
                alert('접속IP 대역 시작점을 입력하세요.')
                return;
            }else if(account.accessIpTo == '' || account.accessIpTo == null) {
                Vue.swal({text:'접속IP 대역 끝점을 입력하세요.'});
                return;
                */
            }else {
                //수정 펑션 들어가는 곳!!!
                this.updateInfo();
            }

        }

        //계정 정보 변경
        updateInfo(){

            //let reqData : any = {};

            //let gajumData : any = [];

            //console.log('Form 들어있는 내용 확인')
            //console.log(this.menuList)

            let chkList : any = this.menuList;

            let account : any = this.account;
            let reqData : any = {};
            let rowData : any = {};
            let arrData : any = [];

            reqData['id'] = account.id;
            reqData['name'] = account.name;
            reqData['processType'] = 'UPDATE';
            reqData['phoneNum'] = account.phoneNum;
            reqData['email'] = account.email;
            reqData['role'] = account.role; //계정등급
            reqData['oldRole'] = this.oldRole; //이전계정등급
            reqData['status'] = account.status; //계정상태
            reqData['telNum'] = account.telNum;
            // reqData['zipCode'] = account.zipCode;
            // reqData['addr1'] = account.addr1;
            // reqData['addr2'] = account.addr2;
            reqData['accessIpFrom'] = account.accessIpFrom;
            reqData['accessIpTo'] = account.accessIpTo;
            reqData['phoneNum'] = account.phoneNum;

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
                rowData['groupCodeNm'] = e.groupCodeNm;
                rowData['menuCode'] = e.menuCode;
                //rowData['progId'] = e.progId;
                rowData['name'] = e.name;
                //rowData['menuLevel'] = e.menuLevel;
                //rowData['sub'] = e.sub;
                //rowData['apiUri'] = e.apiUri;

                arrData.push(rowData)
            });
            reqData['menuList'] = arrData

            Vue.swal({
                text: '계정 정보를 변경하시겠습니까?',
                showCancelButton: true,
                showCloseButton: true,
                confirmButtonText: '확인',
                cancelButtonText: '취소'
            }).then((result) => {

                if(result.value){

                    // api 데이터 호출(계정 정보 수정)
                    CommonBoardService.updateListData('accounts', account.id, reqData).then((response) => {
                            let result: any = response.data;
                            //console.log(result);
                            if (result.code == '000') {
                                //계정 수정 완료
                                //this.$router.push({ name:'mnUserList' , params: { objectKey : reqData } }) // 라우터 주소를 넣어줘야 히스토리모드 인식
                                //this.$router.push({name:'mnUserList'})

                                Vue.swal({text:'변경이 정상 처리 되었습니다.' }).then((result) => {
                                    // 리스트로 이동
                                    this.$router.push('/home/mnUser');
                                });

                            } else {
                                Vue.swal({text:'계정 정보 변경이 실패하였습니다. 다시 시도하세요.'});
                                return;
                            }
                        }
                        , (error) => {
                        }
                    ).catch((response) => {
                    });
                }

            })

        }

        mounted(){

        }
        commonCode(){

            this.getSelectList('ROLE');

            // CommonBoardService.postListDatas('validattion','null',this.model).then(e=>{
            //   디폴트 코드 로딩하기
            // })
        }
        validateForm(){
            Vue.swal({text:'중복확인준비중 입니다'});
            // CommonBoardService.postListDatas('validattion','null',this.model).then(e=>{
            //     // 벨리데이션체크 폼
            // })
        }

        addressBoxOn(){
            this.addressBox = true;
            // 우편번호 호출하기
        }

        //주소 셋팅
        setDataAddr1(e){
            // 주소값 리턴 받기
            let account : any = this.account;
            account.zipCode = e.zip;
            account.addr1 = e.addr;
        }
        checkBoxEvent(da){
        }

        removeAccount(){
            let account : any = this.account;
            let reqData : any = { role : account.role };

            // api 데이터 호출(계정 정보 수정)
            CommonBoardService.deleteListData('accounts', account.id, reqData).then((response) => {
                    let result: any = response.data;
                    //console.log(result);
                    if (result.code == '000') {
                        //계정 해지 완료
                        //this.$router.push({ name:'mnUserList' , params: { objectKey : reqData } }) // 라우터 주소를 넣어줘야 히스토리모드 인식
                        //this.$router.push({name:'mnUserList'})
                        this.$router.push('/home/mnUser');
                    } else {
                        Vue.swal({text:'계정 해지에 실패하였습니다. 다시 시도하세요.'});
                        return;
                    }
                }
                , (error) => {
                    //console.log(error);
                }
            ).catch((response) => {
                //console.log(response);
            });

        }

        //비밀번호 초기화
        initPassword1(){

            let account : any = this.account;


            let reqData : any = {
                to : [account.email],
                title : '현금영수증 비밀번호 초기화 안내 메일입니다.',
                message : '현금영수증 비빌번호 초기화 안내입니다.\nhttps://admin.hellocash.co.kr 에서 비밀번호 초기화 하세요.',
                cc : [''],
             };
            // api 데이터 호출
            CommonBoardService.postListDatas('mail', null, reqData).then((response) => {
                    if (response.status.toString() == '201'|| response.status.toString() == '200') { //메일 전송 완료
                        Vue.swal({text: '비밀번호 초기화 관련 메일 발송이 완료되었습니다.\n발송된 메일을 확인하세요.'});
                    }
                }
                , (error) => {
                    //this.$Progress.finish();
                }
            ).catch();

        }

        sendPassSms(){

            let account : any = this.account;

            Vue.swal({
                text: '비밀번호를 초기화 하시겠습니까?',
                showCancelButton: true,
                showCloseButton: true,
                confirmButtonText: '확인',
                cancelButtonText: '취소'
            }).then((result) => {
                //console.log(result.value)
                if(result.value){
                    CommonBoardService.updateListData('accounts/admin', account.id+'/password/random', null).then((response) => {
                            let result: any = response.data;
                            //console.log(response);
                            //console.log(result);
                            if (response.status == 200 || response.status == 201) {
                                Vue.swal({text:'비밀번호가 SMS문자로 전송되었습니다. SMS문자를 확인후 로그인하세요.'});
                            } else {
                                Vue.swal({text:'비밀번호 초기화에 실패하였습니다. 다시 시도하세요.'});
                            }
                        }
                        , (error) => {
                            //console.log(error);
                        }
                    ).catch((response) => {
                        //console.log(response);
                    });
                }
            })

        }

        initPassword() { //메일 발송

            let account : any = this.account;
            //let dt = new Date();
            //let sendDate = this.nowTimehms;
            //let regId = this.id;
            //let regNm = this.name;
            let imgsrc = environment.imgApiUrl+"/img/img_logo.07141310.png"
            let siteUrl = environment.imgApiUrl+"/#/initPass";

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
                "\t\t\t\t\t<td style=\"font-size:26px;font-family:'나눔고딕',NanumGothic,'맑은고딕',Malgun Gothic,'돋움',Dotum,Helvetica,'Apple SD Gothic Neo',Sans-serif;color:#212121; letter-spacing: -1px;\">[Hellocash 현금영수증] 관리자에 의한 계정 비밀번호 초기화 안내 메일</td>\n" +
                "\t\t\t\t</tr>\n" +
                "\t\t\t\t<tr>\n" +
                "\t\t\t\t\t<td style=\"font-size:14px;font-family:'나눔고딕',NanumGothic,'맑은고딕',Malgun Gothic,'돋움',Dotum,Helvetica,'Apple SD Gothic Neo',Sans-serif;color:#212121; padding-top:24px;\">안녕하세요.</td>\n" +
                "\t\t\t\t</tr>\n" +
                "\t\t\t\t<tr>\n" +
                "\t\t\t\t\t<td style=\"font-size:14px;font-family:'나눔고딕',NanumGothic,'맑은고딕',Malgun Gothic,'돋움',Dotum,Helvetica,'Apple SD Gothic Neo',Sans-serif;color:#939393; padding-top:20px;\">저희 KT 롯데정보통신 현금 영수증 서비스를 이용해 주시는 회원님께 감사 드립니다.</td>\n" +
                "\t\t\t\t</tr>\n" +
                "\t\t\t\t<tr>\n" +
                "\t\t\t\t\t<td style=\"font-size:14px;font-family:'나눔고딕',NanumGothic,'맑은고딕',Malgun Gothic,'돋움',Dotum,Helvetica,'Apple SD Gothic Neo',Sans-serif;color:#939393; padding-top:20px;\">아래 링크 주소를 클릭하여 비밀번호를 설정 하신 후 서비스를 이용해 주시기 바랍니다.</td>\n" +
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
                "\t\t\t\t\t<td style=\"font-family:'나눔고딕',NanumGothic,'맑은고딕',Malgun Gothic,'돋움',Dotum,Helvetica,'Apple SD Gothic Neo',Sans-serif; font-size:14px;color:#505050; height:50px; line-height: 50px; padding:0 18px 0 20px; background:#ffffff; border-bottom:1px solid #dedede; text-align:left; word-wrap:break-word;\">"+account.id+"</td>\n" +
                "\t\t\t\t</tr>\n" +
                "\t\t\t\t<tr>\n" +
                "\t\t\t\t\t<th scope=\"row\" style=\"font-family:'나눔고딕',NanumGothic,'맑은고딕',Malgun Gothic,'돋움',Dotum,Helvetica,'Apple SD Gothic Neo',Sans-serif; font-size:14px; color:#505050; height:50px; line-height: 50px; padding:0 18px 0 30px; border-right:1px solid #dedede; background:#fafafa; border-bottom:1px solid #dedede; text-align:left; vertical-align:top;\">이름</th>\n" +
                "\t\t\t\t\t<td style=\"font-family:'나눔고딕',NanumGothic,'맑은고딕',Malgun Gothic,'돋움',Dotum,Helvetica,'Apple SD Gothic Neo',Sans-serif; font-size:14px;color:#505050; height:50px; line-height: 50px; padding:0 18px 0 20px; background:#ffffff; border-bottom:1px solid #dedede; text-align:left; word-wrap:break-word;\">"+account.name+"</td>\n" +
                "\t\t\t\t</tr>\n" +
                "\t\t\t\t</tbody>\n" +
                "\t\t\t\t</table>\n" +
                "\t\t\t\t<table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"margin-top:0px; margin-bottom:150px;\">\n" +
                "\t\t\t\t<tbody>\n" +
                "\t\t\t\t<tr>\n" +
                "\t\t\t\t\t<td style=\"font-size:14px;font-family:'나눔고딕',NanumGothic,'맑은고딕',Malgun Gothic,'돋움',Dotum,Helvetica,'Apple SD Gothic Neo',Sans-serif;color:#939393; padding-top:15px;\">PW 초기화 링크 주소 :  <a :href="+siteUrl+" target=\"_blank\" style=\"color:#008aff;\">"+siteUrl+"</a> (패스워드 변경 주소링크)</td>\n" +
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

            let reqData : any = {
                to : [account.email],
                title : '[Hellocash 현금영수증]비밀번호 초기화 안내 메일',
                message : mailMessage,
                cc : [''],
            };
            // api 데이터 호출
            CommonBoardService.postListDatas('mail', null, reqData).then((response) => {
                    if (response.status.toString() == '201'|| response.status.toString() == '200') { //메일 전송 완료
                        Vue.swal({text: '비밀번호 초기화 관련 메일 발송이 완료되었습니다.\n발송된 메일을 확인하세요.'});
                    }
                }
                , (error) => {
                    //this.$Progress.finish();
                }
            ).catch();

        }

        downloadFile(){

            //this.rowData = data.row;
            //this.popComfirm();

            //파일 다운로드
            let fileName : string = this.saupFileNm;
            axios({
                url: environment.apiUrl +"/file/"+fileName,
                method: 'GET',
                responseType: 'blob', // important
                headers: {"x-auth-token": sessionStorage.accessToken}
            }).then((response) => {
                // It is necessary to create a new blob object with mime-type explicitly set
                // otherwise only Chrome works like it should
                var newBlob = new Blob([response.data],{type: 'application/xlsx'})

                // IE doesn't allow using a blob object directly as link href
                // instead it is necessary to use msSaveOrOpenBlob
                if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                    window.navigator.msSaveOrOpenBlob(newBlob,fileName)
                    return
                }

                // For other browsers:
                // Create a link pointing to the ObjectURL containing the blob.
                const data = window.URL.createObjectURL(newBlob)
                var link = document.createElement('a')
                link.href = data
                link.download = fileName
                link.click()
                setTimeout(function () {
                    // For Firefox it is necessary to delay revoking the ObjectURL
                    window.URL.revokeObjectURL(data)
                }, 100)
            })

        }
        useStop(event){
            if(event.target.checked==true){
                this.checkVal = true;
            }else{
                this.checkVal = false;
            }
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

        saupnoFormat(val) {
            return val.substring(0, 3) + '-' + val.substring(3, 5) + '-' + val.substring(5, 10);
        }

        //메일 주소 정규표현식 체크
        email_check( email ) {
            var regex=/([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
            return (email != '' && email != 'undefined' && regex.test(email));
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
                        rowData['readGbn'] = true;
                        rowData['createGbn'] = true;
                        rowData['updateGbn'] = true;
                        rowData['deleteGbn'] = true;
                        rowData['readId'] = e.menuCode + rowCnt;
                        rowData['createId'] = e.menuCode + rowCnt;
                        rowData['updateId'] = e.menuCode + rowCnt;
                        rowData['deleteId'] = e.menuCode + rowCnt;

                        arrData.push(rowData);
                    });

                    this.menuList = arrData;

                }else{
                    //Vue.swal({text: '에러'});
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
                        if(code == 'ROLE'){
                            this.roleList = result;
                        }
                    }
                }
                , (error) => {
                }
            ).catch();

        }

    }
</script>

<style scoped>

</style>