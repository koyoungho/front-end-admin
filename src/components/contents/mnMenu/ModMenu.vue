<template>
    <!-- container -->
    <section id="container">
        <!-- content  -->
        <div class="content">
            <h2 class="blind">시스템 관리</h2>

            <h3>메뉴 권한 수정</h3>

            <p class="req_info type01">(<em class="form_req">*</em>)는 필수항목입니다.</p>

            <!-- tbl view box -->
            <div class="tbl_view_box">
                <!-- tbl view01 -->
                <table class="tbl_view01">
                    <caption>메뉴 권한 상세</caption>
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
                        <td><input type="text" class="input form_w100" title="메뉴명" v-model="name" maxlength="20"></td>
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
                        <td colspan="3"><input type="text" class="input form_w100" title="메뉴 경로" v-model="menuPath" maxlength="30"></td>
                    </tr>
                    <tr>
                        <th scope="row">프로그램ID<em class="form_req">*</em></th>
                        <td colspan="3"><input type="text" class="input form_w100" title="메뉴 경로" v-model="progId" maxlength="30"></td>
                    </tr>
                    <tr>
                        <th scope="row">메뉴 설명</th>
                        <td colspan="3"><input type="text" class="input form_w100" title="메뉴 설명" v-model="memo" maxlength="30"></td>
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
                        <td><span class="chk_box"><input type="checkbox" id="system1" v-model="system1" ><label for=""><span class="blind">선택</span></label></span></td>
                        <td><span class="chk_box"><input type="checkbox" id="system2" v-model="system2" ><label for=""><span class="blind">선택</span></label></span></td>
                        <td><span class="chk_box"><input type="checkbox" id="system3" v-model="system3" ><label for=""><span class="blind">선택</span></label></span></td>
                        <td><span class="chk_box"><input type="checkbox" id="system4" v-model="system4" ><label for=""><span class="blind">선택</span></label></span></td>
                    </tr>
                    <tr>
                        <th scope="row">사업자 관리자</th>
                        <td><span class="chk_box"><input type="checkbox" id="saupja1" v-model="saupja1" ><label for=""><span class="blind">선택</span></label></span></td>
                        <td><span class="chk_box"><input type="checkbox" id="saupja2" v-model="saupja2" ><label for=""><span class="blind">선택</span></label></span></td>
                        <td><span class="chk_box"><input type="checkbox" id="saupja3" v-model="saupja3" ><label for=""><span class="blind">선택</span></label></span></td>
                        <td><span class="chk_box"><input type="checkbox" id="saupja4" v-model="saupja4" ><label for=""><span class="blind">선택</span></label></span></td>
                    </tr>
                    <tr>
                        <th scope="row">콜센터</th>
                        <td><span class="chk_box"><input type="checkbox" id="call1" v-model="call1" ><label for=""><span class="blind">선택</span></label></span></td>
                        <td><span class="chk_box"><input type="checkbox" id="call2" v-model="call2" ><label for=""><span class="blind">선택</span></label></span></td>
                        <td><span class="chk_box"><input type="checkbox" id="call3" v-model="call3" ><label for=""><span class="blind">선택</span></label></span></td>
                        <td><span class="chk_box"><input type="checkbox" id="call4" v-model="call4" ><label for=""><span class="blind">선택</span></label></span></td>
                    </tr>
                    <tr>
                        <th scope="row">가맹점 관리자</th>
                        <td><span class="chk_box"><input type="checkbox" id="gajum1" v-model="gajum1" ><label for=""><span class="blind">선택</span></label></span></td>
                        <td><span class="chk_box"><input type="checkbox" id="gajum2" v-model="gajum2" ><label for=""><span class="blind">선택</span></label></span></td>
                        <td><span class="chk_box"><input type="checkbox" id="gajum3" v-model="gajum3" ><label for=""><span class="blind">선택</span></label></span></td>
                        <td><span class="chk_box"><input type="checkbox" id="gajum4" v-model="gajum4" ><label for=""><span class="blind">선택</span></label></span></td>
                    </tr>
                    <tr>
                        <th scope="row">지점 관리자</th>
                        <td><span class="chk_box"><input type="checkbox" id="jijum1" v-model="jijum1" ><label for=""><span class="blind">선택</span></label></span></td>
                        <td><span class="chk_box"><input type="checkbox" id="jijum2" v-model="jijum2" ><label for=""><span class="blind">선택</span></label></span></td>
                        <td><span class="chk_box"><input type="checkbox" id="jijum3" v-model="jijum3" ><label for=""><span class="blind">선택</span></label></span></td>
                        <td><span class="chk_box"><input type="checkbox" id="jijum4" v-model="jijum4" ><label for=""><span class="blind">선택</span></label></span></td>
                    </tr>
                    </tbody>
                </table>
                <!--<ListComponent v-bind:listObject="listItem" v-bind:onLoadList="listItem.dataGrid.onLoadList" v-on:listView="listViewEvent" v-on:listCheckEvent="checkBoxEvent"></ListComponent>-->
                <!-- //tbl list box -->
            </div>
            <!-- btn bot -->
            <div class="btn_bot">
                <button type="button" id="" class="btn_b01 bg02" v-on:click="cancelReg">취소</button>
                <button type="button" class="btn_b01 bg01" v-on:click="validationChk" v-show="regShow">수정</button>
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
            ModMenu
        }
    })
    export default class ModMenu extends Vue {
        auth : any = "";

        objectKey : any = '';

        menuGroupList : any = {}; //메뉴그룹 selectbox

        groupCode: any = '';
        name: any = '';
        menuCode: any = '';
        useYn: any = '';
        menuPath: any = '';
        progId: any = '';
        memo: any = '';

        menuAray : any = [];

        //menuAuth : MenuAuth[]=[]; //메뉴권한

        system1 : any = '';
        system2 : any = '';
        system3 : any = '';
        system4 : any = '';
        systemVal1 : any = 'N';
        systemVal2 : any = 'N';
        systemVal3 : any = 'N';
        systemVal4 : any = 'N';

        saupja1 : any = '';
        saupja2 : any = '';
        saupja3 : any = '';
        saupja4 : any = '';
        saupjaVal1 : any = 'N';
        saupjaVal2 : any = 'N';
        saupjaVal3 : any = 'N';
        saupjaVal4 : any = 'N';

        call1 : any = '';
        call2 : any = '';
        call3 : any = '';
        call4 : any = '';
        callVal1 : any = 'N';
        callVal2 : any = 'N';
        callVal3 : any = 'N';
        callVal4 : any = 'N';

        gajum1 : any = '';
        gajum2 : any = '';
        gajum3 : any = '';
        gajum4 : any = '';
        gajumVal1 : any = 'N';
        gajumVal2 : any = 'N';
        gajumVal3 : any = 'N';
        gajumVal4 : any = 'N';

        jijum1 : any = '';
        jijum2 : any = '';
        jijum3 : any = '';
        jijum4 : any = '';
        jijumVal1 : any = 'N';
        jijumVal2 : any = 'N';
        jijumVal3 : any = 'N';
        jijumVal4 : any = 'N';

        regShow:boolean= false;

        mounted(){

        }

        created(){
            this.getSelectList('GROUP');

            this.objectKey = this.$route.params.objectKey;

            this.menuView(); //메뉴 정보 조회

            // 메뉴별 권한 확인
            let menuList = JSON.parse(sessionStorage.authMenu);
            let programId = 'mnMenu'; //메뉴ID
            for (let i = 0; i < menuList.length; i++) {
                for (let j = 0; j < menuList[i].subMenuDtos.length; j++) {

                    //권한(조회-readYn/ 등록-createYn/ 수정-updateYn/ 삭제-deleteYn)
                    if (menuList[i].subMenuDtos[j].progId == programId && menuList[i].subMenuDtos[j].updateYn == 'Y') {
                        this.regShow = true;
                    }
                }
            }
        }

        menuView(){//메뉴 상세정보
            if(!this.objectKey){
                Vue.swal({text:'접근할수 없습니다'})
                this.$router.push({name:'mnMenuList'});
            }else{
                let mCode = this.objectKey.menuCode; //메뉴코드
                CommonBoardService.getListDatas('menu-manage', mCode, null).then((response) => {
                    let result: any =  response.data;
                    if(result != null){
                        this.groupCode = result.groupCode;
                        this.name = result.name;
                        this.menuCode = result.menuCode;
                        this.useYn = result.useYn;
                        this.memo = result.memo;
                        this.menuPath = result.menuPath;
                        this.progId = result.progId;

                        //this.menuAray = result.menuRole;
                        //let menuId = ['system', 'saupja', 'call', 'gajum', 'jijum']
                        for(let i=0; i<result.menuRole.length; i++){
                            if(result.menuRole[i].roleCode == '0001'){ //시스템관리자
                                if(result.menuRole[i].readYn == 'Y'){
                                    this.system1 = true;
                                    this.systemVal1 = 'Y';
                                }
                                if(result.menuRole[i].createYn == 'Y'){
                                    this.system2 = true;
                                    this.systemVal2 = 'Y';
                                }
                                if(result.menuRole[i].updateYn == 'Y'){
                                    this.system3 = true;
                                    this.systemVal3 = 'Y';
                                }
                                if(result.menuRole[i].deleteYn == 'Y'){
                                    this.system4 = true;
                                    this.systemVal4 = 'Y';
                                }
                            }else if(result.menuRole[i].roleCode == '0002'){ //사업자관리자
                                if(result.menuRole[i].readYn == 'Y'){
                                    this.saupja1 = true;
                                    this.saupjaVal1 = 'Y';
                                }
                                if(result.menuRole[i].createYn == 'Y'){
                                    this.saupja2 = true;
                                    this.saupjaVal2 = 'Y';
                                }
                                if(result.menuRole[i].updateYn == 'Y'){
                                    this.saupja3 = true;
                                    this.saupjaVal3 = 'Y';
                                }
                                if(result.menuRole[i].deleteYn == 'Y'){
                                    this.saupja4 = true;
                                    this.saupjaVal4 = 'Y';
                                }
                            }else if(result.menuRole[i].roleCode == '0003'){ //콜센터
                                if(result.menuRole[i].readYn == 'Y'){
                                    this.call1 = true;
                                    this.callVal1 = 'Y';
                                }
                                if(result.menuRole[i].createYn == 'Y'){
                                    this.call2 = true;
                                    this.callVal2 = 'Y';
                                }
                                if(result.menuRole[i].updateYn == 'Y'){
                                    this.call3 = true;
                                    this.callVal3 = 'Y';
                                }
                                if(result.menuRole[i].deleteYn == 'Y'){
                                    this.call4 = true;
                                    this.callVal4 = 'Y';
                                }
                            }else if(result.menuRole[i].roleCode == '0004'){ //가맹점관리자
                                if(result.menuRole[i].readYn == 'Y'){
                                    this.gajum1 = true;
                                    this.gajumVal1 = 'Y';
                                }
                                if(result.menuRole[i].createYn == 'Y'){
                                    this.gajum2 = true;
                                    this.gajumVal2 = 'Y';
                                }
                                if(result.menuRole[i].updateYn == 'Y'){
                                    this.gajum3 = true;
                                    this.gajumVal3 = 'Y';
                                }
                                if(result.menuRole[i].deleteYn == 'Y'){
                                    this.gajum4 = true;
                                    this.gajumVal4 = 'Y';
                                }
                            }else if(result.menuRole[i].roleCode == '0005'){ //지점관리자
                                if(result.menuRole[i].readYn == 'Y'){
                                    this.jijum1 = true;
                                    this.jijumVal1 = 'Y';
                                }
                                if(result.menuRole[i].createYn == 'Y'){
                                    this.jijum2 = true;
                                    this.jijumVal2 = 'Y';
                                }
                                if(result.menuRole[i].updateYn == 'Y'){
                                    this.jijum3 = true;
                                    this.jijumVal3 = 'Y';
                                }
                                if(result.menuRole[i].deleteYn == 'Y'){
                                    this.jijum4 = true;
                                    this.jijumVal4 = 'Y';
                                }
                           }
                        }

                    }else{
                    }
                    //this.onLoadListView = true;
                }).catch();
            }

        }

        listViewEvent(){

        }

        checkBoxEvent(){

        }

        validationChk(){

            if(this.groupCode == ''){
                Vue.swal({text:'상위메뉴를 선택하세요.'})
                return;
            }else if(this.name == ''){
                Vue.swal({text:'메뉴명을 입력하세요.'});
                return;
            }else if(this.useYn == ''){
                Vue.swal({text:'사용 여부를 선택하세요.'});
                return;
            }else if(this.menuPath == ''){
                Vue.swal({text:'메뉴경로를 입력하세요.'});
                return;
            }else if(this.progId == ''){
                Vue.swal({text:'프로그램ID를 입력하세요.'});
                return;
            }else{
                this.insertInfo();
            }
        }

        insertInfo(){

            let reqData : any = {};

            reqData['groupCode'] = this.groupCode; //상위메뉴
            reqData['name'] = this.name; //메뉴명
            reqData['menuCode'] = this.menuCode; //메뉴코드
            reqData['useYn'] = this.useYn; //사용여부
            reqData['menuPath'] = this.menuPath; //메뉴경로
            reqData['progId'] = this.progId; //프로그램id
            reqData['memo'] = this.memo; //메뉴설명

            /*
            let menuAuth : any = ['system','saupja','call','gajum','jijum']; //체크박스 아이디(시스템, 사업자, 콜센터, 가맹점, 지점) 관리자 순으로
            let authCode : any = ['0001', '0002', '0003', '0004', '0005']; //권한코드(시스템, 사업자, 콜센터, 가맹점, 지점) 관리자 순으로
            let authNm : any = ['시스템관리자', '사업자관리자', '콜센터', '가맹점관리자', '지점관리자']; //권한명
            let authTit :  any = ['readYn','createYn','updateYn','deleteYn']; //조회, 등록, 수정, 삭제 권한 순으로
            let arayObj : any = [];
            let authRow : any = {};

            console.log('999999999999999999')
            console.log(this.system1)

            console.log('menu length :: ' + menuAuth.length)
            for(let j=0; j<menuAuth.length; j++) {
                authRow = {};
                for (let i = 0; i < authTit.length; i++) {
                    authRow['roleCode'] = authCode[j]; //권한코드
                    authRow['roleNm'] = authNm[j]; //권한명
                    authRow['menuCode'] = this.menuCode;
                    let selData = menuAuth[j] + (i+1);
                    console.log('check id :: ' + selData)
                    let abc = document.getElementById(selData);

                    if (abc != null) {
                        console.log('getattribute :: ' + abc.getAttribute('value'))
                        if (abc.getAttribute('value') == 'Y') { //권한 체크 했으면
                            authRow[authTit[i]] = 'Y'
                        } else { //권한 체크 안했으면
                            authRow[authTit[i]] = 'N'
                        }
                    }
                }
                arayObj.push(authRow);
            }
            */

            let menuAuth : any = ['system','saupja','call','gajum','jijum'];
            let authCode : any = ['0001', '0002', '0003', '0004', '0005'];
            let authNm : any = ['시스템관리자', '사업자관리자', '콜센터', '가맹점관리자', '지점관리자']; //권한명
            let authTit :  any = ['readYn','createYn','updateYn','deleteYn']; //조회, 등록, 수정, 삭제 권한 순으로
            let system : any = [this.system1, this.system2, this.system3, this.system4];
            let saupja : any = [this.saupja1, this.saupja2, this.saupja3, this.saupja4];
            let call : any = [this.call1, this.call2, this.call3, this.call4];
            let gajum : any = [this.gajum1, this.gajum2, this.gajum3, this.gajum4];
            let jijum : any = [this.jijum1, this.jijum2, this.jijum3, this.jijum4];

            let arayObj : any = [];
            let authRow : any = {};

            for(let i=0;i<menuAuth.length;i++){ //5개의 관리자
                authRow = {};
                if(menuAuth[i] == 'system'){
                    authRow['roleCode'] = authCode[i]; //권한코드
                    authRow['roleNm'] = authNm[i]; //권한명
                    authRow['menuCode'] = this.menuCode;

                    for(let j=0;j<system.length;j++){  //시스템관리자의 권한 4개
                        if(system[j] != null && system[j] == true){
                            authRow[authTit[j]] = 'Y'
                        }else{
                            authRow[authTit[j]] = 'N'
                        }
                    }
                }else if(menuAuth[i] == 'saupja'){
                    authRow['roleCode'] = authCode[i]; //권한코드
                    authRow['roleNm'] = authNm[i]; //권한명
                    authRow['menuCode'] = this.menuCode;

                    for(let j=0;j<saupja.length;j++){
                        if(saupja[j] != null && saupja[j] == true){
                            authRow[authTit[j]] = 'Y'
                        }else{
                            authRow[authTit[j]] = 'N'
                        }
                    }
                }else if(menuAuth[i] == 'call'){
                    authRow['roleCode'] = authCode[i]; //권한코드
                    authRow['roleNm'] = authNm[i]; //권한명
                    authRow['menuCode'] = this.menuCode;

                    for(let j=0;j<call.length;j++){
                        if(call[j] != null && call[j] == true){
                            authRow[authTit[j]] = 'Y'
                        }else{
                            authRow[authTit[j]] = 'N'
                        }
                    }
                }else if(menuAuth[i] == 'gajum'){
                    authRow['roleCode'] = authCode[i]; //권한코드
                    authRow['roleNm'] = authNm[i]; //권한명
                    authRow['menuCode'] = this.menuCode;

                    for(let j=0;j<gajum.length;j++){
                        if(gajum[j] != null && gajum[j] == true){
                            authRow[authTit[j]] = 'Y'
                        }else{
                            authRow[authTit[j]] = 'N'
                        }
                    }
                }else if(menuAuth[i] == 'jijum'){
                    authRow['roleCode'] = authCode[i]; //권한코드
                    authRow['roleNm'] = authNm[i]; //권한명
                    authRow['menuCode'] = this.menuCode;

                    for(let j=0;j<jijum.length;j++){
                        if(jijum[j] != null && jijum[j] == true){
                            authRow[authTit[j]] = 'Y'
                        }else{
                            authRow[authTit[j]] = 'N'
                        }
                    }
                }
                arayObj.push(authRow);
            }

            reqData['menuRole'] = arayObj;

            // api 데이터 호출(메뉴 등록)
            CommonBoardService.updateListData('menu-manage', this.menuCode, reqData).then((response) => {
                    if (response.status == 200) {
                        Vue.swal({text:'메뉴 권한이 수정되었습니다.'})
                        //메뉴 수정 완료
                        //this.$router.push({ name:'mnMenuList' , params: { objectKey : reqData } }) // 라우터 주소를 넣어줘야 히스토리모드 인식
                        //this.$router.push({name:'mnMenu'})
                        this.$router.push('/home/mnMenu');
                    } else {
                        Vue.swal({text:'메뉴 수정에 실패하였습니다.\n다시 시도하세요.'});
                        return;
                    }
                }
                , (error) => {
                }
            ).catch((response) => {
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
                    }
                }
                , (error) => {
                }
            ).catch();

        }

    }
</script>
