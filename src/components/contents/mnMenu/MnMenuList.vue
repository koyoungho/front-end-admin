<template>
    <!-- container -->
    <section id="container" >
        <!-- content  -->
        <div class="content">
            <h2 class="blind">시스템 관리</h2>

            <h3>메뉴 권한 관리</h3>

            <!-- btn top -->
            <div class="btn_top" v-show="regShow">
                <button type="button" class="btn_m01 bg02" v-on:click="regMenu" >메뉴 권한 등록</button>
            </div>

            <!-- tbl list box -->
            <ListComponent v-bind:listObject="listItem" v-bind:onLoadList="listItem.dataGrid.onLoadList" v-on:listView="listViewEvent" v-on:listCheckEvent="checkBoxEvent"></ListComponent>
            <!-- //tbl list box -->

        </div>
        <!-- //content -->
    </section>

    <!-- //container -->
</template>


<script lang="ts">

    import {Component, Vue} from "vue-property-decorator";
    import ListComponent from '../../common/list/list.vue';  // 공용리스트 콤포넌트

    @Component({
        components: {
            MnMenuList,ListComponent
        }
    })
    export default class MnMenuList extends Vue {
        viewMode : boolean = false;
        regShow:boolean=false;
        auth : any = "";
        listItem: any =
            {
                dataGrid: {
                    columControl:[
                        {columName : '순번' ,id : 'number',type:'number', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' },
                        {columName : '메뉴명 (1Depth)' ,id : 'groupCodeNm',type:'text', width : '30%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' },
                        {columName : '메뉴명 (2Depth)' ,id : 'name',type:'text', width : '30%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' , colColors : 'color: #008aff' },
                        {columName : '메뉴코드' ,id : 'menuCode',type:'text', width : '15%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : ''},
                        {columName : '사용여부' ,id : 'useYn',type:'text', width : '15%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : ''},
                        //{columName : '권한설정' ,id : 'groupCode',type:'text', width : '15%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : ''},
                        // {columName : '메뉴코드' ,id : 'rnum',type:'checkBox', width : '5%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' ,checkVal :  false , allCheck: false},
                        // {columName : '사용여부' ,id : 'rnum',type:'checkBox', width : '5%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' ,checkVal :  false , allCheck: false},
                        // {columName : '체크박스' ,id : 'gajumId',type:'checkBox', width : '5%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '',checkVal :  false},
                        // {columName : '순번' ,id : 'number0',type:'number', width : '5%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' },
                        // {columName : '아이디' ,id : 'gajumId',type:'text', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' , colColors : 'color: #008aff' },
                        // {columName : '이름' ,id : 'shopNm',type:'text', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : ''},
                        // {columName : '등급' ,id : 'geoguNm',type:'text', width : '13%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : ''},
                        // {columName : '소속' ,id : 'saupId',type:'text', width : '5%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' ,  lineValue: '취소'  }, // 라인컬러와 라인벨류는 오직하나만
                        // {columName : '상태' ,id : 'regiDate',type:'text', width : '11%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' , colColors : 'color: #008aff'},
                        // {columName : '등록일' ,id : 'cusName',type:'text', width : '8%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : ''},
                        // {columName : '최종접속' ,id : 'storeNm',type:'text', width : '10%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : ''},
                        // {columName : '처리결과' ,id : 'taxErr', width : '8%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' , options : [{ value : 'Y' , change : '전송'},{ value : 'N' , change : '미전송'}] ,fontColors :'color: red' },
                    ],
                    totalColum: 5, //
                    apiUrl : 'menu-manage',
                    onLoadList : true,  // onLoad 로딩 유무
                    // mTotal : true , // 합계금액 란 활성화여부  합계가 존재하는 페이지도 있음
                    // mTotalControl : [{totalTitle : '합계 금액' , id: 'totalCount' , value : '' },{totalTitle : '봉사료' , id: 'serviceCharge' , value : '' },{totalTitle : '공급가액' , id: 'supplyValue' , value : '' },
                    //     {totalTitle : '부가세' , id: 'surtax' , value : '' }]
                },
                // 아이디는 실제 컬럼값을 넣어주면됩니다.
                search: [
                ],
                paging: { currentPage : 1 , lastPage : 0 ,viewPageSize : 10 ,totalRecords : 0 , from : 0 , to : 0 , perPage : 10},
                goSearch : "iocSearch",
                searchClass : 'search_box page_store01',
                searchClass2 : 'search_list'
            }
        created(){
            // 메뉴별 권한 확인
            let menuList = JSON.parse(sessionStorage.authMenu);
            let programId = 'mnMenu'; //메뉴ID
            for (let i = 0; i < menuList.length; i++) {
                for (let j = 0; j < menuList[i].subMenuDtos.length; j++) {

                    //권한(조회-readYn/ 등록-createYn/ 수정-updateYn/ 삭제-deleteYn)
                    if (menuList[i].subMenuDtos[j].progId == programId && menuList[i].subMenuDtos[j].createYn == 'Y') {
                        this.regShow = true;
                    }
                }
            }

            if(sessionStorage.role == '0003') { //현금영수증 사업자
                //this.soluVal = sessionStorage.soluId == null ? '' : sessionStorage.soluId;
                //this.soluDis = true;
            }

        }
        mounted(){

        }
        regMenu(){
            //seq여부
            this.$router.push({name:'regMenu'})
        }

        checkBoxEvent(){

        }

        listViewEvent(row){
            this.$router.push({ name:'modMenu' , params: { current : row.searchOption , objectKey : row.row } }) // 라우터 주소를 넣어줘야 히스토리모드 인식
        }
    }
</script>

<style scoped>

</style>