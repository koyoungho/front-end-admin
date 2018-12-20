<template>
    <!-- container -->
    <section id="container">
        <!-- content  -->
        <div class="content">
            <h2 class="blind">현금영수증관리</h2>

            <h3>오류 내역 조회</h3>
            <!-- search box -->
            <div class="search_box page_cash02">
                <ul class="search_list">
                    <li>
                        <label for="">사업자 구분</label>
                        <select id="" name="" class="select sch_w100" title="사업자 구분">
                            <option>01</option>
                            <option>02</option>
                            <option>03</option>
                            <option>01</option>
                            <option>02</option>
                            <option>03</option>
                        </select>
                    </li>
                    <li>
                        <label for="">회사코드</label>
                        <select id="" name="" class="select sch_w100" title="회사코드">
                            <option>01</option>
                            <option>02</option>
                            <option>03</option>
                            <option>01</option>
                            <option>02</option>
                            <option>03</option>
                        </select>
                    </li>
                    <li>
                        <label for="">사업자등록번호</label>
                        <input type="text" class="input sch_indcode01" value="000-00-00000" title="사업자등록번호">
                        <button type="button" id="" class="btn_sch01">검색</button>
                    </li>
                    <li>
                        <input type="text" class="input sch_indcode02" value="롯데백화점 강남점" title="가맹점명">
                    </li>
                    <li>
                        <span class="rdo_box"><input type="radio" name="chk" value="2" id="aa11" checked="checked"><label for="aa11">거래일</label></span>
                        <span class="rdo_box"><input type="radio" name="chk" value="2" id="aa12"><label for="aa12">등록일</label></span>
                    </li>
                    <li>
                        <span class="form_cal"><span class="form_cal"><input type="text" title="날짜 입력" class="input date"><a href="#" id="datepicker-trigger" class="btn_cal">달력</a></span></span>
                    </li>
                    <li>
                        <label for="">오류코드</label>
                        <select id="" name="" class="select sch_w100" title="오류코드">
                            <option>01</option>
                            <option>02</option>
                            <option>03</option>
                            <option>01</option>
                            <option>02</option>
                            <option>03</option>
                        </select>
                    </li>

                    <li>
                        <label for="">오류내용</label>
                        <input type="text" class="input sch_coninput" title="오류내용">
                    </li>
                    <li>
                        <label for="">오류구분</label>
                        <select id="" name="" class="select sch_w100" title="오류구분">
                            <option>01</option>
                            <option>02</option>
                            <option>03</option>
                            <option>01</option>
                            <option>02</option>
                            <option>03</option>
                        </select>
                    </li>
                </ul>
            </div>
            <!-- //search box -->

            <!-- btn mid -->
            <div class="btn_mid">
                <button type="button" class="btn_m01 bg01" v-on:click="goSearch">조회</button>
                <button type="button" class="btn_m01 bg05" v-on:click="excelDownload"><i class="icon download01"></i> 엑셀 다운로드</button>
            </div>

            <!-- tbl info top -->
            <div class="tbl_info_top">
                <span class="total">총 <strong>20</strong>건</span>
            </div>

            <!-- tbl scroll x box -->
            <div class="tbl_scroll_x_box">
                <!-- tbl list02 -->
                <table class="tbl_list04 page_cash03">
                    <caption>회사코드별 통계</caption>
                    <colgroup>
                        <col width="100px">
                        <col span="15">
                    </colgroup>
                    <thead>
                    <tr>
                        <th scope="col" rowspan="2">NO</th>
                        <th scope="col" colspan="10">오류 수신내역</th>
                        <th scope="col" colspan="5">오류 처리내역</th>
                    </tr>
                    <tr>
                        <th scope="col">오류코드</th>
                        <th scope="col">오류내용</th>
                        <th scope="col">승인번호</th>
                        <th scope="col">거래일자</th>
                        <th scope="col">거래금액</th>
                        <th scope="col">거래일시</th>
                        <th scope="col">오류발생일자</th>
                        <th scope="col">사업자등록번호</th>
                        <th scope="col">회사코드</th>
                        <th scope="col">가맹점</th>
                        <th scope="col">승인번호<br>(<em class="fc_pt01">9Byte</em>)</th>
                        <th scope="col">거래일자<br>(<em class="fc_pt01">8Byte</em>)</th>
                        <th scope="col">처리일자<br>(<em class="fc_pt01">8Byte</em>)</th>
                        <th scope="col">오류발생<br>사유</th>
                        <th scope="col">조치결과</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>1</td>
                        <td>TSG</td>
                        <td>거래금액 오류</td>
                        <td>184683281</td>
                        <td>20170630</td>
                        <td><span class="price">1,000</span></td>
                        <td></td>
                        <td>20170701</td>
                        <td>2018630270</td>
                        <td>109</td>
                        <td>현대백화점</td>
                        <td><input type="text" class="input form_w100" value=""></td>
                        <td><input type="text" class="input form_w100" value=""></td>
                        <td><input type="text" class="input form_w100" value=""></td>
                        <td>
                            <select id="" name="" class="select form_w100">
                                <option></option>
                            </select>
                        </td>
                        <td>
                            <select id="" name="" class="select form_w100">
                                <option></option>
                            </select>
                        </td>
                    </tr>
                    <tr class="date_error">
                        <td>1</td>
                        <td>TSG</td>
                        <td>거래금액 오류</td>
                        <td>184683281</td>
                        <td>20170630</td>
                        <td><span class="price">1,000</span></td>
                        <td></td>
                        <td>20170701</td>
                        <td>2018630270</td>
                        <td>109</td>
                        <td>현대백화점</td>
                        <td><input type="text" class="input form_w100" value=""></td>
                        <td><input type="text" class="input form_w100" value=""></td>
                        <td><input type="text" class="input form_w100" value=""></td>
                        <td>
                            <select id="" name="" class="select form_w100">
                                <option></option>
                            </select>
                        </td>
                        <td>
                            <select id="" name="" class="select form_w100">
                                <option></option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="16" class="no_data">조회된 내용이 없습니다.</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <!-- //tbl scroll box -->

            <!-- pagination -->
            <div class="pagination">
                <a href="#" class="btn_fprev">맨앞</a>
                <a href="#" class="btn_prev">이전</a>
                <span class="num">
					<a href="#">1</a>
					<a href="#">2</a>
					<strong>3</strong>
					<a href="#">4</a>
					<a href="#">5</a>
				</span>
                <a href="#" class="btn_next">다음</a>
                <a href="#" class="btn_enext">맨뒤</a>
            </div>
            <!-- //pagination -->

            <!-- btn bot -->
            <div class="btn_bot type03">
                <button type="button" id="" class="btn_b01 bg02" v-on:click="goCancel">취소</button>
                <button type="button" id="" class="btn_b01 bg03" v-on:click="goPresent">제출</button>
                <button type="button" id="" class="btn_b01 bg01" v-on:click="goInsert">저장</button>
            </div>

        </div>
        <!-- //content -->
        <ListComponent v-bind:listObject="listItem" v-bind:onLoadList="listItem.dataGrid.onLoadList" ></ListComponent>
    </section>
    <!-- //container -->

</template>

<script lang="ts">
    import {format} from 'date-fns';
    import {Component, Vue} from "vue-property-decorator";
    import ListComponent from '../../common/list/list.vue';  // 공용리스트 콤포넌트

    @Component({
        components: {
            ErrorList,ListComponent
        }
    })
    export default class ErrorList extends Vue {
        message: any = '';
        setDate =  format(new Date(),'YYYYMMDD')

        listItem: any =  // 그리드 서치 페이징 옵션 처리 데이터 매우중요 이룰을 어기면 화면깨짐이 발생합니다
            {
                dataGrid: {
                    columHeader : [
                        {headerName : '순번', cols : '' , rows :'2' , level : '1'},
                        {headerName : '오류수신내역', cols : '10' , rows :'' , level : '1'},
                        {headerName : '오류처리내역', cols : '5' , rows :'' , level : '1'},
                    ],
                    columControl:[  // 반드시 받는 컬럼명과 이 ID 가 같아야데이터가 나옵니다..
                        {columName : '순번' ,id : 'num', type:'number', width : '5%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' },
                        {columName : '오류코드' ,id :'1',type:'text', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : ''  , colColors : 'color: #008aff' },
                        {columName : '오류내용' ,id :'2',type:'text', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : ''  ,  lineValue: '승인대기'},
                        {columName : '승인번호' ,id :'3',type:'text', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' },
                        {columName : '거래일자' ,id :'4',type:'text', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' },
                        {columName : '거래금액' ,id :'5',type:'text', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' },
                        {columName : '거래일시' ,id :'6',type:'text', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' },
                        {columName : '오류발생일자' ,id :'7',type:'text', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' },
                        {columName : '사업자등록번호' ,id :'8',type:'text', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' },
                        {columName : '회사코드' ,id :'9',type:'text', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' },
                        {columName : '가맹점' ,id :'10',type:'text', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' },
                        {columName : '승인번호' ,id :'11',type:'text', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' },
                        {columName : '거래일자' ,id :'12',type:'text', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' },
                        {columName : '처리일자' ,id :'13',type:'text', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' },
                        {columName : '오류발생사유' ,id :'14',type:'text', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' },
                        {columName : '조치결과' ,id :'15',type:'text', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' },
                    ],
                    tableClass:'tbl_scroll_x_box',
                    tableClass2:'tbl_list04 page_cash03',
                    totalColum: 15, //
                    apiUrl : 'receipt-error',
                    onLoadList : true,  // onLoad 로딩 유무
                },
                // 아이디는 실제 컬럼값을 넣어주면됩니다.
                search: [
                    {type: 'select' , title :'사업자구분',id: '1', name:'searchType' , value: '' ,  api : '' , option : [{ name : '아이디' , value: 'id' },{name : '이름' , value: 'name' },{name : '사업자등록번호' , value: 'saupId' },{name : '소속회사' , value: 'shopNm' }]},
                    {type: 'select' , title :'회사코드',id: '2', name:'searchType' , value: '' ,  api : '' , option : [{ name : '아이디' , value: 'id' },{name : '이름' , value: 'name' },{name : '사업자등록번호' , value: 'saupId' },{name : '소속회사' , value: 'shopNm' }]},
                    {type: 'popup', title :'매장선택', id: '3', name:'inputType' , value: '',   api : '' , option : [{name:'saup' , value : ''},{name:'code' , value : ''}] },
                    {type: 'radio' , title :'', id: '4', name: 'radioBox' , value: 'lastConnDt' , option : [{ name : '거래일' , value: 'lastConnDt' },{ name : '등록일' , value: 'regDt' }] },
                    {type: 'date', title :'', id: '5' , name:'date', searchStartDate: this.setDate ,  searchEndDate: this.setDate , calenderCount : 1},
                    {type: 'select' , title :'오류코드',id: '6', name:'searchType' , value: '' ,  api : '' , option : [{ name : '아이디' , value: 'id' },{name : '이름' , value: 'name' },{name : '사업자등록번호' , value: 'saupId' },{name : '소속회사' , value: 'shopNm' }]},
                    {type: 'selectCode' , title :'오류코드',id: '7', name:'issuePurpose' , value: '' ,  api : '0034' , option : [{ codeName : '소득공제' , code: '0' },{codeName : '지출증빙' , code: '1' }]},
                    {type: 'input2', title :'오류내용', id: '8', name:'inputType' , value: '',   api : '' , option : '' },
                    // {type: 'check' , title :'체크해', id: 'checkType', name: 'checkType' ,  value: '' , option : [{ name : '선택' , id: 'cho1', value: true },{ name : '선택2' ,id: 'cho2', value: false}] },
                    // {type: 'radio' , title :'선택해', id: 'radioBox', name: 'radioBox' , value: '' , option : [{ name : '선택' , value: '111' },{ name : '선택2' , value: '222' }] },
                ],
                paging: { currentPage : 1 , lastPage : 0 ,viewPageSize : 10 ,totalRecords : 0 , from : 0 , to : 0 , perPage : 10},
                goSearch : "iocSearch",
                searchClass : 'search_box page_cash02',
                searchClass2 : 'search_list'
            }

        //돔생성전 호출자
        created() {
        }

        //돔렌더링완료시 진행
        mounted() {
        }

        //조회
        goSearch(){

        }

        //엑셀 다운로드
        excelDownload(){

        }

        //취소
        goCancel(){

        }

        //제출
        goPresent(){

        }

        //저장
        goInsert(){

        }

    }

</script>