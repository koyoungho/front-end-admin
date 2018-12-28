<template>
    <!-- container -->
    <section id="container">
        <!-- content  -->
        <div class="content">
            <h2 class="blind">고객지원</h2>

            <h3>메일 발송</h3>

            <!-- tbl view box -->
            <div class="bbs_write_box">
                <!-- tbl view01 -->
                <table class="bbs_write">
                    <caption>메일 입력</caption>
                    <colgroup>
                        <col width="10%">
                        <col width="90%">
                    </colgroup>
                    <tbody>
                    <tr>
                        <th scope="row">받는 사람</th>
                        <td>
					<span class="form_area first">
						<span class="chk_box"><input type="checkbox" name="chk" id="aa110" v-model="noticeYn" v-on:click="changeYn"><label for="aa110">공지</label></span>
					</span>
                            <select name="" class="select form_mailrec">
                                <option>전체</option>
                                <option>일반사용자</option>
                                <option>매장사용자</option>
                                <option>관리자</option>
                                <option>콜센터관리자</option>
                                <option>KT관리자>사용자</option>
                                <option>LDCC관리자>사용자</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">제목</th>
                        <td><input type="text" class="input form_w100" title="제목" v-model="title"></td>
                    </tr>
                    <tr>
                        <th scope="row">내용</th>
                        <td class="con_write">
                            <tinymce id="d1" v-model="data"></tinymce>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <!-- //tbl view box -->

            <!-- btn bot -->
            <div class="btn_bot">
                <button type="button" id="" class="btn_b01 bg01">전송</button>
            </div>

        </div>
        <!-- //content -->
    </section>
    <!-- //container -->

    
</template>

<script lang="ts">

    import {Component, Vue} from "vue-property-decorator";

    @Component({
        components: {
            SendMail
        }
    })
    export default class SendMail extends Vue {
        noticeYn:boolean=false;
        title:string="";
        files:any=[];
        data: string ="";
        content:string="";


        /**
         * 체크박스제어
         */
        changeYn(){
            let notice_str="[공지]";

            if(this.noticeYn==false){
                this.noticeYn = true;
                this.title =notice_str.concat(this.title);
            }else{
                this.noticeYn = false
                this.title = this.title.replace(notice_str, '');
            }
        }






    }
</script>

<style scoped>

</style>