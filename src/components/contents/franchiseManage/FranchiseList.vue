<template>

    <section id="container">
        <!--<resize-observer @notify="handleResize"/>-->
        <div class="content">
            <div>
                <h2 class="blind">{{titles}}</h2>
        <h3>{{subTitle}}</h3>
        <!-- btn top -->
        <div class="btn_top" v-if="regShow">
            <button type="button" id="reg_btn" class="btn_m01 bg02 reg" v-on:click="newReg">신규 등록</button>
        </div>
        <ListComponent v-bind:listObject="listItem" v-bind:onLoadList="listItem.dataGrid.onLoadList" v-on:listView="listViewEvent" v-on:listCheckEvent="checkBoxEvent"></ListComponent>
        </div>
        </div>
        <!-- //content -->
    </section>

</template>

<script lang="ts">
    import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
    import ListComponent from '../../common/list/list.vue';  // 공용리스트 콤포넌트
    import {format} from 'date-fns';
    @Component({
        components: {
            FranchiseList, ListComponent
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
        regShow : boolean = false; //신규등록 버튼 보여주는지 여부
        setDate =  format(new Date(),'YYYYMMDD');
        searchGbn : any = '';

        soluVal : string = ''; //현금영수증사업자
        soluDis : boolean = false;

        listItem: any =  // 그리드 서치 페이징 옵션 처리 데이터 매우중요 이룰을 어기면 화면깨짐이 발생합니다
            {
                dataGrid: {
                    columControl:[  // 반드시 받는 컬럼명과 이 ID 가 같아야데이터가 나옵니다..
                        {columName : '순번' ,id : 'rnum',type:'number', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' ,rowColors :'' },
                        {columName : '사업장명' ,id : 'shopNm',type:'text', width : '24%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' , colColors : 'color: #008aff' },
                        {columName : '사업자등록번호' ,id : 'saupId',type:'text', width : '15%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : ''},
                        {columName : '가맹점번호' ,id : 'gajumId',type:'text', width : '15%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : ''},
                        {columName : '가맹점상태' ,id : 'gajumStatus',type:'text', width : '12%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' ,  lineValue: '취소'  }, // 라인컬러와 라인벨류는 오직하나만
                        {columName : 'B/L 상태' ,id : 'blStatus',type:'text', width : '12%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : ''},
                        {columName : '등록일' ,id : 'regiDate',type:'text', width : '12%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : ''}
                    ],
                    totalColum: 9,
                    apiUrl : 'gajum',
                    onLoadList : true,  // onLoad 로딩 유무
                    //mTotal : false , // 합계금액 란 활성화여부  합계가 존재하는 페이지도 있음
                    //mTotalControl : [{totalTitle : '합계 금액' , id: 'totalCount' , value : '' },{totalTitle : '봉사료' , id: 'serviceCharge' , value : '' },{totalTitle : '공급가액' , id: 'supplyValue' , value : '' },
                    //    {totalTitle : '부가세' , id: 'surtax' , value : '' }]
                },
                // 아이디는 실제 컬럼값을 넣어주면됩니다.
                search: [
                    {type: 'selectCode' , title :'현금영수증사업자',id: 'soluId', name:'soluId' , value: this.soluVal ,  api : 'code/issuer' ,  disable : this.soluDis , option : [{codeNm : '(주)롯데정보통신', code: '0001'}]},
                    {type: 'date', title :'등록일', id: 'date' , name:'date', searchStartDate: this.setDate,  searchEndDate: this.setDate, calenderCount : 2},
                    // {type: 'input', title :'입력해', id: 'inputType', name:'inputType' , value: '',   api : '' , option : '' },
                    {type: 'selectCode' , title :'가맹점상태',id: 'gajumStatus', name:'gajumStatus' , value: '' ,  api : '' , option : [{codeNm : '정상' , code: '2' },{ codeNm : '승인대기' , code: '0' },{codeNm : '해지대기' , code: '1' },{codeNm : '해지' , code: '3' }]},
                    //{type: 'selectCode' , title :'BL 상태',id: 'blGb', name:'blGb' , value: '' ,  api : '' , option : [{ codeNm : '휴업' , code: '1' },{codeNm : '수기BL' , code: '11' },{codeNm : '수기BL취소' , code: '17' },{codeNm : '폐업' , code: '2' },{codeNm : '신용카드위장' , code: '3' },{codeNm : '현금위장' , code: '4' },{codeNm : '신용카드/현금위장' , code: '5' },{codeNm : '현금영수증발급불가' , code: '6' },{codeNm : '적용취소' , code: '7' },{codeNm : '삭제된사업자' , code: '8' }]},
                    {type: 'selectCode' , title :'BL 상태',id: 'blGb', name:'blGb' , value: '' ,  api : 'code/bl' , option : [{ codeNm : '' , code: '' }]},
                    {type: 'select' , title :'검색',id: 'searchType', name:'searchType' , value: '' ,  api : '' , option : [{ name : '사업장명' , value: '0' },{ name : '사업자등록번호' , value: '1' },{name : '대표자 명' , value: '2' }]},
                    {type: 'input', title :'', id: 'searchWord', name:'searchWord' , value: '',   api : '' , option : '' }
                    // {type: 'check' , title :'체크해', id: 'checkType', name: 'checkType' ,  value: '' , option : [{ name : '선택' , id: 'cho1', value: true },{ name : '선택2' ,id: 'cho2', value: false}] },
                    // {type: 'radio' , title :'선택해', id: 'radioBox', name: 'radioBox' , value: '' , option : [{ name : '선택' , value: '111' },{ name : '선택2' , value: '222' }] },
                ],
                paging: { currentPage : 1 , lastPage : 0 ,viewPageSize : 10 ,totalRecords : 0 , from : 0 , to : 0 , perPage : 10},
                goSearch : "iocSearch",
                searchClass : 'search_box page_store01',
                searchClass2 : 'search_list'
            }

        created(){
            this.originItem  = this.listItem.dataGrid.columControl

            if(sessionStorage.role == '0002') { //현금영수증 사업자
                this.soluVal = sessionStorage.soluId == null ? '' : sessionStorage.soluId;
                this.soluDis = true;
            }
            //console.log('세션 정보 확인!!')
            //console.log(sessionStorage)

            this.listItem =  // 그리드 서치 페이징 옵션 처리 데이터 매우중요 이룰을 어기면 화면깨짐이 발생합니다
                {
                    dataGrid: {
                        columControl:[  // 반드시 받는 컬럼명과 이 ID 가 같아야데이터가 나옵니다..
                            {columName : '순번' ,id : 'rnum',type:'number', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' ,rowColors :'' },
                            {columName : '사업장명' ,id : 'shopNm',type:'text', width : '24%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' , colColors : 'color: #008aff' },
                            {columName : '사업자등록번호' ,id : 'saupId',type:'text', width : '15%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : ''},
                            {columName : '가맹점번호' ,id : 'gajumId',type:'text', width : '15%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : ''},
                            {columName : '가맹점상태' ,id : 'gajumStatus',type:'text', width : '12%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' ,  lineValue: '취소'  }, // 라인컬러와 라인벨류는 오직하나만
                            {columName : 'B/L 상태' ,id : 'blStatus',type:'text', width : '12%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : ''},
                            {columName : '등록일' ,id : 'regiDate',type:'text', width : '12%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : ''}
                        ],
                        totalColum: 9,
                        apiUrl : 'gajum',
                        onLoadList : true,  // onLoad 로딩 유무
                        //mTotal : false , // 합계금액 란 활성화여부  합계가 존재하는 페이지도 있음
                        //mTotalControl : [{totalTitle : '합계 금액' , id: 'totalCount' , value : '' },{totalTitle : '봉사료' , id: 'serviceCharge' , value : '' },{totalTitle : '공급가액' , id: 'supplyValue' , value : '' },
                        //    {totalTitle : '부가세' , id: 'surtax' , value : '' }]
                    },
                    // 아이디는 실제 컬럼값을 넣어주면됩니다.
                    search: [
                        {type: 'selectCode' ,class:'w33', title :'현금영수증사업자',id: 'soluId', name:'soluId' , value: this.soluVal ,  api : 'code/issuer' ,  disable : this.soluDis , option : [{codeNm : '(주)롯데정보통신', code: '0001'}]},
                        {type: 'selectCode' ,class:'w33', title :'BL 상태',id: 'blGb', name:'blGb' , value: '' ,  api : 'code/bl' , option : [{ codeNm : '' , code: '' }]},
                        // {type: 'input', title :'입력해', id: 'inputType', name:'inputType' , value: '',   api : '' , option : '' },
                        {type: 'selectCode' ,class:'w33', title :'가맹점상태',id: 'gajumStatus', name:'gajumStatus' , value: '' ,  api : '' , option : [{ codeNm : '승인신청' , code: '0' },{codeNm : '해지신청' , code: '1' },{codeNm : '정상' , code: '2' },{codeNm : '해지' , code: '3' }]},
                        //{type: 'selectCode' , title :'BL 상태',id: 'blGb', name:'blGb' , value: '' ,  api : '' , option : [{ codeNm : '휴업' , code: '1' },{codeNm : '수기BL' , code: '11' },{codeNm : '수기BL취소' , code: '17' },{codeNm : '폐업' , code: '2' },{codeNm : '신용카드위장' , code: '3' },{codeNm : '현금위장' , code: '4' },{codeNm : '신용카드/현금위장' , code: '5' },{codeNm : '현금영수증발급불가' , code: '6' },{codeNm : '적용취소' , code: '7' },{codeNm : '삭제된사업자' , code: '8' }]},
                        {type: 'date2',class:'w33', title :'등록일', id: 'date', name:'date', searchStartDate: [new Date(),new Date()] , calenderCount : 2 , dateType : 'date' , width : 220  , default :'YYYY-MM-DD'},
                        {type: 'select' ,class:'w33', title :'검색',id: 'searchType', name:'searchType' , value: '' ,  api : '' , option : [{ name : '사업장명' , value: '0' },{ name : '사업자등록번호' , value: '1' },{name : '대표자 명' , value: '2' }]},
                        {type: 'input',class:'w33 text_left', title :'', id: 'searchWord', name:'searchWord' , value: '',   api : '' , option : '' }
                        // {type: 'check' , title :'체크해', id: 'checkType', name: 'checkType' ,  value: '' , option : [{ name : '선택' , id: 'cho1', value: true },{ name : '선택2' ,id: 'cho2', value: false}] },
                        // {type: 'radio' , title :'선택해', id: 'radioBox', name: 'radioBox' , value: '' , option : [{ name : '선택' , value: '111' },{ name : '선택2' , value: '222' }] },
                    ],
                    paging: { currentPage : 1 , lastPage : 0 ,viewPageSize : 10 ,totalRecords : 0 , from : 0 , to : 0 , perPage : 10},
                    goSearch : "iocSearch",
                    searchClass : 'search_box page_new',
                    searchClass2 : 'search_list'
                }

            //메뉴별 권한 확인
            let menuList = JSON.parse(sessionStorage.authMenu);
            let programId = 'franchiseList'; //메뉴ID (가맹점 관리)
            for(let i=0; i<menuList.length; i++){
                for(let j=0; j<menuList[i].subMenuDtos.length; j++){

                    //권한(조회-readYn/ 등록-createYn/ 수정-updateYn/ 삭제-deleteYn)
                    if(menuList[i].subMenuDtos[j].progId == programId && menuList[i].subMenuDtos[j].createYn == 'Y'){
                        this.regShow = true;
                    }
                }
            }
            console.log('등록 권한 확인 ?? :: ' + this.regShow)

        }


        mounted(){

        }

        checkBoxEvent(data){
            console.log(data); // 체크한데이터 받는다
        }

        // 뷰페이지 클릭이벤트 받아서 여는곳
        listViewEvent(row){
            console.log('상세페이지 이동')
            //console.log(row)
            if(sessionStorage.role == '0003'){ //콜센터는 휴대폰 인증
                row['entranceUrl'] = 'franchiseList';
                row['nextUrl'] = 'franchiseDetl';
                console.log(row)
                //OTP인증 화면으로 이동
                this.$router.push({ name:'franchiseOtp' , params: { reqParams : row } }) // 라우터 주소를 넣어줘야 히스토리모드 인식
            }else{
                this.$router.push({ name:'franchiseDetl' , params: { current : row.searchOption , objectKey : row.row } }) // 라우터 주소를 넣어줘야 히스토리모드 인식
            }

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
            this.$router.push({name: 'franchiseDetl'})
        }
        //신규등록
        newReg(){
            this.$router.push('/home/franchiseReg')
        }
    }

</script>