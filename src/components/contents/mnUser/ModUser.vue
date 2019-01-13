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
                            <select id="" name="" class="select form_w100" title="계정등급" v-model="account.role" disabled="disabled">
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
                    <tr v-if="saupjangSajin">
                        <th scope="row">사업자등록증 확인</th>
                        <td class="con01" colspan="3">
                            <a href="#" class="link02" v-on:click="downloadFile">사업자등록증 다운로드</a>
                        </td>
                        <!--<th scope="row">전화번호</th>
                        <td class="con01">
                            <input type="text" class="input form_w100" title="전화번호" v-model="account.telNum">
                        </td>-->
                    </tr>
                    <tr>
                        <th scope="row">주소</th>
                        <td colspan="3">
                            <ul class="address_list">
                                <li class="con01">
                                    <input type="text" class="input form_post" title="우편번호" v-model="account.zipCode" disabled="disabled">
                                    <button type="button" id="" class="btn_s01 bg03" @click="addressBoxOn">우편번호</button>
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
                            <input type="text" class="input form_conip" title="접속IP 대역" v-model="account.accessIpFrom" disabled="disabled">
                            <span class="period_form">-</span>
                            <input type="text" class="input form_conip" title="접속IP 대역" v-model="account.accessIpTo" disabled="disabled">
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
                <button type="button" id="" class="btn_b01 bg02" v-on:click="cancelUpdate">취소</button>
                <button type="button" id="" class="btn_b01 bg01" v-on:click="validationChk" v-show="regShow">정보변경</button>
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

        menuList : any = [];
        regShow : boolean = false;

        account : Account[]=[];
        gajum : Gajum[]=[];
        saupjang : Saupjang[]=[];

        oldRole : any = ''; //이전 role

        saupjangSajin : boolean = false; //사업자등록증 뷰 여부

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

        accountInfo(id,auth){
            let reqData = { id: id ,role: auth }
            CommonBoardService.getListDatas('accounts/'+id, null, reqData).then(result=>{
               if(result.status==200){
                   //console.log('계정정보 조회 결과')
                   //console.log(result.data)
                   this.saupInfo(result.data.saupId); //조회된 사업자등록번호로 사업장 정보 조회
                   this.account = result.data

                   //this.setData()
                   this.account = result.data;
                   this.oldRole = result.data.role;
                   if(result.data.aprvYn != null && result.data.aprvYn != 'Y'){ //승인이 안된경우만 사업자등록증 확인 보여줌
                       this.saupjangSajin = true;
                   }

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
            this.$router.push('/home/mnUserList');
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
            console.log('form 정보 확인')
            console.log(account);
/*
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
            }else if(account.role == '' || account.role == null){
                Vue.swal({text:'계정등급을 선택하세요.'});
                return;
            }else if(account.accountStatus == '' || account.accountStatus == null){
                Vue.swal({text:'계정상태를 선택하세요.'});
                return;
            //}else if(account.telNum == '' || account.telNum == null){
            //    alert('전화번호를 입력하세요.')
            //    return;
            }else if(account.zipCode == '' || account.zipCode == null){
                Vue.swal({text:'우편번호 버튼을 클릭하여 주소를 선택하세요.'});
                return;
            }else if(account.addr1 == '' || account.addr1 == null){
                Vue.swal({text:'우편번호 버튼을 클릭하여 주소를 선택하세요.'});
                return;
            }else if(account.addr2 == '' || account.addr2 == null){
                Vue.swal({text:'상세주소를 입력하세요.'});
                return;
            /*}else if(account.accessIpFrom == '' || account.accessIpFrom == null){
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
            reqData['accountStatus'] = account.accountStatus; //계정상태
            reqData['telNum'] = account.telNum;
            reqData['zipCode'] = account.zipCode;
            reqData['addr1'] = account.addr1;
            reqData['addr2'] = account.addr2;
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

            console.log('최종 요청값 확인')
            console.log(reqData)

            // api 데이터 호출(계정 정보 수정)
            CommonBoardService.updateListData('accounts', account.id, reqData).then((response) => {
                    let result: any = response.data;
                    //console.log(result);
                    if (result.code == '000') {
                        //계정 수정 완료
                        //this.$router.push({ name:'mnUserList' , params: { objectKey : reqData } }) // 라우터 주소를 넣어줘야 히스토리모드 인식
                        //this.$router.push({name:'mnUserList'})
                        this.$router.push('/home/mnUser');
                    } else {
                        Vue.swal({text:'계정 정보 수정에 실패하였습니다. 다시 시도하세요.'});
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

        mounted(){

        }
        commonCode(){
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
            console.log(e);
            // 주소값 리턴 받기
            let account : any = this.account;
            account.zipCode = e.zip;
            account.addr1 = e.addr;
        }
        checkBoxEvent(da){
            console.log(da);
        }

        //비밀번호 초기화
        initPassword(){

            let account : any = this.account;

            console.log("비밀번호 초기화")

            let reqData : any = {
                to : [account.email],
                title : '현금영수증 비밀번호 초기화 안내 메일입니다.',
                message : '현금영수증 비빌번호 초기화 안내입니다.\nhttp://211.39.150.112:8888 에서 비밀번호 초기화 하세요.',
                cc : [''],
             };
            // api 데이터 호출
            CommonBoardService.postListDatas('mail', null, reqData).then((response) => {
                    console.log(response);
                    if (response.status.toString() == '201'|| response.status.toString() == '200') { //메일 전송 완료
                        Vue.swal({text: '비밀번호 초기화 관련 메일 발송이 완료되었습니다.\n발송된 메일을 확인하세요.'});
                    }
                }
                , (error) => {
                    //this.$Progress.finish();
                    console.log(error);
                }
            ).catch();

        }

        downloadFile(){

            console.log('사업자등록증 파일 다운로드');
            //this.rowData = data.row;
            //this.popComfirm();

            let server: any = environment.apiUrl;
            let param: any = '/file/' + '20190102154913_J0341559.JPG';
            let fileNm : string = '20190102154913_J0341559.JPG';
            //파일 다운로드
            axios({
                url: server + param,
                method: 'GET',
                responseType: 'blob', // important
                headers: {"x-auth-token": sessionStorage.accessToken}
            }).then((response) => {
                console.log(response);
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', fileNm); //or any other extension
                document.body.appendChild(link);
                link.click();
            });

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