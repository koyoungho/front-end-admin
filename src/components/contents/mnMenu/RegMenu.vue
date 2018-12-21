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
                    <caption>메뉴 권한 {{div}}</caption>
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
                        <td><span class="chk_box"><input type="checkbox" id="" v-model="menuAuth.system1" value="N"><label for=""><span class="blind">선택</span></label></span></td>
                        <td><span class="chk_box"><input type="checkbox" id="" v-model="menuAuth.system2" value="N"><label for=""><span class="blind">선택</span></label></span></td>
                        <td><span class="chk_box"><input type="checkbox" id="" v-model="menuAuth.system3" value="N"><label for=""><span class="blind">선택</span></label></span></td>
                        <td><span class="chk_box"><input type="checkbox" id="" v-model="menuAuth.system4" value="N"><label for=""><span class="blind">선택</span></label></span></td>
                    </tr>
                    <tr>
                        <th scope="row">사업자 관리자</th>
                        <td><span class="chk_box"><input type="checkbox" id="" v-model="menuAuth.saupja1"><label for=""><span class="blind">선택</span></label></span></td>
                        <td><span class="chk_box"><input type="checkbox" id="" v-model="menuAuth.saupja2"><label for=""><span class="blind">선택</span></label></span></td>
                        <td><span class="chk_box"><input type="checkbox" id="" v-model="menuAuth.saupja3"><label for=""><span class="blind">선택</span></label></span></td>
                        <td><span class="chk_box"><input type="checkbox" id="" v-model="menuAuth.saupja4"><label for=""><span class="blind">선택</span></label></span></td>
                    </tr>
                    <tr>
                        <th scope="row">콜센터</th>
                        <td><span class="chk_box"><input type="checkbox" id="" v-model="menuAuth.call1"><label for=""><span class="blind">선택</span></label></span></td>
                        <td><span class="chk_box"><input type="checkbox" id="" v-model="menuAuth.call2"><label for=""><span class="blind">선택</span></label></span></td>
                        <td><span class="chk_box"><input type="checkbox" id="" v-model="menuAuth.call3"><label for=""><span class="blind">선택</span></label></span></td>
                        <td><span class="chk_box"><input type="checkbox" id="" v-model="menuAuth.call4"><label for=""><span class="blind">선택</span></label></span></td>
                    </tr>
                    <tr>
                        <th scope="row">가맹점 관리자</th>
                        <td><span class="chk_box"><input type="checkbox" id="" v-model="menuAuth.gajum1"><label for=""><span class="blind">선택</span></label></span></td>
                        <td><span class="chk_box"><input type="checkbox" id="" v-model="menuAuth.gajum2"><label for=""><span class="blind">선택</span></label></span></td>
                        <td><span class="chk_box"><input type="checkbox" id="" v-model="menuAuth.gajum3"><label for=""><span class="blind">선택</span></label></span></td>
                        <td><span class="chk_box"><input type="checkbox" id="" v-model="menuAuth.gajum4"><label for=""><span class="blind">선택</span></label></span></td>
                    </tr>
                    <tr>
                        <th scope="row">지점 관리자</th>
                        <td><span class="chk_box"><input type="checkbox" id="" v-model="menuAuth.jijum1"><label for=""><span class="blind">선택</span></label></span></td>
                        <td><span class="chk_box"><input type="checkbox" id="" v-model="menuAuth.jijum2"><label for=""><span class="blind">선택</span></label></span></td>
                        <td><span class="chk_box"><input type="checkbox" id="" v-model="menuAuth.jijum3"><label for=""><span class="blind">선택</span></label></span></td>
                        <td><span class="chk_box"><input type="checkbox" id="" v-model="menuAuth.jijum4"><label for=""><span class="blind">선택</span></label></span></td>
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
    import ListComponent from '../../common/list/list.vue';  // 공용리스트 콤포넌트
    import {CommonBoardService, CommonListService} from '../../../api/common.service';
    import {MenuAuth} from '../../../model/account/menuAuth';

    @Component({
        components: {
            RegMenu,ListComponent
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

        menuAuth : MenuAuth[]=[]; //메뉴권한

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
                searchClass : 'search_box page_system03'
            }

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


            console.log(this.menuAuth)
            let menuAuth : any = this.menuAuth;

            //console.log(menuAuth);

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

                //this.insertInfo();

            }

        }

        insertInfo(){

            let reqDate : any = {
                groupCode: this.groupCode, //상위메뉴
                name: this.name, //메뉴명
                menuCode: this.menuCode, //메뉴코드
                useYn: this.useYn, //사용여부
                menuPath: this.menuPath, //메뉴경로
                memo: this.groupCode, //메뉴설명
            }

            // api 데이터 호출(가맹점 등록)
            CommonBoardService.postListDatas('menu-manage', null, reqDate).then((response) => {
                    let result: any = response.data;
                    console.log(result);
                    if (result != null) {
                        //메뉴 등록 완료
                        //this.$router.push({ name:'branchRegCmpl' , params: { objectKey : reqData } }) // 라우터 주소를 넣어줘야 히스토리모드 인식
                        //this.$router.push({name:'mnMenu'})
                        this.$router.push('/home/mnMenu');
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
