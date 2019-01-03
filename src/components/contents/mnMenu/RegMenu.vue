<template>
    <!-- container -->
    <section id="container">
        <!-- content  -->
        <div class="content">
            <h2 class="blind">시스템 관리</h2>

            <h3>메뉴 권한 등록</h3>

            <p class="req_info type01">(<em class="form_req">*</em>)는 필수항목입니다.</p>

            <!-- tbl view box -->
            <div class="tbl_view_box">
                <!-- tbl view01 -->
                <table class="tbl_view01">
                    <caption>메뉴 권한 등록</caption>
                    <colgroup>
                        <col width="17%">
                        <col width="33%">
                        <col width="17%">
                        <col width="33%">
                    </colgroup>
                    <tbody>
                    <tr>
                        <th scope="row">상위메뉴<em class="form_req">*</em></th>
                        <td colspan="3">
                            <select id="" name="" class="select form_w50" title="상위메뉴" v-model="groupCode">
                                <option value="">선택</option>
                                <template v-for="datas in menuGroupList">
                                    <option v-bind:value=datas.groupCode>{{datas.groupCodeNm}}</option>
                                </template>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">메뉴명<em class="form_req">*</em></th>
                        <td><input type="text" class="input form_w100" title="메뉴명" v-model="name"></td>
                        <th scope="row">메뉴 코드</th>
                        <td>
                            <input type="text" class="input form_w100" title="메뉴 코드" disabled="disabled" v-model="menuCode">
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">사용 여부</th>
                        <td colspan="3">
                            <select id="" name="" class="select form_w50" title="사용 여부" v-model="useYn">
                                <option value="">선택</option>
                                <option value="Y">사용</option>
                                <option value="N">미사용</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">메뉴 경로<em class="form_req">*</em></th>
                        <td colspan="3"><input type="text" class="input form_w100" title="메뉴 경로" v-model="menuPath"></td>
                    </tr>
                    <tr>
                        <th scope="row">메뉴 설명</th>
                        <td colspan="3"><input type="text" class="input form_w100" title="메뉴 설명" v-model="memo"></td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <!-- //tbl view box -->

            <!-- tbl list box -->
            <div class="tbl_list_box tbl_blank01">

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
                        <th scope="col">권한</th>
                        <th scope="col">조회</th>
                        <th scope="col">등록</th>
                        <th scope="col">수정</th>
                        <th scope="col">삭제</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <th scope="row">시스템 관리자</th>
                        <td><span class="chk_box"><input type="checkbox" id="system1" v-model="system1" :value="systemVal1" v-on:input="systemVal1=$event.target.checked == true ? 'Y' : 'N' "><label for=""><span class="blind">선택</span></label></span></td>
                        <td><span class="chk_box"><input type="checkbox" id="system2" v-model="system2" :value="systemVal2" v-on:input="systemVal2=$event.target.checked == true ? 'Y' : 'N' "><label for=""><span class="blind">선택</span></label></span></td>
                        <td><span class="chk_box"><input type="checkbox" id="system3" v-model="system3" :value="systemVal3" v-on:input="systemVal3=$event.target.checked == true ? 'Y' : 'N' "><label for=""><span class="blind">선택</span></label></span></td>
                        <td><span class="chk_box"><input type="checkbox" id="system4" v-model="system4" :value="systemVal4" v-on:input="systemVal4=$event.target.checked == true ? 'Y' : 'N' "><label for=""><span class="blind">선택</span></label></span></td>
                    </tr>
                    <tr>
                        <th scope="row">사업자 관리자</th>
                        <td><span class="chk_box"><input type="checkbox" id="saupja1" v-model="saupja1" :value="saupjaVal1" v-on:input="saupjaVal1=$event.target.checked == true ? 'Y' : 'N' "><label for=""><span class="blind">선택</span></label></span></td>
                        <td><span class="chk_box"><input type="checkbox" id="saupja2" v-model="saupja2" :value="saupjaVal2" v-on:input="saupjaVal2=$event.target.checked == true ? 'Y' : 'N' "><label for=""><span class="blind">선택</span></label></span></td>
                        <td><span class="chk_box"><input type="checkbox" id="saupja3" v-model="saupja3" :value="saupjaVal3" v-on:input="saupjaVal3=$event.target.checked == true ? 'Y' : 'N' "><label for=""><span class="blind">선택</span></label></span></td>
                        <td><span class="chk_box"><input type="checkbox" id="saupja4" v-model="saupja4" :value="saupjaVal4" v-on:input="saupjaVal4=$event.target.checked == true ? 'Y' : 'N' "><label for=""><span class="blind">선택</span></label></span></td>
                    </tr>
                    <tr>
                        <th scope="row">콜센터</th>
                        <td><span class="chk_box"><input type="checkbox" id="call1" v-model="call1" :value="callVal1" v-on:input="callVal1=$event.target.checked == true ? 'Y' : 'N' "><label for=""><span class="blind">선택</span></label></span></td>
                        <td><span class="chk_box"><input type="checkbox" id="call2" v-model="call2" :value="callVal2" v-on:input="callVal2=$event.target.checked == true ? 'Y' : 'N' "><label for=""><span class="blind">선택</span></label></span></td>
                        <td><span class="chk_box"><input type="checkbox" id="call3" v-model="call3" :value="callVal3" v-on:input="callVal3=$event.target.checked == true ? 'Y' : 'N' "><label for=""><span class="blind">선택</span></label></span></td>
                        <td><span class="chk_box"><input type="checkbox" id="call4" v-model="call4" :value="callVal4" v-on:input="callVal4=$event.target.checked == true ? 'Y' : 'N' "><label for=""><span class="blind">선택</span></label></span></td>
                    </tr>
                    <tr>
                        <th scope="row">가맹점 관리자</th>
                        <td><span class="chk_box"><input type="checkbox" id="gajum1" v-model="gajum1" :value="gajumVal1" v-on:input="gajumVal1=$event.target.checked == true ? 'Y' : 'N' "><label for=""><span class="blind">선택</span></label></span></td>
                        <td><span class="chk_box"><input type="checkbox" id="gajum2" v-model="gajum2" :value="gajumVal2" v-on:input="gajumVal2=$event.target.checked == true ? 'Y' : 'N' "><label for=""><span class="blind">선택</span></label></span></td>
                        <td><span class="chk_box"><input type="checkbox" id="gajum3" v-model="gajum3" :value="gajumVal3" v-on:input="gajumVal3=$event.target.checked == true ? 'Y' : 'N' "><label for=""><span class="blind">선택</span></label></span></td>
                        <td><span class="chk_box"><input type="checkbox" id="gajum4" v-model="gajum4" :value="gajumVal4" v-on:input="gajumVal4=$event.target.checked == true ? 'Y' : 'N' "><label for=""><span class="blind">선택</span></label></span></td>
                    </tr>
                    <tr>
                        <th scope="row">지점 관리자</th>
                        <td><span class="chk_box"><input type="checkbox" id="jijum1" v-model="jijum1" :value="jijumVal1" v-on:input="jijumVal1=$event.target.checked == true ? 'Y' : 'N' "><label for=""><span class="blind">선택</span></label></span></td>
                        <td><span class="chk_box"><input type="checkbox" id="jijum2" v-model="jijum2" :value="jijumVal2" v-on:input="jijumVal2=$event.target.checked == true ? 'Y' : 'N' "><label for=""><span class="blind">선택</span></label></span></td>
                        <td><span class="chk_box"><input type="checkbox" id="jijum3" v-model="jijum3" :value="jijumVal3" v-on:input="jijumVal3=$event.target.checked == true ? 'Y' : 'N' "><label for=""><span class="blind">선택</span></label></span></td>
                        <td><span class="chk_box"><input type="checkbox" id="jijum4" v-model="jijum4" :value="jijumVal4" v-on:input="jijumVal4=$event.target.checked == true ? 'Y' : 'N' "><label for=""><span class="blind">선택</span></label></span></td>
                    </tr>
                    </tbody>
                </table>
                <!--<ListComponent v-bind:listObject="listItem" v-bind:onLoadList="listItem.dataGrid.onLoadList" v-on:listView="listViewEvent" v-on:listCheckEvent="checkBoxEvent"></ListComponent>-->
            <!-- //tbl list box -->
            </div>
            <!-- btn bot -->
            <div class="btn_bot">
                <button type="button" id="" class="btn_b01 bg02" v-on:click="cancelReg">취소</button>
                <button type="button" class="btn_b01 bg01" v-on:click="validationChk">등록</button>
            </div>

        </div>
        <!-- //content -->
    </section>
    <!-- //container -->
</template>

<script lang="ts">

    import {Component, Vue} from "vue-property-decorator";
    //import ListComponent from '../../common/list/list.vue';  // 공용리스트 콤포넌트
    import {CommonBoardService, CommonListService} from '../../../api/common.service';
    //import {MenuAuth} from '../../../model/account/menuAuth';

    @Component({
        components: {
            RegMenu
        }
    })
    export default class RegMenu extends Vue {
        auth : any = "";

        menuGroupList : any = {}; //메뉴그룹 selectbox

        groupCode: any = '';
        name: any = '';
        menuCode: any = '';
        useYn: any = '';
        menuPath: any = '';
        memo: any = '';

        //menuAuth : MenuAuth[]=[]; //메뉴권한

        system1 : any = '';
        system2 : any = '';
        system3 : any = '';
        system4 : any = '';
        systemVal1 : any = '';
        systemVal2 : any = '';
        systemVal3 : any = '';
        systemVal4 : any = '';

        saupja1 : any = '';
        saupja2 : any = '';
        saupja3 : any = '';
        saupja4 : any = '';
        saupjaVal1 : any = '';
        saupjaVal2 : any = '';
        saupjaVal3 : any = '';
        saupjaVal4 : any = '';

        call1 : any = '';
        call2 : any = '';
        call3 : any = '';
        call4 : any = '';
        callVal1 : any = '';
        callVal2 : any = '';
        callVal3 : any = '';
        callVal4 : any = '';

        gajum1 : any = '';
        gajum2 : any = '';
        gajum3 : any = '';
        gajum4 : any = '';
        gajumVal1 : any = '';
        gajumVal2 : any = '';
        gajumVal3 : any = '';
        gajumVal4 : any = '';

        jijum1 : any = '';
        jijum2 : any = '';
        jijum3 : any = '';
        jijum4 : any = '';
        jijumVal1 : any = '';
        jijumVal2 : any = '';
        jijumVal3 : any = '';
        jijumVal4 : any = '';

        mounted(){
        }

        created(){
            this.getSelectList('GROUP');
        }

        getMenuDetail(){//메뉴 상세정보

        }

        listViewEvent(){

        }

        checkBoxEvent(){

        }

        validationChk(){

            if(this.groupCode == ''){
                alert('상위메뉴를 선택하세요.');
                return;
            }else if(this.name == ''){
                alert('메뉴명을 입력하세요.');
                return;
            }else if(this.useYn == ''){
                alert('사용 여부를 선택하세요.');
                return;
            }else if(this.menuPath == ''){
                alert('메뉴경로를 입력하세요.');
                return;
            }else{

                this.insertInfo();
            }

            //this.insertInfo();

        }

        insertInfo(){

            let reqData : any = {};

            reqData['groupCode'] = this.groupCode; //상위메뉴
            reqData['name'] = this.name; //메뉴명
            reqData['menuCode'] = this.menuCode; //메뉴코드
            reqData['useYn'] = this.useYn; //사용여부
            reqData['menuPath'] = this.menuPath; //메뉴경로
            reqData['memo'] = this.memo; //메뉴설명

            let menuAuth : any = ['system','saupja','call','gajum','jijum']; //체크박스 아이디(시스템, 사업자, 콜센터, 가맹점, 지점) 관리자 순으로
            let authCode : any = ['0001', '0002', '0003', '0004', '0005']; //권한코드(시스템, 사업자, 콜센터, 가맹점, 지점) 관리자 순으로
            let authNm : any = ['시스템관리자', '사업자관리자', '콜센터', '가맹점관리자', '지점관리자']; //권한명
            let authTit :  any = ['readYn','createYn','updateYn','deleteYn']; //조회, 등록, 수정, 삭제 권한 순으로
            let arayObj : any = [];
            let authRow : any = {};

            for(let j=0; j<menuAuth.length; j++) {
                authRow = {};
                for (let i = 0; i < authTit.length; i++) {
                    authRow['roleCode'] = authCode[j]; //권한코드
                    authRow['roleNm'] = authNm[j]; //권한명
                    let selData = menuAuth[j] + (i+1);
                    let abc = document.getElementById(selData);
                    if (abc != null) {
                        if (abc.getAttribute('value') == 'Y') { //권한 체크 했으면
                            authRow[authTit[i]] = 'Y'
                        } else { //권한 체크 안했으면
                            authRow[authTit[i]] = 'N'
                        }
                    }
                }
                arayObj.push(authRow);
            }
            reqData['menuRole'] = arayObj;
            console.log('최종값 확인');
            console.log(reqData);


            // api 데이터 호출(매뉴 등록)
            CommonBoardService.postListDatas('menu-manage', null, reqData).then((response) => {
                    let result: any = response.data;
                    console.log(result);
                    if (result.code == '000') {
                        //메뉴 등록 완료
                        //this.$router.push({ name:'branchRegCmpl' , params: { objectKey : reqData } }) // 라우터 주소를 넣어줘야 히스토리모드 인식
                        //this.$router.push({name:'mnMenu'})
                        this.$router.push('/home/mnUserList');
                    } else {
                        alert('메뉴 등록에 실패하였습니다.\n다시 시도하세요.');
                        return;
                    }
                }
                , (error) => {
                    console.log(error);
                }
            ).catch((response) => {
                console.log(response);
            });

        }

        //등록 취소
        cancelReg(){
            //this.$router.push({name:'mnMenu'})
            this.$router.push('/home/mnMenu');
        }

        //공통 select box 조회
        getSelectList(code: string){
            if(code == ''){
                return;
            }

            let reqData: any = {};
            let apiUrl : string = '';

            if(code == 'GROUP'){ //메뉴그룹
                apiUrl = 'menu-manage/group';
            }

            // api 데이터 호출
            CommonBoardService.getListDatas(apiUrl, null, reqData).then((response) => {
                    let result: any = response.data;
                    //console.log(result)
                    if (result.length > 0) {
                        if(code == 'GROUP'){ //메뉴그룹
                            this.menuGroupList = result;
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
