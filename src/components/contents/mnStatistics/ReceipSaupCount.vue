<template>
    <!-- container -->
    <section id="container">
        <!-- content  -->
        <div class="content">
            <h2 class="blind">통계관리</h2>

            <h3>현금영수증 사업자 정산</h3>

            <!-- btn top -->
            <div class="btn_top">
                <button type="button" @click="newQuarterReg" class="btn_m01 bg02" v-show="regShow">분기 별 정산 생성</button>
                <button type="button" @click="newReg" class="btn_m01 bg02" v-show="regShow">신규 정산 등록</button>
                <button type="button" @click="ruleSearch" class="btn_m01 bg02">정산룰 조회</button>
            </div>
            <div>
             <ListComponent v-bind:listObject="listItem" v-bind:onLoadList="listItem.dataGrid.onLoadList" v-on:listView="listViewEvent"></ListComponent>
            </div>
        </div>
        <!-- //content -->
        <quarter v-if="popupYns" @close="popupYns=false"></quarter>
    </section>
    <!-- //container -->


</template>
<script lang="ts">

    import {Component, Vue} from 'vue-property-decorator';
    import ListComponent from '../../common/list/list.vue';  // 공용리스트 콤포넌트
    import quarter from "@/components/contents/mnStatistics/quarter.vue";

    @Component({
        components: {
            ReceipSaupCount,ListComponent,quarter
        }
    })
    export default class ReceipSaupCount extends Vue {

        regShow : boolean = false;
        popupYns : boolean = false;

        listItem :any =  // 그리드 서치 페이징 옵션 처리 데이터 매우중요 이룰을 어기면 화면깨짐이 발생합니다
            {
                dataGrid: {
                    columControl:[  // 반드시 받는 컬럼명과 이 ID 가 같아야데이터가 나옵니다..
                        {columName : '최종 수정일시' ,id : 'regDate',type:'date', width : '25%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' ,rowColors :'' , dateFormat:'YYYY/MM/DD HHMISS'},
                        {columName : '정산 월' ,id : 'jsMon',type:'text', width : '15%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' , colColors : 'color: #008aff' },
                        {columName : '구분' ,id : 'jsType', type:'text', width : '15%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' , options : [{value:'TAX' ,change:'국세청정산'},{value:'TEMP' ,change:'가정산'}]} ,
                        {columName : '상태' ,id : 'status',type:'text', width : '15%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' ,options : [{value:'TEMP' ,change:'임시저장'},{value:'READY' ,change:'확정대기'},{value:'MODIFY' ,change:'수정요청'},{value:'ACCEPT' ,change:'확정'}]},
                        {columName : '작성자' ,id : 'regId',type:'text', width : '15%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' ,  lineValue: '취소'  }, // 라인컬러와 라인벨류는 오직하나만
                        {columName : '승인자' ,id : 'aprvId',type:'text', width : '15%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' ,   },

                    ],
                    totalColum: 10,
                    apiUrl : 'statistics/saupjajungsan',
                    onLoadList : true,  // onLoad 로딩 유무
                },
                // 아이디는 실제 컬럼값을 넣어주면됩니다.
                search: [
                    {type: 'date3', title :'정산월', id: 'searchStartDate',id2:'searchEndDate', name:'date', searchStartDate: [new Date(),new Date()] , calenderCount : 2 , dateType : 'month' , width : 220  , default :'YYYY-MM'},
                    {type: 'select' , title :'구분',id: 'gubun', name:'subSaup' , value: '' ,  api : '' , option : [{ name : '국세청정산' , value: 'TAX' },{name : '가정산' , value: 'TEMP' }]},
                    {type: 'select' , title :'상태',id: 'status', name:'issuePurpose' , value: '' ,  api : '' , option : [{ name : '임시저장' , value: 'TEMP' },{name : '확정대기' , value: '1' },{ name : '수정요청' , value: '0' },{name : '확정' , value: '1' }]},
                ],
                paging: { currentPage : 1 , lastPage : 0 ,viewPageSize : 10 ,totalRecords : 0 , from : 0 , to : 0 , perPage : 10},
                goSearch : "iocSearch",
                searchClass : 'search_box page_stats021',
                searchClass2 : 'search_list '
            }

        mounted(){
            // 메뉴별 권한 확인
            let menuList = JSON.parse(sessionStorage.authMenu);
            let programId = 'receipSaupCount'; //메뉴ID
            for (let i = 0; i < menuList.length; i++) {
                for (let j = 0; j < menuList[i].subMenuDtos.length; j++) {
                    //권한(조회-readYn/ 등록-createYn/ 수정-updateYn/ 삭제-deleteYn)
                    if (menuList[i].subMenuDtos[j].progId == programId && menuList[i].subMenuDtos[j].createYn == 'Y') {
                        this.regShow = true;
                    }
                }
            }
        }

        listViewEvent(data){
            alert('준비중입니다')
            // this.$router.push({path:'jungsanDetail' ,query : { objKey : data.row.jsSeq }});
        }

        /**
         * 신규정산등록
         * LDCC로그인시 버튼 보임
         */
        newReg(){
            this.$router.push({path:'jungsanReg' });
        }
        /**
         * 신규분기정산등록
         */
        newQuarterReg(){
            // Vue.swal({text: '준비중입니다'});
            this.popupYns=true;
        }
        /**
         * 정산룰조회
         * LDCC로그인시 버튼 보임
         */
        ruleSearch(){
            this.$router.push({path:'jungsanRuleSearch' });
        }

        detailJungsan(){
            // 구분값(?), 권한에 따라 상세정보 분기-화면설계 참조할것

            // 구분값-정산완료, 가정산/국세청정산 저장, KT로그인시
            this.$router.push({path:'jungsanDetail' });

            // 구분값-임시저장, 수정요청 ,LDCC로그인일때만 보임
            // this.$router.push({path:'jungsanReg' });

        }

    }
</script>

<style scoped>

</style>