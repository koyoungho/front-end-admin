<template>
    <section id="container">
      <!--<div id="loading_bar" v-show="loading222">-->
        <!--<vue-simple-spinner size="medium" line-fg-color="#D0021B" message="처리중입니다 잠시만기다려주세요!" />-->
      <!--</div>-->
        <div class="content no_print">
            <!--<resize-observer @notify="handleResize"/>-->
            <h3>{{subtitle}}</h3>
            <h4>현금영수증 상세 내역</h4>   <!-- 20181112 수정 -->

            <!-- tbl view01 -->
            <table class="tbl_view03">
                <caption>사업장 기본 정보</caption>
                <colgroup>
                    <col class="col_mob" width="18%">
                    <col class="col_mob" width="32%">
                    <col class="col_mob" width="18%">
                    <col class="col_mob" width="32%">
                </colgroup>
                <tbody>
                <tr>
                    <th scope="row">사업자등록번호</th>
                    <td class="con_row01">
                        <strong class="data_number">{{String(viewRowItem.saupId).substring(0,3)}}-{{String(viewRowItem.saupId).substring(3,5)}}-{{String(viewRowItem.saupId).substring(5,10)}}</strong>
                        [회사코드 : {{viewRowItem.saupId}} ]
                    </td>
                    <th scope="row">거래일자</th>
                    <td class="con_row01"><strong>{{moment(viewRowItem.saleDate,'YYYYMMDDHHmmss').format("YYYY.MM.DD HH:mm:ss")}}</strong> </td>
                </tr>
                <tr>
                    <th scope="row">발급용도<em class="form_req">*</em></th>
                    <td class="con_row01">{{viewRowItem.geoguNm}}</td>
                    <th scope="row" class="sub_form01">고객신분확인<em class="form_req">*</em></th>
                    <td class="con_row01 info_msg2_th3">{{viewRowItem.comfirm}}</td>
                </tr>
                <tr>
                    <th scope="row">승인번호<em class="form_req">*</em></th>
                    <td class="con_row01">{{viewRowItem.perm}}</td>
                    <th scope="row" class="sub_form01">지출구분<em class="form_req">*</em></th>
                    <td class="con_row01 info_msg2_th3">{{viewRowItem.cultGbNm}}</td>

                    <!--<th scope="row" class="con_row02">지출구분<em class="form_req">*</em></th>-->
                    <!--<td colspan="3" class="con_row01">{{viewRowItem.cultGbNm}}</td>-->

                </tr>
                <!--<tr id="companyViewChk">-->
                    <!--<th scope="row" class="com_code codenone">상품구분</th>-->
                    <!--<td colspan="3" class="com_code codenone">-->
                        <!--<select name="" class="select form_w50" title="상품구분 선택" v-model="productGbn">-->
                            <!--<option value="">선택</option>-->
                            <!--<template v-for="datas in productList">-->
                                <!--<option v-bind:value=datas.code>{{datas.name}}</option>-->
                            <!--</template>-->
                        <!--</select>-->
                    <!--</td>-->
                <!--</tr>-->
                <tr>
                    <th scope="row">고객성명</th>
                    <td class="con_row01">{{viewRowItem.cusName}}</td>
                    <th scope="row">메모</th>
                    <td class="con_row01">{{viewRowItem.memo}}</td>
                </tr>
                <tr>
                    <th scope="row">합계</th>
                    <td class="con_row01">{{ Number(viewRowItem.totamt).toLocaleString()}} 원</td>
                    <th scope="row">봉사료</th>
                    <td class="con_row01">{{Number(viewRowItem.bong).toLocaleString()}} 원</td>
                </tr>
                <tr>
                    <th scope="row">공급가액</th>
                    <td class="con_row01">{{Number(viewRowItem.amt).toLocaleString()}} 원</td>
                    <th scope="row">부가세</th>
                    <td class="con_row01">{{Number(viewRowItem.vat).toLocaleString()}} 원</td>
                </tr>
                <tr v-if="onlineYn=='N'">
                    <th scope="row">대표자</th>
                    <td class="con_row01">{{viewRowItem.chipNm}}</td>
                    <th scope="row">상호</th>
                    <td class="con_row01">{{viewRowItem.shopNm}}</td>
                </tr>
                <!--<tr>-->
                <!--<th scope="row">취소사유</th>-->
                <!--<td colspan="3" class="con_row01">{{viewRowItem.canSayuNm}}</td>-->
                <!--</tr>-->
                </tbody>
            </table>
        </div>
        <!-- //tbl view box -->
        <!-- receipt info -->

            <!-- tbl grid wrap -->
            <!--<div class="tbl_grid_wrap no_print" >-->
                <!--&lt;!&ndash; tbl grid01 &ndash;&gt;-->
                <!--<table class="tbl_grid01 no_print">-->
                    <!--<caption>현금영수증</caption>-->
                    <!--<colgroup>-->
                        <!--<col class="col_mob" width="50%">-->
                        <!--<col class="col_mob" width="50%">-->
                    <!--</colgroup>-->
                    <!--<thead>-->
                    <!--<tr>-->
                        <!--<th scope="col" colspan="2" >현금영수증 (고객용)</th>-->
                    <!--</tr>-->
                    <!--</thead>-->
                    <!--<tbody>-->
                    <!--<tr>-->
                        <!--<td class="left">-->
                            <!--&lt;!&ndash; tbl view02 &ndash;&gt;-->
                            <!--<table class="tbl_view02">-->
                                <!--<caption>현금영수증</caption>-->
                                <!--<colgroup>-->
                                    <!--<col class="col_mob" width="100%">-->
                                <!--</colgroup>-->
                                <!--<tbody>-->
                                <!--<tr>-->
                                    <!--<th scope="row">신분확인번호</th>-->
                                <!--</tr>-->
                                <!--<tr>-->
                                    <!--<td>{{viewRowItem.comfirm}}</td>-->
                                <!--</tr>-->
                                <!--<tr>-->
                                    <!--<th scope="row">거래구분</th>-->
                                <!--</tr>-->
                                <!--<tr>-->
                                    <!--<td>{{viewRowItem.geoguNm}}</td>-->
                                <!--</tr>-->
                                <!--<tr>-->
                                    <!--<th scope="row">승인번호</th>-->
                                <!--</tr>-->
                                <!--<tr>-->
                                    <!--<td>{{viewRowItem.perm}}</td>-->
                                <!--</tr>-->
                                <!--<tr>-->
                                    <!--<th scope="row">사업장명</th>-->
                                <!--</tr>-->
                                <!--<tr>-->
                                    <!--<td>{{viewRowItem.shopNm}}</td>-->
                                <!--</tr>-->
                                <!--<tr>-->
                                    <!--<th scope="row">대표자명</th>-->
                                <!--</tr>-->
                                <!--<tr>-->
                                    <!--<td>{{viewRowItem.chipNm}}</td>-->
                                <!--</tr>-->
                                <!--</tbody>-->
                            <!--</table>-->
                        <!--</td>-->
                        <!--<td class="right">-->
                            <!--<table class="tbl_view02">-->
                                <!--<caption>현금영수증</caption>-->
                                <!--<colgroup>-->
                                    <!--<col class="col_mob" width="35%">-->
                                    <!--<col class="col_mob" width="65%">-->
                                <!--</colgroup>-->
                                <!--<tbody>-->
                                <!--<tr>-->
                                    <!--<th scope="row" colspan="2">거래일시</th>-->
                                <!--</tr>-->
                                <!--<tr>-->
                                    <!--<td colspan="2">{{moment(viewRowItem.saleDate,'YYYYMMDDHHmmss').format("YYYY.MM.DD HH:mm:ss")}}</td>-->
                                <!--</tr>-->
                                <!--<tr>-->
                                    <!--<th scope="row" class="bg01">공급가액</th>-->
                                    <!--<td class="right">{{ Number(viewRowItem.amt).toLocaleString()}}</td>-->
                                <!--</tr>-->
                                <!--<tr>-->
                                    <!--<th scope="row" class="bg01">부가세</th>-->
                                    <!--<td class="right">{{ Number(viewRowItem.vat).toLocaleString()}}</td>-->
                                <!--</tr>-->
                                <!--<tr>-->
                                    <!--<th scope="row" class="bg01">봉사료</th>-->
                                    <!--<td class="right">{{ Number(viewRowItem.bong).toLocaleString()}}</td>-->
                                <!--</tr>-->
                                <!--<tr>-->
                                    <!--<th scope="row" class="bg01">합계</th>-->
                                    <!--<td class="right">{{ Number(viewRowItem.totamt).toLocaleString()}}</td>-->
                                <!--</tr>-->
                                <!--<tr>-->
                                    <!--<th scope="row" colspan="2">사업자등록번호</th>-->
                                <!--</tr>-->
                                <!--<tr>-->
                                    <!--<td colspan="2">{{String(viewRowItem.saupId).substring(0,3)}}-{{String(viewRowItem.saupId).substring(3,5)}}-{{String(viewRowItem.saupId).substring(5,10)}}</td>-->

                                <!--</tr>-->
                                <!--<tr>-->
                                    <!--<th scope="row" colspan="2">사업장전화번호</th>-->
                                <!--</tr>-->
                                <!--<tr>-->
                                    <!--<td colspan="2">{{viewRowItem.telNum}}</td>-->
                                <!--</tr>-->
                                <!--</tbody>-->
                            <!--</table>-->
                        <!--</td>-->
                    <!--</tr>-->
                    <!--<tr>-->
                        <!--<th scope="col" colspan="2">사업장 주소</th>-->
                    <!--</tr>-->
                    <!--<tr>-->
                        <!--<td colspan="2" class="con01">{{viewRowItem.addr1}} {{viewRowItem.addr2}}</td>-->
                    <!--</tr>-->
                    <!--<tr>-->
                        <!--<td colspan="2" class="con01">-->
                            <!--<span class="text01">현금영수증 문의 ☎ 126-1-1 </span>-->
                            <!--<span class="text01">국세청 홈택스 : <a href="http://www.hometax.go.kr" target="_blank" title="새창열기" class="link02">www.hometax.go.kr</a></span>-->
                        <!--</td>-->
                    <!--</tr>-->
                    <!--</tbody>-->
                <!--</table>-->
                <!--&lt;!&ndash; //tbl grid01 &ndash;&gt;-->
                <!--&lt;!&ndash; receipt info &ndash;&gt;-->
                <!--<div class="receipt_info">-->
                    <!--<ul class="receipt">-->
                        <!--<li><span class="sub">지출구분 : </span> {{viewRowItem.cultGbNm}}</li>-->
                        <!--<li><span class="sub">메모 : </span> {{viewRowItem.memo}}</li>-->
                    <!--</ul>-->
                <!--</div>-->
            <!--</div>-->
            <!--<div class="btn_bot type02"> &lt;!&ndash; 20181112 수정 &ndash;&gt;</div>-->
        <!--</div>-->
        <div class="no_print" v-if="onlineYn=='Y'">
            <!-- btn top -->
            <h4>현금영수증 발급 취소</h4>
            <!-- grid box -->
            <div class="btn_top type03">  <!-- 20181112 type03 추가 -->
                <template v-if="!bongsaBlock"><button type="button"  class="btn_m01 bg04" v-on:click="aceptTotalCount">취소 가능한 전체금액 불러오기</button></template>
                <template v-else><span>* 봉사료가 입력된 승인 거래는 취소 시 부분 취소가 불가능 합니다.</span> </template>
            </div>
            <div class="grid_box col02">
                <!-- col -->
                <div class="col">
                    <!-- tbl list box -->
                    <div class="tbl_list_box">
                        <!-- tbl list03 -->
                        <table class="tbl_list03">
                            <caption>기본 정보</caption>
                            <colgroup>
                                <col class="col_mob" width="50%">
                                <col class="col_mob" width="50%">
                            </colgroup>
                            <thead>
                            <tr>
                                <th scope="col"> <font COLOR="red"> 취소가능금액 </font></th>
                                <th scope="col">봉사료</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td class="center">
                                    <template v-if="bongsaBlock">
                                            <!--<input type="text" v-model="canAceptTotal" class="input form_price" title="거래금액 입력" disabled>-->
                                        <money v-model="canAceptTotal" v-bind="money" class="input form_price" maxlength="11" title="취소가능금액 입력" disabled></money>
                                    </template>
                                    <template v-else>
                                            <!--<input type="text" v-model="canAceptTotal" class="input form_price" title="거래금액 입력">-->
                                        <money v-model="canAceptTotal" v-bind="money" class="input form_price" maxlength="11" title="취소가능금액 입력"></money>
                                    </template>
                                    <em class="text_price">원</em>
                                </td>
                                <td class="center">
                                    <!--<input type="text" v-model="canBong" class="input form_price" title="봉사료 입력" disabled>-->
                                    <money v-model="canBong" v-bind="money" class="input form_price" maxlength="11" title="봉사료 입력" disabled></money>
                                    <em class="text_price">원</em>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="tbl_info_bot">
                        <span class="chk_box">
                            <input type="checkbox" id="aa01" v-model="ghase"  disabled><label for="aa01">면세 및 간이과세자</label>
                        </span>
                    </div>
                    <!-- //tbl list box -->
                </div>



                <!-- col -->
                <div class="col" >
                    <!-- tbl list box -->
                    <div class="tbl_list_box">
                        <!-- tbl list03 -->
                        <table class="tbl_list03">
                            <caption>기본 정보</caption>
                            <colgroup>
                                <col class="col_mob" width="50%">
                                <col class="col_mob" width="50%">
                            </colgroup>
                            <thead>
                            <tr>
                                <th scope="col">공급가액</th>
                                <th scope="col">부가세</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td class="center">
                                    <!--<input type="text" v-model="canTotal" class="input form_price"  title="공급가액 입력" readonly>-->
                                    <money v-model="canTotal" v-bind="money" class="input form_price" maxlength="11" title="공급가액 입력" readonly></money>
                                    <em class="text_price">원</em>
                                </td>
                                <td class="center">
                                    <!--<input type="text" v-model="canVat" class="input form_price"  title="봉사료 입력" readonly>-->
                                    <money v-model="canVat" v-bind="money" class="input form_price" maxlength="11" title="부가세 입력" readonly></money>
                                    <em class="text_price">원</em>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <!-- //tbl list box -->
                    <!-- tbl info bot -->
                </div>
            </div>

            <!-- tbl list box -->
            <div class="tbl_list_box tbl_blank01">
                <!-- tbl view01 -->
                <table class="tbl_list03">
                    <caption>현금영수증 발급 취소</caption>
                    <colgroup>
                        <col class="col_mob" width="20%">
                        <col class="col_mob" width="80%">
                    </colgroup>
                    <tbody>
                    <tr>
                        <th scope="row" style="text-align: center">취소 사유 </th>
                        <td class="left" style="padding-left: 20px;">
                            <span class="rdo_box"><input type="radio" name="chk"  v-model="canSayu" value="1" id="aa11" ><label for="aa11">거래취소</label></span>
                            <span class="rdo_box"><input type="radio" name="chk"  v-model="canSayu" value="2" id="aa12" ><label for="aa12">오류발급</label></span>
                            <span class="rdo_box"><input type="radio" name="chk"  v-model="canSayu" value="3" id="aa13" ><label for="aa13">기타</label></span>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <!-- //tbl list box -->

            <!-- btn bot -->
            <div class="btn_bot type01" v-if="onlineYn == 'Y' ">
                <template v-if="cancleReceipActionBtn">
                    <button type="button" id="" class="btn_b01 bg01" v-on:click="cancleReceipAction" v-show="regShow">발급취소</button>
                </template>
                <template v-if="maxDateOut">
                    <span><font color="red">"* 취소 가능 금액이 0원이거나 3개월이 초과된 영수증은 취소가 불가능합니다"</font></span>
                </template>
            </div>
            <h4>관련 발급 내역 및 출력</h4>

            <template>
                <div id="loading_bar" v-show="detail_loading">
                    <vue-simple-spinner size="medium" line-fg-color="#D0021B" message="처리중입니다 잠시만기다려주세요" />
                </div>
            </template>

            <div style="text-align:right">
                <button type="button" id="" class="btn_m01 bg05" v-on:click="downExel"><i data-v-a75fdae8="" class="icon download01"></i>엑셀 다운로드</button>
            </div>
            <!-- tbl list box -->
            <ListComponent v-bind:listObject="listItem" v-bind:onLoadList="onLoadListView"  v-on:listView="iocViewEvent"></ListComponent>
            <!-- //tbl list box -->

            <!-- tbl info bot --> <!-- 20181112 수정 -->
            <p class="tbl_info_bot type01 text_type02">승인거래와 취소거래는 각각 별도의 승인번호로 발급됩니다.</p>

        </div>

        <div v-show="popOn">
            <ReceipConfirm v-bind:resultRecripKey="resultRecrip" v-on:close="popOn=false"></ReceipConfirm>
        </div>
    </section>

</template>


<script lang="ts">
    import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
    import {CommonBoardService} from '../../../api/common.service';
    import ListComponent from '../../common/list/list.vue';  // 공용리스트 콤포넌트
    import ReceipConfirm from '../../contents/issuanceOfCashReceipt/receipConfrim.vue';
    import  moment from 'moment'
    import axios from 'axios'
    import {environment} from '@/utill/environment';
    import VueSimpleSpinner from 'vue-simple-spinner/src/components/Spinner.vue';

    @Component({
        components: {
            ListComponent,ReceipConfirm,VueSimpleSpinner
        }
    })
    export default class ReceiptViewCancelDetl extends Vue {
        viewRowItem : {} = {};
        titles: string = '발급조회 및 취소'; // 제목
        subtitle: string = '현금영수증 발급조회 및 취소'; // 제목
        objectKey : any = "";

        readonly : boolean = false  // 리드온리옵션
        ghase : string = ""; //과세체크유무
        popOn : boolean = false; //영수증 발급
        receiptOk : boolean = false; // 전체금액확인
        resultRecrip : any = ""; // 승인번호
        // resultRecripDate: any ="";//거래일자

        canSayu : string = '1';
        canTotal : number = 0;
        canBong: number =0;
        canBongOrigin : number =0;
        canAceptTotal : number =0;
        canAceptTotalOrigin : number =0;
        canVat : number =0;

        windowResize : boolean = false; // 리사이즈
        originItem : any = {} // 오리지널데이터
        exceptColum : any = "";
        listItem : any = "";
        onlineYn : string ="";
        onLoadListView : any = false;
        regShow: boolean =false;
        bongsaBlock :boolean= false;
        cancleReceipActionBtn : boolean = true;

        loading222 : boolean = false

        detail_loading: boolean = false; //엑셀다운로드 로딩바

        maxDateOut : boolean = false;//추가함

        money : any = {
            decimal: '.',
            thousands: ',',
            //prefix: 'R$ ',
            //suffix: ' #',
            precision: 0,
            masked: false
        }

        created(){

            // 메뉴별 권한 확인
            let menuList = JSON.parse(sessionStorage.authMenu);
            let programId = 'cashReceiptIssue'; //메뉴ID
            for (let i = 0; i < menuList.length; i++) {
                for (let j = 0; j < menuList[i].subMenuDtos.length; j++) {

                    //권한(조회-readYn/ 등록-createYn/ 수정-updateYn/ 삭제-deleteYn)
                    if (menuList[i].subMenuDtos[j].progId == programId && menuList[i].subMenuDtos[j].createYn == 'Y') {
                        this.regShow = true;
                    }
                }
            }

            this.onlineYn= this.$route.params.onlineYn;

            if(this.onlineYn=='N'){
            this.onlyDetail();
            }else{
            this.cancleReceipView();
            // this.exceptColum  = [{name : '거래일자' , id : 'saleDate'}] // 리사이즈 됬을경우 숨겨져야할 컬럼
            this.listItem =  // 그리드 서치 페이징 옵션 처리 데\이터 매우중요 이룰을 어기면 화면깨짐이 발생합니다
                {
                    dataGrid: {
                        columControl:[  // 반드시 받는 컬럼명과 이 ID 가 같아야데이터가 나옵니다..
                            {columName : '거래일자' ,id : 'regiDate', width : '8%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' , type:'date', dateFormat:'YYYY.MM.DD'},
                            {columName : '승인번호' ,id : 'perm', width : '8%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' , colColors : 'color: #008aff', type:'text', },
                            {columName : '거래금액' ,id : 'totalAmt', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '', type:'money',},
                            {columName : '봉사료' ,id : 'bong', width : '8%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '', type:'money',},
                            {columName : '공급가액' ,id : 'amt', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '', type:'money',},
                            {columName : '부가세' ,id : 'vat', width : '8%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '', type:'money',},
                            // {columName : '발급용도' ,id : 'geoguNm', width : '9%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '', type:'text',},
                            {columName : '거래구분' ,id : 'trgu', width : '7%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' ,  lineValue: '승인', type:'text', options:[{value:'0' , change:'승인' },{value:'1' , change:'취소' }] },
                            // {columName : '지출구분' ,id : 'cultGbNm', width : '7%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '', type:'text',},
                            //{columName : '신분확인' ,id : 'comfirm', width : '13%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '', type:'text',},
                            {columName : '취소사유' ,id : 'canSayuNm', width : '8%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '', type:'text',},
                            {columName : '회사코드' ,id : 'subSaupNm', width : '8%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '', type:'text',},
                            {columName : '처리내용' ,id : 'taxSend', width : '8%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '', type:'text' , textValue: '오류', fontColors :'color: red' ,options:[{value:'전송전' ,change:'처리예정'},{value:'전송' ,change:'처리완료'},{value:'오류' ,change:'오류'}]},
                            {columName : '' ,id : 'errorMsg', width : '11%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '',type : 'hiddens'},
                            // {columName : '고객명' ,id : 'custNm', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '', type:'text',},
                            // {columName : '메모' ,id : 'memo', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '', type:'text',},
                        ],
                        totalColum: 10,
                        apiUrl : 'receipt/'+ this.objectKey.oriDate+'/'+ this.objectKey.oriAprv+ '/cancels?onlineYn='+this.$route.params.onlineYn ,
                        onLoadList : true,  // onLoad 로딩 유무
                        mTotal : false , // 합계금액 란 활성화시 리슐트금액넣기
                        mTotalControl : [{totalTitle : '합계 금액' , id: 'totalCount' , value : '' },{totalTitle : '봉사료' , id: 'serviceCharge' , value : '' },{totalTitle : '공급가액' , id: 'supplyValue' , value : '' },
                            {totalTitle : '부가세' , id: 'surtax' , value : '' }]
                    },
                    // 아이디는 실제 컬럼값을 넣어주면됩니다.
                    search: [
                    ],
                    paging: { currentPage : 1 , lastPage : 0 ,viewPageSize : 10 ,totalRecords : 0 , from : 0 , to : 0 , perPage : 10},
                    goDirect : ""
                }
            }
        }

        @Watch('canAceptTotal') onTotalamtChange(){ //합계 변경시
            let regNumber = /^[0-9]*$/;
            if(!regNumber.test(this.canAceptTotal.toString())){
                Vue.swal({ text: '숫자만가능합니다'});
                this.canAceptTotal = 0;
                return;
            }
            if(Number(this.canAceptTotal) == 0){
            }else{
                this.resetCash()
            }
        }
        @Watch('canBong') onBongChange(){ //봉사료 변경시
            let regNumber = /^[0-9]*$/;
            if(!regNumber.test(this.canBong.toString())){
                Vue.swal({ text: '숫자만가능합니다'});
                this.canBong = 0;
                return;
            }
            if(Number(this.canBong) == 0){
            }else{
                this.resetCash()
            }
        }

        resetCash(){

                // 전체취소일때
                if(this.bongsaBlock){
                    if(this.ghase== "checked") {
                        this.canTotal = Math.round((Number(this.canAceptTotal) - Number(this.canBong))); // 공급가액 : (합계+봉사료) * 1.1
                        this.canVat = 0;
                    }
                    else{
                        this.canTotal = Math.round((Number(this.canAceptTotal) - Number(this.canBong)) / 1.1); // 공급가액 : (합계+봉사료) * 1.1
                        this.canVat = Math.round(((Number(this.canAceptTotal) - Number(this.canBong))) - this.canTotal); // 부가세 : 공급가액의 10%
                    }
                    this.receiptOk = true;
                } // 부분취소일때
                else{

                    if(this.receiptOk ==false){
                        Vue.swal({text: '취소 가능한 전체금액을 확인해주세요'});
                        return ;
                    }else{

                    if(this.ghase== "checked") {
                        if(Number(this.canAceptTotalOrigin) < Number(this.canAceptTotal)) {
                            this.canAceptTotal = 0;
                            this.canBong = 0;
                            Vue.swal({text: '취소 가능한 금액을 초과하였습니다'})
                            return;
                        }else if(Number(this.canBongOrigin) < Number(this.canBong)){
                            Vue.swal({text: '면세 및 간이과세자 입니다'})
                            this.canBong = 0;
                            return;
                        }else if(Number(this.canAceptTotalOrigin) < (Number(this.canAceptTotal) - Number(this.canBong))){
                            Vue.swal({text: '취소 가능금액과 봉사료가 원거래취소가능한금액을 초과하였습니다'})
                            return;
                        }else{
                        this.canTotal = Math.round((Number(this.canAceptTotal) - Number(this.canBong))); // 공급가액 : (합계+봉사료) * 1.1
                        this.canVat = 0;
                        }
                    }else {
                        if(Number(this.canAceptTotalOrigin) < Number(this.canAceptTotal)) {
                            this.canAceptTotal = 0;
                            this.canBong = 0;
                            Vue.swal({text: '취소 가능한 금액을 초과하였습니다'})
                            return;
                        }else if(Number(this.canBongOrigin) < Number(this.canBong)){
                            console.log(this.canBongOrigin + "<" + this.canBong + '봉사료')
                            Vue.swal({text:'기존봉사료를 초과할수 없습니다'})
                            this.canBong = 0;
                            return;
                        }else if(Number(this.canAceptTotalOrigin) < (Number(this.canAceptTotal) - Number(this.canBong))){
                            console.log(this.canAceptTotalOrigin +"<"+ this.canAceptTotal + '+' +this.canBong + '합계금액안맞음' )
                            Vue.swal({text: '취소 가능금액과 봉사료가 원거래취소가능한금액을 초과하였습니다'})
                            return;
                        }else {
                            this.canTotal = Math.round((Number(this.canAceptTotal) - Number(this.canBong)) / 1.1); // 공급가액 : (합계+봉사료) * 1.1
                            this.canVat = Math.round(((Number(this.canAceptTotal) - Number(this.canBong))) - this.canTotal); // 부가세 : 공급가액의 10%
                        }
                    }
                    this.receiptOk = true;
                    }
                }
        }

        mounted(){
        }


        onlyDetail(){
            this.objectKey = this.$route.params.objectKey
            CommonBoardService.getListDatas('receipt', this.objectKey.oriDate+'/'+ this.objectKey.oriAprv,'').then((response) => {
                if(response.status==200){
                this.viewRowItem = response.data
                }
            }).catch();
        }

        iocViewEvent(data){
            this.resultRecrip = data.row;
            this.popOn = true;
            // this.$modal.show(ReceipConfirm)
        }

        aceptTotalCount(){
            this.loading222 = true;

            //추가함
            if(this.maxDateOut){
            }
            else{


            CommonBoardService.getListDatas('receipt',this.objectKey.oriDate+'/'+this.objectKey.oriAprv+'/remain','').then((response) => {
                this.canAceptTotalOrigin  = response.data.remainTotal
                this.canAceptTotal  = response.data.remainTotal
                this.canBong = response.data.remainBong;
                this.canBongOrigin=response.data.remainBong;

                if(response.data.remainBong >= 1){
                    this.bongsaBlock = true
                    this.canAceptTotal = response.data.remainTotal
                    this.canBong = response.data.remainBong
                }else if(this.canAceptTotal <= 0 ){
                    this.bongsaBlock = true
                    this.canBong  =0;
                    this.canAceptTotal =0;
                    this.canTotal = 0;
                    this.canVat =0;
                }else{
                    this.bongsaBlock = false
                }
                let tot :number = this.canAceptTotal
                Vue.swal({ text: '취소 가능한 금액은 ' + Number(tot).toLocaleString() + ' 원 입니다' });
                this.receiptOk = true;
            }).catch();


            }
            this.loading222 = false;
        }

        cancleReceipView(){

            this.objectKey = this.$route.params.objectKey

            let keyVal = '';
            if(this.objectKey.trgu=='0'){
                this.objectKey.oriAprv = this.objectKey.perm
            }
            if(!this.objectKey){
                Vue.swal({text:'접근할수 없습니다'})
                this.$router.push({name:'receiptViewCancel'});
            }else{
                CommonBoardService.getListDatas('receipt', this.objectKey.oriDate+'/'+ this.objectKey.oriAprv,'').then((response) => {
                    this.viewRowItem = response.data
                        // 과세확인
                        if(response.data.vat >= 1){
                            this.ghase = "";
                        }else{
                            this.ghase = "checked";
                        }

                    //추가함
                    let  nowUTC =  moment().utc() ; //UTC시간
                    let  nowKo= nowUTC.add(9, 'hours')// 한국시간
                    let  beforeOneDKo=  moment(nowKo).subtract(3, 'month') // 3개월전
                    let  maxDate = moment(beforeOneDKo).format('YYYYMMDDHHMMSS')

                    if( response.data.saleDate <= maxDate){ //3개월이 초과되면
                        this.cancleReceipActionBtn = false;   // 버튼을막는다
                        this.maxDateOut = true;
                        this.onLoadListView = true;
                    }else{
                        this.aceptTotalCount()
                        this.onLoadListView = true;
                    }
                }).catch();
            }
            this.onLoadListView = false
        }

        cancleReceipAction(){


            let data :any= {
                canSayu: this.canSayu,
                cancelAmt: this.canTotal,
                cancelBong: this.canBong,
                cancelTotalAmt: this.canAceptTotal,
                cancelVat: this.canVat
            };

            if( this.canAceptTotal < 1 ){
                Vue.swal({text:'취소 금액이 존재하지않습니다'})
            }
            else if( this.canAceptTotal.toString().length > 1 && this.canAceptTotal.toString().indexOf('0') == 0){
                alert('취소금액을 확인하세요.')
            }
            else if(this.canTotal < 1){
                Vue.swal({text:'공급가액이 존재하지않습니다'})
            }else if(this.receiptOk ==false){
                Vue.swal({text:'취소 가능한 전체금액을 확인해주세요'})
            }
            else{
                // saleDate}/{perm}/cancel
                // this.cancleReceipActionBtn = false;
                CommonBoardService.updateListData('receipt', this.objectKey.oriDate+'/'+this.objectKey.perm+'/cancel'  ,data).then((response) => {
                    this.openReceiptPop(response.data);
                }).catch();
            }
        }

        openReceiptPop(response){
            this.cancleReceipActionBtn = true;
            this.receiptOk = false;
            this.cancleReceipView();
        }

        // 와이드 창줄어들시 모바일용으로 윈도우 사이즈 재는곳
        handleResize(){
            if(window.innerWidth < 482){
                if(this.windowResize ==true){

                }else{
                    this.listItem.dataGrid.columControl= this.listItem.dataGrid.columControl.filter(e=>{
                        return this.exceptColum.find(s=>{
                            if(e.id !=s.id){
                                return e
                            }
                        })
                    })
                    this.windowResize =true
                }
            }else{
                if(this.windowResize==false){
                }else{
                    this.listItem.dataGrid.columControl = this.originItem;
                    this.windowResize =false;
                }
            }

        }

        downExel(){
            let  nowUTC =  moment().utc() ; //UTC시간
            let  nowKo= nowUTC.add(9, 'hours')// 한국시간
            let nowKo_str =  this.formatDates(nowKo);

            let fileOrigin = "cash_history_detail_"+nowKo_str+".xlsx"

            this.detail_loading = true;

            axios({
                // url: environment.apiUrl + "/receipts/excel",
                url: environment.apiUrl + "/receipt/"+this.objectKey.oriDate+"/"+this.objectKey.oriAprv+"/cancels/excel?onlineYn=Y",
                method: 'GET',
                responseType : 'blob', // important
                headers : { "x-auth-token" : sessionStorage.accessToken }
            }).then((response) => {
                // It is necessary to create a new blob object with mime-type explicitly set
                // otherwise only Chrome works like it should
                var newBlob = new Blob([response.data], {type: 'application/vnd.ms-excel'})

                // IE doesn't allow using a blob object directly as link href
                // instead it is necessary to use msSaveOrOpenBlob
                if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                    window.navigator.msSaveOrOpenBlob(newBlob, fileOrigin)
                    return
                }

                // For other browsers:
                // Create a link pointing to the ObjectURL containing the blob.
                const data = window.URL.createObjectURL(newBlob)
                var link = document.createElement('a')

                link.href = data
                link.download = fileOrigin

                link.click()
                setTimeout(function () {
                    // For Firefox it is necessary to delay revoking the ObjectURL
                    window.URL.revokeObjectURL(data)
                }, 100)

                this.detail_loading = false;
            })
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

        formatDates(date) {
            return moment(date, 'YYYYMMDDHHmmss').format('YYYYMMDD')
        }

    }




</script>