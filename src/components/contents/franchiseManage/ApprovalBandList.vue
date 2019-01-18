<template>

    <!-- container -->
    <section id="container">
        <!-- content  -->
        <div class="content">
            <h2 class="blind">가맹점 관리</h2>

            <h3>승인 대역 관리</h3>

            <!-- btn top -->
            <div class="btn_top" v-if="regbtnShow">
                <button type="button" id="" class="btn_m01 bg02" v-on:click="bandSet">승인대역 범위 설정</button>
                <button type="button" id="" class="btn_m01 bg02" v-on:click="newReg">승인대역신청 및 등록</button>
            </div>

            <ListComponent v-bind:listObject="listItem" v-bind:onLoadList="listItem.dataGrid.onLoadList" v-on:listView="listViewEvent"></ListComponent>

        </div>
        <!-- //content -->
    </section>
    <!-- //container -->

</template>

<script lang="ts">
    import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
    import ListComponent from '../../common/list/list.vue';  // 공용리스트 콤포넌트
    import {format} from 'date-fns';

    import  moment from 'moment'

    @Component({
        components: {
            ApprovalBandList, ListComponent
        },
    })
    export default class ApprovalBandList extends Vue {
        message: any = '';

        // 리스트 변수
        listOn: boolean = true;
        titles: string = '가맹점 관리'; // 제목
        subTitle: string = '지점 관리'; //서브타이틀
        windowResize: boolean = false; // 리사이즈
        originItem: any = {} // 오리지널데이터
        exceptColum: any = [] // 리사이즈 됬을경우 숨겨져야할 컬럼
        regbtnShow: boolean = false; //신규등록 버튼 보여주는지 여부
        listItem: any = {} // 그리드 서치 페이징 옵션 처리 데이터 매우중요 이룰을 어기면 화면깨짐이 발생합니다


        //돔생성전 호출자
        created() {

            const  nowUTC =  moment().utc() ; //UTC시간
            const  nowKo= nowUTC.add(9, 'hours')// 한국시간
            const  beforeOneDKo=  moment(nowKo).subtract(1, 'days') // 하루전

            if(sessionStorage.role != '0001'){
                alert('시스템관리자만 사용가능합니다.');
                this.$router.push('/home/main')
            }

            //메뉴별 권한 확인
            let menuList = JSON.parse(sessionStorage.authMenu);
            console.log(menuList)
            let programId = 'approvalBandList'; //메뉴ID
            for(let i=0; i<menuList.length; i++){
                for(let j=0; j<menuList[i].subMenuDtos.length; j++){

                    //권한(조회-readYn/ 등록-createYn/ 수정-updateYn/ 삭제-deleteYn)
                    if(menuList[i].subMenuDtos[j].progId == programId && menuList[i].subMenuDtos[j].createYn == 'Y') {
                        this.regbtnShow = true;
                    }
                }
            }
            console.log('승인대역 등록 권한 확인 ?? :: ' + this.regbtnShow)


            this.listItem={
                dataGrid: {
                    columControl: [  // 반드시 받는 컬럼명과 이 ID 가 같아야데이터가 나옵니다..
                        {columName: '순번',id: 'rnum',type: 'number',width: '7%',height: '',size: '',mobile: 'N',cols: '',rows: '',rowColors: ''},
                        {columName: '사업장명',id: 'shopNm',type: 'text',width: '10%',height: '',size: '',mobile: 'N',cols: '',rows: '',colColors: 'color: #008aff'},
                        {columName: '사업자등록번호',id: 'saupId',type: 'text',width: '12%',height: '',size: '',mobile: 'N',cols: '',rows: ''},
                        {columName: '회사코드',id: 'subSaup',type: 'text',width: '8%',height: '',size: '',mobile: 'N',cols: '',rows: ''},
                        {columName: '승인코드',id: 'lpermid',type: 'text',width: '7%',height: '',size: '',mobile: 'N',cols: '',rows: ''},
                        {columName: '승인대역(시작)',id: 'lpermfrom',type: 'text',width: '12%',height: '',size: '',mobile: 'N',cols: '',rows: ''},
                        {columName: '승인대역(끝)',id: 'lpermto',type: 'text',width: '12%',height: '',size: '',mobile: 'N',cols: '',rows: ''},
                        {columName: '건수',id: 'count',type: 'text',width: '8%',height: '',size: '',mobile: 'N',cols: '',rows: ''},
                        {columName: '등록일',id: 'regDt',type: 'text',width: '8%',height: '',size: '',mobile: 'N',cols: '',rows: ''},
                        {columName: '상태',id: 'aprvYnNm',type: 'text',width: '6%',height: '',size: '',mobile: 'N',cols: '',rows: ''},
                    ],
                        totalColum: 10,
                        apiUrl: 'approvalband',
                        onLoadList: true,  // onLoad 로딩 유무
                    //mTotal : false , // 합계금액 란 활성화여부  합계가 존재하는 페이지도 있음
                    //mTotalControl : [{totalTitle : '합계 금액' , id: 'totalCount' , value : '' },{totalTitle : '봉사료' , id: 'serviceCharge' , value : '' },{totalTitle : '공급가액' , id: 'supplyValue' , value : '' },
                    //    {totalTitle : '부가세' , id: 'surtax' , value : '' }]
                },
                // 아이디는 실제 컬럼값을 넣어주면됩니다.
                search: [
                    {type: 'selectObject' ,class:'w33',title: '회사코드',id: 'subSaup',name: 'subSaup',value: '',api: 'company',option: [{name: '', value: ''}]},
                    {type: 'selectCode',class:'w33',title: '승인코드',id: 'lpermid',name: 'lpermid',value: '',api: 'code/aprvcode',option: [{name: '', value: ''}]},
                    {type: 'selectCode',class:'w33 text_left',title: '상태',id: 'aprvYn',name: 'aprvYn',value: '',api: '',option: [{codeNm: '승인대기', code: 'N'}, {codeNm: '등록',code: 'Y'}]},
                    {type: 'date2',class:'w33', title :'등록일', id: 'date', name:'date', searchStartDate: [beforeOneDKo,nowKo] , calenderCount : 2 , dateType : 'date' , width : 220  , default :'YYYY-MM-DD'},
                    {type: 'select',class:'w33',title: '검색',id: 'searchType',name: 'searchType',value: '',api: '',option: [{name: '사업장명', value: '0'}, {name: '사업자등록번호', value: '1'}]},
                    {type: 'input',class:'w33 text_left', title: '', id: 'searchWord', name: 'searchWord', value: '', api: '', option: ''},
                    // {type: 'check' , title :'체크해', id: 'checkType', name: 'checkType' ,  value: '' , option : [{ name : '선택' , id: 'cho1', value: true },{ name : '선택2' ,id: 'cho2', value: false}] },
                    // {type: 'radio' , title :'선택해', id: 'radioBox', name: 'radioBox' , value: '' , option : [{ name : '선택' , value: '111' },{ name : '선택2' , value: '222' }] },
                ],
                    paging: {currentPage: 1, lastPage: 0, viewPageSize: 10, totalRecords: 0, from: 0, to: 0, perPage: 10},
                goSearch: "iocSearch",
                    searchClass: 'search_box page_new',
                searchClass2: 'search_list'
            }

        }

        //돔렌더링완료시 진행
        mounted() {
        }

        // 뷰페이지 클릭이벤트 받아서 여는곳
        listViewEvent(row) {
            console.log('승인대역 리스트에서 상세 이동')
            console.log(row)
            this.$router.push({name: 'approvalBandDetl', params: {current: row.searchOption, objectKey: row.row}}) // 라우터 주소를 넣어줘야 히스토리모드 인식
        }

        //상세이동
        goDetl() {
            this.$router.push('/home/approvalBandReg')
        }

        //승인대역 범위 설정
        bandSet() {
            this.$router.push('/home/approvalBandScopeList')
        }

        //등록
        newReg() {
            this.$router.push('/home/approvalBandReg')
        }
    }

</script>