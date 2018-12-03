<template>

    <!-- container -->
    <section id="container">
        <!-- content  -->
        <div class="content">
            <h2 class="blind">현금영수증관리</h2>

            <h3>전송파일 처리결과</h3>
            <!-- search box -->
            <div class="search_box page_cash03">
                <ul class="search_list">
                    <li>
                        <label for="">회사코드</label>
                        <select id="" name="" class="select sch_w100" title="회사코드">
                            <option>01</option>
                            <option>02</option>
                            <option>03</option>
                            <option>01</option>
                            <option>02</option>
                            <option>03</option>
                        </select>
                    </li>
                    <li>
                        <label for="">처리일시</label><span class="form_cal"><input type="text" title="날짜 입력" class="input date"></span><span class="period_cal">-</span><span class="form_cal"><input type="text" title="날짜 입력" class="input date"><a href="#" id="datepicker-trigger" class="btn_cal">달력</a></span>
                    </li>
                    <li>
                        <label for="">처리결과</label>
                        <select id="" name="" class="select sch_w100" title="처리결과">
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
                <button type="button" class="btn_m01 bg01" v-on:click="goSearch">조회</button>
            </div>

            <!-- tbl list box -->
            <div class="tbl_list_box">
                <!-- tbl list01 -->
                <table class="tbl_list01">
                    <caption>전송파일 처리 목록</caption>
                    <colgroup>
                        <col width="18%">
                        <col width="15%">
                        <col width="*">
                        <col width="10%">
                        <col width="10%">
                        <col width="10%">
                    </colgroup>
                    <thead>
                    <tr>
                        <th scope="col">처리일시</th>
                        <th scope="col">작업명</th>
                        <th scope="col">파일명</th>
                        <th scope="col">파일사이즈</th>
                        <th scope="col">처리결과</th>
                        <th scope="col">내용</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>2018.10.12 05:22:16</td>
                        <td>작업명</td>
                        <td class="left">/home/cash/sdata/CSI20181012_01.dat</td>
                        <td>100</td>
                        <td>성공</td>
                        <td>1000</td>
                    </tr>
                    <tr>
                        <td colspan="6" class="no_data">조회된 내용이 없습니다.</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <!-- //tbl list box -->

            <!-- pagination -->
            <div class="pagination">
                <a href="#" class="btn_fprev">맨앞</a>
                <a href="#" class="btn_prev">이전</a>
                <span class="num">
					<a href="#">1</a>
					<a href="#">2</a>
					<strong>3</strong>
					<a href="#">4</a>
					<a href="#">5</a>
				</span>
                <a href="#" class="btn_next">다음</a>
                <a href="#" class="btn_enext">맨뒤</a>
            </div>
            <!-- //pagination -->

        </div>
        <!-- //content -->
    </section>
    <!-- //container -->


</template>

<script lang="ts">
    import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
    import {CommonBoardService, CommonListService} from '../../../api/common.service';
    import {environment} from '../../../utill/environment';

    @Component({
        components: {
            SendFileResult
        },
    })
    export default class SendFileResult extends Vue {
        message: any = '';

        //돔생성전 호출자
        created() {
        }

        //돔렌더링완료시 진행
        mounted() {
        }

        //조회
        goSearch(){

        }


    }

</script>
