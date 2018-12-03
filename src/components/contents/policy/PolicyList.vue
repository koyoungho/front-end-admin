<template>
    <!-- container -->
    <section id="container">
        <!-- content  -->
        <div class="content">
            <h2 class="blind">시스템 관리</h2>

            <h3>{{titleNm}} 관리</h3>

            <!-- btn top -->
            <div class="btn_top">
                <button type="button" class="btn_m01 bg02"  v-on:click="regPolicy">{{titleNm}} 등록</button>
            </div>

            <!-- search box -->
            <div class="search_box page_system01">
                <ul class="search_list col0201">
                    <li>
                        <label for="">등록일</label>
                        <span class="form_cal"><input type="text" title="날짜 입력" class="input date"></span>
                        <span class="period_cal">-</span>
                        <span class="form_cal"><input type="text" title="날짜 입력" class="input date"><a href="#" id="datepicker-trigger" class="btn_cal">달력</a></span>
                    </li>
                    <li>
                        <label for="">구분</label>
                        <select id="" name="" class="select sch_w100" title="구분">
                            <option>01</option>
                            <option>02</option>
                            <option>03</option>
                            <option>01</option>
                            <option>02</option>
                            <option>03</option>
                        </select>
                    </li>
                </ul>
            </div>
            <!-- //search box -->

            <!-- btn mid -->
            <div class="btn_mid">
                <button type="button" class="btn_m01 bg01">조회</button>
            </div>

            <!-- tbl list box -->
            <div class="tbl_list_box">
                <!-- tbl list01 -->
                <table class="tbl_list01">
                    <caption>이용약관 관리</caption>
                    <colgroup>
                        <col width="10%">
                        <col width="15%">
                        <col width="*">
                        <col width="15%">
                        <col width="15%">
                    </colgroup>
                    <thead>
                    <tr>
                        <th scope="col">순번</th>
                        <th scope="col">등록일</th>
                        <th scope="col">제목</th>
                        <th scope="col">상태</th>
                        <th scope="col">등록자</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>50</td>
                        <td>2018.10.09</td>
                        <td class="left"><span class="sub">개정이력 v6개정이력 v6개정이력 v6개정이력 v6개정이력 v6개정이력 v6개정이력 v6개정이력 v6개정이력 v6</span></td>
                        <td>임시저장</td>
                        <td>관리자</td>
                    </tr>
                    <tr>
                        <td>50</td>
                        <td>2018.10.09</td>
                        <td class="left"><span class="sub">개정이력 v6</span></td>
                        <td>전체저장</td>
                        <td>관리자</td>
                    </tr>
                    <!--<template v-else>-->
                        <!--<tr>-->
                            <!--<td colspan="4" class="no_data">조회된 내용이 없습니다.</td>-->
                        <!--</tr>-->
                    <!--</template>-->
                    </tbody>
                </table>
            </div>
            <!-- //tbl list box -->

            <!-- pagination -->
            <!--<Paging v-bind:pagingDetail=listItem.paging v-on:pageToList="pagingEvent" ></Paging>-->
            <!-- //pagination -->
        </div>
        <!-- //content -->
    </section>
    <!-- //container -->


</template>


<script lang="ts">

    import {Component, Vue, Watch} from "vue-property-decorator";

    @Component({
        components: {
            PolicyList
        }
    })
    export default class PolicyList extends Vue {
        titleNm:string="";

        mounted(){
            this.pageDiv();
        }

        pageDiv(){
            let routeNm = this.$route.name;
            if(routeNm == 'policyList' ) {
                this.titleNm = '이용약관'
            }else if(routeNm == 'personalList' ){
                this.titleNm ='개인보호처리방침'
            }
        }

        regPolicy(){
            this.$router.push({name:'policy'})
        }


        // 라우터 경로 변경시 이벤트 발생
        @Watch('$route') onChange(){
            this.pageDiv();
        }


    }
</script>

<style scoped>

</style>