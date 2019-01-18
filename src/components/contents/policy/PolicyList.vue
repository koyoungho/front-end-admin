<template>
    <!-- container -->
    <section id="container">
        <!-- content  -->
        <div class="content">
            <h2 class="blind">시스템 관리</h2>

            <h3>{{titleNm}} 관리</h3>

            <!--완료리스트-->
            <ListComponent v-bind:listObject="listItem" v-bind:onLoadList="listItem.dataGrid.onLoadList" v-on:listView="listViewEvent"></ListComponent>

        </div>
        <!-- //content -->
    </section>
    <!-- //container -->


</template>
<script lang="ts">
    import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
    import format from 'date-fns/format'

    import ListComponent from '../../common/list/list.vue';  // 공용리스트 콤포넌트

    @Component({
        components : {
            PolicyList, ListComponent
        }
    })

    export default class PolicyList extends Vue {
        titleNm: string ="";
        objectKey : any = "";
        hisSeq:string = "";
        termsType:string ="";
        listItem : any ={};
        originItem : any ={};

        created(){
            this.pageDiv();
        }

        /**
         * 페이지 분기 - 셀렉트 박스 리스트호출
         */
        pageDiv() {

            let routeNm = this.$route.name;
            if (routeNm == 'policyList') {
                this.titleNm = '이용약관';
                this.termsType = "site";

            } else if (routeNm == 'personalList') {
                this.titleNm = '개인정보처리방침';
                this.termsType = "user";
            }

            this.objectKey = this.$route.params.objectKey;
            this.hisSeq = this.$route.params.hisSeq;

            console.log(this.objectKey);

            if(!this.objectKey ){
                Vue.swal({text: '접근할수 없습니다'}).then((result) => {
                    this.$router.push({name: 'policyHistoryList'});
                })
            }

            if (this.hisSeq == null || this.hisSeq == undefined) {
                this.hisSeq = this.objectKey.hisSeq;// 글번호 시퀀스
            }

            this.listItem= {
                dataGrid: {
                    columControl:[  // 반드시 받는 컬럼명과 이 ID 가 같아야데이터가 나옵니다..
                        {columName : '순번', type:'text', id : 'termsOrder', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' ,rowColors :'' },
                        {columName : '제목', type:'text', id : 'detTitle', width : '70%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' ,rowColors :'' },
                    ],
                    totalColum: 2,
                    onLoadList : true,  // onLoad 로딩 유무
                    apiUrl : 'terms/history/'+this.hisSeq,
                },
                search: [],
                searchClass: 'search_box page_customer04',
                searchClass2: 'search_list col0301',
                paging: { currentPage : 1 , lastPage : 3 ,viewPageSize : 10 ,totalRecords : 3 , from : 1 , to : 3 , perPage : 10},
                goDirect : ""
            }
            this.originItem  = this.listItem.dataGrid.columControl
        }

        // 뷰페이지 클릭이벤트 받아서 여는곳
        listViewEvent(row){
            if(this.termsType == 'site'){
                this.$router.push({name:'policyDetail', params: { current : row.searchOption , objectKey : row.row, hisSeq:this.hisSeq } }) // 라우터 주소를 넣어줘야 히스토리모드 인식
            }else{
                this.$router.push({name:'personalDetail', params: { current : row.searchOption , objectKey : row.row, hisSeq:this.hisSeq,} }) // 라우터 주소를 넣어줘야 히스토리모드 인식
            }
        }

        // 라우터 경로 변경시 이벤트 발생
        @Watch('$route') onChange(){
            this.pageDiv();
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



    }


</script>