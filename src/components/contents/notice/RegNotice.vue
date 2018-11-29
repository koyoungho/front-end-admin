<template>
    <!-- container -->
    <section id="container">
        <!-- content  -->
        <div class="content">
            <h2 class="blind">고객지원</h2>

            <h3>공지사항 {{div}}</h3>

            <!-- tbl view box -->
            <div class="bbs_write_box">
                <!-- tbl view01 -->
                <table class="bbs_write">
                    <caption>공지사항 입력</caption>
                    <colgroup>
                        <col width="10%">
                        <col width="90%">
                    </colgroup>
                    <tbody>
                    <tr>
                        <th scope="row">제목</th>
                        <td><input type="text" class="input form_w100" title="제목" v-model="title" > </td>
                    </tr>
                    <tr>
                        <th scope="row">구분</th>
                        <td>
                            <select  name="" class="select form_notice">
                                <option>사용자</option>
                            </select>
                            <span class="form_area">
                            <span class="chk_box right"><input type="checkbox" id="aa01"><label for="aa01">중요공지</label></span>
                        </span>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">첨부파일</th>
                        <td>
                            <div class="file_add_box">
                                <ul class="file_list">
                                    <li>
                                        <a href="#">가이드.pdf</a>
                                        <a href="#" class="btn_close"><img src="../../../assets/images/btn_file_close01.png" alt="닫기"></a>
                                    </li>
                                    <li>
                                        <a href="#">가이드가이드가이드가이드가이드.pdf</a>
                                        <a href="#" class="btn_close"><img src="../../../assets/images/btn_file_close01.png" alt="닫기"></a>
                                    </li>
                                    <li>
                                        <a href="#">가이드.pdf</a>
                                        <a href="#" class="btn_close"><img src="../../../assets/images/btn_file_close01.png" alt="닫기"></a>
                                        <!--src/assets/images/btn_file_close01.png-->
                                    </li>
                                    <li>
                                        <a href="#">가이드.pdf</a>
                                        <a href="#" class="btn_close"><img src="../../../assets/images/btn_file_close01.png" alt="닫기"></a>
                                    </li>
                                </ul>
                                <span class="btn_file_area"><button type="button"  class="btn_m01 bg03">파일추가</button></span>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">내용</th>
                        <td class="con_write">
                            <img src="images/img_write01.png" alt="" style="width:860px">
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <!-- //tbl view box -->

            <!-- btn bot -->
            <div class="btn_bot">
                <button type="button" class="btn_b01 bg02">취소</button>
                <button type="button" class="btn_b01 bg03">수정</button>
                <button type="button" class="btn_b01 bg03">삭제</button>
                <button type="button" class="btn_b01 bg01">등록</button>
            </div>

        </div>
        <!-- //content -->
    </section>
    <!-- //container -->
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import {CommonBoardService} from "../../../api/common.service";

    @Component({
        components: {
            RegNotice
        }
    })
    export default class RegNotice extends Vue {
        seq: string= this.$route.params.seq; // 글번호 시퀀스
        div: string="";
        listData:any =[];

        mounted(){
            alert(this.seq);
            if(this.seq == null && this.seq == '') {
                this.div="등록";
            }else {
                this.div="수정";
                this.getNoticeDetail();
            }

        }




        /**
         * 상세정보 호출
         */
        getNoticeDetail(){

            // api 데이터 호출
            CommonBoardService.getListDatas('notices', this.seq, null ).then((response) => {
                    let result: any = response.data;

                    if (result !=null) {
                        this.listData = result;
                    }
                }
                , (error) => {
                    //this.$Progress.finish();
                }   ).catch();

        }
    }
    </script>