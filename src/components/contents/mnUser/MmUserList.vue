<template>
    <!-- container -->
    <section id="container">
        <!-- content  -->
        <div class="content">
            <h2 class="blind">시스템관리</h2>

            <h3>계정 권한 관리</h3>

            <!-- btn top -->
            <div class="btn_top" v-if="regbtnShow">
                <button type="button" class="btn_m01 bg02" v-on:click="regStoreUser">사용자 계정 등록</button>
                <button type="button" class="btn_m01 bg02" v-on:click="regUser">관리자 계정 등록</button>
            </div>

            <!-- search box -->
            <ListComponent v-bind:listObject="listItem" v-bind:onLoadList="listItem.dataGrid.onLoadList" v-on:listView="listViewEvent" v-on:listCheckEvent="checkBoxEvent"></ListComponent>
        <!-- //content -->

            <PreviewBusinessLicense v-if="showModalBiz" v-bind:listObject="rowData" v-on:close="bizClose"></PreviewBusinessLicense>
            <!--<MnUserOtp v-if="otpChecks" @close="otpChecks=false"></MnUserOtp>-->
        </div>
    </section>
    <!-- //container -->


</template>

<script lang="ts">

    import {format} from 'date-fns';
    import {Component, Vue} from "vue-property-decorator";
    import PreviewBusinessLicense from "@/components/contents/mnUser/previewBizLicense.vue";
    import ListComponent from '../../common/list/list.vue';
    import {CommonBoardService} from "../../../api/common.service";  // 공용리스트 콤포넌트
    import axios from 'axios';
    import {environment} from '../../../utill/environment';
    //import MnUserOtp from "@/components/contents/login/MnUserOtp.vue";

    @Component({
        components: {
            MmUserList, PreviewBusinessLicense,ListComponent
        }
    })
    export default class MmUserList extends Vue {
        //otpChecks: boolean = false; //OTP인증
        regbtnShow: boolean = false; //등록
        showModalBiz: boolean = false; // 사업자 사본확인
        rowData: any = {}; //사업자 사본 화면으로 넘기는 row 데이터
        isCheck:boolean = false;
        listOn : boolean = true;
        titles: string = '발급조회 및 취소'; // 제목
        subTitle: string = '현금영수증 발급'; //서브타이틀
        windowResize : boolean = false; // 리사이즈
        setDate =  format(new Date(),'YYYYMMDD')
        originItem : any = {} // 오리지널데이터
        exceptColum : any = [] // 리사이즈 됬을경우 숨겨져야할 컬럼

        callVal : string = ''; //계정 등급
        callDis : boolean = false;

        listItem: any =  // 그리드 서치 페이징 옵션 처리 데이터 매우중요 이룰을 어기면 화면깨짐이 발생합니다
            {
                dataGrid: {
                    columControl:[  // 반드시 받는 컬럼명과 이 ID 가 같아야데이터가 나옵니다..
                        {columName : '체크박스' ,id :'check_id',type:'checkBox', width : '5%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' ,checkVal :  false , allCheck:true  , returnKey : 'role'}, // 올체크 투르 펄스에따라 전체체크박스생성 //checkval 디폴트값주기
                        {columName : '순번' ,id : 'num', type:'number', width : '5%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' },
                        {columName : '아이디' ,id :'id',type:'text', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' , colColors : 'color: #008aff' },
                        {columName : '이름' ,id : 'name',type:'text', width : '7%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : ''},
                        {columName : '등급명' ,id : 'roleNm',type:'text', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : ''},
                        {columName : '등급' ,id : 'role',type:'hidden', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : ''}, //hidden으로 가지고 있는 값(role 코드값)
                        {columName : '소속' ,id : 'shopNm',type:'text', width : '13%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : ''   }, // 라인컬러와 라인벨류는 오직하나만
                        {columName : '상태' ,id : 'accountStatus',type:'text', width : '7%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' ,  lineValue: '승인대기'},
                        {columName : '등록일' ,id : 'regDt',type:'date', width : '8%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '', dateFormat:'YYYY.MM.DD HH:mm:ss'},
                        {columName : '최종접속' ,id : 'lastConnDt',type:'date', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' , dateFormat:'YYYY.MM.DD HH:mm:ss'},
                        // {columName : '처리결과' ,id : 'taxErr', width : '8%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' , options : [{ value : 'Y' , change : '전송'},{ value : 'N' , change : '미전송'}] ,fontColors :'color: red' },
                    ],
                    totalColum: 9, //
                    apiUrl : 'accounts',
                    onLoadList : true,  // onLoad 로딩 유무
                    // mTotal : true , // 합계금액 란 활성화여부  합계가 존재하는 페이지도 있음
                    // mTotalControl : [{totalTitle : '합계 금액' , id: 'totalCount' , value : '' },{totalTitle : '봉사료' , id: 'serviceCharge' , value : '' },{totalTitle : '공급가액' , id: 'supplyValue' , value : '' },
                    //     {totalTitle : '부가세' , id: 'surtax' , value : '' }]
                    acntAuthMng : true
                },
                // 아이디는 실제 컬럼값을 넣어주면됩니다.
                search: [
                    {type: 'radio' , title :'', id: 'searchDateType', name: 'radioBox' , value: 'regDt' , option : [{ name : '최종접속일' , value: 'lastConnDt' },{ name : '등록일' , value: 'regDt' }] },
                    {type: 'date2', title :'', id: 'date', name:'date', searchStartDate: [new Date(),new Date()] , calenderCount : 2 , dateType : 'date' , width : 220  , default :'YYYY-MM-DD'},
                    // {type: 'input', title :'입력해', id: 'inputType', name:'inputType' , value: '',   api : '' , option : '' },
                    {type: 'selectCode' , title :'등급',id: 'role', name:'role' , value: this.callVal , disable : this.callDis ,  api : '' , option : [{ codeNm : '시스템 관리자' , code: '0001' },{codeNm : '콜센터 관리자' , code: '0003' },{codeNm : '사업자 관리자' , code: '0002' },{codeNm : '가맹점 관리자' , code: '0004' },{codeNm : '지점 관리자' , code: '0005' },{codeNm : '매장 관리자(일반 사용자)' , code: '0006' }]},
                    {type: 'selectCode' , title :'상태',id: 'aprvStatus', name:'aprvStatus' , value: '' ,  api : '' , option : [{ codeNm : '정상' , code: '0' },{codeNm : '승인대기' , code: '1' },{codeNm : '해지대기' , code: '2' },{codeNm : '사용중지' , code: '3' },{codeNm : '해지' , code: '4' }]},
                    {type: 'select' , title :'검색',id: 'searchType', name:'searchType' , value: '' ,  api : '' , option : [{ name : '아이디' , value: 'id' },{name : '이름' , value: 'name' },{name : '사업자등록번호' , value: 'saupId' },{name : '사업장명' , value: 'shopNm' }]},
                    {type: 'input', title :'', id: 'searchWord', name:'inputType' , value: '',   api : '' , option : '' },
                    // {type: 'check' , title :'체크해', id: 'checkType', name: 'checkType' ,  value: '' , option : [{ name : '선택' , id: 'cho1', value: true },{ name : '선택2' ,id: 'cho2', value: false}] },
                    // {type: 'radio' , title :'선택해', id: 'radioBox', name: 'radioBox' , value: '' , option : [{ name : '선택' , value: '111' },{ name : '선택2' , value: '222' }] },
                ],
                paging: { currentPage : 1 , lastPage : 0 ,viewPageSize : 10 ,totalRecords : 0 , from : 0 , to : 0 , perPage : 10},
                goSearch : "iocSearch",
                searchClass : 'search_box page_system03',
                searchClass2 : 'search_list'
            }

        created(){
            this.originItem  = this.listItem.dataGrid.columControl
            // if( window.innerWidth < 482){
            //     this.handleResize()
            // }else{
            //     this.windowResize = false;
            //     this.handleResize()
            // }
            //this.listItem.search[1].searchStartDate = '20180101';

            // 메뉴별 권한 확인
            let menuList = JSON.parse(sessionStorage.authMenu);
            let programId = 'mnUser'; //메뉴ID
            for (let i = 0; i < menuList.length; i++) {
                for (let j = 0; j < menuList[i].subMenuDtos.length; j++) {

                    //권한(조회-readYn/ 등록-createYn/ 수정-updateYn/ 삭제-deleteYn)
                    if (menuList[i].subMenuDtos[j].progId == programId && menuList[i].subMenuDtos[j].createYn == 'Y') {
                        this.regbtnShow = true;
                    }
                }
            }

            if(sessionStorage.role == '0003'){ //콜센터는 매장관리등급만 조회가능
                this.callVal = '0006';
                this.callDis = true;
            }

            this.listItem =  // 그리드 서치 페이징 옵션 처리 데이터 매우중요 이룰을 어기면 화면깨짐이 발생합니다
                {
                    dataGrid: {
                        columControl:[  // 반드시 받는 컬럼명과 이 ID 가 같아야데이터가 나옵니다..
                            {columName : '체크박스' ,id :'check_id',type:'checkBox', width : '5%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' ,checkVal :  false , allCheck:true  , returnKey : 'role'}, // 올체크 투르 펄스에따라 전체체크박스생성 //checkval 디폴트값주기
                            {columName : '순번' ,id : 'num', type:'number', width : '5%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' },
                            {columName : '아이디' ,id :'id',type:'text', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' , colColors : 'color: #008aff' },
                            {columName : '이름' ,id : 'name',type:'text', width : '7%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : ''},
                            {columName : '등급명' ,id : 'roleNm',type:'text', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : ''},
                            {columName : '등급' ,id : 'role',type:'hidden', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : ''}, //hidden으로 가지고 있는 값(role 코드값)
                            {columName : '소속' ,id : 'shopNm',type:'text', width : '13%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : ''   }, // 라인컬러와 라인벨류는 오직하나만
                            {columName : '상태' ,id : 'accountStatus',type:'text', width : '7%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' ,  lineValue: '승인대기'},
                            {columName : '등록일' ,id : 'regDt',type:'date', width : '8%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '', dateFormat:'YYYY.MM.DD HH:mm:ss'},
                            {columName : '최종접속' ,id : 'lastConnDt',type:'date', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' , dateFormat:'YYYY.MM.DD HH:mm:ss'},
                            // {columName : '처리결과' ,id : 'taxErr', width : '8%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' , options : [{ value : 'Y' , change : '전송'},{ value : 'N' , change : '미전송'}] ,fontColors :'color: red' },
                        ],
                        totalColum: 9, //
                        apiUrl : 'accounts',
                        onLoadList : true,  // onLoad 로딩 유무
                        // mTotal : true , // 합계금액 란 활성화여부  합계가 존재하는 페이지도 있음
                        // mTotalControl : [{totalTitle : '합계 금액' , id: 'totalCount' , value : '' },{totalTitle : '봉사료' , id: 'serviceCharge' , value : '' },{totalTitle : '공급가액' , id: 'supplyValue' , value : '' },
                        //     {totalTitle : '부가세' , id: 'surtax' , value : '' }]
                        acntAuthMng : true
                    },
                    // 아이디는 실제 컬럼값을 넣어주면됩니다.
                    search: [
                        // {type: 'input', title :'입력해', id: 'inputType', name:'inputType' , value: '',   api : '' , option : '' },
                        {type: 'selectCode' ,class:'w30 text_center', title :'등급',id: 'role', name:'role' , value: this.callVal , disable : this.callDis ,  api : '' , option : [{ codeNm : '시스템 관리자' , code: '0001' },{codeNm : '콜센터 관리자' , code: '0003' },{codeNm : '사업자 관리자' , code: '0002' },{codeNm : '가맹점 관리자' , code: '0004' },{codeNm : '지점 관리자' , code: '0005' },{codeNm : '매장 관리자(일반 사용자)' , code: '0006' }]},
                        {type: 'selectCode' ,class:'w30 text_left',liNull:true, title :'상태',id: 'aprvStatus', name:'aprvStatus' , value: '' ,  api : '' , option : [{ codeNm : '정상' , code: '0' },{codeNm : '승인대기' , code: '1' },{codeNm : '해지대기' , code: '2' },{codeNm : '사용중지' , code: '3' },{codeNm : '해지' , code: '4' }]},
                        {type: 'radio' ,class:'w25', title :'', id: 'searchDateType', name: 'radioBox' , value: 'regDt' , option : [{ name : '최종접속일' , value: 'lastConnDt' },{ name : '등록일' , value: 'regDt' }] },
                        {type: 'date2',class:'w25', title :'', id: 'date', name:'date', searchStartDate: [new Date(),new Date()] , calenderCount : 2 , dateType : 'date' , width : 220  , default :'YYYY-MM-DD'},
                        {type: 'select' ,class:'w25', title :'검색',id: 'searchType', name:'searchType' , value: '' ,  api : '' , option : [{ name : '아이디' , value: 'id' },{name : '이름' , value: 'name' },{name : '사업자등록번호' , value: 'saupId' },{name : '사업장명' , value: 'shopNm' }]},
                        {type: 'input',class:'w25 text_left', title :'', id: 'searchWord', name:'inputType' , value: '',   api : '' , option : '' },
                        // {type: 'check' , title :'체크해', id: 'checkType', name: 'checkType' ,  value: '' , option : [{ name : '선택' , id: 'cho1', value: true },{ name : '선택2' ,id: 'cho2', value: false}] },
                        // {type: 'radio' , title :'선택해', id: 'radioBox', name: 'radioBox' , value: '' , option : [{ name : '선택' , value: '111' },{ name : '선택2' , value: '222' }] },
                    ],
                    paging: { currentPage : 1 , lastPage : 0 ,viewPageSize : 10 ,totalRecords : 0 , from : 0 , to : 0 , perPage : 10},
                    goSearch : "iocSearch",
                    searchClass : 'search_box page_new',
                    searchClass2 : 'search_list'
                }



        }

        mounted(){

        }

        checkBoxEvent(data){
            console.log(data); // 체크한데이터 받는다
        }

        // 뷰페이지 클릭이벤트 받아서 여는곳
        listViewEvent(data){
            console.log('클릭 데이터 표시')
            console.log(data)
            if(data.key=='id'){ //ID 클릭시

                if(data.row.role == '0006'){ // 매장 사용자

                    if(sessionStorage.role == '0001'){ //시스템관리자
                        //this.$router.push({ name:'modUser' , params: { current : data.searchOption , val : data.row.id , val2 : data.row.role } }) // 라우터 주소를 넣어줘야 히스토리모드 인식
                        this.$router.push({ name:'modStoreUser' , params: { reqParams : data } }) // 라우터 주소를 넣어줘야 히스토리모드 인식
                    }else if(sessionStorage.role == '0003'){ //콜센터는 인증화면

                        data['entranceUrl'] = 'mnUserList';
                        data['nextUrl'] = 'modStoreUser';
                        console.log(data)
                        //OTP인증 화면으로 이동
                        this.$router.push({ name:'franchiseOtp' , params: { reqParams : data } }) // 라우터 주소를 넣어줘야 히스토리모드 인식

                        //OTP인증 화면으로 이동
                        //this.$router.push({ name:'mnUserOtp' , params: { reqParams : data } }) // 라우터 주소를 넣어줘야 히스토리모드 인식
                        //this.$router.push({ name:'modUser' , params: { current : data.searchOption , val : data.row.id , val2 : data.row.role } }) // 라우터 주소를 넣어줘야 히스토리모드 인식
                    }
                }else{ // 관리자*/

                    if(sessionStorage.role == '0001'){ //시스템관리자
                        this.$router.push({ name:'modUser' , params: { current : data.searchOption , val : data.row.id , val2 : data.row.role } }) // 라우터 주소를 넣어줘야 히스토리모드 인식
                    }else if(sessionStorage.role == '0003'){ //콜센터는 인증화면
                        //OTP인증 화면으로 이동
                        this.$router.push({ name:'mnUserOtp' , params: { reqParams : data } }) // 라우터 주소를 넣어줘야 히스토리모드 인식
                        //this.$router.push({ name:'modUser' , params: { current : data.searchOption , val : data.row.id , val2 : data.row.role } }) // 라우터 주소를 넣어줘야 히스토리모드 인식
                    }

                }

            }else if(data.key=='accountStatus' && data.row.accountStatus == '승인대기'){ //상태 클릭시(상태가 승인대기인 경우 팝업창 확인)

                if(data.row.saupFileNm == null || data.row.saupFileNm == ''){
                    Vue.swal({text: '사업자등록증 파일이 없습니다.'});
                    return;
                }else {
                    console.log('사업자등록증 파일 다운로드');
                    //this.rowData = data.row;
                    //this.popComfirm();

                    //파일 다운로드
                    let fileName : string = data.row.saupFileNm;
                    axios({
                        url: environment.apiUrl +"/file/"+fileName,
                        method: 'GET',
                        responseType: 'blob', // important
                        headers: {"x-auth-token": sessionStorage.accessToken}
                    }).then((response) => {
                        console.log(response)
                        // It is necessary to create a new blob object with mime-type explicitly set
                        // otherwise only Chrome works like it should
                        var newBlob = new Blob([response.data],{type: 'application/xlsx'})

                        // IE doesn't allow using a blob object directly as link href
                        // instead it is necessary to use msSaveOrOpenBlob
                        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                            window.navigator.msSaveOrOpenBlob(newBlob,fileName)
                            return
                        }

                        // For other browsers:
                        // Create a link pointing to the ObjectURL containing the blob.
                        const data = window.URL.createObjectURL(newBlob)
                        var link = document.createElement('a')
                        link.href = data
                        link.download = fileName
                        link.click()
                        setTimeout(function () {
                            // For Firefox it is necessary to delay revoking the ObjectURL
                            window.URL.revokeObjectURL(data)
                        }, 100)
                    })

                    /*
                    let server: any = environment.apiUrl;
                    let param: any = '/file/' + data.row.saupFileNm;
                    //파일 다운로드
                    axios({
                        url: server + param,
                        method: 'GET',
                        responseType: 'blob', // important
                        headers: {"x-auth-token": sessionStorage.accessToken}
                    }).then((response) => {
                        console.log(response);
                        const url = window.URL.createObjectURL(new Blob([response.data]));
                        const link = document.createElement('a');
                        link.href = url;
                        link.setAttribute('download', data.row.saupFileNm); //or any other extension
                        document.body.appendChild(link);
                        link.click();
                    });*/

                }

            }

        }

        // }
        updated(){
        }

        /**
         * 계정등록
         */
        regStoreUser(){
            this.$router.push({name:'regStoreUser'});
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

        /**
         * 사업자등록증 사본 화면 닫기
         */
        bizClose(){
            this.showModalBiz=false;
        }

        checkAll(){

        }




    }
</script>