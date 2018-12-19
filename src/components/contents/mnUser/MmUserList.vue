<template>
    <!-- container -->
    <section id="container">
        <!-- content  -->
        <div class="content">
            <h2 class="blind">시스템관리</h2>

            <h3>계정 권한 관리</h3>

            <!-- btn top -->
            <div class="btn_top">
                <button type="button" class="btn_m01 bg02" v-on:click="regUser">계정 등록</button>
            </div>

            <!-- search box -->
            <ListComponent v-bind:listObject="listItem" v-bind:onLoadList="listItem.dataGrid.onLoadList" v-on:listView="listViewEvent" v-on:listCheckEvent="checkBoxEvent"></ListComponent>
        <!-- //content -->
        </div>
    </section>
    <!-- //container -->


</template>

<script lang="ts">

    import {format} from 'date-fns';
    import {Component, Vue} from "vue-property-decorator";
    import PreviewBusinessLicense from "@/components/contents/mnUser/previewBizLicense.vue";
    import ListComponent from '../../common/list/list.vue';  // 공용리스트 콤포넌트

    @Component({
        components: {
            MmUserList, PreviewBusinessLicense,ListComponent
        }
    })
    export default class MmUserList extends Vue {
        showModalBiz: boolean = false; // 사업자 사본확인
        isCheck:boolean = false;
        listOn : boolean = true;
        titles: string = '발급조회 및 취소'; // 제목
        subTitle: string = '현금영수증 발급'; //서브타이틀
        windowResize : boolean = false; // 리사이즈
        setDate =  format(new Date(),'YYYYMMDD')
        originItem : any = {} // 오리지널데이터
        exceptColum : any = [] // 리사이즈 됬을경우 숨겨져야할 컬럼
        listItem: any =  // 그리드 서치 페이징 옵션 처리 데이터 매우중요 이룰을 어기면 화면깨짐이 발생합니다
            {
                dataGrid: {
                    columControl:[  // 반드시 받는 컬럼명과 이 ID 가 같아야데이터가 나옵니다..
                        {columName : '체크박스' ,id :'id',type:'checkBox', width : '5%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' ,checkVal :  false , allCheck:true }, // 올체크 투르 펄스에따라 전체체크박스생성 //checkval 디폴트값주기
                        // {columName : '체크박스' ,id : 'gajumId',type:'checkBox', width : '5%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '',checkVal :  false},
                        {columName : '순번' ,id : 'num', type:'number', width : '5%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' },
                        {columName : '아이디' ,id :'id',type:'text', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' , colColors : 'color: #008aff' },
                        {columName : '이름' ,id : 'name',type:'text', width : '7%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : ''},
                        {columName : '등급' ,id : 'roleNm',type:'text', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : ''},
                        {columName : '소속' ,id : 'shopNm',type:'text', width : '13%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : ''   }, // 라인컬러와 라인벨류는 오직하나만
                        {columName : '상태' ,id : 'accountStatus',type:'text', width : '7%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' ,  lineValue: '승인대기'},
                        {columName : '등록일' ,id : 'regDt',type:'text', width : '8%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' ,formatDate : true},
                        {columName : '최종접속' ,id : 'lastConnDt',type:'text', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' ,formatDate : false},
                        // {columName : '처리결과' ,id : 'taxErr', width : '8%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' , options : [{ value : 'Y' , change : '전송'},{ value : 'N' , change : '미전송'}] ,fontColors :'color: red' },
                    ],
                    totalColum: 9, //
                    apiUrl : 'accounts',
                    onLoadList : true,  // onLoad 로딩 유무
                    // mTotal : true , // 합계금액 란 활성화여부  합계가 존재하는 페이지도 있음
                    // mTotalControl : [{totalTitle : '합계 금액' , id: 'totalCount' , value : '' },{totalTitle : '봉사료' , id: 'serviceCharge' , value : '' },{totalTitle : '공급가액' , id: 'supplyValue' , value : '' },
                    //     {totalTitle : '부가세' , id: 'surtax' , value : '' }]
                },
                // 아이디는 실제 컬럼값을 넣어주면됩니다.
                search: [
                    {type: 'radio' , title :'', id: 'searchDateType', name: 'radioBox' , value: 'lastConnDt' , option : [{ name : '최종접속일' , value: 'lastConnDt' },{ name : '등록일' , value: 'regDt' }] },
                    {type: 'date', title :'', id: 'date' , name:'date', searchStartDate: this.setDate ,  searchEndDate: this.setDate , calenderCount : 2},
                    // {type: 'input', title :'입력해', id: 'inputType', name:'inputType' , value: '',   api : '' , option : '' },
                    {type: 'selectCode' , title :'등급',id: 'role', name:'issuePurpose' , value: '' ,  api : '0034' , option : [{ codeName : '소득공제' , code: '0' },{codeName : '지출증빙' , code: '1' }]},
                    {type: 'selectCode' , title :'상태',id: 'dealType', name:'dealType' , value: '' ,  api : '0035' , option : [{ codeName : '승인' , code: '0' },{codeName : '취소' , code: '1' }]},

                    {type: 'select' , title :'검색',id: 'searchType', name:'searchType' , value: '' ,  api : '' , option : [{ name : '아이디' , value: 'id' },{name : '이름' , value: 'name' },{name : '사업자등록번호' , value: 'saupId' },{name : '소속회사' , value: 'shopNm' }]},
                    {type: 'input', title :'', id: 'searchWord', name:'inputType' , value: '',   api : '' , option : '' },
                    // {type: 'check' , title :'체크해', id: 'checkType', name: 'checkType' ,  value: '' , option : [{ name : '선택' , id: 'cho1', value: true },{ name : '선택2' ,id: 'cho2', value: false}] },
                    // {type: 'radio' , title :'선택해', id: 'radioBox', name: 'radioBox' , value: '' , option : [{ name : '선택' , value: '111' },{ name : '선택2' , value: '222' }] },
                ],
                paging: { currentPage : 1 , lastPage : 0 ,viewPageSize : 10 ,totalRecords : 0 , from : 0 , to : 0 , perPage : 10},
                goSearch : "iocSearch",
                searchClass : 'search_box page_system03',
                searchClassSub : 'search_box page_system03'
            }

        created(){
            this.originItem  = this.listItem.dataGrid.columControl
            // if( window.innerWidth < 482){
            //     this.handleResize()
            // }else{
            //     this.windowResize = false;
            //     this.handleResize()
            // }
        }


        mounted(){

        }

        checkBoxEvent(data){
            console.log(data); // 체크한데이터 받는다
        }

        // 뷰페이지 클릭이벤트 받아서 여는곳
        listViewEvent(data){
            console.log(data)
            if(data.key=='id'){
                 this.$router.push({ name:'modUser' , params: { current : data.searchOption , val : data.row.id } }) // 라우터 주소를 넣어줘야 히스토리모드 인식
            }
        }

        // }
        updated(){
        }
        /**
         * 계정등록
         */
        regUser(){
            this.$router.push({name:'regUser'});
        }

        /**
         * 상세보기
         */
        modUser(){
            this.$router.push({name:'modUser'});
        }

        /**
         * 모달팝업호출
         */
        popComfirm(){
            this.showModalBiz=true;
        }

        checkAll(){

        }



    }
</script>