<template>
    <!-- container -->
    <section id="container">
        <!-- content  -->
        <div class="content">
            <h2 class="blind">시스템 관리</h2>

            <h3>{{titleNm}} 관리</h3>

            <!-- tbl list box -->
            <div class="tbl_list_box">
                <!-- tbl list01 -->
                <table class="tbl_list01">
                    <caption>이용약관 관리</caption>
                    <colgroup>
                        <col width="10%">
                        <col width="*">
                    </colgroup>
                    <thead>
                    <tr>
                        <th scope="col">순 번</th>
                        <th scope="col">제 목</th>
                    </tr>
                    </thead>
                    <tbody>
                    <template v-if="policyList.length>0">
                        <tr v-for="(policyList, index) in policyList">
                            <td><input type="text" class="input form_order"  ></td>
                            <td class="left" v-on:click=" toDetail(policyList.hisSeq)">
                                <span class="sub">{{policyList.hisTitle}}</span>
                            </td>
                        </tr>
                    </template>
                    <template v-else>
                        <tr>
                            <td colspan="2" class="no_data">조회된 내용이 없습니다.</td>
                        </tr>
                    </template>
                    </tbody>
                </table>
            </div>
            <!-- //tbl list box -->

            <!-- btn bot -->
            <div class="btn_bot">
                <button type="button" v-on:click="toList" class="btn_b01 bg02">취소</button>
                <button type="button" v-on:click="toRegPolicy" class="btn_b01 bg03">{{titleNm}} 추가</button>
                <button type="button" id="" class="btn_b01 bg03">임시 저장</button>
                <button type="button" id="" class="btn_b01 bg01">전체 저장</button>
            </div>

            <!--리스트-->
            <ListComponent v-bind:listObject="listItem" v-bind:onLoadList="listItem.dataGrid.onLoadList" v-on:listView="listViewEvent"></ListComponent>


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
            Policy, ListComponent
        }
    })
    export default class Policy extends Vue {
        titleNm: string ="";
        policyList:any[]=[];
        hisSeq:string = "";
        termsType:string = "";

        originItem : any = {} // 오리지널데이터
        listItem: any =  // 그리드 서치 페이징 옵션 처리 데이터 매우중요 이룰을 어기면 화면깨짐이 발생합니다
            {
                dataGrid: {
                    columControl:[  // 반드시 받는 컬럼명과 이 ID 가 같아야데이터가 나옵니다..
                        {columName : '순번' ,id : 'rnum',type:'number', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' ,rowColors :'' },
                        {columName : '제목' ,type:'text', id : 'hisTitle', width : '90%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' ,rowColors :'' },
                    ],
                    totalColum: 2,
                    apiUrl : 'terms/'+this.termsType+'/history',
                    onLoadList : true,  // onLoad 로딩 유무
                },
                // 아이디는 실제 컬럼값을 넣어주면됩니다.
                search: [],
                paging: { currentPage : 1 , lastPage : 3 ,viewPageSize : 10 ,totalRecords : 3 , from : 1 , to : 3 , perPage : 10},
                goSearch : "iocSearch",

            }

        mounted(){
            this.pageDiv();
        }

        // 라우터 경로 변경시 이벤트 발생
        @Watch('$route') onChange(){
            this.pageDiv();
        }

        /**
         * 페이지 분기 - 셀렉트 박스 리스트호출
         */
        pageDiv(){

            let routeNm = this.$route.name;
            if(routeNm == 'policyList' ) {
                this.titleNm = '이용약관';
                this.termsType="site";

            }else if(routeNm == 'personalList' ){
                this.titleNm ='개인보호처리방침';
                this.termsType="user";
            }

            // api 데이터 호출 -  약관/개인 지침 리스트
            CommonBoardService.getListDatas('terms/'+this.termsType+'/history', null, null).then((response) => {
                    let resultList: any = response.data;
                    this.hisSeq ="";

                    if (resultList.length > 0) {
                        this.policyList = resultList;
                    }
                }
                , (error) => {
                    //this.$Progress.finish();
                } ).catch();
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

        toDetail(hisSeq){

            if(this.termsType == 'site'){
                this.$router.push({name:'policyDetail',params:{hisSeq:hisSeq}});
            }else{
                this.$router.push({name:'personalDetail',params:{hisSeq:hisSeq}});
            }

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
            if(this.termsType="site"){
                this.$router.push({name:'policyHistoryList'});
            }else{
                this.$router.push({name:'personalHistoryList'});
            }
        }

        // 뷰페이지 클릭이벤트 받아서 여는곳
        listViewEvent(row){
            if(this.termsType == 'site'){
                this.$router.push({name:'policyDetail', params: { current : row.searchOption , objectKey : row.row } }) // 라우터 주소를 넣어줘야 히스토리모드 인식
            }else{
                this.$router.push({name:'personalDetail', params: { current : row.searchOption , objectKey : row.row } }) // 라우터 주소를 넣어줘야 히스토리모드 인식
            }
        }




    }
</script>

<style scoped>

</style>