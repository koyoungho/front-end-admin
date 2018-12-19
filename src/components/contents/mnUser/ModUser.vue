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
                            <input type="text" class="input form_id" title="ID" v-model="account.id">
                            <button type="button" id="" class="btn_s01 bg04" @click="validateForm()">중복확인</button>
                            <p class="info_msg">사용중인 아이디 입니다.</p>
                        </td>
                        <th scope="row">이메일주소</th>
                        <td>
                            <input type="text" class="input form_w100" title="이메일주소" v-model="account.email">
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">계정등급</th>
                        <td>
                            <select id="" name="" class="select form_w100" title="계정등급" >
                                <option></option>
                            </select>
                        </td>
                        <th scope="row">계정상태</th>
                        <td>
                            <select id="" name="" class="select form_w100" title="계정상태">
                                <option></option>
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
                            <input type="text" class="input form_w100" title="전화번호">
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">주소</th>
                        <td colspan="3">
                            <ul class="address_list">
                                <li class="con01">
                                    <input type="text" class="input form_post" title="우편번호">
                                    <button type="button" id="" class="btn_s01 bg03">우편번호</button>
                                </li>
                                <li class="con02">
                                    <input type="text" class="input form_address01" title="주소">
                                </li>
                                <li class="con03">
                                    <input type="text" class="input form_address02" title="상세 주소">
                                </li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">접속IP 대역</th>
                        <td colspan="3">
                            <input type="text" class="input form_conip" title="접속IP 대역">
                            <span class="period_form">-</span>
                            <input type="text" class="input form_conip" title="접속IP 대역">
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">등록일</th>
                        <td><input type="text" class="input form_w100" title="등록일"></td>
                        <th scope="row">해지일</th>
                        <td><input type="text" class="input form_w100 fc_pt01" value="2018.11.20" title="해지일"></td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <!-- //tbl view box -->
            <!-- btn tbl bot -->
            <div class="btn_tbl_bot">
                <button type="button" id="" class="btn_m01 bg01">비밀번호 초기화</button>
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
                            <input type="text" class="input form_industry" title="사업자등록번호" v-model="account.saupId">
                            <button type="button" id="" class="btn_s01 bg04">중복확인</button>
                            <p class="info_msg">이미 등록된 사업자 번호입니다.</p>
                        </td>
                        <th scope="row">사업장명</th>
                        <td class="vtop"><input type="text" class="input form_w100" title="사업장명" disabled="disabled" v-model="account.shopNm"></td>
                    </tr>
                    <tr>
                        <th scope="row">대표자명</th>
                        <td><input type="text" class="input form_w100" title="대표자명" disabled="disabled"></td>
                        <th scope="row">전화번호</th>
                        <td>
                            <input type="text" class="input form_w100" title="전화번호" disabled="disabled">
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">주소</th>
                        <td colspan="3">
                            <ul class="address_list">
                                <li class="con01">
                                    <input type="text" class="input form_post" title="우편번호" disabled="disabled" v-model="account.zipCode">
                                    <button type="button" id="" class="btn_s01 bg03" @click="addressBoxOn">우편번호</button>
                                </li>
                                <li class="con02">
                                    <input type="text" class="input form_address01" title="주소" disabled="disabled" v-model="account.addr1">
                                </li>
                                <li class="con03">
                                    <input type="text" class="input form_address02" title="상세 주소" disabled="disabled" v-model="account.addr2">
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

            <!-- btn bot -->
            <div class="btn_bot">
                <button type="button" id="" class="btn_b01 bg02">취소</button>
                <button type="button" id="" class="btn_b01 bg01">정보변경</button>
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
    import ListComponent from '../../common/list/list.vue';  // 공용리스트 콤포넌트

    @Component({
        components: {
            ModUser,AddressBox,ListComponent
        }
    })
    export default class ModUser extends Vue {

        account : Account[]=[];
        gajum : Gajum[]=[];

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
                searchClass : 'search_box page_system03'
            }
        created(){
            let id : any = this.$route.params.val

            this.accountInfo();
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
            this.gajumInfo();
        }

        accountInfo(){
            CommonBoardService.getListDatas('accounts',this.$route.params.val,null).then(result=>{
               if(result.status==200){
                   this.account = result.data
               }else{
                   alert('에러')
               }
            })
        }

        gajumInfo(){
            CommonBoardService.getListDatas('accounts',this.$route.params.val+'/gajum',null).then(result=>{
                if(result.status==200){
                    this.gajum = result.data
                }else{
                    alert('에러')
                }
            })
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
            // 우편번호 호출하기f
        }

        setDataAddr1(e){
            console.log(e);
            // 주소값 리턴 받기
        }
        checkBoxEvent(){

        }
    }
</script>

<style scoped>

</style>