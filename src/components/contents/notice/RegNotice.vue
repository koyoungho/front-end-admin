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
                            <!--<select  name="" class="select form_notice" v-model="section">-->
                            <select  name="" class="select form_notice" >
                                <option>사용자</option>
                                <option>관리자</option>
                                <option>공통</option>
                            </select>
                            <span class="form_area">
                            <span class="chk_box right">
                                <input type="checkbox" id="aa01" v-model="importantYn" v-on:click="changeYn"><label for="aa01">중요공지</label>
                            </span>
                        </span>
                        </td>
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
                                             extensions="gif,jpg,jpeg,png,hwp"
                                             accept="*"
                                             @input-filter="inputFilter"
                                             @input-file="inputFile"
                                             ref="upload">
                                    <button type="button"  class="btn_m01 bg03">파일추가</button>
                                     </file-upload>
                                </span>
                                <ul >
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

                                <template v-if="attFileYn == 'Y' ">
                                    <!--<li>-->
                                    <!--<a>가이드2.pdf</a>-->
                                    <!--<a  class="btn_close"><img src="../../../assets/images/btn_file_close01.png" alt="닫기"></a>-->
                                    <!--</li>-->
                                </template>


                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">내용</th>
                        <td class="con_write" >
                            <tinymce id="d1" v-model="data"></tinymce>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <!-- //tbl view box -->

            <!-- btn bot -->
            <div class="btn_bot">
                <button type="button" class="btn_b01 bg02" v-on:click="toList">취소</button>
                <template v-if="div == '수정' ">
                    <button type="button" class="btn_b01 bg03">삭제</button>
                </template>
                <button type="button" class="btn_b01 bg01" v-on:click="reg">{{div}}</button>
            </div>

        </div>
        <!-- //content -->
    </section>
    <!-- //container -->
</template>
<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import {CommonBoardService} from "../../../api/common.service";
    import FileUpload from 'vue-upload-component';


    @Component({

        components: {
            RegNotice, FileUpload,
        }
    })
    export default class RegNotice extends Vue {
        seq: string="";
        div: string="";
        listData:any =[];
        title:string="";
        section:string="";
        content:string="";
        attFileYn : string ="";
        importantYn : boolean =false;
        files:any=[];
        data: string ="";



        mounted(){
            this.seq=this.$route.params.seq;
            if(  this.seq == undefined ||  this.seq == ''){
                this.div ="등록";
            }else{
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
                        this.title = result.title;
                        this.section = result.section;
                        this.content = result.content;
                        this.attFileYn = result.attFileYn;
                        if(result.importantYn =='Y'){
                            this.importantYn = true;
                        }
                    }
                }
                , (error) => {
                    //this.$Progress.finish();
                }   ).catch();

        }

        /**
         * 체크박스 제어
         */
        changeYn(){
            if(this.importantYn==false){
                this.importantYn = true;
            }else{
                this.importantYn = false
            }
        }

        /**
         * 취소(목록으로)
         */
        toList(){
            this.$router.push({name:'noticeList'})
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
                if (/\.(php5?|html?|jsx?|jsp?|java?|asp?|exe?|class?|js?|sh?|cgi?)$/i.test(newFile.name)) {
                    console.log("11111111");
                    alert("업로드 할수 없는 파일입니다.");
                    return false;
                    // return prevent()
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


        reg(){


        }

    }

</script>

<style>
</style>

