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
                        <th scope="row">첨부파일</th>
                        <td>
                            <div class="file_add_box">
                                <span class="btn_file_area">
                                     <file-upload
                                             :multiple="true"
                                             :size="1024 * 1024 * 10"
                                             v-model="files"
                                             extensions="gif,jpg,jpeg,png,webp"
                                             accept="*"
                                             @input-filter="inputFilter"
                                             @input-file="inputFile"
                                             ref="upload">
                                    <button type="button"  class="btn_m01 bg03">파일추가</button>
                                     </file-upload>
                                </span>
                                <ul>
                                    <li v-for="(file, index) in files" :key="file.id">
                                        <span>{{file.name}}</span>
                                        <a href="#" class="btn_close" @click.prevent="$refs.upload.remove(file)"><img src="../../../assets/images/btn_file_close01.png" alt="닫기"></a>
                                        <!--<span>{{file.size | formatSize}}</span> - -->
                                        <!--<span v-if="file.error">{{file.error}}</span>-->
                                        <!--<span v-else-if="file.success">success</span>-->
                                        <!--<span v-else-if="file.active">active</span>-->
                                        <!--<span v-else-if="file.active">active</span>-->
                                        <!--<span v-else></span>-->
                                    </li>
                                </ul>

                            </div>
                        </td>
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
    import FileUpload from 'vue-upload-component';

    @Component({
        components: {
            SendMail, FileUpload,
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

        /**
         * 파일업로드 (멀티파트)
         */
        inputFilter(newFile, oldFile, prevent) {
            if (newFile && !oldFile) {
                // Before adding a file
                // Filter system files or hide files
                if (/(\/|^)(Thumbs\.db|desktop\.ini|\..+)$/.test(newFile.name)) {
                    return prevent()
                }
                // Filter php html js file
                if (/\.(php5?|html?|jsx?)$/i.test(newFile.name)) {
                    return prevent()
                }
            }
        }
        inputFile(newFile, oldFile) {
            if (newFile && !oldFile) {
                // add
                console.log('add', newFile)
            }
            if (newFile && oldFile) {
                // update
                console.log('update', newFile)
            }
            if (!newFile && oldFile) {
                // remove
                console.log('remove', oldFile)
            }
        }
    }
</script>

<style scoped>

</style>