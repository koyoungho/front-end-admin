<template>

    <section id="container">
        <!--<resize-observer @notify="handleResize"/>-->
        <div class="content">
            <div>
                <h2 class="blind">{{titles}}</h2>
        <h3>{{subTitle}}</h3>
        <!-- btn top -->
        <div class="btn_top">
            <button type="button" id="" class="btn_m01 bg02 reg" v-on:click="newReg">신규 등록</button>
        </div>
        <ListComponent v-bind:listObject="listItem" v-bind:onLoadList="listItem.dataGrid.onLoadList" v-on:listView="listViewEvent"></ListComponent>
        </div>
        </div>
        <!-- //content -->
    </section>

</template>

<script lang="ts">
    import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
    import {CommonBoardService, CommonListService} from '../../../api/common.service';
    import {environment} from '../../../utill/environment';
    import ListComponent from '../../common/list/list.vue';  // 공용리스트 콤포넌트
    @Component({
        components: {
            ListComponent
        }
    })
    export default class FranchiseList extends Vue {
        // 리스트 변수
        listOn : boolean = true;
        titles: string = '가맹점 관리'; // 제목
        subTitle: string = '가맹점 관리'; //서브타이틀
        windowResize : boolean = false; // 리사이즈
        originItem : any = {} // 오리지널데이터
        exceptColum : any = [] // 리사이즈 됬을경우 숨겨져야할 컬럼
        listItem: any =  // 그리드 서치 페이징 옵션 처리 데이터 매우중요 이룰을 어기면 화면깨짐이 발생합니다
            {
                dataGrid: {
                    columControl:[  // 반드시 받는 컬럼명과 이 ID 가 같아야데이터가 나옵니다..
                        {columName : '순번' ,id : 'rnum', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' ,rowColors :'' },
                        {columName : '사업장명' ,id : 'shopNm', width : '24%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' , colColors : 'color: #008aff' },
                        {columName : '사업자등록번호' ,id : 'saupId', width : '15%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : ''},
                        {columName : '가맹점번호' ,id : 'gajumId', width : '15%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : ''},
                        {columName : '가맹점상태' ,id : 'gajumStatus', width : '12%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' ,  lineValue: '취소'  }, // 라인컬러와 라인벨류는 오직하나만
                        {columName : 'B/L 상태' ,id : 'blStatus', width : '12%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : ''},
                        {columName : '등록일' ,id : 'regiDate', width : '12%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : ''}
                    ],
                    totalColum: 10,
                    apiUrl : 'gajum',
                    onLoadList : true,  // onLoad 로딩 유무
                    mTotal : false , // 합계금액 란 활성화여부  합계가 존재하는 페이지도 있음
                    mTotalControl : [{totalTitle : '합계 금액' , id: 'totalCount' , value : '' },{totalTitle : '봉사료' , id: 'serviceCharge' , value : '' },{totalTitle : '공급가액' , id: 'supplyValue' , value : '' },
                        {totalTitle : '부가세' , id: 'surtax' , value : '' }]
                },
                // 아이디는 실제 컬럼값을 넣어주면됩니다.
                search: [
                    {type: 'date', title :'등록일', id: 'date' , name:'date', searchStartDate: null ,  searchEndDate: null, calenderCount : 2},
                    // {type: 'input', title :'입력해', id: 'inputType', name:'inputType' , value: '',   api : '' , option : '' },
                    {type: 'selectCode' , title :'가맹점상태',id: 'gajumStatus', name:'gajumStatus' , value: '' ,  api : '' , option : [{ codeName : '정상' , code: '01' },{codeName : '해지' , code: '02' },{codeName : '해지신청' , code: '03' }]},
                    {type: 'selectCode' , title :'BL 상태',id: 'blGb', name:'blGb' , value: '' ,  api : '' , option : [{ codeName : '휴업' , code: '1' },{codeName : '수기BL' , code: '11' },{codeName : '수기BL취소' , code: '17' },{codeName : '폐업' , code: '2' },{codeName : '신용카드위장' , code: '3' },{codeName : '현금위장' , code: '4' },{codeName : '신용카드/현금위장' , code: '5' },{codeName : '현금영수증발급불가' , code: '6' },{codeName : '적용취소' , code: '7' },{codeName : '삭제된사업자' , code: '8' }]},
                    {type: 'select' , title :'검색',id: 'searchType', name:'searchType' , value: '' ,  api : '' , option : [{ name : '사업자등록번호' , value: 'saupId' },{name : '대표자 명' , value: 'chipNm' }]},
                    {type: 'input', title :'', id: 'searchWord', name:'searchWord' , value: '',   api : '' , option : '' }
                    // {type: 'check' , title :'체크해', id: 'checkType', name: 'checkType' ,  value: '' , option : [{ name : '선택' , id: 'cho1', value: true },{ name : '선택2' ,id: 'cho2', value: false}] },
                    // {type: 'radio' , title :'선택해', id: 'radioBox', name: 'radioBox' , value: '' , option : [{ name : '선택' , value: '111' },{ name : '선택2' , value: '222' }] },
                ],
                paging: { currentPage : 1 , lastPage : 0 ,viewPageSize : 10 ,totalRecords : 0 , from : 0 , to : 0 , perPage : 10},
                goSearch : "iocSearch"
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

        // 뷰페이지 클릭이벤트 받아서 여는곳
        listViewEvent(row){
console.log('클릭이벤트 받음')
console.log(row)
            this.$router.push({ name:'franchiseDetl' , params: { current : row.searchOption , objectKey : row.row } }) // 라우터 주소를 넣어줘야 히스토리모드 인식
        }

        // 와이드 창줄어들시 모바일용으로 윈도우 사이즈 재는곳
        // handleResize(){
        // if(window.innerWidth < 482){
        //     if(this.windowResize ==true){
        //
        //     }else{
        //         // this.listItem.dataGrid.columControl= this.listItem.dataGrid.columControl.filter(e=>{
        //         //        return this.exceptColum.find(s=>{
        //         //         if(e.id !=s.id){
        //         //             return e
        //         //         }
        //         //     })
        //         // })
        //         this.windowResize =true
        //     }
        // }else{
        //     if(this.windowResize==false){
        //     }else{
        //     this.listItem.dataGrid.columControl = this.originItem;
        //     this.windowResize =false;
        //     }
        // }

        // }
        updated(){
        }

        //가맹점 상세이동
        goDetl(){
            this.$router.push('/home/franchiseDetl')
        }
        //신규등록
        newReg(){
            this.$router.push('/home/franchiseReg')
        }
    }

</script>