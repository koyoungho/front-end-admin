<template>

    <!-- container -->
    <section id="container">
        <!-- content  -->
        <div class="content">
            <h2 class="blind">고객지원</h2>

            <h3>자주묻는 질문 {{div_str}}</h3>

            <!-- tbl view box -->
            <div class="bbs_write_box">
                <!-- tbl view01 -->
                <table class="bbs_write">
                    <caption>자주묻는 질문 </caption>
                    <colgroup>
                        <col width="10%">
                        <col width="90%">
                    </colgroup>
                    <tbody>
                    <tr>
                        <th scope="row">제목</th>
                        <td><input type="text" class="input form_w100" title="제목"  v-model="title" ></td>
                    </tr>
                    <tr>
                        <th scope="row">구분</th>
                        <td>
                            <select id="" name="" class="select form_notice">
                                <option>사용자</option>
                                <option>관리자</option>
                                <option>공통</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">내용</th>
                        <td class="con_write">
                            <textarea class="form_write"> {{content}}</textarea>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <!-- //tbl view box -->

            <!-- btn bot -->
            <div class="btn_bot">
                <button type="button"  class="btn_b01 bg02" v-on:click="toList()">취소</button>
                <template v-if="div_str == '수정' ">
                    <button type="button" class="btn_b01 bg03">삭제</button>
                </template>
                <button type="button" class="btn_b01 bg01">{{div_str}}</button>
            </div>

        </div>
        <!-- //content -->
    </section>
    <!-- //container -->
    
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import {CommonBoardService} from "../../../api/common.service";

    @Component({
        components: {
            RegFnq
        }
    })
    export default class RegFnq extends Vue {

        div_str : string="";
        seq : string ="";
        title : string ="";
        viewType : string ="";
        content : string ="";

        mounted(){
            this.seq = this.$route.params.seq;

            if(this.seq == null || this.seq == 'undefinded') {
                this.div_str="등록";
            }else {
                this.div_str="수정";
                this.getFnqDetail();
            }
        }

        /**
         * 상세정보 호출
         */
        getFnqDetail() {
            // api 데이터 호출
            CommonBoardService.getListDatas('faqs', this.seq, null).then((response) => {
                    let result: any = response.data;

                    if (result !=null) {
                        this.title = result.title;
                        this.viewType = result.viewType;
                        this.content = result.content;
                    }
                }
                , (error) => {
                    //this.$Progress.finish();
                }   ).catch();

        }

        /**
         * 취소(목록으로)
         */
        toList(){
            this.$router.push({name:'fnqList'})
        }

    }
</script>

<style scoped>

</style>