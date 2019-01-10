<template>
    <!-- container -->
    <section id="container">
        <!-- content  -->
        <div class="content">
            <h2 class="blind">통계관리</h2>

            <h3>현금영수증 사업자 정산룰 조회결과</h3>

            <!-- btn top -->
            <div class="btn_top">
                <button type="button" @click="jungsanRuleReg" class="btn_m01 bg02" v-show="regShow">정산룰 등록</button>
            </div>
            <div>
            <ListComponent v-bind:listObject="listItem" v-bind:onLoadList="listItem.dataGrid.onLoadList" v-on:listView="listViewEvent"></ListComponent>
            </div>
            <!-- //tbl list box -->

        </div>
        <!-- //content -->
    </section>
    <!-- //container -->

</template>

<script lang="ts">

    import {Component, Vue} from 'vue-property-decorator';
    import ListComponent from '../../common/list/list.vue';  // 공용리스트 콤포넌트

    @Component({

        components: {
            JungsanRuleSearch,ListComponent
        }
    })
    export default class JungsanRuleSearch extends Vue {
        regShow : boolean =false;
        listItem :any =  // 그리드 서치 페이징 옵션 처리 데이터 매우중요 이룰을 어기면 화면깨짐이 발생합니다
            {
                dataGrid: {
                    columTopHeader : [
                        {level : [
                                {headerName : '적용기간', value:'', cols : '2' , rows :'1' , level : '1'},
                                {headerName : '정산내역' ,value:'',  cols : '3' , rows :'1' , level : '1'},
                                {headerName : 'KT 배분률' ,value:'',  cols : '4' , rows :'1' , level : '1'},
                                {headerName : 'LDCC 배분률' ,value:'',  cols : '4' , rows :'1' , level : '1'},
                                {headerName : '등록일' ,value:'',  cols : '1' , rows :'2' , level : '1'},
                            ]},
                    ],
                    columControl:[  // 반드시 받는 컬럼명과 이 ID 가 같아야데이터가 나옵니다..
                        {columName : '시작일' ,id : 'startDate',type:'date', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' , dateFormat : 'YYYY-MM-DD'},
                        {columName : '종료일' ,id : 'endDate',type:'date', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : ''  , dateFormat : 'YYYY-MM-DD'},
                        {columName : '비온라인' ,id : 'taxOffline',type:'text', width : '6%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' , colColors : 'color: #008aff' },
                        {columName : '온라인' ,id : 'taxOnline', type:'text', width : '6%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' , } ,
                        {columName : '자진발급' ,id : 'taxSelf',type:'text', width : '6%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : ''},
                        {columName : 'KT 일반' ,id : 'ktKtNor',type:'text', width : '6%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' ,  lineValue: '취소'  }, // 라인컬러와 라인벨류는 오직하나만
                        {columName : 'LDCC 일반' ,id : 'ktLdccNor',type:'text', width : '6%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' ,  lineValue: '취소'   },
                        {columName : 'KT 편의점' ,id : 'ktKtConven',type:'text', width : '6%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' ,  lineValue: '취소'  }, // 라인컬러와 라인벨류는 오직하나만
                        {columName : 'LDCC   편의점' ,id : 'ktLdccConven',type:'text', width : '8%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' ,  lineValue: '취소'   },
                        {columName : 'LDCC 일반' ,id : 'ldccLdccNor',type:'text', width : '6%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' ,  lineValue: '취소'  }, // 라인컬러와 라인벨류는 오직하나만
                        {columName : 'KT  일반' ,id : 'ldccKtNor',type:'text', width : '6%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' ,  lineValue: '취소'   },
                        {columName : 'LDCC   편의점' ,id : 'ldccLdccConven',type:'text', width : '8%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' ,  lineValue: '취소'  }, // 라인컬러와 라인벨류는 오직하나만
                        {columName : 'KT편의점' ,id : 'ldccKtConven',type:'text', width : '6%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' ,  lineValue: '취소'   },
                        {columName : '등록일' ,id : 'regDt',type:'date', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' , dateFormat : 'YYYY-MM-DD'},

                    ],
                    totalColum: 10,
                    apiUrl : 'statistics/jungsanrate',
                    onLoadList : true,  // onLoad 로딩 유무
                },
                // 아이디는 실제 컬럼값을 넣어주면됩니다.
                search: [
                ],
                paging: { currentPage : 1 , lastPage : 0 ,viewPageSize : 10 ,totalRecords : 0 , from : 0 , to : 0 , perPage : 10},
                goSearch : "iocSearch",
                searchClass : 'search_box page_stats021',
                searchClass2 : 'search_list '
            }

        listViewEvent(){

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

        /**
         * 정산룰등록
         */
        jungsanRuleReg(){
            this.$router.push({path:'jungsanRuleReg' });
        }

    }
</script>

<style scoped>

</style>