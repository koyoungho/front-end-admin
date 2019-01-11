<template>
    <!-- container -->
    <section id="container">
        <!-- content  -->
        <div class="content">
            <h2 class="blind">시스템 관리</h2>

            <h3>{{titleNm}} 임시 관리</h3>

            <!--임시리스트-->
            <ListComponent v-bind:listObject="listItem" v-bind:onLoadList="listItem.dataGrid.onLoadList" v-on:listView="listViewEvent"></ListComponent>

            <!-- btn bot -->
            <div class="btn_bot">
                <button type="button" v-on:click="toList" class="btn_b01 bg02">취소</button>
                <template v-show="regShow">
                    <button type="button" v-on:click="toRegPolicy" class="btn_b01 bg03">{{titleNm}} 추가</button>
                    <button type="button" class="btn_b01 bg03" v-on:click="searchTemp">임시 저장</button>
                    <button type="button" class="btn_b01 bg01" v-on:click="totalSave">전체 저장</button>
                </template>
            </div>



        </div>
        <!-- //content -->
    </section>
    <!-- //container -->


</template>

<script lang="ts">
    import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
    import {CommonBoardService} from "../../../api/common.service";
    import format from 'date-fns/format'

    import ListComponent from '../../common/list/list.vue';  // 공용리스트 콤포넌트

    @Component({
        components : {
            PolicyTempList, ListComponent
        }
    })
    export default class PolicyTempList extends Vue {
        titleNm: string ="";
        policyList:any[]=[];
        hisSeq:string = "";
        termsType :string = "";
        totalCount: any = '';
        originItem : any = {} // 오리지널데이터

        listItem: any ={}  // 그리드 서치 페이징 옵션 처리 데이터 매우중요 이룰을 어기면 화면깨짐이 발생합니다

        listData : any = {};
        reqData :any ={};
        regShow: boolean = false;

        created(){
            this.pageDiv();
        }

        // 라우터 경로 변경시 이벤트 발생
        @Watch('$route') onChange(){
            this.pageDiv();
        }

        /**
         * 페이지 분기 - 셀렉트 박스 리스트호출
         */
        pageDiv() {

            let routeNm = this.$route.name;
            if (routeNm == 'policyTempList') {
                this.titleNm = '이용약관';
                this.termsType = "site";


            } else if (routeNm == 'personalTempList') {
                this.titleNm = '개인보호처리방침';
                this.termsType = "user";
            }

            // 메뉴별 권한 확인
            let menuList = JSON.parse(sessionStorage.authMenu);
            let programId =routeNm; //메뉴ID
            for (let i = 0; i < menuList.length; i++) {
                for (let j = 0; j < menuList[i].subMenuDtos.length; j++) {

                    //권한(조회-readYn/ 등록-createYn/ 수정-updateYn/ 삭제-deleteYn)
                    if (menuList[i].subMenuDtos[j].progId == programId && menuList[i].subMenuDtos[j].createYn == 'Y') {
                        this.regShow = true;
                    }
                }
            }

            this.listItem= {
                dataGrid: {
                    columControl:[  // 반드시 받는 컬럼명과 이 ID 가 같아야데이터가 나옵니다..
                        {columName : '순번', type:'text', id : 'termsOrder', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' ,rowColors :'' },
                        {columName : '제목', type:'text', id : 'title', width : '70%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' ,rowColors :'' },
                    ],
                    totalColum: 2,
                    apiUrl : 'terms/temp/'+this.termsType,
                    onLoadList : true,  // onLoad 로딩 유무
                },
                search: [],
                searchClass: 'search_box page_customer04',
                searchClass2: 'search_list col0301',
                paging: { currentPage : 1 , lastPage : 3 ,viewPageSize : 10 ,totalRecords : 3 , from : 1 , to : 3 , perPage : 10},
                goDirect : ""
            }

        }


        /**
         * 데이트 포맷 변경
         * @param date
         */
        formatDates(date) {
            let formattedDates = '';
            formattedDates = format(date, "YYYY.MM.DD")
            return formattedDates
        }

        /**
         * 등록버튼 클릭
         */
        toRegPolicy(){
            if(this.termsType == 'site'){
                this.$router.push({name:'policyReg'});
            }else{
                this.$router.push({name:'personalReg'});
            }
        }

        /**
         * 목록으로
         */
        toList(){
            if(this.termsType=="site"){
                this.$router.push({name:'policyHistoryList'});
            }else{
                this.$router.push({name:'personalHistoryList'});
            }
        }

        // 뷰페이지 클릭이벤트 받아서 여는곳
        listViewEvent(row){
            if(this.termsType == 'site'){
                this.$router.push({name:'policyReg', params: { current : row.searchOption , objectKey : row.row } }) // 라우터 주소를 넣어줘야 히스토리모드 인식
            }else{
                this.$router.push({name:'personalReg', params: { current : row.searchOption , objectKey : row.row } }) // 라우터 주소를 넣어줘야 히스토리모드 인식
            }
        }

        /**
         * 임시저장 클릭
         */
        searchTemp(){

            //임시템프 리스트 호출
            CommonBoardService.getListDatas('terms/temp' , this.termsType, null).then((response) => {
                this.listData= response.data;

                if(this.listData.length>0){
                    this.reqData['details'] = this.listData;
                    this.reqData['termsType'] = this.termsType;

                    //임시저장 메소드 호출
                    this.tempSave();
                }

            } , (error) => {
                //this.$Progress.finish();
                console.log(error);
            }
            ).catch();

         }

         /**
          *임시저장 메소드 호출
          */
        tempSave(){

            CommonBoardService.postListDatas('terms/temp' , null, this.reqData).then((response) => {
                if (response.status.toString() == '201') { //성공
                    Vue.swal({ text:"임시저장되었습니다."});
                } else { // 실패
                    console.log(response);
                    Vue.swal({ text:"임시저장 실패 하였습니다."});
                }
            }
            , (error) => {
                //this.$Progress.finish();
                console.log(error);
            }
            ).catch();
        }

        /**
         * 전체저장
         */
        totalSave(){
            let params ={};

            params['termsType'] = this.termsType

            CommonBoardService.postListDatas('terms',null, params).then((response) => {
                    if (response.status.toString() == '201') { //성공
                        Vue.swal({ text:"전체저장 되었습니다."}).then((result) => {
                            this.toList();//목록으로
                        });
                    } else { // 실패
                        console.log(response);
                        Vue.swal({ text:"전체 저장에 실패 하였습니다."}).then((result) => {
                            this.toList();//목록으로
                        });
                    }
                }
                , (error) => {
                    //this.$Progress.finish();
                    console.log(error);
                }
            ).catch();
        }





    }
</script>

<style scoped>

</style>