<template>
    <!-- container -->
    <section id="container" >
        <!-- content  -->
        <div class="content">
            <h2 class="blind">시스템 관리</h2>

            <h3>메뉴 권한 관리</h3>

            <!-- btn top -->
            <div class="btn_top">
                <button type="button" class="btn_m01 bg02" v-on:click="regMenu">메뉴 권한 등록</button>
            </div>

            <!-- tbl list box -->
            <ListComponent v-bind:listObject="listItem" v-bind:onLoadList="listItem.dataGrid.onLoadList" v-on:listView="listViewEvent" v-on:listCheckEvent="checkBoxEvent"></ListComponent>
            <!--<div class="tbl_list_box">-->
                <!--&lt;!&ndash; tbl list01 &ndash;&gt;-->
                <!--<table class="tbl_list01">-->
                    <!--<caption>메뉴 권한 목록</caption>-->
                    <!--<colgroup>-->
                        <!--<col width="10%">-->
                        <!--<col width="21%">-->
                        <!--<col width="21%">-->
                        <!--<col width="16%">-->
                        <!--<col width="16%">-->
                        <!--<col width="16%">-->
                    <!--</colgroup>-->
                    <!--<thead>-->
                    <!--<tr>-->
                        <!--<th scope="col">순번</th>-->
                        <!--<th scope="col">메뉴명 (1Depth)</th>-->
                        <!--<th scope="col">메뉴명 (2Depth)</th>-->
                        <!--<th scope="col">메뉴코드</th>-->
                        <!--<th scope="col">사용여부</th>-->
                        <!--<th scope="col">권한설정</th>-->
                    <!--</tr>-->
                    <!--</thead>-->
                    <!--<tbody>-->
                    <!--<tr>-->
                        <!--<td>50</td>-->
                        <!--<td v-on:click="regMenu">가맹점관리</td>-->
                        <!--<td>가맹점관리</td>-->
                        <!--<td>0002</td>-->
                        <!--<td>Y</td>-->
                        <!--<td>Y</td>-->
                    <!--</tr>-->
                    <!--<tr>-->
                        <!--<td colspan="6" class="no_data">조회된 내용이 없습니다.</td>-->
                    <!--</tr>-->
                    <!--</tbody>-->
                <!--</table>-->
            <!--</div>-->
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
        auth : any = "";
        listItem: any =
            {
                dataGrid: {
                    columControl:[
                        {columName : '순번' ,id : 'number',type:'number', width : '5%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' },
                        {columName : '메뉴명 (1Depth)' ,id : 'groupCodeNm',type:'text', width : '25%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' },
                        {columName : '메뉴명 (2Depth)' ,id : 'name',type:'text', width : '25%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : '' , colColors : 'color: #008aff' },
                        {columName : '메뉴코드' ,id : 'menuCode',type:'text', width : '15%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : ''},
                        {columName : '사용여부' ,id : 'useYn',type:'text', width : '15%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : ''},
                        {columName : '권한설정' ,id : 'useYn',type:'text', width : '15%' , height : '' , size : '' , mobile : 'N' , cols : '' , rows : ''},
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
                    totalColum: 6, //
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
                searchClass : 'search_box page_system03'
            }
        created(){

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